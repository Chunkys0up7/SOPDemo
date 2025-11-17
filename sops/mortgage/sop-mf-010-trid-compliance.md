---
id: sop-mf-010
type: sop
version: 2.2.0
title: TRID Compliance and Disclosure Timing
department: Mortgage Lending - Compliance
audience: [Loan Officers, Processors, Underwriters, Closers, Compliance Officers]
complexity: high
estimatedTime: Variable by stage
effectiveDate: 2024-01-15
lastReviewed: 2025-10-15
nextReview: 2026-04-15
owner: Chief Compliance Officer
approver: VP of Mortgage Operations
compliance: [TILA-RESPA, Regulation Z, 12 CFR § 1026]
dependencies:
  - sop-mf-002  # AUS Processing
  - sop-mf-004  # Clear to Close
  - sop-mf-005  # Wire Transfer Security
tags:
  - TRID
  - disclosure
  - compliance
  - loan-estimate
  - closing-disclosure
  - timing
---

# TRID Compliance and Disclosure Timing

## Purpose

This SOP establishes mandatory procedures for compliance with the TILA-RESPA Integrated Disclosure (TRID) rule, ensuring accurate and timely delivery of the Loan Estimate (LE) and Closing Disclosure (CD) for all covered mortgage transactions.

## Scope

Applies to all closed-end consumer-purpose mortgage loans secured by real property, excluding:
- **Exempt Transactions**: HELOCs, reverse mortgages, mortgages secured by mobile homes/dwellings not attached to real property
- **Business Purpose**: Investor/commercial loans
- **Construction-Only**: Loans not secured by dwelling

## Regulatory Authority

### Primary Regulation
**12 CFR § 1026 (Regulation Z)** - Truth in Lending Act (TILA)
**12 CFR § 1024 (Regulation X)** - Real Estate Settlement Procedures Act (RESPA)

### Key CFPB Resources
- **TILA-RESPA Rule Small Entity Compliance Guide** (Version 4, Oct 2018)
- **TRID Rule Amendment Guide** (2017 amendments)
- **CFPB FAQs and Interpretive Guidance**

### Penalties for Non-Compliance
- **Civil**: Up to $5,000 per violation per day
- **CFPB Enforcement**: Consent orders, penalties, operational restrictions
- **Private Right of Action**: Borrower lawsuits for damages
- **Investor Repurchase**: Non-compliant loans may be required to be repurchased

## TRID Timeline Overview

```
Day 0: Application Received
  ↓
Day 3: Loan Estimate (LE) Delivered (by mail or email)
  ↓
[7 Business Days]
  ↓
Day 10: Intent to Proceed Received (earliest)
  ↓
[Loan Processing Period]
  ↓
Closing Disclosure (CD) Issued
  ↓
[7 Business Days Wait]
  ↓
EARLIEST CLOSING DATE
```

## Definitions - Critical TRID Terms

### Business Day Definitions

**General Business Day:**
- Any day except Sundays and federal holidays
- **Use For**: LE delivery timing

**Business Day (for waiting periods):**
- Any day the creditor's offices are open to the public for carrying out substantially all business functions
- **Use For**: 7-business-day waiting periods (LE to consummation, CD to consummation)

**Federal Holidays** (offices closed):
- New Year's Day (Jan 1)
- Martin Luther King Jr. Day (3rd Monday in Jan)
- Presidents' Day (3rd Monday in Feb)
- Memorial Day (Last Monday in May)
- Independence Day (July 4)
- Labor Day (1st Monday in Sept)
- Columbus Day (2nd Monday in Oct)
- Veterans Day (Nov 11)
- Thanksgiving (4th Thursday in Nov)
- Christmas (Dec 25)

### Application Definition

**Application Received When ALL Six Elements Provided:**
1. Borrower name
2. Borrower income
3. Property address
4. Estimated property value
5. Loan amount sought
6. Social Security Number (for credit pull)

**Important:** Cannot issue LE before application complete. Must wait for all 6 elements.

### Consummation

**Consummation** = Borrower becomes contractually obligated on the loan
- Typically: Signing of note at closing table
- **NOT** the same as closing/settlement (signing docs) or disbursement (funding)

## Loan Estimate (LE) Requirements

### Timing Requirements

**LE Delivery Deadline:**
- **3 business days** after receiving application
- Count: Day after application = Day 1

**Example:**
```
Application received: Monday
Day 1: Tuesday
Day 2: Wednesday
Day 3: Thursday ← LE must be delivered by end of this day
```

**Delivery Methods and Receipt Timing:**

| Delivery Method | Received Date | Explanation |
|-----------------|---------------|-------------|
| In-person | Same day | Hand-delivered to borrower |
| Email | Same day | If borrower consented to e-delivery |
| Fax | Same day | If borrower consented |
| Mail (actual) | Receipt confirmed | If borrower confirms receipt |
| Mail (presumed) | 3 business days after mailing | Mailing rule presumption |
| Overnight | Next business day | Fed-Ex, UPS (if delivered by then) |

**Recommended Practice:**
- Email LE (if consent obtained) for same-day delivery
- Mail LE same day as backup
- Document delivery method and date in LOS

### LE Content Requirements

**Page 1: Loan Terms**
- Loan amount
- Interest rate (fixed or adjustable)
- Monthly principal & interest
- Prepayment penalty (if applicable)
- Balloon payment (if applicable)

**Page 1: Projected Payments**
- Estimated escrow payment
- Estimated total monthly payment
- Estimated taxes, insurance, assessments
- Include: "In escrow" or "Not in escrow" designations

**Page 2: Closing Cost Details**
- **Section A**: Origination Charges (cannot increase)
- **Section B**: Services Borrower Cannot Shop For (cannot increase >10% cumulative)
- **Section C**: Services Borrower Can Shop For (can increase if borrower selects provider not on lender's list)
- **Section D**: Total Loan Costs
- **Section E**: Taxes and Government Fees (can increase based on actual)
- **Section F**: Prepaids (can increase based on actual)
- **Section G**: Initial Escrow Payment
- **Section H**: Other costs

**Page 3: Summary and Additional Information**
- Comparisons (5-year cost)
- APR
- TIP (Total Interest Percentage)
- Contact information
- Confirm receipt instructions

### Intent to Proceed Requirement

**Must Receive Before Incurring Fees:**
- Borrower must indicate intent to proceed with transaction
- **Cannot charge application or appraisal fees** until intent received
- Earliest receipt: 7 business days after LE delivered (using waiting period definition)

**Acceptable Forms of Intent:**
- Written confirmation (email, text, letter)
- Verbal confirmation (document in file notes)
- Payment of appraisal fee
- Proceeding to next step after receiving LE

**Document in File:**
- Date of intent to proceed
- Method (email, verbal, payment)
- Copy of email or written confirmation

## Revised Loan Estimate (Revised LE)

### When Required

**Changed Circumstances Requiring Revised LE:**

**1. Changed Circumstance - Information Relied Upon**
- Borrower-provided information was inaccurate or changed
- New information not available at LE issuance
- Examples:
  - Borrower credit score lower than stated (impacts fees)
  - Property type changes (condo vs SFR)
  - Down payment amount changes

**2. Changed Circumstance - Extraordinary Event**
- Natural disaster
- Acts of war/terrorism
- Other events beyond lender's control

**3. Changed Circumstance - Borrower-Requested Changes**
- Lock extension
- Change in loan amount
- Change in product type (FHA to Conventional)
- Adding/removing borrower

**4. Interest Rate Lock (or expiration)**
- Borrower locks rate
- Rate lock expires and borrower re-locks

**5. New Construction - Settlement Delays**
- Construction not completed within original timeframe

**6. Tolerance Violations**
- Fees increase beyond allowable tolerances
- Must issue revised LE to reset tolerances (if valid changed circumstance)

### Tolerances for Fee Increases

**Zero Tolerance** (cannot increase):
- Origination charges (Section A)
- Transfer taxes (part of Section E)
- Services borrower cannot shop for (Section B) - **unless** valid changed circumstance

**10% Cumulative Tolerance** (total of category cannot increase >10%):
- Recording fees (part of Section E)
- Services borrower cannot shop for (Section B)

**Unlimited Tolerance** (can increase):
- Services borrower can shop for IF borrower selects provider not on written list
- Prepaid interest (based on actual closing date)
- Property insurance premiums
- Homeowner association fees
- Amounts placed in escrow/reserves

**Calculating 10% Tolerance:**
```
Sum of Section B + Recording Fees (LE):   $2,000
Allowed 10% Increase:                      $200
Maximum at Closing (CD):                   $2,200

If actual costs = $2,250:
  Over tolerance by: $50
  Lender must cure (refund borrower $50)
```

### Revised LE Timing

**Must Provide Within:**
- **3 business days** of receiving information that causes changed circumstance
- **No later than 4 business days before consummation**

**Example:**
```
Changed circumstance discovered: Monday
Day 1: Tuesday
Day 2: Wednesday
Day 3: Thursday ← Revised LE must be delivered by this day
```

**If Too Close to Closing:**
- Revised LE not required if <4 business days before consummation
- Changes reflected on Closing Disclosure instead
- Document reason in file

### Revised LE Versions

**Track LE Versions:**
- Original LE: Version 1
- First Revised LE: Version 2
- Second Revised LE: Version 3
- etc.

**Label clearly on document** (e.g., "Revised Loan Estimate - Version 2")

## Closing Disclosure (CD) Requirements

### Timing Requirements

**CD Delivery Deadline:**
- **At least 7 business days before consummation**
- Use "waiting period" business day definition (exclude Sundays + days lender closed)

**Counting Business Days:**
```
Example 1: No holidays, lender open Mon-Fri
CD delivered: Monday (Day 0)
Day 1: Tuesday
Day 2: Wednesday
Day 3: Thursday
Day 4: Friday
Day 5: Monday (skip weekend)
Day 6: Tuesday
Day 7: Wednesday
Earliest Consummation: Thursday

Example 2: Holiday on Wednesday
CD delivered: Monday (Day 0)
Day 1: Tuesday
Day 2: [Skip - Holiday Wednesday]
Day 3: Thursday
Day 4: Friday
Day 5: Monday
Day 6: Tuesday
Day 7: Wednesday
Earliest Consummation: Thursday
```

**Delivery Methods** (same as LE):
- Email (same day, if consent)
- In-person (same day)
- Mail (presumed received 3 business days after mailing)

**Best Practice:**
- Email CD to borrower for same-day delivery
- Also mail for backup
- Obtain electronic signature confirming receipt

### CD Content Requirements

**Must Match Final Loan Terms:**
- Loan amount (final)
- Interest rate (locked rate)
- Monthly payment (P&I + escrow)
- Closing costs (actual)
- Cash to close (actual)

**Comparison to Loan Estimate:**
- Page 3 shows side-by-side comparison (LE vs CD)
- Highlights variances
- Demonstrates tolerance compliance

### Revised Closing Disclosure (Revised CD)

**Three-Day Reset Triggers:**

If ANY of these three items change, **7-day waiting period resets**:
1. **APR increases >0.125%** (1/8th of a percent)
2. **Loan product changes** (e.g., 30-year fixed to 5/1 ARM)
3. **Prepayment penalty added**

**Non-Reset Changes:**
- Other fee increases (provide revised CD before consummation, but no reset)
- Closing cost changes within tolerance
- Seller credits change
- Cash to close changes
- Loan amount changes (minor)

**Timing for Revised CD:**
- **If reset triggered**: Deliver revised CD, wait another 7 business days
- **If non-reset**: Deliver revised CD before consummation (no waiting period)

**Versions:**
- Track and label (Version 1, Version 2, etc.)
- Final signed CD at closing = Final version

### CD Accuracy and Tolerance Compliance

**Pre-Closing Tolerance Check:**

**Step 1: Calculate Section B + Recording Fees**
```
Loan Estimate (Section B + Recording Fees):     $X
Actual Fees on CD:                               $Y
Variance:                                         $Y - $X
Allowed 10%:                                      $X × 0.10

If Variance > Allowed 10%:
  ✓ Verify valid changed circumstance exists
  ✓ Revised LE issued to reset tolerance
  ✓ OR lender cures (credits borrower difference)
```

**Step 2: Zero Tolerance Check**
```
LE Origination Charges (Section A):              $X
CD Origination Charges (Section A):              $Y

If Y > X:
  ✓ ERROR - Cannot increase
  ✓ Lender must cure (credit borrower difference)
```

**Step 3: Unlimited Tolerance Verification**
- Prepaid interest calculated correctly (per diem × days)
- Property insurance reflects actual premium
- HOA fees reflect actual dues
- Escrow deposits calculated correctly

**Cure Requirements:**
- If tolerance violated, lender must **credit borrower at closing**
- Document cure as lender credit on CD Section J
- Cannot roll into loan amount (must be cash credit)

## Changed Circumstances Documentation

### Required Documentation

**For Each Changed Circumstance:**
1. **Description**: What changed and why
2. **Date Discovered**: When lender became aware
3. **Impact**: How it affects fees or terms
4. **Borrower Notification**: Date borrower notified
5. **Revised LE**: Date issued (if required)

**Examples:**

**Example 1: Credit Score Lower Than Stated**
```
Changed Circumstance Log:
Date Discovered: 10/15/2025
Description: Borrower stated credit score 740, actual score 680
Impact: Lender credit reduced from $2,000 to $500 (pricing adjustment)
Valid Changed Circumstance: Yes (inaccurate borrower information)
Borrower Notified: 10/15/2025 (phone call, confirmed via email)
Revised LE Issued: 10/16/2025 (Version 2)
Reset Tolerances: Yes
```

**Example 2: Appraisal Comes in Low**
```
Changed Circumstance Log:
Date Discovered: 10/20/2025
Description: Appraised value $280,000, expected $300,000
Impact: LTV increased from 80% to 86%, PMI required ($150/month)
Valid Changed Circumstance: Yes (new information)
Borrower Notified: 10/20/2025 (email with revised LE)
Revised LE Issued: 10/21/2025 (Version 2)
Reset Tolerances: Yes
```

**Invalid Changed Circumstance Examples:**
❌ Lender forgot to include fee on LE (lender error, not changed circumstance)
❌ Vendor increased fee without reason (lender must absorb)
❌ Borrower shopped and found lower fee (not a reason to increase if they select from list)

## Special Timing Situations

### Construction-to-Permanent Loans

**Two Closings:**
1. **Construction Phase LE/CD**: For construction loan
2. **Permanent Loan CD**: When converting to permanent mortgage

**Timing:**
- LE for construction: 3 business days after application
- CD for construction: 7 business days before construction loan closing
- CD for permanent conversion: 7 business days before conversion (or at least 3 days if combined)

**CFPB Allowance:**
- Single CD may be used if construction and permanent terms are known and disclosed upfront

### Closing on a Saturday

**Consummation Calculation:**
```
CD Delivered: Monday (via email, received same day)
Day 1: Tuesday
Day 2: Wednesday
Day 3: Thursday
Day 4: Friday
Day 5: Monday (skip Saturday/Sunday if lender closed)
Day 6: Tuesday
Day 7: Wednesday
Earliest Consummation: Thursday

If Lender Open Saturdays:
  Count Saturday as business day
  Earliest consummation could be Wednesday
```

### Holidays and Timing

**Federal Holiday Falls in Waiting Period:**
- Skip holiday when counting (it's not a business day)
- Continue count on next business day

**Example:**
```
CD Delivered: Thursday (Thanksgiving next week)
Day 1: Friday
Day 2: Monday
Day 3: Tuesday
Day 4: Wednesday
Day 5: [Skip Thursday - Thanksgiving]
Day 6: Friday
Day 7: Monday
Earliest Consummation: Tuesday
```

## Borrower E-Consent and Electronic Delivery

### E-Consent Requirements (E-Sign Act)

**Before Using Electronic Delivery:**
1. **Borrower must affirmatively consent** (cannot be required)
2. **Borrower must demonstrate ability** to access electronic records
3. **Provide disclosures** about right to paper copies
4. **Allow withdrawal** of consent at any time

**E-Consent Form Must Include:**
- Description of hardware/software requirements
- Right to request paper copy
- Right to withdraw consent
- Procedures for updating contact information
- Consequences of withdrawing consent

**Acceptable E-Delivery Methods:**
- Secure email (encrypted if sensitive)
- Secure borrower portal (with login)
- Text message with link (if consent obtained)

**Documentation:**
- E-consent form signed and dated
- Record of electronic delivery (date/time sent)
- Evidence of receipt (email read receipt, portal access log)

## Common TRID Violations and How to Avoid

### Violation 1: Late LE Delivery

**Error:** LE not delivered within 3 business days of application

**How to Avoid:**
- LOS system auto-calculates LE due date
- Set reminders at Day 2 (1 day before due)
- Email LE same day to ensure timely delivery
- Document delivery date and method

**If Violation Occurs:**
- Deliver LE immediately
- Document delay and reason
- Self-report to compliance officer
- Consider self-disclosure to CFPB if egregious

### Violation 2: Early Closing (7-Day Wait Not Met)

**Error:** Closing occurred before 7 business days after CD delivery

**How to Avoid:**
- LOS system auto-calculates earliest closing date
- Closing department verifies waiting period before scheduling
- Confirm CD delivery date with borrower (get confirmation)
- Never schedule closing until day count verified

**If Violation Occurs:**
- **Severe** - Loan may need to be rescinded/re-closed
- Immediate escalation to senior management and compliance
- Likely CFPB self-disclosure required
- Investor may reject loan (repurchase risk)

### Violation 3: Tolerance Violations (Fees Increased Beyond Limits)

**Error:** Fees increased >10% (or at all for zero tolerance) without valid changed circumstance

**How to Avoid:**
- Lock vendor fees at LE issuance
- Monitor for any fee changes during processing
- Document changed circumstances immediately
- Issue revised LE when valid changed circumstance occurs
- Perform tolerance analysis before CD issuance

**If Violation Occurs:**
- Cure immediately (credit borrower)
- Document as lender credit on CD
- Cannot charge borrower excess amount
- Self-report to compliance if pattern identified

### Violation 4: Changed Circumstance Not Documented

**Error:** Fees increased based on alleged changed circumstance, but no documentation supporting it

**How to Avoid:**
- Use changed circumstance log (template)
- Document date discovered, reason, impact
- Obtain evidence (email from borrower, new information, etc.)
- Issue revised LE promptly
- File documentation in loan file

**If Violation Occurs:**
- Treat as tolerance violation (cure)
- Enhance documentation procedures
- Train staff on changed circumstance requirements

### Violation 5: APR Accuracy Error

**Error:** APR on CD differs significantly from LE without valid reason

**How to Avoid:**
- Use LOS system to auto-calculate APR (don't calculate manually)
- Double-check APR before delivering LE or CD
- If APR increases >0.125%, issue revised CD (reset waiting period)

**If Violation Occurs:**
- If APR understated on CD: Issue corrected CD before closing
- If APR increase >0.125%: Reset waiting period
- Document calculation and reason for variance

## File Documentation Checklist

**Every Loan File Must Contain:**

```
☐ Application date and time
☐ LE delivery date and method (email, mail, in-person)
☐ LE version history (if revised)
☐ Intent to proceed documentation (email, note, payment)
☐ Changed circumstance log (if applicable)
☐ Revised LE documentation (if applicable)
☐ CD delivery date and method
☐ Earliest closing date calculation
☐ CD version history (if revised)
☐ Tolerance analysis worksheet
☐ Cure documentation (if fees exceeded tolerance)
☐ Final signed CD
☐ Borrower acknowledgment of receipt (LE and CD)
```

## Training and Competency

### Initial Training Requirements
- 8 hours: TRID overview and timing rules
- 4 hours: Loan Estimate preparation and delivery
- 4 hours: Closing Disclosure preparation and delivery
- 4 hours: Tolerances and changed circumstances
- 2 hours: E-consent and electronic delivery
- **Certification Required**: Pass TRID competency exam (≥95%)

### Continuing Education
- Annual TRID refresher (4 hours)
- Quarterly updates on CFPB guidance
- Immediate training when regulations change

### Role-Specific Training

**Loan Officers:**
- Focus: Application intake, LE delivery, borrower communication

**Processors:**
- Focus: Fee verification, changed circumstances, revised LE issuance

**Underwriters:**
- Focus: Recognizing changed circumstances, tolerance implications

**Closers:**
- Focus: CD preparation, tolerance compliance, waiting period verification

## Quality Control and Auditing

### Pre-Closing Review (100% of Loans)

**Compliance Officer Review:**
```
☐ LE delivered timely (within 3 business days)
☐ Intent to proceed documented
☐ Changed circumstances valid and documented
☐ Revised LE issued when required
☐ Tolerances not violated (or cured)
☐ CD delivered at least 7 business days before closing
☐ Revised CD issued if reset triggers occurred
☐ Earliest closing date calculated correctly
☐ Final CD accurate and matches loan terms
```

**Approval Required:** Compliance sign-off before closing scheduled

### Post-Closing Audit (Sample 25% Monthly)

**Random Sample + High-Risk Loans:**
- Complex loans (construction, multiple changes)
- Loans with multiple revised LEs/CDs
- Loans with tolerance cures
- Rush closings

**Audit Includes:**
- Recalculate all timing (LE delivery, CD delivery, earliest closing)
- Verify changed circumstances valid
- Recalculate tolerances
- Confirm documentation complete

### Regulatory Examination Preparedness

**CFPB Examination Focus Areas:**
1. Timing compliance (LE and CD delivery)
2. Tolerance compliance (fee accuracy)
3. Changed circumstance documentation
4. APR accuracy
5. Electronic delivery procedures (if used)

**Maintain Ready:**
- Policy and procedure manual (this SOP)
- Training records (attendance, certifications)
- Audit reports (pre-closing and post-closing)
- Corrective action logs (violations and remediation)
- Sample loan files (compliant examples)

## Related SOPs
- {{include: sop-mf-002}} - AUS Processing (timing for AUS findings impact)
- {{include: sop-mf-004}} - Clear to Close Verification (final CD verification)
- {{include: sop-mf-005}} - Wire Transfer Security (disbursement timing)

## Appendices

### Appendix A: Business Day Counting Worksheet

```
CD Delivery Date: ___/___/_____ (Day 0)
Day 1: ___/___/_____
Day 2: ___/___/_____
Day 3: ___/___/_____
Day 4: ___/___/_____
Day 5: ___/___/_____
Day 6: ___/___/_____
Day 7: ___/___/_____

Earliest Consummation Date: ___/___/_____

Holidays/Lender Closed Days Excluded:
- ___/___/_____ (reason: _____________)
- ___/___/_____ (reason: _____________)
```

### Appendix B: Changed Circumstance Log Template

```
Loan Number: ___________
Borrower Name: ___________

Changed Circumstance Details:
Date Discovered: ___/___/_____
Description: _________________________
Type: ☐ Inaccurate Information ☐ New Information ☐ Borrower-Requested ☐ Extraordinary Event ☐ Other
Impact on Fees/Terms: _________________
Valid Changed Circumstance: ☐ Yes ☐ No
Reason: _______________________________

Actions Taken:
Borrower Notified: ___/___/_____ (Method: ☐ Phone ☐ Email ☐ In-person)
Revised LE Required: ☐ Yes ☐ No
Revised LE Issued: ___/___/_____ (Version: ___)
Tolerances Reset: ☐ Yes ☐ No

Documentation Attached:
☐ Borrower communication (email, letter)
☐ Supporting evidence (credit report, appraisal, etc.)
☐ Revised LE (if issued)

Reviewed By: _____________ Date: ___/___/_____
```

### Appendix C: Tolerance Analysis Worksheet

[See full tolerance calculation worksheet in loan file templates]

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.2.0 | 2025-10-15 | Added e-consent procedures, updated examples | Chief Compliance Officer |
| 2.1.0 | 2024-09-15 | Enhanced changed circumstance guidance per CFPB FAQs | Compliance Manager |
| 2.0.0 | 2024-05-15 | Major update incorporating 2017 TRID amendments | Chief Compliance Officer |
| 1.0.0 | 2024-01-15 | Initial comprehensive version | VP Mortgage Operations |

---
**Document Classification**: Internal Use - Regulatory Compliance
**Retention Period**: Permanent (regulatory requirement)
**Review Frequency**: Quarterly or upon regulatory changes
