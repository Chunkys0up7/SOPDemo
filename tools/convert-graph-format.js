#!/usr/bin/env node

/**
 * Graph Format Converter
 * Converts sop-graph.json from array format to object/dict format
 * Array format: "nodes": [{id: "x", ...}, ...]
 * Object format: "nodes": {"x": {id: "x", ...}, ...}
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

async function convertGraph(inputPath, outputPath) {
  console.log('🔄 Converting graph format...');
  console.log(`   Input: ${inputPath}`);
  console.log(`   Output: ${outputPath}`);

  // Read the input file
  const content = await fs.readFile(inputPath, 'utf8');
  const graph = JSON.parse(content);

  // Check if already in object format
  if (!Array.isArray(graph.nodes)) {
    console.log('✓ Graph is already in object format. No conversion needed.');
    return;
  }

  console.log(`\n📊 Converting ${graph.nodes.length} nodes from array to object format...`);

  // Convert nodes from array to object
  const nodesObject = {};
  for (const node of graph.nodes) {
    if (!node.id) {
      console.warn(`⚠️  Warning: Node without ID found, skipping:`, node);
      continue;
    }
    nodesObject[node.id] = node;
  }

  // Update the graph structure
  graph.nodes = nodesObject;

  // Update metadata if present
  if (graph.metadata) {
    graph.metadata.format = 'object';
    graph.metadata.convertedAt = new Date().toISOString();
  }

  // Write the output file
  await fs.writeFile(outputPath, JSON.stringify(graph, null, 2), 'utf8');

  console.log(`✓ Converted ${Object.keys(nodesObject).length} nodes`);
  console.log(`✓ Output written to: ${outputPath}`);

  // Print summary
  const nodeCounts = {};
  Object.values(nodesObject).forEach(node => {
    nodeCounts[node.type] = (nodeCounts[node.type] || 0) + 1;
  });

  console.log('\n📈 Node Summary:');
  Object.entries(nodeCounts).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
  });
}

async function main() {
  const inputFile = process.argv[2] || path.join(ROOT_DIR, 'graph', 'sop-graph.json');
  const outputFile = process.argv[3] || inputFile; // Overwrite by default

  try {
    await convertGraph(inputFile, outputFile);
    console.log('\n✅ Conversion complete!');
  } catch (error) {
    console.error('\n❌ Conversion failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

main();
