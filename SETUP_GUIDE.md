# SOP Ecosystem - Complete Setup Guide

Step-by-step instructions for installing and running the Pursuit Bank SOP Management System on a new PC.

---

## 📋 Prerequisites

Before you begin, ensure you have:

### Required Software

1. **Node.js** (v18.x or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **Git** (for cloning the repository)
   - Download: https://git-scm.com/download/win
   - Verify: `git --version`

3. **npm** (comes with Node.js)
   - Verify: `npm --version`

---

## 🚀 Quick Start - Automated Setup (Windows)

### Option 1: One-Click Setup

1. **Download the setup script** from the repository:
   - Direct link: https://github.com/Chunkys0up7/SOPDemo/raw/main/setup.bat
   - Or clone the repo first and run `setup.bat`

2. **Run setup.bat**:
   ```cmd
   setup.bat
   ```

3. The script automatically:
   - ✅ Checks for Node.js and Git
   - ✅ Clones repository from GitHub
   - ✅ Installs all dependencies
   - ✅ Starts the development server

4. **Access the application**:
   - Browser opens automatically to: http://localhost:8080

---

## 🛠️ Manual Setup (All Platforms)

If you prefer manual setup or are on macOS/Linux:

### Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/Chunkys0up7/SOPDemo.git

# Navigate to project directory
cd SOPDemo
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required Node.js packages (may take 1-2 minutes).

### Step 3: Generate Test Data (Optional but Recommended)

```bash
node tools/generate-realistic-data.js
```

This creates:
- **42 Atoms** (forms, templates, policies)
- **18 Molecules** (combined procedures)
- **8 Organisms** (complex processes)
- **10 SOPs** (complete standards)
- **122 Edges** (dependency relationships)

### Step 4: Start the Development Server

```bash
npm start
```

Server starts on port 8080 by default.

### Step 5: Open the Application

Open your browser to: **http://localhost:8080**

The dashboard loads automatically!

---

## 🌐 Application Structure

### Main Entry Point
**http://localhost:8080** → Auto-redirects to `/public/index.html` (Dashboard)

### Available Pages

| Page | URL | Description |
|------|-----|-------------|
| **Dashboard** | `/public/index.html` | Central hub with navigation |
| **Interactive Graph** | `/public/interactive-graph.html` | D3.js force-directed visualization (78 nodes) |
| **Impact Analysis** | `/public/impact-viewer.html` | Change propagation with risk scoring |
| **Component Library** | `/public/components-library.html` | Browse components with reuse metrics |
| **Workspace** | `/public/workspace.html` | View and manage SOPs |
| **Create SOP** | `/public/contribute.html` | AI-assisted SOP creation |
| **Semantic Search** | `/public/search.html` | Natural language queries |
| **Help** | `/public/help.html` | User guide |

---

## 📁 Project Structure

```
SOPDemo/
├── 📂 public/                       Frontend files (HTML/CSS/JS)
│   ├── index.html                   Main dashboard
│   ├── interactive-graph.html       D3.js graph viewer ⭐ NEW
│   ├── impact-viewer.html           Impact analysis tool ⭐ NEW
│   ├── components-library.html      Component browser ⭐ NEW
│   ├── workspace.html               SOP workspace
│   ├── contribute.html              SOP creation
│   ├── search.html                  Semantic search
│   └── assets/                      CSS, JS, images, branding
│
├── 📂 graph/                        Graph data files
│   ├── sop-graph.json              Main graph (78 nodes, 122 edges)
│   └── mortgage-sop-graph.json     Mortgage-specific graph
│
├── 📂 tools/                        Build and utility scripts
│   ├── build.js                    SOP assembly from components
│   ├── generate-realistic-data.js  Dataset generator
│   ├── convert-graph-format.js     Format converter (array ↔ object)
│   ├── serve-enhanced.js           Production server with APIs
│   └── serve.js                    Basic development server
│
├── 📂 sops/                         SOP markdown files
│   └── mortgage/                   Mortgage SOPs
│
├── 📂 components/                   Reusable atomic components
│   ├── atoms/                      Basic elements
│   ├── molecules/                  Combined elements
│   └── organisms/                  Complex components
│
├── 📂 dist/                         Built/generated files
├── 📂 server/                       Backend API
├── 📄 package.json                  Dependencies and scripts
├── 📄 setup.bat                     Windows setup script ⭐
└── 📄 SETUP_GUIDE.md                This file ⭐
```

---

## 🔧 Available npm Commands

```bash
# Start development server (enhanced with APIs)
npm start

# Start basic development server
npm run serve

# Build SOPs from components
npm run build

# Validate graph schema
npm run validate

# Generate PDF documentation
npm run generate:pdf

# Run compliance report
npm run compliance-report
```

---

## 🌍 API Endpoints

The enhanced server provides REST API endpoints:

### Assistant (RAG-Powered)
- `POST /api/assistant/query` - Natural language SOP queries
- `GET /api/assistant/health` - Service health check
- `GET /api/assistant/stats` - Usage statistics

### SOP Management
- `GET /api/sops/metrics` - SOP metrics dashboard
- `GET /api/sops/quality` - Quality analytics
- `POST /api/sops/create` - Create new SOP

---

## 📊 Understanding the Data

### Graph Data Format

Located at `/graph/sop-graph.json`:

```json
{
  "nodes": {
    "atom-access-request-form": {
      "id": "atom-access-request-form",
      "type": "atom",
      "title": "System Access Request Form",
      "department": "IT",
      "version": "1.2.0"
    },
    "molecule-onboarding-checklist": {
      "id": "molecule-onboarding-checklist",
      "type": "molecule",
      "composedOf": ["atom-access-request-form", "atom-equipment-form"]
    }
  },
  "edges": [
    {
      "source": "atom-access-request-form",
      "target": "molecule-onboarding-checklist",
      "type": "composedOf"
    }
  ]
}
```

### Node Types

| Type | Description | Count | Examples |
|------|-------------|-------|----------|
| **Atom** | Basic building blocks | 42 | Forms, templates, policies |
| **Molecule** | Combined atoms | 18 | Procedures, checklists |
| **Organism** | Complex processes | 8 | Onboarding, incident response |
| **SOP** | Complete standards | 10 | Employee onboarding SOP |

---

## 🎯 Key Features

### ✅ Complete Navigation
- All pages accessible from http://localhost:8080
- Dashboard with navigation header + quick action cards
- Back navigation on all visualization pages
- No dead links or orphaned pages

### ✅ Interactive Visualizations
- **Interactive Graph**: D3.js force-directed layout with 78 nodes
  - Drag, zoom, pan controls
  - Search and filter by type
  - Color-coded nodes (Atoms=blue, Molecules=purple, Organisms=green, SOPs=red)

- **Impact Analysis**: Change propagation viewer
  - Select any component to see downstream impact
  - Risk scoring: Critical/High/Medium/Low
  - Tree visualization of affected nodes
  - Recommendation engine

- **Component Library**: Browse all components
  - Reuse metrics and statistics
  - Search and filter capabilities
  - Usage percentage visualization

### ✅ Comprehensive Data
- 78 nodes across 4 types (Atom/Molecule/Organism/SOP)
- 122 dependency relationships
- 10 enterprise scenarios covered
- Realistic metadata (departments, versions, compliance frameworks)

---

## 🔍 Troubleshooting

### Port Already in Use

```bash
# Use a different port
npm start -- --port=3000
```

### Dependencies Won't Install

```bash
# Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Graph Data Not Loading

```bash
# Regenerate the graph data
node tools/generate-realistic-data.js
```

### Server Won't Start

```bash
# Check Node.js version (need v18+)
node --version

# If too old, update Node.js from nodejs.org
```

### Visualizations Not Working

1. Check browser console (F12) for JavaScript errors
2. Ensure `/graph/sop-graph.json` is accessible
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private window

---

## 📝 Development Workflow

1. **Clone** the repository (first time only)
2. **Install** dependencies: `npm install`
3. **Generate** test data: `node tools/generate-realistic-data.js`
4. **Start** server: `npm start`
5. **Develop**: Edit files in `public/`, `tools/`, or `sops/`
6. **Test**: Refresh browser (server auto-serves latest files)
7. **Commit**: `git add .` → `git commit` → `git push`

---

## 🏗️ System Architecture

### Frontend Layer
- **Tech**: Pure HTML/CSS/JavaScript (no build step)
- **Viz**: D3.js for graphs, native CSS for UI
- **Design**: Responsive, mobile-friendly

### Backend Layer
- **Server**: Node.js HTTP server (native module)
- **APIs**: REST endpoints with JSON responses
- **RAG**: Mock vector database for semantic search

### Data Layer
- **Format**: JSON files (version-controlled in Git)
- **Structure**: Object-based nodes for O(1) lookup
- **Validation**: JSON schema validation available

---

## ✅ Post-Setup Verification

After setup, verify everything works:

**Basic Checks:**
- [ ] Server starts on port 8080
- [ ] Dashboard loads at http://localhost:8080
- [ ] Navigation header has 7 links (Dashboard, Interactive Graph, Impact, Library, Workspace, Contribute, Help)
- [ ] Quick actions show 6 cards

**Feature Checks:**
- [ ] Interactive Graph displays 78 nodes
- [ ] Impact Analysis loads component dropdown
- [ ] Component Library shows all components with metrics
- [ ] All visualization pages have "Back to Dashboard" button
- [ ] Search bar redirects to search.html
- [ ] Graph data accessible at /graph/sop-graph.json

**Navigation Checks:**
- [ ] Click each nav header link - all work
- [ ] Click each quick action card - all work
- [ ] Click "Back to Dashboard" on viz pages - returns to dashboard
- [ ] No 404 errors or dead links

---

## 🎓 Getting Started Guide

### For First-Time Users

1. **Start at the Dashboard** (http://localhost:8080)
   - Familiarize yourself with the navigation header
   - Review the quick action cards

2. **Explore Interactive Graph**
   - Click "Interactive Graph" quick action
   - Use search to find specific nodes
   - Drag nodes to rearrange
   - Filter by type (Atoms, Molecules, Organisms, SOPs)

3. **Try Impact Analysis**
   - Click "Impact Analysis"
   - Select a component (e.g., "atom-access-request-form")
   - Click "Analyze Impact"
   - See what would break if you change it

4. **Browse Component Library**
   - Click "Component Library"
   - See reuse metrics for each component
   - Search for specific components
   - Sort by usage

5. **Use the Workspace**
   - View available SOPs
   - See dependency graphs
   - Generate processes

---

## 📚 Additional Documentation

- **ARCHITECTURE.md** - System design and technical decisions
- **DELIVERY_SUMMARY.md** - Feature delivery report
- **GRAPH_FIXES.md** - Graph-related technical fixes
- **README.md** - Project overview

---

## 🆘 Getting Help

If you encounter issues:

1. **Check this guide** - Most common issues covered in Troubleshooting
2. **Review browser console** - F12 to open DevTools, check Console tab
3. **Check server logs** - Terminal shows server output and errors
4. **Verify prerequisites** - Ensure Node.js v18+ and Git installed
5. **Try manual setup** - If automated setup fails, follow manual steps

---

## 📄 Quick Reference

### Essential URLs
- **Dashboard**: http://localhost:8080
- **Interactive Graph**: http://localhost:8080/public/interactive-graph.html
- **Impact Analysis**: http://localhost:8080/public/impact-viewer.html
- **Component Library**: http://localhost:8080/public/components-library.html
- **Graph Data**: http://localhost:8080/graph/sop-graph.json

### Essential Commands
```bash
git clone https://github.com/Chunkys0up7/SOPDemo.git
cd SOPDemo
npm install
npm start
```

### Data Stats
- 78 total nodes (42 atoms + 18 molecules + 8 organisms + 10 SOPs)
- 122 dependency edges
- 10 enterprise scenarios
- Object format for O(1) node lookup

---

**Repository**: https://github.com/Chunkys0up7/SOPDemo
**Last Updated**: 2025-11-30
**Version**: 1.0.0
**License**: MIT (Demo Project)
