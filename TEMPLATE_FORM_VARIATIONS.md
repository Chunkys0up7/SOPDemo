# Template Form Variations - Implementation Summary

**Date:** 2025-11-18
**Feature:** Dynamic form sections based on template type selection
**File:** `public/contribute.html`

---

## Overview

The contribute form now **dynamically shows/hides sections** based on the selected template type (Atom, Molecule, Organism, or SOP). This ensures users only see relevant fields for their chosen complexity level.

---

## 🔵 ATOM - Simple Component

### Template Banner
```
🔵 Atom - Simple Component
You're creating a single-purpose, reusable component (~128 lines).
This is the simplest template with basic fields only.
```

### Visible Sections
1. ✅ **Core Information** (simplified)
   - Title ✅
   - Department ✅
   - Process Category ✅
   - Complexity Level ✅
   - ❌ Estimated Duration (hidden)
   - Target Audience ✅
   - Search Keywords ✅

2. ✅ **Purpose & Description**
   - Purpose ✅
   - Scope - What IS Covered ✅
   - Scope - What is NOT Covered ✅
   - *Subtitle:* "Simple description of what this component does"

3. ❌ **Compliance Section** (completely hidden)

4. ❌ **Procedure Steps** (completely hidden - atoms are single-purpose)

5. ✅ **Troubleshooting**
   - Troubleshooting Matrix ✅
   - *Subtitle:* "Basic troubleshooting table for common issues"

6. ✅ **Ownership** (basic)
   - Owner (Department) ✅
   - Maintainer (Person/Role) ✅
   - ❌ Approver (hidden)
   - ❌ Additional Reviewers (hidden)
   - *Subtitle:* "Basic ownership information"

### Section Numbering
- Section 1: Core Information
- Section 2: Purpose & Description
- Section 3: Troubleshooting *(renumbered from 5)*
- Section 4: Ownership *(renumbered from 6)*

### Required Fields: ~10 fields
### Estimated Output: ~128 lines

---

## 🟣 MOLECULE - Multi-Step Procedure

### Template Banner
```
🟣 Molecule - Multi-Step Procedure
You're creating a multi-step procedure combining atoms (~201 lines).
Moderate complexity with optional compliance.
```

### Visible Sections
1. ✅ **Core Information**
   - Title ✅
   - Department ✅
   - Process Category ✅
   - Complexity Level ✅
   - ✅ **Estimated Duration** (shown)
   - Target Audience ✅
   - Search Keywords ✅

2. ✅ **Purpose & Scope**
   - Purpose ✅
   - Scope - What IS Covered ✅
   - Scope - What is NOT Covered ✅
   - *Subtitle:* "Define the multi-step procedure and prerequisites"

3. ⚠️ **Compliance** (optional - highlighted in yellow)
   - Compliance Frameworks (checkboxes) ⚠️
   - ❌ Audit Frequency (not required)
   - ✅ Review Frequency (required)
   - *Subtitle:* "Optional: Only if compliance frameworks apply"
   - *Visual:* Yellow background (#fffef0) with orange border (#FFA726)

4. ✅ **Procedure Steps**
   - Dynamic step builder ✅
   - Step name, actions, decision logic, quality checkpoints ✅
   - *Subtitle:* "Multiple steps combining atoms"

5. ✅ **Troubleshooting**
   - Troubleshooting Matrix ✅
   - *Subtitle:* "Detailed troubleshooting matrix"

6. ✅ **Ownership**
   - Owner (Department) ✅
   - Maintainer (Person/Role) ✅
   - ✅ **Approver** (shown)
   - ❌ Additional Reviewers (hidden)

### Section Numbering
- Section 1: Core Information
- Section 2: Purpose & Scope
- Section 3: Compliance (optional)
- Section 4: Procedure Steps
- Section 5: Troubleshooting
- Section 6: Ownership

### Required Fields: ~15 fields
### Estimated Output: ~201 lines

---

## 🟢 ORGANISM - Complete Workflow

### Template Banner
```
🟢 Organism - Complete Workflow
You're creating a complete workflow combining molecules and atoms (~297 lines).
Complex template with required compliance tracking.
```

### Visible Sections
1. ✅ **Core Information** (comprehensive)
   - Title ✅
   - Department ✅
   - Process Category ✅
   - Complexity Level ✅
   - ✅ Estimated Duration ✅
   - Target Audience ✅
   - Search Keywords ✅

2. ✅ **Purpose & Scope**
   - Purpose ✅
   - Scope - What IS Covered ✅
   - Scope - What is NOT Covered ✅
   - *Subtitle:* "Detailed workflow description with roles and responsibilities"

3. ✅ **Compliance & Regulatory** (required)
   - Compliance Frameworks (checkboxes) ✅
   - ✅ Audit Frequency (required)
   - ✅ Review Frequency (required)
   - *Subtitle:* "Required: Identify all regulatory requirements"
   - *Visual:* Normal white background

4. ✅ **Workflow Steps**
   - Dynamic step builder ✅
   - Step name, actions, decision logic, quality checkpoints ✅
   - *Subtitle:* "Multi-phase workflow combining molecules and atoms"

5. ✅ **Troubleshooting**
   - Troubleshooting Matrix ✅
   - *Subtitle:* "Comprehensive troubleshooting with escalation"

6. ✅ **Governance** (full details)
   - Owner (Department) ✅
   - Maintainer (Person/Role) ✅
   - ✅ Approver ✅
   - ✅ **Additional Reviewers** (shown)

### Section Numbering
- Section 1: Core Information
- Section 2: Purpose & Scope
- Section 3: Compliance & Regulatory
- Section 4: Workflow Steps
- Section 5: Troubleshooting
- Section 6: Governance

### Required Fields: ~18 fields
### Estimated Output: ~297 lines

---

## 🟠 FULL SOP - Complete Documentation

### Template Banner
```
🟠 Full SOP - Complete Documentation
You're creating a full SOP with complete governance (~646 lines).
All fields and sections are required for comprehensive documentation.
```

### Visible Sections
1. ✅ **Core Information** (all 20+ metadata fields)
   - Title ✅
   - Department ✅
   - Process Category ✅
   - Complexity Level ✅
   - ✅ Estimated Duration ✅
   - Target Audience ✅
   - Search Keywords ✅

2. ✅ **Purpose & Scope**
   - Purpose ✅
   - Scope - What IS Covered ✅
   - Scope - What is NOT Covered ✅
   - *Subtitle:* "Comprehensive documentation with business value and strategic alignment"

3. ✅ **Compliance & Regulatory** (required, detailed)
   - Compliance Frameworks (checkboxes) ✅
   - ✅ Audit Frequency (required) ✅
   - ✅ Review Frequency (required) ✅
   - *Subtitle:* "Required: Detailed regulatory and compliance tracking"

4. ✅ **Procedure Steps** (comprehensive)
   - Dynamic step builder ✅
   - Step name, actions, decision logic, quality checkpoints ✅
   - *Subtitle:* "Comprehensive steps with full decision logic and quality controls"

5. ✅ **Troubleshooting** (full matrix)
   - Troubleshooting Matrix ✅
   - *Subtitle:* "Comprehensive troubleshooting matrix with escalation paths"

6. ✅ **Governance** (complete ownership chain)
   - Owner (Department) ✅
   - Maintainer (Person/Role) ✅
   - ✅ Approver ✅
   - ✅ Additional Reviewers ✅

### Section Numbering
- Section 1: Core Information
- Section 2: Purpose & Scope
- Section 3: Compliance & Regulatory
- Section 4: Procedure Steps
- Section 5: Troubleshooting
- Section 6: Governance

### Required Fields: 20+ fields
### Estimated Output: ~646 lines

---

## Comparison Matrix

| Feature | Atom | Molecule | Organism | SOP |
|---------|------|----------|----------|-----|
| **Sections Visible** | 4 | 6 | 6 | 6 |
| **Sections Hidden** | 2 | 0 | 0 | 0 |
| **Estimated Duration Field** | ❌ Hidden | ✅ Shown | ✅ Shown | ✅ Shown |
| **Compliance Section** | ❌ Hidden | ⚠️ Optional | ✅ Required | ✅ Required |
| **Procedure Steps** | ❌ Hidden | ✅ Shown | ✅ Shown | ✅ Shown |
| **Approver Field** | ❌ Hidden | ✅ Shown | ✅ Shown | ✅ Shown |
| **Reviewers Field** | ❌ Hidden | ❌ Hidden | ✅ Shown | ✅ Shown |
| **Audit Frequency Required** | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| **Review Frequency Required** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Section Renumbering** | ✅ Yes (1-4) | ❌ No (1-6) | ❌ No (1-6) | ❌ No (1-6) |

---

## Implementation Details

### JavaScript Functions

#### 1. `selectTemplate(type)`
- Updates selected template card styling
- Shows the contribution form
- Calls `configureFormSections(type)` to configure form
- Scrolls to form
- Initializes first step (only if procedure steps visible)

#### 2. `configureFormSections(type)`
- Gets all 6 form sections
- Gets specific fields (estimatedDuration, approver, reviewers, etc.)
- Resets all sections to visible
- Updates template banner
- Applies template-specific configuration:
  - Shows/hides sections
  - Updates section titles and subtitles
  - Shows/hides specific fields
  - Sets required/optional attributes
  - Updates visual styling (compliance section)
- Renumbers visible sections

#### 3. `updateTemplateBanner(type)`
- Updates banner title with icon and template name
- Updates description text
- Populates section list with template-specific information
- Shows strikethrough for hidden sections

#### 4. `updateSectionNumbers()`
- Finds all visible sections
- Renumbers them sequentially (1, 2, 3, 4...)
- Updates the circular number badges

### Visual Indicators

**Compliance Section Styling:**
- **Molecule:** Yellow background (#fffef0) with orange left border (#FFA726) to indicate optional status
- **Organism/SOP:** Normal white background to indicate required status

**Template Banner:**
- Shows icon matching template card (🔵 🟣 🟢 🟠)
- Lists all sections with strikethrough for hidden ones
- Provides complexity estimate (~128, ~201, ~297, ~646 lines)

---

## User Experience Flow

1. **User visits contribute page**
   - Sees 4 template cards (Atom, Molecule, Organism, SOP)
   - Each card shows complexity level and examples

2. **User selects template type**
   - Card highlights with blue border and light blue background
   - Template banner appears with icon, description, and section list
   - Form appears below with only relevant sections visible
   - Section numbers adjust dynamically (1-4 for Atom, 1-6 for others)

3. **User fills out form**
   - Only sees fields relevant to chosen complexity level
   - Required fields clearly marked with red asterisk
   - Optional compliance section highlighted in yellow (Molecule only)
   - Helpful hints and examples provided for each field

4. **User submits or saves draft**
   - Form validates only visible required fields
   - Submission includes template type in formData

---

## Benefits

✅ **Reduced Cognitive Load:** Users only see fields relevant to their template type
✅ **Faster Completion:** Atoms take minutes vs. hours for full SOPs
✅ **Clearer Requirements:** Visual indicators show required vs. optional sections
✅ **Progressive Complexity:** Start simple (Atom) and grow to complex (SOP)
✅ **Consistent Structure:** All templates follow same atomic design principles
✅ **Better UX:** Dynamic section numbering maintains logical flow

---

## Testing Checklist

- [x] Atom shows 4 sections (1, 2, 5, 6 → renumbered to 1-4)
- [x] Atom hides compliance and procedure steps
- [x] Atom hides estimated duration, approver, reviewers fields
- [x] Molecule shows all 6 sections
- [x] Molecule shows compliance with yellow highlight (optional)
- [x] Molecule shows estimated duration and approver
- [x] Organism shows all 6 sections
- [x] Organism makes compliance required (white background)
- [x] Organism shows all governance fields (approver + reviewers)
- [x] SOP shows all 6 sections with comprehensive subtitles
- [x] SOP makes all fields required
- [x] Template banner updates correctly for each type
- [x] Section numbers renumber dynamically
- [x] Step initialization only happens when procedure steps visible

---

## Files Modified

- ✏️ `public/contribute.html` - Added dynamic form configuration
  - Added template banner HTML (lines 529-533)
  - Added `updateTemplateBanner()` function (lines 837-903)
  - Added `configureFormSections()` function (lines 905-1029)
  - Added `updateSectionNumbers()` function (lines 1031-1038)
  - Modified `selectTemplate()` to call configuration (line 818)

---

## Validation

### Before Implementation
- ❌ All templates showed same 6 sections
- ❌ All templates showed same 20+ fields
- ❌ No visual indication of template requirements
- ❌ User needed to manually skip sections (using CONTRIBUTING_GUIDE.md)

### After Implementation
- ✅ Each template shows only relevant sections
- ✅ Field count varies by complexity (10 → 15 → 18 → 20+)
- ✅ Visual indicators (banners, colors, strikethrough)
- ✅ Automatic section hiding/showing
- ✅ Dynamic field requirement management
- ✅ Section renumbering for logical flow

---

**Implementation Status:** ✅ Complete
**Testing Status:** ✅ Verified
**Documentation:** ✅ Complete

**Ready for:**
- User testing
- Commit and push
- Pull request creation
