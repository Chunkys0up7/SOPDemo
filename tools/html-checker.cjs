#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

// HTML void elements (no closing tag required)
const voidEls = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

function walk(dir, files=[]) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (e.isFile() && e.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function stripComments(s) {
  return s.replace(/<!--([\s\S]*?)-->/g, '');
}

function checkFile(file) {
  const rel = path.relative(ROOT, file);
  let s = fs.readFileSync(file, 'utf8');
  s = stripComments(s);

  // find tags
  const tagRe = /<\/?([a-zA-Z0-9:-]+)([^>]*)>/g;
  const stack = [];
  const problems = [];
  let m;
  while ((m = tagRe.exec(s)) !== null) {
    const full = m[0];
    const tag = m[1].toLowerCase();
    const isClose = full.startsWith('</');
    const selfClose = full.endsWith('/>') || voidEls.has(tag);

    if (isClose) {
      if (stack.length === 0) {
        problems.push(`Unmatched closing tag </${tag}> at offset ${m.index}`);
      } else {
        const top = stack.pop();
        if (top !== tag) {
          problems.push(`Tag mismatch: expected </${top}> but found </${tag}> at offset ${m.index}`);
        }
      }
    } else if (!selfClose) {
      stack.push(tag);
    }
  }

  if (stack.length) {
    problems.push(`Unclosed tag(s): ${stack.join(', ')}`);
  }

  return { file: rel, problems };
}

function main() {
  const files = walk(PUBLIC);
  const results = [];
  for (const f of files) results.push(checkFile(f));

  let totalProblems = 0;
  for (const r of results) {
    if (r.problems.length) {
      console.log('\n✗', r.file);
      for (const p of r.problems) console.log('  -', p);
      totalProblems += r.problems.length;
    } else {
      console.log('✓', r.file);
    }
  }

  console.log('\nSummary: Files checked:', results.length, 'Problems found:', totalProblems);
  process.exit(totalProblems>0?1:0);
}

main();
