# SOP Documentation GraphRAG System

> **GraphRAG** = Graph-based Retrieval-Augmented Generation
> Combining vector embeddings + graph traversal + ontology constraints for intelligent documentation search

## Overview

This implementation transforms your atomic SOP documentation into a queryable knowledge graph with semantic search capabilities. It implements the **ontology-grounded RAG (OG-RAG)** pattern described in recent research.

### Key Features

✅ **Hybrid Search**: Combines vector similarity with graph structure
✅ **Ontology-Constrained**: Filters results using domain knowledge (departments, compliance, complexity)
✅ **Explainable Retrieval**: Shows _why_ results were returned via graph paths
✅ **Relationship-Aware**: Understands how atoms compose into molecules, organisms, and SOPs
✅ **Compliance Tracking**: Find all components meeting specific regulatory frameworks
✅ **Dependency Resolution**: Trace component dependencies and usage patterns

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│ Documentation Source (Markdown + YAML)             │
│ ├── atoms/*.md         (single-purpose components) │
│ ├── molecules/*.md     (multi-step procedures)     │
│ ├── organisms/*.md     (complex workflows)         │
│ └── graph/sop-graph.json (SOPs + relationships)    │
└─────────────────────────────────────────────────────┘
                    ↓
          [Ingestion Pipeline]
          ingest_sops_to_graph.py
                    ↓
┌─────────────────────────────────────────────────────┐
│ Neo4j Graph Database                                │
│                                                     │
│ Nodes:                                              │
│   • Atom (1536-dim vector embedding)                │
│   • Molecule (1536-dim vector embedding)            │
│   • Organism (1536-dim vector embedding)            │
│   • SOP (metadata + composition)                    │
│   • Concept (domain knowledge)                      │
│   • Department, Actor, ComplianceFramework          │
│                                                     │
│ Relationships:                                      │
│   • COMPOSED_OF (atoms → molecules → organisms)     │
│   • DEPENDS_ON (dependencies between components)    │
│   • REFERENCES (links to concepts)                  │
│   • APPLIES_TO (role-based access)                  │
│   • COMPLIES_WITH (regulatory frameworks)           │
│   • OWNED_BY (departmental ownership)               │
│   • PRECEDES (workflow sequencing)                  │
│   • VARIANT_OF (versioning)                         │
└─────────────────────────────────────────────────────┘
                    ↓
          [GraphRAG Query Layer]
           graphrag_query.py
                    ↓
┌─────────────────────────────────────────────────────┐
│ Query Processing                                    │
│                                                     │
│ 1. Generate query embedding (OpenAI)                │
│ 2. Vector search → Find similar nodes               │
│ 3. Graph expansion → Explore relationships          │
│ 4. Ontology constraints → Filter by domain rules    │
│ 5. Rank & assemble → Build context for LLM         │
└─────────────────────────────────────────────────────┘
                    ↓
            LLM Response Generation
         (Explainable + Grounded Context)
```

---

## Installation

### Prerequisites

1. **Neo4j Database** (v5.11+ with vector search support)
   ```bash
   # Option 1: Docker
   docker run -d \
     --name neo4j-sop \
     -p 7474:7474 -p 7687:7687 \
     -e NEO4J_AUTH=neo4j/your-password \
     -e NEO4J_PLUGINS='["apoc"]' \
     neo4j:5.13

   # Option 2: Neo4j Desktop (https://neo4j.com/download/)
   # Download and install Neo4j Desktop, create a database
   ```

2. **Python Dependencies**
   ```bash
   pip install neo4j openai pyyaml python-frontmatter tiktoken
   ```

3. **OpenAI API Key** (for embeddings)
   ```bash
   export OPENAI_API_KEY='your-api-key-here'
   export NEO4J_PASSWORD='your-neo4j-password'
   ```

---

## Quick Start

### Step 1: Setup Neo4j Schema

```bash
# Connect to Neo4j and run schema setup
cat graphdb/neo4j-schema.cypher | \
  cypher-shell -u neo4j -p your-password

# Or use Neo4j Browser:
# Open http://localhost:7474
# Copy/paste contents of neo4j-schema.cypher
```

### Step 2: Ingest Documentation

```bash
# Ingest all atoms, molecules, organisms, and SOPs
python graphdb/ingest_sops_to_graph.py

# Expected output:
# ============================================================
# INGESTION COMPLETE
# ============================================================
# Atoms created:         19
# Molecules created:     9
# Organisms created:     3
# SOPs created:          7
# Relationships created: 87
# Embeddings generated:  31
# ============================================================
```

### Step 3: Query with GraphRAG

```python
from graphdb.graphrag_query import GraphRAGQuery

# Initialize
graphrag = GraphRAGQuery()

# Hybrid search (vector + graph)
results = graphrag.hybrid_search(
    query="How do I reset a user password?",
    top_k=5,
    expand_hops=2
)

# Print results
for result in results:
    print(f"\n{result.title} ({result.node_type})")
    print(f"Similarity: {result.similarity_score:.3f}")
    print(f"Related: {len(result.graph_context)} components")
    print(result.reasoning_path)

# Ontology-constrained search
it_results = graphrag.ontology_constrained_search(
    query="account provisioning",
    department="IT",
    complexity="Intermediate",
    top_k=3
)

# Get dependencies
deps = graphrag.get_component_dependencies("atom-password-reset")
print(f"Dependencies: {deps['dependency_count']}")

# Get usage
usage = graphrag.get_component_usage("atom-password-reset")
print(f"Used in {usage['usage_count']} places")

# Format for LLM
llm_context = graphrag.format_for_llm(results, "password reset")
# Use llm_context in your LLM prompt
```

---

## Ontology Schema

The system uses a formal ontology defined in `ontology/sop-ontology-schema.json`:

### Entity Types

| Entity | Description | Key Properties |
|--------|-------------|----------------|
| **Atom** | Single-purpose component | id, title, content, department, complexity, embedding |
| **Molecule** | Multi-step procedure | id, title, composedOf[], embedding |
| **Organism** | Complex workflow | id, title, workflow, embedding |
| **SOP** | Complete procedure doc | id, title, status, owner, components[] |
| **Concept** | Domain knowledge | name, definition, domain, embedding |
| **Actor** | User role | role, permissions, department |
| **ComplianceFramework** | Regulatory framework | name, requirements, authority |
| **Department** | Organizational unit | name, function, head |

### Relationship Types

| Relationship | From → To | Description |
|--------------|-----------|-------------|
| **COMPOSED_OF** | Molecule/Organism/SOP → Atom/Molecule | Component hierarchy |
| **DEPENDS_ON** | Component → Component | Dependencies |
| **REFERENCES** | Component → Concept | Semantic links |
| **APPLIES_TO** | Component → Actor | Role-based access |
| **COMPLIES_WITH** | Component → Framework | Regulatory compliance |
| **OWNED_BY** | Component → Department | Ownership |
| **PRECEDES** | Component → Component | Workflow sequence |
| **VARIANT_OF** | Component → Component | Versioning |

---

## Usage Examples

### Example 1: Find Password Reset Procedure

```python
results = graphrag.hybrid_search("password reset", top_k=3)

# Output:
# 1. Password Reset Procedure (atom)
#    Similarity: 0.892
#    Department: IT
#    Related: 5 components
#
#    Related components:
#      - User Account Setup (via COMPOSED_OF)
#      - Account Recovery Workflow (via COMPOSED_OF)
```

### Example 2: Department-Specific Search

```python
hr_onboarding = graphrag.ontology_constrained_search(
    query="new employee onboarding",
    department="HR",
    top_k=5
)
```

### Example 3: Compliance Audit

```python
# Find all SOX-compliant components
with graphrag.driver.session() as session:
    result = session.run("""
        MATCH (c)-[:COMPLIES_WITH]->(cf:ComplianceFramework {name: 'SOX'})
        RETURN c.id, c.title, c.type
    """)

    for record in result:
        print(f"{record['c.id']}: {record['c.title']}")
```

### Example 4: Dependency Tree

```python
deps = graphrag.get_component_dependencies("molecule-account-setup")

# Output:
# {
#   'component_id': 'molecule-account-setup',
#   'dependencies': [
#     {'id': 'atom-access-request-form', 'depth': 1},
#     {'id': 'atom-password-reset', 'depth': 1},
#     {'id': 'atom-mfa-setup', 'depth': 1}
#   ],
#   'dependency_count': 3
# }
```

### Example 5: Usage Tracking

```python
usage = graphrag.get_component_usage("atom-password-reset")

# Output:
# {
#   'component_id': 'atom-password-reset',
#   'used_in': [
#     {'id': 'molecule-account-recovery', 'depth': 1},
#     {'id': 'organism-it-support', 'depth': 2},
#     {'id': 'sop-002', 'depth': 3}
#   ],
#   'usage_count': 3
# }
```

---

## Neo4j Cypher Query Examples

### Find All Components in a Department

```cypher
MATCH (c)-[:OWNED_BY]->(d:Department {name: 'IT'})
RETURN c.id, c.title, c.type
ORDER BY c.type
```

### Find Workflow Paths

```cypher
MATCH path = (start:Atom)-[:PRECEDES*]->(end:Atom)
WHERE start.id = 'atom-welcome-message'
RETURN path
ORDER BY length(path) DESC
LIMIT 5
```

### Find Highly Reused Atoms

```cypher
MATCH (a:Atom)<-[:COMPOSED_OF*1..3]-(parent)
WITH a, count(DISTINCT parent) as usageCount
WHERE usageCount > 2
RETURN a.id, a.title, usageCount
ORDER BY usageCount DESC
```

### Find Outdated Components

```cypher
MATCH (c)
WHERE c.nextReview < date()
RETURN c.id, c.title, c.nextReview
ORDER BY c.nextReview
```

### Find Orphaned Atoms (Not Used Anywhere)

```cypher
MATCH (a:Atom)
WHERE NOT (a)<-[:COMPOSED_OF]-()
RETURN a.id, a.title
```

---

## Integration with LLM

### Format Context for ChatGPT/Claude

```python
# Perform GraphRAG search
results = graphrag.hybrid_search("onboarding checklist", top_k=3)

# Format for LLM
context = graphrag.format_for_llm(results, "onboarding checklist")

# Use in LLM prompt
prompt = f"""
Based on the following documentation context, answer the user's question.

{context}

User Question: What is the complete onboarding checklist for new employees?

Instructions:
- Use only information from the provided context
- Cite specific components by ID when referencing procedures
- Explain the relationships between components
- If information is missing, state what additional context would be needed
"""

# Send to LLM (OpenAI, Anthropic, etc.)
# response = openai.chat.completions.create(...)
```

### Explainable Citations

The GraphRAG system provides explainable retrieval paths:

```
Query: "How to reset password?"

Result 1: atom-password-reset (similarity: 0.89)
  └─ Reasoning Path:
       Found via vector similarity (content match)
       → Used in molecule-account-recovery (COMPOSED_OF)
       → Used in organism-it-support-workflow (COMPOSED_OF, depth=2)
       → Part of sop-002: IT System Access (COMPOSED_OF, depth=3)
       → Complies with SOC 2, HIPAA (COMPLIES_WITH)
```

---

## Performance Optimization

### Vector Index Tuning

```cypher
// Check vector index stats
SHOW VECTOR INDEXES YIELD name, state, populationPercent;

// For large datasets, tune index configuration
CALL db.index.vector.createNodeIndex(
  'atom_embedding_index',
  'Atom',
  'embedding',
  1536,
  'cosine',
  {indexConfig: {
    `vector.dimensions`: 1536,
    `vector.similarity_function`: 'cosine'
  }}
);
```

### Query Optimization

```python
# Limit graph expansion hops for faster queries
results = graphrag.hybrid_search(
    query="password reset",
    top_k=5,
    expand_hops=1  # Reduce from 2 to 1 for speed
)

# Filter early with ontology constraints
results = graphrag.ontology_constrained_search(
    query="password reset",
    department="IT",  # Pre-filter before vector search
    top_k=5
)
```

---

## Maintenance

### Re-indexing After Updates

```bash
# When you add/update SOP components:
python graphdb/ingest_sops_to_graph.py

# Incremental updates (only changed files)
# TODO: Implement incremental ingestion
```

### Cleaning Up Old Versions

```cypher
// Archive deprecated components
MATCH (c)
WHERE c.status = 'deprecated'
SET c:Archived
REMOVE c:Atom:Molecule:Organism:SOP;

// Delete archived nodes (after backup!)
MATCH (c:Archived)
DETACH DELETE c;
```

---

## Troubleshooting

### No Results from Vector Search

```python
# Check if embeddings exist
with graphrag.driver.session() as session:
    result = session.run("""
        MATCH (a:Atom)
        WHERE a.embedding IS NOT NULL
        RETURN count(a) as withEmbeddings
    """)
    print(result.single()['withEmbeddings'])

# Re-run ingestion with OpenAI API key set
# export OPENAI_API_KEY='your-key'
# python graphdb/ingest_sops_to_graph.py
```

### Slow Queries

```cypher
// Create additional indexes
CREATE INDEX atom_department_title IF NOT EXISTS
FOR (a:Atom) ON (a.department, a.title);

// Profile slow queries
PROFILE
MATCH (a:Atom)-[:COMPOSED_OF*1..3]-(parent)
RETURN a, parent;
```

---

## Next Steps

1. **Web UI**: Integrate with existing `public/graph.html` visualization
2. **REST API**: Create FastAPI endpoint for GraphRAG queries
3. **Incremental Updates**: Track file changes and update only modified nodes
4. **Advanced RAG**: Implement hierarchical retrieval (atoms → molecules → organisms)
5. **Monitoring**: Add query performance metrics and logging
6. **Multi-tenancy**: Support multiple documentation repositories

---

## References

- [OG-RAG Paper](https://arxiv.org/abs/2412.15235) - Ontology-Grounded RAG
- [Neo4j GraphRAG](https://neo4j.com/blog/genai/what-is-graphrag/)
- [Neo4j Vector Search Docs](https://neo4j.com/docs/cypher-manual/current/indexes-for-vector-search/)
- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)

---

## License

MIT License - See parent project LICENSE file

## Contact

For questions or issues, please open a GitHub issue on the main SOPDemo repository.
