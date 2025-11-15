/**
 * Mortgage Finance RAG Knowledge Base
 * Comprehensive knowledge base for Apex Mortgage Company Finance Department
 */

const mortgageKnowledgeBase = [
  // === LOAN PROCESSING ===
  {
    sopId: 'sop-mf-001',
    sopTitle: 'Conventional Loan Processing Workflow',
    section: 'Initial Application Review',
    content: 'Upon receipt of a complete 1003 application, processor must verify: Borrower contact information and employment details, Property address and estimated value, Loan amount and program type (Conventional/FHA/VA), Income documentation requirements based on employment type (W2 employee, self-employed, retired). Initial credit pull should be ordered within 24 hours of application. Processor reviews credit for any immediate red flags: bankruptcies within 2 years, foreclosures within 3 years, collections >$5000 outstanding.',
    embedding: [0.34, 0.67, 0.23, 0.89],
    metadata: {
      department: 'Loan Processing',
      version: '4.2.0',
      avgUses: 847,
      lastUpdated: '2025-11-01',
      criticality: 'high'
    }
  },
  {
    sopId: 'sop-mf-001',
    sopTitle: 'Conventional Loan Processing Workflow',
    section: 'Document Collection Checklist',
    content: 'Required documents for conventional loans: Last 2 years W2s (all borrowers), Most recent 30 days paystubs, Last 2 months asset statements (all accounts), Full credit report (merged tri-bureau), Purchase contract or refinance authorization, Homeowners insurance declarations page, Property tax bill (if available), HOA documents (if applicable). Self-employed borrowers additionally require: Last 2 years personal tax returns (1040 with all schedules), Last 2 years business tax returns (1120/1120S/1065), Year-to-date P&L and Balance Sheet.',
    embedding: [0.23, 0.45, 0.78, 0.56],
    metadata: {
      department: 'Loan Processing',
      version: '4.2.0',
      avgUses: 1203,
      lastUpdated: '2025-11-01',
      criticality: 'critical'
    }
  },

  // === UNDERWRITING - AUS PROCESSING ===
  {
    sopId: 'sop-mf-002',
    sopTitle: 'Automated Underwriting System (AUS) Processing',
    section: 'Desktop Underwriter Submission',
    content: 'Desktop Underwriter (DU) is Fannie Mae\'s automated underwriting engine. Before submission, verify all 1003 data is accurate and complete. Key data points: Borrower SSN and employment info, Property address with correct ZIP+4, Loan amount, interest rate, term, Calculated LTV and DTI ratios, All income sources documented, All assets with 2 months statements, Complete credit report with all tradelines. Submit to DU and expect one of four findings: Approve/Eligible (best outcome - proceed to conditions), Approve/Ineligible (approved but not Fannie eligible), Refer (requires manual underwriting), Out of Scope (exceeds AUS parameters).',
    embedding: [0.67, 0.34, 0.91, 0.45],
    metadata: {
      department: 'Underwriting',
      version: '3.1.5',
      avgUses: 1243,
      lastUpdated: '2025-10-28',
      criticality: 'critical'
    }
  },
  {
    sopId: 'sop-mf-002',
    sopTitle: 'Automated Underwriting System (AUS) Processing',
    section: 'AUS Findings Interpretation',
    content: 'DU Approve/Eligible findings include specific requirements: Credit documentation (4506-C tax transcript verification), Income/employment verification type (verbal VOE, written VOE, or waived), Asset documentation and reserve requirements (typically 2-6 months PITI), Appraisal type (Full/Exterior/Desktop/Waiver), Maximum LTV allowed for the loan. Review each condition carefully. Common conditions: Verify employment 10 days before closing, Explain any large deposits over 50% of monthly income, Provide source of down payment if not from documented accounts, Clear any credit report inquiries or new accounts. All conditions must be cleared and approved before Clear to Close.',
    embedding: [0.45, 0.78, 0.23, 0.67],
    metadata: {
      department: 'Underwriting',
      version: '3.1.5',
      avgUses: 987,
      lastUpdated: '2025-10-28',
      criticality: 'critical'
    }
  },
  {
    sopId: 'sop-mf-002',
    sopTitle: 'Automated Underwriting System (AUS) Processing',
    section: 'AUS Resubmission Protocol',
    content: 'Resubmit to AUS when: Property value changes (new appraisal received), Loan terms change (rate, amount, program), Borrower financial information changes (new income, new debt), Credit score updates significantly, Rate lock occurs (to verify current pricing). Critical: If resubmission results in worse findings (Approve to Refer), STOP immediately and escalate to Senior Underwriter. Document reason for each resubmission. Compare findings before/after and save both versions to loan file. Never proceed with closing if most recent findings are not Approve/Eligible or Accept.',
    embedding: [0.56, 0.23, 0.67, 0.89],
    metadata: {
      department: 'Underwriting',
      version: '3.1.5',
      avgUses: 234,
      lastUpdated: '2025-10-28',
      criticality: 'high'
    }
  },

  // === INCOME DOCUMENTATION ===
  {
    sopId: 'sop-mf-008',
    sopTitle: 'Income Documentation and Verification Standards',
    section: 'W2 Employee Income Calculation',
    content: 'For salaried W2 employees: Obtain most recent 2 years W2s, Most recent 30 days paystubs, Verbal or written VOE (verification of employment). Calculate base salary income: Use current salary from most recent paystub, Verify 2-year history via W2s shows stability, If salary increased >20% in last year, use lower figure unless increase is permanent promotion. Calculate YTD income: Divide YTD gross income by number of months worked, Multiply by 12 to annualize, Compare to W2 income for reasonableness. Use lower of current salary or 2-year average if income is declining.',
    embedding: [0.78, 0.45, 0.34, 0.91],
    metadata: {
      department: 'Loan Processing',
      version: '3.7.2',
      avgUses: 1156,
      lastUpdated: '2025-10-25',
      criticality: 'critical'
    }
  },
  {
    sopId: 'sop-mf-008',
    sopTitle: 'Income Documentation and Verification Standards',
    section: 'Self-Employed Income Calculation',
    content: 'Self-employed borrowers (25% or greater ownership): Required docs: Last 2 years personal tax returns (1040) with all schedules, Last 2 years business tax returns (1120, 1120S, or 1065), YTD Profit & Loss statement, YTD Balance Sheet, Business license or LLC/Corp documentation. Calculate qualifying income: Start with Net Income from Schedule C or K1 (Line 1 of 1040 Schedule C), Add back: Depreciation, Depletion, Amortization (non-cash expenses), Subtract: Any one-time income or extraordinary items, Average the 2 years, Divide by 24 months to get monthly. Declining income: If Year 2 < Year 1 by >20%, use Year 2 only and document explanation. Minimum 2-year history required (no exceptions without executive approval).',
    embedding: [0.34, 0.91, 0.67, 0.45],
    metadata: {
      department: 'Loan Processing',
      version: '3.7.2',
      avgUses: 478,
      lastUpdated: '2025-10-25',
      criticality: 'critical'
    }
  },
  {
    sopId: 'sop-mf-008',
    sopTitle: 'Income Documentation and Verification Standards',
    section: 'Bonus and Overtime Income',
    content: 'Bonus and overtime income can be used if: 2-year history documented via W2s and paystubs, Income is likely to continue (verify with employer via VOE), Not declining >20% year-over-year. Calculation method: Add total bonus/OT from Year 1 W2, Add total bonus/OT from Year 2 W2, Divide by 24 to get monthly average. If current YTD bonus/OT is tracking below historical average, do not use or reduce calculation to reflect current trend. Required documentation: 2 years W2s showing bonus/OT in Box 1, Most recent paystub showing YTD figures, VOE confirming bonus/OT will continue, employer policy on eligibility.',
    embedding: [0.67, 0.56, 0.89, 0.34],
    metadata: {
      department: 'Loan Processing',
      version: '3.7.2',
      avgUses: 623,
      lastUpdated: '2025-10-25',
      criticality: 'high'
    }
  },

  // === CLOSING & FUNDING ===
  {
    sopId: 'sop-mf-004',
    sopTitle: 'Clear to Close (CTC) Verification Process',
    section: 'CTC Quality Gate Checklist',
    content: 'Before issuing Clear to Close, verify ALL of the following: ✅ All AUS conditions approved by underwriter, ✅ Final title report received and reviewed (no liens or clouds), ✅ Homeowners insurance binder received with lender named as mortgagee, ✅ Closing Disclosure (CD) issued and 3-business-day waiting period satisfied, ✅ No changed circumstances requiring revised CD, ✅ Appraisal received and reviewed (or waiver confirmed), ✅ Final employment verification completed within 10 days of closing, ✅ Credit report re-pulled if >30 days old (verify no new debt), ✅ Loan-to-Value (LTV) confirmed within program limits, ✅ All wire fraud prevention protocols completed. DO NOT issue CTC if any item is outstanding.',
    embedding: [0.89, 0.67, 0.45, 0.78],
    metadata: {
      department: 'Closing',
      version: '2.8.0',
      avgUses: 923,
      lastUpdated: '2025-10-20',
      criticality: 'critical'
    }
  },
  {
    sopId: 'sop-mf-005',
    sopTitle: 'Wire Transfer and Funding Authorization',
    section: 'Dual Approval Wire Protocol',
    content: 'All wire transfers require dual approval: First Approver: Closing Manager reviews wire amount calculation, Verifies closing disclosure cash-to-close matches wire, Confirms title company wiring instructions, Validates beneficiary account details. Second Approver: CFO or VP Finance (wires >$100K), Controller or Assistant CFO (wires $50K-$100K), Senior Closer (wires <$50K). Approval process: First approver enters wire into system, Second approver independently verifies all details, Both must electronically sign wire authorization, Wire released only after dual signatures captured. Timing: Wire must be initiated minimum 2 hours before title company deadline to ensure same-day funding.',
    embedding: [0.45, 0.89, 0.34, 0.56],
    metadata: {
      department: 'Funding',
      version: '3.3.1',
      avgUses: 891,
      lastUpdated: '2025-11-10',
      criticality: 'critical'
    }
  },
  {
    sopId: 'sop-mf-005',
    sopTitle: 'Wire Transfer and Funding Authorization',
    section: 'Fraud Prevention Verification',
    content: 'Mandatory fraud prevention steps before any wire: Verify title company wiring instructions: Call title company using phone number from independent source (NOT from email), Confirm wiring instructions verbally with title officer, Document verification call (name, time, phone number verified). Red flags that require escalation: Email with wiring instructions from new or unusual sender, Instructions that differ from previous closings with same title company, Request to wire to individual rather than company account, Urgent language or pressure to wire immediately, Instructions received after business hours or on weekend. If ANY red flag present: STOP - do not wire, Escalate to Fraud Prevention Team immediately, Call borrower to verify they have not sent wiring changes, Call title company to verify using known-good phone number.',
    embedding: [0.78, 0.34, 0.67, 0.91],
    metadata: {
      department: 'Funding',
      version: '3.3.1',
      avgUses: 891,
      lastUpdated: '2025-11-10',
      criticality: 'critical'
    }
  },

  // === COMPLIANCE - TRID ===
  {
    sopId: 'sop-mf-010',
    sopTitle: 'TRID Compliance and Disclosure Timing',
    section: 'Loan Estimate 3-Day Rule',
    content: 'Loan Estimate (LE) must be delivered within 3 business days of application receipt. Application is received when lender receives: Borrower name, Borrower income, Borrower Social Security number, Property address, Estimated property value, Loan amount sought. Delivery timeline: 3 business days to deliver LE (Saturdays count, Sundays and federal holidays do not), LE can be delivered electronically if borrower consents, Email delivery considered received 1 business day after sent, LE mailed considered received 3 business days after mailing. Document application date in LOS immediately upon receipt of 6-piece application. Set automated reminder to ensure LE delivered within 3 days.',
    embedding: [0.56, 0.78, 0.91, 0.23],
    metadata: {
      department: 'Compliance',
      version: '4.1.0',
      avgUses: 1034,
      lastUpdated: '2025-10-30',
      criticality: 'critical'
    }
  },
  {
    sopId: 'sop-mf-010',
    sopTitle: 'TRID Compliance and Disclosure Timing',
    section: 'Closing Disclosure 3-Day Waiting Period',
    content: 'Closing Disclosure (CD) must be delivered at least 3 business days before consummation (closing). Waiting period calculation: Day 1: Day after CD is received by borrower (not day sent), Count 3 full business days (Saturdays count, Sundays and holidays do not), Earliest consummation: 4th business day. Delivery methods: Email (if borrower consents): Received 1 business day after sent, Hand delivery: Received same day, Mail: Received 3 business days after mailing (use certified mail for proof). Example: CD emailed Monday at 2pm, Tuesday = received (Day 1), Wednesday (Day 2), Thursday (Day 3), Earliest closing = Friday. Critical: If ANY fees change outside tolerance, must issue revised CD and restart 3-day waiting period.',
    embedding: [0.91, 0.45, 0.67, 0.56],
    metadata: {
      department: 'Compliance',
      version: '4.1.0',
      avgUses: 967,
      lastUpdated: '2025-10-30',
      criticality: 'critical'
    }
  },
  {
    sopId: 'sop-mf-010',
    sopTitle: 'TRID Compliance and Disclosure Timing',
    section: 'Changed Circumstances and Tolerance Rules',
    content: 'Changed circumstance resets waiting period if fees increase beyond tolerance: Zero Tolerance (no increase allowed): Lender fees (origination, underwriting, processing), Transfer taxes, Fees paid to affiliates. 10% Cumulative Tolerance: Recording fees, Title services borrower can shop for (if provider selected by lender). Unlimited Tolerance: Prepaids (interest, insurance, taxes), Title services borrower shopped for (if provider selected by borrower). Valid changed circumstances: Property value decreases, Borrower-requested changes, New information discovered after LE, Credit score changes affecting pricing. Process: Document changed circumstance within 3 days of discovery, Issue revised LE or CD, If CD already issued, issue revised CD and restart 3-day wait if fees increase beyond tolerance. Maintain audit trail of all changed circumstances in loan file.',
    embedding: [0.67, 0.91, 0.34, 0.78],
    metadata: {
      department: 'Compliance',
      version: '4.1.0',
      avgUses: 456,
      lastUpdated: '2025-10-30',
      criticality: 'critical'
    }
  },

  // === QUALITY CONTROL ===
  {
    sopId: 'sop-mf-006',
    sopTitle: 'Post-Closing Quality Control Audit',
    section: 'Loan File Sampling Methodology',
    content: 'QC Department performs post-close audits on minimum 10% of all funded loans monthly: Random sampling: At least 5% truly random selection, Discretionary sampling: At least 5% targeted selection based on: New loan officers, New processors/underwriters, High-dollar loans (>$800K), Complex transactions (self-employed, multiple properties), Loans with exceptions or waivers, Investor-specific focus areas. Sampling completed within 5 days of month-end. All sampled files must be audited within 30 days of funding. Results reported to executive team and investor by 15th of following month.',
    embedding: [0.34, 0.67, 0.78, 0.45],
    metadata: {
      department: 'Quality Control',
      version: '4.0.0',
      avgUses: 312,
      lastUpdated: '2025-10-15',
      criticality: 'high'
    }
  },
  {
    sopId: 'sop-mf-006',
    sopTitle: 'Post-Closing Quality Control Audit',
    section: 'Critical Defect Identification',
    content: 'Critical defects (require immediate remediation): Income calculation errors >5% (e.g., self-employed income miscalculated), LTV calculation errors resulting in exceeding program limits, Missing required documentation for AUS approval (4506-C, VOE, insurance), TRID violations (incorrect waiting periods, tolerance violations), Fraud indicators not properly investigated, Appraisal defects (comparable selection issues, value discrepancies), Title defects (missed liens, incorrect vesting). Finding classification: Insignificant: Minor documentation issues, no impact, Moderate: Documentation issues, minimal impact on decision, Significant: Could impact loan decision but complies with guidelines, Critical: Material defect, potential investor repurchase risk. Critical defects reported to Chief Underwriter within 24 hours. Remediation plan required within 5 business days.',
    embedding: [0.89, 0.56, 0.23, 0.67],
    metadata: {
      department: 'Quality Control',
      version: '4.0.0',
      avgUses: 187,
      lastUpdated: '2025-10-15',
      criticality: 'critical'
    }
  },

  // === FHA LOANS ===
  {
    sopId: 'sop-mf-003',
    sopTitle: 'FHA Loan Underwriting Standards',
    section: 'FHA Debt-to-Income Requirements',
    content: 'FHA maximum debt-to-income (DTI) ratios: Front-end ratio (PITI only): 31% maximum (with compensating factors can go to 40%), Back-end ratio (total debt): 43% maximum (with compensating factors can go to 50%). Compensating factors allowing higher DTI: Minimal increase in housing payment (within 5%), Significant residual income after debt payments, Excellent credit history (700+ score), Substantial cash reserves (>3 months PITI), Borrower demonstrated ability to accumulate savings. FHA allows manual underwriting for DTI >43% if: At least one compensating factor present, Credit score ≥580, Housing payment increase <$100/month, Full documentation of ability to handle higher debt load.',
    embedding: [0.45, 0.78, 0.56, 0.91],
    metadata: {
      department: 'Government Loans',
      version: '5.0.2',
      avgUses: 456,
      lastUpdated: '2025-11-05',
      criticality: 'high'
    }
  },

  // === FRAUD DETECTION ===
  {
    sopId: 'sop-mf-012',
    sopTitle: 'Fraud Detection and Reporting Procedures',
    section: 'Red Flag Indicators',
    content: 'Income/Employment fraud indicators: Paystubs with rounded numbers (e.g., exactly $5,000.00 every pay period), Check numbers on paystubs not in sequence, YTD income significantly higher than prior W2s without explanation, Employer phone number goes to cell phone or answering service, Employer address is residential or UPS store. Asset fraud indicators: Bank statements with font inconsistencies, Account balances with unusual round numbers, Large deposits immediately before application, Statements missing bank logo or standard formatting, Transaction history does not match typical spending patterns. If 2+ red flags present: Conduct enhanced verification (call employer directly, order VOD from bank), Document additional verification steps, Escalate to Fraud Prevention Team, DO NOT PROCEED until fraud risk cleared.',
    embedding: [0.78, 0.67, 0.91, 0.34],
    metadata: {
      department: 'Fraud Prevention',
      version: '3.0.5',
      avgUses: 87,
      lastUpdated: '2025-11-12',
      criticality: 'critical'
    }
  }
];

// Sample mortgage-specific queries with expected responses
const mortgageExampleQueries = [
  {
    query: "How do I calculate self-employed income for a borrower with 2 years of tax returns?",
    category: "income-calculation",
    expectedSOPs: ["sop-mf-008"],
    responseType: "procedure"
  },
  {
    query: "What are the steps to submit a loan to Desktop Underwriter?",
    category: "underwriting",
    expectedSOPs: ["sop-mf-002"],
    responseType: "step-by-step"
  },
  {
    query: "When can I issue Clear to Close for a conventional loan?",
    category: "closing",
    expectedSOPs: ["sop-mf-004", "sop-mf-010"],
    responseType: "checklist"
  },
  {
    query: "What is the TRID 3-day waiting period for Closing Disclosure?",
    category: "compliance",
    expectedSOPs: ["sop-mf-010"],
    responseType: "regulation"
  },
  {
    query: "How do I prevent wire fraud when sending closing funds?",
    category: "fraud-prevention",
    expectedSOPs: ["sop-mf-005", "sop-mf-012"],
    responseType: "protocol"
  },
  {
    query: "What happens if Desktop Underwriter findings change from Approve to Refer?",
    category: "troubleshooting",
    expectedSOPs: ["sop-mf-002"],
    responseType: "escalation"
  },
  {
    query: "Create a checklist for processing an FHA loan from application to closing",
    category: "workflow",
    expectedSOPs: ["sop-mf-003", "sop-mf-001", "sop-mf-010"],
    responseType: "checklist-generation"
  }
];

// User journey paths through the SOP system
const mortgageUserJourneys = [
  {
    persona: "Maria Gonzalez - Loan Processor",
    scenario: "Processing new conventional purchase loan",
    path: [
      {
        step: 1,
        action: "Review initial application",
        sop: "sop-mf-001",
        section: "Initial Application Review",
        timeSpent: "8 minutes",
        tools: ["LOS", "SOP Viewer"]
      },
      {
        step: 2,
        action: "Verify income documentation requirements",
        sop: "sop-mf-008",
        section: "W2 Employee Income Calculation",
        timeSpent: "12 minutes",
        tools: ["SOP Viewer", "Income Calculator"]
      },
      {
        step: 3,
        action: "Check TRID timing for Loan Estimate",
        sop: "sop-mf-010",
        section: "Loan Estimate 3-Day Rule",
        timeSpent: "5 minutes",
        tools: ["SOP Viewer", "Compliance Calendar"]
      },
      {
        step: 4,
        action: "Prepare file for AUS submission",
        sop: "sop-mf-002",
        section: "Pre-Submission File Review",
        timeSpent: "15 minutes",
        tools: ["SOP Viewer", "DU Interface"]
      }
    ],
    totalTime: "40 minutes",
    sopReferences: 4,
    outcome: "Loan submitted to DU with Approve/Eligible findings"
  },
  {
    persona: "James Thompson - Senior Underwriter",
    scenario: "Reviewing complex self-employed borrower file",
    path: [
      {
        step: 1,
        action: "Review AUS findings and conditions",
        sop: "sop-mf-002",
        section: "AUS Findings Interpretation",
        timeSpent: "10 minutes",
        tools: ["SOP Viewer", "LOS"]
      },
      {
        step: 2,
        action: "Calculate self-employed income from tax returns",
        sop: "sop-mf-008",
        section: "Self-Employed Income Calculation",
        timeSpent: "25 minutes",
        tools: ["SOP Viewer", "Excel", "Tax Return Analyzer"]
      },
      {
        step: 3,
        action: "Check if exception approval needed for DTI",
        sop: "sop-mf-011",
        section: "Exception Request Form",
        timeSpent: "8 minutes",
        tools: ["SOP Viewer", "Exception Portal"]
      },
      {
        step: 4,
        action: "Review appraisal for complex property",
        sop: "sop-mf-009",
        section: "Appraisal Quality Check",
        timeSpent: "18 minutes",
        tools: ["SOP Viewer", "UCDP"]
      }
    ],
    totalTime: "61 minutes",
    sopReferences: 4,
    outcome: "Loan approved with exception for DTI 48% (compensating factors documented)"
  },
  {
    persona: "Emily Watson - Closing Coordinator",
    scenario: "Preparing file for closing - day before settlement",
    path: [
      {
        step: 1,
        action: "Verify all Clear to Close requirements met",
        sop: "sop-mf-004",
        section: "CTC Quality Gate Checklist",
        timeSpent: "12 minutes",
        tools: ["SOP Viewer", "LOS Conditions"]
      },
      {
        step: 2,
        action: "Confirm TRID 3-day waiting period satisfied",
        sop: "sop-mf-010",
        section: "Closing Disclosure 3-Day Waiting Period",
        timeSpent: "6 minutes",
        tools: ["SOP Viewer", "Compliance Calendar"]
      },
      {
        step: 3,
        action: "Prepare wire transfer authorization",
        sop: "sop-mf-005",
        section: "Dual Approval Wire Protocol",
        timeSpent: "10 minutes",
        tools: ["SOP Viewer", "Wire System"]
      },
      {
        step: 4,
        action: "Verify title company wiring instructions",
        sop: "sop-mf-005",
        section: "Fraud Prevention Verification",
        timeSpent: "8 minutes",
        tools: ["SOP Viewer", "Phone", "Email"]
      },
      {
        step: 5,
        action: "Check lien position and subordination",
        sop: "sop-mf-014",
        section: "Title Clearance Workflow",
        timeSpent: "7 minutes",
        tools: ["SOP Viewer", "Title Portal"]
      }
    ],
    totalTime: "43 minutes",
    sopReferences: 5,
    outcome: "Wire sent successfully, loan funded same day"
  }
];

// Usage analytics for dashboard
const mortgageUsageAnalytics = {
  overview: {
    totalLoans: 12847,
    mtdLoans: 1034,
    avgProcessingTime: "18 days",
    complianceScore: 98.7,
    sopAdoptionRate: 91.0,
    activeSO Pensions: 142
  },
  topSOPs: [
    {
      id: "sop-mf-008",
      title: "Income Documentation",
      department: "Processing",
      monthlyUses: 1156,
      trend: "+12%",
      avgTimeSpent: "14 min",
      satisfactionScore: 4.7
    },
    {
      id: "sop-mf-002",
      title: "AUS Processing",
      department: "Underwriting",
      monthlyUses: 1243,
      trend: "+8%",
      avgTimeSpent: "11 min",
      satisfactionScore: 4.8
    },
    {
      id: "sop-mf-010",
      title: "TRID Compliance",
      department: "Compliance",
      monthlyUses: 1034,
      trend: "+15%",
      avgTimeSpent: "9 min",
      satisfactionScore: 4.6
    },
    {
      id: "sop-mf-004",
      title: "Clear to Close",
      department: "Closing",
      monthlyUses: 923,
      trend: "+6%",
      avgTimeSpent: "13 min",
      satisfactionScore: 4.9
    },
    {
      id: "sop-mf-005",
      title: "Wire Transfer",
      department: "Funding",
      monthlyUses: 891,
      trend: "+4%",
      avgTimeSpent: "10 min",
      satisfactionScore: 4.8
    }
  ],
  departmentMetrics: {
    processing: {
      teamSize: 42,
      sopAdoption: 94.2,
      avgSOPsPerLoan: 4.3,
      timeSaved: "32 hours/week"
    },
    underwriting: {
      teamSize: 38,
      sopAdoption: 96.1,
      avgSOPsPerLoan: 3.8,
      timeSaved: "28 hours/week"
    },
    closing: {
      teamSize: 28,
      sopAdoption: 89.7,
      avgSOPsPerLoan: 3.2,
      timeSaved: "21 hours/week"
    }
  },
  weeklyTrends: [
    { week: "Week 1", sopViews: 3421, edits: 12, newSOPs: 0 },
    { week: "Week 2", sopViews: 3789, edits: 18, newSOPs: 1 },
    { week: "Week 3", sopViews: 4102, edits: 15, newSOPs: 0 },
    { week: "Week 4", sopViews: 3956, edits: 21, newSOPs: 2 }
  ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mortgageKnowledgeBase,
    mortgageExampleQueries,
    mortgageUserJourneys,
    mortgageUsageAnalytics
  };
}
