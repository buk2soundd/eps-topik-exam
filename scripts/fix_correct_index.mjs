/**
 * Redistributes correctIndex in the reading bank so that correct answers
 * are spread evenly across positions ①②③④ based on bankId number % 4.
 * Swaps option texts in-place and relabels ①②③④ symbols.
 * Handles both single-line and multi-line option arrays in the source file.
 */
import { readFileSync, writeFileSync } from 'fs';
import { readingBank } from '../src/data/examData.js';

const SYMS = ['①', '②', '③', '④'];
const strip = (opt) => opt.replace(/^[①②③④]\s*/, '').trim();

// Normalize CRLF → LF so patterns always use \n
let content = readFileSync('./src/data/examData.js', 'utf8').replace(/\r\n/g, '\n');
let changeCount = 0;
let warnCount = 0;

for (const q of readingBank) {
  const bankNum = parseInt(q.bankId.replace(/[^0-9]/g, '')) || 0;
  const target = bankNum % 4;
  if (q.correctIndex === target) continue;

  const cur = q.correctIndex;
  // Swap options[cur] and options[target], relabel all 4 symbols
  const opts = q.options.map(strip);
  [opts[cur], opts[target]] = [opts[target], opts[cur]];
  const newCorrect = target;

  // ── Multi-line format (4-space indent for `options:`, 6-space for items) ──
  const oldOptsMulti = q.options.map(o => `      '${o}',`).join('\n');
  const newOptsMulti = opts.map((t, i) => `      '${SYMS[i]} ${t}',`).join('\n');
  const oldBlockMulti = `    options: [\n${oldOptsMulti}\n    ],\n    correctIndex: ${cur},`;
  const newBlockMulti = `    options: [\n${newOptsMulti}\n    ],\n    correctIndex: ${newCorrect},`;

  // ── Single-line format ──
  const oldOptsSingle = q.options.map(o => `'${o}'`).join(', ');
  const newOptsSingle = opts.map((t, i) => `'${SYMS[i]} ${t}'`).join(', ');
  const oldBlockSingle = `    options: [${oldOptsSingle}],\n    correctIndex: ${cur},`;
  const newBlockSingle = `    options: [${newOptsSingle}],\n    correctIndex: ${newCorrect},`;

  if (content.includes(oldBlockMulti)) {
    content = content.replace(oldBlockMulti, newBlockMulti);
    changeCount++;
    console.log(`✓ ${q.bankId}: correctIndex ${cur} → ${newCorrect} (multi)`);
  } else if (content.includes(oldBlockSingle)) {
    content = content.replace(oldBlockSingle, newBlockSingle);
    changeCount++;
    console.log(`✓ ${q.bankId}: correctIndex ${cur} → ${newCorrect} (single)`);
  } else {
    console.warn(`⚠ ${q.bankId}: block not found`);
    warnCount++;
  }
}

writeFileSync('./src/data/examData.js', content, 'utf8');
console.log(`\nDone: ${changeCount} updated, ${warnCount} warnings.`);
