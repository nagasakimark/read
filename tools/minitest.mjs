// Scripted playthrough: boots the game headlessly and plays N lessons answering correctly (or with a given accuracy),
// taking screenshots of every kind of screen. Usage: node tools/play.mjs [lessons=3] [accuracy=1] [seed]
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
const srv = http.createServer((q, r) => { let p = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (p.endsWith('/')) p += 'index.html';
  fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); r.end(d); } }); }).listen(0);
const port = srv.address().port;
const LESSONS = +(process.argv[2] || 3), ACC = +(process.argv[3] ?? 1);
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1366, height: 598 } });
const errors = []; page.on('pageerror', e => errors.push(String(e.stack || e))); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
fs.mkdirSync('/tmp/shots', { recursive: true });
await page.goto(`http://localhost:${port}/`); await page.waitForTimeout(600);
await page.mouse.click(683, 300); await page.waitForTimeout(900);
await page.mouse.click(255, 250); await page.waitForTimeout(500);
await page.evaluate(() => { window.__app.state.seenIntro = true; window.__app.goHome(); }); await page.waitForTimeout(300);

await page.evaluate(async n => { const M = await import('/src/learn/mastery.js'); for (let u = 0; u < n; u++) M.skipUnit(window.__app.state, u); window.__app.goHome(); }, 14);
await page.waitForTimeout(500); await page.screenshot({ path: '/tmp/shots/mg_home.png' });
await page.mouse.click(64, 520); await page.waitForTimeout(500); await page.screenshot({ path: '/tmp/shots/mg_menu.png' });
for (const id of ['catch', 'ladder', 'dragon', 'beast']) {
  await page.evaluate(async id => { const m = await import('/src/game/minigames.js'); const a = window.__app; a.eng.go(new m.MiniScene(a, id)); }, id);
  await page.waitForTimeout(900); await page.screenshot({ path: `/tmp/shots/mg_${id}.png` });
  let wrongOnce = false, guard = 0;
  while (guard++ < 400) {
    const r = await page.evaluate(() => { const s = window.__app.eng.scene; if (s.res) return { done: true, res: s.res }; if (s.busy) return { wait: true }; const u = s.answerBtn(); if (!u) return { wait: true }; return { x: u.x + u.w / 2, y: u.y + u.h / 2 + 10 }; });
    if (r.done) { console.log(id, 'done', JSON.stringify(r.res)); break; }
    if (!r.wait) await page.mouse.click(r.x, r.y);
    await page.waitForTimeout(r.wait ? 150 : 700);
  }
  await page.screenshot({ path: `/tmp/shots/mg_${id}_end.png` });
}
console.log('errors:', errors.length ? errors.slice(0, 5) : 'none');
await browser.close(); srv.close();
