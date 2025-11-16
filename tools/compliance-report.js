#!/usr/bin/env node

/**
 * Compliance Tracking System
 *
 * Generates comprehensive compliance reports including:
 * - SOPs by compliance framework
 * - Upcoming review dates
 * - Overdue reviews
 * - Regulatory coverage gaps
 */

import fs from 'fs/promises';
import yaml from 'js-yaml';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  const colorCode = colors[color] || colors.reset;
  console.log(`${colorCode}${message}${colors.reset}`);
}

/**
 * Parse SOP frontmatter
 */
async function parseSOPFrontmatter(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontmatterMatch) {
    return null;
  }

  return yaml.load(frontmatterMatch[1]);
}

/**
 * Generate comprehensive compliance report
 */
async function generateComplianceReport() {
  log('\n╔═══════════════════════════════════════════════════════════╗', 'blue');
  log('║   ⚖️ Compliance Tracking System - Pursuit Bank            ║', 'blue');
  log('╚═══════════════════════════════════════════════════════════╝\n', 'blue');

  const sopPattern = path.join(ROOT_DIR, 'sops/**/*.md');
  const sopFiles = glob.sync(sopPattern);

  log(`Analyzing ${sopFiles.length} SOP files...\n`, 'blue');

  const report = {
    totalSOPs: sopFiles.length,
    byFramework: {},
    byDepartment: {},
    upcomingReviews: [],
    overdueReviews: [],
    reviewDueSoon: [],
    complianceCoverage: {},
    timestamp: new Date().toISOString()
  };

  for (const file of sopFiles) {
    try {
      const frontmatter = await parseSOPFrontmatter(file);

      if (!frontmatter) continue;

      // Track by department
      const dept = frontmatter.department || 'Unknown';
      report.byDepartment[dept] = report.byDepartment[dept] || [];
      report.byDepartment[dept].push({
        id: frontmatter.id,
        title: frontmatter.title,
        version: frontmatter.version,
        status: frontmatter.status
      });

      // Track compliance frameworks
      if (frontmatter.complianceFrameworks && Array.isArray(frontmatter.complianceFrameworks)) {
        for (const framework of frontmatter.complianceFrameworks) {
          report.byFramework[framework] = report.byFramework[framework] || [];
          report.byFramework[framework].push({
            id: frontmatter.id,
            title: frontmatter.title,
            version: frontmatter.version,
            department: frontmatter.department,
            lastReviewed: frontmatter.lastReviewed || frontmatter.effectiveDate,
            owner: frontmatter.owner
          });
        }
      }

      // Check review dates
      if (frontmatter.nextReview) {
        const nextReview = new Date(frontmatter.nextReview);
        const today = new Date();
        const daysUntilReview = Math.floor((nextReview - today) / (1000 * 60 * 60 * 24));

        const reviewItem = {
          id: frontmatter.id,
          title: frontmatter.title,
          department: frontmatter.department,
          nextReview: frontmatter.nextReview,
          owner: frontmatter.owner,
          daysUntilReview: Math.abs(daysUntilReview)
        };

        if (daysUntilReview < 0) {
          report.overdueReviews.push({
            ...reviewItem,
            daysOverdue: Math.abs(daysUntilReview)
          });
        } else if (daysUntilReview <= 30) {
          report.reviewDueSoon.push(reviewItem);
        } else if (daysUntilReview <= 90) {
          report.upcomingReviews.push(reviewItem);
        }
      }

    } catch (error) {
      log(`⚠️ Error processing ${path.basename(file)}: ${error.message}`, 'yellow');
    }
  }

  // Calculate compliance coverage
  const frameworkCount = Object.keys(report.byFramework).length;
  report.complianceCoverage = {
    totalFrameworks: frameworkCount,
    averageSOPsPerFramework: frameworkCount > 0
      ? Math.round(report.totalSOPs / frameworkCount * 10) / 10
      : 0,
    mostCoveredFramework: null,
    leastCoveredFramework: null
  };

  if (frameworkCount > 0) {
    const frameworkCounts = Object.entries(report.byFramework)
      .map(([name, sops]) => ({ name, count: sops.length }))
      .sort((a, b) => b.count - a.count);

    report.complianceCoverage.mostCoveredFramework = frameworkCounts[0];
    report.complianceCoverage.leastCoveredFramework = frameworkCounts[frameworkCounts.length - 1];
  }

  // Sort review lists
  report.overdueReviews.sort((a, b) => b.daysOverdue - a.daysOverdue);
  report.reviewDueSoon.sort((a, b) => a.daysUntilReview - b.daysUntilReview);

  // Generate HTML report
  const html = generateHTMLReport(report);
  const outputPath = path.join(ROOT_DIR, 'dist/compliance-report.html');
  await fs.mkdir(path.join(ROOT_DIR, 'dist'), { recursive: true });
  await fs.writeFile(outputPath, html);

  // Save JSON version
  const jsonPath = path.join(ROOT_DIR, 'dist/compliance-report.json');
  await fs.writeFile(jsonPath, JSON.stringify(report, null, 2));

  // Print summary
  printSummary(report);

  log(`\n✓ Reports generated:`, 'green');
  log(`  📄 HTML: ${outputPath}`, 'green');
  log(`  📊 JSON: ${jsonPath}\n`, 'green');
}

/**
 * Print compliance summary to console
 */
function printSummary(report) {
  log('\n╔═══════════════════════════════════════════════════════════╗', 'green');
  log('║   Compliance Summary                                      ║', 'green');
  log('╚═══════════════════════════════════════════════════════════╝\n', 'green');

  log(`Total SOPs: ${report.totalSOPs}`, 'blue');
  log(`Compliance Frameworks: ${Object.keys(report.byFramework).length}`, 'blue');
  log(`Departments: ${Object.keys(report.byDepartment).length}\n`, 'blue');

  if (report.overdueReviews.length > 0) {
    log(`❌ OVERDUE REVIEWS: ${report.overdueReviews.length}`, 'red');
    report.overdueReviews.slice(0, 5).forEach(sop => {
      log(`   • ${sop.id} - ${sop.daysOverdue} days overdue`, 'red');
    });
    log('');
  }

  if (report.reviewDueSoon.length > 0) {
    log(`⚠️ REVIEWS DUE SOON (30 days): ${report.reviewDueSoon.length}`, 'yellow');
    report.reviewDueSoon.slice(0, 5).forEach(sop => {
      log(`   • ${sop.id} - Due in ${sop.daysUntilReview} days`, 'yellow');
    });
    log('');
  }

  if (report.upcomingReviews.length > 0) {
    log(`📅 Upcoming Reviews (30-90 days): ${report.upcomingReviews.length}`, 'blue');
  }

  log('\n📊 Top Compliance Frameworks:', 'blue');
  Object.entries(report.byFramework)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5)
    .forEach(([framework, sops]) => {
      log(`   • ${framework}: ${sops.length} SOPs`, 'blue');
    });
}

/**
 * Generate HTML compliance report
 */
function generateHTMLReport(report) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compliance Report - Pursuit Bank</title>
  <link rel="stylesheet" href="/public/assets/branding/pursuit-brand.css">
  <style>
    :root {
      --primary-color: #0052CC;
      --danger-color: #f56565;
      --warning-color: #ed8936;
      --success-color: #48bb78;
    }

    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f7fafc;
      margin: 0;
      padding: 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      background: linear-gradient(135deg, var(--primary-color) 0%, #003d99 100%);
      color: white;
      padding: 40px;
      border-radius: 12px;
      margin-bottom: 30px;
    }

    .header h1 {
      margin: 0 0 10px 0;
      font-size: 32px;
    }

    .header p {
      margin: 0;
      opacity: 0.9;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .summary-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .summary-value {
      font-size: 36px;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 8px;
    }

    .summary-label {
      font-size: 13px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .section {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .section-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #1a1a1a;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 10px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #f7fafc;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #666;
    }

    tr:hover {
      background: #f7fafc;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
    }

    .badge-danger {
      background: #fed7d7;
      color: #c53030;
    }

    .badge-warning {
      background: #feebc8;
      color: #c05621;
    }

    .badge-success {
      background: #c6f6d5;
      color: #22543d;
    }

    .badge-info {
      background: #bee3f8;
      color: #2c5282;
    }

    .framework-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }

    .framework-item {
      background: #f7fafc;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid var(--primary-color);
    }

    .framework-name {
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    .framework-count {
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚖️ Compliance Tracking Report</h1>
      <p>Generated: ${new Date(report.timestamp).toLocaleString()}</p>
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-value">${report.totalSOPs}</div>
        <div class="summary-label">Total SOPs</div>
      </div>
      <div class="summary-card">
        <div class="summary-value">${Object.keys(report.byFramework).length}</div>
        <div class="summary-label">Compliance Frameworks</div>
      </div>
      <div class="summary-card">
        <div class="summary-value" style="color: ${report.overdueReviews.length > 0 ? 'var(--danger-color)' : 'var(--success-color)'}">
          ${report.overdueReviews.length}
        </div>
        <div class="summary-label">Overdue Reviews</div>
      </div>
      <div class="summary-card">
        <div class="summary-value" style="color: ${report.reviewDueSoon.length > 0 ? 'var(--warning-color)' : 'var(--success-color)'}">
          ${report.reviewDueSoon.length}
        </div>
        <div class="summary-label">Reviews Due Soon</div>
      </div>
    </div>

    ${report.overdueReviews.length > 0 ? `
      <div class="section">
        <div class="section-title">❌ Overdue Reviews</div>
        <table>
          <thead>
            <tr>
              <th>SOP ID</th>
              <th>Title</th>
              <th>Department</th>
              <th>Owner</th>
              <th>Days Overdue</th>
            </tr>
          </thead>
          <tbody>
            ${report.overdueReviews.map(sop => `
              <tr>
                <td><strong>${sop.id}</strong></td>
                <td>${sop.title}</td>
                <td>${sop.department}</td>
                <td>${sop.owner}</td>
                <td><span class="badge badge-danger">${sop.daysOverdue} days</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    ${report.reviewDueSoon.length > 0 ? `
      <div class="section">
        <div class="section-title">⚠️ Reviews Due Soon (Next 30 Days)</div>
        <table>
          <thead>
            <tr>
              <th>SOP ID</th>
              <th>Title</th>
              <th>Department</th>
              <th>Owner</th>
              <th>Due In</th>
            </tr>
          </thead>
          <tbody>
            ${report.reviewDueSoon.map(sop => `
              <tr>
                <td><strong>${sop.id}</strong></td>
                <td>${sop.title}</td>
                <td>${sop.department}</td>
                <td>${sop.owner}</td>
                <td><span class="badge badge-warning">${sop.daysUntilReview} days</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    <div class="section">
      <div class="section-title">📊 SOPs by Compliance Framework</div>
      <div class="framework-list">
        ${Object.entries(report.byFramework)
          .sort((a, b) => b[1].length - a[1].length)
          .map(([framework, sops]) => `
            <div class="framework-item">
              <div class="framework-name">${framework}</div>
              <div class="framework-count">${sops.length} SOP${sops.length !== 1 ? 's' : ''}</div>
              <details style="margin-top: 10px;">
                <summary style="cursor: pointer; color: var(--primary-color); font-size: 12px;">View SOPs</summary>
                <ul style="margin: 10px 0 0 20px; font-size: 13px;">
                  ${sops.map(sop => `<li>${sop.id} - ${sop.title}</li>`).join('')}
                </ul>
              </details>
            </div>
          `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">🏢 SOPs by Department</div>
      <div class="framework-list">
        ${Object.entries(report.byDepartment)
          .sort((a, b) => b[1].length - a[1].length)
          .map(([dept, sops]) => `
            <div class="framework-item">
              <div class="framework-name">${dept}</div>
              <div class="framework-count">${sops.length} SOP${sops.length !== 1 ? 's' : ''}</div>
            </div>
          `).join('')}
      </div>
    </div>
  </div>
</body>
</html>
`;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateComplianceReport().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { generateComplianceReport };
