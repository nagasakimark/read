// Mastery ladder + spaced-review scheduler. Pure logic (no DOM). Blueprint section
// "Mastery requires a ladder of evidence, not a streak of taps". Every threshold is a
// DR (design recommendation -- validate with real children); constants are collected in K.
export const HOUR = 3600e3;
export const K = {
  recogWindow: 5, recogNeed: 4, recogMinOptions: 3,        // rung 1
  recallWindow: 5, recallNeed: 4,                          // rung 2
  applyWindow: 10, applyNeed: 9, applyMinActs: 2,          // rung 3
  transferWindow: 5, transferNeed: 4,                      // rung 4
  autoLatencyMs: 2000, autoWindow: 5,                      // rung 5
  retentionHours: 24,                                      // rung 6
  mastered: 4,                                             // rung >= 4 = "mastered" (blueprint)
  hlStart: 12, hlMin: 4, hlMax: 24 * 90,                   // half-life hours (hand-tuned)
  dueBelow: 0.85, gateMinRecall: 0.6,                      // scheduler / gate
  storyAccuracy: 0.9, maxAttempts: 80,
};
export const CONSTRUCTED = new Set(['spell-tiles', 'word-chain', 'dictation', 'heart-build']);

export const keys = { gpc: id => 'gpc:' + id, tricky: id => 'tr:' + id, pack: id => 'pack:' + id, oral: id => 'oral:' + id };

export function newState(profile = {}) {
  return { v: 1, profile, created: Date.now(), items: {}, units: {}, confusions: {}, reteach: [],
    settings: { sessionMin: 12 }, stats: { sessions: 0, secondsPlayed: 0 } };
}

// Keep the most recent attempts PER evidence type, so a flood of application attempts (every word
// credits every GPC in it) can never push recognition/recall evidence out of its window.
const KEEP = { recog: 12, recall: 14, apply: 24, transfer: 12 };
function trimAttempts(it) {
  const seen = {}, keep = new Array(it.a.length).fill(true);
  for (let i = it.a.length - 1; i >= 0; i--) { const ev = it.a[i].ev; seen[ev] = (seen[ev] || 0) + 1; if (seen[ev] > (KEEP[ev] ?? K.maxAttempts)) keep[i] = false; }
  if (keep.some(x => !x)) it.a = it.a.filter((_, i) => keep[i]);
}

export function getItem(state, id, kind) {
  return (state.items[id] ??= { id, kind, first: null, last: null, hl: K.hlStart, a: [], r4: null, rung: 0 });
}

const lastN = (a, pred, n) => { const r = []; for (let i = a.length - 1; i >= 0 && r.length < n; i--) if (pred(a[i])) r.push(a[i]); return r; };
const sum = arr => arr.reduce((s, x) => s + x.ok, 0);
const median = arr => { const s = arr.slice().sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

/** Highest rung (0..6) whose evidence (and all lower rungs' evidence) is currently satisfied. */
/** Is the evidence for gpc rung (idx+1) currently satisfied? conds[0] = rung 1 ... conds[5] = rung 6. */
export function gpcConds(it) {
  const a = it.a;
  const rec = lastN(a, x => x.ev === 'recog' && x.o >= K.recogMinOptions, K.recogWindow);
  const rcl = lastN(a, x => x.ev === 'recall', K.recallWindow);
  const app = lastN(a, x => x.ev === 'apply', K.applyWindow);
  const tr = lastN(a, x => x.ev === 'transfer', K.transferWindow);
  const lat = lastN(a, x => x.ev === 'recall' && x.ok && x.lat != null, K.autoWindow);
  return [
    rec.length >= K.recogWindow && sum(rec) >= K.recogNeed,
    rcl.length >= K.recallWindow && sum(rcl) >= K.recallNeed,
    app.length >= K.applyWindow && sum(app) >= K.applyNeed && new Set(app.map(x => x.act)).size >= K.applyMinActs,
    tr.length >= K.transferWindow && sum(tr) >= K.transferNeed,
    lat.length >= K.autoWindow && median(lat.map(x => x.lat)) <= K.autoLatencyMs,
    it.r4 != null && a.some(x => x.ok && x.t >= it.r4 + K.retentionHours * HOUR && (x.ev === 'recall' || x.ev === 'apply' || x.ev === 'transfer')),
  ];
}

export function computeRung(it) {
  const a = it.a;
  if (it.kind === 'gpc') {
    const c = gpcConds(it); let r = 0;
    while (r < 6 && c[r]) r++;
    return r;
  }
  if (it.kind === 'tricky') {
    const l8 = lastN(a, () => true, 8);
    const built = l8.some(x => x.ok && CONSTRUCTED.has(x.act));
    const mastered = l8.length >= 8 && sum(l8) >= 7 && built && new Set(l8.map(x => x.act)).size >= 2;
    if (!mastered) return sum(lastN(a, () => true, 5)) >= 3 ? 2 : (a.length ? 1 : 0);
    if (it.r4 != null && a.some(x => x.ok && x.t >= it.r4 + K.retentionHours * HOUR)) return 6;
    return 4;
  }
  if (it.kind === 'pat') {   // consonant-cluster pattern: accuracy over word-level evidence (DR)
    const l8 = lastN(a, () => true, 8);
    if (l8.length >= 8 && sum(l8) >= 7 && new Set(l8.map(x => x.act)).size >= 2) return 4;
    return sum(lastN(a, () => true, 5)) >= 3 ? 2 : (a.length ? 1 : 0);
  }
  // pack / oral items: accuracy over the last 10 (reported to teachers; not a hard gate)
  const l10 = lastN(a, () => true, 10);
  if (l10.length >= 8 && sum(l10) / l10.length >= 0.8) return 4;
  return a.length >= 3 ? 2 : (a.length ? 1 : 0);
}

/** Record one piece of evidence and update half-life, confusions and rung. */
export function record(state, id, kind, r) {
  const t = r.t ?? Date.now();
  const it = getItem(state, id, kind);
  it.first ??= t;
  it.a.push({ t, ok: r.ok ? 1 : 0, ev: r.ev, act: r.act, o: r.opts || 0, lat: r.lat ?? null });
  trimAttempts(it);
  // blueprint: weight = 1 for constructed, (1 - 1/options) for choices (discount guessing)
  const w = CONSTRUCTED.has(r.act) ? 1 : (r.opts > 1 ? 1 - 1 / r.opts : 0.5);
  if (r.ok) it.hl = Math.min(K.hlMax, it.hl * (w >= 0.66 ? 2.0 : 1.4));
  else it.hl = Math.max(K.hlMin, it.hl / 2);
  it.last = t;
  if (!r.ok && r.lure) { const ck = `${id.replace(/^\w+:/, '')}>${r.lure}`; state.confusions[ck] = (state.confusions[ck] || 0) + 1; }
  const prev = it.rung;
  // Rungs are STICKY once earned (a rolling window of 5-10 answers would otherwise make a conjunction of
  // five windows almost impossible for a real, imperfect child), but forgetting is detected: two errors in
  // the last three attempts drops the rung back to what the current evidence supports. (DR - validate.)
  const cand = computeRung(it);
  // only DIRECT evidence (recognition/recall/transfer) signals forgetting; word-level errors blame many GPCs at once
  const lastErr = lastN(it.a, x => x.ev !== 'apply', 3).filter(x => !x.ok).length;
  if (it.kind === 'gpc') {
    // Ladder climbs from the rung already earned: each next rung needs ITS OWN evidence to be currently met
    // (requiring every lower window to hold simultaneously would be nearly impossible for an 85%-accurate child).
    const c = gpcConds(it); let r = it.rung;
    while (r < 6 && c[r]) r++;
    if (r > it.rung) it.rung = r;
    else if (lastErr >= 2 && it.rung >= K.mastered && cand < it.rung) it.rung = cand;
  } else if (cand >= it.rung) it.rung = cand;
  if (it.rung >= K.mastered && it.r4 == null) { it.r4 = t; it.rung = Math.max(it.rung, computeRung(it)); }
  if (it.rung < K.mastered) it.r4 = null;                    // forgotten: restart the retention clock
  // blueprint: 2 errors this session or a failed delayed review -> RETEACH micro-lesson
  if (!r.ok && kind !== 'oral' && kind !== 'pack') {
    const recentErr = lastN(it.a, () => true, 4).filter(x => !x.ok).length;
    const delayedFail = prev >= K.mastered && it.rung < K.mastered;
    if ((recentErr >= 2 || delayedFail) && !state.reteach.includes(id)) state.reteach.push(id);
  }
  // a reteach flag is lifted once the learner answers the item correctly three times running
  if (r.ok && state.reteach.includes(id) && lastN(it.a, () => true, 3).length === 3 && lastN(it.a, () => true, 3).every(x => x.ok))
    state.reteach = state.reteach.filter(x => x !== id);
  return it;
}

export function recallProb(it, now = Date.now()) {
  if (!it || it.last == null) return 0;
  return Math.pow(2, -(now - it.last) / (it.hl * HOUR));
}
export const rungOf = (state, id) => state.items[id]?.rung ?? 0;
export const isMastered = (state, id) => rungOf(state, id) >= K.mastered;

// ------------------------------------------------------------------ units and gate
export function unitState(state, uid) {
  return (state.units[uid] ??= { passed: false, lessonsDone: {}, stories: {} });
}

/** Blueprint gate_open: new GPCs at rung>=4, story accuracy + questions, no decayed earlier GPC. */
export function gateStatus(C, state, uid, now = Date.now()) {
  const u = C.unitById[uid];
  const reasons = [];
  if (u.oral) {
    const it = state.items[keys.oral('initial')];
    if (!(it && it.rung >= K.mastered)) reasons.push('Listening: first-sound games not yet secure');
    return { open: reasons.length === 0, reasons };
  }
  for (const g of u.newGpcs) {
    const it = state.items[keys.gpc(g)];
    if (!it || it.rung < K.mastered) reasons.push(`${g}: rung ${it?.rung ?? 0}/${K.mastered}`);
  }
  for (const pt of u.newPatterns || []) {
    const it = state.items['pat:' + pt];
    if (!it || it.rung < K.mastered) reasons.push(`${pt}: rung ${it?.rung ?? 0}/${K.mastered}`);
  }
  if (u.stories.length) {
    const us = unitState(state, uid);
    const goodReads = u.stories.filter(s => (us.stories[s]?.r1 ?? 0) >= K.storyAccuracy).length;
    const qOk = u.stories.filter(s => us.stories[s]?.q === true).length;
    const needReads = Math.min(2, u.stories.length), needQ = u.mastery.questionsCorrect;
    if (goodReads < needReads) reasons.push(`stories read at >=90%: ${goodReads}/${needReads}`);
    if (qOk < needQ) reasons.push(`story questions correct: ${qOk}/${needQ}`);
  }
  for (const prior of C.units.filter(x => x.id >= 1 && x.id < uid)) for (const g of prior.newGpcs) {
    const it = state.items[keys.gpc(g)];
    if (!it || recallProb(it, now) < K.gateMinRecall) { reasons.push(`review needed: ${g}`); break; }
  }
  return { open: reasons.length === 0, reasons };
}

export function markLessonDone(C, state, lessonId, now = Date.now()) {
  const l = C.lessons[lessonId]; if (!l) return;
  const us = unitState(state, l.unit);
  us.lessonsDone[lessonId] = now;
  const lessonsAllDone = C.unitById[l.unit].lessons.every(x => us.lessonsDone[x.id]);
  if (!us.passed && lessonsAllDone && gateStatus(C, state, l.unit, now).open) { us.passed = true; us.passedAt = now; }
}

export function isUnitPassed(state, uid) { return !!state.units[uid]?.passed; }
/** Unit is playable when the previous unit passed. Stage 0 is optional ("brief, skippable"): Unit 1 is always open. */
export function isUnitOpen(C, state, uid) {
  if (uid <= 1) return true;
  return isUnitPassed(state, uid - 1);
}
export function skipUnit(state, uid, now = Date.now()) { const us = unitState(state, uid); us.passed = true; us.passedAt = now; us.skipped = true; }

/** The unit/lesson the big "Play" button should open. */
export function nextLesson(C, state) {
  for (const u of C.units) {
    if (u.id === 0 && !isUnitPassed(state, 0)) {
      // Stage 0 is brief and skippable (blueprint): offered first, never a gate. Once its three lessons are done
      // (or the child has started Unit 1) the path moves on, whether or not first-sound games are 'secure'.
      const us0 = unitState(state, 0);
      if (u.lessons.every(l => us0.lessonsDone[l.id])) continue;
      if (state.units[1] && Object.keys(state.units[1].lessonsDone || {}).length) continue;
    }
    if (isUnitPassed(state, u.id)) continue;
    if (!isUnitOpen(C, state, u.id)) return null;
    const us = unitState(state, u.id);
    const l = u.lessons.find(x => !us.lessonsDone[x.id]);
    if (l) return { lessonId: l.id, unit: u.id, kind: l.kind };
    // all lessons done but the gate is closed -> generated practice lesson (blueprint: repeat until mastery)
    return { lessonId: `P${u.id}_${(us.practiceCount || 0) + 1}`, unit: u.id, kind: 'practice' };
  }
  return null;
}

// ------------------------------------------------------------------ scheduler
/** Items due for review (recallProb < 0.85), lowest first. kinds: 'gpc' | 'tricky'. */
export function dueItems(state, { maxUnit, now = Date.now(), C }) {
  const out = [];
  for (const it of Object.values(state.items)) {
    if (it.kind !== 'gpc' && it.kind !== 'tricky') continue;
    const gid = it.id.replace(/^\w+:/, '');
    if (it.kind === 'gpc' && (C.gpcs[gid]?.unit ?? 99) > maxUnit) continue;
    if (it.kind === 'tricky' && (C.tricky[gid]?.release ?? 99) > maxUnit) continue;
    const p = recallProb(it, now);
    if (p < K.dueBelow) out.push({ it, p });
  }
  return out.sort((x, y) => x.p - y.p).map(x => x.it);
}

/** Pairs confused >=3 times (blueprint: add confusion-pair drills). */
export function confusionPairs(state, min = 3) {
  return Object.entries(state.confusions).filter(([, n]) => n >= min).map(([k, n]) => ({ pair: k.split('>'), n })).sort((a, b) => b.n - a.n);
}

/** Overall recent accuracy (for 1:8 vs 1:4 new:known ratio). */
export function recentAccuracy(state, n = 20) {
  const all = Object.values(state.items).flatMap(i => i.a).sort((x, y) => x.t - y.t).slice(-n);
  return all.length ? sum(all) / all.length : 1;
}

// ------------------------------------------------------------------ stories and lesson completion
/** read 1 = decode (accuracy = words read without tap-help), read 3 = comprehension question. */
export function recordStory(state, unitId, sid, read, { accuracy = null, qOk = null, now = Date.now() } = {}) {
  const us = unitState(state, unitId);
  const s = (us.stories[sid] ??= { reads: {} });
  s.reads[read] = now;
  if (read === 1 && accuracy != null) s.r1 = Math.max(s.r1 || 0, accuracy);
  if (qOk != null) s.q = s.q === true || qOk === true;
}

export function completeLesson(C, state, spec, now = Date.now()) {
  if (spec.kind === 'practice') { const us = unitState(state, spec.unit); us.practiceCount = (us.practiceCount || 0) + 1; }
  else markLessonDone(C, state, spec.id, now);
  // practice lessons also re-check the gate (blueprint: repeat until mastery, then progress)
  const us = unitState(state, spec.unit);
  if (!us.passed && gateStatus(C, state, spec.unit, now).open && C.unitById[spec.unit].lessons.every(l => us.lessonsDone[l.id])) { us.passed = true; us.passedAt = now; }
  state.stats.sessions++;
}
