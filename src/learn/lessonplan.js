// Lesson planner (pure). Blueprint "Standard lesson template": warm-up retrieval -> sound focus ->
// new GPC -> blend -> encode -> tricky word -> connected text -> dictation -> close.
// Lessons are DATA (units.json) + this template; questions are generated lazily (adaptive).
import * as M from './mastery.js';
import * as Q from './questions.js';

const MAX_NEW = 2;   // blueprint pseudocode: maxNew = 2 (Stage 0-1)

/** Describe a lesson as an ordered list of steps. State is read for review/reteach decisions only. */
export function planLesson(C, state, lessonSpec, rng, now = Date.now()) {
  const { kind, unit } = lessonSpec;
  const u = C.unitById[unit];
  const steps = [];
  const packs = C.packs.filter(p => p.unit <= unit);
  const seenAny = Object.values(state.items).some(i => i.kind === 'gpc' && i.a.length);
  const retr = (n) => steps.push({ type: 'retrieval', n });

  if (kind === 'oral') {
    const set = lessonSpec.oralSet || 1;
    steps.push({ type: 'samediff', n: 6 }, { type: 'initial', n: set === 1 ? 6 : 8, set }, { type: 'syllable', n: 4 });
    steps.push({ type: 'close' });
    return steps;
  }

  if (kind === 'teach' && lessonSpec.newPats?.length) {
    // cluster lesson (no new letter-sounds): hear the extra-vowel contrast, then blend/spell words with the pattern
    const pats = lessonSpec.newPats;
    retr(6);
    const pk = packs.filter(p => p.unit === unit)[0];
    if (pk) steps.push({ type: 'minpair', pack: pk.id, n: 5 });
    steps.push({ type: 'blend', n: 5, focus: [], pats });
    steps.push({ type: 'spell', n: 4, focus: [], pats });
    steps.push({ type: 'readmatch', n: 2, focus: [], pats });
    if (C.sillyAt(unit).length >= 3) steps.push({ type: 'pseudo', n: 3, focus: [], pats });
    const tr = lessonSpec.newTricky || [];
    if (tr.length) steps.push({ type: 'heart', words: tr, intro: true });
    if (C.sentences.some(x => x.unit <= unit)) steps.push({ type: 'dictation', n: 1 });
    steps.push({ type: 'close' });
    return steps;
  }

  if (kind === 'teach') {
    if (seenAny) retr(6);
    const pack = packs.length ? packs.filter(p => p.unit === unit)[0] || rng.pick(packs) : null;
    if (pack) steps.push({ type: 'minpair', pack: pack.id, n: 5 });
    const reteach = state.reteach.filter(id => id.startsWith('gpc:')).map(id => id.slice(4)).filter(g => !lessonSpec.newGpcs.includes(g) && C.gpcs[g]).slice(0, 1);
    for (const g of lessonSpec.newGpcs.slice(0, MAX_NEW + 2)) steps.push({ type: 'meet', gpc: g });
    for (const g of reteach) steps.push({ type: 'meet', gpc: g, reteach: true });
    steps.push({ type: 'blend', n: 4, focus: lessonSpec.newGpcs });
    steps.push({ type: 'spell', n: 3, focus: lessonSpec.newGpcs });
    steps.push({ type: 'readmatch', n: 2, focus: lessonSpec.newGpcs });
    if (unit >= 2) steps.push({ type: 'chain', n: 2, focus: lessonSpec.newGpcs });
    if (unit >= 2 && C.sillyAt(unit).length >= 3) steps.push({ type: 'pseudo', n: 2, focus: lessonSpec.newGpcs });
    const tr = lessonSpec.newTricky || [];
    if (tr.length) steps.push({ type: 'heart', words: tr, intro: true });
    if (C.sentences.some(s => s.unit <= unit)) steps.push({ type: 'dictation', n: 1 });
    steps.push({ type: 'close' });
    return steps;
  }

  if (kind === 'consolidate' || kind === 'practice') {
    retr(10);
    const pack = packs.length ? rng.pick(packs) : null;
    if (pack) steps.push({ type: 'minpair', pack: pack.id, n: 4 });
    steps.push({ type: 'blend', n: 3, focus: u.newGpcs, pats: u.newPatterns, weak: true });
    steps.push({ type: 'readmatch', n: 3, focus: u.newGpcs, pats: u.newPatterns });
    if (u.newGpcs.length) steps.push({ type: 'chain', n: 3, focus: u.newGpcs });
    steps.push({ type: 'spell', n: 3, focus: u.newGpcs, pats: u.newPatterns, weak: true });
    if (C.sillyAt(unit).length >= 3) steps.push({ type: 'pseudo', n: 5, focus: u.newGpcs, pats: u.newPatterns });
    for (const s of lessonSpec.stories || []) steps.push({ type: 'story', story: s.id, read: s.read });
    if (kind === 'practice') {   // gate needs stories read well and questions answered: offer them again if still unmet
      const us = M.unitState(state, unit);
      for (const id of u.stories || []) {
        const rec = us.stories[id];
        if ((rec?.r1 ?? 0) < M.K.storyAccuracy) steps.push({ type: 'story', story: id, read: 1 });
        if (rec?.q !== true) steps.push({ type: 'story', story: id, read: 3 });
      }
    }
    const trk = C.trickyList.filter(t => t.release <= unit).map(t => t.id);
    if (trk.length) steps.push({ type: 'heart', words: trk.slice(-2), intro: false });
    if (C.sentences.some(s => s.unit <= unit)) steps.push({ type: 'dictation', n: 1 });
    steps.push({ type: 'close' });
    return steps;
  }

  // 'story' / 'review' lessons: connected text, with brief retrieval and transfer probes around it
  retr(5);
  for (const s of lessonSpec.stories || []) steps.push({ type: 'story', story: s.id, read: s.read });
  if (C.sillyAt(unit).length >= 3) steps.push({ type: 'pseudo', n: 4, focus: u.newGpcs, pats: u.newPatterns });
  steps.push({ type: 'spell', n: 2, focus: u.newGpcs, pats: u.newPatterns, weak: true });
  steps.push({ type: 'dictation', n: 1 });
  steps.push({ type: 'close' });
  return steps;
}

// ------------------------------------------------------------------ question builders per step
// Blueprint: errors influence future practice; mastery needs evidence of a specific kind per rung.
// Evidence a GPC needs next, by its current rung (0..6): recog -> recall -> apply -> transfer -> speed -> review.
export const NEEDS = ['recog', 'recall', 'apply', 'transfer', 'recall', 'apply', 'apply'];
const needScore = (state, g, req) => { const r = M.rungOf(state, M.keys.gpc(g)); return r === req ? 1 : r < req ? 0.5 : 0.1; };

function pickWords(C, state, unit, focus, n, rng, ctx, { req = 2, pictured = false, silly = false, pats = null } = {}) {
  let pool = silly ? C.sillyAt(unit) : C.wordsAt(unit, { names: false, functionWords: false });
  // Unit 1 has only a handful of words (s a m t): widen to names and small function words rather than starve practice.
  if (!silly && pool.filter(w => !pictured || w.pic).length < 6) pool = C.wordsAt(unit, { names: !pictured, functionWords: !pictured });
  if (pictured) pool = pool.filter(w => w.pic);
  const fresh = pool.filter(w => !ctx.used.has(w.id));
  const base = fresh.length >= Math.min(n, pool.length) ? fresh : pool;
  const scored = base.map(w => ({ w, s: w.g.reduce((a, g) => a + needScore(state, g, req) * (focus?.includes(g) ? 1.5 : 1), 0) / Math.sqrt(w.g.length) + rng.next() * 0.6 + (pats?.length && w.pat?.some(p => pats.includes(p)) ? 4 : 0) }))
    .sort((a, b) => b.s - a.s).map(o => o.w);
  const out = scored.slice(0, n);
  out.forEach(w => ctx.used.add(w.id));
  return out;
}

/** One question that gives GPC `g` the evidence its next rung needs. */
function questionForGpc(C, state, g, unit, rng, ctx) {
  const it = state.items[M.keys.gpc(g)];
  const rung = it ? it.rung : 0;
  const need = NEEDS[Math.min(rung, 6)];
  if (need === 'recog') return Q.listenPick(C, g, unit, rng, 3);
  if (need === 'recall') return Q.recallFlash(C, g, unit, rng, rung >= 2 ? 4 : 3);
  const withG = (pool) => pool.filter(w => w.g.includes(g));
  if (need === 'transfer') {
    const sw = withG(C.sillyAt(unit)).filter(w => !ctx.used.has(w.id));
    const any = sw.length ? sw : withG(C.sillyAt(unit));
    if (any.length) { const w = rng.pick(any); ctx.used.add(w.id); return Q.pseudoWord(C, w.id, unit, rng); }
  }
  // application evidence: rotate blend / spell / read-match so the 2-activity-types rule is met
  let words = withG(C.wordsAt(unit, { names: false, functionWords: false }));
  if (!words.length) words = withG(C.wordsAt(unit));
  if (!words.length) return Q.listenPick(C, g, unit, rng, 3);
  const fresh = words.filter(w => !ctx.used.has(w.id));
  const w = rng.pick(fresh.length ? fresh : words); ctx.used.add(w.id);
  ctx.rot = (ctx.rot || 0) + 1;
  const kinds = ['blend', 'spell', 'readmatch'];
  for (let k = 0; k < 3; k++) {
    const kind = kinds[(ctx.rot + k) % 3];
    const q = kind === 'blend' ? Q.blendChoose(C, w.id, unit, rng) : kind === 'spell' ? Q.spellTiles(C, w.id, unit, rng)
      : (w.pic ? Q.readMatchPicture(C, w.id, unit, rng) : null);
    if (q) return q;
  }
  return Q.blendChoose(C, w.id, unit, rng);
}

/** Build the questions for a question-style step. ctx = { used:Set, unit, now } */
export function stepQuestions(C, state, step, rng, ctx) {
  const unit = ctx.unit, out = [];
  const push = q => { if (q) out.push(q); };
  switch (step.type) {
    case 'retrieval': {
      // Priority: reteach -> GPCs still climbing the ladder (lowest rung first) -> due for review -> everything else seen.
      const seen = Object.values(state.items).filter(i => (i.kind === 'gpc' || i.kind === 'tricky') && i.a.length && C.gpcs[i.id.slice(4)]?.type !== 'suffix'
        && (i.kind === 'tricky' ? (C.tricky[i.id.slice(3)]?.release ?? 99) : (C.gpcs[i.id.slice(4)]?.unit ?? 99)) <= unit);
      const rank = i => (state.reteach.includes(i.id) ? -2 : i.kind === 'gpc' && i.rung < M.K.mastered ? -1 : 0);
      const sorted = seen.map(i => ({ i, k: rank(i), p: M.recallProb(i, ctx.now), r: i.rung }))
        .sort((a, b) => a.k - b.k || (a.k === -1 ? a.r - b.r : 0) || a.p - b.p || rng.next() - 0.5).map(o => o.i);
      const conf = M.confusionPairs(state);
      let ti = 0;
      for (const it of sorted) {
        if (out.length >= step.n) break;
        const id = it.id.replace(/^\w+:/, '');
        if (it.kind === 'gpc') {
          const force = conf.find(c => c.pair[0] === id)?.pair[1];
          if (force && it.rung < 2 && rng.chance(0.35)) push(Q.listenPick(C, id, unit, rng, 3, force));
          else { push(questionForGpc(C, state, id, unit, rng, ctx)); if (it.rung < 2 && out.length < step.n) push(questionForGpc(C, state, id, unit, rng, ctx)); }
        } else if (ti < 2) push((ti++ % 2) ? Q.heartBuild(C, id, unit, rng) : Q.trickyChoose(C, id, unit, rng));
      }
      break;
    }
    case 'minpair': { const p = C.packs.find(x => x.id === step.pack); for (let i = 0; i < step.n; i++) push(Q.minimalPair(C, p, rng)); break; }
    case 'blend': for (const w of pickWords(C, state, unit, step.focus, step.n, rng, ctx, { req: 2, pats: step.pats })) push(Q.blendChoose(C, w.id, unit, rng)); break;
    case 'spell': for (const w of pickWords(C, state, unit, step.focus, step.n, rng, ctx, { req: 2, pats: step.pats })) push(Q.spellTiles(C, w.id, unit, rng)); break;
    case 'readmatch': for (const w of pickWords(C, state, unit, step.focus, step.n + 2, rng, ctx, { pictured: true, req: 2, pats: step.pats })) { if (out.length < step.n) push(Q.readMatchPicture(C, w.id, unit, rng)); } break;
    case 'chain': { const qs = Q.wordChains(C, unit, rng, step.n + 1, step.focus); qs.forEach(push); break; }
    case 'pseudo': for (const w of pickWords(C, state, unit, step.focus, step.n, rng, ctx, { silly: true, req: 3, pats: step.pats })) push(Q.pseudoWord(C, w.id, unit, rng)); break;
    case 'heart': for (const id of step.words) { push(Q.trickyChoose(C, id, unit, rng)); push(Q.heartBuild(C, id, unit, rng)); } break;
    case 'dictation': {
      const pool = C.sentences.filter(s => s.unit <= unit).sort((a, b) => b.unit - a.unit);
      const top = pool.filter(s => s.unit === pool[0]?.unit && !ctx.used.has(s.text));
      const s = rng.pick(top.length ? top : pool);
      if (s) { ctx.used.add(s.text); push(Q.dictation(C, s.text, unit, rng, s.pic)); }
      break;
    }
    case 'samediff': for (let i = 0; i < step.n; i++) push(Q.sameDifferent(C, rng, C.packs)); break;
    case 'initial': for (let i = 0; i < step.n; i++) push(Q.initialSound(C, rng, step.set)); break;
    case 'syllable': for (let i = 0; i < step.n; i++) push(Q.syllableTap(C, rng)); break;
    case 'meet': {
      const g = step.gpc;
      push(Q.listenPick(C, g, unit, rng, 3)); push(Q.recallFlash(C, g, unit, rng, 3));
      push(Q.listenPick(C, g, unit, rng, 3)); push(Q.recallFlash(C, g, unit, rng, 4));
      break;
    }
  }
  return out;
}

/** Virtual lesson spec for generated practice lessons ("repeat until mastery"). */
export function practiceSpec(unit) { return { id: `P${unit}`, unit, kind: 'practice', newGpcs: [], newTricky: [], stories: [] }; }
