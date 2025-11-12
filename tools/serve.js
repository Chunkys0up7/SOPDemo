#!/usr/bin/env node

/**
 * Simple HTTP Server for viewing SOP visualizations
 *
 * Serves the dist directory and provides a simple interface
 * for viewing generated SOPs and visualizations
 *
 * Usage: node tools/serve.js [--port=8080]
 */

import http from 'http';
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
  cyan: '\x1b[36m',
  yellow: '\x1b[33m'
};

function log(message, color = 'reset') {
  const colorCode = colors[color] || colors.reset;
  console.log(`${colorCode}${message}${colors.reset}`);
}

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

async function generateIndexPage() {
  // Read available files
  const distDir = path.join(ROOT_DIR, 'dist');
  let sops = [];
  let visualizations = [];

  try {
    const sopDir = path.join(distDir, 'sops');
    if (await fileExists(sopDir)) {
      const files = await fs.readdir(sopDir);
      sops = files.filter(f => f.endsWith('.md'));
    }
  } catch (e) {
    // Directory doesn't exist yet
  }

  try {
    const vizDir = path.join(distDir, 'visualizations');
    if (await fileExists(vizDir)) {
      const files = await fs.readdir(vizDir);
      visualizations = files;
    }
  } catch (e) {
    // Directory doesn't exist yet
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SOP Ecosystem - Documentation Server</title>
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
      padding: 40px 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      margin-bottom: 30px;
      text-align: center;
    }

    h1 {
      color: #2d3748;
      margin-bottom: 10px;
      font-size: 36px;
    }

    .subtitle {
      color: #718096;
      font-size: 16px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .card h2 {
      color: #2d3748;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .file-list {
      list-style: none;
    }

    .file-list li {
      padding: 12px;
      margin: 8px 0;
      background: #f7fafc;
      border-radius: 5px;
      transition: all 0.2s;
    }

    .file-list li:hover {
      background: #e2e8f0;
      transform: translateX(5px);
    }

    .file-list a {
      color: #4299e1;
      text-decoration: none;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .file-list a:hover {
      color: #2b6cb0;
    }

    .icon {
      font-size: 20px;
    }

    .actions {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .actions h2 {
      color: #2d3748;
      margin-bottom: 20px;
    }

    .button-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .button {
      display: inline-block;
      padding: 15px 20px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      font-weight: 600;
      transition: all 0.2s;
    }

    .button:hover {
      background: #5568d3;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #718096;
    }

    .empty-state-icon {
      font-size: 48px;
      margin-bottom: 10px;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }

    .stat {
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
      <h1>🔷 SOP Ecosystem</h1>
      <p class="subtitle">Modular Documentation Management System</p>
    </header>

    <div class="stats">
      <div class="stat">
        <div class="stat-value">${sops.length}</div>
        <div class="stat-label">Built SOPs</div>
      </div>
      <div class="stat">
        <div class="stat-value">${visualizations.length}</div>
        <div class="stat-label">Visualizations</div>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <h2><span class="icon">📄</span> Standard Operating Procedures</h2>
        ${sops.length > 0 ? `
          <ul class="file-list">
            ${sops.map(sop => `
              <li>
                <a href="/dist/sops/${sop}">
                  <span class="icon">📋</span>
                  ${sop}
                </a>
              </li>
            `).join('')}
          </ul>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <p>No built SOPs yet.</p>
            <p>Run <code>npm run build</code> to generate SOPs.</p>
          </div>
        `}
      </div>

      <div class="card">
        <h2><span class="icon">🎨</span> Visualizations</h2>
        ${visualizations.length > 0 ? `
          <ul class="file-list">
            ${visualizations.map(viz => `
              <li>
                <a href="/dist/visualizations/${viz}">
                  <span class="icon">${viz.endsWith('.html') ? '🌐' : '📊'}</span>
                  ${viz}
                </a>
              </li>
            `).join('')}
          </ul>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">🎨</div>
            <p>No visualizations yet.</p>
            <p>Run <code>npm run visualize</code> to generate visualizations.</p>
          </div>
        `}
      </div>
    </div>

    <div class="actions">
      <h2>🚀 Quick Actions</h2>
      <div class="button-grid">
        <a href="/dist/visualizations/sop-graph.html" class="button">📊 Interactive Graph</a>
        <a href="/graph/sop-graph.json" class="button">🗂️ Raw Graph Data</a>
        <a href="/dist/build-report.json" class="button">📈 Build Report</a>
        <a href="/dist/validation-report.json" class="button">✅ Validation Report</a>
      </div>
    </div>
  </div>

  <script>
    // Auto-refresh every 5 seconds
    setTimeout(() => location.reload(), 5000);
  </script>
</body>
</html>`;
}

async function handleRequest(req, res) {
  const url = req.url === '/' ? '/index.html' : req.url;

  log(`${req.method} ${url}`, 'cyan');

  // Generate index page dynamically
  if (url === '/index.html' || url === '/') {
    const html = await generateIndexPage();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Serve files from project root
  const filePath = path.join(ROOT_DIR, url.substring(1));

  try {
    // Security check - ensure file is within project directory
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

function startServer(port) {
  const server = http.createServer(handleRequest);

  server.listen(port, () => {
    log('═══════════════════════════════════════════════', 'bright');
    log('     SOP Documentation Server', 'bright');
    log('═══════════════════════════════════════════════\n', 'bright');
    log(`🌐 Server running at: http://localhost:${port}`, 'green');
    log(`📂 Serving from: ${ROOT_DIR}`, 'blue');
    log('\nPress Ctrl+C to stop\n', 'yellow');
    log('═══════════════════════════════════════════════\n', 'bright');
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      log(`✗ Port ${port} is already in use`, 'red');
      process.exit(1);
    } else {
      log(`✗ Server error: ${error.message}`, 'red');
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
