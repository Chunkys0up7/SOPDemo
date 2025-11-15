---
id: sop-mf-002
title: Automated Underwriting System (AUS) Processing
version: 3.1.5
status: active
owner: Underwriting Department
category: Underwriting
lastReviewed: 2025-10-28
nextReview: 2026-01-28
approver: Michael Chen (Chief Underwriter)
complianceFrameworks:
  - Desktop Underwriter
  - Loan Product Advisor
  - GSE Guidelines
---

# Automated Underwriting System (AUS) Processing

## Overview

This SOP defines the standardized process for submitting loan files to Automated Underwriting Systems (AUS), interpreting findings, and managing underwriting conditions for conventional conforming loans.

**Purpose:** Ensure consistent, compliant use of Desktop Underwriter (DU) and Loan Product Advisor (LPA) to obtain automated underwriting approvals.

**Scope:** Applies to all conventional loan applications submitted to Fannie Mae (DU) or Freddie Mac (LPA) automated underwriting engines.

**Processing Volume:** 1,243 submissions per month (avg)
**Target Turnaround:** 24 hours from complete file to AUS submission

## Prerequisites

Before submitting to AUS, verify the following:

### Required Documentation (per {{include: sop-mf-008}})
- ✅ Complete 1003 Uniform Residential Loan Application
- ✅ Income documentation (W2s, paystubs, tax returns per {{include: sop-mf-008}})
- ✅ Asset documentation (2 most recent statements)
- ✅ Credit report (merged tri-bureau, <90 days old)
- ✅ Appraisal or property valuation (if applicable)

### System Access
- Desktop Underwriter credentials (Fannie Mae approved lender)
- Loan Product Advisor credentials (Freddie Mac seller/servicer)
- Loan Origination System (LOS) integration active

### Training Requirements
- AUS Fundamentals certification (required annually)
- Desktop Underwriter training (Fannie Mae University)
- Loan Product Advisor training (Freddie Mac Learn)
- {{include: sop-mf-010}} TRID compliance training

## Procedure Steps

### Step 1: Pre-Submission File Review

**Timing:** Before any AUS submission

1. **Verify Application Completeness**
   - Review 1003 for all required fields (borrower info, property, loan details)
   - Confirm income calculations are accurate
   - Validate asset calculations and reserves
   - Check credit report for accuracy (dispute open tradelines if needed)

2. **Calculate DTI Ratios Manually**
   - Front-end ratio (PITI / Gross Monthly Income)
   - Back-end ratio (PITI + Debt / Gross Monthly Income)
   - Document calculations in loan file notes
   - Flag if DTI >50% (may require manual underwriting)

3. **Review Property Eligibility**
   - Confirm property type is eligible (SFR, Condo, 2-4 unit, etc.)
   - Verify occupancy (Primary, Second Home, Investment)
   - Check LTV/CLTV ratios against program limits
   - Review any special property considerations (rural, condo approval status)

**Quality Check:** Senior processor must review file before first AUS submission

### Step 2: Desktop Underwriter (DU) Submission

**Use DU for:** Fannie Mae-eligible loans, conforming loan limits

1. **Access Desktop Underwriter**
   - Log into DU via https://du.fanniemae.com or LOS integration
   - Select "Create New Casefile"
   - Enter unique loan identifier

2. **Input Loan Data**
   - Borrower information (SSN, name, address, employment)
   - Property information (address, value, purchase price)
   - Loan information (amount, rate, term, LTV, purpose)
   - Income and assets (match to documentation exactly)
   - Liabilities (all debts from credit report + non-credit items)

3. **Upload Supporting Documents**
   - 1003 application (PDF)
   - Credit report (MISMO 3.4 format preferred)
   - Income documents (W2, paystubs, tax returns)
   - Asset statements
   - Appraisal (if available)

4. **Submit to DU**
   - Review data entry for accuracy
   - Click "Submit" to run automated underwriting
   - Wait for findings (typically 30 seconds - 2 minutes)

### Step 3: Loan Product Advisor (LPA) Submission

**Use LPA for:** Freddie Mac-eligible loans, conforming loan limits

1. **Access Loan Product Advisor**
   - Log into LPA via https://lpa.freddiemac.com or LOS integration
   - Click "Create Loan" or use LOS integration
   - Enter loan identifier

2. **Enter Loan Details**
   - Loan characteristics (amount, term, rate, LTV, DTI)
   - Borrower data (income, assets, liabilities, credit)
   - Property data (type, occupancy, value, location)
   - Ensure all fields match source documentation

3. **Submit to LPA**
   - Validate data entry
   - Submit for automated assessment
   - Receive Feedback Certificate (typically immediate)

### Step 4: Interpret AUS Findings

**Desktop Underwriter Results:**

| Finding | Meaning | Action Required |
|---------|---------|-----------------|
| **Approve/Eligible** | Loan meets Fannie Mae guidelines | Proceed to condition clearance |
| **Approve/Ineligible** | Approval, but not Fannie-eligible | Review ineligibility reason; may require manual UW |
| **Refer** | Requires manual underwriting | Route to senior underwriter for full review |
| **Out of Scope** | Loan parameters exceed AUS limits | Review loan parameters; may need jumbo program |

**Key DU Findings to Review:**
- ☑️ **Credit:** Required minimum representative credit score
- ☑️ **Income/Employment:** Documentation requirements (verify 4506-C)
- ☑️ **Assets:** Reserve requirements (months of PITI)
- ☑️ **Property:** Appraisal type (Full, Exterior, Waiver)
- ☑️ **LTV/CLTV:** Maximum allowed loan-to-value
- ☑️ **Underwriting Conditions:** List of required documents/verifications

**Loan Product Advisor Results:**

| Risk Class | Meaning | Action Required |
|------------|---------|-----------------|
| **Accept** | Meets Freddie Mac standards | Clear conditions per Feedback Certificate |
| **Accept+** | Strong credit profile | May have reduced reserve requirements |
| **Caution** | Elevated risk; additional review | Review risk factors; senior UW approval |
| **Unable to Determine** | Insufficient data | Re-submit with complete info |

**Key LPA Findings to Review:**
- ☑️ **Appraisal Type:** Full/Exterior/Desktop/ACE/Waiver
- ☑️ **Income/Employment:** VOE required (yes/no)
- ☑️ **Assets:** Reserve months required
- ☑️ **Additional Requirements:** Specific conditions or documentation

### Step 5: Document AUS Results

1. **Save Findings to Loan File**
   - Print/save DU Finding or LPA Feedback Certificate
   - Upload to loan file document management system
   - File in "Underwriting" folder with date stamp

2. **Create Conditions List**
   - Export conditions from AUS findings
   - Create checklist in LOS
   - Assign to appropriate team members:
     - **Processor:** Document collection
     - **Underwriter:** Document review and approval
     - **Closer:** Final verifications

3. **Communicate Results**
   - Send findings to loan officer (if Approve)
   - Notify borrower of approval status
   - If Refer: Schedule manual underwriting review
   - Document all communications in loan notes

### Step 6: AUS Resubmission Protocol

**When to Resubmit:**
- Changed circumstances (income, assets, credit changes)
- Property value update (new appraisal)
- Loan parameters change (LTV, rate, term, loan amount)
- After rate lock (to ensure current pricing eligibility)
- Error correction in original submission

**Resubmission Process:**
1. Document reason for resubmission in loan notes
2. Update changed data fields only
3. Re-upload updated documents
4. Submit and compare findings to previous results
5. If findings worsen (Approve → Refer), escalate to senior UW immediately
6. Document comparison in loan file (before/after findings)

**Version Control:**
- DU maintains version history automatically
- Always use most recent findings for underwriting decisions
- Keep all versions in loan file for audit trail

### Step 7: Condition Management

**Per {{include: sop-mf-004}} Clear to Close verification:**

1. **Categorize Conditions**
   - **Pre-approval (PA):** Required before commitment
   - **Prior to Docs (PTD):** Required before closing disclosure
   - **Prior to Funding (PTF):** Required before loan closes

2. **Assign Responsibilities**
   - Processor: Collect documents
   - Underwriter: Review and approve
   - Closer: Final verification

3. **Track Condition Status**
   - Use LOS condition tracking module
   - Status options: Requested / Received / Approved / Waived
   - Update status within 24 hours of receipt
   - Escalate any conditions outstanding >5 days

4. **Obtain Underwriter Approval**
   - Underwriter reviews each condition when marked "Received"
   - Status changes to "Approved" or requests additional info
   - Document approval in LOS notes
   - All conditions must be "Approved" before {{include: sop-mf-004}} Clear to Close

## Quality Checks

Perform the following checks before finalizing AUS submission:

- [ ] All 1003 data matches source documentation exactly
- [ ] Income calculations verified by second processor
- [ ] Credit report reviewed for accuracy (no obvious errors)
- [ ] Property address matches appraisal and title report
- [ ] LTV calculated correctly (loan amount / appraised value)
- [ ] Correct loan purpose selected (Purchase/Refinance/Cash-out)
- [ ] Occupancy status verified (Primary/Second/Investment)
- [ ] All uploaded documents are legible and complete
- [ ] Borrower signatures obtained where required (4506-C, etc.)
- [ ] Senior processor peer review completed (first submission)

**Post-Submission Quality Check:**
- [ ] DU/LPA findings saved to loan file within 1 hour
- [ ] Conditions list created and assigned within 4 hours
- [ ] Loan officer notified of results within 4 hours
- [ ] Any adverse findings escalated to management immediately

## Troubleshooting

### Issue: DU Returns "Data Validation Error"

**Symptoms:** Submission fails with error message before findings generated

**Resolution:**
1. Review error message for specific field(s) causing issue
2. Common errors:
   - Invalid SSN format (must be XXX-XX-XXXX)
   - Property address not found in Fannie Mae database (verify ZIP+4)
   - Invalid date formats (use MM/DD/YYYY)
   - Missing required fields (income, assets, property value)
3. Correct data entry errors
4. Re-submit to DU
5. If error persists after 3 attempts, contact Fannie Mae DU Support (1-800-232-6643)

### Issue: LPA Returns "Unable to Determine"

**Symptoms:** LPA cannot provide Accept/Caution recommendation

**Possible Causes:**
- Insufficient data provided (income, assets, credit)
- Credit report missing tradelines
- LTV/DTI ratios outside normal parameters
- Occupancy or property type inconsistency

**Resolution:**
1. Review Feedback Certificate "Messages" section for specific issues
2. Provide missing data elements
3. Verify all fields are completed accurately
4. Re-submit with complete information
5. If still "Unable to Determine" after complete data, route to manual underwriting

### Issue: AUS Findings Worsen on Resubmission

**Symptoms:** Initial finding was Approve, resubmission returns Refer

**Action Required:**
1. **STOP** - Do not proceed with loan
2. Compare original and new findings side-by-side
3. Identify specific change that caused downgrade:
   - Credit score dropped
   - DTI increased
   - LTV increased
   - New derogatory credit items
4. Escalate to Senior Underwriter immediately
5. Determine if issue can be resolved:
   - Pay down debt to improve DTI
   - Increase down payment to reduce LTV
   - Provide explanation letter for credit issues
6. Notify loan officer and borrower of status
7. Document resolution plan in loan notes

### Issue: Appraisal Waiver Not Offered (Expected)

**Symptoms:** Expected appraisal waiver based on strong file, but DU/LPA requires full appraisal

**Possible Reasons:**
- Property not in AUS database (new construction, rural, recent sale)
- LTV too high for waiver (typically must be <80%)
- Credit score below waiver threshold (typically 700+)
- Property type ineligible (condo, multi-unit, manufactured)
- Recent title transfer or ownership change

**Resolution:**
1. Review DU/LPA findings for appraisal waiver eligibility factors
2. Consider lowering LTV (larger down payment) if close to threshold
3. If waiver is critical, discuss with borrower:
   - Option to increase down payment
   - Option to proceed with appraisal order
4. Order appraisal per {{include: sop-mf-009}} if waiver not available
5. Document decision in loan notes

## Compliance Requirements

### Ability to Repay (ATR) / Qualified Mortgage (QM)

All AUS-approved loans meet ATR/QM safe harbor:
- ✅ DU Approve/Eligible = QM Safe Harbor
- ✅ LPA Accept = QM Safe Harbor
- ⚠️ DU Approve/Ineligible = Complies with ATR, but not QM
- ⚠️ Manual underwriting = Requires separate QM determination

Document QM status in loan file notes.

### TRID Compliance (per {{include: sop-mf-010}})

**Critical:** AUS findings may impact disclosed fees on Loan Estimate/Closing Disclosure

**Changed Circumstances that trigger revised disclosures:**
- AUS requires MI when initially waived
- Required reserves increase (impacts cash-to-close)
- Appraisal requirement changes (waiver to full appraisal - cost increase)

Monitor for changed circumstances and issue revised disclosures per {{include: sop-mf-010}}.

### Fair Lending Considerations

- Never override AUS findings based on prohibited factors (race, religion, national origin, etc.)
- Apply exception policies consistently across all borrowers
- Document business justification for any manual underwriting referrals
- Report HMDA data accurately based on AUS results

### Record Retention

Maintain the following in permanent loan file:
- All DU Finding reports (all versions)
- All LPA Feedback Certificates (all versions)
- Condition clearance documentation
- Underwriter approval notes
- Any exception approvals

**Retention Period:** Life of loan + 3 years (per investor requirements)

## References

### Internal SOPs
- {{include: sop-mf-001}} Conventional Loan Processing Workflow
- {{include: sop-mf-008}} Income Documentation and Verification Standards
- {{include: sop-mf-009}} Appraisal Review and Collateral Evaluation
- {{include: sop-mf-010}} TRID Compliance and Disclosure Timing
- {{include: sop-mf-004}} Clear to Close (CTC) Verification Process
- {{include: sop-mf-011}} Exception Approval and Escalation Matrix

### External Resources
- [Fannie Mae Selling Guide](https://singlefamily.fanniemae.com/selling-guide) - Comprehensive underwriting guidelines
- [Desktop Underwriter Documentation](https://singlefamily.fanniemae.com/originating-underwriting/mortgage-products/desktop-underwriter) - DU user guides and release notes
- [Freddie Mac Selling Guide](https://guide.freddiemac.com/) - Complete selling policies
- [Loan Product Advisor User Guide](https://sf.freddiemac.com/tools-learning/loan-product-advisor) - LPA documentation and training
- [CFPB ATR/QM Rule](https://www.consumerfinance.gov/rules-policy/regulations/1026/43/) - Ability to Repay regulation

### Training Resources
- Fannie Mae University: DU Essentials course
- Freddie Mac Learn: LPA Certification
- MBA Mortgage Basics: Automated Underwriting module

### System Links
- Desktop Underwriter: https://du.fanniemae.com
- Loan Product Advisor: https://lpa.freddiemac.com
- Fannie Mae Connect: https://connect.fanniemae.com
- Freddie Mac Seller/Servicer Portal: https://sf.freddiemac.com

---

**Document Control:**
- **Version:** 3.1.5
- **Effective Date:** 2025-10-28
- **Next Review:** 2026-01-28
- **Approved By:** Michael Chen, Chief Underwriter
- **Change Log:**
  - v3.1.5 (2025-10-28): Updated LPA risk class terminology
  - v3.1.0 (2025-08-15): Added appraisal waiver troubleshooting
  - v3.0.0 (2025-05-01): Major revision for new DU validation service
