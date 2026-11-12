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
const SKIP = +(process.argv[4] || 0);
if (SKIP) { await page.evaluate(async n => { const M = await import('/src/learn/mastery.js'); for (let u = 0; u < n; u++) M.skipUnit(window.__app.state, u); window.__app.goHome(); }, SKIP); await page.waitForTimeout(300); }
const seenKinds = new Set(); let shots = 0, lessonsDone = 0, lastState = '', stuck = 0;
const t0 = Date.now();
while (lessonsDone < LESSONS && Date.now() - t0 < 600000) {
  const info = await page.evaluate((acc) => {
    const a = window.__app, s = a.eng.scene, name = s.constructor.name;
    if (name === 'HomeScene') { return { act: 'home' }; }
    if (name === 'CelebrateScene') { const b = s.ui[0]; return s.t > 2 ? { act: 'click', x: b.x + b.w / 2, y: b.y + b.h / 2, kind: 'celebrate' } : { act: 'wait' }; }
    if (name !== 'LessonScene') return { act: 'other', name };
    if (s.cur && s.ui.length) {
      const q = s.cur, good = Math.random() < acc;
      if (q.type === 'choice' || q.type === 'chain') {
        const opts = s.ui.filter(u => u.idx !== undefined); if (!opts.length) return { act: 'wait' };
        const target = good ? q.answer : (q.answer + 1) % opts.length; let u = opts.find(o => o.idx === target && o.st !== 'wrong') || opts.find(o => o.idx === q.answer);
        if (opts[q.answer].st === 'right') return { act: 'wait' };
        return { act: 'click', x: u.x + u.w / 2, y: u.y + u.h / 2, kind: q.act };
      }
      if (s.bld) {
        const { trayItems, slotItems } = s.bld; const empty = slotItems.find(x => x.filled < 0);
        if (!empty) return { act: 'wait' };
        let t = trayItems.find(t => t.placed < 0 && t.label === empty.label); if (!good) t = trayItems.find(t => t.placed < 0 && t.label !== empty.label) || t;
        if (!t) t = trayItems.find(t => t.placed >= 0 && slotItems[t.placed].label !== t.label) || trayItems.find(t => t.placed >= 0);
        if (t && t.placed >= 0) return { act: 'click', x: t.cx + t.w / 2, y: t.cy + 60 };
        return { act: 'click', x: t.cx + t.w / 2, y: t.cy + 60, kind: q.act };
      }
    }
    const fin = s.ui.find(u => u.y === 470 && u.label && u.label.includes('ホーム'));
    if (fin) return { act: 'click', x: fin.x + fin.w / 2, y: fin.y + 50, kind: 'finish' };
    if (s.book) { const b = s.ui.find(u => u.icon === 'book' || u.icon === 'fwd' || u.icon === 'check'); if (b && !s.book.flip) return { act: 'click', x: b.x + b.w / 2, y: b.y + b.h / 2, kind: 'book' }; return { act: 'wait' }; }
    const next = s.ui.find(u => (u.icon === 'play' || u.icon === '▶') && u.visible !== false);
    const big = s.ui.find(u => u.w === 330 && u.h === 230);
    if (s.finished) return { act: 'wait' };
    if (next) return next.enabled === false && big ? { act: 'click', x: big.x + 160, y: big.y + 100, kind: 'meet-hear' } : { act: 'click', x: next.x + next.w / 2, y: next.y + next.h / 2, kind: next.w === 200 ? 'finish' : 'next' + s.stepNo + (s.spec.id || '') };
    return { act: 'wait' };
  }, ACC);
  const key = JSON.stringify(info);
  if (info.act === 'home' && process.env.CP && !globalThis.__cpDone) {   // CP=<stage page offset back>: open that stage's check-up
    globalThis.__cpDone = true; await page.screenshot({ path: '/tmp/shots/home_pre_cp.png' });
    for (let k = 0; k < +process.env.CP; k++) { await page.mouse.click(46, 305); await page.waitForTimeout(300); }
    await page.screenshot({ path: '/tmp/shots/home_cp.png' }); await page.mouse.click(1290, 520); await page.waitForTimeout(800); continue;
  }
  if (info.act === 'home') { lessonsDone++; console.log('lesson', lessonsDone, 'back home'); await page.screenshot({ path: `/tmp/shots/home_${lessonsDone}.png` }); if (lessonsDone >= LESSONS) break; await page.mouse.click(683, 520); await page.waitForTimeout(800); continue; }
  if (info.act === 'click') {
    if (info.kind && !seenKinds.has(info.kind)) { seenKinds.add(info.kind); await page.waitForTimeout(500); await page.screenshot({ path: `/tmp/shots/act_${info.kind}.png` }); }
    await page.mouse.click(info.x, info.y); await page.waitForTimeout(60);
  } else await page.waitForTimeout(120);
  stuck = key === lastState ? stuck + 1 : 0; lastState = key; if (stuck > 400) { console.log('STUCK', key); await page.screenshot({ path: '/tmp/shots/stuck.png' }); break; }
}
const st = await page.evaluate(() => { const s = window.__app.state; return { sessions: s.stats.sessions, items: Object.keys(s.items).length, units: Object.keys(s.units).filter(u => s.units[u].passed), done: Object.fromEntries(Object.entries(s.units).map(([k, u]) => [k, Object.keys(u.lessonsDone)])) }; });
console.log('state', JSON.stringify(st), 'kinds', [...seenKinds].join(','));
const gate = await page.evaluate(async () => { const M = await import('/src/learn/mastery.js'); const a = window.__app, s = a.state;
  const out = {}; for (const u of Object.keys(s.units)) out[u] = M.gateStatus(a.C, s, +u).reasons;
  out.rungs = Object.fromEntries(Object.values(s.items).map(i => [i.id, i.rung])); return out; });
console.log('gate', JSON.stringify(gate));
fs.writeFileSync('/tmp/play_state.json', JSON.stringify(await page.evaluate(() => window.__app.state)));
console.log('errors:', errors.length ? errors.slice(0, 5) : 'none');
await browser.close(); srv.close();
