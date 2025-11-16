---
# Core Metadata (Required)
id: atom-[name]
type: atom
version: 1.0.0
title: [Descriptive Title]

# Searchability Metadata
department: [IT|Operations|HR|Finance|Legal|Compliance|Security|Customer Service]
processCategory: [System Configuration|Troubleshooting|Compliance & Audit|Maintenance & Updates|Risk Management|Training & Onboarding]
complexity: [Basic|Intermediate|Advanced]
audience: [C-Level Executive|Manager/Supervisor|Individual Contributor|Technician/Specialist|Customer/External User|Contractor]

# Taxonomy & Discovery
tags: [tag1, tag2, tag3]
keywords: [keyword1, keyword2, keyword3]  # For full-text search

# Compliance & Regulatory
complianceFrameworks: []  # ISO 9001, HIPAA, SOX, GDPR, FDA, etc.

# Reusability Tracking
reusable: true
usedIn: []  # List of components/SOPs that include this atom
variationCount: 1  # Number of variations of this atom

# Ownership & Governance
owner: [Team/Department]
maintainer: [Name/Role]
approver: [Name/Role]
lastReviewed: [YYYY-MM-DD]
nextReview: [YYYY-MM-DD]
---

# [Component Title]

## Purpose

[1-2 sentences: Why does this component exist? What business outcome does it support?]

## Description

[Brief description of this atomic component - what is it and when should it be used?]

## Scope

**Included:**
- [What this component covers]

**Excluded:**
- [What this component does not cover]

## Applicability

**Use this component when:**
- Condition 1
- Condition 2

**Do NOT use this component when:**
- Exception 1
- Exception 2

## Content

[The actual content of this atomic component. Keep it focused and single-purpose.]

### Key Points

- Point 1
- Point 2
- Point 3

## Decision Logic (if applicable)

**Decision Point**: [Condition to evaluate]

- **IF** [Condition A] → [Action/Path A]
- **IF** [Condition B] → [Action/Path B]
- **OTHERWISE** → [Default Action]

## Quality Checkpoints

| Checkpoint | Verification Criteria | Owner | Recovery Path |
|------------|----------------------|-------|---------------|
| [Checkpoint 1] | [What to verify] | [Role] | [What to do if failed] |
| [Checkpoint 2] | [What to verify] | [Role] | [What to do if failed] |

## Troubleshooting

| Issue | Root Cause | Solution | Escalation Condition |
|-------|------------|----------|---------------------|
| [Problem 1] | [Why it occurs] | [How to fix] | [When to escalate] |
| [Problem 2] | [Why it occurs] | [How to fix] | [When to escalate] |

## Usage Notes

[Any important notes about using this component]

## Reusability Information

**Currently used in:**
{{usedIn}}

**Available variations:**
- Standard: [Description]
- [Variation 1]: [Description]
- [Variation 2]: [Description]

**Configuration points:**
- [Parameter 1]: [What can be customized]
- [Parameter 2]: [What can be customized]

## Related Components

- **{{related-atom-1}}**: [Relationship description]
- **{{related-molecule-1}}**: [Relationship description]

---

## Document Control

**Version**: 1.0.0
**Last Updated**: [YYYY-MM-DD]
**Owner**: [Team/Department]
**Maintainer**: [Name/Role]
**Next Review**: [YYYY-MM-DD]

**Change Log:**
- v1.0.0 ([Date]): Initial release - [Author]
