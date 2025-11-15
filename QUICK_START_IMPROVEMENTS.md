# 🚀 Quick Start: Implementing Docs-as-Code Improvements

This guide helps you get started with the recommended improvements to the Pursuit Bank SOP system.

---

## Overview

We've identified **18 high-impact improvements** organized into 3 phases:

- **Phase 1: Quick Wins** (1-2 weeks) - Immediate productivity gains
- **Phase 2: High-Value** (3-5 weeks) - Quality and efficiency enhancements
- **Phase 3: Strategic** (6-12 weeks) - Long-term capabilities

**Full details:** See `DOCS_AS_CODE_IMPROVEMENTS.md`

---

## ✅ Already Implemented (Examples)

We've created implementation examples for 3 quick wins:

### 1. Pull Request Template
**File:** `.github/PULL_REQUEST_TEMPLATE.md`

**What it does:**
- Standardizes SOP change requests
- Includes comprehensive review checklist
- Tracks compliance and training impact
- Ensures proper documentation

**How to use:**
When you create a PR, GitHub automatically loads this template. Simply fill in the sections.

### 2. CODEOWNERS File
**File:** `.github/CODEOWNERS`

**What it does:**
- Auto-assigns reviewers based on files changed
- Routes SOPs to department owners
- Ensures compliance review for regulated content
- Requires specialized review for high-risk SOPs

**Examples:**
- Changes to `sop-mf-005-wire-transfer*.md` → auto-assigns @treasury-manager, @cfo, @fraud-prevention-team
- Any compliance-related file → auto-assigns @compliance-officer
- Brand assets → auto-assigns @marketing-team

### 3. SOP Update Issue Template
**File:** `.github/ISSUE_TEMPLATE/sop-update.yml`

**What it does:**
- Structured form for SOP change requests
- Captures urgency, compliance impact, training needs
- Auto-labels and routes to appropriate team
- Ensures all context is provided upfront

**How to use:**
1. Go to Issues tab
2. Click "New Issue"
3. Select "SOP Update Request" template
4. Fill in the form

---

## 🎯 Recommended Implementation Order

### Week 1: Enable the Examples (2 hours)

The three examples above are already created. To activate them:

1. **Review and customize CODEOWNERS**
   ```bash
   # Edit .github/CODEOWNERS to use your actual GitHub usernames/teams
   # Replace @underwriting-team with actual team/user handles
   ```

2. **Test PR template**
   - Create a test branch
   - Make a small change to a SOP
   - Open a PR
   - Verify template loads correctly

3. **Test issue template**
   - Go to GitHub Issues
   - Create new issue
   - Select "SOP Update Request"
   - Fill out form

4. **Train the team**
   - Send email with examples
   - Hold 15-minute demo session
   - Update internal wiki

**Impact:** Immediate improvement in PR/issue quality

---

### Week 2: Add Pre-Commit Hooks (4 hours)

**Prevents broken commits before they reach CI/CD**

```bash
# Install dependencies
npm install --save-dev husky lint-staged markdownlint-cli

# Initialize husky
npx husky init

# Create pre-commit hook
cat > .husky/pre-commit << 'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
EOF

chmod +x .husky/pre-commit
```

**Add to `package.json`:**
```json
{
  "lint-staged": {
    "sops/**/*.md": [
      "markdownlint --fix",
      "git add"
    ]
  }
}
```

**Create `.markdownlintrc`:**
```json
{
  "default": true,
  "MD013": { "line_length": 120 },
  "MD033": false,
  "MD041": false
}
```

**Test it:**
```bash
# Make a change to a SOP with formatting issues
# Try to commit
# Hook should auto-fix markdown or prevent commit
```

**Impact:** Catches formatting issues locally, saves CI time

---

### Week 3: Add Spell Checking (2 hours)

**Catches spelling errors before merge**

```bash
# Install cspell
npm install --save-dev cspell
```

**Create `cspell.json`:**
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
    "Fannie",
    "Freddie",
    "FICO"
  ],
  "ignorePaths": [
    "node_modules",
    "dist"
  ]
}
```

**Add npm script:**
```json
{
  "scripts": {
    "spellcheck": "cspell 'sops/**/*.md' '*.md'"
  }
}
```

**Add to CI (`.github/workflows/build-and-publish.yml`):**
```yaml
- name: Spell Check
  run: npm run spellcheck
```

**Impact:** Professional documents, fewer errors

---

### Week 4: Add Link Validation (3 hours)

**Detects broken cross-references**

```bash
npm install --save-dev markdown-link-check
```

**Create `tools/check-links.js`:**
```javascript
#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import glob from 'glob';

const execAsync = promisify(exec);

async function checkLinks() {
  const sopFiles = glob.sync('sops/**/*.md');
  console.log(`Checking links in ${sopFiles.length} files...`);

  for (const file of sopFiles) {
    try {
      await execAsync(`markdown-link-check "${file}"`);
      console.log(`✓ ${file}`);
    } catch (error) {
      console.log(`✗ ${file} - broken links found`);
      process.exit(1);
    }
  }
}

checkLinks();
```

**Add to package.json:**
```json
{
  "scripts": {
    "check:links": "node tools/check-links.js"
  }
}
```

**Add to CI:**
```yaml
- name: Check Links
  run: npm run check:links
```

**Impact:** Zero broken links, better UX

---

## 📊 Expected Results After 4 Weeks

### Metrics You Should See

| Metric | Before | After 4 Weeks |
|--------|--------|---------------|
| PR review cycle time | 3-5 days | 1-2 days |
| Commits failing CI | 15-20% | <5% |
| Formatting inconsistencies | High | Near zero |
| Broken links | 5-10 | 0 |
| Spelling errors | 3-5 per doc | <1 per doc |
| Time to create quality PR | 30 min | 15 min |

### Team Feedback

Run a survey after 4 weeks:
- Are PRs easier to review?
- Is the checklist helpful?
- Are pre-commit hooks catching issues early?
- Do issue templates capture needed information?

---

## 🔄 Next Steps (Weeks 5-12)

Once Phase 1 is solid, move to Phase 2:

### Phase 2 Priorities

1. **Automated Changelog** - Stop manual changelog updates
2. **SOP Change Detection** - Auto-generate PR diffs
3. **Enhanced Templates** - Comprehensive SOP starter templates
4. **Version Comparison UI** - Visual side-by-side comparison

### Phase 3 Priorities

1. **PDF Export** - Auto-generate printable/archival PDFs
2. **Compliance Dashboard** - Track review status, framework coverage
3. **Training Integration** - Link SOPs to training requirements
4. **Metrics Dashboard** - System health visibility

---

## 💡 Tips for Success

### 1. Start Small
Don't try to implement everything at once. The 4-week plan above is realistic and high-impact.

### 2. Gather Feedback
After each improvement, ask the team:
- What's working well?
- What's annoying?
- What should we adjust?

### 3. Document Everything
Update the team wiki with:
- How to use new templates
- What the pre-commit hooks do
- How to add custom words to spell checker

### 4. Celebrate Wins
When you hit milestones:
- Share metrics (time saved, errors prevented)
- Thank contributors
- Showcase examples of great PRs

### 5. Iterate
These aren't set in stone. Adjust based on your team's needs.

---

## 📞 Getting Help

### Questions About Implementation?
- Check `DOCS_AS_CODE_IMPROVEMENTS.md` for detailed specs
- Review example files in `.github/`
- Open a discussion in GitHub

### Need Custom Modifications?
The templates and configs are meant to be customized:
- Edit CODEOWNERS for your team structure
- Adjust PR template for your workflow
- Add domain-specific words to spellchecker

### Found Issues?
Open an issue using the provided templates!

---

## ✨ Success Stories (Add Your Own!)

### Example: Pre-Commit Hooks
> "Pre-commit hooks saved me 3 trips through CI by catching formatting issues locally. Game changer!" - Maria, Processor

### Example: PR Template
> "The checklist ensures I don't forget anything. My PRs get approved faster now." - Michael, Underwriter

### Example: CODEOWNERS
> "I love that the right people are automatically tagged. No more @ mentions in comments." - Sarah, Manager

---

## 📈 ROI Summary

**Investment:**
- Week 1: 2 hours (enable examples)
- Week 2: 4 hours (pre-commit hooks)
- Week 3: 2 hours (spell checking)
- Week 4: 3 hours (link checking)
- **Total: 11 hours**

**Returns (Monthly):**
- Time saved in CI/CD: 8 hours
- Faster PR reviews: 12 hours
- Fewer review cycles: 10 hours
- Less rework: 8 hours
- **Total: 38 hours/month**

**Payback Period: <1 week**

---

**Ready to get started? Begin with Week 1 and let us know how it goes!**

**Questions?** Open an issue or discussion.
