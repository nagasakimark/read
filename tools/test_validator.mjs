// Negative tests: the decodability checker must REJECT text a child cannot yet decode (blueprint: build-time validator).
import { loadCurriculumNode } from '../src/learn/loader.node.js';
const C = loadCurriculumNode(); let fail = 0;
const check = (name, ok) => { console.log((ok ? 'PASS ' : 'FAIL ') + name); if (!ok) fail++; };
const d = (t, u) => C.decodability(t, u);
const full = (t, u) => d(t, u).pct === 1;
check('accepts a decodable sentence (unit 3)', full('Tom got a cap.', 3));
check('rejects a sentence with an unlearned word', !full('The elephant sat on a mat.', 3));
check('rejects a word using a GPC from a later unit (jug at unit 3)', !full('A jug.', 3));
check('rejects a tricky word before its release (the at unit 1)', C.classify('the', 1).kind !== 'tricky');
process.exit(fail ? 1 : 0);
