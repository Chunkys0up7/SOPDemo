---
id: sop-mf-008
type: sop
version: 2.1.0
title: Income Documentation and Verification Standards
department: Mortgage Lending - Underwriting
audience: [Loan Processors, Underwriters, Quality Control]
complexity: medium
estimatedTime: 45 minutes per file review
effectiveDate: 2024-01-15
lastReviewed: 2025-10-15
nextReview: 2026-04-15
owner: Chief Underwriter
approver: VP of Mortgage Operations
compliance: [FNMA, FHLMC, FHA, VA, RESPA, TILA, ATR/QM]
dependencies:
  - sop-mf-002  # AUS Processing
  - sop-mf-003  # FHA Underwriting
  - sop-mf-004  # Clear to Close
tags:
  - income-verification
  - documentation-standards
  - underwriting
  - compliance
  - quality-control
status: draft
---

# Income Documentation and Verification Standards

## Purpose

This SOP establishes standardized procedures for documenting and verifying borrower income to ensure regulatory compliance, investor guideline adherence, and loan quality across all mortgage products.

## Scope

Applies to all mortgage loan applications including conventional, FHA, VA, and USDA loans. Covers employed, self-employed, and non-traditional income sources.

## Regulatory Framework

### Primary Regulations
- **ATR/QM Rule** (Ability-to-Repay/Qualified Mortgage): 12 CFR § 1026.43
- **FNMA Selling Guide**: Chapter B3-3 (Income Assessment)
- **FHLMC Selling Guide**: Chapter 5302 (Income Documentation)
- **FHA Handbook 4000.1**: Section II.A.4.a (Wage Earner Income)
- **VA Lender's Handbook**: Chapter 4 (Income Analysis)

### Key Compliance Requirements
- Income must be **stable, predictable, and likely to continue**
- Minimum 2-year history for most income types
- 3-year average for variable income
- Documentation must be current (not older than 120 days at closing)

## Income Types and Documentation Requirements

### 1. W-2 Wage Earner Income (Salaried/Hourly)

#### Required Documentation
- [ ] **Paystubs**: Most recent 30 days (minimum 1 month)
- [ ] **W-2 Forms**: Most recent 2 years
- [ ] **Tax Returns**: Most recent 2 years (if claiming additional income)
- [ ] **Verification of Employment (VOE)**: Verbal or written, within 10 days of closing
- [ ] **Year-to-Date Paystub**: To verify current employment status

#### Verification Steps

**Step 1: Review Paystubs**
```
✓ Employer name matches loan application
✓ YTD income consistent with prior year W-2
✓ No unexplained gaps in pay periods
✓ Verify hourly rate or salary matches stated income
✓ Check for bonuses, overtime, commissions (see variable income)
```

**Step 2: Calculate Base Income**
```
If Salaried:
  Monthly Income = Annual Salary ÷ 12

If Hourly:
  If less than 2 years: Use current rate × hours/week × 52 ÷ 12
  If 2+ years and stable: Average last 2 years W-2 income ÷ 24
```

**Step 3: Employment Verification**
- Verbal VOE acceptable for conventional loans
- Written VOE required for FHA/VA within 10 business days of closing
- Confirm: Employment status, position, salary, hire date, likelihood of continued employment

**Red Flags - Do Not Use**
❌ Recent start date (<30 days) without 2-year history in same line of work
❌ Declining income trend (>20% year-over-year decrease without explanation)
❌ Employment gaps >30 days in last 2 years (without explanation)
❌ Paystubs appear altered or inconsistent with W-2

### 2. Self-Employed Income

**Definition**: Borrower owns ≥25% of business

#### Required Documentation
- [ ] **Personal Tax Returns**: Most recent 2 years (all schedules)
- [ ] **Business Tax Returns**: Most recent 2 years
  - Form 1120 (Corporation)
  - Form 1120S (S-Corp)
  - Form 1065 (Partnership)
  - Schedule C (Sole Proprietor)
- [ ] **Year-to-Date Profit & Loss Statement**: Signed and dated
- [ ] **Year-to-Date Balance Sheet**: Signed and dated (if available)
- [ ] **Business License** (if applicable)
- [ ] **CPA Letter** (recommended for complex situations)

#### Income Calculation Method

**Two-Year Average Method** (most common):
```
Year 1 Net Income:          $X
Year 2 Net Income:          $Y
Add-Backs (if applicable):
  + Depreciation
  + Amortization
  + Depletion
  + One-time expenses

Total Year 1 Adjusted:      $A
Total Year 2 Adjusted:      $B

Monthly Qualifying Income = (A + B) ÷ 24
```

**Required Add-Backs:**
- Non-cash expenses: Depreciation, amortization, depletion
- One-time expenses: Casualty losses, equipment purchases (verify)

**Required Deductions:**
- Recurring capital expenditures
- Excessive personal expenses run through business
- One-time income (insurance proceeds, sale of assets)

#### Analysis Requirements

**Step 1: Trend Analysis**
```
Calculate year-over-year change:
  (Year 2 - Year 1) ÷ Year 1 × 100 = % Change

If declining >20%:
  ✓ Obtain written explanation from borrower
  ✓ Consider using only most recent 12 months if justified
  ✓ May require compensating factors (reserves, lower DTI)
```

**Step 2: Business Financial Health**
```
Review Balance Sheet:
  ✓ Assets > Liabilities (positive net worth)
  ✓ Adequate working capital
  ✓ No recent significant debt increases

Red Flags:
  ❌ Negative net worth
  ❌ Consistent losses
  ❌ Declining revenue >20% YOY
  ❌ P&L doesn't match tax returns (>10% variance)
```

**Step 3: Continuance Verification**
- YTD P&L shows continued operations
- No indication of business closure
- Industry is stable (not declining sector)

### 3. Commission/Bonus Income

**Requirement**: Must have 2-year history to be considered stable

#### Required Documentation
- [ ] Most recent 2 years W-2 (showing commission/bonus)
- [ ] Most recent 2 years tax returns (if significant)
- [ ] Most recent 30 days paystubs
- [ ] Employer verification of likelihood to continue

#### Calculation Method
```
Year 1 Commission/Bonus:    $X
Year 2 Commission/Bonus:    $Y

If declining OR irregular:
  Use lesser of 2-year average or most recent year

If stable/increasing:
  Average = (X + Y) ÷ 2
  Monthly = Average ÷ 12
```

**Requirements to Use:**
✓ 2-year history on same job or same industry
✓ Not declining >20% year-over-year
✓ Employer confirms likely to continue
✓ YTD paystubs show continued receipt

### 4. Rental Income

#### Required Documentation
- [ ] **Schedule E** (Tax Returns): Most recent 2 years
- [ ] **Lease Agreement**: Current, signed by all parties
- [ ] **Appraisal Form 1007** (Rent Schedule): Shows market rent

#### Calculation Method (FNMA/FHLMC Standard)

**Method 1: Subject Property (from tax returns)**
```
Gross Rental Income (Schedule E):     $X
Less: Expenses (Schedule E):          -$Y
Net Rental Income:                     $Z

Monthly Qualifying Income = Z ÷ 12
```

**Method 2: Subject Property (no tax history)**
```
Market Rent (from appraisal):         $X
× PITIA Offset (75%):                 × 0.75
Monthly Qualifying Income:             Result
```

**Investment Properties (Non-Subject)**
```
Use lesser of:
  1. Schedule E net income ÷ 12, OR
  2. Market rent (from appraisal) × 75%
```

**Red Flags:**
❌ Consistent losses on Schedule E for >2 years
❌ High vacancy rates (>10% annually)
❌ Property in declining area
❌ Rent significantly below market (per appraisal)

### 5. Social Security/Pension/Retirement Income

#### Required Documentation
- [ ] **Award Letter**: SSA-1099 or pension award letter
- [ ] **Bank Statements**: Showing 2+ months of deposits
- [ ] **Tax Returns**: If disability income (verify non-taxable status)

#### Verification Requirements
```
✓ Income is expected to continue ≥3 years
✓ Award letter dated within 12 months
✓ Bank deposits match stated amount
✓ If disability: Confirm not set to expire before loan matures
```

**Calculation:**
- Use monthly amount from award letter
- If annual amount: Divide by 12
- Verify deposits in bank statements

### 6. Alimony/Child Support

**Requirement**: Must continue for ≥3 years

#### Required Documentation
- [ ] **Divorce Decree** or **Separation Agreement**: Showing payment terms
- [ ] **Proof of Receipt**: 12 months (bank statements or cancelled checks)
- [ ] **Payment History**: Showing consistent, timely receipt

#### Verification Steps
```
✓ Divorce decree shows payment amount and duration
✓ Income will continue ≥3 years from application date
✓ Consistent receipt for past 12 months (≥80% received)
✓ No indication payments will stop
```

**Cannot Use If:**
❌ Payments inconsistent (<80% received in last 12 months)
❌ Payer has history of missed payments
❌ Less than 3 years remaining
❌ Borrower unwilling to disclose (cannot be required to disclose)

### 7. Other Income Sources

#### Capital Gains/Investment Income
- **Documentation**: 2 years tax returns (Schedule D, B)
- **Requirement**: 2-year history, likely to continue
- **Calculation**: 2-year average ÷ 24

#### Military Income
- **Documentation**: Current LES (Leave and Earnings Statement)
- **Special Allowances**: BAH, BAS, flight pay, hazard pay (if likely to continue ≥3 years)
- **Calculation**: Base pay + allowances ÷ monthly

#### Part-Time Employment
- **Documentation**: 2 years W-2, paystubs, VOE
- **Requirement**: 2-year history, employer confirms continuance
- **Calculation**: 2-year average ÷ 24

## Income Calculation Worksheet

### Step-by-Step Process

**Step 1: Gather All Income Sources**
```
Borrower 1:
  W-2 Salary:           $______/month
  Overtime/Bonus:       $______/month
  Self-Employment:      $______/month
  Rental Income:        $______/month
  Other:                $______/month
  TOTAL BORROWER 1:     $______/month

Borrower 2 (if applicable):
  [Repeat above]
  TOTAL BORROWER 2:     $______/month

TOTAL HOUSEHOLD INCOME: $______/month
```

**Step 2: Document Income Sources**
Create income analysis file containing:
1. Income calculation worksheet
2. All source documents (paystubs, W-2s, tax returns)
3. VOE documentation
4. Written explanation for any unusual circumstances

**Step 3: Quality Control Check**
```
✓ All income sources documented per guidelines
✓ Calculations verified
✓ 2-year history confirmed for variable income
✓ Continuance verified (VOE, award letters)
✓ No unexplained gaps or inconsistencies
✓ Tax returns reconcile to W-2s
✓ YTD paystubs align with previous year income
```

## Special Situations

### Recent Job Change (Same Line of Work)
**Acceptable If:**
- 30+ days on new job AND
- 2+ years in same line of work OR
- Education/training supports new career

**Documentation:**
- Employment letter explaining gap
- Evidence of training/education if career change
- Paystubs from new employer

### Declining Income
**May Accept If:**
- Decline <20% year-over-year OR
- Reasonable explanation provided (reduced hours by choice, etc.) AND
- Strong compensating factors (high credit score, low DTI, significant reserves)

**Documentation:**
- Borrower letter of explanation
- Underwriter written rationale
- Approved by Senior Underwriter

### Seasonal/Variable Income
**Requirements:**
- 2-year history showing seasonal pattern
- Use 2-year average ÷ 24
- Consider cash reserves to cover off-season

## Documentation Standards

### File Organization
```
Income File Structure:
├── Income Calculation Worksheet
├── Paystubs (30 days)
├── W-2s (2 years)
├── Tax Returns (2 years, all schedules)
├── VOE (verbal or written)
├── Self-Employment Docs (if applicable)
│   ├── Business Returns (2 years)
│   ├── P&L Statement (YTD)
│   ├── Balance Sheet (YTD)
│   └── CPA Letter (if used)
└── Other Income Documentation
    ├── Award Letters
    ├── Bank Statements
    └── Lease Agreements
```

### Document Aging Requirements
| Document Type | Maximum Age |
|---------------|-------------|
| Paystubs | 30 days from application |
| VOE (verbal) | 10 business days before closing |
| VOE (written) | 10 business days before closing |
| Tax Returns | Most recent filed return |
| P&L Statement | 90 days from application |
| Bank Statements | 60 days from date on statement |
| Award Letters | 12 months |

## Quality Control and Auditing

### Pre-Funding QC Checks
1. **Income Calculation Verification**
   - Recalculate all income
   - Verify 2-year averages computed correctly
   - Confirm add-backs/deductions appropriate

2. **Document Completeness**
   - All required docs present
   - Documents within acceptable age
   - No missing signatures or dates

3. **Red Flag Review**
   - Declining income addressed
   - Employment gaps explained
   - Unusual income sources documented

### Post-Funding Audit Sample
- Random sample 10% of closed loans monthly
- Targeted review of loans with:
  - Self-employment income
  - Multiple income sources
  - Declining income approved with compensating factors

### Common Audit Findings to Avoid
❌ Missing VOE within 10 days of closing
❌ Using income without 2-year history
❌ Incorrect calculation of self-employment income
❌ Using bonus/commission without 2-year history
❌ Outdated paystubs (>30 days old)
❌ Tax transcripts don't match submitted returns

## Training Requirements

### Initial Training
- 8 hours: Income documentation standards
- 4 hours: Self-employment income analysis
- 2 hours: Special income types
- **Certification Required**: Pass income calculation assessment (≥90%)

### Continuing Education
- Annual refresher (4 hours)
- Quarterly investor guideline updates
- Immediate training when guidelines change

## Related SOPs
- {{include: sop-mf-002}} - AUS Processing
- {{include: sop-mf-003}} - FHA Underwriting Guidelines
- {{include: sop-mf-004}} - Clear to Close Verification
- {{include: sop-mf-013}} - Borrower Identity Verification

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.1.0 | 2025-10-15 | Updated FNMA/FHLMC guidelines per Q4 2025 changes | Chief Underwriter |
| 2.0.0 | 2024-06-15 | Added rental income PITIA offset method | Chief Underwriter |
| 1.5.0 | 2024-01-15 | Initial comprehensive version | Underwriting Manager |

---
**Document Classification**: Internal Use
**Retention Period**: 7 years from last revision
**Review Frequency**: Semi-annual or upon guideline changes
