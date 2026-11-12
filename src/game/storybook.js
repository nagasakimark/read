// Storybook reader: a real two-page book. Cover -> spreads (picture on the left, words on the right) -> "The End".
// Pages turn with a paper-flip animation. Three readings of each story (blueprint "repeated reading"):
//   read 1  じぶんで よむ     the child reads; tapping a word says it (counted as help)
//   read 2  いっしょに よむ   read-along: the narrator reads each page, words light up as they are spoken
//   read 3  よんで こたえる   read again, then answer a question about the story
import { W, H, FONT, JP, UIF, text, Btn } from './engine.js';
import { icon, INK, INK2 } from './sprites.js';
import { picText, speaker } from './ui.js';
import { tokenize } from '../learn/curriculum.js';

const BX = 330, BY = 74, PW = 500, PH = 436, SPINE = BX + PW;           // book geometry (stage px)
const PAPER = '#fffaf0', PAPER2 = '#f6ecd6';
const COVERS = { animals: ['#3fa36b', '#2b7a4f'], food: ['#f08a3c', '#c4621b'], family: ['#e5658a', '#b7426a'], school: ['#4a8fe0', '#2e66b0'],
  play: ['#a978e8', '#7b4fc0'], nature: ['#47b0a5', '#2c8279'], home: ['#e6a03c', '#b9771a'], default: ['#4a8fe0', '#2e66b0'] };
const SKIES = [['#bfe6ff', '#e9f7ff', '#9ed98c'], ['#ffe2b8', '#fff4e2', '#b4dd88'], ['#d8d4ff', '#f1efff', '#a6dca0'], ['#c6f0ea', '#effcf9', '#9fd7a0']];
export const MODES = {
  1: { ja: 'じぶんで よむ', en: 'Read it yourself', ic: 'book', col: '#42b4f5', tip: ['じぶんで よんでね。わからない ことばは タップ！', 'Read it yourself. Tap a word to hear it.'] },
  2: { ja: 'いっしょに よむ', en: 'Read along', ic: 'listen', col: '#58c46a', tip: ['きいて、いっしょに よもう！', 'Listen and read along!'] },
  3: { ja: 'よんで こたえる', en: 'Read and answer', ic: 'help', col: '#ff9f4a', tip: ['もういちど よもう。あとで クイズ！', 'Read it again. Then a quiz!'] },
};

function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

/** Runs one reading of a story inside a LessonScene. Returns { helped, total }. */
export async function readStory(scene, st, read, onPage) {
  const app = scene.app, eng = app.eng, mode = MODES[read] || MODES[1];
  const pages = st.pages, toks = pages.map(p => tokenize(p.text));
  const k = Math.min(3, (eng.dpr || 1) * (eng.scale || 1));
  const cols = COVERS[st.topic] || COVERS.default;
  const helped = new Set(); let total = 0;
  const B = { open: 0, page: -1, flip: null, hl: -1, words: [], ending: false };  // page -1 = cover
  scene.book = B; scene.instr = null; scene.bookTip = mode.tip;

  // ---- word layout for page i (right page), sized to fit
  const layout = i => {
    const tk = toks[i]; const m = document.createElement('canvas').getContext('2d');
    let sz = 60, rows;
    for (; sz >= 34; sz -= 4) {
      m.font = `bold ${sz}px ${FONT}`; const items = tk.map((t, j) => ({ t, j, w: m.measureText(t.raw).width + sz * 0.34 }));
      rows = []; let row = [], rw = 0; const maxW = PW - 90;
      for (const it of items) { if (row.length && rw + it.w > maxW) { rows.push(row); row = []; rw = 0; } row.push(it); rw += it.w; }
      if (row.length) rows.push(row);
      if (rows.length * sz * 1.55 <= PH - 150) break;
    }
    const lh = sz * 1.55, top = BY + (PH - rows.length * lh) / 2 - 6, out = [];
    rows.forEach((r, ri) => { const tw = r.reduce((s, it) => s + it.w, 0); let x = SPINE + PW / 2 - tw / 2;
      r.forEach(it => { out.push({ ...it, x, y: top + ri * lh, h: lh, sz }); x += it.w; }); });
    return out;
  };

  // ---- faces (offscreen, cached): what is printed on each side of a sheet
  const cache = new Map();
  const face = (key, draw) => {
    if (cache.has(key)) return cache.get(key);
    const cv = document.createElement('canvas'); cv.width = Math.round(PW * k); cv.height = Math.round(PH * k);
    const c = cv.getContext('2d'); c.scale(k, k); draw(c); cache.set(key, cv); return cv;
  };
  const paper = (c, left) => {
    const g = c.createLinearGradient(left ? PW : 0, 0, left ? 0 : PW, 0);
    g.addColorStop(0, PAPER2); g.addColorStop(0.08, PAPER); g.addColorStop(1, PAPER);
    c.fillStyle = g; c.beginPath(); c.roundRect(0, 0, PW, PH, left ? [18, 0, 0, 18] : [0, 18, 18, 0]); c.fill();
  };
  const pageNo = (c, n, left) => text(c, String(n), PW / 2, PH - 22, { size: 18, color: '#b8a888', font: UIF, weight: '800' });
  const picFace = i => face('L' + i, c => {
    paper(c, true);
    const [s1, s2, gr] = SKIES[(i + st.id.length) % SKIES.length];
    const x = 34, y = 34, w = PW - 60, h = PH - 96;
    c.save(); c.beginPath(); c.roundRect(x, y, w, h, 26); c.clip();
    const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, s1); g.addColorStop(1, s2); c.fillStyle = g; c.fillRect(x, y, w, h);
    c.fillStyle = 'rgba(255,255,255,.75)'; for (const [cx, cy, r] of [[x + 70, y + 60, 22], [x + 96, y + 52, 28], [x + 124, y + 62, 20], [x + w - 110, y + 90, 18], [x + w - 88, y + 82, 24]]) { c.beginPath(); c.arc(cx, cy, r, 0, 7); c.fill(); }
    c.fillStyle = gr; c.beginPath(); c.ellipse(x + w / 2, y + h + 30, w * 0.8, 110, 0, 0, 7); c.fill();
    c.fillStyle = 'rgba(0,0,0,.08)'; c.beginPath(); c.ellipse(x + w / 2, y + h - 52, 150, 18, 0, 0, 7); c.fill();
    c.restore();
    c.strokeStyle = 'rgba(160,130,80,.25)'; c.lineWidth = 3; c.beginPath(); c.roundRect(x, y, w, h, 26); c.stroke();
    const p = pages[i].pic || '', n = [...p].filter(ch => ch.codePointAt(0) > 0x2000 && ch !== '‍' && ch !== '️').length;
    picText(c, p, x + w / 2, y + h / 2 + 6, n > 2 ? 110 : n > 1 ? 140 : 170);
    pageNo(c, i * 2 + 1, true);
  });
  const wordsFace = i => face('R' + i, c => {
    paper(c, false); pageNo(c, i * 2 + 2, false);
    c.save(); c.translate(-SPINE, -BY);
    for (const it of layout(i)) text(c, it.t.raw, it.x + it.w / 2, it.y + it.h / 2, { size: it.sz, color: INK });
    c.restore();
  });
  const coverFace = () => face('cover', c => {
    const g = c.createLinearGradient(0, 0, PW, PH); g.addColorStop(0, cols[0]); g.addColorStop(1, cols[1]);
    c.fillStyle = g; c.beginPath(); c.roundRect(0, 0, PW, PH, [6, 22, 22, 6]); c.fill();
    c.fillStyle = 'rgba(0,0,0,.14)'; c.fillRect(0, 0, 18, PH);
    c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineWidth = 4; c.setLineDash([2, 12]); c.lineCap = 'round'; c.beginPath(); c.roundRect(34, 22, PW - 56, PH - 44, 18); c.stroke(); c.setLineDash([]);
    c.fillStyle = 'rgba(255,255,255,.95)'; c.beginPath(); c.arc(PW / 2 + 9, 190, 112, 0, 7); c.fill();
    picText(c, pages[0].pic, PW / 2 + 9, 194, [...pages[0].pic].length > 3 ? 104 : 130);
    c.font = `bold 52px ${FONT}`; let fs = 52; while (c.measureText(st.title).width > PW - 90 && fs > 30) { fs -= 2; c.font = `bold ${fs}px ${FONT}`; }
    text(c, st.title, PW / 2 + 9, 352, { size: fs, color: '#fff', stroke: { w: 10, c: 'rgba(0,0,0,.18)' } });
    text(c, st.title, PW / 2 + 9, 352, { size: fs, color: '#fff' });
  });
  const endFace = () => face('end', c => {
    paper(c, true);
    text(c, 'おしまい', PW / 2, 150, { size: 64, color: '#ff7a3c', font: JP, weight: '900' });
    text(c, 'The End', PW / 2, 222, { size: 44, color: INK2, font: FONT });
    for (let i = 0; i < 3; i++) icon(c, 'star', PW / 2 + (i - 1) * 84, 316 - (i === 1 ? 18 : 0), i === 1 ? 74 : 60, { color: '#ffc83d', shadow: 4 });
  });
  const blankFace = left => face('blank' + left, c => { paper(c, left); c.fillStyle = cols[0]; c.globalAlpha = 0.08; for (let y = 30; y < PH; y += 46) for (let x = (y / 46) % 2 ? 30 : 54; x < PW; x += 48) { c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); } });

  const leftOf = p => (p < 0 ? null : p >= pages.length ? endFace() : picFace(p));
  const rightOf = p => (p < 0 ? coverFace() : p >= pages.length ? blankFace(false) : wordsFace(p));

  // ---- drawing
  const drawFace = (c, cv, x, y, w = PW, h = PH) => c.drawImage(cv, x, y, w, h);
  const boards = (c, open) => {
    c.fillStyle = 'rgba(40,30,20,.16)'; c.beginPath(); c.roundRect((open ? BX : SPINE) - 8, BY + 14, (open ? PW * 2 : PW) + 22, PH + 12, 24); c.fill();
    c.fillStyle = cols[1];
    if (open) { c.beginPath(); c.roundRect(BX - 12, BY - 8, PW * 2 + 24, PH + 22, 24); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,.5)'; if (open) { c.fillRect(BX - 4, BY + PH + 2, PW * 2 + 8, 4); }
  };
  const spineShade = c => {
    const g = c.createLinearGradient(SPINE - 40, 0, SPINE + 40, 0);
    g.addColorStop(0, 'rgba(120,90,40,0)'); g.addColorStop(0.45, 'rgba(120,90,40,.22)'); g.addColorStop(0.5, 'rgba(90,60,20,.35)'); g.addColorStop(0.55, 'rgba(120,90,40,.22)'); g.addColorStop(1, 'rgba(120,90,40,0)');
    c.fillStyle = g; c.fillRect(SPINE - 40, BY, 80, PH);
  };
  const liveWords = c => {   // the right page drawn live, so the word being read or tapped can light up
    if (B.page < 0 || B.page >= pages.length || B.flip) return;
    for (const it of B.words) {
      const on = B.hl === it.j, h = helped.has(B.page + ':' + it.j);
      if (!on && !h && !it.press) continue;
      c.fillStyle = PAPER; c.fillRect(it.x - 2, it.y + 4, it.w + 4, it.h - 8);
      if (on || h) { c.fillStyle = on ? '#ffe27a' : 'rgba(255,214,102,.4)'; c.beginPath(); c.roundRect(it.x + 2, it.y + it.h * 0.14, it.w - 4, it.h * 0.72, 16); c.fill(); }
      text(c, it.t.raw, it.x + it.w / 2, it.y + it.h / 2 + (on ? -2 : 0), { size: it.sz * (on ? 1.06 : 1), color: on ? '#c2410c' : INK });
    }
  };
  scene.bookDraw = c => {
    const f = B.flip, open = B.page >= 0 || (f && f.to >= 0);
    boards(c, open);
    if (!open) { drawFace(c, coverFace(), SPINE, BY); return; }
    // static halves
    const L = f ? (f.dir > 0 ? leftOf(f.from) : leftOf(f.to)) : leftOf(B.page);
    const R = f ? (f.dir > 0 ? rightOf(f.to) : rightOf(f.from)) : rightOf(B.page);
    if (L) drawFace(c, L, BX, BY); else { c.fillStyle = cols[1]; c.beginPath(); c.roundRect(BX, BY, PW, PH, 18); c.fill(); }
    drawFace(c, R, SPINE, BY);
    spineShade(c);
    liveWords(c);
    if (f) {   // the turning sheet: front shrinks into the spine, then its back grows out on the other side
      const p = easeInOut(f.p), ang = p * Math.PI, cw = Math.abs(Math.cos(ang)) * PW, lift = Math.sin(ang);
      const onRight = f.dir > 0 ? p < 0.5 : p >= 0.5;
      const cv = f.dir > 0 ? (p < 0.5 ? rightOf(f.from) : leftOf(f.to)) : (p < 0.5 ? leftOf(f.from) : rightOf(f.to));
      const x = onRight ? SPINE : SPINE - cw, y = BY - lift * 14, h = PH + lift * 28;
      c.save();
      c.fillStyle = 'rgba(40,30,20,.18)'; c.beginPath(); c.roundRect(onRight ? SPINE : SPINE - cw - 16 * lift, BY + 10, cw + 16 * lift, PH, 18); c.fill();
      if (cv) drawFace(c, cv, x, y, Math.max(1, cw), h); else { c.fillStyle = cols[0]; c.fillRect(x, y, cw, h); }
      const g = c.createLinearGradient(x, 0, x + cw, 0), dark = 0.28 * lift;
      if (onRight) { g.addColorStop(0, `rgba(80,55,20,${dark})`); g.addColorStop(1, 'rgba(255,255,255,0)'); }
      else { g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, `rgba(80,55,20,${dark})`); }
      c.fillStyle = g; c.fillRect(x, y, cw, h);
      c.restore();
    }
  };

  // ---- turning pages
  const turn = async to => {
    if (B.flip) return; scene.stopSpeak(); B.hl = -1; scene.sfx('page');
    B.flip = { from: B.page, to, dir: to > B.page ? 1 : -1, p: 0 }; setUI();
    await eng.tween(B.flip, { p: 1 }, 640, 'linear');
    B.page = to; B.flip = null;
    if (to >= 0 && to < pages.length) { B.words = layout(to); onPage?.(to / pages.length); }
    setUI();
  };
  const readPage = async () => {
    const i = B.page; if (i < 0 || i >= pages.length) return;
    await scene.readAlong(pages[i].text, toks[i], j => { B.hl = j; });
  };

  // ---- buttons
  let done = false, started = false;
  const nextBtn = new Btn({ x: SPINE + PW - 88, y: BY + PH - 70, w: 104, h: 96, icon: 'fwd', size: 46, color: '#5bd16f', onTap: () => {
    if (B.flip) return;
    if (B.page >= pages.length) { done = true; return; }
    turn(B.page + 1).then(() => { if (B.page === pages.length) { scene.sfx('win'); scene.parts.burst(BX + PW / 2, BY + 160, 30); } else if (read === 2) readPage(); });
  } });
  const backBtn = new Btn({ x: BX - 16, y: BY + PH - 70, w: 88, h: 84, icon: 'back', size: 38, color: '#42b4f5', onTap: () => { if (!B.flip && B.page > 0 && B.page < pages.length) turn(B.page - 1); } });
  const spk = new Btn({ x: SPINE + PW - 86, y: BY - 22, w: 96, h: 96, shadow: false, customDraw: (c, u) => speaker(c, 48, 48, 42, scene.speaking, scene.t), onTap: () => readPage() });
  const openBtn = new Btn({ x: SPINE + PW / 2 - 150, y: BY + PH - 16, w: 300, h: 90, label: 'ひらく  Open', icon: 'book', size: 34, font: JP, color: '#5bd16f', onTap: () => openBook() });
  const coverTap = new Btn({ x: SPINE, y: BY, w: PW, h: PH, shadow: false, customDraw: () => {}, onTap: () => openBook() });
  const openBook = async () => { if (started) return; started = true; await turn(0); if (read === 2) readPage(); };
  const wordBtns = () => B.words.map(it => new Btn({ x: it.x, y: it.y, w: it.w, h: it.h, shadow: false, customDraw: () => {},
    onTap: () => { if (B.flip) return; if (read === 1) helped.add(B.page + ':' + it.j); B.hl = it.j; scene.speak('w:' + it.t.key).then(() => { if (B.hl === it.j) B.hl = -1; }); } }));
  function setUI() {
    if (B.flip) { scene.ui = []; return; }
    if (B.page < 0) { scene.ui = [coverTap, openBtn]; return; }
    const atEnd = B.page >= pages.length;
    nextBtn.icon = atEnd ? 'check' : 'fwd'; nextBtn.color = atEnd ? '#ff9f4a' : '#5bd16f';
    scene.ui = atEnd ? [nextBtn] : [...wordBtns(), spk, nextBtn, ...(B.page > 0 && read !== 2 ? [backBtn] : [])];
  }
  setUI();

  // the cover: title, and which of the three readings this is
  scene.bookOverlay = c => {
    if (B.page >= 0 || B.flip) { nextBtn.pop = B.page >= pages.length ? 1 + Math.sin(scene.t * 5) * 0.05 : 1; return; }
    const x0 = BX - 10, y0 = BY + 16;
    text(c, 'えほん', x0 + 230, y0 + 10, { size: 22, color: INK2, font: JP, weight: '900' });
    [1, 2, 3].forEach((r, i) => {
      const md = MODES[r], y = y0 + 54 + i * 112, on = r === read, doneR = r < read;
      c.fillStyle = on ? '#fff' : 'rgba(255,255,255,.55)'; c.beginPath(); c.roundRect(x0 + 40, y, 400, 96, 26); c.fill();
      if (on) { c.strokeStyle = md.col; c.lineWidth = 5; c.stroke(); }
      c.fillStyle = doneR ? '#ffc83d' : on ? md.col : '#c9d3dc'; c.beginPath(); c.arc(x0 + 92, y + 48, 32, 0, 7); c.fill();
      icon(c, doneR ? 'check' : md.ic, x0 + 92, y + 48, 34, { color: '#fff' });
      text(c, `${r}. ${md.ja}`, x0 + 140, y + 36, { size: 24, color: on ? INK : INK2, font: JP, weight: '900', align: 'left' });
      text(c, md.en, x0 + 140, y + 68, { size: 17, color: INK2, font: UIF, weight: '800', align: 'left' });
    });
    openBtn.pop = 1 + Math.sin(scene.t * 4) * 0.04;
  };

  await new Promise(r => { const iv = setInterval(() => { if (done || scene.dead) { clearInterval(iv); r(); } }, 60); });
  scene.alive(); scene.stopSpeak();
  for (const t of toks) total += t.length;
  scene.book = null; scene.bookDraw = null; scene.bookOverlay = null; scene.bookTip = null; scene.ui = [];
  return { helped: helped.size, total };
}
