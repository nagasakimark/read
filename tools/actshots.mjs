// Forces specific lesson steps and screenshots every screen: node tools/actshots.mjs
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const srv = http.createServer((q, r) => { let p = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (p.endsWith('/')) p += 'index.html'; fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); r.end(d); } }); }).listen(0);
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1366, height: 598 } });
const errors = []; page.on('pageerror', e => errors.push(String(e.stack || e)));
await page.goto(`http://localhost:${srv.address().port}/`); await page.waitForTimeout(700);
await page.mouse.click(683, 300); await page.waitForTimeout(1200); await page.mouse.click(255, 250); await page.waitForTimeout(500);
const SETS = { syl: [32, [{ type: 'concept', kind: 'syl', n: 2 }, { type: 'syllchop', n: 2 }]], morph: [34, [{ type: 'concept', kind: 'morph', n: 2 }, { type: 'wordsum', n: 2 }, { type: 'affix', n: 2 }]],
  mix: [12, [{ type: 'minpair', pack: null, n: 1 }, { type: 'chain', n: 1, focus: [] }, { type: 'heart', words: ['the'], intro: true }, { type: 'dictation', n: 1 }]] };
for (const [name, [unit, steps]] of Object.entries(process.argv[2] ? { [process.argv[2]]: SETS[process.argv[2]] } : SETS)) {
  await page.evaluate(async ([unit, steps]) => { const L = await import('/src/game/lesson.js'); const a = window.__app; a.state.seenIntro = true; a.state.seenActs = {};
    for (const st of steps) if (st.type === 'minpair') st.pack = a.C.packs.find(p => p.unit <= unit).id;
    globalThis.__forceSteps = [...steps, { type: 'close' }];
    a.eng.go(new L.LessonScene(a, { id: 'T', unit, kind: 'teach', newGpcs: [], newTricky: [], stories: [] })); }, [unit, steps]);
  let n = 0, last = '';
  for (let k = 0; k < 400 && n < 14; k++) {
    await page.waitForTimeout(250);
    const r = await page.evaluate(() => { const s = window.__app.eng.scene; if (s.constructor.name !== 'LessonScene') return { gone: 1 };
      const key = (s.cur?.act || s.instr || 'x') + ':' + (s.cur?.word || s.cur?.text || s.stepNo);
      if (s.ui.some(u => u.label?.includes('ホーム'))) return { fin: 1, key };
      if (s.cur && (s.cur.type === 'choice' || s.cur.type === 'chain')) { const o = s.ui.find(u => u.idx === s.cur.answer); if (o && o.st !== 'right') return { key, x: o.x + o.w / 2, y: o.y + o.h / 2 }; return { key }; }
      if (s.bld) { const { trayItems, slotItems } = s.bld; const e = slotItems.find(x => x.filled < 0); const t = e && trayItems.find(t => t.placed < 0 && t.label === e.label); return t ? { key, x: t.cx + t.w / 2, y: t.cy + 50 } : { key }; }
      const nx = s.ui.find(u => ['play', 'fwd', 'check', 'next'].includes(u.icon) && u.enabled !== false); const big = s.ui.find(u => u.w === 330 && u.h === 230);
      if (nx) return { key, x: nx.x + nx.w / 2, y: nx.y + nx.h / 2 }; if (big) return { key, x: big.x + 100, y: big.y + 100 }; return { key }; });
    if (r.gone || r.fin) { await page.screenshot({ path: `/tmp/shots/a_${name}_fin.png` }); break; }
    if (r.key !== last) { last = r.key; await page.waitForTimeout(900); await page.screenshot({ path: `/tmp/shots/a_${name}_${String(n++).padStart(2, '0')}.png` }); }
    if (r.x) await page.mouse.click(r.x, r.y);
  }
}
console.log('errors:', errors.length ? errors : 'none'); await browser.close(); srv.close();
