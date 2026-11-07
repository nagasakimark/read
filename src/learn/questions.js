// Question generators (pure). Each returns a plain object the game scenes render and the
// guess-bot can answer. Blueprint "Activity taxonomy": every activity must require reading/hearing
// the target skill; evidence comes mostly from CONSTRUCTED responses (spell, chain, dictation).
import { keys } from './mastery.js';
import { tokenize, VOWELS } from './curriculum.js';

// Visually / aurally confusable letters, most useful lures first (blueprint: lures chosen from known confusions).
export const GPC_LURES = {
  s:['z','f','m'], a:['o','e','u'], m:['n','h','w'], t:['d','p','f'], i:['e','a','l'], n:['m','h','r'], p:['b','d','g'],
  o:['a','u','e'], d:['b','t','g'], g:['d','c','j'], c:['k','o','e'], k:['c','t','h'], e:['i','a','o'], u:['o','a','n'],
  r:['l','h','n'], h:['n','f','b'], b:['d','p','v'], f:['v','h','t'], l:['r','i','t'], j:['g','y','z'], v:['f','b','w'],
  w:['v','m','y'], x:['s','z','k'], y:['i','j','w'], z:['s','x','j'], qu:['g','p','d'],
  ee:['oo','ai','i'], oo:['ee','oa','u'], ai:['ee','oa','a'], oa:['oo','ai','o'], igh:['ee','i','ai'], ow_au:['oa','oo','oi'], oi:['ow_au','ai','oa'], oo_s:['oo','u','oa'], ar:['or','a','ur'], or:['ar','o','er'], ur:['er','or','ar'], er:['ur','ar','or'], air:['ear','ar','ai'], ear:['air','ee','er'], y_i:['ee','i','igh'], y_ai:['igh','y_i','i'],
  ff:['ll','ss','ck'], ll:['ff','ss','ck'], ss:['ff','ll','ck'], ck:['ll','ss','ff'], zz:['ss','ll','ff'], sz:['s','z','x'], sh:['s','ch','th'], thv:['th','d','z'], ng:['n','g','m'], nk:['ng','n','k'], ch:['sh','k','th'], th:['s','f','sh'],
};
const SYLL_WORDS = [ // [word, emoji, syllables] -- Stage 0 syllable awareness (pictures only; not decoded)
  ['cat','🐱',1],['dog','🐶',1],['sun','☀️',1],['fish','🐟',1],['bus','🚌',1],['pig','🐷',1],['egg','🥚',1],['hat','🎩',1],
  ['apple','🍎',2],['tiger','🐯',2],['panda','🐼',2],['rabbit','🐰',2],['monkey','🐵',2],['pizza','🍕',2],['robot','🤖',2],['zebra','🦓',2],
  ['banana','🍌',3],['elephant','🐘',3],['octopus','🐙',3],['umbrella','☂️',3],['tomato','🍅',3],['gorilla','🦍',3],['kangaroo','🦘',3],['dinosaur','🦖',3],
];
export const SYLL_BANK = SYLL_WORDS;

const dedupe = (arr, f = x => x) => { const s = new Set(); return arr.filter(x => { const k = f(x); if (s.has(k)) return false; s.add(k); return true; }); };
const SILENT_IDS = new Set(['e_s']);   // the silent e of a split digraph earns no evidence of its own
const lab = g => (g.type === 'split' ? g.g + '_e' : g.g);   // how a GPC is shown on a card
const credits = (ids, kind = 'gpc') => dedupe(ids).filter(id => !SILENT_IDS.has(id)).map(id => ({ id: kind === 'gpc' ? keys.gpc(id) : id, kind }));
const wcredits = w => [...credits(w.g), ...(w.pat || []).map(p => ({ id: 'pat:' + p, kind: 'pat' }))];
const place = (rng, correct, others) => { const opts = rng.shuffle([{ ...correct, _ok: true }, ...others]); return { options: opts, answer: opts.findIndex(o => o._ok) }; };

// ------------------------------------------------------------------ GPC recognition / recall
export function gpcLureIds(C, id, unit, rng, n, force = null) {
  const tgt = C.gpcs[id];
  const ok = x => x !== id && C.gpcs[x] && C.gpcs[x].unit <= unit && C.gpcs[x].ph.join() !== tgt.ph.join() && C.gpcs[x].g !== tgt.g;
  const pool = (GPC_LURES[id] || []).filter(ok);
  const out = [];
  if (force && ok(force)) out.push(force);
  for (const x of pool) if (out.length < n && !out.includes(x)) out.push(x);
  const rest = rng.shuffle(C.gpcsUpTo(unit).map(g => g.id).filter(x => ok(x) && !out.includes(x) && (tgt.type === 'doubled' || tgt.type === 'digraph-final' ? C.gpcs[x].type !== 'single' || out.length >= 1 : true)));
  if (VOWELS.has(id) && unit >= 17) rest.sort((a, b) => (VOWELS.has(b) ? 1 : 0) - (VOWELS.has(a) ? 1 : 0));   // vowel teams: vowel lures first
  for (const x of rest) if (out.length < n) out.push(x);
  // two different GPCs with the same grapheme (s / sz) must not both appear
  return dedupe(out, x => C.gpcs[x].g).filter(x => C.gpcs[x].g !== tgt.g).slice(0, n);
}

export function listenPick(C, id, unit, rng, n = 3, force = null) {
  const lures = gpcLureIds(C, id, unit, rng, n - 1, force);
  const { options, answer } = place(rng, { label: lab(C.gpcs[id]), gpc: id }, lures.map(l => ({ label: lab(C.gpcs[l]), gpc: l })));
  return { type: 'choice', act: 'listen-pick', ev: 'recog', skill: 'gpc', item: keys.gpc(id), gpc: id,
    prompt: { audio: ['gpc:' + id], replay: true }, options, answer, opts: options.length, credits: credits([id]) };
}

export function recallFlash(C, id, unit, rng, n = 4) {
  const g = C.gpcs[id];
  const pos = g.vbank ? 'inside' : g.bank ? 'initial' : 'final';
  const bank = g.vbank || g.bank || g.fbank;
  const ans = rng.pick(bank);
  let pool = [];
  if (pos === 'inside') {   // vowel sounds: pictured words that contain the sound vs words with other vowel sounds
    pool = C.gpcList.filter(x => (x.vbank || (VOWELS.has(x.id) && x.bank)) && x.id !== id && x.ph.join() !== g.ph.join() && x.unit <= Math.max(unit, 4))
      .flatMap(x => (x.vbank || x.bank).filter(b => !b[0].includes(g.g)).map(b => ({ b, gpc: x.id })));
    pool = dedupe(rng.shuffle(pool), p => p.gpc);
  } else if (pos === 'initial') {
    pool = C.gpcList.filter(x => x.bank && x.ph.join() !== g.ph.join() && x.unit <= Math.max(unit, 3)).flatMap(x => rng.sample(x.bank, 1).map(b => ({ b, gpc: x.id })));
  } else {
    pool = C.gpcList.filter(x => x.fbank && x.unit <= unit && x.ph.join() !== g.ph.join()).flatMap(x => rng.sample(x.fbank, 1).map(b => ({ b, gpc: x.id })));
    if (id === 'sz') pool = pool.concat(C.meta.sFinalBank.map(b => ({ b, gpc: 's' })));
    if (id === 'sz') pool = pool.filter(p => p.gpc === 's');
  }
  const others = rng.sample(pool, n - 1).map(p => ({ pic: p.b[1], word: p.b[0], audio: 'b:' + p.b[0], gpc: p.gpc }));
  const { options, answer } = place(rng, { pic: ans[1], word: ans[0], audio: 'b:' + ans[0], gpc: id }, others);
  // 's' alone is ambiguous (/s/ or /z/): show it inside a plural word so the child recalls how THIS s sounds
  const ctxWord = id === 'sz' ? rng.pick(C.wordList.filter(w => w.g.at(-1) === 'sz' && w.tier !== 'silly' && w.id !== ans[0]).map(w => w.t)) : null;
  return { type: 'choice', act: 'recall-flash', ev: 'recall', skill: 'gpc', item: keys.gpc(id), gpc: id,
    prompt: { grapheme: lab(g), position: pos, ...(ctxWord ? { context: ctxWord } : {}) }, options, answer, opts: options.length, credits: credits([id]), timed: true };
}

// ------------------------------------------------------------------ minimal pairs (listening; blueprint "essential for Japanese learners")
export function minimalPair(C, pack, rng) {
  const set = rng.pick(pack.sets);
  const target = rng.pick(set);
  const picOK = set.every(w => C.words[w]?.pic);
  const options = rng.shuffle(set).map(w => ({ word: w, label: C.words[w].t, ...(picOK ? { pic: C.words[w].pic } : {}) }));
  return { type: 'choice', act: 'minimal-pair', ev: 'recog', skill: 'contrast', item: keys.pack(pack.id), pack: pack.id,
    prompt: { audio: ['w:' + target], replay: true }, options, answer: options.findIndex(o => o.word === target), opts: options.length,
    credits: [{ id: keys.pack(pack.id), kind: 'pack' }], target };
}

// ------------------------------------------------------------------ blending / reading
export function blendChoose(C, wordId, unit, rng) {
  const w = C.words[wordId];
  const muts = rng.shuffle(C.mutations(wordId, unit));
  const real = muts.filter(m => m.real), fake = muts.filter(m => !m.real);
  const lures = [];
  const takePos = (list) => { for (const m of list) if (lures.length < 2 && !lures.some(l => l.text === m.text) && !lures.some(l => l.pos === m.pos && list.some(z => z.pos !== m.pos && !lures.some(q => q.text === z.text)))) lures.push(m); };
  takePos(real); takePos(fake); for (const m of muts) if (lures.length < 2 && !lures.some(l => l.text === m.text)) lures.push(m);
  const { options, answer } = place(rng, { label: w.t, word: wordId }, lures.map(m => ({ label: m.text })));
  return { type: 'choice', act: 'blend-choose', ev: 'apply', skill: 'decode', item: 'word:' + wordId, word: wordId,
    prompt: { talk: w.g.map(g => 'gpc:' + g), audio: [], after: ['w:' + wordId], pic: w.pic, hidePicUntilAnswer: true }, options, answer, opts: options.length,
    credits: wcredits(w) };
}

export function readMatchPicture(C, wordId, unit, rng) {
  const w = C.words[wordId];
  const pictured = C.wordsAt(unit, { names: false, functionWords: false }).filter(x => x.pic && x.id !== wordId && x.pic !== w.pic);
  const sameFirst = rng.shuffle(pictured.filter(x => x.g[0] === w.g[0]));
  const rest = rng.shuffle(pictured.filter(x => x.g[0] !== w.g[0]));
  const lures = dedupe([...sameFirst, ...rest], x => x.pic).slice(0, 2);   // blueprint: lures share the initial letter
  if (lures.length < 2) return null;
  const { options, answer } = place(rng, { pic: w.pic, word: wordId }, lures.map(x => ({ pic: x.pic, word: x.id })));
  return { type: 'choice', act: 'read-match', ev: 'apply', skill: 'decode', item: 'word:' + wordId, word: wordId,
    prompt: { text: w.t, audio: [], after: ['w:' + wordId] }, options, answer, opts: options.length, credits: wcredits(w) };
}

export function pseudoWord(C, wordId, unit, rng) {
  const w = C.words[wordId];
  const muts = rng.shuffle(C.mutations(wordId, unit));
  const fake = muts.filter(m => !m.real), real = muts.filter(m => m.real);
  const lures = [];
  for (const m of [...fake, ...real]) if (lures.length < 2 && !lures.some(l => l.text === m.text) && !lures.some(l => l.pos === m.pos)) lures.push(m);
  for (const m of [...fake, ...real]) if (lures.length < 2 && !lures.some(l => l.text === m.text)) lures.push(m);
  const { options, answer } = place(rng, { label: w.t, word: wordId }, lures.map(m => ({ label: m.text })));
  return { type: 'choice', act: 'pseudo', ev: 'transfer', skill: 'decode', item: 'word:' + wordId, word: wordId,
    prompt: { audio: ['w:' + wordId], replay: true, monster: true }, options, answer, opts: options.length, credits: wcredits(w) };
}

// ------------------------------------------------------------------ encoding (constructed)
export function spellTiles(C, wordId, unit, rng, extra = 2) {
  const w = C.words[wordId];
  const slots = w.g.map(g => C.gpcs[g].g);
  const needPh = new Set(w.g.map(g => C.gpcs[g].ph.join()));
  const labels = new Set(slots);
  const tray = w.g.map(g => ({ gpc: g, label: C.gpcs[g].g }));
  const cand = [];
  for (const g of w.g) for (const l of (GPC_LURES[g] || [])) if (C.gpcs[l]?.unit <= unit && !labels.has(C.gpcs[l].g) && !needPh.has(C.gpcs[l].ph.join())) cand.push(l);
  for (const x of rng.shuffle(C.gpcsUpTo(unit).filter(x => x.type !== 'split').map(x => x.id))) if (!labels.has(C.gpcs[x].g) && !needPh.has(C.gpcs[x].ph.join())) cand.push(x);
  extra = Math.min(extra, Math.max(0, 7 - tray.length));   // one tray row holds 7 tiles at 1366px
  const used = new Set(); let added = 0;
  for (const l of cand) { if (added >= extra) break; if (used.has(C.gpcs[l].g)) continue; used.add(C.gpcs[l].g); tray.push({ gpc: l, label: C.gpcs[l].g }); added++; }
  return { type: 'build', act: 'spell-tiles', ev: 'apply', skill: 'encode', item: 'word:' + wordId, word: wordId,
    prompt: { audio: ['w:' + wordId], pic: w.pic, replay: true }, slots, tray: rng.shuffle(tray), opts: tray.length,
    sim: { steps: slots.map((_, i) => tray.length - i) }, credits: wcredits(w) };
}

export function heartBuild(C, trickyId, unit, rng) {
  const t = C.tricky[trickyId];
  const letters = t.parts.flatMap(p => p.replace('*', '').split(''));
  const hearts = t.parts.flatMap(p => p.replace('*', '').split('').map(() => p.startsWith('*')));
  const pool = 'abcdefghijklmnoprstuwy'.split('').filter(c => !letters.includes(c.toLowerCase()) && c !== 'I');
  const tray = [...letters.map(l => ({ label: l })), ...rng.sample(pool, 2).map(l => ({ label: l }))];
  return { type: 'build', act: 'heart-build', ev: 'apply', skill: 'tricky', item: keys.tricky(trickyId), tricky: trickyId,
    prompt: { audio: ['w:' + trickyId], replay: true }, slots: letters, hearts, tray: rng.shuffle(tray), opts: tray.length,
    sim: { steps: letters.map((_, i) => tray.length - i) }, credits: [{ id: keys.tricky(trickyId), kind: 'tricky' }] };
}

export function trickyChoose(C, trickyId, unit, rng) {
  const t = C.tricky[trickyId];
  const pool = [...C.trickyList.filter(x => x.release <= unit && x.id !== trickyId).map(x => x.t),
    ...C.wordsAt(unit, { names: false }).filter(w => w.tier === 'function' && w.id !== trickyId).map(w => w.t)];
  const sim = pool.sort((a, b) => (b[0] === t.t[0]) - (a[0] === t.t[0]) || Math.abs(a.length - t.t.length) - Math.abs(b.length - t.t.length));
  const lures = rng.sample(dedupe(sim.slice(0, 6), x => x.toLowerCase()), 2);
  if (lures.length < 2) return null;
  const { options, answer } = place(rng, { label: t.t }, lures.map(l => ({ label: l })));
  return { type: 'choice', act: 'tricky-choose', ev: 'recog', skill: 'tricky', item: keys.tricky(trickyId), tricky: trickyId,
    prompt: { audio: ['w:' + trickyId], replay: true }, options, answer, opts: options.length, credits: [{ id: keys.tricky(trickyId), kind: 'tricky' }] };
}

export function wordChains(C, unit, rng, len = 3, focus = []) {
  const real = C.wordsAt(unit, { names: false, functionWords: false });
  const adj = {};
  for (const w of real) adj[w.id] = C.realLures(w.id, unit).filter(m => !['name'].includes(m.real.tier) && m.real.tier !== 'function')
    .map(m => ({ to: m.real.id, pos: m.pos })).filter(e => adj[e.to] !== null);
  const starts = real.filter(w => adj[w.id].length && (!focus.length || w.g.some(g => focus.includes(g))));
  for (let tries = 0; tries < 40 && starts.length; tries++) {
    const path = [rng.pick(starts).id], steps = [];
    while (steps.length < len) {
      const cur = path[path.length - 1];
      const nxt = rng.shuffle(adj[cur].filter(e => !path.includes(e.to)));
      if (!nxt.length) break;
      steps.push({ from: cur, to: nxt[0].to, pos: nxt[0].pos }); path.push(nxt[0].to);
    }
    if (steps.length >= 2) return steps.map(s => chainStep(C, s, unit, rng));
  }
  return [];
}
export function chainStep(C, s, unit, rng) {
  const from = C.words[s.from], to = C.words[s.to];
  const newG = C.gpcs[to.g[s.pos]];
  const lures = gpcLureIds(C, to.g[s.pos], unit, rng, 2).filter(l => C.gpcs[l].g !== C.gpcs[from.g[s.pos]].g);
  const { options, answer } = place(rng, { label: lab(newG), gpc: newG.id }, lures.slice(0, 2).map(l => ({ label: lab(C.gpcs[l]), gpc: l })));
  return { type: 'chain', act: 'word-chain', ev: 'apply', skill: 'encode', item: 'word:' + s.to, from: s.from, to: s.to, pos: s.pos,
    start: from.g.map(g => C.gpcs[g].g), prompt: { audio: ['w:' + s.to], pic: to.pic, replay: true }, options, answer, opts: options.length,
    sim: { steps: [from.g.length, options.length] }, credits: credits([from.g[s.pos], to.g[s.pos]]) };
}

export function dictation(C, text, unit, rng, pic = '') {
  const toks = tokenize(text);
  const bank = toks.map(t => ({ key: t.key, label: t.raw.replace(/[.,!?"“”]/g, '') }));
  const decodables = toks.filter(t => C.classify(t.key, unit).kind === 'word').map(t => t.key);
  const lures = [];
  for (const k of rng.shuffle(decodables)) for (const m of rng.shuffle(C.realLures(k, unit))) if (lures.length < 2 && !bank.some(b => b.key === m.text) && !lures.some(l => l.key === m.text)) lures.push({ key: m.text, label: m.text });
  const tray = rng.shuffle([...bank, ...lures]);
  return { type: 'sentence', act: 'dictation', ev: 'apply', skill: 'encode', item: 'sent:' + text, text, tokens: toks.map(t => t.key),
    prompt: { audio: ['sent:' + text], pic, replay: true }, slots: bank.map(b => b.label), tray, opts: tray.length,
    sim: { steps: bank.map((_, i) => tray.length - i) }, credits: [] };
}

// ------------------------------------------------------------------ Stage 0 (oral, no print required)
const ORAL_SETS = { 1: ['s', 'm', 't', 'a'], 2: ['i', 'n', 'p', 'o', 'd'], 3: ['s', 'm', 't', 'a', 'i', 'n', 'p', 'o', 'd', 'g', 'k', 'e'] };
export function initialSound(C, rng, set = 3, targetId = null) {
  const ids = ORAL_SETS[set] || ORAL_SETS[3];
  const id = targetId || rng.pick(ids);
  const g = C.gpcs[id];
  const ans = rng.pick(g.bank);
  const others = rng.sample(ids.filter(x => C.gpcs[x].ph.join() !== g.ph.join()), 2).map(x => { const b = rng.pick(C.gpcs[x].bank); return { pic: b[1], word: b[0], audio: 'b:' + b[0] }; });
  const { options, answer } = place(rng, { pic: ans[1], word: ans[0], audio: 'b:' + ans[0] }, others);
  return { type: 'choice', act: 'initial-sound', ev: 'recog', skill: 'oral', item: keys.oral('initial'), prompt: { audio: ['gpc:' + id], replay: true, oral: true },
    options, answer, opts: 3, credits: [{ id: keys.oral('initial'), kind: 'oral' }], ph: id };
}
export function sameDifferent(C, rng, packs) {
  const sets = packs.flatMap(p => p.sets);
  const set = rng.pick(sets);
  const same = rng.chance(0.5);
  const [a, b] = rng.sample(set, 2);
  const options = [{ label: '=', same: true, icon: 'same' }, { label: '≠', same: false, icon: 'diff' }];
  return { type: 'choice', act: 'same-different', ev: 'recog', skill: 'oral', item: keys.oral('samediff'),
    prompt: { audio: ['w:' + a, 'w:' + (same ? a : b)], replay: true, oral: true, gap: 0.5 }, options, answer: same ? 0 : 1, opts: 2,
    credits: [{ id: keys.oral('samediff'), kind: 'oral' }] };
}
export function syllableTap(C, rng) {
  const [word, pic, n] = rng.pick(SYLL_WORDS);
  const options = [1, 2, 3].map(k => ({ label: String(k), n: k }));
  return { type: 'choice', act: 'syllable', ev: 'recog', skill: 'oral', item: keys.oral('syllable'),
    prompt: { audio: ['b:' + word], pic, replay: true, oral: true }, options, answer: n - 1, opts: 3,
    credits: [{ id: keys.oral('syllable'), kind: 'oral' }] };
}

// ------------------------------------------------------------------ results -> evidence
/** res: { ok, lat?, lure?, tokOk?: boolean[] }. Applies evidence for every credited item. */
export function applyResult(state, C, q, res, now, record) {
  const base = { ev: q.ev, act: q.act, opts: q.opts, lat: res.lat ?? null, t: now };
  if (q.type === 'sentence') {
    q.tokens.forEach((k, i) => {
      const ok = res.tokOk ? !!res.tokOk[i] : !!res.ok;
      const c = C.classify(k, 99);
      if (c.kind === 'word') { for (const g of dedupe(c.word.g)) if (!SILENT_IDS.has(g)) record(state, keys.gpc(g), 'gpc', { ...base, ok }); for (const pt of c.word.pat || []) record(state, 'pat:' + pt, 'pat', { ...base, ok }); }
      else if (c.kind === 'tricky') record(state, keys.tricky(c.tricky.id), 'tricky', { ...base, ok });
    });
    return;
  }
  for (const cr of q.credits) record(state, cr.id, cr.kind, { ...base, ok: !!res.ok, lure: res.lure });
}

/** Random-answer simulation for choice-type questions: returns a first-try result. */
export function simulateRandom(q, rng) {
  if (q.type === 'choice') { const i = rng.int(q.options.length); return { ok: i === q.answer, lure: q.options[i].gpc, lat: 1500 }; }
  if (q.type === 'build' || q.type === 'chain') return { ok: q.sim.steps.every(n => rng.int(n) === 0), lat: 3000 };
  if (q.type === 'sentence') { const tokOk = q.sim.steps.map(n => rng.int(n) === 0); return { ok: tokOk.every(Boolean), tokOk, lat: 3000 }; }
  return { ok: false };
}
