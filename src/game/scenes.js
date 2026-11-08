import { W, H, FONT, JP, text, rr, shade, Btn, Particles, drawUI, star } from './engine.js';
import { background, speaker } from './ui.js';
import { drawMonster, hatFor } from './monster.js';
import { COLORS, toCode, fromCode } from './store.js';
import { LessonScene } from './lesson.js';
import { GamesScene } from './minigames.js';
import * as M from '../learn/mastery.js';
import { practiceSpec, checkpointSpec } from '../learn/lessonplan.js';

export const gLabel = g => (g.id === 'sz' ? 's/z' : g.type === 'split' ? g.g + '_e' : g.g);
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
    const n = stage.units.length, gap = Math.min(170, (W - 220) / Math.max(1, n - 1));
    const x0 = W / 2 - (gap * (n - 1)) / 2;
    this.nodes = stage.units.map((id, i) => {
      const au = C.units.find(u => u.id === id), cu = C.course?.units[id];
      return { id, au, cu, x: x0 + i * gap, y: 300 + Math.sin(i * 0.9) * 55 - (i % 2) * 16 };
    });
    const allDone = !this.next;
    const play = new Btn({ x: W / 2 - 150, y: 470, w: 300, h: 100, label: allDone ? '🌱 もうすぐ…' : '▶ あそぶ', size: allDone ? 40 : 52, font: JP, color: allDone ? '#8fb08a' : '#58c46a', onTap: () => this.play() });
    const stars = new Btn({ x: W - 90, y: 12, w: 76, h: 66, icon: '⭐', size: 38, color: '#f2b63c', onTap: () => app.eng.go(new MasteryScene(app)) });
    const gear = new Btn({ x: W - 176, y: 12, w: 76, h: 66, icon: '⚙️', size: 34, color: '#7d95a8', onTap: () => app.eng.go(new TeacherScene(app)) });
    const who = new Btn({ x: 14, y: 12, w: 76, h: 66, icon: '👥', size: 34, color: '#a478e8', onTap: () => app.chooseProfile() });
    const games = new Btn({ x: 14, y: 470, w: 100, h: 100, icon: '🎮', size: 50, color: '#a478e8', onTap: () => app.eng.go(new GamesScene(app)) });
    this.ui = [play, stars, gear, who, games];
    const cp = (C.course?.checkpoints || []).find(c => stage.units.includes(c.after));
    if (cp && M.isUnitPassed(st, cp.after)) {
      const r = st.checkpoints?.[cp.id];
      this.ui.push(new Btn({ x: W - 176, y: 470, w: 150, h: 100, label: r ? '🎯 ' + r.best + '%' : '🎯', size: 34, color: r ? '#8fcf6a' : '#f2b63c', onTap: () => app.eng.go(new LessonScene(app, checkpointSpec(cp))) }));
    }
    if (this.page > 0) this.ui.push(new Btn({ x: 14, y: 250, w: 64, h: 110, label: '◀', size: 40, color: '#5aa7d6', onTap: () => { this.page--; this.build(); } }));
    if (this.page < this.stages.length - 1) this.ui.push(new Btn({ x: W - 78, y: 250, w: 64, h: 110, label: '▶', size: 40, color: '#5aa7d6', onTap: () => { this.page++; this.build(); } }));
    this.nodes.forEach(nd => this.ui.push(new Btn({ x: nd.x - 52, y: nd.y - 52, w: 104, h: 104, shadow: false, customDraw: () => {}, onTap: () => this.tapNode(nd) })));
  }
  tapNode(n) {
    const { app } = this, st = app.state;
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
    text(c, `Stage ${stage.id}  ${stage.ja}`, W / 2, 34, { size: 34, color: '#23394b', font: JP });
    text(c, stage.name, W / 2, 70, { size: 20, color: '#4a6275' });
    c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = '#e8d3a0'; c.lineWidth = 46; c.beginPath();
    this.nodes.forEach((n, i) => (i ? c.lineTo(n.x, n.y) : c.moveTo(n.x, n.y))); c.stroke();
    c.strokeStyle = '#f7ebc8'; c.lineWidth = 8; c.setLineDash([2, 18]); c.stroke(); c.setLineDash([]);
    this.nodes.forEach(n => {
      const planned = !n.au;
      const passed = !planned && M.isUnitPassed(st, n.id), open = !planned && (M.isUnitOpen(app.C, st, n.id) || n.id === 0), isCur = !planned && n.id === this.cur;
      const r = 48 + (isCur ? Math.sin(this.t * 4) * 3 : 0);
      c.fillStyle = 'rgba(30,50,70,.3)'; c.beginPath(); c.arc(n.x, n.y + 6, r, 0, 7); c.fill();
      c.fillStyle = planned ? '#d5dde4' : passed ? '#ffd23f' : isCur ? '#fff' : open ? '#e8f6ff' : '#b5c3cf'; c.beginPath(); c.arc(n.x, n.y, r, 0, 7); c.fill();
      c.lineWidth = 6; c.strokeStyle = isCur ? '#58c46a' : '#fff'; c.stroke();
      const lab = n.id === 0 ? '👂' : n.au ? (n.au.newGpcs.length ? n.au.newGpcs.map(g => gLabel(app.C.gpcs[g])).slice(0, 4).join(' ') : n.au.newPatterns.map(x => x.replace(/[\^$]/g, '').replace(/^(sy|af):/, '')).slice(0, 3).join(' ')) : (n.cu.gpcs.map(g => g[1]).slice(0, 4).join(' ') || (n.cu.concepts[0] || '…').replace(/[:(].*/, '').trim().split(' ').slice(0, 3).join(' '));
      if (planned) { text(c, lab, n.x, n.y - 6, { size: lab.length > 6 ? 20 : 28, color: '#8a9aa7' }); text(c, 'soon', n.x, n.y + 24, { size: 18, color: '#8a9aa7' }); }
      else if (!open && !passed) text(c, '🔒', n.x, n.y, { size: 38 });
      else text(c, lab, n.x, n.y + 2, { size: n.id === 0 ? 46 : lab.length > 8 ? 22 : 28, color: passed ? '#7a5a00' : '#23394b' });
      if (passed) text(c, '✔', n.x + 38, n.y - 38, { size: 30, color: '#2f9e44' });
      text(c, n.id === 0 ? '' : 'Unit ' + n.id, n.x, n.y + 78, { size: 20, color: '#4a6275' });
    });
    const cn = this.nodes.find(n => n.id === this.cur && n.au);
    if (cn) drawMonster(c, cn.x, cn.y - 100 + (this.shake ? Math.sin(this.t * 60) * 6 * this.shake : 0), 120, { color: app.colorHex, mood: 'happy', t: this.t, hat: hatFor(passedCount(st)) });
    if (!this.next && stage.id === 2) text(c, 'つぎの ユニットは じゅんびちゅう！ Next units are on their way.', W / 2, 440, { size: 22, color: '#4a6275', font: JP });
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
    const gl = C.gpcList.filter(g => !['suffix', 'silent'].includes(g.type));
    gl.forEach((g, i) => {
      const col = i % 12, row = Math.floor(i / 12), x = 30 + col * 110, y = 76 + row * 80;
      this.ui.push(new Btn({ x, y, w: 102, h: 72, shadow: false, customDraw: (c, u) => {
        const it = st.items['gpc:' + g.id], r = it?.rung || 0, got = r >= M.K.mastered, seen = !!it?.a.length;
        rr(c, 0, 4, u.w, u.h, 18); c.fillStyle = 'rgba(30,50,70,.25)'; c.fill();
        rr(c, 0, 0, u.w, u.h, 18); c.fillStyle = got ? '#7be0ad' : seen ? '#e7f3fb' : '#c3ced7'; c.fill(); c.lineWidth = got ? 5 : 3; c.strokeStyle = got ? '#fff' : '#a8b9c6'; c.stroke();
        text(c, seen || got ? gLabel(g) : '?', u.w / 2, 30, { size: gLabel(g).length > 1 ? 34 : 42, color: got ? '#175d3b' : '#5b7385' });
        for (let k = 0; k < 6; k++) { c.fillStyle = k < r ? '#ffb400' : 'rgba(0,0,0,.15)'; c.beginPath(); c.arc(u.w / 2 - 35 + k * 14, 60, 4.5, 0, 7); c.fill(); }
      }, onTap: () => { if (st.items['gpc:' + g.id]) app.audio.play(['gpc:' + g.id]); } }));
    });
    const ty0 = 76 + Math.ceil(gl.length / 12) * 80 + 14;
    C.trickyList.forEach((t, i) => this.ui.push(new Btn({ x: 30 + (i % 17) * 78, y: ty0 + Math.floor(i / 17) * 54, w: 72, h: 48, shadow: false, customDraw: (c, u) => {
      const it = st.items['tr:' + t.id], r = it?.rung || 0; rr(c, 0, 0, u.w, u.h, 12); c.fillStyle = r >= M.K.mastered ? '#ffc3d0' : it ? '#fff' : '#c3ced7'; c.fill();
      text(c, it ? t.t : '?', u.w / 2, u.h / 2 + 3, { size: t.t.length > 5 ? 20 : 24, color: '#a3203f' }); if (r >= M.K.mastered) text(c, '♥', u.w - 11, 11, { size: 14, color: '#e8365d' });
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
      mk(1180, 250, 170, 'Reset player', '#ec5d57', async () => { if (confirm('Erase all progress for this player?')) { app.replaceState(M.newState({ color: app.rec.id })); this.msg = 'Progress reset.'; } }),
      mk(1000, 310, 170, 'Class mode', '#a478e8', () => app.eng.go(new ClassScene(app))),
      mk(1000, 370, 170, 'More sounds ▶', '#7d95a8', () => { this.gp = ((this.gp || 0) + 1) % Math.ceil(C.gpcList.filter(g => !['suffix', 'silent'].includes(g.type)).length / 36); }),
      mk(1180, 310, 170, 'Record voices', '#a478e8', () => open('tools/recorder.html', '_blank')),
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
    { const cps = C.course?.checkpoints || [], got = st.checkpoints || {}; text(c, 'Check-ups: ' + cps.map(k => k.id.toUpperCase() + ' ' + (got[k.id] ? got[k.id].best + '%' : '–')).join('  ·  '), 40, 62, { size: 17, color: '#4a6275', align: 'left', weight: 'normal' }); }
    // GPC rung table
    const gl = C.gpcList.filter(g => !['suffix', 'silent'].includes(g.type)), PER = 36, pages = Math.ceil(gl.length / PER);
    if (pages > 1) text(c, `Sounds ${(this.gp || 0) + 1}/${pages}`, 700, 62, { size: 17, color: '#4a6275', weight: 'normal' });
    gl.slice((this.gp || 0) * PER, (this.gp || 0) * PER + PER).forEach((g, i) => {
      const col = i % 4, row = Math.floor(i / 4), x = 40 + col * 218, y = 140 + row * 50;
      const it = st.items['gpc:' + g.id], r = it?.rung || 0;
      rr(c, x, y, 208, 44, 10); c.fillStyle = r >= M.K.mastered ? '#d8f5e3' : it ? '#fff' : '#e8eef2'; c.fill(); c.lineWidth = 2; c.strokeStyle = '#cfdbe4'; c.stroke();
      text(c, gLabel(g), x + 30, y + 24, { size: gLabel(g).length > 2 ? 22 : 28, color: '#23394b' });
      for (let k = 0; k < 6; k++) { c.fillStyle = k < r ? '#ffb400' : '#d5dee5'; c.fillRect(x + 62 + k * 18, y + 14, 14, 16); }
      const acc = it && it.a.length ? Math.round((it.a.reduce((s, a) => s + a.ok, 0) / it.a.length) * 100) : null;
      text(c, acc == null ? '–' : acc + '%', x + 202, y + 24, { size: 16, color: '#4a6275', align: 'right', weight: 'normal' });
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
    const b = (x, y, w, h, label, fn, color = '#2e9cca') => new Btn({ x, y, w, h, label, size: 34, color, onTap: fn });
    this.ui = [
      new Btn({ x: 12, y: 10, w: 76, h: 56, icon: '🏠', size: 30, color: '#e8a23a', onTap: () => app.goHome() }),
      b(110, 12, 90, 54, '◀', () => { this.unit = Math.max(1, this.unit - 1); this.i = 0; this.rebuild(); }),
      b(310, 12, 90, 54, '▶', () => { this.unit = Math.min(app.C.units.length - 1, this.unit + 1); this.i = 0; this.rebuild(); }),
      b(450, 12, 190, 54, this.tab === 'sounds' ? '🔤 Sounds' : '📖 Words', () => { this.tab = this.tab === 'sounds' ? 'words' : 'sounds'; this.i = 0; this.rebuild(); }, '#a478e8'),
      b(60, 270, 110, 110, '◀', () => { this.i = (this.i + n - 1) % n; }, '#58c46a'),
      b(1196, 270, 110, 110, '▶', () => { this.i = (this.i + 1) % n; }, '#58c46a'),
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
    const u = app.C.unitById[this.unit]; text(c, 'Unit ' + this.unit, 255, 40, { size: 30, color: '#fff' }); text(c, 'Class mode · tap the big card', 900, 40, { size: 24, color: '#cfe3f2', weight: 'normal' });
    const it = this.items()[this.i]; rr(c, 200, 110, 966, 440, 50); c.fillStyle = 'rgba(255,255,255,.96)'; c.fill();
    if (!it) return drawUI(c, this.ui);
    if (it.id) { const g = app.C.gpcs[it.id]; text(c, gLabel(g), 580, 330, { size: gLabel(g).length > 1 ? 300 : 380, color: '#ff5a3c' }); drawMonster(c, 940, 400, 220, { color: app.colorHex, mouth: this.mouth, t: this.t, mood: this.mouth ? 'idle' : 'happy' });
      const b = (g.bank || g.fbank || [])[0]; if (b) text(c, b[1], 940, 200, { size: 90 }); }
    else { const w = it.w; c.font = `bold 190px ${FONT}`; const labels = w.g.map(g => app.C.gpcs[g].g); const ws = labels.map(l => c.measureText(l).width); const tw = ws.reduce((a, b) => a + b, 0); let x = 520 - tw / 2;
      labels.forEach((l, i) => { text(c, l, x + ws[i] / 2, 320, { size: 190, color: this.hl === i ? '#ff5a3c' : '#23394b' }); x += ws[i]; });
      if (w.pic) picText2(c, w.pic, 960, 200); drawMonster(c, 960, 430, 170, { color: app.colorHex, mouth: this.mouth, t: this.t }); }
    text(c, `${this.i + 1} / ${this.items().length}`, 683, 525, { size: 24, color: '#7d95a8' });
    drawUI(c, this.ui);
  }
}
import { picText } from './ui.js';
const picText2 = (c, p, x, y) => picText(c, p, x, y, 110);
