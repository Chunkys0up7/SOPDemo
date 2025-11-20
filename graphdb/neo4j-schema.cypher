// ============================================================================
// Neo4j Schema Setup for SOP Documentation GraphRAG System
// ============================================================================
// Version: 1.0.0
// Created: 2025-11-19
// Description: Complete graph database schema with constraints, indexes, and
//              vector search capabilities for GraphRAG implementation
// ============================================================================

// ----------------------------------------------------------------------------
// STEP 1: Create Constraints (Uniqueness & Existence)
// ----------------------------------------------------------------------------

// Atom constraints
CREATE CONSTRAINT atom_id_unique IF NOT EXISTS
FOR (a:Atom) REQUIRE a.id IS UNIQUE;

CREATE CONSTRAINT atom_id_exists IF NOT EXISTS
FOR (a:Atom) REQUIRE a.id IS NOT NULL;

// Molecule constraints
CREATE CONSTRAINT molecule_id_unique IF NOT EXISTS
FOR (m:Molecule) REQUIRE m.id IS UNIQUE;

CREATE CONSTRAINT molecule_id_exists IF NOT EXISTS
FOR (m:Molecule) REQUIRE m.id IS NOT NULL;

// Organism constraints
CREATE CONSTRAINT organism_id_unique IF NOT EXISTS
FOR (o:Organism) REQUIRE o.id IS UNIQUE;

CREATE CONSTRAINT organism_id_exists IF NOT EXISTS
FOR (o:Organism) REQUIRE o.id IS NOT NULL;

// SOP constraints
CREATE CONSTRAINT sop_id_unique IF NOT EXISTS
FOR (s:SOP) REQUIRE s.id IS UNIQUE;

CREATE CONSTRAINT sop_id_exists IF NOT EXISTS
FOR (s:SOP) REQUIRE s.id IS NOT NULL;

// Concept constraints
CREATE CONSTRAINT concept_name_unique IF NOT EXISTS
FOR (c:Concept) REQUIRE c.name IS UNIQUE;

// Actor constraints
CREATE CONSTRAINT actor_role_unique IF NOT EXISTS
FOR (a:Actor) REQUIRE a.role IS UNIQUE;

// Department constraints
CREATE CONSTRAINT department_name_unique IF NOT EXISTS
FOR (d:Department) REQUIRE d.name IS UNIQUE;

// ComplianceFramework constraints
CREATE CONSTRAINT compliance_name_unique IF NOT EXISTS
FOR (cf:ComplianceFramework) REQUIRE cf.name IS UNIQUE;

// ----------------------------------------------------------------------------
// STEP 2: Create Indexes for Fast Lookups
// ----------------------------------------------------------------------------

// Text search indexes
CREATE TEXT INDEX atom_title_text IF NOT EXISTS
FOR (a:Atom) ON (a.title);

CREATE TEXT INDEX atom_content_text IF NOT EXISTS
FOR (a:Atom) ON (a.content);

CREATE TEXT INDEX molecule_title_text IF NOT EXISTS
FOR (m:Molecule) ON (m.title);

CREATE TEXT INDEX concept_definition_text IF NOT EXISTS
FOR (c:Concept) ON (c.definition);

// Property indexes for filtering
CREATE INDEX atom_department IF NOT EXISTS
FOR (a:Atom) ON (a.department);

CREATE INDEX atom_complexity IF NOT EXISTS
FOR (a:Atom) ON (a.complexity);

CREATE INDEX atom_tags IF NOT EXISTS
FOR (a:Atom) ON (a.tags);

CREATE INDEX sop_status IF NOT EXISTS
FOR (s:SOP) ON (s.status);

CREATE INDEX sop_owner IF NOT EXISTS
FOR (s:SOP) ON (s.owner);

// Composite indexes for common queries
CREATE INDEX atom_dept_complexity IF NOT EXISTS
FOR (a:Atom) ON (a.department, a.complexity);

// Date indexes for temporal queries
CREATE INDEX atom_lastreviewed IF NOT EXISTS
FOR (a:Atom) ON (a.lastReviewed);

CREATE INDEX sop_lastreviewed IF NOT EXISTS
FOR (s:SOP) ON (s.lastReviewed);

// ----------------------------------------------------------------------------
// STEP 3: Create Vector Indexes for Semantic Search
// ----------------------------------------------------------------------------
// Note: Requires Neo4j 5.11+ with vector search enabled

// Create vector index for Atom embeddings (OpenAI ada-002: 1536 dimensions)
CALL db.index.vector.createNodeIndex(
  'atom_embedding_index',              // index name
  'Atom',                               // node label
  'embedding',                          // property name
  1536,                                 // vector dimensions
  'cosine'                              // similarity function: cosine, euclidean, dot
) YIELD name, type, labelsOrTypes, properties, options
RETURN name, type, labelsOrTypes, properties, options;

// Create vector index for Molecule embeddings
CALL db.index.vector.createNodeIndex(
  'molecule_embedding_index',
  'Molecule',
  'embedding',
  1536,
  'cosine'
) YIELD name, type, labelsOrTypes, properties, options
RETURN name, type, labelsOrTypes, properties, options;

// Create vector index for Organism embeddings
CALL db.index.vector.createNodeIndex(
  'organism_embedding_index',
  'Organism',
  'embedding',
  1536,
  'cosine'
) YIELD name, type, labelsOrTypes, properties, options
RETURN name, type, labelsOrTypes, properties, options;

// Create vector index for SOP embeddings
CALL db.index.vector.createNodeIndex(
  'sop_embedding_index',
  'SOP',
  'embedding',
  1536,
  'cosine'
) YIELD name, type, labelsOrTypes, properties, options
RETURN name, type, labelsOrTypes, properties, options;

// Create vector index for Concept embeddings
CALL db.index.vector.createNodeIndex(
  'concept_embedding_index',
  'Concept',
  'embedding',
  1536,
  'cosine'
) YIELD name, type, labelsOrTypes, properties, options
RETURN name, type, labelsOrTypes, properties, options;

// ----------------------------------------------------------------------------
// STEP 4: Sample Data Population (for testing)
// ----------------------------------------------------------------------------

// Create sample departments
MERGE (d1:Department {name: 'IT'})
SET d1.description = 'Information Technology Department',
    d1.function = 'Technology infrastructure and support';

MERGE (d2:Department {name: 'HR'})
SET d2.description = 'Human Resources Department',
    d2.function = 'Employee management and development';

MERGE (d3:Department {name: 'Finance'})
SET d3.description = 'Finance Department',
    d3.function = 'Financial operations and reporting';

MERGE (d4:Department {name: 'Operations'})
SET d4.description = 'Operations Department',
    d4.function = 'Business operations and processes';

MERGE (d5:Department {name: 'Security'})
SET d5.description = 'Security Department',
    d5.function = 'Information security and compliance';

// Create sample actors/roles
MERGE (r1:Actor {role: 'Administrator'})
SET r1.description = 'System administrator with full access',
    r1.permissions = ['read', 'write', 'execute', 'admin'];

MERGE (r2:Actor {role: 'Manager'})
SET r2.description = 'Department manager with approval rights',
    r2.permissions = ['read', 'write', 'approve'];

MERGE (r3:Actor {role: 'Employee'})
SET r3.description = 'Standard employee',
    r3.permissions = ['read', 'execute'];

MERGE (r4:Actor {role: 'Technician'})
SET r4.description = 'Technical specialist',
    r4.permissions = ['read', 'execute', 'modify'];

// Create sample compliance frameworks
MERGE (cf1:ComplianceFramework {name: 'SOX'})
SET cf1.description = 'Sarbanes-Oxley Act - Financial reporting controls',
    cf1.authority = 'U.S. Congress',
    cf1.applicableDomains = ['finance', 'it', 'audit'];

MERGE (cf2:ComplianceFramework {name: 'HIPAA'})
SET cf2.description = 'Health Insurance Portability and Accountability Act',
    cf2.authority = 'U.S. Department of Health and Human Services',
    cf2.applicableDomains = ['healthcare', 'privacy', 'security'];

MERGE (cf3:ComplianceFramework {name: 'SOC 2'})
SET cf3.description = 'Service Organization Control 2 - Trust service criteria',
    cf3.authority = 'AICPA',
    cf3.applicableDomains = ['it', 'security', 'availability'];

MERGE (cf4:ComplianceFramework {name: 'GDPR'})
SET cf4.description = 'General Data Protection Regulation',
    cf4.authority = 'European Union',
    cf4.applicableDomains = ['privacy', 'data-protection', 'security'];

MERGE (cf5:ComplianceFramework {name: 'PCI-DSS'})
SET cf5.description = 'Payment Card Industry Data Security Standard',
    cf5.authority = 'PCI Security Standards Council',
    cf5.applicableDomains = ['finance', 'security', 'e-commerce'];

// Create sample concepts
MERGE (c1:Concept {name: 'Authentication'})
SET c1.definition = 'Process of verifying user identity',
    c1.domain = 'Security',
    c1.category = 'Access Control',
    c1.synonyms = ['login', 'sign-in', 'identity verification'];

MERGE (c2:Concept {name: 'Password Policy'})
SET c2.definition = 'Rules governing password creation and management',
    c2.domain = 'Security',
    c2.category = 'Access Control',
    c2.synonyms = ['password requirements', 'credential policy'];

MERGE (c3:Concept {name: 'Onboarding'})
SET c3.definition = 'Process of integrating new employees',
    c3.domain = 'HR',
    c3.category = 'Employee Management',
    c3.synonyms = ['new hire', 'employee integration'];

MERGE (c4:Concept {name: 'Account Provisioning'})
SET c4.definition = 'Creating and configuring user accounts and access rights',
    c4.domain = 'IT',
    c4.category = 'Identity Management',
    c4.synonyms = ['account creation', 'user setup', 'access grant'];

// ----------------------------------------------------------------------------
// STEP 5: Utility Queries for Validation
// ----------------------------------------------------------------------------

// List all constraints
// CALL db.constraints();

// List all indexes
// CALL db.indexes();

// List all vector indexes
// SHOW VECTOR INDEXES;

// Count nodes by label
// MATCH (n) RETURN labels(n)[0] as label, count(n) as count ORDER BY count DESC;

// ----------------------------------------------------------------------------
// STEP 6: Example GraphRAG Queries
// ----------------------------------------------------------------------------

// Example 1: Vector similarity search for atoms related to "password reset"
// CALL db.index.vector.queryNodes('atom_embedding_index', 10, $queryEmbedding)
// YIELD node, score
// RETURN node.id, node.title, score
// ORDER BY score DESC;

// Example 2: Hybrid search (vector + graph traversal)
// CALL db.index.vector.queryNodes('atom_embedding_index', 5, $queryEmbedding)
// YIELD node as atom, score
// MATCH path = (atom)-[:COMPOSED_OF*0..2]-(related)
// RETURN atom, related, path, score
// ORDER BY score DESC;

// Example 3: Find all components for a specific compliance framework
// MATCH (c)-[:COMPLIES_WITH]->(cf:ComplianceFramework {name: 'SOX'})
// RETURN c.id, c.title, c.type;

// Example 4: Find component dependencies (2 hops)
// MATCH path = (c:Atom {id: 'atom-password-reset'})-[:DEPENDS_ON*1..2]->(dep)
// RETURN path;

// Example 5: Find all SOPs using a specific atom
// MATCH path = (a:Atom {id: 'atom-password-reset'})<-[:COMPOSED_OF*1..3]-(sop:SOP)
// RETURN sop.id, sop.title, length(path) as depth;

// Example 6: Find workflow sequences
// MATCH path = (start:Atom)-[:PRECEDES*]->(end:Atom)
// WHERE start.id = 'atom-welcome-message'
// RETURN path
// ORDER BY length(path) DESC
// LIMIT 5;

// ============================================================================
// END OF SCHEMA
// ============================================================================
