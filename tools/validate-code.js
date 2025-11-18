#!/usr/bin/env node

/**
 * Comprehensive Code Validation Script
 * Checks for:
 * - Dead links in HTML files
 * - Missing assets
 * - Inconsistent branding
 * - Code quality issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRAND_COLOR = '#0052CC';
const BRAND_NAME = 'Pursuit';
const REQUIRED_LOGO = 'pursuit-logo';

const issues = {
  deadLinks: [],
  missingAssets: [],
  brandingIssues: [],
  codeQuality: []
};

// Check HTML files
function checkHTMLFiles() {
  const htmlDir = path.join(__dirname, '../public');
  const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

  console.log('\n🔍 Checking HTML files for issues...\n');

  htmlFiles.forEach(file => {
    const filePath = path.join(htmlDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Check for branding
    const hasPursuitBranding = content.includes(BRAND_NAME);
    const hasBrandColor = content.includes(BRAND_COLOR);
    const hasLogo = content.includes(REQUIRED_LOGO);

    if (!hasPursuitBranding || !hasLogo) {
      issues.brandingIssues.push({
        file,
        issue: `Missing branding (Pursuit: ${hasPursuitBranding}, Logo: ${hasLogo})`
      });
    }

    // Check for common asset references
    const assetMatches = content.matchAll(/(?:src|href)=["']([^"']+)["']/g);
    for (const match of assetMatches) {
      const assetPath = match[1];

      // Skip external URLs and data URIs
      if (assetPath.startsWith('http') || assetPath.startsWith('data:') || assetPath.startsWith('#')) {
        continue;
      }

      // Check if local file exists
      const fullPath = path.join(htmlDir, assetPath);
      if (!assetPath.includes('api/') && !fs.existsSync(fullPath)) {
        issues.missingAssets.push({
          file,
          asset: assetPath
        });
      }
    }

    // Check for title tag
    if (!content.includes('<title>')) {
      issues.codeQuality.push({
        file,
        issue: 'Missing <title> tag'
      });
    }

    // Check for charset
    if (!content.includes('charset')) {
      issues.codeQuality.push({
        file,
        issue: 'Missing charset declaration'
      });
    }
  });
}

// Check for icons directory
function checkIconsDirectory() {
  const iconsDir = path.join(__dirname, '../public/icons');
  if (!fs.existsSync(iconsDir)) {
    issues.missingAssets.push({
      file: 'N/A',
      asset: 'public/icons directory'
    });
  }
}

// Print report
function printReport() {
  console.log('\n═══════════════════════════════════════════');
  console.log('   Code Validation Report');
  console.log('═══════════════════════════════════════════\n');

  let totalIssues = 0;

  // Branding issues
  if (issues.brandingIssues.length > 0) {
    console.log('🎨 Branding Issues:');
    issues.brandingIssues.forEach(issue => {
      console.log(`  ⚠️  ${issue.file}: ${issue.issue}`);
      totalIssues++;
    });
    console.log('');
  }

  // Missing assets
  if (issues.missingAssets.length > 0) {
    console.log('📁 Missing Assets:');
    issues.missingAssets.forEach(issue => {
      console.log(`  ❌ ${issue.file}: ${issue.asset}`);
      totalIssues++;
    });
    console.log('');
  }

  // Code quality
  if (issues.codeQuality.length > 0) {
    console.log('💻 Code Quality Issues:');
    issues.codeQuality.forEach(issue => {
      console.log(`  ⚠️  ${issue.file}: ${issue.issue}`);
      totalIssues++;
    });
    console.log('');
  }

  // Summary
  console.log('═══════════════════════════════════════════');
  if (totalIssues === 0) {
    console.log('✅ No issues found!');
  } else {
    console.log(`⚠️  Found ${totalIssues} issue(s)`);
  }
  console.log('═══════════════════════════════════════════\n');

  // Exit with error code if issues found
  process.exit(totalIssues > 0 ? 1 : 0);
}

// Run validation
checkHTMLFiles();
checkIconsDirectory();
printReport();
