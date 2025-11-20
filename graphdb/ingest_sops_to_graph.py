#!/usr/bin/env python3
"""
SOP Documentation Graph Ingestion Pipeline
==========================================
Converts SOP markdown files into Neo4j graph nodes with vector embeddings
for GraphRAG implementation.

Requirements:
    pip install neo4j openai pyyaml python-frontmatter tiktoken

Environment Variables:
    OPENAI_API_KEY: Your OpenAI API key for embeddings
    NEO4J_URI: Neo4j connection URI (default: bolt://localhost:7687)
    NEO4J_USER: Neo4j username (default: neo4j)
    NEO4J_PASSWORD: Neo4j password
"""

import os
import json
import yaml
import frontmatter
from pathlib import Path
from typing import Dict, List, Optional
from datetime import datetime
import re
import argparse

try:
    from neo4j import GraphDatabase
    from openai import OpenAI
except ImportError as e:
    print(f"Missing required dependencies: {e}")
    print("Install with: pip install neo4j openai pyyaml python-frontmatter tiktoken")
    exit(1)


class SOPGraphIngestion:
    """Ingests SOP documentation into Neo4j graph database with embeddings."""

    def __init__(
        self,
        neo4j_uri: str = "bolt://localhost:7687",
        neo4j_user: str = "neo4j",
        neo4j_password: str = None,
        openai_api_key: str = None,
        embedding_model: str = "text-embedding-ada-002",
        use_embeddings: bool = True
    ):
        """Initialize graph ingestion pipeline."""

        # Neo4j connection
        self.neo4j_uri = neo4j_uri or os.getenv("NEO4J_URI", "bolt://localhost:7687")
        self.neo4j_user = neo4j_user or os.getenv("NEO4J_USER", "neo4j")
        self.neo4j_password = neo4j_password or os.getenv("NEO4J_PASSWORD")

        if not self.neo4j_password:
            raise ValueError("Neo4j password must be provided via NEO4J_PASSWORD env var or constructor")

        self.driver = GraphDatabase.driver(
            self.neo4j_uri,
            auth=(self.neo4j_user, self.neo4j_password)
        )

        # OpenAI client for embeddings
        self.use_embeddings = use_embeddings
        if not use_embeddings:
            print("INFO: Embeddings disabled via --no-embeddings flag")
            self.openai_client = None
        else:
            self.openai_api_key = openai_api_key or os.getenv("OPENAI_API_KEY")
            if not self.openai_api_key:
                print("WARNING: No OpenAI API key provided. Embeddings will not be generated.")
                print("         Set OPENAI_API_KEY environment variable to enable embeddings.")
                self.openai_client = None
            else:
                self.openai_client = OpenAI(api_key=self.openai_api_key)

        self.embedding_model = embedding_model

        # Stats tracking
        self.stats = {
            'atoms_created': 0,
            'molecules_created': 0,
            'organisms_created': 0,
            'sops_created': 0,
            'relationships_created': 0,
            'embeddings_generated': 0
        }

    def close(self):
        """Close Neo4j connection."""
        self.driver.close()

    def generate_embedding(self, text: str) -> Optional[List[float]]:
        """Generate vector embedding for text using OpenAI."""
        if not self.openai_client:
            return None

        try:
            # Clean text: remove markdown, limit length
            clean_text = self._clean_text_for_embedding(text)

            # Generate embedding
            response = self.openai_client.embeddings.create(
                model=self.embedding_model,
                input=clean_text
            )

            embedding = response.data[0].embedding
            self.stats['embeddings_generated'] += 1

            return embedding

        except Exception as e:
            print(f"Warning: Failed to generate embedding: {e}")
            return None

    def _clean_text_for_embedding(self, text: str, max_tokens: int = 8000) -> str:
        """Clean and truncate text for embedding generation."""

        # Remove markdown formatting
        text = re.sub(r'#{1,6}\s', '', text)  # Headers
        text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)  # Bold
        text = re.sub(r'\*(.+?)\*', r'\1', text)  # Italic
        text = re.sub(r'`(.+?)`', r'\1', text)  # Inline code
        text = re.sub(r'```[\s\S]*?```', '', text)  # Code blocks
        text = re.sub(r'\[(.+?)\]\(.+?\)', r'\1', text)  # Links

        # Remove extra whitespace
        text = re.sub(r'\n\s*\n', '\n\n', text)
        text = text.strip()

        # Truncate to approximate token limit (rough estimate: 4 chars = 1 token)
        max_chars = max_tokens * 4
        if len(text) > max_chars:
            text = text[:max_chars] + "..."

        return text

    def parse_frontmatter(self, file_path: Path) -> Dict:
        """Parse YAML frontmatter from markdown file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
                metadata = post.metadata
                content = post.content

                return {
                    'metadata': metadata,
                    'content': content,
                    'full_text': f"{yaml.dump(metadata)}\n\n{content}"
                }
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
            return None

    def create_atom_node(self, atom_data: Dict, file_path: Path) -> str:
        """Create an Atom node in Neo4j."""

        metadata = atom_data['metadata']
        content = atom_data['content']

        # Generate embedding
        embedding = self.generate_embedding(atom_data['full_text'])

        # Prepare node properties
        properties = {
            'id': metadata.get('id'),
            'type': 'atom',
            'title': metadata.get('title'),
            'version': metadata.get('version'),
            'content': content[:5000],  # Truncate for storage
            'fullContent': content,  # Store full content
            'department': metadata.get('department'),
            'processCategory': metadata.get('processCategory'),
            'complexity': metadata.get('complexity'),
            'audience': metadata.get('audience', []),
            'tags': metadata.get('tags', []),
            'keywords': metadata.get('keywords', []),
            'complianceFrameworks': metadata.get('complianceFrameworks', []),
            'reusable': metadata.get('reusable', True),
            'owner': metadata.get('owner'),
            'maintainer': metadata.get('maintainer'),
            'approver': metadata.get('approver'),
            'lastReviewed': metadata.get('lastReviewed'),
            'nextReview': metadata.get('nextReview'),
            'filePath': str(file_path),
            'createdAt': datetime.now().isoformat()
        }

        if embedding:
            properties['embedding'] = embedding

        # Create node in Neo4j
        with self.driver.session() as session:
            result = session.run("""
                MERGE (a:Atom {id: $id})
                SET a += $properties
                RETURN a.id as id
            """, id=properties['id'], properties=properties)

            atom_id = result.single()['id']
            self.stats['atoms_created'] += 1

            # Create relationships to departments
            if properties.get('department'):
                session.run("""
                    MATCH (a:Atom {id: $atomId})
                    MERGE (d:Department {name: $deptName})
                    MERGE (a)-[:OWNED_BY]->(d)
                """, atomId=atom_id, deptName=properties['department'])
                self.stats['relationships_created'] += 1

            # Create relationships to compliance frameworks
            for framework in properties.get('complianceFrameworks', []):
                session.run("""
                    MATCH (a:Atom {id: $atomId})
                    MERGE (cf:ComplianceFramework {name: $framework})
                    MERGE (a)-[:COMPLIES_WITH]->(cf)
                """, atomId=atom_id, framework=framework)
                self.stats['relationships_created'] += 1

            # Create relationships to concepts (extract from tags/keywords)
            for keyword in properties.get('keywords', [])[:5]:  # Limit to top 5
                session.run("""
                    MATCH (a:Atom {id: $atomId})
                    MERGE (c:Concept {name: $keyword})
                    MERGE (a)-[:REFERENCES]->(c)
                """, atomId=atom_id, keyword=keyword)
                self.stats['relationships_created'] += 1

        return atom_id

    def create_molecule_node(self, molecule_data: Dict, file_path: Path) -> str:
        """Create a Molecule node in Neo4j."""

        metadata = molecule_data['metadata']
        content = molecule_data['content']

        # Generate embedding
        embedding = self.generate_embedding(molecule_data['full_text'])

        properties = {
            'id': metadata.get('id'),
            'type': 'molecule',
            'title': metadata.get('title'),
            'version': metadata.get('version'),
            'content': content[:5000],
            'fullContent': content,
            'purpose': metadata.get('purpose', ''),
            'tags': metadata.get('tags', []),
            'owner': metadata.get('owner'),
            'filePath': str(file_path),
            'createdAt': datetime.now().isoformat()
        }

        if embedding:
            properties['embedding'] = embedding

        with self.driver.session() as session:
            result = session.run("""
                MERGE (m:Molecule {id: $id})
                SET m += $properties
                RETURN m.id as id
            """, id=properties['id'], properties=properties)

            molecule_id = result.single()['id']
            self.stats['molecules_created'] += 1

            # Create COMPOSED_OF relationships to atoms
            for order, atom_id in enumerate(metadata.get('composedOf', [])):
                session.run("""
                    MATCH (m:Molecule {id: $moleculeId})
                    MATCH (a:Atom {id: $atomId})
                    MERGE (m)-[r:COMPOSED_OF {order: $order}]->(a)
                """, moleculeId=molecule_id, atomId=atom_id, order=order)
                self.stats['relationships_created'] += 1

            # Create DEPENDS_ON relationships
            for dep_id in metadata.get('dependencies', []):
                session.run("""
                    MATCH (m:Molecule {id: $moleculeId})
                    MATCH (dep {id: $depId})
                    MERGE (m)-[r:DEPENDS_ON {dependencyType: 'hard'}]->(dep)
                """, moleculeId=molecule_id, depId=dep_id)
                self.stats['relationships_created'] += 1

        return molecule_id

    def create_organism_node(self, organism_data: Dict, file_path: Path) -> str:
        """Create an Organism node in Neo4j."""

        metadata = organism_data['metadata']
        content = organism_data['content']

        embedding = self.generate_embedding(organism_data['full_text'])

        properties = {
            'id': metadata.get('id'),
            'type': 'organism',
            'title': metadata.get('title'),
            'version': metadata.get('version'),
            'content': content[:5000],
            'fullContent': content,
            'workflow': metadata.get('workflow', ''),
            'owner': metadata.get('owner'),
            'filePath': str(file_path),
            'createdAt': datetime.now().isoformat()
        }

        if embedding:
            properties['embedding'] = embedding

        with self.driver.session() as session:
            result = session.run("""
                MERGE (o:Organism {id: $id})
                SET o += $properties
                RETURN o.id as id
            """, id=properties['id'], properties=properties)

            organism_id = result.single()['id']
            self.stats['organisms_created'] += 1

            # Create COMPOSED_OF relationships
            for order, component_id in enumerate(metadata.get('composedOf', [])):
                session.run("""
                    MATCH (o:Organism {id: $organismId})
                    MATCH (c {id: $componentId})
                    MERGE (o)-[r:COMPOSED_OF {order: $order}]->(c)
                """, organismId=organism_id, componentId=component_id, order=order)
                self.stats['relationships_created'] += 1

        return organism_id

    def ingest_graph_json(self, graph_json_path: Path):
        """Ingest existing graph.json to create SOP and component nodes."""

        with open(graph_json_path, 'r') as f:
            graph_data = json.load(f)

        nodes = graph_data.get('nodes', {})

        # Handle both list and dict formats
        if isinstance(nodes, list):
            # If nodes is a list, iterate directly
            nodes_iter = nodes
        elif isinstance(nodes, dict):
            # If nodes is a dict, iterate over values
            nodes_iter = nodes.values()
        else:
            print(f"Warning: Unexpected nodes format: {type(nodes)}")
            return

        for node_data in nodes_iter:
            node_type = node_data.get('type')

            if node_type == 'sop':
                # Create SOP node
                properties = {
                    'id': node_data['id'],
                    'type': 'sop',
                    'title': node_data.get('title'),
                    'version': node_data.get('version'),
                    'status': node_data.get('status'),
                    'owner': node_data.get('owner'),
                    'approver': node_data.get('metadata', {}).get('approver'),
                    'lastReviewed': node_data.get('metadata', {}).get('lastReviewed'),
                    'createdAt': datetime.now().isoformat()
                }

                with self.driver.session() as session:
                    session.run("""
                        MERGE (s:SOP {id: $id})
                        SET s += $properties
                    """, id=properties['id'], properties=properties)

                    self.stats['sops_created'] += 1

                    # Create COMPOSED_OF relationships
                    for order, component_id in enumerate(node_data.get('components', [])):
                        session.run("""
                            MATCH (s:SOP {id: $sopId})
                            MATCH (c {id: $componentId})
                            MERGE (s)-[r:COMPOSED_OF {order: $order}]->(c)
                        """, sopId=properties['id'], componentId=component_id, order=order)
                        self.stats['relationships_created'] += 1

    def ingest_directory(self, components_dir: Path):
        """Ingest all SOP components from a directory."""

        # Process atoms
        atoms_dir = components_dir / 'atoms'
        if atoms_dir.exists():
            print(f"\nProcessing atoms from {atoms_dir}...")
            for md_file in atoms_dir.glob('*.md'):
                print(f"  - {md_file.name}")
                data = self.parse_frontmatter(md_file)
                if data:
                    self.create_atom_node(data, md_file)

        # Process molecules
        molecules_dir = components_dir / 'molecules'
        if molecules_dir.exists():
            print(f"\nProcessing molecules from {molecules_dir}...")
            for md_file in molecules_dir.glob('*.md'):
                print(f"  - {md_file.name}")
                data = self.parse_frontmatter(md_file)
                if data:
                    self.create_molecule_node(data, md_file)

        # Process organisms
        organisms_dir = components_dir / 'organisms'
        if organisms_dir.exists():
            print(f"\nProcessing organisms from {organisms_dir}...")
            for md_file in organisms_dir.glob('*.md'):
                print(f"  - {md_file.name}")
                data = self.parse_frontmatter(md_file)
                if data:
                    self.create_organism_node(data, md_file)

    def print_stats(self):
        """Print ingestion statistics."""
        print("\n" + "="*60)
        print("INGESTION COMPLETE")
        print("="*60)
        print(f"Atoms created:         {self.stats['atoms_created']}")
        print(f"Molecules created:     {self.stats['molecules_created']}")
        print(f"Organisms created:     {self.stats['organisms_created']}")
        print(f"SOPs created:          {self.stats['sops_created']}")
        print(f"Relationships created: {self.stats['relationships_created']}")
        print(f"Embeddings generated:  {self.stats['embeddings_generated']}")
        print("="*60)


def main():
    """Main execution function."""

    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Ingest SOP documentation into Neo4j graph database')
    parser.add_argument('--no-embeddings', action='store_true',
                        help='Skip generating OpenAI embeddings (no API key required)')
    args = parser.parse_args()

    print("="*60)
    print("SOP Documentation Graph Ingestion Pipeline")
    print("="*60)

    # Configuration
    base_dir = Path(__file__).parent.parent
    components_dir = base_dir / 'sop-components'
    graph_json_path = base_dir / 'graph' / 'sop-graph.json'

    # Initialize ingestion
    try:
        ingestion = SOPGraphIngestion(use_embeddings=not args.no_embeddings)
    except ValueError as e:
        print(f"\nERROR: {e}")
        print("\nPlease set environment variables:")
        print("  export NEO4J_PASSWORD='your-password'")
        print("  export OPENAI_API_KEY='your-api-key'  (optional, for embeddings)")
        print("\nOr run with --no-embeddings to skip vector embeddings")
        return 1

    try:
        # Step 1: Ingest markdown files (atoms, molecules, organisms)
        if components_dir.exists():
            print(f"\nStep 1: Ingesting components from {components_dir}")
            ingestion.ingest_directory(components_dir)
        else:
            print(f"\nWarning: Components directory not found: {components_dir}")

        # Step 2: Ingest graph.json (SOPs and additional relationships)
        if graph_json_path.exists():
            print(f"\nStep 2: Ingesting SOPs from {graph_json_path}")
            ingestion.ingest_graph_json(graph_json_path)
        else:
            print(f"\nWarning: Graph JSON not found: {graph_json_path}")

        # Print statistics
        ingestion.print_stats()

    finally:
        ingestion.close()

    return 0


if __name__ == '__main__':
    exit(main())
