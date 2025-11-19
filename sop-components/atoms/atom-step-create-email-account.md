---
# Core Metadata (Required)
id: atom-step-create-email-account
type: atom
version: 1.0.0
title: Create Email Account and Configure Microsoft 365 Services (Step)

# Searchability Metadata
department: IT
processCategory: System Configuration
complexity: Intermediate
audience:
  - Technician/Specialist
  - Individual Contributor

# Taxonomy & Discovery
tags: [reusable, step, email, microsoft-365, office-365, exchange]
keywords: [email, mailbox, Microsoft 365, Office 365, Exchange, license, Teams]

# Compliance & Regulatory
complianceFrameworks: [SOX, SOC 2, HIPAA, ISO 9001]

# Reusability Tracking
reusable: true
usedIn: [molecule-new-user-account-setup, molecule-contractor-provisioning]
variationCount: 1

# Ownership & Governance
owner: IT Department
maintainer: IT Operations Team Lead
approver: IT Director
lastReviewed: 2025-11-19
nextReview: 2026-02-19
---

# Create Email Account and Configure Microsoft 365 Services (Procedural Step)

## Purpose

This step-level atom provides the standardized procedure for creating Microsoft 365 email accounts and configuring associated services (Teams, SharePoint, OneDrive) after Active Directory account creation.

## Description

This is a **procedural step atom** that handles the complete Microsoft 365 provisioning process, including license assignment, mailbox creation, service configuration, and security feature enablement.

## Scope

**Included:**
- Verifying AD-to-Azure AD sync completion
- Assigning Microsoft 365 licenses
- Configuring Exchange Online mailbox settings
- Enabling Teams, SharePoint, and OneDrive access
- Configuring security features (MFA, auditing)

**Excluded:**
- Active Directory account creation (prerequisite step)
- Application-specific licenses (Visio, Project, Power BI)
- Advanced Exchange configuration (distribution lists, shared mailboxes)

## Applicability

**Use this step when:**
- Creating email for new employees
- Creating email for contractors (with limited license)
- Reactivating email for returning employees

**Do NOT use this step when:**
- Creating shared mailboxes (use different procedure)
- Migrating email from external provider (use migration workflow)
- Creating resource mailboxes (conference rooms, equipment)

---

## Step Content

### Estimated Time
**15 minutes** per account (includes wait time for provisioning)

### Owner
**IT Provisioning Technician**

### Systems Required
- Microsoft 365 Admin Center
- Active Directory (for sync verification)
- IT Service Portal (for license tracking)

### Prerequisites
- [ ] Active Directory account created (atom-step-create-ad-account completed)
- [ ] AD-to-Azure AD sync completed (15 minutes after AD account creation)
- [ ] Microsoft 365 licenses available
- [ ] User not already synced with existing mailbox

---

## Actions

1. **Verify AD Sync Completed**
   - Wait 15 minutes after AD account creation for automatic sync
   - Open Microsoft 365 Admin Center: https://admin.microsoft.com
   - Navigate to: Users > Active Users
   - Search for: [username] or [first.last]@company.com
   - **IF** user appears → Proceed to step 2
   - **IF** user not present after 15 minutes → Manually trigger sync:
     - Open PowerShell on ADSERVER01
     - Run: `Start-ADSyncSyncCycle -PolicyType Delta`
     - Wait 5 more minutes and check again

2. **Assign Microsoft 365 License**
   - In Microsoft 365 Admin Center, select the user
   - Click on "Licenses and Apps" tab
   - Select license type based on user role:
     - **Standard employees**: Microsoft 365 E3
     - **Contractors**: Microsoft 365 Business Basic
     - **Executives**: Microsoft 365 E5
   - Enable the following services:
     - ✓ Exchange Online (Plan 2)
     - ✓ SharePoint Online
     - ✓ Microsoft Teams
     - ✓ Office Apps (desktop)
     - ✓ OneDrive for Business
     - ☐ Yammer (disable - not used)
     - ☐ Sway (disable - not used)
   - Click "Save changes"
   - Wait for "License assigned successfully" confirmation

3. **Wait for Mailbox Provisioning**
   - Mailbox creation is automatic after license assignment
   - Typical provisioning time: 10-15 minutes
   - Monitor provisioning status:
     - Navigate to: Users > Active Users > [User] > Mail tab
     - Look for: "Mailbox is being created..."
     - Refresh every 3-5 minutes
   - **Success indicator**: Email address appears as [first.last]@company.com

4. **Configure Mailbox Settings**

   Once mailbox is fully provisioned:

   **Basic Settings:**
   - Mailbox quota: 50 GB (default for E3)
   - Archive mailbox: Enable (for compliance)
   - Litigation hold: Enable (for regulated departments: Finance, HR, Legal)
   - Retention policy: Apply "Default-7-Year-Retention"

   **Out-of-Office Auto-Reply (First Day Only):**
   - Navigate to: Exchange Admin Center > Recipients > Mailboxes
   - Select user > Mailbox features
   - Enable automatic replies for Day 1:
     ```
     I am new to the organization and setting up my email.
     If urgent, please contact my manager [Manager Name] at [Manager Email].
     ```
   - Set to disable automatically after 24 hours

   **Email Signature:**
   - Apply company email signature template via Exchange transport rule
   - Signature includes: Name, Title, Department, Phone, Company logo

5. **Configure Additional Microsoft 365 Services**

   **Microsoft Teams:**
   - Add to company-wide teams:
     - "All Employees" (announcements)
     - "General - Company Updates"
   - Add to department team:
     - Navigate to Teams admin center
     - Search for "[Department] Team"
     - Add user as member

   **SharePoint Online:**
   - Grant access to company intranet: https://company.sharepoint.com
   - Grant access to department SharePoint site
   - Permissions applied automatically via AD group membership

   **OneDrive for Business:**
   - Auto-provisioned with mailbox creation
   - Storage quota: 1 TB (default)
   - Verify OneDrive provisioned: User can access https://company-my.sharepoint.com

6. **Enable Security Features**

   **Multi-Factor Authentication (MFA):**
   - Navigate to: Azure AD > Users > [User] > Authentication methods
   - Enable MFA enforcement
   - Set grace period: 14 days (user has 14 days to enroll)
   - Require authentication methods: Microsoft Authenticator app + SMS backup

   **Conditional Access:**
   - Apply "Standard User" conditional access policy
   - Policy enforces:
     - MFA required from untrusted locations
     - MFA required for mobile device access
     - Block legacy authentication protocols

   **Mailbox Auditing:**
   - Navigate to: Security & Compliance Center > Audit
   - Enable mailbox auditing for user
   - Audit actions: Send, Receive, Delete, Move, Permissions changes
   - Retention: 90 days (compliance requirement)

7. **Verify Email Account and Services**

   **Send Test Email:**
   - From admin account, send test email to: [first.last]@company.com
   - Subject: "Welcome - Email Account Test"
   - Verify email delivered successfully

   **Check Service Status:**
   - Exchange Online: ✓ Active
   - Teams: ✓ Enabled
   - OneDrive: ✓ Provisioned
   - SharePoint: ✓ Access granted
   - MFA: ✓ Enrollment required

   **Update Documentation:**
   - Record email address in provisioning tracker
   - Update provisioning ticket with mailbox creation timestamp
   - Note any license exceptions or special configurations

---

## Decision Logic

**Decision Point**: User Not Synced After 15 Minutes

- **IF** AD sync completed less than 15 minutes ago → Wait 5 more minutes
- **IF** 15-20 minutes elapsed → Manually trigger AD sync
- **IF** 30+ minutes elapsed → Check AD sync status for errors
  - Verify AD account exists and is enabled
  - Check Azure AD Connect sync service on ADSERVER01
  - **IF** sync service has errors → Escalate to AD Administrator
- **OTHERWISE** → Escalate to Microsoft 365 Administrator

**Decision Point**: Mailbox Not Provisioned After 20 Minutes

- **IF** license assigned correctly → Wait 10 more minutes (up to 30 min total)
- **IF** "No mailbox" error after 30 minutes → Check license assignment
  - Verify sufficient licenses available in tenant
  - Remove and re-assign license
  - Wait another 15 minutes
- **IF** still no mailbox after re-assignment → Escalate to Microsoft Support

**Decision Point**: Email Address Conflict

- **IF** email [first.last]@company.com available → Use standard format
- **IF** email already exists:
  - Check if account belongs to departed employee
    - **IF** yes → Follow offboarding deletion process first
  - **IF** current active user → Use [first].[middle].[last]@company.com
  - **IF** still conflict → Use [first.last2]@company.com
- **ALWAYS** document email address exceptions

**Decision Point**: License Type Selection

- **IF** full-time employee → Microsoft 365 E3
- **IF** contractor with < 6 month engagement → Microsoft 365 Business Basic
- **IF** executive or C-level → Microsoft 365 E5 (requires approval)
- **IF** specialized role (developer, designer) → May require additional licenses (Visual Studio, Adobe CC)

---

## Quality Checkpoints

| Checkpoint | Verification Criteria | Owner | Recovery Path |
|------------|----------------------|-------|---------------|
| AD Sync Complete | User appears in Microsoft 365 admin center | IT Provisioning Tech | Manually trigger sync; wait 5 minutes |
| License Assigned | License shows "Assigned" status | IT Provisioning Tech | Re-assign license; check license availability |
| Mailbox Provisioned | Email address active ([first.last]@company.com) | IT Provisioning Tech | Wait up to 30 min; escalate if not provisioned |
| Test Email Sent | Test email delivered to mailbox | IT Provisioning Tech | Check mailbox status; verify Exchange Online service health |
| MFA Enabled | MFA enrollment required on user account | IT Provisioning Tech | Apply MFA policy manually via Azure AD |
| Teams Access | User added to company-wide teams | IT Provisioning Tech | Manually add to teams via Teams admin center |
| Security Policies Applied | Conditional access and auditing enabled | IT Provisioning Tech | Verify policy assignments in Azure AD |

---

## Troubleshooting

| Issue | Symptoms | Root Cause | Solution | Escalation Condition |
|-------|----------|------------|----------|---------------------|
| User not syncing to Azure AD | User doesn't appear in M365 admin center after 20 min | AD sync service failure or account in non-synced OU | Check AD Connect sync status; verify account in correct OU; manually trigger sync | If AD Connect has errors - escalate to AD Admin |
| "No mailbox" after license assignment | Mailbox not created after 30 minutes | License not fully processed or Exchange provisioning delay | Remove and re-assign license; wait 15 more minutes; check Microsoft 365 service health | After 1 hour total - escalate to Microsoft Support |
| Test email bounces | "User not found" or "mailbox unavailable" | Email routing not configured or mailbox not fully provisioned | Verify email address correct; check mailbox status in Exchange admin center | If mailbox shows active but email bounces - escalate to Exchange Admin |
| MFA not enforcing | User can login without MFA prompt | Conditional access policy not applied | Manually apply MFA policy; verify user not in exclusion group; check Azure AD conditional access | If policy applied but not enforcing - escalate to Security team |
| Teams not accessible | User cannot access Teams app or web | Teams license not enabled or provisioning delay | Verify Teams enabled in license assignment; wait 30 minutes for provisioning | After 1 hour - escalate to Teams Administrator |
| OneDrive not provisioning | User has no OneDrive storage | OneDrive not enabled in license or user never accessed | Verify OneDrive enabled; have user navigate to OneDrive URL to trigger provisioning | If still not provisioning after user access - escalate to SharePoint Admin |

---

## Expected Outcome

**Success Criteria:**
- [ ] User synced from AD to Azure AD
- [ ] Microsoft 365 license assigned (E3, Business Basic, or E5)
- [ ] Exchange Online mailbox active and accessible
- [ ] Email address confirmed: [first.last]@company.com
- [ ] Test email sent and received successfully
- [ ] Teams access configured (company-wide and department teams)
- [ ] SharePoint intranet access granted
- [ ] OneDrive provisioned (1 TB storage)
- [ ] MFA enrollment required (14-day grace period)
- [ ] Conditional access policies applied
- [ ] Mailbox auditing enabled
- [ ] Documentation updated in provisioning tracker

**Result**: New employee has fully functional Microsoft 365 email and collaboration services, ready for Day 1 productivity.

---

## Usage Notes

- Always complete AD account creation (atom-step-create-ad-account) before this step
- Allow 15 minutes between AD creation and starting this step (for sync)
- This step requires approximately 25-30 minutes total (including wait times)
- License costs are tracked per user; document license type in provisioning tracker
- MFA enforcement has a 14-day grace period to allow user setup on Day 1

## Reusability Information

**Currently used in:**
- molecule-new-user-account-setup: Step 4 of new employee onboarding
- molecule-contractor-provisioning: Step 3 of contractor setup (with Business Basic license)
- molecule-employee-reinstatement: Step 2 of returning employee reactivation

**Configuration Points:**
- License type: E3 (standard), Business Basic (contractors), E5 (executives)
- Mailbox quota: 50 GB (configurable per department)
- Retention policy: 7-year retention (compliance requirement)
- MFA grace period: 14 days (configurable via conditional access)
- OneDrive quota: 1 TB (default, can increase to 5 TB for specific roles)

## Related Components

- **atom-step-create-ad-account**: Prerequisite step (must complete before email creation)
- **atom-password-reset**: Used for secure credential delivery after account setup
- **molecule-new-user-account-setup**: Primary consumer of this step

---

## Document Control

**Version**: 1.0.0
**Last Updated**: 2025-11-19
**Owner**: IT Department
**Maintainer**: IT Operations Team Lead
**Next Review**: 2026-02-19

**Change Log:**
- v1.0.0 (2025-11-19): Initial release as step-level atom - extracted from molecule-new-user-account-setup v2.0.0
