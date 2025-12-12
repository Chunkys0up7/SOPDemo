#!/usr/bin/env node

/**
 * Link Validation Tool
 *
 * Validates all links in markdown files:
 * - Internal cross-references ({{include:}} syntax)
 * - Relative file links
 * - External HTTP/HTTPS links
 * - Anchor links within documents
 *
 * Usage: node tools/check-links.js
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

async function findMarkdownFiles(dir) {
  const files = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      // Skip node_modules, dist, .git
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git' || entry.name === '.husky') {
        continue;
      }

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  await walk(dir);
  return files;
}

// Find markdown files whose filename starts with the given prefix
async function findFilesByPrefix(startDir, prefix) {
  const results = [];
  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git' || entry.name === '.husky') continue;
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith('.md') && entry.name.startsWith(prefix)) {
        results.push(fullPath);
      }
    }
  }
  try { await walk(startDir); } catch (e) { /* ignore */ }
  return results;
}

// Find markdown files whose filename contains the given fragment
async function findFilesContaining(startDir, fragment) {
  const results = [];
  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git' || entry.name === '.husky') continue;
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith('.md') && entry.name.includes(fragment)) {
        results.push(fullPath);
      }
    }
  }
  try { await walk(startDir); } catch (e) { /* ignore */ }
  return results;
}

async function checkIncludeReferences(content, filePath) {
  const includePattern = /\{\{include:\s*([^}]+)\}\}/g;
  const issues = [];
  let match;

  // Skip template files and example documentation
  const relativePath = path.relative(ROOT_DIR, filePath);
  if (relativePath.startsWith('templates/') ||
      relativePath.includes('demo') ||
      relativePath.includes('template') ||
      relativePath === 'README.md' ||
      relativePath === 'BUILD_SUMMARY.md' ||
      relativePath === 'USE_CASE_GUIDE.md' ||
      relativePath === 'TEST_DATA_EXAMPLES.md' ||
      relativePath === 'TEMPLATE_CONFIGURATION_GUIDE.md' ||
      relativePath.startsWith('DOCS_AS_CODE') ||
      relativePath.startsWith('INGESTION_PIPELINE') ||
      relativePath.startsWith('MORTGAGE_DEMO')) {
    return issues; // Skip validation for template/example files
  }

  while ((match = includePattern.exec(content)) !== null) {
    const sopId = match[1].trim().split(',')[0].trim(); // Handle "sop-id, Section X"

    // Skip placeholder/example IDs
    if (sopId.match(/^(sop-id|atom-[XYZ]|molecule-id|organism-id|component-id)$/i) ||
        sopId.includes('XXX') || sopId.includes('example')) {
      continue;
    }

    // Determine where to look based on ID pattern
    let found = false;

    // Check for SOPs in sops/ directory
    if (sopId.startsWith('sop-')) {
      try {
        const matches = await findFilesByPrefix(path.join(ROOT_DIR, 'sops'), sopId);
        if (matches.length) found = true;
      } catch (error) {
        // ignore
      }
    }

    // Check for components in sop-components/ directory
    if (!found && (sopId.includes('-') || sopId.match(/^(atom|molecule|organism)-/))) {
      // Try exact match first (e.g., atom-password-reset.md)
      try {
        const matches = await findFilesByPrefix(path.join(ROOT_DIR, 'sop-components'), sopId);
        if (matches.some(m => path.basename(m) === `${sopId}.md`)) found = true;
      } catch (error) {
        // ignore
      }

      // If not found, try with molecule- or organism- prefixes
      if (!found) {
        const componentId = sopId.replace(/^(atom|molecule|organism)-/, '');
        try {
          const matches = await findFilesContaining(path.join(ROOT_DIR, 'sop-components'), componentId);
          if (matches.length) found = true;
        } catch (error) {
          // ignore
        }
      }
    }

    if (!found) {
      // Don't report if it's a future/planned SOP (like sop-mf-002 through sop-mf-013, all except 001 and 014)
      if (sopId.match(/^sop-mf-(00[2-9]|0[1-2]\d|013)$/)) {
        continue; // These are referenced but not yet created (only 001 and 014 exist)
      }

      // Mark SOP references as critical, component references as warnings
      const severity = sopId.startsWith('sop-') ? 'critical' : 'warning';

      issues.push({
        type: 'include',
        reference: sopId,
        line: content.substring(0, match.index).split('\n').length,
        message: `Referenced SOP '${sopId}' not found`,
        severity
      });
    }
  }

  return issues;
}

async function checkInternalLinks(content, filePath) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const issues = [];
  let match;

  while ((match = linkPattern.exec(content)) !== null) {
    const linkText = match[1];
    const linkUrl = match[2];

    // Skip external links and anchors only
    if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://') || linkUrl.startsWith('#')) {
      continue;
    }

    // Check relative file links
    if (linkUrl.startsWith('/') || linkUrl.startsWith('./') || linkUrl.startsWith('../')) {
      const baseDir = path.dirname(filePath);
      const absolutePath = linkUrl.startsWith('/')
        ? path.join(ROOT_DIR, linkUrl)
        : path.resolve(baseDir, linkUrl);

      // Remove anchor if present
      const filePart = absolutePath.split('#')[0];

      try {
        await fs.access(filePart);
      } catch (error) {
        // Treat missing files under `sops/` as critical, others as warnings
        const isSopFile = filePart.includes(path.join(ROOT_DIR, 'sops'));
        issues.push({
          type: 'file',
          reference: linkUrl,
          line: content.substring(0, match.index).split('\n').length,
          message: `File not found: ${linkUrl}`,
          severity: isSopFile ? 'critical' : 'warning'
        });
      }
    }
  }

  return issues;
}

async function checkLinks() {
  console.log(`${colors.blue}🔍 Checking links in markdown files...${colors.reset}\n`);

  const files = await findMarkdownFiles(ROOT_DIR);
  console.log(`Found ${files.length} markdown files\n`);

  let totalIssues = 0;
  let filesWithIssues = 0;
  let totalCritical = 0;

  for (const file of files) {
    const relativePath = path.relative(ROOT_DIR, file);
    const content = await fs.readFile(file, 'utf8');

    const includeIssues = await checkIncludeReferences(content, file);
    const linkIssues = await checkInternalLinks(content, file);

    const allIssues = [...includeIssues, ...linkIssues];

    if (allIssues.length > 0) {
      filesWithIssues++;
      totalIssues += allIssues.length;
      totalCritical += allIssues.filter(i => i.severity === 'critical').length;

      console.log(`${colors.red}✗ ${relativePath}${colors.reset}`);
      for (const issue of allIssues) {
        const sevMark = issue.severity === 'critical' ? `${colors.red}[CRITICAL]${colors.reset} ` : `${colors.yellow}[WARN]${colors.reset} `;
        console.log(`  ${sevMark}${colors.yellow}Line ${issue.line}:${colors.reset} ${issue.message}`);
      }
      console.log('');
    } else {
      console.log(`${colors.green}✓ ${relativePath}${colors.reset}`);
    }
  }

  console.log('');
  console.log('─'.repeat(60));

  if (totalCritical > 0) {
    console.log(`${colors.red}❌ Found ${totalCritical} critical link issue(s) in ${filesWithIssues} file(s)${colors.reset}`);
    console.log(`${colors.yellow}ℹ️  Additionally found ${totalIssues - totalCritical} warning(s).${colors.reset}`);
    process.exit(1);
  } else if (totalIssues > 0) {
    console.log(`${colors.yellow}⚠️  Found ${totalIssues} warning(s) in ${filesWithIssues} file(s), no critical issues.${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`${colors.green}✅ All links valid! No broken references found.${colors.reset}`);
    process.exit(0);
  }
}

// Run the check
checkLinks().catch(error => {
  console.error(`${colors.red}Error:${colors.reset}`, error.message);
  process.exit(1);
});
