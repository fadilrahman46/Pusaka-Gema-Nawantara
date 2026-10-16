import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const folder = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(folder);
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const guide = read('GUIDE_KARAKTER_100_Nawantara_FINAL_v1_1.md');
const characters = [...guide.matchAll(/^###\s+(\d{2,3})\s+·\s+([^\r\n]+)\r?\n\*\*(Common|Uncommon|Rare|Super Rare|Ultra Rare|Legendary)\*\*/gm)]
  .map(m => ({ id: Number(m[1]), name: m[2], tier: m[3] }));
assert.equal(characters.length, 100);
assert.equal(new Set(characters.map(c => c.id)).size, 100);
const tiers = {};
characters.forEach(c => tiers[c.tier] = (tiers[c.tier] || 0) + 1);
assert.deepEqual(tiers, { Common: 26, Uncommon: 19, Rare: 19, 'Super Rare': 14, Legendary: 9, 'Ultra Rare': 13 });
const checks = [
  'PASS: 100 ID karakter unik dan distribusi rarity26/19/19/14/13/9 cocok dengan seluruh blok karakter.',
];
const first = guide.slice(guide.indexOf('### 01 ·'), guide.indexOf('### 02 ·'));
for (const [level, expected] of [[1,1070],[40,2316],[60,3442]]) {
  const row = first.split(/\r?\n/).find(l => l.startsWith(`| Level ${level} (`));
  assert.ok(row, `Missing Lampah anchor ${level}`);
  assert.equal(Number(row.split('|')[2].trim()), expected);
}
assert.equal(Math.floor(1070 * 1.02 ** 59),3441);
assert.equal(Math.floor(1070 * 1.02 ** 19), 1558);
assert.equal(535 ** 2 / (535 + 535 * 1.5), 214);
checks.push('PASS: anchor Lampah L1/L40/L60 terverifikasi1070/2316/3442; formula floor L60=3441 sehingga override tabel C01 memang diperlukan. L20=1558; damage535vs535=214. Bukan sertifikasi semua tabel stat.');

const entries = [];
const questIds = new Set();
for (const name of fs.readdirSync(root).filter(n => /^QUEST_SCRIPT_R\d_.*\.md$/.test(n)).sort()) {
  let questId = null, section = '';
  for (const [index, line] of read(name).split(/\r?\n/).entries()) {
    if (/^#{1,6}\s/.test(line)) section = line.replace(/^#+\s*/, '');
    const q = line.match(/^#{1,3}\s+((?:NR|KD|SM|WN|KL|HM|RJ|JL|AW)-[MSH]\d{2})\b/);
    if (q) { questId=q[1]; questIds.add(questId); }
    else if (/^#\s/.test(line)) questId=null;
    if (!/\bHP\b/.test(line)) continue;
    entries.push({
      evidenceId: `${name}:${index+1}`, sourceFile:name, sourceLine:index+1, questId, section,
      sourceText:line.trim(), explicitPlaceholder:/\[PLACEHOLDER|\bTBD\b/.test(line),
      resolutionPolicy: questId ? 'C07 explicit encounter > numeric tuning baseline > region-tier lookup > generic fallback; C14 encounter level' : 'Historical/general reference; not an encounter binding',
      implementationStatus:'NOT_BOUND', semanticReview:'REQUIRED_BEFORE_RUNTIME_IMPORT',
    });
  }
}
assert.equal(questIds.size,138);
fs.writeFileSync(path.join(folder,'ENCOUNTER_REGISTER.json'), JSON.stringify({
  designRevision:'naw-2026-09-18.1', kind:'SOURCE_EVIDENCE_NOT_RUNTIME_CONTENT',
  warning:'One row per HP mention, not one row per battle. Threshold/UI rows must not become enemies. Apply C07 and verify binding before runtime import.',
  entries,
},null,2)+'\n');
checks.push(`PASS: registry evidence berisi ${entries.length} baris HP dari sembilan script;138 ID quest termasuk addendum. Binding runtime belum diuji.`);

const decisions = fs.readFileSync(path.join(folder,'DESIGN_DECISIONS.md'),'utf8');
for(let i=1;i<=14;i++) assert.ok(decisions.includes(`## C${String(i).padStart(2,'0')} —`));
fs.writeFileSync(path.join(folder,'DECISION_VERIFICATION.md'), '# Verifikasi keputusan desain\n\nPemeriksaan sedang berjalan; belum dinyatakan lulus.\n');
const broken=[];
for(const file of fs.readdirSync(folder).filter(n=>n.endsWith('.md'))) {
  const text=fs.readFileSync(path.join(folder,file),'utf8');
  for(const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target=match[1].split('#')[0];
    if(!target || /^https?:/.test(target))continue;
    if(!fs.existsSync(path.resolve(folder,target)))broken.push(`${file}: ${target}`);
  }
}
assert.deepEqual(broken,[]);
checks.push('PASS:14 keputusan rinci tersedia dan seluruh tautan lokal planning valid.');
fs.writeFileSync(path.join(folder,'DECISION_VERIFICATION.md'), `# Verifikasi keputusan desain\n\nTanggal:2026-09-18. Jalankan ulang: \`node planning/verify-decisions.mjs\`.\n\n${checks.map(c=>'- '+c).join('\n')}\n\nScope: pemeriksaan sumber dan konsistensi artefak desain. Tidak menjalankan game, build, migrasi save, simulasi battle, atau usability test. Status runtime terbaru mengikuti PHASE_VERIFICATION.md dan laporan PRODUCTION_02.md. Keputusan C01–C14 ACCEPTED; implementasi dan balance belum disertifikasi.\n`);
console.log(checks.join('\n'));
