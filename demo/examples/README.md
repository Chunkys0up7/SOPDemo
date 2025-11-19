# Before/After Examples

This directory contains detailed before/after examples showing the hybrid construction transformation.

## Files

| File | Description |
|------|-------------|
| **before-build.md** | Source molecule with {{include}} references |
| **after-build.md** | Built SOP with atoms fully expanded |
| **transformation-visual.md** | Visual diagrams of build process |

## Quick Comparison

### Before (Source)
```markdown
### Step 3: Create Active Directory Account

{{include: atom-step-create-ad-account}}

---
```
**3 lines**

### After (Built)
```markdown
### Step 3: Create Active Directory Account

[... 500 lines of complete AD account creation procedure ...]

---
```
**500 lines**

## Transformation Ratio

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Step 3 lines | 3 | 500 | +16,567% |
| Total SOP lines | 413 | 1,806 | +337% |
| Atoms referenced | 2 | 0 (expanded) | Replaced |
| Self-contained? | No | Yes | Complete |

## How to Use

1. **Read before-build.md** - See source molecule structure
2. **Read after-build.md** - See final assembled output
3. **Read transformation-visual.md** - Understand the build process

## Real Files

Compare with actual files:

```bash
# Source molecule
cat ../../sop-components/molecules/molecule-new-user-account-setup.md

# Reusable atom
cat ../../sop-components/atoms/atom-step-create-ad-account.md

# Built SOP
cat ../../dist/sops/sop-it-001.md
```

## Key Takeaway

**{{include: atom-id}}** in source → **Full atom content** in built SOP

This enables:
- ✅ Single source of truth
- ✅ Reusability across workflows
- ✅ Independent versioning
- ✅ Guaranteed consistency
