// Tiny canvas game engine: letterboxed 1366x598 stage, hi-DPI, Pointer Events (single click/tap only),
// tweens, scene stack, button widgets. No DOM UI: everything is drawn on the canvas.
export const W = 1366, H = 598;
export const FONT = '"Andika","Comic Sans MS","Trebuchet MS",system-ui,sans-serif';
export const JP = '"Hiragino Maru Gothic ProN","Yu Gothic","Noto Sans JP","Meiryo",sans-serif';

export const ease = {
  linear: t => t, out: t => 1 - Math.pow(1 - t, 3), inOut: t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  back: t => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  bounce: t => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + .75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + .9375; return n * (t -= 2.625 / d) * t + .984375; },
};

export class Engine {
  constructor(canvas) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d');
    this.scenes = []; this.tweens = []; this.timers = []; this.time = 0; this.scale = 1; this.ox = 0; this.oy = 0;
    this.pointer = { x: -1, y: -1, down: false };
    this.shake = 0; this.running = false;
    addEventListener('resize', () => this.resize());
    canvas.addEventListener('pointerdown', e => this._down(e));
    canvas.addEventListener('pointermove', e => this._move(e));
    addEventListener('pointerup', e => this._up(e));
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    this.resize();
  }
  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const cw = innerWidth, ch = innerHeight;
    this.canvas.style.width = cw + 'px'; this.canvas.style.height = ch + 'px';
    this.canvas.width = Math.round(cw * dpr); this.canvas.height = Math.round(ch * dpr);
    this.dpr = dpr; this.scale = Math.min(cw / W, ch / H);
    this.ox = (cw - W * this.scale) / 2; this.oy = (ch - H * this.scale) / 2;
  }
  toStage(e) { const r = this.canvas.getBoundingClientRect(); return { x: (e.clientX - r.left - this.ox) / this.scale, y: (e.clientY - r.top - this.oy) / this.scale }; }
  get scene() { return this.scenes[this.scenes.length - 1]; }
  go(scene) { this.scenes.forEach(s => s.leave?.()); this.scenes = [scene]; scene.enter?.(this); }
  push(scene) { this.scenes.push(scene); scene.enter?.(this); }
  pop() { const s = this.scenes.pop(); s?.leave?.(); }
  // ---------------- input
  _down(e) { e.preventDefault(); const p = this.toStage(e); this.pointer = { ...p, down: true }; this.audio?.unlock(); this.scene?.pointerDown?.(p.x, p.y); this._hit(p.x, p.y, true); }
  _move(e) { const p = this.toStage(e); this.pointer.x = p.x; this.pointer.y = p.y; }
  _up(e) { const p = this.toStage(e); this.pointer.down = false; const s = this.scene; if (s?.pointerUp) s.pointerUp(p.x, p.y); }
  _hit(x, y) {
    const s = this.scene; if (!s || s.locked) return;
    const list = (s.ui || []).filter(u => u.visible !== false && u.enabled !== false);
    for (let i = list.length - 1; i >= 0; i--) {
      const u = list[i];
      if (x >= u.x && x <= u.x + u.w && y >= u.y && y <= u.y + u.h) { u.press = 1; this.sfx?.('tap'); u.onTap?.(u, x, y); return; }
    }
    s.tapBackground?.(x, y);
  }
  // ---------------- tweens / timers
  tween(obj, props, ms, e = 'out', delay = 0) {
    return new Promise(res => {
      const from = {}; for (const k in props) from[k] = obj[k];
      this.tweens.push({ obj, from, to: props, ms, t: -delay, e: ease[e] || e, res });
    });
  }
  wait(ms) { return new Promise(res => this.timers.push({ t: ms, res })); }
  clearTweens(obj) { this.tweens = this.tweens.filter(t => { if (t.obj === obj) { t.res(); return false; } return true; }); }
  // ---------------- loop
  start() {
    if (this.running) return; this.running = true; let last = performance.now();
    const frame = now => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; this.time += dt;
      this.update(dt); this.draw();
      this.raf = requestAnimationFrame(frame);
    };
    this.raf = requestAnimationFrame(frame);
  }
  stepManual(dt = 1 / 60, n = 1) { for (let i = 0; i < n; i++) { this.time += dt; this.update(dt); } this.draw(); }
  update(dt) {
    for (const t of this.tweens) {
      t.t += dt * 1000; if (t.t < 0) continue;
      const k = Math.min(1, t.t / t.ms), v = t.e(k);
      for (const p in t.to) t.obj[p] = t.from[p] + (t.to[p] - t.from[p]) * v;
      if (k >= 1) t.done = true;
    }
    this.tweens.filter(t => t.done).forEach(t => t.res()); this.tweens = this.tweens.filter(t => !t.done);
    for (const t of this.timers) { t.t -= dt * 1000; if (t.t <= 0) t.done = true; }
    this.timers.filter(t => t.done).forEach(t => t.res()); this.timers = this.timers.filter(t => !t.done);
    for (const s of this.scenes) for (const u of s.ui || []) if (u.press > 0) u.press = Math.max(0, u.press - dt * 5);
    this.scene?.update?.(dt);
  }
  draw() {
    const c = this.ctx;
    c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#10283a'; c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const k = this.scale * this.dpr;
    c.setTransform(k, 0, 0, k, this.ox * this.dpr, this.oy * this.dpr);
    c.save(); c.beginPath(); c.rect(0, 0, W, H); c.clip();
    this.scene?.draw?.(c);
    c.restore();
  }
}

// ---------------- drawing helpers
export function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
export function text(c, s, x, y, { size = 32, color = '#fff', align = 'center', base = 'middle', weight = 'bold', font = FONT, stroke = null } = {}) {
  c.font = `${weight} ${size}px ${font}`; c.textAlign = align; c.textBaseline = base;
  if (stroke) { c.lineWidth = stroke.w; c.strokeStyle = stroke.c; c.lineJoin = 'round'; c.strokeText(s, x, y); }
  c.fillStyle = color; c.fillText(s, x, y);
}
export function shade(hex, f) { // f in -1..1
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = f < 0 ? 0 : 255, p = Math.abs(f);
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/** A tappable widget. draw(c, u) is optional; default draws a rounded button with label. */
export class Btn {
  constructor(o) { Object.assign(this, { x: 0, y: 0, w: 120, h: 70, color: '#2e9cca', label: '', icon: '', size: 34, visible: true, enabled: true, press: 0, pop: 1, r: 22, shadow: true }, o); }
  draw(c) {
    if (this.visible === false) return;
    const s = this.pop * (1 - this.press * 0.06);
    c.save(); c.translate(this.x + this.w / 2, this.y + this.h / 2); c.scale(s, s); c.translate(-this.w / 2, -this.h / 2);
    if (this.customDraw) this.customDraw(c, this);
    else {
      const col = this.enabled === false ? '#8a99a5' : this.color;
      if (this.shadow) { rr(c, 0, 6, this.w, this.h, this.r); c.fillStyle = shade(col, -0.4); c.fill(); }
      rr(c, 0, 0, this.w, this.h, this.r); c.fillStyle = col; c.fill();
      c.lineWidth = 3; c.strokeStyle = shade(col, 0.35); c.stroke();
      if (this.icon) text(c, this.icon, this.w / 2, this.h / 2 + 2, { size: this.size });
      if (this.label) text(c, this.label, this.w / 2, this.h / 2 + 2, { size: this.size, font: this.font || FONT });
    }
    c.restore();
  }
}
export function drawUI(c, ui) { for (const u of ui) if (u.draw) u.draw(c); }

// ---------------- particles (stars burst)
export class Particles {
  constructor() { this.p = []; }
  burst(x, y, n = 18, colors = ['#ffd23f', '#ff7a59', '#7be0ad', '#6ec6ff', '#ff8fd0']) {
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = 120 + Math.random() * 380;
      this.p.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 180, life: 1, size: 8 + Math.random() * 12, rot: Math.random() * 6, c: colors[i % colors.length] }); }
  }
  update(dt) { for (const q of this.p) { q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 700 * dt; q.life -= dt * 1.1; q.rot += dt * 6; } this.p = this.p.filter(q => q.life > 0); }
  draw(c) {
    for (const q of this.p) { c.save(); c.translate(q.x, q.y); c.rotate(q.rot); c.globalAlpha = Math.max(0, q.life); c.fillStyle = q.c; star(c, q.size); c.restore(); }
  }
}
export function star(c, r, pts = 5, inner = 0.45) {
  c.beginPath(); for (let i = 0; i < pts * 2; i++) { const a = (i * Math.PI) / pts - Math.PI / 2, rr_ = i % 2 ? r * inner : r; c.lineTo(Math.cos(a) * rr_, Math.sin(a) * rr_); } c.closePath(); c.fill();
}
