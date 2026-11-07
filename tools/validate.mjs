#!/usr/bin/env node
// Build-time validator (blueprint "Engine rules": the build-time validator enforces
//  (a) every word's segments exist and are taught by the unit that uses the word;
//  (b) every story passes its decodability rule;
//  (c) every unit's prerequisites come earlier.)
// Exit code 1 on any ERROR. WARNs are design-rule nudges (the blueprint marks those thresholds DR).
import { loadCurriculumNode } from '../src/learn/loader.node.js';
import { tokenize } from '../src/learn/curriculum.js';

const C = loadCurriculumNode();
const errors = [], warns = [];
const err = m => errors.push(m), warn = m => warns.push(m);

// ---- ids unique
const seen = new Set();
for (const w of C.wordList) { if (seen.has(w.id)) err(`duplicate word id: ${w.id}`); seen.add(w.id); }

// ---- (a) word segments
for (const w of C.wordList) {
  if (w.g.some(g => !C.gpcs[g])) { err(`word ${w.id}: unknown GPC in [${w.g}]`); continue; }
  const spelled = w.g.map(g => C.gpcs[g].g).join('');
  if (spelled !== w.t.toLowerCase()) err(`word ${w.id}: segments spell "${spelled}" not "${w.t}"`);
  if (w.tier === 'silly' && w.pic) warn(`silly word ${w.id} has a picture`);
}
// tricky words: parts join to the text
for (const t of C.trickyList) {
  const spelled = t.parts.map(p => p.replace('*', '')).join('');
  if (spelled.toLowerCase() !== t.t.toLowerCase()) err(`tricky ${t.id}: parts spell "${spelled}"`);
  if (t.decodableFrom && !C.words[t.id] && t.decodableFrom <= 7) warn(`tricky ${t.id} decodable from U${t.decodableFrom} but not in word list`);
}

// ---- (c) units: sequential, every GPC introduced exactly once, in the unit that owns it
const introduced = new Set();
C.units.forEach((u, i) => {
  if (u.id !== i) err(`unit order: expected id ${i}, got ${u.id}`);
  for (const p of u.prereqs) if (p >= u.id) err(`unit ${u.id}: prerequisite ${p} is not earlier`);
  for (const g of u.newGpcs) {
    if (!C.gpcs[g]) { err(`unit ${u.id}: unknown GPC ${g}`); continue; }
    if (introduced.has(g)) err(`GPC ${g} introduced twice`);
    introduced.add(g);
    if (C.gpcs[g].unit !== u.id) err(`GPC ${g}: gpcs.json says unit ${C.gpcs[g].unit}, units.json puts it in ${u.id}`);
  }
  for (const t of u.newTricky) {
    if (!C.tricky[t]) err(`unit ${u.id}: unknown tricky word ${t}`);
    else if (C.tricky[t].release !== u.id) err(`tricky ${t}: release ${C.tricky[t].release} != unit ${u.id}`);
  }
  for (const l of u.lessons) for (const s of l.stories || []) if (!C.stories[s.id]) err(`lesson ${l.id}: unknown story ${s.id}`);
});
for (const g of C.gpcList) if (!introduced.has(g.id)) err(`GPC ${g.id} is never introduced by any unit`);

// tricky word parts that are regular must already be taught by release unit
for (const t of C.trickyList) {
  for (const p of t.parts) {
    if (p.startsWith('*')) continue;
    const gp = C.gpcList.find(g => g.g === p && g.unit <= t.release && g.type !== 'doubled');
    if (!gp) err(`tricky ${t.id}: regular part "${p}" not taught by release unit ${t.release}`);
  }
}

// ---- (b) stories and sentences decodability (blueprint: 100% in Stages 1-3)
function checkText(label, text, unit, focus) {
  const d = C.decodability(text, unit);
  if (d.pct < 1) err(`${label}: ${Math.round(d.pct * 100)}% decodable at U${unit}; bad tokens: ${d.bad.map(b => `${b.token}(${b.why})`).join(', ')}`);
  if (focus?.length) {
    const content = tokenize(text).map(t => C.classify(t.key, unit)).filter(c => c.kind === 'word' && c.word.tier !== 'function');
    if (content.length) {
      const hit = content.filter(c => c.word.g.some(g => focus.includes(g))).length;
      return { content: content.length, hit };
    }
  }
  return null;
}
for (const s of C.storyList) {
  let content = 0, hit = 0;
  s.pages.forEach((p, i) => { const r = checkText(`story ${s.id} p${i + 1}`, p.text, s.unit, s.focus); if (r) { content += r.content; hit += r.hit; } });
  if (content && hit / content < 0.3) warn(`story ${s.id}: only ${hit}/${content} content words use focus GPCs (blueprint DR: >=30%)`);
  if (!s.questions?.length) err(`story ${s.id}: no comprehension question`);
  if (s.pages.length > 6) warn(`story ${s.id}: ${s.pages.length} pages is long for Stage 1`);
  for (const p of s.pages) if (tokenize(p.text).length > 8) warn(`story ${s.id}: sentence over 8 words: "${p.text}"`);
}
for (const s of C.sentences) checkText(`sentence "${s.text}"`, s.text, s.unit);

// ---- contrast packs: all words exist, are decodable by pack unit, differ by exactly one GPC
for (const p of C.packs) for (const set of p.sets) {
  for (const id of set) { const w = C.words[id]; if (!w) err(`pack ${p.id}: unknown word ${id}`); else if (w.u > p.unit) err(`pack ${p.id}: ${id} (U${w.u}) not decodable at pack unit ${p.unit}`); }
  for (let i = 0; i < set.length; i++) for (let j = i + 1; j < set.length; j++) {
    const a = C.words[set[i]], b = C.words[set[j]];
    if (!a || !b) continue;
    const diff = a.g.length === b.g.length ? a.g.filter((g, k) => g !== b.g[k]).length : 99;
    if (diff !== 1) err(`pack ${p.id}: ${a.id}/${b.id} do not differ by exactly one GPC`);
  }
}

// ---- coverage: every GPC needs practice material
for (const g of C.gpcList) {
  const real = C.wordsWithGpc(g.id, 99).filter(w => w.tier !== 'name');
  if (real.length < 3) warn(`GPC ${g.id}: only ${real.length} real words contain it (need >=3 for varied practice)`);
  if (g.type === 'single' && !['sz'].includes(g.id) && (!g.bank || g.bank.length < 3)) warn(`GPC ${g.id}: mnemonic/initial-sound bank has < 3 entries`);
}
// silly words per unit for transfer probes (blueprint rung 4 needs >=5 transfer attempts)
for (const u of C.units.filter(u => u.id >= 1)) {
  const n = C.sillyAt(u.id).length;
  if (n < 3) warn(`unit ${u.id}: only ${n} silly words available`);
}
// lure availability
for (const w of C.wordList.filter(w => w.tier !== 'silly')) {
  const lures = C.mutations(w.id, w.u).length;
  if (lures < 2) warn(`word ${w.id}: only ${lures} one-GPC lure strings at U${w.u}`);
}

for (const e of errors) console.error('ERROR ', e);
for (const w of warns) console.warn('WARN  ', w);
console.log(`\nvalidate: ${errors.length} error(s), ${warns.length} warning(s); ${C.wordList.length} words, ${C.storyList.length} stories, ${C.units.length} units`);
process.exit(errors.length ? 1 : 0);
