// Welcome tutorial: explains what the app is and how to play, in Japanese first with English underneath.
// Shown automatically the first time a player is created, and from the ❓ button on the home map.
import { W, H, FONT, JP, text, rr, Btn, drawUI } from './engine.js';
import { background, speaker, speech, card } from './ui.js';
import { drawMonster } from './monster.js';
import { panel } from './sprites.js';

const PAGES = [
  { ja: 'ハロー！ ぼくは よみかたモンスター！', en: "Hi! I'm your reading monster.", cap: ['いっしょに えいごを よめるように なろう！', "Let's learn to read English together!"], art: 'hello' },
  { ja: 'まず、よく きいてね', en: 'First, listen.', cap: ['🔊を タップすると、もういちど きけるよ', 'Tap 🔊 to hear it again.'], art: 'listen' },
  { ja: 'つぎに、こたえを タップ！', en: 'Then tap the answer.', cap: ['まちがえても だいじょうぶ。もういちど やってみよう！', "Mistakes are OK. Just try again!"], art: 'tap' },
  { ja: 'まいにち ちょっとずつ', en: 'A little every day.', cap: ['「あそぶ」で つづきから。ほしと ジェムを あつめよう！', 'Press Play to continue. Collect stars and gems!'], art: 'path' },
  { ja: 'ほかにも あるよ！', en: 'And there is more!', cap: ['ゲームは さいしょの ユニットが おわったら あそべるよ', 'Games unlock after your first unit.'], art: 'icons' },
];

export class IntroScene {
  constructor(app, onDone) { this.app = app; this.onDone = onDone; this.t = 0; this.p = 0; this.ui = []; }
  enter() { this.build(); }
  build() {
    const last = this.p === PAGES.length - 1;
    this.ui = [new Btn({ x: 1130, y: 480, w: 200, h: 90, label: last ? 'はじめよう！' : '▶', size: last ? 34 : 56, font: JP, color: '#58c46a', onTap: () => this.next() })];
    if (this.p > 0) this.ui.push(new Btn({ x: 930, y: 490, w: 90, h: 70, label: '◀', size: 36, color: '#5aa7d6', onTap: () => { this.p--; this.build(); } }));
    if (!last) this.ui.push(new Btn({ x: W - 150, y: 14, w: 136, h: 48, label: 'スキップ', size: 22, font: JP, color: '#9fb2c1', r: 16, onTap: () => this.finish() }));
  }
  next() { if (this.p >= PAGES.length - 1) return this.finish(); this.p++; this.build(); this.app.audio.sfx('pop'); }
  finish() { this.onDone(); }
  update(dt) { this.t += dt; }
  draw(c) {
    const pg = PAGES[this.p], t = this.t;
    background(c, t, 'day');
    for (let i = 0; i < PAGES.length; i++) { c.fillStyle = i === this.p ? '#ff8a3c' : 'rgba(255,255,255,.8)'; c.beginPath(); c.arc(W / 2 - 60 + i * 30, 30, i === this.p ? 9 : 6, 0, 7); c.fill(); }
    drawMonster(c, 150, 410, 220, { color: this.app.colorHex, mood: 'happy', t, hat: 'crown' });
    speech(c, 14, 72, 282, pg.ja, pg.en);
    // art card
    panel(c, 340, 62, 700, 400);
    this.art(c, pg.art, 690, 235, t);
    text(c, pg.cap[0], 690, 392, { size: 28, color: '#23394b', font: JP });
    text(c, pg.cap[1], 690, 432, { size: 22, color: '#5b7388', weight: 'normal' });
    drawUI(c, this.ui);
  }
  art(c, kind, cx, cy, t) {
    if (kind === 'hello') {
      text(c, 'ABC', cx, cy - 20, { size: 150, color: '#ff8a3c', stroke: { w: 14, c: '#fff' } });
      text(c, '👋', cx + 250 + Math.sin(t * 6) * 8, cy - 90, { size: 90 }); text(c, 'a  b  c', cx, cy + 90, { size: 60, color: '#4aa3e8' });
    } else if (kind === 'listen') {
      speaker(c, cx, cy, 90 + Math.sin(t * 5) * 4, true);
      for (let i = 0; i < 3; i++) { c.strokeStyle = `rgba(255,170,0,${0.7 - ((t * 1.2 + i / 3) % 1) * 0.7})`; c.lineWidth = 6; c.beginPath(); c.arc(cx, cy, 100 + ((t * 1.2 + i / 3) % 1) * 90, 0, 7); c.stroke(); }
      text(c, '👂', cx - 280, cy, { size: 80 }); text(c, 's  …', cx + 280, cy, { size: 80, color: '#ff5a3c' });
    } else if (kind === 'tap') {
      ['s', 'm', 't'].forEach((l, i) => { const x = cx - 220 + i * 220, hot = i === 1; c.save(); c.translate(x, cy - 10); rr(c, -80, -80, 160, 160, 28); c.fillStyle = hot ? '#8ee59a' : '#f3f8fc'; c.fill(); c.lineWidth = hot ? 7 : 4; c.strokeStyle = hot ? '#2f9e44' : '#9fb4c4'; c.stroke(); text(c, l, 0, 4, { size: 110, color: '#23394b' }); c.restore(); });
      text(c, '👆', cx + 10 + Math.sin(t * 5) * 6, cy + 80 + Math.sin(t * 5) * 10, { size: 70 }); text(c, '✔', cx + 60, cy - 90, { size: 56, color: '#2f9e44' });
    } else if (kind === 'path') {
      c.strokeStyle = '#e8d3a0'; c.lineWidth = 30; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx - 280, cy + 30); c.lineTo(cx - 140, cy - 30); c.lineTo(cx, cy + 20); c.lineTo(cx + 140, cy - 40); c.lineTo(cx + 280, cy + 10); c.stroke();
      [[-280, 30, '✔'], [-140, -30, '✔'], [0, 20, '▶'], [140, -40, '🔒'], [280, 10, '🔒']].forEach(([dx, dy, ch], i) => { c.fillStyle = i < 2 ? '#ffd23f' : i === 2 ? '#fff' : '#b5c3cf'; c.beginPath(); c.arc(cx + dx, cy + dy, 40, 0, 7); c.fill(); c.lineWidth = 5; c.strokeStyle = i === 2 ? '#58c46a' : '#fff'; c.stroke(); text(c, ch, cx + dx, cy + dy + 2, { size: 34, color: i === 2 ? '#58c46a' : '#7a5a00' }); });
      text(c, '⭐ ⭐ ⭐', cx, cy - 110, { size: 52 });
    } else if (kind === 'icons') {
      [['🎮', 'ゲーム', 'Games'], ['⭐', 'きろく', 'My stars'], ['🏠', 'おうちへ', 'Home (saves)']].forEach(([ic, ja, en], i) => { const x = cx - 220 + i * 220; text(c, ic, x, cy - 30, { size: 90 }); text(c, ja, x, cy + 50, { size: 28, color: '#23394b', font: JP }); text(c, en, x, cy + 82, { size: 20, color: '#5b7388', weight: 'normal' }); });
    }
  }
}
