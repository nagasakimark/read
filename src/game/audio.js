// Audio: unlocks the AudioContext on the first tap, plays recorded/placeholder clips from audio/manifest.json
// and synthesises small sound effects. Missing clips resolve quietly (the app must never stall on audio).
export class AudioSys {
  constructor() { this.ctx = null; this.manifest = {}; this.cache = new Map(); this.token = 0; this.muted = false; this.log = []; }
  async loadManifest(url = 'audio/manifest.json') { try { this.manifest = await (await fetch(url)).json(); } catch { this.manifest = {}; } }
  unlock() {
    if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { return; } }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }
  async buffer(key) {
    const file = this.manifest[key]; if (!file || !this.ctx) return null;
    if (this.cache.has(key)) return this.cache.get(key);
    const p = fetch('audio/' + file).then(r => r.arrayBuffer()).then(b => this.ctx.decodeAudioData(b)).catch(() => null);
    this.cache.set(key, p); return p;
  }
  preload(keys) { keys.forEach(k => this.buffer(k)); }
  stop() { this.token++; if (this.cur) { try { this.cur.stop(); } catch {} this.cur = null; } }
  /** Play keys one after another. Resolves when finished (or when cancelled by stop()). */
  async play(keys, { gap = 0.12 } = {}) {
    const my = ++this.token; this.stop(); this.token = my;
    for (const k of [].concat(keys)) {
      this.log.push(k);
      if (this.muted || !this.ctx) { await sleep(250); if (this.token !== my) return; continue; }
      const buf = await this.buffer(k);
      if (this.token !== my) return;
      if (!buf) { await sleep(300); continue; }
      await new Promise(res => {
        const s = this.ctx.createBufferSource(); s.buffer = buf; s.connect(this.ctx.destination); this.cur = s; s.onended = res; s.start();
      });
      if (this.token !== my) return;
      await sleep(gap * 1000); if (this.token !== my) return;
    }
  }
  /** Short UI click samples (Kenney, CC0); falls back to the synth tone if they cannot load. */
  sample(file, vol = 0.6) {
    this.sfxCache ??= {};
    const p = this.sfxCache[file] ??= fetch(`assets/sfx/${file}.ogg`).then(r => r.arrayBuffer()).then(b => this.ctx.decodeAudioData(b)).catch(() => null);
    p.then(buf => { if (!buf || !this.ctx || this.muted) return; const s = this.ctx.createBufferSource(), g = this.ctx.createGain(); g.gain.value = vol; s.buffer = buf; s.connect(g).connect(this.ctx.destination); s.start(); });
  }
  // ---- sound effects (synth)
  sfx(name) {
    if (this.muted || !this.ctx) return; const t = this.ctx.currentTime;
    const tone = (f, s, d, type = 'sine', v = 0.15) => { const o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.type = type; o.frequency.setValueAtTime(f, t + s);
      g.gain.setValueAtTime(0.0001, t + s); g.gain.exponentialRampToValueAtTime(v, t + s + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + s + d);
      o.connect(g).connect(this.ctx.destination); o.start(t + s); o.stop(t + s + d + 0.05); };
    const SAMPLES = { tap: 'tap-a', pop: 'click-b' };
    if (SAMPLES[name]) { this.sample(SAMPLES[name], name === 'tap' ? 0.7 : 0.6); return; }
    if (name === 'tap') tone(520, 0, 0.07, 'triangle', 0.07);
    else if (name === 'good') { tone(660, 0, 0.12); tone(880, 0.1, 0.18); }
    else if (name === 'bad') { tone(220, 0, 0.18, 'triangle', 0.1); }
    else if (name === 'pop') tone(740, 0, 0.09, 'triangle', 0.08);
    else if (name === 'win') { [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.11, 0.25)); }
    else if (name === 'gem') { [880, 1175, 1568].forEach((f, i) => tone(f, i * 0.09, 0.3, 'sine', 0.12)); }
  }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
