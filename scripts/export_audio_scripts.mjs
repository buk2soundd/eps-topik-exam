/**
 * Export all listening question audioScripts to JSON
 * Run: node scripts/export_audio_scripts.mjs
 */
import { listeningBank } from '../src/data/examData.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const scripts = listeningBank.map((q) => ({
  bankId: q.bankId,
  audioScript: q.audioScript || '',
}));

const outPath = path.join(__dirname, 'audio_scripts.json');
fs.writeFileSync(outPath, JSON.stringify(scripts, null, 2), 'utf-8');
console.log(`✅ Exported ${scripts.length} listening scripts → scripts/audio_scripts.json`);
scripts.forEach((s) => {
  const hasMale   = s.audioScript.includes('남자:');
  const hasFemale = s.audioScript.includes('여자:');
  const type = hasMale && hasFemale ? '🗣 대화' : hasMale ? '👨' : hasFemale ? '👩' : '📢 방송';
  console.log(`  ${type}  ${s.bankId}`);
});
