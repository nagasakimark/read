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
| Curriculum as data | **Done** | `curriculum/src/*.mjs` → `curriculum/*.json`; Units 0–7 (Stage 0 + 32 GPCs, 16 tricky words, 241 words, 15 stories, 13 dictation sentences). Stages 2+ (vowel teams, etc.) not written yet. |
| Build-time decodability validator | **Done** | `tools/validate.mjs` (stories/sentences 100% decodable, contrast packs differ by one GPC, coverage, silly-word rule) + `tools/test_validator.mjs` negative tests. |
| Mastery ladder + spaced review | **Done (engine)** | `src/learn/mastery.js`: six rungs, half-life model, reteach queue, gate. Thresholds are DR. |
| Lesson template | **Done** | `src/learn/lessonplan.js`; meet → retrieval → blend/spell/read-match → chains → silly words → heart words → dictation → close. |
| Activities | **Done** | listen-pick, recall-flash, minimal pair, blend-choose (monster sounds out, child picks the written word), read-match, silly words, spell tiles (Elkonin), word chains, heart words, dictation, story reader (3 reads), Stage 0 (first sounds, same/different, syllables). |
| Guess-bot exit criterion | **Done** | `tools/guessbot.mjs`: random / always-first / always-last never reach rung 4 or pass a unit; 85% learner finishes Units 0–7 in ≈67 lessons, 60% learner is held back. |
| Fatigue + session stop rules | **Done** | ≥4 wrong in last 6 → gentle stop; session length setting 8–20 min (teacher view). Evidence is kept either way. |
| Japanese EFL adaptations | **Partial** | No katakana, contrast packs, JA hints on tricky words, hiragana-only UI. Not yet: `r/l` listening discrimination drills beyond the packs, consonant-cluster/epenthesis practice (Stage 2+). |
| Rewards | **Done** | Sound-gem collection (mastered GPCs), monster hat per unit, star rating. No streaks, no loot boxes, no timers on rewards. |
| Persistence | **Done** | IndexedDB (localStorage fallback), profiles = monster colours (no names), progress code (copy/paste), JSON file export/import. |
| Offline / PWA | **Done** | `sw.js` precaches game + curriculum + audio; verified loading with the server down. Manifest present. Needs real PNG icons for installability on some browsers. |
| Teacher/parent view | **Done (v1)** | Rung bars per sound, current gate reasons, mix-ups, export/import, skip unit, reset, sound, session length. |
| Class / projector mode | **Done (v1)** | Big letters with mouth cue, tap-through sound-by-sound word blending. No progress recorded. |
| Audio | **Placeholder** | 757 keys, eSpeak voices — **replace with a human voice**: `tools/recorder.html` + `tools/apply_recordings.mjs`. Stops are clipped, continuants ≤0.9 s. |
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
- Stage 2 content: digraphs sh/ch/th/wh, CVCC/CCVC, long vowels, vowel teams, stories to match.
- Validate DR thresholds with a pilot class; log per-item accuracy/latency for review.
- PNG icons; Chromebook fullscreen button; keyboard accessibility for the teacher view.
- Pitch: real-children timing (the sim assumes one lesson per day).
