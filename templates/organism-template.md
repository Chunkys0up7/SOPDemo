---
# Core Metadata (Required)
id: organism-[name]
type: organism
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
estimatedDuration: [X hours/days]

# Compliance & Regulatory
complianceFrameworks: []  # ISO 9001, HIPAA, SOX, GDPR, FDA, etc.

# Component Composition
composedOf:
  - PLACEHOLDER-atom-01
  - PLACEHOLDER-molecule-01
  - PLACEHOLDER-molecule-02
dependencies:
  - PLACEHOLDER-sop-xxx (Related SOP)

# Reusability Tracking
reusable: true
usedIn: []  # List of SOPs that include this organism
variationCount: 1

# Ownership & Governance
owner: [Department]
maintainer: [Name/Role]
approver: [Name/Role]
lastReviewed: [YYYY-MM-DD]
nextReview: [YYYY-MM-DD]
---

# [Organism Title]

## Purpose

[1-2 sentences: What business outcome does this complete workflow achieve?]

## Overview

[Comprehensive description of this complete workflow, its importance, and impact]

## Scope

**This workflow includes:**
- [Major activity 1]
- [Major activity 2]
- [Major activity 3]

**This workflow does NOT include:**
- [Out of scope 1]
- [Out of scope 2]

## Applicability

**Use this workflow for:**
- Scenario 1
- Scenario 2

**Prerequisites**

Before starting this workflow, ensure:
- [ ] Prerequisite 1
- [ ] Prerequisite 2
- [ ] Required approvals obtained
- [ ] Required resources available
- [ ] All dependencies met (see Dependencies section)

## Roles & Responsibilities

| Role | Responsibilities | Required Access |
|------|-----------------|-----------------|
| [Role 1] | [What they do] | [Systems/Permissions] |
| [Role 2] | [What they do] | [Systems/Permissions] |
| [Role 3] | [What they do] | [Systems/Permissions] |

## Timeline Overview

**Total estimated duration:** [X hours/days/weeks]

| Time/Phase | Activity | Owner | Component | Duration |
|------------|----------|-------|-----------|----------|
| [Day 1 / Phase 1] | [Activity] | [Owner] | [Component Used] | [X hours] |
| [Day 2 / Phase 2] | [Activity] | [Owner] | [Component Used] | [X hours] |
| [Day 3 / Phase 3] | [Activity] | [Owner] | [Component Used] | [X hours] |

## Components Used

This organism combines the following components:

### Atoms
- **{{PLACEHOLDER-atom-01}}**: [Purpose in this workflow]

### Molecules
- **{{PLACEHOLDER-molecule-01}}**: [Purpose in this workflow]
- **{{PLACEHOLDER-molecule-02}}**: [Purpose in this workflow]

## Phases

### Phase 1: [Phase Name]

**Duration:** [X hours/days]
**Owner:** [Role]
**Success Criteria:** [What defines success for this phase]

{{include: PLACEHOLDER-molecule-01}}

**Additional context for this workflow:**

[Instructions and context specific to how this molecule is used in this particular workflow]

**Decision Point:**
- **IF** [Condition A] → Proceed to Phase 2
- **IF** [Condition B] → Skip to Phase 3
- **IF** [Issue] → See Exception Handling

**Quality Checkpoint:**
- [ ] Phase 1 deliverable complete
- [ ] All stakeholders notified
- [ ] Documentation updated

### Phase 2: [Phase Name]

**Duration:** [X hours/days]
**Owner:** [Role]
**Success Criteria:** [What defines success for this phase]

{{include: PLACEHOLDER-molecule-02}}

**Additional context for this workflow:**

[Instructions and context specific to how this molecule is used in this particular workflow]

**Decision Point:**
- **IF** [Condition A] → Proceed to Phase 3
- **IF** [Condition B] → Return to Phase 1 (re-work)
- **IF** [Critical issue] → Escalate per Escalation Matrix

**Quality Checkpoint:**
- [ ] Phase 2 deliverable complete
- [ ] Quality standards met
- [ ] Approvals obtained

### Phase 3: [Phase Name]

**Duration:** [X hours/days]
**Owner:** [Role]
**Success Criteria:** [What defines success for this phase]

[Instructions for final phase - can include another component or standalone steps]

**Quality Checkpoint:**
- [ ] Final deliverable complete
- [ ] All documentation finalized
- [ ] Handoff complete

## Success Metrics & KPIs

Track the following to measure effectiveness:

| Metric | Description | Target | Measurement Method | Owner |
|--------|-------------|--------|-------------------|-------|
| **Metric 1** | [Description] | [Target Value] | [How to measure] | [Role] |
| **Metric 2** | [Description] | [Target Value] | [How to measure] | [Role] |
| **Metric 3** | [Description] | [Target Value] | [How to measure] | [Role] |

**Review frequency:** [Weekly|Monthly|Quarterly]

## Quality Assurance

| Checkpoint | Verification Criteria | Owner | Frequency | Recovery Path |
|------------|----------------------|-------|-----------|---------------|
| Phase 1 Gate | [What to verify] | [Role] | End of Phase 1 | [Recovery action] |
| Phase 2 Gate | [What to verify] | [Role] | End of Phase 2 | [Recovery action] |
| Final Gate | [What to verify] | [Role] | End of workflow | [Recovery action] |

## Troubleshooting Common Issues

| Issue | Symptoms | Root Cause | Solution | Escalation Condition | Owner |
|-------|----------|------------|----------|---------------------|-------|
| [Problem 1] | [How to identify] | [Why it occurs] | [How to fix] | [When to escalate] | [Role] |
| [Problem 2] | [How to identify] | [Why it occurs] | [How to fix] | [When to escalate] | [Role] |
| [Problem 3] | [How to identify] | [Why it occurs] | [How to fix] | [When to escalate] | [Role] |

## Exception Handling

**Common exceptions and approval requirements:**

### Exception 1: [Exception Name]

**Scenario:** [When this exception occurs]

**Decision Logic:**
- **IF** [Minor exception] → [Manager approval required]
- **IF** [Major exception] → [Director approval required]
- **IF** [Critical exception] → [VP approval + compliance review]

**Process:**
1. [Step to request exception]
2. [Step to document exception]
3. [Step to obtain approval]

### Exception 2: [Exception Name]

[Similar structure]

## Escalation Matrix

| Issue Severity | Escalation Path | Response Time | Authority |
|----------------|----------------|---------------|-----------|
| **Low** | [First level] | [X hours] | [Can approve] |
| **Medium** | [Second level] | [X hours] | [Can approve] |
| **High** | [Third level] | [X hours] | [Can approve] |
| **Critical** | [Executive level] | [Immediate] | [Can approve] |

## Compliance Requirements

[Detailed compliance requirements specific to this workflow]

**Audit requirements:**
- [ ] Document retention: [X years]
- [ ] Approval signatures: [Required/Not Required]
- [ ] Evidence of completion: [What to maintain]

**Regulatory considerations:**
- [Regulation 1]: [How this workflow complies]
- [Regulation 2]: [How this workflow complies]

## Dependencies & Related SOPs

### Strong Dependencies (Required)

This workflow REQUIRES:
- **{{sop-xxx}}**: [SOP Title] - [Why it's required]
- **{{sop-yyy}}**: [SOP Title] - [Why it's required]

### Related SOPs (Informational)

Related procedures:
- **{{sop-zzz}}**: [SOP Title] - [How it relates]

## Communication Plan

| Stakeholder | Timing | Method | Content | Owner |
|-------------|--------|--------|---------|-------|
| [Group 1] | [When to communicate] | [Email/Meeting/Portal] | [What to communicate] | [Who sends] |
| [Group 2] | [When to communicate] | [Email/Meeting/Portal] | [What to communicate] | [Who sends] |

## Reusability Information

**Currently used in:**
{{usedIn}}

**Available variations:**
- Standard: [Default workflow for typical scenarios]
- [Variation 1]: [Modified for specific use case]
- [Variation 2]: [Modified for another use case]

**Configuration points:**
- [Parameter 1]: [What can be customized - e.g., approval thresholds]
- [Parameter 2]: [What can be customized - e.g., timeline adjustments]

## Related Workflows

- **{{related-organism-1}}**: [Relationship description]
- **{{related-sop-1}}**: [Relationship description]

---

## Document Control

**Version**: 1.0.0
**Last Updated**: [YYYY-MM-DD]
**Owner**: [Department]
**Maintainer**: [Name/Role]
**Approver**: [Approver Name/Role]
**Next Review**: [YYYY-MM-DD]
**Review Frequency**: [Quarterly|Semi-annually|Annually]

**Change Log:**
- v1.0.0 ([Date]): Initial release - [Author] - [Brief description of changes]

**Dependency Version Requirements:**
- atom-id-1: v1.0.0+
- molecule-id-1: v1.0.0+
- molecule-id-2: v1.0.0+
- sop-xxx: v1.0.0+
