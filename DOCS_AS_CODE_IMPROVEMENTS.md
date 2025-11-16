# 📚 Docs-as-Code Improvement Proposals

**Status:** Proposed
**Created:** 2025-11-15
**Author:** System Analysis
**Scope:** Pursuit Bank SOP System Enhancement

---

## Executive Summary

This document identifies **18 high-impact improvements** to enhance the SOP system using docs-as-code principles. Each improvement is prioritized by impact, effort, and ROI, with implementation examples.

**Quick Wins (High Impact, Low Effort):**

1. Pre-commit hooks for validation
2. Pull request templates
3. CODEOWNERS file
4. Issue templates
5. Markdown linting

**High-Value (High Impact, Medium Effort):**
6. Automated spell checking
7. Link validation in CI
8. SOP change detection
9. Automated changelog generation
10. Enhanced SOP templates

**Strategic (High Impact, High Effort):**
11. PDF export automation
12. Version comparison UI
13. Compliance tracking system
14. Training integration
15. Metrics dashboard

---

## Current State Assessment

### ✅ What's Working Well

1. **Version Control**
   - Git-based workflow with proper branching
   - GitHub Actions CI/CD pipeline
   - Build and validation automation

2. **Documentation Format**
   - Markdown-based SOPs with YAML frontmatter
   - Structured metadata (version, owner, status, compliance)
   - Cross-referencing with `{{include:}}` syntax

3. **Automation Tooling**
   - `npm run build` - SOP compilation
   - `npm run validate` - Structure validation
   - `npm run impact` - Dependency analysis
   - `npm run visualize` - Graph visualization

4. **CI/CD Integration**
   - Automated validation on PR
   - Build artifact generation
   - PR comments with build reports

### ⚠️ Gaps Identified

1. **Quality Assurance**
   - No markdown linting (inconsistent formatting)
   - No spell checking (potential errors)
   - No broken link detection
   - No accessibility checks

2. **Collaboration Workflow**
   - No PR templates (inconsistent review process)
   - No CODEOWNERS (unclear reviewers)
   - No issue templates (unstructured requests)
   - No review checklists

3. **Documentation Lifecycle**
   - Manual changelog updates
   - No version comparison tool
   - No automated PDF generation
   - No deprecation warnings

4. **Compliance & Training**
   - No compliance framework tracking
   - No training requirement linkage
   - No regulatory change notifications
   - No audit trail visualization

5. **Developer Experience**
   - No pre-commit hooks (catch issues late)
   - No local validation setup
   - No SOP authoring guide
   - No component library documentation

---

## Improvement Proposals

## Phase 1: Quick Wins (Week 1-2)

### 1. Pre-commit Hooks with Husky

**Impact:** High | **Effort:** Low | **Priority:** P0

**Problem:** Issues caught late in CI/CD, slowing down iteration.

**Solution:** Client-side validation before commit.

**Implementation:**

```bash
# Install husky and lint-staged
npm install --save-dev husky lint-staged

# Initialize husky
npx husky init
```

**`.husky/pre-commit`:**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

**`package.json` addition:**

```json
{
  "lint-staged": {
    "sops/**/*.md": [
      "node tools/validate-frontmatter.js",
      "markdownlint --fix",
      "git add"
    ],
    "*.md": [
      "markdownlint --fix"
    ]
  }
}
```

**Benefits:**

- Catch validation errors before commit
- Auto-fix markdown formatting
- Validate frontmatter structure
- Prevent broken commits

**ROI:** 2-3 hours/week saved in failed CI builds

---

### 2. Pull Request Template

**Impact:** High | **Effort:** Low | **Priority:** P0

**Problem:** Inconsistent PR descriptions, unclear change context.

**Solution:** Standardized PR template for SOP changes.

**Implementation:**

**`.github/PULL_REQUEST_TEMPLATE.md`:**

```markdown
## 📝 SOP Change Summary

### Type of Change
- [ ] New SOP
- [ ] SOP Update
- [ ] SOP Deprecation
- [ ] Component Update
- [ ] Documentation Fix
- [ ] Process Improvement

### SOPs Affected
<!-- List SOP IDs, e.g., sop-mf-002, sop-mf-005 -->
-

### Change Description
<!-- Describe what changed and why -->


### Regulatory/Compliance Impact
<!-- Select one -->
- [ ] No compliance impact
- [ ] Compliance review required
- [ ] Regulatory change driven (specify): ___________

### Dependencies Updated
<!-- List any SOPs that reference changed SOPs -->
-

### Training Impact
<!-- Will this require training updates? -->
- [ ] No training impact
- [ ] Training materials need update
- [ ] New training module required

---

## ✅ Review Checklist

### Content Quality
- [ ] All frontmatter fields complete (id, title, version, status, owner, etc.)
- [ ] Version number incremented appropriately
- [ ] Cross-references use correct `{{include:}}` syntax
- [ ] No broken links
- [ ] Grammar and spelling checked
- [ ] Technical accuracy verified

### Compliance
- [ ] Compliance frameworks listed in frontmatter
- [ ] Regulatory references cited
- [ ] Audit trail requirements met
- [ ] Approval signatures obtained (if required)

### Impact Analysis
- [ ] Ran `npm run impact -- <sop-id>` to check dependencies
- [ ] Dependent SOPs reviewed for needed updates
- [ ] Stakeholders notified of changes
- [ ] Training team notified (if applicable)

### Testing
- [ ] Built locally with `npm run build`
- [ ] Validated with `npm run validate`
- [ ] Visualized dependencies with `npm run visualize`
- [ ] Tested cross-references work correctly

---

## 📊 Build Report

<!-- CI will add build report as comment -->

---

## 👥 Reviewers

<!-- Tag appropriate reviewers -->
@underwriting-team @compliance-team @training-team

---

## 📅 Effective Date

**Planned Go-Live:** YYYY-MM-DD
**Communication Plan:** [Describe how change will be communicated]
```

**Benefits:**

- Standardized change documentation
- Clear compliance tracking
- Comprehensive review checklist
- Better audit trail

**ROI:** 1-2 hours/week saved in review clarifications

---

### 3. CODEOWNERS File

**Impact:** Medium | **Effort:** Low | **Priority:** P1

**Problem:** Unclear who should review SOP changes.

**Solution:** Auto-assign reviewers based on SOP ownership.

**Implementation:**

**`.github/CODEOWNERS`:**

```plaintext
# Pursuit Bank SOP System - Code Owners
# This file defines who should review changes to SOPs

# Default owners for all files
* @sop-admin-team

# Mortgage Finance SOPs
/sops/mortgage/ @underwriting-team @compliance-team

# Specific SOP ownership
/sops/mortgage/sop-mf-001-*.md @loan-processing-manager
/sops/mortgage/sop-mf-002-*.md @underwriting-manager
/sops/mortgage/sop-mf-003-*.md @underwriting-manager @fha-specialist
/sops/mortgage/sop-mf-004-*.md @closing-manager
/sops/mortgage/sop-mf-005-*.md @treasury-manager @fraud-prevention

# Wire transfer and fraud prevention
/sops/mortgage/*wire*transfer*.md @treasury-manager @cfo
/sops/mortgage/*fraud*.md @fraud-prevention-team

# Compliance-related SOPs
/sops/mortgage/*compliance*.md @compliance-officer
/sops/mortgage/*trid*.md @compliance-officer @closing-manager

# Tools and automation
/tools/ @devops-team @sop-admin-team
/.github/workflows/ @devops-team

# Brand assets
/public/assets/branding/ @marketing-team @brand-manager

# Documentation
/*.md @technical-writer @sop-admin-team
/docs/ @technical-writer
```

**Benefits:**

- Automatic reviewer assignment
- Clear ownership
- Faster review routing
- Compliance oversight

**ROI:** 30 min/week saved in manual reviewer assignment

---

### 4. Issue Templates

**Impact:** Medium | **Effort:** Low | **Priority:** P1

**Problem:** Unstructured SOP change requests.

**Solution:** Standardized issue templates.

**Implementation:**

**`.github/ISSUE_TEMPLATE/sop-update.yml`:**

```yaml
name: 📝 SOP Update Request
description: Request an update to an existing SOP
title: "[SOP Update] "
labels: ["sop-update", "needs-triage"]
assignees:
  - sop-admin-team

body:
  - type: dropdown
    id: sop-id
    attributes:
      label: SOP ID
      description: Which SOP needs updating?
      options:
        - sop-mf-001 (Conventional Loan Processing)
        - sop-mf-002 (AUS Processing)
        - sop-mf-003 (FHA Underwriting)
        - sop-mf-004 (Clear to Close)
        - sop-mf-005 (Wire Transfer Security)
        - Other (specify in description)
    validations:
      required: true

  - type: dropdown
    id: change-type
    attributes:
      label: Type of Change
      options:
        - Regulatory update required
        - Process improvement
        - Error correction
        - Clarification needed
        - New procedure addition
        - Deprecation
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: Description of Needed Change
      description: Clearly describe what needs to change and why
      placeholder: |
        Example: HUD updated MIP rates effective 2025-12-01.
        SOP-MF-003 Section 5.2 needs updated rate tables.
    validations:
      required: true

  - type: dropdown
    id: urgency
    attributes:
      label: Urgency
      options:
        - Low (Nice to have)
        - Medium (Needed within 30 days)
        - High (Needed within 7 days)
        - Critical (Regulatory deadline/compliance issue)
    validations:
      required: true

  - type: input
    id: deadline
    attributes:
      label: Deadline (if applicable)
      placeholder: "YYYY-MM-DD"

  - type: textarea
    id: compliance-impact
    attributes:
      label: Compliance/Regulatory Impact
      description: Is this driven by a regulatory change?
      placeholder: |
        - Regulatory body: HUD/FHA
        - Mortgagee Letter: ML 2025-XX
        - Effective date: 2025-12-01
        - Compliance risk if not updated: High

  - type: textarea
    id: affected-stakeholders
    attributes:
      label: Affected Stakeholders
      description: Who needs to be aware of this change?
      placeholder: |
        - Underwriting team (20 users)
        - Loan processors (15 users)
        - Compliance officer
        - Training coordinator

  - type: checkboxes
    id: training-needed
    attributes:
      label: Training Required?
      options:
        - label: Training materials will need updates
        - label: New training module required
        - label: Staff notification sufficient

  - type: textarea
    id: additional-context
    attributes:
      label: Additional Context
      description: Links, attachments, related changes
```

**`.github/ISSUE_TEMPLATE/new-sop.yml`:**

```yaml
name: ✨ New SOP Request
description: Request creation of a new SOP
title: "[New SOP] "
labels: ["new-sop", "needs-triage"]

body:
  - type: input
    id: proposed-id
    attributes:
      label: Proposed SOP ID
      description: Suggest an ID (e.g., sop-mf-006)
      placeholder: "sop-mf-XXX"
    validations:
      required: true

  - type: input
    id: title
    attributes:
      label: SOP Title
      placeholder: "Short descriptive title"
    validations:
      required: true

  - type: dropdown
    id: department
    attributes:
      label: Department
      options:
        - Underwriting
        - Loan Processing
        - Closing
        - Quality Control
        - Compliance
        - Treasury
        - Customer Service
    validations:
      required: true

  - type: textarea
    id: purpose
    attributes:
      label: Purpose
      description: Why is this SOP needed?
    validations:
      required: true

  - type: textarea
    id: scope
    attributes:
      label: Scope
      description: What does this SOP cover?

  - type: textarea
    id: dependencies
    attributes:
      label: Related SOPs
      description: Which existing SOPs does this relate to?
      placeholder: |
        - sop-mf-002 (prerequisite)
        - sop-mf-008 (cross-reference)

  - type: input
    id: owner
    attributes:
      label: Process Owner
      description: Who will own this SOP?
    validations:
      required: true
```

**Benefits:**

- Structured change requests
- Clear compliance tracking
- Better prioritization
- Automatic labeling/routing

**ROI:** 1 hour/week saved in request clarifications

---

### 5. Markdown Linting

**Impact:** Medium | **Effort:** Low | **Priority:** P1

**Problem:** Inconsistent markdown formatting across SOPs.

**Solution:** Automated markdown linting with markdownlint.

**Implementation:**

```bash
npm install --save-dev markdownlint-cli
```

**`.markdownlintrc`:**

```json
{
  "default": true,
  "MD013": {
    "line_length": 120,
    "code_blocks": false,
    "tables": false
  },
  "MD024": {
    "siblings_only": true
  },
  "MD033": false,
  "MD041": false,
  "MD046": {
    "style": "fenced"
  }
}
```

**`package.json` script:**

```json
{
  "scripts": {
    "lint:md": "markdownlint 'sops/**/*.md' '*.md'",
    "lint:md:fix": "markdownlint --fix 'sops/**/*.md' '*.md'"
  }
}
```

**Add to CI (`.github/workflows/build-and-publish.yml`):**

```yaml
- name: Lint Markdown
  run: npm run lint:md
```

**Benefits:**

- Consistent formatting
- Improved readability
- Fewer formatting debates
- Professional appearance

**ROI:** 30 min/week saved in formatting corrections

---

## Phase 2: High-Value Enhancements (Week 3-5)

### 6. Automated Spell Checking

**Impact:** High | **Effort:** Low | **Priority:** P1

**Problem:** Spelling errors in SOPs reduce professionalism and clarity.

**Solution:** Automated spell checking in CI with cSpell.

**Implementation:**

```bash
npm install --save-dev cspell
```

**`cspell.json`:**

```json
{
  "version": "0.2",
  "language": "en",
  "words": [
    "Pursuit",
    "TRID",
    "RESPA",
    "OFAC",
    "underwriting",
    "mortgagee",
    "closings",
    "Fannie",
    "Freddie"
  ],
  "dictionaries": [
    "en_US",
    "companies",
    "softwareTerms",
    "mortgage-finance"
  ],
  "dictionaryDefinitions": [
    {
      "name": "mortgage-finance",
      "path": "./dictionaries/mortgage-finance.txt"
    }
  ],
  "ignorePaths": [
    "node_modules",
    "dist",
    "*.log"
  ]
}
```

**`dictionaries/mortgage-finance.txt`:**

```
AUS
DTI
LTV
CLTV
MIP
PMI
FICO
USDA
VA
FHA
```

**CI Integration:**

```yaml
- name: Spell Check
  run: npx cspell "sops/**/*.md" "*.md"
```

**Benefits:**

- Catch typos before publication
- Maintain professionalism
- Custom finance dictionary
- Low false positive rate

**ROI:** 1 hour/week saved in manual proofreading

---

### 7. Link Validation

**Impact:** High | **Effort:** Low | **Priority:** P1

**Problem:** Broken cross-references between SOPs.

**Solution:** Automated link checking with markdown-link-check.

**Implementation:**

```bash
npm install --save-dev markdown-link-check
```

**`tools/check-links.js`:**

```javascript
#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import glob from 'glob';

const execAsync = promisify(exec);

async function checkLinks() {
  const sopFiles = glob.sync('sops/**/*.md');

  console.log(`🔍 Checking links in ${sopFiles.length} SOP files...`);

  let brokenLinks = [];

  for (const file of sopFiles) {
    try {
      await execAsync(`markdown-link-check "${file}" --config .markdown-link-check.json`);
      console.log(`✓ ${file}`);
    } catch (error) {
      console.log(`✗ ${file} - Contains broken links`);
      brokenLinks.push(file);
    }
  }

  if (brokenLinks.length > 0) {
    console.log(`\n❌ ${brokenLinks.length} files with broken links`);
    process.exit(1);
  } else {
    console.log(`\n✅ All links valid`);
  }
}

checkLinks();
```

**`.markdown-link-check.json`:**

```json
{
  "ignorePatterns": [
    {
      "pattern": "^{{include:"
    }
  ],
  "replacementPatterns": [
    {
      "pattern": "^/",
      "replacement": "file://{{BASEURL}}/"
    }
  ],
  "httpHeaders": [
    {
      "urls": ["https://"],
      "headers": {
        "User-Agent": "Mozilla/5.0"
      }
    }
  ]
}
```

**Benefits:**

- Catch broken links before merge
- Validate external references
- Custom pattern ignoring
- CI/CD integration

**ROI:** 2 hours/week saved in manual link checking

---

### 8. SOP Change Detection

**Impact:** High | **Effort:** Medium | **Priority:** P1

**Problem:** Unclear what actually changed in SOP updates.

**Solution:** Automated diff highlighting in PR comments.

**Implementation:**

**`.github/workflows/sop-diff.yml`:**

```yaml
name: SOP Change Detection

on:
  pull_request:
    paths:
      - 'sops/**/*.md'

jobs:
  detect-changes:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Detect changed SOPs
        id: changes
        run: |
          CHANGED_SOPS=$(git diff --name-only origin/${{ github.base_ref }}...HEAD | grep '^sops/.*\.md$' || true)
          echo "changed_files<<EOF" >> $GITHUB_OUTPUT
          echo "$CHANGED_SOPS" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Generate change summary
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const { execSync } = require('child_process');

            const changedFiles = `${{ steps.changes.outputs.changed_files }}`.split('\n').filter(f => f);

            let comment = '## 📝 SOP Changes Detected\n\n';
            comment += `**${changedFiles.length} SOP(s) modified in this PR**\n\n`;

            for (const file of changedFiles) {
              comment += `### ${file}\n\n`;

              // Get diff stats
              const stats = execSync(`git diff origin/${{ github.base_ref }}...HEAD --numstat -- "${file}"`).toString();
              const [added, removed] = stats.split('\t');

              comment += `- ➕ ${added} lines added\n`;
              comment += `- ➖ ${removed} lines removed\n\n`;

              // Get actual diff
              const diff = execSync(`git diff origin/${{ github.base_ref }}...HEAD -- "${file}"`).toString();
              comment += '<details><summary>View Changes</summary>\n\n';
              comment += '```diff\n' + diff + '\n```\n\n';
              comment += '</details>\n\n';
            }

            comment += '---\n\n';
            comment += '**⚠️ Review Reminder:**\n';
            comment += '- Verify version number incremented\n';
            comment += '- Check compliance impact\n';
            comment += '- Validate cross-references\n';
            comment += '- Update dependent SOPs if needed\n';

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

**Benefits:**

- Clear change visibility
- Automated diff generation
- Review checklist reminders
- Better audit trail

**ROI:** 1.5 hours/week saved in change review

---

### 9. Automated Changelog

**Impact:** Medium | **Effort:** Medium | **Priority:** P2

**Problem:** Manual changelog maintenance is time-consuming and error-prone.

**Solution:** Auto-generate changelogs from commits using conventional commits.

**Implementation:**

```bash
npm install --save-dev conventional-changelog-cli
```

**Conventional Commit Format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New SOP or major procedure addition
- `fix`: Correction to existing SOP
- `docs`: Documentation updates
- `refactor`: Reorganization without functional change
- `compliance`: Compliance-driven update
- `regulatory`: Regulatory change implementation

**Example:**

```
compliance(sop-mf-003): update MIP rates per HUD ML 2025-14

Updated upfront and annual MIP rate tables in Section 5.2 to reflect
new HUD requirements effective December 1, 2025.

BREAKING CHANGE: Old rates no longer valid after 2025-12-01

Closes #123
Impacts: sop-mf-001, sop-mf-004
Training: Required
```

**`package.json` script:**

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}
```

**Benefits:**

- Automated changelog generation
- Standardized commit messages
- Better release notes
- Impact tracking

**ROI:** 2 hours/month saved in changelog maintenance

---

### 10. Enhanced SOP Templates

**Impact:** Medium | **Effort:** Medium | **Priority:** P2

**Problem:** Inconsistent SOP structure, missing required sections.

**Solution:** Comprehensive templates with validation.

**Implementation:**

**`templates/sop-mortgage-underwriting.md`:**

```markdown
---
id: sop-mf-XXX
title: [PROCEDURE NAME]
version: 1.0.0
status: draft
owner: [DEPARTMENT/TEAM NAME]
category: [Underwriting|Processing|Closing|Compliance]
lastReviewed: YYYY-MM-DD
nextReview: YYYY-MM-DD
approver: [NAME (TITLE)]
complianceFrameworks:
  - [FRAMEWORK 1]
  - [FRAMEWORK 2]
dependencies:
  - sop-mf-XXX
tags:
  - tag1
  - tag2
estimatedReadingTime: XX minutes
---

# [PROCEDURE NAME]

## Overview

**Purpose:** [1-2 sentence description of why this procedure exists]

**Scope:** [What this covers, who it applies to]

**Processing Volume:** [X per month/week if applicable]
**Target Turnaround:** [Expected completion time]

## Prerequisites

Before beginning this process, ensure:

- [ ] Prerequisite 1 (reference {{include: sop-mf-XXX}} if applicable)
- [ ] Prerequisite 2
- [ ] Required training completed
- [ ] System access verified

## Process Steps

### Step 1: [Action Name]

**Responsibility:** [Role]
**System:** [System name if applicable]
**Estimated Time:** [X minutes]

**Actions:**
1. [Specific action]
2. [Specific action]

**Verification:**
- [ ] Check 1
- [ ] Check 2

**Decision Point:**
- ✅ If [condition], proceed to Step 2
- ❌ If [condition], escalate to [role] per {{include: sop-mf-XXX}}

---

### Step 2: [Action Name]

[Repeat structure]

---

## Quality Control

**Required Checks:**
- [ ] Check 1 - [Description]
- [ ] Check 2 - [Description]

**Sampling Rate:** [X% of transactions or 100%]

**Review Frequency:** [Daily|Weekly|Monthly]

---

## Regulatory Compliance

**Applicable Regulations:**
- [Regulation Name] - [Brief description of requirement]
- [Regulation Name] - [Brief description of requirement]

**Compliance Checkpoints:**
1. [Specific requirement] - [How verified]
2. [Specific requirement] - [How verified]

**Audit Trail:**
- [What must be documented]
- [Where documentation stored]
- [Retention period]

---

## Escalation Procedures

| Issue Type | Escalate To | Response Time |
|------------|-------------|---------------|
| [Issue] | [Role/Person] | [X hours] |
| [Issue] | [Role/Person] | [X hours] |

---

## Training Requirements

**Initial Training:**
- [ ] Module 1: [Name]
- [ ] Module 2: [Name]
- [ ] Quiz passing score: 85%

**Ongoing:**
- [ ] Annual refresher
- [ ] Update training upon SOP changes

---

## Troubleshooting

### Common Issue 1: [Description]

**Symptoms:** [What you see]
**Cause:** [Why it happens]
**Resolution:**
1. [Step to fix]
2. [Step to fix]

### Common Issue 2: [Description]

[Repeat]

---

## Metrics & KPIs

**Performance Indicators:**
- [Metric 1]: Target [X%]
- [Metric 2]: Target [X hours]

**Reporting:** [How/when metrics reported]

---

## Related Documents

**Cross-References:**
- {{include: sop-mf-XXX}} - [Relationship description]
- {{include: sop-mf-XXX}} - [Relationship description]

**External References:**
- [Document name] - [URL or location]

---

## Revision History

| Version | Date | Author | Changes | Approver |
|---------|------|--------|---------|----------|
| 1.0.0 | YYYY-MM-DD | [Name] | Initial version | [Name] |

---

## Appendices

### Appendix A: [Title]

[Content]

### Appendix B: Forms & Templates

- [Form name] - [Link]
```

**Template Validation Script (`tools/validate-template.js`):**

```javascript
#!/usr/bin/env node

import fs from 'fs/promises';
import yaml from 'js-yaml';

async function validateSOPTemplate(filePath) {
  const content = await fs.readFile(filePath, 'utf8');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    throw new Error('Missing frontmatter');
  }

  const frontmatter = yaml.load(frontmatterMatch[1]);

  // Required fields
  const required = ['id', 'title', 'version', 'status', 'owner', 'category'];
  for (const field of required) {
    if (!frontmatter[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Required sections
  const requiredSections = [
    '## Overview',
    '## Prerequisites',
    '## Process Steps',
    '## Quality Control',
    '## Regulatory Compliance',
    '## Training Requirements'
  ];

  for (const section of requiredSections) {
    if (!content.includes(section)) {
      throw new Error(`Missing required section: ${section}`);
    }
  }

  console.log('✓ Template validation passed');
}
```

**Benefits:**

- Consistent structure
- Complete documentation
- Validation enforcement
- Faster authoring

**ROI:** 3 hours/SOP saved in authoring

---

## Phase 3: Strategic Enhancements (Week 6-12)

### 11. PDF Export Automation

**Impact:** High | **Effort:** High | **Priority:** P2

**Problem:** Manual PDF generation for printable SOPs and compliance archives.

**Solution:** Automated PDF generation with pandoc in CI/CD.

**Implementation:**

```bash
# Install dependencies
npm install --save-dev markdown-pdf
```

**`tools/generate-pdf.js`:**

```javascript
#!/usr/bin/env node

import { markdownpdf } from 'markdown-pdf';
import glob from 'glob';
import fs from 'fs/promises';
import path from 'path';

async function generatePDFs() {
  const sopFiles = glob.sync('sops/**/*.md');
  const outputDir = 'dist/pdfs';

  await fs.mkdir(outputDir, { recursive: true });

  for (const file of sopFiles) {
    const basename = path.basename(file, '.md');
    const outputPath = path.join(outputDir, `${basename}.pdf`);

    await markdownpdf({
      cssPath: 'templates/pdf-styles.css',
      paperFormat: 'Letter',
      paperOrientation: 'portrait',
      runningsPath: 'templates/pdf-header-footer.js'
    })
    .from(file)
    .to(outputPath);

    console.log(`✓ Generated ${outputPath}`);
  }
}

generatePDFs();
```

**`templates/pdf-styles.css`:**

```css
@page {
  margin: 1in;
  @top-left {
    content: "Pursuit Bank - Confidential";
  }
  @top-right {
    content: string(sop-id);
  }
  @bottom-left {
    content: "Page " counter(page) " of " counter(pages);
  }
  @bottom-right {
    content: string(version);
  }
}

body {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 11pt;
  line-height: 1.6;
}

h1 {
  color: #0052CC;
  border-bottom: 3px solid #0052CC;
  padding-bottom: 0.3em;
}

h2 {
  color: #003d99;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.2em;
  margin-top: 1.5em;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5em;
  text-align: left;
}

th {
  background: #f0f0f0;
  font-weight: 600;
}

code {
  background: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}
```

**CI Integration:**

```yaml
- name: Generate PDFs
  run: npm run pdf:generate

- name: Upload PDFs
  uses: actions/upload-artifact@v4
  with:
    name: sop-pdfs
    path: dist/pdfs/
```

**Benefits:**

- Automated PDF generation
- Printable compliance copies
- Branded formatting
- Archive-ready format

**ROI:** 4 hours/month saved in manual PDF creation

---

### 12. Version Comparison UI

**Impact:** High | **Effort:** High | **Priority:** P2

**Problem:** Difficult to see what changed between SOP versions.

**Solution:** Interactive version comparison tool.

**Implementation:**

**`public/sop-version-compare.html`:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SOP Version Compare - Pursuit Bank</title>
  <link rel="stylesheet" href="/public/assets/branding/pursuit-brand.css">
  <script src="https://cdn.jsdelivr.net/npm/diff2html/bundles/js/diff2html-ui.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css">
</head>
<body>
  <div class="container">
    <h1>SOP Version Comparison</h1>

    <div class="comparison-controls">
      <select id="sop-select">
        <option>sop-mf-002</option>
        <option>sop-mf-003</option>
        <option>sop-mf-004</option>
        <option>sop-mf-005</option>
      </select>

      <select id="version-a">
        <option>v3.1.4</option>
        <option>v3.1.5</option>
      </select>

      <span>vs</span>

      <select id="version-b">
        <option>v3.1.5</option>
        <option>v3.1.6</option>
      </select>

      <button onclick="loadComparison()">Compare</button>
    </div>

    <div id="diff-output"></div>
  </div>

  <script>
    async function loadComparison() {
      const sop = document.getElementById('sop-select').value;
      const versionA = document.getElementById('version-a').value;
      const versionB = document.getElementById('version-b').value;

      // Fetch versions from Git history
      const diff = await fetch(`/api/sop-diff?sop=${sop}&v1=${versionA}&v2=${versionB}`)
        .then(r => r.json());

      const targetElement = document.getElementById('diff-output');
      const configuration = {
        drawFileList: true,
        matching: 'lines',
        outputFormat: 'side-by-side'
      };

      const diff2htmlUi = new Diff2HtmlUI(targetElement, diff, configuration);
      diff2htmlUi.draw();
    }
  </script>
</body>
</html>
```

**Benefits:**

- Visual change comparison
- Side-by-side or unified view
- Highlight added/removed/changed
- Better change understanding

**ROI:** 2 hours/week saved in manual comparison

---

### 13. Compliance Tracking System

**Impact:** High | **Effort:** High | **Priority:** P2

**Problem:** Unclear compliance status across SOPs.

**Solution:** Automated compliance dashboard.

**Implementation:**

**`tools/compliance-report.js`:**

```javascript
#!/usr/bin/env node

import fs from 'fs/promises';
import yaml from 'js-yaml';
import glob from 'glob';

async function generateComplianceReport() {
  const sopFiles = glob.sync('sops/**/*.md');

  const report = {
    totalSOPs: sopFiles.length,
    byFramework: {},
    upcomingReviews: [],
    overdueReviews: []
  };

  for (const file of sopFiles) {
    const content = await fs.readFile(file, 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

    if (!frontmatterMatch) continue;

    const frontmatter = yaml.load(frontmatterMatch[1]);

    // Track compliance frameworks
    if (frontmatter.complianceFrameworks) {
      for (const framework of frontmatter.complianceFrameworks) {
        report.byFramework[framework] = report.byFramework[framework] || [];
        report.byFramework[framework].push({
          id: frontmatter.id,
          title: frontmatter.title,
          version: frontmatter.version,
          lastReviewed: frontmatter.lastReviewed
        });
      }
    }

    // Check review dates
    const nextReview = new Date(frontmatter.nextReview);
    const today = new Date();
    const daysUntilReview = Math.floor((nextReview - today) / (1000 * 60 * 60 * 24));

    if (daysUntilReview < 0) {
      report.overdueReviews.push({
        id: frontmatter.id,
        title: frontmatter.title,
        daysOverdue: Math.abs(daysUntilReview)
      });
    } else if (daysUntilReview < 30) {
      report.upcomingReviews.push({
        id: frontmatter.id,
        title: frontmatter.title,
        daysUntilReview
      });
    }
  }

  // Generate HTML report
  const html = generateHTMLReport(report);
  await fs.writeFile('dist/compliance-report.html', html);

  console.log('✓ Compliance report generated');
}

function generateHTMLReport(report) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>Compliance Report - Pursuit Bank</title>
  <link rel="stylesheet" href="/public/assets/branding/pursuit-brand.css">
</head>
<body>
  <h1>SOP Compliance Report</h1>

  <div class="summary">
    <h2>Summary</h2>
    <p>Total SOPs: ${report.totalSOPs}</p>
    <p>Overdue Reviews: ${report.overdueReviews.length}</p>
    <p>Upcoming Reviews (30 days): ${report.upcomingReviews.length}</p>
  </div>

  <div class="by-framework">
    <h2>SOPs by Compliance Framework</h2>
    ${Object.entries(report.byFramework).map(([framework, sops]) => `
      <h3>${framework} (${sops.length} SOPs)</h3>
      <ul>
        ${sops.map(sop => `<li>${sop.id} - ${sop.title} (v${sop.version})</li>`).join('')}
      </ul>
    `).join('')}
  </div>

  ${report.overdueReviews.length > 0 ? `
    <div class="overdue">
      <h2>⚠️ Overdue Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>SOP ID</th>
            <th>Title</th>
            <th>Days Overdue</th>
          </tr>
        </thead>
        <tbody>
          ${report.overdueReviews.map(sop => `
            <tr>
              <td>${sop.id}</td>
              <td>${sop.title}</td>
              <td style="color: red;">${sop.daysOverdue}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  ` : ''}
</body>
</html>
  `;
}

generateComplianceReport();
```

**Benefits:**

- Compliance visibility
- Review tracking
- Framework coverage
- Audit readiness

**ROI:** 4 hours/month saved in manual tracking

---

### 14. Training Integration

**Impact:** Medium | **Effort:** High | **Priority:** P3

**Problem:** Disconnected training from SOP content.

**Solution:** Training requirement tracking and quiz generation.

**Implementation:**

**Enhance frontmatter:**

```yaml
training:
  required: true
  modules:
    - module-id: aus-101
      title: "AUS Fundamentals"
      frequency: annual
      passingScore: 85
  quizQuestions:
    - section: "2.1"
      question: "What is the maximum DTI for automated approval?"
      options:
        - "43%"
        - "45%"
        - "50%"
      correctAnswer: 2
      explanation: "Per Fannie Mae guidelines, max DTI is 50% with compensating factors"
```

**Benefits:**

- Linked training content
- Automated quiz generation
- Training compliance tracking
- Knowledge verification

**ROI:** 6 hours/month saved in training coordination

---

### 15. Metrics Dashboard

**Impact:** Medium | **Effort:** High | **Priority:** P3

**Problem:** No visibility into SOP ecosystem health.

**Solution:** Comprehensive metrics dashboard.

**Metrics to Track:**

- Total SOPs by category
- SOPs updated in last 30/60/90 days
- Average time since last review
- Overdue reviews
- Broken cross-references
- Compliance framework coverage
- Training completion rates
- PDF generation status
- Build success rate
- Validation error trends

**Benefits:**

- System health visibility
- Proactive maintenance
- Stakeholder reporting
- Data-driven improvements

**ROI:** 3 hours/week saved in manual reporting

---

## Implementation Roadmap

### Week 1-2: Quick Wins

- [ ] Pre-commit hooks (1 day)
- [ ] PR template (2 hours)
- [ ] CODEOWNERS (2 hours)
- [ ] Issue templates (4 hours)
- [ ] Markdown linting (4 hours)

**Estimated effort:** 2 days
**Impact:** High

### Week 3-5: High-Value

- [ ] Spell checking (4 hours)
- [ ] Link validation (1 day)
- [ ] SOP change detection (1 day)
- [ ] Changelog automation (1 day)
- [ ] Enhanced templates (2 days)

**Estimated effort:** 6 days
**Impact:** High

### Week 6-12: Strategic

- [ ] PDF export (3 days)
- [ ] Version comparison UI (3 days)
- [ ] Compliance tracking (4 days)
- [ ] Training integration (5 days)
- [ ] Metrics dashboard (5 days)

**Estimated effort:** 20 days
**Impact:** High

---

## Success Metrics

### Efficiency Gains

- **Time saved per SOP update:** 30%
- **Review cycle time:** -50%
- **Onboarding time for new authors:** -40%
- **Compliance reporting time:** -70%

### Quality Improvements

- **Broken links:** 0
- **Spelling errors:** <1 per 1000 words
- **Formatting consistency:** 95%+
- **Template compliance:** 100%

### Adoption Metrics

- **PR template usage:** 100%
- **Conventional commit usage:** 80%+
- **Pre-commit hook adoption:** 100%
- **SOP review completion rate:** 95%+

---

## Budget & Resources

### Tool Costs

- **GitHub Actions:** Included (existing)
- **npm packages:** Free (all open source)
- **PDF generation:** Free (pandoc/markdown-pdf)
- **Total additional cost:** $0/month

### Development Time

- **Phase 1:** 2 days
- **Phase 2:** 6 days
- **Phase 3:** 20 days
- **Total:** ~28 days (1 developer, ~6 weeks)

### ROI Calculation

**Monthly time savings:**

- Pre-commit validation: 8 hours
- Automated linting: 2 hours
- Link checking: 8 hours
- Spell checking: 4 hours
- Change detection: 6 hours
- PDF generation: 4 hours
- Compliance reporting: 4 hours
- Version comparison: 8 hours
- **Total:** 44 hours/month

**Annual savings:** 528 hours = 13.2 weeks
**At $75/hour:** $39,600/year

**Implementation cost:** 28 days × 8 hours × $75 = $16,800

**Payback period:** ~5 months
**3-year ROI:** 605%

---

## Conclusion

These 15 improvements transform the SOP system into a world-class docs-as-code implementation. Starting with quick wins provides immediate value, while strategic enhancements build long-term capability.

**Recommended Approach:**

1. Implement Phase 1 (Quick Wins) immediately
2. Gather feedback and metrics
3. Prioritize Phase 2 based on feedback
4. Plan Phase 3 for ongoing improvement

**Next Steps:**

1. Review and approve improvement plan
2. Create implementation tickets
3. Assign development resources
4. Set up monitoring/metrics
5. Begin Phase 1 implementation

---

**Document Status:** Ready for Review
**Approval Required:** SOP Admin Team, DevOps Team, Compliance Officer
**Questions/Feedback:** Open GitHub discussion #XXX
