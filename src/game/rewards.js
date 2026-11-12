// Rewards: a sticker album (one sticker per finished lesson, more for finishing a unit), a wardrobe of hats
// (one unlocked per unit), a days-in-a-row counter, and the big "unit complete" celebration.
import { W, H, FONT, JP, UIF, text, Btn, Particles, drawUI } from './engine.js';
import { panel, cardFace, slab, icon, starShape, INK, INK2 } from './sprites.js';
import { background, title, caption } from './ui.js';
import { drawMonster, hatOf, HAT_LIST, hatsUnlocked } from './monster.js';
import { unitInfo, STAGE_INFO } from './unitinfo.js';

export const STICKERS = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦉', '🦄', '🐝', '🦋',
  '🐞', '🐢', '🐙', '🐬', '🐳', '🦈', '🦀', '🐠', '🦕', '🦖', '🍎', '🍓', '🍉', '🍌', '🍒', '🍑', '🍍', '🥝', '🍩', '🍪',
  '🍰', '🧁', '🍦', '🍭', '🍕', '🍔', '🍙', '🍣', '🚀', '🚂', '🚗', '🚲', '⛵', '🚁', '🎈', '🎁', '🎨', '🎸', '🥁', '⚽',
  '🏀', '🪁', '🌈', '⭐', '🌙', '☀️', '🌸', '🌻', '🍀', '🌵', '🍄', '💎'];

/** Give one sticker the child does not have yet (or a random one when the album is full). */
export function awardSticker(state, rng) {
  const have = new Set(state.stickers ??= []); const left = STICKERS.filter(s => !have.has(s));
  const s = left.length ? left[Math.floor((rng?.next?.() ?? Math.random()) * left.length)] : STICKERS[Math.floor(Math.random() * STICKERS.length)];
  if (!have.has(s)) state.stickers.push(s);
  return s;
}

const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
/** Days in a row with at least one finished lesson. */
export function markDay(state) {
  const today = dayKey(), y = new Date(); y.setDate(y.getDate() - 1); const yest = dayKey(y);
  const d = (state.days ??= { last: null, streak: 0, total: 0 });
  if (d.last === today) return d;
  d.streak = d.last === yest ? d.streak + 1 : 1; d.last = today; d.total++; return d;
}
export function currentStreak(state) {
  const d = state.days; if (!d?.last) return 0; const y = new Date(); y.setDate(y.getDate() - 1);
  return d.last === dayKey() || d.last === dayKey(y) ? d.streak : 0;
}

// ------------------------------------------------------------------ album + wardrobe
export class StickerScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; this.tab = 0; }
  enter() { this.build(); }
  build() {
    const { app } = this, st = app.state;
    const home = new Btn({ x: 14, y: 12, w: 70, h: 72, icon: 'home', size: 36, color: '#42b4f5', onTap: () => app.goHome() });
    const tabs = [['シール', 'Stickers'], ['ぼうし', 'Hats']].map(([ja, en], i) => new Btn({ x: 470 + i * 220, y: 16, w: 200, h: 64, label: ja, size: 26, font: JP,
      color: this.tab === i ? '#ff9f4a' : '#e6ebf1', onTap: () => { this.tab = i; this.build(); } }));
    this.ui = [home, ...tabs];
    if (this.tab === 1) {
      const n = hatsUnlocked(st);
      HAT_LIST.forEach((h, i) => {
        const x = 330 + (i % 4) * 200, y = 110 + Math.floor(i / 4) * 230, open = i <= n;
        this.ui.push(new Btn({ x, y, w: 180, h: 210, shadow: false, customDraw: (c, u) => {
          const on = hatOf(st) === h, off = cardFace(c, 0, 0, u.w, u.h, on ? 'right' : 'idle', u.press, false);
          if (open) drawMonster(c, u.w / 2, off + 106, 110, { color: app.colorHex, hat: h, t: this.t + i, mood: on ? 'happy' : 'idle' });
          else { c.globalAlpha = 0.35; drawMonster(c, u.w / 2, off + 106, 110, { color: '#9aa7b4', hat: h, t: 0, blink: false }); c.globalAlpha = 1; icon(c, 'lock', u.w / 2, off + 110, 50, { color: '#7d8b98' }); }
          text(c, open ? (h === 'none' ? 'なし' : on ? 'きてる！' : 'タップ') : `ユニット ${i}`, u.w / 2, off + u.h - 26, { size: 18, color: open ? INK : INK2, font: JP, weight: '900' });
        }, onTap: () => { if (!open) { app.audio.sfx('bad'); return; } st.hat = h; app.save(); app.audio.sfx('gem'); } }));
      });
    }
  }
  update(dt) { this.t += dt; }
  draw(c) {
    const { app } = this, st = app.state; background(c, this.t, 'day');
    if (this.tab === 0) {
      const have = new Set(st.stickers || []);
      panel(c, 60, 96, W - 120, 488, { r: 32, fill: '#fffaf0', border: '#f1dfb8', lip: '#e5cf9f' });
      text(c, `${have.size} / ${STICKERS.length}`, W - 110, 48, { size: 28, color: INK, font: UIF, weight: '900', align: 'right', stroke: { w: 6, c: '#fff' } });
      STICKERS.forEach((s, i) => {
        const col = i % 18, row = Math.floor(i / 18), x = 118 + col * 68, y = 150 + row * 108, got = have.has(s);
        c.fillStyle = got ? '#fff' : 'rgba(180,160,120,.14)'; c.beginPath(); c.arc(x, y, 30, 0, 7); c.fill();
        if (got) { c.save(); c.translate(x, y); c.rotate(Math.sin(i * 7) * 0.15); text(c, s, 0, 2, { size: 40, font: FONT }); c.restore(); c.strokeStyle = '#f1dfb8'; c.lineWidth = 3; c.beginPath(); c.arc(x, y, 30, 0, 7); c.stroke(); }
        else text(c, '?', x, y + 2, { size: 26, color: 'rgba(160,130,80,.45)', font: UIF, weight: '900' });
      });
      caption(c, 'レッスンを おえると シールが もらえるよ！', W / 2, 562, 16);
    } else {
      drawMonster(c, 170, 400, 220, { color: app.colorHex, hat: hatOf(st), t: this.t, mood: 'happy' });
      caption(c, 'ユニットを クリアすると あたらしい ぼうし！', W / 2 + 120, 572, 16);
    }
    drawUI(c, this.ui);
  }
}

// ------------------------------------------------------------------ unit / stage complete
export class CelebrateScene {
  constructor(app, { unit, stage, stickers, hat }) { Object.assign(this, { app, unit, stage, stickers, hat }); this.t = 0; this.parts = new Particles(); this.ui = []; }
  enter() {
    const { app } = this; this.items = this.stickers.map((s, i) => ({ s, x: W / 2 + (i - 1) * 130, y: -100, r: 0 }));
    app.audio.sfx('win');
    this.items.forEach((o, i) => app.eng.tween(o, { y: 400 }, 700, 'back', 600 + i * 300).then(() => { app.audio.sfx('gem'); this.parts.burst(o.x, o.y, 16); }));
    this.ui = [new Btn({ x: W - 330, y: 478, w: 300, h: 96, label: 'つぎへ  Next', icon: 'fwd', size: 34, font: JP, color: '#58c46a', onTap: () => app.goHome() })];
    this.burstT = 0;
  }
  update(dt) {
    this.t += dt; this.parts.update(dt); this.burstT -= dt;
    if (this.burstT <= 0 && this.t < 6) { this.burstT = 0.45; this.parts.burst(120 + Math.random() * (W - 240), 60 + Math.random() * 200, 22); }
  }
  draw(c) {
    const { app } = this, ui = unitInfo(this.unit);
    background(c, this.t, 'day');
    // sun rays
    c.save(); c.translate(W / 2, 250); c.rotate(this.t * 0.25); c.fillStyle = 'rgba(255,230,140,.35)';
    for (let i = 0; i < 12; i++) { c.rotate(Math.PI / 6); c.beginPath(); c.moveTo(0, 0); c.lineTo(-60, -700); c.lineTo(60, -700); c.closePath(); c.fill(); } c.restore();
    const jump = -Math.abs(Math.sin(this.t * 5)) * 40;
    drawMonster(c, 210, 420 + jump, 250, { color: app.colorHex, hat: hatOf(app.state), t: this.t, mood: 'happy', jump: 0 });
    const big = this.stage != null ? 'ステージ クリア！' : 'ユニット クリア！';
    const sc = Math.min(1, this.t * 3); c.save(); c.translate(W / 2, 92); c.scale(sc, sc);
    text(c, big, 0, 0, { size: 72, color: '#fff', font: JP, weight: '900', stroke: { w: 18, c: '#ff7a3c' } }); text(c, big, 0, 0, { size: 72, color: '#fff', font: JP, weight: '900' }); c.restore();
    text(c, this.stage != null ? `${STAGE_INFO[this.stage]?.ja || ''}  ·  ${STAGE_INFO[this.stage]?.en || ''}` : `${ui.ja}  ·  ${ui.en}`, W / 2, 158, { size: 26, color: INK, font: JP, weight: '900', stroke: { w: 8, c: 'rgba(255,255,255,.9)' } });
    if (this.stage != null) { icon(c, 'trophy', W / 2, 262, 120, { color: '#ffc83d', shadow: 6 }); }
    else { [0, 1, 2].forEach(i => starShape(c, W / 2 + (i - 1) * 100, 255 - (i === 1 ? 16 : 0), i === 1 ? 88 : 70, true)); }
    if (this.hat) { panel(c, W - 330, 200, 280, 230, { r: 28 }); drawMonster(c, W - 190, 318, 116, { color: app.colorHex, hat: this.hat, t: this.t, mood: 'happy' });
      text(c, 'あたらしい ぼうし！', W - 190, 408, { size: 22, color: '#b36b00', font: JP, weight: '900' }); }
    text(c, 'シール ゲット！', W / 2, 330, { size: 26, color: INK, font: JP, weight: '900', stroke: { w: 8, c: 'rgba(255,255,255,.9)' } });
    for (const o of this.items) { c.fillStyle = '#fff'; c.beginPath(); c.arc(o.x, o.y, 52, 0, 7); c.fill(); c.strokeStyle = '#ffd24a'; c.lineWidth = 6; c.stroke(); text(c, o.s, o.x, o.y + 3, { size: 60, font: FONT }); }
    drawUI(c, this.ui); this.parts.draw(c);
  }
}
