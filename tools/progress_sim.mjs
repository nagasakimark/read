// Fast headless progression check: plays lessons with a simulated child (accuracy p) using the real planner,
// question builders and mastery model, and reports how many lessons each unit takes. Usage: node tools/progress_sim.mjs [p=0.9] [lessons=120] [hoursBetween=20]
import { loadCurriculumNode } from '../src/learn/loader.node.js';
import * as L from '../src/learn/lessonplan.js';
import * as M from '../src/learn/mastery.js';
import * as Q from '../src/learn/questions.js';
import { makeRng } from '../src/learn/rng.js';
const C = loadCurriculumNode();
const P = +(process.argv[2] ?? 0.9), N = +(process.argv[3] ?? 120), GAP = +(process.argv[4] ?? 20);
const rng = makeRng(7), state = M.newState({});
let now = Date.now(); const per = {}; const seq = [];
for (let i = 0; i < N; i++) {
  const nx = M.nextLesson(C, state); if (!nx) break;
  const spec = nx.kind === 'practice' ? L.practiceSpec(nx.unit) : C.lessons[nx.lessonId];
  const steps = L.planLesson(C, state, spec, rng, now);
  const ctx = { used: new Set(), unit: spec.unit, now };
  let qn = 0;
  for (const st of steps) {
    if (st.type === 'close') break;
    if (st.type === 'story') { if (st.read === 1) M.recordStory(state, spec.unit, st.story, 1, { accuracy: 0.95, now }); else if (st.read === 3) M.recordStory(state, spec.unit, st.story, 3, { qOk: rng.next() < P, now }); else M.recordStory(state, spec.unit, st.story, st.read, { now }); continue; }
    if (st.type === 'concept') continue;
    for (const q of L.stepQuestions(C, state, st, rng, ctx)) { now += 8000; qn++;
      const ok = rng.next() < P; Q.applyResult(state, C, q, { ok, lat: 1500, tokOk: q.tokens?.map(() => ok) }, now, M.record); }
  }
  if (spec.kind === "practice" && process.env.DBG) console.log(spec.unit, M.gateStatus(C, state, spec.unit, now).reasons.join("; "));
  M.completeLesson(C, state, spec, now);
  (per[spec.unit] ??= []).push(spec.kind[0] + qn);
  now += GAP * M.HOUR / 2;
}
for (const [u, l] of Object.entries(per)) console.log('unit', u.padStart(2), String(l.length).padStart(3), 'lessons', l.join(' '));
const stuck = M.nextLesson(C, state); if (stuck) console.log('now at', stuck, M.gateStatus(C, state, stuck.unit, now).reasons.slice(0, 6));
