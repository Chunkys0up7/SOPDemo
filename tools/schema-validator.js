#!/usr/bin/env node

/**
 * Schema Validator and Version Manager
 *
 * Validates ontology schemas against W3C standards and manages semantic versioning.
 * Implements automated schema validation, compatibility checking, and version control.
 *
 * Features:
 * - OWL/RDF syntax validation
 * - SKOS vocabulary validation
 * - Semantic versioning (MAJOR.MINOR.PATCH)
 * - Backward compatibility checking
 * - Change impact analysis
 *
 * Aligned with: NASA MBSE model management plans
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

class SchemaValidator {
  constructor() {
    this.schemas = new Map();
    this.vocabularies = new Map();
    this.validationResults = [];
    this.versionHistory = new Map();
  }

  log(message, color = 'reset') {
    const colorCode = colors[color] || colors.reset;
    console.log(`${colorCode}${message}${colors.reset}`);
  }

  /**
   * Load all schema and vocabulary files
   */
  async loadSchemas() {
    this.log('\n📦 Loading ontology schemas and vocabularies...', 'blue');

    // Load OWL/RDF schemas
    const schemaDir = path.join(ROOT_DIR, 'ontology', 'schemas');
    try {
      const schemaFiles = await fs.readdir(schemaDir);

      for (const file of schemaFiles.filter(f => f.endsWith('.ttl'))) {
        const filePath = path.join(schemaDir, file);
        const content = await fs.readFile(filePath, 'utf8');

        this.schemas.set(file, {
          filename: file,
          path: filePath,
          content,
          type: 'owl-rdf',
          version: this.extractVersion(content)
        });

        this.log(`  ✓ Loaded schema: ${file}`, 'green');
      }
    } catch (error) {
      this.log(`  ⚠ Warning: Could not load schemas: ${error.message}`, 'yellow');
    }

    // Load SKOS vocabularies
    const vocabDir = path.join(ROOT_DIR, 'ontology', 'vocabularies');
    try {
      const vocabFiles = await fs.readdir(vocabDir);

      for (const file of vocabFiles.filter(f => f.endsWith('.ttl'))) {
        const filePath = path.join(vocabDir, file);
        const content = await fs.readFile(filePath, 'utf8');

        this.vocabularies.set(file, {
          filename: file,
          path: filePath,
          content,
          type: 'skos',
          version: this.extractVersion(content)
        });

        this.log(`  ✓ Loaded vocabulary: ${file}`, 'green');
      }
    } catch (error) {
      this.log(`  ⚠ Warning: Could not load vocabularies: ${error.message}`, 'yellow');
    }

    this.log(`\n✓ Total loaded: ${this.schemas.size} schemas, ${this.vocabularies.size} vocabularies\n`, 'green');
  }

  /**
   * Extract version from ontology metadata
   */
  extractVersion(content) {
    const versionMatch = content.match(/Version:\s*(\d+\.\d+\.\d+)/i) ||
                        content.match(/owl:versionInfo\s+"([^"]+)"/);

    if (versionMatch) {
      return versionMatch[1];
    }

    return '1.0.0'; // Default version
  }

  /**
   * Validate OWL/RDF syntax
   */
  validateOWLSyntax(schema) {
    const errors = [];
    const warnings = [];
    const content = schema.content;

    // Check for required namespace declarations
    const requiredPrefixes = ['owl:', 'rdf:', 'rdfs:', 'xsd:'];
    for (const prefix of requiredPrefixes) {
      if (!content.includes(`@prefix ${prefix}`)) {
        errors.push(`Missing required prefix: ${prefix}`);
      }
    }

    // Check for ontology declaration
    if (!content.match(/a\s+owl:Ontology/)) {
      errors.push('Missing owl:Ontology declaration');
    }

    // Check for proper class definitions
    const classPattern = /\b(\w+)\s+a\s+owl:Class/g;
    const classes = [...content.matchAll(classPattern)];

    if (classes.length === 0) {
      warnings.push('No OWL classes defined');
    }

    // Check for property definitions
    const propertyPatterns = [
      /\b(\w+)\s+a\s+owl:ObjectProperty/g,
      /\b(\w+)\s+a\s+owl:DatatypeProperty/g
    ];

    let propertyCount = 0;
    for (const pattern of propertyPatterns) {
      propertyCount += [...content.matchAll(pattern)].length;
    }

    if (propertyCount === 0) {
      warnings.push('No OWL properties defined');
    }

    // Check for metadata (dc:title, dc:description, etc.)
    const metadataFields = ['dc:title', 'dc:description', 'dcterms:created'];
    const missingMetadata = metadataFields.filter(field => !content.includes(field));

    if (missingMetadata.length > 0) {
      warnings.push(`Missing recommended metadata: ${missingMetadata.join(', ')}`);
    }

    // Check for circular dependencies
    const circularDeps = this.checkCircularDependencies(content);
    if (circularDeps.length > 0) {
      errors.push(`Potential circular dependencies detected: ${circularDeps.join(', ')}`);
    }

    // Validate RDF Turtle syntax patterns
    const invalidLines = this.validateTurtleSyntax(content);
    if (invalidLines.length > 0) {
      errors.push(`Syntax errors on lines: ${invalidLines.join(', ')}`);
    }

    return { errors, warnings, valid: errors.length === 0 };
  }

  /**
   * Validate SKOS vocabulary structure
   */
  validateSKOS(vocabulary) {
    const errors = [];
    const warnings = [];
    const content = vocabulary.content;

    // Check for SKOS prefix
    if (!content.includes('@prefix skos:')) {
      errors.push('Missing SKOS prefix declaration');
    }

    // Check for ConceptScheme
    if (!content.match(/a\s+skos:ConceptScheme/)) {
      errors.push('Missing skos:ConceptScheme declaration');
    }

    // Check for top concepts
    if (!content.includes('skos:hasTopConcept')) {
      warnings.push('No top concepts defined with skos:hasTopConcept');
    }

    // Validate concepts
    const concepts = [...content.matchAll(/(\w+)\s+a\s+skos:Concept/g)];

    if (concepts.length === 0) {
      errors.push('No SKOS concepts defined');
    }

    // Check that each concept has prefLabel
    for (const [, conceptId] of concepts) {
      const conceptBlock = this.extractConceptBlock(content, conceptId);

      if (!conceptBlock.includes('skos:prefLabel')) {
        warnings.push(`Concept ${conceptId} missing skos:prefLabel`);
      }

      if (!conceptBlock.includes('skos:definition')) {
        warnings.push(`Concept ${conceptId} missing skos:definition`);
      }

      if (!conceptBlock.includes('skos:inScheme')) {
        warnings.push(`Concept ${conceptId} missing skos:inScheme`);
      }
    }

    // Check for orphan concepts (not linked to scheme)
    const orphans = this.findOrphanConcepts(content);
    if (orphans.length > 0) {
      warnings.push(`Orphan concepts found: ${orphans.join(', ')}`);
    }

    // Validate hierarchical relationships
    const hierarchyIssues = this.validateConceptHierarchy(content);
    if (hierarchyIssues.length > 0) {
      warnings.push(...hierarchyIssues);
    }

    return { errors, warnings, valid: errors.length === 0 };
  }

  /**
   * Check for circular dependencies
   */
  checkCircularDependencies(content) {
    const circular = [];

    // Extract all class hierarchies
    const subClassPattern = /(\w+)\s+rdfs:subClassOf\s+(\w+)/g;
    const relationships = new Map();

    let match;
    while ((match = subClassPattern.exec(content)) !== null) {
      const [, child, parent] = match;

      if (!relationships.has(child)) {
        relationships.set(child, []);
      }
      relationships.get(child).push(parent);
    }

    // Check for cycles
    for (const [node, parents] of relationships) {
      if (this.hasCycle(node, parents, relationships, new Set())) {
        circular.push(node);
      }
    }

    return circular;
  }

  /**
   * Detect cycles in class hierarchy
   */
  hasCycle(node, parents, graph, visited) {
    if (visited.has(node)) {
      return true;
    }

    visited.add(node);

    for (const parent of parents) {
      if (graph.has(parent)) {
        if (this.hasCycle(parent, graph.get(parent), graph, new Set(visited))) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Validate Turtle syntax patterns
   */
  validateTurtleSyntax(content) {
    const invalidLines = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip comments and blank lines
      if (line.startsWith('#') || line.length === 0) continue;

      // Check for proper statement termination
      if (line.length > 0 && !line.endsWith(';') && !line.endsWith('.') &&
          !line.endsWith(',') && !line.endsWith('[') && !line.endsWith(']') &&
          !line.startsWith('@') && !line.startsWith('<')) {
        // Check if next line continues the statement
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim();
          if (!nextLine.startsWith(';') && !nextLine.startsWith(',') &&
              !nextLine.startsWith('.') && !nextLine.startsWith(']')) {
            invalidLines.push(i + 1);
          }
        }
      }
    }

    return invalidLines;
  }

  /**
   * Extract concept block for validation
   */
  extractConceptBlock(content, conceptId) {
    const startPattern = new RegExp(`${conceptId}\\s+a\\s+skos:Concept`);
    const startMatch = content.search(startPattern);

    if (startMatch === -1) return '';

    // Find the next concept or end of file
    const nextConcept = content.indexOf('a skos:Concept', startMatch + 1);
    const endPos = nextConcept === -1 ? content.length : nextConcept;

    return content.substring(startMatch, endPos);
  }

  /**
   * Find orphan concepts
   */
  findOrphanConcepts(content) {
    const orphans = [];
    const concepts = [...content.matchAll(/(\w+)\s+a\s+skos:Concept/g)];

    for (const [, conceptId] of concepts) {
      const block = this.extractConceptBlock(content, conceptId);

      if (!block.includes('skos:broader') &&
          !block.includes('skos:topConceptOf') &&
          !block.includes('skos:inScheme')) {
        orphans.push(conceptId);
      }
    }

    return orphans;
  }

  /**
   * Validate concept hierarchy
   */
  validateConceptHierarchy(content) {
    const issues = [];

    // Check for reciprocal broader/narrower relationships
    const broaderPattern = /(\w+)\s+skos:broader\s+(\w+)/g;
    const narrowerPattern = /(\w+)\s+skos:narrower\s+(\w+)/g;

    const broaderRels = new Map();
    const narrowerRels = new Map();

    let match;
    while ((match = broaderPattern.exec(content)) !== null) {
      const [, concept, broader] = match;
      if (!broaderRels.has(concept)) broaderRels.set(concept, []);
      broaderRels.get(concept).push(broader);
    }

    while ((match = narrowerPattern.exec(content)) !== null) {
      const [, concept, narrower] = match;
      if (!narrowerRels.has(concept)) narrowerRels.set(concept, []);
      narrowerRels.get(concept).push(narrower);
    }

    // Verify reciprocal relationships
    for (const [concept, broaders] of broaderRels) {
      for (const broader of broaders) {
        if (narrowerRels.has(broader)) {
          if (!narrowerRels.get(broader).includes(concept)) {
            issues.push(`Missing reciprocal narrower relationship: ${broader} -> ${concept}`);
          }
        }
      }
    }

    return issues;
  }

  /**
   * Parse semantic version
   */
  parseVersion(versionString) {
    const match = versionString.match(/(\d+)\.(\d+)\.(\d+)/);
    if (!match) return null;

    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2]),
      patch: parseInt(match[3]),
      string: versionString
    };
  }

  /**
   * Compare versions for compatibility
   */
  checkCompatibility(oldVersion, newVersion) {
    const old = this.parseVersion(oldVersion);
    const newer = this.parseVersion(newVersion);

    if (!old || !newer) {
      return { compatible: false, reason: 'Invalid version format' };
    }

    // Breaking change: major version increment
    if (newer.major > old.major) {
      return {
        compatible: false,
        reason: 'Major version change indicates breaking changes',
        changeType: 'BREAKING'
      };
    }

    // Backward compatible: minor version increment
    if (newer.major === old.major && newer.minor > old.minor) {
      return {
        compatible: true,
        reason: 'Minor version change - backward compatible feature addition',
        changeType: 'FEATURE'
      };
    }

    // Patch: bug fixes
    if (newer.major === old.major && newer.minor === old.minor && newer.patch > old.patch) {
      return {
        compatible: true,
        reason: 'Patch version change - backward compatible bug fix',
        changeType: 'PATCH'
      };
    }

    return { compatible: true, reason: 'Same version', changeType: 'NONE' };
  }

  /**
   * Run full validation suite
   */
  async validate() {
    this.log('\n═══════════════════════════════════════════', 'bright');
    this.log('   Ontology Schema Validator', 'bright');
    this.log('═══════════════════════════════════════════', 'bright');

    await this.loadSchemas();

    // Validate OWL/RDF schemas
    this.log('\n🔍 Validating OWL/RDF Schemas...', 'blue');
    for (const [filename, schema] of this.schemas) {
      this.log(`\n  Validating: ${filename}`, 'cyan');
      const result = this.validateOWLSyntax(schema);

      if (result.valid) {
        this.log(`  ✓ Valid OWL/RDF schema (version ${schema.version})`, 'green');
      } else {
        this.log(`  ✗ Invalid schema`, 'red');
        result.errors.forEach(err => this.log(`    ✗ ${err}`, 'red'));
      }

      if (result.warnings.length > 0) {
        result.warnings.forEach(warn => this.log(`    ⚠ ${warn}`, 'yellow'));
      }

      this.validationResults.push({
        filename,
        type: 'owl-rdf',
        version: schema.version,
        valid: result.valid,
        errors: result.errors,
        warnings: result.warnings
      });
    }

    // Validate SKOS vocabularies
    this.log('\n🔍 Validating SKOS Vocabularies...', 'blue');
    for (const [filename, vocab] of this.vocabularies) {
      this.log(`\n  Validating: ${filename}`, 'cyan');
      const result = this.validateSKOS(vocab);

      if (result.valid) {
        this.log(`  ✓ Valid SKOS vocabulary (version ${vocab.version})`, 'green');
      } else {
        this.log(`  ✗ Invalid vocabulary`, 'red');
        result.errors.forEach(err => this.log(`    ✗ ${err}`, 'red'));
      }

      if (result.warnings.length > 0) {
        result.warnings.forEach(warn => this.log(`    ⚠ ${warn}`, 'yellow'));
      }

      this.validationResults.push({
        filename,
        type: 'skos',
        version: vocab.version,
        valid: result.valid,
        errors: result.errors,
        warnings: result.warnings
      });
    }

    return this.generateReport();
  }

  /**
   * Generate validation report
   */
  async generateReport() {
    const reportPath = path.join(ROOT_DIR, 'ontology', 'validation-report.json');

    const totalSchemas = this.validationResults.length;
    const validSchemas = this.validationResults.filter(r => r.valid).length;
    const invalidSchemas = totalSchemas - validSchemas;
    const totalErrors = this.validationResults.reduce((sum, r) => sum + r.errors.length, 0);
    const totalWarnings = this.validationResults.reduce((sum, r) => sum + r.warnings.length, 0);

    const report = {
      validationDate: new Date().toISOString(),
      summary: {
        totalSchemas,
        validSchemas,
        invalidSchemas,
        totalErrors,
        totalWarnings,
        overallStatus: invalidSchemas === 0 ? 'PASSED' : 'FAILED'
      },
      results: this.validationResults,
      standards: {
        owl: 'OWL 2 Web Ontology Language',
        rdf: 'RDF 1.1 Turtle',
        skos: 'SKOS Simple Knowledge Organization System',
        versioning: 'Semantic Versioning 2.0.0'
      },
      alignment: {
        nasa: 'NASA MBSE Model Management Plans',
        w3c: 'W3C Semantic Web Standards'
      }
    };

    await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf8');

    this.log('\n═══════════════════════════════════════════', 'bright');
    this.log('   Validation Summary', 'bright');
    this.log('═══════════════════════════════════════════', 'bright');
    this.log(`Total Schemas: ${totalSchemas}`, 'cyan');
    this.log(`Valid: ${validSchemas}`, 'green');
    if (invalidSchemas > 0) {
      this.log(`Invalid: ${invalidSchemas}`, 'red');
    }
    this.log(`Errors: ${totalErrors}`, totalErrors > 0 ? 'red' : 'green');
    this.log(`Warnings: ${totalWarnings}`, totalWarnings > 0 ? 'yellow' : 'green');
    this.log(`\nStatus: ${report.summary.overallStatus}`,
              report.summary.overallStatus === 'PASSED' ? 'green' : 'red');
    this.log(`\n📄 Report saved: ${reportPath}`, 'blue');
    this.log('═══════════════════════════════════════════\n', 'bright');

    return report;
  }
}

// CLI execution
const main = async () => {
  const validator = new SchemaValidator();
  const report = await validator.validate();

  process.exit(report.summary.overallStatus === 'PASSED' ? 0 : 1);
};

main();
