# Visual Transformation Guide

**How {{include}} References Become Complete Procedures**

---

## Overview

This guide shows the **visual transformation** that happens during the build process when `{{include: atom-id}}` references are expanded into complete procedures.

---

## The Build Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│  SOURCE FILES (Input)                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────┐                  │
│  │  Molecule                            │                  │
│  │  molecule-new-user-account-setup.md  │                  │
│  ├──────────────────────────────────────┤                  │
│  │  Step 1: [Inline Prose]             │                  │
│  │  Step 2: [Inline Prose]             │                  │
│  │  Step 3: {{include: atom-ad}}       │ ◄────┐           │
│  │  Step 4: {{include: atom-email}}    │ ◄──┐ │           │
│  │  Step 5: [Inline Prose]             │    │ │           │
│  └──────────────────────────────────────┘    │ │           │
│                                               │ │           │
│  ┌──────────────────────┐  ┌────────────────┴─┴──┐        │
│  │  Atom                │  │  Atom                │        │
│  │  atom-step-create-   │  │  atom-step-create-   │        │
│  │  ad-account.md       │  │  email-account.md    │        │
│  ├──────────────────────┤  ├─────────────────────-┤        │
│  │  [500 lines of       │  │  [400 lines of       │        │
│  │   AD procedure]      │  │   email procedure]   │        │
│  └──────────────────────┘  └──────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
                            ▼
          ┌─────────────────────────────────┐
          │   BUILD TOOL (Processing)       │
          │   tools/build.js                │
          ├─────────────────────────────────┤
          │                                 │
          │  1. Load graph structure        │
          │  2. Load all component files    │
          │  3. Find {{include}} references │
          │  4. Load referenced atoms       │
          │  5. Replace {{include}} with    │
          │     full atom content           │
          │  6. Recursively process nested  │
          │     includes                    │
          │  7. Assemble final document     │
          │                                 │
          └─────────────────────────────────┘
                            │
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  BUILT SOP (Output)                                         │
│  dist/sops/sop-it-001.md                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────┐              │
│  │  Complete SOP (1,806 lines)              │              │
│  ├──────────────────────────────────────────┤              │
│  │  Step 1: [50 lines inline prose]        │              │
│  │  Step 2: [80 lines inline prose]        │              │
│  │  Step 3: [500 lines AD procedure]       │ ◄── Expanded │
│  │  Step 4: [400 lines email procedure]    │ ◄── Expanded │
│  │  Step 5: [100 lines inline prose]       │              │
│  │  Step 6: [90 lines approval procedure]  │              │
│  │  Step 7: [87 lines inline prose]        │              │
│  └──────────────────────────────────────────┘              │
│                                                             │
│  ✓ Self-contained                                          │
│  ✓ Executable                                              │
│  ✓ Ready for compliance/audit                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step: How Step 3 Gets Expanded

### Step 1: Build Tool Reads Molecule

```
┌─────────────────────────────────────────┐
│  Reading: molecule-...setup.md          │
├─────────────────────────────────────────┤
│  ...                                    │
│  ### Step 3: Create AD Account         │
│                                         │
│  {{include: atom-step-create-ad-account}}│ ◄─── Found!
│                                         │
│  ---                                    │
│  ...                                    │
└─────────────────────────────────────────┘
         │
         │ Build tool detects {{include}} reference
         │
         ▼
```

### Step 2: Build Tool Extracts Atom ID

```
┌─────────────────────────────────────────┐
│  Parsing {{include}} syntax             │
├─────────────────────────────────────────┤
│                                         │
│  Pattern: {{include: (atom-id)}}        │
│                                         │
│  Extracted: "atom-step-create-ad-account"│
│                                         │
└─────────────────────────────────────────┘
         │
         │ Look up in loaded components
         │
         ▼
```

### Step 3: Build Tool Loads Atom File

```
┌─────────────────────────────────────────┐
│  Loading atom file                      │
├─────────────────────────────────────────┤
│                                         │
│  File: sop-components/atoms/            │
│        atom-step-create-ad-account.md   │
│                                         │
│  Size: 500+ lines                       │
│  Type: atom                             │
│  Subtype: procedural-step               │
│                                         │
└─────────────────────────────────────────┘
         │
         │ Read entire file content
         │
         ▼
```

### Step 4: Build Tool Performs Replacement

```
BEFORE:
┌──────────────────────────────┐
│  ### Step 3: Create AD Acct  │
│                              │
│  {{include: atom-step-...}}  │  ◄─── 3 lines
│                              │
│  ---                         │
└──────────────────────────────┘

        ⬇ REPLACE ⬇

AFTER:
┌──────────────────────────────┐
│  ### Step 3: Create AD Acct  │
│                              │
│  ---                         │
│  id: atom-step-create-ad-... │
│  type: atom                  │
│  version: 1.0.0              │
│  ---                         │
│                              │
│  # Create AD Account         │
│                              │
│  ## Purpose                  │
│  This step-level atom...     │
│                              │
│  ## Actions                  │
│  1. Open AD Console          │
│  2. Create User Object       │
│  3. Configure Settings       │
│  ...                         │
│  [480+ more lines]           │  ◄─── 500 lines
│                              │
│  ---                         │
└──────────────────────────────┘
```

---

## Parallel Processing: Multiple {{include}} References

The build tool processes **all {{include}} references** in the molecule:

```
Molecule File
│
├─ Step 1: [Inline] ───────────────► Rendered as-is
│
├─ Step 2: [Inline] ───────────────► Rendered as-is
│
├─ Step 3: {{include: atom-ad}} ───► Load atom-ad → Replace
│                                     ▼
│                                    [500 lines expanded]
│
├─ Step 4: {{include: atom-email}} ► Load atom-email → Replace
│                                     ▼
│                                    [400 lines expanded]
│
├─ Step 5: [Inline] ───────────────► Rendered as-is
│
├─ Step 6: {{include: atom-access}} ► Load atom-access → Replace
│                                      ▼
│                                     [150 lines expanded]
│
└─ Step 7: [Inline] ───────────────► Rendered as-is
```

---

## Recursive Processing

Atoms can include other atoms:

```
Level 1: Molecule
    │
    ├─ {{include: atom-A}}
    │       │
    │       └─ {{include: atom-B}} ◄─── Nested include
    │               │
    │               └─ [Content of atom-B]
    │
    └─ Final result includes both atom-A and atom-B content
```

**Example**:
```
molecule-new-user-account-setup
    │
    ├─ Step 5: Inline prose
    │       │
    │       └─ "This step uses: {{atom-password-reset}}"
    │                   │
    │                   └─ (textual reference, not formal {{include}})
    │
    └─ Build tool can handle both formal and textual references
```

---

## Graph Visualization of Composition

```
                         ┌──────────────────────┐
                         │   SOP: sop-it-001    │
                         │  (Root Document)     │
                         └──────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
         ┌────────────────┐  ┌────────────┐  ┌────────────┐
         │ atom-password  │  │ atom-access│  │  MOLECULE  │
         │    -reset      │  │  -approval │  │  new-user  │
         └────────────────┘  └────────────┘  └────────────┘
                                                    │
                    ┌───────────────────────────────┼───────────┐
                    │                               │           │
                    ▼                               ▼           ▼
           ┌──────────────┐              ┌──────────────┐  ┌─────────┐
           │ atom-step-   │              │ atom-step-   │  │ Inline  │
           │ create-ad-   │              │ create-email │  │  Steps  │
           │ account      │              │ -account     │  │ (1,2,7) │
           └──────────────┘              └──────────────┘  └─────────┘
                  │                              │
                  │                              │
                  ▼                              ▼
           [500 lines]                    [400 lines]

Legend:
  ■ = Root SOP
  ■ = Molecule (hybrid construction)
  ■ = Atom (reusable component)
  ■ = Inline prose (workflow-specific)
```

---

## Line Count Transformation

### Source Molecule (Before Build)

```
Step 1: Gather info              [ 50 lines]  Inline
Step 2: Determine access         [ 80 lines]  Inline
Step 3: {{include: atom-ad}}     [  3 lines]  ← Atom reference
Step 4: {{include: atom-email}}  [  3 lines]  ← Atom reference
Step 5: Configure password       [100 lines]  Inline
Step 6: Verify access            [ 90 lines]  Inline
Step 7: Final verification       [ 87 lines]  Inline
                                 ───────────
                     TOTAL:      ~413 lines
```

### Built SOP (After Build)

```
Step 1: Gather info              [ 50 lines]  Inline (unchanged)
Step 2: Determine access         [ 80 lines]  Inline (unchanged)
Step 3: [EXPANDED]               [500 lines]  ← Atom expanded!
Step 4: [EXPANDED]               [400 lines]  ← Atom expanded!
Step 5: Configure password       [100 lines]  Inline (unchanged)
Step 6: Verify access            [ 90 lines]  Inline (unchanged)
Step 7: Final verification       [ 87 lines]  Inline (unchanged)
                                 ───────────
                     TOTAL:     ~1,307 lines
                                 (molecule only)
```

**Full SOP** (with other components):
```
Auto-generated header            [  50 lines]
atom-password-reset             [200 lines]
atom-access-request-approval    [150 lines]
molecule-new-user-account-setup[1,307 lines]
Footer/metadata                 [ 99 lines]
                                ───────────
                     TOTAL:     1,806 lines
```

---

## Transformation Metrics

| Metric | Source | Built | Change |
|--------|--------|-------|--------|
| **Total lines** | 413 | 1,307 | +216% |
| **Step 3 lines** | 3 | 500 | +16,567% |
| **Step 4 lines** | 3 | 400 | +13,233% |
| **Inline steps** | 407 | 407 | No change |
| **Atom references** | 2 formal {{include}} | 0 (all expanded) | -100% |
| **Atoms loaded** | 0 (just references) | 2 (full content) | +2 |

---

## Benefits Visualized

### Single Source of Truth

```
┌────────────────────────────────────────────────────┐
│  Atom: atom-step-create-ad-account.md (v1.0.0)    │
│  [500 lines - THE authoritative AD procedure]     │
└────────────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
 ┌──────────┐  ┌──────────┐  ┌──────────┐
 │ SOP-IT   │  │ SOP-     │  │ SOP-     │
 │   -001   │  │ Contract │  │ Reinstate│
 │          │  │          │  │          │
 │ New Hire │  │Contractor│  │Returning │
 └──────────┘  └──────────┘  └──────────┘

Update atom once ──► Rebuild all 3 SOPs ──► All updated!
```

### Before Hybrid Construction (Problems)

```
┌──────────────────────────────────────────────────┐
│  SOP 1: molecule-new-hire.md                    │
│  Step 3: [AD procedure - 120 lines]             │ ◄─┐
└──────────────────────────────────────────────────┘   │
                                                       │
┌──────────────────────────────────────────────────┐   │
│  SOP 2: molecule-contractor.md                   │   │
│  Step 2: [AD procedure - 120 lines]             │ ◄─┼─ DUPLICATED!
└──────────────────────────────────────────────────┘   │
                                                       │
┌──────────────────────────────────────────────────┐   │
│  SOP 3: molecule-reinstate.md                    │   │
│  Step 1: [AD procedure - 120 lines]             │ ◄─┘
└──────────────────────────────────────────────────┘

Problem: Update AD procedure → Must find and edit 3 files
Risk: Version drift, inconsistency, copy-paste errors
```

### After Hybrid Construction (Solution)

```
┌──────────────────────────────────────────────────┐
│  Atom: atom-step-create-ad-account.md           │
│  [AD procedure - 120 lines - SINGLE SOURCE]     │
└──────────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌────────────┐  ┌────────────┐  ┌────────────┐
│ SOP 1      │  │ SOP 2      │  │ SOP 3      │
│ {{include}}│  │ {{include}}│  │ {{include}}│
└────────────┘  └────────────┘  └────────────┘

Solution: Update 1 atom → Build all SOPs → Consistency guaranteed
```

---

## Real-World Example: Updating a Procedure

### Scenario

AD admin updates password complexity requirements:
- **Old**: 12 characters minimum
- **New**: 16 characters minimum

### Before Hybrid Construction

```
1. Find all SOPs with AD account creation
   └─ Search codebase for "Active Directory"
   └─ Manually review 10+ files

2. Edit each SOP individually
   └─ molecule-new-hire.md (line 245)
   └─ molecule-contractor.md (line 189)
   └─ molecule-reinstate.md (line 123)

3. Test each SOP
   └─ Build sop-it-001
   └─ Build sop-it-005
   └─ Build sop-hr-012

4. Risk: Miss one file → inconsistent SOPs
```

### After Hybrid Construction

```
1. Edit 1 atom
   └─ atom-step-create-ad-account.md
   └─ Change line 105: "12 characters" → "16 characters"
   └─ Increment version: v1.0.0 → v1.1.0

2. Rebuild all SOPs
   └─ node tools/build.js

3. Done!
   └─ All 3 SOPs now have updated procedure
   └─ Consistency guaranteed (same atom)
   └─ Version tracked (v1.1.0)
```

**Time saved**: 80%
**Consistency**: 100%
**Version control**: Automatic

---

## Summary

The **transformation** from source to built SOP:

1. ✅ **{{include}} references** → Full atom content expanded inline
2. ✅ **3 lines** → 500+ lines (complete procedure)
3. ✅ **Atoms loaded** and **recursively processed**
4. ✅ **Inline prose** rendered as-is
5. ✅ **Final SOP** is self-contained and executable

The **benefits** of hybrid construction:

1. ✅ **Single source of truth** → Update once, propagate everywhere
2. ✅ **Reusability** → Same atom in 3+ SOPs
3. ✅ **Consistency** → No version drift or copy-paste errors
4. ✅ **Maintainability** → Smaller, focused files
5. ✅ **Version control** → Independent atom versioning
6. ✅ **Flexibility** → Choose atoms or inline based on reusability

---

**For more details**:
- Run the demo: `./hybrid-construction-demo.sh`
- Read the guide: `../docs/HYBRID-CONSTRUCTION-GUIDE.md`
- View examples: `before-build.md` and `after-build.md`
