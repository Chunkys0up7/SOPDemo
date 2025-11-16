---
id: sop-mf-004
title: Clear to Close (CTC) Verification Process
version: 5.1.2
status: active
department: Closing
category: Closing & Funding
owner: Emily Patterson
effective_date: 2025-10-22
last_reviewed: 2025-10-22
review_frequency: monthly
approver: Jennifer Rodriguez (VP Operations)
criticality: critical
compliance_frameworks:
  - TRID (TILA-RESPA Integrated Disclosure)
  - Quality Control Standards
  - Investor Guidelines (Fannie Mae, Freddie Mac, FHA, VA)
  - State Licensing Requirements
dependencies:
  - sop-mf-002  # AUS Processing
  - sop-mf-003  # FHA Underwriting
  - sop-mf-005  # Wire Transfer Security
  - sop-mf-008  # Income Documentation
  - sop-mf-009  # Appraisal Review
  - sop-mf-010  # TRID Compliance
tags:
  - closing
  - quality-control
  - final-verification
  - TRID
  - clear-to-close
---

# Clear to Close (CTC) Verification Process

## 🎯 Overview

### Purpose

This SOP establishes the comprehensive verification process to issue "Clear to Close" (CTC) status for mortgage loans. CTC is the final quality control checkpoint before scheduling closing and funding, ensuring all underwriting conditions are satisfied, documentation is complete, and the loan complies with investor, regulatory, and internal requirements. **No loan shall proceed to closing without documented CTC approval.**

###

 Scope
**Applies to:**

- All loan types before closing (conventional, FHA, VA, USDA, jumbo)
- Purchase and refinance transactions
- All loan amounts and property types
- Loans with Automated Underwriting System (AUS) approval
- Manually underwritten loans

**Critical Timing:**

- CTC must be issued BEFORE Closing Disclosure (CD) final delivery
- Minimum 24-hour buffer between CTC and closing (best practice: 48 hours)
- Closing cannot occur without valid CTC status

### Key Statistics (2024 Performance)

- **Annual CTC Volume:** 4,847 loans cleared
- **Average Time to CTC:** 2.3 days from final condition receipt
- **CTC Rescind Rate:** 1.2% (58 loans rescinded after initial CTC)
- **Same-Day CTC Requests:** 23% (1,115 loans - rush closings)
- **Condition Satisfaction Rate:** 97.8% on first submission
- **Post-Closing Audit Defects:** 0.4% (19 loans with defects)
- **Investor Purchase Rate:** 100% (no loans rejected by investors)

**Quality Metrics:**

- Zero early funding violations (TRID 3-day waiting period)
- Zero post-closing regulatory violations
- 99.6% loan documentation accuracy

---

## 📋 Prerequisites

Before beginning CTC review, verify the following are in the loan file:

### Underwriting Requirements

- [ ] **Final loan approval** from underwriter (signed approval letter)
- [ ] **All conditions cleared** (Prior-to-Doc and Prior-to-Fund conditions satisfied)
- [ ] **Final credit report** pulled (<120 days old, no new derogatory items)
- [ ] **Employment verification** completed within 10 days of closing
- [ ] **Asset verification** updated within 90 days
- [ ] **Appraisal** reviewed and accepted by underwriter
- [ ] **Title commitment** or title update received and reviewed
- [ ] **Homeowner's insurance** binder received, showing lender as mortgagee
- [ ] **Investor approval** (if selling loan) or warehouse approval (if keeping)

### TRID Compliance Requirements (Per {{include: sop-mf-010}})

- [ ] **Initial Loan Estimate** delivered within 3 business days of application
- [ ] **Initial Closing Disclosure** delivered at least 3 business days before consummation
- [ ] **APR tolerance** within 0.125% of LE (or redisclosure completed if exceeded)
- [ ] **Fee tolerance** within applicable tolerances (zero, 10%, or unlimited categories)
- [ ] **Changed circumstances** documented if fees changed

### System Requirements

- Access to Loan Origination System (LOS)
- Access to document imaging system
- Access to Final CD and LE comparison tool
- Authority to issue CTC in workflow system
- QC checklist access

---

## ✅ Clear to Close Checklist (Master)

This comprehensive 75-point checklist must be completed for every loan:

### Section 1: Borrower and Property Verification (10 points)

#### 1.1 Borrower Identity

- [ ] **1.1.1** Borrower name(s) match across all documents (application, credit, title, CD)
- [ ] **1.1.2** SSN matches across all documents (4506-C, credit, W-2s)
- [ ] **1.1.3** Current address verified and matches credit report
- [ ] **1.1.4** Marital status confirmed (affects title vesting in community property states)
- [ ] **1.1.5** No identity fraud indicators (OFAC, fraud alerts, suspicious activity)

**Documentation:**

```
Verification Log:
Borrower: John Michael Smith
SSN: ***-**-1234 (last 4)
Current Address: 789 Maple Ave, Dallas, TX 75201
Marital Status: Married (spouse: Jane Smith)

Cross-Reference Check:
✓ 1003 Application: John M. Smith, ***-**-1234, 789 Maple Ave
✓ Credit Report: John Michael Smith, ***-**-1234, 789 Maple Ave
✓ W-2 (2024): John Smith, ***-**-1234
✓ Final CD: John Michael Smith, 789 Maple Ave
✓ Title Commitment: John M. Smith and Jane Smith (community property with right of survivorship)

OFAC Screen: CLEAR
Fraud Alerts: NONE
Identity Verified: YES ✓
```

#### 1.2 Property Verification

- [ ] **1.2.1** Property address matches across all documents (appraisal, title, CD, contract)
- [ ] **1.2.2** Legal description matches title commitment and appraisal
- [ ] **1.2.3** Property type confirmed (SFR, condo, 2-4 unit, etc.)
- [ ] **1.2.4** Occupancy type verified (primary, second home, investment)
- [ ] **1.2.5** Property value supports loan amount (LTV within limits)

**Example:**

```
Property: 123 Oak Street, Austin, TX 78701
Legal Description: Lot 15, Block 3, Oak Hills Subdivision, Travis County, TX
Property Type: Single Family Residence
Occupancy: Primary Residence
Appraised Value: $425,000
Purchase Price: $420,000
Loan Amount: $403,500
LTV: 96% (within FHA 96.5% max)

Document Cross-Check:
✓ Purchase Contract: 123 Oak St, Austin TX 78701
✓ Appraisal: 123 Oak Street, Austin, TX 78701 (Lot 15, Block 3, Oak Hills)
✓ Title Commitment: Same legal description
✓ Closing Disclosure: 123 Oak Street, Austin TX 78701
✓ HOI Binder: 123 Oak Street, Austin TX 78701

Property Verified: YES ✓
```

---

### Section 2: Credit and Liabilities Verification (12 points)

#### 2.1 Final Credit Report Review

- [ ] **2.1.1** Credit report <120 days old at closing date
- [ ] **2.1.2** Soft credit re-pull completed within 10 days of closing (verify no new debt)
- [ ] **2.1.3** Credit score supports loan program (no score drop below minimums)
- [ ] **2.1.4** No new derogatory items since approval (lates, collections, inquiries)
- [ ] **2.1.5** All collections >$1,000 paid off or in payment plan (if required by investor)

**Soft Credit Re-Pull Example:**

```
Original Credit Report: August 15, 2025
Representative Score: 658

Final Credit Re-Pull: October 20, 2025 (10 days before closing)
New Representative Score: 662 (INCREASED)

New Accounts Since Approval:
- NONE identified

New Inquiries:
- Auto loan inquiry (09/12/2025) - borrower explained: shopping for car loan
- Action: Obtain LOE from borrower, verify no new auto loan taken

New Derogatory Items:
- NONE

Collections:
- Original: Medical collection $847 (disregarded per investor)
- New: NONE

Conclusion: Credit stable, score increased, no new debt
Cleared for Closing: YES ✓
```

#### 2.2 Debt-to-Income (DTI) Verification

- [ ] **2.2.1** All liabilities from credit report included in DTI
- [ ] **2.2.2** Student loans calculated correctly (payment or 0.5% of balance)
- [ ] **2.2.3** Alimony/child support included (if applicable)
- [ ] **2.2.4** Other real estate PITI included (if applicable)
- [ ] **2.2.5** DTI within investor/AUS guidelines
- [ ] **2.2.6** No new debt added since approval
- [ ] **2.2.7** Paid-off debts verified if used to qualify

**DTI Re-Calculation:**

```
Final DTI Verification (at CTC):

Housing Payment:
Principal & Interest: $1,823
Property Taxes: $354
Homeowner's Insurance: $127
HOA Dues: $85
Mortgage Insurance: $137
Total PITI+MIP: $2,526

Monthly Debt Obligations:
Auto Loan: $487 (18 months remaining)
Student Loan: $284 (IBR payment, verified)
Credit Card (Visa): $35 (min payment)
Credit Card (MC): $42 (min payment)
Total Debts: $848

Total Monthly Obligations: $2,526 + $848 = $3,374

Gross Monthly Income: $7,200

Front-End DTI: $2,526 ÷ $7,200 = 35.08%
Back-End DTI: $3,374 ÷ $7,200 = 46.86%

Investor Max (FHA Manual UW): 31% / 50% with compensating factors
Actual DTI: 35.08% / 46.86%
Compensating Factors: 6 months reserves, excellent payment history
Within Guidelines: YES ✓
```

---

### Section 3: Income and Employment Verification (15 points)

#### 3.1 Employment Verification

- [ ] **3.1.1** Verbal VOE completed within 10 days of closing (required)
- [ ] **3.1.2** Borrower still employed at same company
- [ ] **3.1.3** Income confirmed unchanged or increased
- [ ] **3.1.4** No anticipated changes to employment
- [ ] **3.1.5** Final paystub dated within 30 days of closing

**Verbal VOE Documentation:**

```
VERBAL VERIFICATION OF EMPLOYMENT

Loan: 2025-LA-04789
Borrower: John Smith
Employer: ABC Manufacturing Company
Phone: (512) 555-0100
Verification Date: 10/20/2025 (10 days before 10/30 closing)

Spoke With: Linda Martinez, HR Manager
Employee ID Confirmed: EMP-5634

Employment Status: ACTIVE
Position: Manufacturing Supervisor
Hire Date: 04/15/2018 (7+ years)
Employment Type: Full-time, salary

Current Salary: $104,000/year ($8,666.67/month)
Last salary increase: 01/01/2025 (annual merit increase)
Pay Frequency: Bi-weekly

Anticipated Changes: NONE
Probability of Continued Employment: Excellent

Verified By: Sarah Martinez, Closer
Date: 10/20/2025, 2:45 PM
Confirmation: Employment and income CONFIRMED ✓

Action: Cleared for closing
```

#### 3.2 Income Documentation

- [ ] **3.2.1** Income calculations match underwriting approval
- [ ] **3.2.2** Final paystub YTD earnings support projected annual income
- [ ] **3.2.3** Self-employed: YTD P&L shows consistent income
- [ ] **3.2.4** Bonus/OT/commission: Income trends stable or increasing
- [ ] **3.2.5** Social Security/pension: Award letter or statement in file

#### 3.3 Asset Verification

- [ ] **3.3.1** Bank statements current (dated within 90 days of closing)
- [ ] **3.3.2** Funds sufficient for closing costs + down payment + reserves
- [ ] **3.3.3** Large deposits explained and sourced
- [ ] **3.3.4** Gift funds: Donor transfer verified (wire confirmation or cleared check)
- [ ] **3.3.5** No overdrafts or NSF fees on final statements

**Final Asset Verification:**

```
Required Funds at Closing (per Final CD):
Down Payment: $21,000
Closing Costs: $8,450
Prepaids/Escrows: $3,200
Total Cash Needed: $32,650

Borrower Assets (as of 10/15/2025 statements):
Chase Checking ****1234: $18,500
Chase Savings ****5678: $12,400
Gift from Parents: $8,000 (wire received 10/10/2025)
Total Available: $38,900

Surplus: $38,900 - $32,650 = $6,250 (reserves)

Gift Documentation:
✓ Gift letter signed by donors
✓ Donor bank statement showing $8,000 available
✓ Wire confirmation dated 10/10/2025
✓ Borrower statement showing deposit 10/10/2025

Verification: Sufficient funds CONFIRMED ✓
```

---

### Section 4: Appraisal and Property Condition (8 points)

#### 4.1 Appraisal Review

- [ ] **4.1.1** Appraisal dated within 120 days of closing (150 for new construction)
- [ ] **4.1.2** Appraised value ≥ purchase price (or loan amount if refi)
- [ ] **4.1.3** No adverse conditions noted requiring further review
- [ ] **4.1.4** Comparable sales appropriate and recent
- [ ] **4.1.5** Property condition meets investor standards (FHA MPR, conventional, etc.)

#### 4.2 Required Repairs

- [ ] **4.2.1** All required repairs completed (if applicable)
- [ ] **4.2.2** Completion certificate from appraiser or inspector received
- [ ] **4.2.3** Photos of completed repairs in file
- [ ] **4.2.4** OR repair escrow established per investor guidelines (if allowed)

**Example Repair Completion:**

```
Appraisal Dated: 09/15/2025
Required Repairs Noted:
1. Handrail missing on front porch steps (safety hazard)
2. GFCI outlet required in kitchen (electrical code)
3. Peeling paint on exterior trim (pre-1978 home, lead concern)

Repair Completion:
- Contractor: ABC Home Repairs, License #12345
- Work completed: 10/15/2025
- Invoice: $1,850 paid by seller
- Completion inspection: 10/18/2025 by appraiser

Appraiser Certification:
"I have personally inspected the subject property on 10/18/2025 and verify that all
previously noted repairs have been completed in a workmanlike manner. Property now
meets FHA Minimum Property Requirements."
- Signed: Robert Johnson, Certified Appraiser #TX-7890

Photos: Attached to file (handrail installed, GFCI outlet, repainted trim)
Cleared: YES ✓
```

---

### Section 5: Title and Legal (10 points)

#### 5.1 Title Review

- [ ] **5.1.1** Title commitment or update received and reviewed
- [ ] **5.1.2** Seller has clear title (no unacceptable liens or encumbrances)
- [ ] **5.1.3** Required Schedule B exceptions cleared or accepted by underwriter
- [ ] **5.1.4** Survey or survey waiver obtained (per investor requirements)
- [ ] **5.1.5** No title issues preventing closing

**Title Commitment Review:**

```
Title Commitment: First American Title
Commitment Date: 09/25/2025
Property: 123 Oak Street, Austin, TX 78701

Schedule A (Ownership):
Current Owner: Robert & Susan Miller (sellers)
Proposed Insured: John Michael Smith and Jane Smith

Schedule B Exceptions (Permitted):
1. Property taxes for 2025 (prorated at closing) - ACCEPTABLE
2. HOA covenants and restrictions recorded 05/12/2018 - ACCEPTABLE
3. Utility easement (10' rear property line) - ACCEPTABLE, typical
4. Deed restriction: No commercial use - ACCEPTABLE, residential property

Schedule B Requirements (Must Clear Before Closing):
1. Payoff existing mortgage (Chase Bank, $245,680) - CLEARED (payoff demand received)
2. Release mechanic's lien ($3,400, ABC Plumbing, filed 08/2025) - CLEARED (lien released 10/10/2025)
3. Satisfy HOA assessment ($285, August dues) - CLEARED (paid by seller)

Title Defects: NONE
Exceptions: All acceptable
Requirements: All cleared
Title Insurance: Clear to insure ✓
```

#### 5.2 Vesting and Ownership

- [ ] **5.2.1** Title vesting matches borrower intent (sole, joint tenants, community property)
- [ ] **5.2.2** Non-purchasing spouse signature obtained (if required by state)
- [ ] **5.2.3** Entity vesting (LLC, trust) has proper authorization docs
- [ ] **5.2.4** Power of Attorney (if applicable) meets investor requirements
- [ ] **5.2.5** Executor/administrator authority (estate property) properly documented

---

### Section 6: Insurance Requirements (5 points)

#### 6.1 Homeowner's Insurance

- [ ] **6.1.1** Insurance binder or policy received
- [ ] **6.1.2** Coverage amount ≥ loan amount or replacement cost
- [ ] **6.1.3** Lender named as mortgagee/loss payee (exact name match)
- [ ] **6.1.4** Effective date on or before closing date
- [ ] **6.1.5** First year premium paid or will be paid at closing (receipt or on CD)

**Insurance Verification:**

```
Insurance Binder Review:
Company: State Farm Insurance
Policy: HO6-2025-78945
Effective Date: 10/30/2025 (closing date)

Coverage Amounts:
Dwelling: $425,000 (replacement cost)
Personal Property: $212,500
Liability: $300,000
Deductible: $2,500

Perils Covered: HO-3 (Special Form - all perils except exclusions)

Lender Named: "Apex Mortgage Company ISAOA ATIMA"
Address: 100 Main St, Suite 200, Austin, TX 78701
Loan Number: 2025-LA-04789

Premium: $1,524/year
Payment: First year paid via closing (on CD, line C02)

Special Requirements:
✓ Flood Zone X (no flood insurance required)
✓ Windstorm coverage included (Texas requirement)

Verified: Insurance adequate and compliant ✓
```

---

### Section 7: Closing Disclosure Review (15 points)

#### 7.1 CD Accuracy

- [ ] **7.1.1** All borrower and property information correct
- [ ] **7.1.2** Loan amount, interest rate, monthly payment match approval
- [ ] **7.1.3** Loan terms (fixed/ARM, years, prepayment penalty) correct
- [ ] **7.1.4** Estimated taxes and insurance match actual
- [ ] **7.1.5** All fees disclosed and within tolerance
- [ ] **7.1.6** Cash to close reconciles (LE to CD comparison)

#### 7.2 TRID Compliance

- [ ] **7.1.7** Initial CD delivered ≥3 business days before consummation
- [ ] **7.1.8** APR tolerance: Within 0.125% of LE (or redisclosed if exceeded)
- [ ] **7.1.9** Zero tolerance fees: No increase (loan origination, transfer taxes)
- [ ] **7.1.10** 10% tolerance fees: Cumulative increase ≤10% (title, appraisal, credit report)
- [ ] **7.1.11** Changed circumstances documented for any fee increases
- [ ] **7.1.12** Revised CD provided if fees changed requiring redisclosure

**TRID Tolerance Analysis:**

```
Loan Estimate (LE) vs Final Closing Disclosure (CD):

APR Tolerance Check:
LE APR: 6.875%
Final CD APR: 6.912%
Difference: +0.037% (within 0.125% tolerance) ✓

Zero Tolerance Fees (Cannot Increase):
Description               LE Amount    CD Amount    Variance
Origination Charge        $2,500       $2,500       $0 ✓
Transfer Taxes            $1,800       $1,800       $0 ✓
Total Zero Tolerance:     $4,300       $4,300       $0 (COMPLIANT ✓)

10% Cumulative Tolerance:
Description               LE Amount    CD Amount    Variance
Appraisal Fee            $550         $550         $0
Credit Report            $65          $65          $0
Title - Settlement       $395         $425         +$30
Title - Lender's Policy  $650         $650         $0
Title - Owner's Policy   $1,100       $1,150       +$50
Total 10% Tolerance:     $2,760       $2,840       +$80

Max Allowed Increase: $2,760 × 10% = $276
Actual Increase: $80
Compliant: YES ✓ ($80 < $276 allowed)

Unlimited Tolerance (Can Vary):
Daily interest, property taxes, HOA fees, recording fees, etc. - NO LIMITS

TRID Status: FULLY COMPLIANT ✓
Redisclosure Required: NO
```

---

### Section 8: Funding and Wire Authorization (10 points)

#### 8.1 Investor/Warehouse Approval

- [ ] **8.1.1** Investor purchase commitment received (if selling)
- [ ] **8.1.2** Warehouse line approval obtained (if keeping temporarily)
- [ ] **8.1.3** Funding amount confirmed
- [ ] **8.1.4** Any investor conditions satisfied
- [ ] **8.1.5** Rate lock still active (or extended if needed)

#### 8.2 Wire Transfer Preparation (Per {{include: sop-mf-005}})

- [ ] **8.2.1** Wire instructions received from title company/attorney
- [ ] **8.2.2** Wire amount calculated (loan amount - fees + escrows)
- [ ] **8.2.3** Callback verification of wire instructions completed
- [ ] **8.2.4** OFAC screening of wire beneficiary completed
- [ ] **8.2.5** Wire request submitted for dual approval

---

## 🔄 Clear to Close Process Flow

### Step 1: Receive Final Conditions from Underwriter

When underwriter issues final approval with conditions:

1. Review approval letter for all Prior-to-Doc (PTD) and Prior-to-Fund (PTF) conditions
2. Create condition tracking checklist in LOS
3. Assign conditions to appropriate staff (processor, closer, borrower)
4. Set target date for condition receipt (usually 48 hours before closing)

**Example Conditions:**

```
LOAN APPROVAL WITH CONDITIONS

Loan: 2025-LA-04789
Borrower: John Smith
Approval Date: 10/10/2025
Target Closing: 10/30/2025

Prior to Document (PTD) Conditions (Must receive before initial CD sent):
✓ 1. Updated employment verification (verbal VOE within 10 days) - DUE: 10/20
✓ 2. Final bank statement showing gift deposit - DUE: 10/18
✓ 3. Repair completion certificate for appraisal items - DUE: 10/20

Prior to Funding (PTF) Conditions (Must receive before funding wire):
✓ 4. Signed Closing Disclosure (3-day wait) - DUE: Closing day
✓ 5. Final title update showing payoff liens released - DUE: 10/29
✓ 6. Proof of homeowner's insurance paid - DUE: Closing day
✓ 7. Clear OFAC on all parties to transaction - DUE: 10/29

Status: All conditions CLEARED as of 10/22/2025
Eligible for CTC: YES
```

### Step 2: Verify All Conditions Satisfied

For each condition:

1. Confirm document received and dated appropriately
2. Review document for accuracy and completeness
3. Upload to loan imaging system
4. Mark condition as "cleared" in LOS
5. Document who reviewed and date cleared

**Condition Tracking Example:**

```
Condition: #2 - Final bank statement showing gift deposit

Required: Updated Chase savings statement showing $8,000 gift received
Received: 10/18/2025
Document: Chase statement dated 10/15/2025

Review:
✓ Statement dated within 90 days (10/15/2025)
✓ Shows beginning balance: $4,400
✓ Shows deposit 10/10/2025: $8,000 (wire from parents)
✓ Shows ending balance: $12,400
✓ No overdrafts or NSF fees
✓ Matches gift letter amount ($8,000)
✓ Confirms donor transfer completed

Cleared By: Sarah Martinez
Cleared Date: 10/18/2025 3:15 PM
Status: CLEARED ✓
```

### Step 3: Complete CTC Quality Control Checklist

Use the 75-point master checklist (Sections 1-8 above):

1. Start at Section 1, proceed sequentially through Section 8
2. Mark each item as:
   - ✓ Compliant
   - ⚠ Needs Attention
   - ✗ Not Compliant (stops CTC)
3. For any ⚠ or ✗ items, document specific issue and resolution plan
4. Cannot issue CTC until all items are ✓ Compliant

**Checklist Status Report:**

```
CTC Quality Control Review
Loan: 2025-LA-04789
Reviewer: Emily Patterson, Closing Manager
Review Date: 10/22/2025

Section 1 (Borrower/Property): 10/10 ✓
Section 2 (Credit/Liabilities): 12/12 ✓
Section 3 (Income/Employment): 15/15 ✓
Section 4 (Appraisal/Property): 8/8 ✓
Section 5 (Title/Legal): 10/10 ✓
Section 6 (Insurance): 5/5 ✓
Section 7 (Closing Disclosure): 15/15 ✓
Section 8 (Funding): 10/10 ✓

TOTAL: 75/75 Points ✓

Issues Identified: NONE
CTC Status: APPROVED
```

### Step 4: Final Review and CTC Issuance

**Pre-CTC Sign-Off:**

1. Processor reviews file completeness
2. Closer reviews CD and closing documents
3. Closing Manager performs final QC review
4. All three sign off on CTC readiness

**Issue CTC in System:**

```
CLEAR TO CLOSE ISSUED

Loan Number: 2025-LA-04789
Borrower: John Michael Smith
Property: 123 Oak Street, Austin, TX 78701
Loan Amount: $403,500
Program: FHA 203(b)

CTC Issued By: Emily Patterson, Closing Manager
CTC Date/Time: 10/22/2025 @ 4:30 PM
Scheduled Closing: 10/30/2025 @ 2:00 PM

Status: CLEAR TO CLOSE ✓

All underwriting conditions satisfied
All quality control checks passed
TRID compliance verified
Funding approved

Actions:
→ Notify title company to schedule closing
→ Order funding wire for 10/30/2025
→ Prepare closing package for title
→ Send final CD to borrower (3-day wait satisfied as of 10/27)
→ Schedule final borrower contact on 10/29 to confirm

Notes:
- Conventional closing - no FHA endorsement required
- Closing Protection Letter received from First American
- Selling to Fannie Mae (commitment received)
- Wire to First American title for $405,300 (loan + prepaids)
```

### Step 5: Post-CTC Monitoring

**After CTC issued, monitor for changes:**

1. Daily credit monitoring for new debt
2. Employment re-verification before funding
3. Property insurance update (confirm still active)
4. Title update (confirm no new liens)
5. Market conditions (if rate lock expires, may need extension)

**CTC Rescind Triggers:**
If any of these occur, CTC must be rescinded immediately:

- New debt taken out by borrower
- Job loss or income reduction
- Credit score drops below minimum
- Property damage (fire, flood, etc.)
- Title issue discovered
- Insurance cancellation
- Borrower requests loan changes (amount, terms)

**Rescind Example:**

```
CTC RESCINDED

Loan: 2025-LA-04891
Original CTC Date: 10/15/2025
Rescind Date: 10/20/2025
Scheduled Closing: 10/25/2025

Reason for Rescind:
Final credit re-pull revealed borrower purchased new vehicle on 10/18/2025.
New auto loan: $35,000 at $587/month (72 months)

Impact:
Previous DTI: 31% / 43% (within guidelines)
New DTI: 31% / 51.8% (exceeds 50% manual UW maximum)

Action Required:
- Loan suspended, closing cancelled
- Borrower notified
- Options:
  1. Return vehicle, cancel loan (DTI returns to 43%)
  2. Increase income (provide updated docs)
  3. Pay down other debts to offset new payment
  4. Provide larger down payment to reduce housing payment

Status: CTC RESCINDED - Loan on hold pending resolution
```

---

## ⏱️ Rush Clear to Close (Same-Day/Next-Day Closings)

### When Rush CTC is Appropriate

- Rate lock expiring (documented rate lock extension not available)
- Seller possession needed urgently (lease-back expired, moving truck scheduled)
- Construction deadline (builder completion, weather concerns)
- Borrower relocation timeline (job start date, lease ending)

### Rush CTC Requirements

**Standard CTC Timeline:** 48 hours minimum
**Rush CTC Timeline:** 4-24 hours

**Additional Requirements for Rush:**

1. **VP or higher approval** - Rush CTC requires senior management sign-off
2. **Heightened QC** - Second reviewer must validate checklist
3. **Risk assessment** - Document business justification for rush
4. **Enhanced verification** - Real-time VOE, credit re-pull same day
5. **All-hands review** - Processor, Closer, Manager all review simultaneously

**Rush CTC Fee:** $500 (charged to borrower if discretionary rush, waived if lender delay)

**Rush CTC Documentation:**

```
RUSH CLEAR TO CLOSE REQUEST

Loan: 2025-LA-04803
Request Date: 10/22/2025 @ 11:00 AM
Requested Closing: 10/23/2025 @ 3:00 PM (27 hours from now)

Business Justification:
- Rate lock expires 10/23/2025 (extension denied by investor)
- Rate increase of 0.375% if lock expires (costs borrower $7,800 over life)
- All conditions satisfied as of 10/22 AM
- Borrower employed, verified this morning
- Credit re-pull this morning shows no changes
- Lender discretion: NO (investor lock expiration)

Rush Fee: $500 - WAIVED (lender discretion per VP)

Approval Chain:
1. Processor (Sarah Martinez): APPROVED - 10/22 @ 11:15 AM
2. Closer (Robert Taylor): APPROVED - 10/22 @ 11:45 AM
3. Closing Manager (Emily Patterson): APPROVED - 10/22 @ 12:30 PM
4. VP Operations (Jennifer Rodriguez): APPROVED - 10/22 @ 1:15 PM

CTC Issued: 10/22/2025 @ 1:30 PM
Closing Confirmed: 10/23/2025 @ 3:00 PM

Status: RUSH CTC APPROVED ✓
```

---

## 📊 Quality Control and Audit

### Pre-Funding QC Review (10% Random Sample)

**Performed by:** QC Department (independent from closing team)

**Sample Selection:**

- 10% random sample of all CTC loans daily
- 100% review of:
  - Loans >$726,200 (high balance/jumbo)
  - Manual underwrite loans
  - Rush CTC loans
  - Loans with prior QC defects

**QC Checklist (Abridged):**

- [ ] All 75-point CTC checklist items verified
- [ ] Conditions properly cleared with documentation
- [ ] DTI calculation accurate
- [ ] Income calculations correct
- [ ] Asset verification adequate
- [ ] Credit analysis appropriate
- [ ] TRID compliance verified
- [ ] Title review complete
- [ ] Insurance adequate

**QC Findings Categories:**

| Finding | Severity | Action |
|---------|----------|--------|
| **Level 1 - Critical** | Loan cannot fund | STOP funding, escalate to CCO, remediate immediately |
| **Level 2 - Significant** | Defect present but fundable | Remediate before shipping to investor, document in file |
| **Level 3 - Minor** | Technical deficiency | Remediate within 30 days, monitor for trends |
| **No Findings** | Clean file | Proceed to funding, no action needed |

**QC Report Example:**

```
PRE-FUNDING QC REVIEW

Loan: 2025-LA-04789
Reviewer: Linda Kim, QC Manager
Review Date: 10/23/2025
CTC Date: 10/22/2025
Scheduled Funding: 10/30/2025

Findings:

Level 3 - Minor:
- Final paystub dated 10/15/2025 (30 days before 11/14, prefer <30 days)
- Action: Obtain updated paystub before funding if closing after 11/14
- Resolution: Closing 10/30, within 30-day window, acceptable

Level 3 - Minor:
- Gift letter does not include donor phone number (not required but best practice)
- Action: Obtain phone number for file completeness
- Resolution: Phone number obtained 10/23, added to file

Critical/Significant Findings: NONE

Overall Rating: PASS with minor recommendations
Cleared for Funding: YES ✓
```

### Post-Closing QC Review (100% Sample)

**Performed:** Within 30 days of closing

**Reviews:**

- Final executed documents
- Funding accuracy (correct amount, timely)
- Closing package completeness
- Recording status (deed, mortgage recorded)
- Investor delivery timeline (if selling loan)

**Defect Tracking:**

- Categorize any defects found
- Root cause analysis
- Corrective action plan
- Staff retraining if needed

---

## 🚨 Troubleshooting

### Issue: Condition Cannot Be Satisfied

**Scenario:** Borrower cannot provide required verification (employer won't verify employment, bank won't provide statement, etc.)

**Resolution:**

1. Attempt alternative documentation:
   - VOE: Use paystub + W-2 + IRS 4506-C tax transcript
   - Bank statement: Use online banking screenshot + bank letter
   - Insurance: Contact agent directly for binder
2. If alternatives not acceptable per investor, options:
   - Change investors (different overlays)
   - Change loan programs (FHA to conventional, vice versa)
   - Delay closing to obtain required docs
3. Last resort: Deny/cancel loan if truly cannot satisfy

### Issue: Credit Score Drops Below Minimum

**Scenario:** Final credit re-pull shows score dropped from 685 to 575 (below 580 FHA minimum)

**Resolution:**

1. Pull full credit report to identify cause:
   - New late payments
   - New collections
   - Account closed (reduced available credit, increased utilization)
   - Identity theft / fraud
2. Determine if correctable:
   - Dispute errors with bureaus (rapid rescore available, 3-7 days)
   - Pay down balances to reduce utilization
   - Remove authorized user accounts
3. If not correctable quickly:
   - Change loan programs (e.g., FHA to portfolio/non-QM if available)
   - Increase down payment (10% minimum for 500-579 scores)
   - Delay closing until credit restored

### Issue: Property Damage Before Closing

**Scenario:** Fire/flood/storm damage to property between appraisal and closing

**Resolution:**

1. Immediately inspect damage:
   - Get contractor estimates
   - Assess severity (cosmetic vs structural)
2. Options:
   - **Minor damage (<$5,000):** Repair before closing OR escrow funds (150% of estimate)
   - **Major damage:** Delay closing pending repairs, may require new appraisal
   - **Severe damage:** Borrower may cancel contract (inspection contingency)
3. Insurance coordination:
   - If under contract, determine if seller's insurance covers
   - If after closing, borrower's insurance covers
4. Re-appraise if structural damage
5. Update CD for any cost changes

### Issue: Title Problem Discovered Last Minute

**Scenario:** Title company finds unreleased lien, judgment, or ownership issue 48 hours before closing

**Resolution:**

1. Assess severity:
   - **Clearable:** Old mortgage payoff not released, judgment satisfied but not released
   - **Complex:** Estate issues, missing heirs, boundary disputes
2. For clearable issues:
   - Contact lien holder/court for expedited release
   - Use indemnity or title company guarantee to proceed
   - Escrow funds to cover if necessary
3. For complex issues:
   - Delay closing until resolved
   - Seller must cure title defect
   - Buyermay exercise contingency to cancel
4. Document extensively:
   - All communications with title company
   - Resolution timeline
   - Impact on closing date

### Issue: Final CD Changed After Initial Delivery

**Scenario:** Fee changes, loan amount adjusts, or interest rate changes after borrower received initial CD

**Resolution:**

1. Determine if change requires new 3-day wait:
   - **APR increases >0.125%:** YES, new 3-day wait required
   - **Loan amount increases:** YES, new 3-day wait
   - **Prepayment penalty added:** YES, new 3-day wait
   - **All other changes:** NO, but revised CD required
2. If new wait required:
   - Issue revised CD
   - Restart 3-business-day clock
   - Delay closing accordingly
   - Notify all parties (borrower, seller, agents, title)
3. If no wait required:
   - Issue revised CD at least 1 day before closing
   - Document reason for change (changed circumstances, etc.)
   - Ensure borrower receives before closing

---

## 📚 References and Related SOPs

### Internal SOPs

- {{include: sop-mf-002}} - Automated Underwriting System (AUS) Processing
- {{include: sop-mf-003}} - FHA Underwriting Standards
- {{include: sop-mf-005}} - Wire Transfer Security and Dual Approval
- {{include: sop-mf-008}} - Income Documentation and Verification
- {{include: sop-mf-009}} - Appraisal Review and Property Valuation
- {{include: sop-mf-010}} - TRID Compliance and Disclosure Timing

### External Resources

- **CFPB TRID Rule:** 12 CFR § 1026.19(e) and (f)
- **Fannie Mae Selling Guide:** Chapter B3 (Underwriting Borrowers)
- **Freddie Mac Seller Guide:** Chapter 5300 (Closing and Delivery)
- **FHA Handbook 4000.1:** Section II.A (Origination Through Post-Closing)

### Forms and Templates

- CTC Quality Control Checklist (75-point)
- Condition Tracking Worksheet
- Wire Authorization Form
- Final VOE Script
- QC Review Report Template

---

## 📝 Document Control

| Version | Date | Author | Changes | Approver |
|---------|------|--------|---------|----------|
| 5.1.2 | 2025-10-22 | Emily Patterson | Updated QC sampling to 10% (was 5%) per audit recommendation | Jennifer Rodriguez (VP) |
| 5.1.0 | 2025-08-01 | Emily Patterson | Added rush CTC procedures and approval requirements | Jennifer Rodriguez (VP) |
| 5.0.5 | 2025-05-15 | Emily Patterson | Enhanced TRID tolerance analysis section with examples | Jennifer Rodriguez (VP) |
| 5.0.0 | 2025-01-05 | Emily Patterson | Major revision: Implemented 75-point checklist (was 50-point) | Jennifer Rodriguez (VP) |

**Next Review Date:** November 22, 2025
**Review Frequency:** Monthly
**Responsible Party:** Emily Patterson, Closing Department Manager

---

**END OF SOP-MF-004**

*This SOP is a controlled document. For questions, contact closing@apexmortgage.com*

**Critical Reminder:** No loan shall proceed to closing without documented Clear to Close approval. CTC protects borrowers, investors, and our company from defective loans and regulatory violations.
