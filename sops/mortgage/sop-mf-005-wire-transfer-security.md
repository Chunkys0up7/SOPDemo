---
id: sop-mf-005
title: Wire Transfer Security and Dual Approval Protocol
version: 3.0.8
status: active
department: Closing
category: Closing & Funding
owner: Emily Patterson
effective_date: 2025-11-10
last_reviewed: 2025-11-10
review_frequency: quarterly
approver: Jennifer Rodriguez (Chief Compliance Officer)
criticality: critical
compliance_frameworks:
  - OFAC Compliance
  - BSA/AML Requirements
  - Cybersecurity Framework (NIST)
  - Wire Fraud Prevention Standards
dependencies:
  - sop-mf-004  # Clear to Close Verification
  - sop-mf-011  # Fraud Detection Protocol
  - sop-mf-013  # Borrower Identity Verification
tags:
  - wire-transfer
  - security
  - fraud-prevention
  - dual-approval
  - closing
  - funding
---

# Wire Transfer Security and Dual Approval Protocol

## 🎯 Overview

### Purpose

This SOP establishes comprehensive security protocols for initiating, approving, and executing wire transfers for mortgage loan closings. Wire transfer fraud has increased 480% in the mortgage industry since 2020, with average losses of $150,000 per incident. This protocol implements multi-layered security controls to prevent unauthorized transfers and protect borrowers, investors, and company assets.

### Scope

**Applies to:**

- All outgoing wire transfers for loan funding
- Payoff wires to existing lienholders
- Commission and broker fee disbursements
- Construction draw payments
- Earnest money deposits (>$10,000)

**Does NOT apply to:**

- ACH transfers (see {{include: sop-mf-012}})
- Checks under $5,000 (standard check procedures apply)
- Internal transfers between company accounts

### Key Statistics (2024 Performance)

- **Total Wire Volume:** 4,847 wires/year ($2.3 billion)
- **Average Wire Amount:** $474,500
- **Fraud Attempts Blocked:** 23 attempts/year ($3.2M saved)
- **False Positive Rate:** 0.8% (38 legitimate wires flagged)
- **Average Processing Time:** 47 minutes (from request to execution)
- **Same-Day Funding Success Rate:** 98.7%

---

## ⚠️ Critical Security Warnings

### **🚨 STOP - READ BEFORE PROCEEDING:**

1. **NEVER accept wire instructions via email alone** - Always verify through independent callback
2. **NEVER process wires outside dual approval workflow** - No exceptions, regardless of urgency
3. **NEVER use phone numbers provided in email** - Always use numbers from independent source
4. **NEVER disable security controls** - Even for "trusted" clients or rush requests
5. **IMMEDIATELY report suspicious requests** - Delay is acceptable; fraud is not

### Common Fraud Scenarios (Real Examples)

- ✉️ **Email Compromise:** Borrower's email hacked, fake wire instructions sent 24 hours before closing
- 📞 **Phone Spoofing:** Caller ID shows title company number, but it's a scammer
- 👔 **Impersonation:** Fake attorney creates look-alike email (j0hn@lawfirm.com vs john@lawfirm.com)
- ⏰ **Urgency Pressure:** "Wire must go today or deal falls apart" - classic pressure tactic
- 📄 **Document Forgery:** PDF wire instructions with forged letterhead and signatures

**Stat:** 94% of wire fraud involves email compromise. Our verification protocol has blocked 23 attempts in 2024.

---

## 📋 Prerequisites

Before initiating any wire transfer, verify ALL of the following:

### Required Documentation

- [ ] **Clear to Close (CTC) issued** - Per {{include: sop-mf-004}}
- [ ] **Final CD delivered** - 3+ business days before closing (TRID)
- [ ] **Funding conditions cleared** - All underwriting conditions satisfied
- [ ] **Title commitment received** - With Schedule B exceptions reviewed
- [ ] **Closing Protection Letter (CPL)** - If using title company
- [ ] **Wire authorization form** - Original signed by borrower (wet signature or eSign)

### Account Verification Requirements

- [ ] **Beneficiary bank verified** - ABA routing number validated via Fed database
- [ ] **Account ownership confirmed** - Name on account matches recipient exactly
- [ ] **Account type confirmed** - Checking, savings, escrow, etc.
- [ ] **OFAC screening completed** - Beneficiary not on sanctions lists

### System Access Requirements

- Dual approval authority in wire platform (Jack Henry SilverLake or equivalent)
- Current OFAC training certification (<12 months old)
- Fraud awareness training completed annually
- Secure token or hardware key for wire authentication

### Authorization Thresholds

| Wire Amount | Required Approvers | Additional Requirements |
|-------------|-------------------|------------------------|
| $0 - $15,000 | 1 Closer | Standard callback verification |
| $15,001 - $100,000 | 1 Closer + 1 Closing Manager | Callback + email confirmation |
| $100,001 - $500,000 | 1 Closer + 1 Manager + 1 VP | Callback + email + SMS verification |
| $500,001+ | 2 VPs + CFO | All above + in-person/video verification |

**Updated 11/10/2025:** Threshold increased from $10K to $15K based on risk analysis showing 87% of fraud attempts were >$15K.

---

## 🔐 Procedure Steps

### Step 1: Receive Wire Instructions (Day -2 to -1 before closing)

#### 1.1 Obtain Original Wire Instructions

**Accepted Sources (in order of preference):**

1. **Title company closing portal** - Most secure, authenticated platform
2. **Borrower online portal** - Our secure platform with MFA enabled
3. **Encrypted email** - With digital signature verification
4. **Faxed letterhead** - From verified fax number
5. **Email attachment** - LEAST preferred, requires enhanced verification

**🚫 NEVER ACCEPT:**

- Wire instructions in body of regular email
- Instructions from personal email accounts (Gmail, Yahoo, etc.)
- Screenshots of wire instructions
- Instructions received via text message
- Verbal instructions without written confirmation

#### 1.2 Document Receipt

Log wire instruction receipt in loan file:

- Date/time received
- Source and method (e.g., "Title company portal, 11/10/2025 2:34 PM")
- Person who received instructions
- Document control number
- Initial OFAC pre-screen result

**Example Documentation:**

```
Wire Instructions Log Entry:
Received: 11/10/2025 at 2:34 PM EST
Source: First American Title Portal (authenticated)
Received by: Sarah Martinez, Closing Specialist
Doc Control #: WI-2025-04847
Beneficiary: First American Title Company of Texas
Account: ****1234 (last 4 digits)
Amount: $487,350.00
Purpose: Loan #2025-LA-04789 - 123 Oak Street closing
OFAC Pre-Screen: CLEAR (no matches)
```

#### 1.3 Initial Red Flag Assessment

**STOP and escalate to Fraud Prevention if ANY of these are present:**

- [ ] Wire instructions received <24 hours before closing (rushed timeline)
- [ ] Instructions differ from closing disclosure
- [ ] Account type changed from previous communication
- [ ] Unusual formatting or spelling errors in email
- [ ] Sense of urgency or pressure in communication
- [ ] Request to bypass normal procedures
- [ ] Account in different state than title company location
- [ ] New email domain or sender not previously used

**Escalation:** Email fraud@apexmortgage.com AND call Fraud Hotline: x5500

---

### Step 2: Verification Protocol (CRITICAL - NO SHORTCUTS)

#### 2.1 Independent Callback Verification (MANDATORY)

**Purpose:** Verify wire instructions directly with recipient using phone number from independent source (NOT from email).

**Procedure:**

1. **Obtain independent phone number:**
   - Look up title company on their official website
   - Use phone number from title commitment letterhead
   - Cross-reference with ALTA member directory
   - **DO NOT** use phone number from email signature

2. **Place verification call:**
   - Call the obtained number
   - Ask for escrow/closing department
   - Verify caller identity: "I'm calling from Apex Mortgage to verify wire instructions for loan #[number]"
   - **DO NOT** read the account number to them; ask THEM to provide it

3. **Confirm wire details:**
   - Beneficiary name (must match exactly)
   - Bank name
   - ABA routing number (ask them to state it, don't read it to them)
   - Account number (last 4 digits only verbally, full number via secure portal)
   - Wire amount
   - Expected date/time

4. **Document conversation:**

```
Verification Call Log:
Date/Time: 11/10/2025 3:15 PM EST
Called Number: (512) 555-0199 (from First American website)
Spoke With: Janet Wilson, Escrow Officer #7834
Verified: Account ****1234, Routing 111000025, Amount $487,350.00
Verification Code: FA-TX-04789-VERIFIED
Call Duration: 4 minutes
Verification Status: ✅ CONFIRMED
Next Step: Proceed to dual approval
```

#### 2.2 Written Confirmation (Required for wires >$15K)

Send verification email to confirmed email address:

```
Subject: Wire Verification Required - Loan #2025-LA-04789

Dear Janet Wilson,

We have received wire instructions for the above loan closing scheduled for 11/12/2025.

Per our phone conversation today at 3:15 PM, please reply to this email confirming:

Beneficiary: First American Title Company of Texas
Bank: Chase Bank
Routing: 111000025
Account: ****1234
Amount: $487,350.00

Please reply "CONFIRMED" if these details are correct.

This verification is required for your protection and ours.

Best regards,
Sarah Martinez
Closing Specialist, Apex Mortgage
Direct: (555) 123-4567
```

**Requirement:** Must receive written "CONFIRMED" reply before proceeding.

#### 2.3 OFAC Sanctions Screening

**Automated Screening:**

1. Access OFAC screening system (Jack Henry or Comply Advantage)
2. Enter beneficiary information:
   - Full legal name
   - Address
   - Country
3. Review automated results
4. Document screening result

**Screening Results:**

| Result | Action Required |
|--------|----------------|
| ✅ **CLEAR** | Proceed to next step |
| ⚠️ **POTENTIAL MATCH** | Manual review by Compliance Officer within 2 hours |
| 🚫 **MATCH** | **STOP** - Wire blocked, escalate to CCO immediately |

**False Positive Handling:**
Common false positives: "Jose Garcia" (common name), "First National Bank" (generic)

- Review full name, address, date of birth
- Document reasoning for override
- Require Compliance Officer approval

**Example OFAC Documentation:**

```
OFAC Screening Report:
Loan: 2025-LA-04789
Beneficiary: First American Title Company of Texas
Date: 11/10/2025 3:22 PM
Result: CLEAR (0 matches)
Screened By: System Auto-Screen
Reviewed By: Sarah Martinez
Compliance Review: Not required (clear result)
Next OFAC Screen: At wire execution (dual verification)
```

---

### Step 3: Wire Request Preparation

#### 3.1 Complete Wire Transfer Request Form

Use form: **FRM-WIRE-001** (available in document library)

**Required Fields:**

- Loan number and property address
- Borrower name(s)
- Closing date
- Wire amount (numbers and words: "$487,350.00 - Four hundred eighty-seven thousand, three hundred fifty dollars")
- Beneficiary information:
  - Full legal name (exactly as it appears on account)
  - Bank name and address
  - ABA routing number (9 digits)
  - Account number
  - Account type (checking/savings/escrow)
  - Reference/memo line (loan number + property address)
- Purpose of wire (loan funding, payoff, etc.)
- Requested execution date/time
- Funding source (investor, warehouse line, company funds)

#### 3.2 Attach Supporting Documentation

Create wire package in document management system:

- [ ] Wire Transfer Request Form (FRM-WIRE-001)
- [ ] Original wire instructions (PDF from source)
- [ ] Callback verification log (Step 2.1)
- [ ] Email confirmation (Step 2.2)
- [ ] OFAC screening report (Step 2.3)
- [ ] Clear to Close memo
- [ ] Final Closing Disclosure
- [ ] Funding authorization (from investor/warehouse)

**Package Naming Convention:**
`WIRE-[Loan#]-[YYMMDD]-[Sequence]`
Example: `WIRE-2025LA04789-251110-001`

#### 3.3 Route for Dual Approval

**Approval Workflow (Based on Amount):**

**For wires $15,001 - $100,000:**

1. Closer prepares and submits request
2. Closing Manager reviews and approves
3. Auto-routes to Treasury for execution

**For wires $100,001 - $500,000:**

1. Closer prepares and submits
2. Closing Manager reviews
3. VP of Closing approves
4. Treasury executes

**For wires $500,001+:**

1. Closer prepares
2. Closing Manager reviews
3. VP of Closing approves
4. CFO final approval
5. Treasury executes with dual control (two Treasury staff required)

**Approval Deadline:** All approvals must be completed by 2:00 PM EST for same-day execution.

---

### Step 4: Dual Approval Review Process

#### 4.1 First Approver Review (Closing Manager)

**Review Checklist:**

- [ ] Wire amount matches Final CD (page 3, cash to close)
- [ ] Beneficiary information verified via callback (log attached)
- [ ] OFAC screening clear
- [ ] All supporting documents attached and complete
- [ ] Loan is Clear to Close with no outstanding conditions
- [ ] Funding authorization received from investor/warehouse
- [ ] No red flags in fraud assessment
- [ ] Proper approval authority for wire amount
- [ ] Execution date is appropriate (not rushed/suspicious timing)

**If ANY item fails review:**

- Return to Closer with specific feedback
- Do NOT approve
- Document reason for return

**Approval Documentation:**

```
First Approval Review:
Reviewer: Michael Chen, Closing Manager
Review Date: 11/10/2025 4:15 PM
Loan: 2025-LA-04789
Wire Amount: $487,350.00
Checklist: All items verified ✅
Callback Verification: Confirmed with Janet Wilson at First American
OFAC: Clear
Decision: APPROVED
Authorization Code: MC-20251110-4789
Routed To: Jennifer Rodriguez (VP Closing) for second approval
```

#### 4.2 Second Approver Review (VP or CFO)

**Enhanced Review for High-Value Wires:**

- Verify first approver followed complete checklist
- Independent OFAC re-screen (second verification)
- Review borrower contact history for any fraud indicators
- Confirm wire timing is consistent with normal closing timeline
- Check for any unusual patterns (e.g., multiple wires same day)

**Additional Verification for Wires >$500K:**

- Video call or in-person meeting with borrower to confirm
- Request borrower to verbally confirm last 4 digits of account
- Send test wire of $1.00 with confirmation callback

**Final Approval:**

```
Second Approval Review:
Reviewer: Jennifer Rodriguez, VP Closing
Review Date: 11/10/2025 4:45 PM
First Approval: Verified (Michael Chen, 4:15 PM)
Additional OFAC Screen: CLEAR (re-verified)
High-Value Review: N/A (wire <$500K)
Decision: APPROVED
Authorization Code: JR-20251110-4789
Status: READY FOR EXECUTION
Released to: Treasury Department
Execution Window: 11/11/2025 9:00 AM - 2:00 PM EST
```

---

### Step 5: Wire Execution (Treasury Department)

#### 5.1 Pre-Execution Verification

**Treasury Staff Responsibilities:**

1. Verify dual approval is complete (two authorization codes present)
2. Re-verify routing number via Fed ABA database
3. Confirm sufficient funds in funding account
4. Review wire for any anomalies or unusual characteristics
5. Perform final OFAC screen (third verification)

**Fed ABA Routing Number Verification:**

```
Access: https://www.frbservices.org/EPaymentsDirectory/
Enter Routing: 111000025
Verified Result: ✅ JPMorgan Chase Bank, NA - Houston, TX
Match Status: EXACT MATCH
Proceed: YES
```

#### 5.2 Execute Wire Transfer

**Banking Platform:** Jack Henry SilverLake Wire Module

**Execution Steps:**

1. Log into wire platform with hardware token authentication
2. Create new wire transaction
3. Enter beneficiary details (triple-check routing and account)
4. Enter wire amount (verify against approval)
5. Add reference: "Apex Mortgage Loan #2025-LA-04789 - 123 Oak Street"
6. Select funding source and debit account
7. Set execution date/time
8. **PAUSE - FINAL REVIEW:**
   - Read entire wire details OUT LOUD to second Treasury staff
   - Second staff verifies against approved request
   - Both staff sign off on paper copy

9. Submit wire for processing
10. Save wire confirmation number

**Wire Confirmation:**

```
Wire Execution Confirmation:
Execution Date/Time: 11/11/2025 10:23 AM EST
Wire Reference: APXM-20251111-04789
Bank Confirmation: IMT-789456123
Debited Account: Apex Warehouse Line ****5678
Debited Amount: $487,350.00
Beneficiary: First American Title Company of Texas
Beneficiary Account: ****1234 (Chase Bank)
Estimated Arrival: 11/11/2025 2:00 PM EST (same-day wire)
Executed By: Robert Taylor, Treasury Manager
Verified By: Linda Kim, Treasury Specialist
Status: TRANSMITTED
```

#### 5.3 Send Wire Confirmation to Recipient

**Immediate Actions:**

1. Call recipient to notify wire has been sent
2. Provide wire reference number (APXM-20251111-04789)
3. Confirm expected arrival time
4. Request callback when funds are received

**Email Confirmation:**

```
Subject: Wire Transmitted - Loan #2025-LA-04789

Dear Janet Wilson,

Your wire transfer has been successfully transmitted:

Wire Reference: APXM-20251111-04789
Amount: $487,350.00
Bank Reference: IMT-789456123
Estimated Arrival: Today by 2:00 PM EST

Please confirm receipt once funds post to your account.

Contact Treasury if you have any questions:
Robert Taylor, Treasury Manager
Phone: (555) 123-4590
Email: rta ylor@apexmortgage.com

Best regards,
Apex Mortgage Treasury Department
```

---

### Step 6: Wire Reconciliation and Confirmation

#### 6.1 Track Wire Status

**Same-Day Monitoring:**

- 12:00 PM EST: Check bank portal for wire status
- 2:00 PM EST: Follow up if not confirmed received
- 4:00 PM EST: Escalate to bank if still pending

**Possible Status Results:**

| Status | Meaning | Action |
|--------|---------|--------|
| **TRANSMITTED** | Wire sent, in-flight | Monitor for receipt confirmation |
| **COMPLETED** | Funds received by beneficiary bank | Obtain receipt confirmation |
| **PENDING** | Held for manual review at receiving bank | Call receiving bank to expedite |
| **REJECTED** | Returned due to error | Review error, correct, re-submit |
| **RECALLED** | Wire recalled before receipt | Investigate reason, contact Compliance |

#### 6.2 Obtain Receipt Confirmation

**Required Confirmations:**

1. **Callback from recipient:** "Funds received and confirmed"
2. **Email confirmation:** Screenshot or email from recipient showing funds posted
3. **Bank verification:** Receiving bank confirms credit to account

**Confirmation Documentation:**

```
Wire Receipt Confirmation:
Confirmation Date/Time: 11/11/2025 1:47 PM EST
Confirmed By: Janet Wilson, First American Title
Confirmation Method: Phone call + email screenshot
Funds Posted: 11/11/2025 1:32 PM EST (recipient bank time)
Amount Confirmed: $487,350.00
Discrepancies: None
Status: ✅ CONFIRMED RECEIVED
Updated By: Sarah Martinez
Closing Status: Ready to proceed (wire received)
```

#### 6.3 Update Loan File and Close Wire Request

**Final Documentation:**

1. Attach all wire confirmations to loan file
2. Update loan milestone: "Funding Wire Sent - Confirmed Received"
3. Notify Closer that wire is complete
4. Close wire request in tracking system
5. File in closed wire log for monthly reconciliation

**Monthly Reconciliation:**

- Treasury reconciles all wires with bank statements
- Verify all wires have receipt confirmation
- Report any discrepancies or unconfirmed wires
- Provide summary to CFO

---

## ✅ Quality Checks

Perform these quality checks at each stage:

### Pre-Wire Quality Checks

- [ ] Loan is Clear to Close (no outstanding conditions)
- [ ] Final CD delivered 3+ business days before closing
- [ ] Wire amount matches CD exactly (page 3, cash to close)
- [ ] All parties have been verified (no email compromise)
- [ ] OFAC screening completed and clear
- [ ] Callback verification documented

### During Approval Quality Checks

- [ ] Dual approval obtained per threshold requirements
- [ ] All supporting documents attached to wire request
- [ ] No red flags identified in fraud assessment
- [ ] Routing number verified via Fed ABA database
- [ ] Account information triple-checked for accuracy

### Post-Execution Quality Checks

- [ ] Wire confirmation received from bank
- [ ] Recipient confirmed funds received
- [ ] Amount matches original request exactly
- [ ] All documentation filed in loan folder
- [ ] Closing can proceed as scheduled

---

## 🚨 Troubleshooting

### Issue 1: Recipient Reports Wire Not Received (>4 hours after transmission)

**Resolution Steps:**

1. Check bank portal for wire status - look for "COMPLETED" status
2. Verify wire reference number with bank - call wire department directly
3. Confirm routing and account number were correct - compare to original request
4. Request bank trace:
   - Provide wire reference number
   - Request Federal Reference Number
   - Ask for status update within 1 hour
5. If wire was sent to wrong account:
   - Immediately request recall (must be within 24 hours)
   - File incident report with Compliance
   - Notify CFO and Risk Management
   - Prepare corrective wire if recall successful

**Bank Trace Request Template:**
"I need to trace wire reference APXM-20251111-04789 sent today at 10:23 AM EST to Chase Bank routing 111000025, account ****1234 for $487,350.00. Please provide Federal Reference Number and current status."

**Escalation:** If not resolved within 2 hours, escalate to CFO and notify closing parties of potential delay.

### Issue 2: Wire Instructions Change Last Minute (<24 hours before closing)

**⚠️ HIGH FRAUD RISK - Enhanced Verification Required:**

1. **STOP and assess:**
   - Why did instructions change? Get detailed explanation
   - When were new instructions sent? Verify timeline
   - Who sent new instructions? Verify identity thoroughly

2. **Enhanced verification protocol:**
   - Call recipient at known number (from title commitment, NOT from new email)
   - Speak to same person who provided original instructions
   - Ask them to explain why instructions changed
   - Request written explanation on letterhead
   - Escalate to Fraud Prevention team for review

3. **Additional approvals:**
   - Requires VP approval PLUS Compliance Officer approval
   - CFO approval for wires >$100K
   - Consider delaying closing if legitimacy questionable

4. **Document extensively:**
   - Create incident log in loan file
   - Screenshot all emails with headers
   - Record all phone conversations (with consent)
   - Document decision-making process

**Red Flags for Changed Instructions:**

- ❌ Different email domain (even slight variation)
- ❌ Sense of urgency ("must send today or deal falls through")
- ❌ Different account type (e.g., was checking, now savings)
- ❌ Out-of-state account for local title company
- ❌ Personal account instead of business account
- ❌ Unable to reach recipient via known phone number

**If ANY red flags present:** Delay wire and investigate thoroughly. Better to delay closing than fund fraud.

### Issue 3: OFAC Match or Potential Match

**Immediate Actions:**

1. **DO NOT proceed with wire** - Place on hold immediately
2. Escalate to Compliance Officer within 30 minutes
3. Print full OFAC report with match details
4. Gather additional beneficiary information (DOB, address, entity type)

**Compliance Officer Review:**

- Compare match criteria: name, address, DOB, country
- Determine if true positive or false positive
- Review SDN list notes and basis for sanctioning
- Document analysis in compliance log

**Resolution Paths:**

| Determination | Action |
|--------------|--------|
| **False Positive** (common name, different entity) | Document override reasoning, obtain second Compliance approval, proceed with wire |
| **True Positive** (confirmed match) | **BLOCK WIRE PERMANENTLY**, file SAR within 30 days, notify FinCEN, notify senior management |
| **Uncertain** (insufficient info) | Request additional beneficiary documentation, delay wire pending resolution, escalate to outside counsel if needed |

**SAR Filing:** If true positive or uncertain match that cannot be resolved, file Suspicious Activity Report (SAR) with FinCEN within 30 days. Do NOT notify customer of SAR filing (federal law prohibits disclosure).

### Issue 4: Dual Approval Deadline Missed (after 2:00 PM EST for same-day execution)

**Options:**

**Option A: Next-Business-Day Wire**

- Most common solution
- Request executed next morning
- Notify closing parties of 1-day delay
- Adjust closing date if necessary

**Option B: After-Hours Wire (Emergency Only)**

- Requires CFO approval
- Additional $50 bank fee
- Only for extreme circumstances (e.g., rate lock expiring, penalty interest)
- Must document business justification

**Option C: Delay Closing**

- Coordinate with all parties (buyer, seller, agents, title)
- Rescheduleclosing for next available date
- Update Closing Disclosure if fee changes

**Communication Template:**
"Due to timing of final approvals, your wire will be transmitted tomorrow morning by 10:00 AM EST, with funds expected by 1:00 PM. This will require us to adjust closing time to [new time]. We apologize for the inconvenience and have taken steps to ensure this doesn't recur."

### Issue 5: Wrong Amount Wired (Over or Under Funded)

**Immediate Response:**

1. Contact recipient immediately - explain discrepancy
2. Determine cause:
   - Data entry error during wire execution
   - Final CD amount changed after wire request submitted
   - Calculation error in wire request
3. Document error in incident log

**Resolution:**

**If OVERFUNDED (sent too much):**

- Request return wire for excess amount
- Provide return wire instructions to recipient
- Monitor for return within 2 business days
- Escalate if not returned timely

**If UNDERFUNDED (sent too little):**

- Calculate shortage amount
- Prepare supplemental wire request
- Follow full dual approval process (no shortcuts)
- Coordinate with closing to ensure sufficient funds before closing

**Post-Incident:**

- Root cause analysis within 24 hours
- Implement corrective actions
- Retrain staff if process not followed
- Update procedures if systemic issue identified

---

## 📊 Compliance Requirements

### Regulatory Framework

This SOP ensures compliance with:

**1. Bank Secrecy Act (BSA) / Anti-Money Laundering (AML)**

- Wire amounts >$10,000 must be reported on CTR if cash equivalent
- Maintain wire records for 5 years minimum
- Monitor for suspicious patterns (structuring, frequent wires, high-risk countries)

**2. Office of Foreign Assets Control (OFAC)**

- Screen ALL wire beneficiaries against SDN list
- Screen at time of request AND at execution (dual verification)
- Block any wires to sanctioned individuals or entities
- File blocking reports with OFAC within 10 days

**3. Consumer Financial Protection Bureau (CFPB)**

- Wire amounts must match Final Closing Disclosure
- No hidden fees or undisclosed charges
- Timing must comply with TRID 3-day waiting period

**4. GLBA Privacy**

- Encrypt all wire instructions in transit
- Limit access to wire information (need-to-know basis)
- Do not disclose wire details to unauthorized parties

**5. Cybersecurity Standards**

- Use MFA for wire platform access
- Encrypt all wire-related communications
- Maintain audit logs of all wire activities
- Annual penetration testing of wire systems

### Record Retention

**Required Retention Periods:**

| Document Type | Retention Period | Storage Location |
|--------------|------------------|------------------|
| Wire Transfer Request Form | 7 years | Loan imaging system |
| Callback Verification Logs | 7 years | Loan imaging system |
| OFAC Screening Reports | 5 years minimum | Compliance database |
| Bank Confirmation Records | 7 years | Treasury records |
| Approval Authorizations | 7 years | Workflow system |
| Incident Reports/SAR | Permanent | Compliance secure archive |

### Audit Trail Requirements

Every wire must have complete audit trail showing:

- Who requested wire (name, date, time)
- Who verified beneficiary (name, date, time, phone number called)
- Who performed OFAC screening (name, date, result)
- Who approved wire (first and second approver names, dates, authorization codes)
- Who executed wire (name, date, time, bank confirmation number)
- Who confirmed receipt (name, date, time, confirmation method)

**Audit Trail Review:**

- Internal Audit reviews 25 random wires quarterly
- Compliance reviews 100% of wires >$500K
- External auditors review wire controls annually

---

## 📚 References and Related SOPs

### Internal References

- {{include: sop-mf-004}} - Clear to Close Verification Process
- {{include: sop-mf-011}} - Fraud Detection and Prevention Protocol
- {{include: sop-mf-012}} - ACH Transfer Procedures
- {{include: sop-mf-013}} - Borrower Identity Verification Standards

### External Resources

- **ALTA Best Practices:** Section 7.2 - Wire Fraud Prevention
- **MBA Wire Fraud Toolkit:** https://www.mba.org/wirefraud
- **CFPB TRID Guidance:** Timing of wire transfers and closing
- **FinCEN SAR Filing:** https://www.fincen.gov/resources/filing-information

### Training Requirements

- **Initial Training:** 4-hour wire fraud prevention course (required for all closing staff)
- **Annual Refresher:** 2-hour update on new fraud tactics and protocol changes
- **Certification Renewal:** Every 12 months

### Forms and Templates

- **FRM-WIRE-001:** Wire Transfer Request Form
- **FRM-WIRE-002:** Callback Verification Log
- **FRM-WIRE-003:** Wire Amendment Request (for changed instructions)
- **FRM-WIRE-004:** Wire Incident Report

### Contact Information

- **Fraud Hotline:** x5500 or fraud@apexmortgage.com (monitored 24/7)
- **Treasury Department:** x4590 (M-F 8:00 AM - 5:00 PM EST)
- **Compliance Officer:** x4400 (Jessica Martinez)
- **After-Hours CFO Emergency:** (555) 123-9999 (emergencies only)

---

## 📝 Document Control

| Version | Date | Author | Changes | Approver |
|---------|------|--------|---------|----------|
| 3.0.8 | 2025-11-10 | Emily Patterson | Updated dual approval threshold from $10K to $15K based on risk analysis | Jennifer Rodriguez (CCO) |
| 3.0.7 | 2025-08-15 | Emily Patterson | Added enhanced verification for wires >$500K (video call requirement) | Jennifer Rodriguez (CCO) |
| 3.0.6 | 2025-05-20 | Emily Patterson | Updated OFAC screening to require third verification at execution | Jennifer Rodriguez (CCO) |
| 3.0.0 | 2025-01-10 | Emily Patterson | Major revision: Added callback verification protocol after 3 fraud incidents in Q4 2024 | Jennifer Rodriguez (CCO) |
| 2.8.5 | 2024-09-01 | David Kim | Added red flag assessment checklist | Jennifer Rodriguez (CCO) |

### Review Schedule

- **Next Scheduled Review:** 2026-02-10 (Quarterly review)
- **Responsible Party:** Emily Patterson, Closing Department Manager
- **Review Triggers:**
  - Any fraud incident (immediate review)
  - Regulatory changes affecting wire transfers
  - Three or more process failures in 30-day period

---

## 🎯 Appendix A: Wire Fraud Red Flags Checklist

Use this checklist to assess any wire request for fraud indicators:

### Email Red Flags

- [ ] Email from unfamiliar domain or slight variation (g00gle.com vs google.com)
- [ ] Spelling or grammatical errors unusual for sender
- [ ] Different email signature or formatting than previous emails
- [ ] Sent outside normal business hours for sender's time zone
- [ ] Reply-to address different from sender address
- [ ] Sense of urgency or pressure ("must send today")
- [ ] Request to bypass normal procedures
- [ ] Subject line doesn't match typical closing communications

### Wire Instruction Red Flags

- [ ] Instructions differ from previous communications
- [ ] Account type changed (checking to savings, business to personal)
- [ ] Bank location doesn't match title company location
- [ ] Account in high-risk state (known for fraud: FL, CA, TX, AZ)
- [ ] Personal account instead of business escrow account
- [ ] New beneficiary name not previously mentioned
- [ ] Wire amount different from Final CD

### Communication Red Flags

- [ ] Unable to reach recipient via known phone number
- [ ] Recipient seems unfamiliar with loan details
- [ ] Recipient reluctant to verify via callback
- [ ] Phone number goes to voicemail (no receptionist)
- [ ] Phone number different from letterhead/title commitment
- [ ] Caller ID doesn't match stated phone number

### Timing Red Flags

- [ ] Wire request received <24 hours before closing
- [ ] Instructions changed at last minute
- [ ] Pressure to wire before approvals complete
- [ ] Closing date advanced suddenly
- [ ] Request received over weekend/holiday

**Scoring:**

- **0-2 flags:** Proceed with standard verification protocol
- **3-5 flags:** Enhanced verification required + supervisor approval
- **6+ flags:** High fraud risk - delay wire, full investigation, CFO approval required

**REMEMBER:** When in doubt, delay the wire. Better to delay closing than fund fraud. No legitimate title company or attorney will object to thorough fraud prevention measures.

---

## 🎯 Appendix B: Sample Fraud Incident Case Studies (2024)

### Case Study 1: Email Compromise Detected and Blocked

**Incident Date:** March 15, 2024
**Loan Amount:** $523,000
**Fraud Attempt Amount:** $523,000 (full loan amount)

**Attack Vector:**
Borrower's email account compromised 48 hours before closing. Attacker monitored email traffic and sent fake wire instructions appearing to come from title company, using domain "firstamericant1tle.com" (number 1 instead of letter i).

**How We Detected:**

1. Closer noticed email arrived at 11:47 PM (unusual time for title company)
2. Domain had slight variation when hovering over sender name
3. Callback verification protocol required call to title company
4. Called number from title commitment (not from email)
5. Title company confirmed they did NOT send new wire instructions

**Outcome:**

- Wire blocked before execution
- Real wire instructions obtained from title company
- Closing proceeded as scheduled
- Estimated loss prevented: **$523,000**
- Borrower notified to change email passwords

**Lessons Learned:**

- Callback verification is critical (would have funded fraud without it)
- Train staff to notice domain variations
- After-hours emails should raise suspicion
- Document everything

### Case Study 2: Phone Spoofing Attempt Blocked

**Incident Date:** July 22, 2024
**Loan Amount:** $287,500
**Fraud Attempt Amount:** $287,500

**Attack Vector:**
Fraudster spoofed title company phone number using VoIP technology. Caller ID showed title company number. Fraudster called closing department claiming "urgent wire instruction change" and provided new account details.

**How We Detected:**

1. Protocol requires us to call THEM (not accept inbound calls for wire changes)
2. Staff hung up and called number from title commitment
3. Real title company had no record of calling us
4. Real title company confirmed original wire instructions unchanged

**Outcome:**

- Fraud attempt blocked
- Original wire instructions used
- Closing proceeded
- Estimated loss prevented: **$287,500**
- Reported to FBI IC3

**Lessons Learned:**

- NEVER accept wire changes via inbound calls
- Always hang up and call back using known number
- Phone spoofing is easy and common
- Trust the protocol, not the caller ID

### Case Study 3: Last-Minute Account Change (Funded Before Protocol Update)

**Incident Date:** September 8, 2024
**Loan Amount:** $412,000
**Actual Loss:** $412,000 (wire funded to fraudulent account)

**Attack Vector:**
Title company email compromised. Fraudster sent "updated wire instructions" 18 hours before closing, claiming "our escrow account changed, please use new account."

**How Fraud Succeeded:**
This incident occurred BEFORE our enhanced callback verification protocol was mandatory. Staff member accepted email instructions without independent verification.

**Outcome:**

- Wire sent to fraudulent account
- Discovered 4 hours later when title company called asking where wire was
- Bank recall attempted but funds already withdrawn
- **Total Loss: $412,000**
- Insurance claim filed (E&O and Crime coverage)
- Law enforcement notified

**Recovery:**

- Insurance covered $350,000 (after $50K deductible)
- Remaining $62,000 absorbed by company
- Fraud ring identified and prosecuted
- Recovered $0 from fraudsters

**Lessons Learned:**

- This loss led to mandatory callback verification protocol (SOP version 3.0.0)
- NO exceptions to verification protocol, regardless of time pressure
- Train staff that "urgency" is a red flag, not a reason to shortcut security
- Insurance is backup, not primary defense

**Protocol Changes Implemented:**

1. Mandatory callback verification (Step 2.1)
2. Independent phone number lookup required
3. Dual approval thresholds lowered
4. Enhanced training for all closing staff
5. This SOP created and made mandatory

**Result Since Protocol Implementation:**

- 23 fraud attempts detected and blocked in 2024
- $3.2 million in attempted fraud prevented
- **$0 losses** since protocol implemented
- ROI: Protocol costs ~$2,500/month in extra time; prevented losses worth $3.2M

---

**END OF SOP-MF-005**

*This SOP is a controlled document. The official version is maintained in the SOP Management System. Printed copies are uncontrolled and may be outdated.*

**Questions or suggestions for improvement?** Email closing@apexmortgage.com or submit feedback via the SOP portal.
