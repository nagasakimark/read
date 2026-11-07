// Headless smoke test / screenshot helper: node tools/shot.mjs  (serves the repo, plays through, saves PNGs to /tmp/shots)
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
const srv = http.createServer((q, r) => { let p = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (p.endsWith('/')) p += 'index.html';
  fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); r.end(d); } }); }).listen(0);
const port = srv.address().port;
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1366, height: 598 } });
const errors = []; page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
fs.mkdirSync('/tmp/shots', { recursive: true });
const snap = n => page.screenshot({ path: `/tmp/shots/${n}.png` });
await page.goto(`http://localhost:${port}/`); await page.waitForTimeout(800); await snap('1_boot');
await page.mouse.click(683, 300); await page.waitForTimeout(1200); await snap('2_profiles');
await page.mouse.click(255, 225); await page.waitForTimeout(800); await snap('3_home');
await page.evaluate(()=>{const a=window.__app; a.eng.go(new (a.eng.scene.constructor)(a));}); await page.waitForTimeout(200);
console.log('errors:', errors.length ? errors : 'none');
await browser.close(); srv.close();
