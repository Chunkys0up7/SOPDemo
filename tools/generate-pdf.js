#!/usr/bin/env node

/**
 * PDF Export Automation for SOPs
 *
 * Generates branded PDF versions of all SOPs for:
 * - Printable compliance copies
 * - Archive-ready format
 * - Offline distribution
 */

import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m'
};

function log(message, color = 'reset') {
  const colorCode = colors[color] || colors.reset;
  console.log(`${colorCode}${message}${colors.reset}`);
}

/**
 * Extract frontmatter and content from markdown file
 */
function parseSOP(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    throw new Error('Invalid SOP format - no frontmatter found');
  }

  const frontmatter = yaml.load(frontmatterMatch[1]);
  const markdown = frontmatterMatch[2];

  return { frontmatter, markdown };
}

/**
 * Generate HTML for PDF with Pursuit Bank branding
 */
function generateHTML(frontmatter, markdownContent) {
  const html = marked.parse(markdownContent);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${frontmatter.title} - Pursuit Bank</title>
  <style>
    @page {
      size: Letter;
      margin: 0.75in 0.75in 1in 0.75in;
    }

    @page :first {
      margin-top: 0.5in;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #2d3748;
    }

    /* Header */
    .pdf-header {
      border-bottom: 3px solid #0052CC;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }

    .pdf-logo {
      color: #0052CC;
      font-size: 24pt;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 5px;
    }

    .pdf-subtitle {
      color: #718096;
      font-size: 10pt;
    }

    .pdf-title {
      font-size: 22pt;
      font-weight: 600;
      color: #1a1a1a;
      margin: 20px 0 10px 0;
    }

    .pdf-metadata {
      background: #f7fafc;
      padding: 15px;
      border-left: 4px solid #0052CC;
      margin: 20px 0;
      font-size: 9pt;
    }

    .pdf-metadata-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .pdf-metadata-item {
      padding: 5px 0;
    }

    .pdf-metadata-label {
      color: #718096;
      text-transform: uppercase;
      font-size: 8pt;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .pdf-metadata-value {
      color: #2d3748;
      font-weight: 500;
    }

    /* Content */
    h1 {
      color: #0052CC;
      font-size: 18pt;
      border-bottom: 2px solid #0052CC;
      padding-bottom: 8px;
      margin: 30px 0 15px 0;
      page-break-after: avoid;
    }

    h2 {
      color: #003d99;
      font-size: 14pt;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin: 25px 0 12px 0;
      page-break-after: avoid;
    }

    h3 {
      color: #2d3748;
      font-size: 12pt;
      font-weight: 600;
      margin: 20px 0 10px 0;
      page-break-after: avoid;
    }

    h4 {
      color: #4a5568;
      font-size: 11pt;
      font-weight: 600;
      margin: 15px 0 8px 0;
    }

    p {
      margin: 0 0 12px 0;
      orphans: 3;
      widows: 3;
    }

    /* Lists */
    ul, ol {
      margin: 0 0 12px 20px;
    }

    li {
      margin: 4px 0;
    }

    /* Tables */
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 15px 0;
      font-size: 10pt;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #cbd5e0;
      padding: 8px 10px;
      text-align: left;
    }

    th {
      background: #f7fafc;
      font-weight: 600;
      color: #2d3748;
    }

    tr:nth-child(even) {
      background: #f7fafc;
    }

    /* Code */
    code {
      background: #f7fafc;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', Consolas, monospace;
      font-size: 9.5pt;
      color: #e53e3e;
    }

    pre {
      background: #2d3748;
      color: #e2e8f0;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 15px 0;
      font-size: 9pt;
      line-height: 1.5;
      page-break-inside: avoid;
    }

    pre code {
      background: none;
      color: inherit;
      padding: 0;
    }

    /* Blockquotes */
    blockquote {
      border-left: 4px solid #0052CC;
      padding-left: 15px;
      margin: 15px 0;
      color: #4a5568;
      font-style: italic;
    }

    /* Links */
    a {
      color: #0052CC;
      text-decoration: none;
    }

    /* Footer */
    .pdf-footer {
      position: fixed;
      bottom: 0.5in;
      left: 0.75in;
      right: 0.75in;
      font-size: 8pt;
      color: #718096;
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
    }

    .pdf-footer-left {
      text-align: left;
    }

    .pdf-footer-center {
      text-align: center;
      font-weight: 600;
      color: #e53e3e;
    }

    .pdf-footer-right {
      text-align: right;
    }

    /* Page breaks */
    .page-break {
      page-break-after: always;
    }

    /* Watermark */
    .pdf-watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 72pt;
      color: rgba(0, 82, 204, 0.05);
      font-weight: 700;
      pointer-events: none;
      z-index: -1;
    }
  </style>
</head>
<body>
  <!-- Watermark -->
  <div class="pdf-watermark">PURSUIT BANK</div>

  <!-- Header -->
  <div class="pdf-header">
    <div class="pdf-logo">Pursuit Bank</div>
    <div class="pdf-subtitle">Standard Operating Procedure</div>
    <div class="pdf-title">${frontmatter.title}</div>
  </div>

  <!-- Metadata -->
  <div class="pdf-metadata">
    <div class="pdf-metadata-grid">
      <div class="pdf-metadata-item">
        <div class="pdf-metadata-label">SOP ID</div>
        <div class="pdf-metadata-value">${frontmatter.id}</div>
      </div>
      <div class="pdf-metadata-item">
        <div class="pdf-metadata-label">Version</div>
        <div class="pdf-metadata-value">${frontmatter.version}</div>
      </div>
      <div class="pdf-metadata-item">
        <div class="pdf-metadata-label">Status</div>
        <div class="pdf-metadata-value">${frontmatter.status}</div>
      </div>
      <div class="pdf-metadata-item">
        <div class="pdf-metadata-label">Department</div>
        <div class="pdf-metadata-value">${frontmatter.department}</div>
      </div>
      <div class="pdf-metadata-item">
        <div class="pdf-metadata-label">Owner</div>
        <div class="pdf-metadata-value">${frontmatter.owner}</div>
      </div>
      <div class="pdf-metadata-item">
        <div class="pdf-metadata-label">Effective Date</div>
        <div class="pdf-metadata-value">${frontmatter.effectiveDate}</div>
      </div>
    </div>
    ${frontmatter.complianceFrameworks ? `
      <div class="pdf-metadata-item" style="margin-top: 10px;">
        <div class="pdf-metadata-label">Compliance Frameworks</div>
        <div class="pdf-metadata-value">${frontmatter.complianceFrameworks.join(', ')}</div>
      </div>
    ` : ''}
  </div>

  <!-- Content -->
  <div class="pdf-content">
    ${html}
  </div>

  <!-- Footer -->
  <div class="pdf-footer">
    <div class="pdf-footer-left">
      ${frontmatter.id} v${frontmatter.version}
    </div>
    <div class="pdf-footer-center">
      CONFIDENTIAL - INTERNAL USE ONLY
    </div>
    <div class="pdf-footer-right">
      Pursuit Bank SOP System
    </div>
  </div>
</body>
</html>
`;
}

/**
 * Generate all SOP PDFs
 */
async function generateAllPDFs() {
  log('\n╔═══════════════════════════════════════════════════════════╗', 'blue');
  log('║   📄 PDF Export Automation - Pursuit Bank SOPs           ║', 'blue');
  log('╚═══════════════════════════════════════════════════════════╝\n', 'blue');

  const sopPattern = path.join(ROOT_DIR, 'sops/**/*.md');
  const sopFiles = glob.sync(sopPattern);

  log(`Found ${sopFiles.length} SOP files`, 'blue');

  const outputDir = path.join(ROOT_DIR, 'dist/pdfs');
  await fs.mkdir(outputDir, { recursive: true });

  let successCount = 0;
  let errorCount = 0;

  for (const sopFile of sopFiles) {
    try {
      const content = await fs.readFile(sopFile, 'utf8');
      const { frontmatter, markdown } = parseSOP(content);

      const html = generateHTML(frontmatter, markdown);

      const basename = path.basename(sopFile, '.md');
      const htmlPath = path.join(outputDir, `${basename}.html`);

      await fs.writeFile(htmlPath, html);

      log(`✓ Generated ${basename}.html`, 'green');
      successCount++;

    } catch (error) {
      log(`✗ Error processing ${path.basename(sopFile)}: ${error.message}`, 'yellow');
      errorCount++;
    }
  }

  log(`\n╔═══════════════════════════════════════════════════════════╗`, 'green');
  log(`║   Summary                                                 ║`, 'green');
  log(`╚═══════════════════════════════════════════════════════════╝\n`, 'green');
  log(`  ✓ Success: ${successCount}`, 'green');
  if (errorCount > 0) {
    log(`  ✗ Errors:  ${errorCount}`, 'yellow');
  }
  log(`  📁 Output: ${outputDir}\n`, 'blue');

  log(`\n📝 Note: HTML files generated. To convert to PDF:`, 'blue');
  log(`  1. Open HTML in Chrome/Edge`, 'blue');
  log(`  2. Print to PDF (Ctrl+P)`, 'blue');
  log(`  3. Or use: npx puppeteer print <file>.html <file>.pdf\n`, 'blue');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllPDFs().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { generateAllPDFs, generateHTML, parseSOP };
