// The lesson runner: turns a planned lesson (steps) into game activities on the canvas.
// Every interaction is a single tap. Evidence is recorded on the FIRST attempt only; a wrong answer shows the
// right one (informational feedback) and the child taps it to continue.
import { W, H, FONT, JP, UIF, text, rr, shade, Btn, Particles, drawUI } from './engine.js';
import { panel, starRow, starShape, cardFace, progress, icon, slab, PAL, INK, INK2 } from './sprites.js';
import { BANK_JA } from './bankja.js';
import { background, flow, tileW, drawTile, speaker, bubble, segmentWord, drawSegments, picText, card, speech } from './ui.js';
import { drawMonster, hatFor, hatOf } from './monster.js';
import { planLesson, stepQuestions, practiceSpec } from '../learn/lessonplan.js';
import * as M from '../learn/mastery.js';
import * as Q from '../learn/questions.js';
import { tokenize } from '../learn/curriculum.js';
import { gLabel, unitInfo } from './unitinfo.js';
import { readStory } from './storybook.js';
import { awardSticker, markDay, CelebrateScene } from './rewards.js';
import { hatsUnlocked, HAT_LIST } from './monster.js';


// What the monster says at the top-left of every activity: Japanese first, English underneath.
const INSTR = {
  'listen-pick': ['おとを きいて、おなじ もじを タップ！', 'Listen. Tap the letter for that sound.'],
  'recall-flash': ['この おとが ある えを タップ！', 'Tap the picture with this sound.'],
  'initial-sound': ['はじめの おとが おなじ えは？', 'Which picture starts with this sound?'],
  'same-different': ['ふたつの ことばは おなじ？ ちがう？', 'Do the two words sound the same?'],
  'syllable': ['おとの かたまりは いくつ？', 'How many beats are in the word?'],
  'minimal-pair': ['きいた ことばを タップ！', 'Listen. Tap the word you hear.'],
  'blend-choose': ['おとを つなげて、ことばを えらぼう', 'Blend the sounds. Tap the word.'],
  'read-match': ['ことばを よんで、あう えを タップ！', 'Read the word. Tap its picture.'],
  'pseudo': ['へんな ことば！ きこえた ほうを タップ', 'A silly word! Tap what you hear.'],
  'tricky-choose': ['きいた ことばを タップ！', 'Listen. Tap the word you hear.'],
  'heart-build': ['ことばを ならべよう。♥は とくべつ！', 'Build the word. ♥ letters are tricky!'],
  'spell-tiles': ['きいて、もじを じゅんばんに ならべよう', 'Listen. Tap the letters in order.'],
  'dictation': ['きいて、ぶんを つくろう', 'Listen. Build the sentence.'],
  'word-chain': ['もじを 1つ かえて あたらしい ことばを！', 'Change one letter to make a new word.'],
  'syllable-chop': ['ことばを おとの かたまりに わけよう', 'Where does the word split?'],
  'word-sum': ['パーツを くっつけると？', 'Join the parts. Which word?'],
  'affix-build': ['きいた ことばを パーツで つくろう', 'Build the word from its parts.'],
  meet: ['この おとを きいて おぼえよう！', 'Listen and learn this sound.'],
  storyq: ['おはなしの クイズ！ こたえを タップ', 'Story quiz! Tap the answer.'],
  story: ['おはなしを よもう！ わからない ことばは タップ', 'Read the story. Tap a word to hear it.'],
  heart: ['とくべつな ことば。まるごと おぼえよう！', 'A tricky word. Learn it by heart.'],
  syl: ['おとの かたまりを かぞえよう', 'Count the beats in each word.'],
  morph: ['ことばは パーツで できているよ', 'Words are built from parts.'],
};

const faceOfCol = hex => hex;
const COLS = ['#ff8a5c', '#4aa3e8', '#58c46a', '#a478e8', '#f2b63c'];

export class LessonScene {
  constructor(app, spec) {
    this.app = app; this.spec = spec; this.ui = []; this.parts = new Particles(); this.t = 0;
    this.mouth = null; this.mood = 'idle'; this.promptDraw = null; this.dead = false; this.speaking = false;
    this.results = []; this.startedAt = Date.now(); this.stepNo = 0; this.stopped = null; this.overlay = null;
    this.rungsBefore = Object.fromEntries(Object.values(app.state.items).filter(i => i.kind === 'gpc').map(i => [i.id, i.rung]));
    this.unitWasPassed = !!app.state.units[this.spec.unit]?.passed; this.hatsBefore = hatsUnlocked(app.state);
  }
  enter() {
    const { app } = this;
    this.steps = globalThis.__forceSteps || planLesson(app.C, app.state, this.spec, app.rng, Date.now());   // test hook
    this.ctx = { used: new Set(), unit: this.spec.unit, now: Date.now() };
    this.home = new Btn({ x: 14, y: 12, w: 68, h: 56, icon: 'home', size: 30, color: '#e6ebf1', onTap: () => this.leave2() });
    this.run().catch(e => { if (!this.dead) console.error(e); });
  }
  leave() { this.dead = true; this.app.audio.stop(); }
  leave2() { this.dead = true; this.app.audio.stop(); this.app.save(true); this.app.goHome(); }
  get eng() { return this.app.eng; }
  get fixed() { return [this.home]; }
  update(dt) { this.t += dt; this.parts.update(dt); }
  alive() { if (this.dead) throw new Error('dead'); }

  // ------------------------------------------------------------------ drawing
  draw(c) {
    background(c, this.t, 'day');
    this.drawBar(c);
    const hat = hatOf(this.app.state);
    drawMonster(c, 168, 412, 212, { color: this.app.colorHex, mouth: this.mouth, mood: this.mood, t: this.t, hat, jump: this.jump || 0 });
    if (this.fb && this.fb.until > this.t) speech(c, 14, 78, 282, this.fb.ja, this.fb.en, this.fb.ok ? 'ok' : 'bad');
    else if (this.bookTip) speech(c, 14, 78, 282, this.bookTip[0], this.bookTip[1]);
    else if (this.instr && INSTR[this.instr]) speech(c, 14, 78, 282, INSTR[this.instr][0], INSTR[this.instr][1]);
    this.bookDraw?.(c);
    this.promptDraw?.(c);
    this.bookOverlay?.(c);
    drawUI(c, [this.home, ...this.ui]);
    this.drawDemo(c);
    if (this.comboShow && this.t - this.comboShow.at < 1.6) {   // "3 in a row!" banner
      const a = this.t - this.comboShow.at, sc = a < 0.25 ? a / 0.25 * 1.15 : a < 0.4 ? 1.15 - (a - 0.25) : 1, fade = a > 1.2 ? 1 - (a - 1.2) / 0.4 : 1;
      c.save(); c.globalAlpha = Math.max(0, fade); c.translate(780, 130); c.scale(sc, sc); c.rotate(-0.05);
      const lbl = `${this.comboShow.n} れんぞく！`; c.font = `900 40px ${JP}`; const w = c.measureText(lbl).width + 110;
      c.fillStyle = '#e8590c'; c.beginPath(); c.roundRect(-w / 2, -32, w, 70, 35); c.fill(); c.fillStyle = '#ff9f1c'; c.beginPath(); c.roundRect(-w / 2, -38, w, 70, 35); c.fill();
      icon(c, 'bolt', -w / 2 + 44, -3, 46, { color: '#fff36b' }); text(c, lbl, 26, -2, { size: 40, color: '#fff', font: JP, weight: '900' });
      c.restore();
    }
    this.parts.draw(c);
    if (this.overlay) this.overlay(c);
  }
  drawBar(c) {
    const n = this.steps?.length || 1, target = Math.min(1, (this.stepNo + (this.stepFrac || 0)) / n);
    this.barFrac = (this.barFrac ?? 0) + (target - (this.barFrac ?? 0)) * 0.12;
    progress(c, 98, 26, 1000, 26, this.barFrac);
    if (this.stepNo >= n) { /* finished */ }
  }
  /** The monster reacts out loud: praise on a right answer, a gentle nudge on a wrong one. */
  react(ok) {
    const PRAISE = [['すごい！', 'Great!'], ['いいね！', 'Nice!'], ['せいかい！', 'Correct!'], ['やったね！', 'Yes!'], ['ばっちり！', 'Perfect!']];
    const NUDGE = [['おしい！ もういちど', 'Almost! Try again.'], ['だいじょうぶ！ もういちど', "It's okay. Try again."]];
    const [ja, en] = ok ? PRAISE[(this.praiseN = ((this.praiseN ?? -1) + 1)) % PRAISE.length] : NUDGE[(this.nudgeN = ((this.nudgeN ?? -1) + 1)) % NUDGE.length];
    this.fb = { ja, en, ok, until: this.t + (ok ? 1.3 : 1.8) };
    if (ok) { this.jump = 0; this.eng.tween(this, { jump: -34 }, 150, 'out').then(() => this.eng.tween(this, { jump: 0 }, 420, 'bounce')); }
  }

  // ------------------------------------------------------------------ flow
  async run() {
    const { app } = this;
    if (this.spec.kind === 'placement') return this.placement();
    for (let i = 0; i < this.steps.length; i++) {
      this.alive(); this.stepNo = i; this.reached = i; this.stepFrac = 0; const step = this.steps[i]; this.instr = step.type === 'meet' ? 'meet' : null;
      if (step.type === 'close') break;
      if (this.shouldStop()) break;
      this.ctx.now = Date.now();
      if (step.type === 'meet') { await this.meet(step); this.instr = null;
        const qs = stepQuestions(app.C, app.state, step, app.rng, this.ctx);   // "we do": hear it, find it, say it
        for (let k = 0; k < qs.length; k++) { this.alive(); this.stepFrac = (k + 1) / (qs.length + 1); if (this.shouldStop()) break; await this.ask(qs[k]); } }
      else if (step.type === 'story') await this.story(step);
      else if (step.type === 'concept') await this.concept(step);
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
    if (this.spec.kind === 'checkpoint') { if ((Date.now() - this.startedAt) / 60000 > 25) this.stopped = 'time'; return !!this.stopped; }
    if (last.length >= 6 && last.filter(r => !r).length >= 4) this.stopped = 'tired';
    else if ((Date.now() - this.startedAt) / 60000 > (this.app.state.settings.sessionMin || 12) + 3) this.stopped = 'time';
    return !!this.stopped;
  }
  sfx(n) { this.app.audio.sfx(n); }
  async speak(keys, opts) {
    const { app } = this; const list = [].concat(keys); this.speaking = true;
    const my = ++this.speakId || (this.speakId = 1);
    for (const [li, k] of list.entries()) {
      this.alive(); this.mouth = k.startsWith('gpc:') ? app.C.phonemes[app.C.gpcs[k.slice(4)]?.ph?.[0]]?.mouth || 'open' : null;
      this.talkIdx = li;
      await app.audio.play([k], opts); if (this.speakId !== my) return;
    }
    this.mouth = null; this.speaking = false; this.talkIdx = -1;
  }
  stopSpeak() { this.speakId = (this.speakId || 0) + 1; this.app.audio.stop(); this.mouth = null; this.speaking = false; }
  tapWait() { return new Promise(r => { this._tapWait = r; }); }

  // ------------------------------------------------------------------ record
  record(q, res) {
    const { app } = this; if (this.noRecord || this.demo) { if (this.noRecord) this.results.push(!!res.ok); return; }
    this.combo = res.ok ? (this.combo || 0) + 1 : 0;
    if ([3, 5, 8, 12, 16, 20].includes(this.combo)) { this.comboShow = { n: this.combo, at: this.t }; setTimeout(() => this.sfx('gem'), 250); this.parts.burst(780, 120, 30); } Q.applyResult(app.state, app.C, q, res, Date.now(), M.record); this.results.push(!!res.ok); app.save();
  }

  // ------------------------------------------------------------------ meet a new sound
  async meet(step) {
    const { app } = this, C = app.C, g = C.gpcs[step.gpc]; this.mood = 'happy';
    const bank = (g.bank || g.fbank || []).slice(0, 3); const pos = g.bank ? 'initial' : 'final';
    let heard = false, done = false;
    const cards = bank.map((b, i) => new Btn({ x: 400 + i * 250, y: 330, w: 230, h: 230, color: '#fff', shadow: false,
      customDraw: (c, u) => {
        const o = cardFace(c, 0, 0, u.w, u.h, 'idle', u.press);
        picText(c, b[1], u.w / 2, 92 + o, 100);
        drawSegments(c, segmentWord(b[0], gLabel(g), pos), u.w / 2, 186 + o, 52, '#ff5a3c', INK, u.w - 24);
      }, onTap: () => this.speak('b:' + b[0]) }));
    const big = new Btn({ x: 520, y: 80, w: 330, h: 230, color: '#fff', shadow: false,
      customDraw: (c, u) => {
        panel(c, 0, 0, u.w, u.h - 6, { r: 44, fill: '#fff6d6', border: '#ffd86b', lip: '#f1c24a' });
        text(c, gLabel(g), u.w / 2, u.h / 2 + 4, { size: gLabel(g).length > 1 ? 150 : 190, color: '#ff5a3c' });
      }, onTap: () => { heard = true; return this.speak('gpc:' + g.id); } });
    const spk = new Btn({ x: 880, y: 140, w: 110, h: 110, shadow: false, customDraw: (c, u) => speaker(c, 55, 55, 52, this.speaking, this.t), onTap: () => { heard = true; this.speak('gpc:' + g.id); } });
    const next = new Btn({ x: 1170, y: 474, w: 172, h: 96, icon: 'play', size: 54, color: '#5bd16f', onTap: () => { if (heard) done = true; } });
    this.ui = [big, spk, ...cards, next];
    this.promptDraw = c => {
      if (step.reteach) icon(c, 'replay', 1040, 130, 56, { color: '#ff9f4a', shadow: 3 });
      next.enabled = heard; next.pop = heard ? 1 + Math.sin(this.t * 6) * 0.04 : 1;
      if (!heard) icon(c, 'tap', 690, 296 + Math.sin(this.t * 5) * 7, 60, { color: '#ff9f4a', shadow: 3 });
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
    const { app } = this, t = app.C.tricky[id]; this.mood = 'happy'; this.instr = 'heart'; let done = false, heard = false;
    const word = new Btn({ x: 400, y: 120, w: 700, h: 210, shadow: false, customDraw: (c, u) => {
      panel(c, 0, 0, u.w, u.h - 6, { r: 40 });
      const letters = t.parts.flatMap(p => p.replace('*', '').split('').map(ch => ({ ch, heart: p.startsWith('*') })));
      c.font = `bold 130px ${FONT}`; const ws = letters.map(l => c.measureText(l.ch).width + 8); const tw = ws.reduce((a, b) => a + b, 0); let x = u.w / 2 - tw / 2;
      letters.forEach((l, i) => { text(c, l.ch, x + ws[i] / 2, 120, { size: 130, color: l.heart ? '#e8365d' : '#23394b' }); if (l.heart) icon(c, 'heart', x + ws[i] / 2, 36, 40, { color: '#ff5a78' }); x += ws[i]; });
    }, onTap: () => { heard = true; this.speak('w:' + id); } });
    const note = new Btn({ x: 400, y: 350, w: 700, h: 120, shadow: false, customDraw: (c, u) => {
      panel(c, 0, 0, u.w, u.h - 6, { r: 30 });
      text(c, t.noteJa, u.w / 2, 40, { size: 30, color: INK, font: JP, weight: '800' });
      text(c, t.noteEn, u.w / 2, 88, { size: 24, color: INK2, font: UIF, weight: '600' });
    }, onTap: () => { heard = true; this.speak('w:' + id); } });
    const next = new Btn({ x: 1170, y: 474, w: 172, h: 96, icon: 'play', size: 54, color: '#5bd16f', onTap: () => { done = true; } });
    this.ui = [word, note, next];
    this.promptDraw = null; this.speak('w:' + id);
    await new Promise(r => { const iv = setInterval(() => { if (done || this.dead) { clearInterval(iv); r(); } }, 60); });
    this.alive(); this.stopSpeak(); this.ui = []; this.mood = 'idle';
    M.getItem(app.state, M.keys.tricky(id), 'tricky').first ??= Date.now();
  }

  // ------------------------------------------------------------------ questions
  async ask(q) {
    this.mood = 'idle'; this.cur = q; this.instr = q.act; this.fb = null;
    // the first time a child meets an activity, the monster shows the answer ("watch me"); that try is not counted
    const seen = (this.app.state.seenActs ??= {});
    this.demo = !this.noRecord && !seen[q.act]; if (this.demo) seen[q.act] = 1;
    const r = (q.type === 'choice' || q.type === 'chain') ? await this.askChoice(q) : await this.askBuild(q);
    this.cur = null; this.bld = null; this.demo = false; return r;
  }
  /** Where the demo hand points: the right answer card, or the next right tile when building. */
  demoPoint() {
    if (!this.demo || !this.cur) return null;
    if (this.bld) { const { trayItems, slotItems } = this.bld; const e = slotItems.find(x => x.filled < 0); if (!e) return null;
      const t = trayItems.find(t => t.placed < 0 && t.label === e.label); return t ? { x: t.cx + t.w / 2, y: t.cy + 70 } : null; }
    const o = this.ui.find(u => u.idx === this.cur.answer && u.enabled !== false); if (!o || o.st === 'right') return null;
    return { x: o.x + o.w * 0.78, y: o.y + o.h * 0.72, label: { x: o.x + o.w / 2, y: o.y - 26 } };
  }
  drawDemo(c) {
    const p = this.demoPoint(); if (!p) return;
    const b = Math.abs(Math.sin(this.t * 4)) * 16;
    c.fillStyle = 'rgba(255,200,61,.35)'; c.beginPath(); c.arc(p.x, p.y - 20, 34 + b * 0.6, 0, 7); c.fill();
    icon(c, 'tap', p.x + 18, p.y + 16 + b, 66, { color: '#ff9f4a', shadow: 4 });
    const lbl = 'おてほん  Watch me!'; c.font = `900 20px ${JP}`; const w = c.measureText(lbl).width + 32;
    const L = p.label || { x: p.x + 18, y: p.y + 80 + b };
    c.fillStyle = '#ff9f4a'; c.beginPath(); c.roundRect(L.x - w / 2, L.y - 18, w, 36, 18); c.fill();
    text(c, lbl, L.x, L.y + 1, { size: 20, color: '#fff', font: JP, weight: '900' });
  }

  /** Draw the shared prompt area above the answers. */
  makePrompt(q, state) {
    const { app } = this, p = q.prompt || {};
    const replay = new Btn({ x: 500, y: 92, w: 100, h: 100, shadow: false, customDraw: (c, u) => speaker(c, 50, 50, 46, this.speaking, this.t), onTap: () => this.playPrompt(q), visible: !!(p.audio && p.audio.length) });
    const lit = i => this.speaking && this.talkIdx === i;
    this.promptDraw = c => {
      if (q.type === 'choice' || q.type === 'chain') {
        if (p.grapheme) {
          panel(c, 640, 70, 250, 215, { r: 40, fill: '#fff6d6', border: '#ffd86b', lip: '#f1c24a' });
          text(c, p.grapheme, 765, p.context ? 148 : 172, { size: p.grapheme.length > 1 ? 120 : 160, color: '#ff5a3c' });
          if (p.context) drawSegments(c, segmentWord(p.context, 's', 'final'), 765, 245, 54);
          // position cue: a word bar with the start / middle / end lit
          const fin = p.position === 'final', mid = p.position === 'inside';
          for (let i = 0; i < 4; i++) { const on = (mid ? (i === 1 || i === 2) : fin ? i === 3 : i === 0); c.fillStyle = on ? '#d8472b' : 'rgba(0,0,0,.12)'; c.beginPath(); c.roundRect(942 + i * 38, 168, 32, 32, 9); c.fill(); c.fillStyle = on ? '#ff6b4a' : '#fff'; c.beginPath(); c.roundRect(942 + i * 38, 164, 32, 32, 9); c.fill(); }
          text(c, mid ? 'なかの おと' : fin ? 'おわりの おと' : 'はじめの おと', 1032, 228, { size: 26, color: INK, font: JP, weight: '900', stroke: { w: 6, c: 'rgba(255,255,255,.9)' } });
        } else if (p.text) {
          panel(c, 600, 70, 380, 200, { r: 40 });
          { let sz = p.text.length > 4 ? 96 : 120; c.font = `bold ${sz}px ${FONT}`; const mw = c.measureText(p.text).width; if (mw > 340) sz = Math.floor(sz * 340 / mw);
            text(c, p.text, 790, 172, { size: sz, color: INK }); }
        } else if (p.talk) {
          // sound pips: one per sound, lit as each is spoken (by position, never by identity)
          const n = p.talk.length, x0 = 790 - ((n - 1) * 104) / 2;
          for (let i = 0; i < n; i++) { const on = lit(i) || state.revealed, x = x0 + i * 104;
            c.fillStyle = on ? '#dc9a10' : '#2386cc'; c.beginPath(); c.arc(x, 192, 46, 0, 7); c.fill(); c.fillStyle = on ? '#ffc83d' : '#42b4f5'; c.beginPath(); c.arc(x, 185, 46, 0, 7); c.fill();
            icon(c, 'speaker', x, 185, 46, { color: '#fff' }); }
          icon(c, 'listen', 790, 92, 56, { color: '#fff', shadow: 3 });
          if (p.pic && state.revealed) picText(c, p.pic, 1010, 170, 110);
        } else if (q.type === 'chain') {
          const tiles = q.start.map(l => ({ l, w: tileW(l, 70) })); const fill = state.filled;
          let x = 560; const total = tiles.reduce((s, t) => s + t.w + 14, 0) - 14; x = 790 - total / 2;
          tiles.forEach((t, i) => { const isPos = i === q.pos; const label = isPos ? (fill ? q.options[q.answer].label : '?') : t.l;
            drawTile(c, x, 92, t.w, 108, label, { size: 70, state: isPos ? (fill ? 'right' : 'ghost') : 'idle', hot: isPos && !fill }); x += t.w + 14; });
          if (p.pic) picText(c, p.pic, 1040, 146, 90);
        } else if (p.pic) {
          picText(c, p.pic, 790, 150, 130);
        } else if (p.oral && !p.pic && q.act !== 'same-different') {
          icon(c, 'listen', 790, 150, 120, { color: '#fff', shadow: 4 });
        } else if (p.monster) {
          // a silly made-up word: a mystery monster
          drawMonster(c, 790, 170, 130, { color: '#a97cf8', mood: 'think', t: this.t });
          text(c, '?', 880, 96, { size: 70, color: '#fff', font: UIF, weight: '900', stroke: { w: 10, c: '#7a50d0' } });
        } else if (p.oral && q.act === 'same-different') {
          // two numbered speakers, lit strictly by play ORDER so the picture never reveals whether the sounds match
          [0, 1].forEach(i => speaker(c, 690 + i * 200, 150, 58, lit(i), this.t));
          [0, 1].forEach(i => text(c, String(i + 1), 690 + i * 200, 232, { size: 34, color: INK, font: UIF, weight: '900', stroke: { w: 7, c: 'rgba(255,255,255,.9)' } }));
          text(c, '?', 790, 150, { size: 80, color: '#ff9f4a', font: UIF, weight: '900', stroke: { w: 10, c: '#fff' } });
        }
      }
    };
    return replay;
  }
  async playPrompt(q) {
    const p = q.prompt || {};
    if (p.talk) { await this.speak(p.talk, { gap: 0.18 }); return; }
    if (p.audio?.length) await this.speak(p.audio, { gap: p.gap ?? 0.12 });
    const nm = this.namingOpts;   // then say what each picture is, lighting it up, so no one has to guess the English names
    if (nm) for (const o of nm) { if (this.dead) return; o.glow = 1; await this.speak(['b:' + o.word]); o.glow = 0; }
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
    const naming = (q.act === 'initial-sound' || q.act === 'recall-flash') && q.options.every(o => o.word);
    const long = q.options.some(o => (o.label || '').length > 3);
    const cw = hasPic ? 230 : long ? 280 : 210, ch = hasPic ? 230 : 190, gap = 34, total = n * cw + (n - 1) * gap;
    const x0 = 790 - total / 2 + 60, y0 = hasPic ? 330 : 340;
    const state = { revealed: false, filled: false };
    let first = null, done = false, ready = false, tStart = 0;
    const opts = q.options.map((o, i) => new Btn({ x: x0 + i * (cw + gap), y: y0, w: cw, h: ch, shadow: false, idx: i, st: 'idle', shake: 0, glow: 0,
      customDraw: (c, u) => {
        const dx = Math.sin(u.shake * 40) * 10 * u.shake;
        c.translate(dx, 0);
        const off = cardFace(c, 0, 0, u.w, u.h, u.st === 'right' ? 'right' : u.st === 'wrong' ? 'wrong' : 'idle', u.press, u.glow > 0 && u.st !== 'right');
        const bodyH = u.h - 8;
        if (o.pic) {
          const ja = o.word && (app.C.words[o.word]?.ja || BANK_JA[o.word]);
          picText(c, o.pic, u.w / 2, off + (ja ? bodyH / 2 - 16 : bodyH / 2), ja ? 104 : 120);
          if (ja) text(c, ja, u.w / 2, off + bodyH - 34, { size: ja.length > 7 ? 22 : 28, color: INK2, font: JP, weight: '800' });
          if (naming && o.word) { c.fillStyle = '#2386cc'; c.beginPath(); c.arc(40, off + 42 + 3, 29, 0, 7); c.fill(); c.fillStyle = '#42b4f5'; c.beginPath(); c.arc(40, off + 42, 29, 0, 7); c.fill(); icon(c, 'speaker', 40, off + 42, 30, { color: '#fff' }); }
        }
        else if (o.icon === 'same' || o.icon === 'diff') {
          const same = o.icon === 'same', col = same ? PAL.Green : PAL.Red;
          c.fillStyle = col[1]; c.beginPath(); c.arc(u.w / 2, off + 66, 46, 0, 7); c.fill(); c.fillStyle = col[0]; c.beginPath(); c.arc(u.w / 2, off + 60, 46, 0, 7); c.fill();
          icon(c, same ? 'equal' : 'notequal', u.w / 2, off + 60, 50, { color: '#fff' });
          text(c, same ? 'おなじ' : 'ちがう', u.w / 2, off + bodyH - 56, { size: 34, color: INK, font: JP, weight: '900' }); text(c, same ? 'same' : 'different', u.w / 2, off + bodyH - 22, { size: 20, color: INK2, font: UIF, weight: '800' });
        }
        else if (o.label.includes('·')) {   // a word split into parts: each part in its own colour with a gap
          const ps = o.label.split('·'), COLS = ['#ff7a3c', '#2f8de0', '#3fae5a']; let sz = 70; c.font = `bold ${sz}px ${FONT}`;
          let tw = ps.reduce((a, p) => a + c.measureText(p).width, 0) + 26 * (ps.length - 1); if (tw > u.w - 36) { sz = Math.floor(sz * (u.w - 36) / tw); c.font = `bold ${sz}px ${FONT}`; tw = ps.reduce((a, p) => a + c.measureText(p).width, 0) + 26 * (ps.length - 1); }
          let x = u.w / 2 - tw / 2;
          ps.forEach((p, i) => { const pw = c.measureText(p).width; text(c, p, x + pw / 2, off + bodyH / 2 + 4, { size: sz, color: COLS[i % 3] }); x += pw;
            if (i < ps.length - 1) { c.fillStyle = '#c9d3dc'; c.beginPath(); c.roundRect(x + 11, off + bodyH / 2 - sz * 0.42, 4, sz * 0.84, 2); c.fill(); x += 26; } });
        }
        else { let sz = o.label.length > 3 ? 78 : o.label.length > 1 ? 100 : 120; c.font = `bold ${sz}px ${FONT}`; const mw = c.measureText(o.label).width; if (mw > u.w - 40) sz = Math.floor(sz * (u.w - 40) / mw); text(c, o.label, u.w / 2, off + bodyH / 2 + 4, { size: sz, color: INK }); }
        if (u.st === 'wrong') { c.fillStyle = '#ff6b6b'; c.beginPath(); c.arc(u.w - 30, 30, 20, 0, 7); c.fill(); icon(c, 'cross', u.w - 30, 30, 20, { color: '#fff' }); }
        if (u.st === 'right') { c.fillStyle = '#35b454'; c.beginPath(); c.arc(u.w - 30, 30, 20, 0, 7); c.fill(); icon(c, 'check', u.w - 30, 30, 20, { color: '#fff' }); }
      },
      onTap: async (u, px, py) => {
        if (naming && o.word && px - u.x < 76 && py - u.y < 80) { this.speak(['b:' + o.word]); return; }   // 🔊 badge: hear the picture's name without answering
        if (!ready || done || u.st === 'wrong') return;
        const ok = u.idx === q.answer;
        if (!first) { first = { ok, lat: performance.now() - tStart, lure: o.gpc }; this.record(q, first); }
        if (ok) {
          done = true; u.st = 'right'; this.sfx('good'); this.mood = 'happy'; this.react(true); state.revealed = true; state.filled = true;
          this.parts.burst(u.x + u.w / 2, u.y + u.h / 2, first.ok && first.lat != null ? 16 : 8);
          app.eng.tween(u, { pop: 1.09 }, 110, 'out').then(() => app.eng.tween(u, { pop: 1 }, 260, 'back'));
          this.stopSpeak();
          const after = q.prompt.after || (q.act === 'listen-pick' ? [] : []);
          const say = q.type === 'chain' ? ['w:' + q.to] : (after.length ? after : q.act === 'recall-flash' ? ['b:' + o.word] : []);
          if (say.length) await this.speak(say); else await app.eng.wait(450);
          await app.eng.wait(350);
          this.resolveAsk?.(first);
        } else {
          u.st = 'wrong'; this.sfx('bad'); this.mood = 'oops'; this.react(false); app.eng.tween(u, { shake: 1 }, 1, 'linear'); u.shake = 1; app.eng.tween(u, { shake: 0 }, 450, 'out');
          const right = opts[q.answer]; right.glow = 1;
          this.hintAudio(q); setTimeout(() => { if (!this.dead) this.mood = 'idle'; }, 900);
        }
      } }));
    this.namingOpts = naming ? q.options.map((o, i) => Object.assign(opts[i], { word: o.word })) : null;
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
    let size = sentence ? 44 : 78; const slotH = sentence ? 80 : 120;
    if (sentence) { const mw = sz => Math.max(...q.tray.map(t => tileW(t.label, sz))); while (size > 28 && q.slots.length * mw(size) + (q.slots.length - 1) * 14 > 960) size -= 2; }
    const labels = q.slots;
    if (!sentence) {
      // shrink tiles until slots + tray fit the 598px-high screen (whole-word tiles are wide)
      const fits = sz => {
        const sl = labels.map(l => ({ w: tileW(l, sz), x: 0, y: 0 })), tr = q.tray.map(t => ({ w: tileW(t.label, sz), x: 0, y: 0 }));
        const sH = flow(sl, 790, 200, 960, 14, slotH + 14);
        const tTop = Math.max(380, 245 + sH + 40);
        const tH = flow(tr, 790, tTop, 960, 16, slotH + 18);
        return tTop + tH <= 600;
      };
      while (size > 40 && !fits(size)) size -= 4;
    }
    const trayItems = q.tray.map((t, i) => ({ label: t.label, w: tileW(t.label, size), i, placed: -1, cx: 0, cy: 0, x: 0, y: 0, shake: 0, st: 'idle' }));
    const uniW = sentence ? Math.max(...trayItems.map(t => t.w)) : 0;
    const slotItems = labels.map((l, i) => ({ label: l, w: sentence ? uniW : tileW(l, size), i, filled: -1, st: 'idle' }));
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
        slotItems.forEach(s => { s.st = 'right'; trayItems[s.filled].st = 'right'; }); this.sfx('good'); this.mood = 'happy'; this.react(true);
        this.parts.burst(cx, 260, 18);
        await this.speak(sentence ? ['sent:' + q.text] : [q.act === 'heart-build' ? 'w:' + q.tricky : 'w:' + q.word]);
        await app.eng.wait(350); this.finishBuild(first); return;
      }
      this.sfx('bad'); this.mood = 'oops'; this.react(false);
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
    const replay = new Btn({ x: 500, y: 92, w: 100, h: 100, shadow: false, customDraw: (c, u) => speaker(c, 50, 50, 46, this.speaking, this.t), onTap: () => this.speak(q.prompt.audio, {}) });
    const hearts = q.hearts || [];
    this.promptDraw = c => {
      if (q.prompt.pic) picText(c, q.prompt.pic, 760, 150, 110);
      else if (!q.prompt.pic && !sentence) icon(c, 'listen', 700, 130, 64, { color: '#fff', shadow: 3 });
      slotItems.forEach((s, i) => {
        drawTile(c, s.x, s.y, s.w, slotH, '', { state: s.st === 'right' ? 'right' : s.st === 'wrong' ? 'wrong' : 'ghost', size });
        if (hearts[i]) icon(c, 'heart', s.x + s.w / 2, s.y - 14, 28, { color: '#ff5a78', shadow: 2 });
      });
      for (const t of trayItems) {
        const dx = Math.sin(t.shake * 40) * 8 * t.shake;
        drawTile(c, t.cx + dx, t.cy, t.w, slotH, t.label, { size, state: t.st === 'idle' ? 'idle' : t.st });
        // empty tray home outline
        if (t.placed >= 0) { c.fillStyle = 'rgba(40,80,120,.12)'; c.beginPath(); c.roundRect(t.x, t.y + 4, t.w, slotH - 6, 24); c.fill(); }
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
  /** Teaching screen for syllables / word parts: tap to step through a few example words. */
  async concept(step) {
    const { app } = this, C = app.C, unit = this.spec.unit; this.mood = 'happy'; this.instr = step.kind;
    const pool = C.wordList.filter(w => w.u === unit && (step.kind === 'syl' ? w.syl && w.syl.length > 1 : w.morph && w.morph.length === 2 && w.morph.join('') === w.t.toLowerCase()));
    const words = app.rng.shuffle(pool.slice()).slice(0, step.n); if (!words.length) return;
    const COL = ['#ff8a5c', '#4aa3e8', '#58c46a', '#a478e8'];
    let wi = 0, phase = 0, done = false, anim = 0;   // phase 0 whole word, 1 split, 2 (syl) clap / (morph) joined
    const parts = w => {
      if (step.kind === 'morph') return w.morph;
      const letters = w.g.map(g => C.gpcs[g].g); let k = 0; return w.syl.map(n => { const part = letters.slice(k, k + n).join(''); k += n; return part; });
    };
    const next = new Btn({ x: 1170, y: 474, w: 172, h: 96, icon: 'play', size: 54, color: '#5bd16f', onTap: async () => {
      if (step.kind === 'syl') { if (phase < 2) { phase++; anim = 0; app.eng.tween(this, { _a: 1 }, 1, 'linear'); if (phase === 2) this.speak('w:' + words[wi].id); } else if (++wi >= words.length) done = true; else { phase = 0; this.speak('w:' + words[wi].id); } }
      else { if (phase < 2) { phase++; if (phase === 2) this.speak('w:' + words[wi].id); } else if (++wi >= words.length) done = true; else { phase = 0; this.speak('w:' + words[wi].id); } }
    } });
    const hear = new Btn({ x: 350, y: 85, w: 100, h: 100, shadow: false, customDraw: (c) => speaker(c, 50, 50, 46, this.speaking, this.t), onTap: () => this.speak('w:' + words[wi].id) });
    this.ui = [hear, next];
    this.promptDraw = c => {
      const w = words[Math.min(wi, words.length - 1)], ps = phase === 0 ? [w.t] : parts(w), size = 84;
      panel(c, 330, 70, 860, 400);
      text(c, step.kind === 'syl' ? 'おとの かたまり（シラブル）' : 'ことばの パーツ', 760, 110, { size: 30, color: INK, font: JP, weight: '900' });
      if (w.pic) picText(c, w.pic, 960, 190, 90);
      c.font = `bold ${size}px ${FONT}`;
      const gap = phase === 0 ? 0 : 36, ws = ps.map(p => c.measureText(p).width + 36), plus = step.kind === 'morph' && phase === 1 ? 40 : 0;
      const tw = ws.reduce((a, b) => a + b, 0) + gap * (ps.length - 1) + plus * (ps.length - 1); let x = 760 - tw / 2;
      ps.forEach((p, i) => {
        const lift = phase === 2 && step.kind === 'syl' ? -Math.abs(Math.sin(this.t * 5 + i * 1.6)) * 14 : 0;
        const fam = phase === 0 ? null : faceOfCol(COL[i % COL.length]);
        cardFace(c, x, 250 + lift, ws[i], 138, 'idle', 0, false); if (fam) { c.fillStyle = fam + '22'; c.beginPath(); c.roundRect(x, 250 + lift, ws[i], 130, 28); c.fill(); }
        text(c, p, x + ws[i] / 2, 316 + lift, { size, color: phase === 0 ? INK : COL[i % COL.length] });
        x += ws[i] + gap; if (i < ps.length - 1 && plus) { text(c, '+', x - gap / 2 + plus / 2 - 4, 318, { size: 56, color: '#23394b' }); x += plus; }
      });
      if (step.kind === 'syl' && phase >= 1) text(c, ps.map((_, i) => '👏').join(' ') + '  ' + ps.length, 760, 430, { size: 44 });
      if (step.kind === 'morph' && phase === 2) text(c, w.morph.join(' + ') + ' = ' + w.t, 760, 430, { size: 44, color: '#23394b' });
      if (phase === 0) icon(c, 'tap', 1110, 430 + Math.sin(this.t * 5) * 6, 52, { color: '#ff9f4a', shadow: 3 });
    };
    this.speak('w:' + words[0].id);
    await new Promise(r => { const iv = setInterval(() => { if (done || this.dead) { clearInterval(iv); r(); } }, 60); });
    this.alive(); this.stopSpeak(); this.sfx('pop'); this.promptDraw = null; this.ui = []; this.mood = 'idle';
  }

  async story(step) {
    const { app } = this, C = app.C, st = C.stories[step.story], read = step.read;
    this.mood = 'happy';
    const { helped, total } = await readStory(this, st, read, f => { this.stepFrac = f * (read === 3 ? 0.8 : 1); });
    this.storiesRead = (this.storiesRead || 0) + 1;
    this.mood = 'idle'; this.promptDraw = null; this.ui = [];
    if (read === 1) {
      const acc = Math.max(0, 1 - helped / Math.max(1, total));
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
  /** Every question about the story, one after another; the reading counts as understood if most are right first time. */
  async storyQuestion(st) {
    const qs = (st.questions || []).slice(0, 3); if (!qs.length) return true;
    let ok = 0; for (const q of qs) if (await this.storyQ(q)) ok++;
    return ok >= Math.ceil(qs.length / 2);
  }
  async storyQ(q) {
    this.instr = 'storyq';
    const { app } = this; const opts = this.app.rng.shuffle([{ pic: q.answer[0], word: q.answer[1], ok: true }, ...q.distractors.map(d => ({ pic: d[0], word: d[1] }))]);
    let first = null, done = false;
    this.cur = { type: 'choice', act: 'story-q', answer: opts.findIndex(o => o.ok) };
    const btns = opts.map((o, i) => new Btn({ x: 520 + i * 270, y: 320, w: 240, h: 230, shadow: false, st: 'idle', idx: i,
      customDraw: (c, u) => { const off = cardFace(c, 0, 0, u.w, u.h, u.st === 'right' ? 'right' : u.st === 'wrong' ? 'wrong' : 'idle', u.press); const ja = o.word && (app.C.words[o.word]?.ja || BANK_JA[o.word]); picText(c, o.pic, u.w / 2, off + (ja ? 92 : (u.h - 8) / 2), ja ? 104 : 120); if (ja) text(c, ja, u.w / 2, off + u.h - 44, { size: ja.length > 7 ? 22 : 28, color: INK2, font: JP, weight: '800' }); },
      onTap: async u => { if (done || u.st === 'wrong') return; if (first === null) first = !!o.ok;
        if (o.ok) { done = true; u.st = 'right'; this.sfx('good'); this.mood = 'happy'; this.react(true); this.parts.burst(u.x + 120, u.y + 100, 20); await app.eng.wait(700); } else { u.st = 'wrong'; this.sfx('bad'); this.react(false); } } }));
    this.ui = btns;
    this.promptDraw = c => { panel(c, 380, 70, 940, 200, { r: 40 }); drawSegments(c, [{ s: q.q, hot: false }], 880, 170, q.q.length > 22 ? 48 : 60, '#ff5a3c', INK, 840); icon(c, 'listen', 440, 120, 50, { color: '#42b4f5' }); };
    this.speak(['sent:' + q.q]);
    await new Promise(r => { const iv = setInterval(() => { if (done || this.dead) { clearInterval(iv); r(); } }, 60); });
    this.alive(); this.ui = []; this.promptDraw = null; this.mood = 'idle'; this.cur = null;
    return first === true;
  }

  // ------------------------------------------------------------------ placement check
  /** Read-a-word-tap-its-picture probes at rising levels; 3 right in a row passes a level, the first miss stops.
   *  The child starts at the unit after the last level passed (earlier units are marked as skipped). */
  async placement() {
    const { app } = this, C = app.C, LEVELS = [3, 6, 10, 14, 18, 22, 24, 27, 31];
    this.noRecord = true; this.steps = LEVELS.map(() => ({ type: 'probe' })); let passed = 0;
    for (let i = 0; i < LEVELS.length; i++) {
      this.alive(); this.stepNo = i; this.stepFrac = 0; const u = LEVELS[i], prev = LEVELS[i - 1] ?? 0;
      const pool = app.rng.shuffle(C.wordsAt(u, { names: false, functionWords: false }).filter(w => w.pic && w.u > prev));
      let ok = 0, asked = 0;
      for (const w of pool) {
        if (asked >= 3) break; const q = Q.readMatchPicture(C, w.id, u, app.rng); if (!q) continue;
        asked++; const r = await this.ask(q); this.stepFrac = asked / 3; if (r?.ok) ok++; else break;
      }
      if (ok < 3) break; passed = u;
    }
    this.stepNo = this.steps.length;
    const start = passed ? passed + 1 : 0, st = app.state;
    for (let u = 0; u < start; u++) M.skipUnit(st, u);
    st.placed = { at: Date.now(), start }; await app.save(true);
    this.alive(); this.ui = []; this.mood = 'happy'; this.instr = null; this.sfx('win'); this.parts.burst(780, 180, 40);
    const info = unitInfo(start), au = C.unitById[start];
    this.promptDraw = c => {
      panel(c, 400, 60, 760, 390);
      text(c, start ? 'よく よめたね！' : 'いっしょに はじめよう！', 780, 112, { size: 46, color: INK, font: JP, weight: '900' });
      text(c, start ? `ユニット ${start} から スタート！` : 'さいしょから スタート！', 780, 178, { size: 32, color: '#ff7a3c', font: JP, weight: '900' });
      if (au) { text(c, info.ja, 780, 250, { size: 30, color: INK, font: JP, weight: '900' }); text(c, info.en, 780, 288, { size: 20, color: INK2, font: UIF, weight: '800' });
        if (info.ex) text(c, info.ex, 780, 360, { size: 64, color: '#42b4f5' }); }
    };
    this.ui = [new Btn({ x: 530, y: 470, w: 500, h: 100, label: '▶ はじめる  Start', size: 38, font: JP, color: '#58c46a', onTap: () => { this.dead = true; app.goHome(); } })];
  }

  // ------------------------------------------------------------------ finish
  async finish() {
    const { app } = this, C = app.C;
    // a lesson cut short by the clock still counts if most of it was done (otherwise the child redoes it)
    const complete = !this.stopped || (this.stopped === 'time' && (this.reached ?? 0) / Math.max(1, this.steps.length) >= 0.6);
    if (complete) this.stopped = null;
    const isCp = this.spec.kind === 'checkpoint'; let cpRes = null;
    if (isCp && complete) {
      const n = this.results.length, ok = this.results.filter(Boolean).length, cps = (app.state.checkpoints ??= {}), prev = cps[this.spec.cp];
      cpRes = { ok, n, pct: n ? Math.round(100 * ok / n) : 0, at: Date.now() };
      cps[this.spec.cp] = { ...cpRes, best: Math.max(prev?.best ?? 0, cpRes.pct), tries: (prev?.tries ?? 0) + 1 };
    } else if (complete) M.completeLesson(C, app.state, this.spec, Date.now());
    app.state.stats.secondsPlayed += Math.round((Date.now() - this.startedAt) / 1000);
    const gems = Object.values(app.state.items).filter(i => i.kind === 'gpc' && i.rung >= M.K.mastered && (this.rungsBefore[i.id] ?? 0) < M.K.mastered).map(i => C.gpcs[i.id.slice(4)] ? gLabel(C.gpcs[i.id.slice(4)]) : i.id.slice(4));
    const unitDone = complete && app.state.units[this.spec.unit]?.passed && !this.unitWasPassed;
    // rewards: a sticker for every finished lesson, three more and a new hat for a finished unit
    let sticker = null, celebrate = null;
    if (complete && !isCp) {
      sticker = awardSticker(app.state, app.rng); markDay(app.state);
      if (unitDone) {
        const stg = (C.course?.stages || []).find(sg => sg.units.includes(this.spec.unit));
        const stageDone = stg && stg.units.filter(u => C.unitById[u]).every(u => M.isUnitPassed(app.state, u));
        const hat = hatsUnlocked(app.state) > this.hatsBefore ? HAT_LIST[hatsUnlocked(app.state)] : null;
        celebrate = { unit: this.spec.unit, stage: stageDone ? stg.id : null, hat, stickers: [awardSticker(app.state, app.rng), awardSticker(app.state, app.rng), awardSticker(app.state, app.rng)] };
      }
    }
    this.sticker = sticker ? { s: sticker, k: 0 } : null;
    await app.save(true);
    this.alive(); this.ui = []; this.promptDraw = null; this.mood = 'happy';
    let pos = 0; const gemObjs = gems.slice(0, 4).map((g, i) => ({ g, y: -80, x: 1060, ty: 130 + i * 76, s: 0 }));
    this.overlay = null;
    const goLesson = nx => { this.dead = true; const sp = nx.kind === 'practice' ? practiceSpec(nx.unit) : C.lessons[nx.lessonId]; app.eng.go(new LessonScene(app, sp)); };
    const nxt = (complete && !this.stopped && !isCp) ? M.nextLesson(C, app.state) : (isCp ? M.nextLesson(C, app.state) : null);
    const au = C.units.find(u => u.id === this.spec.unit), us = app.state.units[this.spec.unit] || {};
    const total = au?.lessons.length || 0, doneN = au ? au.lessons.filter(l => us.lessonsDone?.[l.id]).length : 0;
    const newSounds = (this.spec.newGpcs || []).map(g => C.gpcs[g]).filter(Boolean).map(g => gLabel(g)).slice(0, 6);
    const homeBtn = new Btn({ x: 400, y: 470, w: 170, h: 100, icon: 'home', label: 'ホーム', size: 26, color: '#ff9f4a', font: JP, onTap: () => { this.dead = true; app.goHome(); } });
    const nextBtn = nxt && new Btn({ x: 600, y: 470, w: 560, h: 100, label: '▶ つぎの レッスン  Next lesson', size: 36, font: JP, color: '#58c46a', onTap: () => goLesson(nxt) });
    this.ui = nextBtn ? [homeBtn, nextBtn] : [new Btn({ x: 480, y: 470, w: 600, h: 100, label: '▶ ホームへ  Home', size: 38, font: JP, color: '#58c46a', onTap: () => { this.dead = true; app.goHome(); } })];
    if (celebrate) this.ui = [new Btn({ x: 480, y: 470, w: 600, h: 100, label: '🎉 おいわい！  ホーム', size: 36, font: JP, color: '#ff9f4a', onTap: () => { this.dead = true; app.eng.go(new CelebrateScene(app, celebrate)); } })];
    this.promptDraw = c => {
      panel(c, 400, 60, 760, 390);
      const msg = this.stopped === 'tired' ? 'すこし やすもう 😴' : this.stopped === 'time' ? 'きょうは ここまで！ 🌙' : 'できたね！ 🎉';
      text(c, msg, 780, 105, { size: 50, color: '#23394b', font: JP });
      const n = this.results.length, ok = this.results.filter(Boolean).length, sr = this.storiesRead || 0;
      const nStars = isCp ? Math.max(1, Math.round((cpRes?.pct ?? 0) / 34)) : n ? Math.max(1, Math.round((ok / n) * 3)) : 3;
      starRow(c, 780, 185, nStars, 3, 80, (this.t - (this.finT ?? (this.finT = this.t))) * 2.2);
      const parts = [];
      if (cpRes) parts.push(`${cpRes.ok} / ${cpRes.n} せいかい`); else if (n) parts.push(`${ok} / ${n} せいかい`);
      if (sr) parts.push(`えほん ${sr}かい よんだ`);
      text(c, parts.join('  ·  '), 780, 250, { size: 28, color: INK, font: JP, weight: '900' });
      if (au && !isCp) {
        const ui = unitInfo(au.id);
        text(c, `Unit ${au.id}  ${ui.ja}`, 780, 296, { size: 22, color: INK2, font: JP, weight: '900' });
        if (this.spec.kind === 'practice' && !unitDone) {
          // gold = secure. All gold unlocks the next unit: this is why practice lessons happen
          const gs = au.newGpcs.map(g => C.gpcs[g]).filter(g => g && !['suffix', 'silent'].includes(g.type)).slice(0, 8), tw = 58;
          gs.forEach((g, i) => { const got = (app.state.items['gpc:' + g.id]?.rung || 0) >= M.K.mastered, tx = 780 + (i - (gs.length - 1) / 2) * (tw + 10) - tw / 2;
            slab(c, tx, 314, tw, 50, { r: 12, face: got ? '#ffd24a' : '#eef3f8', lip: got ? '#e8a915' : '#c9d4df', depth: 5 });
            text(c, gLabel(g), tx + tw / 2, 336, { size: gLabel(g).length > 2 ? 18 : 26, color: got ? '#7a5200' : INK2 }); });
          const left = gs.filter(g => (app.state.items['gpc:' + g.id]?.rung || 0) < M.K.mastered).length;
          text(c, left ? `あと ${left}こ きんいろに なったら つぎの ユニット！` : 'もうすぐ つぎの ユニット！', 780, 398, { size: 22, color: '#b36b00', font: JP, weight: '900' });
        } else {
          for (let k = 0; k < total; k++) { c.fillStyle = k < doneN ? '#58c46a' : '#d5dde4'; c.beginPath(); c.arc(780 + (k - (total - 1) / 2) * 34, 330, 11, 0, 7); c.fill(); }
          if (unitDone) { const nu = C.unitById[au.id + 1]; text(c, '🎊 ユニット クリア！ Unit complete!', 780, 378, { size: 30, color: '#b36b00', font: JP, weight: '900' });
            if (nu) text(c, `つぎは：${unitInfo(nu.id).ja}`, 780, 418, { size: 22, color: INK2, font: JP, weight: '900' }); }
          else if (newSounds.length) text(c, 'きょうの おと： ' + newSounds.join('  '), 780, 378, { size: 28, color: '#2d4a5e', font: JP, weight: '900' });
          else text(c, `あと ${Math.max(0, total - doneN)} レッスンで ユニット クリア`, 780, 378, { size: 22, color: INK2, font: JP, weight: '900' });
        }
      }
      if (this.sticker) { const k = this.sticker.k; c.save(); c.translate(500, 150); c.scale(k, k); c.rotate(-0.12);
        c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, 50, 0, 7); c.fill(); c.strokeStyle = '#ffd24a'; c.lineWidth = 6; c.stroke();
        text(c, this.sticker.s, 0, 3, { size: 56, font: FONT }); c.restore();
        if (k > 0.9) text(c, 'シール ゲット！', 500, 218, { size: 18, color: '#b36b00', font: JP, weight: '900' }); }
      gemObjs.forEach(o => { c.save(); c.translate(o.x + 40, o.y); c.scale(o.s * 0.5, o.s * 0.5); c.fillStyle = '#7be0ad'; c.beginPath(); c.moveTo(0, -60); c.lineTo(55, -15); c.lineTo(35, 55); c.lineTo(-35, 55); c.lineTo(-55, -15); c.closePath(); c.fill(); c.lineWidth = 6; c.strokeStyle = '#fff'; c.stroke(); text(c, o.g, 0, 0, { size: o.g.length > 1 ? 52 : 68, color: '#175d3b' }); c.restore(); });
    };
    this.sfx('win'); this.parts.burst(780, 200, 40);
    if (this.sticker) app.eng.tween(this.sticker, { k: 1 }, 600, 'back', 700).then(() => { this.sfx('gem'); this.parts.burst(500, 150, 16); });
    for (const o of gemObjs) { this.sfx('gem'); await Promise.all([app.eng.tween(o, { y: o.ty, s: 1 }, 600, 'back'), app.eng.wait(250)]); this.parts.burst(o.x + 40, o.ty, 14); }
  }
}
