// Home screen in several progress states: node tools/homeshots.mjs
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
await page.evaluate(() => { window.__app.state.seenIntro = true; window.__app.goHome(); });
const shot = async n => { await page.waitForTimeout(700); await page.screenshot({ path: `/tmp/shots/home_${n}.png` }); };
await shot('fresh');
const states = process.argv.slice(2).length ? process.argv.slice(2) : ['u1l2', 'u1prac', 'u23'];
for (const s of states) {
  await page.evaluate(async s => { const M = await import('/src/learn/mastery.js'); const a = window.__app, st = a.state;
    st.units = {}; const skip = n => { for (let u = 0; u < n; u++) M.skipUnit(st, u); };
    if (s === 'u1l2') { skip(1); M.unitState(st, 1).lessonsDone.L1_1 = 1; }
    if (s === 'u1prac') { skip(1); for (const l of a.C.unitById[1].lessons) M.unitState(st, 1).lessonsDone[l.id] = 1; st.items['gpc:s'] = { id: 'gpc:s', kind: 'gpc', rung: 4, a: [] }; }
    if (s === 'u23') { skip(23); M.unitState(st, 23).lessonsDone.L23_1 = 1; }
    for (const u of Object.values(st.units)) u.skipped = false;
    a.goHome(); }, s);
  await shot(s);
}
console.log('errors:', errors.length ? errors : 'none'); await browser.close(); srv.close();
