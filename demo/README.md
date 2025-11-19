# Hybrid Construction Demo

**Interactive demonstration of the "docs as code" hybrid construction approach**

## Quick Start

Run the interactive demo:

```bash
cd demo
./hybrid-construction-demo.sh
```

The demo will walk you through:
1. Source molecule structure
2. Metadata and manifests
3. {{include}} syntax
4. Reusable atoms
5. Build process execution
6. Final assembled SOP
7. Before/after comparison
8. Visual composition graph
9. Benefits and advantages
10. Next steps

**Duration**: ~10 minutes (self-paced, interactive)

---

## What This Demo Shows

### The Core Concept

**Hybrid Construction** = Reusable Atoms + Inline Prose

```
Source Molecule (molecule-new-user-account-setup.md)
├─ Step 1: Gather info [Inline Prose]
├─ Step 2: Determine access [Inline Prose]
├─ Step 3: {{include: atom-step-create-ad-account}} ← ATOM
├─ Step 4: {{include: atom-step-create-email-account}} ← ATOM
├─ Step 5: {{include: atom-password-reset}} ← ATOM
├─ Step 6: {{include: atom-access-request-approval}} ← ATOM
└─ Step 7: Final verification [Inline Prose]

                    ⬇ BUILD PROCESS ⬇

Built SOP (dist/sops/sop-it-001.md)
├─ Step 1: Gather info [expanded inline prose]
├─ Step 2: Determine access [expanded inline prose]
├─ Step 3: [500+ lines of AD account creation procedure]
├─ Step 4: [400+ lines of email account creation procedure]
├─ Step 5: [200+ lines of password reset procedure]
├─ Step 6: [150+ lines of access approval procedure]
└─ Step 7: Final verification [expanded inline prose]

Result: Complete, executable SOP (1,806 lines)
```

### Visual Example

**Before Build** (source):
```markdown
### Step 3: Create Active Directory Account

{{include: atom-step-create-ad-account}}

---
```

**After Build** (assembled):
```markdown
### Step 3: Create Active Directory Account

---
# Core Metadata (Required)
id: atom-step-create-ad-account
type: atom
subtype: procedural-step
version: 1.0.0
title: Create Active Directory Account (Step)
---

# Create Active Directory Account (Procedural Step)

## Purpose
This step-level atom provides the standardized procedure for creating...

## Step Content

### Estimated Time
**10 minutes** per account

### Owner
**IT Provisioning Technician**

### Systems Required
- Active Directory Admin Console (ADSERVER01)
- IT Password Tool

### Prerequisites
- [ ] User information collected and validated
- [ ] No duplicate accounts exist

## Actions

1. **Open Active Directory Admin Console**
   - Server: ADSERVER01
   - Console: Active Directory Users and Computers

2. **Create New User Object**
   - Navigate to appropriate OU: Users > [Department] > Standard Users
   - Right-click > New > User
   - Fill in user details:
     - First name: [Legal first name]
     - Last name: [Legal last name]
     - User logon name: [first].[last] (all lowercase)

[... 480+ more lines ...]
```

---

## Demo Features

### 1. **Color-Coded Output**

The demo uses colors to highlight different concepts:

- 🔵 **Blue**: Headers and section titles
- 🟢 **Green**: Success messages and inline prose steps
- 🟡 **Yellow**: Info messages and workflow-specific content
- 🔷 **Cyan**: Reusable atoms and technical details
- 🟣 **Magenta**: Code blocks and examples

### 2. **Interactive Pacing**

- Press ENTER to advance to each step
- Read at your own pace
- Clear screen between sections for focus

### 3. **Real Build Execution**

The demo actually runs the build tool:

```bash
node tools/build.js sop-it-001
```

You'll see:
- Real-time loading of components
- Graph structure analysis
- Component processing
- Final SOP generation

### 4. **Before/After Comparisons**

Side-by-side views of:
- Source molecule (with {{include}})
- Built SOP (with atoms expanded)
- Line count comparison

### 5. **Visual Graph**

ASCII art representation of component composition:

```
SOP: sop-it-001
    └─► MOLECULE: molecule-new-user-account-setup
            ├─► Step 1: [Inline]
            ├─► Step 2: [Inline]
            ├─► Step 3: atom-step-create-ad-account (reusable)
            ├─► Step 4: atom-step-create-email-account (reusable)
            ├─► Step 5: atom-password-reset (reusable)
            ├─► Step 6: atom-access-request-approval (reusable)
            └─► Step 7: [Inline]
```

---

## Demo Files

| File | Purpose |
|------|---------|
| `hybrid-construction-demo.sh` | Main interactive demo script |
| `README.md` | This file |
| `examples/` | Before/after example snippets |
| `visual-guide.md` | Step-by-step visual walkthrough |

---

## Manual Exploration

If you prefer to explore manually instead of running the demo:

### View Source Molecule

```bash
cat ../sop-components/molecules/molecule-new-user-account-setup.md
```

Look for:
- Frontmatter: `composedOf`, `dependencies`, `constructionType`
- Components Used section
- {{include: atom-id}} references in steps

### View Reusable Atoms

```bash
# AD account creation atom
cat ../sop-components/atoms/atom-step-create-ad-account.md

# Email account creation atom
cat ../sop-components/atoms/atom-step-create-email-account.md
```

Look for:
- Full procedural steps
- Quality checkpoints
- Decision logic
- Troubleshooting guides

### Build the SOP

```bash
cd ..
node tools/build.js sop-it-001
```

### View Built Output

```bash
cat dist/sops/sop-it-001.md
```

Look for:
- Auto-generated header
- Components section
- Expanded atoms ({{include}} replaced with full content)

### Compare Source vs. Built

```bash
# Count lines in source molecule
wc -l sop-components/molecules/molecule-new-user-account-setup.md

# Count lines in built SOP
wc -l dist/sops/sop-it-001.md

# Find Step 3 in source
grep -A 3 "^### Step 3:" sop-components/molecules/molecule-new-user-account-setup.md

# Find Step 3 in built SOP
grep -A 30 "^### Step 3: Create Active Directory Account" dist/sops/sop-it-001.md | tail -1
```

---

## Key Concepts Demonstrated

### 1. **Hybrid Construction**

Not all steps need to be atoms. Choose wisely:

| Create Atom When | Write Inline When |
|-----------------|------------------|
| Used in 2+ workflows | Specific to this workflow |
| Technical procedure | Business logic/data collection |
| Must be identical everywhere | Can vary by context |
| Compliance-controlled | Workflow coordination |

### 2. **Component Composition**

Molecules declare what they're made of:

```yaml
composedOf: [
  atom-step-create-ad-account,
  atom-step-create-email-account,
  atom-password-reset
]

dependencies:
  - atom-step-create-ad-account (v1.0.0+)
  - atom-step-create-email-account (v1.0.0+)
```

### 3. **Build-Time Assembly**

```
Source Files → Build Tool → Assembled SOP

Molecule + Atoms → build.js → Complete Document
```

The build tool:
1. Loads graph structure
2. Loads all component files
3. Finds {{include: atom-id}} references
4. Loads referenced atoms
5. Recursively processes nested includes
6. Replaces {{include}} with atom content
7. Writes assembled SOP to dist/

### 4. **Reusability Tracking**

Atoms know where they're used:

```yaml
reusableIn: [
  molecule-new-user-account-setup,
  molecule-contractor-provisioning,
  molecule-employee-reinstatement
]
```

Graph tracks composition:

```json
{
  "edges": [
    {
      "source": "atom-step-create-ad-account",
      "target": "molecule-new-user-account-setup",
      "type": "component-of"
    }
  ]
}
```

### 5. **Version Management**

Each atom has independent version:

```yaml
# Atom
version: 1.0.0

# Molecule dependency
dependencies:
  - atom-step-create-ad-account (v1.0.0+)
```

Breaking changes increment major version. Molecules declare compatible versions.

---

## Real-World Impact

### Before Hybrid Construction

```
molecule-new-user-account-setup.md (677 lines)
molecule-contractor-provisioning.md (550 lines)
molecule-employee-reinstatement.md (480 lines)

All contain duplicate AD account creation procedure (120 lines each)
Total duplication: 360 lines across 3 files
```

**Problem**: Update AD procedure → Find and edit 3 files, risk inconsistency

### After Hybrid Construction

```
atom-step-create-ad-account.md (120 lines, used by 3 molecules)
molecule-new-user-account-setup.md (simplified, includes atom)
molecule-contractor-provisioning.md (simplified, includes atom)
molecule-employee-reinstatement.md (simplified, includes atom)
```

**Solution**: Update AD procedure → Edit 1 atom, rebuild all SOPs, consistency guaranteed

### Metrics

| Metric | Value |
|--------|-------|
| **Atoms created** | 2 (AD account, email account) |
| **Molecules using atoms** | 3+ (new hire, contractor, reinstatement) |
| **Lines of reusable code** | ~500 lines (2 atoms) |
| **Potential reuse** | 2-3 molecules per atom |
| **Maintenance reduction** | Edit 1 file instead of 3 |
| **Consistency improvement** | 100% (single source of truth) |

---

## Next Steps After Demo

### 1. Run the Full Demo

```bash
./hybrid-construction-demo.sh
```

### 2. Read Comprehensive Guide

```bash
cat ../docs/HYBRID-CONSTRUCTION-GUIDE.md
```

### 3. Try Building an SOP

```bash
cd ..
node tools/build.js sop-it-001
cat dist/sops/sop-it-001.md
```

### 4. Explore the Graph

```bash
cat graph/sop-graph.json | jq '.nodes | keys'
cat graph/sop-graph.json | jq '.edges | length'
```

### 5. Validate Everything

```bash
node tools/validate.js
```

### 6. Create Your Own Atom

Use the template:

```bash
cp templates/atom-template.md sop-components/atoms/atom-your-procedure.md
# Edit the atom
# Update graph.json
# Include in a molecule via {{include: atom-your-procedure}}
# Build and test
```

---

## Troubleshooting

### Demo Won't Run

**Error**: `bash: ./hybrid-construction-demo.sh: Permission denied`

**Solution**:
```bash
chmod +x hybrid-construction-demo.sh
./hybrid-construction-demo.sh
```

### Build Fails

**Error**: `Component 'atom-x' not found`

**Solution**:
- Check atom file exists in `sop-components/atoms/`
- Verify `id:` in frontmatter matches reference
- Update `graph/sop-graph.json` to include atom node

### Colors Not Showing

**Issue**: Demo shows escape codes instead of colors

**Solution**: Use a terminal that supports ANSI colors (most modern terminals do)

---

## Additional Resources

### Documentation

- **Comprehensive Guide**: `../docs/HYBRID-CONSTRUCTION-GUIDE.md`
- **Implementation Summary**: `../docs/HYBRID-CONSTRUCTION-SUMMARY.md`
- **Build Tool Source**: `../tools/build.js`
- **Graph Structure**: `../graph/sop-graph.json`

### Examples

- **Step Atom**: `../sop-components/atoms/atom-step-create-ad-account.md`
- **Hybrid Molecule**: `../sop-components/molecules/molecule-new-user-account-setup.md`
- **Built SOP**: `../dist/sops/sop-it-001.md`

### Templates

- **Atom Template**: `../templates/atom-template.md`
- **Molecule Template**: `../templates/molecule-template.md`

---

## Demo Sections

The interactive demo covers:

1. **Introduction** - Overview of hybrid construction
2. **Molecule Structure** - 4 atoms + 3 inline steps
3. **Metadata** - Manifests and dependencies
4. **{{include}} Syntax** - How references work
5. **Atom Example** - Inside a reusable atom
6. **Build Process** - Live execution of build tool
7. **Built Output** - Examining the result
8. **Comparison** - Before/after side-by-side
9. **Graph Visualization** - Component composition
10. **Benefits** - Why hybrid construction matters
11. **Try It Yourself** - Commands and next steps
12. **Summary** - Key takeaways

---

## Contributing

To improve this demo:

1. Suggest additional sections or examples
2. Report issues or unclear explanations
3. Contribute visual diagrams
4. Add more before/after comparisons

---

## License

Same as main project.

---

**Enjoy the demo!** 🎉

For questions or feedback, consult the comprehensive guide or open an issue.
