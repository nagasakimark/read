#!/usr/bin/env node
// Builds curriculum/*.json from curriculum/src/*.mjs. Run: node tools/build_curriculum.mjs
// The JSON is what the app loads; the .mjs files are the compact authoring format.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PHONEMES, GPCS } from '../curriculum/src/gpcs.mjs';
import { WORDS } from '../curriculum/src/words.mjs';
import { TRICKY } from '../curriculum/src/tricky.mjs';
import { PACKS } from '../curriculum/src/packs.mjs';
import { STORIES, SENTENCES } from '../curriculum/src/stories.mjs';
import { UNITS } from '../curriculum/src/units.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = (name, data) => fs.writeFileSync(path.join(root, 'curriculum', name), JSON.stringify(data, null, 1) + '\n');
const gpcById = Object.fromEntries(GPCS.map(g => [g.id, g]));

const words = WORDS.map(([t, g, pic, ja, tier]) => {
  const ids = g.split(' ');
  const unit = Math.max(...ids.map(i => gpcById[i]?.unit ?? 99));
  const ph = ids.flatMap(i => gpcById[i]?.ph ?? []);
  return { id: t.toLowerCase(), t, g: ids, u: unit, ph, pic, ja, tier };
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
  u.groups.forEach((g, i) => lessons.push({ id: `L${u.id}_${i + 1}`, unit: u.id, kind: 'teach', newGpcs: g, newTricky: u.tricky[i] || [], stories: [] }));
  const st = storiesByUnit[u.id] || [];
  const n = u.groups.length;
  const mk = (k, kind, stories) => lessons.push({ id: `L${u.id}_${n + k}`, unit: u.id, kind, newGpcs: [], newTricky: [], stories });
  if (st.length) {
    mk(1, 'consolidate', [{ id: st[0], read: 1 }]);
    mk(2, 'story', [{ id: st[0], read: 2 }, { id: st[0], read: 3 }, ...(st[1] ? [{ id: st[1], read: 1 }, { id: st[1], read: 2 }] : [])]);
    mk(3, 'story', [...(st[1] ? [{ id: st[1], read: 3 }] : []), ...(st[2] ? [{ id: st[2], read: 1 }, { id: st[2], read: 2 }, { id: st[2], read: 3 }] : [])]);
  } else {
    mk(1, 'consolidate', []);
  }
  return { id: u.id, stage: u.stage, name: u.name, ja: u.ja, newGpcs: u.groups.flat(), newTricky: u.tricky.flat(),
    prereqs: u.id > 1 ? [u.id - 1] : [0], packs: PACKS.filter(p => p.unit === u.id).map(p => p.id), lessons,
    stories: st, mastery: { rungRequired: 4, storyAccuracy: 0.9, questionsCorrect: st.length ? 2 : 0 } };
});

out('meta.json', { contentVersion: '0.1.0', accent: 'en-US', builtFrom: 'curriculum/src', blueprint: 'docs/BLUEPRINT.md',
  stages: [ { id: 0, name: 'Listening' }, { id: 1, name: 'First sounds' } ] });
out('phonemes.json', PHONEMES);
out('gpcs.json', GPCS);
out('words.json', words);
out('tricky.json', tricky);
out('packs.json', PACKS);
out('stories.json', STORIES);
out('sentences.json', SENTENCES);
out('units.json', units);
console.log(`built: ${PHONEMES.length} phonemes, ${GPCS.length} GPCs, ${words.length} words, ${tricky.length} tricky, ${STORIES.length} stories, ${SENTENCES.length} sentences, ${units.length} units`);
