// Storybook screenshots: node tools/bookshots.mjs [storyId] [read]
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const srv = http.createServer((q, r) => { let p = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (p.endsWith('/')) p += 'index.html'; fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); r.end(d); } }); }).listen(0);
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1366, height: 598 } });
const errors = []; page.on('pageerror', e => errors.push(String(e.stack || e)));
await page.goto(`http://localhost:${srv.address().port}/`); await page.waitForTimeout(700);
await page.mouse.click(683, 300); await page.waitForTimeout(1200); await page.mouse.click(255, 250); await page.waitForTimeout(500);
const sid = process.argv[2] || 's3a', read = +(process.argv[3] || 1);
await page.evaluate(async ([sid, read]) => { const L = await import('/src/game/lesson.js'); const a = window.__app; a.state.seenIntro = true;
  globalThis.__forceSteps = [{ type: 'story', story: sid, read }, { type: 'close' }];
  a.eng.go(new L.LessonScene(a, { id: 'T', unit: a.C.stories[sid].unit, kind: 'story', newGpcs: [], newTricky: [], stories: [] })); }, [sid, read]);
const shot = async (n, w = 500) => { await page.waitForTimeout(w); await page.screenshot({ path: `/tmp/shots/book_${n}.png` }); };
await shot('cover', 900);
await page.mouse.click(1080, 300); await page.waitForTimeout(250); await shot('opening', 0);
await shot('p1', 900);
await page.mouse.click(1030, 260); await shot('tapword', 300);
await page.mouse.click(1294, 488); await page.waitForTimeout(300); await shot('flip', 0);
await shot('p2', 900);
const np = await page.evaluate(sid => window.__app.C.stories[sid].pages.length, sid); for (let i = 0; i < np - 1; i++) { await page.mouse.click(1294, 488); await page.waitForTimeout(1000); }
await shot('end', 300);
await page.mouse.click(1294, 488); await shot('after', 1200);
console.log('errors:', errors.length ? errors : 'none'); await browser.close(); srv.close();
