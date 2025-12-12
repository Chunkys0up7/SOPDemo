---
id: sop-mf-011
type: sop
version: 2.0.0
title: Fraud Detection and Exception Approval Matrix
department: Mortgage Lending - Compliance & Risk
audience: [Loan Officers, Processors, Underwriters, Fraud Analysts, Senior Management]
complexity: high
estimatedTime: 30-120 minutes (varies by complexity)
effectiveDate: 2024-01-15
lastReviewed: 2025-10-15
nextReview: 2026-04-15
owner: Chief Risk Officer
approver: VP of Mortgage Operations
compliance: [CFPB, FinCEN, SAR Reporting, Red Flags Rule, FCRA]
dependencies:
  - sop-mf-002  # AUS Processing
  - sop-mf-005  # Wire Transfer Security
  - sop-mf-008  # Income Documentation
  - sop-mf-013  # Identity Verification
tags:
  - fraud-detection
  - risk-management
  - exception-approval
  - compliance
  - SAR
  - red-flags
status: draft
---

# Fraud Detection and Exception Approval Matrix

## Purpose

This SOP establishes comprehensive procedures for detecting mortgage fraud, assessing risk indicators, managing loan exceptions, and escalating suspicious activity to ensure regulatory compliance and portfolio quality.

## Scope

Applies to all mortgage loan applications from initial review through post-closing quality control. Covers all loan products: conventional, FHA, VA, USDA, and portfolio loans.

## Regulatory Framework

### Primary Regulations
- **18 U.S.C. § 1344** (Bank Fraud)
- **18 U.S.C. § 1014** (False Statements to Federally Insured Institutions)
- **31 CFR § 1020.320** (SAR - Suspicious Activity Report Filing)
- **12 CFR § 1026.51** (Red Flags Rule - Identity Theft Prevention)
- **Fair Credit Reporting Act** (FCRA) - Fraud Alerts
- **Bank Secrecy Act (BSA)** / Anti-Money Laundering (AML)

### Reporting Requirements
- **SAR Filing**: Within 30 days of detecting suspicious activity involving $5,000+
- **Law Enforcement**: Report known/suspected criminal violations to appropriate authorities
- **Investor Notification**: Notify investors of fraud discovered post-sale (per contract terms)

### Penalties for Failure to Detect/Report
- **Criminal**: Up to 30 years imprisonment + fines (18 U.S.C. § 1344)
- **Civil**: Up to $1 million per violation (FinCEN)
- **Regulatory**: Cease and desist orders, civil money penalties
- **Reputational**: Loss of investor relationships, regulatory scrutiny

## Fraud Types and Red Flags

### 1. Occupancy Fraud

**Description**: Borrower misrepresents intent to occupy property as primary residence to obtain better rates/terms

**Red Flags:**
```
🚩 Borrower owns multiple properties in same area
🚩 Subject property far from employment (>50 miles)
🚩 Borrower recently purchased/refinanced another primary residence
🚩 Property significantly larger/more expensive than current residence (downsize claim)
🚩 Investment property amenities (e.g., vacation rental furnishings)
🚩 Borrower has residence in another state
🚩 Mail forwarding to different address
🚩 Credit report shows recent rental property purchases
🚩 Current residence has recent major renovation (unlikely to move)
🚩 Borrower reluctant to provide utility bills for current residence
```

**Verification Steps:**
1. Obtain utility bills for current and subject property
2. Verify employment location vs. subject property distance
3. Check credit report for recent property acquisitions
4. Review tax returns for rental income (Schedule E)
5. Require borrower to sign occupancy affidavit
6. Post-closing: Send mail to property (return if undeliverable = red flag)

**Risk Level:**
- High: Clear indicators present (multiple properties, far from work, recent purchase)
- Medium: Some indicators (long commute but explainable, larger home)
- Low: No indicators, primary residence verified

**Action if Fraud Suspected:**
- Require additional documentation (utility bills, lease termination)
- Interview borrower (document responses)
- Consider declining or restructuring as investment property
- If approved: Enhanced post-closing monitoring

### 2. Income Fraud

**Description**: Borrower or employer provides false/inflated income documentation

**Red Flags:**
```
🚩 Paystubs appear altered (fonts inconsistent, alignment off, pixelation)
🚩 YTD income inconsistent with W-2 from prior year
🚩 Employer cannot be verified (phone disconnected, no business listing)
🚩 Employment letter on generic letterhead (not company branded)
🚩 Self-employment income unusually high for industry
🚩 Tax returns show significant income but minimal tax paid
🚩 W-2 shows employer EIN doesn't match IRS records
🚩 Borrower vague about job duties when questioned
🚩 Recent hire (< 30 days) with high income and no history in field
🚩 Commission/bonus income not reflected on tax returns
🚩 Bank deposits don't match stated income
```

**Verification Steps:**
1. **VOE (Verification of Employment)**: Call employer directly (look up number independently)
2. **IRS Tax Transcripts**: Order 4506-C to verify tax return authenticity
3. **Paystub Analysis**: Review for formatting consistency, mathematical accuracy
4. **Database Verification**: Check employer EIN in IRS database, verify business exists
5. **Bank Statement Review**: Verify deposits match paystubs (amount and frequency)
6. **Third-Party Verification**: Use The Work Number, Equifax TWN for W-2 wage earners

**Specific Checks for Self-Employed:**
- CPA verification call (verify CPA license)
- Business license verification
- Business bank statements (verify revenue deposits)
- Client references (if unusual income claimed)

**Risk Level:**
- Critical: Altered documents, employer cannot be verified, tax transcripts don't match
- High: Inconsistencies between docs (paystubs vs W-2 vs tax returns)
- Medium: Minor discrepancies with reasonable explanation
- Low: All docs verified and consistent

**Action if Fraud Suspected:**
- Order IRS tax transcripts (4506-C) - MANDATORY
- Third-party employment verification
- Request additional documentation
- Interview borrower
- Decline if documents confirmed fraudulent
- File SAR if fraud confirmed

### 3. Appraisal Fraud

**Description**: Inflated property value through fraudulent appraisal

**Red Flags:**
```
🚩 Appraised value >10% higher than contract price
🚩 Comparable sales cannot be verified (don't exist in MLS/public records)
🚩 Comparable sale prices significantly higher than MLS data
🚩 Comparables located far from subject when closer sales available
🚩 Adjustments excessive (>25% gross) or illogical
🚩 Property photos appear to be different properties
🚩 Appraisal completed unrealistically fast (<24 hours)
🚩 Appraiser not licensed or certification expired
🚩 Appraiser has business relationship with loan officer/broker
🚩 Multiple loans from same appraiser with similar red flags
🚩 Borrower or realtor requested specific appraiser
```

**Verification Steps:**
1. **Comparable Verification**: Check MLS and public records for each comparable
2. **Appraiser License Check**: Verify license valid and no disciplinary actions
3. **Photo Analysis**: Verify photos match property (Google Street View, tax records)
4. **Market Analysis**: Compare to recent sales in area (independent research)
5. **Field Review**: Order if significant concerns (second appraiser inspects)
6. **AMC Review**: Ensure appraisal ordered through compliant AMC (no direct contact)

**Risk Level:**
- Critical: Fake comparables, unlicensed appraiser, photos don't match
- High: Value >15% over contract, excessive adjustments, distant comparables
- Medium: Value 10-15% over contract, some questionable comparables
- Low: Value reasonable, comps verified, adjustments appropriate

**Action if Fraud Suspected:**
- Order field review appraisal (mandatory)
- Report to state appraisal board if appraiser involved
- Report to AMC for appraiser removal
- Decline loan or use field review value
- File SAR if confirmed fraud
- Notify investors if pattern identified

### 4. Identity Theft / Synthetic Identity Fraud

**Description**: Stolen or fabricated identity used to obtain mortgage

**Red Flags:**
```
🚩 Credit report shows fraud alert or security freeze
🚩 SSN issued recently but borrower claims long credit history
🚩 Address history on credit report doesn't match borrower's stated history
🚩 Borrower cannot answer credit bureau verification questions
🚩 Photo ID appears altered (lamination issues, font inconsistencies)
🚩 Borrower reluctant to provide additional ID
🚩 Name variations across documents (different spellings, middle names)
🚩 Authorized user accounts but no primary credit accounts
🚩 Credit file very thin despite borrower's age
🚩 Recent address changes to high-fraud areas
```

**Verification Steps:**
1. **Government-Issued Photo ID**: Driver's license, passport (verify authenticity)
2. **SSN Verification**: Check SSN validity (SSA Death Master File, issued date)
3. **Credit Bureau Verification Questions**: Out-of-wallet questions (per FCRA)
4. **Proof of Residence**: Utility bills, lease, property tax bills
5. **Interview Borrower**: In-person or video call (verify identity)
6. **Public Records**: Verify prior addresses, employment history

**Tools:**
- ID verification software (Socure, Jumio)
- OFAC (Office of Foreign Assets Control) screening
- Fraud databases (LexisNexis, Experian)

**Risk Level:**
- Critical: Photo ID fraudulent, SSN invalid, cannot verify identity
- High: Fraud alert, thin credit file, unable to answer verification questions
- Medium: Some inconsistencies with reasonable explanation
- Low: Identity verified through multiple sources

**Action if Fraud Suspected:**
- Require additional identification (passport, secondary ID)
- In-person or video verification required
- OFAC screening
- Decline if identity cannot be verified
- File SAR if fraud confirmed
- Report to law enforcement (FBI, Secret Service)

### 5. Straw Buyer Fraud

**Description**: Someone poses as buyer on behalf of actual (unqualified) purchaser

**Red Flags:**
```
🚩 Borrower has no apparent connection to area (no family, employment, etc.)
🚩 Borrower seems uninformed about property details
🚩 Borrower reluctant to visit property or attend closing
🚩 Third party (not borrower) providing down payment with no clear relationship
🚩 Down payment gift from non-relative with no explanation
🚩 Power of attorney used without clear reason
🚩 Borrower doesn't ask typical buyer questions
🚩 Large recent deposits from unknown sources
🚩 Borrower has multiple recent loan applications (credit report)
```

**Verification Steps:**
1. Interview borrower about property and purchase motivation
2. Verify source of down payment (bank statements, gift letter, donor verification)
3. Review credit report for multiple recent inquiries (other loans)
4. Require in-person attendance at closing
5. Verify employment and reason for relocation

**Risk Level:**
- High: Third-party funding, POA without explanation, borrower uninformed
- Medium: Weak connection to area but reasonable explanation
- Low: Clear motivation, verified funds, borrower knowledgeable

**Action if Fraud Suspected:**
- Interview borrower (in-person preferred)
- Require detailed explanation and documentation
- Decline if straw buyer confirmed
- File SAR if fraud confirmed

### 6. Asset Fraud

**Description**: False or altered documentation of assets/down payment

**Red Flags:**
```
🚩 Bank statements appear altered (fonts, alignment, logos inconsistent)
🚩 Large deposits shortly before application with vague explanation
🚩 Deposits don't match employment income
🚩 Account numbers inconsistent across statements
🚩 Financial institution cannot verify account
🚩 Gift letter from person with no apparent ability to gift (low income/assets)
🚩 Seasoning requirements not met (large recent deposits)
🚩 Assets held at obscure or foreign institutions
🚩 Cryptocurrency or hard-to-verify assets
```

**Verification Steps:**
1. **VOD (Verification of Deposit)**: Directly contact bank to verify balances
2. **Large Deposit Investigation**: Require paper trail for deposits >$1,000
3. **Gift Documentation**: Donor bank statements, proof of transfer, relationship verification
4. **Statement Analysis**: Mathematical verification (beginning + deposits - withdrawals = ending)
5. **Logo/Format Verification**: Compare to known authentic statements from same institution

**Risk Level:**
- Critical: Altered statements, accounts cannot be verified
- High: Large unexplained deposits, gift donor cannot substantiate
- Medium: Minor inconsistencies with reasonable explanation
- Low: Assets verified through VOD and documentation

**Action if Fraud Suspected:**
- Order VOD (mandatory)
- Require additional months of statements
- Verify gift donor ability to gift
- Decline if fraud confirmed
- File SAR if fraud confirmed

### 7. Builder/Seller Fraud

**Description**: Builder/seller inflates price or provides undisclosed incentives

**Red Flags:**
```
🚩 Seller concessions >6% (FNMA limit 6%)
🚩 Sales price significantly above recent comps
🚩 Seller-paid closing costs not disclosed on contract
🚩 Side agreements between buyer and seller
🚩 Non-arm's length transaction (family, business partners)
🚩 Builder offers unusual incentives not disclosed (car, vacation, etc.)
🚩 Property flipped multiple times in short period (>2 sales in 12 months)
🚩 Recent sale price (within 6 months) much lower than current contract
```

**Verification Steps:**
1. Review prior sales history (public records)
2. Verify all seller concessions disclosed on contract
3. Require borrower/seller to disclose all side agreements
4. Interview parties if non-arm's length
5. Appraisal review for property flip analysis

**Risk Level:**
- High: Undisclosed concessions, recent flip >20% gain, side agreements
- Medium: High concessions (5-6%), recent sale within 6 months
- Low: Arm's-length transaction, no recent sale, reasonable concessions

**Action if Fraud Suspected:**
- Require detailed explanation
- Review seasoning requirements (FNMA: >90 days for flips)
- Adjust sales price if concessions excessive
- Decline if fraud confirmed
- Report to investors

### 8. Credit Repair / Rapid Rescore Fraud

**Description**: Fraudulent schemes to artificially inflate credit scores

**Red Flags:**
```
🚩 Credit score increased >50 points in <30 days (without clear reason)
🚩 Derogatory items removed from credit report without documentation
🚩 Authorized user accounts added recently with high limits
🚩 Paid collections removed immediately (typically take 30-60 days)
🚩 Borrower used credit repair company with known fraud history
🚩 New tradelines appear that borrower cannot explain
```

**Verification Steps:**
1. Pull credit refresh to verify score and tradelines
2. Request documentation for dispute resolutions
3. Verify authorized user accounts (relationship to primary account holder)
4. Review credit repair company (Better Business Bureau, regulatory actions)

**Risk Level:**
- High: Unexplained score increase, removal of legitimate derogs, fake authorized user
- Medium: Rapid rescore with marginal documentation
- Low: Legitimate dispute resolutions, documented authorized user relationship

**Action if Fraud Suspected:**
- Order new credit report (re-pull)
- Do not use fraudulent tradelines in qualifying
- Require removal of questionable authorized user accounts
- Decline if fraud confirmed

## Fraud Detection Tools and Resources

### Automated Fraud Detection Systems

**LexisNexis ThreatMetrix:**
- Digital identity verification
- Device fingerprinting
- Behavioral analytics

**Equifax FraudIQ:**
- Synthetic identity detection
- Fraud score
- Fraud alerts

**CoreLogic:**
- Property fraud indicators
- Collateral risk score
- Prior sale history

### Manual Verification Resources

**IRS Tax Transcript Verification:**
- Form 4506-C (request tax transcripts)
- Compare to borrower-provided tax returns
- **Mandatory** if self-employed or fraud suspected

**SSA Death Master File:**
- Verify SSN not belonging to deceased person

**OFAC Screening:**
- Office of Foreign Assets Control
- Screen borrowers against sanctions lists

**State Licensing Databases:**
- Verify appraiser licenses
- Verify contractor/business licenses
- Check for disciplinary actions

**Public Records:**
- County assessor/recorder (property ownership, sales history)
- Business registry (verify business exists)
- Court records (liens, judgments, bankruptcies)

## Exception Approval Matrix

### Overview

All loans must meet underwriting guidelines. Exceptions (deviations from guidelines) require documented rationale and appropriate approval level based on risk.

### Exception Categories and Approval Authority

| Risk Level | Exception Type | Approval Authority | Documentation Required |
|------------|----------------|-------------------|------------------------|
| **Low** | Minor guideline deviation | Senior Underwriter | Brief explanation in file |
| **Medium** | Moderate risk increase | Underwriting Manager | Detailed risk assessment + compensating factors |
| **High** | Significant risk | Chief Underwriter + Risk Committee | Full risk memo + investor pre-approval (if applicable) |
| **Critical** | Severe risk / Policy violation | SVP Lending + Compliance | Executive summary + risk mitigation plan |

### Low Risk Exceptions (Senior Underwriter Approval)

**Examples:**
- DTI 45-47% (guideline 45%) with high credit score (≥740)
- Reserves 5 months (guideline 6 months) with stable employment (10+ years)
- LTV 80.5% (guideline 80%) with minimal rate impact
- Documentation minor deficiency (e.g., missing signature, easily corrected)

**Required Documentation:**
- Exception description
- Compensating factors
- Senior Underwriter approval (signature in LOS)

**Compensating Factors Required:**
Minimum 2 of:
- High credit score (≥740)
- Low LTV (≤70%)
- Significant reserves (>6 months PITI)
- Long employment history (≥10 years same employer/industry)
- Minimal debt (DTI <36%)

### Medium Risk Exceptions (Underwriting Manager Approval)

**Examples:**
- DTI 48-50% with strong compensating factors
- Credit score 620-639 (guideline ≥640) with explanation of derogatory credit
- Recent bankruptcy/foreclosure with extenuating circumstances
- Self-employment <2 years (guideline 2 years) in same line of work
- Non-traditional credit (no credit score)

**Required Documentation:**
- Detailed exception memo (1-2 pages)
- Compensating factors analysis (minimum 3 required)
- Risk assessment narrative
- Underwriting Manager written approval
- Borrower letter of explanation (if applicable)

**Compensating Factors Required:**
Minimum 3 of:
- Substantial down payment (≥20%)
- Excellent payment history (no 30-day lates in 24 months)
- High residual income (DTI ≤40% excluding new housing payment)
- Professional occupation (doctor, lawyer, engineer, etc.)
- Significant liquid reserves (≥12 months PITI)

### High Risk Exceptions (Chief Underwriter + Risk Committee Approval)

**Examples:**
- DTI >50%
- Credit score <620
- Recent bankruptcy (<2 years) without extenuating circumstances
- Stated income (exception to full documentation requirement)
- Foreign national borrower
- Multiple prior exceptions on same loan

**Required Documentation:**
- Comprehensive risk memorandum (3-5 pages)
- Executive summary (1 page)
- All compensating factors documented
- Chief Underwriter written approval
- Risk Committee meeting minutes (approval documented)
- Legal review (if policy deviation)
- Investor pre-approval (if investor loan)
- Enhanced servicing monitoring plan

**Risk Memo Must Include:**
1. Loan summary (borrower, property, loan amount, LTV, DTI, credit score)
2. Specific exceptions requested
3. Detailed compensating factors (minimum 4)
4. Risk analysis (likelihood of default, potential loss severity)
5. Mitigation strategies (e.g., additional reserves required, rate pricing adjustment)
6. Recommendation and rationale

**Risk Committee Review:**
- Committee: Chief Underwriter, Chief Risk Officer, SVP Lending, Compliance Officer
- Quorum: 3 of 4 required
- Vote: Majority approval required
- Frequency: Weekly or as-needed

### Critical Risk Exceptions (Executive Approval Required)

**Examples:**
- Multiple high-risk exceptions on single loan (DTI >50% AND credit <620)
- Policy waiver (e.g., loan amount exceeds delegated authority)
- Regulatory compliance exception (requires legal opinion)
- Portfolio loan outside established parameters
- Loan to insider (employee, director, family)

**Required Documentation:**
- All "High Risk" documentation (above)
- Legal opinion (from General Counsel)
- Executive summary for Board of Directors
- SVP Lending written approval
- Chief Compliance Officer sign-off
- Board notification (if loan amount >$X - per policy)

**Cannot Be Approved:**
❌ Fraud indicators present and unresolved
❌ Regulatory violation
❌ Investor explicitly prohibits
❌ Borrower identity cannot be verified
❌ Property does not meet minimum property standards (safety/habitability)

## Suspicious Activity Reporting (SAR)

### When to File SAR

**Mandatory Filing Criteria:**
1. **Amount**: Transaction involves $5,000 or more
2. **Suspicion**: Reason to suspect:
   - Transaction involves funds from illegal activity
   - Transaction designed to evade BSA requirements
   - Transaction has no business or apparent lawful purpose
   - Borrower is using institution to facilitate criminal activity

**Mortgage-Specific SAR Triggers:**
- Confirmed or suspected income fraud
- Confirmed or suspected identity theft
- Appraisal fraud confirmed
- Straw buyer scheme
- Money laundering (large cash deposits, structuring)
- Occupancy fraud (if deliberate misrepresentation confirmed)

### SAR Filing Process

**Step 1: Detect Suspicious Activity**
- Red flags identified during underwriting/QC
- Investigation confirms suspicion (fraud likely)

**Step 2: Document Thoroughly**
- Collect all evidence
- Document investigation steps
- Preserve original documents (do not alter)
- Restrict access (confidential)

**Step 3: Notify SAR Filing Officer**
- Internal escalation to BSA/AML Officer
- Provide summary and all supporting documentation
- Do NOT notify borrower/subject (tipping off prohibited by law)

**Step 4: Complete SAR Form**
- FinCEN SAR Form (online filing)
- Detailed narrative (who, what, when, where, why, how)
- Attach supporting documentation

**Step 5: File with FinCEN**
- **Deadline**: 30 calendar days from date of initial detection
- **Extension**: Additional 30 days if more time needed to identify subject
- **Late Filing**: File as soon as possible + document reason for delay

**Step 6: Retain Records**
- Copy of SAR filing
- All supporting documentation
- Retention: **5 years** from filing date

**Step 7: Ongoing Monitoring**
- Continue monitoring subject for additional suspicious activity
- File supplemental SARs if new activity detected

### SAR Confidentiality

**Prohibited Actions:**
❌ **Do NOT notify the subject** of SAR filing (federal crime - "tipping off")
❌ Do NOT disclose SAR filing to anyone outside compliance/legal
❌ Do NOT reference SAR in loan file (use separate confidential file)
❌ Do NOT discuss with loan officer, processor (unless necessary for filing)

**Permitted Actions:**
✓ Share information with law enforcement (upon request)
✓ Disclose to regulators (during examination)
✓ Share with outside counsel (if litigation related)

### SAR Filing Examples

**Example 1: Income Fraud**
```
Narrative:
On 10/15/2025, during underwriting review of loan application #12345 for John Doe, suspicious documentation was identified. Paystubs from XYZ Company appeared altered (font inconsistencies, mathematical errors). Verification of Employment (VOE) attempt failed - phone number disconnected. IRS tax transcripts requested via Form 4506-C. Transcripts received 10/25/2025 show NO income from XYZ Company for 2023 or 2024. Borrower-provided tax returns show $85,000 income from XYZ Company - transcripts show $0. Clear document fraud and false statements. Loan declined 10/26/2025. SAR filed 10/30/2025.
```

**Example 2: Identity Theft**
```
Narrative:
On 11/01/2025, credit report pulled for Jane Smith (SSN XXX-XX-1234) showed fraud alert. Out-of-wallet verification questions failed - borrower could not answer. Follow-up investigation: SSN issued in 2022 (borrower claims age 35). Driver's license appears altered - lamination bubbling, font inconsistent. Requested secondary ID - borrower became evasive and withdrew application. Strong indicators of synthetic identity fraud. SAR filed 11/15/2025.
```

## Training and Competency

### Initial Training Requirements
- 12 hours: Mortgage fraud types and detection
- 4 hours: Red Flags Rule and identity theft prevention
- 4 hours: SAR filing procedures
- 4 hours: Exception approval process
- **Certification Required**: Pass fraud detection assessment (≥90%)

### Continuing Education
- Annual fraud prevention refresher (6 hours)
- Quarterly case studies (real fraud examples, lessons learned)
- Immediate training when new fraud schemes identified

### Role-Specific Training

**Loan Officers:**
- Focus: Initial red flag identification, borrower interviews

**Processors:**
- Focus: Document verification, inconsistency detection

**Underwriters:**
- Focus: Comprehensive fraud analysis, exception approval matrix

**Fraud Analysts:**
- Focus: Advanced investigation techniques, SAR filing

**Senior Management:**
- Focus: Risk committee procedures, SAR oversight

## Quality Control and Monitoring

### Pre-Funding Fraud Review (100% of Loans)

**Automated Checks:**
- Run fraud detection software (LexisNexis, Equifax FraudIQ)
- OFAC screening
- SSN validation
- Red flag indicators

**Manual Review:**
- Document authenticity spot-check
- Red flag assessment
- Exception approval verification

### Post-Funding Audit (Sample 15% Monthly)

**Random Sample + Targeted High-Risk:**
- Loans with exceptions
- Loans with red flags (resolved but documented)
- Loans with high fraud scores
- Self-employed borrowers
- Occupancy fraud risk

**Audit Includes:**
- Re-verification of employment
- Re-verification of assets (VOD)
- Occupancy verification (mail sent to property)
- Tax transcript comparison (if not done pre-funding)

### Red Flag Trending and Reporting

**Monthly Report to Management:**
- Total red flags identified
- Loans declined due to fraud
- SARs filed
- Fraud losses (if any)
- Trends and patterns

**Quarterly Board Report:**
- Fraud metrics and trends
- SAR activity summary (volume, types - NO details due to confidentiality)
- Policy/procedure updates
- Training completion rates

## Related SOPs
- {{include: sop-mf-002}} - AUS Processing
- {{include: sop-mf-005}} - Wire Transfer Security (wire fraud prevention)
- {{include: sop-mf-008}} - Income Documentation Standards
- {{include: sop-mf-013}} - Borrower Identity Verification

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.0.0 | 2025-10-15 | Added synthetic identity fraud, updated SAR procedures | Chief Risk Officer |
| 1.5.0 | 2024-06-15 | Enhanced red flag indicators, added exception matrix | Fraud Prevention Manager |
| 1.0.0 | 2024-01-15 | Initial comprehensive version | VP Mortgage Operations |

---
**Document Classification**: Internal Use - Highly Confidential
**Retention Period**: Permanent (SAR records 5 years per FinCEN)
**Review Frequency**: Annual or upon regulatory changes
