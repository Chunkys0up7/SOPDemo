# User Journey & Navigation Deep Dive

**Version:** 1.0.0
**Last Updated:** 2025-11-13
**Status:** UX Analysis & Design

---

## Executive Summary

This document analyzes the complete user journey through the SOP ecosystem, identifies navigation pain points, and proposes a cohesive update workflow that makes this the definitive system of record.

### Critical Insights

1. **Current State**: Users have 4 disconnected pages (Home, Upload, Dashboard, Dependencies) with no clear flow
2. **Pain Point**: No update workflow - users can upload new versions but can't see what changes or impacts
3. **Opportunity**: Create seamless "view → analyze → update → review → publish" journey
4. **Goal**: Make SOP updates as easy as editing a Google Doc, but with enterprise rigor

---

## Current User Journey Analysis

### Journey Map: As-Is State

```
┌─────────────────────────────────────────────────────────────┐
│ Entry Points (Fragmented)                                   │
├─────────────────────────────────────────────────────────────┤
│ • Email notification: "SOP needs review" → ❓ Where to go?  │
│ • Slack message: "Update the invoice SOP" → ❓ How?         │
│ • Manager request: "Can you check dependencies?" → ❓ What?  │
│ • Compliance audit: "Update for SOX" → ❓ Which sections?   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Find the SOP (3-5 minutes, high friction)          │
├─────────────────────────────────────────────────────────────┤
│ ❌ No search on home page                                   │
│ ❌ No "My SOPs" quick filter                                │
│ ⚠️  User navigates: Home → Graph → Click nodes → Find SOP  │
│ ⚠️  Or: Guesses URL /dist/sops/sop-001.md                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 2: View SOP (1-2 minutes, medium friction)            │
├─────────────────────────────────────────────────────────────┤
│ ✅ Can view markdown (plain text)                           │
│ ❌ No formatted view (tables, images not rendered)          │
│ ❌ No TOC navigation                                        │
│ ❌ No section anchors                                       │
│ ❓ "Is this the latest version?"                            │
│ ❓ "Who owns this?"                                         │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Understand Dependencies (2-3 min, high friction)   │
├─────────────────────────────────────────────────────────────┤
│ ⚠️  Navigate away: Home → Dependency View                   │
│ ⚠️  Search for SOP-001 in dropdown                          │
│ ✅ See dependencies (good!)                                 │
│ ❌ No "back to SOP" link                                    │
│ ❌ Lost context - which section was I reviewing?            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 4: Decide to Update (DEAD END)                        │
├─────────────────────────────────────────────────────────────┤
│ ❌ No "Edit this SOP" button                                │
│ ❌ No update workflow                                       │
│ ❌ User exits system, edits in Word, emails to manager      │
│ ❌ Manager uploads via Upload page (disconnected)           │
│ ❌ No change tracking                                       │
│ ❌ No impact preview before save                            │
└─────────────────────────────────────────────────────────────┘
                           ↓
                      [USER EXITS]
                     System of Record
                     Status: FAILED
```

### Pain Points Summary

| Issue | Impact | Frequency | Severity |
|-------|--------|-----------|----------|
| No unified navigation | Users get lost | Every session | High |
| No search/filter | Can't find SOPs quickly | 80% of sessions | High |
| No inline edit | Forces external tools | Every update | Critical |
| No impact preview | Breaks dependencies | 30% of updates | Critical |
| Disconnected pages | Mental overhead | Every session | Medium |
| No version history | Can't track changes | Every update | High |
| No change comparison | Don't know what changed | Every review | High |

---

## Proposed User Journey: Future State

### Journey Map: To-Be State

```
┌─────────────────────────────────────────────────────────────┐
│ Entry Point: Unified Dashboard (All paths lead here)       │
├─────────────────────────────────────────────────────────────┤
│ ✅ Email link → Opens SOP in viewer with context           │
│ ✅ Slack notification → Deep link to section               │
│ ✅ Direct URL → SOP viewer with nav                        │
│ ✅ Search bar → Find any SOP instantly                     │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 1: SOP Viewer (Integrated, 10 seconds)                │
├─────────────────────────────────────────────────────────────┤
│ ✅ Rendered markdown (tables, formatting, images)           │
│ ✅ Sticky header with nav: [← Back] [🔍 Search] [⚙️ Menu]  │
│ ✅ Left sidebar: TOC with section links                    │
│ ✅ Right sidebar: Metadata card (owner, version, status)   │
│ ✅ Inline action buttons:                                  │
│    • [✏️ Edit This Section]                                │
│    • [🔗 View Dependencies]                                │
│    • [📊 Impact Analysis]                                  │
│    • [📜 Version History]                                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Edit Mode (Contextual, inline)                     │
├─────────────────────────────────────────────────────────────┤
│ ✅ Click "Edit This Section" → Inline editor opens         │
│ ✅ Markdown WYSIWYG editor with preview                    │
│ ✅ Live validation (broken links highlighted)               │
│ ✅ Template suggestions (based on SOP type)                │
│ ✅ Auto-save draft every 30 seconds                        │
│ ✅ Change summary auto-generated:                          │
│    "You modified 3 paragraphs in 'Prerequisites'"         │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Impact Preview (Before Save, automatic)            │
├─────────────────────────────────────────────────────────────┤
│ ✅ System analyzes changes in background                   │
│ ✅ Shows impact panel:                                     │
│    ⚠️  2 SOPs reference this section:                      │
│       • SOP-002 (IT Access) - Section: Prerequisites      │
│       • SOP-005 (HR Onboarding) - Section: Week 1         │
│    💡 Recommendation: Notify owners before publishing     │
│ ✅ One-click notifications: [Notify All] button            │
│ ✅ Preview diff: [Show Changes] highlights what's new      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 4: Review & Publish (Guided workflow)                 │
├─────────────────────────────────────────────────────────────┤
│ ✅ Change summary shows:                                   │
│    • Sections modified: Prerequisites (12 lines changed)  │
│    • Version bump: 1.2.0 → 1.3.0 (auto-suggested)         │
│    • Approvers needed: Finance Manager (auto-detected)    │
│    • Impact score: Medium (2 dependent SOPs)              │
│ ✅ Required fields (progressive):                          │
│    1. Change reason: [dropdown] "Process improvement"     │
│    2. Effective date: [date picker] Default: Upon approval│
│    3. Approvers: [auto-filled] Edit if needed             │
│ ✅ Actions:                                                │
│    [Save Draft] [Request Approval] [Publish (if allowed)] │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 5: Approval Workflow (Automated notifications)        │
├─────────────────────────────────────────────────────────────┤
│ ✅ Approvers notified via Slack + Email                    │
│ ✅ Approval dashboard shows:                               │
│    • Side-by-side diff view                               │
│    • Impact analysis                                       │
│    • One-click approve/reject                             │
│ ✅ Real-time status updates to author                      │
│ ✅ If rejected → Inline comments, return to edit           │
│ ✅ If approved → Auto-publish + notify stakeholders        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 6: Published! (Automatic downstream updates)          │
├─────────────────────────────────────────────────────────────┤
│ ✅ New version live: SOP-001 v1.3.0                        │
│ ✅ Dependent SOP owners notified:                          │
│    "SOP-001 (which you reference) was updated"           │
│ ✅ Graph updated automatically                             │
│ ✅ Metrics tracked: Author gets +1 contribution            │
│ ✅ Email confirmation to author with:                      │
│    • Published URL                                         │
│    • View count tracking                                   │
│    • Feedback collection                                   │
└─────────────────────────────────────────────────────────────┘
                           ↓
                  [CYCLE COMPLETE]
                  System of Record
                  Status: SUCCESS ✅
```

### Time Comparison

| Task | As-Is (Current) | To-Be (Proposed) | Improvement |
|------|-----------------|------------------|-------------|
| Find SOP | 3-5 min | 10 sec | **18x faster** |
| View formatted | N/A (plain text) | Instant | **New capability** |
| Check dependencies | 2-3 min (separate page) | Inline, 5 sec | **24x faster** |
| Make update | 15 min (export, edit, email) | 2 min (inline edit) | **7.5x faster** |
| Impact preview | Manual (if at all) | Automatic | **Risk reduction** |
| Approval | Email chain (days) | 1-2 hours (automated) | **20x faster** |
| **Total update cycle** | **2-5 days** | **2-3 hours** | **24x faster** |

---

## Information Architecture Redesign

### Proposed Site Structure

```
┌─────────────────────────────────────────────────────────────┐
│ GLOBAL HEADER (Persistent on all pages)                     │
├─────────────────────────────────────────────────────────────┤
│ 🏠 SOP Hub    [🔍 Search...]    [👤 My Account ▼]           │
│                                                              │
│ Navigation:                                                  │
│ • Browse SOPs                                               │
│ • My Contributions                                          │
│ • Pending Approvals (badge: 3)                             │
│ • Templates                                                 │
│ • Analytics                                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PAGE: SOP Viewer (Primary interface)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──────────┐ ┌────────────────────────┐ ┌──────────────┐   │
│ │          │ │ MAIN CONTENT           │ │              │   │
│ │   TOC    │ │                        │ │   METADATA   │   │
│ │          │ │ # SOP Title            │ │              │   │
│ │ • Over-  │ │                        │ │ Owner: HR    │   │
│ │   view   │ │ ## Overview            │ │ Version: 1.2 │   │
│ │ • Prereq │ │ [content...]           │ │ Status: ✅   │   │
│ │ • Steps  │ │                        │ │              │   │
│ │          │ │ [✏️ Edit Section]       │ │ [Edit]       │   │
│ │          │ │                        │ │ [Clone]      │   │
│ │          │ │ ## Prerequisites       │ │ [Archive]    │   │
│ │          │ │ [content...]           │ │              │   │
│ │          │ │                        │ │ Dependencies │   │
│ │          │ │ [✏️ Edit Section]       │ │ Depends on:2 │   │
│ │          │ │                        │ │ Used by: 1   │   │
│ │          │ │                        │ │ [View Full→] │   │
│ └──────────┘ └────────────────────────┘ └──────────────┘   │
│                                                              │
│ BREADCRUMB: Home > Finance > Invoice Processing            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PAGE: Browse/Search                                         │
├─────────────────────────────────────────────────────────────┤
│ Filters:                           Results:                 │
│ ☑ Finance     Search: "invoice"   ┌──────────────────────┐ │
│ ☐ HR                               │ SOP-001: Invoice     │ │
│ ☐ IT                               │ Processing v2.1      │ │
│ ☐ Legal                            │ Updated 2 days ago   │ │
│                                    │ Owner: Finance       │ │
│ Status:                            └──────────────────────┘ │
│ ☑ Active                           ┌──────────────────────┐ │
│ ☐ Draft                            │ SOP-007: Expense     │ │
│ ☐ Archived                         │ Reimbursement v1.0   │ │
│                                    └──────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PAGE: My Dashboard                                          │
├─────────────────────────────────────────────────────────────┤
│ Tabs:                                                       │
│ [My SOPs (8)] [Drafts (2)] [Watching (5)] [Approvals (3)]  │
│                                                              │
│ My SOPs:                                                    │
│ • Invoice Processing (Owner) - Updated 2 days ago          │
│ • Budget Approval (Contributor) - In review                │
│ ...                                                          │
└─────────────────────────────────────────────────────────────┘
```

### Navigation Flows

**Flow 1: Quick Update**

```
Home → Search "invoice" → SOP-001 viewer →
Edit Section → Impact preview → Publish → Done
(~2 minutes)
```

**Flow 2: New SOP from Template**

```
Home → Templates → Select "Finance SOP" →
Fill form → Auto-generate structure →
Edit sections → Publish → Done
(~10 minutes)
```

**Flow 3: Dependency Check Before Update**

```
SOP Viewer → Click "Dependencies" in sidebar →
Inline panel shows impacts → Notify owners →
Proceed with edit
(~30 seconds)
```

**Flow 4: Approval**

```
Email notification → Click link →
Approval page (diff view) →
[Approve] button → Done
(~1 minute)
```

---

## Update Workflow Design

### Update Flow States

```
[View Mode] ──────→ [Edit Mode] ──────→ [Preview Impact]
     ↑                   ↓                      ↓
     │              [Auto-save]          [Notify Owners]
     │                   ↓                      ↓
     └───────────── [Discard] ←─────────  [Request Approval]
                                                ↓
                                         [Approval Pending]
                                           ↙        ↘
                                   [Approved]   [Rejected]
                                      ↓             ↓
                                  [Publish]   [Back to Edit]
                                      ↓
                                  [Live] ──→ [Monitor Feedback]
```

### Edit Mode Features

**1. Inline Section Editing**

```html
<section id="prerequisites">
  <h2>Prerequisites
    <button class="edit-btn">✏️ Edit This Section</button>
  </h2>

  <!-- When clicked, transforms to: -->
  <div class="editor">
    <textarea><!-- Markdown content --></textarea>
    <div class="preview"><!-- Live preview --></div>

    <div class="actions">
      <button>💾 Save Draft</button>
      <button>👁️ Preview Impact</button>
      <button>✅ Done Editing</button>
      <button>❌ Cancel</button>
    </div>
  </div>
</section>
```

**2. Impact Preview Panel**

```
┌────────────────────────────────────────────────┐
│ 📊 Impact Analysis                             │
├────────────────────────────────────────────────┤
│ Changes detected in section: "Prerequisites"  │
│                                                │
│ ⚠️  Impacts:                                   │
│ • 2 SOPs reference this section               │
│   - SOP-002 (IT Access) - Section: Intro      │
│   - SOP-005 (HR Onboarding) - Section: Week 1 │
│                                                │
│ • 15 users have this SOP bookmarked           │
│                                                │
│ Recommendations:                               │
│ ☑ Notify dependent SOP owners                 │
│ ☑ Update version: 1.2.0 → 1.3.0               │
│ ☐ Mark as breaking change                     │
│                                                │
│ [Notify All] [Continue]                       │
└────────────────────────────────────────────────┘
```

**3. Version Comparison View**

```
┌────────────────────────┬────────────────────────┐
│ Current (v1.2.0)       │ Your Changes (v1.3.0)  │
├────────────────────────┼────────────────────────┤
│ Before changes...      │ After changes...       │
│                        │                        │
│ - Old line removed     │                        │
│ Unchanged line         │ Unchanged line         │
│                        │ + New line added       │
│ ~ Modified line        │ ~ Modified line (new)  │
└────────────────────────┴────────────────────────┘
```

---

## Templates System

### SOP Template Types

**1. Standard Operating Procedure**

```yaml
template_id: standard-sop
sections:
  - Overview
  - Purpose & Scope
  - Roles & Responsibilities
  - Prerequisites
  - Procedure Steps
  - Quality Checks
  - Troubleshooting
  - References
  - Appendix

suggested_for:
  - Process documentation
  - Operational procedures
```

**2. Policy Document**

```yaml
template_id: policy
sections:
  - Policy Statement
  - Purpose
  - Scope & Applicability
  - Definitions
  - Policy Details
  - Compliance Requirements
  - Roles & Responsibilities
  - Enforcement
  - Review & Approval
  - Related Documents

suggested_for:
  - HR policies
  - Security policies
  - Compliance documents
```

**3. Quick Reference Guide**

```yaml
template_id: quick-reference
sections:
  - Overview
  - Quick Steps (numbered)
  - Common Issues & Solutions
  - Tips & Best Practices
  - Contact for Help

suggested_for:
  - User guides
  - Troubleshooting
  - FAQs
```

**4. Checklist**

```yaml
template_id: checklist
sections:
  - Checklist Purpose
  - Prerequisites
  - Checklist Items (checkboxes)
  - Sign-off Section

suggested_for:
  - Onboarding checklists
  - Audit checklists
  - Pre-flight checks
```

### Template Picker UI

```
┌─────────────────────────────────────────────────────────────┐
│ Create New SOP - Choose Template                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│ │              │ │              │ │              │         │
│ │  📄 Standard │ │  📋 Policy   │ │  ⚡ Quick    │         │
│ │     SOP      │ │   Document   │ │  Reference   │         │
│ │              │ │              │ │              │         │
│ │ Full process │ │ HR, Security │ │ Simple guide │         │
│ │ documentation│ │ Compliance   │ │ How-to       │         │
│ │              │ │              │ │              │         │
│ │   [Select]   │ │   [Select]   │ │   [Select]   │         │
│ └──────────────┘ └──────────────┘ └──────────────┘         │
│                                                              │
│ ┌──────────────┐ ┌──────────────┐                          │
│ │  ✅ Checklist│ │  🎯 Custom   │                          │
│ │              │ │              │                          │
│ │ Task lists   │ │ Start blank  │                          │
│ │ Onboarding   │ │ Define your  │                          │
│ │              │ │ own structure│                          │
│ │   [Select]   │ │   [Select]   │                          │
│ └──────────────┘ └──────────────┘                          │
│                                                              │
│ Or clone existing: [Search SOPs...] [Clone as Template]    │
└─────────────────────────────────────────────────────────────┘
```

---

## Navigation Improvements

### Global Navigation Bar

```html
<nav class="global-nav">
  <div class="nav-left">
    <a href="/" class="logo">🔷 SOP Hub</a>

    <div class="search-bar">
      <input type="search" placeholder="Search SOPs..." />
      <button>🔍</button>
    </div>
  </div>

  <div class="nav-center">
    <a href="/browse">Browse</a>
    <a href="/dashboard">My Dashboard</a>
    <a href="/approvals" class="has-badge">
      Approvals <span class="badge">3</span>
    </a>
    <a href="/templates">Templates</a>
  </div>

  <div class="nav-right">
    <button class="btn-primary">+ New SOP</button>
    <div class="user-menu">
      <img src="/avatar.jpg" class="avatar" />
      <span>Alice Smith</span>
      <ul class="dropdown">
        <li><a href="/profile">My Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/help">Help</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
```

### Contextual Navigation (SOP Viewer)

```html
<!-- Breadcrumb -->
<div class="breadcrumb">
  <a href="/">Home</a> /
  <a href="/browse?dept=finance">Finance</a> /
  <span>Invoice Processing</span>
</div>

<!-- Action Bar -->
<div class="action-bar">
  <div class="left">
    <button>← Back to Browse</button>
    <button>⭐ Bookmark</button>
    <button>👁️ Watch</button>
  </div>

  <div class="right">
    <button class="btn-primary">✏️ Edit</button>
    <button>⋮ More Actions</button>
  </div>
</div>

<!-- Table of Contents (Sticky Sidebar) -->
<aside class="toc-sidebar sticky">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#overview" class="active">Overview</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#steps">Procedure Steps</a></li>
    <li><a href="#qa">Quality Checks</a></li>
  </ul>

  <div class="quick-actions">
    <button>📊 Dependencies</button>
    <button>📜 Version History</button>
    <button>💬 Comments (5)</button>
  </div>
</aside>
```

### Footer Navigation

```html
<footer class="site-footer">
  <div class="footer-sections">
    <div>
      <h4>Documentation</h4>
      <ul>
        <li><a href="/docs/getting-started">Getting Started</a></li>
        <li><a href="/docs/best-practices">Best Practices</a></li>
        <li><a href="/docs/templates">Template Guide</a></li>
      </ul>
    </div>

    <div>
      <h4>Support</h4>
      <ul>
        <li><a href="/help">Help Center</a></li>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/feedback">Give Feedback</a></li>
      </ul>
    </div>

    <div>
      <h4>System</h4>
      <ul>
        <li><a href="/status">System Status</a></li>
        <li><a href="/changelog">Changelog</a></li>
        <li><a href="/api">API Docs</a></li>
      </ul>
    </div>
  </div>
</footer>
```

---

## Key UX Principles

### 1. **Progressive Disclosure**

Don't overwhelm users. Show core actions first, advanced options on demand.

**Example:**

- Default: [Edit] [Dependencies] buttons visible
- Advanced: [Version History] [Analytics] [Export] behind "More Actions" menu

### 2. **Contextual Actions**

Actions appear where users need them, not in a distant menu.

**Example:**

- "Edit This Section" button appears on hover over each section
- "View Dependencies" appears when hovering over cross-references

### 3. **Feedback at Every Step**

Users always know what's happening and what to do next.

**Examples:**

- Auto-save: "Draft saved 10 seconds ago"
- Impact preview: "2 SOPs will be affected"
- Approval: "Waiting on Sarah (4h left in SLA)"

### 4. **Undo/Escape Hatches**

Users can back out of any action without consequences.

**Examples:**

- [Cancel] button always visible during editing
- Drafts auto-saved, never lose work
- "Discard changes?" confirmation before exiting

### 5. **Smart Defaults**

System predicts what users want, reducing decisions.

**Examples:**

- Version bump auto-suggested based on change size
- Approvers auto-populated from department rules
- Effective date defaults to "upon approval"

---

## Mobile Experience

### Responsive Breakpoints

**Desktop (>1200px)**: Full 3-column layout (TOC | Content | Metadata)
**Tablet (768-1200px)**: 2-column (TOC collapses to hamburger | Content + Metadata)
**Mobile (<768px)**: Single column, TOC and metadata in slide-out panels

### Mobile-Specific Features

1. **Quick Actions Floating Button**

```
┌──────────────────────┐
│                      │
│  SOP Content...      │
│                      │
│                      │
│                      │
│              [+]  ←── Floating action button
│                      │
└──────────────────────┘

Tap [+] → Shows:
• ✏️ Edit
• 🔗 Dependencies
• ⭐ Bookmark
• 📤 Share
```

2. **Swipe Gestures**

- Swipe right: Open TOC
- Swipe left: Open metadata panel
- Swipe down: Refresh

3. **Offline Support**

- Bookmarked SOPs cached for offline viewing
- Edits saved locally, sync when online

---

## Accessibility

### WCAG 2.1 AA Compliance

**Visual:**

- Color contrast ratio ≥ 4.5:1
- Focus indicators visible
- No reliance on color alone

**Keyboard:**

- All actions keyboard-accessible
- Skip navigation links
- Tab order logical

**Screen Reader:**

- ARIA labels on all interactive elements
- Landmark regions defined
- Status messages announced

**Cognitive:**

- Simple, clear language
- Consistent navigation
- Error messages helpful, not technical

---

## Success Metrics

### Navigation Effectiveness

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Time to find SOP | <30 seconds | Analytics: Search to view |
| Bounce rate on SOP viewer | <10% | Exit without action |
| Edit completion rate | >90% | Start edit → Publish |
| Approval time | <4 hours | Request → Approval |
| User satisfaction (SUS score) | >80 | Quarterly survey |

### Update Workflow Efficiency

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Time to update section | <2 minutes | Edit start → Save |
| Impact preview usage | >80% | % edits that check impact |
| Broken dependency rate | <2% | Updates that break references |
| Template usage | >50% | New SOPs from template |
| Mobile editing adoption | >20% | Edits from mobile device |

---

## Implementation Priorities

### Phase 1: Core Navigation (Week 1-2)

- ✅ Global navigation bar
- ✅ Search functionality
- ✅ Breadcrumb navigation
- ✅ Unified dashboard

### Phase 2: SOP Viewer (Week 3-4)

- ✅ Formatted markdown rendering
- ✅ TOC sidebar
- ✅ Metadata sidebar
- ✅ Inline edit buttons

### Phase 3: Edit Workflow (Week 5-6)

- ✅ Section-level editing
- ✅ Impact preview
- ✅ Version comparison
- ✅ Approval workflow

### Phase 4: Templates & Advanced (Week 7-8)

- ✅ Template system
- ✅ Clone SOP functionality
- ✅ Bulk operations
- ✅ Analytics dashboard

---

## Next Steps

1. **Prototype key screens** in Figma
2. **User testing** with 5-10 SOP owners
3. **Iterate** based on feedback
4. **Build** incrementally (viewer → edit → templates)
5. **Launch** with pilot department
6. **Measure** and improve

---

**END OF DOCUMENT**
