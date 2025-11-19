# Quick Start Guide: Hybrid Construction Demo

**Get up and running in 2 minutes**

---

## Option 1: Run the Interactive Demo (Recommended)

```bash
cd demo
./hybrid-construction-demo.sh
```

**What you'll see:**
- 10-step interactive walkthrough
- Color-coded explanations
- Live build execution
- Before/after comparisons
- Visual diagrams

**Duration**: ~10 minutes (self-paced)

---

## Option 2: Manual Exploration

### 1. View Source Molecule

```bash
cat sop-components/molecules/molecule-new-user-account-setup.md | less
```

**Look for:**
- `{{include: atom-step-create-ad-account}}` ← Atom reference in Step 3
- `composedOf:` in frontmatter
- Inline prose in Steps 1, 2, 7

### 2. View Reusable Atom

```bash
cat sop-components/atoms/atom-step-create-ad-account.md | less
```

**Look for:**
- Full 500-line procedure
- Metadata: `reusable: true`, `usedIn: [...]`
- Actions, checkpoints, decision logic

### 3. Build the SOP

```bash
node tools/build.js sop-it-001
```

**Output:**
```
✓ Loaded 31 nodes and 21 edges
✓ Total components loaded: 32
✓ Built sop-it-001 → dist/sops/sop-it-001.md
```

### 4. View Built SOP

```bash
cat dist/sops/sop-it-001.md | less
```

**Look for:**
- Step 3: Full AD procedure (500 lines) ← {{include}} expanded!
- Auto-generated header
- Components section

### 5. Compare Before/After

```bash
# Step 3 in source (3 lines)
grep -A 3 "^### Step 3:" sop-components/molecules/molecule-new-user-account-setup.md

# Step 3 in built SOP (500 lines)
grep -n "^### Step 3: Create Active Directory" dist/sops/sop-it-001.md
# Then: sed -n '814,1314p' dist/sops/sop-it-001.md | less
```

---

## Option 3: Read the Examples

### Before Build
```bash
cat demo/examples/before-build.md
```

Shows source molecule with {{include}} references.

### After Build
```bash
cat demo/examples/after-build.md
```

Shows built SOP with atoms fully expanded.

### Visual Transformation
```bash
cat demo/examples/transformation-visual.md
```

ASCII diagrams showing the build process.

---

## Key Concepts (30-Second Summary)

### Hybrid Construction
**Atoms** (reusable) + **Inline Prose** (specific) = **Complete SOP**

### Source Molecule
```markdown
Step 3: Create AD Account
{{include: atom-step-create-ad-account}}
```
3 lines

### Built SOP
```markdown
Step 3: Create AD Account
[... 500 lines of complete AD procedure ...]
```
500 lines

### The Magic
- Edit atom once → Update 1 file
- Rebuild SOPs → All 3 workflows updated
- Consistency guaranteed → Same atom, same output

---

## Commands Cheat Sheet

```bash
# Run interactive demo
./demo/hybrid-construction-demo.sh

# Build one SOP
node tools/build.js sop-it-001

# Build all SOPs
node tools/build.js

# Validate structure
node tools/validate.js

# View source molecule
cat sop-components/molecules/molecule-new-user-account-setup.md

# View step atom
cat sop-components/atoms/atom-step-create-ad-account.md

# View built SOP
cat dist/sops/sop-it-001.md

# Compare line counts
wc -l sop-components/molecules/molecule-new-user-account-setup.md
wc -l dist/sops/sop-it-001.md

# Search for {{include}} references
grep -r "{{include:" sop-components/molecules/

# View graph structure
cat graph/sop-graph.json | jq '.nodes | keys'
```

---

## What to Explore

### 1. Documentation
- **Comprehensive guide**: `docs/HYBRID-CONSTRUCTION-GUIDE.md`
- **Implementation summary**: `docs/HYBRID-CONSTRUCTION-SUMMARY.md`
- **Demo README**: `demo/README.md`

### 2. Examples
- **Before build**: `demo/examples/before-build.md`
- **After build**: `demo/examples/after-build.md`
- **Visual guide**: `demo/examples/transformation-visual.md`

### 3. Source Files
- **Step atom**: `sop-components/atoms/atom-step-create-ad-account.md`
- **Hybrid molecule**: `sop-components/molecules/molecule-new-user-account-setup.md`
- **Built SOP**: `dist/sops/sop-it-001.md`

### 4. Tools
- **Build script**: `tools/build.js`
- **Validation script**: `tools/validate.js`
- **Graph structure**: `graph/sop-graph.json`

---

## Visual Overview

```
Source Files          Build Process           Built SOP
════════════          ═════════════           ═════════

Molecule              Load graph              Complete SOP
  ├─ Step 1           Load atoms              ├─ Step 1 [inline]
  ├─ Step 2           Find {{include}}        ├─ Step 2 [inline]
  ├─ {{include}}  →   Replace with atom   →   ├─ Step 3 [500 lines]
  ├─ {{include}}  →   Replace with atom   →   ├─ Step 4 [400 lines]
  ├─ Step 5           Keep inline             ├─ Step 5 [inline]
  └─ Step 7           Keep inline             └─ Step 7 [inline]

Atom files            Recursive process       1,806 lines total
  atom-ad.md          Assemble document       ✓ Self-contained
  atom-email.md       Write output            ✓ Executable
```

---

## Troubleshooting

### Demo won't run
```bash
chmod +x demo/hybrid-construction-demo.sh
```

### Build fails
```bash
# Check if node is installed
node --version

# Check if in correct directory
pwd  # Should be /home/user/SOPDemo

# Rebuild
node tools/build.js
```

### Can't find files
```bash
# List all atoms
ls -la sop-components/atoms/

# List all molecules
ls -la sop-components/molecules/

# List built SOPs
ls -la dist/sops/
```

---

## Next Steps

1. ✅ **Run the demo** to see it in action
2. ✅ **Read the guide** for comprehensive details
3. ✅ **Try building** an SOP yourself
4. ✅ **Explore the graph** to understand relationships
5. ✅ **Create your own** atom and molecule

---

## Questions?

- Check `docs/HYBRID-CONSTRUCTION-GUIDE.md` for detailed explanations
- Review `demo/README.md` for demo-specific help
- Examine example files in `demo/examples/`

---

**Ready to start?**

```bash
cd demo
./hybrid-construction-demo.sh
```

Enjoy! 🎉
