// Offline-first service worker: precaches the game, curriculum and audio so it works on school Wi-Fi that drops out.
const VERSION = 'lre-v13';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon.svg', 'fonts/andika-latin-400-normal.woff2', 'fonts/andika-latin-700-normal.woff2',
  'src/game/main.js', 'src/game/engine.js', 'src/game/audio.js', 'src/game/store.js', 'src/game/monster.js', 'src/game/ui.js', 'src/game/scenes.js', 'src/game/minigames.js', 'src/game/intro.js', 'src/game/sprites.js', 'src/game/icons.js', 'src/game/bankja.js', 'src/game/unitinfo.js', 'src/game/storybook.js', 'src/game/rewards.js', 'fonts/nunito-latin-600-normal.woff2', 'fonts/nunito-latin-800-normal.woff2', 'fonts/nunito-latin-900-normal.woff2', 'fonts/zenmaru-jp-700.woff2', 'fonts/zenmaru-jp-900.woff2', 'assets/sfx/tap-a.ogg', 'assets/sfx/click-b.ogg', 'src/game/lesson.js',
  'src/learn/curriculum.js', 'src/learn/lessonplan.js', 'src/learn/loader.browser.js', 'src/learn/mastery.js', 'src/learn/questions.js', 'src/learn/rng.js',
  ...['meta', 'phonemes', 'gpcs', 'words', 'tricky', 'packs', 'stories', 'sentences', 'units', 'course'].map(n => `curriculum/${n}.json`), 'audio/manifest.json'];
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION); await c.addAll(CORE);
    try { const m = await (await fetch('audio/manifest.json')).json(); const files = [...new Set(Object.values(m))];
      for (let i = 0; i < files.length; i += 40) await Promise.all(files.slice(i, i + 40).map(f => c.add('audio/' + f).catch(() => {}))); } catch {}
    self.skipWaiting();
  })());
});
self.addEventListener('activate', e => e.waitUntil((async () => { for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k); await self.clients.claim(); })()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    const hit = await caches.match(e.request, { ignoreSearch: true }); if (hit) return hit;
    try { const r = await fetch(e.request); if (r.ok && new URL(e.request.url).origin === location.origin) (await caches.open(VERSION)).put(e.request, r.clone()); return r; }
    catch { return hit || Response.error(); }
  })());
});
