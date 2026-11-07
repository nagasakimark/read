# Build log — status against `docs/BLUEPRINT.md`

_Last updated: 2026-11-07. Everything marked DR in the blueprint (design recommendation) is a starting value to validate with real children._

## How to run
`npx serve .` (or any static host; GitHub Pages works) → open `index.html`. Tests: `npm test` (validator, negative decodability tests, guess-bot simulations).
Headless playthrough: `node tools/play.mjs <lessons> <accuracy> <skipToUnit>` (needs Playwright + Chrome); `node tools/smoke2.mjs` (screens, persistence, offline).

## Status by blueprint area
| Area | Status | Notes |
|---|---|---|
| Game feel, canvas only | **Done** | One `<canvas>`, 1366×598 letterboxed stage, hi-DPI, no DOM UI. Procedural monster mascot with mouth cues, particles, tweens, SFX. |
| Single-click interaction | **Done** | Pointer Events, taps only. Tiles are tap-to-place (no drag). |
| Curriculum as data | **Done** | `curriculum/src/*.mjs` → `curriculum/*.json`; Units 0–9 (Stage 0 + 37 GPCs incl. sh/ch/th and final ng/nk, 18 tricky words, 321 words, 21 stories, 19 dictation sentences). Remaining Stage 2+ (blends, long vowels, vowel teams) not written yet. |
| Build-time decodability validator | **Done** | `tools/validate.mjs` (stories/sentences 100% decodable, contrast packs differ by one GPC, coverage, silly-word rule) + `tools/test_validator.mjs` negative tests. |
| Mastery ladder + spaced review | **Done (engine)** | `src/learn/mastery.js`: six rungs, half-life model, reteach queue, gate. Thresholds are DR. |
| Lesson template | **Done** | `src/learn/lessonplan.js`; meet → retrieval → blend/spell/read-match → chains → silly words → heart words → dictation → close. |
| Activities | **Done** | listen-pick, recall-flash, minimal pair, blend-choose (monster sounds out, child picks the written word), read-match, silly words, spell tiles (Elkonin), word chains, heart words, dictation, story reader (3 reads), Stage 0 (first sounds, same/different, syllables). |
| Guess-bot exit criterion | **Done** | `tools/guessbot.mjs`: random / always-first / always-last never reach rung 4 or pass a unit; 85% learner finishes Units 0–9 in ≈94 lessons, 60% learner is held back. |
| Fatigue + session stop rules | **Done** | ≥4 wrong in last 6 → gentle stop; session length setting 8–20 min (teacher view). Evidence is kept either way. |
| Japanese EFL adaptations | **Partial** | No katakana, contrast packs, JA hints on tricky words, hiragana-only UI. Not yet: `r/l` listening discrimination drills beyond the packs, consonant-cluster/epenthesis practice (Stage 2+). |
| Rewards | **Done** | Sound-gem collection (mastered GPCs), monster hat per unit, star rating. No streaks, no loot boxes, no timers on rewards. |
| Persistence | **Done** | IndexedDB (localStorage fallback), profiles = monster colours (no names), progress code (copy/paste), JSON file export/import. |
| Offline / PWA | **Done** | `sw.js` precaches game + curriculum + audio; verified loading with the server down. Manifest present. Needs real PNG icons for installability on some browsers. |
| Teacher/parent view | **Done (v1)** | Rung bars per sound, current gate reasons, mix-ups, export/import, skip unit, reset, sound, session length. |
| Class / projector mode | **Done (v1)** | Big letters with mouth cue, tap-through sound-by-sound word blending. No progress recorded. |
| Audio | **Placeholder** | 969 keys, eSpeak voices — **replace with a human voice**: `tools/recorder.html` + `tools/apply_recordings.mjs`. Stops are clipped, continuants ≤0.9 s. |
| Pictures | **Placeholder** | Emoji (+ a hand-drawn mat). Replace with custom art; keep the `pic` field contract. |
| Speech recognition gating | **Deliberately absent** | Per blueprint. |

## Deviations from the blueprint (and why)
1. **Silly words from Unit 1** (blueprint: end of Unit 3). Needed so Units 1–2 GPCs can earn transfer evidence for rung 4.
2. **Lessons come from data + code template**, not fully hand-authored per lesson JSON (simpler to extend; revisit if teachers want hand-tuned lessons).
3. **Stage 0 is non-gating** (skippable, three short lessons).
4. **Rungs are sticky**: each rung needs its own evidence to be currently met, climbing from the rung already earned; only a *mastered* sound can drop (two recent direct errors). Without this an 85%-accurate child was stuck for 250+ lessons because five rolling windows had to hold simultaneously.
5. **Story evidence feeds the unit gate only**, not GPC rungs (stories are too forgiving).
6. **Reteach flags clear** after three correct answers in a row.
7. Word-level (apply) errors do **not** trigger forgetting; only direct sound evidence does (a wrong word blames several GPCs at once).

## Known gaps / next steps
- Human audio + custom pictures (biggest quality lever).
- More Stage 2 content: wh, CVCC/CCVC blends, long vowels (magic e), vowel teams, stories to match. (Unit 8 sh/ch/th shows the pattern: add GPCs/words/pack/stories to `curriculum/src/`, run `npm run build:curriculum && npm test && python3 tools/make_audio.py`.)
- Validate DR thresholds with a pilot class; log per-item accuracy/latency for review.
- PNG icons; Chromebook fullscreen button; keyboard accessibility for the teacher view.
- Pitch: real-children timing (the sim assumes one lesson per day).

## Bugs found by simulation (fixed)
- Confusion drills could hog a sound's practice forever (a repeatedly confused sound never got recall practice) → drills now fire ~35% of the time.
- Final-position recall pool leaked sounds from later units.
- Long dictation sentences overflowed the stage → tile size adapts.


## Course foundation pass (this session)

- Realigned authored content with the blueprint numbering: **Units 0-10** (U8 sh ch, U9 th voiced/unvoiced, U10 ng nk). 38 GPCs, 330 words, 24 tricky words, 24 stories, 21 sentences, 11 units.
- Added `curriculum/src/course.mjs`: the full **Stage 0-7, Unit 0-38** map (strands, exit milestones, unit kinds, GPC/IPA inventory, concepts, contrast packs, tricky words, prerequisites, checkpoints, review points, themes). Emitted as `curriculum/course.json`.
- `tools/validate.mjs` now checks course integrity (each GPC and tricky word taught once, prerequisites precede units, stages monotonic, authored units match the course map).
- `tools/build_course_doc.mjs` generates `docs/COURSE_PLAN.md` from the same data (pedagogy, Japanese plan, stage tables, lesson variants, checkpoints, definition of done, engine backlog, open decisions).
- Home screen is now a stage-paged map of all 39 units; unauthored units show "soon"; end of authored content shows "coming soon" instead of a trophy.
- Verification: validate 0 errors; guess-bot passes (perfect 71 lessons, 85% learner 92 lessons, 60% learner held back); headless smoke test clean.
- Next: author Units 11-16 (clusters need the new `cluster-segment` and epenthesis-listening activities), then Stage 4.

## Units 11-14: consonant clusters (this session)

- New engine concept: **cluster patterns** (`pat:nd$`, `pat:^st`) for units with no new letter-sounds. Units list `patterns` instead of `groups`; words get a `pat` list derived from their GPC sequence; every word question also credits its patterns; the unit gate needs each pattern at rung 4 (last 8 answers >= 7 correct across >= 2 activity types, DR).
- Words can carry a unit override (6th field) so cluster words unlock in their own unit even though their GPCs were taught earlier. Tier `epen` marks a word plus an extra vowel ("hando", "sutop"), used only in listening packs (`cp_epen_11..14`, validator checks they are exactly one inserted vowel) and never as real words or pseudo-words. `cp_l_r_14` adds blush/brush, plank/prank.
- Authored: U11 final clusters (nd nt mp st sk lk ft nch), U12 s-clusters, U13 l-clusters, U14 r-clusters; tricky words come, some, one, there, here, when, out, little. 564 words, 32 tricky, 36 stories, 34 sentences, 15 units. Audio regenerated (1,555 keys).
- **Bug found by simulation and fixed:** a unit could deadlock if a story question was missed, because practice lessons never offered the story again. Practice lessons now re-offer unread / unanswered stories.
- Verification: validate 0 errors; random/first/last bots never pass; perfect learner finishes in 97 lessons; 85% learner in 139; 60% learner held back; headless play of Unit 11 clean.
- Next: Unit 15 (three-consonant onsets + -ing) and Unit 16 (-ed, compounds; `-ed` needs a word-sum activity and /t/ /d/ /ɪd/ sorting), then Stage 4.
