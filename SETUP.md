# 🚀 Setup Guide - SOP Ecosystem

Complete step-by-step guide to get the SOP ecosystem running on your machine.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** v18 or higher ([Download](https://nodejs.org/))
- ✅ **Git** ([Download](https://git-scm.com/downloads))
- ✅ **Terminal** (Command Prompt, PowerShell, Terminal, etc.)
- ✅ **Text Editor** (VS Code, Sublime, etc.) - optional but recommended

### Check Your Versions

Open your terminal and run:

```bash
node --version   # Should show v18.0.0 or higher
npm --version    # Should show 9.0.0 or higher
git --version    # Should show any recent version
```

If any command fails, install the missing software from the links above.

---

## 🔧 Step 1: Clone the Repository

### Option A: If you have the repository URL

```bash
# Navigate to where you want the project
cd ~/Documents  # or wherever you keep projects

# Clone the repository
git clone <repository-url>
cd SOPDemo
```

### Option B: If starting from the files on this branch

```bash
# The project is already on branch: claude/build-poc-011CV4d4gq6bpNjpdRAfGT35
git checkout claude/build-poc-011CV4d4gq6bpNjpdRAfGT35
```

---

## 📦 Step 2: Install Dependencies

```bash
# Make sure you're in the project root directory
cd SOPDemo  # if not already there

# Install required packages
npm install
```

**Expected output:**

```
added 2 packages, and audited 3 packages in 2s
found 0 vulnerabilities
```

**Packages installed:**

- `marked` - For markdown rendering
- `js-yaml` - For YAML parsing

---

## ✅ Step 3: Verify Installation

Let's make sure everything is set up correctly:

### 3.1: Check Project Structure

```bash
ls -la
```

**You should see:**

```
.git/
.github/
config/
dist/
graph/
sop-components/
templates/
tools/
.gitignore
package.json
README.md
```

### 3.2: Verify Tools are Executable

```bash
# On Linux/Mac
chmod +x tools/*.js

# Test that Node can run the tools
node tools/validate.js --help 2>/dev/null || echo "Tools are ready"
```

---

## 🧪 Step 4: Run Validation

This checks that all components and graph structure are correct.

```bash
npm run validate
```

**Expected output:**

```
═══════════════════════════════════════════════
        SOP Validation Tool
═══════════════════════════════════════════════

📊 Loading and validating graph structure...
  ✓ Graph JSON is valid

📦 Loading component files...
  ✓ Loaded 18 components

🔍 Validating graph structure...
  ✓ Graph has required fields
  ✓ Validated 25 nodes
  ✓ Validated 16 edges

🔗 Validating component references...
  ✓ Component references validated

🔄 Checking for circular dependencies...
  ✓ No circular dependencies found

📌 Validating versions...
  ✓ Version format validation complete

📋 Validating metadata completeness...
  ✓ Metadata completeness check complete

STATUS: ✓ VALIDATION PASSED
```

**✅ If you see "VALIDATION PASSED" - Perfect! Continue to next step.**

**❌ If validation fails:**

- Make sure you're in the correct directory
- Try `npm install` again
- Check that all files were cloned correctly

---

## 🏗️ Step 5: Build the SOPs

This assembles all SOPs from their modular components.

```bash
npm run build
```

**Expected output:**

```
═══════════════════════════════════════════
   SOP Builder - Modular Documentation
═══════════════════════════════════════════

📊 Loading SOP graph structure...
✓ Loaded 25 nodes and 16 edges

📦 Loading modular components...
  ✓ Loaded 9 atoms
  ✓ Loaded 6 molecules
  ✓ Loaded 3 organisms
✓ Total components loaded: 18

🏗️  Building all SOPs...

🔨 Building sop-001: User Onboarding Process
  → Including component: atom-welcome-message
  → Including component: molecule-account-setup
  → Including component: organism-first-day-workflow
  ✓ Built sop-001 → /path/to/dist/sops/sop-001.md

[... builds sop-002 through sop-007 ...]

Build Summary
═══════════════════════════════════════════
✓ Successful: 7
```

**Check the output:**

```bash
ls -lh dist/sops/
```

**You should see 7 SOP files:**

```
sop-001.md    16K
sop-002.md    25K
sop-003.md   2.3K
sop-004.md   6.3K
sop-005.md    40K   ← Largest one!
sop-006.md   9.9K
sop-007.md    21K
```

---

## 🔍 Step 6: Test Impact Analysis

See what happens when you change a component:

```bash
npm run impact -- atom-access-request-form
```

**Expected output:**

```
═══════════════════════════════════════════════
     SOP Impact Analysis - Change Propagation
═══════════════════════════════════════════════

🔍 Analyzing impact of changes to: atom-access-request-form

⚛️ atom-access-request-form: System Access Request Form
  Type: atom
  Version: 2.1.0
  Risk Level: MEDIUM

  Direct Impacts: 3

  Used By Components/SOPs:
    → sop-002 (IT System Access Provisioning)
    → molecule-account-setup (User Account Setup Process)
    → molecule-credential-creation (Credential Creation Procedure)

  ⤷ Downstream Impacts:
    [shows all affected SOPs and components...]
```

**Try analyzing different components:**

```bash
npm run impact -- atom-confidentiality-agreement
npm run impact -- molecule-approval-chain
npm run impact -- sop-005
```

---

## 🎨 Step 7: Generate Visualizations

Create visual representations of the SOP graph:

### 7.1: HTML Interactive Visualization

```bash
npm run visualize -- --format=html
```

**Output:**

```
✓ Visualization saved to: /path/to/dist/visualizations/sop-graph.html

🌐 Open in browser: file:///path/to/dist/visualizations/sop-graph.html
```

**Open the file:**

- **Mac**: `open dist/visualizations/sop-graph.html`
- **Linux**: `xdg-open dist/visualizations/sop-graph.html`
- **Windows**: `start dist/visualizations/sop-graph.html`

**Or manually**: Navigate to `dist/visualizations/` and double-click `sop-graph.html`

### 7.2: Mermaid Diagram (for GitHub)

```bash
npm run visualize -- --format=mermaid
```

Creates: `dist/visualizations/sop-graph.mermaid.md`

**View it:**

```bash
cat dist/visualizations/sop-graph.mermaid.md
```

### 7.3: ASCII Art (terminal view)

```bash
npm run visualize -- --format=ascii
```

**Displays graph directly in your terminal!**

---

## 🌐 Step 8: Start the Development Server

Launch a local web server to browse SOPs:

```bash
npm run serve
```

**Expected output:**

```
═══════════════════════════════════════════════
     SOP Documentation Server
═══════════════════════════════════════════════

🌐 Server running at: http://localhost:8080
📂 Serving from: /path/to/SOPDemo

Press Ctrl+C to stop
```

**Open in your browser:**

```
http://localhost:8080
```

**You'll see:**

- Dashboard with statistics
- List of all built SOPs
- List of visualizations
- Quick action buttons

**Click on any SOP to view it!**

**Stop the server:** Press `Ctrl+C` in the terminal

---

## 🎯 Step 9: Explore the Built SOPs

### View a Built SOP

```bash
# View the largest SOP (Comprehensive HR Onboarding)
head -100 dist/sops/sop-005.md

# Or open in your text editor
code dist/sops/sop-005.md    # VS Code
subl dist/sops/sop-005.md    # Sublime
nano dist/sops/sop-005.md    # Nano
```

### View the Graph Structure

```bash
# Pretty-print the graph
cat graph/sop-graph.json | python -m json.tool | head -50

# Or open in editor
code graph/sop-graph.json
```

### View a Component

```bash
# View an atom
cat sop-components/atoms/welcome-message.md

# View a molecule
cat sop-components/molecules/benefits-enrollment.md

# View an organism
cat sop-components/organisms/complete-hr-onboarding.md
```

---

## 📚 Step 10: Read the Documentation

Open these files to understand the system:

```bash
# Main documentation
code README.md           # Complete user guide

# Review and analysis
code REVIEW.md          # Deep dive review
code REVIEW_SUMMARY.md  # Quick summary

# Test data info
code TEST_DATA.md       # About the test data

# Quick fixes guide
code QUICK_FIXES.md     # Known issues and solutions
```

---

## 🔄 Common Workflows

### Workflow 1: Modify a Component and Rebuild

```bash
# 1. Edit a component
code sop-components/atoms/welcome-message.md

# 2. Validate your changes
npm run validate

# 3. Rebuild affected SOPs
npm run build

# 4. Check impact
npm run impact -- atom-welcome-message

# 5. View in browser
npm run serve
# Then visit http://localhost:8080
```

### Workflow 2: Add a New Component

```bash
# 1. Copy a template
cp templates/atom-template.md sop-components/atoms/new-component.md

# 2. Edit the new component
code sop-components/atoms/new-component.md

# 3. Add to graph
code graph/sop-graph.json
# Add node definition and edges

# 4. Validate
npm run validate

# 5. Build
npm run build
```

### Workflow 3: Analyze Dependencies

```bash
# See what depends on a component
npm run impact -- atom-access-request-form

# Check all relationships visually
npm run visualize -- --format=html
# Open in browser and use filters
```

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org/

### Problem: "Cannot find module 'marked'"

**Solution:**

```bash
npm install
```

### Problem: "Validation failed"

**Solution:**

```bash
# Check what's wrong
npm run validate

# Look at the error message
# Usually it's a missing component or broken reference in graph/sop-graph.json
```

### Problem: "Build creates empty files"

**Solution:**

```bash
# Make sure components directory exists
ls -la sop-components/

# Make sure tools are executable
chmod +x tools/*.js

# Try clean rebuild
rm -rf dist/
npm run build
```

### Problem: "Server won't start"

**Solution:**

```bash
# Port 8080 might be in use
npm run serve -- --port=3000

# Or kill the process using port 8080
# Mac/Linux:
lsof -ti:8080 | xargs kill

# Windows:
netstat -ano | findstr :8080
# Then: taskkill /PID <PID> /F
```

### Problem: "Impact analysis shows errors"

**Solution:**

```bash
# Make sure graph is valid
npm run validate

# Try with a known-good component
npm run impact -- atom-welcome-message
```

### Problem: "Visualizations not generating"

**Solution:**

```bash
# Check dist directory exists
mkdir -p dist/visualizations

# Try each format separately
npm run visualize -- --format=html
npm run visualize -- --format=mermaid
npm run visualize -- --format=ascii
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] ✅ `npm run validate` passes (25 nodes, 16 edges, 0 errors)
- [ ] ✅ `npm run build` creates 7 SOPs in `dist/sops/`
- [ ] ✅ `npm run impact -- atom-access-request-form` shows impacts
- [ ] ✅ `npm run visualize -- --format=html` creates visualization
- [ ] ✅ `npm run serve` starts server at http://localhost:8080
- [ ] ✅ Browser shows dashboard with SOPs and visualizations
- [ ] ✅ Clicking SOPs opens them in browser
- [ ] ✅ All documentation files (README.md, etc.) are readable

**If all items are checked, you're ready to go!** 🎉

---

## 🎓 Next Steps

### 1. Explore the System

- Open the interactive HTML visualization
- Click through SOPs in the web server
- Run impact analysis on different components
- Read through the test data documentation

### 2. Learn the Architecture

- Read `README.md` for complete overview
- Check `TEST_DATA.md` for component details
- Review `REVIEW.md` for deep analysis

### 3. Try Making Changes

- Modify a component
- Add a new atom using the template
- Update the graph structure
- Rebuild and see the changes

### 4. Understand the Tools

- Study `tools/build.js` to see how assembly works
- Review `tools/impact-analysis.js` for dependency tracking
- Examine `tools/visualize.js` for graph generation

---

## 🚀 Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run validate` | Check graph and components |
| `npm run build` | Build all SOPs |
| `npm run impact -- <node-id>` | Analyze change impact |
| `npm run visualize` | Generate visualizations |
| `npm run serve` | Start web server |

**All commands should be run from the project root directory.**

---

## 📞 Getting Help

- **Documentation**: Start with `README.md`
- **Issues**: Check `QUICK_FIXES.md` for common problems
- **Examples**: See `TEST_DATA.md` for use cases
- **Architecture**: Read `REVIEW.md` for deep dive

---

**You're all set! Enjoy exploring the SOP ecosystem!** 🎉

Last updated: 2025-11-12
