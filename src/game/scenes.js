import { W, H, FONT, JP, text, rr, shade, Btn, Particles, drawUI, star } from './engine.js';
import { background, speaker } from './ui.js';
import { drawMonster, hatFor } from './monster.js';
import { COLORS, toCode, fromCode } from './store.js';
import { LessonScene } from './lesson.js';
import * as M from '../learn/mastery.js';
import { practiceSpec } from '../learn/lessonplan.js';

const passedCount = st => Object.values(st.units).filter(u => u.passed && !u.skipped).length;

// ------------------------------------------------------------------ tap to start (also unlocks audio)
export class BootScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; }
  enter() {
    this.ui = [new Btn({ x: 0, y: 0, w: W, h: H, visible: true, customDraw: () => {}, onTap: async () => {
      if (this.go) return; this.go = true; this.app.audio.unlock(); this.app.audio.sfx('win'); await this.app.start();
    } })];
  }
  update(dt) { this.t += dt; }
  draw(c) {
    background(c, this.t, 'warm');
    text(c, "Let's Read English!", W / 2, 120, { size: 90, color: '#fff', stroke: { w: 14, c: '#e8553c' } });
    text(c, 'えいごを よもう', W / 2, 205, { size: 44, color: '#8a3a2a', font: JP });
    drawMonster(c, W / 2, 400, 280, { color: '#58c46a', mood: 'happy', t: this.t, hat: 'crown' });
    const p = 1 + Math.sin(this.t * 4) * 0.04;
    c.save(); c.translate(W / 2 + 320, 440); c.scale(p, p); rr(c, -150, -45, 300, 90, 45); c.fillStyle = '#ffd23f'; c.fill(); c.lineWidth = 5; c.strokeStyle = '#fff'; c.stroke();
    text(c, this.go ? '…' : '▶ タップ！', 0, 3, { size: 40, color: '#7a3b00', font: JP }); c.restore();
  }
}

// ------------------------------------------------------------------ who is playing? (monster colour = profile)
export class ProfileScene {
  constructor(app, profiles) { this.app = app; this.profiles = profiles; this.t = 0; this.ui = []; }
  enter() {
    const byId = Object.fromEntries(this.profiles.map(p => [p.id, p]));
    this.ui = COLORS.map((col, i) => {
      const x = 130 + (i % 4) * 300, y = 120 + Math.floor(i / 4) * 230, rec = byId[col.id];
      return new Btn({ x, y, w: 250, h: 210, shadow: false, customDraw: (c, u) => {
        rr(c, 0, 0, u.w, u.h, 36); c.fillStyle = rec ? 'rgba(255,255,255,.88)' : 'rgba(255,255,255,.35)'; c.fill();
        if (rec) { drawMonster(c, u.w / 2, 112, 130, { color: col.hex, t: this.t + i, hat: hatFor(passedCount(rec.state)) });
          text(c, '⭐ ' + Object.values(rec.state.items).filter(it => it.kind === 'gpc' && it.rung >= M.K.mastered).length, u.w / 2, 190, { size: 28, color: '#23394b' }); }
        else { c.globalAlpha = 0.55; drawMonster(c, u.w / 2, 112, 110, { color: col.hex, t: this.t, blink: false }); c.globalAlpha = 1; c.fillStyle = '#fff'; c.beginPath(); c.arc(u.w - 40, u.h - 40, 28, 0, 7); c.fill(); text(c, '＋', u.w - 40, u.h - 38, { size: 40, color: '#4a6275' }); }
      }, onTap: async () => { const r = rec || await this.app.store.create(col.id); this.app.select(r); } });
    });
  }
  update(dt) { this.t += dt; }
  draw(c) {
    background(c, this.t, 'day');
    text(c, 'だれが あそぶ？', W / 2, 62, { size: 54, color: '#23394b', font: JP });
    drawUI(c, this.ui);
  }
}

// ------------------------------------------------------------------ home: the path through the units
export class HomeScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; this.parts = new Particles(); }
  enter() {
    const { app } = this, C = app.C, st = app.state;
    this.next = M.nextLesson(C, st);
    this.nodes = C.units.map((u, i) => ({ u, x: 110 + i * 160, y: 330 + Math.sin(i * 0.9) * 70 - (i % 2) * 20 }));
    const cur = this.next?.unit ?? C.units.length - 1;
    this.cur = cur;
    const play = new Btn({ x: W / 2 - 150, y: 470, w: 300, h: 100, label: this.next ? '▶ あそぶ' : '🏆', size: 52, font: JP, color: '#58c46a', onTap: () => this.play() });
    const stars = new Btn({ x: W - 90, y: 12, w: 76, h: 66, icon: '⭐', size: 38, color: '#f2b63c', onTap: () => app.eng.go(new MasteryScene(app)) });
    const gear = new Btn({ x: W - 176, y: 12, w: 76, h: 66, icon: '⚙️', size: 34, color: '#7d95a8', onTap: () => app.eng.go(new TeacherScene(app)) });
    const who = new Btn({ x: 14, y: 12, w: 76, h: 66, icon: '👥', size: 34, color: '#a478e8', onTap: () => app.chooseProfile() });
    this.ui = [play, stars, gear, who];
    this.nodes.forEach(n => this.ui.push(new Btn({ x: n.x - 52, y: n.y - 52, w: 104, h: 104, shadow: false, customDraw: () => {}, onTap: () => this.tapNode(n) })));
  }
  tapNode(n) {
    const { app } = this, st = app.state;
    if (M.isUnitPassed(st, n.u.id)) return app.eng.go(new LessonScene(app, practiceSpec(n.u.id)));
    if (n.u.id === this.cur) return this.play();
    app.audio.sfx('bad'); this.shake = 1; app.eng.tween(this, { shake: 0 }, 400, 'out');
  }
  play() {
    const { app } = this; if (!this.next) return;
    const spec = this.next.kind === 'practice' ? practiceSpec(this.next.unit) : app.C.lessons[this.next.lessonId];
    app.eng.go(new LessonScene(app, spec));
  }
  update(dt) { this.t += dt; this.parts.update(dt); }
  draw(c) {
    const { app } = this, st = app.state;
    background(c, this.t, 'day');
    // winding path
    c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = '#e8d3a0'; c.lineWidth = 46; c.beginPath();
    this.nodes.forEach((n, i) => (i ? c.lineTo(n.x, n.y) : c.moveTo(n.x, n.y))); c.stroke();
    c.strokeStyle = '#f7ebc8'; c.lineWidth = 8; c.setLineDash([2, 18]); c.stroke(); c.setLineDash([]);
    this.nodes.forEach(n => {
      const passed = M.isUnitPassed(st, n.u.id), open = M.isUnitOpen(app.C, st, n.u.id) || n.u.id === 0, isCur = n.u.id === this.cur;
      const r = 48 + (isCur ? Math.sin(this.t * 4) * 3 : 0);
      c.fillStyle = 'rgba(30,50,70,.3)'; c.beginPath(); c.arc(n.x, n.y + 6, r, 0, 7); c.fill();
      c.fillStyle = passed ? '#ffd23f' : isCur ? '#fff' : open ? '#e8f6ff' : '#b5c3cf'; c.beginPath(); c.arc(n.x, n.y, r, 0, 7); c.fill();
      c.lineWidth = 6; c.strokeStyle = isCur ? '#58c46a' : '#fff'; c.stroke();
      const label = n.u.id === 0 ? '👂' : n.u.newGpcs.slice(0, 4).join(' ');
      if (!open && !passed) text(c, '🔒', n.x, n.y, { size: 38 });
      else text(c, label, n.x, n.y + 2, { size: n.u.id === 0 ? 46 : n.u.newGpcs.length > 4 ? 22 : 28, color: passed ? '#7a5a00' : '#23394b' });
      if (passed) text(c, '✔', n.x + 38, n.y - 38, { size: 30, color: '#2f9e44' });
      text(c, n.u.id === 0 ? '' : 'Unit ' + n.u.id, n.x, n.y + 78, { size: 20, color: '#4a6275' });
    });
    const cn = this.nodes.find(n => n.u.id === this.cur);
    if (cn) drawMonster(c, cn.x, cn.y - 100 + (this.shake ? Math.sin(this.t * 60) * 6 * this.shake : 0), 120, { color: app.colorHex, mood: 'happy', t: this.t, hat: hatFor(passedCount(st)) });
    drawUI(c, this.ui);
    this.parts.draw(c);
  }
}

// ------------------------------------------------------------------ mastery map: collectible sound gems
export class MasteryScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; }
  enter() {
    const { app } = this, C = app.C, st = app.state;
    const back = new Btn({ x: 12, y: 10, w: 76, h: 56, icon: '🏠', size: 30, color: '#e8a23a', onTap: () => app.goHome() });
    this.ui = [back];
    C.gpcList.forEach((g, i) => {
      const col = i % 8, row = Math.floor(i / 8), x = 40 + col * 164, y = 84 + row * 100;
      this.ui.push(new Btn({ x, y, w: 150, h: 88, shadow: false, customDraw: (c, u) => {
        const it = st.items['gpc:' + g.id], r = it?.rung || 0, got = r >= M.K.mastered, seen = !!it?.a.length;
        rr(c, 0, 4, u.w, u.h, 22); c.fillStyle = 'rgba(30,50,70,.25)'; c.fill();
        rr(c, 0, 0, u.w, u.h, 22); c.fillStyle = got ? '#7be0ad' : seen ? '#e7f3fb' : '#c3ced7'; c.fill(); c.lineWidth = got ? 6 : 3; c.strokeStyle = got ? '#fff' : '#a8b9c6'; c.stroke();
        text(c, seen || got ? g.g : '?', u.w / 2, 38, { size: g.g.length > 1 ? 48 : 58, color: got ? '#175d3b' : '#5b7385' });
        for (let k = 0; k < 6; k++) { c.fillStyle = k < r ? '#ffb400' : 'rgba(0,0,0,.15)'; c.beginPath(); c.arc(u.w / 2 - 50 + k * 20, 74, 6, 0, 7); c.fill(); }
      }, onTap: () => { if (st.items['gpc:' + g.id]) app.audio.play(['gpc:' + g.id]); } }));
    });
    C.trickyList.forEach((t, i) => this.ui.push(new Btn({ x: 40 + i * 80, y: 520, w: 74, h: 60, shadow: false, customDraw: (c, u) => {
      const it = st.items['tr:' + t.id], r = it?.rung || 0; rr(c, 0, 0, u.w, u.h, 14); c.fillStyle = r >= M.K.mastered ? '#ffc3d0' : it ? '#fff' : '#c3ced7'; c.fill();
      text(c, it ? t.t : '?', u.w / 2, u.h / 2 + 4, { size: 26, color: '#a3203f' }); if (r >= M.K.mastered) text(c, '♥', u.w - 12, 12, { size: 16, color: '#e8365d' });
    }, onTap: () => { if (st.items['tr:' + t.id]) app.audio.play(['w:' + t.id]); } })));
  }
  update(dt) { this.t += dt; }
  draw(c) { background(c, this.t, 'night'); text(c, 'ジェム コレクション', W / 2, 38, { size: 40, color: '#fff', font: JP }); drawUI(c, this.ui); }
}

// ------------------------------------------------------------------ teacher / parent view
export class TeacherScene {
  constructor(app) { this.app = app; this.t = 0; this.ui = []; this.msg = ''; this.page = 0; }
  enter() {
    const { app } = this, st = app.state, C = app.C;
    const mk = (x, y, w, label, color, fn) => new Btn({ x, y, w, h: 50, label, size: 22, color, r: 14, font: FONT, onTap: fn });
    this.ui = [
      new Btn({ x: 12, y: 10, w: 76, h: 50, icon: '🏠', size: 28, color: '#e8a23a', onTap: () => app.goHome() }),
      mk(1000, 70, 170, 'Export code', '#2e9cca', async () => { const code = await toCode(st); try { await navigator.clipboard.writeText(code); this.msg = 'Progress code copied (' + code.length + ' chars). Paste it into a note.'; } catch { prompt('Progress code (copy it):', code); } }),
      mk(1180, 70, 170, 'Import code', '#2e9cca', async () => { const code = prompt('Paste a progress code:'); if (!code) return; try { app.replaceState(await fromCode(code)); this.msg = 'Progress imported.'; } catch { this.msg = 'That code did not work.'; } }),
      mk(1000, 130, 170, 'Save file', '#4aa3e8', () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(st)], { type: 'application/json' })); a.download = `lets-read-${app.rec.id}-${new Date().toISOString().slice(0, 10)}.json`; a.click(); }),
      mk(1180, 130, 170, 'Load file', '#4aa3e8', () => { const i = document.createElement('input'); i.type = 'file'; i.accept = '.json'; i.onchange = async () => { try { const s = JSON.parse(await i.files[0].text()); if (s.v !== 1) throw 0; app.replaceState(s); this.msg = 'File loaded.'; } catch { this.msg = 'Could not read that file.'; } }; i.click(); }),
      mk(1000, 190, 170, st.settings.sound === false ? 'Sound: OFF' : 'Sound: ON', '#58c46a', u => { st.settings.sound = st.settings.sound === false; app.audio.muted = st.settings.sound === false; u.label = st.settings.sound === false ? 'Sound: OFF' : 'Sound: ON'; app.save(); }),
      mk(1180, 190, 170, 'Session: ' + (st.settings.sessionMin || 12) + ' min', '#58c46a', u => { const v = [8, 12, 16, 20]; st.settings.sessionMin = v[(v.indexOf(st.settings.sessionMin || 12) + 1) % v.length]; u.label = 'Session: ' + st.settings.sessionMin + ' min'; app.save(); }),
      mk(1000, 250, 170, 'Skip unit ▶', '#f2b63c', () => { const n = M.nextLesson(C, st); if (n) { M.skipUnit(st, n.unit); app.save(true); this.msg = 'Unit ' + n.unit + ' marked as skipped.'; this.enter(); } }),
      mk(1180, 250, 170, 'Reset this player', '#ec5d57', async () => { if (confirm('Erase all progress for this player?')) { app.replaceState(M.newState({ color: app.rec.id })); this.msg = 'Progress reset.'; } }),
      mk(1000, 310, 350, 'Record real voices (recorder page)', '#a478e8', () => open('tools/recorder.html', '_blank')),
    ];
  }
  update(dt) { this.t += dt; }
  draw(c) {
    const { app } = this, st = app.state, C = app.C;
    c.fillStyle = '#f4f8fb'; c.fillRect(0, 0, W, H);
    text(c, 'Teacher / Parent view · 先生・保護者のかた', 100, 36, { size: 28, color: '#23394b', align: 'left', font: JP });
    const next = M.nextLesson(C, st);
    const gate = next ? M.gateStatus(C, st, next.unit) : null;
    text(c, next ? `Now: Unit ${next.unit}, lesson ${next.lessonId}` : 'All units complete 🎉', 40, 86, { size: 22, color: '#23394b', align: 'left' });
    if (gate && !gate.open) { text(c, 'To pass: ' + gate.reasons.slice(0, 3).join(' · '), 40, 114, { size: 17, color: '#7d4a00', align: 'left', weight: 'normal' }); }
    // GPC rung table
    C.gpcList.forEach((g, i) => {
      const col = i % 4, row = Math.floor(i / 4), x = 40 + col * 235, y = 140 + row * 52;
      const it = st.items['gpc:' + g.id], r = it?.rung || 0;
      rr(c, x, y, 220, 44, 10); c.fillStyle = r >= M.K.mastered ? '#d8f5e3' : it ? '#fff' : '#e8eef2'; c.fill(); c.lineWidth = 2; c.strokeStyle = '#cfdbe4'; c.stroke();
      text(c, g.g, x + 30, y + 24, { size: 28, color: '#23394b' });
      for (let k = 0; k < 6; k++) { c.fillStyle = k < r ? '#ffb400' : '#d5dee5'; c.fillRect(x + 66 + k * 24, y + 14, 20, 16); }
      const acc = it && it.a.length ? Math.round((it.a.reduce((s, a) => s + a.ok, 0) / it.a.length) * 100) : null;
      text(c, acc == null ? '–' : acc + '%', x + 214, y + 24, { size: 16, color: '#4a6275', align: 'right', weight: 'normal' });
    });
    const conf = M.confusionPairs(st, 2).slice(0, 5);
    text(c, 'Frequent mix-ups (teach-first, tried-instead): ' + (conf.length ? conf.map(x => `${x.pair[0]}→${x.pair[1]} ×${x.n}`).join('   ') : 'none yet'), 40, 566, { size: 16, color: '#4a6275', align: 'left', weight: 'normal' });
    text(c, `Player: ${app.rec.id} · sessions ${st.stats.sessions} · minutes ${Math.round(st.stats.secondsPlayed / 60)} · rungs: 1 hear · 2 recall · 3 read/spell · 4 new words (mastered) · 5 fast · 6 kept`, 40, 592 - 12 + 12, { size: 0 });
    text(c, `Player ${app.rec.id} · sessions ${st.stats.sessions} · ${Math.round(st.stats.secondsPlayed / 60)} min played`, 1000, 400, { size: 18, color: '#4a6275', align: 'left', weight: 'normal' });
    text(c, 'Rungs: 1 hear · 2 recall · 3 read & spell · 4 new words (mastered) · 5 fast · 6 kept', 1000, 430, { size: 15, color: '#4a6275', align: 'left', weight: 'normal' });
    if (this.msg) text(c, this.msg, 1000, 470, { size: 17, color: '#b3401e', align: 'left' });
    drawUI(c, this.ui);
  }
}
