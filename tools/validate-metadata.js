#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function findMdFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) findMdFiles(fullPath, results);
    else if (entry.name.endsWith('.md')) results.push(fullPath);
  }
  return results;
}

function validateFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(process.cwd(), file);
  const errors = [];

  if (!content.startsWith('---')) {
    errors.push('Missing YAML frontmatter');
    return { file: rel, errors };
  }

  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    errors.push('Invalid YAML frontmatter');
    return { file: rel, errors };
  }

  const front = match[1];
  const required = ['id','title','version','status'];
  for (const r of required) {
    const re = new RegExp('^' + r + '\\s*:', 'm');
    if (!re.test(front)) errors.push(`Missing required field '${r}'`);
  }

  return { file: rel, errors };
}

function main() {
  const sopDir = path.join(process.cwd(), 'sops');
  if (!fs.existsSync(sopDir)) {
    console.error('sops directory not found');
    process.exit(1);
  }

  const files = findMdFiles(sopDir);
  let totalErrors = 0;
  for (const f of files) {
    const res = validateFile(f);
    if (res.errors.length) {
      totalErrors += res.errors.length;
      console.error(`\n❌ ${res.file}`);
      for (const e of res.errors) console.error(`  - ${e}`);
    } else {
      console.log(`✅ ${res.file}: OK`);
    }
  }

  if (totalErrors > 0) {
    console.error(`\n❌ Found ${totalErrors} metadata error(s)`);
    process.exit(1);
  }
  console.log('\n✅ All SOP metadata validated');
  process.exit(0);
}

main();
