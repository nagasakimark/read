// Small seeded RNG (mulberry32) so lessons and the guess-bot are reproducible.
export function makeRng(seed = Date.now() >>> 0) {
  let a = seed >>> 0;
  const next = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const rng = {
    next, int: n => Math.floor(next() * n), chance: p => next() < p,
    pick: arr => arr[Math.floor(next() * arr.length)],
    shuffle: arr => { const r = arr.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; },
    sample: (arr, n) => rng.shuffle(arr).slice(0, n),
  };
  return rng;
}
