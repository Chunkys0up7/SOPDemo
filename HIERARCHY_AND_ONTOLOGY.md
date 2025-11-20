# SOP Hierarchy & Ontology Guide

## Overview
This document defines the strict hierarchy, composition rules, and ontology for the SOP management system.

---

## 🏗️ Atomic Design Hierarchy

### Level 1: 🔵 **ATOMS** (Base Components)
**Definition:** Single-purpose, indivisible components that CANNOT be broken down further.

**Rules:**
- ❌ NEVER composed from other components
- ✅ Can be used in molecules, organisms, and SOPs
- ✅ Represents ONE action or form
- ✅ Minimal metadata (~10 fields)

**Examples:**
- `atom-login-system` - Login to system with MFA
- `atom-verify-email` - Email verification step
- `atom-submit-form` - Generic form submission
- `atom-approve-request` - Manager approval action

**Required Metadata:**
```
- id
- type: "atom"
- title
- description
- department
- category
- tags
- owner
- author
- status
```

---

### Level 2: 🟣 **MOLECULES** (Task Sequences)
**Definition:** Multi-step procedures combining ATOMS ONLY into cohesive task sequences.

**Composition Rules:**
- ✅ Composed ONLY from atoms
- ❌ Cannot contain other molecules
- ❌ Cannot contain organisms
- ✅ Represents a complete task (3-10 steps)

**Examples:**
- `molecule-account-setup` = `atom-login` + `atom-verify-email` + `atom-send-notification`
- `molecule-approval-workflow` = `atom-submit-form` + `atom-approve-request` + `atom-notify`

**Workflow:**
1. Choose "Molecule" template
2. **Default mode: "Build from Atoms"** (atom library shows immediately)
3. Select 3-10 atoms from library
4. Arrange sequence
5. Add ownership

---

### Level 3: 🟢 **ORGANISMS** (Complete Workflows)
**Definition:** Complex workflows combining ATOMS + MOLECULES into complete processes.

**Composition Rules:**
- ✅ Composed from atoms AND/OR molecules
- ❌ Cannot contain other organisms
- ✅ Represents a complete workflow (5-20 steps)
- ✅ Includes compliance tracking

**Examples:**
- `organism-employee-onboarding` = `atom-welcome` + `molecule-account-setup` + `molecule-training` + `atom-equipment`
- `organism-incident-response` = `molecule-detection` + `atom-escalate` + `molecule-remediation`

**Workflow:**
1. Choose "Organism" template
2. **Default mode: "Build from Atoms & Modules"** (library shows atoms + molecules)
3. Select components
4. Add compliance frameworks
5. Define ownership chain

---

### Level 4: 🔴 **Complete SOPs** (Full Documentation)
**Definition:** End-to-end procedures using ALL component types with full governance.

**Composition Rules:**
- ✅ Can use atoms, molecules, AND organisms
- ✅ Includes full metadata (compliance, governance, risk)
- ✅ Represents complete documented procedure
- ✅ Comprehensive with all sections

**Examples:**
- `sop-complete-onboarding` = `organism-employee-onboarding` + `molecule-approvals` + `atom-nda`
- `sop-security-policy` = `organism-auth` + `organism-access-control` + `molecule-audit`

**Workflow:**
1. Choose "Complete SOP" template
2. **Options: Build from components OR write custom**
3. Add regulatory compliance
4. Full governance chain
5. Risk assessments

---

## 📊 Ontology & Metadata Schema

### Core Metadata (All Levels)
```json
{
  "id": "unique-identifier",
  "type": "atom|molecule|organism|sop",
  "title": "Human-readable title",
  "description": "What it does",
  "department": "Owning department",
  "category": "Process category",
  "tags": ["searchable", "keywords"],
  "version": "semver",
  "status": "active|draft|deprecated",
  "owner": "Person/team responsible",
  "author": "Creator"
}
```

### Composition Metadata (Molecules+)
```json
{
  "composedOf": ["atom-id-1", "molecule-id-2"],
  "prerequisites": ["required-sop-1"],
  "estimatedDuration": "30 minutes"
}
```

### Governance Metadata (Organisms+)
```json
{
  "complianceFrameworks": ["ISO 9001", "SOC 2"],
  "riskLevel": "low|medium|high|critical",
  "reviewFrequency": "quarterly|annual",
  "approver": "Approval authority"
}
```

---

## 🎯 Strict Hierarchy Rules

### ✅ ALLOWED Compositions

| Component Type | Can Contain |
|---|---|
| **Atom** | Nothing (base level) |
| **Molecule** | Atoms only |
| **Organism** | Atoms + Molecules |
| **SOP** | Atoms + Molecules + Organisms |

### ❌ PROHIBITED Compositions

- ❌ Atom containing anything
- ❌ Molecule containing molecules
- ❌ Molecule containing organisms
- ❌ Organism containing organisms
- ❌ Circular dependencies at any level

---

## 🔍 Search & Discovery Ontology

### Faceted Classification

**By Type:**
- `atom` - Single components
- `molecule` - Task sequences
- `organism` - Complete workflows
- `sop` - Full documentation

**By Department:**
- IT, Operations, HR, Finance, Legal, Compliance, Security, etc.
- Grouped in dropdown for easy selection

**By Category:**
- System Configuration, Troubleshooting, Compliance, Training, etc.
- Organized in 4 main groups: Technical, Business, People, Customer

**By Subtype:**
- `procedural-step`, `form`, `approval`, `verification`, `communication`, etc.

---

## 🚀 Workflow Patterns

### Pattern 1: Build from Atoms (Recommended)
**Use for:** Molecules, Organisms, SOPs
**Steps:**
1. Select template
2. Library shows automatically with appropriate components
3. Select components
4. Arrange and save

### Pattern 2: Write Custom
**Use for:** Atoms (always), or when no existing components fit
**Steps:**
1. Select template
2. Fill form fields
3. Save

### Pattern 3: Hybrid
**Use for:** Mix of existing + custom
**Steps:**
1. Select some components from library
2. Write additional custom steps
3. Save combined result

---

## 📏 Best Practices

### For Atoms
- Keep it to ONE single action
- No sub-steps or procedures
- Minimal metadata
- Highly reusable
- Example: "Click Submit Button", "Verify Email Format"

### For Molecules
- Combine 3-10 atoms
- Represents a complete task
- Example: "User Account Setup" = Login + Profile + Verification

### For Organisms
- Combine atoms + molecules
- Complete workflow with multiple phases
- Example: "Employee Onboarding" = Account Setup + Training + Equipment

### For SOPs
- Use all component types
- Full documentation with compliance
- Example: "IT Security Policy" = Multiple organisms + governance

---

## 🔗 Dependency Management

### Valid Dependencies
```
SOP
 ├─ Organism
 │   ├─ Molecule
 │   │   ├─ Atom
 │   │   └─ Atom
 │   └─ Atom
 └─ Molecule
     ├─ Atom
     └─ Atom
```

### Detection & Prevention
- System validates composition rules
- Prevents circular dependencies
- Warns if wrong component type selected
- Build from Atoms library only shows valid components

---

## 📝 Metadata Inheritance

Components inherit properties from parent containers:
- SOPs inherit compliance from organisms
- Organisms inherit tags from molecules/atoms
- Versioning cascades up the hierarchy

---

## 🎓 Summary

| Level | Composed Of | Workflow | Metadata Level |
|---|---|---|---|
| **Atom** | Nothing | Quick (3 fields) | Minimal |
| **Molecule** | Atoms | Build from Atoms | Moderate |
| **Organism** | Atoms + Molecules | Build + Compliance | Comprehensive |
| **SOP** | All Types | Build/Custom + Governance | Full |

**Key Principle:** Each level builds upon the previous, creating a strict hierarchy that enables reusability, searchability, and governance.
