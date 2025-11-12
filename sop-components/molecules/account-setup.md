---
id: molecule-account-setup
type: molecule
version: 1.5.0
title: User Account Setup Process
tags: [onboarding, it, accounts]
composedOf: [atom-access-request-form]
dependencies:
  - atom-access-request-form (v2.1.0+)
---

# User Account Setup Process

This procedure combines multiple steps to create a complete user account setup workflow.

## Prerequisites

- Completed access request form (see: atom-access-request-form)
- Manager approval obtained
- Employee has completed HR paperwork

## Steps

### 1. Verify Request Documentation

Review the completed access request form for:
- All required fields filled
- Manager signature present
- Security requirements identified
- Business justification documented

### 2. Create Base Accounts

```bash
# Standard account creation process
1. Open Active Directory Users and Computers
2. Navigate to appropriate OU: /Users/[Department]
3. Right-click → New → User
4. Enter user details:
   - First Name: [Employee First Name]
   - Last Name: [Employee Last Name]
   - Username: [firstname.lastname]
   - Email: [username]@company.com
```

### 3. Assign Security Groups

Based on the access request form, assign user to appropriate groups:

| System | Security Group | Notes |
|--------|---------------|-------|
| Email | All-Users-Email | Standard for all employees |
| CRM | Sales-Team-CRM | If sales/marketing role |
| Dev Tools | Developers-Group | If technical role |
| Financial | Finance-Access | Requires additional approval |

### 4. Configure Multi-Factor Authentication

1. Enable MFA for user account
2. Send enrollment instructions to user's personal email
3. Verify MFA setup during first login

### 5. Set Password Policy

- Initial temporary password: Generate using password generator
- Require password change on first login
- Password complexity: Enabled
- Password expiration: 90 days

### 6. Documentation

Record the following in IT tracking system:
- Date account created
- Systems provisioned
- Security group memberships
- MFA status
- Created by (IT staff member)

## Expected Timeline

- Account creation: 1-2 hours
- Directory synchronization: 15-30 minutes
- User notification: Within 24 hours

## Troubleshooting

**Issue**: Account not syncing to cloud services
**Solution**: Force manual sync or wait for next scheduled sync (every 30 minutes)

**Issue**: User cannot login
**Solution**: Verify account is enabled, password is set correctly, and MFA is configured

## Related Procedures

- See: organism-first-day-workflow for complete onboarding process
- See: sop-002 for IT System Access Provisioning

---
**Last Updated**: 2025-10-15
**Owner**: IT Department
**Reviewed By**: John Doe
