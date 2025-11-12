#!/usr/bin/env node

/**
 * Graph Visualization Tool
 *
 * Generates visual representations of the SOP dependency graph
 * Outputs in multiple formats:
 * - Mermaid diagram (for GitHub, documentation)
 * - DOT format (for Graphviz)
 * - ASCII art (for terminal viewing)
 * - HTML interactive viewer
 *
 * Usage: node tools/visualize.js [--format=mermaid|dot|ascii|html] [--output=file]
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
  cyan: '\x1b[36m'
};

class GraphVisualizer {
  constructor() {
    this.graph = null;
  }

  log(message, color = 'reset') {
    const colorCode = colors[color] || colors.reset;
    console.log(`${colorCode}${message}${colors.reset}`);
  }

  async loadGraph() {
    const graphPath = path.join(ROOT_DIR, 'graph', 'sop-graph.json');
    const graphData = await fs.readFile(graphPath, 'utf8');
    this.graph = JSON.parse(graphData);
  }

  /**
   * Generate Mermaid diagram
   */
  generateMermaid() {
    let mermaid = '```mermaid\ngraph TD\n';

    // Add nodes
    for (const [nodeId, node] of Object.entries(this.graph.nodes)) {
      const shape = this.getMermaidShape(node.type);
      const label = `${node.title || nodeId}`;

      mermaid += `    ${nodeId}${shape[0]}"${label}"${shape[1]}\n`;

      // Add styling based on type
      const styleClass = this.getMermaidStyleClass(node.type);
      if (styleClass) {
        mermaid += `    class ${nodeId} ${styleClass}\n`;
      }
    }

    mermaid += '\n';

    // Add edges
    for (const edge of this.graph.edges) {
      const arrow = this.getMermaidArrow(edge.type, edge.strength);
      const label = edge.type === 'depends-on' ? 'depends on' : edge.type;

      mermaid += `    ${edge.source} ${arrow[0]}|${label}| ${edge.target}\n`;
    }

    // Add style definitions
    mermaid += `
    classDef sopStyle fill:#e1f5ff,stroke:#01579b,stroke-width:3px
    classDef organismStyle fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef moleculeStyle fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    classDef atomStyle fill:#fff3e0,stroke:#e65100,stroke-width:1px
`;

    mermaid += '```\n';
    return mermaid;
  }

  getMermaidShape(type) {
    const shapes = {
      'sop': ['[', ']'],           // Rectangle
      'organism': ['([', '])'],     // Stadium
      'molecule': ['[[', ']]'],     // Subroutine
      'atom': ['(((', ')))']        // Double circle
    };
    return shapes[type] || ['[', ']'];
  }

  getMermaidStyleClass(type) {
    const styles = {
      'sop': 'sopStyle',
      'organism': 'organismStyle',
      'molecule': 'moleculeStyle',
      'atom': 'atomStyle'
    };
    return styles[type];
  }

  getMermaidArrow(edgeType, strength) {
    if (strength === 'strong') {
      return ['==>', ''];  // Thick arrow
    }
    if (edgeType === 'component-of') {
      return ['-.->',  ''];  // Dotted arrow
    }
    return ['-->', ''];  // Regular arrow
  }

  /**
   * Generate DOT format for Graphviz
   */
  generateDOT() {
    let dot = 'digraph SOPGraph {\n';
    dot += '  rankdir=LR;\n';
    dot += '  node [fontname="Arial", fontsize=10];\n';
    dot += '  edge [fontname="Arial", fontsize=8];\n\n';

    // Add nodes
    for (const [nodeId, node] of Object.entries(this.graph.nodes)) {
      const shape = this.getDOTShape(node.type);
      const color = this.getDOTColor(node.type);
      const label = node.title || nodeId;

      dot += `  "${nodeId}" [label="${label}", shape=${shape}, style=filled, fillcolor="${color}"];\n`;
    }

    dot += '\n';

    // Add edges
    for (const edge of this.graph.edges) {
      const style = edge.strength === 'strong' ? 'bold' : 'solid';
      const color = edge.type === 'depends-on' ? 'red' : 'blue';
      const label = edge.description ? edge.description.substring(0, 30) + '...' : edge.type;

      dot += `  "${edge.source}" -> "${edge.target}" [label="${label}", style=${style}, color=${color}];\n`;
    }

    // Add legend
    dot += '\n  subgraph cluster_legend {\n';
    dot += '    label="Legend";\n';
    dot += '    style=filled;\n';
    dot += '    color=lightgrey;\n';
    dot += '    node [style=filled];\n';
    dot += '    "SOP" [fillcolor="lightblue", shape=box];\n';
    dot += '    "Organism" [fillcolor="plum", shape=ellipse];\n';
    dot += '    "Molecule" [fillcolor="lightgreen", shape=diamond];\n';
    dot += '    "Atom" [fillcolor="lightyellow", shape=circle];\n';
    dot += '  }\n';

    dot += '}\n';
    return dot;
  }

  getDOTShape(type) {
    const shapes = {
      'sop': 'box',
      'organism': 'ellipse',
      'molecule': 'diamond',
      'atom': 'circle'
    };
    return shapes[type] || 'box';
  }

  getDOTColor(type) {
    const colors = {
      'sop': 'lightblue',
      'organism': 'plum',
      'molecule': 'lightgreen',
      'atom': 'lightyellow'
    };
    return colors[type] || 'white';
  }

  /**
   * Generate ASCII art representation
   */
  generateASCII() {
    let ascii = '\n';
    ascii += '╔════════════════════════════════════════════════════════════╗\n';
    ascii += '║            SOP DEPENDENCY GRAPH (ASCII View)               ║\n';
    ascii += '╚════════════════════════════════════════════════════════════╝\n\n';

    // Group nodes by type
    const byType = {};
    for (const [nodeId, node] of Object.entries(this.graph.nodes)) {
      if (!byType[node.type]) byType[node.type] = [];
      byType[node.type].push({ id: nodeId, ...node });
    }

    // Display nodes by type
    for (const type of ['sop', 'organism', 'molecule', 'atom']) {
      if (!byType[type]) continue;

      ascii += `\n${type.toUpperCase()}S:\n`;
      ascii += '─'.repeat(60) + '\n';

      for (const node of byType[type]) {
        const icon = { 'sop': '📄', 'organism': '🔷', 'molecule': '🔹', 'atom': '⚛️' }[type];
        ascii += `  ${icon} ${node.id}\n`;
        ascii += `     └─ ${node.title || 'Untitled'}\n`;

        if (node.version) {
          ascii += `        Version: ${node.version}\n`;
        }

        // Show dependencies
        const deps = this.graph.edges.filter(e => e.source === node.id);
        if (deps.length > 0) {
          ascii += `        Dependencies:\n`;
          for (const dep of deps) {
            const targetNode = this.graph.nodes[dep.target];
            const arrow = dep.strength === 'strong' ? '═══>' : '───>';
            ascii += `          ${arrow} ${dep.target} (${targetNode?.title || 'Unknown'})\n`;
          }
        }

        ascii += '\n';
      }
    }

    // Show edge statistics
    ascii += '\nDEPENDENCY STATISTICS:\n';
    ascii += '─'.repeat(60) + '\n';

    const edgesByType = {};
    for (const edge of this.graph.edges) {
      edgesByType[edge.type] = (edgesByType[edge.type] || 0) + 1;
    }

    for (const [type, count] of Object.entries(edgesByType)) {
      ascii += `  ${type}: ${count}\n`;
    }

    const strongDeps = this.graph.edges.filter(e => e.strength === 'strong').length;
    ascii += `  Strong dependencies: ${strongDeps}\n`;

    ascii += '\n';
    return ascii;
  }

  /**
   * Generate interactive HTML visualization
   */
  generateHTML() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SOP Graph Visualization</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      margin-bottom: 20px;
    }

    h1 {
      color: #2d3748;
      margin-bottom: 10px;
    }

    .subtitle {
      color: #718096;
      font-size: 14px;
    }

    .controls {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }

    .controls label {
      margin-right: 10px;
      color: #4a5568;
      font-weight: 500;
    }

    .controls select, .controls input {
      padding: 8px 12px;
      border: 1px solid #cbd5e0;
      border-radius: 5px;
      margin-right: 15px;
    }

    .graph-container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      min-height: 600px;
    }

    .node {
      margin: 20px 0;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid;
      transition: transform 0.2s;
    }

    .node:hover {
      transform: translateX(5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .node-sop {
      background: #e1f5ff;
      border-color: #01579b;
    }

    .node-organism {
      background: #f3e5f5;
      border-color: #4a148c;
    }

    .node-molecule {
      background: #e8f5e9;
      border-color: #1b5e20;
    }

    .node-atom {
      background: #fff3e0;
      border-color: #e65100;
    }

    .node-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .node-title {
      font-size: 18px;
      font-weight: 600;
      color: #2d3748;
    }

    .node-type {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .type-sop { background: #01579b; color: white; }
    .type-organism { background: #4a148c; color: white; }
    .type-molecule { background: #1b5e20; color: white; }
    .type-atom { background: #e65100; color: white; }

    .node-meta {
      font-size: 14px;
      color: #718096;
      margin-bottom: 10px;
    }

    .dependencies {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #e2e8f0;
    }

    .dep-title {
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .dep-item {
      padding: 8px;
      margin: 5px 0;
      background: #f7fafc;
      border-radius: 4px;
      font-size: 13px;
      color: #4a5568;
    }

    .dep-strong {
      border-left: 3px solid #e53e3e;
      background: #fff5f5;
    }

    .legend {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      margin-top: 20px;
    }

    .legend-title {
      font-weight: 600;
      margin-bottom: 15px;
      color: #2d3748;
    }

    .legend-items {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .legend-box {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      border-left: 4px solid;
    }

    .search-highlight {
      background-color: yellow;
      padding: 2px 4px;
      border-radius: 3px;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      text-align: center;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      color: #667eea;
    }

    .stat-label {
      font-size: 14px;
      color: #718096;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔷 SOP Ecosystem Graph</h1>
      <p class="subtitle">Interactive visualization of Standard Operating Procedures and their dependencies</p>
    </header>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value" id="total-nodes">0</div>
        <div class="stat-label">Total Nodes</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="total-sops">0</div>
        <div class="stat-label">SOPs</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="total-edges">0</div>
        <div class="stat-label">Dependencies</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="strong-deps">0</div>
        <div class="stat-label">Strong Deps</div>
      </div>
    </div>

    <div class="controls">
      <label for="filter-type">Filter by type:</label>
      <select id="filter-type">
        <option value="all">All</option>
        <option value="sop">SOPs only</option>
        <option value="organism">Organisms</option>
        <option value="molecule">Molecules</option>
        <option value="atom">Atoms</option>
      </select>

      <label for="search">Search:</label>
      <input type="text" id="search" placeholder="Search nodes...">
    </div>

    <div class="graph-container" id="graph"></div>

    <div class="legend">
      <div class="legend-title">Legend</div>
      <div class="legend-items">
        <div class="legend-item">
          <div class="legend-box node-sop"></div>
          <span>SOP - Complete Standard Operating Procedure</span>
        </div>
        <div class="legend-item">
          <div class="legend-box node-organism"></div>
          <span>Organism - Complete functional workflow</span>
        </div>
        <div class="legend-item">
          <div class="legend-box node-molecule"></div>
          <span>Molecule - Multi-step procedure</span>
        </div>
        <div class="legend-item">
          <div class="legend-box node-atom"></div>
          <span>Atom - Smallest reusable unit</span>
        </div>
      </div>
    </div>
  </div>

  <script>
    const graphData = ${JSON.stringify(this.graph, null, 2)};

    function renderGraph(filterType = 'all', searchTerm = '') {
      const container = document.getElementById('graph');
      container.innerHTML = '';

      // Filter nodes
      const filteredNodes = Object.entries(graphData.nodes).filter(([id, node]) => {
        const typeMatch = filterType === 'all' || node.type === filterType;
        const searchMatch = searchTerm === '' ||
          id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (node.title && node.title.toLowerCase().includes(searchTerm.toLowerCase()));
        return typeMatch && searchMatch;
      });

      // Render nodes
      for (const [nodeId, node] of filteredNodes) {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = \`node node-\${node.type}\`;
        nodeDiv.id = \`node-\${nodeId}\`;

        // Find dependencies
        const deps = graphData.edges.filter(e => e.source === nodeId);
        const dependents = graphData.edges.filter(e => e.target === nodeId);

        let html = \`
          <div class="node-header">
            <div class="node-title">\${highlightSearch(node.title || nodeId, searchTerm)}</div>
            <span class="node-type type-\${node.type}">\${node.type}</span>
          </div>
          <div class="node-meta">
            <strong>ID:</strong> \${highlightSearch(nodeId, searchTerm)}
        \`;

        if (node.version) html += \` | <strong>Version:</strong> \${node.version}\`;
        if (node.status) html += \` | <strong>Status:</strong> \${node.status}\`;
        if (node.owner) html += \` | <strong>Owner:</strong> \${node.owner}\`;

        html += '</div>';

        if (deps.length > 0) {
          html += '<div class="dependencies"><div class="dep-title">📤 Dependencies (\${deps.length}):</div>';
          deps.forEach(dep => {
            const target = graphData.nodes[dep.target];
            const strongClass = dep.strength === 'strong' ? ' dep-strong' : '';
            html += \`<div class="dep-item\${strongClass}">→ \${dep.target}: \${target?.title || 'Unknown'} (\${dep.type})</div>\`;
          });
          html += '</div>';
        }

        if (dependents.length > 0) {
          html += '<div class="dependencies"><div class="dep-title">📥 Used By (\${dependents.length}):</div>';
          dependents.forEach(dep => {
            const source = graphData.nodes[dep.source];
            html += \`<div class="dep-item">← \${dep.source}: \${source?.title || 'Unknown'}</div>\`;
          });
          html += '</div>';
        }

        nodeDiv.innerHTML = html;
        container.appendChild(nodeDiv);
      }

      if (filteredNodes.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #718096; padding: 40px;">No nodes match your filter criteria.</p>';
      }
    }

    function highlightSearch(text, searchTerm) {
      if (!searchTerm || !text) return text;
      const regex = new RegExp(\`(\${searchTerm})\`, 'gi');
      return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    function updateStats() {
      const nodes = Object.values(graphData.nodes);
      document.getElementById('total-nodes').textContent = nodes.length;
      document.getElementById('total-sops').textContent = nodes.filter(n => n.type === 'sop').length;
      document.getElementById('total-edges').textContent = graphData.edges.length;
      document.getElementById('strong-deps').textContent = graphData.edges.filter(e => e.strength === 'strong').length;
    }

    // Event listeners
    document.getElementById('filter-type').addEventListener('change', (e) => {
      renderGraph(e.target.value, document.getElementById('search').value);
    });

    document.getElementById('search').addEventListener('input', (e) => {
      renderGraph(document.getElementById('filter-type').value, e.target.value);
    });

    // Initial render
    updateStats();
    renderGraph();
  </script>
</body>
</html>`;

    return html;
  }

  /**
   * Main visualization function
   */
  async visualize(format = 'mermaid', outputFile = null) {
    try {
      this.log('═══════════════════════════════════════════════', 'bright');
      this.log('        SOP Graph Visualization Tool', 'bright');
      this.log('═══════════════════════════════════════════════\n', 'bright');

      await this.loadGraph();

      this.log(`📊 Loaded ${Object.keys(this.graph.nodes).length} nodes, ${this.graph.edges.length} edges\n`, 'cyan');

      let output;
      let defaultFilename;

      switch (format) {
        case 'mermaid':
          this.log('🎨 Generating Mermaid diagram...', 'blue');
          output = this.generateMermaid();
          defaultFilename = 'sop-graph.mermaid.md';
          break;

        case 'dot':
          this.log('🎨 Generating DOT format (Graphviz)...', 'blue');
          output = this.generateDOT();
          defaultFilename = 'sop-graph.dot';
          break;

        case 'ascii':
          this.log('🎨 Generating ASCII representation...', 'blue');
          output = this.generateASCII();
          defaultFilename = 'sop-graph.txt';
          break;

        case 'html':
          this.log('🎨 Generating interactive HTML visualization...', 'blue');
          output = this.generateHTML();
          defaultFilename = 'sop-graph.html';
          break;

        default:
          throw new Error(`Unknown format: ${format}`);
      }

      // Output to file or console
      if (outputFile || format !== 'ascii') {
        const filename = outputFile || defaultFilename;
        const outputPath = path.join(ROOT_DIR, 'dist', 'visualizations', filename);

        await fs.mkdir(path.join(ROOT_DIR, 'dist', 'visualizations'), { recursive: true });
        await fs.writeFile(outputPath, output, 'utf8');

        this.log(`\n✓ Visualization saved to: ${outputPath}`, 'green');

        if (format === 'html') {
          this.log(`\n🌐 Open in browser: file://${outputPath}`, 'cyan');
        }
      } else {
        // Print ASCII to console
        console.log(output);
      }

      this.log('\n═══════════════════════════════════════════════\n', 'bright');

    } catch (error) {
      this.log(`\n✗ Visualization failed: ${error.message}`, 'red');
      console.error(error);
      process.exit(1);
    }
  }
}

// CLI execution
const main = async () => {
  const args = process.argv.slice(2);

  let format = 'mermaid';
  let outputFile = null;

  for (const arg of args) {
    if (arg.startsWith('--format=')) {
      format = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
      outputFile = arg.split('=')[1];
    }
  }

  const visualizer = new GraphVisualizer();
  await visualizer.visualize(format, outputFile);
};

main();
