import { W, H, FONT, JP, UIF, text, rr, shade, Btn, Particles, drawUI, star } from './engine.js';
import { background, speaker, title, caption } from './ui.js';
import { drawMonster, hatFor } from './monster.js';
import { COLORS, toCode, fromCode } from './store.js';
import { LessonScene } from './lesson.js';
import { GamesScene } from './minigames.js';
import { IntroScene } from './intro.js';
import { panel, starRow, starShape, cardFace, slab, icon, PAL, INK, INK2 } from './sprites.js';
import * as M from '../learn/mastery.js';
import { practiceSpec, checkpointSpec } from '../learn/lessonplan.js';

export const gLabel = g => (g.id === 'sz' ? 's/z' : g.type === 'split' ? g.g + '_e' : g.g);
const passedCount = st => Object.values(st.units).filter(u => u.passed && !u.skipped).length;

// ------------------------------------------------------------------ tap to start (also unlocks audio)
export class BootScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; }
  enter() {
    this.go = false;
    this.start = new Btn({ x: W / 2 - 40, y: 478, w: 400, h: 100, label: 'はじめる！  Start', icon: 'play', size: 38, font: JP, color: '#5bd16f', onTap: async () => {
      if (this.go) return; this.go = true; this.app.audio.unlock(); this.app.audio.sfx('win'); await this.app.start();
    } });
    this.ui = [new Btn({ x: 0, y: 0, w: W, h: H, customDraw: () => {}, onTap: () => this.start.onTap() }), this.start];
  }
  update(dt) { this.t += dt; }
  draw(c) {
    const t = this.t;
    background(c, t, 'day');
    // title: each letter bobs a little
    const str = "Let's Read English!"; c.font = `900 96px ${UIF}`; const tw = c.measureText(str).width; let x = W / 2 - tw / 2;
    for (const [i, ch] of [...str].entries()) { const w = c.measureText(ch).width, y = 108 + Math.sin(t * 2.4 + i * 0.5) * 5;
      c.save(); c.shadowColor = 'rgba(160,40,20,.35)'; c.shadowBlur = 0; c.shadowOffsetY = 8; text(c, ch, x + w / 2, y, { size: 96, color: '#fff', font: UIF, weight: '900', stroke: { w: 20, c: '#ef5a3c' } }); c.restore();
      text(c, ch, x + w / 2, y, { size: 96, color: ['#fff'][0], font: UIF, weight: '900' }); x += w; }
    title(c, 'えいごの よみかたを たのしく まなぼう', W / 2, 196, 32);
    drawMonster(c, 330, 400, 300, { color: '#58c46a', mood: 'happy', t, hat: 'crown' });
    // how it works
    [['listen', '#42b4f5', 'きく', 'Listen'], ['tap', '#ff9f4a', 'タップ', 'Tap'], ['star', '#ffc83d', 'ごほうび', 'Win stars']].forEach(([ic, col, ja, en], i) => {
      const cx = 690 + i * 215, y = 262; panel(c, cx - 88, y, 176, 190);
      c.fillStyle = col; c.beginPath(); c.arc(cx, y + 62, 40, 0, 7); c.fill(); icon(c, ic, cx, y + 62, 48, { color: '#fff' });
      text(c, ja, cx, y + 130, { size: 28, color: INK, font: JP, weight: '900' }); text(c, en, cx, y + 160, { size: 19, color: INK2, font: UIF, weight: '600' });
      if (i < 2) icon(c, 'fwd', cx + 108, y + 95, 26, { color: '#fff', shadow: 3 });
    });
    this.start.label = this.go ? '…' : 'はじめる！  Start'; this.start.pop = 1 + Math.sin(t * 4) * 0.03;
    this.start.draw(c);
  }
}

// ------------------------------------------------------------------ who is playing? (monster colour = profile)
export class ProfileScene {
  constructor(app, profiles) { this.app = app; this.profiles = profiles; this.t = 0; this.ui = []; }
  enter() {
    const byId = Object.fromEntries(this.profiles.map(p => [p.id, p]));
    this.ui = COLORS.map((col, i) => {
      const x = 135 + (i % 4) * 300, y = 168 + Math.floor(i / 4) * 205, rec = byId[col.id];
      return new Btn({ x, y, w: 250, h: 190, shadow: false, customDraw: (c, u) => {
        const off = cardFace(c, 0, 0, u.w, u.h, 'idle', u.press, false);
        if (rec) {
          drawMonster(c, u.w / 2, 88 + off, 118, { color: col.hex, t: this.t + i, hat: hatFor(passedCount(rec.state)) });
          const n = Object.values(rec.state.items).filter(it => it.kind === 'gpc' && it.rung >= M.K.mastered).length;
          starShape(c, u.w / 2 - 26, u.h - 40, 30, true); text(c, String(n), u.w / 2 + 6, u.h - 38, { size: 28, color: INK, font: UIF, weight: '900', align: 'left' });
        } else {
          c.globalAlpha = 0.5; drawMonster(c, u.w / 2, 90, 100, { color: col.hex, t: this.t, blink: false }); c.globalAlpha = 1;
          c.fillStyle = '#58c46a'; c.beginPath(); c.arc(u.w - 38, u.h - 52, 24, 0, 7); c.fill(); text(c, '+', u.w - 38, u.h - 52, { size: 38, color: '#fff', font: UIF, weight: '900' });
        }
      }, onTap: async () => { const r = rec || await this.app.store.create(col.id); this.app.select(r); } });
    });
  }
  update(dt) { this.t += dt; }
  draw(c) {
    background(c, this.t, 'day');
    title(c, 'だれが あそぶ？', W / 2, 52, 48); text(c, 'Who is playing?', W / 2, 98, { size: 24, color: INK2, font: UIF, weight: '800' });
    title(c, 'すきな いろの モンスターを えらんでね', W / 2, 138, 22, { outline: 'rgba(255,255,255,.0)', weight: '800' });
    drawUI(c, this.ui);
  }
}

// ------------------------------------------------------------------ home: the path through the units
export class HomeScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; this.parts = new Particles(); this.page = null; }
  enter() {
    const { app } = this, C = app.C, st = app.state;
    this.next = M.nextLesson(C, st);
    this.cur = this.next?.unit ?? C.units.length - 1;
    this.stages = C.course?.stages || [{ id: 0, name: '', ja: '', units: C.units.map(u => u.id) }];
    const curStage = this.stages.find(s => s.units.includes(this.cur)) || this.stages[0];
    if (this.page === null) this.page = this.stages.indexOf(curStage);
    this.build();
  }
  build() {
    const { app } = this, C = app.C, st = app.state;
    const stage = this.stages[this.page];
    const n = stage.units.length, gap = Math.min(170, (W - 330) / Math.max(1, n - 1));
    const x0 = W / 2 - (gap * (n - 1)) / 2;
    this.nodes = stage.units.map((id, i) => {
      const au = C.units.find(u => u.id === id), cu = C.course?.units[id];
      return { id, au, cu, x: x0 + i * gap, y: 290 + Math.sin(i * 0.9) * 48 - (i % 2) * 14 };
    });
    // where the child is: "Unit 3 · lesson 2 of 4"
    this.where = null;
    if (this.next) {
      const au = C.units.find(u => u.id === this.next.unit);
      if (this.next.kind === 'practice') this.where = { unit: this.next.unit, name: au?.name, ja: 'れんしゅう', en: 'Practice', no: 0, total: 0 };
      else { const idx = au.lessons.findIndex(l => l.id === this.next.lessonId); this.where = { unit: this.next.unit, name: au?.name, no: idx + 1, total: au.lessons.length }; }
    }
    const allDone = !this.next;
    const play = new Btn({ x: W / 2 - 200, y: 458, w: 400, h: 104, label: allDone ? 'もうすぐ…' : 'あそぶ  Play', icon: allDone ? '' : 'play', size: 42, font: JP, color: allDone ? '#9fb3a4' : '#5bd16f', onTap: () => this.play() });
    this.play_ = play;
    const stars = new Btn({ x: W - 84, y: 12, w: 70, h: 72, icon: 'star', size: 38, color: '#ffc83d', onTap: () => app.eng.go(new MasteryScene(app)) });
    const gear = new Btn({ x: W - 164, y: 12, w: 70, h: 72, icon: 'gear', size: 36, color: '#8398ad', onTap: () => app.eng.go(new TeacherScene(app)) });
    const who = new Btn({ x: 14, y: 12, w: 70, h: 72, icon: 'people', size: 36, color: '#a97cf8', onTap: () => app.chooseProfile() });
    const help = new Btn({ x: 94, y: 12, w: 70, h: 72, icon: 'help', size: 38, color: '#42b4f5', onTap: () => app.eng.go(new IntroScene(app, () => app.goHome())) });
    const games = new Btn({ x: 22, y: 468, w: 96, h: 90, icon: 'gamepad', size: 42, color: '#a97cf8', onTap: () => app.eng.go(new GamesScene(app)) });
    this.ui = [play, stars, gear, who, games, help];
    const cp = (C.course?.checkpoints || []).find(c => stage.units.includes(c.after));
    if (cp && (st.settings.unlockAll || M.isUnitPassed(st, cp.after))) {
      const r = st.checkpoints?.[cp.id];
      this.ui.push(new Btn({ x: W - 150, y: 468, w: 128, h: 90, icon: 'trophy', label: r ? r.best + '%' : '', size: r ? 26 : 40, color: r ? '#5bd16f' : '#ff9f4a', onTap: () => app.eng.go(new LessonScene(app, checkpointSpec(cp))) }));
    }
    if (this.page > 0) this.ui.push(new Btn({ x: 16, y: 240, w: 62, h: 100, icon: 'back', size: 30, color: '#42b4f5', onTap: () => { this.page--; this.build(); } }));
    if (this.page < this.stages.length - 1) this.ui.push(new Btn({ x: W - 78, y: 240, w: 62, h: 100, icon: 'fwd', size: 30, color: '#42b4f5', onTap: () => { this.page++; this.build(); } }));
    this.nodes.forEach(nd => this.ui.push(new Btn({ x: nd.x - 54, y: nd.y - 54, w: 108, h: 108, shadow: false, customDraw: () => {}, onTap: () => this.tapNode(nd) })));
  }
  tapNode(n) {
    const { app } = this, st = app.state;
    if (n.au && st.settings.unlockAll) return app.eng.go(new UnitPicker(app, n.id));
    if (n.au && M.isUnitPassed(st, n.id)) return app.eng.go(new LessonScene(app, practiceSpec(n.id)));
    if (n.au && n.id === this.cur) return this.play();
    app.audio.sfx('bad'); this.shake = 1; app.eng.tween(this, { shake: 0 }, 400, 'out');
  }
  play() {
    const { app } = this; if (!this.next) { app.audio.sfx('bad'); return; }
    const spec = this.next.kind === 'practice' ? practiceSpec(this.next.unit) : app.C.lessons[this.next.lessonId];
    app.eng.go(new LessonScene(app, spec));
  }
  update(dt) { this.t += dt; this.parts.update(dt); }
  draw(c) {
    const { app } = this, st = app.state, stage = this.stages[this.page];
    background(c, this.t, 'day');
    title(c, `Stage ${stage.id}  ${stage.ja}`, W / 2, 38, 36, { font: UIF });
    text(c, stage.name, W / 2, 76, { size: 20, color: INK2, font: UIF, weight: '800' });
    // the road
    c.lineCap = 'round'; c.lineJoin = 'round';
    c.strokeStyle = 'rgba(120,90,50,.28)'; c.lineWidth = 50; c.beginPath(); this.nodes.forEach((n, i) => (i ? c.lineTo(n.x, n.y + 8) : c.moveTo(n.x, n.y + 8))); c.stroke();
    c.strokeStyle = '#f3dcaa'; c.lineWidth = 46; c.beginPath(); this.nodes.forEach((n, i) => (i ? c.lineTo(n.x, n.y) : c.moveTo(n.x, n.y))); c.stroke();
    c.strokeStyle = '#fff6dc'; c.lineWidth = 6; c.setLineDash([1, 20]); c.stroke(); c.setLineDash([]);
    this.nodes.forEach(n => {
      const planned = !n.au;
      const passed = !planned && M.isUnitPassed(st, n.id), open = !planned && (st.settings.unlockAll || M.isUnitOpen(app.C, st, n.id) || n.id === 0), isCur = !planned && n.id === this.cur;
      const r = 46 + (isCur ? Math.sin(this.t * 4) * 2.5 : 0);
      const [face, lip] = planned ? ['#e3e9ee', '#c2ccd5'] : passed ? PAL.Yellow : isCur ? PAL.Green : open ? PAL.Blue : ['#c9d3dc', '#a8b4bf'];
      if (isCur) { c.fillStyle = 'rgba(88,209,111,.28)'; c.beginPath(); c.arc(n.x, n.y, r + 14 + Math.sin(this.t * 4) * 3, 0, 7); c.fill(); }
      c.fillStyle = lip; c.beginPath(); c.arc(n.x, n.y + 9, r, 0, 7); c.fill();
      c.fillStyle = face; c.beginPath(); c.arc(n.x, n.y, r, 0, 7); c.fill();
      c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.ellipse(n.x - 6, n.y - r * 0.55, r * 0.6, r * 0.22, 0, 0, 7); c.fill();
      const lab = n.id === 0 ? '' : n.au ? (n.au.newGpcs.length ? n.au.newGpcs.map(g => gLabel(app.C.gpcs[g])).slice(0, 4).join(' ') : n.au.newPatterns.map(x => x.replace(/[\^$]/g, '').replace(/^(sy|af):/, '')).slice(0, 3).join(' ')) : (n.cu.gpcs.map(g => g[1]).slice(0, 4).join(' ') || (n.cu.concepts[0] || '…').replace(/[:(].*/, '').trim().split(' ').slice(0, 3).join(' '));
      const ink = passed ? '#7a5200' : isCur || open ? '#fff' : '#7d8b98';
      if (planned) { text(c, lab, n.x, n.y - 5, { size: lab.length > 6 ? 20 : 28, color: '#8a9aa7' }); text(c, 'soon', n.x, n.y + 22, { size: 17, color: '#8a9aa7', font: UIF, weight: '800' }); }
      else if (!open && !passed) icon(c, 'lock', n.x, n.y, 38, { color: '#fff', color2: '#a8b4bf' });
      else if (n.id === 0) icon(c, 'listen', n.x, n.y, 46, { color: ink });
      else text(c, lab, n.x, n.y + 2, { size: lab.length > 8 ? 22 : lab.length > 4 ? 28 : 34, color: ink, weight: '900' });
      if (passed) { c.fillStyle = '#35b454'; c.beginPath(); c.arc(n.x + 36, n.y - 36, 17, 0, 7); c.fill(); c.lineWidth = 4; c.strokeStyle = '#fff'; c.stroke(); icon(c, 'check', n.x + 36, n.y - 36, 17, { color: '#fff' }); }
      if (n.id !== 0) text(c, 'Unit ' + n.id, n.x, n.y + 74, { size: 19, color: INK, font: UIF, weight: '900', stroke: { w: 6, c: 'rgba(255,255,255,.9)' } });
    });
    const cn = this.nodes.find(n => n.id === this.cur && n.au);
    if (cn) drawMonster(c, cn.x, cn.y - 98 + (this.shake ? Math.sin(this.t * 60) * 6 * this.shake : 0), 118, { color: app.colorHex, mood: 'happy', t: this.t, hat: hatFor(passedCount(st)) });
    // "where am I" chip above the play button
    if (st.settings.unlockAll) { chip(c, W / 2, 430, '🔓 先生モード  Teacher mode — tap a unit'); }
    else if (this.where) {
      const w = this.where, txt = w.total ? `Unit ${w.unit}  ·  レッスン ${w.no} / ${w.total}` : `Unit ${w.unit}  ·  ${w.ja} ${w.en}`;
      chip(c, W / 2, 430, txt);
    }
    if (!this.next && stage.id === 2) chip(c, W / 2, 430, 'つぎの ユニットは じゅんびちゅう！ Next units are on their way.');
    for (const [x, y, ja] of [[49, 108, 'ひと'], [129, 108, 'ヘルプ'], [W - 129, 108, 'せんせい'], [W - 49, 108, 'きろく'], [70, 578, 'ゲーム']]) caption(c, ja, x, y, 14);
    if (this.ui.some(u => u.icon === 'trophy')) caption(c, 'チェック', W - 86, 578, 14);
    drawUI(c, this.ui);
    this.parts.draw(c);
  }
}
function chip(c, x, y, str) {
  c.font = `900 22px ${JP}`; const w = c.measureText(str).width + 44;
  c.fillStyle = 'rgba(255,255,255,.92)'; c.beginPath(); c.roundRect(x - w / 2, y - 21, w, 42, 21); c.fill();
  c.fillStyle = 'rgba(0,0,0,.07)'; c.beginPath(); c.roundRect(x - w / 2, y + 17, w, 4, 2); c.fill();
  text(c, str, x, y + 1, { size: 22, color: INK, font: JP, weight: '900' });
}

// ------------------------------------------------------------------ mastery map: collectible sound gems
export class MasteryScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; }
  enter() {
    const { app } = this, C = app.C, st = app.state;
    const back = new Btn({ x: 14, y: 12, w: 68, h: 56, icon: 'home', size: 30, color: '#e6ebf1', onTap: () => app.goHome() });
    this.ui = [back];
    const gl = C.gpcList.filter(g => !['suffix', 'silent'].includes(g.type));
    this.got = gl.filter(g => (st.items['gpc:' + g.id]?.rung || 0) >= M.K.mastered).length; this.total = gl.length;
    gl.forEach((g, i) => {
      const col = i % 16, row = Math.floor(i / 16), x = 28 + col * 82, y = 84 + row * 62;
      this.ui.push(new Btn({ x, y, w: 76, h: 58, shadow: false, customDraw: (c, u) => {
        const it = st.items['gpc:' + g.id], r = it?.rung || 0, got = r >= M.K.mastered, seen = !!it?.a.length;
        const off = slab(c, 0, 0, u.w, u.h, { r: 20, face: got ? '#7be0ad' : seen ? '#f2f7fb' : '#aab6d6', lip: got ? '#38b27a' : seen ? '#c3cfdc' : '#8793b8', depth: 6, press: u.press });
        text(c, seen || got ? gLabel(g) : '?', u.w / 2, off + 22, { size: !(seen || got) ? 32 : gLabel(g).length > 1 ? 26 : 32, color: got ? '#0f5a38' : seen ? INK : '#fff' });
        for (let k = 0; k < 6; k++) { c.fillStyle = k < r ? '#ffb400' : 'rgba(0,0,0,.14)'; c.beginPath(); c.arc(u.w / 2 - 25 + k * 10, off + 43, 3.6, 0, 7); c.fill(); }
      }, onTap: () => { if (st.items['gpc:' + g.id]) app.audio.play(['gpc:' + g.id]); } }));
    });
    const ty0 = 84 + Math.ceil(gl.length / 16) * 62 + 14;
    C.trickyList.forEach((t, i) => this.ui.push(new Btn({ x: 28 + (i % 17) * 78, y: ty0 + Math.floor(i / 17) * 52, w: 72, h: 46, shadow: false, customDraw: (c, u) => {
      const it = st.items['tr:' + t.id], r = it?.rung || 0, got = r >= M.K.mastered;
      const off = slab(c, 0, 0, u.w, u.h, { r: 14, face: got ? '#ffc3d0' : it ? '#fff' : '#aab6d6', lip: got ? '#e8869c' : it ? '#c3cfdc' : '#8793b8', depth: 5, press: u.press });
      text(c, it ? t.t : '?', u.w / 2, off + 20, { size: t.t.length > 5 ? 18 : 22, color: got ? '#8a1c36' : it ? INK : '#fff' }); if (got) icon(c, 'heart', u.w - 12, 11, 13, { color: '#ff5a78' });
    }, onTap: () => { if (st.items['tr:' + t.id]) app.audio.play(['w:' + t.id]); } })));
  }
  update(dt) { this.t += dt; }
  draw(c) {
    background(c, this.t, 'night'); title(c, 'ジェム コレクション', W / 2, 40, 38, { color: '#fff', outline: '#3c3a86' });
    text(c, `${this.got} / ${this.total}`, W - 90, 44, { size: 30, color: '#ffd96a', font: UIF, weight: '900' }); icon(c, 'sparkle', W - 156, 44, 32, { color: '#ffd96a' });
    drawUI(c, this.ui);
  }
}

// ------------------------------------------------------------------ teacher / parent view
export class TeacherScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; this.msg = ''; this.page = 0; }
  enter() {
    const { app } = this, st = app.state, C = app.C;
    const mk = (x, y, w, label, color, fn) => new Btn({ x, y, w, h: 52, label, size: 20, color, font: UIF, onTap: fn });
    this.ui = [
      new Btn({ x: 14, y: 10, w: 68, h: 56, icon: 'home', size: 28, color: '#e6ebf1', onTap: () => app.goHome() }),
      mk(1000, 70, 170, 'Export code', '#2e9cca', async () => { const code = await toCode(st); try { await navigator.clipboard.writeText(code); this.msg = 'Progress code copied (' + code.length + ' chars). Paste it into a note.'; } catch { prompt('Progress code (copy it):', code); } }),
      mk(1180, 70, 170, 'Import code', '#2e9cca', async () => { const code = prompt('Paste a progress code:'); if (!code) return; try { app.replaceState(await fromCode(code)); this.msg = 'Progress imported.'; } catch { this.msg = 'That code did not work.'; } }),
      mk(1000, 130, 170, 'Save file', '#4aa3e8', () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(st)], { type: 'application/json' })); a.download = `lets-read-${app.rec.id}-${new Date().toISOString().slice(0, 10)}.json`; a.click(); }),
      mk(1180, 130, 170, 'Load file', '#4aa3e8', () => { const i = document.createElement('input'); i.type = 'file'; i.accept = '.json'; i.onchange = async () => { try { const s = JSON.parse(await i.files[0].text()); if (s.v !== 1) throw 0; app.replaceState(s); this.msg = 'File loaded.'; } catch { this.msg = 'Could not read that file.'; } }; i.click(); }),
      mk(1000, 190, 170, st.settings.sound === false ? 'Sound: OFF' : 'Sound: ON', '#58c46a', u => { st.settings.sound = st.settings.sound === false; app.audio.muted = st.settings.sound === false; u.label = st.settings.sound === false ? 'Sound: OFF' : 'Sound: ON'; app.save(); }),
      mk(1180, 190, 170, 'Session: ' + (st.settings.sessionMin || 12) + ' min', '#58c46a', u => { const v = [8, 12, 16, 20]; st.settings.sessionMin = v[(v.indexOf(st.settings.sessionMin || 12) + 1) % v.length]; u.label = 'Session: ' + st.settings.sessionMin + ' min'; app.save(); }),
      mk(1000, 250, 170, 'Skip unit ▶', '#f2b63c', () => { const n = M.nextLesson(C, st); if (n) { M.skipUnit(st, n.unit); app.save(true); this.msg = 'Unit ' + n.unit + ' marked as skipped.'; this.enter(); } }),
      mk(1180, 250, 170, 'Reset player', '#ec5d57', async () => { if (confirm('Erase all progress for this player?')) { app.replaceState(M.newState({ color: app.rec.id })); this.msg = 'Progress reset.'; } }),
      mk(1000, 310, 170, 'Class mode', '#a478e8', () => app.eng.go(new ClassScene(app))),
      mk(1000, 370, 170, 'More sounds', '#42b4f5', () => { this.gp = ((this.gp || 0) + 1) % Math.ceil(C.gpcList.filter(g => !['suffix', 'silent'].includes(g.type)).length / 36); }),
      mk(1180, 370, 170, st.settings.unlockAll ? 'Unlock all: ON' : 'Unlock all: OFF', '#e8a23a', u => { st.settings.unlockAll = !st.settings.unlockAll; u.label = st.settings.unlockAll ? 'Unlock all: ON' : 'Unlock all: OFF'; app.save(); }),
      mk(1180, 310, 170, 'Record voices', '#a478e8', () => open('tools/recorder.html', '_blank')),
    ];
  }
  update(dt) { this.t += dt; }
  draw(c) {
    const { app } = this, st = app.state, C = app.C;
    const bg = c.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#eef5fb'); bg.addColorStop(1, '#dfeaf4'); c.fillStyle = bg; c.fillRect(0, 0, W, H);
    text(c, 'Teacher / Parent view · 先生・保護者のかた', 100, 30, { size: 26, color: INK, align: 'left', font: JP, weight: '900' });
    const next = M.nextLesson(C, st);
    const gate = next ? M.gateStatus(C, st, next.unit) : null;
    text(c, next ? `Now: Unit ${next.unit}, lesson ${next.lessonId}` : 'All units complete', 40, 86, { size: 22, color: INK, align: 'left', font: UIF, weight: '900' });
    if (gate && !gate.open) { text(c, 'To pass: ' + gate.reasons.slice(0, 3).join(' · '), 40, 114, { size: 16, color: '#8a5200', align: 'left', weight: '700', font: UIF }); }
    { const cps = C.course?.checkpoints || [], got = st.checkpoints || {}; text(c, 'Check-ups: ' + cps.map(k => k.id.toUpperCase() + ' ' + (got[k.id] ? got[k.id].best + '%' : '–')).join('  ·  '), 100, 62, { size: 16, color: INK2, align: 'left', weight: '700', font: UIF }); }
    // GPC rung table
    const gl = C.gpcList.filter(g => !['suffix', 'silent'].includes(g.type)), PER = 32, pages = Math.ceil(gl.length / PER);
    if (pages > 1) text(c, `Sounds ${(this.gp || 0) + 1}/${pages}`, 780, 62, { size: 17, color: '#4a6275', weight: 'normal' });
    gl.slice((this.gp || 0) * PER, (this.gp || 0) * PER + PER).forEach((g, i) => {
      const col = i % 4, row = Math.floor(i / 4), x = 40 + col * 236, y = 140 + row * 52;
      const it = st.items['gpc:' + g.id], r = it?.rung || 0;
      c.fillStyle = r >= M.K.mastered ? '#c9f0d9' : it ? '#fff' : '#e4ebf1'; c.beginPath(); c.roundRect(x, y, 226, 46, 14); c.fill(); c.lineWidth = 2; c.strokeStyle = r >= M.K.mastered ? '#8fd6ae' : '#d3dde7'; c.stroke();
      text(c, gLabel(g), x + 30, y + 24, { size: gLabel(g).length > 2 ? 22 : 28, color: '#23394b' });
      for (let k = 0; k < 6; k++) { c.fillStyle = k < r ? '#ffb400' : '#d5dee5'; c.beginPath(); c.roundRect(x + 66 + k * 19, y + 15, 15, 16, 5); c.fill(); }
      const acc = it && it.a.length ? Math.round((it.a.reduce((s, a) => s + a.ok, 0) / it.a.length) * 100) : null;
      text(c, acc == null ? '–' : acc + '%', x + 216, y + 24, { size: 16, color: '#4a6275', align: 'right', weight: 'normal' });
    });
    const conf = M.confusionPairs(st, 2).slice(0, 5);
    text(c, 'Frequent mix-ups (teach-first, tried-instead): ' + (conf.length ? conf.map(x => `${x.pair[0]}→${x.pair[1]} ×${x.n}`).join('   ') : 'none yet'), 40, 566, { size: 15, color: INK2, align: 'left', weight: '700', font: UIF });
    text(c, `Player: ${app.rec.id} · sessions ${st.stats.sessions} · minutes ${Math.round(st.stats.secondsPlayed / 60)} · rungs: 1 hear · 2 recall · 3 read/spell · 4 new words (mastered) · 5 fast · 6 kept`, 40, 592 - 12 + 12, { size: 0 });
    text(c, `Player ${app.rec.id} · sessions ${st.stats.sessions} · ${Math.round(st.stats.secondsPlayed / 60)} min played`, 1000, 456, { size: 18, color: INK2, align: 'left', weight: '600', font: UIF });
    text(c, 'Rungs: 1 hear · 2 recall · 3 read & spell · 4 new words (mastered) · 5 fast · 6 kept', 1000, 486, { size: 15, color: INK2, align: 'left', weight: '600', font: UIF });
    if (this.msg) text(c, this.msg, 1000, 530, { size: 17, color: '#b3401e', align: 'left' });
    drawUI(c, this.ui);
  }
}

// ------------------------------------------------------------------ class mode (projector, teacher-led; no progress is recorded)
export class ClassScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; this.unit = 1; this.tab = 'sounds'; this.i = 0; this.hl = -1; this.mouth = null; }
  enter() { this.rebuild(); }
  items() {
    const C = this.app.C, u = C.unitById[this.unit];
    if (this.tab === 'sounds') return u.newGpcs.length ? u.newGpcs.map(g => ({ id: g })) : C.gpcsUpTo(0).map(g => ({ id: g.id }));
    return C.wordsAt(this.unit, { names: false, functionWords: false }).filter(w => w.u === this.unit || w.g.some(g => u.newGpcs.includes(g))).map(w => ({ w }));
  }
  rebuild() {
    const { app } = this, n = this.items().length; this.i = Math.min(this.i, Math.max(0, n - 1));
    const b = (x, y, w, h, label, fn, color = '#42b4f5', ic = '') => new Btn({ x, y, w, h, label, icon: ic, size: 30, color, font: UIF, onTap: fn });
    this.ui = [
      new Btn({ x: 14, y: 12, w: 68, h: 56, icon: 'home', size: 30, color: '#e6ebf1', onTap: () => app.goHome() }),
      b(110, 12, 90, 56, '', () => { this.unit = Math.max(1, this.unit - 1); this.i = 0; this.rebuild(); }, '#42b4f5', 'back'),
      b(310, 12, 90, 56, '', () => { this.unit = Math.min(app.C.units.length - 1, this.unit + 1); this.i = 0; this.rebuild(); }, '#42b4f5', 'fwd'),
      b(450, 12, 190, 56, this.tab === 'sounds' ? 'Sounds' : 'Words', () => { this.tab = this.tab === 'sounds' ? 'words' : 'sounds'; this.i = 0; this.rebuild(); }, '#a97cf8', this.tab === 'sounds' ? 'speaker' : 'book'),
      b(60, 270, 110, 110, '', () => { this.i = (this.i + n - 1) % n; }, '#5bd16f', 'back'),
      b(1196, 270, 110, 110, '', () => { this.i = (this.i + 1) % n; }, '#5bd16f', 'fwd'),
      new Btn({ x: 200, y: 110, w: 966, h: 440, shadow: false, customDraw: () => {}, onTap: () => this.say() }),
    ];
  }
  async say() {
    const { app } = this, it = this.items()[this.i]; if (!it) return; const C = app.C;
    if (it.id) { this.mouth = C.phonemes[C.gpcs[it.id].ph[0]]?.mouth || null; await app.audio.play(['gpc:' + it.id]); this.mouth = null; return; }
    const my = this.run = (this.run || 0) + 1;
    for (let k = 0; k < it.w.g.length; k++) { if (this.run !== my) return; this.hl = k; this.mouth = C.phonemes[C.gpcs[it.w.g[k]].ph[0]]?.mouth || null; await app.audio.play(['gpc:' + it.w.g[k]], { gap: 0.1 }); }
    this.hl = -1; this.mouth = null; await app.audio.play(['w:' + it.w.id]);
  }
  update(dt) { this.t += dt; }
  draw(c) {
    const { app } = this; background(c, this.t, 'night');
    const u = app.C.unitById[this.unit]; text(c, 'Unit ' + this.unit, 255, 42, { size: 32, color: '#fff', font: UIF, weight: '900' }); text(c, 'Class mode · tap the big card', 900, 42, { size: 24, color: '#cfe3f2', font: UIF, weight: '700' });
    const it = this.items()[this.i]; panel(c, 200, 110, 966, 440);
    if (!it) return drawUI(c, this.ui);
    if (it.id) { const g = app.C.gpcs[it.id]; text(c, gLabel(g), 580, 330, { size: gLabel(g).length > 1 ? 300 : 380, color: '#ff5a3c' }); drawMonster(c, 940, 400, 220, { color: app.colorHex, mouth: this.mouth, t: this.t, mood: this.mouth ? 'idle' : 'happy' });
      const b = (g.bank || g.fbank || [])[0]; if (b) text(c, b[1], 940, 200, { size: 90 }); }
    else { const w = it.w; c.font = `bold 190px ${FONT}`; const labels = w.g.map(g => app.C.gpcs[g].g); const ws = labels.map(l => c.measureText(l).width); const tw = ws.reduce((a, b) => a + b, 0); let x = 520 - tw / 2;
      labels.forEach((l, i) => { text(c, l, x + ws[i] / 2, 320, { size: 190, color: this.hl === i ? '#ff5a3c' : '#23394b' }); x += ws[i]; });
      if (w.pic) picText2(c, w.pic, 960, 200); drawMonster(c, 960, 430, 170, { color: app.colorHex, mouth: this.mouth, t: this.t }); }
    text(c, `${this.i + 1} / ${this.items().length}`, 683, 525, { size: 24, color: INK2, font: UIF, weight: '800' });
    drawUI(c, this.ui);
  }
}
import { picText } from './ui.js';
const picText2 = (c, p, x, y) => picText(c, p, x, y, 110);

// ------------------------------------------------------------------ teacher unlock: pick any lesson of a unit
export class UnitPicker {
  constructor(app, uid) { this.app = app; this.uid = uid; this.t = 0; this.ui = []; }
  enter() {
    const { app } = this, C = app.C, au = C.units.find(u => u.id === this.uid), st = app.state, us = st.units[this.uid] || {};
    this.title = `Unit ${this.uid}  ${au?.name || ''}`;
    this.ui = [new Btn({ x: 14, y: 12, w: 68, h: 56, icon: 'home', size: 30, color: '#e6ebf1', onTap: () => app.goHome() })];
    const items = au.lessons.map(l => ({ label: `${l.id}  ${l.kind}`, done: !!us.lessonsDone?.[l.id], go: () => app.eng.go(new LessonScene(app, C.lessons[l.id])) }));
    items.push({ label: 'Practice', done: false, go: () => app.eng.go(new LessonScene(app, practiceSpec(this.uid))) });
    items.forEach((it, i) => {
      const col = i % 4, row = Math.floor(i / 4);
      this.ui.push(new Btn({ x: 190 + col * 250, y: 140 + row * 130, w: 230, h: 104, label: it.label, icon: it.done ? 'check' : '', size: 24, font: UIF, color: it.done ? '#5bd16f' : '#42b4f5', onTap: it.go }));
    });
  }
  update(dt) { this.t += dt; }
  draw(c) { background(c, this.t, 'day'); title(c, this.title, W / 2, 44, 38, { font: UIF }); text(c, 'Teacher mode — pick any lesson (green = done)', W / 2, 92, { size: 22, color: INK2, font: UIF, weight: '800' }); drawUI(c, this.ui); }
}
