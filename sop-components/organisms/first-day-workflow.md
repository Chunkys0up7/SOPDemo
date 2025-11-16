---
id: organism-first-day-workflow
type: organism
version: 1.0.0
title: First Day Complete Workflow
tags: [onboarding, first-day, complete-workflow]
composedOf:
  - atom-welcome-message
  - molecule-account-setup
dependencies:
  - sop-002 (IT System Access Provisioning)
  - sop-003 (Security Training Completion)
---

# First Day Complete Workflow

## Overview

This comprehensive workflow orchestrates all activities for an employee's first day, combining multiple components into a seamless onboarding experience.

## Timeline: First Day Schedule

| Time | Activity | Owner | Location | Component |
|------|----------|-------|----------|-----------|
| 9:00 AM | Arrival & Check-in | HR | Reception | - |
| 9:15 AM | Welcome & Introduction | HR Manager | Conference Room A | atom-welcome-message |
| 9:45 AM | Badge & Building Access | Security | Security Office | - |
| 10:00 AM | Workstation Setup | IT | Employee Desk | - |
| 10:30 AM | Account Provisioning | IT | Employee Desk | molecule-account-setup |
| 11:30 AM | IT Systems Training | IT | Training Room | sop-002 |
| 12:30 PM | Lunch (with team) | Team Lead | Cafeteria | - |
| 1:30 PM | Security Training | Security | Online | sop-003 |
| 3:00 PM | Team Introduction | Manager | Department Area | - |
| 4:00 PM | Review & Q&A | HR | Conference Room A | - |
| 5:00 PM | End of Day | - | - | - |

---

## Phase 1: Pre-Arrival Setup (HR & IT)

**Timeline**: 2 days before first day

### HR Checklist

- [ ] Welcome email sent to new hire
- [ ] First day schedule shared
- [ ] Parking/building access instructions provided
- [ ] New hire paperwork reminders sent
- [ ] Manager notified of start date

### IT Checklist

- [ ] Workstation prepared and tested
- [ ] Phone/extension configured
- [ ] Desk equipment delivered (monitor, keyboard, mouse)
- [ ] Pre-provision accounts (ready to activate)
- [ ] Add to team distribution lists

---

## Phase 2: Welcome & Orientation (9:00 AM - 10:00 AM)

### Component: Welcome Message

{{include: welcome-message}}

### Building Orientation

**Security Office Visit**:

- Take employee photo for badge
- Issue building access card
- Explain entry/exit procedures
- Emergency evacuation routes
- After-hours access policy

**Facilities Tour**:

- Restrooms
- Break rooms / Cafeteria
- Copy/print stations
- Conference rooms
- Parking areas

---

## Phase 3: IT Setup & Account Provisioning (10:00 AM - 12:00 PM)

### Workstation Introduction

IT team member will:

1. Walk employee to assigned workstation
2. Verify all equipment present and working
3. Explain phone system
4. Configure displays and peripherals
5. Test network connectivity

### Account Setup Process

{{include: account-setup}}

### System Access Verification

Test access to all required systems:

- [ ] Email (send/receive test)
- [ ] CRM (if applicable)
- [ ] Project management tools
- [ ] Intranet / Company portal
- [ ] Time tracking system
- [ ] Benefits portal

**Troubleshooting**: If any system access fails, IT will resolve before end of day.

### Critical System Training

IT provides overview of:

- Email best practices and calendar
- File storage and sharing (OneDrive/SharePoint)
- Communication tools (Teams/Slack)
- Password manager usage
- VPN setup (for remote work)

---

## Phase 4: Lunch & Team Integration (12:00 PM - 1:30 PM)

### Team Lunch

- Manager or team lead hosts lunch
- Informal setting for getting to know team
- Opportunity to ask questions
- Company culture introduction

**Expense Note**: Team lunch is company-paid for new hire's first day

---

## Phase 5: Security & Compliance Training (1:30 PM - 3:00 PM)

### Security Training Completion

New hire must complete all required security training modules.

**Reference**: See sop-003 (Security Training Completion) for details

{{reference: atom-training-modules}}

### Compliance Acknowledgments

Employee must read and acknowledge:

- [ ] Code of Conduct
- [ ] Information Security Policy
- [ ] Acceptable Use Policy
- [ ] Confidentiality Agreement
- [ ] Remote Work Policy (if applicable)

All acknowledgments recorded in HR system.

---

## Phase 6: Department Onboarding (3:00 PM - 4:30 PM)

### Manager One-on-One

**Discussion Topics**:

- Role expectations and responsibilities
- 30-60-90 day goals
- Team structure and dynamics
- Current projects and priorities
- Communication preferences
- One-on-one meeting schedule

### Team Introductions

- Meet all immediate team members
- Understand each person's role
- Identify key contacts for different needs
- Join team communication channels

### Project/Task Assignment

Manager assigns initial tasks:

- Onboarding checklist completion
- Training courses to complete
- Shadowing opportunities scheduled
- First project assignment (if applicable)

---

## Phase 7: Wrap-up & Next Steps (4:30 PM - 5:00 PM)

### HR Check-in

HR reviews:

- How did the day go?
- Any issues or concerns?
- Remaining paperwork needed
- Benefits enrollment deadline
- Payroll information verified

### End of Day Checklist

**Employee Confirms**:

- [ ] Can access all required systems
- [ ] Understands how to reach team/manager
- [ ] Knows schedule for rest of week
- [ ] Has contact information for questions
- [ ] Completed all required training
- [ ] Knows parking/building access procedures

**Manager Confirms**:

- [ ] Employee has clear schedule for week
- [ ] First assignment clearly communicated
- [ ] Employee knows how to ask for help
- [ ] Check-in scheduled for end of week

---

## Post-First Day Follow-up

### Day 2-5 Activities

- Complete remaining onboarding training
- Shadow team members
- Begin initial assignments
- Daily check-ins with manager

### Week 2 Milestones

- All access provisioned and verified
- Core training modules completed
- Contributing to team projects
- Understands processes and workflows

### 30-Day Review

- Manager conducts formal 30-day review
- Address any challenges or concerns
- Adjust goals if needed
- Ensure integration with team

---

## Dependencies & Related SOPs

This workflow depends on:

- **sop-001**: User Onboarding Process (parent SOP)
- **sop-002**: IT System Access Provisioning
- **sop-003**: Security Training Completion
- **sop-004**: Equipment Requisition (if specialized equipment needed)

## Troubleshooting Common Issues

### Issue: Accounts not ready on Day 1

**Prevention**: IT should pre-provision 2 days before start date
**Resolution**: IT prioritizes activation, temporary access provided if needed

### Issue: Security training platform access problems

**Resolution**: HR provides guest access or extends deadline to Day 2

### Issue: Manager unavailable on Day 1

**Resolution**: Department head or designated backup conducts onboarding

### Issue: Workstation not ready

**Resolution**: Temporary workstation provided, permanent setup completed same day

---

## Success Metrics

Track the following to measure onboarding effectiveness:

- **System Access**: All systems accessible by end of Day 1 (Target: 100%)
- **Training Completion**: Security training completed by end of Day 1 (Target: 90%+)
- **Employee Satisfaction**: First day experience rating (Target: 4.5/5)
- **Time to Productivity**: Days until first contribution (Target: < 5 days)

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-12
**Owner**: HR Department
**Contributors**: IT Department, Security Team, Operations
**Next Review**: 2026-02-12
