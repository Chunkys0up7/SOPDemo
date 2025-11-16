---
id: molecule-expense-submission
type: molecule
version: 1.0.0
title: Expense Report Submission Workflow
tags: [finance, expenses, reimbursement]
composedOf: [atom-expense-report-form, molecule-approval-chain]
dependencies:
  - atom-expense-report-form (v1.2.0+)
  - molecule-approval-chain (v1.0.0+)
---

# Expense Report Submission Workflow

## Overview

This workflow guides employees through submitting business expenses for reimbursement. Proper documentation and approval ensures timely reimbursement.

## Before You Begin

### Eligible Expenses

✅ **Reimbursable**:

- Business travel (airfare, hotels, ground transportation)
- Client meetings and entertainment
- Business supplies and equipment
- Professional development (approved training, conferences)
- Mileage (business use of personal vehicle)
- Home office expenses (if approved)

❌ **Not Reimbursable**:

- Commuting to/from office
- Personal meals (unless traveling)
- Alcohol (unless client entertainment with approval)
- Traffic tickets or parking violations
- Personal entertainment or shopping
- Upgrades (first class, premium services) without approval

### Documentation Requirements

**Always keep**:

- Original itemized receipts (not just credit card slips)
- Business purpose notes
- Attendee names for meals/entertainment
- Mileage logs with start/end locations

## Submission Workflow

### Step 1: Gather Documentation

**For each expense, collect**:

- [ ] Itemized receipt (required for amounts > $25)
- [ ] Credit card statement (if applicable)
- [ ] Conference/event registration confirmation
- [ ] Mileage log (if claiming mileage)
- [ ] Meeting attendee list (for meals/entertainment)

**Photo/Scan receipts immediately** - thermal receipts fade quickly!

### Step 2: Complete Expense Form

{{include: expense-report-form}}

**Tips for accuracy**:

- Round to nearest dollar
- Group similar expenses by date/category
- Provide clear descriptions (not just "Lunch")
- Include purpose: "Client meeting with ABC Corp - Contract negotiation"

### Step 3: Submit for Approval

**Approval workflow based on amount**:

{{include: approval-chain}}

**Standard Approval Thresholds**:

- **< $100**: Auto-approved (manager notified)
- **$100 - $500**: Manager approval required
- **$501 - $5,000**: Manager + Finance approval
- **> $5,000**: Manager + Finance + VP approval

### Step 4: Upload to System

1. Login to **expenses.company.com**
2. Click "New Expense Report"
3. Fill in report details:
   - Report name: "Month Year - Your Name"
   - Report period dates
   - Business purpose summary
4. Add expense line items:
   - Date, category, vendor, amount, description
5. Upload receipt images:
   - Clear, readable photos
   - All four corners visible
   - No blurry or cut-off receipts
6. Submit for approval

**System auto-checks**:

- Policy compliance
- Missing receipts
- Duplicate expenses
- Out-of-policy amounts

### Step 5: Manager Review

Your manager will:

- Review business purpose
- Verify policy compliance
- Approve or reject with comments
- Typical turnaround: 2-3 business days

**If rejected**:

- Review rejection reason
- Make requested corrections
- Resubmit with explanations

### Step 6: Finance Processing

Finance team will:

- Verify documentation completeness
- Check approval chain
- Process for payment
- Typical turnaround: 3-5 business days

### Step 7: Reimbursement

**Payment method**:

- **Direct deposit**: 5-7 business days after final approval
- **Check**: 10-12 business days after final approval

**Track your reimbursement**:

- Check expense system for status
- Email notification when approved
- Email notification when paid

## Special Scenarios

### Corporate Credit Card Expenses

If you have a company card:

1. Still submit expense report
2. Mark as "Corporate Card" not "Reimbursement"
3. Attach same documentation
4. Purpose: Reconciliation, not reimbursement
5. Due within 30 days of expense

### Conference/Travel Advances

For major travel expenses:

1. Request advance 2 weeks before travel
2. Submit advance request form
3. Receive funds before trip
4. Submit final expense report within 10 days of return
5. Pay back or receive difference

### Mileage Reimbursement

**Current IRS rate**: $0.67/mile

**Required documentation**:

- Date of travel
- Starting location (usually home or office)
- Destination(s)
- Business purpose
- Odometer readings or mapping tool printout
- Total miles

**Example log**:
| Date | From | To | Purpose | Miles |
|------|------|-----|---------|-------|
| 11/5 | Office | Client Site A | Sales meeting | 42 |
| 11/5 | Client Site A | Office | Return | 42 |

### International Travel

Additional requirements:

- Currency conversion (use date of transaction rate)
- Original receipts in foreign currency
- Converted amounts in USD
- VAT receipts (if claiming tax recovery)

## Policy Limits

### Meals

| Meal | Limit | Notes |
|------|-------|-------|
| Breakfast | $15 | When traveling |
| Lunch | $20 | Business or travel |
| Dinner | $40 | Business or travel |
| Group dinner | $75/person | With approval |

### Lodging

- Reasonable hotel rates for location
- Compare to government per diem rates
- Extended stay: Consider negotiated rates
- Personal nights: Prorate room cost

### Ground Transportation

- Taxis/rideshare: Reasonable
- Rental car: Economy/mid-size preferred
- Personal car: Mileage rate
- Parking: Retain all receipts

## Common Mistakes to Avoid

❌ **Don't**:

- Submit expenses months after they occurred
- Lose receipts (photograph immediately!)
- Forget to document business purpose
- Exceed policy limits without pre-approval
- Mix personal and business expenses
- Submit without manager pre-approval for large amounts

✓ **Do**:

- Submit expenses monthly
- Photograph receipts immediately
- Provide clear, specific descriptions
- Pre-approve unusual expenses
- Separate business from personal
- Follow up if not reimbursed within expected timeframe

## Troubleshooting

### "Missing Receipt" Error

- Upload clear photo of receipt
- For lost receipts < $25: Complete missing receipt affidavit
- For lost receipts > $25: Manager approval required

### "Out of Policy" Warning

- Review policy limits
- Add explanation/justification
- Obtain pre-approval for exception
- Consider if truly business necessary

### Delay in Reimbursement

- Check expense system status
- Verify all approvals received
- Contact finance after 10 business days
- Email: finance-expenses@company.com

## Audit and Compliance

**Random audits** may require:

- Additional documentation
- Explanation of business purpose
- Manager attestation
- Policy compliance verification

**Violations may result in**:

- Reimbursement denial
- Repayment requirement
- Disciplinary action
- Loss of travel privileges

## Questions?

- **Policy questions**: finance-policy@company.com
- **System issues**: it-support@company.com
- **Reimbursement status**: finance-expenses@company.com
- **Manager approval**: Contact your manager directly

---
**Last Updated**: 2025-10-15
**Owner**: Finance Department
**Policy Document**: Employee Expense Reimbursement Policy v2.3
**Processing SLA**: 7-10 business days total
