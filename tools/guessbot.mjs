#!/usr/bin/env node
// Guess-bot test (blueprint Phase 1 exit criterion): "a simulated random clicker never reaches
// rung 4 on any GPC". Also checks that a perfect learner CAN complete Units 1-7 and that a
// realistic ~85%-accurate learner progresses without an endless loop.
// Everything here uses the same pure modules as the game (mastery, questions, lesson planner).
import { loadCurriculumNode } from '../src/learn/loader.node.js';
import * as M from '../src/learn/mastery.js';
import * as Q from '../src/learn/questions.js';
import { planLesson, stepQuestions, practiceSpec } from '../src/learn/lessonplan.js';
import { makeRng } from '../src/learn/rng.js';

const C = loadCurriculumNode();
const DAY = 24 * 3600e3;

function runLesson(state, spec, rng, answer, clock) {
  const steps = planLesson(C, state, spec, rng, clock.now);
  const ctx = { used: new Set(), unit: spec.unit, now: clock.now };
  let nQ = 0;
  for (const step of steps) {
    if (step.type === 'story') {
      const st = C.stories[step.story];
      if (step.read === 1) M.recordStory(state, spec.unit, step.story, 1, { accuracy: answer.storyAccuracy(), now: clock.now });
      if (step.read === 3) M.recordStory(state, spec.unit, step.story, 3, { qOk: answer.storyQ(st.questions[0]), now: clock.now });
      else M.recordStory(state, spec.unit, step.story, step.read, { now: clock.now });
      continue;
    }
    ctx.now = clock.now;
    const qs = stepQuestions(C, state, step, rng, ctx);
    for (const q of qs) {
      const res = answer.q(q);
      clock.now += 20e3; nQ++;
      Q.applyResult(state, C, q, res, clock.now, M.record);
    }
    if (step.type === 'meet' && step.reteach) state.reteach = state.reteach.filter(id => id !== 'gpc:' + step.gpc);
  }
  M.completeLesson(C, state, spec, clock.now);
  return nQ;
}

function simulate(label, answer, { maxLessons, gapDays = 1, seed = 1 } = {}) {
  const rng = makeRng(seed);
  const state = M.newState();
  const clock = { now: Date.UTC(2026, 10, 9) };
  let lessons = 0, qs = 0;
  const perUnit = {};
  const peak = {};
  while (lessons < maxLessons) {
    const nxt = M.nextLesson(C, state);
    if (!nxt) break;
    const spec = nxt.kind === 'practice' ? practiceSpec(nxt.unit) : C.lessons[nxt.lessonId];
    qs += runLesson(state, spec, rng, answer(rng), clock);
    lessons++; perUnit[nxt.unit] = (perUnit[nxt.unit] || 0) + 1;
    for (const it of Object.values(state.items)) if (it.kind === 'gpc') peak[it.id] = Math.max(peak[it.id] || 0, it.rung);
    clock.now += gapDays * DAY;
  }
  const rungs = C.gpcList.filter(g => !['suffix', 'silent'].includes(g.type)).map(g => [g.id, state.items[M.keys.gpc(g.id)]?.rung ?? 0]);
  const unitsPassed = C.units.filter(u => M.isUnitPassed(state, u.id)).map(u => u.id);
  return { label, state, lessons, qs, rungs, peak, unitsPassed, perUnit, finished: !M.nextLesson(C, state) };
}

let failed = 0;
const check = (cond, msg) => { console.log((cond ? 'PASS ' : 'FAIL ') + msg); if (!cond) failed++; };

// ---- 1. random clickers (several seeds, several click strategies) must never master anything
const strategies = {
  'random': rng => ({ q: q => Q.simulateRandom(q, rng), storyAccuracy: () => 1, storyQ: sq => rng.int(1 + sq.distractors.length) === 0 }),
  'always-first-option': rng => ({ q: q => q.type === 'choice' ? { ok: q.answer === 0, lure: q.options[0].gpc, lat: 1200 } : Q.simulateRandom(q, rng), storyAccuracy: () => 1, storyQ: () => false }),
  'always-last-option': rng => ({ q: q => q.type === 'choice' ? { ok: q.answer === q.options.length - 1, lure: q.options.at(-1).gpc, lat: 1200 } : Q.simulateRandom(q, rng), storyAccuracy: () => 1, storyQ: () => false }),
};
for (const [name, mk] of Object.entries(strategies)) {
  let maxRung = 0, unitsPassed = 0, runs = 0;
  for (let seed = 1; seed <= 6; seed++) {
    const r = simulate(name, mk, { maxLessons: 120, seed });
    maxRung = Math.max(maxRung, ...Object.values(r.peak), 0);
    unitsPassed += r.unitsPassed.filter(u => u >= 1).length; runs++;
  }
  check(maxRung < M.K.mastered, `${name}: no GPC ever reaches rung ${M.K.mastered} at ANY point (peak rung seen = ${maxRung}, ${runs} runs x 120 lessons)`);
  check(unitsPassed === 0, `${name}: never passes a unit (units passed across runs = ${unitsPassed})`);
}

// ---- 2. perfect learner: can finish Units 0-7
const perfect = rng => ({ q: q => ({ ok: true, lat: 1200 }), storyAccuracy: () => 1, storyQ: () => true });
const p = simulate('perfect', perfect, { maxLessons: 450, gapDays: 1 });
check(p.finished, `perfect learner completes every unit (lessons: ${p.lessons}, questions: ${p.qs}, units passed: [${p.unitsPassed}])`);
console.log('      lessons per unit:', JSON.stringify(p.perUnit));
check(p.rungs.every(([, r]) => r >= M.K.mastered), `perfect learner masters every GPC (min rung ${Math.min(...p.rungs.map(x => x[1]))})`);

// ---- 3. realistic learner (~85% correct, errors are real confusions): still progresses
const real = rng => ({ q: q => { const ok = rng.chance(0.85); const res = { ok, lat: 1500 + rng.int(1500) };
  if (!ok && q.type === 'choice') { const w = q.options.map((_, i) => i).filter(i => i !== q.answer); res.lure = q.options[rng.pick(w)].gpc; } return res; },
  storyAccuracy: () => 0.92, storyQ: () => rng.chance(0.85) });
const rl = simulate('85%-learner', real, { maxLessons: 650, gapDays: 1, seed: 7 });
check(rl.finished, `85%-accurate learner completes every unit (lessons: ${rl.lessons}, units passed: [${rl.unitsPassed}])`);
console.log('      lessons per unit:', JSON.stringify(rl.perUnit));

// ---- 4. weak learner (60%): must NOT race ahead
const weak = rng => ({ q: q => ({ ok: rng.chance(0.6), lat: 2500 }), storyAccuracy: () => 0.8, storyQ: () => rng.chance(0.5) });
const wk = simulate('60%-learner', weak, { maxLessons: 60, gapDays: 1, seed: 3 });
console.log(`      60%-learner after 60 lessons: units passed [${wk.unitsPassed}]`);
check(wk.unitsPassed.filter(u => u >= 1).length <= 2, '60%-accurate learner is not rushed through the curriculum');

process.exit(failed ? 1 : 0);
