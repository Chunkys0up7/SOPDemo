---
# Core Metadata (Required)
id: atom-password-reset
type: atom
version: 2.1.0
title: Password Reset Procedure

# Searchability Metadata
department: IT
processCategory: Troubleshooting
complexity: Basic
audience:
  - Individual Contributor
  - Technician/Specialist
  - Customer/External User

# Taxonomy & Discovery
tags: [reusable, core, authentication, security]
keywords: [password, reset, authentication, credentials, login, access]

# Compliance & Regulatory
complianceFrameworks: [SOX, HIPAA, SOC 2]

# Reusability Tracking
reusable: true
usedIn: [molecule-account-recovery, molecule-user-onboarding, organism-it-support-workflow]
variationCount: 3

# Ownership & Governance
owner: IT Department
maintainer: IT Security Team Lead
approver: CISO
lastReviewed: 2025-11-01
nextReview: 2026-02-01
---

# Password Reset Procedure

## Purpose

This component provides a standardized, secure password reset procedure that ensures compliance with security policies while maintaining user accessibility and audit trail requirements.

## Description

The Password Reset Procedure is a reusable atomic component designed for inclusion in help desk, onboarding, and account recovery workflows. It enforces security best practices including identity verification, password complexity requirements, and activity logging.

## Scope

**Included:**
- Identity verification before reset
- Standard password reset via self-service portal
- Help desk-assisted password reset
- Password complexity validation
- Activity logging for compliance

**Excluded:**
- Account unlock procedures (see atom-account-unlock)
- Multi-factor authentication reset (see atom-mfa-reset)
- Emergency admin password reset (requires CISO approval)

## Applicability

**Use this component when:**
- User has forgotten password and can verify identity
- Password has expired per policy (90 days)
- Security team requires password change due to potential compromise
- New user needs initial password setup

**Do NOT use this component when:**
- Account is locked due to multiple failed attempts (use atom-account-unlock)
- MFA device is lost/unavailable (use atom-mfa-reset)
- Suspicious activity detected (escalate to Security team)
- User is terminated (use atom-account-disable)

## Content

### Self-Service Password Reset

1. **Navigate to Password Reset Portal**
   - URL: https://password.company.com
   - Click "Forgot Password"
   - Available 24/7, no help desk required

2. **Verify Identity**
   - Enter username or email address
   - Answer 3 security questions (set during onboarding)
   - OR receive verification code via registered mobile number
   - OR receive verification code via backup email

3. **Create New Password**
   - Must meet complexity requirements:
     - Minimum 12 characters
     - At least 1 uppercase letter
     - At least 1 lowercase letter
     - At least 1 number
     - At least 1 special character (!@#$%^&*)
     - Cannot reuse last 5 passwords
     - Cannot contain username or company name
   - Password strength meter must show "Strong" or "Very Strong"

4. **Confirm Password Change**
   - Re-enter new password
   - Accept terms acknowledging password policy
   - Click "Reset Password"
   - Wait for confirmation message: "Password successfully changed"

5. **Verify New Password**
   - Notification email sent to registered address
   - Log out of all active sessions (security measure)
   - Log in with new password to verify

### Help Desk Assisted Reset

**When self-service fails (3 failed verification attempts):**

1. **Contact Help Desk**
   - Call: (555) 123-4567
   - Email: helpdesk@company.com
   - Submit ticket via IT portal

2. **Verify Identity (Enhanced)**
   - Employee ID
   - Department and manager name
   - Last 4 digits of SSN
   - Date of hire
   - Recent company event or project (to verify current employment)

3. **Help Desk Generates Temporary Password**
   - Random 16-character password
   - Valid for 24 hours
   - Must be changed on first login
   - Sent via secure channel (not email)

4. **User Changes Temporary Password**
   - Log in with temporary password
   - System forces immediate password change
   - Follow complexity requirements above

### Key Points

- **Security First**: Never share passwords via email, chat, or phone
- **Verification Required**: Identity must always be verified before reset
- **Immediate Action**: Change temporary passwords immediately
- **Unique Passwords**: Use different passwords for different systems
- **Password Manager**: Company-approved password manager recommended

## Decision Logic

**Decision Point**: Verification Method

- **IF** user remembers security questions → Use self-service portal method 1
- **IF** user has access to registered mobile → Use self-service portal method 2
- **IF** user has access to backup email → Use self-service portal method 3
- **IF** all self-service methods fail → Escalate to help desk assisted reset
- **IF** 3 help desk attempts fail → Escalate to IT Security Manager
- **OTHERWISE** → Manager must verify identity in person before reset

**Decision Point**: After Reset

- **IF** successful login with new password → Complete
- **IF** still cannot login → Check account status (may be locked or disabled)
- **IF** "password expired" error → Contact IT Security (policy issue)

## Quality Checkpoints

| Checkpoint | Verification Criteria | Owner | Recovery Path |
|------------|----------------------|-------|---------------|
| Identity Verified | Security questions answered OR code verified | User/Help Desk | Retry verification (max 3 attempts) |
| Password Complexity | Meets all 7 complexity requirements | System | Display specific requirement failures |
| Confirmation Email | Email received within 5 minutes | User | Check spam folder; contact help desk |
| Successful Login | Can log in with new password | User | Contact help desk for account status |

## Troubleshooting

| Issue | Root Cause | Solution | Escalation Condition |
|-------|------------|----------|---------------------|
| "Security questions don't match" | Answers are case-sensitive or have changed | Try exact capitalization; contact help desk if unsure | 3 failed attempts |
| "Password doesn't meet requirements" | Missing complexity element | Review error message showing which requirement failed | N/A - user retry |
| "This password was used recently" | Password in history (last 5) | Choose a completely different password | N/A - user retry |
| No confirmation email received | Email filtering or delay | Wait 10 minutes; check spam; contact help desk | After 10 minutes |
| "Account locked" after reset | Security lockout from failed attempts | Wait 30 minutes OR contact help desk for unlock | Immediate if urgent access needed |
| Temporary password expired | Exceeded 24-hour validity | Request new temporary password from help desk | N/A - new reset required |

## Usage Notes

- This component is used in 3 major workflows across IT and HR
- Average completion time: 5 minutes (self-service), 15 minutes (help desk)
- 94% success rate via self-service portal
- Ensure you have security questions set up during onboarding
- Mobile number must be registered in employee profile for SMS verification

## Reusability Information

**Currently used in:**
- molecule-account-recovery: Part of broader account recovery workflow
- molecule-user-onboarding: Initial password setup for new employees
- organism-it-support-workflow: Standard help desk resolution procedure

**Available variations:**

- **Standard (v2.1.0)**: Current procedure with 3 verification methods
- **High-Security (v2.1.0-hs)**: Requires manager approval + 2FA for privileged accounts
- **Quick-Reset (v2.0.0)**: Legacy single-method reset (deprecated, use standard)

**Configuration points:**
- Verification attempts threshold: Configurable (currently 3)
- Temporary password validity: Configurable (currently 24 hours)
- Password history depth: Configurable (currently 5 passwords)
- Complexity requirements: Configurable per security policy

## Related Components

- **atom-account-unlock**: For locked accounts due to failed login attempts
- **atom-mfa-reset**: For resetting multi-factor authentication devices
- **molecule-account-recovery**: Full account recovery including password, MFA, and access restoration

---

## Document Control

**Version**: 2.1.0
**Last Updated**: 2025-11-01
**Owner**: IT Department
**Maintainer**: IT Security Team Lead
**Next Review**: 2026-02-01

**Change Log:**
- v2.1.0 (2025-11-01): Added SMS verification option; updated complexity requirements - J. Martinez
- v2.0.0 (2025-06-15): Major revision for SOC 2 compliance; added enhanced help desk verification - J. Martinez
- v1.5.0 (2025-01-10): Added password history check; increased minimum length to 12 characters - S. Chen
- v1.0.0 (2024-08-01): Initial release - S. Chen
