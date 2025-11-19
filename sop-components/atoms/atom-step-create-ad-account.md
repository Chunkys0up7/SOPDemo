---
# Core Metadata (Required)
id: atom-step-create-ad-account
type: atom
version: 1.0.0
title: Create Active Directory Account (Step)

# Searchability Metadata
department: IT
processCategory: System Configuration
complexity: Intermediate
audience:
  - Technician/Specialist
  - Individual Contributor

# Taxonomy & Discovery
tags: [reusable, step, active-directory, account-creation, onboarding]
keywords: [active directory, AD, account, user creation, provisioning]

# Compliance & Regulatory
complianceFrameworks: [SOX, SOC 2, ISO 9001]

# Reusability Tracking
reusable: true
usedIn: [molecule-new-user-account-setup, molecule-contractor-provisioning, molecule-employee-reinstatement]
variationCount: 1

# Ownership & Governance
owner: IT Department
maintainer: IT Operations Team Lead
approver: IT Director
lastReviewed: 2025-11-19
nextReview: 2026-02-19
---

# Create Active Directory Account (Procedural Step)

## Purpose

This step-level atom provides the standardized procedure for creating a new Active Directory user account, ensuring consistent naming conventions, organizational unit placement, and initial configuration.

## Description

This is a **procedural step atom** designed to be included in larger workflows (molecules and organisms) that require AD account creation. It provides detailed actions, quality checkpoints, and decision logic for creating user accounts in Active Directory.

## Scope

**Included:**
- Creating new user object in AD
- Configuring account settings (password policy, expiration)
- Setting user properties (department, manager, contact info)
- Assigning basic group memberships
- Verification of account creation

**Excluded:**
- Advanced group memberships (handled by access provisioning step)
- Exchange mailbox creation (handled by email creation step)
- Application-specific permissions (handled by application provisioning)

## Applicability

**Use this step when:**
- Creating accounts for new employees
- Creating accounts for contractors
- Reactivating accounts for returning employees
- Creating service accounts (with modifications)

**Do NOT use this step when:**
- Account already exists (use account reactivation)
- Creating emergency/temporary accounts (use expedited procedure)
- Creating privileged admin accounts (requires security review)

---

## Step Content

### Estimated Time
**10 minutes** per account

### Owner
**IT Provisioning Technician**

### Systems Required
- Active Directory Admin Console (ADSERVER01)
- IT Password Tool
- HR System (for employee data validation)

### Prerequisites
- [ ] User information collected and validated
- [ ] No duplicate accounts exist
- [ ] Organizational unit (OU) structure confirmed
- [ ] Manager account exists in AD

---

## Actions

1. **Open Active Directory Admin Console**
   - Server: ADSERVER01
   - Console: Active Directory Users and Computers
   - Authenticate with provisioning credentials

2. **Navigate to Appropriate Organizational Unit**
   - Path: Users > [Department] > Standard Users
   - If department OU doesn't exist, escalate to AD Admin
   - For contractors: Users > Contractors > [Department]

3. **Create New User Object**
   - Right-click on target OU > New > User
   - Fill in user details:
     - **First name**: [Legal first name from HR system]
     - **Last name**: [Legal last name from HR system]
     - **Full name**: [First] [Last]
     - **User logon name**: [first].[last] (all lowercase)
       - If duplicate, use [first].[middle initial].[last]
       - If still duplicate, append number: [first].[last]2
       - Document naming exception in notes
     - **User logon name (pre-2000)**: [first.last]

4. **Configure Account Settings**
   - **Password**: Generate random 16-character temp password using IT Password Tool
   - **User must change password at next logon**: ✓ CHECKED
   - **User cannot change password**: ☐ UNCHECKED
   - **Password never expires**: ☐ UNCHECKED
   - **Account is disabled**: ☐ UNCHECKED
   - Click "Next" to continue

5. **Set User Properties**

   **General Tab:**
   - Description: [Job Title]
   - Office: [Office Location]
   - Telephone: [Mobile number for MFA]
   - Email: [Will be set after Exchange provisioning]

   **Organization Tab:**
   - Title: [Job Title]
   - Department: [Department name]
   - Company: [Company Name]
   - Manager: [Browse to manager's AD account]
     - Verify manager exists before proceeding

   **Account Tab:**
   - User logon name: [Verify correct]
   - Account expires: [Leave "Never" unless contractor]
     - For contractors: Set to contract end date + 1 week

   **Member Of Tab:**
   - Add to "All-Employees" group (required)
   - Add to "[Department]-Users" group
   - Add to "VPN-Users" group (if remote worker)
   - Do NOT add application-specific groups at this stage

6. **Save and Verify Account Creation**
   - Click "Finish" to create account
   - Verify account appears in correct OU
   - Double-click account to check properties
   - Verify all required fields populated
   - Record username in provisioning tracker spreadsheet

7. **Document Account Creation**
   - Update provisioning ticket with:
     - Created username
     - OU location
     - Temporary password secured in IT Password Tool
     - Any naming convention exceptions
   - Set reminder for AD sync (15 minutes for Azure AD sync)

---

## Decision Logic

**Decision Point**: Username Conflicts

- **IF** username [first].[last] is available → Use standard naming convention
- **IF** username conflict exists → Check for middle initial in HR system
  - **IF** middle initial available → Use [first].[middle].[last]
  - **IF** no middle initial OR still conflict → Use [first].[last]2
  - **ALWAYS** document exception in account description field
- **IF** special characters in name (é, ñ, etc.) → Follow international name policy (KB article #IT-234)

**Decision Point**: Manager Not Found

- **IF** manager exists in AD → Assign manager relationship
- **IF** manager not found → Contact HR to verify manager name
  - **IF** manager is new hire too → Create manager account first
  - **IF** manager doesn't need AD account → Document and skip manager assignment
- **OTHERWISE** → Escalate to IT Operations Manager

**Decision Point**: Department OU Missing

- **IF** standard department OU exists → Proceed with account creation
- **IF** new department/OU needed → Escalate to AD Administrator
  - Do NOT create OUs without approval
  - Place account in "Users > Pending" until OU created
  - Update provisioning ticket with blocker

---

## Quality Checkpoints

| Checkpoint | Verification Criteria | Owner | Recovery Path |
|------------|----------------------|-------|---------------|
| Username Format | Follows naming convention (lowercase, dot-separated) | IT Provisioning Tech | Rename account if incorrect (within 24 hours) |
| Correct OU | Account in department-appropriate OU | IT Provisioning Tech | Move to correct OU immediately |
| Password Policy | "Must change at next logon" is checked | IT Provisioning Tech | Edit account properties to enforce |
| Manager Relationship | Manager field populated and correct | IT Provisioning Tech | Update organization properties |
| Basic Groups | "All-Employees" and department group assigned | IT Provisioning Tech | Add missing group memberships |
| Account Enabled | Account is NOT disabled | IT Provisioning Tech | Enable account via properties |
| Documentation | Username recorded in tracker and ticket | IT Provisioning Tech | Update documentation immediately |

---

## Troubleshooting

| Issue | Symptoms | Root Cause | Solution | Escalation Condition |
|-------|----------|------------|----------|---------------------|
| "Object already exists" error | Cannot create user account | Duplicate account or deleted account in retention period | Search AD for existing account; restore or use alternate username | After 2 naming attempts - escalate to AD Admin |
| Manager not found in AD | Cannot assign manager relationship | Manager name misspelled or manager has no AD account | Verify spelling; check if manager is contractor or external; contact HR | If manager should have account but doesn't - create manager account first |
| Special characters rejected | Cannot create username with accented characters | AD does not support certain Unicode characters | Follow international naming policy; use ASCII equivalents | Complex cases - escalate to AD Admin with HR approval |
| OU permissions denied | Cannot create user in target OU | Provisioning account lacks permissions | Verify logged in with correct admin account; check OU permissions | If permissions issue persists - escalate to AD Admin |
| Account creation succeeds but not visible | Account created but doesn't appear in OU | Replication delay or wrong OU | Wait 5 minutes; search all OUs for account; verify creation succeeded | After 15 minutes - escalate to AD Admin |
| Temp password doesn't meet complexity | Cannot set initial password | Password complexity requirements updated | Use IT Password Tool (always generates compliant passwords); regenerate password | If IT Password Tool fails - escalate to IT Security |

---

## Expected Outcome

**Success Criteria:**
- [ ] Active Directory user account created
- [ ] Account in correct organizational unit
- [ ] Username follows naming convention (documented if exception)
- [ ] User properties fully populated (name, title, department, manager)
- [ ] Temporary password generated and securely stored
- [ ] "User must change password at next logon" is enabled
- [ ] Basic group memberships assigned
- [ ] Account enabled and ready for use
- [ ] Documentation complete in provisioning tracker

**Result**: New AD account ready for email provisioning and application access assignments.

---

## Usage Notes

- This step is typically followed by email account creation (atom-step-create-email-account)
- Allow 15 minutes for AD-to-Azure AD sync before creating Microsoft 365 mailbox
- Temporary password is valid for 48 hours by policy
- Naming convention exceptions must be documented for audit compliance
- This atom is used in 3+ workflows; changes require review of all dependent molecules

## Reusability Information

**Currently used in:**
- molecule-new-user-account-setup: Step 3 of new employee onboarding
- molecule-contractor-provisioning: Step 2 of contractor setup
- molecule-employee-reinstatement: Step 1 of returning employee setup

**Configuration Points:**
- Temporary password validity: 48 hours (configurable in AD Group Policy)
- Password complexity requirements: Defined in domain security policy
- OU structure: Maintained by AD Administrators (request changes via ticket)
- Naming convention: Defined in IT Standards document (IT-STD-002)

## Related Components

- **atom-step-create-email-account**: Next step after AD account creation
- **atom-step-determine-access-requirements**: Defines which groups to add
- **atom-password-reset**: Used for password delivery and user first-login
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
