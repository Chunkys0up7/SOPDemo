#!/usr/bin/env node

/**
 * Impact Analysis Tool
 *
 * Analyzes the impact of changes to SOPs or components by traversing
 * the dependency graph and identifying all affected documents.
 *
 * This demonstrates one of the key benefits of graph-based SOP management:
 * understanding the ripple effects of changes before making them.
 *
 * Usage: node tools/impact-analysis.js <node-id> [--depth=N]
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
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

class ImpactAnalyzer {
  constructor() {
    this.graph = null;
    this.impactTree = new Map();
    this.visited = new Set();
  }

  log(message, color = 'reset', indent = 0) {
    const colorCode = colors[color] || colors.reset;
    const indentation = '  '.repeat(indent);
    console.log(`${colorCode}${indentation}${message}${colors.reset}`);
  }

  async loadGraph() {
    const graphPath = path.join(ROOT_DIR, 'graph', 'sop-graph.json');
    const graphData = await fs.readFile(graphPath, 'utf8');
    this.graph = JSON.parse(graphData);
  }

  /**
   * Find all nodes that depend on the given node
   */
  findDependents(nodeId) {
    const dependents = [];

    // Find edges where this node is the target (others depend on it)
    for (const edge of this.graph.edges) {
      if (edge.target === nodeId) {
        const sourceNode = this.graph.nodes[edge.source];
        dependents.push({
          id: edge.source,
          node: sourceNode,
          relationship: edge.type,
          description: edge.description,
          strength: edge.strength || 'normal',
          metadata: edge.metadata
        });
      }
    }

    return dependents;
  }

  /**
   * Find all nodes that this node depends on
   */
  findDependencies(nodeId) {
    const dependencies = [];

    // Find edges where this node is the source (it depends on others)
    for (const edge of this.graph.edges) {
      if (edge.source === nodeId) {
        const targetNode = this.graph.nodes[edge.target];
        dependencies.push({
          id: edge.target,
          node: targetNode,
          relationship: edge.type,
          description: edge.description,
          strength: edge.strength || 'normal',
          metadata: edge.metadata
        });
      }
    }

    return dependencies;
  }

  /**
   * Find all components that use this component
   */
  findComponentUsage(componentId) {
    const usage = [];

    for (const [nodeId, node] of Object.entries(this.graph.nodes)) {
      // Check if this node lists the component in composedOf
      if (node.composedOf && node.composedOf.includes(componentId)) {
        usage.push({
          id: nodeId,
          node: node,
          relationship: 'uses-component'
        });
      }

      // Check if this node lists the component in its components array
      if (node.components && node.components.includes(componentId)) {
        usage.push({
          id: nodeId,
          node: node,
          relationship: 'includes-component'
        });
      }

      // Check if this node lists the component in reusableIn
      if (node.reusableIn && node.reusableIn.includes(nodeId)) {
        usage.push({
          id: nodeId,
          node: node,
          relationship: 'can-be-reused-in'
        });
      }
    }

    return usage;
  }

  /**
   * Recursively analyze impact with depth tracking
   */
  analyzeImpact(nodeId, depth = 0, maxDepth = 10, path = []) {
    // Prevent infinite loops
    if (depth > maxDepth) {
      return { truncated: true, reason: 'Max depth reached' };
    }

    // Prevent circular dependencies in this path
    if (path.includes(nodeId)) {
      return { circular: true, path: [...path, nodeId] };
    }

    const node = this.graph.nodes[nodeId];
    if (!node) {
      return { error: true, message: `Node ${nodeId} not found` };
    }

    // Mark as visited globally
    this.visited.add(nodeId);

    const impact = {
      id: nodeId,
      node: node,
      depth: depth,
      directDependents: this.findDependents(nodeId),
      componentUsage: this.findComponentUsage(nodeId),
      downstreamImpacts: []
    };

    // Calculate risk level
    impact.riskLevel = this.calculateRiskLevel(impact);

    // Analyze downstream impacts
    const allAffected = [...impact.directDependents, ...impact.componentUsage];

    for (const affected of allAffected) {
      const downstreamImpact = this.analyzeImpact(
        affected.id,
        depth + 1,
        maxDepth,
        [...path, nodeId]
      );

      impact.downstreamImpacts.push({
        ...affected,
        impact: downstreamImpact
      });
    }

    return impact;
  }

  /**
   * Calculate risk level based on impact scope
   */
  calculateRiskLevel(impact) {
    const directCount = impact.directDependents.length + impact.componentUsage.length;
    const hasStrongDependencies = impact.directDependents.some(d => d.strength === 'strong');

    if (directCount === 0) return 'low';
    if (directCount <= 2 && !hasStrongDependencies) return 'low';
    if (directCount <= 5 || hasStrongDependencies) return 'medium';
    if (directCount <= 10) return 'high';
    return 'critical';
  }

  /**
   * Get color for risk level
   */
  getRiskColor(riskLevel) {
    const colorMap = {
      'low': 'green',
      'medium': 'yellow',
      'high': 'red',
      'critical': 'magenta'
    };
    return colorMap[riskLevel] || 'reset';
  }

  /**
   * Display impact tree in a readable format
   */
  displayImpactTree(impact, indent = 0, showDetails = true) {
    const node = impact.node;

    // Display current node
    const icon = {
      'sop': '📄',
      'organism': '🔷',
      'molecule': '🔹',
      'atom': '⚛️'
    }[node.type] || '📌';

    this.log(`${icon} ${node.id}: ${node.title || 'Untitled'}`, 'bright', indent);

    if (showDetails && indent === 0) {
      this.log(`Type: ${node.type}`, 'cyan', indent + 1);
      this.log(`Version: ${node.version}`, 'cyan', indent + 1);
      if (node.status) {
        this.log(`Status: ${node.status}`, 'cyan', indent + 1);
      }
      if (node.owner) {
        this.log(`Owner: ${node.owner}`, 'cyan', indent + 1);
      }
    }

    // Display risk level
    const riskColor = this.getRiskColor(impact.riskLevel);
    this.log(`Risk Level: ${impact.riskLevel.toUpperCase()}`, riskColor, indent + 1);

    // Display direct impacts
    const totalDirectImpacts = impact.directDependents.length + impact.componentUsage.length;

    if (totalDirectImpacts > 0) {
      this.log(`\nDirect Impacts: ${totalDirectImpacts}`, 'yellow', indent + 1);

      // Show dependents
      if (impact.directDependents.length > 0) {
        this.log(`\nDependent SOPs/Components:`, 'blue', indent + 1);
        for (const dep of impact.directDependents) {
          const strengthIndicator = dep.strength === 'strong' ? '⚠️ ' : '';
          this.log(
            `${strengthIndicator}→ ${dep.id} (${dep.node.title})`,
            dep.strength === 'strong' ? 'red' : 'reset',
            indent + 2
          );
          this.log(`  Relationship: ${dep.relationship}`, 'reset', indent + 3);
          if (dep.description) {
            this.log(`  Impact: ${dep.description}`, 'reset', indent + 3);
          }
          if (dep.metadata && dep.metadata.reason) {
            this.log(`  Reason: ${dep.metadata.reason}`, 'reset', indent + 3);
          }
        }
      }

      // Show component usage
      if (impact.componentUsage.length > 0) {
        this.log(`\nUsed By Components/SOPs:`, 'blue', indent + 1);
        for (const usage of impact.componentUsage) {
          this.log(
            `→ ${usage.id} (${usage.node.title})`,
            'reset',
            indent + 2
          );
        }
      }

      // Show downstream impacts recursively
      if (impact.downstreamImpacts.length > 0) {
        this.log(`\n⤷ Downstream Impacts:`, 'magenta', indent + 1);

        for (const downstream of impact.downstreamImpacts) {
          if (downstream.impact.circular) {
            this.log(
              `⚠️ Circular dependency detected: ${downstream.impact.path.join(' → ')}`,
              'red',
              indent + 2
            );
          } else if (downstream.impact.error) {
            this.log(
              `✗ Error: ${downstream.impact.message}`,
              'red',
              indent + 2
            );
          } else if (downstream.impact.truncated) {
            this.log(
              `... (${downstream.impact.reason})`,
              'yellow',
              indent + 2
            );
          } else {
            this.log('', 'reset', indent + 2);
            this.displayImpactTree(downstream.impact, indent + 2, false);
          }
        }
      }
    } else {
      this.log(`\n✓ No dependencies - Safe to modify`, 'green', indent + 1);
    }
  }

  /**
   * Generate impact summary statistics
   */
  generateSummary(impact) {
    const stats = {
      totalAffected: this.visited.size - 1, // Exclude the source node
      byType: {},
      byRiskLevel: {},
      strongDependencies: 0,
      recommendations: []
    };

    // Count by type and risk
    const countImpacts = (imp) => {
      if (!imp.node) return;

      const type = imp.node.type;
      stats.byType[type] = (stats.byType[type] || 0) + 1;
      stats.byRiskLevel[imp.riskLevel] = (stats.byRiskLevel[imp.riskLevel] || 0) + 1;

      // Count strong dependencies
      stats.strongDependencies += imp.directDependents.filter(d => d.strength === 'strong').length;

      // Recursively count downstream
      for (const downstream of imp.downstreamImpacts) {
        if (downstream.impact && !downstream.impact.error && !downstream.impact.circular) {
          countImpacts(downstream.impact);
        }
      }
    };

    countImpacts(impact);

    // Generate recommendations
    if (stats.totalAffected === 0) {
      stats.recommendations.push('✓ Low risk change - no dependencies affected');
      stats.recommendations.push('→ Safe to proceed with modifications');
    } else if (stats.totalAffected <= 2) {
      stats.recommendations.push('⚠️ Low-Medium risk - minimal impact');
      stats.recommendations.push('→ Review affected documents before making changes');
      stats.recommendations.push('→ Notify document owners of planned changes');
    } else if (stats.totalAffected <= 5) {
      stats.recommendations.push('⚠️ Medium risk - moderate impact scope');
      stats.recommendations.push('→ Conduct thorough review of all affected documents');
      stats.recommendations.push('→ Create change management plan');
      stats.recommendations.push('→ Notify all stakeholders');
    } else {
      stats.recommendations.push('🚨 High risk - significant impact scope');
      stats.recommendations.push('→ Require approval from all affected document owners');
      stats.recommendations.push('→ Create detailed change management plan');
      stats.recommendations.push('→ Consider phased rollout approach');
      stats.recommendations.push('→ Schedule stakeholder meeting before changes');
    }

    if (stats.strongDependencies > 0) {
      stats.recommendations.push(`⚠️ ${stats.strongDependencies} strong dependencies detected - critical coordination required`);
    }

    return stats;
  }

  /**
   * Display summary
   */
  displaySummary(stats) {
    this.log('\n═════════════════════════════════════════════════', 'bright');
    this.log('                 IMPACT SUMMARY', 'bright');
    this.log('═════════════════════════════════════════════════\n', 'bright');

    this.log(`Total Affected Documents: ${stats.totalAffected}`, 'cyan');

    if (stats.totalAffected > 0) {
      this.log(`\nBreakdown by Type:`, 'blue');
      for (const [type, count] of Object.entries(stats.byType)) {
        this.log(`  ${type}: ${count}`, 'reset', 1);
      }

      this.log(`\nRisk Distribution:`, 'blue');
      for (const [risk, count] of Object.entries(stats.byRiskLevel)) {
        const color = this.getRiskColor(risk);
        this.log(`  ${risk}: ${count}`, color, 1);
      }

      if (stats.strongDependencies > 0) {
        this.log(`\n⚠️ Strong Dependencies: ${stats.strongDependencies}`, 'red');
      }
    }

    this.log(`\n📋 Recommendations:`, 'yellow');
    for (const rec of stats.recommendations) {
      this.log(rec, 'reset', 1);
    }

    this.log('\n═════════════════════════════════════════════════\n', 'bright');
  }

  /**
   * Export impact analysis to JSON
   */
  async exportAnalysis(nodeId, impact, stats) {
    const exportDir = path.join(ROOT_DIR, 'dist', 'impact-analysis');
    await fs.mkdir(exportDir, { recursive: true });

    const exportData = {
      analysisDate: new Date().toISOString(),
      sourceNode: nodeId,
      impact: this.serializeImpact(impact),
      summary: stats,
      visited: Array.from(this.visited)
    };

    const filename = `impact-${nodeId}-${Date.now()}.json`;
    const exportPath = path.join(exportDir, filename);

    await fs.writeFile(exportPath, JSON.stringify(exportData, null, 2), 'utf8');
    this.log(`\n📄 Analysis exported to: ${exportPath}`, 'green');

    return exportPath;
  }

  /**
   * Serialize impact tree for export (remove circular references)
   */
  serializeImpact(impact) {
    return {
      id: impact.id,
      nodeType: impact.node?.type,
      nodeTitle: impact.node?.title,
      depth: impact.depth,
      riskLevel: impact.riskLevel,
      directDependents: impact.directDependents.map(d => ({
        id: d.id,
        title: d.node?.title,
        relationship: d.relationship,
        strength: d.strength
      })),
      componentUsage: impact.componentUsage.map(u => ({
        id: u.id,
        title: u.node?.title,
        relationship: u.relationship
      })),
      downstreamImpacts: impact.downstreamImpacts.map(d => ({
        id: d.id,
        impact: d.impact.circular || d.impact.error ?
          { status: d.impact.circular ? 'circular' : 'error' } :
          this.serializeImpact(d.impact)
      }))
    };
  }

  /**
   * Main analysis function
   */
  async analyze(nodeId, maxDepth = 10, exportResults = true) {
    try {
      this.log('═══════════════════════════════════════════════', 'bright');
      this.log('     SOP Impact Analysis - Change Propagation', 'bright');
      this.log('═══════════════════════════════════════════════\n', 'bright');

      await this.loadGraph();

      // Validate node exists
      if (!this.graph.nodes[nodeId]) {
        this.log(`✗ Error: Node '${nodeId}' not found in graph`, 'red');
        this.log(`\nAvailable nodes:`, 'yellow');
        for (const id of Object.keys(this.graph.nodes)) {
          const node = this.graph.nodes[id];
          this.log(`  ${id} (${node.type}): ${node.title || 'Untitled'}`, 'reset', 1);
        }
        process.exit(1);
      }

      this.log(`🔍 Analyzing impact of changes to: ${nodeId}\n`, 'cyan');

      // Perform impact analysis
      const impact = this.analyzeImpact(nodeId, 0, maxDepth);

      // Display impact tree
      this.displayImpactTree(impact);

      // Generate and display summary
      const stats = this.generateSummary(impact);
      this.displaySummary(stats);

      // Export results
      if (exportResults) {
        await this.exportAnalysis(nodeId, impact, stats);
      }

      return { impact, stats };

    } catch (error) {
      this.log(`\n✗ Analysis failed: ${error.message}`, 'red');
      console.error(error);
      process.exit(1);
    }
  }
}

// CLI execution
const main = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node tools/impact-analysis.js <node-id> [--depth=N]');
    console.log('\nExample: node tools/impact-analysis.js atom-access-request-form');
    process.exit(1);
  }

  const nodeId = args[0];
  const depthArg = args.find(arg => arg.startsWith('--depth='));
  const maxDepth = depthArg ? parseInt(depthArg.split('=')[1]) : 10;

  const analyzer = new ImpactAnalyzer();
  await analyzer.analyze(nodeId, maxDepth);
};

main();
