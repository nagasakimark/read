import { Engine } from './engine.js';
import { AudioSys } from './audio.js';
import { Store, COLORS } from './store.js';
import { loadCurriculum } from '../learn/loader.browser.js';
import { makeRng } from '../learn/rng.js';
import { BootScene, ProfileScene, HomeScene } from './scenes.js';
import { IntroScene } from './intro.js';
import { loadSprites } from './sprites.js';

const canvas = document.getElementById('game');
const eng = new Engine(canvas);
const audio = new AudioSys();
eng.audio = audio; eng.sfx = n => audio.sfx(n);

export const app = {
  eng, audio, store: new Store(), C: null, rec: null, state: null, rng: makeRng(Date.now() & 0xffffffff), colorHex: '#58c46a',
  async start() {
    const [C] = await Promise.all([loadCurriculum(), this.store.open(), audio.loadManifest(), loadSprites()]);
    this.C = C; await this.chooseProfile();
  },
  async chooseProfile() { if (this.rec) await this.store.flush(this.rec); const list = await this.store.list(); eng.go(new ProfileScene(this, list)); },
  select(rec) {
    this.rec = rec; this.state = rec.state; this.colorHex = COLORS.find(c => c.id === rec.color)?.hex || '#58c46a';
    this.state.settings ??= { sessionMin: 12 }; audio.muted = this.state.settings.sound === false;
    if (!this.state.seenIntro) eng.go(new IntroScene(this, () => { this.state.seenIntro = true; this.save(true); this.goHome(); }));
    else this.goHome();
  },
  replaceState(s) { this.rec.state = s; this.state = s; this.store.flush(this.rec); },
  goHome() { eng.go(new HomeScene(this)); },
  save(now) { return now ? this.store.flush(this.rec) : (this.store.save(this.rec), Promise.resolve()); },
};
window.__app = app;           // handy for tests and teachers' consoles
eng.go(new BootScene(app));
eng.start();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
