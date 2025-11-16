# RBAC & Permissions Design (Placeholder)

> **Status**: 🚧 Design documentation only - Not implemented
>
> This document shows how Role-Based Access Control would work when implemented in the future.

## Overview

The SOP system would use a multi-layered permission model combining:
- **Role-Based Access Control (RBAC)** - Permissions based on job roles
- **Attribute-Based Access Control (ABAC)** - Additional context (department, compliance level, etc.)
- **Object-Level Permissions** - Fine-grained control per SOP

## Role Hierarchy

```
┌─────────────────────────────────────────┐
│  System Administrator                   │ (Full access)
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┴─────────────┐
    │                           │
┌───┴──────────────┐  ┌────────┴─────────┐
│ Compliance       │  │ Department       │
│ Officer          │  │ Manager          │
└───┬──────────────┘  └────────┬─────────┘
    │                           │
    │         ┌─────────────────┴──────────────┐
    │         │                                │
┌───┴─────────┴───┐  ┌─────────────┐  ┌───────┴────────┐
│ SOP Owner       │  │ Approver    │  │ SOP Contributor│
└─────────────────┘  └─────────────┘  └────────────────┘
           │
    ┌──────┴───────┐
    │              │
┌───┴──────┐  ┌────┴─────────┐
│ Viewer   │  │ Guest        │
└──────────┘  └──────────────┘
```

## Permission Matrix

| Role | View SOPs | Create SOP | Edit SOP | Approve SOP | Delete SOP | Manage Users | Audit Logs |
|------|-----------|------------|----------|-------------|------------|--------------|------------|
| **System Admin** | ✅ All | ✅ All | ✅ All | ✅ All | ✅ All | ✅ | ✅ |
| **Compliance Officer** | ✅ All | ✅ | ✅ Compliance-tagged | ✅ Compliance | ❌ | ❌ | ✅ Read |
| **Dept Manager** | ✅ Department | ✅ Department | ✅ Department | ✅ Department | ⚠️ Own dept | ❌ | ✅ Own dept |
| **SOP Owner** | ✅ Assigned | ✅ Own | ✅ Own | ❌ | ❌ | ❌ | ✅ Own SOPs |
| **Approver** | ✅ All | ❌ | ❌ | ✅ Assigned | ❌ | ❌ | ✅ Approvals |
| **Contributor** | ✅ Department | ⚠️ Draft only | ✅ Assigned | ❌ | ❌ | ❌ | ❌ |
| **Viewer** | ✅ Public | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Guest** | ✅ Public docs | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

## Example Implementation (Placeholder Code)

### User Object Structure
```javascript
// Example user object with roles and permissions
const exampleUser = {
  id: "user-12345",
  email: "alice.smith@pursuitbank.com",
  name: "Alice Smith",

  // Primary role
  role: "SOP_OWNER",

  // Additional roles (users can have multiple)
  roles: ["SOP_OWNER", "APPROVER"],

  // Department-based access
  department: "Mortgage Finance",
  departments: ["Mortgage Finance", "Compliance"],  // Access to multiple depts

  // SOP-specific assignments
  ownedSOPs: ["sop-mf-003", "sop-mf-005"],
  canApproveSOPs: ["sop-mf-*", "sop-hr-001"],  // Wildcard patterns supported

  // Attribute-based permissions
  attributes: {
    clearanceLevel: "confidential",  // public | internal | confidential | restricted
    complianceCertified: true,
    trainingCompleted: ["FHA_101", "WIRE_TRANSFER_SECURITY"]
  },

  // Audit metadata
  createdAt: "2024-01-15T08:00:00Z",
  lastLogin: "2025-11-16T14:23:00Z",
  mfaEnabled: true
};
```

### Permission Check Examples

```javascript
// Check if user can view a specific SOP
function canViewSOP(user, sopId, sopMetadata) {
  // System admins can view everything
  if (user.role === "SYSTEM_ADMIN") return true;

  // Check department access
  if (user.departments.includes(sopMetadata.department)) {
    return true;
  }

  // Check clearance level
  if (sopMetadata.classification === "restricted" &&
      user.attributes.clearanceLevel !== "restricted") {
    return false;
  }

  // Check if SOP is public
  if (sopMetadata.visibility === "public") return true;

  // Check if user owns this SOP
  if (user.ownedSOPs.includes(sopId)) return true;

  return false;
}

// Check if user can approve changes
function canApproveSOP(user, sopId, sopMetadata) {
  if (user.role === "SYSTEM_ADMIN") return true;
  if (user.role === "COMPLIANCE_OFFICER" &&
      sopMetadata.complianceFrameworks.length > 0) return true;

  // Check wildcard patterns
  for (const pattern of user.canApproveSOPs) {
    if (matchesPattern(sopId, pattern)) return true;
  }

  return false;
}

// Check if user can edit SOP
function canEditSOP(user, sopId, sopMetadata, sopStatus) {
  if (user.role === "SYSTEM_ADMIN") return true;

  // Owners can edit their own SOPs (if not locked)
  if (user.ownedSOPs.includes(sopId) && sopStatus !== "locked") {
    return true;
  }

  // Contributors can edit assigned SOPs in draft status
  if (user.role === "CONTRIBUTOR" &&
      sopStatus === "draft" &&
      sopMetadata.contributors.includes(user.id)) {
    return true;
  }

  // Managers can edit department SOPs
  if (user.role === "DEPT_MANAGER" &&
      user.departments.includes(sopMetadata.department)) {
    return true;
  }

  return false;
}
```

### SOP Metadata with Access Control

```yaml
---
id: sop-mf-003
title: FHA Underwriting Standards
version: 1.0.0
status: active

# Access control fields
department: Mortgage Finance
owner: alice.smith@pursuitbank.com
contributors:
  - bob.jones@pursuitbank.com
  - carol.white@pursuitbank.com

# Classification & visibility
classification: internal  # public | internal | confidential | restricted
visibility: department    # public | department | private | custom

# Who can approve changes
approvers:
  - compliance-team        # Group reference
  - dept-manager-mortgage  # Group reference
  - alice.smith@pursuitbank.com  # Specific user

# Required training to access
requiredTraining:
  - FHA_UNDERWRITING_101
  - CREDIT_ANALYSIS_FUNDAMENTALS

# Compliance frameworks (auto-grants compliance officer access)
complianceFrameworks:
  - FHA Handbook 4000.1
  - HUD Guidelines

# Audit requirements
auditFrequency: quarterly
lastAudit: 2025-09-15
nextAudit: 2025-12-15
---
```

## Approval Workflow Example

```javascript
// Multi-stage approval workflow
const approvalWorkflow = {
  sopId: "sop-mf-003",
  changeRequest: "cr-2025-11-16-001",

  stages: [
    {
      stage: 1,
      name: "Technical Review",
      requiredApprovals: 1,
      eligibleApprovers: ["SOP_OWNER", "DEPT_MANAGER"],
      status: "approved",
      approvedBy: "alice.smith@pursuitbank.com",
      approvedAt: "2025-11-16T10:00:00Z"
    },
    {
      stage: 2,
      name: "Compliance Review",
      requiredApprovals: 1,
      eligibleApprovers: ["COMPLIANCE_OFFICER"],
      requiredIf: "hasComplianceImpact === true",
      status: "pending",
      approvedBy: null,
      approvedAt: null
    },
    {
      stage: 3,
      name: "Final Approval",
      requiredApprovals: 2,  // Requires 2 approvals
      eligibleApprovers: ["DEPT_MANAGER", "VP_OPERATIONS"],
      status: "not_started",
      approvals: []
    }
  ],

  currentStage: 2,
  overallStatus: "in_review"
};
```

## Group-Based Permissions

```javascript
// Groups for easier permission management
const permissionGroups = {
  "compliance-team": {
    members: [
      "sarah.jones@pursuitbank.com",
      "mike.wilson@pursuitbank.com"
    ],
    permissions: {
      canApprove: ["sop-*"],  // All SOPs
      canView: ["sop-*"],
      canAudit: true
    }
  },

  "dept-manager-mortgage": {
    members: [
      "alice.smith@pursuitbank.com"
    ],
    permissions: {
      canApprove: ["sop-mf-*"],
      canEdit: ["sop-mf-*"],
      canView: ["sop-*"],
      canDelete: ["sop-mf-*"]
    },
    scope: {
      department: "Mortgage Finance"
    }
  },

  "underwriting-team": {
    members: [
      "bob.jones@pursuitbank.com",
      "carol.white@pursuitbank.com",
      "david.brown@pursuitbank.com"
    ],
    permissions: {
      canView: ["sop-mf-003", "sop-mf-001", "sop-mf-002"],
      canContribute: ["sop-mf-003"]
    }
  }
};
```

## API Endpoint Examples (How it would work)

```javascript
// Express.js middleware for permission checking
function requirePermission(action, resourceType) {
  return async (req, res, next) => {
    const user = req.user;  // From auth middleware
    const sopId = req.params.sopId;

    // Load SOP metadata
    const sop = await SOP.findById(sopId);

    // Check permission
    const hasPermission = await checkPermission(user, action, sop);

    if (!hasPermission) {
      return res.status(403).json({
        error: "Forbidden",
        message: `You do not have permission to ${action} this SOP`,
        requiredRole: getRequiredRoleFor(action, sop)
      });
    }

    next();
  };
}

// API routes with permission checks
app.get('/api/sops/:sopId',
  authenticate,  // Verify user is logged in
  requirePermission('view', 'sop'),  // Check view permission
  async (req, res) => {
    const sop = await SOP.findById(req.params.sopId);
    res.json(sop);
  }
);

app.put('/api/sops/:sopId',
  authenticate,
  requirePermission('edit', 'sop'),
  validateSOPUpdate,  // Validate the data
  async (req, res) => {
    const sop = await SOP.update(req.params.sopId, req.body);
    await auditLog.log('sop_updated', req.user, sop);
    res.json(sop);
  }
);

app.post('/api/sops/:sopId/approve',
  authenticate,
  requirePermission('approve', 'sop'),
  async (req, res) => {
    const approval = await approvalService.approve(
      req.params.sopId,
      req.user,
      req.body.comments
    );
    res.json(approval);
  }
);
```

## UI Permission Handling

```javascript
// Hide/show UI elements based on permissions
function renderSOPActions(user, sop) {
  const actions = [];

  if (canViewSOP(user, sop.id, sop)) {
    actions.push({ label: 'View', icon: '👁️', action: 'view' });
  }

  if (canEditSOP(user, sop.id, sop, sop.status)) {
    actions.push({ label: 'Edit', icon: '✏️', action: 'edit' });
  }

  if (canApproveSOP(user, sop.id, sop)) {
    actions.push({ label: 'Approve', icon: '✅', action: 'approve' });
  }

  if (user.role === 'SYSTEM_ADMIN' || user.ownedSOPs.includes(sop.id)) {
    actions.push({ label: 'Delete', icon: '🗑️', action: 'delete',
                   requireConfirm: true });
  }

  return actions;
}
```

## Audit Logging

```javascript
// Log all permission-sensitive actions
const auditLog = {
  log: async (action, user, resource, metadata = {}) => {
    await AuditLog.create({
      timestamp: new Date(),
      action: action,  // 'sop_viewed', 'sop_edited', 'sop_approved', etc.
      userId: user.id,
      userEmail: user.email,
      userRole: user.role,
      resourceType: 'sop',
      resourceId: resource.id,
      resourceTitle: resource.title,
      metadata: {
        ...metadata,
        ipAddress: user.ipAddress,
        userAgent: user.userAgent
      }
    });
  }
};

// Query audit logs
async function getAuditHistory(sopId) {
  return await AuditLog.find({
    resourceId: sopId
  })
  .sort({ timestamp: -1 })
  .limit(100);
}
```

## Implementation Checklist (Future)

When ready to implement RBAC, follow this checklist:

- [ ] **Phase 1: Foundation**
  - [ ] Create user management database tables
  - [ ] Implement authentication (SSO/SAML preferred)
  - [ ] Define role hierarchy in config
  - [ ] Create permission checking functions

- [ ] **Phase 2: Authorization**
  - [ ] Add permission middleware to all API endpoints
  - [ ] Implement group-based permissions
  - [ ] Add department-based access control
  - [ ] Create permission testing suite

- [ ] **Phase 3: Workflows**
  - [ ] Build approval workflow engine
  - [ ] Add notification system for approvals
  - [ ] Create approval dashboard UI
  - [ ] Implement delegation system

- [ ] **Phase 4: Audit & Compliance**
  - [ ] Set up audit logging for all actions
  - [ ] Create audit report generation
  - [ ] Add access review workflows
  - [ ] Implement permission escalation requests

- [ ] **Phase 5: UI Integration**
  - [ ] Show/hide UI elements based on permissions
  - [ ] Add permission error messages
  - [ ] Create user permission dashboard
  - [ ] Build admin permission management UI

## Estimated Effort

- **Design & Planning**: 1 week
- **Backend Implementation**: 3-4 weeks
- **Frontend Integration**: 2-3 weeks
- **Testing & Security Audit**: 2 weeks
- **Documentation & Training**: 1 week

**Total: 9-11 weeks**

## Security Considerations

1. **Principle of Least Privilege** - Users get minimum permissions needed
2. **Separation of Duties** - Critical actions require multiple approvers
3. **Audit Everything** - All permission-sensitive actions logged
4. **Time-Based Access** - Permissions can expire (temporary elevated access)
5. **Break-Glass Procedure** - Emergency access for system admins (heavily audited)

## Next Steps

1. ✅ Document design (this file)
2. ⏸️ Wait for priority features (CI/CD, RAG, Analytics)
3. ⏸️ Implement when business case justifies investment
4. ⏸️ Test thoroughly before production rollout
