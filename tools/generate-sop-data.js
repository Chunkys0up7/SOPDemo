#!/usr/bin/env node

/**
 * SOP Data Generator
 *
 * Generates sample SOPs, organisms, molecules, and atoms following the enhanced
 * template structure with comprehensive metadata for searchability, reusability,
 * and adaptability.
 *
 * Based on best practices from SOP template analysis:
 * - Hybrid/component-based architecture
 * - Rich structured metadata
 * - Decision logic pathways
 * - Quality checkpoints
 * - Troubleshooting matrices
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../config/sop-config.json'), 'utf8')
);

// Taxonomy data from config
const taxonomies = config.metadata.taxonomies;

// Sample data for generation
const sampleData = {
  atoms: {
    prefixes: ['login', 'verification', 'approval', 'notification', 'form', 'checklist', 'validation'],
    suffixes: ['procedure', 'step', 'process', 'workflow', 'check']
  },
  molecules: {
    prefixes: ['account', 'document', 'system', 'user', 'data', 'security', 'compliance'],
    suffixes: ['setup', 'review', 'processing', 'management', 'verification']
  },
  organisms: {
    prefixes: ['complete', 'comprehensive', 'full', 'end-to-end'],
    suffixes: ['onboarding', 'workflow', 'process', 'procedure', 'lifecycle']
  }
};

/**
 * Generate a random date within the last year
 */
function getRandomDate(daysAgo = 365) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString().split('T')[0];
}

/**
 * Generate a future date for reviews
 */
function getFutureDate(daysAhead = 90) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0];
}

/**
 * Get random item from array
 */
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get multiple random items from array
 */
function randomMultiple(array, count = 2) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Generate Atom component
 */
function generateAtom(id, department) {
  const prefix = random(sampleData.atoms.prefixes);
  const suffix = random(sampleData.atoms.suffixes);
  const title = `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} ${suffix.charAt(0).toUpperCase() + suffix.slice(1)}`;

  const processCategory = random(taxonomies.processCategories);
  const complexity = random(taxonomies.complexity);
  const audience = randomMultiple(taxonomies.audience, 2);
  const keywords = [prefix, suffix, department.toLowerCase()];
  const tags = randomMultiple(['reusable', 'core', 'standard', 'required', 'optional'], 3);

  return `---
# Core Metadata (Required)
id: ${id}
type: atom
version: 1.0.0
title: ${title}

# Searchability Metadata
department: ${department}
processCategory: ${processCategory}
complexity: ${complexity}
audience:
${audience.map(a => `  - ${a}`).join('\n')}

# Taxonomy & Discovery
tags: [${tags.join(', ')}]
keywords: [${keywords.join(', ')}]

# Compliance & Regulatory
complianceFrameworks: []

# Reusability Tracking
reusable: true
usedIn: []
variationCount: 1

# Ownership & Governance
owner: ${department} Department
maintainer: ${department} Team Lead
approver: ${department} Director
lastReviewed: ${getRandomDate(180)}
nextReview: ${getFutureDate(90)}
---

# ${title}

## Purpose

This component provides a standardized ${prefix} ${suffix} that ensures consistency and compliance across all ${department.toLowerCase()} operations.

## Description

The ${title} component is a reusable atomic element designed to be included in larger procedures. It provides a single-purpose, focused set of instructions for performing ${prefix} activities.

## Scope

**Included:**
- Standard ${prefix} procedures
- Required verification steps
- Documentation requirements

**Excluded:**
- Advanced ${prefix} scenarios (see advanced variation)
- Exception handling (handled at molecule level)

## Applicability

**Use this component when:**
- Performing routine ${prefix} operations
- Standard ${suffix} is required
- No exceptions or special circumstances exist

**Do NOT use this component when:**
- Advanced configuration is needed
- Emergency procedures are in effect
- Exceptions have been approved

## Content

### Step 1: Prepare for ${prefix.charAt(0).toUpperCase() + prefix.slice(1)}

1. Verify all prerequisites are met
2. Gather required information:
   - Item 1
   - Item 2
   - Item 3
3. Confirm access to required systems

### Step 2: Execute ${prefix.charAt(0).toUpperCase() + prefix.slice(1)}

1. Open the ${suffix} interface
2. Enter required information
3. Validate all fields are complete
4. Submit for processing

### Step 3: Verify Completion

1. Check for confirmation message
2. Verify all data was captured correctly
3. Save confirmation for records

### Key Points

- Always verify prerequisites before beginning
- Double-check all entered information
- Keep confirmation records for audit purposes
- Escalate any issues immediately

## Decision Logic

**Decision Point**: Verification Result

- **IF** verification passes → Proceed to next step in parent procedure
- **IF** verification fails with minor issues → Retry once
- **IF** verification fails twice → Escalate to supervisor
- **OTHERWISE** → See Troubleshooting section

## Quality Checkpoints

| Checkpoint | Verification Criteria | Owner | Recovery Path |
|------------|----------------------|-------|---------------|
| Pre-execution | All prerequisites met | User | Gather missing information |
| Post-execution | Confirmation received | User | Retry submission |
| Final check | Data validated | Supervisor | Investigate and correct |

## Troubleshooting

| Issue | Root Cause | Solution | Escalation Condition |
|-------|------------|----------|---------------------|
| Cannot access system | Credentials expired | Reset password | More than 3 failed attempts |
| Validation error | Missing required field | Complete all marked fields | Field not visible in form |
| Timeout error | System overload | Wait 5 minutes and retry | More than 2 timeouts |

## Usage Notes

- This component is used in multiple ${department.toLowerCase()} procedures
- Ensure you have the latest version before using
- Report any issues to ${department} Team Lead
- Estimated completion time: 5-10 minutes

## Reusability Information

**Currently used in:**
- [To be populated by build process]

**Available variations:**
- Standard: Default configuration for most use cases
- Quick: Streamlined version for urgent situations
- Detailed: Enhanced version with additional verification steps

**Configuration points:**
- Timeout duration: Can be adjusted based on system load
- Retry attempts: Configurable based on criticality
- Escalation threshold: Adjustable per team policy

## Related Components

- See parent molecules and organisms for full workflow context
- Related atoms: [To be determined based on usage]

---

## Document Control

**Version**: 1.0.0
**Last Updated**: ${getRandomDate(180)}
**Owner**: ${department} Department
**Maintainer**: ${department} Team Lead
**Next Review**: ${getFutureDate(90)}

**Change Log:**
- v1.0.0 (${getRandomDate(180)}): Initial release - ${department} Team
`;
}

/**
 * Generate Molecule component
 */
function generateMolecule(id, department, atomIds) {
  const prefix = random(sampleData.molecules.prefixes);
  const suffix = random(sampleData.molecules.suffixes);
  const title = `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} ${suffix.charAt(0).toUpperCase() + suffix.slice(1)}`;

  const processCategory = random(taxonomies.processCategories);
  const complexity = random(['Intermediate', 'Advanced']);
  const audience = randomMultiple(taxonomies.audience, 2);
  const keywords = [prefix, suffix, department.toLowerCase(), 'multi-step'];
  const tags = randomMultiple(['workflow', 'standard', 'required', 'core', 'critical'], 3);
  const estimatedDuration = random(['15-30 minutes', '30-60 minutes', '1-2 hours']);

  return `---
# Core Metadata (Required)
id: ${id}
type: molecule
version: 1.0.0
title: ${title}

# Searchability Metadata
department: ${department}
processCategory: ${processCategory}
complexity: ${complexity}
audience:
${audience.map(a => `  - ${a}`).join('\n')}

# Taxonomy & Discovery
tags: [${tags.join(', ')}]
keywords: [${keywords.join(', ')}]
estimatedDuration: ${estimatedDuration}

# Compliance & Regulatory
complianceFrameworks: []

# Component Composition
composedOf: [${atomIds.join(', ')}]
dependencies:
${atomIds.map(id => `  - ${id} (v1.0.0+)`).join('\n')}

# Reusability Tracking
reusable: true
usedIn: []
variationCount: 1

# Ownership & Governance
owner: ${department} Department
maintainer: ${department} Team Lead
approver: ${department} Director
lastReviewed: ${getRandomDate(180)}
nextReview: ${getFutureDate(90)}
---

# ${title}

## Purpose

This procedure ensures consistent and compliant ${prefix} ${suffix} across the ${department} department, supporting critical business operations.

## Overview

The ${title} procedure is a multi-step workflow that combines several atomic components to achieve complete ${prefix} ${suffix}. This procedure is essential for maintaining operational excellence and regulatory compliance.

## Scope

**This procedure includes:**
- Complete ${prefix} workflow from initiation to completion
- Quality verification at each step
- Exception handling and escalation procedures

**This procedure does NOT include:**
- Advanced ${prefix} scenarios (see advanced procedure)
- Emergency bypass procedures (requires VP approval)

## Applicability

**Use this procedure for:**
- Standard ${prefix} ${suffix} operations
- Routine operational requirements
- Compliance-driven activities

**Prerequisites**

Before starting, verify:
- [ ] Required system access is active
- [ ] All prerequisite training is completed
- [ ] Required documentation is available
- [ ] Approvals are in place (if required)

## Components Used

This molecule combines the following atoms:

${atomIds.map(id => `
### {{include: ${id}}}

**Usage in this procedure:** This component handles a critical step in the ${prefix} workflow.
`).join('\n')}

## Procedure Steps

### Step 1: Initiate ${prefix.charAt(0).toUpperCase() + prefix.slice(1)}

**Estimated time:** 5-10 minutes
**Owner:** ${random(audience)}

Begin the ${prefix} ${suffix} process by gathering all required information and verifying prerequisites.

1. Log into the ${prefix} system
2. Navigate to ${suffix} module
3. Select "Create New ${prefix.charAt(0).toUpperCase() + prefix.slice(1)}"
4. Verify your permissions allow ${suffix}

**Quality Checkpoint:**
- [ ] System access confirmed
- [ ] Required fields are visible
- [ ] User has appropriate permissions

**Decision Point:**
- **IF** all prerequisites met → Proceed to Step 2
- **IF** missing permissions → Request access from IT (see {{atom-id}})
- **IF** system unavailable → Check system status and retry

### Step 2: Execute Core ${prefix.charAt(0).toUpperCase() + prefix.slice(1)} Workflow

**Estimated time:** 10-15 minutes
**Owner:** ${random(audience)}

Complete the primary ${prefix} activities using the standard workflow.

{{include: ${atomIds[0]}}}

**Additional context:** Ensure all data entered is validated against source documentation.

**Quality Checkpoint:**
- [ ] All required fields completed
- [ ] Data validation passed
- [ ] Confirmation received

### Step 3: Verify and Finalize

**Estimated time:** 5-10 minutes
**Owner:** Manager/Supervisor

Review and approve the ${prefix} ${suffix} work.

1. Review all entered information for accuracy
2. Verify compliance with ${department} policies
3. Approve and submit for processing
4. Save confirmation documentation

**Quality Checkpoint:**
- [ ] Independent review completed
- [ ] All policies followed
- [ ] Confirmation saved to file

## Expected Outcome

**Success criteria:**
- [ ] All quality checkpoints passed
- [ ] Final approval obtained
- [ ] Documentation complete and filed

**Result:** ${prefix.charAt(0).toUpperCase() + prefix.slice(1)} ${suffix} is complete and compliant with all ${department} requirements.

## Quality Assurance

| Checkpoint | Verification Criteria | Owner | Recovery Path |
|------------|----------------------|-------|---------------|
| Post-Step 1 | Prerequisites verified | User | Complete missing items |
| Post-Step 2 | Data validated | User | Correct validation errors |
| Final Check | Supervisor approved | Supervisor | Return for corrections |

## Troubleshooting

| Issue | Symptoms | Root Cause | Solution | Escalation Condition |
|-------|----------|------------|----------|---------------------|
| Process won't start | Error message on login | System maintenance | Check status page, retry in 1 hour | System down > 2 hours |
| Data validation fails | Red error messages | Missing required info | Complete all marked fields | Field requirements unclear |
| Approval timeout | No response after 24 hours | Approver unavailable | Escalate to backup approver | > 48 hours no response |

## Exception Handling

**Common exceptions:**

1. **Exception:** Urgent processing required
   - **Action:** Use expedited workflow (requires manager approval)
   - **Approval required:** Yes - Department Manager

2. **Exception:** Standard process does not apply
   - **Action:** Use custom workflow (requires director approval)
   - **Approval required:** Yes - Department Director

## Compliance Notes

This procedure supports compliance with ${department} policies and applicable regulations. All steps must be completed as documented unless an approved exception is in place.

## Reusability Information

**Currently used in:**
- [To be populated by build process]

**Available variations:**
- Standard: Default workflow for typical scenarios
- Expedited: Fast-track version for urgent situations (requires approval)

**Configuration points:**
- Approval thresholds: Adjustable based on dollar amount or risk level
- Escalation timing: Configurable per team SLA

## Related Procedures

- See parent organisms for complete end-to-end workflows
- Related molecules: [To be determined based on usage]

---

## Document Control

**Version**: 1.0.0
**Last Updated**: ${getRandomDate(180)}
**Owner**: ${department} Department
**Maintainer**: ${department} Team Lead
**Approver**: ${department} Director
**Next Review**: ${getFutureDate(90)}

**Change Log:**
- v1.0.0 (${getRandomDate(180)}): Initial release - ${department} Team

**Dependency Version Requirements:**
${atomIds.map(id => `- ${id}: v1.0.0+`).join('\n')}
`;
}

/**
 * Generate component files
 */
function generateComponents(count = 5) {
  const components = {
    atoms: [],
    molecules: [],
    organisms: []
  };

  console.log(`\nGenerating ${count} sets of components...`);

  for (let i = 1; i <= count; i++) {
    const department = random(taxonomies.departments);
    const deptCode = department.toLowerCase().replace(/[^a-z]/g, '');

    // Generate 2 atoms per set
    const atomIds = [];
    for (let j = 1; j <= 2; j++) {
      const atomId = `atom-${deptCode}-${String(i).padStart(3, '0')}-${j}`;
      atomIds.push(atomId);

      const atomContent = generateAtom(atomId, department);
      const atomPath = path.join(__dirname, '../sop-components/atoms', `${atomId}.md`);

      fs.mkdirSync(path.dirname(atomPath), { recursive: true });
      fs.writeFileSync(atomPath, atomContent);

      components.atoms.push({ id: atomId, department, path: atomPath });
    }

    // Generate 1 molecule using the 2 atoms
    const moleculeId = `molecule-${deptCode}-${String(i).padStart(3, '0')}`;
    const moleculeContent = generateMolecule(moleculeId, department, atomIds);
    const moleculePath = path.join(__dirname, '../sop-components/molecules', `${moleculeId}.md`);

    fs.mkdirSync(path.dirname(moleculePath), { recursive: true });
    fs.writeFileSync(moleculePath, moleculeContent);

    components.molecules.push({ id: moleculeId, department, path: moleculePath, atoms: atomIds });

    console.log(`  ✓ Generated component set ${i}: ${atomIds.join(', ')}, ${moleculeId}`);
  }

  return components;
}

/**
 * Main execution
 */
function main() {
  console.log('='.repeat(60));
  console.log('SOP Data Generator');
  console.log('Enhanced Template Structure with Comprehensive Metadata');
  console.log('='.repeat(60));

  // Parse command line arguments
  const args = process.argv.slice(2);
  const componentCount = parseInt(args[0]) || 5;

  console.log(`\nConfiguration:`);
  console.log(`  - Component sets to generate: ${componentCount}`);
  console.log(`  - Departments: ${taxonomies.departments.length}`);
  console.log(`  - Process categories: ${taxonomies.processCategories.length}`);
  console.log(`  - Complexity levels: ${taxonomies.complexity.length}`);

  // Generate components
  const components = generateComponents(componentCount);

  console.log(`\nGeneration complete!`);
  console.log(`  - Atoms: ${components.atoms.length}`);
  console.log(`  - Molecules: ${components.molecules.length}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Review generated components in sop-components/`);
  console.log(`  2. Update graph/sop-graph.json to include new components`);
  console.log(`  3. Run 'npm run validate' to check structure`);
  console.log(`  4. Run 'npm run build' to build complete SOPs`);
  console.log('='.repeat(60));
}

// Run if called directly (ES module check)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  generateAtom,
  generateMolecule,
  generateComponents
};
