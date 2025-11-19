# Hybrid Document Construction Guide

## Overview

This guide explains the **hybrid construction approach** for building SOPs from modular components. This approach balances maximum reusability with practical workflow-specific content.

**Last Updated**: 2025-11-19
**Version**: 1.0.0

---

## The Docs-as-Code Paradigm

The SOP system follows the "docs as code" philosophy where:
- **Documents are assembled from components**, not written as monoliths
- **Components are versioned** independently in Git
- **Reusable components** are stored once and included many times
- **Build tools** compile components into complete, publishable documents

This enables:
- ✅ **Single source of truth**: Update once, propagate everywhere
- ✅ **Version control**: Track changes at component level
- ✅ **Consistency**: Same procedure rendered identically across all SOPs
- ✅ **Modularity**: Mix and match components to create new workflows

---

## Component Hierarchy

The system uses a 4-level atomic design hierarchy:

```
ATOM (smallest unit)
  ↓
MOLECULE (multi-step procedure)
  ↓
ORGANISM (multi-phase workflow)
  ↓
SOP (complete Standard Operating Procedure)
```

### Component Types

| Type | Purpose | Examples | Construction |
|------|---------|----------|--------------|
| **Atom** | Single-purpose, reusable unit | Password reset, form template, single step | Pure content (no sub-components) |
| **Molecule** | Multi-step procedure | User account setup, expense submission | **Hybrid**: Atoms + inline prose |
| **Organism** | Multi-phase workflow | Employee onboarding, system access workflow | Composed of atoms and molecules |
| **SOP** | Complete operating procedure | IT provisioning SOP, compliance SOP | Composed of organisms and/or molecules |

---

## Hybrid Construction Model

### What is Hybrid Construction?

Molecules use a **hybrid approach** combining:

1. **Reusable step atoms**: Standardized procedures included via `{{include: atom-id}}`
2. **Inline prose steps**: Workflow-specific steps written directly in the molecule

This balances:
- **Maximum reusability** (for common procedures)
- **Practical specificity** (for workflow-unique steps)

### When to Create a Step-Level Atom vs. Inline Prose

Use this decision matrix:

| Criteria | Create Step Atom | Write Inline Prose |
|----------|------------------|-------------------|
| **Reusability** | Used in 2+ workflows | Specific to this workflow only |
| **Standardization** | Must be identical everywhere | Can vary by context |
| **Technical Process** | Technical procedure (AD account, email setup) | Business logic or data collection |
| **Compliance** | Audited procedure requiring consistency | Workflow coordination or orchestration |
| **Maintenance** | Single team owns this procedure | Multiple teams customize per workflow |

**Examples of Step Atoms:**
- ✅ Create Active Directory account (technical, standardized)
- ✅ Create email account (technical, standardized)
- ✅ Password reset procedure (security-controlled)
- ✅ Access approval workflow (compliance-controlled)

**Examples of Inline Prose:**
- ✅ Gather new hire information (specific to onboarding)
- ✅ Final verification checklist (specific to workflow)
- ✅ Stakeholder notification (varies by workflow context)

---

## How to Build a Hybrid Molecule

### Step 1: Plan Your Molecule Structure

Before writing, identify:

1. **Total steps** in the workflow (e.g., 7 steps)
2. **Reusable steps** (appear in other workflows)
3. **Workflow-specific steps** (unique to this procedure)

**Example: New User Account Setup**

| Step | Description | Type | Rationale |
|------|-------------|------|-----------|
| 1 | Gather new hire information | Inline | Specific to new hire workflow |
| 2 | Determine access requirements | Inline | New hire-specific logic |
| 3 | Create AD account | **Atom** | Reusable (contractors, rehires) |
| 4 | Create email account | **Atom** | Reusable (contractors, rehires) |
| 5 | Configure password | **Atom** | Reusable (password reset atom) |
| 6 | Verify access approvals | **Atom** | Reusable (access approval atom) |
| 7 | Final verification | Inline | Specific to this workflow |

**Result**: 4 reusable atoms + 3 inline prose steps = Hybrid molecule

### Step 2: Create Step-Level Atoms (for Reusable Steps)

For each reusable step, create a standalone atom file:

**File**: `sop-components/atoms/atom-step-create-ad-account.md`

```yaml
---
id: atom-step-create-ad-account
type: atom
subtype: procedural-step
version: 1.0.0
title: Create Active Directory Account (Step)

# Mark as reusable
reusable: true
usedIn: [molecule-new-user-account-setup, molecule-contractor-provisioning]

# ... other metadata
---

# Create Active Directory Account (Procedural Step)

## Purpose
This step-level atom provides the standardized procedure for creating
a new Active Directory user account.

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

---

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

   [... detailed actions ...]

## Quality Checkpoints
- [ ] Username follows naming convention
- [ ] Account created in correct OU
- [ ] Temporary password generated

## Decision Logic
- **IF** username conflict → Use middle initial variant
- **IF** manager not found → Contact HR

[... additional sections ...]
```

**Key characteristics of step atoms:**
- Include all details: actions, checkpoints, decision logic, troubleshooting
- Self-contained (can be understood without parent context)
- Versioned independently
- Metadata tracks where used (`usedIn`)

### Step 3: Write the Hybrid Molecule

**File**: `sop-components/molecules/molecule-new-user-account-setup.md`

```yaml
---
id: molecule-new-user-account-setup
type: molecule
version: 2.1.0
title: New User Account Setup and Provisioning

# List ALL atoms used (both step and non-step atoms)
composedOf: [
  atom-step-create-ad-account,
  atom-step-create-email-account,
  atom-access-request-approval,
  atom-password-reset
]

# Declare dependencies with version requirements
dependencies:
  - atom-step-create-ad-account (v1.0.0+)
  - atom-step-create-email-account (v1.0.0+)
  - atom-access-request-approval (v1.0.0+)
  - atom-password-reset (v2.0.0+)

# Mark as hybrid construction
constructionType: hybrid

# ... other metadata
---

# New User Account Setup and Provisioning

## Purpose
This procedure ensures consistent account creation for new employees.

## Components Used

This molecule uses a **hybrid construction approach** combining:
- **Reusable step atoms**: Standardized procedures used across workflows
- **Inline prose steps**: Workflow-specific steps

### Reusable Step Atoms

**atom-step-create-ad-account** (Step 3)
- **Purpose**: Standardized Active Directory account creation
- **Reused in**: New hire onboarding, contractor provisioning
- **Why reusable**: AD creation is identical across user types

**atom-step-create-email-account** (Step 4)
- **Purpose**: Microsoft 365 license and mailbox provisioning
- **Reused in**: New hire, contractor workflows
- **Why reusable**: Email provisioning is standardized

[... document other atoms ...]

### Inline Prose Steps

**Step 1: Gather New Hire Information**
- **Why inline**: Highly specific to new hire workflow
- **Not reused**: Contractor workflows gather different data

**Step 7: Final Verification**
- **Why inline**: Workflow-specific completion checklist
- **Not reused**: Each workflow has different success criteria

## Procedure Steps

### Step 1: Gather New Hire Information

**Estimated time:** 10 minutes
**Owner:** IT Provisioning Technician

**Actions:**
1. Log into Workday HR system
2. Navigate to "Pending New Hires" report
3. Collect employee information: name, ID, department, manager

[... inline prose content ...]

**Quality Checkpoint:**
- [ ] All required information collected
- [ ] No duplicate accounts detected

**Decision Point:**
- **IF** all information complete → Proceed to Step 2
- **IF** missing info → Contact HR

---

### Step 2: Determine Standard Access Requirements

[... inline prose content ...]

---

### Step 3: Create Active Directory Account

{{include: atom-step-create-ad-account}}

---

### Step 4: Create Email Account and Configure Services

{{include: atom-step-create-email-account}}

---

### Step 5: Configure Initial Password

{{include: atom-password-reset}}

---

### Step 6: Verify Access Approvals

{{include: atom-access-request-approval}}

---

### Step 7: Final Verification and Documentation

**Estimated time:** 10 minutes
**Owner:** IT Provisioning Technician

**Actions:**
1. Perform end-to-end test login
2. Complete provisioning checklist
3. Notify stakeholders

[... inline prose content ...]

---

## Expected Outcome
- [ ] New hire can log in on Day 1
- [ ] Corporate email is accessible
- [ ] All approved access provisioned
```

### Step 4: Update the Graph

Add the new step atoms to `graph/sop-graph.json`:

```json
{
  "nodes": {
    "atom-step-create-ad-account": {
      "id": "atom-step-create-ad-account",
      "type": "atom",
      "subtype": "procedural-step",
      "title": "Create Active Directory Account (Step)",
      "version": "1.0.0",
      "reusableIn": ["molecule-new-user-account-setup", "molecule-contractor-provisioning"]
    },
    "molecule-new-user-account-setup": {
      "id": "molecule-new-user-account-setup",
      "type": "molecule",
      "version": "2.1.0",
      "composedOf": [
        "atom-step-create-ad-account",
        "atom-step-create-email-account",
        "atom-access-request-approval",
        "atom-password-reset"
      ],
      "constructionType": "hybrid"
    }
  },
  "edges": [
    {
      "source": "atom-step-create-ad-account",
      "target": "molecule-new-user-account-setup",
      "type": "component-of",
      "description": "AD account creation step (Step 3)"
    }
  ]
}
```

### Step 5: Build and Verify

Run the build tool:

```bash
node tools/build.js sop-it-001
```

The build system will:
1. Load all component files (atoms, molecules, organisms)
2. Process `{{include: atom-id}}` references recursively
3. Assemble the complete SOP with all atoms expanded
4. Generate `dist/sops/sop-it-001.md`

**Verification:**
- Open `dist/sops/sop-it-001.md`
- Verify step atoms are fully expanded inline
- Verify inline prose steps remain as written
- Check that all content is properly assembled

---

## Build System Architecture

### How {{include}} Processing Works

The build tool (`tools/build.js`) processes includes recursively:

```javascript
// Simplified algorithm:
processIncludes(content) {
  // Find all {{include: component-id}} patterns
  matches = findIncludes(content)

  for each match {
    componentId = extractId(match)

    // Prevent infinite loops
    if (componentId already processed) {
      warn("Circular reference")
      continue
    }

    // Load the component
    componentContent = loadComponent(componentId)

    // Recursively process includes in the loaded component
    processedContent = processIncludes(componentContent)

    // Replace {{include: ...}} with the processed content
    content = replace(match, processedContent)
  }

  return content
}
```

**This enables**:
- Molecules can include atoms
- Atoms can include other atoms
- SOPs can include molecules (which include atoms)
- Infinite nesting depth (with circular reference protection)

### Supported Include Syntax

| Syntax | Behavior | Use Case |
|--------|----------|----------|
| `{{include: atom-id}}` | Inline content replacement | Include full atom content |
| `{{reference: atom-id}}` | Create link, don't inline | Reference without including |

**Example**:
```markdown
### Step 3: Create AD Account

{{include: atom-step-create-ad-account}}
```

Becomes (after build):
```markdown
### Step 3: Create AD Account

---
id: atom-step-create-ad-account
type: atom
...
---

# Create Active Directory Account (Procedural Step)

## Purpose
This step-level atom provides...

[... full atom content ...]
```

---

## Best Practices

### 1. Naming Conventions

| Component Type | Naming Pattern | Example |
|----------------|----------------|---------|
| Step atom | `atom-step-{action}-{object}` | `atom-step-create-ad-account` |
| Content atom | `atom-{name}` | `atom-password-reset` |
| Molecule | `molecule-{workflow}` | `molecule-new-user-account-setup` |
| Organism | `organism-{process}` | `organism-employee-onboarding` |
| SOP | `sop-{dept}-{number}` | `sop-it-001` |

### 2. Metadata Standards

Always include in atoms and molecules:

```yaml
# Core
id: [unique-id]
type: [atom|molecule|organism|sop]
version: [semantic version]
title: [descriptive title]

# Reusability
reusable: [true|false]
usedIn: [list-of-consumers]

# Governance
owner: [team/department]
lastReviewed: [YYYY-MM-DD]
nextReview: [YYYY-MM-DD]
```

For hybrid molecules, add:
```yaml
composedOf: [list-of-atom-ids]
dependencies:
  - atom-id (v1.0.0+)
constructionType: hybrid
```

### 3. Version Management

**Step Atoms:**
- Version independently from parent molecules
- Use semantic versioning: `MAJOR.MINOR.PATCH`
- Breaking changes increment MAJOR version
- Update molecules' dependency requirements when atoms change

**Molecules:**
- Increment version when:
  - Inline prose changes (PATCH)
  - Steps added/removed (MINOR)
  - Workflow fundamentally changes (MAJOR)
- Document atom version dependencies

**Example Dependency**:
```yaml
dependencies:
  - atom-step-create-ad-account (v1.0.0+)  # Any 1.x version OK
  - atom-password-reset (v2.0.0+)           # Requires v2+
```

### 4. Documentation in Molecules

Always document the hybrid construction:

```markdown
## Components Used

This molecule uses a **hybrid construction approach** combining:
- **Reusable step atoms**: Standardized procedures used across workflows
- **Inline prose steps**: Workflow-specific steps

### Reusable Step Atoms

**atom-step-create-ad-account** (Step 3)
- **Purpose**: [Why this atom exists]
- **Reused in**: [List workflows that use it]
- **Why reusable**: [Why it should be standardized]

### Inline Prose Steps

**Step 1: Gather New Hire Information**
- **Why inline**: [Why it's not an atom]
- **Not reused**: [Why it's workflow-specific]
```

This helps future maintainers understand the design decisions.

### 5. Testing Hybrid Molecules

After creating or modifying:

1. **Build test**:
   ```bash
   node tools/build.js sop-it-001
   ```

2. **Validate**:
   ```bash
   node tools/validate.js
   ```

3. **Review output**:
   - Check `dist/sops/[sop-id].md`
   - Verify all atoms expanded correctly
   - Confirm inline prose rendered properly
   - Test all links and references

4. **Dependency check**:
   - Verify all `composedOf` atoms exist
   - Check all dependency versions available
   - Confirm no circular references

---

## Examples

### Example 1: Creating a New Hybrid Molecule

**Scenario**: Create "Employee Offboarding" molecule

**Step 1: Identify steps**
1. Notify stakeholders (inline - offboarding-specific)
2. Revoke system access (atom - reusable)
3. Disable AD account (atom - reusable)
4. Collect company assets (inline - offboarding-specific)
5. Exit interview (inline - offboarding-specific)

**Step 2: Create reusable atoms**
- `atom-step-revoke-system-access.md`
- `atom-step-disable-ad-account.md`

**Step 3: Write molecule**
```yaml
---
id: molecule-employee-offboarding
type: molecule
composedOf: [atom-step-revoke-system-access, atom-step-disable-ad-account]
constructionType: hybrid
---

## Procedure Steps

### Step 1: Notify Stakeholders
[inline prose]

### Step 2: Revoke System Access
{{include: atom-step-revoke-system-access}}

### Step 3: Disable AD Account
{{include: atom-step-disable-ad-account}}

### Step 4: Collect Company Assets
[inline prose]

### Step 5: Exit Interview
[inline prose]
```

### Example 2: Converting Existing Molecule to Hybrid

**Before (Pure Prose)**:
```markdown
### Step 3: Create AD Account

**Actions:**
1. Open Active Directory
2. Create new user
3. Set properties
[... 100 lines of procedure ...]
```

**After (Hybrid with Atom)**:
```markdown
### Step 3: Create AD Account

{{include: atom-step-create-ad-account}}
```

**Result**:
- Original 100 lines moved to `atom-step-create-ad-account.md`
- Molecule becomes concise and readable
- Atom can be reused in contractor provisioning, rehires, etc.

---

## Troubleshooting

### Issue: Circular Reference Detected

**Symptom**: Build warning: "Circular reference detected: atom-x"

**Cause**: Atom A includes Atom B, which includes Atom A

**Solution**:
1. Review include chain in both atoms
2. Remove circular dependency
3. Restructure atoms if needed (may need a parent atom)

### Issue: Component Not Found

**Symptom**: Build output shows "<!-- Component atom-x not found -->"

**Cause**: Referenced atom doesn't exist or has wrong ID

**Solution**:
1. Check atom file exists in `sop-components/atoms/`
2. Verify `id:` in frontmatter matches reference
3. Update graph.json to include the atom node

### Issue: Duplicate Content in Built SOP

**Symptom**: Same content appears multiple times in built SOP

**Cause**: Atom included multiple times OR atom content duplicated inline

**Solution**:
1. Review molecule - should include atom once per step
2. Check if atom also has inline content (should be removed)

### Issue: Build Succeeds but Output is Malformed

**Symptom**: Built SOP has broken formatting or missing sections

**Cause**: Atom markdown has syntax errors OR frontmatter delimiter issues

**Solution**:
1. Validate atom markdown (check for unclosed code blocks, lists)
2. Verify frontmatter has `---` delimiters at start and end
3. Check for special characters in frontmatter YAML

---

## Migration Guide

### Migrating from Pure Prose to Hybrid

1. **Identify reusable steps** in existing molecules
2. **Extract to atoms**: Create step-level atoms for reusable procedures
3. **Update molecule**: Replace prose with `{{include: atom-id}}`
4. **Update metadata**: Add `composedOf`, `dependencies`, `constructionType: hybrid`
5. **Update graph**: Add atom nodes and edges
6. **Test build**: Verify SOP assembles correctly
7. **Update version**: Increment molecule version (MINOR or MAJOR)

**Template checklist**:
- [ ] Reusable steps identified
- [ ] Step atoms created with full metadata
- [ ] Molecule updated with {{include}} syntax
- [ ] Graph updated with new atoms and edges
- [ ] Build tested and validated
- [ ] Documentation updated (Components Used section)
- [ ] Version incremented appropriately

---

## Summary

The **hybrid construction approach** provides:

✅ **Flexibility**: Choose atoms or prose based on reusability
✅ **Consistency**: Standardized procedures used identically everywhere
✅ **Maintainability**: Update once, propagate to all consumers
✅ **Practicality**: Workflow-specific logic stays inline where it belongs
✅ **Scalability**: Build complex SOPs from simple, versioned components

**Key Principle**: *Atomize what's reusable, write inline what's specific.*

---

## Additional Resources

- **Template Files**:
  - `/templates/atom-template.md` - Standard atom template
  - `/templates/molecule-template.md` - Standard molecule template

- **Example Files**:
  - `/sop-components/atoms/atom-step-create-ad-account.md` - Step atom example
  - `/sop-components/molecules/molecule-new-user-account-setup.md` - Hybrid molecule example

- **Build Tools**:
  - `/tools/build.js` - Build system documentation
  - `/tools/validate.js` - Validation tool

- **Graph Documentation**:
  - `/graph/README.md` - Graph structure guide

**Questions?** Contact the SOP Architecture Team or open an issue in the repository.

---

**Document Control**

**Version**: 1.0.0
**Last Updated**: 2025-11-19
**Owner**: SOP Architecture Team
**Next Review**: 2026-02-19
