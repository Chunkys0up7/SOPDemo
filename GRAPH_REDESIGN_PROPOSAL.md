# Graph Page Redesign Proposal
**Based on Position Paper: Graph Models in Docs-as-Code**

## 🔴 Critical Issues with Current Implementation

### 1. Disconnected from Real Business Data
**Problem:** Graph shows generic HR onboarding SOPs (User Onboarding, IT Access) but your actual business is **mortgage lending** with SOPs for:
- FHA Underwriting (sop-mf-003)
- Wire Transfer Security (sop-mf-005)
- Clear to Close (sop-mf-004)
- TRID Compliance (sop-mf-010)
- Fraud Detection (sop-mf-011)

**Impact:** Zero business value - users can't answer real questions

### 2. No Actionable Insights
**Current state:** Pretty visualization with no queries

**Position paper recommendations:**
```cypher
// What breaks if we deprecate this SOP?
MATCH (doc:Document {doc_id: 'SOP-001'})<-[:DEPENDS_ON*]-(affected)
WHERE NOT affected.status = 'deprecated'
RETURN affected.title, length(path) as dependency_depth

// What needs review this month?
MATCH (sop:SOP)
WHERE sop.next_review_date < date()
RETURN sop.doc_id, sop.title, sop.owner

// Which requirements aren't covered?
MATCH (req:Requirement)
WHERE NOT (req)<-[:IMPLEMENTS]-(:Document)
RETURN req.req_id, req.description
```

**We need:** Pre-built queries in the sidebar that answer these questions

### 3. Missing Visualization Patterns

| View | Purpose | Current Status |
|------|---------|----------------|
| **Dependency Graph** | Show what depends on what | ✅ Partially working |
| **Compliance Matrix** | Show requirement coverage | ❌ Missing |
| **Review Timeline** | Track review schedules | ❌ Missing |
| **Impact Analysis** | Downstream effects | ⚠️ Basic only |
| **Ownership Map** | Who owns/maintains what | ❌ Missing |

---

## ✅ What I've Built

### 1. Real Mortgage SOP Graph Extractor

**Script:** `scripts/build-mortgage-graph.py`

**Functionality:**
- Parses YAML frontmatter from all markdown SOPs
- Extracts metadata: owner, compliance frameworks, dependencies, review dates
- Builds knowledge graph with 2 node types:
  - **SOP nodes**: Your actual procedures
  - **Requirement nodes**: Compliance frameworks (FHA Handbook, TRID, ECOA, etc.)
- Creates 2 edge types:
  - **depends-on**: Procedural dependencies
  - **implements**: Compliance coverage

**Output:** `graph/mortgage-sop-graph.json`
- **23 nodes** (10 SOPs + 13 compliance requirements)
- **45 edges** (dependencies + implementation relationships)

**Sample Node Structure:**
```json
{
  "id": "sop-mf-003",
  "type": "sop",
  "title": "FHA Underwriting Standards and Guidelines",
  "version": "2.4.1",
  "status": "active",
  "owner": "Michael Chen",
  "department": "Underwriting",
  "criticality": "high",
  "complianceFrameworks": [
    "FHA Handbook 4000.1",
    "HUD Mortgagee Letter Guidelines",
    "Equal Credit Opportunity Act (ECOA)",
    "Fair Housing Act (FHA)",
    "Ability to Repay (ATR) Rule"
  ],
  "lastReviewed": "2025-09-15",
  "reviewFrequency": "quarterly",
  "dependencies": ["sop-mf-002", "sop-mf-008", "sop-mf-009", "sop-mf-013"],
  "file_path": "sops/mortgage/sop-mf-003-fha-underwriting.md"
}
```

---

## 📊 Proposed Graph Page Redesign

### Architecture: Multi-View Interface

```
┌─────────────────────────────────────────────────────────────┐
│                      Graph Header                           │
│  [Dependency View] [Compliance Matrix] [Review Timeline]    │
│  [Impact Analysis] [Ownership Map]                          │
└─────────────────────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────────────────────┐
│                      │                                      │
│   Graph Canvas       │      Sidebar: Actionable Queries    │
│   (Cytoscape.js)     │                                      │
│                      │  📊 Quick Insights                   │
│   [Interactive       │  • SOPs Due for Review (3)          │
│    visualization]    │  • High Criticality SOPs (5)        │
│                      │  • Compliance Gaps (2)              │
│                      │                                      │
│                      │  🔍 Pre-Built Queries                │
│                      │  • What needs review this month?    │
│                      │  • Show high-impact dependencies    │
│                      │  • Find compliance coverage gaps    │
│                      │  • Who owns which SOPs?             │
│                      │                                      │
│                      │  📝 Selected Node Details           │
│                      │  [Shows when node clicked]          │
└──────────────────────┴──────────────────────────────────────┘
```

### View 1: Dependency Graph (Enhanced)
**Current:** Basic force-directed layout
**Enhanced:**
- **Node sizing:** Scale by criticality (high > medium > low)
- **Node colors:**
  - 🔴 Red: Critical SOPs
  - 🟡 Yellow: Medium criticality
  - 🟢 Green: Low criticality
  - 🔵 Blue: Compliance requirements
- **Edge styling:**
  - Solid thick: Strong dependencies
  - Dotted thin: Weak dependencies
  - Dashed: Implements relationship
- **Hover tooltips:** Show metadata without clicking

### View 2: Compliance Matrix
**Layout:** Bipartite graph
- **Left side:** Compliance frameworks (FHA, TRID, ECOA, etc.)
- **Right side:** SOPs
- **Connections:** Lines showing which SOPs implement which frameworks
- **Colors:**
  - Green: Full coverage (3+ SOPs)
  - Yellow: Partial coverage (1-2 SOPs)
  - Red: No coverage (gap!)

**Sample Query:**
```javascript
// Find compliance frameworks with <2 implementing SOPs
const gaps = {};
Object.values(nodes).filter(n => n.type === 'requirement').forEach(req => {
  const implementers = edges.filter(e =>
    e.type === 'implements' && e.target === req.id
  );
  if (implementers.length < 2) {
    gaps[req.title] = implementers.length;
  }
});
```

### View 3: Review Timeline
**Layout:** Gantt-style horizontal timeline
- **Y-axis:** SOPs (sorted by owner/department)
- **X-axis:** Time (next 12 months)
- **Markers:**
  - 🔴 Overdue reviews
  - 🟡 Due this month
  - 🟢 Future reviews
- **Click:** Show review history and schedule next review

**Sample Data Processing:**
```javascript
const reviewSchedule = Object.values(nodes)
  .filter(n => n.type === 'sop' && n.reviewFrequency)
  .map(sop => ({
    id: sop.id,
    title: sop.title,
    owner: sop.owner,
    lastReviewed: new Date(sop.lastReviewed),
    frequency: sop.reviewFrequency,
    nextDue: calculateNextReview(sop.lastReviewed, sop.reviewFrequency),
    status: getReviewStatus(sop)
  }))
  .sort((a, b) => a.nextDue - b.nextDue);
```

### View 4: Impact Analysis
**Interactive query view:**
1. User selects a node
2. System highlights all downstream dependencies
3. Shows impact metrics:
   - **Direct dependents:** Count of SOPs that directly depend on this
   - **Transitive closure:** All SOPs affected (depth 1, 2, 3+)
   - **Criticality impact:** How many critical SOPs are affected
   - **Owners to notify:** List of owners who need to be informed

**Algorithm:**
```javascript
function analyzeImpact(sopId) {
  const affected = new Set();
  const queue = [sopId];
  const depths = {};

  while (queue.length > 0) {
    const current = queue.shift();
    const dependents = edges.filter(e =>
      e.type === 'depends-on' && e.target === current
    );

    dependents.forEach(e => {
      if (!affected.has(e.source)) {
        affected.add(e.source);
        depths[e.source] = (depths[current] || 0) + 1;
        queue.push(e.source);
      }
    });
  }

  return {
    totalAffected: affected.size,
    byDepth: groupBy(Array.from(affected), id => depths[id]),
    criticalAffected: Array.from(affected).filter(id =>
      nodes[id].criticality === 'high'
    ),
    ownersToNotify: [...new Set(
      Array.from(affected).map(id => nodes[id].owner)
    )]
  };
}
```

### View 5: Ownership Map
**Layout:** Circular/radial with departments as sections
- **Inner ring:** Departments (Underwriting, Closing, Compliance)
- **Outer ring:** SOPs owned by that department
- **Lines:** Dependencies crossing departments
- **Stats per department:**
  - SOP count
  - Average criticality
  - Overdue reviews

---

## 🎯 Actionable Sidebar Queries

### Quick Insights (Auto-calculated)
```
📊 Dashboard Metrics
━━━━━━━━━━━━━━━━━━━━━━━
✓ Total SOPs: 10
✓ Active: 9 | Draft: 1
━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Needs Attention:
  • Due for Review: 3 SOPs
  • High Criticality: 5 SOPs
  • Compliance Gaps: 2 frameworks
  • Missing Dependencies: 0
```

### Pre-Built Query Buttons

1. **🔴 What needs review this month?**
```javascript
query: "Show SOPs where nextReviewDate <= today + 30 days"
visual: Highlight nodes in red
sidebar: List with owner, last reviewed, due date
```

2. **⚡ Show high-impact dependencies**
```javascript
query: "Find SOPs with 3+ dependents AND criticality = high"
visual: Larger nodes, thicker borders
sidebar: Impact analysis for each
```

3. **📋 Find compliance coverage gaps**
```javascript
query: "Find requirements with <2 implementing SOPs"
visual: Show bipartite graph, highlight gaps in red
sidebar: List frameworks needing attention
```

4. **👤 Who owns which SOPs?**
```javascript
query: "Group SOPs by owner"
visual: Cluster by owner with color coding
sidebar: Table with owner, SOP count, criticality breakdown
```

5. **🔗 Trace dependency chain**
```javascript
query: "Select SOP → Show all upstream dependencies (what it needs)"
visual: Highlight path from selected to all dependencies
sidebar: Ordered list with depth indicators
```

6. **💥 Impact if we deprecate this**
```javascript
query: "Select SOP → Show all downstream dependents (what breaks)"
visual: Highlight affected nodes, show depth with colors
sidebar: List of affected SOPs, owners to notify
```

---

## 📝 Implementation Plan

### Phase 1: Update Graph Data Source ✅
- [x] Build mortgage graph extractor script
- [x] Generate `mortgage-sop-graph.json` with real data
- [ ] Update `graph.html` to fetch from new file

### Phase 2: Add Multi-View Interface
```javascript
// Add view switcher in graph.html
const views = {
  'dependency': renderDependencyView,
  'compliance': renderComplianceMatrix,
  'review': renderReviewTimeline,
  'impact': renderImpactAnalysis,
  'ownership': renderOwnershipMap
};

function switchView(viewName) {
  currentView = viewName;
  views[viewName](graphData);
}
```

### Phase 3: Add Actionable Queries
```javascript
// Pre-defined queries with visual + sidebar output
const queries = {
  'needsReview': {
    name: 'What needs review this month?',
    execute: (graph) => {
      const today = new Date();
      const threshold = new Date(today.setMonth(today.getMonth() + 1));
      return graph.nodes.filter(n =>
        n.type === 'sop' &&
        new Date(n.nextReviewDate) <= threshold
      );
    },
    visualize: (results) => {
      cy.nodes().removeClass('highlight');
      results.forEach(r => cy.$(`#${r.id}`).addClass('highlight-red'));
    },
    sidebar: (results) => {
      return `
        <h3>⚠️ Due for Review (${results.length})</h3>
        <table>
          ${results.map(r => `
            <tr>
              <td>${r.title}</td>
              <td>${r.owner}</td>
              <td>${formatDate(r.nextReviewDate)}</td>
            </tr>
          `).join('')}
        </table>
      `;
    }
  },
  // ... more queries
};
```

### Phase 4: Enhanced Node Details
```javascript
// Show rich metadata in sidebar on click
function showNodeDetails(node) {
  const html = `
    <div class="node-details">
      <h2>${node.title}</h2>
      <div class="meta-grid">
        <div class="meta-item">
          <label>Owner:</label>
          <span>${node.owner}</span>
        </div>
        <div class="meta-item">
          <label>Criticality:</label>
          <span class="badge-${node.criticality}">${node.criticality}</span>
        </div>
        <div class="meta-item">
          <label>Last Reviewed:</label>
          <span>${formatDate(node.lastReviewed)}</span>
        </div>
        <div class="meta-item">
          <label>Review Frequency:</label>
          <span>${node.reviewFrequency}</span>
        </div>
      </div>

      <h3>Compliance Frameworks (${node.complianceFrameworks.length})</h3>
      <ul>
        ${node.complianceFrameworks.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h3>Dependencies (${node.dependencies.length})</h3>
      <ul>
        ${node.dependencies.map(d => {
          const depNode = graph.nodes[d];
          return `<li><a href="#" onclick="selectNode('${d}')">${depNode.title}</a></li>`;
        }).join('')}
      </ul>

      <button class="btn-primary" onclick="analyzeImpact('${node.id}')">
        Analyze Impact
      </button>
    </div>
  `;
  document.getElementById('sidebar-content').innerHTML = html;
}
```

---

## 🚀 Next Steps (Commands to Run)

### 1. Update graph.html to use new data
```bash
# Change data source from sop-graph.json to mortgage-sop-graph.json
sed -i "s|sop-graph.json|mortgage-sop-graph.json|g" public/graph.html
```

### 2. Add support for requirement nodes
Currently graph only handles: sop, atom, molecule, organism
Need to add: **requirement** type with different styling

### 3. Rebuild graph when SOPs change
```bash
# Add to CI/CD pipeline or git hooks
python3 scripts/build-mortgage-graph.py

# Or automate with file watcher
while inotifywait -e modify sops/mortgage/*.md; do
  python3 scripts/build-mortgage-graph.py
done
```

---

## 💡 Key Takeaways from Position Paper

1. **Graph databases answer questions, not just show structure**
   - Current graph: "Here are some nodes"
   - Improved graph: "3 SOPs need review this month, here they are"

2. **Multiple visualization patterns for different use cases**
   - Dependencies: Force-directed
   - Compliance: Bipartite
   - Reviews: Timeline
   - Impact: Radial/tree

3. **Metadata is first-class**
   - Show owner, criticality, review dates prominently
   - Make them queryable and filterable

4. **Pre-built queries reduce cognitive load**
   - Don't make users learn Cypher
   - Give them buttons: "Show me what needs attention"

5. **Real-time actionability**
   - Dashboard metrics: "3 overdue, 2 gaps"
   - Click to drill down
   - Notify owners directly

---

## 📚 References from Position Paper

**Tools mentioned:**
- Neo4j Bloom: Interactive exploration (we're using Cytoscape.js, similar)
- Graphviz: Static diagrams (could export to PDF)
- PuppyGraph: Multi-source integration (future: integrate with other systems)

**Query patterns:**
```cypher
// Find orphaned documents
MATCH (doc:Document)
WHERE NOT (doc)<-[:REFERENCES|DEPENDS_ON]-()
RETURN doc.title

// Requirements not covered
MATCH (req:Requirement)
WHERE NOT (req)<-[:IMPLEMENTS]-(:Document)
RETURN req.req_id

// Approval chain
MATCH (doc)-[:AUTHORED_BY]->(author)
OPTIONAL MATCH (doc)-[:REVIEWED_BY]->(reviewer)
RETURN author.name, collect(reviewer.name)
```

**All of these are applicable to our mortgage SOP graph!**

---

## ✅ Deliverables Checklist

- [x] Build real mortgage graph extractor
- [x] Generate graph with 23 nodes, 45 edges
- [ ] Update graph.html to use mortgage-sop-graph.json
- [ ] Add requirement node type support
- [ ] Implement multi-view switcher
- [ ] Add actionable query panel
- [ ] Add compliance matrix view
- [ ] Add review timeline view
- [ ] Add impact analysis query
- [ ] Test with real user workflows
- [ ] Document query patterns

**Estimated effort:** 4-6 hours for full implementation
**Priority order:** Data source update → Actionable queries → Multi-views
