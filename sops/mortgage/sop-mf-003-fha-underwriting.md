---
id: sop-mf-003
title: FHA Underwriting Standards and Guidelines
version: 2.4.1
status: active
department: Underwriting
category: Underwriting
owner: Michael Chen
effective_date: 2025-09-15
last_reviewed: 2025-09-15
review_frequency: quarterly
approver: Michael Chen (Chief Underwriter)
criticality: high
compliance_frameworks:
  - FHA Handbook 4000.1 (SF Handbook)
  - HUD Mortgagee Letter Guidelines
  - Equal Credit Opportunity Act (ECOA)
  - Fair Housing Act (FHA)
  - Ability to Repay (ATR) Rule
dependencies:
  - sop-mf-002  # AUS Processing (for TOTAL Scorecard)
  - sop-mf-008  # Income Documentation Standards
  - sop-mf-009  # Appraisal Review Process
  - sop-mf-013  # Borrower Identity Verification
tags:
  - FHA
  - government-lending
  - underwriting
  - manual-underwriting
  - compensating-factors
---

# FHA Underwriting Standards and Guidelines

## 🎯 Overview

### Purpose

This SOP establishes comprehensive underwriting standards for Federal Housing Administration (FHA) insured mortgage loans. FHA loans provide flexible qualification standards with down payments as low as 3.5%, making homeownership accessible to first-time buyers and borrowers with limited savings or credit challenges. This SOP ensures compliant underwriting that balances borrower accessibility with sound risk management.

### Scope

**Applies to:**

- All FHA-insured forward mortgages (purchase and rate/term refinance)
- FHA 203(b) standard program
- FHA 203(k) rehabilitation loans
- FHA streamline refinances (limited scope)
- Manually underwritten FHA loans
- AUS-approved FHA loans requiring manual validation

**Does NOT apply to:**

- Reverse mortgages / HECM (see separate guidelines)
- FHA-to-FHA streamline refinances without appraisal (see SOP-MF-014)
- Construction-to-permanent loans (see SOP-MF-015)

### Key Statistics (2024 Performance)

- **Annual FHA Volume:** 892 loans ($184M)
- **Average Loan Amount:** $206,500
- **Average Credit Score:** 658
- **Average DTI:** 43.2%
- **Manual Underwrite Rate:** 18.4% (164 loans)
- **Approval Rate (Manual UW):** 73.2%
- **Default Rate:** 0.9% (below HUD threshold)
- **Turn Time:** Average 3.2 days from submission to decision

---

## 📋 Prerequisites

### Before Underwriting FHA Loan

#### Required Documentation (Per {{include: sop-mf-008}})

- [ ] Complete 1003 Uniform Residential Loan Application
- [ ] FHA case number assigned via FHA Connection
- [ ] Credit report (tri-merge, <120 days old, min 2 bureaus)
- [ ] Income documentation (2 years tax returns, 30 days paystubs, 2 months bank statements)
- [ ] Employment verification (VOE or paystub within 30 days of closing)
- [ ] Asset documentation (2-60 day statements, all pages)
- [ ] FHA-compliant appraisal with FHA case number
- [ ] Purchase contract (if purchase) or title commitment (if refinance)
- [ ] Borrower authorization forms (4506-C, credit, etc.)

#### System Requirements

- Access to FHA Connection for case management
- Access to TOTAL Scorecard (AUS)
- Access to CAIVRS (Credit Alert System)
- Current FHA 203(b) training certification
- FHA Handbook 4000.1 reference guide

#### Key Dates and Deadlines

- **Credit report expiration:** 120 days from date pulled
- **Appraisal expiration:** 120 days from effective date (150 days for new construction)
- **VOE/VOD expiration:** 120 days from date issued
- **Income documentation:** Most recent 2 years tax returns
- **FHA case number expiration:** 6 months if not endorsed

---

## 🔍 FHA Eligibility Requirements

### Borrower Eligibility

#### Credit Score Requirements

| Min Credit Score | Down Payment | Mortgage Insurance |
|------------------|--------------|-------------------|
| **580 or higher** | 3.5% minimum | Standard MIP (see below) |
| **500-579** | 10% minimum | Standard MIP |
| **Below 500** | NOT ELIGIBLE | N/A |

**Important Notes:**

- FHA does not use "credit score cutoffs" - entire credit profile evaluated
- Non-traditional credit acceptable if borrower has no credit score
- Derogatory credit events require waiting periods (see below)

#### Credit Event Waiting Periods

| Event | Waiting Period | Extenuating Circumstances Reduction |
|-------|---------------|-----------------------------------|
| **Bankruptcy Chapter 7** | 2 years from discharge | 1 year with documented hardship |
| **Bankruptcy Chapter 13** | 1 year of payments | Case-by-case evaluation |
| **Foreclosure** | 3 years from completion | None - strict 3-year requirement |
| **Deed-in-Lieu** | 3 years from transfer | None |
| **Short Sale** | 3 years from completion | None |
| **Loan Modification** | No waiting period | If performing as agreed |

**Extenuating Circumstances Criteria:**

- Loss of employment (beyond borrower control)
- Serious illness or death of wage earner
- Unexpected increase in debt (medical, disaster)
- Must show 12+ months re-established creditworthiness

**Example:**

```
Borrower: John Smith
Event: Chapter 7 Bankruptcy discharged 03/15/2023
Current Date: 09/15/2025 (30 months since discharge)
Waiting Period: 24 months (standard)
Eligible: YES (exceeds 24-month requirement)

Extenuating Circumstances: Job loss due to company closure (documented)
Reduction Available: Yes, 12-month waiting period applies
New Eligibility: 03/15/2024
Re-established Credit: 14 consecutive on-time payments on car loan
Manual Underwrite: Required to document extenuating circumstances
```

#### Debt-to-Income (DTI) Ratios

**Maximum DTI with AUS Approval:**

- **No limit** if TOTAL Scorecard returns "Accept"
- Common range: 31% front-end / 43% back-end
- DTI up to 56.9% acceptable with strong compensating factors

**Maximum DTI for Manual Underwrite:**

| Credit Score | Max Front-End DTI | Max Back-End DTI | Requirements |
|-------------|-------------------|------------------|-------------|
| **≥580** | 31% | 43% | Standard (no compensating factors needed) |
| **≥580** | 31% | 50% | Requires 1 compensating factor |
| **≥580** | 37% | 47% | Requires 1 compensating factor |
| **500-579** | 31% | 43% | Maximum (compensating factors do not allow higher) |

**DTI Calculation Formula:**

```
PITI = Principal + Interest + Taxes + Insurance + HOA + MIP
Monthly Housing Payment (Front-End) = PITI ÷ Gross Monthly Income
Total Monthly Obligations (Back-End) = (PITI + All Debts) ÷ Gross Monthly Income
```

**Debts Included in DTI:**

- All monthly housing payment (PITI + MIP + HOA)
- Installment debt (>10 months remaining)
- Revolving debt (min payment or 5% of balance, whichever higher)
- Alimony, child support, separate maintenance
- Other real estate (PITI + HOA)
- Student loans (actual payment or 0.5% of balance if $0 payment)

**Debts Excluded from DTI:**

- Installment debt with ≤10 months remaining
- Authorized user accounts (unless making payments)
- Business debts (if on credit but paid by business with 12+ month history)
- Disputed debts (if borrower provides evidence and creditor validates)

#### Residual Income (Manual Underwrite Only)

For manually underwritten loans, borrower must have sufficient residual income after all obligations:

| Family Size | Residual Income Requirement (Monthly) |
|-------------|--------------------------------------|
| 1-2 persons | $654 |
| 3-4 persons | $788 |
| 5+ persons | $921 |

**Calculation:**

```
Gross Monthly Income: $5,500
Less: Federal/State/Local taxes: -$1,100
Less: PITI + MIP: -$1,650
Less: All debt payments: -$780
Less: Job-related expenses: -$250
Residual Income: $1,720

Family Size: 3 persons
Required: $788/month
Actual: $1,720/month
Meets Requirement: YES ✓
```

### Property Eligibility

#### Eligible Property Types

- [ ] 1-unit principal residence
- [ ] 2-4 unit principal residence (owner-occupied)
- [ ] FHA-approved condominium projects
- [ ] Manufactured housing (on permanent foundation)
- [ ] New construction (builder warranty required)

#### Ineligible Property Types

- ❌ Investment properties (non-owner occupied)
- ❌ Vacation homes / second homes
- ❌ Co-ops (unless in approved pilot program)
- ❌ Properties with commercial use >25% of GLA
- ❌ Properties on >5 acres (unless typical for area)

#### Property Condition Requirements

Must meet **Minimum Property Standards (MPS)** and **Minimum Property Requirements (MPR)**:

**MPR Checklist:**

- [ ] Safe, sound, and secure (structurally sound)
- [ ] Protects health and safety of occupants
- [ ] Free of defective construction or conditions
- [ ] Free of lead-based paint hazards (pre-1978 properties)
- [ ] Adequate heating system (heat to 50°F minimum)
- [ ] Potable water supply
- [ ] Adequate sewage disposal system
- [ ] No environmental hazards (wells, septic, radon within limits)
- [ ] Vehicular access to public street

**Common MPR Deficiencies:**

- Peeling/flaking paint (pre-1978 homes)
- Missing/broken handrails
- GFCI outlets missing in wet areas
- Roof damage requiring repair
- Foundation cracks/settlement
- Non-functioning mechanical systems

**Resolution:** Appraiser notes deficiencies, underwriter requires repair completion before closing (or holdback escrow for minor items <$5,000).

---

## 🔄 Underwriting Process Flow

### Step 1: Receive Loan File from Processing

#### Initial File Review

- [ ] FHA case number assigned and active
- [ ] CAIVRS clearance obtained (no federal debt delinquencies)
- [ ] All required documents present and current
- [ ] AUS (TOTAL Scorecard) run with findings
- [ ] Appraisal complete with FHA case number

#### Determine Underwriting Path

**Path A: AUS Accept/Eligible**

- TOTAL Scorecard returned "Accept/Eligible"
- Proceed with streamlined AUS underwriting
- Validate key findings, minimal compensating factors needed
- Typical turn time: 1-2 days

**Path B: AUS Refer**

- TOTAL Scorecard returned "Refer" (unable to approve via AUS)
- Proceed to manual underwriting
- Full documentation and analysis required
- Compensating factors required if DTI >43%
- Typical turn time: 3-5 days

**Path C: AUS Refer with Correctable Issues**

- TOTAL returned "Refer" due to data errors or missing info
- Correct errors and resubmit to AUS
- Common: income miscoded, debts omitted, wrong property type
- Typical turn time: 1 day to correct + resubmit

### Step 2: Run TOTAL Scorecard (if not already run)

**Access:** FHA Connection → TOTAL Scorecard

**Required Data Fields:**

- Borrower information (SSN, DOB, current address)
- Employment and income details
- Assets (down payment + reserves)
- Liabilities (all credit tradelines)
- Property information (address, value, type)
- Loan terms (amount, rate, term, LTV)

**Interpreting TOTAL Findings:**

| Finding | Meaning | Action |
|---------|---------|--------|
| **Accept/Eligible** | Loan approved via AUS, eligible for FHA insurance | Streamlined underwriting, validate findings |
| **Accept/Ineligible** | Borrower approved but loan doesn't meet FHA requirements | Review ineligibility reason, correct or manual underwrite |
| **Refer/Eligible** | AUS unable to approve, but meets FHA standards | Manual underwriting required |
| **Refer/Ineligible** | Neither AUS approved nor FHA compliant | Correct issues or deny |
| **Out of Scope** | Loan type not eligible for FHA | Stop processing, convert to conventional or deny |

**Common "Refer" Reasons:**

- DTI >56.9% (exceeds AUS max)
- Credit score <580 (manual underwrite required)
- Insufficient credit history (thin file)
- Recent derogatory credit events
- High LTV with limited reserves
- Self-employed with complex income

**TOTAL Feedback Certificate:**
Print and save TOTAL findings to loan file. This is required for quality control and audit.

---

### Step 3: Credit Analysis

#### Pull and Review Credit Report

**Requirements:**

- Tri-merge credit report from approved vendor
- All 3 bureaus (Equifax, Experian, TransUnion)
- Residential Mortgage Credit Report (RMCR) format
- <120 days old at time of note date

**Representative Credit Score:**
Use **middle score** of borrower (or lowest middle score if multiple borrowers):

**Example (Single Borrower):**

```
Equifax: 642
Experian: 658
TransUnion: 651
Representative Score: 651 (middle of three)
```

**Example (Multiple Borrowers):**

```
Borrower 1:          Borrower 2:
Equifax: 680         Equifax: 620
Experian: 692        Experian: 640
TransUnion: 675      TransUnion: 635

Borrower 1 Middle: 680
Borrower 2 Middle: 635
Representative Score: 635 (lowest middle score - used for pricing)
```

#### Analyze Credit History

**Review for:**

- Payment history (last 12-24 months)
- Outstanding balances on revolving accounts
- Derogatory events (lates, collections, chargeoffs, judgments)
- Recent inquiries (multiple inquiries may indicate distress)
- Credit mix (installment + revolving)

**Acceptable Payment History:**

| Credit Profile | Requirement |
|---------------|-------------|
| **Excellent** (720+) | Few to no derogatory items, consistent on-time payments |
| **Good** (660-719) | Minimal derogatory items, generally on-time payments |
| **Fair** (620-659) | Some derogatory items acceptable with explanations |
| **Subprime** (580-619) | Multiple derogatory items acceptable if re-established credit |
| **Deep Subprime** (500-579) | Significant derogatories acceptable, but must show 12+ months re-establishment |

**Derogatory Credit Events - Analysis:**

**Late Payments:**

- Isolated 30-day late: Generally acceptable with explanation
- Pattern of 30-day lates: Requires explanation, shows payment behavior
- 60-day late within 12 months: Red flag, requires strong explanation
- 90+ day late within 12 months: Requires explanation + compensating factors

**Collections/Chargeoffs:**

- Medical collections: Disregard (per FHA policy update)
- Non-medical collections <$2,000 aggregate: Disregard
- Non-medical collections ≥$2,000: Must pay off or set up payment plan
- Disputed collections: Obtain letter from creditor validating dispute

**Judgments/Tax Liens:**

- Outstanding judgments: Must be paid off before closing OR payment plan with 3+ months history
- Federal tax liens: Must have IRS payment plan with 3+ months on-time payments
- State/local tax liens: Case-by-case, prefer paid off

**Example Credit Analysis:**

```
Borrower: Sarah Johnson
Credit Score: 658 (Equifax), 671 (Experian), 663 (TransUnion)
Representative Score: 663 (middle)

Payment History (24 months):
- Mortgage: Current (if applicable)
- Auto Loan: 1x 30-day late (8 months ago)
- Credit Cards: Current
- Student Loans: Current

Collections:
- Medical: $847 (Hospital XYZ) - DISREGARDED per FHA
- Utility: $234 (Electric company) - Below $2K threshold, DISREGARDED

Tradelines:
- 3 revolving accounts (total limit $12,500, util 35%)
- 2 installment accounts (auto $18K, student $42K)
- No mortgage history (first-time buyer)

Assessment: ACCEPTABLE
- Score meets 3.5% down requirement (≥580)
- Payment history shows responsible behavior
- 1x 30-day late explained (medical emergency, since resolved)
- No collections requiring payoff
- Recommend approval with AUS Accept or manual underwrite
```

#### Non-Traditional Credit (No Score)

If borrower has **no credit score** or **insufficient tradelines** for score:

**Requirement:** Minimum 3 tradelines with 12+ month history

**Acceptable Tradelines:**

- Rental history (verified with landlord, 12+ months)
- Utility payments (phone, electric, water, gas)
- Insurance payments (car, renters, life)
- Childcare payments
- School tuition payments
- Medical payments

**Documentation:**

- 12-month history of payments
- Cancelled checks, bank statements, or letters from payees
- Must show consistent on-time payments (no 30+ day lates)

**Example Non-Traditional Credit File:**

```
Borrower: Maria Gonzalez (Recent immigrant, no US credit)

Tradeline 1: Rent
- $1,200/month to ABC Apartments
- 18 months history via cancelled checks
- 0 late payments

Tradeline 2: Electric Utility
- $85/month average to City Electric
- 24 months history via bank statements
- 0 late payments

Tradeline 3: Car Insurance
- $147/month to State Farm
- 14 months history via policy statements
- 0 late payments

Assessment: ACCEPTABLE - Meets 3-tradeline requirement
- All tradelines 12+ months
- Perfect payment history
- Demonstrates financial responsibility
- Recommend manual underwrite approval
```

---

### Step 4: Income Analysis (Per {{include: sop-mf-008}})

#### Employment and Income Verification

**Standard Employment (W-2 Wage Earner):**

**Required Documentation:**

- Most recent 30 days paystubs showing YTD earnings
- W-2s for most recent 2 years
- Written VOE or verbal VOE with paystub within 30 days of closing
- Federal tax returns (1040) for most recent 2 years

**Stability Requirement:**

- 2+ years in same line of work (not necessarily same employer)
- Job changes acceptable if in same field or advancement
- Recent job change (<6 months) requires explanation

**Income Calculation:**

```
Example: Salary Employee

Current Paystub (10/31/2025):
- Gross Pay YTD: $52,400
- Gross Pay This Period: $4,000 (bi-weekly)

Annual Salary: $4,000 × 26 pay periods = $104,000
Monthly Income: $104,000 ÷ 12 = $8,666.67

2024 W-2: $98,500
2023 W-2: $94,200

Stability: ✓ Increasing trend
Qualifying Income: $8,666.67/month
```

**Hourly/Variable Income:**

If borrower has **overtime, bonus, commission, or variable hours:**

**Requirement:** 2-year history with likelihood of continuance

**Calculation:**

- Average last 2 years
- If declining trend, use lower amount or exclude
- If increasing trend, document reason and likelihood to continue

**Example:**

```
Hourly Employee with Overtime:

2024 Earnings:
- Base: $45,000 ($21.63/hour × 40 hours × 52 weeks)
- Overtime: $8,500
- Total: $53,500

2023 Earnings:
- Base: $43,500
- Overtime: $7,200
- Total: $50,700

Analysis:
- Base pay increasing (acceptable, stable)
- Overtime variable but consistent (2-year history)
- Employer confirms overtime available and expected to continue

Calculation:
- Base: $45,000 ÷ 12 = $3,750/month ✓ STABLE
- Overtime Average: ($8,500 + $7,200) ÷ 2 = $7,850/year = $654/month
- Total Qualifying Income: $3,750 + $654 = $4,404/month
```

**Self-Employed Income:**

**Requirements:**

- 2 years tax returns (1040 + business returns)
- YTD profit & loss statement
- Business license (if required)
- CPA letter or tax transcripts from IRS

**Calculation:**
Use **business cash flow analysis** - add back non-cash expenses:

```
Per Tax Return (Schedule C or Partnership K-1):

Net Income (Line 31):           $65,000
Add: Depreciation:              +$12,000
Add: Depletion:                 +$0
Add: Amortization:              +$1,500
Less: Recurring capital expenses: -$3,000
Adjusted Net Income:            $75,500

Divide by 12 months:            $6,291.67/month

2-Year Average:
- 2024: $75,500 ÷ 12 = $6,291.67
- 2023: $68,200 ÷ 12 = $5,683.33
- Average: ($6,291.67 + $5,683.33) ÷ 2 = $5,987.50/month

Trend: Increasing ✓
Qualifying Income: $5,987.50/month
```

**Special Income Types:**

| Income Source | Documentation | Treatment |
|--------------|---------------|-----------|
| **Social Security** | Award letter or 1099-SSA | Use gross amount, continuing income |
| **Pension/Retirement** | Award letter, statements | Use net amount after taxes |
| **Disability** | Award letter, proof of continuance 3+ years | Acceptable if continuing 3+ years |
| **Alimony/Child Support** | Divorce decree, 6 months receipts | Acceptable if 3+ years continuance |
| **Rental Income** | Lease agreement, tax Schedule E | 75% of gross rent (25% vacancy/maintenance) |
| **VA Benefits** | Award letter | Full amount if non-taxable |
| **Unemployment** | Not acceptable | Cannot use, not stable |
| **Public Assistance** | Award letter | Acceptable if continuing 3+ years |

---

### Step 5: Asset Verification and Funds to Close

#### Acceptable Source of Funds

**Acceptable Assets:**

- Checking/savings accounts (2-month statements)
- Retirement accounts (401k, IRA, etc.) - with vesting/penalty considered
- Stocks, bonds, mutual funds (recent statement)
- Proceeds from sale of property (HUD-1 or closing disclosure)
- Gift funds (see gift requirements below)
- Employer assistance programs (documented)

**Unacceptable Assets:**

- Cash on hand (undocumented)
- Unsecured borrowed funds (personal loans)
- Credit card cash advances
- Assets from prohibited source (seller, real estate agent, etc.)

#### Gift Funds

**FHA allows 100% of down payment and closing costs from gift funds**

**Requirements:**

- [ ] Gift letter signed by donor (FHA model form)
- [ ] Evidence of donor's ability to give (bank statement showing funds)
- [ ] Evidence of transfer to borrower (wire confirmation, cancelled check)
- [ ] If cash gift, must be deposited and seasoned 60+ days

**Acceptable Donors:**

- Family member (related by blood, marriage, adoption, legal guardianship)
- Employer or labor union
- Charitable organization
- Government agency or public entity

**Unacceptable Donors:**

- Seller or anyone with financial interest in sale
- Real estate agent or broker
- Builder or developer
- Lender or mortgage broker

**Gift Letter Template:**

```
GIFT LETTER

I/We, [Donor Name], hereby certify that I/we have made a gift of
$[Amount] to [Borrower Name], my/our [Relationship], to be applied
toward the purchase of property located at [Address].

This is a bona fide GIFT and there is no obligation, expressed or implied,
to repay this sum in cash or by future services.

No repayment is expected or implied in the form of services, cash repayment,
or as a lien against the subject property.

Donor Information:
Name: ________________
Address: ________________
Phone: ________________
Relationship to Borrower: ________________

Source of Gift Funds:
□ Checking Account at [Bank Name], Account ****[last 4]
□ Savings Account at [Bank Name], Account ****[last 4]
□ Sale of asset (describe): ________________

Donor Signature: ________________  Date: ______
Borrower Signature: ________________  Date: ______
```

#### Reserve Requirements

**FHA does NOT have minimum reserve requirements**

However, reserves strengthen the file and provide compensating factors:

**Reserve Calculation:**

```
Monthly PITI + MIP + HOA = Housing Payment
Reserves = Liquid Assets ÷ Housing Payment

Example:
Housing Payment: $1,650/month
Liquid Assets after closing: $9,900
Reserves: $9,900 ÷ $1,650 = 6 months

Compensating Factor: YES (6 months reserves)
```

#### Large Deposits

Any **single deposit >50% of total monthly income** requires source documentation:

**Acceptable Sources:**

- Payroll deposit (paystub matches)
- Tax refund (copy of refund check/1040)
- Transfer from known account (statement showing withdrawal)
- Gift (gift letter)
- Sale of asset (bill of sale, previous ownership docs)

**Unacceptable Explanations:**

- "Savings" (must show where saved from)
- "Sold item" (without documentation)
- "Borrowed from friend" (unsecured loan not allowed for down payment)

**Example:**

```
Bank Statement: September 2025
Regular Deposits: $3,800 (paystub), $3,800 (paystub)
Large Deposit: $8,500 (September 15)

Borrower Monthly Income: $7,600
Threshold for Documentation: $3,800 (50% of income)
Requires Documentation: YES ($8,500 > $3,800)

Documentation Provided:
- IRS tax refund check image for $8,500
- Copy of 2024 tax return showing refund amount

Acceptable: YES ✓
```

---

### Step 6: Mortgage Insurance Premium (MIP) Calculation

FHA requires **both** upfront and annual mortgage insurance:

#### Upfront Mortgage Insurance Premium (UFMIP)

**Current Rate: 1.75% of base loan amount**

Can be:

- Paid in cash at closing, OR
- Financed into loan amount (most common)

**Calculation:**

```
Base Loan Amount: $200,000
UFMIP: $200,000 × 1.75% = $3,500

If Financed:
Total Loan Amount: $200,000 + $3,500 = $203,500

Max LTV check:
- Purchase Price: $210,000
- Max LTV: 96.5%
- Max Loan: $210,000 × 96.5% = $202,650
- Our Loan: $203,500
- Exceeds Max: YES - Buyer must bring extra $850 cash to closing
```

#### Annual Mortgage Insurance Premium (Annual MIP)

**Rates vary by:**

- Base loan amount
- LTV ratio
- Loan term

**Current Annual MIP Rates (2025):**

| Loan Amount | LTV ≤90% | LTV 90.01-95% | LTV >95% |
|-------------|----------|---------------|----------|
| **≤$726,200** (15-year) | 0.45% | 0.70% | 0.70% |
| **≤$726,200** (30-year) | 0.55% | 0.80% | 0.80% |
| **>$726,200** (15-year) | 0.70% | 0.95% | 0.95% |
| **>$726,200** (30-year) | 0.80% | 1.05% | 1.05% |

**Monthly Payment Calculation:**

```
Loan Amount: $203,500 (includes UFMIP)
LTV: 96.5% (>95%)
Term: 30 years
Annual MIP Rate: 0.80%

Annual MIP: $203,500 × 0.80% = $1,628.00
Monthly MIP: $1,628.00 ÷ 12 = $135.67

Included in PITI+MIP payment for DTI calculation
```

#### MIP Cancellation

**FHA loans originated after June 3, 2013:**

- **LTV ≤90% at origination:** MIP cancels after 11 years
- **LTV >90% at origination:** MIP for life of loan (never cancels)

This is a key disclosure to borrower - MIP does not automatically cancel at 78% LTV like conventional PMI.

---

### Step 7: Property and Appraisal Review (Per {{include: sop-mf-009}})

#### FHA Appraisal Requirements

**Must be:**

- [ ] Completed by FHA-approved appraiser on FHA Roster
- [ ] URAR form (Fannie Mae 1004) with FHA addendum
- [ ] Contains FHA case number
- [ ] Effective date <120 days old (150 for new construction)
- [ ] Meets Minimum Property Requirements (MPR)

#### Review Appraisal for

**Value:**

- Appraised value supports loan amount
- Value is reasonable compared to sales price
- Comparable sales are recent and similar

**Property Condition:**

- No MPR deficiencies noted
- All deficiencies require repair/correction
- Appraiser noted "subject to" conditions

**Health and Safety:**

- No peeling paint (pre-1978 homes)
- No structural damage
- All systems functional
- No environmental hazards

**Required Repairs:**

If appraiser notes deficiencies:

1. **Required Repairs:** Must be completed before closing
2. **Completion Certificate:** Appraiser or inspector confirms completion
3. **Escrow for Repairs:** Allowed for minor items <$5,000

**Common Required Repairs:**

- Handrail installation/repair
- GFCI outlets in wet areas
- Peeling/flaking paint remediation
- Roof repair/replacement
- Foundation crack repair
- Broken windows/doors

---

### Step 8: Manual Underwriting Decision (if AUS Refer)

If TOTAL Scorecard returned "Refer," full manual underwriting analysis required:

#### Four Key Areas of Analysis

**1. Credit:**

- Credit score ≥580 (or 500-579 with 10% down)
- Acceptable payment history
- Derogatory events explained with extenuating circumstances
- 12+ months re-established credit after major event

**2. Capacity (Income/DTI):**

- Stable income with 2+ year history
- Income sufficient for debt obligations
- DTI within limits (31%/43% or with compensating factors)
- Residual income meets minimum threshold

**3. Collateral (Property):**

- Appraised value supports loan
- Property meets MPR standards
- No title issues or liens
- Marketable property in stable area

**4. Capital (Assets):**

- Sufficient funds for down payment + closing costs
- Source of funds documented
- Reserves (if any) add strength to file

#### Compensating Factors

If DTI exceeds 31%/43%, **minimum ONE compensating factor required:**

**Acceptable Compensating Factors:**

- [ ] Excellent credit history (no derogatory items, 720+ score)
- [ ] Conservative use of consumer credit (low balances, low utilization)
- [ ] Minimal increase in housing payment (new payment ≤current rent/payment)
- [ ] Significant liquid reserves (≥3 months PITI)
- [ ] Minimal consumer debt (few obligations)
- [ ] Strong employment history (5+ years same employer)
- [ ] High residual income (2x required amount)
- [ ] Additional income not used in qualifying (part-time, bonuses)
- [ ] Down payment >10% (10%+ equity position)

**Example Manual Underwrite:**

```
Borrower: Michael Johnson
Credit Score: 658
DTI: 31% front / 48% back (exceeds 43% limit)
Employment: 7 years same employer (manufacturing supervisor)
Income: $6,200/month (stable, documented)

Analysis:
- Credit: Acceptable (658, minor derogatories explained)
- Capacity: DTI 48% requires compensating factor
- Collateral: Property appraises, meets MPR
- Capital: 5% down payment + 6 months reserves

Compensating Factors:
✓ Strong employment (7 years, stable industry)
✓ Significant reserves (6 months PITI in savings)
✓ Minimal housing payment increase (current rent $1,400, new payment $1,500)

Decision: APPROVED with compensating factors
- DTI 48% acceptable with 3 compensating factors
- Residual income $1,890 (exceeds $788 requirement)
- Recommend approval
```

#### Manual Underwriting Decision Matrix

| Credit Score | Max DTI | Compensating Factors Required | Residual Income |
|-------------|---------|------------------------------|-----------------|
| **580+** | 31%/43% | None | Standard |
| **580+** | 31%/50% | 1+ factors | Standard |
| **580+** | 37%/47% | 1+ factors | Standard |
| **500-579** | 31%/43% | Maximum, factors do not allow higher | Standard |

---

### Step 9: Underwriting Decision and Communication

#### Decision Options

**Approval:**

```
APPROVAL LETTER

Date: September 15, 2025
Borrower: Michael Johnson
Property: 456 Elm Street, Austin, TX 78701
Loan Amount: $203,500
Program: FHA 203(b)

This loan has been APPROVED subject to the following conditions:

Prior to Document (PTD) Conditions:
1. Provide final paystub dated within 10 days of closing
2. Provide updated bank statement showing down payment funds
3. Receipt for homeowner's insurance paid 1 year in advance

Prior to Funding (PTF) Conditions:
1. Signed closing disclosure (must wait 3 days after delivery)
2. Final walkthrough completed, property in acceptable condition
3. Clear title, no liens other than approved mortgage
4. Borrower verification of employment (day of/before closing)

Approved by: Michael Chen, FHA Underwriter
Date: 09/15/2025
File#: FHA-2025-892
TOTAL Scorecard Reference: N/A (Manual Underwrite)
```

**Suspension (More Info Needed):**

```
LOAN SUSPENDED - Additional Information Required

Borrower: Sarah Williams
Loan Number: FHA-2025-893

The following items are required to continue underwriting:

1. Explanation letter for 30-day late payment on auto loan (June 2025)
   - Provide written explanation of circumstances
   - Provide evidence issue resolved (current statement showing 0x30 since June)

2. Verification of Deposit for Chase savings account
   - Account ending ****5678 shows balance $15,200
   - Provide VOD or 2nd month statement to verify funds seasoned

3. Gift letter from parents
   - Current letter does not specify gift amount
   - Use FHA model gift letter, specify $12,000 gift amount
   - Include donor bank statement showing $12,000 available

Please submit requested items within 10 business days.

Underwriter: Michael Chen
Date: 09/15/2025
```

**Denial:**

```
ADVERSE ACTION NOTICE

Date: September 15, 2025
Borrower: Robert Martinez
Loan Number: FHA-2025-894

Your loan application has been DENIED for the following reasons:

Primary Reason:
☒ Debt-to-income ratio excessive (54% back-end, exceeds 50% max for credit score 589)

Contributing Reasons:
☒ Insufficient compensating factors (0 factors present, minimum 1 required)
☒ Foreclosure within 3 years (foreclosure completed 04/2023, 29 months ago)

You have the right to:
- Request specific reasons for denial within 60 days
- Obtain free copy of credit report used in decision
- Submit additional information for reconsideration

Contact: Michael Chen, Underwriter
Phone: (555) 123-4501
Email: underwriting@apexmortgage.com

This is an Adverse Action Notice pursuant to the Equal Credit Opportunity Act.
```

---

## ✅ Quality Control Checks

**Pre-Decision QC:**

- [ ] All 4 Cs analyzed (Credit, Capacity, Collateral, Capital)
- [ ] Income calculations verified and documented
- [ ] DTI calculated correctly (housing + all debts)
- [ ] Credit score determination correct (middle score method)
- [ ] CAIVRS clear (no federal debt)
- [ ] FHA case number active and matches loan
- [ ] Appraisal meets MPR, no unresolved conditions
- [ ] Compensating factors documented if DTI >43%
- [ ] Gift funds properly documented with letter + transfer
- [ ] Reserves calculated (if applicable)

**Post-Decision QC:**

- [ ] Approval conditions clear and specific
- [ ] Conditions can reasonably be satisfied
- [ ] Denial reasons comply with ECOA (specific, not discriminatory)
- [ ] All calculations documented in file
- [ ] Manual underwrite worksheet completed (if applicable)
- [ ] TOTAL findings saved to file
- [ ] Underwriter sign-off and date on decision letter

---

## 🚨 Troubleshooting

### Issue: Borrower has No Credit Score (Non-Traditional Credit)

**Resolution:**

1. Explain to borrower that FHA allows non-traditional credit
2. Obtain 12-month payment history for minimum 3 tradelines:
   - Rent (landlord verification or cancelled checks)
   - Utilities (12 months statements)
   - Insurance, childcare, medical, or other recurring payments
3. Document each tradeline:
   - Payee name and address
   - Amount and frequency of payment
   - 12-month payment history
   - Method of payment verification
4. Analyze payment history for consistent on-time payments
5. Manual underwrite required (no AUS approval possible)

### Issue: DTI Exceeds 43% (Manual Underwrite)

**Resolution:**

1. Verify DTI calculation is correct:
   - Include ALL debts with >10 months remaining
   - Include student loans (even if deferred, use 0.5% of balance)
   - Include alimony/child support
2. Check if any debts can be excluded:
   - Debts ≤10 months remaining
   - Authorized user accounts (if not paying)
   - Disputed debts (if validated by creditor)
3. Identify compensating factors (need minimum 1):
   - Reserves ≥3 months PITI
   - Excellent credit (720+, no derogatories)
   - Minimal housing payment increase
   - Strong employment history (5+ years)
4. If DTI >50%:
   - Maximum 50% with compensating factors and credit score ≥580
   - If >50%, borrower must pay down debts to reduce DTI
5. Calculate residual income - must meet minimum threshold
6. Document analysis and decision thoroughly

### Issue: Recent Bankruptcy or Foreclosure

**Resolution:**

1. Determine type of event and completion date:
   - Chapter 7 Bankruptcy: 2 years from discharge (1 year with extenuating circumstances)
   - Chapter 13 Bankruptcy: 1 year of payment plan
   - Foreclosure: 3 years from completion (no reduction)
2. If within waiting period:
   - Explain waiting period to borrower
   - Deny application with explanation
   - Suggest reapplying after waiting period expires
3. If meets waiting period:
   - Obtain discharge papers or foreclosure completion documents
   - Verify 12+ months re-established credit
   - Check for extenuating circumstances (if claiming 1-year Chapter 7)
   - Document in file
4. Extenuating circumstances for 1-year Chapter 7:
   - Job loss beyond borrower control
   - Death of wage earner
   - Serious illness with medical bills
   - Divorce (with supporting documentation)
5. Re-established credit requirement:
   - 12+ consecutive months of on-time payments
   - All current obligations paid as agreed
   - No new derogatories since bankruptcy/foreclosure

### Issue: Appraisal Shows Required Repairs

**Resolution:**

1. Review appraiser's requirements - categorize:
   - **Health & Safety:** Must be completed before closing
   - **Minor Repairs:** May escrow if <$5,000
   - **Cosmetic:** Generally not required
2. Obtain repair estimates from licensed contractors
3. Determine repair completion method:
   - **Option A:** Complete before closing
     - Contractor completes repairs
     - Appraiser or inspector provides completion certificate
     - Loan can close
   - **Option B:** Escrow for repairs (minor only)
     - Holdback 150% of repair cost in escrow
     - Repairs completed within 90 days of closing
     - Inspector confirms completion before releasing escrow
4. Update closing disclosure for any escrow amounts
5. Provide appraiser completion certificate to closing before funding

### Issue: Large Undocumented Deposit

**Resolution:**

1. Identify all deposits >50% of monthly income
2. Request explanation and documentation from borrower
3. Acceptable documentation:
   - Paystub (if payroll deposit)
   - Tax refund (IRS refund notice)
   - Transfer from known account (statement showing both sides)
   - Gift (gift letter + donor statement)
   - Sale of asset (bill of sale + proof of ownership)
4. If borrower cannot document:
   - Deduct amount from available assets
   - Recalculate reserves
   - Ensure remaining assets cover down payment + closing costs
5. If remaining assets insufficient:
   - Suspend loan pending documentation
   - Explain to borrower: undocumented deposits cannot be used
   - Options: wait 60 days for seasoning, or obtain gift with proper documentation

---

## 📚 References and Resources

### FHA Guidelines

- **FHA Handbook 4000.1** - Single Family Housing Policy Handbook (primary reference)
- **HUD Mortgagee Letters** - Policy updates and clarifications
- **FHA Connection** - Case management and TOTAL Scorecard access
- **HUD-FHA INFO** - 1-800-CALL-FHA for technical support

### Related SOPs

- {{include: sop-mf-002}} - Automated Underwriting System (AUS) Processing
- {{include: sop-mf-008}} - Income Documentation and Verification Standards
- {{include: sop-mf-009}} - Appraisal Review and Property Valuation
- {{include: sop-mf-013}} - Borrower Identity Verification

### Training and Certification

- **Required Training:** FHA 203(b) Underwriting Basics (8 hours)
- **Annual Refresher:** FHA Policy Updates (4 hours)
- **Certification:** FHA DE Underwriter (for Direct Endorsement authority)

### Forms and Worksheets

- Form HUD-92900-A: HUD/VA Addendum to Uniform Residential Appraisal Report
- Form HUD-92800.5B: Conditional Commitment Direct Endorsement
- Manual Underwriting Worksheet (internal form)
- Non-Traditional Credit Worksheet (internal form)

---

## 📝 Document Control

| Version | Date | Author | Changes | Approver |
|---------|------|--------|---------|----------|
| 2.4.1 | 2025-09-15 | Michael Chen | Updated MIP rates per FHA ML 2025-08 | Michael Chen (Chief Underwriter) |
| 2.4.0 | 2025-06-01 | Michael Chen | Added non-traditional credit procedures and examples | Michael Chen |
| 2.3.5 | 2025-03-15 | Michael Chen | Updated DTI compensating factors and residual income thresholds | Michael Chen |
| 2.3.0 | 2025-01-10 | Michael Chen | Major update: Revised for FHA Handbook 4000.1 SF changes | Michael Chen |

**Next Review Date:** December 15, 2025
**Review Frequency:** Quarterly (or upon HUD policy changes)
**Responsible Party:** Michael Chen, Chief Underwriter

---

**END OF SOP-MF-003**

*This SOP is a controlled document. For questions or feedback, contact underwriting@apexmortgage.com*
