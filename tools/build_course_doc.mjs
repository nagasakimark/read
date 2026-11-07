// Generates docs/COURSE_PLAN.md from curriculum/src/course.mjs so the doc and data never diverge.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STAGES, KINDS, COURSE, CHECKPOINTS, REVIEW_POINTS, THEMES } from '../curriculum/src/course.mjs';
import { UNITS } from '../curriculum/src/units.mjs';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const authored = new Set(UNITS.map(u => u.id));
const L = [];
const p = (...a) => L.push(...a);
const row = (...c) => '| ' + c.join(' | ') + ' |';

p('# Course plan: from first sounds to comfortable reading', '',
  '> GENERATED from `curriculum/src/course.mjs` by `tools/build_course_doc.mjs`. Edit the data, not this file.',
  '> Teaching order and pedagogy follow `docs/BLUEPRINT.md`. Every threshold marked **DR** is a design recommendation to validate with real children.', '',
  `Status: **${authored.size} of ${COURSE.length} units authored** (Units 0-${authored.size - 1}); the other ${COURSE.length - authored.size} are specified here and unlock as they are written. Audio and pictures are placeholders (eSpeak voice, emoji) until recordings and artwork replace them; practice games are planned (section 9).`, '');

p('## 1. Pedagogy: the principles that decide the order', '',
  '1. **Explicit, systematic synthetic phonics.** Letter-sound correspondences are taught directly, in a fixed order, then blended left to right and used for spelling. ([WWC foundational reading guide](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf); [EEF phonics toolkit](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics); [DfE reading framework](https://assets.publishing.service.gov.uk/media/664f600c05e5fe28788fc437/The_reading_framework_.pdf))',
  '2. **Phonemes linked to letters.** Phonemic awareness is taught with print, not in isolation, and kept short. ([National Reading Panel / Ehri](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf); [Clemens et al. on advanced PA](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf))',
  '3. **Simple code before complex code.** One spelling per sound first, alternatives only after the first spelling is secure. ([DfE phonics technical specification](https://assets.publishing.service.gov.uk/media/662b8448fddcc9e7ab225285/Phonics_2024_technical_specification_v1.0.pdf); [Little Wandle progression](https://parc-eglos.croftymat.org/wp-content/uploads/sites/17/2023/03/Little-Wandle-for-Website.pdf))',
  '4. **Decodable text only until the code is known.** A story may contain only taught GPCs and taught tricky words; the validator enforces it. Tricky words are taught by their decodable parts plus the one odd part ("heart" words).',
  '5. **Mastery before progress, with spaced review.** A six-rung evidence ladder per GPC, a half-life scheduler, cumulative review points (section 7). Review is built in, not bolted on. (Rosenshine principles; blueprint section on mastery.)',
  '6. **One new difficulty at a time.** Clusters are blended sound by sound only after all digraphs; vowels are short until Stage 4; split digraphs follow the simple code.',
  '7. **Compare competitors, copy what works.** The opening (letters, sound-blend-read) matches [Duolingo ABC scope and sequence](https://lit-lessons-cdn.duolingo.com/resources/duolingo_abc_scope_and_sequence_english.pdf) and [Teach Your Monster to Read](https://help.teachyourmonster.org/en/articles/5458453-what-does-each-game-cover); ours differs after the alphabet by planning for Japanese EFL (below).',
  '8. **Engagement comes from the reading act**, not decoration; rewards are small and never gate learning. (Self-determination research; blueprint section on engagement.)', '');

p('## 2. Japanese EFL: what changes', '',
  '- **Syllable habit.** Kana are CV moras, so English final consonants and clusters invite inserted vowels ("map" to "mapu"). This is why clusters (Stage 3) come while vowels are still short and why each is taught with an epenthesis listening contrast.',
  '- **Sounds with no kana home:** /l/ vs /r/, /b/ vs /v/, /θ ð/, /s/ vs /ʃ/, final /ŋ/, short /æ ʌ ɑ/. Each gets a contrast pack that unlocks when both members are taught (`curriculum/src/packs.mjs`).',
  '- **No katakana** as a crutch: it misrepresents English sounds and builds the wrong habit. Japanese appears only as short hints and unit labels.',
  '- **Strengths used:** vowel length (ee/oo), alphabet familiarity from romaji, strong visual memory, and a classroom culture suited to short mastery loops.',
  '- **Morphology** (-s/-ed/-er) and **stress/weak vowels** have no Japanese counterpart, so they are taught explicitly in Stage 6.',
  '- **No speech-recognition gating.** The app never marks a child wrong for pronunciation; a mouth cue and a record-and-compare tool are the planned alternative.',
  '- **Accent:** en-US (matches Let\'s Try / New Horizon audio). Words whose vowel is accent-dependent are flagged in the unit notes (e.g. aw/au).', '');

p('## 3. Strand by stage', '',
  'Strands: **P** phonics, **A** phonemic awareness, **T** tricky words, **V** vocabulary/oral language, **F** fluency, **C** comprehension. ● core, ◐ active, ○ maintenance, — none.', '',
  row('Stage', 'Name', 'Units', 'Strands', 'Exit milestone'), row('---', '---', '---', '---', '---'));
for (const s of STAGES) p(row(s.id, `${s.name} (${s.ja})`, `${s.units[0]}${s.units.length > 1 ? '-' + s.units.at(-1) : ''}`, s.strands, s.exit));
p('');

p('## 4. The course, stage by stage', '');
for (const s of STAGES) {
  p(`### Stage ${s.id}: ${s.name}`, '', `**Why this order:** ${s.why}`, '', `**Main risk for Japanese learners:** ${s.risk}`, '');
  p(row('Unit', 'Teaches', 'Kind', 'New GPCs (IPA)', 'Concepts', 'Contrast pack', 'Tricky words', 'Status'), row('---', '---', '---', '---', '---', '---', '---', '---'));
  for (const id of s.units) {
    const u = COURSE[id];
    p(row(u.id, `${u.title} (${u.ja})`, KINDS[u.kind].label,
      u.gpcs.map(g => `${g[1]} /${g[2]}/ ${g[3]}`).join('; ') || '—',
      u.concepts.join('; ') || '—', u.pack, u.tricky.join(', ') || '—', authored.has(u.id) ? 'authored' : 'planned'));
  }
  p('', `Example words: ${s.units.map(id => `U${id}: ${COURSE[id].words.join(', ') || '—'}`).join(' | ')}`, '');
}

p('## 5. Lesson variants by unit kind', '',
  'Every lesson follows the nine-step template in the blueprint (meet, listen, recall, blend, spell, read, play with pseudo-words, heart word, story). The kind decides which activities appear. Activities marked **(new)** do not exist in the engine yet.', '',
  row('Kind', 'How the template changes', 'Activities'), row('---', '---', '---'));
for (const [k, v] of Object.entries(KINDS)) p(row(`${v.label} (\`${k}\`)`, v.template, v.activities.join(', ')));
p('');

p('## 6. Mastery ladder (per GPC)', '',
  'Rungs 0-5: heard, recognised, recalled, read in words, transferred to pseudo-words, retained after delay. All thresholds are DR. Evidence counts from the first attempt only. A GPC falls back only from a mastered rung, after 2 recent direct errors. A unit completes when every new GPC reaches rung 4 and stories are read at >= 90% accuracy (**DR**). Implemented in `src/learn/mastery.js`; tested by `tools/guessbot.mjs` (random bots must never pass; 85% learner must finish).', '');

p('## 7. Assessment, review and checkpoints', '',
  'Checkpoints are short mixed assessments at the end of each stage (real plus pseudo-words, plus connected text). They inform placement and the teacher view; they never lock a child out. Thresholds are **DR**.', '',
  row('Checkpoint', 'After unit', 'Items', 'Pass', 'Leads to'), row('---', '---', '---', '---', '---'));
for (const c of CHECKPOINTS) p(row(c.name, c.after, c.items, c.pass, c.then));
p('', `**Cumulative review points** (weekly/monthly mixed review of everything taught, on top of the half-life scheduler): after units ${REVIEW_POINTS.join(', ')}.`, '');

p('## 8. Content production spec and definition of done', '',
  'A unit is **done** when all of the following hold (enforced by `node tools/validate.mjs` unless marked manual):', '',
  '1. Every GPC is in `gpcs.mjs` with phoneme, example bank, position rules and lures.',
  '2. >= 6 real words per new GPC, >= 3 silly (pseudo) words per unit, each decodable with only taught GPCs and tricky words.',
  '3. >= 2 one-GPC lure strings per word (for the "which is right" tasks).',
  '4. Tricky words listed once, with the odd part marked.',
  '5. >= 1 contrast pack where a Japanese-hard pair is complete; epenthesis pairs for every cluster unit.',
  '6. 2-3 decodable stories, <= 6 pages, <= 8 words per sentence, >= 30% of content words using the unit\'s GPCs, with 2 comprehension questions.',
  '7. Audio recorded for every word, sentence, story page and question (manual; placeholder eSpeak until then).',
  '8. Pictures for concrete nouns (manual; emoji placeholders until then).',
  '9. Guess-bot simulation still passes; a headless play-through of the unit completes.',
  '10. Pilot check with 3+ children before the unit is called final (manual, **DR**).', '',
  `**Story themes** (vocabulary repeats within a theme): ${THEMES.map(t => `${t.id} (${t.ja}, from U${t.from})`).join(', ')}.`, '');

p('## 9. Engine and activity backlog', '',
  'Activities the course needs that are not built yet, in the order the units need them:', '');
const byUnit = [];
for (const u of COURSE) for (const a of KINDS[u.kind].activities.filter(a => a.includes('(new)'))) byUnit.push([a.replace(' (new)', ''), u.id]);
const first = new Map(); for (const [a, id] of byUnit) if (!first.has(a)) first.set(a, id);
p(row('Activity', 'First needed at unit'), row('---', '---'));
for (const [a, id] of first) p(row(a, id));
p('', '**Planned later (not blocking the course):** practice games per stage (Teach-Your-Monster-style mini games: sound hunt, word catch, spelling bridge), record-and-compare, teacher dashboard export, level placement test, a "stories library" browser, real artwork and recorded audio.', '');

p('## 10. Open decisions and pilot validation', '',
  '- **Placement:** short oral and letter-sound screen to skip Stage 0 / Stage 1 for learners who already know the alphabet (children in this context often do via romaji). **DR.**',
  '- **Pacing:** target 3-6 lessons per unit, 10-12 minutes each, 2-3 sessions per week. **DR.**',
  '- **Accent for aw/au, ar, or:** confirm with the recorded voice.',
  '- **th production** tolerated, recognition required: confirm with the ALT team.',
  '- **Alt-pronunciation order** (U30) may need to split once real error data exists.',
  '- **Pilot plan:** 6-10 children across grades 3-6 for 4 weeks; log lessons-to-mastery per unit, error types (epenthesis, r/l, b/v), and engagement; revise thresholds from data, never from intuition.', '');

fs.writeFileSync(path.join(root, 'docs', 'COURSE_PLAN.md'), L.join('\n') + '\n');
console.log(`wrote docs/COURSE_PLAN.md (${L.length} lines)`);
