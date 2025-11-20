# Contribution Screen Redesign Plan

**Date**: 2025-11-20
**Branch**: `claude/fix-atoms-and-contrast-01UdMnHdE5dsASzYkDAsxTRJ`
**Based On**: Modern Documentation Systems Research (docs-as-code, atomic design, semantic search)

---

## Executive Summary

Complete redesign of contribute.html based on atomic design principles, modern information architecture, and GenAI best practices. This addresses fundamental workflow issues, not just surface bugs.

---

## Current Problems

### Critical Issues
1. **Wrong Atomic Workflow**: Atoms show construction section (atoms are base level, NOT composed)
2. **Wrong Terminology**: Generic "components" instead of specific atomic terms
3. **Missing Metadata**: No rich classification data for search/discovery
4. **No Faceted Classification**: Can't view from multiple perspectives
5. **Poor Information Architecture**: Doesn't follow 3-4 level depth guidelines
6. **Contrast Issues**: Blue backgrounds with black text (WCAG fail)

### User Impact
- Confusion about what each template type means
- Incorrect workflows that violate atomic principles
- Hard to find documentation later (no rich metadata)
- Inaccessible to users with visual impairments

---

## Design Principles (from Research)

### 1. Atomic Design Hierarchy
```
Atoms (🔵)
  ↓
Modules (🟣) = Combine atoms into task sequences
  ↓
Organisms (🟢) = Combine atoms + modules into workflows
  ↓
Complete SOPs (🔴) = End-to-end procedures using all types
```

### 2. Information Architecture
- **Taxonomy**: Hierarchical classification with controlled vocabularies
- **Faceted Classification**: Multiple independent dimensions
- **Rich Metadata**: Dublin Core + domain-specific extensions
- **Relationship Modeling**: Sequential, conditional, resource dependencies

### 3. Naming Conventions
- Format: `SOP-[Category]-[Number]_[Title]_v[Version].md`
- Semantic Versioning: `Major.Minor.Patch`
- Dates: `YYYY-MM-DD` (sortable)
- Delimiters: Underscores for main components, hyphens within

### 4. GenAI Integration
- PTCF prompts (Persona-Task-Context-Format)
- Human-in-the-loop workflows
- RAG for accuracy (42-68% hallucination reduction)
- Automated quality assurance

---

## Redesign Phases

### Phase 1: Core Atomic Workflows ✅ (This PR)

#### 1.1 Terminology Fixes
**Replace generic "components" with specific terms:**

| Current | New (Context-Dependent) |
|---------|-------------------------|
| "Build from Components" | "Build from Atoms" (modules) |
| | "Build from Atoms & Modules" (organisms) |
| | "Build from Atoms, Modules & Organisms" (SOPs) |
| "Component Library" | "Atom Library" (modules) |
| | "Atom & Module Library" (organisms) |
| | "Full Component Library" (SOPs) |
| "components" (generic) | "atoms", "modules", "organisms" (specific) |

**Update labels throughout:**
- Form section headers
- Mode descriptions
- Library titles
- Help text
- Console messages

#### 1.2 Template-Specific Workflows

**Atoms (🔵) - Base Level**
- NO Section 3.5 (no construction section at all)
- Only show Section 4: Procedure Steps
- Help text: "Atoms are single-purpose, reusable components. Write clear, focused steps."
- No component selection (atoms don't reference other atoms)

**Modules (🟣) - Task Sequences**
- Show Section 3.5 with title: "Build from Atoms"
- Three construction modes:
  - ✍️ Write Custom Steps
  - 🧱 Hybrid: Combine atoms with custom steps (recommended)
  - 📦 Build from Atoms: Assemble entirely from atoms
- Library shows: Atoms only (filter `type === 'atom'`)
- Help text: "Modules combine multiple atoms into task sequences."

**Organisms (🟢) - Workflows**
- Show Section 3.5 with title: "Build from Atoms & Modules"
- Three construction modes (same structure as modules)
- Library shows: Atoms + Modules (filter `type in ['atom', 'molecule']`)
- Help text: "Organisms combine atoms and modules into complete workflows."

**Complete SOPs (🔴) - End-to-End Procedures**
- Show Section 3.5 with title: "Build from Atoms, Modules & Organisms"
- Three construction modes (same structure)
- Library shows: Everything (filter `type in ['atom', 'molecule', 'organism']`)
- Help text: "Complete SOPs use all component types for end-to-end procedures."

#### 1.3 Section 3.5 Visibility Logic

**Current Bug**: Section shows for atoms despite hide logic

**Fix Strategy**:
```javascript
function updateHybridConstructionVisibility(templateType) {
    const hybridSection = document.getElementById('hybridConstructionSection');

    // Atoms = NO construction section (atoms are base level)
    if (templateType === 'atom') {
        if (hybridSection) {
            hybridSection.style.display = 'none';
            hybridSection.setAttribute('data-hidden-for-atom', 'true'); // Debug marker
        }
        // Force show procedure steps
        document.querySelector('#procedureStepsSection').style.display = 'block';
        return; // Early return - don't process anything else
    }

    // All other types show construction section
    if (hybridSection) {
        hybridSection.style.display = 'block';
        hybridSection.removeAttribute('data-hidden-for-atom');
    }

    // Update text based on specific template type
    updateConstructionText(templateType);
}
```

#### 1.4 Fix "Build from Atoms" Click Handler

**Current Bug**: Clicking mode options causes page reload

**Root Cause**: Form submission not properly prevented

**Fix**: Ensure all event handlers use `return false` and `preventDefault`:
```javascript
function handleModeClick(mode, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    selectConstructionMode(mode);

    return false; // Critical: prevents form submission
}
```

**HTML**:
```html
<div onclick="return handleModeClick('inline', event);">
```

### Phase 2: Rich Metadata Schema (Next PR)

Add comprehensive metadata fields based on Dublin Core + domain-specific extensions:

#### 2.1 Identification Section
- **Document ID**: Auto-generated `SOP-[Category]-[Number]`
- **Title**: User-entered
- **Version**: Semantic versioning `Major.Minor.Patch` with auto-increment
- **Document Type**: Auto-set based on template (atom/module/organism/sop)

#### 2.2 Lifecycle Management
- **Status**: Draft | In Review | Approved | Active | Archived
- **Review Cycle**: 30/60/90/180/365 days
- **Next Review Date**: Auto-calculated from review cycle
- **Effective Date**: When procedure goes live
- **Expiration Date**: Optional (for temporary procedures)

#### 2.3 Ownership & Accountability
- **Author**: User creating document
- **Owner**: Person responsible for maintenance
- **Reviewer**: Subject matter experts (multi-select)
- **Approver**: Person with sign-off authority
- **Contact**: Primary point of contact for questions

#### 2.4 Classification (Faceted)

**Functional Area** (multi-select):
- Safety
- Quality Assurance
- Manufacturing
- Human Resources
- Finance & Accounting
- IT & Systems
- Customer Service
- Supply Chain
- Research & Development

**Process Type**:
- Operational (day-to-day activities)
- Maintenance (equipment/system upkeep)
- Inspection (quality checks)
- Administrative (paperwork/approval)
- Emergency (incident response)

**Compliance Domain** (multi-select):
- ISO 9001 (Quality Management)
- ISO 14001 (Environmental)
- FDA 21 CFR Part 11 (Electronic Records)
- OSHA (Workplace Safety)
- GDPR (Data Privacy)
- SOC 2 (Security Controls)
- HIPAA (Healthcare Privacy)
- GMP (Good Manufacturing Practice)

**Audience Role** (multi-select):
- Operators (frontline workers)
- Supervisors (team leads)
- Quality Inspectors
- Managers
- Executives
- Auditors
- Contractors

**Lifecycle Stage**:
- Development (in progress)
- Production (active use)
- Quality Control (verification)
- Training (learning materials)
- Archived (historical reference)

#### 2.5 Relationships
- **Prerequisites**: SOPs that must be completed first (search + select)
- **Related Procedures**: Associated documentation (search + select)
- **Supersedes**: Previous version this replaces
- **References**: External standards, regulations, forms

#### 2.6 Compliance & Risk
- **Regulatory Requirements**: Specific regulations met (free text + tags)
- **Training Required**: Yes/No + Training program name
- **Risk Level**: Low | Medium | High | Critical
- **Safety Critical**: Yes/No (special handling if yes)

#### 2.7 Dublin Core Mapping
- **Title**: Same as Title field
- **Creator**: Same as Author
- **Subject**: Generated from Keywords + Category
- **Description**: Same as Description field
- **Publisher**: Organization name (from config)
- **Contributor**: Same as Reviewer
- **Date**: Created_Date
- **Type**: Document_Type (atom/module/organism/sop)
- **Format**: text/markdown
- **Identifier**: Document_ID
- **Source**: Git repository URL
- **Language**: en-US (configurable)
- **Relation**: Prerequisites + Related_Procedures
- **Coverage**: Department + Functional_Area
- **Rights**: License (MIT, internal, proprietary)

### Phase 3: Enhanced UX & Accessibility (Next PR)

#### 3.1 Visual Hierarchy
- Color-coded template types:
  - 🔵 Atoms: Blue (#2563eb)
  - 🟣 Modules: Purple (#7c3aed)
  - 🟢 Organisms: Green (#059669)
  - 🔴 Complete SOPs: Red (#dc2626)

#### 3.2 WCAG 2.1 AA Compliance
- Contrast ratio 4.5:1 minimum for body text
- Contrast ratio 3:1 minimum for large text
- All interactive elements keyboard accessible
- ARIA labels on all form controls
- Focus indicators visible and high-contrast

**Current Failures to Fix**:
- `.bg-primary` (blue #2563eb) with black text: FAIL
- Fix: Use white text (#ffffff) for sufficient contrast

#### 3.3 Progressive Disclosure
- Show only relevant fields based on template type
- Collapsible sections for advanced metadata
- Inline help tooltips (hover/focus for definitions)
- Examples in placeholder text

#### 3.4 Contextual Help
- Explanation of atomic design principles at top
- Visual diagram showing atom → module → organism → sop hierarchy
- "What should I choose?" decision tree
- Links to documentation for each template type

#### 3.5 Validation & Feedback
- Real-time validation (red border + error message)
- Required field indicators (asterisks)
- Character count for text areas
- Preview pane showing formatted output
- Success messages on save/submit

### Phase 4: AI Integration (Future PR)

#### 4.1 GenAI Content Assistance
- "Generate from description" button using PTCF prompts:
  - **Persona**: "Act as an experienced [department] operations specialist"
  - **Task**: "Draft initial steps for [title]"
  - **Context**: "This is a [template-type] for [audience] in [functional-area]"
  - **Format**: "Numbered list with clear action verbs and responsible parties"

#### 4.2 Automated Quality Checks
- Readability scoring (Flesch-Kincaid)
- Completeness checks (all required sections present)
- Consistency validation (terminology matches standards)
- Link checking (all references valid)
- Compliance scanning (required regulatory language present)

#### 4.3 Intelligent Suggestions
- Related atoms/modules based on semantic similarity
- Tag suggestions based on content analysis
- Category recommendations from classification models
- Prerequisite detection (mentions of other procedures)

#### 4.4 Human-in-the-Loop Workflow
- AI generates draft → Human reviews → Human approves → System saves
- Confidence scores shown for AI suggestions
- Easy accept/reject interface for recommendations
- Feedback loop to improve future suggestions

---

## Implementation Order

### Sprint 1: Core Fixes (This PR)
- [ ] Fix terminology (components → atoms/modules/organisms)
- [ ] Implement proper atomic workflows (no construction for atoms)
- [ ] Fix Section 3.5 visibility logic (atoms must hide it)
- [ ] Fix "Build from Atoms" click handler (prevent page reload)
- [ ] Fix contrast issues (WCAG 2.1 AA compliance)
- [ ] Add debugging error messages
- [ ] Test all template types end-to-end
- [ ] Update documentation

### Sprint 2: Metadata Schema (Next PR)
- [ ] Design metadata form sections
- [ ] Implement faceted classification dropdowns
- [ ] Add relationship linking (prerequisites, related)
- [ ] Implement semantic versioning logic
- [ ] Add Dublin Core mapping
- [ ] Update backend to store extended metadata
- [ ] Update graph structure to include metadata

### Sprint 3: UX Enhancements (Next PR)
- [ ] Visual template type indicators
- [ ] Progressive disclosure for advanced fields
- [ ] Contextual help system
- [ ] Preview pane
- [ ] Validation and error handling
- [ ] Keyboard navigation
- [ ] Mobile responsiveness

### Sprint 4: AI Integration (Future PR)
- [ ] GenAI content generation
- [ ] Automated quality checks
- [ ] Intelligent suggestions
- [ ] Human-in-the-loop workflows
- [ ] Feedback system

---

## Success Metrics

### Immediate (Sprint 1)
- ✅ Zero instances of construction section showing for atoms
- ✅ Zero page reloads when selecting construction modes
- ✅ 100% WCAG 2.1 AA compliance (contrast ratios)
- ✅ Correct terminology throughout (no "components")

### Short-term (Sprints 2-3)
- 80%+ user satisfaction with contribution workflow
- 50% reduction in time to create SOPs
- 90%+ metadata completeness (required fields filled)
- Zero accessibility violations in automated testing

### Long-term (Sprint 4+)
- 30-50% productivity gains (matching industry benchmarks)
- 31-49% reduction in support tickets (from better docs)
- 80%+ adoption rate within 12 months
- 95%+ compliance rate in audits

---

## Risk Mitigation

### Technical Risks
- **Risk**: Changes break existing functionality
  - **Mitigation**: Comprehensive testing, staged rollout

- **Risk**: Performance degradation with rich metadata
  - **Mitigation**: Lazy loading, indexing, caching

### User Adoption Risks
- **Risk**: Users confused by new terminology
  - **Mitigation**: Contextual help, training materials, gradual rollout

- **Risk**: Metadata fields overwhelming
  - **Mitigation**: Progressive disclosure, smart defaults, optional fields

### Compliance Risks
- **Risk**: Metadata changes affect audit trails
  - **Mitigation**: Git history preserves everything, backward compatibility

---

## References

- Modern Documentation Systems Research (2025-11-20)
- Atomic Design Principles (Brad Frost)
- Dublin Core Metadata Initiative
- WCAG 2.1 Guidelines
- Docs-as-Code Best Practices
- RAG Architecture Patterns
- Semantic Versioning Specification

---

## Approval & Sign-Off

- [ ] User review and approval
- [ ] Technical review
- [ ] UX review
- [ ] Accessibility review
- [ ] Security review

---

**Next Action**: Begin Sprint 1 implementation with terminology fixes and atomic workflow corrections.
