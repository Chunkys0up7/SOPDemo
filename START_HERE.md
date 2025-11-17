# 🚀 Quick Start Guide - SOP Demo

## ✅ You're Currently On The Right Branch!

Branch: `claude/semantic-ontology-governance-01Ak4SA8x2S4MtDJSb6G5A6T`

This is your **most recent work from yesterday** with the best UI.

---

## 📥 Getting the Latest Code

### If you're starting fresh:

```bash
# 1. Fetch all branches
git fetch --all

# 2. Checkout the semantic-ontology branch
git checkout claude/semantic-ontology-governance-01Ak4SA8x2S4MtDJSb6G5A6T

# 3. Pull latest changes
git pull origin claude/semantic-ontology-governance-01Ak4SA8x2S4MtDJSb6G5A6T
```

### If you're already on this branch (current situation):

```bash
# Just pull any updates
git pull origin claude/semantic-ontology-governance-01Ak4SA8x2S4MtDJSb6G5A6T
```

---

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

**Note:** You may see 3 moderate severity vulnerabilities. These are in dev dependencies and won't affect the demo.

### 2. Build the SOPs

```bash
npm run build
```

This will:
- Load 25 nodes and 16 edges from the graph
- Build 7 SOPs from modular components
- Generate build reports in `dist/`

**Expected Output:**
```
✓ Successful: 7
```

### 3. Start the Server

```bash
npm start
```

**OR**

```bash
npm run serve:enhanced
```

The server will start on `http://localhost:8080`

---

## 🌐 Available Pages

Once the server is running, open these URLs:

### 🏠 Main Dashboard (Start Here!)
```
http://localhost:8080/public/index.html
```
Your main homepage with navigation to all features.

### 📋 SOP Workspace
```
http://localhost:8080/public/workspace.html
```
View and edit SOPs in a functional workspace.

### 🕸️ Interactive Dependency Graph
```
http://localhost:8080/public/graph.html
```
Explore SOP relationships with Cytoscape.js powered visualization.

### ❓ Help & Guide
```
http://localhost:8080/public/help.html
```
Comprehensive help system with glossary and tooltips.

### 🔍 Search
```
http://localhost:8080/public/search.html
```
Search through SOPs and components.

### ➕ Contribute
```
http://localhost:8080/public/contribute.html
```
Guide for contributing new SOPs.

---

## 🔌 API Endpoints

The enhanced server provides these APIs:

### RAG Assistant
```bash
POST http://localhost:8080/api/assistant/query
GET  http://localhost:8080/api/assistant/health
GET  http://localhost:8080/api/assistant/stats
```

### SOP Metrics
```bash
GET http://localhost:8080/api/sops/metrics
GET http://localhost:8080/api/sops/quality
```

---

## 🛠️ Development Commands

### Validate the SOP ecosystem
```bash
npm run validate
```

### Analyze impact of changes
```bash
npm run impact -- <component-id>

# Example:
npm run impact -- atom-welcome-message
```

### Generate visualizations
```bash
npm run visualize

# Specific formats:
npm run visualize -- --format=html
npm run visualize -- --format=mermaid
```

### Run linting
```bash
npm run lint:md          # Check markdown
npm run lint:md:fix      # Auto-fix markdown
npm run spellcheck       # Check spelling
npm run check:all        # Run all checks
```

---

## 📁 Project Structure

```
SOPDemo/
├── public/               # Web UI (your current work)
│   ├── index.html       # Main dashboard
│   ├── workspace.html   # SOP workspace
│   ├── graph.html       # Interactive graph
│   ├── help.html        # Help system
│   └── assets/          # Styles, images, scripts
│
├── sop-components/      # Modular SOP components
│   ├── atoms/           # Smallest units
│   ├── molecules/       # Combined units
│   └── organisms/       # Complete workflows
│
├── graph/               # Graph database
│   └── sop-graph.json  # Node and edge definitions
│
├── tools/               # Build & automation tools
│   ├── build.js
│   ├── validate.js
│   ├── impact-analysis.js
│   ├── visualize.js
│   └── serve-enhanced.js
│
└── dist/                # Build output
    ├── sops/            # Built SOPs
    └── visualizations/  # Generated graphs
```

---

## 🎯 What to Demo

### 1. Interactive Graph (Best Feature!)
- Go to `http://localhost:8080/public/graph.html`
- See the Cytoscape.js powered dependency visualization
- Click nodes to explore relationships

### 2. Help System
- Go to `http://localhost:8080/public/help.html`
- Comprehensive glossary
- Tooltips explaining atomic design concepts

### 3. SOP Workspace
- Go to `http://localhost:8080/public/workspace.html`
- View SOPs in a functional workspace
- See component composition

### 4. Atomic Design
- Navigate through the UI to see:
  - Atoms (small components)
  - Molecules (combined components)
  - Organisms (complete workflows)

---

## 🚨 Troubleshooting

### Server won't start
```bash
# Check if port 8080 is in use
lsof -i :8080

# Or try a different port
npm run serve -- --port=3000
```

### Build fails
```bash
# Validate the graph structure first
npm run validate

# Then try building again
npm run build
```

### Missing components warnings
This is normal. The warnings show components that are referenced but not fully implemented yet.

---

## 🔀 Switching Branches

Want to see features from other branches? See `BRANCH_GUIDE.md` for details.

### Quick switch to templates branch:
```bash
git checkout claude/configure-sop-templates-01SQV2SCohxSZZM6HFpDsUyV
npm install
npm run build
npm start
```

---

## 📊 What's Working

✅ Interactive dependency graph with Cytoscape.js
✅ Help system with tooltips and glossary
✅ Clean, modern UI with Pursuit Bank branding
✅ SOP workspace for viewing/editing
✅ Build system assembling SOPs from components
✅ Impact analysis for change tracking
✅ Validation tools
✅ Multiple visualization formats

---

## 🎓 Key Features to Highlight

### 1. Graph-Based Architecture
SOPs are nodes in a dependency graph, allowing for:
- Impact analysis before changes
- Automatic dependency tracking
- Visual exploration of relationships

### 2. Atomic Design
Components organized as:
- **Atoms:** Smallest reusable units
- **Molecules:** Combinations of atoms
- **Organisms:** Complete workflows
- **SOPs:** Full procedures assembled from components

### 3. Docs-as-Code
- Version control with Git
- Automated builds and validation
- CI/CD integration ready
- Pull request workflows

---

## 💡 Next Steps

1. **Open the dashboard:** `http://localhost:8080/public/index.html`
2. **Explore the graph:** Click through to the graph viewer
3. **Read the help:** Check out the comprehensive help system
4. **Review BRANCH_GUIDE.md:** Understand what's in other branches
5. **Decide on merging:** Let me know if you want features from other branches

---

## 📞 Need Help?

Created comprehensive guides:
- `BRANCH_GUIDE.md` - What's in each branch
- `README.md` - Full project documentation
- `START_HERE.md` - This file!

---

**🎉 You're all set! The server should be running. Open http://localhost:8080/public/index.html to get started!**
