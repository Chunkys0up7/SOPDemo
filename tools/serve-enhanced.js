#!/usr/bin/env node

/**
 * Enhanced HTTP Server with API Support
 *
 * Extends the basic serve.js with:
 * - REST API endpoints for RAG assistant
 * - Analytics tracking endpoints
 * - SOP metrics and quality APIs
 * - Graph data APIs
 */

import http from 'http';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { URL } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';
import neo4j from 'neo4j-driver';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  const colorCode = colors[color] || colors.reset;
  console.log(`${colorCode}${message}${colors.reset}`);
}

// ============================================================================
// Neo4j Connection
// ============================================================================

const NEO4J_URI = process.env.NEO4J_URI || 'bolt://localhost:7687';
const NEO4J_USER = process.env.NEO4J_USER || 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'neo4j';

let neo4jDriver = null;

try {
  neo4jDriver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
  );
  log('📊 Neo4j driver initialized', 'green');
} catch (error) {
  log(`⚠️  Neo4j connection unavailable: ${error.message}`, 'yellow');
}

// ============================================================================
// Vector Database (Mock Implementation)
// ============================================================================

class VectorDatabase {
  constructor() {
    this.embeddings = this.initializeMockEmbeddings();
  }

  initializeMockEmbeddings() {
    return [
      {
        id: 'sop-mf-003-section-1',
        sopId: 'sop-mf-003',
        title: 'FHA Underwriting Standards',
        section: 'Credit Score Methodology',
        content: 'FHA requires minimum credit score of 580 for 3.5% down payment. Scores 500-579 require 10% down. Manual underwriting required for scores below 620.',
        embedding: [0.23, 0.45, 0.67, 0.12, 0.89],
        metadata: {
          department: 'Mortgage Finance',
          category: 'Underwriting',
          complianceFrameworks: ['FHA Handbook 4000.1'],
          lastUpdated: '2025-11-16'
        }
      },
      {
        id: 'sop-mf-005-section-1',
        sopId: 'sop-mf-005',
        title: 'Wire Transfer Security',
        section: 'Approval Thresholds',
        content: 'Wire transfers require tiered approval: $0-15K (1 Closer), $15K-100K (Closer + Manager), $100K-500K (Closer + Manager + VP), $500K+ (2 VPs + CFO).',
        embedding: [0.67, 0.23, 0.45, 0.89, 0.12],
        metadata: {
          department: 'Mortgage Finance',
          category: 'Security',
          complianceFrameworks: ['SOX', 'Fraud Prevention'],
          lastUpdated: '2025-11-16'
        }
      },
      {
        id: 'sop-mf-004-section-1',
        sopId: 'sop-mf-004',
        title: 'Clear to Close Procedures',
        section: 'Quality Checklist',
        content: 'CTC requires 75-point quality checklist including: title commitment review, insurance verification, TRID compliance check, final walkthrough confirmation.',
        embedding: [0.45, 0.89, 0.23, 0.67, 0.12],
        metadata: {
          department: 'Mortgage Finance',
          category: 'Quality Control',
          complianceFrameworks: ['TRID', 'RESPA'],
          lastUpdated: '2025-11-16'
        }
      }
    ];
  }

  cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magA * magB);
  }

  async embedQuery(query) {
    const keywords = query.toLowerCase().split(' ');
    let embedding = [0.5, 0.5, 0.5, 0.5, 0.5];

    if (keywords.includes('credit') || keywords.includes('score')) {
      embedding = [0.25, 0.45, 0.65, 0.15, 0.85];
    } else if (keywords.includes('wire') || keywords.includes('transfer')) {
      embedding = [0.65, 0.25, 0.45, 0.85, 0.15];
    } else if (keywords.includes('close') || keywords.includes('ctc')) {
      embedding = [0.45, 0.85, 0.25, 0.65, 0.15];
    }

    return embedding;
  }

  async search(queryEmbedding, topK = 5) {
    let results = this.embeddings.map(doc => ({
      ...doc,
      score: this.cosineSimilarity(queryEmbedding, doc.embedding)
    }));

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }
}

const vectorDB = new VectorDatabase();

// ============================================================================
// SOP Creation Helpers
// ============================================================================

async function getNextSOPId() {
  const sopsDir = path.join(ROOT_DIR, 'sops', 'mortgage');
  const files = await fs.readdir(sopsDir);
  const sopFiles = files.filter(f => f.match(/^sop-mf-\d+.*\.md$/));

  const ids = sopFiles.map(f => {
    const match = f.match(/^sop-mf-(\d+)/);
    return match ? parseInt(match[1]) : 0;
  });

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return maxId + 1;
}

function generateMarkdownFromFormData(formData, sopId) {
  const today = new Date().toISOString().split('T')[0];
  const nextReview = new Date();
  nextReview.setMonth(nextReview.getMonth() + (formData.reviewFrequency === 'Quarterly' ? 3 : formData.reviewFrequency === 'Semi-annually' ? 6 : 12));

  let markdown = `---\n`;
  markdown += `id: sop-mf-${String(sopId).padStart(3, '0')}\n`;
  markdown += `title: ${formData.title}\n`;
  markdown += `version: 1.0.0\n`;
  markdown += `status: draft\n`;
  markdown += `owner: ${formData.owner}\n`;
  markdown += `category: ${formData.processCategory}\n`;
  markdown += `department: ${formData.department}\n`;
  markdown += `criticality: medium\n`;
  markdown += `last_reviewed: ${today}\n`;
  markdown += `next_review: ${nextReview.toISOString().split('T')[0]}\n`;
  markdown += `review_frequency: ${formData.reviewFrequency.toLowerCase()}\n`;
  markdown += `effective_date: ${today}\n`;
  markdown += `approver: ${formData.approver}\n`;
  markdown += `maintainer: ${formData.maintainer}\n`;

  if (formData.reviewers && formData.reviewers.trim()) {
    const reviewersList = formData.reviewers.split(',').map(r => r.trim());
    markdown += `reviewers:\n`;
    reviewersList.forEach(r => {
      markdown += `  - ${r}\n`;
    });
  }

  if (formData.complianceFrameworks && formData.complianceFrameworks.length > 0) {
    markdown += `compliance_frameworks:\n`;
    formData.complianceFrameworks.forEach(fw => {
      markdown += `  - ${fw}\n`;
    });
  }

  if (formData.keywords && formData.keywords.length > 0) {
    markdown += `tags:\n`;
    formData.keywords.forEach(kw => {
      markdown += `  - ${kw.toLowerCase().replace(/\s+/g, '-')}\n`;
    });
  }

  markdown += `complexity: ${formData.complexity}\n`;
  markdown += `estimated_duration: ${formData.estimatedDuration}\n`;
  markdown += `---\n\n`;

  // Document body
  markdown += `# ${formData.title}\n\n`;

  if (formData.purpose) {
    markdown += `## Purpose\n\n${formData.purpose}\n\n`;
  }

  if (formData.scope) {
    markdown += `## Scope\n\n### What IS Covered\n\n${formData.scope}\n\n`;
  }

  if (formData.outOfScope && formData.outOfScope.trim()) {
    markdown += `### What is NOT Covered\n\n${formData.outOfScope}\n\n`;
  }

  if (formData.audience && formData.audience.length > 0) {
    markdown += `## Audience\n\nThis procedure is intended for:\n`;
    formData.audience.forEach(aud => {
      markdown += `- ${aud}\n`;
    });
    markdown += `\n`;
  }

  // Add steps if provided
  if (formData.steps && formData.steps.length > 0) {
    markdown += `## Procedure\n\n`;
    formData.steps.forEach((step, i) => {
      markdown += `### Step ${i + 1}: ${step.title}\n\n`;
      if (step.description) {
        markdown += `${step.description}\n\n`;
      }
    });
  }

  if (formData.troubleshooting && formData.troubleshooting.trim()) {
    markdown += `## Troubleshooting\n\n`;
    const issues = formData.troubleshooting.split('\n').filter(line => line.trim());
    if (issues.length > 0) {
      markdown += `| Issue | Symptoms | Root Cause | Solution | Escalation |\n`;
      markdown += `|-------|----------|------------|----------|------------|\n`;
      issues.forEach(issue => {
        const parts = issue.split('|').map(p => p.trim());
        if (parts.length >= 4) {
          markdown += `| ${parts[0]} | ${parts[1]} | ${parts[2]} | ${parts[3]} | ${parts[4] || 'Contact supervisor'} |\n`;
        }
      });
      markdown += `\n`;
    } else {
      markdown += `${formData.troubleshooting}\n\n`;
    }
  }

  // Compliance section
  if (formData.complianceFrameworks && formData.complianceFrameworks.length > 0) {
    markdown += `## Compliance & Regulatory Requirements\n\n`;
    markdown += `This procedure complies with the following frameworks:\n`;
    formData.complianceFrameworks.forEach(fw => {
      markdown += `- ${fw}\n`;
    });
    markdown += `\n`;
    markdown += `**Audit Frequency:** ${formData.auditFrequency}\n`;
    markdown += `**Review Frequency:** ${formData.reviewFrequency}\n\n`;
  }

  // Ownership
  markdown += `## Document Control\n\n`;
  markdown += `- **Owner:** ${formData.owner}\n`;
  markdown += `- **Maintainer:** ${formData.maintainer}\n`;
  markdown += `- **Approver:** ${formData.approver}\n`;
  if (formData.reviewers && formData.reviewers.trim()) {
    markdown += `- **Reviewers:** ${formData.reviewers}\n`;
  }
  markdown += `- **Last Reviewed:** ${today}\n`;
  markdown += `- **Next Review:** ${nextReview.toISOString().split('T')[0]}\n`;

  return markdown;
}

async function regenerateGraph() {
  try {
    const scriptPath = path.join(ROOT_DIR, 'scripts', 'build-mortgage-graph.py');
    const { stdout, stderr } = await execAsync(`python "${scriptPath}"`);
    log('  [GRAPH] Auto-regenerated successfully', 'green');
    if (stdout) log(`  ${stdout.trim()}`, 'cyan');
    return { success: true, output: stdout };
  } catch (error) {
    log(`  [ERROR] Graph regeneration failed: ${error.message}`, 'yellow');
    return { success: false, error: error.message };
  }
}

// ============================================================================
// Neo4j Graph Query Functions
// ============================================================================

async function queryNeo4jGraph() {
  if (!neo4jDriver) {
    throw new Error('Neo4j driver not initialized');
  }

  const session = neo4jDriver.session();
  try {
    // Query all nodes and relationships
    const result = await session.run(`
      MATCH (n)
      OPTIONAL MATCH (n)-[r]->(m)
      RETURN n, r, m
      LIMIT 500
    `);

    const nodes = new Map();
    const edges = [];

    // Process results
    result.records.forEach(record => {
      const sourceNode = record.get('n');
      const relationship = record.get('r');
      const targetNode = record.get('m');

      // Add source node
      if (sourceNode) {
        const nodeId = sourceNode.identity.toString();
        if (!nodes.has(nodeId)) {
          const labels = sourceNode.labels;
          const props = sourceNode.properties;

          nodes.set(nodeId, {
            id: nodeId,
            type: labels[0]?.toLowerCase() || 'node',
            title: props.title || props.name || props.id || nodeId,
            version: props.version,
            status: props.status,
            owner: props.owner,
            department: props.department,
            category: props.category,
            criticality: props.criticality,
            complianceFrameworks: props.compliance_frameworks || props.complianceFrameworks || [],
            tags: props.tags || []
          });
        }
      }

      // Add target node and relationship
      if (targetNode && relationship) {
        const targetId = targetNode.identity.toString();
        if (!nodes.has(targetId)) {
          const labels = targetNode.labels;
          const props = targetNode.properties;

          nodes.set(targetId, {
            id: targetId,
            type: labels[0]?.toLowerCase() || 'node',
            title: props.title || props.name || props.id || targetId,
            version: props.version,
            status: props.status,
            owner: props.owner,
            department: props.department,
            category: props.category,
            criticality: props.criticality,
            complianceFrameworks: props.compliance_frameworks || props.complianceFrameworks || [],
            tags: props.tags || []
          });
        }

        // Add edge
        const sourceId = sourceNode.identity.toString();
        const edgeId = relationship.identity.toString();
        const relType = relationship.type;
        const relProps = relationship.properties;

        edges.push({
          id: edgeId,
          source: sourceId,
          target: targetId,
          type: relType.toLowerCase().replace(/_/g, '-'),
          description: relProps.description || relType,
          strength: relProps.strength || 'normal'
        });
      }
    });

    // Convert to Cytoscape format
    return {
      metadata: {
        version: '3.0.0',
        lastUpdated: new Date().toISOString(),
        description: 'Live graph data from Neo4j',
        nodeCount: nodes.size,
        edgeCount: edges.length,
        source: 'neo4j'
      },
      nodes: Object.fromEntries(nodes),
      edges: edges
    };

  } finally {
    await session.close();
  }
}

// ============================================================================
// API Handlers
// ============================================================================

async function handleAPIRequest(req, res, pathname) {
  // Parse request body for POST requests
  let body = '';
  if (req.method === 'POST') {
    for await (const chunk of req) {
      body += chunk.toString();
    }
  }

  // Route API requests
  if (pathname === '/api/assistant/query' && req.method === 'POST') {
    return handleAssistantQuery(req, res, JSON.parse(body));
  }

  if (pathname === '/api/assistant/health' && req.method === 'GET') {
    return handleAssistantHealth(req, res);
  }

  if (pathname === '/api/assistant/stats' && req.method === 'GET') {
    return handleAssistantStats(req, res);
  }

  if (pathname === '/api/sops/metrics' && req.method === 'GET') {
    return handleSOPMetrics(req, res);
  }

  if (pathname === '/api/sops/quality' && req.method === 'GET') {
    return handleSOPQuality(req, res);
  }

  if (pathname === '/api/sops/create' && req.method === 'POST') {
    return handleSOPCreate(req, res, JSON.parse(body));
  }

  if (pathname === '/api/graph/neo4j' && req.method === 'GET') {
    return handleNeo4jGraph(req, res);
  }

  // 404 for unknown API endpoints
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'API endpoint not found' }));
}

async function handleAssistantQuery(req, res, body) {
  try {
    const { query, topK = 5 } = body;

    if (!query) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Query is required' }));
      return;
    }

    log(`  [API] Assistant query: "${query}"`, 'magenta');

    const startTime = Date.now();
    const queryEmbedding = await vectorDB.embedQuery(query);
    const results = await vectorDB.search(queryEmbedding, topK);

    const answer = generateAnswer(query, results);
    const processingTime = (Date.now() - startTime) / 1000;

    const response = {
      query,
      answer: answer.text,
      confidence: results[0]?.score || 0,
      sources: results.map(r => ({
        sopId: r.sopId,
        title: r.title,
        section: r.section,
        relevance: Math.round(r.score * 100)
      })),
      metadata: {
        retrievalCount: results.length,
        processingTime: processingTime.toFixed(2),
        model: 'mock-rag-demo',
        timestamp: new Date().toISOString()
      }
    };

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(response));

  } catch (error) {
    log(`  [ERROR] ${error.message}`, 'yellow');
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
}

async function handleAssistantHealth(req, res) {
  const health = {
    status: 'operational',
    services: {
      vectorDB: 'mock',
      llm: 'mock',
      embeddings: 'mock'
    },
    stats: {
      totalEmbeddings: vectorDB.embeddings.length,
      avgResponseTime: '1.2s'
    },
    timestamp: new Date().toISOString()
  };

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(health));
}

async function handleAssistantStats(req, res) {
  const stats = {
    queries: {
      total: 456,
      today: 23,
      thisWeek: 134
    },
    avgConfidence: 0.847,
    topQueries: [
      { query: 'FHA credit requirements', count: 78 },
      { query: 'wire transfer limits', count: 67 },
      { query: 'clear to close checklist', count: 54 }
    ],
    userSatisfaction: 0.892,
    timestamp: new Date().toISOString()
  };

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(stats));
}

async function handleSOPMetrics(req, res) {
  const metrics = {
    totalSOPs: 6,
    activeSOPs: 6,
    draftSOPs: 0,
    archivedSOPs: 0,
    byDepartment: {
      'Mortgage Finance': 6,
      'Compliance': 0,
      'IT': 0
    },
    byCategory: {
      'Underwriting': 2,
      'Processing': 1,
      'Quality Control': 1,
      'Security': 1,
      'General': 1
    },
    totalLines: 4247,
    totalWords: 47891,
    avgReadingTime: 18.5, // minutes
    lastUpdated: '2025-11-16T14:30:00Z'
  };

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(metrics));
}

async function handleSOPQuality(req, res) {
  const quality = {
    overallScore: 92.5,
    metrics: {
      clarity: {
        score: 88,
        readabilityAvg: 72.3, // Flesch Reading Ease
        passiveVoicePercent: 8.2
      },
      completeness: {
        score: 95,
        sectionsComplete: 94.7,
        missingPrerequisites: 2
      },
      accuracy: {
        score: 98,
        brokenLinks: 0,
        oudatedReferences: 1
      },
      compliance: {
        score: 97,
        frameworksCovered: 8,
        auditReadiness: 96
      },
      currency: {
        score: 85,
        avgDaysSinceUpdate: 45,
        sopsPast90Days: 2
      }
    },
    recentIssues: [
      {
        sopId: 'sop-mf-002',
        issue: 'Readability score below target',
        severity: 'low',
        reported: '2025-11-15'
      }
    ],
    topPerformers: [
      { sopId: 'sop-mf-005', title: 'Wire Transfer Security', score: 98 },
      { sopId: 'sop-mf-004', title: 'Clear to Close', score: 96 }
    ],
    timestamp: new Date().toISOString()
  };

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(quality));
}

async function handleSOPCreate(req, res, body) {
  try {
    log('  [API] Creating new SOP...', 'magenta');

    // Validate required fields
    const requiredFields = ['title', 'department', 'owner', 'maintainer', 'approver'];
    for (const field of requiredFields) {
      if (!body[field] || !body[field].trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Missing required field: ${field}` }));
        return;
      }
    }

    // Get next SOP ID
    const sopId = await getNextSOPId();
    const sopIdFormatted = String(sopId).padStart(3, '0');

    // Generate markdown content
    const markdown = generateMarkdownFromFormData(body, sopId);

    // Create filename
    const filename = `sop-mf-${sopIdFormatted}-${body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.md`;
    const filepath = path.join(ROOT_DIR, 'sops', 'mortgage', filename);

    // Write file
    await fs.writeFile(filepath, markdown, 'utf8');
    log(`  [SOP] Created: ${filename}`, 'green');

    // Regenerate graph
    const graphResult = await regenerateGraph();

    const response = {
      success: true,
      sop: {
        id: `sop-mf-${sopIdFormatted}`,
        filename: filename,
        path: `/sops/mortgage/${filename}`,
        title: body.title
      },
      graph: graphResult,
      message: 'SOP created successfully and graph regenerated'
    };

    res.writeHead(201, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(response));

    log(`  [SUCCESS] SOP created: sop-mf-${sopIdFormatted}`, 'green');

  } catch (error) {
    log(`  [ERROR] ${error.message}`, 'yellow');
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message, stack: error.stack }));
  }
}

async function handleNeo4jGraph(req, res) {
  try {
    log('  [API] Fetching graph from Neo4j...', 'magenta');

    if (!neo4jDriver) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Neo4j not available',
        message: 'Neo4j connection not initialized. Check NEO4J_PASSWORD environment variable.'
      }));
      return;
    }

    const graphData = await queryNeo4jGraph();

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(graphData));

    log(`  [SUCCESS] Returned ${graphData.metadata.nodeCount} nodes, ${graphData.metadata.edgeCount} edges`, 'green');

  } catch (error) {
    log(`  [ERROR] Neo4j query failed: ${error.message}`, 'yellow');
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Failed to query Neo4j',
      message: error.message
    }));
  }
}

function generateAnswer(query, results) {
  if (results.length === 0) {
    return {
      text: "I couldn't find specific information about that in our SOPs. Please try rephrasing your question or contact your department manager."
    };
  }

  const primary = results[0];
  const queryLower = query.toLowerCase();

  let template = `According to **${primary.title}** (${primary.section}):\n\n${primary.content}\n\n`;
  template += `**Reference:** ${primary.sopId}\n`;
  template += `**Department:** ${primary.metadata.department}\n`;
  template += `**Compliance:** ${primary.metadata.complianceFrameworks.join(', ')}\n`;
  template += `**Last Updated:** ${primary.metadata.lastUpdated}`;

  if (results.length > 1) {
    template += `\n\n**Related SOPs:**\n`;
    results.slice(1, 3).forEach(r => {
      template += `• ${r.title} (${r.sopId})\n`;
    });
  }

  return { text: template };
}

// ============================================================================
// Static File Server
// ============================================================================

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.md': 'text/markdown',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function handleStaticFile(req, res, pathname) {
  const filePath = path.join(ROOT_DIR, pathname.substring(1));

  try {
    const realPath = await fs.realpath(filePath);
    if (!realPath.startsWith(ROOT_DIR)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const data = await fs.readFile(realPath);
    const ext = path.extname(realPath);
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  } catch (error) {
    res.writeHead(404);
    res.end('Not Found');
  }
}

// ============================================================================
// Main Request Handler
// ============================================================================

async function handleRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Log request
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  log(`[${timestamp}] ${req.method} ${pathname}`, 'cyan');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // Route API requests
  if (pathname.startsWith('/api/')) {
    return handleAPIRequest(req, res, pathname);
  }

  // Redirect root to dashboard
  if (pathname === '/' || pathname === '/index.html') {
    res.writeHead(302, { 'Location': '/public/index.html' });
    res.end();
    return;
  }

  // Serve static files
  return handleStaticFile(req, res, pathname);
}

// ============================================================================
// Server Startup
// ============================================================================

function startServer(port) {
  const server = http.createServer(handleRequest);

  server.listen(port, () => {
    log('╔═══════════════════════════════════════════════════════════╗', 'bright');
    log('║   🏦 Pursuit Bank SOP Management System                  ║', 'bright');
    log('║   Production-Ready Demo Server                           ║', 'bright');
    log('╚═══════════════════════════════════════════════════════════╝\n', 'bright');

    log(`🌐 Server:        http://localhost:${port}`, 'green');
    log(`🏠 Dashboard:     http://localhost:${port}/public/index.html`, 'green');
    log(`📋 Workspace:     http://localhost:${port}/public/workspace.html`, 'green');
    log(`🕸️  Graph Viewer:  http://localhost:${port}/public/graph.html`, 'green');
    log(`📚 Browse SOPs:   http://localhost:${port}/public/sops.html`, 'green');
    log(`📖 Documentation: http://localhost:${port}/public/docs.html`, 'green');
    log(`🔍 Search:        http://localhost:${port}/public/search.html`, 'green');
    log(`➕ Contribute:    http://localhost:${port}/public/contribute.html`, 'green');
    log(`❓ Help & Guide:  http://localhost:${port}/public/help.html\n`, 'green');

    log('🔌 API Endpoints:', 'blue');
    log('   POST /api/assistant/query     - RAG-powered SOP queries', 'cyan');
    log('   GET  /api/assistant/health    - Service health check', 'cyan');
    log('   GET  /api/assistant/stats     - Usage statistics', 'cyan');
    log('   GET  /api/sops/metrics        - SOP metrics dashboard', 'cyan');
    log('   GET  /api/sops/quality        - Quality analytics', 'cyan');
    log('   POST /api/sops/create         - Create new SOP\n', 'cyan');

    log(`📂 Serving from:  ${ROOT_DIR}`, 'blue');

    // Setup file watcher for auto-graph regeneration
    const sopsDir = path.join(ROOT_DIR, 'sops', 'mortgage');
    let regenerateTimeout;

    fsSync.watch(sopsDir, (eventType, filename) => {
      if (filename && filename.endsWith('.md')) {
        // Debounce: wait 1 second after last change
        clearTimeout(regenerateTimeout);
        regenerateTimeout = setTimeout(async () => {
          log(`  [WATCH] Detected change: ${filename}`, 'cyan');
          await regenerateGraph();
        }, 1000);
      }
    });

    log('👁️  File watcher:  Monitoring sops/mortgage/ for changes\n', 'blue');
    log('\n⏹  Press Ctrl+C to stop\n', 'yellow');
    log('═══════════════════════════════════════════════════════════\n', 'bright');
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      log(`✗ Port ${port} is already in use`, 'yellow');
      process.exit(1);
    } else {
      log(`✗ Server error: ${error.message}`, 'yellow');
      process.exit(1);
    }
  });
}

// CLI execution
const main = () => {
  const args = process.argv.slice(2);
  const portArg = args.find(arg => arg.startsWith('--port='));
  const port = portArg ? parseInt(portArg.split('=')[1]) : 8080;

  startServer(port);
};

main();
