// The lesson runner: turns a planned lesson (steps) into game activities on the canvas.
// Every interaction is a single tap. Evidence is recorded on the FIRST attempt only; a wrong answer shows the
// right one (informational feedback) and the child taps it to continue.
import { W, H, FONT, JP, text, rr, shade, Btn, Particles, drawUI } from './engine.js';
import { background, flow, tileW, drawTile, speaker, bubble, segmentWord, drawSegments, picText } from './ui.js';
import { drawMonster, hatFor } from './monster.js';
import { planLesson, stepQuestions, practiceSpec } from '../learn/lessonplan.js';
import * as M from '../learn/mastery.js';
import * as Q from '../learn/questions.js';
import { tokenize } from '../learn/curriculum.js';

const COLS = ['#ff8a5c', '#4aa3e8', '#58c46a', '#a478e8', '#f2b63c'];

export class LessonScene {
  constructor(app, spec) {
    this.app = app; this.spec = spec; this.ui = []; this.parts = new Particles(); this.t = 0;
    this.mouth = null; this.mood = 'idle'; this.promptDraw = null; this.dead = false; this.speaking = false;
    this.results = []; this.startedAt = Date.now(); this.stepNo = 0; this.stopped = null; this.overlay = null;
    this.rungsBefore = Object.fromEntries(Object.values(app.state.items).filter(i => i.kind === 'gpc').map(i => [i.id, i.rung]));
  }
  enter() {
    const { app } = this;
    this.steps = planLesson(app.C, app.state, this.spec, app.rng, Date.now());
    this.ctx = { used: new Set(), unit: this.spec.unit, now: Date.now() };
    this.home = new Btn({ x: 12, y: 10, w: 64, h: 52, icon: '🏠', size: 30, color: '#e8a23a', onTap: () => this.leave2() });
    this.run().catch(e => { if (!this.dead) console.error(e); });
  }
  leave() { this.dead = true; this.app.audio.stop(); }
  leave2() { this.dead = true; this.app.audio.stop(); this.app.save(true); this.app.goHome(); }
  get eng() { return this.app.eng; }
  update(dt) { this.t += dt; this.parts.update(dt); }
  alive() { if (this.dead) throw new Error('dead'); }

  // ------------------------------------------------------------------ drawing
  draw(c) {
    background(c, this.t, 'day');
    this.drawBar(c);
    const hat = hatFor(Object.values(this.app.state.units).filter(u => u.passed && u.skipped !== true).length);
    drawMonster(c, 150, 410, 220, { color: this.app.colorHex, mouth: this.mouth, mood: this.mood, t: this.t, hat });
    this.promptDraw?.(c);
    drawUI(c, [this.home, ...this.ui]);
    this.parts.draw(c);
    if (this.overlay) this.overlay(c);
  }
  drawBar(c) {
    const n = this.steps?.length || 1, x0 = 100, w = 1000, segW = w / n;
    rr(c, x0, 22, w, 20, 10); c.fillStyle = 'rgba(255,255,255,.55)'; c.fill();
    c.save(); rr(c, x0, 22, w, 20, 10); c.clip();
    c.fillStyle = '#58c46a'; c.fillRect(x0, 22, Math.min(w, segW * (this.stepNo + (this.stepFrac || 0))), 20); c.restore();
    for (let i = 1; i < n; i++) { c.fillStyle = 'rgba(255,255,255,.8)'; c.fillRect(x0 + segW * i - 1, 22, 2, 20); }
    if (this.errStreakBar) text(c, '', 0, 0);
  }

  // ------------------------------------------------------------------ flow
  async run() {
    const { app } = this;
    for (let i = 0; i < this.steps.length; i++) {
      this.alive(); this.stepNo = i; this.stepFrac = 0; const step = this.steps[i];
      if (step.type === 'close') break;
      if (this.shouldStop()) break;
      this.ctx.now = Date.now();
      if (step.type === 'meet') await this.meet(step);
      else if (step.type === 'story') await this.story(step);
      else {
        if (step.type === 'heart' && step.intro) for (const w of step.words) await this.heartIntro(w);
        const qs = stepQuestions(app.C, app.state, step, app.rng, this.ctx);
        for (let k = 0; k < qs.length; k++) {
          this.alive(); this.stepFrac = k / qs.length; if (this.shouldStop()) break;
          await this.ask(qs[k]);
        }
      }
    }
    this.stepFrac = 0; this.stepNo = this.steps.length;
    await this.finish();
  }
  /** Fatigue / session-length stop rule (blueprint). Evidence already recorded; the lesson is simply not marked done. */
  shouldStop() {
    if (this.stopped) return true;
    const last = this.results.slice(-6);
    if (last.length >= 6 && last.filter(r => !r).length >= 4) this.stopped = 'tired';
    else if ((Date.now() - this.startedAt) / 60000 > (this.app.state.settings.sessionMin || 12) + 3) this.stopped = 'time';
    return !!this.stopped;
  }
  sfx(n) { this.app.audio.sfx(n); }
  async speak(keys, opts) {
    const { app } = this; const list = [].concat(keys); this.speaking = true;
    const my = ++this.speakId || (this.speakId = 1);
    for (const k of list) {
      this.alive(); this.mouth = k.startsWith('gpc:') ? app.C.phonemes[app.C.gpcs[k.slice(4)]?.ph?.[0]]?.mouth || 'open' : null;
      this.talkIdx = list.indexOf(k);
      await app.audio.play([k], opts); if (this.speakId !== my) return;
    }
    this.mouth = null; this.speaking = false; this.talkIdx = -1;
  }
  stopSpeak() { this.speakId = (this.speakId || 0) + 1; this.app.audio.stop(); this.mouth = null; this.speaking = false; }
  tapWait() { return new Promise(r => { this._tapWait = r; }); }

  // ------------------------------------------------------------------ record
  record(q, res) {
    const { app } = this; Q.applyResult(app.state, app.C, q, res, Date.now(), M.record); this.results.push(!!res.ok); app.save();
  }

  // ------------------------------------------------------------------ meet a new sound
  async meet(step) {
    const { app } = this, C = app.C, g = C.gpcs[step.gpc]; this.mood = 'happy';
    const bank = (g.bank || g.fbank || []).slice(0, 3); const pos = g.bank ? 'initial' : 'final';
    let heard = false, done = false;
    const cards = bank.map((b, i) => new Btn({ x: 400 + i * 250, y: 330, w: 230, h: 230, color: '#fff', shadow: false,
      customDraw: (c, u) => {
        rr(c, 0, 6, u.w, u.h, 26); c.fillStyle = 'rgba(30,50,70,.3)'; c.fill(); rr(c, 0, 0, u.w, u.h, 26); c.fillStyle = '#fff'; c.fill();
        picText(c, b[1], u.w / 2, 90, 100);
        drawSegments(c, segmentWord(b[0], g.g, pos), u.w / 2, 190, 52, '#ff5a3c', '#23394b', u.w - 24);
      }, onTap: () => this.speak('b:' + b[0]) }));
    const big = new Btn({ x: 520, y: 80, w: 330, h: 230, color: '#fff', shadow: false,
      customDraw: (c, u) => {
        rr(c, 0, 8, u.w, u.h, 40); c.fillStyle = 'rgba(30,50,70,.3)'; c.fill(); rr(c, 0, 0, u.w, u.h, 40); c.fillStyle = '#fff4c2'; c.fill(); c.lineWidth = 6; c.strokeStyle = '#ffd23f'; c.stroke();
        text(c, g.g, u.w / 2, u.h / 2 + 8, { size: g.g.length > 1 ? 150 : 190, color: '#ff5a3c' });
      }, onTap: () => { heard = true; return this.speak('gpc:' + g.id); } });
    const spk = new Btn({ x: 880, y: 140, w: 110, h: 110, shadow: false, customDraw: (c, u) => speaker(c, 55, 55, 52, this.speaking), onTap: () => { heard = true; this.speak('gpc:' + g.id); } });
    const next = new Btn({ x: 1180, y: 480, w: 160, h: 90, icon: '▶', size: 54, color: '#58c46a', onTap: () => { if (heard) done = true; } });
    this.ui = [big, spk, ...cards, next];
    this.promptDraw = c => {
      if (step.reteach) text(c, '🔁', 1030, 130, { size: 60 });
      if (g.id === 'sz') text(c, 'dogs · pigs · bees', 750, 40 + 330 - 40, { size: 0, color: '#fff' });
      next.enabled = heard; next.pop = heard ? 1 + Math.sin(this.t * 6) * 0.04 : 1;
      if (!heard) text(c, '👆', 700, 300 + Math.sin(this.t * 5) * 6, { size: 44 });
    };
    this.speak('gpc:' + g.id).then(() => { heard = true; });
    await new Promise(r => { const iv = setInterval(() => { if (done || this.dead) { clearInterval(iv); r(); } }, 60); });
    this.alive(); this.stopSpeak(); this.sfx('pop');
    if (step.reteach) app.state.reteach = app.state.reteach.filter(id => id !== 'gpc:' + step.gpc);
    // first exposure counts toward the half-life clock, not toward any rung
    M.getItem(app.state, M.keys.gpc(g.id), 'gpc').first ??= Date.now();
    this.promptDraw = null; this.ui = []; this.mood = 'idle';
  }

  async heartIntro(id) {
    const { app } = this, t = app.C.tricky[id]; this.mood = 'happy'; let done = false, heard = false;
    const word = new Btn({ x: 400, y: 120, w: 700, h: 210, shadow: false, customDraw: (c, u) => {
      rr(c, 0, 8, u.w, u.h, 40); c.fillStyle = 'rgba(30,50,70,.3)'; c.fill(); rr(c, 0, 0, u.w, u.h, 40); c.fillStyle = '#fff'; c.fill();
      const letters = t.parts.flatMap(p => p.replace('*', '').split('').map(ch => ({ ch, heart: p.startsWith('*') })));
      c.font = `bold 130px ${FONT}`; const ws = letters.map(l => c.measureText(l.ch).width + 8); const tw = ws.reduce((a, b) => a + b, 0); let x = u.w / 2 - tw / 2;
      letters.forEach((l, i) => { text(c, l.ch, x + ws[i] / 2, 120, { size: 130, color: l.heart ? '#e8365d' : '#23394b' }); if (l.heart) text(c, '♥', x + ws[i] / 2, 40, { size: 40, color: '#e8365d' }); x += ws[i]; });
    }, onTap: () => { heard = true; this.speak('w:' + id); } });
    const note = new Btn({ x: 400, y: 350, w: 700, h: 120, shadow: false, customDraw: (c, u) => {
      rr(c, 0, 0, u.w, u.h, 30); c.fillStyle = 'rgba(255,255,255,.88)'; c.fill();
      text(c, t.noteJa, u.w / 2, 38, { size: 30, color: '#23394b', font: JP });
      text(c, t.noteEn, u.w / 2, 86, { size: 26, color: '#4a6275', weight: 'normal' });
    }, onTap: () => { heard = true; this.speak('w:' + id); } });
    const next = new Btn({ x: 1180, y: 480, w: 160, h: 90, icon: '▶', size: 54, color: '#58c46a', onTap: () => { done = true; } });
    this.ui = [word, note, next];
    this.promptDraw = null; this.speak('w:' + id);
    await new Promise(r => { const iv = setInterval(() => { if (done || this.dead) { clearInterval(iv); r(); } }, 60); });
    this.alive(); this.stopSpeak(); this.ui = []; this.mood = 'idle';
    M.getItem(app.state, M.keys.tricky(id), 'tricky').first ??= Date.now();
  }

  // ------------------------------------------------------------------ questions
  async ask(q) {
    this.mood = 'idle'; this.cur = q;
    const r = (q.type === 'choice' || q.type === 'chain') ? await this.askChoice(q) : await this.askBuild(q);
    this.cur = null; this.bld = null; return r;
  }

  /** Draw the shared prompt area above the answers. */
  makePrompt(q, state) {
    const { app } = this, p = q.prompt || {};
    const replay = new Btn({ x: 505, y: 95, w: 96, h: 96, shadow: false, customDraw: (c, u) => speaker(c, 48, 48, 44, this.speaking), onTap: () => this.playPrompt(q), visible: !!(p.audio && p.audio.length) });
    this.promptDraw = c => {
      // speech bubble from the monster
      if (q.type === 'choice' || q.type === 'chain') {
        if (p.grapheme) {
          rr(c, 640, 70, 250, 215, 36); c.fillStyle = '#fff4c2'; c.fill(); c.lineWidth = 6; c.strokeStyle = '#ffd23f'; c.stroke();
          text(c, p.grapheme, 765, p.context ? 150 : 178, { size: p.grapheme.length > 1 ? 120 : 160, color: '#ff5a3c' });
          if (p.context) drawSegments(c, segmentWord(p.context, 's', 'final'), 765, 245, 54);
          // position cue: a word bar with the start or end highlighted
          const fin = p.position === 'final';
          for (let i = 0; i < 4; i++) { rr(c, 940 + i * 36, 160, 30, 30, 8); c.fillStyle = (fin ? i === 3 : i === 0) ? '#ff5a3c' : '#d6e4ee'; c.fill(); }
          text(c, fin ? 'おわりの おと' : 'はじめの おと', 1030, 220, { size: 26, color: '#2d4a5e', font: JP });
        } else if (p.text) {
          rr(c, 600, 70, 380, 200, 36); c.fillStyle = '#fff'; c.fill(); c.lineWidth = 5; c.strokeStyle = '#bcd3e3'; c.stroke();
          text(c, p.text, 790, 172, { size: p.text.length > 4 ? 96 : 120, color: '#23394b' });
        } else if (p.talk) {
          const n = p.talk.length;
          for (let i = 0; i < n; i++) { const on = this.talkIdx === i || state.revealed; rr(c, 790 - (n * 100) / 2 + i * 100, 130, 84, 84, 42); c.fillStyle = on ? '#ffd23f' : 'rgba(255,255,255,.7)'; c.fill(); c.lineWidth = 4; c.strokeStyle = '#fff'; c.stroke(); }
          text(c, '👂', 790, 100, { size: 40 });
          if (p.pic && state.revealed) picText(c, p.pic, 1000, 170, 110);
        } else if (q.type === 'chain') {
          const tiles = q.start.map(l => ({ l, w: tileW(l, 70) })); const fill = state.filled;
          let x = 560; const total = tiles.reduce((s, t) => s + t.w + 14, 0) - 14; x = 790 - total / 2;
          tiles.forEach((t, i) => { const isPos = i === q.pos; const label = isPos ? (fill ? q.options[q.answer].label : '?') : t.l;
            drawTile(c, x, 92, t.w, 100, label, { size: 70, state: isPos ? (fill ? 'right' : 'ghost') : 'idle', hot: isPos && !fill }); x += t.w + 14; });
          if (p.pic) picText(c, p.pic, 1040, 140, 90);
        } else if (p.pic) {
          picText(c, p.pic, 790, 150, 130);
        } else if (p.oral && !p.pic && q.act !== 'same-different') {
          text(c, '👂', 790, 150, { size: 120 });
        } else if (p.monster) {
          text(c, '❓', 790, 150, { size: 120 }); text(c, '👽', 880, 110, { size: 60 });
        } else if (p.oral && q.act === 'same-different') {
          text(c, '👂 = ?  ≠ ?', 790, 150, { size: 60, color: '#23394b' });
        }
      }
    };
    return replay;
  }
  async playPrompt(q) {
    const p = q.prompt || {};
    if (p.talk) { await this.speak(p.talk, { gap: 0.18 }); return; }
    if (p.audio?.length) await this.speak(p.audio, { gap: p.gap ?? 0.12 });
  }
  hintAudio(q) {
    const right = q.options[q.answer];
    if (q.act === 'recall-flash' || q.act === 'initial-sound') return this.speak(right.audio || 'b:' + right.word);
    if (q.act === 'listen-pick') return this.speak('gpc:' + q.gpc);
    if (q.act === 'read-match') return this.speak('w:' + q.word);
    if (q.prompt.talk) return this.speak(['w:' + q.word]);
    if (q.prompt.audio?.length) return this.speak(q.prompt.audio);
  }

  askChoice(q) {
    const { app } = this; const n = q.options.length;
    const hasPic = q.options.some(o => o.pic), isTile = !hasPic;
    const long = q.options.some(o => (o.label || '').length > 3);
    const cw = hasPic ? 230 : long ? 280 : 210, ch = hasPic ? 230 : 190, gap = 34, total = n * cw + (n - 1) * gap;
    const x0 = 790 - total / 2 + 60, y0 = hasPic ? 330 : 340;
    const state = { revealed: false, filled: false };
    let first = null, done = false, ready = false, tStart = 0;
    const opts = q.options.map((o, i) => new Btn({ x: x0 + i * (cw + gap), y: y0, w: cw, h: ch, shadow: false, idx: i, st: 'idle', shake: 0, glow: 0,
      customDraw: (c, u) => {
        const dx = Math.sin(u.shake * 40) * 10 * u.shake;
        c.translate(dx, 0);
        const fill = u.st === 'right' ? '#8ee59a' : u.st === 'wrong' ? '#ffb3a8' : '#fff';
        rr(c, 0, 8, u.w, u.h, 28); c.fillStyle = 'rgba(30,50,70,.3)'; c.fill();
        rr(c, 0, 0, u.w, u.h, 28); c.fillStyle = fill; c.fill(); c.lineWidth = u.glow > 0 ? 8 : 3; c.strokeStyle = u.glow > 0 ? '#ffd23f' : '#9fb4c4'; c.stroke();
        if (o.pic) picText(c, o.pic, u.w / 2, u.h / 2 + 4, 120);
        else if (o.icon === 'same' || o.icon === 'diff') { text(c, o.icon === 'same' ? '＝' : '≠', u.w / 2, u.h / 2, { size: 120, color: '#23394b' }); }
        else text(c, o.label, u.w / 2, u.h / 2 + 6, { size: o.label.length > 3 ? 78 : o.label.length > 1 ? 100 : 120, color: '#23394b' });
        if (u.st === 'wrong') text(c, '✖', u.w - 30, 30, { size: 34, color: '#d8402c' });
      },
      onTap: async u => {
        if (!ready || done || u.st === 'wrong') return;
        const ok = u.idx === q.answer;
        if (!first) { first = { ok, lat: performance.now() - tStart, lure: o.gpc }; this.record(q, first); }
        if (ok) {
          done = true; u.st = 'right'; this.sfx('good'); this.mood = 'happy'; state.revealed = true; state.filled = true;
          this.parts.burst(u.x + u.w / 2, u.y + u.h / 2, first.ok && first.lat != null ? 16 : 8);
          this.stopSpeak();
          const after = q.prompt.after || (q.act === 'listen-pick' ? [] : []);
          const say = q.type === 'chain' ? ['w:' + q.to] : (after.length ? after : q.act === 'recall-flash' ? ['b:' + o.word] : []);
          if (say.length) await this.speak(say); else await app.eng.wait(450);
          await app.eng.wait(350);
          this.resolveAsk?.(first);
        } else {
          u.st = 'wrong'; this.sfx('bad'); this.mood = 'oops'; app.eng.tween(u, { shake: 1 }, 1, 'linear'); u.shake = 1; app.eng.tween(u, { shake: 0 }, 450, 'out');
          const right = opts[q.answer]; right.glow = 1;
          this.hintAudio(q); setTimeout(() => { if (!this.dead) this.mood = 'idle'; }, 900);
        }
      } }));
    const replay = this.makePrompt(q, state);
    this.ui = [replay, ...opts];
    return new Promise(async resolve => {
      this.resolveAsk = r => { this.ui = []; this.promptDraw = null; resolve(r); };
      opts.forEach(o => { o.enabled = true; });
      if (q.prompt.talk || q.prompt.audio?.length) await Promise.race([this.playPrompt(q), app.eng.wait(4200)]);
      ready = true; tStart = performance.now();
    });
  }

  // ------------------------------------------------------------------ constructed responses
  askBuild(q) {
    const { app } = this; const sentence = q.type === 'sentence';
    const size = sentence ? 44 : 78, slotH = sentence ? 80 : 120;
    const labels = q.slots;
    const trayItems = q.tray.map((t, i) => ({ label: t.label, w: tileW(t.label, size), i, placed: -1, cx: 0, cy: 0, x: 0, y: 0, shake: 0, st: 'idle' }));
    const slotItems = labels.map((l, i) => ({ label: l, w: sentence ? tileW(l, size) : tileW(l, size), i, filled: -1, st: 'idle' }));
    const cx = 790;
    let top = 250;
    const layoutSlots = () => { const hh = flow(slotItems, cx, q.prompt.pic ? 245 : 200, 960, 14, slotH + 14); return hh; };
    const sh = layoutSlots();
    const trayTop = Math.max(380, 245 + sh + 40);
    flow(trayItems, cx, trayTop, 960, 16, slotH + 18);
    trayItems.forEach(t => { t.cx = t.x; t.cy = t.y; });
    const state = { attempts: 0, locked: false };
    let first = null, done = false, tStart = performance.now();
    const target = i => slotItems[i];
    const place = async t => {
      if (state.locked || t.placed >= 0) return;
      const s = slotItems.find(s => s.filled < 0); if (!s) return;
      s.filled = t.i; t.placed = s.i; this.sfx('pop');
      app.eng.tween(t, { cx: s.x + (s.w - t.w) / 2, cy: s.y }, 180, 'out');
      if (slotItems.every(s => s.filled >= 0)) await check();
    };
    const unplace = t => { if (state.locked || t.placed < 0) return; const s = slotItems[t.placed]; s.filled = -1; t.placed = -1; app.eng.tween(t, { cx: t.x, cy: t.y }, 180, 'out'); };
    const check = async () => {
      state.locked = true; state.attempts++;
      const oks = slotItems.map(s => trayItems[s.filled].label === s.label);
      const allOk = oks.every(Boolean);
      if (!first) { first = { ok: allOk, lat: null, tokOk: sentence ? oks : undefined }; this.record(q, first); }
      if (allOk) {
        slotItems.forEach(s => { s.st = 'right'; trayItems[s.filled].st = 'right'; }); this.sfx('good'); this.mood = 'happy';
        this.parts.burst(cx, 260, 18);
        await this.speak(sentence ? ['sent:' + q.text] : [q.act === 'heart-build' ? 'w:' + q.tricky : 'w:' + q.word]);
        await app.eng.wait(350); this.finishBuild(first); return;
      }
      this.sfx('bad'); this.mood = 'oops';
      slotItems.forEach((s, i) => { if (!oks[i]) { s.st = 'wrong'; trayItems[s.filled].st = 'wrong'; trayItems[s.filled].shake = 1; } });
      await app.eng.wait(700); this.mood = 'idle';
      if (state.attempts >= 3) { // reveal the answer: place the right tiles
        slotItems.forEach(s => { if (s.filled >= 0) { const t = trayItems[s.filled]; t.placed = -1; s.filled = -1; t.cx = t.x; t.cy = t.y; t.st = 'idle'; } s.st = 'idle'; });
        for (const s of slotItems) { const t = trayItems.find(t => t.placed < 0 && t.label === s.label); s.filled = t.i; t.placed = s.i; t.st = 'right'; s.st = 'right'; await app.eng.tween(t, { cx: s.x + (s.w - t.w) / 2, cy: s.y }, 220, 'out'); }
        await this.speak(sentence ? ['sent:' + q.text] : ['w:' + (q.word || q.tricky)]); await app.eng.wait(300); this.finishBuild(first); return;
      }
      slotItems.forEach((s, i) => { if (!oks[i]) { const t = trayItems[s.filled]; t.placed = -1; s.filled = -1; s.st = 'idle'; t.st = 'idle'; app.eng.tween(t, { cx: t.x, cy: t.y }, 220, 'out'); } });
      state.locked = false;
    };
    const tiles = trayItems.map(t => new Btn({ x: 0, y: 0, w: t.w, h: slotH, shadow: false, t,
      customDraw: () => {}, onTap: () => (t.placed >= 0 ? unplace(t) : place(t)) }));
    // tiles move, so hit areas follow them each frame
    const slotsUI = slotItems.map(s => new Btn({ x: s.x, y: s.y, w: s.w, h: slotH, shadow: false, customDraw: () => {}, onTap: () => { if (s.filled >= 0) unplace(trayItems[s.filled]); } }));
    const replay = new Btn({ x: 505, y: 95, w: 96, h: 96, shadow: false, customDraw: (c, u) => speaker(c, 48, 48, 44, this.speaking), onTap: () => this.speak(q.prompt.audio, {}) });
    const hearts = q.hearts || [];
    this.promptDraw = c => {
      if (q.prompt.pic) picText(c, q.prompt.pic, 760, 150, 110);
      else if (!q.prompt.pic && !sentence) text(c, '👂', 760, 150, { size: 90 });
      slotItems.forEach((s, i) => {
        drawTile(c, s.x, s.y, s.w, slotH, '', { state: s.st === 'right' ? 'right' : s.st === 'wrong' ? 'wrong' : 'ghost', size });
        if (hearts[i]) text(c, '♥', s.x + s.w / 2, s.y - 16, { size: 30, color: '#e8365d' });
      });
      for (const t of trayItems) {
        const dx = Math.sin(t.shake * 40) * 8 * t.shake;
        drawTile(c, t.cx + dx, t.cy, t.w, slotH, t.label, { size, state: t.st === 'idle' ? 'idle' : t.st });
        // empty tray home outline
        if (t.placed >= 0) { rr(c, t.x, t.y, t.w, slotH, 20); c.fillStyle = 'rgba(255,255,255,.2)'; c.fill(); }
      }
    };
    // hit regions follow tiles
    const sync = () => { tiles.forEach((u, i) => { const t = trayItems[i]; u.x = t.cx; u.y = t.cy; }); };
    this.update = (dt) => { this.t += dt; this.parts.update(dt); for (const t of trayItems) if (t.shake > 0) t.shake = Math.max(0, t.shake - dt * 2.2); sync(); };
    this.bld = { trayItems, slotItems }; this.ui = [replay, ...slotsUI, ...tiles];
    return new Promise(async resolve => {
      this.finishBuild = r => { this.ui = []; this.promptDraw = null; this.update = LessonScene.prototype.update; resolve(r); };
      await Promise.race([this.speak(q.prompt.audio), app.eng.wait(3500)]);
      tStart = performance.now();
    });
  }

  // ------------------------------------------------------------------ stories
  async story(step) {
    const { app } = this, C = app.C, st = C.stories[step.story], read = step.read;
    this.mood = 'happy';
    const helped = new Set(); let total = 0;
    const toks = st.pages.map(p => tokenize(p.text));
    for (let pi = 0; pi < st.pages.length; pi++) {
      this.alive(); this.stepFrac = pi / (st.pages.length + (read === 3 ? 1 : 0));
      const page = st.pages[pi], tk = toks[pi]; total += tk.length;
      let done = false, hl = -1;
      const items = tk.map((t, i) => ({ t, i, w: 0 }));
      const sz = 64;
      const meas = document.createElement('canvas').getContext('2d'); meas.font = `bold ${sz}px ${FONT}`;
      items.forEach(it => { it.w = meas.measureText(it.t.raw).width + 24; });
      flow(items, 880, 270, 700, 6, 96);
      const wordBtns = items.map(it => new Btn({ x: it.x, y: it.y, w: it.w, h: 84, shadow: false, customDraw: (c, u) => {
        const on = hl === it.i, helpedNow = helped.has(pi + ':' + it.i);
        if (on || helpedNow) { rr(c, 0, 0, u.w, u.h, 18); c.fillStyle = on ? '#ffe680' : 'rgba(255,214,102,.35)'; c.fill(); }
        text(c, it.t.raw, u.w / 2, u.h / 2 + 4, { size: sz, color: '#23394b' });
      }, onTap: () => { if (read === 1) helped.add(pi + ':' + it.i); this.speak('w:' + it.t.key); } }));
      const listen = new Btn({ x: 1180, y: 110, w: 130, h: 110, shadow: false, customDraw: (c, u) => speaker(c, 65, 55, 50, this.speaking), onTap: () => this.readAlong(page.text, tk, i => { hl = i; }) });
      const next = new Btn({ x: 1180, y: 480, w: 160, h: 90, icon: '▶', size: 54, color: '#58c46a', onTap: () => { done = true; } });
      this.ui = [...wordBtns, listen, next];
      this.promptDraw = c => {
        rr(c, 340, 70, 1000, 400, 40); c.fillStyle = 'rgba(255,255,255,.93)'; c.fill(); c.lineWidth = 5; c.strokeStyle = '#bcd3e3'; c.stroke();
        picText(c, page.pic, 520, 200, page.pic.length > 3 ? 100 : 130); text(c, `${pi + 1}/${st.pages.length}`, 400, 100, { size: 26, color: '#7d95a8' });
        text(c, read === 1 ? 'タップ：わからないことば' : read === 2 ? '▶ きいて いっしょに よもう' : 'よんでみよう', 760, 100, { size: 24, color: '#7d95a8', font: JP });
        next.pop = 1 + Math.sin(this.t * 5) * 0.03;
      };
      if (read === 2) this.readAlong(page.text, tk, i => { hl = i; });
      await new Promise(r => { const iv = setInterval(() => { if (done || this.dead) { clearInterval(iv); r(); } }, 60); });
      this.alive(); this.stopSpeak(); this.sfx('pop');
    }
    this.mood = 'idle'; this.promptDraw = null; this.ui = [];
    if (read === 1) {
      const acc = Math.max(0, 1 - helped.size / Math.max(1, total));
      M.recordStory(app.state, this.spec.unit, step.story, 1, { accuracy: acc, now: Date.now() });
    } else if (read === 3) {
      const ok = await this.storyQuestion(st);
      M.recordStory(app.state, this.spec.unit, step.story, 3, { qOk: ok, now: Date.now() });
    } else M.recordStory(app.state, this.spec.unit, step.story, read, { now: Date.now() });
    app.save();
  }
  async readAlong(textStr, tk, setHl) {
    this.stopSpeak(); const my = this.speakId; this.speaking = true;
    const p = this.app.audio.play(['sent:' + textStr]);
    for (let i = 0; i < tk.length; i++) { if (this.speakId !== my || this.dead) break; setHl(i); await this.app.eng.wait(Math.max(260, 120 + tk[i].raw.length * 85)); }
    setHl(-1); await p; this.speaking = false;
  }
  async storyQuestion(st) {
    const q = st.questions[0]; if (!q) return true;
    const { app } = this; const opts = this.app.rng.shuffle([{ pic: q.answer[0], word: q.answer[1], ok: true }, ...q.distractors.map(d => ({ pic: d[0], word: d[1] }))]);
    let first = null, done = false;
    const btns = opts.map((o, i) => new Btn({ x: 520 + i * 270, y: 320, w: 240, h: 230, shadow: false, st: 'idle',
      customDraw: (c, u) => { rr(c, 0, 8, u.w, u.h, 28); c.fillStyle = 'rgba(30,50,70,.3)'; c.fill(); rr(c, 0, 0, u.w, u.h, 28); c.fillStyle = u.st === 'right' ? '#8ee59a' : u.st === 'wrong' ? '#ffb3a8' : '#fff'; c.fill(); picText(c, o.pic, u.w / 2, u.h / 2, 120); },
      onTap: async u => { if (done || u.st === 'wrong') return; if (first === null) first = !!o.ok;
        if (o.ok) { done = true; u.st = 'right'; this.sfx('good'); this.mood = 'happy'; this.parts.burst(u.x + 120, u.y + 100, 20); await app.eng.wait(700); } else { u.st = 'wrong'; this.sfx('bad'); } } }));
    this.ui = btns;
    this.promptDraw = c => { rr(c, 380, 70, 940, 200, 36); c.fillStyle = '#fff'; c.fill(); drawSegments(c, [{ s: q.q, hot: false }], 850, 140, q.q.length > 22 ? 48 : 60); text(c, '👂', 430, 110, { size: 44 }); };
    this.speak(['sent:' + q.q]);
    await new Promise(r => { const iv = setInterval(() => { if (done || this.dead) { clearInterval(iv); r(); } }, 60); });
    this.alive(); this.ui = []; this.promptDraw = null; this.mood = 'idle';
    return first === true;
  }

  // ------------------------------------------------------------------ finish
  async finish() {
    const { app } = this, C = app.C;
    const complete = !this.stopped;
    if (complete) M.completeLesson(C, app.state, this.spec, Date.now());
    app.state.stats.secondsPlayed += Math.round((Date.now() - this.startedAt) / 1000);
    const gems = Object.values(app.state.items).filter(i => i.kind === 'gpc' && i.rung >= M.K.mastered && (this.rungsBefore[i.id] ?? 0) < M.K.mastered).map(i => i.id.slice(4));
    const unitDone = complete && app.state.units[this.spec.unit]?.passed && !this.unitWasPassed;
    await app.save(true);
    this.alive(); this.ui = []; this.promptDraw = null; this.mood = 'happy';
    let pos = 0; const gemObjs = gems.map((g, i) => ({ g, y: -80, x: 700 + (i - (gems.length - 1) / 2) * 140, s: 0 }));
    this.overlay = null;
    const home = new Btn({ x: 590, y: 470, w: 200, h: 100, icon: '▶', size: 60, color: '#58c46a', onTap: () => { this.dead = true; app.goHome(); } });
    this.ui = [home];
    this.promptDraw = c => {
      rr(c, 400, 70, 760, 370, 44); c.fillStyle = 'rgba(255,255,255,.93)'; c.fill();
      const msg = this.stopped === 'tired' ? 'すこし やすもう 😴' : this.stopped === 'time' ? 'きょうは ここまで！ 🌙' : 'できたね！ 🎉';
      text(c, msg, 780, 120, { size: 52, color: '#23394b', font: JP });
      const n = this.results.length, ok = this.results.filter(Boolean).length;
      text(c, n ? '⭐'.repeat(Math.max(1, Math.round((ok / n) * 3))) : '⭐', 780, 200, { size: 64 });
      gemObjs.forEach(o => { c.save(); c.translate(o.x + 40, o.y); c.scale(o.s, o.s); c.fillStyle = '#7be0ad'; c.beginPath(); c.moveTo(0, -60); c.lineTo(55, -15); c.lineTo(35, 55); c.lineTo(-35, 55); c.lineTo(-55, -15); c.closePath(); c.fill(); c.lineWidth = 6; c.strokeStyle = '#fff'; c.stroke(); text(c, o.g, 0, 0, { size: o.g.length > 1 ? 52 : 68, color: '#175d3b' }); c.restore(); });
      if (gems.length) text(c, 'あたらしい ジェム！', 780, 300, { size: 26, color: '#2d4a5e', font: JP });
    };
    this.sfx('win'); this.parts.burst(780, 200, 40);
    for (const o of gemObjs) { this.sfx('gem'); await Promise.all([app.eng.tween(o, { y: 380, s: 1 }, 600, 'back'), app.eng.wait(250)]); this.parts.burst(o.x + 40, 380, 14); }
  }
}
