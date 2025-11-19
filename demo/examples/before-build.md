# BEFORE BUILD: Source Molecule

**File**: `sop-components/molecules/molecule-new-user-account-setup.md`

This is what the source molecule looks like BEFORE the build process.

---

## Frontmatter (Metadata)

```yaml
---
# Core Metadata (Required)
id: molecule-new-user-account-setup
type: molecule
version: 2.1.0
title: New User Account Setup and Provisioning

# Component Composition (Hybrid: Atoms + Inline Steps)
composedOf: [atom-step-create-ad-account, atom-step-create-email-account, atom-access-request-approval, atom-password-reset]
dependencies:
  - atom-step-create-ad-account (v1.0.0+)
  - atom-step-create-email-account (v1.0.0+)
  - atom-access-request-approval (v1.0.0+)
  - atom-password-reset (v2.0.0+)

# ... other metadata ...
---
```

**Key Points:**
- `composedOf`: Lists all atoms that will be included
- `dependencies`: Version requirements for each atom
- `constructionType: hybrid`: Indicates mix of atoms + inline prose

---

## Components Used Section

```markdown
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

[... more atoms documented ...]

### Inline Prose Steps

**Step 1: Gather New Hire Information**
- **Why inline**: Highly specific to new hire workflow (collects HR system data)
- **Not reused**: Contractor/reinstatement workflows gather different data

[... more inline steps documented ...]
```

**Key Points:**
- Documents which steps are atoms vs. inline
- Explains WHY each design decision was made
- Shows reusability tracking

---

## Procedure Steps

### Step 1: Gather New Hire Information (Inline Prose)

```markdown
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
```

**Line Count**: ~50 lines of workflow-specific prose

**Key Points:**
- Written directly in the molecule (not an atom)
- Specific to new hire onboarding workflow
- Different workflows need different data collection

---

### Step 2: Determine Standard Access Requirements (Inline Prose)

```markdown
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
```

**Line Count**: ~80 lines of workflow-specific logic

**Key Points:**
- New hire-specific access determination
- References job title matrix (onboarding context)
- Could potentially be atomized if standardized later

---

### Step 3: Create Active Directory Account (ATOM REFERENCE)

```markdown
### Step 3: Create Active Directory Account

{{include: atom-step-create-ad-account}}

---
```

**Line Count**: 3 lines (heading + include reference + separator)

**Key Points:**
- `{{include: atom-step-create-ad-account}}` is a **placeholder**
- Build tool will replace this with the full atom content
- Atom contains ~500 lines of detailed procedure
- Same atom used in 3+ molecules (reusable)

**What the build tool will do:**
1. See `{{include: atom-step-create-ad-account}}`
2. Load `sop-components/atoms/atom-step-create-ad-account.md`
3. Read entire atom file (500+ lines)
4. Replace `{{include: ...}}` with full atom content
5. Result: Step 3 now has complete AD procedure inline

---

### Step 4: Create Email Account (ATOM REFERENCE)

```markdown
### Step 4: Create Email Account and Configure Services

{{include: atom-step-create-email-account}}

---
```

**Line Count**: 3 lines (heading + include reference + separator)

**Key Points:**
- Another atom reference (different atom)
- Will expand to ~400 lines of email provisioning procedure
- Atom used in 2+ molecules

---

### Step 5: Configure Initial Password (ATOM REFERENCE)

```markdown
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

[... inline prose continues with password delivery instructions ...]
```

**Line Count**: ~100 lines (mix of inline prose + atom reference via text)

**Key Points:**
- References atom, but also has workflow-specific wrapper content
- `{{atom-password-reset}}` mentioned in text (not formal include)
- Shows hybrid approach: atom for core procedure, inline for context

---

### Step 6: Verify Access Approvals (ATOM REFERENCE)

```markdown
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

[... continues with provisioning actions ...]
```

**Line Count**: ~90 lines (workflow orchestration around atom)

**Key Points:**
- Coordinates access approval atom usage
- Workflow-specific orchestration
- References {{atom-access-request-approval}} via text

---

### Step 7: Final Verification (Inline Prose)

```markdown
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
```

**Line Count**: ~87 lines of workflow-specific completion tasks

**Key Points:**
- Specific to this workflow's success criteria
- Stakeholder notifications vary by workflow
- Not reusable across different molecules

---

## Summary: Source Molecule Statistics

| Metric | Value |
|--------|-------|
| **Total lines** | ~500 lines (simplified from original 677) |
| **Inline prose steps** | 3 (Steps 1, 2, 7) |
| **Atom reference steps** | 4 (Steps 3, 4, 5, 6) |
| **Atom include syntax** | 2 formal {{include}} + 2 textual references |
| **Total step count** | 7 steps |

---

## How Build Process Will Transform This

**Current State** (Before Build):
- Step 3: 3 lines ({{include: atom-step-create-ad-account}})
- Step 4: 3 lines ({{include: atom-step-create-email-account}})

**After Build**:
- Step 3: ~500 lines (full AD account creation procedure)
- Step 4: ~400 lines (full email provisioning procedure)

**Result**: Complete, executable SOP ready for use!

---

**Next**: See `after-build.md` for the final assembled output.
