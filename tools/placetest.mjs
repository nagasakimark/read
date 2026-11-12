// Placement check test: answers right until level N (argv[2]), then wrong. node tools/placetest.mjs 2
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
await page.mouse.click(683, 50); // skip button on intro
await page.evaluate(() => { const a = window.__app; a.state.seenIntro = false; }); await page.mouse.click(W => 0, 0).catch(() => {});
await page.evaluate(async () => { const S = await import('/src/game/scenes.js'); window.__app.eng.go(new S.StartChoiceScene(window.__app)); });
await page.waitForTimeout(600); await page.screenshot({ path: '/tmp/shots/place_choice.png' });
await page.mouse.click(956, 300); await page.waitForTimeout(800);
const N = +(process.argv[2] || 2); let shots = 0;
for (let k = 0; k < 200; k++) {
  const r = await page.evaluate(N => { const s = window.__app.eng.scene; if (s.constructor.name !== 'LessonScene') return { done: s.constructor.name };
    if (!s.cur) { const b = s.ui.find(u => u.label?.includes('はじめる')); return b ? { end: true } : { wait: 1 }; }
    const opts = s.ui.filter(u => u.idx !== undefined); if (!opts.length || opts.some(o => o.st === 'right')) return { wait: 1 };
    const good = s.stepNo < N; const u = good ? opts.find(o => o.idx === s.cur.answer) : (opts.find(o => o.idx !== s.cur.answer && o.st !== 'wrong') || opts.find(o => o.idx === s.cur.answer));
    return { x: u.x + u.w / 2, y: u.y + u.h / 2, step: s.stepNo }; }, N);
  if (r.end) { await page.waitForTimeout(700); await page.screenshot({ path: '/tmp/shots/place_result.png' }); break; }
  if (r.x) { if (!shots++) await page.screenshot({ path: '/tmp/shots/place_q.png' }); await page.mouse.click(r.x, r.y); await page.waitForTimeout(150); } else await page.waitForTimeout(200);
}
console.log(await page.evaluate(() => JSON.stringify({ placed: window.__app.state.placed, passed: Object.keys(window.__app.state.units) })));
console.log('errors:', errors.length ? errors : 'none'); await browser.close(); srv.close();
