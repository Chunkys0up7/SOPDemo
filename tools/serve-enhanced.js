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
import path from 'path';
import { fileURLToPath } from 'url';
import { URL } from 'url';

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
    res.writeHead(302, { 'Location': '/public/dashboard.html' });
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
    log(`📊 Dashboard:     http://localhost:${port}/public/dashboard.html`, 'green');
    log(`🤖 AI Assistant:  http://localhost:${port}/public/sop-assistant.html`, 'green');
    log(`📋 Templates:     http://localhost:${port}/public/templates.html`, 'green');
    log(`🔷 Graph:         http://localhost:${port}/dist/visualizations/sop-graph.html\n`, 'green');

    log('🔌 API Endpoints:', 'blue');
    log('   POST /api/assistant/query     - RAG-powered SOP queries', 'cyan');
    log('   GET  /api/assistant/health    - Service health check', 'cyan');
    log('   GET  /api/assistant/stats     - Usage statistics', 'cyan');
    log('   GET  /api/sops/metrics        - SOP metrics dashboard', 'cyan');
    log('   GET  /api/sops/quality        - Quality analytics\n', 'cyan');

    log(`📂 Serving from:  ${ROOT_DIR}`, 'blue');
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
