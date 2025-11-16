---
id: sop-mf-012
type: sop
version: 1.5.0
title: ACH Transfer Procedures for Mortgage Transactions
department: Mortgage Lending - Closing & Funding
audience: [Closers, Funding Specialists, Accounting, Compliance]
complexity: medium
estimatedTime: 30-45 minutes per transaction
effectiveDate: 2024-03-01
lastReviewed: 2025-10-15
nextReview: 2026-04-15
owner: Director of Closing Operations
approver: VP of Mortgage Operations
compliance: [NACHA, Regulation E, BSA/AML, OFAC]
dependencies:
  - sop-mf-004  # Clear to Close
  - sop-mf-005  # Wire Transfer Security
  - sop-mf-011  # Fraud Detection
  - sop-mf-013  # Identity Verification
tags:
  - ACH
  - funding
  - electronic-transfer
  - disbursement
  - compliance
---

# ACH Transfer Procedures for Mortgage Transactions

## Purpose

This SOP establishes procedures for processing Automated Clearing House (ACH) transfers in mortgage transactions, including borrower down payment collection, earnest money deposits, and loan disbursement alternatives to wire transfers for lower-risk, non-time-sensitive payments.

## Scope

Applies to ACH transfers for mortgage-related transactions under $50,000 where timing allows for 1-3 business day settlement. Does NOT apply to closing day disbursements >$50,000 (use wire transfer per sop-mf-005).

## ACH vs. Wire Transfer Decision Matrix

| Factor | Use ACH | Use Wire Transfer |
|--------|---------|-------------------|
| **Amount** | <$50,000 | ≥$50,000 |
| **Timing** | >3 business days available | Same-day required |
| **Purpose** | Earnest money, down payment (advance), appraisal fees | Closing disbursement, payoff, seller proceeds |
| **Risk** | Low fraud risk | High fraud risk (see sop-mf-005) |
| **Cost** | $0-5 per transaction | $25-50 per transaction |

**Examples:**
- ✓ **ACH**: Borrower sends $5,000 earnest money deposit (10 days before closing)
- ✓ **ACH**: Lender refunds $1,200 overpayment to borrower (post-closing)
- ✗ **Wire**: Lender sends $250,000 to title company for closing (same-day required)
- ✗ **Wire**: Borrower sends $80,000 down payment (exceeds $50,000 limit)

## Regulatory Framework

### Primary Regulations
- **NACHA Operating Rules** (National Automated Clearing House Association)
- **Regulation E** (12 CFR § 1005) - Electronic Fund Transfer Act
- **Bank Secrecy Act (BSA)** / Anti-Money Laundering (AML)
- **OFAC** (Office of Foreign Assets Control) - Sanctions screening
- **UCC Article 4A** (Uniform Commercial Code - Funds Transfers)

### Key Compliance Requirements
- Authorization required (written or recorded verbal)
- Customer notification within 2 business days of unauthorized transfer
- Error resolution within 10 business days (investigation) + 45 days (final determination)
- OFAC screening before initiating transfer
- Record retention: 7 years

## ACH Transfer Types for Mortgage Transactions

### 1. ACH Debit (Pull from Borrower Account)

**Use Cases:**
- Collecting down payment (in advance of closing)
- Collecting appraisal fees
- Collecting earnest money deposit
- Collecting loan payment (post-closing servicing)

**How It Works:**
- Lender initiates debit to borrower's bank account
- Borrower provides account information and authorization
- Funds pulled from borrower account → deposited to lender account
- Settlement: 1-2 business days

**Risk:** Lower (lender controls initiation)

### 2. ACH Credit (Push from Borrower Account)

**Use Cases:**
- Borrower sends down payment from their bank
- Borrower sends earnest money
- Borrower sends additional funds for closing shortfall

**How It Works:**
- Borrower initiates credit via their bank's online banking/bill pay
- Funds pushed from borrower account → lender account
- Settlement: 1-3 business days

**Risk:** Medium (borrower controls initiation, potential for reversal)

### 3. ACH Credit (Lender to Third Party)

**Use Cases:**
- Lender pays appraisal management company (AMC)
- Lender pays title company for services
- Lender refunds borrower (overpayment, post-closing adjustment)
- Lender pays HOA for certification fees

**How It Works:**
- Lender initiates credit to third-party account
- Funds pushed from lender account → third party account
- Settlement: 1-2 business days

**Risk:** Low (lender controls)

## ACH Debit Authorization Requirements

### Written Authorization (Preferred)

**ACH Authorization Form Must Include:**
```
Required Elements:
☐ Borrower name (as it appears on bank account)
☐ Bank name
☐ Bank routing number (9 digits)
☐ Bank account number
☐ Account type (checking or savings)
☐ Amount to be debited (specific dollar amount)
☐ Date of debit (or recurring schedule if applicable)
☐ Purpose of debit (down payment, appraisal fee, etc.)
☐ Authorization language: "I authorize [Lender Name] to electronically debit my account..."
☐ Borrower signature and date
☐ Right to revoke authorization (disclosure)
```

**Sample Authorization Language:**
> "I authorize [Lender Name] to initiate an ACH debit entry to my [checking/savings] account at [Bank Name] (Routing #: XXX, Account #: XXX) for $[Amount] on or after [Date] for the purpose of [down payment/appraisal fee/etc.]. I understand this authorization will remain in effect until I revoke it in writing. I understand that I may revoke this authorization by contacting [Lender Name] at least 3 business days before the scheduled debit date."

**Supporting Documentation:**
- Voided check (to verify routing/account numbers)
- Bank statement (showing account in borrower's name)

### Verbal Authorization (Permitted with Conditions)

**Requirements:**
- Recorded phone call (borrower consents to recording)
- Borrower verbally provides account information
- Borrower verbally authorizes debit
- Recording retained for 7 years
- Confirmation email sent to borrower within 24 hours

**Recorded Verbal Script:**
```
"This call is being recorded. Do you consent to this call being recorded?"
[Borrower: Yes]

"To confirm, I am authorizing [Lender Name] to debit my [checking/savings] account at [Bank Name] for the amount of $[Amount] on or after [Date]. The purpose of this debit is [down payment/fee]. My routing number is [XXX] and my account number is [XXX]. I understand this authorization is revocable by contacting [Lender Name] at least 3 business days before the debit date. Is this correct?"
[Borrower: Yes]

"Thank you. A confirmation email will be sent within 24 hours."
```

## ACH Processing Procedure

### Step 1: Obtain Authorization and Verify Account

**Actions:**
1. Borrower completes ACH Authorization Form (or verbal authorization)
2. Verify account information:
   - Routing number valid (9 digits, checksum validation)
   - Account number matches voided check or bank statement
   - Account in borrower's name (not third party)
3. Verify sufficient funds (if possible - some banks provide pre-authorization check)
4. OFAC screening (borrower name against sanctions list)

**Tools:**
- Routing number validation: ABA routing number lookup
- Account validation: Plaid, Giact (optional third-party services)
- OFAC screening: Internal compliance system

### Step 2: Enter ACH Transaction in System

**Required Information:**
- Borrower name (exactly as on bank account)
- Bank routing number
- Bank account number
- Account type (checking = C, savings = S)
- Transaction amount
- Transaction date (effective date)
- SEC code (Standard Entry Class):
  - **PPD** (Prearranged Payment and Deposit) - Consumer accounts
  - **CCD** (Corporate Credit or Debit) - Business accounts
- Company Entry Description (appears on borrower's bank statement, e.g., "LOAN DOWN PMT")

**System Entry Example:**
```
Transaction Type: Debit (pull from borrower)
Borrower Name: John A. Doe
Bank Name: Wells Fargo
Routing Number: 121000248
Account Number: 1234567890
Account Type: Checking
Amount: $15,000.00
Effective Date: 11/20/2025
SEC Code: PPD
Description: Down Payment - Loan #12345
```

### Step 3: Submit ACH Batch

**Timing:**
- ACH files submitted to Federal Reserve by **5:00 PM ET** for next-day processing
- Same-Day ACH available for urgent transactions (<$1,000,000, by 2:45 PM ET cutoff, additional fee)

**Batch Submission:**
- Lender submits NACHA-formatted ACH file to bank
- Bank validates file format
- Bank submits to ACH network (Federal Reserve or The Clearing House)

**Settlement Timeline:**
```
Day 0 (Today): Submit ACH batch by 5:00 PM ET
Day 1 (Tomorrow): ACH network processes
Day 2 (T+2): Funds settle to lender's account

If Same-Day ACH (submit by 2:45 PM ET):
  Same Day: Funds settle by 5:00 PM ET
```

### Step 4: Monitor for Return/Rejection

**ACH Return Codes (Common):**

| Code | Description | Meaning | Action Required |
|------|-------------|---------|----------------|
| R01 | Insufficient Funds | Borrower account has insufficient balance | Contact borrower, retry after funding, or request wire |
| R02 | Account Closed | Account number no longer active | Obtain new account info, re-authorize |
| R03 | No Account / Unable to Locate | Account number invalid | Verify account number, contact borrower |
| R04 | Invalid Account Number | Account number format incorrect | Verify and correct account number |
| R05 | Unauthorized Debit | Borrower claims did not authorize | Review authorization, provide to bank, may need to refund |
| R07 | Authorization Revoked | Borrower revoked authorization | Contact borrower, obtain new authorization or alternate payment |
| R10 | Customer Advises Not Authorized | Borrower disputes transaction | Review authorization, may need to reverse |
| R29 | Corporate Customer Advises Not Authorized | Business account - unauthorized | Review authorization (if business account) |

**Return Timeline:**
- Most returns: 2 business days after settlement
- Unauthorized returns (R05, R10): Up to 60 days after settlement (consumer accounts)

**Actions Upon Return:**
1. Notify borrower immediately (phone + email)
2. Determine reason for return
3. Request corrected information or alternate payment method
4. Update loan file (document return and resolution)
5. Adjust closing timeline if necessary (if down payment not received)

### Step 5: Reconcile and Confirm Receipt

**Reconciliation:**
1. Verify funds deposited to lender account (check bank account)
2. Match deposit amount to ACH transaction
3. Update loan origination system (LOS) - mark payment received
4. Notify borrower of successful receipt (email confirmation)

**Confirmation Email to Borrower:**
> "Your ACH payment of $15,000.00 for down payment (Loan #12345) has been successfully received and posted to your loan account. Thank you. If you have questions, contact [Loan Officer] at [phone/email]."

## ACH Credit (Borrower-Initiated) Procedures

### Step 1: Provide Payment Instructions to Borrower

**Payment Instructions Must Include:**
```
Lender Name: [Full legal name of lender]
Lender Bank Name: [Bank where lender holds account]
Lender Bank Routing Number: [9-digit ABA routing number]
Lender Account Number: [Account number]
Account Type: Checking
Reference/Memo: Loan #[12345] - [Borrower Last Name] - Down Payment

Amount: $[Exact amount]
Deadline: [Date by which funds must be received]

Instructions:
"Initiate an ACH credit (transfer, payment, or bill pay) from your bank to the account above. Include the reference/memo exactly as shown to ensure proper crediting. Allow 1-3 business days for the transfer to complete. Contact us immediately after initiating to confirm receipt."
```

**Delivery:** Email borrower payment instructions + include in loan closing checklist

### Step 2: Monitor for Receipt

**Daily Monitoring:**
- Review bank account for incoming ACH credits
- Match incoming payments to loan numbers (using reference/memo field)
- Contact borrowers if payment not received by expected date

**Common Issues:**
- Borrower uses wrong reference (payment received but unidentified)
- Borrower initiates bill pay check instead of ACH (takes longer)
- Borrower bank sends wire instead (confirm and credit accordingly)

### Step 3: Credit to Loan Account

**Upon Receipt:**
1. Verify amount matches expected payment
2. Verify reference/memo matches loan number
3. Credit payment to loan account in LOS
4. Send confirmation email to borrower
5. Update closing checklist (down payment received ✓)

**If Payment Unidentified:**
- Review recent ACH credits for possible match (similar amount, timing)
- Contact borrower to confirm when sent and amount
- Request copy of bank confirmation (from borrower's bank)
- Manually credit once identified

## ACH Credit (Lender to Third Party/Borrower) Procedures

### Step 1: Obtain Payee Information

**Required Information:**
- Payee name (business or individual)
- Bank name
- Routing number (9 digits)
- Account number
- Account type (checking or savings)
- Purpose of payment (invoice number, description)

**Verification:**
- Request W-9 from payee (for tax reporting if vendor)
- Verify account information (phone call to payee to confirm)
- OFAC screening (payee name)

### Step 2: Obtain Approval

**Approval Authority:**

| Payment Type | Amount | Approval Required |
|--------------|--------|-------------------|
| Vendor payment (AMC, title, etc.) | <$5,000 | Closing Specialist |
| Vendor payment | $5,000-$25,000 | Closing Manager |
| Vendor payment | >$25,000 | Director of Operations |
| Borrower refund | Any amount | Closing Manager + Accounting |

**Documentation:**
- Invoice (if vendor payment)
- Overpayment calculation (if refund)
- Approval signature in system

### Step 3: Initiate ACH Credit

**System Entry:**
- Payment type: Credit (push to payee)
- Payee information (name, routing, account)
- Amount
- Effective date
- Reference/description (invoice #, loan #, purpose)

**Submit Batch:**
- Same process as ACH debit (submit by 5:00 PM ET cutoff)
- Settlement: 1-2 business days

### Step 4: Confirm Receipt and Reconcile

**Actions:**
1. Verify funds debited from lender account
2. Contact payee to confirm receipt (if >$10,000)
3. Obtain receipt/confirmation from payee
4. Record payment in accounting system
5. File documentation (invoice marked paid, confirmation, etc.)

## Same-Day ACH Procedures

### When to Use Same-Day ACH

**Appropriate Use Cases:**
- Down payment needed urgently (closing in 1-2 days)
- Borrower requests same-day processing (willing to pay fee)
- Vendor payment needed urgently
- Refund needed urgently (borrower hardship)

**Requirements:**
- Amount <$1,000,000 (NACHA limit)
- Submit by **2:45 PM ET** (earlier cutoff than standard ACH)
- Additional fee: $5-15 per transaction

**Not Appropriate For:**
- Routine transactions with ample time (use standard ACH - lower cost)
- Amounts >$1,000,000 (use wire transfer)

### Same-Day ACH Timeline

```
Submit by 2:45 PM ET → Funds settle same day by 5:00 PM ET

Example:
10:00 AM: Borrower authorizes same-day ACH debit for $20,000 down payment
10:30 AM: Lender submits ACH batch (before 2:45 PM cutoff)
5:00 PM: Funds received in lender account (same day)
```

### Same-Day ACH Fees

**Typical Costs:**
- Standard ACH: $0-5 per transaction
- Same-Day ACH: $5-15 per transaction

**Fee Handling:**
- Lender absorbs cost OR
- Disclose to borrower and obtain approval to charge (add to closing costs)

## Error Resolution and Disputes

### Unauthorized ACH Transaction

**If Borrower Claims Unauthorized Debit:**

**Step 1: Immediate Response (Within 24 Hours)**
1. Document claim (date, time, borrower statement)
2. Freeze any pending ACH transactions for that borrower
3. Notify supervisor and compliance officer

**Step 2: Investigation (Within 10 Business Days)**
1. Review authorization documentation (signed form or recorded call)
2. Review transaction details (amount, date, account)
3. Determine if transaction was authorized

**Step 3: Resolution (Within 45 Days)**

**If Authorization Valid:**
- Provide borrower with copy of signed authorization or call recording
- Explain transaction was authorized
- No refund required

**If Authorization Invalid/Questionable:**
- Provisional credit to borrower (refund) within 10 business days
- Continue investigation
- If ultimately determined unauthorized: Credit remains
- If ultimately determined authorized: May reverse credit (with notice)

**Step 4: Documentation**
- Maintain complete file of dispute and resolution
- Retain for 7 years

### Incorrect Amount or Date

**If Lender Error (Wrong Amount or Wrong Date):**
1. Identify error immediately
2. Attempt to recall ACH (if not yet settled - contact bank urgently)
3. If settled: Issue refund ACH for difference (if overcharged)
4. Notify borrower of error and corrective action
5. Document error and prevention measures

**If Borrower Error (Borrower-Initiated ACH for Wrong Amount):**
1. Contact borrower to notify of discrepancy
2. Request additional payment (if underpaid) or issue refund (if overpaid)
3. Update loan account accordingly

### ACH Return Handling

**Upon Receiving Return Notification:**
1. Identify return code (see table above)
2. Contact borrower immediately (phone + email)
3. Request corrected information or alternate payment method
4. Re-initiate ACH (if correctable error, e.g., wrong account number)
5. Escalate to management if closing jeopardized

**Frequent Returns (Red Flag):**
- Multiple returns from same borrower (R01 - insufficient funds repeatedly)
- May indicate financial instability
- Consider requiring wire transfer or certified funds
- Underwriting review may be needed (updated bank statements to verify reserves)

## Fraud Prevention for ACH Transactions

### Pre-Transaction Fraud Checks

**Verify Borrower Identity:**
- Confirm request coming from known borrower (phone number, email verified)
- If account change requested, verify via secondary method (call borrower at known number)

**Validate Bank Account:**
- Use account validation service (Plaid, Giact) if available
- Confirm account in borrower's name (not third party)
- Request bank statement showing account number and borrower name

**OFAC Screening:**
- Screen borrower name against OFAC sanctions list
- Document screening result in file

**Red Flags (Do Not Process ACH):**
```
🚩 Account recently changed (within 7 days of transaction)
🚩 Email request from unusual/new email address
🚩 Phone request from unknown number
🚩 Third-party account (not in borrower's name)
🚩 Foreign bank account
🚩 Account information provided verbally without follow-up written confirmation
🚩 Rush request without reasonable explanation
🚩 Borrower evasive when asked to verify identity
```

**If Red Flags Present:**
- Verify borrower identity via secondary method (call known phone number)
- Request additional documentation (bank statement, ID verification)
- Consider requiring wire transfer or certified check instead
- Escalate to fraud prevention team

### Post-Transaction Monitoring

**Monitor for Reversals:**
- Check daily for ACH returns (especially R05, R10 - unauthorized)
- If unauthorized return received >2 days after settlement, investigate immediately

**Occupancy Fraud Prevention (ACH Debit for Mortgage Payment):**
- If post-closing ACH payment returns repeatedly (R01 - insufficient funds), may indicate occupancy fraud (borrower never intended to occupy/pay)
- Review file for occupancy fraud indicators
- Consider filing SAR if pattern identified (per sop-mf-011)

## Record Retention and Documentation

### Required Documentation (Per Transaction)

**Maintain in Loan File or ACH Transaction File:**
```
☐ ACH Authorization Form (signed and dated) OR recorded verbal authorization
☐ Voided check or bank statement (verifying account information)
☐ OFAC screening result
☐ ACH transaction confirmation (from bank/system)
☐ Settlement confirmation (funds received/sent)
☐ Borrower confirmation email (receipt acknowledged)
☐ Any return notifications and resolution documentation
☐ Error or dispute documentation (if applicable)
```

### Retention Period
- **ACH transaction records**: 7 years from transaction date
- **Authorization forms**: 7 years from last transaction (or 2 years after authorization revoked, whichever longer)
- **Dispute/error records**: 7 years from resolution date

## Training Requirements

### Initial Training
- 4 hours: ACH basics and NACHA rules
- 2 hours: Authorization requirements (Regulation E)
- 2 hours: Error resolution procedures
- 2 hours: Fraud prevention
- **Certification Required**: Pass ACH procedures assessment (≥90%)

### Continuing Education
- Annual refresher (2 hours)
- Quarterly review of ACH return codes and common issues
- Immediate training when NACHA rules change

## Quality Control

### Pre-Transaction Review (100% of Transactions)

**Checklist:**
```
☐ Authorization complete and signed (or recorded verbal)
☐ Account information verified (routing/account numbers correct)
☐ Amount matches authorization
☐ OFAC screening completed (clear)
☐ No red flags identified
☐ Approval obtained (if required per dollar threshold)
```

### Post-Transaction Audit (Sample 10% Monthly)

**Random Sample:**
- Verify authorization documentation present
- Verify OFAC screening performed
- Recalculate amount (ensure correct)
- Verify settlement occurred
- Verify borrower confirmation sent

### Monthly Metrics Report

**Report to Management:**
- Total ACH transactions (volume and dollar amount)
- ACH returns (volume and return codes)
- Error rate (errors per 100 transactions)
- Dispute volume
- Fraud incidents (if any)
- Average processing time (authorization to settlement)

## Related SOPs
- {{include: sop-mf-004}} - Clear to Close Verification
- {{include: sop-mf-005}} - Wire Transfer Security (alternative to ACH for high-value)
- {{include: sop-mf-011}} - Fraud Detection and Prevention
- {{include: sop-mf-013}} - Borrower Identity Verification

## Appendices

### Appendix A: ACH Authorization Form Template

[See separate ACH Authorization Form template in forms library]

### Appendix B: Routing Number Validation

**How to Validate Routing Number:**
1. Must be 9 digits
2. Checksum algorithm (modulus 10):
   ```
   Example: 121000248
   (3×1 + 7×2 + 1×1 + 3×0 + 7×0 + 1×0 + 3×2 + 7×4 + 1×8) mod 10 = 0
   If result = 0, routing number is valid
   ```
3. Lookup in ABA routing number directory (verify bank name matches)

### Appendix C: Common ACH Return Codes (Full List)

[See NACHA Return Code reference guide - maintained by compliance department]

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.5.0 | 2025-10-15 | Added same-day ACH procedures, updated fraud prevention | Director Closing Operations |
| 1.2.0 | 2024-08-15 | Enhanced error resolution procedures per Reg E | Compliance Manager |
| 1.0.0 | 2024-03-01 | Initial version | VP Mortgage Operations |

---
**Document Classification**: Internal Use
**Retention Period**: 7 years (per NACHA and Regulation E)
**Review Frequency**: Annual or upon NACHA rule changes
