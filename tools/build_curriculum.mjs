#!/usr/bin/env node
// Builds curriculum/*.json from curriculum/src/*.mjs. Run: node tools/build_curriculum.mjs
// The JSON is what the app loads; the .mjs files are the compact authoring format.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PHONEMES, GPCS, S_FINAL_BANK } from '../curriculum/src/gpcs.mjs';
import { WORDS } from '../curriculum/src/words.mjs';
import { TRICKY } from '../curriculum/src/tricky.mjs';
import { PACKS } from '../curriculum/src/packs.mjs';
import { STORIES, SENTENCES } from '../curriculum/src/stories.mjs';
import { UNITS } from '../curriculum/src/units.mjs';
import { STAGES, KINDS, COURSE, CHECKPOINTS, REVIEW_POINTS, THEMES } from '../curriculum/src/course.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = (name, data) => fs.writeFileSync(path.join(root, 'curriculum', name), JSON.stringify(data, null, 1) + '\n');
const gpcById = Object.fromEntries(GPCS.map(g => [g.id, g]));

// consonant-cluster patterns, e.g. 'n d$' (final) or '^s t' (initial); id = spec without spaces
const allPats = UNITS.flatMap(u => (u.patterns || []).flat());
// consonant-cluster patterns, e.g. 'n d$' (final) or '^s t' (initial); id = spec without spaces
const patSpecs = allPats.filter(sp => !/^(sy|af):/.test(sp)).map(sp => ({ id: sp.replace(/ /g, ''), seq: sp.replace(/[\^$]/g, '').trim().split(' '), initial: sp.startsWith('^') }));
// Stage 6 patterns: 'sy:closed|open|compound|r' (syllable types, derived from the word's syllable marks) and 'af:<morpheme>' (declared per word)
const afSet = new Set(allPats.filter(sp => sp.startsWith('af:')).map(sp => sp.slice(3)));
const R_CTRL = new Set(['ar', 'or', 'er', 'ir', 'ur', 'air', 'ear']);
const SYL_T = { '|': 'closed', '/': 'open', '+': 'compound' };
const words = WORDS.map(([t, g, pic, ja, tier, uo, morph]) => {
  // syllable marks inside the GPC string: | closed (VC/CV)   / open (V/CV)   + compound boundary
  const ids = [], syl = [], sylT = []; let cur = 0;
  for (const b of g.split(/([|\/+])/)) {
    if (SYL_T[b]) { syl.push(cur); cur = 0; sylT.push(SYL_T[b]); }
    else { const toks = b.split(' ').filter(Boolean); ids.push(...toks); cur += toks.length; }
  }
  if (syl.length) syl.push(cur);
  const unit = Math.max(...ids.map(i => gpcById[i]?.unit ?? 99));
  const ph = ids.flatMap(i => gpcById[i]?.ph ?? []);
  const pat = patSpecs.filter(p => p.initial ? p.seq.every((x, i) => ids[i] === x) : p.seq.every((x, i) => ids[ids.length - p.seq.length + i] === x)).map(p => p.id);
  for (const ty of new Set(sylT)) pat.push('sy:' + ty);
  if (syl.length && ids.some(i => R_CTRL.has(i))) pat.push('sy:r');
  const mo = morph ? morph.split('+') : null;
  for (const m of mo || []) if (afSet.has(m)) pat.push('af:' + m);
  if (mo && mo.length >= 2) {   // spelling-change rules, recognised from base + suffix = word
    const base = mo.slice(0, -1).join(''), suf = mo.at(-1), wt = t.toLowerCase();
    if (wt === base + base.slice(-1) + suf && afSet.has('double')) pat.push('af:double');
    else if (/e$/.test(base) && wt === base.slice(0, -1) + suf && afSet.has('drop-e')) pat.push('af:drop-e');
    else if (/y$/.test(base) && wt === base.slice(0, -1) + 'i' + suf && afSet.has('y-i')) pat.push('af:y-i');
  }
  return { id: t.toLowerCase(), t, g: ids, u: uo ?? unit, ph, pic, ja, tier, ...(pat.length ? { pat } : {}), ...(syl.length ? { syl } : {}), ...(mo ? { morph: mo } : {}) };
});

const tricky = TRICKY.map(([t, parts, release, decodableFrom, noteEn, noteJa]) =>
  ({ id: t.toLowerCase(), t, parts, release, decodableFrom, noteEn, noteJa }));

// ---- lessons (blueprint: units of 3-6 short lessons gated by mastery)
const storiesByUnit = {};
STORIES.forEach(s => (storiesByUnit[s.unit] ??= []).push(s.id));
const units = UNITS.map(u => {
  if (u.oral) {
    return { ...u, newGpcs: [], newTricky: [], prereqs: [],
      lessons: ['L0_1','L0_2','L0_3'].map((id, i) => ({ id, unit: 0, kind: 'oral', oralSet: i + 1 })) };
  }
  const lessons = [];
  const G = u.patterns || u.groups;
  G.forEach((g, i) => lessons.push({ id: `L${u.id}_${i + 1}`, unit: u.id, kind: 'teach', newGpcs: u.patterns ? [] : g, ...(u.patterns ? { newPats: g.map(x => x.replace(/ /g, '')) } : {}), newTricky: u.tricky[i] || [], stories: [] }));
  const st = storiesByUnit[u.id] || [];
  const n = G.length;
  const mk = (k, kind, stories) => lessons.push({ id: `L${u.id}_${n + k}`, unit: u.id, kind, newGpcs: [], newTricky: [], stories });
  if (st.length) {
    mk(1, 'consolidate', [{ id: st[0], read: 1 }]);
    // every reading of every story, in order, four readings per story lesson
    const reads = [{ id: st[0], read: 2 }, { id: st[0], read: 3 }, ...st.slice(1).flatMap(id => [1, 2, 3].map(read => ({ id, read })))];
    for (let i = 0, k = 2; i < reads.length; i += 4, k++) mk(k, 'story', reads.slice(i, i + 4));
  } else {
    mk(1, 'consolidate', []);
  }
  return { id: u.id, stage: u.stage, name: u.name, ja: u.ja, newGpcs: (u.groups || []).flat(), suffixGpcs: u.suffixGpcs || [], newPatterns: (u.patterns || []).flat().map(x => x.replace(/ /g, '')), ...(u.syl ? { syl: true } : {}), ...(u.morph ? { morph: true } : {}), newTricky: u.tricky.flat(),
    prereqs: u.id > 1 ? [u.id - 1] : [0], packs: PACKS.filter(p => p.unit === u.id).map(p => p.id), lessons,
    stories: st, mastery: { rungRequired: 4, storyAccuracy: 0.9, questionsCorrect: Math.min(2, st.length) } };
});

out('meta.json', { contentVersion: '0.1.0', accent: 'en-US', sFinalBank: S_FINAL_BANK, builtFrom: 'curriculum/src', blueprint: 'docs/BLUEPRINT.md',
  stages: STAGES.map(({ id, name, ja }) => ({ id, name, ja })) });
out('phonemes.json', PHONEMES);
out('gpcs.json', GPCS);
out('words.json', words);
out('tricky.json', tricky);
out('packs.json', PACKS);
out('stories.json', STORIES);
out('sentences.json', SENTENCES);
out('units.json', units);
// ---- full course map (authored + planned units); status derived from what is actually authored
const authored = new Set(UNITS.map(u => u.id));
const course = { stages: STAGES, kinds: KINDS, checkpoints: CHECKPOINTS, reviewPoints: REVIEW_POINTS, themes: THEMES,
  units: COURSE.map(u => ({ ...u, status: authored.has(u.id) ? 'authored' : 'planned' })) };
out('course.json', course);
console.log(`built: ${PHONEMES.length} phonemes, ${GPCS.length} GPCs, ${words.length} words, ${tricky.length} tricky, ${STORIES.length} stories, ${SENTENCES.length} sentences, ${units.length} units`);
