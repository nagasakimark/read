// Visits teacher, mastery and class screens + persistence/export round-trip + offline (service worker).
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
let offline = false;
const srv = http.createServer((q, r) => { if (offline) { r.writeHead(503); return r.end(); } let p = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (p.endsWith('/')) p += 'index.html';
  fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); r.end(d); } }); }).listen(0);
const port = srv.address().port, url = `http://localhost:${port}/`;
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1366, height: 598 } }); const page = await ctx.newPage();
const errors = []; page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
const snap = n => page.screenshot({ path: `/tmp/shots/${n}.png` });
await page.goto(url); await page.waitForTimeout(700); await page.mouse.click(683, 300); await page.waitForTimeout(900); await page.mouse.click(255, 225); await page.waitForTimeout(500);
// seed some progress, then visit screens
await page.evaluate(async () => { const M = await import('/src/learn/mastery.js'); const s = window.__app.state; for (let u = 0; u < 3; u++) M.skipUnit(s, u);
  for (const g of ['s', 'a', 'm', 't', 'i', 'n']) { const it = M.getItem(s, 'gpc:' + g, 'gpc'); it.rung = 5; it.a.push({ t: Date.now(), ok: 1, ev: 'recall', act: 'recall-flash', o: 3, lat: 1000 }); } window.__app.save(true); window.__app.goHome(); });
await page.waitForTimeout(300); await snap('s_home');
await page.mouse.click(W2(1316), 45); await page.waitForTimeout(400); await snap('s_mastery');
function W2(x) { return x; }
await page.evaluate(() => window.__app.goHome()); await page.waitForTimeout(200);
await page.mouse.click(1230, 45); await page.waitForTimeout(400); await snap('s_teacher');
await page.mouse.click(1085, 335); await page.waitForTimeout(400); await snap('s_class');
// reload: progress persisted?
await page.reload(); await page.waitForTimeout(700); await page.mouse.click(683, 300); await page.waitForTimeout(900); await snap('s_profiles2'); await page.mouse.click(255, 225); await page.waitForTimeout(600);
const rungs = await page.evaluate(() => Object.fromEntries(['s', 'a', 'n'].map(g => [g, window.__app.state.items['gpc:' + g]?.rung])));
console.log('persisted rungs after reload:', JSON.stringify(rungs));
// progress code round trip
const rt = await page.evaluate(async () => { const S = await import('/src/game/store.js'); const code = await S.toCode(window.__app.state); const back = await S.fromCode(code); return { len: code.length, same: JSON.stringify(back) === JSON.stringify(window.__app.state) }; });
console.log('progress code round-trip:', JSON.stringify(rt));
// offline: service worker should serve everything
await page.waitForTimeout(2500); const sw = await page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration()));
console.log('service worker registered:', sw);
offline = true; await page.reload(); await page.waitForTimeout(1500); await page.mouse.click(683, 300); await page.waitForTimeout(1200); await snap('s_offline');
const offlineOk = await page.evaluate(() => !!window.__app?.C);
console.log('works offline:', offlineOk);
console.log('errors:', errors.length ? errors.slice(0, 6) : 'none');
await browser.close(); srv.close();
