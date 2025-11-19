---
# Core Metadata (Required)
id: molecule-new-user-account-setup
type: molecule
version: 2.0.0
title: New User Account Setup and Provisioning

# Searchability Metadata
department: IT
processCategory: System Configuration
complexity: Intermediate
audience:
  - Technician/Specialist
  - Individual Contributor

# Taxonomy & Discovery
tags: [workflow, onboarding, standard, critical]
keywords: [account, setup, provisioning, new hire, user creation, access]
estimatedDuration: 45-60 minutes

# Compliance & Regulatory
complianceFrameworks: [SOX, HIPAA, SOC 2, ISO 9001]

# Component Composition (Hybrid: Atoms + Inline Steps)
composedOf: [atom-step-create-ad-account, atom-step-create-email-account, atom-access-request-approval, atom-password-reset]
dependencies:
  - atom-step-create-ad-account (v1.0.0+)
  - atom-step-create-email-account (v1.0.0+)
  - atom-access-request-approval (v1.0.0+)
  - atom-password-reset (v2.0.0+)

# Reusability Tracking
reusable: true
usedIn: [organism-employee-onboarding-workflow, organism-contractor-onboarding]
variationCount: 2

# Ownership & Governance
owner: IT Department
maintainer: IT Operations Team Lead
approver: IT Director
lastReviewed: 2025-11-10
nextReview: 2026-02-10
---

# New User Account Setup and Provisioning

## Purpose

This procedure ensures consistent, compliant account creation and system access provisioning for new employees, supporting Day 1 productivity while maintaining security and regulatory compliance.

## Overview

The New User Account Setup procedure is a critical multi-step workflow that combines identity verification, access approval, account creation, and initial credential setup. This procedure is executed for every new hire and is essential for onboarding success, typically completing 24-48 hours before the employee's start date.

**Key Deliverables:**
- Active Directory account created
- Corporate email account configured
- Initial password set and delivered securely
- Core system access provisioned
- Mobile device enrolled (if applicable)
- Welcome email sent with credentials and next steps

## Scope

**This procedure includes:**
- Creating new user accounts in all core systems (AD, email, SSO)
- Provisioning standard access based on job role
- Initial password setup and secure delivery
- Basic security configuration (MFA enrollment)
- Verification and testing of all provisioned access

**This procedure does NOT include:**
- Specialized/custom system access (handled separately by application owners)
- Hardware procurement (see atom-device-procurement)
- Physical office access (see atom-badge-creation)
- Training enrollment (handled by HR)

## Applicability

**Use this procedure for:**
- Full-time employees starting employment
- Part-time employees requiring system access
- Returning employees after > 6 months gap

**Do NOT use this procedure for:**
- Contractors/temporary workers (use molecule-contractor-provisioning)
- Role changes for existing employees (use molecule-role-change-access)
- Rehires within 6 months (account may still be active - use molecule-account-reactivation)

**Prerequisites**

Before starting, verify:
- [ ] New hire paperwork completed in HR system (Workday)
- [ ] Start date confirmed (at least 48 hours in advance)
- [ ] Manager assigned in HR system
- [ ] Job title and department populated in HR system
- [ ] Equipment requisition submitted and approved
- [ ] Office location and seating assignment confirmed

## Components Used

This molecule uses a **hybrid construction approach** combining:
- **Reusable step atoms**: Standardized procedures used across multiple workflows
- **Inline prose steps**: Workflow-specific steps written directly in this molecule

### Reusable Step Atoms

**atom-step-create-ad-account** (Step 3)
- **Purpose**: Standardized Active Directory account creation
- **Reused in**: New hire onboarding, contractor provisioning, employee reinstatement
- **Why reusable**: AD account creation process is identical across all user types

**atom-step-create-email-account** (Step 4)
- **Purpose**: Microsoft 365 license assignment and mailbox provisioning
- **Reused in**: New hire onboarding, contractor provisioning (with different license)
- **Why reusable**: Email provisioning follows same technical process for all users

**atom-access-request-approval** (Step 6)
- **Purpose**: Determines and approves system access based on role
- **Reused in**: Access requests, role changes, new provisioning
- **Why reusable**: Approval workflow is consistent across all access scenarios

**atom-password-reset** (Step 5)
- **Purpose**: Secure password generation and delivery
- **Reused in**: Password resets, new accounts, account recovery
- **Why reusable**: Password handling must follow same security procedure everywhere

### Inline Prose Steps

**Step 1: Gather New Hire Information**
- **Why inline**: Highly specific to new hire workflow (collects HR system data)
- **Not reused**: Contractor/reinstatement workflows gather different data

**Step 2: Determine Standard Access Requirements**
- **Why inline**: New hire-specific logic (job title matrix, manager approval)
- **Could be atomized**: If access determination becomes standardized across workflows

**Step 7: Final Verification and Documentation**
- **Why inline**: Workflow-specific completion checklist and stakeholder notifications
- **Not reused**: Each workflow has different success criteria

## Procedure Steps

### Step 1: Gather New Hire Information

**Estimated time:** 10 minutes
**Owner:** IT Provisioning Technician
**System:** HR System (Workday) + IT Service Portal

**Actions:**

1. Log into Workday HR system
2. Navigate to "Pending New Hires" report
3. Filter for start dates in next 3-5 business days
4. For each new hire, collect:
   - Full legal name (as it will appear on all accounts)
   - Employee ID (assigned by HR)
   - Job title
   - Department
   - Manager name and email
   - Start date
   - Office location
   - Phone number (mobile preferred for MFA)
   - Personal email (for pre-start communication)

5. Verify no duplicate accounts exist:
   - Search Active Directory for name
   - Search email system for name
   - If potential duplicate found, contact HR before proceeding

**Quality Checkpoint:**
- [ ] All required information collected and verified
- [ ] Start date is at least 48 hours away (sufficient time for provisioning)
- [ ] Manager information is accurate (will be used for access approvals)
- [ ] No duplicate accounts detected

**Decision Point:**
- **IF** all information complete AND no duplicates → Proceed to Step 2
- **IF** missing critical information → Contact HR; pause until information provided
- **IF** duplicate account suspected → Contact HR to verify; may be rehire situation
- **IF** start date < 48 hours → Flag as "urgent" and notify IT Manager

---

### Step 2: Determine Standard Access Requirements

**Estimated time:** 15 minutes
**Owner:** IT Provisioning Technician
**System:** IT Service Portal + Access Matrix

**Actions:**

1. **Review Job Title Access Matrix**
   - Open IT Service Portal > Resources > "Standard Access by Job Title"
   - Search for new hire's job title
   - Review default access package

2. **Standard Access Typically Includes:**

   **Level 1 (Auto-approved for all employees):**
   - Active Directory account
   - Corporate email (Exchange Online)
   - Microsoft 365 (Word, Excel, PowerPoint, Teams)
   - Company Intranet (SharePoint)
   - VPN access (if remote)

   **Level 2 (Manager approval required):**
   - Department-specific applications (varies by dept)
   - Shared drives for department
   - CRM system (for Sales, Marketing, Customer Service)
   - Project management tools (Asana, Jira)

   **Level 3+ (Multi-level approval required):**
   - Financial systems (for Finance dept only)
   - HR systems (for HR dept only)
   - IT admin tools (for IT dept only)
   - Database access (for Engineering/Data teams)

3. **Create Access Request Ticket**
   - IT Service Portal > "New User Access Request"
   - Enter new hire information
   - Select access package based on job title matrix
   - Add business justification: "New hire - [Job Title] - Start date [Date]"
   - Submit for approval

**Quality Checkpoint:**
- [ ] Access package matches job title in matrix
- [ ] Manager name is correct (will receive approval request)
- [ ] Special requirements noted (if any)
- [ ] Request submitted at least 36 hours before start date

**Decision Point:**
- **IF** standard job title with defined access package → Submit standard access request
- **IF** job title not in matrix → Contact hiring manager for specific access needs
- **IF** privileged access required (Level 3+) → Flag for IT Security review
- **IF** new role/new job title → Escalate to IT Manager to define new access package

**Note:** This step initiates the {{atom-access-request-approval}} workflow. Proceed to Step 3 while waiting for approvals.

---

### Step 3: Create Active Directory Account

{{include: atom-step-create-ad-account}}

---

### Step 4: Create Email Account and Configure Services

{{include: atom-step-create-email-account}}

---

### Step 5: Configure Initial Password and Secure Delivery

**Estimated time:** 5 minutes
**Owner:** IT Provisioning Technician
**System:** IT Password Tool + Email

**This step uses:** {{atom-password-reset}} (Help Desk Assisted variant)

**Actions:**

1. **Generate Secure Temporary Password**
   - Use IT Password Tool
   - Generate 16-character random password
   - Meets all complexity requirements automatically
   - Password valid for 48 hours (covers start date)

2. **Document Credentials Securely**
   - DO NOT email password
   - DO NOT save password in plain text
   - Use IT Password Tool > "Secure Credential Delivery"
   - Enter:
     - New hire username
     - New hire personal email (for notification)
     - Manager email (for awareness)
   - Tool generates encrypted credential package

3. **Deliver Welcome Email to Personal Email**
   - To: [New hire personal email]
   - CC: [Manager email]
   - Subject: "Welcome to [Company]! - Your IT Account is Ready"
   - Body template:

   ```
   Dear [First Name],

   Welcome to [Company]! We're excited for you to join us on [Start Date].

   Your IT accounts have been created and are ready for use. Please review the
   information below carefully.

   **Your Username:** [first.last]
   **Email Address:** [first.last]@company.com

   **Accessing Your Password:**
   For security, your temporary password has been sent via encrypted delivery.
   You will receive a separate email with a link to retrieve your password.
   This link expires in 48 hours.

   **First-Time Login Instructions:**
   1. Visit: https://portal.company.com
   2. Enter your username (above)
   3. Retrieve your temporary password from the encrypted delivery
   4. You will be required to change your password immediately
   5. Set up multi-factor authentication (MFA) - follow on-screen prompts

   **Important:**
   - Your temporary password expires in 48 hours
   - You must change it on first login
   - Your manager has been copied on this email
   - For any issues before your start date, contact IT Help Desk: (555) 123-4567

   **On Your First Day:**
   - Report to reception at [Office Address]
   - Bring a photo ID
   - You'll receive your laptop and office badge
   - Your onboarding schedule will be provided by HR

   Welcome aboard!

   IT Operations Team
   ```

4. **Verify Delivery**
   - Confirm welcome email sent successfully
   - Confirm encrypted password email sent via IT Password Tool
   - Update provisioning tracker with delivery status
   - Set reminder to check if new hire successfully logged in on Day 1

**Quality Checkpoint:**
- [ ] Temporary password generated (16 characters, complex)
- [ ] Welcome email sent to personal email
- [ ] Encrypted password delivery sent separately
- [ ] Manager copied on welcome email
- [ ] Provisioning tracker updated

**Decision Point:**
- **IF** no personal email available → Contact HR; deliver credentials to manager for Day 1 handoff
- **IF** new hire is remote → Include VPN setup instructions in welcome email
- **IF** new hire starts in < 24 hours → Call new hire to verify receipt of emails

---

### Step 6: Verify Access Approvals and Complete Provisioning

**Estimated time:** 10 minutes (may require waiting for approvals)
**Owner:** IT Provisioning Technician
**System:** IT Service Portal

**Actions:**

1. **Check Access Request Status**
   - Return to access request ticket from Step 2
   - Verify approval status:
     - Level 1: Auto-approved ✓
     - Level 2: Manager approval (check status)
     - Level 3+: Multi-approver status (check status)

2. **Process Approved Access Requests**
   - For each approved system:
     - Log into application admin console
     - Create user account or add to existing account
     - Assign appropriate role/permissions
     - Verify account creation
     - Document in provisioning tracker

3. **Common System Provisioning:**

   **CRM (Salesforce):**
   - Admin > Users > New User
   - Assign profile based on role
   - Assign to appropriate sales/service team

   **Project Management (Jira/Asana):**
   - Invite user via email address
   - Add to default projects for department
   - Assign viewer/contributor role

   **Shared Drives:**
   - Add AD account to security group
   - Verify permissions propagate (may take 15 min)

   **VPN (if approved):**
   - Generate VPN certificate
   - Email VPN setup instructions to corporate email
   - Include link to VPN client download

4. **Handle Pending or Denied Requests**
   - If still pending: Send reminder to approver
   - If denied: Contact manager to discuss alternative
   - Document any pending items for Day 1 follow-up

**Quality Checkpoint:**
- [ ] All approved access provisioned
- [ ] Each system account verified with test login
- [ ] Provisioning tracker fully updated
- [ ] Any pending items documented and scheduled

**Decision Point:**
- **IF** all access approved and provisioned → Proceed to Step 7
- **IF** Level 3+ access pending after 24 hours → Escalate to IT Security Manager
- **IF** access denied → Contact hiring manager; may need new justification
- **IF** start date is tomorrow and approvals pending → Provision Level 1-2, schedule Level 3+ for Day 1

---

### Step 7: Final Verification and Documentation

**Estimated time:** 10 minutes
**Owner:** IT Provisioning Technician
**System:** IT Service Portal + Test Account

**Actions:**

1. **Perform End-to-End Test**
   - Attempt login to portal with new credentials
   - Verify password change process works
   - Confirm email account accessible
   - Check Teams access
   - Verify VPN (if applicable)
   - Test one Level 2 application (if provisioned)

2. **Complete Provisioning Checklist**
   - [ ] Active Directory account created
   - [ ] Email account active
   - [ ] Temporary password delivered securely
   - [ ] Welcome email sent
   - [ ] Manager notified
   - [ ] All approved system access provisioned
   - [ ] MFA enrollment enabled
   - [ ] Security policies applied
   - [ ] Test login successful

3. **Update Documentation**
   - Mark ticket as "Completed"
   - Update provisioning tracker spreadsheet
   - Add notes for any pending items
   - Set Day 1 follow-up reminder

4. **Notify Stakeholders**
   - Send "Provisioning Complete" email to:
     - Hiring manager
     - HR onboarding coordinator
     - IT Help Desk (for awareness)
   - Include:
     - Username
     - Email address
     - Provisioned systems list
     - Any pending items requiring follow-up
     - Help Desk contact for Day 1 support

**Quality Checkpoint:**
- [ ] Test login successful
- [ ] All checklist items complete
- [ ] Documentation updated
- [ ] Stakeholders notified
- [ ] Day 1 support plan confirmed

**Decision Point:**
- **IF** test login fails → Troubleshoot immediately; verify AD account, password, and policies
- **IF** any critical access not provisioned → Escalate to IT Manager; may need Day 1 manual workaround
- **IF** all verifications pass → Mark complete and close ticket

---

## Expected Outcome

**Success criteria:**
- [ ] New hire can log in with username/password on Day 1
- [ ] Corporate email account is accessible
- [ ] Microsoft 365 apps are available
- [ ] All approved system access is provisioned and tested
- [ ] New hire received welcome email with clear instructions
- [ ] Manager is aware of account creation and any pending items
- [ ] Documentation is complete and accurate

**Result:** New employee has full IT account ready for Day 1, supporting immediate productivity and positive onboarding experience. Average setup time: 45-60 minutes per user, with 98% Day 1 readiness rate.

## Quality Assurance

| Checkpoint | Verification Criteria | Owner | Recovery Path |
|------------|----------------------|-------|---------------|
| Information Gathering | All required HR data available and accurate | IT Provisioning Tech | Contact HR; cannot proceed without complete info |
| Access Approval | Manager approved within SLA (2 days for Level 2) | IT Provisioning Tech | Send approval reminder; escalate if urgent |
| Account Creation | AD account created with correct OU, groups, manager | IT Provisioning Tech | Delete and recreate if misconfigured |
| Email Provisioning | Mailbox active and can send/receive email | IT Provisioning Tech | Check license assignment; verify AD sync |
| Credential Delivery | New hire received and acknowledged welcome email | IT Provisioning Tech | Resend or contact via manager |
| Day 1 Login | New hire successfully logged in on first day | Help Desk | Help Desk provides immediate support |

## Troubleshooting

| Issue | Symptoms | Root Cause | Solution | Escalation Condition |
|-------|----------|------------|----------|---------------------|
| AD account creation fails | Error: "Object already exists" | Duplicate account or deleted account in retention | Search for existing account; restore or rename new account | Cannot resolve duplicate - escalate to AD admin |
| Email not provisioned after 30 min | User appears in M365 but no mailbox | License not assigned or sync issue | Verify license; trigger manual AD sync; wait 15 more minutes | After 1 hour - escalate to Microsoft support |
| Approval stuck "Pending" | Manager hasn't responded to approval request | Email in spam; manager on leave; unclear request | Check manager availability; resend reminder; clarify justification | After 2 days - escalate to department head |
| Test login fails | "Invalid credentials" error | Password sync issue; account not fully propagated | Wait 30 minutes for full propagation; verify password is correct; check account is enabled | After 2 hours - escalate to AD admin |
| Welcome email bounced | Personal email invalid or full mailbox | Incorrect email in HR system | Contact new hire via phone; get corrected email; resend | Cannot reach new hire - notify hiring manager |
| VPN access not working | VPN connects but no network access | Security group membership not propagated | Verify AD group membership; wait for replication; test again | After 4 hours - engage Network team |

## Exception Handling

**Common exceptions:**

1. **Exception:** Rush provisioning (start date < 48 hours)
   - **Action:** Flag as "urgent"; prioritize queue; provision Level 1 immediately; schedule Level 2+ for Day 1
   - **Approval required:** IT Operations Manager (for overtime/after-hours work)

2. **Exception:** Non-standard access requirements (not in job title matrix)
   - **Action:** Contact hiring manager for detailed requirements; submit custom access request
   - **Approval required:** Department Head + IT Security (for any non-standard access)

3. **Exception:** International/remote new hire (different time zone)
   - **Action:** Follow standard procedure; include time zone in all communications; schedule welcome call if needed
   - **Approval required:** No exception approval needed (standard procedure)

4. **Exception:** Executive/C-Level hire
   - **Action:** Use "Executive Provisioning" checklist (enhanced security, mobile device management, executive support)
   - **Approval required:** CIO awareness required; CISO reviews security policies

## Compliance Notes

This procedure supports compliance with multiple frameworks:

- **SOX:** Access approval workflows documented and auditable; separation of duties enforced
- **HIPAA:** MFA enforced; mailbox auditing enabled; minimum necessary access principle applied
- **SOC 2:** Complete audit trail of account creation, approvals, and access grants; security policies automatically applied
- **ISO 9001:** Standardized, documented process with quality checkpoints and continuous improvement tracking

**Audit Requirements:**
- All provisioning tickets retained for 7 years
- Access approval records retained for 7 years
- Quarterly access recertification required (separate process)
- Annual review of this procedure required

## Reusability Information

**Currently used in:**
- organism-employee-onboarding-workflow: Core component of comprehensive employee onboarding (Day -2 to Day 90)
- organism-contractor-onboarding: Modified version for temporary workers (shorter retention, different approvals)
- molecule-employee-reinstatement: For returning employees after leave of absence

**Available variations:**

- **Standard (v2.0.0)**: Current procedure for full-time employees
- **Expedited (v2.0.0-exp)**: For same-day or next-day urgent provisioning (requires manager approval)
- **Executive (v2.0.0-exec)**: Enhanced procedure for C-level with additional security and support

**Configuration points:**
- Access package by job title: Maintained in "Standard Access Matrix" (reviewed quarterly)
- Approval thresholds: Defined in {{atom-access-request-approval}} configuration
- Temporary password validity: Currently 48 hours (configurable in AD policy)
- MFA grace period: Currently 14 days (configurable in Conditional Access)

## Related Procedures

- **molecule-role-change-access**: For existing employees changing roles (different approval flow)
- **molecule-employee-termination**: For removing access when employee leaves
- **molecule-access-recertification**: Quarterly review and re-certification of all access
- **organism-employee-onboarding-workflow**: Complete onboarding process (this molecule is a component)

---

## Document Control

**Version**: 2.0.0
**Last Updated**: 2025-11-10
**Owner**: IT Department
**Maintainer**: IT Operations Team Lead
**Approver**: IT Director
**Next Review**: 2026-02-10

**Change Log:**
- v2.0.0 (2025-11-10): Major revision - added MFA enforcement, enhanced security policies, updated for Microsoft 365 E3 - R. Johnson
- v1.5.0 (2025-07-15): Added VPN provisioning steps; improved troubleshooting section - R. Johnson
- v1.2.0 (2025-04-01): Integrated {{atom-access-request-approval}} v1.3.0; automated approval routing - M. Davis
- v1.0.0 (2024-12-01): Initial release - M. Davis

**Dependency Version Requirements:**
- atom-access-request-approval: v1.0.0+
- atom-password-reset: v2.0.0+
