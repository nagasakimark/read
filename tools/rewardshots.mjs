// Sticker album + hats screenshots: node tools/rewardshots.mjs
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2' };
const srv = http.createServer((q, r) => { let p = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (p.endsWith('/')) p += 'index.html'; fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); r.end(d); } }); }).listen(0);
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1366, height: 598 } });
const errors = []; page.on('pageerror', e => errors.push(String(e)));
await page.goto(`http://localhost:${srv.address().port}/`); await page.waitForTimeout(700);
await page.mouse.click(683, 300); await page.waitForTimeout(1200); await page.mouse.click(255, 250); await page.waitForTimeout(500);
await page.evaluate(async () => { const R = await import('/src/game/rewards.js'); const M = await import('/src/learn/mastery.js'); const a = window.__app;
  for (let i = 0; i < 23; i++) R.awardSticker(a.state); for (let u = 0; u < 4; u++) M.skipUnit(a.state, u); a.state.days = { last: new Date().toISOString().slice(0, 10), streak: 4, total: 6 };
  a.eng.go(new R.StickerScene(a)); });
await page.waitForTimeout(600); await page.screenshot({ path: '/tmp/shots/rw_album.png' });
await page.mouse.click(790, 48); await page.waitForTimeout(600); await page.screenshot({ path: '/tmp/shots/rw_hats.png' });
await page.evaluate(() => window.__app.goHome()); await page.waitForTimeout(700); await page.screenshot({ path: '/tmp/shots/rw_home.png' });
console.log('errors:', errors.length ? errors : 'none'); await browser.close(); srv.close();
