// Practice mini games (Teach-Your-Monster-style). Every game is single-tap, fits 1366x598, and is a fun
// fluency layer on top of the lessons: they use only content the child has already passed and never change mastery.
import { W, H, FONT, JP, UIF, text, rr, Btn, Particles, drawUI } from './engine.js';
import { background, speaker, picText, card, title } from './ui.js';
import { panel, starRow, cardFace, icon, progress, PAL, INK, INK2 } from './sprites.js';
import { drawMonster, hatFor } from './monster.js';
import * as Q from '../learn/questions.js';
import * as M from '../learn/mastery.js';

const NORMAL = g => !['silent', 'split', 'suffix', 'ending', 'schwa'].includes(g.type);
export const lab = g => g.g;

/** Highest unit the child has passed (content cap for games); 0 when nothing is learned yet. */
export function gameCap(app) {
  if (app.state.settings.unlockAll) return Math.max(...app.C.units.map(u => u.id));
  const ids = Object.entries(app.state.units).filter(([, u]) => u.passed).map(([k]) => +k);
  return ids.length ? Math.max(...ids) : 0;
}

export const GAMES = [
  { id: 'catch', icon: '🌸', name: 'Sound Catch', ja: 'おとを キャッチ', skill: 'letter sounds', need: C => true },
  { id: 'ladder', icon: '🐻', name: 'Sound Ladder', ja: 'くまを たすけよう', skill: 'blending / segmenting', need: C => true },
  { id: 'dragon', icon: '🐲', name: 'Dragon Hunt', ja: 'ドラゴンを たおせ', skill: 'finding spellings in words', need: C => true },
  { id: 'beast', icon: 'monster', name: 'Hungry Beast', ja: 'おなかぺこぺこ', skill: 'tricky words', need: C => true },
];

function pools(app) {
  const C = app.C, cap = gameCap(app);
  const gpcs = C.gpcsUpTo(cap).filter(NORMAL);
  const words = C.wordsAt(cap, { names: false, functionWords: false }).filter(w => w.pic && w.g.length >= 2 && w.g.length <= 5 && w.g.every(g => C.gpcs[g] && NORMAL(C.gpcs[g])));
  const tricky = C.trickyList.filter(t => t.release <= cap && t.t.length >= 2);
  return { C, cap, gpcs, words, tricky };
}
/** Is a game playable yet? */
export function gameReady(app, id) {
  if (gameCap(app) < 1) return false;
  const p = pools(app);
  if (id === 'catch') return p.gpcs.length >= 3;
  if (id === 'ladder') return p.words.length >= 4;
  if (id === 'dragon') return p.words.filter(w => w.g.length >= 3).length >= 4;
  if (id === 'beast') return p.tricky.length >= 3;
  return false;
}

// ------------------------------------------------------------------ menu
export class GamesScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; }
  enter() {
    const { app } = this, st = app.state; st.games ??= {};
    const home = new Btn({ x: 14, y: 12, w: 68, h: 56, icon: 'home', size: 30, color: '#e6ebf1', onTap: () => app.goHome() });
    this.ui = [home, ...GAMES.map((g, i) => {
      const ready = gameReady(app, g.id), best = st.games[g.id]?.best || 0;
      return new Btn({ x: 90 + (i % 2) * 600, y: 96 + Math.floor(i / 2) * 240, w: 560, h: 215, shadow: false, customDraw: (c, u) => {
        const off = cardFace(c, 0, 0, u.w, u.h, 'idle', u.press);
        const col = [PAL.Green, PAL.Blue, PAL.Orange, PAL.Purple][i];
        c.fillStyle = ready ? col[1] : '#a8b4bf'; c.beginPath(); c.arc(112, 108 + 7 + off, 72, 0, 7); c.fill(); c.fillStyle = ready ? col[0] : '#c9d3dc'; c.beginPath(); c.arc(112, 108 + off, 72, 0, 7); c.fill();
        if (g.icon === 'monster') drawMonster(c, 112, 116 + off, 78, { color: '#ffffff', t: this.t, blink: true }); else text(c, g.icon, 112, 112 + off, { size: 84 });
        text(c, g.name, 214, 64 + off, { size: 42, color: ready ? INK : '#8a9aa7', font: UIF, weight: '900', align: 'left' });
        text(c, g.ja, 214, 112 + off, { size: 28, color: ready ? INK2 : '#9aa8b4', font: JP, weight: '900', align: 'left' });
        if (ready) { text(c, g.skill, 214, 152 + off, { size: 20, color: INK2, font: UIF, weight: '600', align: 'left' }); starRow(c, 478, 190 + off, best, 3, 28); }
        else { icon(c, 'lock', 226, 156 + off, 26, { color: '#9aa8b4', color2: '#fff' }); text(c, 'もうすこし すすんでね', 252, 158 + off, { size: 22, color: '#9aa8b4', font: JP, weight: '800', align: 'left' }); }
      }, onTap: () => { if (ready) app.eng.go(new MiniScene(app, g.id)); else app.audio.sfx('bad'); } });
    })];
  }
  update(dt) { this.t += dt; }
  draw(c) { background(c, this.t, 'day'); title(c, 'あそぼう！ Games', W / 2, 46, 42); drawUI(c, this.ui); }
}

// ------------------------------------------------------------------ one scene runs any game
const ROUNDS = { catch: 10, ladder: 5, dragon: 6, beast: 8 };
export class MiniScene {
  constructor(app, id) { this.app = app; this.id = id; this.t = 0; this.ui = []; this.parts = new Particles(); this.mood = 'idle'; this.score = 0; this.tries = 0; this.ri = 0; this.dead = false; this.busy = false; this.lock = 0; }
  get eng() { return this.app.eng; }
  get fixed() { return [this.home]; }
  leave() { this.dead = true; this.app.audio.stop(); }
  enter() {
    const { app } = this; this.P = pools(app); this.rng = app.rng; this.n = ROUNDS[this.id];
    this.home = new Btn({ x: 14, y: 12, w: 68, h: 56, icon: 'home', size: 30, color: '#e6ebf1', onTap: () => { this.dead = true; app.audio.stop(); app.eng.go(new GamesScene(app)); } });
    this.last = null; this.round();
  }
  say(keys, opts) { return this.app.audio.play([].concat(keys), opts); }
  update(dt) { this.t += dt; this.parts.update(dt); for (const u of this.ui) if (u.shake > 0) u.shake = Math.max(0, u.shake - dt * 2.4); }
  draw(c) {
    background(c, this.t, this.id === 'beast' ? 'warm' : 'day');
    // progress dots
    progress(c, 98, 26, 1000, 26, this.ri / this.n);
    if (this.res) return this.drawResult(c);
    this.drawGame?.(c);
    drawUI(c, [this.home, ...this.ui]);
    this.parts.draw(c);
  }
  drawMon(c, x, y, s, mood) { drawMonster(c, x, y, s, { color: this.app.colorHex, mood: mood || this.mood, t: this.t, hat: hatFor(Object.values(this.app.state.units).filter(u => u.passed && u.skipped !== true).length) }); }
  drawResult(c) {
    panel(c, 400, 70, 760, 380);
    text(c, 'できたね！', 780, 130, { size: 54, color: INK, font: JP, weight: '900' });
    starRow(c, 780, 230, this.res.stars, 3, 100, this.t * 2.4);
    text(c, `${this.res.ok} / ${this.n}`, 780, 328, { size: 46, color: INK, font: UIF, weight: '900' });
    this.drawMon(c, 168, 412, 212, 'happy'); drawUI(c, this.ui); this.parts.draw(c);
  }
  pick(arr, key) { // avoid repeating the previous item
    const pool = arr.filter(x => !this.used?.has(key(x))); const list = pool.length ? pool : arr; const v = this.rng.pick(list); (this.used ??= new Set()).add(key(v)); if (this.used.size >= arr.length) this.used.clear(); return v;
  }
  round() {
    if (this.dead) return;
    if (this.ri >= this.n) return this.finish();
    this.busy = false; this.tries = 0; this.mood = 'idle'; this['setup_' + this.id]();
  }
  async right(u, nextDelay = 700) {
    this.busy = true; this.score += this.tries === 0 ? 1 : 0; this.app.audio.sfx('good'); this.mood = 'happy';
    if (u) this.parts.burst(u.x + u.w / 2, u.y + u.h / 2, 14);
    await this.eng.wait(nextDelay); if (this.dead) return; this.ri++; this.round();
  }
  wrong(u) { this.tries++; this.app.audio.sfx('bad'); this.mood = 'oops'; if (u) { u.st = 'wrong'; u.shake = 1; } setTimeout(() => { if (!this.dead) this.mood = 'idle'; }, 700); }
  async finish() {
    const { app } = this, ok = this.score, acc = ok / this.n, stars = acc >= 0.85 ? 3 : acc >= 0.6 ? 2 : 1;
    const g = (app.state.games ??= {}); const prev = g[this.id] || { best: 0, plays: 0 }; g[this.id] = { best: Math.max(prev.best, stars), plays: prev.plays + 1 };
    app.state.stats.secondsPlayed += 0; app.save(true);
    this.res = { ok, stars }; this.app.audio.sfx('win'); this.parts.burst(780, 200, 40);
    this.ui = [new Btn({ x: 540, y: 372, w: 210, h: 90, icon: 'replay', size: 50, color: '#5bd16f', onTap: () => app.eng.go(new MiniScene(app, this.id)) }),
      new Btn({ x: 790, y: 372, w: 210, h: 90, icon: 'home', size: 50, color: '#ff9f4a', onTap: () => app.eng.go(new GamesScene(app)) })];
    this.home.visible = false;
  }
  bubbleBtn(x, y, w, h, o) { return new Btn({ x, y, w, h, shadow: false, st: 'idle', shake: 0, ...o }); }
  tileDraw(label, size, { r = 28, fill } = {}) {
    return (c, u) => {
      const dx = Math.sin(u.shake * 40) * 10 * u.shake; c.translate(dx, 0);
      const f = fill ? fill(u) : u.st === 'right' ? '#8ee59a' : u.st === 'wrong' ? '#ffb3a8' : '#fff';
      const off = card(c, u.w, u.h, { fill: f, press: u.press });
      if (f !== '#fff' && f !== '#8ee59a' && f !== '#ffb3a8') { c.fillStyle = f; c.globalAlpha = 0.7; c.beginPath(); c.roundRect(3, 3, u.w - 6, u.h - 14, 24); c.fill(); c.globalAlpha = 1; }
      let sz = size; c.font = `bold ${sz}px ${FONT}`; const mw = c.measureText(label).width; if (mw > u.w - 28) sz = Math.floor(sz * (u.w - 28) / mw);
      text(c, label, u.w / 2, off + (u.h - 8) / 2 + 1, { size: sz, color: INK });
    };
  }

  // ---------------------------------------------------------------- Sound Catch: hear a sound, tap the bubble that shows it
  setup_catch() {
    const g = this.pick(this.P.gpcs, x => x.id), q = Q.listenPick(this.P.C, g.id, this.P.cap, this.rng, 4);
    this.q = q; const n = q.options.length, gap = 24, bw = Math.min(230, (1000 - gap * (n - 1)) / n), x0 = 830 - (n * bw + (n - 1) * gap) / 2;
    this.bubbles = q.options.map((o, i) => this.bubbleBtn(x0 + i * (bw + gap), 300, bw, bw, { idx: i, ph: this.rng.next() * 6,
      customDraw: (c, u) => {
        const bob = Math.sin(this.t * 2 + u.ph) * 14; c.translate(u.shake ? Math.sin(u.shake * 40) * 10 * u.shake : 0, bob);
        const col = u.st === 'right' ? PAL.Green : u.st === 'wrong' ? PAL.Red : ['#e9eef5', '#c3ccd8'], R = u.w / 2;
        c.fillStyle = col[1]; c.beginPath(); c.arc(R, R + 8, R, 0, 7); c.fill(); c.fillStyle = col[0]; c.beginPath(); c.arc(R, R, R, 0, 7); c.fill();
        c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(R * 0.7, R * 0.42, R * 0.4, R * 0.18, -0.5, 0, 7); c.fill();
        text(c, o.label, R, R + 6, { size: o.label.length > 1 ? 84 : 110, color: u.st === 'idle' ? INK : '#fff' });
      },
      onTap: async u => { if (this.busy || u.st === 'wrong') return; if (u.idx === q.answer) { u.st = 'right'; await this.say(['gpc:' + g.id]); this.right(u, 300); } else { this.wrong(u); this.say(['gpc:' + g.id]); } } }));
    this.answerBtn = () => this.bubbles[q.answer];
    this.speakBtn = new Btn({ x: 700, y: 100, w: 130, h: 130, shadow: false, customDraw: c => speaker(c, 65, 65, 60, false, this.t), onTap: () => this.say(['gpc:' + g.id]) });
    this.ui = [this.speakBtn, ...this.bubbles]; this.drawGame = c => { this.drawMon(c, 168, 412, 212); text(c, 'おとを きいて、タップ！', 830, 262, { size: 28, color: INK, font: JP, weight: '900', stroke: { w: 7, c: 'rgba(255,255,255,.9)' } }); };
    setTimeout(() => !this.dead && this.say(['gpc:' + g.id]), 350);
  }

  // ---------------------------------------------------------------- Sound Ladder: tap each sound in order to climb; the bear is freed with the whole word
  setup_ladder() {
    const { C } = this.P, w = this.pick(this.P.words, x => x.id), tiles = w.g.map(g => ({ id: g, label: lab(C.gpcs[g]) }));
    this.k = 0; this.climb = 0; const n = tiles.length, gap = 16, tw = Math.min(190, (880 - gap * (n - 1)) / n), x0 = 860 - (n * tw + (n - 1) * gap) / 2;
    this.btns = tiles.map((t, i) => this.bubbleBtn(x0 + i * (tw + gap), 360, tw, 150, { idx: i, customDraw: this.tileDraw(t.label, 100, { fill: u => (u.idx < this.k ? '#ffe9a0' : u.st === 'wrong' ? '#ffb3a8' : '#fff') }),
      onTap: async u => {
        if (this.busy) return;
        if (u.idx !== this.k) { this.wrong(u); this.app.audio.sfx('bad'); return; }
        this.k++; this.eng.tween(this, { climb: this.k / n }, 380, 'out'); await this.say(['gpc:' + tiles[u.idx].id], { gap: 0.05 });
        if (this.dead) return; if (this.k >= n) { this.mood = 'happy'; this.busy = true; await this.say(['w:' + w.id]); this.busy = false; this.right(u, 500); }
      } }));
    this.answerBtn = () => this.btns[this.k];
    this.ui = [new Btn({ x: 560, y: 90, w: 100, h: 100, shadow: false, customDraw: c => speaker(c, 50, 50, 46, false, this.t), onTap: () => this.say(['w:' + w.id]) }), ...this.btns];
    this.drawGame = c => {
      // ladder + bear
      const lx = 200, top = 120, bot = 540; c.strokeStyle = '#a86b32'; c.lineWidth = 12; c.beginPath(); c.moveTo(lx - 60, bot); c.lineTo(lx - 60, top); c.moveTo(lx + 60, bot); c.lineTo(lx + 60, top); c.stroke();
      c.lineWidth = 8; for (let i = 0; i <= n; i++) { const y = bot - (bot - top) * (i / n); c.beginPath(); c.moveTo(lx - 60, y); c.lineTo(lx + 60, y); c.stroke(); }
      icon(c, 'home', lx, top - 26, 56, { color: '#ff9f4a', shadow: 3 }); text(c, '🐻', lx, bot - (bot - top) * this.climb - 30, { size: 90 });
      picText(c, w.pic, 860, 175, 120); text(c, 'おとを じゅんばんに タップ！', 860, 300, { size: 28, color: INK, font: JP, weight: '900', stroke: { w: 7, c: 'rgba(255,255,255,.9)' } });
    };
    setTimeout(() => !this.dead && this.say(['w:' + w.id]), 350);
  }

  // ---------------------------------------------------------------- Dragon Hunt: hear a sound, tap its spelling inside the word
  setup_dragon() {
    const { C } = this.P, cands = this.P.words.filter(w => w.g.length >= 3), w = this.pick(cands, x => x.id);
    const target = this.rng.pick(w.g), n = w.g.length, gap = 16, tw = Math.min(180, (900 - gap * (n - 1)) / n), x0 = 830 - (n * tw + (n - 1) * gap) / 2;
    const hear = () => this.say(['gpc:' + target]);
    this.btns = w.g.map((g, i) => this.bubbleBtn(x0 + i * (tw + gap), 350, tw, 150, { idx: i, customDraw: this.tileDraw(lab(C.gpcs[g]), 100),
      onTap: async u => { if (this.busy || u.st === 'wrong') return; if (w.g[u.idx] === target) { u.st = 'right'; this.hit = 1; this.eng.tween(this, { hit: 0 }, 500, 'out'); this.right(u, 650); } else { this.wrong(u); hear(); } } }));
    this.hit = 0; this.answerBtn = () => this.btns.find(b => w.g[b.idx] === target);
    this.ui = [new Btn({ x: 590, y: 100, w: 120, h: 120, shadow: false, customDraw: c => speaker(c, 60, 60, 56, false, this.t), onTap: hear }), ...this.btns];
    this.drawGame = c => {
      this.drawMon(c, 168, 412, 212); picText(c, w.pic, 840, 170, 110);
      const hp = this.n - this.ri, dx = 1120 + Math.sin(this.t * 20) * 14 * this.hit;
      text(c, '🐲', dx, 180, { size: 150 }); progress(c, 1020, 266, 200, 22, hp / this.n, { fill: PAL.Red });
      text(c, 'この おとの もじを タップ！', 830, 300, { size: 28, color: INK, font: JP, weight: '900', stroke: { w: 7, c: 'rgba(255,255,255,.9)' } });
    };
    setTimeout(() => !this.dead && hear(), 350);
  }

  // ---------------------------------------------------------------- Hungry Beast: hear a tricky word, feed the beast the right card
  setup_beast() {
    const list = this.P.tricky, t = this.pick(list, x => x.id);
    const others = this.rng.shuffle(list.filter(x => x.id !== t.id)).slice(0, 2), opts = this.rng.shuffle([t, ...others]);
    const bw = 270, gap = 30, x0 = 850 - (opts.length * bw + (opts.length - 1) * gap) / 2;
    const hear = () => this.say(['w:' + t.id]);
    this.btns = opts.map((o, i) => this.bubbleBtn(x0 + i * (bw + gap), 330, bw, 160, { idx: i, fx: 0, customDraw: (c, u) => this.tileDraw(o.t, 84)(c, u),
      onTap: async u => {
        if (this.busy || u.st === 'wrong') return;
        if (o.id === t.id) { this.busy = true; this.mood = 'happy'; await this.eng.tween(u, { x: 120, y: 330 }, 420, 'inOut'); u.visible = false; this.mouthOpen = 1; this.parts.burst(190, 420, 16); this.right(null, 600); }
        else { this.wrong(u); hear(); }
      } }));
    this.mouthOpen = 0; this.answerBtn = () => this.btns[opts.indexOf(t)];
    this.ui = [new Btn({ x: 700, y: 110, w: 120, h: 120, shadow: false, customDraw: c => speaker(c, 60, 60, 56, false, this.t), onTap: hear }), ...this.btns];
    this.drawGame = c => { this.drawMon(c, 180, 402, 240, this.mouthOpen || this.mood === 'happy' ? 'happy' : this.mood); text(c, 'きこえた ことばを たべさせよう！', 830, 290, { size: 28, color: INK, font: JP, weight: '900', stroke: { w: 7, c: 'rgba(255,255,255,.9)' } }); };
    setTimeout(() => !this.dead && hear(), 350);
  }
}
