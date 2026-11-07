// Browser-side curriculum loader (fetches the generated curriculum/*.json files).
import { Curriculum } from './curriculum.js';
export async function loadCurriculum(base = 'curriculum/') {
  const names = ['meta', 'phonemes', 'gpcs', 'words', 'tricky', 'packs', 'stories', 'sentences', 'units'];
  const parts = await Promise.all(names.map(n => fetch(base + n + '.json').then(r => { if (!r.ok) throw new Error(n); return r.json(); })));
  return new Curriculum(Object.fromEntries(names.map((n, i) => [n, parts[i]])));
}
