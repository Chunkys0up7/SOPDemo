---
# Core Metadata (Required)
id: atom-access-request-approval
type: atom
version: 1.3.0
title: System Access Request Approval

# Searchability Metadata
department: Multi-Department
processCategory: Compliance & Audit
complexity: Intermediate
audience:
  - Manager/Supervisor
  - C-Level Executive

# Taxonomy & Discovery
tags: [reusable, approval, authorization, governance]
keywords: [access, approval, authorization, permissions, security, compliance]

# Compliance & Regulatory
complianceFrameworks: [SOX, HIPAA, SOC 2, ISO 9001]

# Reusability Tracking
reusable: true
usedIn: [molecule-system-provisioning, molecule-role-change, organism-employee-onboarding]
variationCount: 2

# Ownership & Governance
owner: IT Department
maintainer: IT Governance Team
approver: CISO
lastReviewed: 2025-10-15
nextReview: 2026-01-15
---

# System Access Request Approval

## Purpose

This component ensures compliant, auditable approval workflows for system access requests, supporting regulatory requirements and least-privilege access principles across all departments.

## Description

The System Access Request Approval component defines the standardized approval process for granting system access, including approval thresholds, approval chains, and documentation requirements. This component is reused across IT, HR, Finance, and Compliance workflows.

## Scope

**Included:**
- Single-approver requests (standard access)
- Multi-approver requests (privileged access)
- Conditional approval logic based on role and risk level
- Audit trail documentation
- Approval timeout and escalation handling

**Excluded:**
- Emergency access procedures (see atom-emergency-access)
- Access revocation (see atom-access-revocation)
- Temporary/contractor access (see atom-temp-access-approval)

## Applicability

**Use this component when:**
- New employee requires system access
- Existing employee changes role/department
- Employee requests additional system access
- Periodic access recertification is required

**Do NOT use this component when:**
- Emergency access needed outside business hours (use atom-emergency-access)
- Access is being removed (use atom-access-revocation)
- Temporary contractor access (different approval chain)

## Content

### Step 1: Determine Approval Requirements

**Access Level Classification:**

| Access Level | Risk | Approvers Required | Example Systems |
|-------------|------|-------------------|-----------------|
| **Level 1 - Basic** | Low | Direct Manager | Email, Calendar, Intranet |
| **Level 2 - Standard** | Medium | Manager + Department Head | CRM, Project Management, Standard Apps |
| **Level 3 - Elevated** | High | Manager + Department Head + IT Security | Financial Systems, HR Systems, Admin Tools |
| **Level 4 - Privileged** | Critical | Manager + Dept Head + IT Security + CISO | Database Admin, Network Admin, Root Access |

**Decision Logic:**
- **IF** standard employee role → Check job title matrix for default Level 1-2
- **IF** supervisor/manager role → Typically Level 2-3
- **IF** admin/privileged access → Always Level 4
- **IF** access to financial/PII data → Minimum Level 3

### Step 2: Submit Access Request

1. **Requester Information**
   - Employee name and ID
   - Department and job title
   - Manager name
   - Start date (for new hires)

2. **Access Details**
   - System/application name
   - Requested access level (Read, Write, Admin)
   - Business justification (required - minimum 50 characters)
   - Access duration (permanent vs. temporary)
   - Compliance framework relevance (if applicable)

3. **Submit via IT Portal**
   - Navigate to IT Service Portal > Access Request
   - Complete all required fields
   - Attach supporting documentation (if required)
   - System auto-routes to appropriate approvers

### Step 3: Approval Workflow Execution

**Level 1-2 Approval (Standard Access):**

1. **Manager Approval (Required)**
   - Notification sent via email within 5 minutes
   - Manager reviews business justification
   - Manager verifies role appropriateness
   - Approval deadline: 2 business days
   - Actions: Approve | Deny | Request More Information

**Level 3 Approval (Elevated Access):**

1. **Manager Approval** (as above)
2. **Department Head Approval** (sequential)
   - Triggered after manager approval
   - Reviews compliance implications
   - Approval deadline: 3 business days
3. **IT Security Review** (parallel with Dept Head)
   - Validates security requirements
   - Checks for conflicts of interest
   - Approval deadline: 3 business days

**Level 4 Approval (Privileged Access):**

1. **Manager Approval**
2. **Department Head Approval**
3. **IT Security Approval**
4. **CISO Final Approval** (sequential, after all above)
   - Reviews high-risk access request
   - May require additional documentation
   - May request security training completion
   - Approval deadline: 5 business days

### Step 4: Approval Decision Actions

**If APPROVED:**
- Automated email notification to requester, manager, IT provisioning team
- Ticket status: "Approved - Pending Provisioning"
- Provisioning team has 24 hours (Level 1-2) or 48 hours (Level 3-4) to complete
- Access granted according to approved specifications
- Audit log entry created with all approver details

**If DENIED:**
- Automated email to requester with denial reason
- Manager notification
- Ticket status: "Denied - Closed"
- Requester may appeal to Department Head within 5 business days

**If REQUEST MORE INFO:**
- Automated email to requester requesting clarification
- Timer paused until information provided
- Requester has 5 business days to respond
- Auto-deny if no response within 5 days

**If TIMEOUT (No response):**
- First reminder: After 50% of approval deadline
- Second reminder: 1 day before deadline
- Auto-escalation if no response by deadline:
  - Level 1-2: Escalate to Department Head
  - Level 3-4: Escalate to CISO
- Critical requests (Level 4) may be auto-denied if no response

### Key Points

- **Least Privilege**: Request only the minimum access required for job duties
- **Business Justification**: Clear, specific justification required (auditors review this)
- **Timely Approvals**: Approvers must respond within SLA to avoid delays
- **Audit Trail**: All approvals/denials permanently logged for compliance
- **Recertification**: All access reviewed quarterly; managers must re-certify
- **Separation of Duties**: Certain role combinations auto-flagged (e.g., can't have both AP entry and approval access)

## Decision Logic

**Decision Point**: Access Level Determination

- **IF** system classified as "Financial" AND user role is non-finance → Require Level 3 + CFO approval
- **IF** system contains PII AND user role is non-HR → Require Level 3 + Compliance approval
- **IF** user already has admin access to 3+ systems → Flag for CISO review (privilege creep)
- **IF** user is in probationary period (< 90 days) → Maximum Level 2 access
- **OTHERWISE** → Use standard approval matrix above

**Decision Point**: Conflict of Interest Check

- **IF** user requests both "Accounts Payable Entry" AND "AP Approval" → Auto-deny (SOX violation)
- **IF** user requests both "Payroll Entry" AND "Payroll Review" → Auto-deny (SOX violation)
- **IF** user manages vendor AND requests vendor payment system → Escalate to Compliance
- **OTHERWISE** → Proceed with standard approval

**Decision Point**: Approval Timeout Escalation

- **IF** Level 1-2 request AND > 2 days no response → Escalate to Department Head
- **IF** Level 3-4 request AND > 3 days no response → Escalate to CISO
- **IF** CISO no response after 2 days → Auto-deny with notification to CIO
- **IF** emergency access needed → Use atom-emergency-access procedure

## Quality Checkpoints

| Checkpoint | Verification Criteria | Owner | Recovery Path |
|------------|----------------------|-------|---------------|
| Request Completeness | All required fields populated; justification > 50 chars | System/Requester | Auto-reject with field-specific errors |
| Approver Availability | Approver not on extended leave (> 5 days) | System | Auto-route to backup approver |
| Conflict Check | No SOD violations detected | System | Auto-deny with reason; suggest alternative |
| Compliance Review | High-risk access reviewed by Compliance | Compliance Team | Request additional documentation |
| Final Provisioning | Access granted matches approved request | IT Provisioning | Audit flags mismatch; provisioning team corrects |

## Troubleshooting

| Issue | Root Cause | Solution | Escalation Condition |
|-------|------------|----------|---------------------|
| "Approver not found" error | Manager field incorrect in HR system | Update manager in HR system; re-submit request | Contact HR if manager dispute |
| Request stuck "Pending" > 5 days | Approver on leave or missed notification | Check approver status; escalate to next level | After 5 business days |
| "Conflict of Interest" auto-denial | Requesting incompatible access combinations | Review SOD matrix; submit separate request for non-conflicting access | Speak with Compliance if dispute |
| Approved but not provisioned | IT provisioning backlog or technical issue | Contact IT Service Desk with ticket number | After 48 hours for critical access |
| Denied with unclear reason | Generic denial selected by approver | Contact approver directly for clarification | Appeal to Department Head within 5 days |
| Can't find system in dropdown | System not in approved list | Submit "New System Access" form to IT Governance | N/A - different process |

## Usage Notes

- This component is the **most reused component** in the system (used in 12 workflows)
- Average approval time: 1.2 days (Level 1-2), 3.5 days (Level 3-4)
- 87% approval rate overall; 94% for Level 1-2, 68% for Level 3-4
- Quarterly access recertification uses this same approval logic
- Mobile app available for approvers: download "IT Access Approvals"

## Reusability Information

**Currently used in:**
- molecule-system-provisioning: Core step in IT provisioning workflow
- molecule-role-change: Re-approval of access when employee changes roles
- organism-employee-onboarding: Initial access setup for new employees
- molecule-access-recertification: Quarterly review and re-approval
- molecule-contractor-onboarding: Modified version for temporary workers
- [7 additional workflows across IT, HR, Finance, Compliance]

**Available variations:**

- **Standard (v1.3.0)**: Current procedure with 4-level approval matrix
- **Expedited (v1.3.0-exp)**: For business-critical access (requires VP approval to use expedited path)

**Configuration points:**
- Approval timeouts: Configurable per level (currently 2/3/3/5 days)
- Escalation thresholds: Configurable
- Auto-denial vs. auto-escalation: Configurable based on risk
- Conflict of Interest rules: Maintained in SOD matrix (updated quarterly)
- Backup approver routing: Configurable in HR system

## Related Components

- **atom-emergency-access**: For after-hours or critical emergency access (bypasses normal approval with audit trail)
- **atom-access-revocation**: For removing access (termination, role change, security incident)
- **atom-temp-access-approval**: For contractor/temporary worker access (different approval chain and auto-expiration)
- **molecule-access-recertification**: Quarterly review using this approval component

---

## Document Control

**Version**: 1.3.0
**Last Updated**: 2025-10-15
**Owner**: IT Department
**Maintainer**: IT Governance Team
**Next Review**: 2026-01-15

**Change Log:**
- v1.3.0 (2025-10-15): Added conflict-of-interest auto-detection; improved escalation logic - A. Kumar
- v1.2.0 (2025-06-01): Added Level 4 privileged access approval; CISO approval requirement - A. Kumar
- v1.1.0 (2025-02-15): Enhanced audit trail; added mobile approver app support - T. Williams
- v1.0.0 (2024-10-01): Initial release - T. Williams
