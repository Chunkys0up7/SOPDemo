---
# Core Metadata (Required)
id: molecule-[name]
type: molecule
version: 1.0.0
title: [Descriptive Title]

# Searchability Metadata
department: [IT|Operations|HR|Finance|Legal|Compliance|Security|Customer Service]
processCategory: [System Configuration|Troubleshooting|Compliance & Audit|Maintenance & Updates|Risk Management|Training & Onboarding]
complexity: [Basic|Intermediate|Advanced]
audience: [C-Level Executive|Manager/Supervisor|Individual Contributor|Technician/Specialist|Customer/External User|Contractor]

# Taxonomy & Discovery
tags: [tag1, tag2, tag3]
keywords: [keyword1, keyword2, keyword3]
estimatedDuration: [X minutes/hours]

# Compliance & Regulatory
complianceFrameworks: []  # ISO 9001, HIPAA, SOX, GDPR, FDA, etc.

# Component Composition
composedOf: [PLACEHOLDER-atom-01, PLACEHOLDER-atom-02]
dependencies:
  - PLACEHOLDER-atom-01 (v1.0.0+)
  - PLACEHOLDER-atom-02 (v1.0.0+)

# Reusability Tracking
reusable: true
usedIn: []  # List of organisms/SOPs that include this molecule
variationCount: 1

# Ownership & Governance
owner: [Team/Department]
maintainer: [Name/Role]
approver: [Name/Role]
lastReviewed: [YYYY-MM-DD]
nextReview: [YYYY-MM-DD]
---

# [Molecule Title]

## Purpose

[1-2 sentences: What business outcome does this procedure achieve?]

## Overview

[Description of this multi-step procedure and what it accomplishes]

## Scope

**This procedure includes:**
- [Scope item 1]
- [Scope item 2]

**This procedure does NOT include:**
- [Out of scope 1]
- [Out of scope 2]

## Applicability

**Use this procedure for:**
- Scenario 1
- Scenario 2

**Prerequisites**

Before starting, verify:
- [ ] Prerequisite 1
- [ ] Prerequisite 2
- [ ] Required access/permissions
- [ ] Required tools/systems available

## Components Used

This molecule combines the following atoms:

### {{include: PLACEHOLDER-atom-01}}

**Usage in this procedure:** [How this atom is used]

### {{include: PLACEHOLDER-atom-02}}

**Usage in this procedure:** [How this atom is used]

## Procedure Steps

### Step 1: [Step Name]

**Estimated time:** [X minutes]
**Owner:** [Role responsible]

[Detailed description of step 1]

**Quality Checkpoint:**
- [ ] Verification criterion 1
- [ ] Verification criterion 2

**Decision Point:**
- **IF** [Condition A] → Proceed to Step 2
- **IF** [Condition B] → Go to Step 3 (skip Step 2)
- **IF** [Issue detected] → See Troubleshooting Section X

### Step 2: [Step Name]

**Estimated time:** [X minutes]
**Owner:** [Role responsible]

[Detailed description of step 2]

**Quality Checkpoint:**
- [ ] Verification criterion 1
- [ ] Verification criterion 2

### Step 3: [Step Name]

**Estimated time:** [X minutes]
**Owner:** [Role responsible]

[Detailed description of step 3]

**Quality Checkpoint:**
- [ ] Verification criterion 1
- [ ] Verification criterion 2

## Expected Outcome

**Success criteria:**
- [ ] Criterion 1 met
- [ ] Criterion 2 met
- [ ] All quality checkpoints passed

**Result:** [What should be the final state after completing this procedure?]

## Quality Assurance

| Checkpoint | Verification Criteria | Owner | Recovery Path |
|------------|----------------------|-------|---------------|
| Post-Step 1 | [What to verify] | [Role] | [Recovery action] |
| Post-Step 2 | [What to verify] | [Role] | [Recovery action] |
| Final Check | [What to verify] | [Role] | [Recovery action] |

## Troubleshooting

| Issue | Symptoms | Root Cause | Solution | Escalation Condition |
|-------|----------|------------|----------|---------------------|
| [Problem 1] | [How to identify] | [Why it occurs] | [How to fix] | [When to escalate] |
| [Problem 2] | [How to identify] | [Why it occurs] | [How to fix] | [When to escalate] |

## Exception Handling

**Common exceptions:**

1. **Exception:** [Exception scenario]
   - **Action:** [What to do]
   - **Approval required:** [Yes/No - from whom]

2. **Exception:** [Exception scenario]
   - **Action:** [What to do]
   - **Approval required:** [Yes/No - from whom]

## Compliance Notes

[Any compliance-specific requirements or notes for this procedure]

## Reusability Information

**Currently used in:**
{{usedIn}}

**Available variations:**
- Standard: [Default configuration]
- [Variation 1]: [Modified for specific use case]

**Configuration points:**
- [Parameter 1]: [What can be customized]
- [Parameter 2]: [What can be customized]

## Related Procedures

- **{{related-molecule-1}}**: [Relationship description]
- **{{related-organism-1}}**: [Relationship description]

---

## Document Control

**Version**: 1.0.0
**Last Updated**: [YYYY-MM-DD]
**Owner**: [Team/Department]
**Maintainer**: [Name/Role]
**Approver**: [Approver Name/Role]
**Next Review**: [YYYY-MM-DD]

**Change Log:**
- v1.0.0 ([Date]): Initial release - [Author]

**Dependency Version Requirements:**
- atom-id-1: v1.0.0+
- atom-id-2: v1.0.0+
