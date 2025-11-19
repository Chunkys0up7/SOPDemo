#!/usr/bin/env python3
"""
GraphRAG Query Interface for SOP Documentation
==============================================
Implements hybrid search combining vector similarity and graph traversal
for intelligent documentation retrieval.

Requirements:
    pip install neo4j openai langchain langchain-openai

Environment Variables:
    OPENAI_API_KEY: Your OpenAI API key
    NEO4J_URI: Neo4j connection URI (default: bolt://localhost:7687)
    NEO4J_USER: Neo4j username (default: neo4j)
    NEO4J_PASSWORD: Neo4j password
"""

import os
import json
from typing import List, Dict, Optional, Tuple
from pathlib import Path
from dataclasses import dataclass, asdict

try:
    from neo4j import GraphDatabase
    from openai import OpenAI
except ImportError as e:
    print(f"Missing required dependencies: {e}")
    print("Install with: pip install neo4j openai")
    exit(1)


@dataclass
class GraphRAGResult:
    """Result from GraphRAG query."""
    node_id: str
    node_type: str
    title: str
    content: str
    similarity_score: float
    graph_context: List[Dict]
    reasoning_path: str
    metadata: Dict


class GraphRAGQuery:
    """GraphRAG query interface with hybrid search capabilities."""

    def __init__(
        self,
        neo4j_uri: str = None,
        neo4j_user: str = None,
        neo4j_password: str = None,
        openai_api_key: str = None,
        embedding_model: str = "text-embedding-ada-002"
    ):
        """Initialize GraphRAG query interface."""

        # Neo4j connection
        self.neo4j_uri = neo4j_uri or os.getenv("NEO4J_URI", "bolt://localhost:7687")
        self.neo4j_user = neo4j_user or os.getenv("NEO4J_USER", "neo4j")
        self.neo4j_password = neo4j_password or os.getenv("NEO4J_PASSWORD")

        if not self.neo4j_password:
            raise ValueError("Neo4j password required via NEO4J_PASSWORD env var")

        self.driver = GraphDatabase.driver(
            self.neo4j_uri,
            auth=(self.neo4j_user, self.neo4j_password)
        )

        # OpenAI client
        self.openai_api_key = openai_api_key or os.getenv("OPENAI_API_KEY")
        if not self.openai_api_key:
            raise ValueError("OpenAI API key required via OPENAI_API_KEY env var")

        self.openai_client = OpenAI(api_key=self.openai_api_key)
        self.embedding_model = embedding_model

    def close(self):
        """Close Neo4j connection."""
        self.driver.close()

    def generate_query_embedding(self, query: str) -> List[float]:
        """Generate embedding for user query."""

        response = self.openai_client.embeddings.create(
            model=self.embedding_model,
            input=query
        )

        return response.data[0].embedding

    def vector_search(
        self,
        query_embedding: List[float],
        top_k: int = 5,
        node_type: Optional[str] = None,
        filters: Optional[Dict] = None
    ) -> List[Dict]:
        """Perform vector similarity search across all indexed nodes."""

        # Determine which indexes to search
        index_names = []
        if node_type:
            index_names.append(f"{node_type.lower()}_embedding_index")
        else:
            # Search all component types
            index_names = [
                'atom_embedding_index',
                'molecule_embedding_index',
                'organism_embedding_index',
                'sop_embedding_index'
            ]

        results = []

        with self.driver.session() as session:
            for index_name in index_names:
                try:
                    # Vector search query
                    cypher = """
                        CALL db.index.vector.queryNodes($indexName, $topK, $embedding)
                        YIELD node, score
                        RETURN
                            node.id as id,
                            node.type as type,
                            node.title as title,
                            node.content as content,
                            node.department as department,
                            node.tags as tags,
                            score
                        ORDER BY score DESC
                    """

                    result = session.run(
                        cypher,
                        indexName=index_name,
                        topK=top_k,
                        embedding=query_embedding
                    )

                    for record in result:
                        results.append({
                            'id': record['id'],
                            'type': record['type'],
                            'title': record['title'],
                            'content': record['content'],
                            'department': record['department'],
                            'tags': record['tags'],
                            'score': record['score']
                        })

                except Exception as e:
                    print(f"Warning: Vector search failed for {index_name}: {e}")

        # Sort all results by score and return top_k
        results.sort(key=lambda x: x['score'], reverse=True)
        return results[:top_k]

    def graph_expansion(
        self,
        node_id: str,
        hops: int = 2,
        relationship_types: Optional[List[str]] = None
    ) -> List[Dict]:
        """Expand graph context from a starting node."""

        rel_filter = ""
        if relationship_types:
            rel_types = '|'.join(relationship_types)
            rel_filter = f":{rel_types}"

        with self.driver.session() as session:
            result = session.run(f"""
                MATCH path = (start {{id: $nodeId}})-[r{rel_filter}*1..{hops}]-(neighbor)
                RETURN
                    start.id as startId,
                    neighbor.id as neighborId,
                    neighbor.type as neighborType,
                    neighbor.title as neighborTitle,
                    type(r[0]) as relationshipType,
                    length(path) as distance,
                    path
                ORDER BY distance
                LIMIT 20
            """, nodeId=node_id)

            context = []
            for record in result:
                context.append({
                    'startId': record['startId'],
                    'neighborId': record['neighborId'],
                    'neighborType': record['neighborType'],
                    'neighborTitle': record['neighborTitle'],
                    'relationshipType': record['relationshipType'],
                    'distance': record['distance']
                })

            return context

    def hybrid_search(
        self,
        query: str,
        top_k: int = 5,
        expand_hops: int = 2,
        node_type: Optional[str] = None
    ) -> List[GraphRAGResult]:
        """
        Perform hybrid search combining vector similarity and graph traversal.

        This is the core GraphRAG algorithm:
        1. Generate query embedding
        2. Vector search to find similar nodes
        3. Graph expansion to find related context
        4. Rank and assemble results
        """

        # Step 1: Generate query embedding
        query_embedding = self.generate_query_embedding(query)

        # Step 2: Vector similarity search
        vector_results = self.vector_search(
            query_embedding,
            top_k=top_k,
            node_type=node_type
        )

        # Step 3: Graph expansion from top results
        hybrid_results = []

        for vec_result in vector_results:
            # Get graph context around this node
            graph_context = self.graph_expansion(
                vec_result['id'],
                hops=expand_hops
            )

            # Build reasoning path
            reasoning_path = self._build_reasoning_path(
                vec_result,
                graph_context,
                query
            )

            # Create GraphRAG result
            result = GraphRAGResult(
                node_id=vec_result['id'],
                node_type=vec_result['type'],
                title=vec_result['title'],
                content=vec_result['content'],
                similarity_score=vec_result['score'],
                graph_context=graph_context,
                reasoning_path=reasoning_path,
                metadata={
                    'department': vec_result.get('department'),
                    'tags': vec_result.get('tags'),
                    'related_count': len(graph_context)
                }
            )

            hybrid_results.append(result)

        return hybrid_results

    def _build_reasoning_path(
        self,
        node: Dict,
        context: List[Dict],
        query: str
    ) -> str:
        """Build explainable reasoning path for why this result matches."""

        path = f"Found '{node['title']}' (similarity: {node['score']:.3f})\n"

        # Add graph context
        if context:
            path += f"\nRelated components ({len(context)}):\n"
            for ctx in context[:3]:  # Top 3 related
                path += f"  - {ctx['neighborTitle']} ({ctx['relationshipType']}, distance: {ctx['distance']})\n"

        return path

    def ontology_constrained_search(
        self,
        query: str,
        department: Optional[str] = None,
        compliance_framework: Optional[str] = None,
        complexity: Optional[str] = None,
        top_k: int = 5
    ) -> List[GraphRAGResult]:
        """
        Perform ontology-constrained GraphRAG search.

        Applies ontology rules to filter and rank results based on
        domain-specific constraints.
        """

        # Generate query embedding
        query_embedding = self.generate_query_embedding(query)

        # Build constraint filters
        constraints = []
        if department:
            constraints.append(f"node.department = '{department}'")
        if complexity:
            constraints.append(f"node.complexity = '{complexity}'")

        # Vector search with constraints
        with self.driver.session() as session:
            # Build WHERE clause
            where_clause = " AND ".join(constraints) if constraints else "true"

            cypher = f"""
                CALL db.index.vector.queryNodes('atom_embedding_index', {top_k * 2}, $embedding)
                YIELD node, score
                WHERE {where_clause}
                RETURN
                    node.id as id,
                    node.type as type,
                    node.title as title,
                    node.content as content,
                    node.department as department,
                    node.complexity as complexity,
                    score
                ORDER BY score DESC
                LIMIT {top_k}
            """

            result = session.run(cypher, embedding=query_embedding)

            results = []
            for record in result:
                # Get graph context
                graph_context = self.graph_expansion(record['id'], hops=2)

                # Filter by compliance if specified
                if compliance_framework:
                    if not self._has_compliance(record['id'], compliance_framework):
                        continue

                results.append(GraphRAGResult(
                    node_id=record['id'],
                    node_type=record['type'],
                    title=record['title'],
                    content=record['content'],
                    similarity_score=record['score'],
                    graph_context=graph_context,
                    reasoning_path=f"Constrained search: dept={department}, complexity={complexity}",
                    metadata={
                        'department': record['department'],
                        'complexity': record['complexity']
                    }
                ))

            return results

    def _has_compliance(self, node_id: str, framework: str) -> bool:
        """Check if node complies with framework."""

        with self.driver.session() as session:
            result = session.run("""
                MATCH (n {id: $nodeId})-[:COMPLIES_WITH]->(cf:ComplianceFramework {name: $framework})
                RETURN count(cf) > 0 as hasCompliance
            """, nodeId=node_id, framework=framework)

            record = result.single()
            return record['hasCompliance'] if record else False

    def get_component_dependencies(self, component_id: str) -> Dict:
        """Get full dependency tree for a component."""

        with self.driver.session() as session:
            result = session.run("""
                MATCH path = (c {id: $id})-[:DEPENDS_ON*1..3]->(dep)
                RETURN
                    dep.id as depId,
                    dep.type as depType,
                    dep.title as depTitle,
                    length(path) as depth
                ORDER BY depth
            """, id=component_id)

            dependencies = []
            for record in result:
                dependencies.append({
                    'id': record['depId'],
                    'type': record['depType'],
                    'title': record['depTitle'],
                    'depth': record['depth']
                })

            return {
                'component_id': component_id,
                'dependencies': dependencies,
                'dependency_count': len(dependencies)
            }

    def get_component_usage(self, component_id: str) -> Dict:
        """Get all places where a component is used."""

        with self.driver.session() as session:
            result = session.run("""
                MATCH path = (c {id: $id})<-[:COMPOSED_OF*1..3]-(parent)
                RETURN
                    parent.id as parentId,
                    parent.type as parentType,
                    parent.title as parentTitle,
                    length(path) as depth
                ORDER BY depth
            """, id=component_id)

            usage = []
            for record in result:
                usage.append({
                    'id': record['parentId'],
                    'type': record['parentType'],
                    'title': record['parentTitle'],
                    'depth': record['depth']
                })

            return {
                'component_id': component_id,
                'used_in': usage,
                'usage_count': len(usage)
            }

    def format_for_llm(self, results: List[GraphRAGResult], query: str) -> str:
        """Format GraphRAG results into LLM prompt context."""

        context = f"# GraphRAG Context for Query: \"{query}\"\n\n"
        context += f"Found {len(results)} relevant components:\n\n"

        for i, result in enumerate(results, 1):
            context += f"## {i}. {result.title} ({result.node_type})\n\n"
            context += f"**Similarity Score**: {result.similarity_score:.3f}\n\n"
            context += f"**Content**:\n{result.content[:500]}...\n\n"

            if result.graph_context:
                context += f"**Related Components**:\n"
                for ctx in result.graph_context[:3]:
                    context += f"- {ctx['neighborTitle']} (via {ctx['relationshipType']})\n"
                context += "\n"

            context += f"**Reasoning**: {result.reasoning_path}\n\n"
            context += "---\n\n"

        return context


def main():
    """Demo usage of GraphRAG query interface."""

    print("="*60)
    print("GraphRAG Query Interface Demo")
    print("="*60)

    try:
        graphrag = GraphRAGQuery()
    except ValueError as e:
        print(f"\nERROR: {e}")
        print("\nSet environment variables:")
        print("  export NEO4J_PASSWORD='your-password'")
        print("  export OPENAI_API_KEY='your-api-key'")
        return 1

    # Example queries
    queries = [
        "How do I reset a user's password?",
        "What are the onboarding procedures for new employees?",
        "How do we handle security compliance?",
        "Account provisioning and access control"
    ]

    for query in queries:
        print(f"\n{'='*60}")
        print(f"Query: {query}")
        print(f"{'='*60}\n")

        try:
            # Perform hybrid search
            results = graphrag.hybrid_search(query, top_k=3, expand_hops=2)

            for i, result in enumerate(results, 1):
                print(f"\n{i}. {result.title} ({result.node_type})")
                print(f"   Similarity: {result.similarity_score:.3f}")
                print(f"   Department: {result.metadata.get('department')}")
                print(f"   Related: {result.metadata.get('related_count')} components")
                print(f"\n   {result.content[:200]}...")

                if result.graph_context:
                    print(f"\n   Related components:")
                    for ctx in result.graph_context[:2]:
                        print(f"     - {ctx['neighborTitle']} (via {ctx['relationshipType']})")

        except Exception as e:
            print(f"Error: {e}")

    graphrag.close()
    return 0


if __name__ == '__main__':
    exit(main())
