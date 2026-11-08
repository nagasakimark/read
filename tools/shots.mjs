// Screenshots of the non-lesson screens: node tools/shots.mjs
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webmanifest': 'application/json' };
const srv = http.createServer((q, r) => { let p = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (p.endsWith('/')) p += 'index.html'; fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); r.end(d); } }); }).listen(0);
const port = srv.address().port;
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1366, height: 598 } });
const errors = []; page.on('pageerror', e => errors.push(String(e.stack || e)));
await page.goto(`http://localhost:${port}/`); await page.waitForTimeout(700);
const shot = async n => { await page.waitForTimeout(500); await page.screenshot({ path: `/tmp/shots/ui_${n}.png` }); };
await shot('boot');
await page.mouse.click(683, 300); await page.waitForTimeout(1200); await shot('profile');
await page.mouse.click(255, 250); await page.waitForTimeout(600); await shot('intro1');
for (let i = 2; i <= 5; i++) { await page.mouse.click(1230, 525); await shot('intro' + i); }
await page.mouse.click(1230, 525); await shot('home');
await page.evaluate(async () => { const M = await import('/src/learn/mastery.js'); for (let u = 0; u < 3; u++) M.skipUnit(window.__app.state, u); window.__app.goHome(); });
await shot('home2');
// home button inside a lesson must work
await page.mouse.click(683, 520); await page.waitForTimeout(1500); await shot('lesson');
await page.mouse.click(44, 36); await page.waitForTimeout(600);
console.log('after home tap scene:', await page.evaluate(() => window.__app.eng.scene.constructor.name));
console.log('errors:', errors.length ? errors : 'none');
await browser.close(); srv.close();
