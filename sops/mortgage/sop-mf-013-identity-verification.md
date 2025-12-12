---
id: sop-mf-013
type: sop
version: 2.0.0
title: Borrower Identity Verification Standards
status: draft
department: Mortgage Lending - Compliance
audience: [Loan Officers, Processors, Closers, Compliance Officers]
complexity: medium
estimatedTime: 15-30 minutes per borrower
effectiveDate: 2024-01-15
lastReviewed: 2025-10-15
nextReview: 2026-04-15
owner: Chief Compliance Officer
approver: VP of Mortgage Operations
compliance: [Red Flags Rule, FCRA, OFAC, BSA/AML, CIP, USA PATRIOT Act]
dependencies:
  - sop-mf-011  # Fraud Detection
  - sop-mf-005  # Wire Transfer Security
tags:
  - identity-verification
  - compliance
  - fraud-prevention
  - KYC
  - CIP

# Borrower Identity Verification Standards

## Purpose

This SOP establishes mandatory procedures for verifying the identity of all mortgage loan applicants to prevent identity theft, synthetic identity fraud, and comply with federal regulations including the Red Flags Rule, Customer Identification Program (CIP), and Bank Secrecy Act (BSA).

## Scope

Applies to ALL borrowers (primary and co-borrowers) on all mortgage loan applications regardless of loan type or amount. Includes purchase, refinance, home equity, and construction loans.

## Regulatory Framework

### Primary Regulations
- **Red Flags Rule** (12 CFR § 1026.51) - Identity Theft Prevention Program
- **Fair Credit Reporting Act (FCRA)** - Consumer report accuracy and fraud alerts
- **Customer Identification Program (CIP)** (31 CFR § 1020.220) - BSA requirement
- **USA PATRIOT Act Section 326** - Customer identification requirements
- **OFAC Regulations** (31 CFR Chapter V) - Sanctions screening
- **Gramm-Leach-Bliley Act (GLBA)** - Privacy and safeguards

### Key Compliance Requirements
- Obtain and verify identifying information for each borrower
- Maintain copy of identification documents (7 years)
- Screen against OFAC sanctions lists
- Respond to fraud alerts on credit reports
- File Suspicious Activity Reports (SARs) if fraud suspected

### Penalties for Non-Compliance
- **Red Flags Rule Violations**: Up to $5,000 per violation per day (CFPB)
- **CIP Violations**: Criminal penalties, cease and desist orders (FinCEN)
- **OFAC Violations**: Up to $20 million per violation (civil), criminal prosecution
- **Fraud Facilitation**: Lender liability for enabling identity theft/fraud

## Identity Verification Requirements

### Four Pillars of Identity Verification

All borrowers must satisfy ALL FOUR requirements:

```
1. Government-Issued Photo ID (Physical Verification)
2. Social Security Number (SSN) Validation
3. Address Verification (Proof of Residence)
4. Credit Bureau Authentication (Out-of-Wallet Questions)
```

**Exception:** If remote verification (no in-person meeting), use enhanced remote verification procedures (see Section 7).

## 1. Government-Issued Photo ID Verification

### Acceptable Forms of ID (Primary)

**U.S. Citizens and Permanent Residents:**
- ✓ State-issued driver's license (unexpired)
- ✓ State-issued ID card (unexpired)
- ✓ U.S. Passport (unexpired or expired <5 years)
- ✓ U.S. Military ID (active duty)
- ✓ Permanent Resident Card (Green Card)

**Non-U.S. Citizens (Foreign Nationals):**
- ✓ Foreign passport with U.S. visa (valid)
- ✓ Employment Authorization Document (EAD) - Form I-766
- ✓ Border Crossing Card
- ✓ Re-entry Permit

### ID Verification Checklist

**For Each Borrower:**
```
☐ ID physically inspected (in-person) OR digital copy reviewed (remote)
☐ Photo on ID matches borrower appearance (in-person) or video call (remote)
☐ Name on ID matches loan application
☐ Date of birth on ID matches loan application
☐ ID is not expired (current) OR expired <5 years (passport only)
☐ ID shows no signs of alteration/tampering
☐ ID security features validated (hologram, UV, microprint if in-person)
☐ Copy of ID retained in loan file (front and back if applicable)
```

### ID Fraud Detection - Red Flags

**Visual Inspection Red Flags:**
```
🚩 Photo appears altered or doesn't match borrower
🚩 Lamination bubbling or re-laminated
🚩 Font inconsistencies (different fonts on same ID)
🚩 Misaligned text or images
🚩 Incorrect state format (doesn't match known format for that state)
🚩 Expiration date tampered with
🚩 No hologram or hologram appears fake (if ID should have one)
🚩 Thickness inconsistent (too thick or thin)
🚩 Rough or uneven edges
🚩 Borrower reluctant to provide original for inspection
```

**If Red Flags Identified:**
1. Request secondary form of ID (passport, military ID, etc.)
2. Use ID verification technology (if available): IDology, Jumio, Socure
3. Conduct enhanced verification (see Section 5)
4. If ID confirmed fraudulent: Decline loan, report to authorities, file SAR

### ID Documentation Requirements

**Retain in Loan File:**
- High-quality color copy of government-issued photo ID (both sides)
- Label with: "ID verified by [Name] on [Date] via [in-person/video/digital submission]"
- If digital submission: Verify using ID verification software if available

**Retention:** 7 years from loan closing (or application if declined)

## 2. Social Security Number (SSN) Validation

### SSN Collection

**Required Information:**
- Full 9-digit Social Security Number
- Verification that SSN matches borrower identity

**Collection Methods:**
- Paper application (borrower writes SSN)
- Digital application (borrower enters SSN)
- Verbal (borrower states SSN, documented in file notes)

**Do NOT Accept:**
❌ Individual Taxpayer Identification Number (ITIN) in place of SSN (acceptable only if SSN not available - foreign nationals, see Section 8)
❌ Employer Identification Number (EIN)
❌ Incomplete or partial SSN

### SSN Validation Checks

**Automated Validation:**
1. **Credit Report Pull**: SSN used to pull credit report
   - If credit report returns successfully with matching name/DOB → SSN likely valid
   - If no file found → May indicate invalid SSN or thin file

2. **SSN Validation Service**: Use third-party validation (e.g., Experian, LexisNexis)
   - Verifies SSN issued by Social Security Administration (SSA)
   - Checks SSN not on Death Master File (deceased persons)
   - Verifies SSN issue date aligns with borrower's stated age

**Manual Validation:**
1. **SSN Format Check**: XXX-XX-XXXX (9 digits with dashes)
2. **Invalid SSN Ranges**:
   - 000-XX-XXXX (all zeros in area number)
   - XXX-00-XXXX (all zeros in group number)
   - XXX-XX-0000 (all zeros in serial number)
   - 666-XX-XXXX (not issued)
   - 900-99-XXXX (not issued, reserved)

3. **SSN Issue Date vs. Borrower Age**:
   - If SSN issued date <borrower's birth year → Invalid/Fraudulent
   - If SSN issued recently but borrower claims long credit history → Red flag

**Red Flags:**
```
🚩 SSN fails validation (not issued by SSA)
🚩 SSN appears on Death Master File (deceased person)
🚩 SSN issue date inconsistent with borrower age
🚩 Credit report shows fraud alert or security freeze
🚩 Multiple names associated with same SSN (credit report)
🚩 Borrower unable to provide SSN or reluctant
🚩 SSN recently issued but borrower is older (e.g., SSN issued 2023, borrower age 45)
```

**If Red Flags Identified:**
1. Request Social Security card (physical card or copy)
2. Run SSN through validation service (if not already done)
3. Pull credit report and review for fraud indicators
4. Require in-person meeting with photo ID verification
5. If SSN confirmed invalid/fraudulent: Decline loan, file SAR, report to authorities

### Social Security Card Verification (If Requested/Required)

**Acceptable:**
- Original Social Security card (physical)
- Certified copy from Social Security Administration (SSA)

**Verify:**
- Name matches borrower
- SSN matches application
- Card appears authentic (no signs of alteration)

**Retain:** Copy of Social Security card in loan file (if provided)

## 3. Address Verification (Proof of Residence)

### Purpose
Verify borrower's current residential address to:
- Confirm identity
- Detect mail forwarding schemes (fraud indicator)
- Comply with CIP requirements

### Acceptable Proof of Residence Documents

**Primary Documents** (Select ONE):
- ✓ Current utility bill (electric, gas, water, cable) - within 60 days
- ✓ Bank statement - within 60 days
- ✓ Property tax bill - current year
- ✓ Lease agreement (if renter) - current and signed
- ✓ Mortgage statement (current residence) - within 60 days
- ✓ Government correspondence (IRS, DMV, etc.) - within 12 months

**Requirements:**
- Document shows borrower's name
- Document shows current residential address (matches application)
- Document is recent (see timeframes above)

**If Address on ID Different from Application:**
- Common if borrower recently moved
- Require proof of residence showing current address
- Document explanation in file notes

### Address Verification Red Flags

```
🚩 Borrower address history on credit report doesn't match stated addresses
🚩 Mail forwarding service address (UPS Store, private mailbox, etc.)
🚩 Address is vacant lot or commercial property (Google Maps verification)
🚩 Multiple unrelated borrowers using same address
🚩 Address change shortly before application (within 30 days)
🚩 Cannot provide utility bill or lease (claims owns home but no tax bill)
🚩 Borrower unwilling or unable to provide proof of residence
```

**If Red Flags Identified:**
1. Request multiple forms of proof (utility bill + bank statement)
2. Verify address via public records (county assessor, voter registration)
3. Conduct site visit or use Google Street View to verify address exists and is residential
4. If address confirmed fraudulent: Decline loan, investigate further, file SAR if fraud suspected

## 4. Credit Bureau Authentication (Out-of-Wallet Questions)

### Purpose
Verify borrower has access to and knowledge of credit history through "out-of-wallet" knowledge-based authentication (KBA) questions.

### Process

**Step 1: Pull Credit Report**
- Standard credit report pull (tri-merge)
- If fraud alert present on report → Enhanced verification required (see Section 6)

**Step 2: Generate KBA Questions**
- Credit bureau generates 3-5 questions based on borrower's credit file
- Questions are NOT easily known by someone who stole identity (hence "out-of-wallet")

**Example Questions:**
- "Which of the following addresses have you lived at?"
- "Which of the following lenders do you have a mortgage with?"
- "What is the approximate credit limit on your XYZ Bank credit card?"
- "In what year did you open your auto loan?"

**Step 3: Administer Questions**
- Ask borrower questions (phone, in-person, or digital)
- Borrower must answer correctly (typically 3 out of 4 or 4 out of 5)
- Time limit: 2 minutes (prevents looking up answers)

**Step 4: Document Results**
```
☐ KBA administered on [Date]
☐ Borrower passed: [X] questions out of [Y] (minimum 3/4 required)
☐ If failed: Enhanced verification required
☐ Results documented in loan file
```

### If Borrower Fails KBA

**Possible Reasons:**
- Identity theft (borrower is not who they claim)
- Thin credit file (insufficient data to generate questions)
- Borrower honestly doesn't remember (elderly, many accounts)

**Actions:**
1. **Allow One Retry**: Generate new questions, administer again
2. **If Fails Again**: Enhanced verification required (see Section 5)
3. **If Passes on Retry**: Document and proceed
4. **If Fraud Suspected**: Decline, investigate, file SAR

## 5. Enhanced Identity Verification (When Required)

### When Enhanced Verification Required

**Mandatory Enhanced Verification If:**
- Borrower fails KBA (out-of-wallet questions) twice
- Fraud alert on credit report
- Security freeze on credit report (borrower must lift for application)
- Red flags identified in ID, SSN, or address verification
- High-risk indicators present (see Fraud Detection SOP sop-mf-011)
- Remote transaction with no in-person meeting

### Enhanced Verification Procedures

**Step 1: In-Person or Video Verification**
- Require in-person meeting OR live video call (Zoom, Teams, etc.)
- Borrower presents photo ID to camera
- Verify photo matches borrower in real-time
- Document: "Video verification completed [Date] with [Borrower Name], ID verified"

**Step 2: Document Verification Technology**
- Use ID verification software: IDology, Jumio, Socure, Onfido
- Software analyzes ID for authenticity (hologram, fonts, security features)
- Facial recognition matches photo ID to borrower selfie
- Document: "ID verified via [Software Name] on [Date] - Result: Pass/Fail"

**Step 3: Third-Party Database Verification**
- LexisNexis: Comprehensive identity report (address history, phone, relatives)
- Experian: Identity verification and fraud score
- Public records: Verify address history, property ownership, employment

**Step 4: Additional Documentation**
- Request multiple forms of ID (passport + driver's license)
- Request utility bills from multiple sources (electric + cable)
- Request pay stubs showing employer name and address (verify employment)
- Request prior year tax return (verify SSN, name, address consistency)

**Step 5: Secondary Contact Verification**
- Call borrower at verified phone number (from public records or employer)
- Email borrower at verified email (from prior correspondence or employer)
- Confirm loan application details verbally

**Approval Requirements:**
- Enhanced verification results reviewed by Compliance Officer
- Compliance Officer sign-off required to proceed
- If identity still questionable: Decline loan

## 6. Fraud Alert Response Procedures

### Types of Fraud Alerts

**Initial Fraud Alert** (90 days):
- Consumer suspects identity theft
- Requests alert on credit file
- Requires creditors to verify identity before issuing credit

**Extended Fraud Alert** (7 years):
- Consumer is confirmed victim of identity theft
- Filed police report or FTC Identity Theft Report
- Requires creditors to contact consumer before issuing credit

**Active Duty Military Alert** (1 year, renewable):
- Military member deployed overseas
- Protects against identity theft while deployed

### Response Procedures

**Upon Discovering Fraud Alert on Credit Report:**

**Step 1: Identify Alert Type and Instructions**
- Credit report will show: "FRAUD ALERT" with contact instructions
- Contact method specified: Phone number or address to reach consumer

**Step 2: Contact Borrower at Specified Number/Address**
- **Mandatory**: Must use contact info on fraud alert (not borrower-provided number)
- Verify borrower's identity using KBA or other enhanced methods
- Confirm borrower applied for loan and authorizes credit inquiry/loan

**Step 3: Document Contact and Verification**
```
☐ Fraud alert identified on credit report: [Type] - [Date]
☐ Borrower contacted at fraud alert phone number: [Number] on [Date]
☐ Borrower verified identity: [Method - KBA, security questions, etc.]
☐ Borrower confirmed loan application and authorized credit inquiry: Yes/No
☐ Documentation in file: Call notes, verification results
```

**Step 4: Proceed or Decline**
- If verification successful: Proceed with loan
- If cannot verify identity or reach borrower: Decline (do not issue credit)

**Penalties for Non-Compliance:**
- Issuing credit without verifying fraud alert = FCRA violation
- Civil penalties + private right of action (borrower lawsuit)
- Regulatory enforcement (CFPB)

## 7. Remote Identity Verification (No In-Person Meeting)

### Overview
For loans processed entirely remotely (online/phone), enhanced verification required.

### Remote Verification Requirements

**Must Complete ALL:**

**1. Digital ID Verification**
- Borrower uploads photo ID (front and back)
- Borrower takes selfie (facial recognition match)
- ID verification software analyzes ID authenticity
- Software: Jumio, Onfido, Socure, IDology

**2. Live Video Call**
- Schedule Zoom/Teams call with borrower
- Borrower presents photo ID to camera
- Verify face matches ID photo
- Ask borrower to answer out-of-wallet questions (KBA)
- Document: "Video call completed [Date], identity verified"

**3. Knowledge-Based Authentication (KBA)**
- Administer credit bureau out-of-wallet questions
- Passing score required (3/4 or 4/5)

**4. Multi-Factor Authentication (Login)**
- Borrower creates account on lender portal
- Email verification + SMS code (2-factor)
- Document: "Borrower verified email and phone number"

**5. Document Verification**
- Request proof of residence (utility bill, bank statement)
- Request pay stubs (verify employment and address)
- Cross-check all documents for consistency

**Compliance Officer Approval:**
- Remote verification reviewed by Compliance Officer
- Sign-off required to proceed with loan

## 8. Foreign National / Non-Resident Borrowers

### Unique Verification Challenges
- May not have U.S. driver's license
- May not have SSN (use ITIN - Individual Taxpayer Identification Number)
- May have limited U.S. credit history
- May have foreign address

### Acceptable Documentation

**Identification:**
- ✓ Foreign passport (with U.S. visa)
- ✓ Employment Authorization Document (EAD)
- ✓ Permanent Resident Card (Green Card)
- ✓ Border Crossing Card

**Taxpayer Identification:**
- ✓ SSN (if eligible)
- ✓ ITIN (Individual Taxpayer Identification Number) - if no SSN
  - Request copy of ITIN assignment letter from IRS OR
  - File Form W-7 with IRS to obtain ITIN (if borrower doesn't have)

**Address Verification:**
- ✓ U.S. address: Standard proof of residence (utility bill, lease, etc.)
- ✓ Foreign address: Bank statement, utility bill from home country, passport showing address

**Credit Verification:**
- If no U.S. credit history: Request credit report from home country (if available)
- Alternative: Non-traditional credit verification (rent payment history, utility payment history)

### Enhanced Due Diligence for Foreign Nationals

**OFAC Screening** (Mandatory):
- Screen borrower name against OFAC sanctions lists
- Screen country of origin for sanctioned countries
- Document OFAC screening result in file: "OFAC Clear - [Date]"

**Source of Funds Verification** (Anti-Money Laundering):
- Verify source of down payment (employment income, gift, wire from foreign account)
- If large wire transfer from foreign country: Request bank statements and proof of source
- If gift from foreign national: Enhanced gift documentation (relationship, source of funds)

**Visa/Employment Status:**
- Verify visa allows employment in U.S. (if applicable)
- Verify employment authorization has not expired
- Verify likelihood of continued U.S. presence (visa duration, employment contract)

## 9. OFAC Screening (Mandatory for ALL Borrowers)

### Overview
Office of Foreign Assets Control (OFAC) maintains lists of individuals and entities with whom U.S. persons are prohibited from doing business (sanctions).

### OFAC Screening Requirements

**Screen ALL Borrowers Against:**
- Specially Designated Nationals (SDN) List
- Consolidated Sanctions List
- Non-SDN Lists (sectoral sanctions, etc.)

**Screening Information:**
- Full legal name (as on ID)
- Date of birth
- Address
- Country of citizenship (if foreign national)

**Screening Tools:**
- OFAC search engine (free): https://sanctionssearch.ofac.treas.gov/
- Commercial screening software: Dow Jones, Refinitiv, Comply Advantage (more accurate)

**Frequency:**
- **Initial**: At application
- **Re-screen**: Before closing (to catch new additions to list)

### OFAC Screening Procedure

**Step 1: Run OFAC Search**
- Enter borrower full name
- Enter date of birth (if available in OFAC database)
- Review results

**Step 2: Evaluate Results**

**If NO MATCH:**
- Document: "OFAC screening completed [Date] - No Match"
- Proceed with loan

**If POTENTIAL MATCH:**
- Compare borrower details to OFAC entry (name, DOB, address, aliases)
- Determine if TRUE MATCH or FALSE POSITIVE

**TRUE MATCH Indicators:**
- Name matches exactly (or very close)
- DOB matches (if available)
- Address matches (or country matches for foreign nationals)
- Aliases match

**FALSE POSITIVE Indicators:**
- Name similar but not exact
- DOB doesn't match (or not available)
- Address/country different

**Step 3: Document Decision**

**If FALSE POSITIVE:**
- Document: "OFAC screening - Potential match reviewed, determined FALSE POSITIVE based on [DOB mismatch / address mismatch / etc.]. Cleared to proceed. Reviewed by [Name] on [Date]."
- Proceed with loan

**If TRUE MATCH:**
- **DO NOT PROCEED** with loan
- Notify OFAC within 10 days (blocking requirement)
- Freeze/block borrower's application (cannot process)
- Do NOT notify borrower (tipping off prohibited)
- Consult legal counsel immediately
- File Suspicious Activity Report (SAR)

**Step 4: Retain Documentation**
- OFAC screening results (match or no match)
- Analysis (if potential match)
- Approval to proceed (if false positive)

## 10. Record Retention and Documentation

### Required Documentation in Loan File

**For Each Borrower:**
```
☐ Copy of government-issued photo ID (front and back)
☐ SSN validation result (credit report or validation service)
☐ Proof of residence (utility bill, bank statement, etc.)
☐ Credit bureau authentication results (KBA)
☐ OFAC screening results and analysis
☐ Fraud alert response documentation (if applicable)
☐ Enhanced verification documentation (if applicable)
☐ Video call notes (if remote verification)
☐ ID verification software results (if used)
☐ Compliance officer approval (if enhanced verification required)
```

### Retention Period
- **Identity verification documentation**: 7 years from loan closing (or decline date)
- **OFAC screening**: 5 years from transaction date
- **SAR (if filed)**: 5 years from filing date (separate confidential file)

### Data Security and Privacy

**Handling Sensitive Documents:**
- Encrypt digital files containing SSN, ID copies
- Restrict access to authorized personnel only
- Do NOT email unencrypted ID copies or SSN
- Secure physical files in locked cabinets
- Dispose via shredding when retention period expires

**GLBA Compliance:**
- Privacy notice provided to borrower (how info is used/shared)
- Opt-out opportunity (if sharing with non-affiliated third parties)
- Safeguards Rule: Protect customer information from unauthorized access

## Training Requirements

### Initial Training
- 4 hours: Identity verification procedures (ID, SSN, address, KBA)
- 2 hours: Fraud alert response (FCRA compliance)
- 2 hours: OFAC screening
- 2 hours: Enhanced verification and remote verification
- 1 hour: Foreign national verification
- **Certification Required**: Pass identity verification assessment (≥95%)

### Continuing Education
- Annual refresher (4 hours)
- Quarterly updates on fraud trends and new verification tools
- Immediate training when regulations change

## Quality Control

### Pre-Closing Review (100% of Loans)

**Compliance Officer Review:**
```
☐ Photo ID copy in file (all borrowers)
☐ SSN validated (credit report pulled successfully)
☐ Proof of residence in file (all borrowers)
☐ KBA completed and passed (or enhanced verification if failed)
☐ OFAC screening completed and documented (all borrowers)
☐ Fraud alert response documented (if applicable)
☐ Enhanced verification completed (if required)
☐ All red flags addressed and resolved
```

**Sign-Off:** Compliance Officer approval required before closing

### Post-Closing Audit (Sample 20% Monthly)

**Random Sample + High-Risk Loans:**
- Foreign nationals
- Remote closings (no in-person)
- Loans with fraud alerts
- Loans with enhanced verification

**Audit Includes:**
- Verify all documentation present
- Re-run OFAC screening (confirm no match)
- Verify fraud alert response (if applicable)
- Confirm KBA passing score or enhanced verification

### Monthly Metrics Report

**Report to Management:**
- Total borrowers verified
- Fraud alerts encountered and response time
- KBA failure rate and enhanced verification required
- OFAC potential matches and resolutions
- Identity verification denials (fraud suspected)
- Average verification time (application to clearance)

## Related SOPs
- {{include: sop-mf-011}} - Fraud Detection and Prevention (identity theft fraud)
- {{include: sop-mf-005}} - Wire Transfer Security (identity verification for wires)

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.0.0 | 2025-10-15 | Added remote verification procedures, updated OFAC guidance | Chief Compliance Officer |
| 1.5.0 | 2024-07-15 | Enhanced fraud alert response procedures | Compliance Manager |
| 1.0.0 | 2024-01-15 | Initial comprehensive version | VP Mortgage Operations |

---
**Document Classification**: Internal Use - Compliance Critical
**Retention Period**: 7 years (identity verification records per CIP)
**Review Frequency**: Annual or upon regulatory changes
