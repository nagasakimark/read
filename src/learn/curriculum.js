// Curriculum model: pure logic, no DOM. Works in the browser (JSON via fetch) and in Node (tools/*).
// Blueprint: "The educational curriculum should be independent of the game engine and user interface."

export const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
const PUNCT = /^[\s.,!?;:"'“”‘’()]+|[\s.,!?;:"'“”‘’()]+$/g;

/** Split text into tokens: {raw (as written), key (lowercase, punctuation stripped)} */
export function tokenize(text) {
  return text.split(/\s+/).filter(Boolean).map(raw => ({ raw, key: raw.replace(PUNCT, '').toLowerCase() })).filter(t => t.key);
}

export class Curriculum {
  constructor(d) {
    this.meta = d.meta;
    this.phonemes = Object.fromEntries(d.phonemes.map(p => [p.id, p]));
    this.gpcList = d.gpcs;
    this.gpcs = Object.fromEntries(d.gpcs.map(g => [g.id, g]));
    this.wordList = d.words;
    this.words = Object.fromEntries(d.words.map(w => [w.id, w]));
    this.trickyList = d.tricky;
    this.tricky = Object.fromEntries(d.tricky.map(t => [t.id, t]));
    this.packs = d.packs;
    this.stories = Object.fromEntries(d.stories.map(s => [s.id, s]));
    this.storyList = d.stories;
    this.sentences = d.sentences;
    this.units = d.units;
    this.unitById = Object.fromEntries(d.units.map(u => [u.id, u]));
    this.lessons = Object.fromEntries(d.units.flatMap(u => u.lessons.map(l => [l.id, l])));
  }

  gpcsUpTo(unit) { return this.gpcList.filter(g => g.unit <= unit); }
  isVowelGpc(id) { return VOWELS.has(id); }
  displayWord(w) { return typeof w === 'string' ? (this.words[w]?.t ?? w) : w.t; }

  /** Real (non-silly) decodable words available at a unit. */
  wordsAt(unit, { names = true, silly = false, functionWords = true } = {}) {
    return this.wordList.filter(w => w.u <= unit && (silly ? w.tier === 'silly' : w.tier !== 'silly')
      && (names || w.tier !== 'name') && (functionWords || w.tier !== 'function'));
  }
  sillyAt(unit) { return this.wordList.filter(w => w.u <= unit && w.tier === 'silly'); }

  /** Words (real) that contain a GPC and are decodable at `unit`. */
  wordsWithGpc(gpcId, unit, opts = {}) {
    return this.wordsAt(unit, opts).filter(w => w.g.includes(gpcId));
  }

  /** What is this token at this unit? decodable word | taught tricky word | not yet taught */
  classify(key, unit) {
    const w = this.words[key];
    if (w && w.u <= unit && w.tier !== 'silly') return { kind: 'word', word: w };
    const t = this.tricky[key];
    if (t && t.release <= unit) return { kind: 'tricky', tricky: t };
    return { kind: w || t ? 'future' : 'unknown' };
  }

  /** Decodability of a text at a unit (blueprint: 100% in Stages 1-3). */
  decodability(text, unit) {
    const toks = tokenize(text);
    const bad = [];
    let ok = 0;
    for (const t of toks) {
      const c = this.classify(t.key, unit);
      if (c.kind === 'word' || c.kind === 'tricky') ok++; else bad.push({ token: t.key, why: c.kind });
    }
    return { total: toks.length, ok, pct: toks.length ? ok / toks.length : 1, bad };
  }

  /** Which GPC ids appear in a word id (decodable words only). */
  gpcsOfWord(id) { return this.words[id]?.g ?? []; }

  // ---------- lure generation (one-GPC substitutions), used by activities
  _allowedAt(g, pos, len, prev) {
    const isV = VOWELS.has(g.id);
    if (g.type === 'doubled' || g.type === 'digraph-final' || g.id === 'sz') return pos === len - 1 && VOWELS.has(prev);
    if (isV) return pos > 0 && pos < len - 1;
    if (pos === len - 1) return !['c', 'k', 'h', 'j', 'v', 'w', 'y', 'qu', 'r'].includes(g.id);
    if (pos === 0) return g.id !== 'x' && g.type !== 'doubled' && g.type !== 'digraph-final' && g.id !== 'sz';
    return false;
  }

  /** All decodable strings one GPC away from the word at `unit` (excluding same-sound respellings). */
  mutations(wordId, unit) {
    const w = this.words[wordId];
    if (!w) return [];
    const res = [];
    const allowed = this.gpcsUpTo(unit);
    w.g.forEach((gid, i) => {
      const cur = this.gpcs[gid];
      for (const g of allowed) {
        if (g.id === gid) continue;
        if (g.ph.join() === cur.ph.join()) continue;           // same sound: not a real contrast
        if (VOWELS.has(g.id) !== VOWELS.has(gid)) continue;     // keep vowel/consonant class
        const prev = i > 0 ? w.g[i - 1] : null;
        if (!this._allowedAt(g, i, w.g.length, prev)) continue;
        const ids = w.g.slice(); ids[i] = g.id;
        const text = ids.map(x => this.gpcs[x].g).join('');
        if (text === w.t.toLowerCase()) continue;
        res.push({ text, ids, pos: i, real: this.wordList.find(x => x.t.toLowerCase() === text && x.u <= unit && x.tier !== 'silly') || null });
      }
    });
    return res;
  }

  /** Real-word lures for a word at a unit (blueprint: lures chosen from known confusions). */
  realLures(wordId, unit) { return this.mutations(wordId, unit).filter(m => m.real); }
}
