#!/usr/bin/env node

/**
 * SOP Builder Tool
 *
 * This tool assembles complete SOPs from modular components (atoms, molecules, organisms)
 * based on the graph structure defined in graph/sop-graph.json
 *
 * Usage: node tools/build.js [sop-id]
 *   - If sop-id provided: builds that specific SOP
 *   - If no sop-id: builds all SOPs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

class SOPBuilder {
  constructor() {
    this.graph = null;
    this.components = new Map();
    this.buildLog = [];
  }

  log(message, color = 'reset') {
    const colorCode = colors[color] || colors.reset;
    console.log(`${colorCode}${message}${colors.reset}`);
    this.buildLog.push({ timestamp: new Date().toISOString(), message });
  }

  /**
   * Load the SOP graph structure
   */
  async loadGraph() {
    this.log('📊 Loading SOP graph structure...', 'blue');
    const graphPath = path.join(ROOT_DIR, 'graph', 'sop-graph.json');
    const graphData = await fs.readFile(graphPath, 'utf8');
    this.graph = JSON.parse(graphData);
    this.log(`✓ Loaded ${Object.keys(this.graph.nodes).length} nodes and ${this.graph.edges.length} edges`, 'green');
  }

  /**
   * Load all component files into memory
   */
  async loadComponents() {
    this.log('\n📦 Loading modular components...', 'blue');

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

          // Extract component ID from frontmatter
          const idMatch = content.match(/^id:\s*(.+)$/m);
          if (idMatch) {
            const componentId = idMatch[1].trim();
            this.components.set(componentId, {
              id: componentId,
              type,
              content,
              path: filePath
            });
            totalLoaded++;
          }
        }

        this.log(`  ✓ Loaded ${mdFiles.length} ${type}`, 'green');
      } catch (error) {
        this.log(`  ⚠ Warning: Could not load ${type}: ${error.message}`, 'yellow');
      }
    }

    this.log(`✓ Total components loaded: ${totalLoaded}`, 'green');
  }

  /**
   * Strip YAML frontmatter from content
   */
  stripFrontmatter(content) {
    // Remove YAML frontmatter (--- ... ---)
    return content.replace(/^---[\s\S]*?---\n*/m, '');
  }

  /**
   * Get component content by ID
   */
  getComponent(componentId) {
    const component = this.components.get(componentId);
    if (!component) {
      this.log(`  ⚠ Warning: Component '${componentId}' not found`, 'yellow');
      return `\n<!-- Component ${componentId} not found -->\n`;
    }
    return component.content;
  }

  /**
   * Process component includes and references
   */
  processIncludes(content, processedComponents = new Set()) {
    // Handle {{include: component-id}} syntax
    const includePattern = /\{\{include:\s*([a-z0-9-]+)\}\}/gi;

    let processed = content;
    let match;

    while ((match = includePattern.exec(content)) !== null) {
      const componentId = match[1];

      // Prevent infinite loops
      if (processedComponents.has(componentId)) {
        this.log(`  ⚠ Circular reference detected: ${componentId}`, 'yellow');
        processed = processed.replace(match[0], `\n<!-- Circular reference: ${componentId} -->\n`);
        continue;
      }

      const componentContent = this.getComponent(componentId);
      processedComponents.add(componentId);

      // Strip frontmatter from component before including
      const strippedContent = this.stripFrontmatter(componentContent);

      // Recursively process includes in the included component
      const recursiveProcessed = this.processIncludes(strippedContent, new Set(processedComponents));

      processed = processed.replace(match[0], recursiveProcessed);
    }

    // Handle {{reference: component-id}} syntax (just links, doesn't include content)
    const referencePattern = /\{\{reference:\s*([a-z0-9-]+)\}\}/gi;
    processed = processed.replace(referencePattern, (match, componentId) => {
      return `\n**→ See component**: [${componentId}](../sop-components/${componentId}.md)\n`;
    });

    return processed;
  }

  /**
   * Build a single SOP from its components
   */
  async buildSOP(sopId) {
    const sopNode = this.graph.nodes[sopId];

    if (!sopNode || sopNode.type !== 'sop') {
      throw new Error(`SOP '${sopId}' not found in graph`);
    }

    this.log(`\n🔨 Building ${sopId}: ${sopNode.title}`, 'cyan');

    // Safe metadata access with defaults
    const metadata = sopNode.metadata || {};
    const lastReviewed = metadata.lastReviewed || sopNode.lastReviewed || 'Not yet reviewed';
    const approver = metadata.approver || sopNode.approver || 'Pending approval';
    const version = sopNode.version || '1.0.0';
    const status = sopNode.status || 'draft';
    const owner = sopNode.owner || 'Unassigned';

    // Start with SOP header
    let sopContent = `---
generated: true
generated_date: ${new Date().toISOString()}
sop_id: ${sopId}
title: ${sopNode.title}
version: ${version}
status: ${status}
owner: ${owner}
last_reviewed: ${lastReviewed}
approver: ${approver}
---

# ${sopNode.title}

**SOP ID**: ${sopId}
**Version**: ${version}
**Status**: ${status}
**Owner**: ${owner}
**Last Reviewed**: ${lastReviewed}
**Approved By**: ${approver}

---

## 📋 Table of Contents

- [Overview](#overview)
- [Dependencies](#dependencies)
- [Components](#components)
- [Change History](#change-history)

---

## Overview

This SOP is automatically assembled from modular components to ensure consistency and maintainability.

`;

    // Add dependencies section
    const dependencies = this.graph.edges.filter(e => e.source === sopId && e.type === 'depends-on');

    if (dependencies.length > 0) {
      sopContent += `\n## Dependencies\n\nThis SOP depends on the following:\n\n`;

      for (const dep of dependencies) {
        const targetNode = this.graph.nodes[dep.target];
        sopContent += `- **[${dep.target}](${dep.target}.md)**: ${targetNode.title}\n`;
        sopContent += `  - ${dep.description}\n`;
        if (dep.strength === 'strong') {
          const reason = (dep.metadata && dep.metadata.reason) || 'Critical dependency';
          sopContent += `  - ⚠️ **Strong dependency** - ${reason}\n`;
        }
      }
    }

    // Get components list (supports both 'components' and 'composedOf' fields)
    const componentsList = sopNode.components || sopNode.composedOf || [];

    // Add components section
    if (componentsList.length > 0) {
      sopContent += `\n## Components\n\nThis SOP is composed of the following modular components:\n\n`;

      for (const componentId of componentsList) {
        const component = this.components.get(componentId);
        if (component) {
          sopContent += `- **${componentId}** (${component.type})\n`;
        } else {
          sopContent += `- **${componentId}** (not found in component library)\n`;
        }
      }

      sopContent += `\n---\n\n`;

      // Build the main content by including all components
      sopContent += `## SOP Content\n\n`;

      for (const componentId of componentsList) {
        this.log(`  → Including component: ${componentId}`, 'cyan');
        const component = this.getComponent(componentId);
        const processed = this.processIncludes(component);
        sopContent += `\n${processed}\n\n---\n\n`;
      }
    } else {
      sopContent += `\n## Content\n\n_This SOP does not reference any modular components._\n\n`;
    }

    // Add related SOPs section
    const relatedEdges = this.graph.edges.filter(e =>
      (e.source === sopId || e.target === sopId) && e.type === 'related-to'
    );

    if (relatedEdges.length > 0) {
      sopContent += `\n## Related SOPs\n\n`;
      for (const edge of relatedEdges) {
        const relatedId = edge.source === sopId ? edge.target : edge.source;
        const relatedNode = this.graph.nodes[relatedId];
        if (relatedNode) {
          sopContent += `- [${relatedId}](${relatedId}.md): ${relatedNode.title}\n`;
        }
      }
    }

    // Add change history
    sopContent += `\n## Change History\n\n| Version | Date | Changes | Approver |\n|---------|------|---------|----------|\n`;
    sopContent += `| ${version} | ${lastReviewed} | Current version | ${approver} |\n\n`;

    sopContent += `---\n\n`;
    sopContent += `**Last Built**: ${new Date().toISOString()}  \n`;
    sopContent += `**Build Tool**: SOPBuilder v1.0.0  \n`;
    sopContent += `**Build Type**: Automated assembly from modular components\n`;

    // Write the built SOP to dist directory
    const distDir = path.join(ROOT_DIR, 'dist', 'sops');
    await fs.mkdir(distDir, { recursive: true });

    const outputPath = path.join(distDir, `${sopId}.md`);
    await fs.writeFile(outputPath, sopContent, 'utf8');

    this.log(`  ✓ Built ${sopId} → ${outputPath}`, 'green');

    return outputPath;
  }

  /**
   * Build all SOPs in the graph
   */
  async buildAll() {
    this.log('\n🏗️  Building all SOPs...', 'bright');

    const sopIds = Object.keys(this.graph.nodes).filter(
      id => this.graph.nodes[id].type === 'sop'
    );

    const results = [];

    for (const sopId of sopIds) {
      try {
        const outputPath = await this.buildSOP(sopId);
        results.push({ sopId, status: 'success', path: outputPath });
      } catch (error) {
        this.log(`  ✗ Failed to build ${sopId}: ${error.message}`, 'red');
        results.push({ sopId, status: 'failed', error: error.message });
      }
    }

    return results;
  }

  /**
   * Generate build report
   */
  async generateBuildReport(results) {
    const reportPath = path.join(ROOT_DIR, 'dist', 'build-report.json');

    // Ensure dist directory exists
    await fs.mkdir(path.dirname(reportPath), { recursive: true });

    const report = {
      buildDate: new Date().toISOString(),
      totalSOPs: results.length,
      successful: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'failed').length,
      results: results,
      buildLog: this.buildLog
    };

    await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf8');
    this.log(`\n📄 Build report generated: ${reportPath}`, 'blue');

    return report;
  }

  /**
   * Main build process
   */
  async build(sopId = null) {
    try {
      this.log('═══════════════════════════════════════════', 'bright');
      this.log('   SOP Builder - Modular Documentation', 'bright');
      this.log('═══════════════════════════════════════════', 'bright');

      await this.loadGraph();
      await this.loadComponents();

      let results;
      if (sopId) {
        const outputPath = await this.buildSOP(sopId);
        results = [{ sopId, status: 'success', path: outputPath }];
      } else {
        results = await this.buildAll();
      }

      const report = await this.generateBuildReport(results);

      this.log('\n═══════════════════════════════════════════', 'bright');
      this.log('   Build Summary', 'bright');
      this.log('═══════════════════════════════════════════', 'bright');
      this.log(`✓ Successful: ${report.successful}`, 'green');
      if (report.failed > 0) {
        this.log(`✗ Failed: ${report.failed}`, 'red');
      }
      this.log('═══════════════════════════════════════════\n', 'bright');

      return report;

    } catch (error) {
      this.log(`\n✗ Build failed: ${error.message}`, 'red');
      console.error(error);
      process.exit(1);
    }
  }
}

// CLI execution
const main = async () => {
  const sopId = process.argv[2];
  const builder = new SOPBuilder();
  await builder.build(sopId);
};

main();
