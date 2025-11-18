# Contributing Guide - Template-Specific Requirements

**Last Updated:** 2025-11-18

---

## Overview

Each component type (Atom, Molecule, Organism, SOP) has different complexity levels and field requirements. This guide shows exactly what to fill out for each type.

---

## 🔵 ATOM - Simple Component

**Complexity:** ⭐ Basic (128 lines)
**Purpose:** Single-purpose, reusable component
**Examples:** Login Procedure, Submit Form, Verify Email

### Required Fields

#### Core Metadata (Minimal)
```yaml
- id: atom-[name]
- type: atom
- version: 1.0.0
- title: [Descriptive Title]
- department: [IT|Operations|HR|Finance|Legal|Compliance|Security|Customer Service]
- processCategory: [Category]
- complexity: [Basic|Intermediate|Advanced]
- audience: [Roles who use this]
- tags: [tag1, tag2, tag3]
- keywords: [keyword1, keyword2, keyword3]
```

#### Content (Simple)
```markdown
- Purpose: (1-2 sentences - why it exists)
- Description: (Brief description - what is it)
- Scope: (What's included/excluded)
- Content: (The actual component content)
- Decision Logic: (Simple IF-THEN if needed)
- Quality Checkpoints: (Basic verification)
- Troubleshooting: (Common issues table)
```

#### Governance (Basic)
```yaml
- owner: [Team/Department]
- maintainer: [Name/Role]
- lastReviewed: [Date]
```

### NOT Required for Atoms
- ❌ Detailed compliance frameworks
- ❌ Complex approval workflows
- ❌ Escalation matrices
- ❌ Success metrics/KPIs
- ❌ Stakeholder communication plans
- ❌ Multi-step procedures (keep it single-purpose!)

### Form Sections to Complete
1. ✅ Core Information (simplified)
2. ✅ Purpose & Description
3. ❌ Skip Compliance (unless critical)
4. ❌ Skip multi-step procedures (atoms are single-purpose)
5. ✅ Basic Troubleshooting
6. ✅ Basic Ownership

---

## 🟣 MOLECULE - Multi-Step Procedure

**Complexity:** ⭐⭐ Moderate (201 lines)
**Purpose:** Multi-step procedure combining atoms
**Examples:** Account Setup, Approval Workflow, Credential Creation

### Required Fields

#### Core Metadata (Moderate)
```yaml
- id: molecule-[name]
- type: molecule
- version: 1.0.0
- title: [Descriptive Title]
- department: [Department]
- processCategory: [Category]
- complexity: [Basic|Intermediate|Advanced]
- audience: [Roles]
- tags: [tags]
- keywords: [keywords]
- estimatedDuration: [X minutes/hours]  ← NEW: Add duration
```

#### Component Composition (**Important!**)
```yaml
- composedOf: [atom-01, atom-02, atom-03]  ← List atoms used
- dependencies:
  - atom-01 (v1.0.0+)
  - atom-02 (v1.0.0+)
```

#### Content (Moderate Complexity)
```markdown
- Purpose: (What business outcome)
- Overview: (Description of multi-step procedure)
- Scope: (Included/Excluded)
- Prerequisites: (Checklist of requirements)
- Steps: (Multiple steps combining atoms)
- Decision Logic: (IF-THEN for each step)
- Quality Checkpoints: (Per-step verification)
- Troubleshooting: (Detailed matrix)
```

#### Governance (Moderate)
```yaml
- owner: [Team/Department]
- maintainer: [Name/Role]
- approver: [Name/Role]  ← NEW: Add approver
- lastReviewed: [Date]
- reviewFrequency: [Quarterly|Semi-annually|Annually]
```

### Optional for Molecules
- ⚠️ Compliance frameworks (if applicable)
- ⚠️ Reusability tracking
- ⚠️ Variation count

### NOT Required for Molecules
- ❌ Full escalation matrix (use simplified version)
- ❌ Success metrics/KPIs
- ❌ Stakeholder communication plan

### Form Sections to Complete
1. ✅ Core Information (add estimatedDuration)
2. ✅ Purpose & Scope (add prerequisites)
3. ⚠️ Compliance (if applicable)
4. ✅ **Component Composition** (list atoms used)
5. ✅ Procedure Steps (multiple steps)
6. ✅ Troubleshooting (detailed matrix)
7. ✅ Ownership (add approver)

---

## 🟢 ORGANISM - Complete Workflow

**Complexity:** ⭐⭐⭐ Complex (297 lines)
**Purpose:** Complete workflow combining molecules and atoms
**Examples:** Employee Onboarding, Wire Transfer Process, System Access Provisioning

### Required Fields

#### Core Metadata (Comprehensive)
```yaml
- id: organism-[name]
- type: organism
- version: 1.0.0
- title: [Descriptive Title]
- department: [Department]
- processCategory: [Category]
- complexity: [Intermediate|Advanced]
- audience: [Multiple roles]
- tags: [tags]
- keywords: [keywords]
- estimatedDuration: [X hours/days]
- businessFunction: [Strategic|Operational|Tactical|Administrative]
```

#### Component Composition (**Critical!**)
```yaml
- composedOf:
  - molecule-01
  - molecule-02
  - atom-03
  - atom-04
- dependencies:
  - molecule-01 (v1.0.0+)
  - molecule-02 (v1.0.0+)
  - atom-03 (v1.0.0+)
```

#### Compliance (Required)
```yaml
- complianceFrameworks: [ISO 9001, HIPAA, SOX, GDPR, etc.]
- auditFrequency: [Quarterly|Semi-annually|Annually]
```

#### Content (Complex Workflow)
```markdown
- Purpose: (Business outcome and strategic value)
- Overview: (Complete workflow description)
- Scope: (Detailed inclusion/exclusion)
- Prerequisites: (Detailed checklist)
- Roles & Responsibilities: (Who does what)
- Workflow Steps: (Multi-phase workflow)
- Decision Logic: (Complex branching)
- Quality Checkpoints: (Comprehensive verification)
- Troubleshooting: (Full matrix with escalation)
```

#### Governance (Comprehensive)
```yaml
- owner: [Team/Department]
- maintainer: [Name/Role]
- approver: [Name/Role]
- reviewers: [List of stakeholders]
- lastReviewed: [Date]
- nextReview: [Date]
- reviewFrequency: [Quarterly|Semi-annually]
```

### Required for Organisms
- ✅ Compliance frameworks
- ✅ Approval workflows
- ✅ Escalation paths (simplified)
- ✅ Roles & responsibilities

### NOT Required for Organisms
- ❌ Full success metrics/KPIs (use simplified version)
- ❌ Detailed stakeholder communication plan
- ❌ Appendices (unless critical)

### Form Sections to Complete
1. ✅ Core Information (comprehensive)
2. ✅ Purpose & Scope (detailed)
3. ✅ **Compliance & Regulatory** (required)
4. ✅ **Component Composition** (molecules + atoms)
5. ✅ **Workflow Steps** (multi-phase)
6. ✅ **Troubleshooting** (comprehensive)
7. ✅ Ownership & Governance (full details)

---

## 🟠 FULL SOP - Complete Documentation

**Complexity:** ⭐⭐⭐⭐ Comprehensive (646 lines)
**Purpose:** Full documented procedure with complete governance
**Examples:** IT Security Policy, HR Compliance Process, Financial Controls

### Required Fields

#### Core Metadata (Full 20+ Fields)
```yaml
- id: sop-[dept]-[number]
- type: sop
- version: 1.0.0
- status: [draft|in-review|approved|active]
- title: [Descriptive Title]
- department: [Department]
- processCategory: [Category]
- complexity: [Basic|Intermediate|Advanced]
- audience: [All applicable roles]
- tags: [comprehensive tags]
- keywords: [minimum 5 keywords]
- businessFunction: [Strategic|Operational|Tactical]
- estimatedDuration: [Duration]
- volumeMetric: [X transactions per month]
- targetSLA: [X hours/days]
```

#### Compliance (Required & Detailed)
```yaml
- complianceFrameworks: [All applicable - ISO, HIPAA, SOX, GDPR, FDA, PCI-DSS, etc.]
- regulatoryRequirements: [Specific citations]
- auditFrequency: [Monthly|Quarterly|Semi-annually|Annually]
```

#### Complete Content
```markdown
- Purpose (with business value)
- Scope (detailed included/excluded with geographic/temporal applicability)
- Audience & Applicability (who, when, conditions)
- Prerequisites (all requirements)
- Roles & Responsibilities (detailed matrix)
- Overview & Process Flow (with diagram)
- Procedure Steps (comprehensive with decision logic)
- Quality Control & Verification (full matrix)
- Troubleshooting Matrix (comprehensive)
- Exception Handling (approval matrix)
- Success Metrics & KPIs (performance indicators)
- Compliance Requirements (detailed regulatory)
- Escalation Matrix (4-tier severity levels)
- Dependencies & Related SOPs (strong dependencies)
- Communication & Stakeholder Management (detailed plan)
- References & Resources (internal/external)
- Continuous Improvement (feedback mechanism)
```

#### Governance (Complete)
```yaml
- owner: [Department]
- maintainer: [Name/Role]
- approver: [Name/Role]
- reviewers: [Full list of stakeholders]
- lastReviewed: [YYYY-MM-DD]
- nextReview: [YYYY-MM-DD]
- reviewFrequency: [Quarterly|Semi-annually|Annually]
```

#### Additional Sections
```markdown
- Document Control & Version History
- Approval Record
- Appendices (Glossary, Workflows, Forms, Examples, FAQ)
- Metadata Tags (Schema.org JSON-LD)
```

### All Sections Required for SOPs
- ✅ Core Information (all 20+ fields)
- ✅ Purpose & Scope (comprehensive)
- ✅ Compliance & Regulatory (detailed)
- ✅ Procedure Steps (with decision logic)
- ✅ Troubleshooting Matrix (comprehensive)
- ✅ Ownership & Governance (complete)
- ✅ Success Metrics & KPIs
- ✅ Escalation Matrix
- ✅ Stakeholder Management
- ✅ Version History
- ✅ Appendices

### Form Sections to Complete
1. ✅ **Core Information** (all fields)
2. ✅ **Purpose & Scope** (comprehensive)
3. ✅ **Compliance & Regulatory** (detailed)
4. ✅ **Procedure Steps** (with all decision logic)
5. ✅ **Troubleshooting** (comprehensive matrix)
6. ✅ **Ownership & Governance** (full details)

---

## Quick Reference Matrix

| Feature | Atom | Molecule | Organism | SOP |
|---------|------|----------|----------|-----|
| **Complexity** | ⭐ Basic | ⭐⭐ Moderate | ⭐⭐⭐ Complex | ⭐⭐⭐⭐ Comprehensive |
| **Template Size** | 128 lines | 201 lines | 297 lines | 646 lines |
| **Metadata Fields** | ~10 | ~15 | ~18 | 20+ |
| **Compliance Required** | ❌ Optional | ⚠️ If applicable | ✅ Required | ✅ Required (detailed) |
| **Component Composition** | ❌ N/A | ✅ Required | ✅ Required | ⚠️ Optional |
| **Prerequisites** | ❌ Simple | ✅ Checklist | ✅ Detailed | ✅ Comprehensive |
| **Steps** | Single action | Multiple steps | Multi-phase | Comprehensive |
| **Decision Logic** | Simple IF-THEN | Per-step | Complex branching | Full pathways |
| **Quality Checkpoints** | Basic | Per-step | Comprehensive | Full matrix |
| **Troubleshooting** | Table | Matrix | Detailed matrix | Comprehensive + Advanced |
| **Escalation Matrix** | ❌ No | ❌ No | ⚠️ Simplified | ✅ 4-tier required |
| **Success Metrics/KPIs** | ❌ No | ❌ No | ⚠️ Optional | ✅ Required |
| **Stakeholder Plan** | ❌ No | ❌ No | ❌ No | ✅ Required |
| **Approval Workflow** | ❌ No | ⚠️ Basic | ✅ Yes | ✅ Comprehensive |
| **Appendices** | ❌ No | ❌ No | ⚠️ Optional | ✅ Required |
| **Version History** | Basic | Basic | Detailed | Comprehensive |

---

## Using the Contribute Form

### Current Form Behavior

⚠️ **Important:** The current contribute form shows ALL fields for ALL template types. Use this guide to know which sections to **skip** based on your template type:

### For ATOM - Fill These Only:
1. ✅ Section 1: Core Information (simplified - skip businessFunction, volumeMetric, targetSLA)
2. ✅ Section 2: Purpose & Scope (keep it simple)
3. ❌ **SKIP Section 3: Compliance** (unless critical)
4. ❌ **SKIP Section 4: Procedure Steps** (atoms are single-purpose, not multi-step)
5. ✅ Section 5: Troubleshooting (basic table only)
6. ✅ Section 6: Ownership (basic - just owner and maintainer)

### For MOLECULE - Fill These:
1. ✅ Section 1: Core Information (add estimatedDuration)
2. ✅ Section 2: Purpose & Scope (add prerequisites)
3. ⚠️ Section 3: Compliance (if applicable)
4. ✅ Section 4: Procedure Steps (multiple steps combining atoms)
5. ✅ Section 5: Troubleshooting (detailed matrix)
6. ✅ Section 6: Ownership (add approver)
7. ➕ **ADD:** List of atoms used (composedOf)

### For ORGANISM - Fill These:
1. ✅ Section 1: Core Information (add businessFunction)
2. ✅ Section 2: Purpose & Scope (detailed)
3. ✅ Section 3: Compliance & Regulatory (required)
4. ✅ Section 4: Workflow Steps (multi-phase)
5. ✅ Section 5: Troubleshooting (comprehensive)
6. ✅ Section 6: Ownership & Governance (full details)
7. ➕ **ADD:** List of molecules and atoms used (composedOf)
8. ➕ **ADD:** Roles & Responsibilities

### For FULL SOP - Fill Everything:
1. ✅ Section 1: Core Information (**all fields**)
2. ✅ Section 2: Purpose & Scope (comprehensive)
3. ✅ Section 3: Compliance & Regulatory (detailed)
4. ✅ Section 4: Procedure Steps (with all decision logic)
5. ✅ Section 5: Troubleshooting (comprehensive)
6. ✅ Section 6: Ownership & Governance (complete)
7. ➕ **ADD:** Success Metrics/KPIs
8. ➕ **ADD:** Escalation Matrix
9. ➕ **ADD:** Stakeholder Management
10. ➕ **ADD:** Appendices

---

## Future Improvement

A future version of the contribute form will **dynamically show/hide sections** based on template selection. For now, use this guide to know which fields to fill out.

### Planned Enhancement

```javascript
// Template selection will automatically:
- Show only relevant sections for selected template type
- Adjust field requirements (required/optional)
- Update section titles to match template
- Provide template-specific help text
```

---

## Examples

### Example: Creating an Atom

**Template:** Atom
**Purpose:** Login Procedure
**Fill Out:**
- Title: "System Login Procedure"
- Department: IT
- Process Category: System Configuration
- Complexity: Basic
- Audience: All Users
- Keywords: login, authentication, access, credentials, password
- Purpose: "Enables users to securely access the system"
- Description: "Standard login procedure for all system users"
- Content: "1. Navigate to login page\n2. Enter username\n3. Enter password\n4. Click Login"
- Decision Logic: "IF login fails → Go to Forgot Password"
- Quality Checkpoint: "Verify: Dashboard displays after login"
- Troubleshooting: "Login fails | Wrong credentials | Use Forgot Password | After 3 attempts → Call IT"
- Owner: IT Department
- Maintainer: IT Team Lead

**Skip:** Compliance section, Multi-step procedures, Escalation matrix

### Example: Creating a Molecule

**Template:** Molecule
**Purpose:** Account Setup Workflow
**Fill Out:**
- (All Atom fields above)
- + Estimated Duration: "30 minutes"
- + Composed Of: [atom-login, atom-verify-email, atom-set-password]
- + Prerequisites: "- [ ] User has been approved\n- [ ] Email address verified"
- + Steps: "Step 1: Login\nStep 2: Verify Email\nStep 3: Set Password"
- + Approver: IT Manager

**Skip:** Detailed compliance, Escalation matrix, KPIs

---

## Tips for Each Template Type

### Atom Tips
- ✅ Keep it focused on ONE thing
- ✅ Make it reusable across multiple procedures
- ✅ Use simple, clear language
- ❌ Don't add unnecessary compliance details
- ❌ Don't make it multi-step (that's a molecule)

### Molecule Tips
- ✅ Combine 2-5 atoms into logical procedure
- ✅ Add clear prerequisites
- ✅ List which atoms you're using
- ✅ Add estimated duration
- ⚠️ Only add compliance if genuinely required

### Organism Tips
- ✅ Build complete workflows from molecules
- ✅ Add comprehensive compliance tracking
- ✅ Include roles & responsibilities
- ✅ Add detailed troubleshooting
- ✅ Include approval workflows

### SOP Tips
- ✅ Fill out EVERY section completely
- ✅ Include all metadata fields
- ✅ Add success metrics and KPIs
- ✅ Include escalation matrix
- ✅ Add stakeholder communication plan
- ✅ Include appendices (glossary, examples, FAQ)

---

**Guide Version:** 1.0.0
**Last Updated:** 2025-11-18
**Author:** SOP System Documentation Team
