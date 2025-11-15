## 📝 SOP Change Summary

### Type of Change
<!-- Check all that apply -->
- [ ] New SOP
- [ ] SOP Update
- [ ] SOP Deprecation
- [ ] Component Update
- [ ] Documentation Fix
- [ ] Process Improvement
- [ ] Bug Fix

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
- [ ] Version number incremented appropriately (major.minor.patch)
- [ ] Cross-references use correct `{{include:}}` syntax
- [ ] No broken links
- [ ] Grammar and spelling checked
- [ ] Technical accuracy verified

### Compliance
- [ ] Compliance frameworks listed in frontmatter
- [ ] Regulatory references cited where applicable
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

<!-- Tag appropriate reviewers based on CODEOWNERS, or specify below -->

**Required Reviewers:**
- [ ] Department owner
- [ ] Compliance officer (if compliance impact)
- [ ] Training coordinator (if training impact)

---

## 📅 Effective Date

**Planned Go-Live:** YYYY-MM-DD

**Communication Plan:**
<!-- Describe how this change will be communicated to stakeholders -->
- [ ] Email notification to affected users
- [ ] Team meeting announcement
- [ ] Dashboard notification
- [ ] Training session scheduled

---

## 📎 Additional Context

<!-- Add any additional information, screenshots, or links that would be helpful for reviewers -->

**Related Issues:** #XXX
**Related PRs:** #XXX
**External References:** [Link if applicable]
