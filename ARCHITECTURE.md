# SOP System Architecture

## Data Storage Strategy: Hybrid Approach

### Current Implementation (POC Phase)

The system uses a **two-tier architecture** with static JSON as primary and Neo4j as optional:

```
┌─────────────────────────────────────────────────────┐
│  PRIMARY: Static JSON Files (Version Controlled)    │
│  ✓ Active  │  Used by: Build, Frontend, CLI        │
└─────────────────────────────────────────────────────┘
         │
         │  Optional Ingestion
         ▼
┌─────────────────────────────────────────────────────┐
│  OPTIONAL: Neo4j Graph Database                     │
│  ⚙ Ready  │  Used by: RAG, Advanced Queries        │
└─────────────────────────────────────────────────────┘
```

---

## Primary Storage: Static JSON

**Files:**
- `graph/sop-graph.json` - Demo/development graph (20 nodes, enriched metadata)
- `graph/mortgage-sop-graph.json` - Mortgage domain (26 nodes, 47 edges)
- `graph/enriched-sop-graph.json` - Test data with comprehensive examples

**Advantages:**
✅ **Version Control** - Full Git history of all changes
✅ **No Infrastructure** - No database server required
✅ **Simple Deployment** - Just commit and push
✅ **Easy Inspection** - View/edit in any text editor
✅ **Fast Reads** - O(1) lookup by node ID
✅ **Portability** - Works anywhere Node.js runs

**Use Cases:**
- Component library management
- SOP builds (tools/build.js)
- Frontend visualization (graph.html, contribute.html)
- Development and testing
- CI/CD pipeline validation

**Format:**
```json
{
  "metadata": {
    "version": "4.0.0",
    "lastUpdated": "2025-11-20",
    "totalNodes": 20
  },
  "nodes": {
    "sop-001": { "id": "sop-001", "type": "sop", "title": "...", ... },
    "atom-login": { "id": "atom-login", "type": "atom", ... }
  },
  "edges": [
    { "source": "sop-001", "target": "atom-login", "type": "depends-on" }
  ]
}
```

---

## Optional: Neo4j Graph Database

**Status:** Infrastructure ready, not required for core functionality

**Schema:** `graphdb/neo4j-schema.cypher`
```cypher
// Nodes
(:SOP {id, title, version, status, owner, ...})
(:Atom {id, title, description, ...})
(:Molecule {id, title, composedOf, ...})
(:Organism {id, title, composedOf, ...})

// Relationships
()-[:DEPENDS_ON {strength, description}]->()
()-[:COMPONENT_OF]->()
()-[:IMPLEMENTS {requirement}]->()
```

**Ingestion:** `graphdb/ingest_sops_to_graph.py`
```bash
# Load JSON → Neo4j with embeddings
python graphdb/ingest_sops_to_graph.py \
  --graph-file graph/sop-graph.json \
  --neo4j-uri bolt://localhost:7687 \
  --neo4j-password yourpassword
```

**Advantages:**
✅ **Graph Queries** - Cypher for complex traversals
✅ **Vector Search** - Semantic similarity (with embeddings)
✅ **GraphRAG** - LLM + Knowledge Graph integration
✅ **Scalability** - Handles millions of nodes
✅ **ACID** - Transactional consistency

**Use Cases:**
- Semantic search ("find SOPs about wire transfers")
- Impact analysis (deep dependency chains)
- RAG-powered AI assistant (graphdb/graphrag_query.py)
- Complex relationship queries
- Real-time graph algorithms (PageRank, centrality)

**Requirements:**
```bash
# Python dependencies
pip install neo4j openai pyyaml python-frontmatter tiktoken

# Environment variables
export NEO4J_URI=bolt://localhost:7687
export NEO4J_USER=neo4j
export NEO4J_PASSWORD=your-password
export OPENAI_API_KEY=sk-...  # For embeddings
```

---

## When to Use Each

### Use JSON When:
- Building SOPs from components
- Viewing/editing component library
- Version control and change tracking
- CI/CD validation
- Frontend graph visualization
- Development and testing
- No database infrastructure available

### Use Neo4j When:
- Semantic search across SOPs
- AI/RAG assistant queries
- Deep impact analysis (6+ levels)
- Finding shortest paths
- Community detection
- Recommendation systems
- Production scale (1000+ SOPs)

---

## Current Workflow (POC Phase)

```
1. Edit components → sop-components/*.md
2. Update graph → graph/sop-graph.json (manual or script)
3. Build SOPs → node tools/build.js
4. Commit → git commit -am "Update SOPs"
5. (Optional) Ingest → python graphdb/ingest_sops_to_graph.py
```

**Build Process (tools/build.js):**
```javascript
// Reads from JSON
const graph = JSON.parse(fs.readFileSync('graph/sop-graph.json'));

// Builds SOP
const sop = buildSOP(graph.nodes['sop-001']);

// Writes to dist/
fs.writeFileSync('dist/sops/sop-001.md', sop);
```

**Frontend Visualization (graph.html):**
```javascript
// Loads JSON directly
fetch('../graph/sop-graph.json')
  .then(res => res.json())
  .then(graph => renderGraph(graph));
```

---

## Transition Path: JSON → Neo4j (Future)

For production deployment with 100+ SOPs:

### Phase 1: Dual-Write (Current)
- Primary: JSON files (version controlled)
- Optional: Neo4j (ingested from JSON)
- Sync: Manual ingestion via Python script

### Phase 2: Dual-Read
- Reads: Check Neo4j first, fallback to JSON
- Writes: Update JSON, auto-ingest to Neo4j
- Validation: JSON is source of truth

### Phase 3: Neo4j Primary (Future)
- Reads: Neo4j only
- Writes: Direct to Neo4j
- Backup: Export to JSON nightly
- Version Control: JSON snapshots in Git

---

## File Locations

### JSON Graph Files
```
graph/
├── sop-graph.json              # Main demo graph (20 nodes)
├── mortgage-sop-graph.json      # Mortgage domain (26 nodes, 47 edges)
└── enriched-sop-graph.json     # Test data with examples
```

### Neo4j Integration
```
graphdb/
├── neo4j-schema.cypher          # Database schema definition
├── ingest_sops_to_graph.py      # JSON → Neo4j ingestion
├── graphrag_query.py            # RAG query implementation
└── requirements.txt             # Python dependencies
```

### Component Library
```
sop-components/
├── atoms/                       # 19 base components
├── molecules/                   # 10 task sequences
└── organisms/                   # 3 complete workflows
```

### Build System
```
tools/
├── build.js                     # SOP assembler (uses JSON)
├── validate.js                  # Schema validator
├── convert-graph-format.js      # Array ↔ Object converter
└── serve-enhanced.js            # Dev server
```

### Frontend
```
public/
├── graph.html                   # Interactive graph (D3.js, uses JSON)
├── contribute.html              # Component editor (uses JSON)
├── search.html                  # Search interface (uses JSON)
└── index.html                   # Dashboard
```

---

## Why Not Neo4j Only?

**Reasons for JSON-first approach:**

1. **Simplicity** - No database setup for POC
2. **Version Control** - Git tracks every change
3. **Portability** - Works on any machine
4. **Docs-as-Code** - Aligns with text-based workflow
5. **Transparency** - Easy to inspect and debug
6. **Collaboration** - Pull requests for graph changes
7. **CI/CD** - Validate before merge
8. **Backup** - Git history IS the backup

**When Neo4j adds value:**
- 1000+ nodes (JSON performance degrades)
- Complex graph algorithms needed
- Semantic search with embeddings
- Multi-user concurrent writes
- Real-time impact analysis
- GraphRAG AI assistant

---

## Performance Comparison

| Operation | JSON | Neo4j |
|-----------|------|-------|
| Load graph | <50ms | <100ms (network) |
| Find node by ID | O(1) ~1ms | O(log n) ~5ms |
| Traverse 3 levels | O(n) ~10ms | O(1) ~5ms |
| Full-text search | O(n) ~50ms | O(log n) ~10ms |
| Vector similarity | ❌ N/A | ✅ ~20ms |
| Update node | O(1) ~5ms | O(log n) ~15ms |
| Commit changes | git commit | Transactional |
| Rollback | git revert | Cypher DELETE |

**Sweet Spot:**
- JSON: <500 nodes, read-heavy, version-controlled
- Neo4j: >500 nodes, write-heavy, complex queries

---

## Current Status

### ✅ Working (JSON)
- Component library (32 components)
- SOP builds (tools/build.js)
- Graph visualization (graph.html)
- Frontend UI (8 pages)
- Version control (Git)
- Build pipeline (pre-commit hooks)

### ⚙ Ready (Neo4j)
- Schema defined (neo4j-schema.cypher)
- Ingestion script (ingest_sops_to_graph.py)
- GraphRAG queries (graphrag_query.py)
- **Not deployed** - No Neo4j instance required

### 🚧 In Progress
- Expanding component library (per CLAUDE.md)
- Adding edges to sop-graph.json
- Interactive visualizations (D3.js)
- Mock AI assistant (no real LLM yet)

---

## Recommendations

### For POC/Demo (Now)
✅ **Continue with JSON** - No Neo4j needed
- Fast, simple, version-controlled
- Easy to show stakeholders
- Perfect for <100 SOPs

### For Production (Future)
✅ **Add Neo4j when you need:**
- Semantic search
- AI assistant with RAG
- Real-time impact analysis
- Multi-user collaboration
- 500+ SOPs

### Hybrid Approach (Recommended)
✅ **Best of both worlds:**
- JSON = Source of truth (Git)
- Neo4j = Query engine (performance)
- Sync nightly or on-demand
- Validate: JSON schema checks
- Query: Neo4j Cypher + embeddings

---

## Migration Example

**Today (JSON only):**
```bash
# Edit component
vim sop-components/atoms/atom-login.md

# Update graph
vim graph/sop-graph.json

# Build
node tools/build.js

# Commit
git add . && git commit -m "Add login atom"
```

**With Neo4j (future):**
```bash
# Edit component (same)
vim sop-components/atoms/atom-login.md

# Update graph (same)
vim graph/sop-graph.json

# Build (same)
node tools/build.js

# Sync to Neo4j (new)
python graphdb/ingest_sops_to_graph.py --incremental

# Commit (same)
git add . && git commit -m "Add login atom"
```

**No breaking changes** - Neo4j is additive, not replacement.

---

## Summary

**Current Architecture:**
- **Primary:** Static JSON files (version-controlled)
- **Optional:** Neo4j graph database (ready, not deployed)
- **Status:** JSON-first approach, Neo4j when needed

**Why This Works:**
- POC simplicity (no DB setup)
- Version control (Git history)
- Portability (works anywhere)
- Future-proof (Neo4j ready when scaling)

**Next Steps:**
1. ✅ Expand JSON graph (per CLAUDE.md)
2. ✅ Build visualizations (D3.js)
3. ⚙ Deploy Neo4j (when AI/RAG needed)
4. ⚙ Add embeddings (when semantic search needed)
