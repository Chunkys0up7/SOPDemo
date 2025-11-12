#!/usr/bin/env node

/**
 * SOP Validation Tool
 *
 * Validates the integrity of the SOP ecosystem:
 * - Graph structure consistency
 * - Component references validity
 * - Version compatibility
 * - Broken links detection
 * - Metadata completeness
 *
 * Usage: node tools/validate.js [--fix] [--strict]
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

class SOPValidator {
  constructor(options = {}) {
    this.graph = null;
    this.components = new Map();
    this.errors = [];
    this.warnings = [];
    this.info = [];
    this.options = options;
  }

  log(message, color = 'reset', prefix = '') {
    const colorCode = colors[color] || colors.reset;
    console.log(`${colorCode}${prefix}${message}${colors.reset}`);
  }

  addError(message, context = {}) {
    this.errors.push({ message, context, type: 'error' });
    this.log(`✗ ERROR: ${message}`, 'red', '  ');
  }

  addWarning(message, context = {}) {
    this.warnings.push({ message, context, type: 'warning' });
    if (!this.options.strict) {
      this.log(`⚠ WARNING: ${message}`, 'yellow', '  ');
    } else {
      // In strict mode, warnings are errors
      this.addError(message, context);
    }
  }

  addInfo(message) {
    this.info.push(message);
    this.log(`ℹ INFO: ${message}`, 'cyan', '  ');
  }

  async loadGraph() {
    this.log('\n📊 Loading and validating graph structure...', 'blue');
    const graphPath = path.join(ROOT_DIR, 'graph', 'sop-graph.json');

    try {
      const graphData = await fs.readFile(graphPath, 'utf8');
      this.graph = JSON.parse(graphData);
      this.log('  ✓ Graph JSON is valid', 'green');
    } catch (error) {
      this.addError(`Failed to load graph: ${error.message}`, { path: graphPath });
      throw error;
    }
  }

  async loadComponents() {
    this.log('\n📦 Loading component files...', 'blue');

    const componentTypes = ['atoms', 'molecules', 'organisms'];
    let totalLoaded = 0;

    for (const type of componentTypes) {
      const componentDir = path.join(ROOT_DIR, 'sop-components', type);

      try {
        const files = await fs.readdir(componentDir);
        const mdFiles = files.filter(f => f.endsWith('.md'));

        for (const file of mdFiles) {
          const filePath = path.join(componentDir, file);
          const content = await fs.readFile(filePath, 'utf8');

          // Extract frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
          if (frontmatterMatch) {
            const frontmatter = this.parseFrontmatter(frontmatterMatch[1]);

            if (frontmatter.id) {
              this.components.set(frontmatter.id, {
                id: frontmatter.id,
                type,
                content,
                path: filePath,
                frontmatter
              });
              totalLoaded++;
            } else {
              this.addWarning(`Component file missing 'id' in frontmatter: ${file}`, { path: filePath });
            }
          } else {
            this.addWarning(`Component file missing frontmatter: ${file}`, { path: filePath });
          }
        }
      } catch (error) {
        this.addError(`Could not load ${type}: ${error.message}`);
      }
    }

    this.log(`  ✓ Loaded ${totalLoaded} components`, 'green');
  }

  parseFrontmatter(yaml) {
    const result = {};
    const lines = yaml.split('\n');

    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        // Simple parsing - handle strings and arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          result[key] = value.slice(1, -1).split(',').map(v => v.trim());
        } else {
          result[key] = value;
        }
      }
    }

    return result;
  }

  validateGraphStructure() {
    this.log('\n🔍 Validating graph structure...', 'blue');

    // Check required fields
    if (!this.graph.nodes) {
      this.addError('Graph missing "nodes" object');
      return;
    }

    if (!this.graph.edges) {
      this.addError('Graph missing "edges" array');
      return;
    }

    this.log('  ✓ Graph has required fields', 'green');

    // Validate nodes
    let validNodes = 0;
    for (const [nodeId, node] of Object.entries(this.graph.nodes)) {
      if (!node.id || node.id !== nodeId) {
        this.addWarning(`Node ${nodeId} has mismatched or missing id field`, { nodeId });
      }

      if (!node.type) {
        this.addError(`Node ${nodeId} missing type field`, { nodeId });
      }

      if (!node.title) {
        this.addWarning(`Node ${nodeId} missing title field`, { nodeId });
      }

      if (!node.version) {
        this.addWarning(`Node ${nodeId} missing version field`, { nodeId });
      }

      validNodes++;
    }

    this.log(`  ✓ Validated ${validNodes} nodes`, 'green');

    // Validate edges
    let validEdges = 0;
    for (const edge of this.graph.edges) {
      if (!edge.source) {
        this.addError('Edge missing source field', { edge });
        continue;
      }

      if (!edge.target) {
        this.addError('Edge missing target field', { edge });
        continue;
      }

      if (!this.graph.nodes[edge.source]) {
        this.addError(`Edge references non-existent source node: ${edge.source}`, { edge });
      }

      if (!this.graph.nodes[edge.target]) {
        this.addError(`Edge references non-existent target node: ${edge.target}`, { edge });
      }

      if (!edge.type) {
        this.addWarning('Edge missing type field', { edge });
      }

      validEdges++;
    }

    this.log(`  ✓ Validated ${validEdges} edges`, 'green');
  }

  validateComponentReferences() {
    this.log('\n🔗 Validating component references...', 'blue');

    for (const [nodeId, node] of Object.entries(this.graph.nodes)) {
      // Check if node references components that exist
      if (node.components) {
        for (const componentId of node.components) {
          if (!this.components.has(componentId) && !this.graph.nodes[componentId]) {
            this.addError(
              `Node ${nodeId} references non-existent component: ${componentId}`,
              { nodeId, componentId }
            );
          }
        }
      }

      if (node.composedOf) {
        for (const componentId of node.composedOf) {
          if (!this.components.has(componentId) && !this.graph.nodes[componentId]) {
            this.addError(
              `Node ${nodeId} composed of non-existent component: ${componentId}`,
              { nodeId, componentId }
            );
          }
        }
      }
    }

    this.log('  ✓ Component references validated', 'green');
  }

  validateCircularDependencies() {
    this.log('\n🔄 Checking for circular dependencies...', 'blue');

    const visited = new Set();
    const recursionStack = new Set();

    const hasCycle = (nodeId, path = []) => {
      if (recursionStack.has(nodeId)) {
        this.addError(
          `Circular dependency detected: ${path.join(' → ')} → ${nodeId}`,
          { cycle: [...path, nodeId] }
        );
        return true;
      }

      if (visited.has(nodeId)) {
        return false;
      }

      visited.add(nodeId);
      recursionStack.add(nodeId);

      // Check all dependencies
      const dependencies = this.graph.edges.filter(e => e.source === nodeId);

      for (const dep of dependencies) {
        if (hasCycle(dep.target, [...path, nodeId])) {
          return true;
        }
      }

      recursionStack.delete(nodeId);
      return false;
    };

    let cyclesFound = false;
    for (const nodeId of Object.keys(this.graph.nodes)) {
      if (!visited.has(nodeId)) {
        if (hasCycle(nodeId)) {
          cyclesFound = true;
        }
      }
    }

    if (!cyclesFound) {
      this.log('  ✓ No circular dependencies found', 'green');
    }
  }

  validateVersions() {
    this.log('\n📌 Validating versions...', 'blue');

    const versionRegex = /^\d+\.\d+\.\d+$/;

    for (const [nodeId, node] of Object.entries(this.graph.nodes)) {
      if (node.version && !versionRegex.test(node.version)) {
        this.addWarning(
          `Node ${nodeId} has invalid semantic version: ${node.version}`,
          { nodeId, version: node.version }
        );
      }
    }

    for (const component of this.components.values()) {
      if (component.frontmatter.version && !versionRegex.test(component.frontmatter.version)) {
        this.addWarning(
          `Component ${component.id} has invalid semantic version: ${component.frontmatter.version}`,
          { componentId: component.id, version: component.frontmatter.version }
        );
      }
    }

    this.log('  ✓ Version format validation complete', 'green');
  }

  validateMetadataCompleteness() {
    this.log('\n📋 Validating metadata completeness...', 'blue');

    const requiredSOPFields = ['title', 'version', 'status', 'owner'];
    const requiredComponentFields = ['id', 'type', 'version', 'title'];

    for (const [nodeId, node] of Object.entries(this.graph.nodes)) {
      if (node.type === 'sop') {
        for (const field of requiredSOPFields) {
          if (!node[field]) {
            this.addWarning(`SOP ${nodeId} missing required field: ${field}`, { nodeId, field });
          }
        }
      }
    }

    for (const component of this.components.values()) {
      for (const field of requiredComponentFields) {
        if (!component.frontmatter[field]) {
          this.addWarning(
            `Component ${component.id} missing required field: ${field}`,
            { componentId: component.id, field }
          );
        }
      }
    }

    this.log('  ✓ Metadata completeness check complete', 'green');
  }

  async generateReport() {
    const reportPath = path.join(ROOT_DIR, 'dist', 'validation-report.json');

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalNodes: Object.keys(this.graph.nodes).length,
        totalEdges: this.graph.edges.length,
        totalComponents: this.components.size,
        errors: this.errors.length,
        warnings: this.warnings.length,
        infos: this.info.length
      },
      status: this.errors.length === 0 ? 'PASS' : 'FAIL',
      errors: this.errors,
      warnings: this.warnings,
      info: this.info
    };

    await fs.mkdir(path.join(ROOT_DIR, 'dist'), { recursive: true });
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf8');

    this.log(`\n📄 Validation report saved: ${reportPath}`, 'blue');

    return report;
  }

  displaySummary(report) {
    this.log('\n═══════════════════════════════════════════════', 'bright');
    this.log('            VALIDATION SUMMARY', 'bright');
    this.log('═══════════════════════════════════════════════\n', 'bright');

    this.log(`Total Nodes: ${report.summary.totalNodes}`, 'cyan');
    this.log(`Total Edges: ${report.summary.totalEdges}`, 'cyan');
    this.log(`Total Components: ${report.summary.totalComponents}`, 'cyan');
    this.log('');

    if (report.errors.length === 0) {
      this.log(`✓ Errors: ${report.errors.length}`, 'green');
    } else {
      this.log(`✗ Errors: ${report.errors.length}`, 'red');
    }

    if (report.warnings.length === 0) {
      this.log(`✓ Warnings: ${report.warnings.length}`, 'green');
    } else {
      this.log(`⚠ Warnings: ${report.warnings.length}`, 'yellow');
    }

    this.log('');

    if (report.status === 'PASS') {
      this.log('STATUS: ✓ VALIDATION PASSED', 'green');
    } else {
      this.log('STATUS: ✗ VALIDATION FAILED', 'red');
    }

    this.log('\n═══════════════════════════════════════════════\n', 'bright');
  }

  async validate() {
    try {
      this.log('═══════════════════════════════════════════════', 'bright');
      this.log('        SOP Validation Tool', 'bright');
      this.log('═══════════════════════════════════════════════', 'bright');

      await this.loadGraph();
      await this.loadComponents();

      this.validateGraphStructure();
      this.validateComponentReferences();
      this.validateCircularDependencies();
      this.validateVersions();
      this.validateMetadataCompleteness();

      const report = await this.generateReport();
      this.displaySummary(report);

      // Exit with appropriate code
      process.exit(report.errors.length > 0 ? 1 : 0);

    } catch (error) {
      this.log(`\n✗ Validation failed: ${error.message}`, 'red');
      console.error(error);
      process.exit(1);
    }
  }
}

// CLI execution
const main = async () => {
  const args = process.argv.slice(2);

  const options = {
    fix: args.includes('--fix'),
    strict: args.includes('--strict')
  };

  const validator = new SOPValidator(options);
  await validator.validate();
};

main();
