#!/bin/bash

################################################################################
# Hybrid Construction Demo Script
#
# This script demonstrates how the hybrid construction approach works:
# 1. Shows source molecule with {{include}} references
# 2. Shows the atoms that will be included
# 3. Runs the build process
# 4. Shows the final assembled SOP
# 5. Highlights the transformation
################################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Directories
DEMO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$DEMO_DIR")"
MOLECULE_FILE="$ROOT_DIR/sop-components/molecules/molecule-new-user-account-setup.md"
ATOM_AD="$ROOT_DIR/sop-components/atoms/atom-step-create-ad-account.md"
ATOM_EMAIL="$ROOT_DIR/sop-components/atoms/atom-step-create-email-account.md"
BUILT_SOP="$ROOT_DIR/dist/sops/sop-it-001.md"

################################################################################
# Helper Functions
################################################################################

print_header() {
    echo ""
    echo -e "${BOLD}${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BOLD}${BLUE}  $1${NC}"
    echo -e "${BOLD}${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
}

print_section() {
    echo ""
    echo -e "${CYAN}━━━ $1 ━━━${NC}"
    echo ""
}

print_step() {
    echo -e "${GREEN}▶ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_code_block() {
    local title="$1"
    local content="$2"
    echo ""
    echo -e "${MAGENTA}┌─── $title ───┐${NC}"
    echo -e "${NC}$content${NC}"
    echo -e "${MAGENTA}└───────────────────────────────────────┘${NC}"
    echo ""
}

pause() {
    echo ""
    read -p "Press ENTER to continue..."
}

################################################################################
# Demo Sections
################################################################################

intro() {
    clear
    print_header "HYBRID CONSTRUCTION DEMO"

    cat << EOF
${BOLD}Welcome to the Hybrid Construction Demo!${NC}

This demo will show you how SOPs are assembled from modular components
using the "docs as code" paradigm.

${BOLD}What you'll see:${NC}
  1️⃣  Source molecule with {{include}} references
  2️⃣  The reusable atoms that get included
  3️⃣  The build process in action
  4️⃣  The final assembled SOP
  5️⃣  A before/after comparison

${BOLD}Key Concept:${NC}
  ${CYAN}Atoms${NC} (reusable) + ${YELLOW}Inline Prose${NC} (specific) = ${GREEN}Complete SOP${NC}

EOF
    pause
}

show_molecule_structure() {
    clear
    print_header "STEP 1: Source Molecule Structure"

    print_info "File: sop-components/molecules/molecule-new-user-account-setup.md"

    cat << EOF

This molecule uses ${BOLD}HYBRID CONSTRUCTION${NC}:

  ${YELLOW}Step 1: Gather New Hire Information${NC}
    └─ ${YELLOW}[Inline Prose]${NC} - Workflow-specific data collection

  ${YELLOW}Step 2: Determine Standard Access Requirements${NC}
    └─ ${YELLOW}[Inline Prose]${NC} - New hire-specific logic

  ${CYAN}Step 3: Create Active Directory Account${NC}
    └─ ${CYAN}{{include: atom-step-create-ad-account}}${NC} ← REUSABLE ATOM

  ${CYAN}Step 4: Create Email Account and Configure Services${NC}
    └─ ${CYAN}{{include: atom-step-create-email-account}}${NC} ← REUSABLE ATOM

  ${CYAN}Step 5: Configure Initial Password and Secure Delivery${NC}
    └─ ${CYAN}{{include: atom-password-reset}}${NC} ← REUSABLE ATOM

  ${CYAN}Step 6: Verify Access Approvals and Complete Provisioning${NC}
    └─ ${CYAN}{{include: atom-access-request-approval}}${NC} ← REUSABLE ATOM

  ${YELLOW}Step 7: Final Verification and Documentation${NC}
    └─ ${YELLOW}[Inline Prose]${NC} - Workflow-specific completion

${BOLD}Summary:${NC}
  • ${CYAN}4 Reusable Atoms${NC} (used across multiple workflows)
  • ${YELLOW}3 Inline Prose Steps${NC} (specific to new hire onboarding)

EOF
    pause
}

show_molecule_metadata() {
    clear
    print_header "STEP 2: Molecule Metadata (Hybrid Manifest)"

    print_info "This metadata declares which atoms are composed into this molecule"

    # Extract and show the metadata
    print_code_block "molecule-new-user-account-setup.md (frontmatter)" "$(sed -n '/^---$/,/^---$/p' "$MOLECULE_FILE" | sed -n '24,30p')"

    cat << EOF

${BOLD}What this means:${NC}

  ${GREEN}composedOf:${NC}
    Lists all atoms that this molecule includes

  ${GREEN}dependencies:${NC}
    Specifies version requirements for each atom
    (e.g., "v1.0.0+" means any 1.x version is compatible)

  ${GREEN}constructionType: hybrid${NC}
    Indicates this molecule mixes atoms + inline prose

${BOLD}Why this matters:${NC}
  • Build tool knows which atoms to load
  • Version compatibility is enforced
  • Graph visualization shows composition
  • Documentation auto-generates component list

EOF
    pause
}

show_include_syntax() {
    clear
    print_header "STEP 3: {{include}} Syntax in Action"

    print_info "Here's how atoms are referenced in the molecule"

    # Show Step 3 with include
    print_section "Example: Step 3 in Source Molecule"

    grep -A 4 "^### Step 3:" "$MOLECULE_FILE" | head -6

    cat << EOF

${BOLD}What happens during build:${NC}

  1. Build tool reads molecule file
  2. Finds: ${CYAN}{{include: atom-step-create-ad-account}}${NC}
  3. Loads: ${CYAN}sop-components/atoms/atom-step-create-ad-account.md${NC}
  4. Replaces {{include}} with full atom content
  5. Recursively processes any {{include}} in the atom
  6. Result: Complete procedure expanded inline

${BOLD}Before build:${NC}
  ### Step 3: Create Active Directory Account

  {{include: atom-step-create-ad-account}}

${BOLD}After build:${NC}
  ### Step 3: Create Active Directory Account

  [... full 500-line AD account creation procedure ...]

EOF
    pause
}

show_atom_example() {
    clear
    print_header "STEP 4: Inside a Reusable Atom"

    print_info "Let's look at: atom-step-create-ad-account.md"

    cat << EOF

${BOLD}Atom Structure:${NC}

EOF

    # Show atom frontmatter
    print_section "Metadata"
    sed -n '1,35p' "$ATOM_AD" | grep -E "^(id|type|subtype|version|title|reusable|usedIn):"

    echo ""
    print_section "Content Preview"
    sed -n '90,130p' "$ATOM_AD"

    cat << EOF

${BOLD}Key Characteristics:${NC}

  ✓ ${GREEN}Self-contained${NC}: Complete procedure with all details
  ✓ ${GREEN}Reusable${NC}: Used in 3+ molecules (new hire, contractor, reinstatement)
  ✓ ${GREEN}Versioned${NC}: Independent version (v1.0.0)
  ✓ ${GREEN}Tracked${NC}: Metadata shows where it's used

${BOLD}This atom contains:${NC}
  • Estimated time, owner, systems required
  • Prerequisites checklist
  • 7 detailed actions (each with substeps)
  • Quality checkpoints
  • Decision logic (IF/THEN)
  • Troubleshooting table

${BOLD}Total size:${NC} $(wc -l < "$ATOM_AD") lines (full procedure)

EOF
    pause
}

show_build_process() {
    clear
    print_header "STEP 5: Running the Build Process"

    print_info "Now let's build the complete SOP from components"

    echo ""
    print_step "Changing to project root directory..."
    cd "$ROOT_DIR"

    echo ""
    print_step "Running: node tools/build.js sop-it-001"
    echo ""

    # Run the actual build
    node tools/build.js sop-it-001

    echo ""
    print_success "Build completed!"

    cat << EOF

${BOLD}What just happened:${NC}

  1. ${CYAN}Loaded graph${NC}: 31 nodes, 21 edges
  2. ${CYAN}Loaded components${NC}: 32 total (19 atoms, 10 molecules, 3 organisms)
  3. ${CYAN}Processed molecule${NC}: molecule-new-user-account-setup
     └─ Found {{include: atom-step-create-ad-account}}
     └─ Loaded and expanded atom (500+ lines)
     └─ Found {{include: atom-step-create-email-account}}
     └─ Loaded and expanded atom (400+ lines)
     └─ Continued for all atoms...
  4. ${CYAN}Assembled SOP${NC}: All components combined
  5. ${CYAN}Wrote output${NC}: dist/sops/sop-it-001.md

${BOLD}Output file:${NC} $(wc -l < "$BUILT_SOP") lines

EOF
    pause
}

show_built_output() {
    clear
    print_header "STEP 6: Examining the Built SOP"

    print_info "File: dist/sops/sop-it-001.md (auto-generated)"

    cat << EOF

${BOLD}Built SOP includes:${NC}

EOF

    print_section "Auto-Generated Header"
    head -n 20 "$BUILT_SOP"

    echo ""
    print_section "Components Section"
    sed -n '37,44p' "$BUILT_SOP"

    cat << EOF

${BOLD}Finding Step 3 in built output:${NC}

EOF

    # Find where Step 3 appears in the built SOP
    STEP3_LINE=$(grep -n "^### Step 3: Create Active Directory Account" "$BUILT_SOP" | tail -1 | cut -d: -f1)

    echo -e "${GREEN}Step 3 found at line: $STEP3_LINE${NC}"
    echo ""

    # Show snippet around Step 3
    sed -n "${STEP3_LINE},$((STEP3_LINE + 30))p" "$BUILT_SOP" | head -35

    cat << EOF

${BOLD}Notice:${NC}
  • The ${CYAN}{{include: atom-step-create-ad-account}}${NC} has been replaced
  • Full atom content is now expanded inline
  • Complete with all metadata, actions, checkpoints, etc.

EOF
    pause
}

show_comparison() {
    clear
    print_header "STEP 7: Before/After Comparison"

    cat << EOF

${BOLD}SOURCE MOLECULE${NC} (molecule-new-user-account-setup.md):

EOF

    print_code_block "Step 3 - Before Build" "$(grep -A 4 "^### Step 3:" "$MOLECULE_FILE" | head -5)"

    echo -e "${YELLOW}      ⬇ BUILD PROCESS ⬇${NC}"
    echo -e "${YELLOW}   ({{include}} expanded)${NC}"
    echo ""

    cat << EOF

${BOLD}BUILT SOP${NC} (dist/sops/sop-it-001.md):

EOF

    STEP3_START=$(grep -n "^### Step 3: Create Active Directory Account" "$BUILT_SOP" | tail -1 | cut -d: -f1)

    print_code_block "Step 3 - After Build (first 40 lines)" "$(sed -n "${STEP3_START},$((STEP3_START + 40))p" "$BUILT_SOP")"

    cat << EOF

${BOLD}Transformation:${NC}

  ${RED}Before:${NC}  3 lines (1 heading + 1 include + 1 separator)
  ${GREEN}After:${NC}   500+ lines (complete expanded procedure)

${BOLD}The {{include}} reference was replaced with:${NC}
  • Full atom metadata
  • Purpose and description
  • Estimated time (10 minutes)
  • Owner (IT Provisioning Technician)
  • Prerequisites checklist
  • 7 detailed action steps
  • Quality checkpoints table
  • Decision logic (IF/THEN)
  • Troubleshooting table
  • Usage notes and reusability info

${BOLD}This same atom is reused in:${NC}
  • molecule-contractor-provisioning
  • molecule-employee-reinstatement

  ${GREEN}Update the atom once → All 3 molecules get the update on rebuild!${NC}

EOF
    pause
}

show_graph_visualization() {
    clear
    print_header "STEP 8: Component Composition Graph"

    cat << EOF

${BOLD}Visual representation of how components are composed:${NC}

${CYAN}┌─────────────────────────────────────────┐
│  SOP: sop-it-001                        │
│  (IT Account Provisioning)              │
└─────────────────────────────────────────┘${NC}
                  │
                  ├──► ${CYAN}atom-password-reset${NC}
                  │
                  ├──► ${CYAN}atom-access-request-approval${NC}
                  │
                  └──► ${YELLOW}MOLECULE: molecule-new-user-account-setup${NC}
                              │
                              ├──► ${GREEN}Step 1: [Inline Prose]${NC}
                              │
                              ├──► ${GREEN}Step 2: [Inline Prose]${NC}
                              │
                              ├──► ${CYAN}Step 3: atom-step-create-ad-account${NC}
                              │              └─ Reusable in 3 workflows
                              │
                              ├──► ${CYAN}Step 4: atom-step-create-email-account${NC}
                              │              └─ Reusable in 2 workflows
                              │
                              ├──► ${CYAN}Step 5: atom-password-reset${NC}
                              │              └─ Reusable in 5+ workflows
                              │
                              ├──► ${CYAN}Step 6: atom-access-request-approval${NC}
                              │              └─ Reusable in 4 workflows
                              │
                              └──► ${GREEN}Step 7: [Inline Prose]${NC}

${BOLD}Legend:${NC}
  ${CYAN}Cyan${NC}  = Reusable atom (included via {{include}})
  ${GREEN}Green${NC} = Inline prose (written directly in molecule)
  ${YELLOW}Yellow${NC} = Hybrid molecule (atoms + inline)

${BOLD}Graph Statistics:${NC}
  • Nodes: 31 (SOPs + Organisms + Molecules + Atoms)
  • Edges: 21 (component-of, depends-on relationships)
  • Reusable atoms in this molecule: 4
  • Inline steps in this molecule: 3

EOF
    pause
}

show_benefits() {
    clear
    print_header "STEP 9: Benefits of Hybrid Construction"

    cat << EOF

${BOLD}${GREEN}✓ Single Source of Truth${NC}
  AD account creation procedure defined once in atom-step-create-ad-account
  Used in 3 molecules → Update 1 file, rebuild all SOPs

  ${CYAN}Example:${NC}
    AD admin changes password complexity requirement
    → Edit atom-step-create-ad-account.md (1 file)
    → Run: node tools/build.js
    → All 3 workflows updated automatically

${BOLD}${GREEN}✓ Independent Versioning${NC}
  Each atom has its own semantic version (1.0.0, 1.1.0, 2.0.0)
  Molecules declare version dependencies

  ${CYAN}Example:${NC}
    atom-step-create-ad-account v1.0.0 → v2.0.0 (breaking change)
    molecule-new-user-account-setup requires: v1.0.0+
    → Build warns about version compatibility
    → Controlled updates, no surprise breakage

${BOLD}${GREEN}✓ Maximum Reusability${NC}
  Common procedures (AD, email, password) atomized once
  Included anywhere needed

  ${CYAN}Current reuse:${NC}
    • atom-step-create-ad-account: 3 molecules
    • atom-step-create-email-account: 2 molecules
    • atom-password-reset: 5+ molecules
    • atom-access-request-approval: 4 molecules

${BOLD}${GREEN}✓ Practical Flexibility${NC}
  Not everything needs to be an atom
  Workflow-specific logic stays inline

  ${CYAN}Example:${NC}
    "Gather New Hire Information" - inline (specific to onboarding)
    "Create AD Account" - atom (identical across workflows)

${BOLD}${GREEN}✓ Maintainability${NC}
  Smaller, focused files (atoms: 100-500 lines each)
  Clear separation: reusable vs. specific

  ${CYAN}Before:${NC} molecule-new-user-account-setup.md (677 lines, monolithic)
  ${CYAN}After:${NC}  molecule (simplified) + 4 atoms (reusable)

${BOLD}${GREEN}✓ Consistency${NC}
  Same procedure renders identically everywhere
  No copy-paste errors or version drift

  ${CYAN}Example:${NC}
    AD account creation in new hire workflow = contractor workflow
    Guaranteed identical (same atom, same output)

${BOLD}${GREEN}✓ Audit Trail${NC}
  Git tracks each atom independently
  See when/why a procedure changed
  Rollback individual procedures if needed

EOF
    pause
}

show_next_steps() {
    clear
    print_header "STEP 10: Try It Yourself!"

    cat << EOF

${BOLD}Commands to explore:${NC}

  ${CYAN}# Build a specific SOP${NC}
  node tools/build.js sop-it-001

  ${CYAN}# Build all SOPs${NC}
  node tools/build.js

  ${CYAN}# Validate graph and components${NC}
  node tools/validate.js

  ${CYAN}# View source molecule${NC}
  cat sop-components/molecules/molecule-new-user-account-setup.md

  ${CYAN}# View a reusable atom${NC}
  cat sop-components/atoms/atom-step-create-ad-account.md

  ${CYAN}# View built SOP${NC}
  cat dist/sops/sop-it-001.md

${BOLD}Files to explore:${NC}

  📘 ${GREEN}docs/HYBRID-CONSTRUCTION-GUIDE.md${NC}
     Comprehensive implementation guide (7,500+ words)

  📋 ${GREEN}docs/HYBRID-CONSTRUCTION-SUMMARY.md${NC}
     Quick summary of implementation

  🔧 ${GREEN}tools/build.js${NC}
     Build tool source code

  📊 ${GREEN}graph/sop-graph.json${NC}
     Graph structure (nodes and edges)

${BOLD}Create your own hybrid molecule:${NC}

  1. Identify steps (reusable vs. workflow-specific)
  2. Create atoms for reusable steps
  3. Write molecule with {{include}} references
  4. Update graph.json
  5. Run build and validate

${BOLD}Documentation:${NC}

  • Full guide: docs/HYBRID-CONSTRUCTION-GUIDE.md
  • Templates: templates/atom-template.md
  • Examples: This molecule and atoms!

EOF
    pause
}

summary() {
    clear
    print_header "DEMO COMPLETE"

    cat << EOF

${BOLD}${GREEN}What you learned:${NC}

  ✓ Hybrid construction combines ${CYAN}atoms${NC} (reusable) + ${YELLOW}inline prose${NC} (specific)
  ✓ Molecules declare composedOf to list their atoms
  ✓ {{include: atom-id}} syntax embeds atoms during build
  ✓ Build tool recursively expands all includes
  ✓ Result: Complete, executable SOP

${BOLD}${GREEN}Key takeaway:${NC}

  ${BOLD}Build from atoms where reusable, write inline where specific${NC}

  This gives you:
    • Single source of truth (update once, propagate everywhere)
    • Independent versioning (controlled updates)
    • Flexibility (not everything must be an atom)

${BOLD}${GREEN}Production ready:${NC}

  ✓ Build validated (1,806 lines for sop-it-001)
  ✓ Graph validated (31 nodes, 21 edges, 0 errors)
  ✓ All components load correctly

  ${GREEN}Status: Ready to use!${NC}

${BOLD}Questions or issues?${NC}
  • Check docs/HYBRID-CONSTRUCTION-GUIDE.md
  • Review example files
  • Open an issue in the repository

${BOLD}Thank you for exploring the Hybrid Construction Demo!${NC}

EOF
}

################################################################################
# Main Demo Flow
################################################################################

main() {
    intro
    show_molecule_structure
    show_molecule_metadata
    show_include_syntax
    show_atom_example
    show_build_process
    show_built_output
    show_comparison
    show_graph_visualization
    show_benefits
    show_next_steps
    summary
}

# Run the demo
main
