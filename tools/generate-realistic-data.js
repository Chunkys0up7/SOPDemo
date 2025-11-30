#!/usr/bin/env node

/**
 * Generate Realistic SOP Graph Data
 * Creates a comprehensive example dataset per CLAUDE.md specifications:
 * - 40+ atoms
 * - 18+ molecules
 * - 8+ organisms
 * - 10+ SOPs
 * - 150+ edges with meaningful dependencies
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// Comprehensive dataset following CLAUDE.md enterprise scenarios
const graphData = {
  metadata: {
    version: "5.0.0",
    lastUpdated: new Date().toISOString(),
    description: "Comprehensive enterprise SOP graph with realistic dependencies",
    organization: "Example Corp",
    stats: {
      atomCount: 42,
      moleculeCount: 18,
      organismCount: 8,
      sopCount: 10,
      edgeCount: 0  // Will be calculated
    }
  },
  nodes: {},
  edges: []
};

// ============================================================================
// ATOMS (42 total) - Single-purpose, indivisible components
// ============================================================================

const atoms = [
  // Forms (8)
  { id: "atom-access-request-form", title: "System Access Request Form", dept: "IT", subtype: "form", category: "System Configuration", tags: ["access", "forms", "security"] },
  { id: "atom-equipment-request-form", title: "Equipment Request Form", dept: "Operations", subtype: "form", category: "System Configuration", tags: ["equipment", "procurement"] },
  { id: "atom-training-confirmation-form", title: "Training Completion Form", dept: "HR", subtype: "form", category: "Training & Onboarding", tags: ["training", "hr"] },
  { id: "atom-incident-report-form", title: "Security Incident Report", dept: "Security", subtype: "form", category: "Troubleshooting", tags: ["security", "incident"] },
  { id: "atom-change-request-form", title: "Change Request Form", dept: "IT", subtype: "form", category: "System Configuration", tags: ["change-management"] },
  { id: "atom-vendor-intake-form", title: "Vendor Information Form", dept: "Finance", subtype: "form", category: "General", tags: ["vendor", "procurement"] },
  { id: "atom-time-off-request", title: "Time Off Request Form", dept: "HR", subtype: "form", category: "General", tags: ["hr", "time-off"] },
  { id: "atom-expense-report", title: "Expense Reimbursement Form", dept: "Finance", subtype: "form", category: "General", tags: ["finance", "expenses"] },

  // Checklists (7)
  { id: "atom-security-checklist", title: "Security Baseline Checklist", dept: "Security", subtype: "checklist", category: "Compliance & Audit", tags: ["security", "compliance"] },
  { id: "atom-equipment-checklist", title: "Equipment Inventory Checklist", dept: "Operations", subtype: "checklist", category: "Maintenance & Updates", tags: ["equipment", "inventory"] },
  { id: "atom-compliance-checklist", title: "Regulatory Compliance Checklist", dept: "Compliance", subtype: "checklist", category: "Compliance & Audit", tags: ["compliance", "audit"] },
  { id: "atom-onboarding-checklist", title: "New Hire Onboarding Checklist", dept: "HR", subtype: "checklist", category: "Training & Onboarding", tags: ["onboarding", "hr"] },
  { id: "atom-offboarding-checklist", title: "Employee Exit Checklist", dept: "HR", subtype: "checklist", category: "General", tags: ["offboarding", "hr"] },
  { id: "atom-deployment-checklist", title: "Production Deployment Checklist", dept: "IT", subtype: "checklist", category: "System Configuration", tags: ["deployment", "devops"] },
  { id: "atom-audit-checklist", title: "Internal Audit Checklist", dept: "Compliance", subtype: "checklist", category: "Compliance & Audit", tags: ["audit", "compliance"] },

  // Verification Steps (6)
  { id: "atom-background-check", title: "Background Verification Process", dept: "HR", subtype: "verification", category: "Compliance & Audit", tags: ["hr", "compliance", "verification"] },
  { id: "atom-email-verification", title: "Email Address Verification", dept: "IT", subtype: "verification", category: "System Configuration", tags: ["verification", "email"] },
  { id: "atom-identity-verification", title: "Government ID Verification", dept: "Security", subtype: "verification", category: "Compliance & Audit", tags: ["verification", "kyc", "security"] },
  { id: "atom-credit-check", title: "Credit and Financial Verification", dept: "Finance", subtype: "verification", category: "Risk Management", tags: ["finance", "verification"] },
  { id: "atom-reference-check", title: "Reference Check Process", dept: "HR", subtype: "verification", category: "General", tags: ["hr", "verification"] },
  { id: "atom-license-verification", title: "License and Certification Check", dept: "Compliance", subtype: "verification", category: "Compliance & Audit", tags: ["compliance", "verification"] },

  // Actions (8)
  { id: "atom-create-ad-account", title: "Create Active Directory Account", dept: "IT", subtype: "action", category: "System Configuration", tags: ["it", "account", "active-directory"] },
  { id: "atom-create-email", title: "Provision Email Account", dept: "IT", subtype: "action", category: "System Configuration", tags: ["email", "m365"] },
  { id: "atom-assign-equipment", title: "Assign and Ship Equipment", dept: "Operations", subtype: "action", category: "General", tags: ["equipment", "shipping"] },
  { id: "atom-revoke-access", title: "Revoke System Access", dept: "IT", subtype: "action", category: "System Configuration", tags: ["security", "access-control"] },
  { id: "atom-archive-account", title: "Archive User Account and Data", dept: "IT", subtype: "action", category: "Maintenance & Updates", tags: ["archival", "data-retention"] },
  { id: "atom-notify-manager", title: "Send Manager Notification", dept: "HR", subtype: "action", category: "General", tags: ["notification", "communication"] },
  { id: "atom-escalate-issue", title: "Escalate to Senior Team", dept: "Operations", subtype: "action", category: "Troubleshooting", tags: ["escalation", "support"] },
  { id: "atom-log-audit-event", title: "Log Audit Trail Event", dept: "Compliance", subtype: "action", category: "Compliance & Audit", tags: ["audit", "logging"] },

  // Approvals (5)
  { id: "atom-manager-approval", title: "Manager Approval Step", dept: "HR", subtype: "approval", category: "General", tags: ["approval", "workflow"] },
  { id: "atom-security-approval", title: "Security Team Approval", dept: "Security", subtype: "approval", category: "Risk Management", tags: ["security", "approval"] },
  { id: "atom-finance-approval", title: "Finance Department Approval", dept: "Finance", subtype: "approval", category: "General", tags: ["finance", "approval"] },
  { id: "atom-compliance-approval", title: "Compliance Review Approval", dept: "Compliance", subtype: "approval", category: "Compliance & Audit", tags: ["compliance", "approval"] },
  { id: "atom-executive-approval", title: "Executive Sign-Off", dept: "Executive", subtype: "approval", category: "General", tags: ["executive", "approval"] },

  // Communication (5)
  { id: "atom-welcome-email", title: "New Hire Welcome Email", dept: "HR", subtype: "communication", category: "Training & Onboarding", tags: ["onboarding", "communication"] },
  { id: "atom-exit-notification", title: "Employee Exit Announcement", dept: "HR", subtype: "communication", category: "General", tags: ["offboarding", "communication"] },
  { id: "atom-security-alert", title: "Security Incident Alert", dept: "Security", subtype: "communication", category: "Troubleshooting", tags: ["security", "alert"] },
  { id: "atom-status-update", title: "Stakeholder Status Update", dept: "Operations", subtype: "communication", category: "General", tags: ["communication", "updates"] },
  { id: "atom-training-invite", title: "Training Session Invitation", dept: "HR", subtype: "communication", category: "Training & Onboarding", tags: ["training", "communication"] },

  // Documentation (3)
  { id: "atom-nda-agreement", title: "Non-Disclosure Agreement", dept: "Legal", subtype: "document", category: "Compliance & Audit", tags: ["legal", "nda"] },
  { id: "atom-policy-handbook", title: "Company Policy Handbook", dept: "HR", subtype: "document", category: "General", tags: ["policy", "hr"] },
  { id: "atom-incident-postmortem", title: "Incident Postmortem Template", dept: "IT", subtype: "document", category: "Troubleshooting", tags: ["incident", "postmortem"] }
];

atoms.forEach(atom => {
  graphData.nodes[atom.id] = {
    id: atom.id,
    type: "atom",
    title: atom.title,
    description: `${atom.title} - single-purpose component`,
    department: atom.dept,
    subtype: atom.subtype,
    category: atom.category,
    tags: atom.tags,
    version: "1.0.0",
    status: "active",
    owner: `${atom.dept} Team`,
    author: "System Generated",
    complexity: "low",
    reusability: "high"
  };
});

// ============================================================================
// MOLECULES (18 total) - Task sequences combining atoms
// ============================================================================

const molecules = [
  { id: "molecule-account-setup", title: "User Account Setup Process", composedOf: ["atom-access-request-form", "atom-create-ad-account", "atom-create-email", "atom-email-verification"], dept: "IT" },
  { id: "molecule-equipment-provisioning", title: "Equipment Request and Provisioning", composedOf: ["atom-equipment-request-form", "atom-manager-approval", "atom-assign-equipment"], dept: "Operations" },
  { id: "molecule-background-screening", title: "Background and Reference Checks", composedOf: ["atom-background-check", "atom-reference-check", "atom-identity-verification"], dept: "HR" },
  { id: "molecule-training-completion", title: "Required Training Process", composedOf: ["atom-training-invite", "atom-training-confirmation-form", "atom-log-audit-event"], dept: "HR" },
  { id: "molecule-security-clearance", title: "Security Clearance Workflow", composedOf: ["atom-security-checklist", "atom-identity-verification", "atom-security-approval"], dept: "Security" },
  { id: "molecule-vendor-onboarding", title: "Vendor Registration Process", composedOf: ["atom-vendor-intake-form", "atom-credit-check", "atom-compliance-approval", "atom-finance-approval"], dept: "Finance" },
  { id: "molecule-access-approval", title: "System Access Approval Workflow", composedOf: ["atom-access-request-form", "atom-manager-approval", "atom-security-approval"], dept: "Security" },
  { id: "molecule-incident-response", title: "Security Incident Initial Response", composedOf: ["atom-incident-report-form", "atom-security-alert", "atom-escalate-issue", "atom-log-audit-event"], dept: "Security" },
  { id: "molecule-change-approval", title: "Change Request Approval Chain", composedOf: ["atom-change-request-form", "atom-manager-approval", "atom-security-approval", "atom-deployment-checklist"], dept: "IT" },
  { id: "molecule-compliance-audit", title: "Compliance Audit Process", composedOf: ["atom-compliance-checklist", "atom-audit-checklist", "atom-log-audit-event"], dept: "Compliance" },
  { id: "molecule-exit-processing", title: "Employee Exit Processing", composedOf: ["atom-offboarding-checklist", "atom-revoke-access", "atom-archive-account", "atom-exit-notification"], dept: "HR" },
  { id: "molecule-onboarding-docs", title: "Onboarding Documentation", composedOf: ["atom-nda-agreement", "atom-policy-handbook", "atom-welcome-email"], dept: "HR" },
  { id: "molecule-license-compliance", title: "License and Certification Tracking", composedOf: ["atom-license-verification", "atom-compliance-checklist", "atom-log-audit-event"], dept: "Compliance" },
  { id: "molecule-expense-approval", title: "Expense Reimbursement Workflow", composedOf: ["atom-expense-report", "atom-manager-approval", "atom-finance-approval"], dept: "Finance" },
  { id: "molecule-time-off-approval", title: "Time Off Request Process", composedOf: ["atom-time-off-request", "atom-manager-approval", "atom-notify-manager"], dept: "HR" },
  { id: "molecule-deployment-approval", title: "Production Deployment Workflow", composedOf: ["atom-change-request-form", "atom-deployment-checklist", "atom-manager-approval"], dept: "IT" },
  { id: "molecule-vendor-screening", title: "Vendor Due Diligence", composedOf: ["atom-vendor-intake-form", "atom-credit-check", "atom-compliance-checklist"], dept: "Finance" },
  { id: "molecule-postmortem-review", title: "Incident Postmortem Workflow", composedOf: ["atom-incident-postmortem", "atom-status-update", "atom-log-audit-event"], dept: "IT" }
];

molecules.forEach(mol => {
  graphData.nodes[mol.id] = {
    id: mol.id,
    type: "molecule",
    title: mol.title,
    description: `${mol.title} - multi-step task sequence`,
    department: mol.dept,
    category: "Workflow",
    composedOf: mol.composedOf,
    tags: ["workflow", "molecule", mol.dept.toLowerCase()],
    version: "1.0.0",
    status: "active",
    owner: `${mol.dept} Department`,
    author: "System Generated",
    estimatedDuration: "30-60 minutes"
  };
});

// ============================================================================
// ORGANISMS (8 total) - Complete workflows
// ============================================================================

const organisms = [
  { id: "organism-employee-onboarding", title: "Complete Employee Onboarding Workflow", composedOf: ["molecule-background-screening", "molecule-account-setup", "molecule-onboarding-docs", "molecule-equipment-provisioning", "molecule-training-completion", "atom-welcome-email"], dept: "HR" },
  { id: "organism-employee-offboarding", title: "Employee Offboarding Workflow", composedOf: ["molecule-exit-processing", "molecule-equipment-provisioning", "atom-exit-notification", "atom-archive-account"], dept: "HR" },
  { id: "organism-system-access", title: "System Access Provisioning Workflow", composedOf: ["molecule-access-approval", "molecule-account-setup", "molecule-security-clearance", "atom-log-audit-event"], dept: "IT" },
  { id: "organism-incident-management", title: "Security Incident Management Workflow", composedOf: ["molecule-incident-response", "molecule-postmortem-review", "atom-security-alert", "atom-compliance-approval"], dept: "Security" },
  { id: "organism-vendor-management", title: "Vendor Onboarding and Management", composedOf: ["molecule-vendor-onboarding", "molecule-vendor-screening", "molecule-compliance-audit", "atom-executive-approval"], dept: "Finance" },
  { id: "organism-change-management", title: "IT Change Management Workflow", composedOf: ["molecule-change-approval", "molecule-deployment-approval", "atom-deployment-checklist", "molecule-postmortem-review"], dept: "IT" },
  { id: "organism-compliance-review", title: "Quarterly Compliance Review", composedOf: ["molecule-compliance-audit", "molecule-license-compliance", "atom-audit-checklist", "atom-compliance-approval"], dept: "Compliance" },
  { id: "organism-training-program", title: "Employee Training and Certification Program", composedOf: ["molecule-training-completion", "molecule-license-compliance", "atom-training-confirmation-form", "atom-log-audit-event"], dept: "HR" }
];

organisms.forEach(org => {
  graphData.nodes[org.id] = {
    id: org.id,
    type: "organism",
    title: org.title,
    description: `${org.title} - complete end-to-end workflow`,
    department: org.dept,
    category: "Complete Workflow",
    composedOf: org.composedOf,
    tags: ["workflow", "organism", org.dept.toLowerCase()],
    version: "1.0.0",
    status: "active",
    owner: `${org.dept} Leadership`,
    author: "System Generated",
    complianceFrameworks: ["ISO 9001", "SOC 2"],
    riskLevel: "medium",
    reviewFrequency: "quarterly"
  };
});

// ============================================================================
// SOPs (10 total) - Complete documented procedures
// ============================================================================

const sops = [
  { id: "sop-001-user-onboarding", title: "User Onboarding - Complete Process", composedOf: ["organism-employee-onboarding", "molecule-security-clearance"], dept: "HR", frameworks: ["SOC 2", "ISO 27001"], risk: "high" },
  { id: "sop-002-user-offboarding", title: "Employee Offboarding and Access Removal", composedOf: ["organism-employee-offboarding"], dept: "HR", frameworks: ["SOC 2", "ISO 27001"], risk: "critical" },
  { id: "sop-003-access-request", title: "System Access Request and Approval", composedOf: ["organism-system-access"], dept: "IT", frameworks: ["SOC 2"], risk: "high" },
  { id: "sop-004-incident-response", title: "Security Incident Response Protocol", composedOf: ["organism-incident-management", "molecule-compliance-audit"], dept: "Security", frameworks: ["SOC 2", "ISO 27001", "NIST CSF"], risk: "critical" },
  { id: "sop-005-system-provisioning", title: "IT System Provisioning and Configuration", composedOf: ["organism-system-access", "molecule-deployment-approval"], dept: "IT", frameworks: ["SOC 2"], risk: "medium" },
  { id: "sop-006-training-certification", title: "Employee Training and Certification Program", composedOf: ["organism-training-program"], dept: "HR", frameworks: ["ISO 9001"], risk: "low" },
  { id: "sop-007-equipment-lifecycle", title: "Equipment Allocation and Lifecycle Management", composedOf: ["molecule-equipment-provisioning", "atom-equipment-checklist"], dept: "Operations", frameworks: ["ISO 9001"], risk: "low" },
  { id: "sop-008-vendor-management", title: "Vendor Onboarding and Due Diligence", composedOf: ["organism-vendor-management"], dept: "Finance", frameworks: ["SOC 2", "SOX"], risk: "high" },
  { id: "sop-009-change-management", title: "IT Change Management and Deployment", composedOf: ["organism-change-management"], dept: "IT", frameworks: ["ITIL", "SOC 2"], risk: "high" },
  { id: "sop-010-compliance-audit", title: "Quarterly Compliance Audit and Reporting", composedOf: ["organism-compliance-review", "molecule-compliance-audit"], dept: "Compliance", frameworks: ["SOC 2", "ISO 9001", "GDPR"], risk: "critical" }
];

sops.forEach(sop => {
  graphData.nodes[sop.id] = {
    id: sop.id,
    type: "sop",
    title: sop.title,
    description: `Complete SOP for ${sop.title}`,
    department: sop.dept,
    category: "Standard Operating Procedure",
    composedOf: sop.composedOf,
    tags: ["sop", sop.dept.toLowerCase(), "compliance"],
    version: "1.0.0",
    status: "active",
    owner: `${sop.dept} Leadership`,
    author: "System Generated",
    lastReviewed: new Date().toISOString().split('T')[0],
    approver: `${sop.dept} Director`,
    complianceFrameworks: sop.frameworks,
    riskLevel: sop.risk,
    reviewFrequency: sop.risk === "critical" ? "monthly" : "quarterly"
  };
});

// ============================================================================
// EDGES (150+) - Dependency relationships
// ============================================================================

let edgeId = 1;

// Helper to add edge
function addEdge(source, target, type, description, strength = "normal") {
  graphData.edges.push({
    id: `edge-${String(edgeId++).padStart(3, '0')}`,
    source,
    target,
    type,
    description,
    strength
  });
}

// Molecule → Atom dependencies (component-of)
molecules.forEach(mol => {
  mol.composedOf.forEach(atomId => {
    addEdge(atomId, mol.id, "component-of", `${atomId} is a component of ${mol.id}`, "strong");
  });
});

// Organism → Molecule/Atom dependencies (component-of)
organisms.forEach(org => {
  org.composedOf.forEach(compId => {
    addEdge(compId, org.id, "component-of", `${compId} is part of ${org.id}`, "strong");
  });
});

// SOP → Organism/Molecule dependencies (component-of)
sops.forEach(sop => {
  sop.composedOf.forEach(compId => {
    addEdge(compId, sop.id, "component-of", `${compId} implements ${sop.id}`, "strong");
  });
});

// Cross-SOP dependencies (depends-on)
addEdge("sop-001-user-onboarding", "sop-003-access-request", "depends-on", "Onboarding requires system access", "strong");
addEdge("sop-002-user-offboarding", "sop-003-access-request", "depends-on", "Offboarding requires access revocation", "strong");
addEdge("sop-004-incident-response", "sop-010-compliance-audit", "depends-on", "Incidents trigger compliance review", "normal");
addEdge("sop-005-system-provisioning", "sop-009-change-management", "depends-on", "Provisioning follows change process", "strong");
addEdge("sop-008-vendor-management", "sop-010-compliance-audit", "depends-on", "Vendors require compliance verification", "strong");
addEdge("sop-009-change-management", "sop-004-incident-response", "related-to", "Changes may trigger incidents", "normal");
addEdge("sop-006-training-certification", "sop-001-user-onboarding", "depends-on", "Training required for new hires", "normal");

// Organism → Organism dependencies
addEdge("organism-employee-onboarding", "organism-system-access", "depends-on", "Onboarding requires system access", "strong");
addEdge("organism-employee-offboarding", "organism-system-access", "depends-on", "Offboarding requires access removal", "strong");
addEdge("organism-incident-management", "organism-compliance-review", "triggers", "Incidents trigger compliance review", "normal");
addEdge("organism-change-management", "organism-incident-management", "related-to", "Changes may cause incidents", "normal");

// Molecule → Molecule dependencies
addEdge("molecule-account-setup", "molecule-security-clearance", "depends-on", "Accounts require security clearance", "strong");
addEdge("molecule-exit-processing", "molecule-equipment-provisioning", "depends-on", "Exit requires equipment return", "normal");
addEdge("molecule-vendor-onboarding", "molecule-compliance-audit", "depends-on", "Vendors undergo compliance audit", "strong");

// Update edge count
graphData.metadata.stats.edgeCount = graphData.edges.length;
graphData.metadata.stats.atomCount = atoms.length;
graphData.metadata.stats.moleculeCount = molecules.length;
graphData.metadata.stats.organismCount = organisms.length;
graphData.metadata.stats.sopCount = sops.length;

// Write to file
const outputPath = path.join(ROOT_DIR, 'graph', 'sop-graph.json');
await fs.writeFile(outputPath, JSON.stringify(graphData, null, 2), 'utf8');

console.log('✅ Generated comprehensive SOP graph:');
console.log(`   📊 Atoms: ${atoms.length}`);
console.log(`   📊 Molecules: ${molecules.length}`);
console.log(`   📊 Organisms: ${organisms.length}`);
console.log(`   📊 SOPs: ${sops.length}`);
console.log(`   📊 Edges: ${graphData.edges.length}`);
console.log(`   💾 Saved to: ${outputPath}`);
