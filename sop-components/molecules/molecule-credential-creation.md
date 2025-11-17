---
id: molecule-credential-creation
type: molecule
version: 2.0.0
title: Credential Creation Procedure
tags: [security, credentials, access]
composedOf: [atom-access-request-form]
dependencies:
  - atom-access-request-form (v2.1.0+)
---

# Credential Creation Procedure

## Overview

This procedure outlines the secure process for creating user credentials across multiple systems.

## Security Requirements

**IMPORTANT**: All credential creation must follow security best practices:
- Use password generator tools (never user-chosen initial passwords)
- Enable MFA for all accounts
- Follow principle of least privilege
- Document all access grants

## Component: Access Request Form

{{include: atom-access-request-form}}

## Credential Creation Steps

### Step 1: Validate Request

Verify that access request form includes:
- ✓ Employee information complete
- ✓ Manager approval signature
- ✓ IT Security review completed
- ✓ Business justification provided

### Step 2: Generate Secure Credentials

For each system requested, generate credentials:

```plaintext
Username Format: [firstname].[lastname]@company.com
Initial Password:
  - Minimum 16 characters
  - Include uppercase, lowercase, numbers, symbols
  - Generated using approved password manager
  - Never reuse passwords across systems
```

### Step 3: Configure Access Rights

| System | Access Level | Default Settings |
|--------|-------------|------------------|
| Email | Standard User | Mailbox: 50GB, Retention: 7 years |
| CRM | Based on role | Read/Write determined by manager |
| Project Mgmt | Team Member | Can create tasks, cannot delete projects |
| Dev Environment | Developer | Based on team assignment |
| Financial | View Only | Write access requires VP approval |

### Step 4: Enable Security Features

For each account:
1. ✓ Enable Multi-Factor Authentication
2. ✓ Set password expiration (90 days)
3. ✓ Enable login notifications
4. ✓ Set session timeout (30 minutes)
5. ✓ Enable audit logging

### Step 5: Secure Credential Delivery

**Method 1: In-Person (Preferred)**
- Provide credentials during onboarding session
- Verify identity before disclosure
- Require immediate password change

**Method 2: Secure Email**
- Send to personal email (not work email)
- Use encrypted email if available
- Include expiration time for temporary password

**Method 3: Password Manager Share**
- Use enterprise password manager
- Share specific credentials securely
- Set sharing expiration

## Verification Checklist

After credential creation, verify:
- [ ] User can successfully login to all requested systems
- [ ] MFA is properly configured and working
- [ ] User is only in appropriate security groups
- [ ] No excessive permissions granted
- [ ] All access documented in tracking system
- [ ] User notified of credential availability

## Audit Trail

Record in IT Management System:
```json
{
  "employee_id": "EMP-12345",
  "systems_provisioned": ["email", "crm", "project_tools"],
  "created_by": "it.admin@company.com",
  "created_date": "2025-11-12T10:30:00Z",
  "approval_chain": ["manager_id", "it_security_id"],
  "mfa_enabled": true,
  "status": "active"
}
```

## Related Procedures

- See: molecule-account-setup for account creation process
- See: sop-002 for complete IT access provisioning

---
**Version**: 2.0.0
**Last Updated**: 2025-11-01
**Owner**: IT Security Team
