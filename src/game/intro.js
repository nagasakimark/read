// Welcome tutorial: explains what the app is and how to play, in Japanese first with English underneath.
// Shown automatically the first time a player is created, and from the ? button on the home map.
import { W, H, FONT, JP, UIF, text, rr, Btn, drawUI } from './engine.js';
import { background, speaker, speech, title } from './ui.js';
import { drawMonster } from './monster.js';
import { panel, cardFace, icon, starShape, PAL, INK, INK2 } from './sprites.js';

const PAGES = [
  { ja: 'ハロー！ ぼくは よみかたモンスター！', en: "Hi! I'm your reading monster.", cap: ['いっしょに えいごを よめるように なろう！', "Let's learn to read English together!"], art: 'hello' },
  { ja: 'まず、よく きいてね', en: 'First, listen.', cap: ['スピーカーを タップすると、もういちど きけるよ', 'Tap the speaker to hear it again.'], art: 'listen' },
  { ja: 'つぎに、こたえを タップ！', en: 'Then tap the answer.', cap: ['まちがえても だいじょうぶ。もういちど やってみよう！', "Mistakes are OK. Just try again!"], art: 'tap' },
  { ja: 'まいにち ちょっとずつ', en: 'A little every day.', cap: ['「あそぶ」で つづきから。ほしと ジェムを あつめよう！', 'Press Play to continue. Collect stars and gems!'], art: 'path' },
  { ja: 'ほかにも あるよ！', en: 'And there is more!', cap: ['ゲームは さいしょの ユニットが おわったら あそべるよ', 'Games unlock after your first unit.'], art: 'icons' },
];

export class IntroScene {
  constructor(app, onDone) { this.app = app; this.onDone = onDone; this.t = 0; this.p = 0; this.ui = []; }
  enter() { this.build(); }
  build() {
    const last = this.p === PAGES.length - 1;
    this.ui = [new Btn({ x: 1100, y: 478, w: 240, h: 94, label: last ? 'はじめよう！' : '', icon: 'play', size: last ? 32 : 50, font: JP, color: '#5bd16f', onTap: () => this.next() })];
    if (this.p > 0) this.ui.push(new Btn({ x: 960, y: 488, w: 90, h: 76, icon: 'back', size: 36, color: '#42b4f5', onTap: () => { this.p--; this.build(); } }));
    if (!last) this.ui.push(new Btn({ x: W - 150, y: 14, w: 136, h: 52, label: 'スキップ', size: 20, font: JP, color: '#e6ebf1', onTap: () => this.finish() }));
  }
  next() { if (this.p >= PAGES.length - 1) return this.finish(); this.p++; this.build(); this.app.audio.sfx('pop'); }
  finish() { this.onDone(); }
  update(dt) { this.t += dt; }
  draw(c) {
    const pg = PAGES[this.p], t = this.t;
    background(c, t, 'day');
    for (let i = 0; i < PAGES.length; i++) { c.fillStyle = i === this.p ? '#ff9f4a' : 'rgba(255,255,255,.9)'; c.beginPath(); c.arc(W / 2 - 60 + i * 30, 32, i === this.p ? 10 : 7, 0, 7); c.fill(); }
    drawMonster(c, 168, 412, 212, { color: this.app.colorHex, mood: 'happy', t, hat: 'crown' });
    speech(c, 14, 78, 282, pg.ja, pg.en);
    panel(c, 340, 62, 700, 400);
    this.art(c, pg.art, 690, 235, t);
    text(c, pg.cap[0], 690, 394, { size: 27, color: INK, font: JP, weight: '900' });
    text(c, pg.cap[1], 690, 432, { size: 21, color: INK2, font: UIF, weight: '600' });
    drawUI(c, this.ui);
  }
  art(c, kind, cx, cy, t) {
    const badge = (x, y, r, col, ic, isz) => { c.fillStyle = col[1]; c.beginPath(); c.arc(x, y + 7, r, 0, 7); c.fill(); c.fillStyle = col[0]; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); icon(c, ic, x, y, isz, { color: '#fff' }); };
    if (kind === 'hello') {
      text(c, 'ABC', cx, cy - 10, { size: 150, color: '#ff8a3c', font: UIF, weight: '900', stroke: { w: 16, c: '#fff' } });
      text(c, 'a  b  c', cx, cy + 92, { size: 60, color: '#42b4f5', font: UIF, weight: '900' });
      icon(c, 'sparkle', cx + 250 + Math.sin(t * 4) * 6, cy - 100, 56, { color: '#ffc83d' }); icon(c, 'sparkle', cx - 260, cy - 60 + Math.sin(t * 3) * 6, 38, { color: '#ff9f4a' });
    } else if (kind === 'listen') {
      for (let i = 0; i < 3; i++) { const k = (t * 1.2 + i / 3) % 1; c.strokeStyle = `rgba(255,170,0,${0.6 - k * 0.6})`; c.lineWidth = 6; c.beginPath(); c.arc(cx, cy, 100 + k * 90, 0, 7); c.stroke(); }
      speaker(c, cx, cy, 88 + Math.sin(t * 5) * 3, true, t);
      icon(c, 'listen', cx - 280, cy, 100, { color: '#42b4f5' }); text(c, 's …', cx + 280, cy, { size: 80, color: '#ff5a3c', font: UIF, weight: '900' });
    } else if (kind === 'tap') {
      ['s', 'm', 't'].forEach((l, i) => { const x = cx - 220 + i * 220, hot = i === 1; c.save(); c.translate(x - 80, cy - 90); cardFace(c, 0, 0, 160, 160, hot ? 'right' : 'idle'); text(c, l, 80, 76, { size: 110, color: INK }); c.restore(); });
      badge(cx + 70, cy - 100, 26, PAL.Green, 'check', 26);
      icon(c, 'tap', cx + 6 + Math.sin(t * 5) * 6, cy + 90 + Math.sin(t * 5) * 8, 76, { color: '#ff9f4a', shadow: 4 });
    } else if (kind === 'path') {
      c.strokeStyle = '#f3dcaa'; c.lineWidth = 30; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx - 280, cy + 30); c.lineTo(cx - 140, cy - 30); c.lineTo(cx, cy + 20); c.lineTo(cx + 140, cy - 40); c.lineTo(cx + 280, cy + 10); c.stroke();
      [[-280, 30, 'check'], [-140, -30, 'check'], [0, 20, 'play'], [140, -40, 'lock'], [280, 10, 'lock']].forEach(([dx, dy, ic], i) => badge(cx + dx, cy + dy, 40, i < 2 ? PAL.Yellow : i === 2 ? PAL.Green : ['#c9d3dc', '#a8b4bf'], ic, i < 2 ? 36 : 34));
      [-1, 0, 1].forEach(k => starShape(c, cx + k * 62, cy - 112 + (k === 0 ? -8 : 0), 52, true, k * 0.18));
    } else if (kind === 'icons') {
      [['gamepad', PAL.Purple, 'ゲーム', 'Games'], ['star', PAL.Yellow, 'きろく', 'My stars'], ['home', PAL.Orange, 'おうちへ', 'Home (saves)']].forEach(([ic, col, ja, en], i) => { const x = cx - 220 + i * 220; badge(x, cy - 40, 60, col, ic, 64); text(c, ja, x, cy + 50, { size: 28, color: INK, font: JP, weight: '900' }); text(c, en, x, cy + 82, { size: 20, color: INK2, font: UIF, weight: '600' }); });
    }
  }
}
