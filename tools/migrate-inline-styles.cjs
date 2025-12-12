#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const CSS = path.join(ROOT, 'public', 'assets', 'css', 'common.css');

function hashStyle(s) {
  return 'inl-' + crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
}

function walk(dir, files=[]) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (e.isFile() && e.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function loadCss() {
  try { return fs.readFileSync(CSS, 'utf8'); } catch (e) { return ''; }
}

function appendCss(rule) {
  fs.appendFileSync(CSS, '\n' + rule + '\n');
}

function migrate() {
  const files = walk(PUBLIC);
  const styleMap = {}; // styleString -> className
  const cssContent = loadCss();

  for (const file of files) {
    let text = fs.readFileSync(file, 'utf8');
    let changed = false;

    // match style="..." (double quotes) and style='...' (single quotes)
    const re = /\bstyle\s*=\s*("([^"]*?)"|'([^']*?)')/g;
    let m;
    const replacements = [];

    while ((m = re.exec(text)) !== null) {
      const full = m[0];
      const styleStr = m[2] !== undefined ? m[2] : m[3];
      const normalized = styleStr.trim();
      if (!normalized) continue;
      let cls = styleMap[normalized];
      if (!cls) {
        cls = hashStyle(normalized);
        styleMap[normalized] = cls;
        const rule = `.${cls} { ${normalized} }`;
        if (!cssContent.includes(rule)) appendCss(rule);
      }

      // prepare replacement: remove style attr, add/append class attr
      replacements.push({ index: m.index, length: full.length, className: cls });
    }

    if (replacements.length === 0) continue;

    // Apply replacements from end -> start to keep indexes valid
    let out = text;
    for (let i = replacements.length - 1; i >= 0; --i) {
      const r = replacements[i];
      const before = out.slice(0, r.index);
      const after = out.slice(r.index + r.length);

      // check if preceding segment has a class="..."
      // we will insert or append class attribute to the element start tag.
      // find the start of the tag (last '<' before index)
      const lt = before.lastIndexOf('<');
      const tagSegment = before.slice(lt);
      const classMatch = /class\s*=\s*("([^"]*)"|'([^']*)')/i.exec(tagSegment);

      if (classMatch) {
        // append class to existing
        const clsFull = classMatch[0];
        const existing = classMatch[2] !== undefined ? classMatch[2] : classMatch[3];
        const newClass = existing + ' ' + r.className;
        const newClsAttr = `class=\"${newClass}\"`;
        const tagStart = lt;
        const tagBefore = out.slice(0, tagStart) + tagSegment.replace(clsFull, newClsAttr);
        // remove the style attribute occurrence from original place
        // Reconstruct out by replacing portion from tagStart to end accordingly
        // Simpler approach: remove the style attr at r.index.. and then replace class in tagStart area
        // Remove style attr
        const mid = out.slice(tagStart, r.index) + out.slice(r.index + r.length, r.index + r.length + 0);
        out = out.slice(0, tagStart) + mid + out.slice(r.index + r.length);
        // Now replace class attr inside tagStart segment
        const newTagSegment = tagSegment.replace(clsFull, newClsAttr);
        out = out.slice(0, tagStart) + newTagSegment + out.slice(tagStart + tagSegment.length);
      } else {
        // insert class before the end of the opening tag '>' or before any '/>'
        // find end of opening tag (first '>' after lt)
        const gt = out.indexOf('>', r.index + r.length);
        if (gt === -1) {
          // fallback: simply remove style attr and insert class before r.index
          out = before + after.replace(/\s+/, ' ');
        } else {
          // remove the style attr
          const tagContent = out.slice(lt, gt + 1);
          const newTagContent = tagContent.replace(/\s*style\s*=\s*("[^"]*"|'[^']*')/i, ` class=\"${r.className}\"`);
          out = out.slice(0, lt) + newTagContent + out.slice(gt + 1);
        }
      }
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(file, out, 'utf8');
      console.log('Updated', path.relative(ROOT, file));
    }
  }

  console.log('Migration complete. Appended classes to common.css for', Object.keys(styleMap).length, 'unique inline styles.');
}

migrate();
