import { W, H, FONT, JP, UIF, text, rr, shade, Btn } from './engine.js';
import { panel, cardFace, slab, backdrop, icon, INK, INK2 } from './sprites.js';

export function background(c, t, kind = 'day') { backdrop(c, t, kind); }

/** Flow layout: items [{w}] centred in rows of at most maxW. Writes x,y (top-left) and returns total height. */
export function flow(items, cx, y, maxW, gap, rowH) {
  const rows = []; let row = [], rw = 0;
  for (const it of items) { if (row.length && rw + gap + it.w > maxW) { rows.push(row); row = []; rw = 0; } row.push(it); rw += (row.length > 1 ? gap : 0) + it.w; }
  if (row.length) rows.push(row);
  rows.forEach((r, ri) => { const tw = r.reduce((s, it) => s + it.w, 0) + gap * (r.length - 1); let x = cx - tw / 2; r.forEach(it => { it.x = x; it.y = y + ri * rowH; x += it.w + gap; }); });
  return rows.length * rowH;
}
export const tileW = (label, size) => Math.max(size * 1.35, 30 + label.length * size * 0.62);

/** Draw a letter tile. state: idle|wrong|right|ghost|heart */
export function drawTile(c, x, y, w, h, label, { size = 64, state = 'idle', hot = false, color = '#fff', textColor = INK, press = 0 } = {}) {
  c.save(); c.translate(x + w / 2, y + h / 2); const s = 1 - press * 0.05; c.scale(s, s); c.translate(-w / 2, -h / 2);
  if (state === 'ghost') {
    c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.roundRect(0, 0, w, h, 24); c.fill();
    c.lineWidth = 4; c.setLineDash([12, 10]); c.lineCap = 'round'; c.strokeStyle = hot ? '#ffb020' : 'rgba(255,255,255,.95)'; c.stroke(); c.setLineDash([]);
  } else {
    const off = cardFace(c, 0, 0, w, h, state === 'right' ? 'right' : state === 'wrong' ? 'wrong' : 'idle', 0, hot);
    if (label) text(c, label, w / 2, off + (h - 8) / 2 + 1, { size, color: textColor });
    c.restore(); return;
  }
  if (label) text(c, label, w / 2, h / 2, { size, color: textColor });
  c.restore();
}

export function speaker(c, x, y, r, active, pulse = 0) {
  c.save(); c.translate(x, y);
  if (active) { for (const k of [0.25, 0.6]) { const q = ((pulse * 1.2 + k) % 1); c.globalAlpha = (1 - q) * 0.45; c.strokeStyle = '#ffc83d'; c.lineWidth = 5; c.beginPath(); c.arc(0, 0, r * (1 + q * 0.5), 0, 7); c.stroke(); } c.globalAlpha = 1; }
  const lip = active ? '#dc9a10' : '#2386cc', face = active ? '#ffc83d' : '#42b4f5', d = Math.max(5, r * 0.12);
  c.fillStyle = lip; c.beginPath(); c.arc(0, d, r, 0, 7); c.fill(); c.fillStyle = face; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill();
  c.fillStyle = 'rgba(255,255,255,.28)'; c.beginPath(); c.ellipse(0, -r * 0.5, r * 0.62, r * 0.3, 0, 0, 7); c.fill();
  icon(c, 'speaker', -r * 0.04, -1, r * 1.1, { color: '#fff' });
  c.restore();
}

export function bubble(c, x, y, w, h, tail = 'left') { panel(c, x, y, w, h, { r: 28 }); }

/** Highlight the target grapheme inside a word: returns [{s, hot}] segments. */
export function segmentWord(word, g, pos) {
  if (g.length === 3 && g[1] === '_') {   // split digraph a_e: light up the vowel and the final e, not the consonant between
    const i = word.indexOf(g[0]), j = word.length - 1;
    if (i < 0 || i >= j || word[j] !== g[2]) return [{ s: word, hot: false }];
    return [{ s: word.slice(0, i), hot: false }, { s: g[0], hot: true }, { s: word.slice(i + 1, j), hot: false }, { s: g[2], hot: true }].filter(x => x.s);
  }
  const i = pos === 'final' ? word.lastIndexOf(g) : word.indexOf(g);
  if (i < 0) return [{ s: word, hot: false }];
  return [{ s: word.slice(0, i), hot: false }, { s: g, hot: true }, { s: word.slice(i + g.length), hot: false }].filter(x => x.s);
}
export function drawSegments(c, segs, cx, cy, size, hotColor = '#ff5a3c', color = '#23394b', maxW = 0) {
  c.font = `bold ${size}px ${FONT}`;
  if (maxW) { const full = c.measureText(segs.map(x => x.s).join('')).width; if (full > maxW) { size = Math.floor(size * maxW / full); c.font = `bold ${size}px ${FONT}`; } } const ws = segs.map(s => c.measureText(s.s).width); const tw = ws.reduce((a, b) => a + b, 0);
  let x = cx - tw / 2; c.textAlign = 'left'; c.textBaseline = 'middle';
  segs.forEach((s, i) => { c.fillStyle = s.hot ? hotColor : color; c.fillText(s.s, x, cy); x += ws[i]; });
}
export { Btn };

/** A picture: emoji text, or a hand-drawn 'draw:xxx' shape (for things emoji cannot show, e.g. a mat). */
export function picText(c, p, x, y, size) {
  if (p === 'draw:mat') {
    const w = size * 0.95, h = size * 0.6; c.save(); c.translate(x, y);
    c.fillStyle = '#d8553f'; rr(c, -w / 2, -h / 2, w, h, size * 0.08); c.fill();
    c.fillStyle = '#f5c04a'; rr(c, -w / 2 + size * 0.08, -h / 2 + size * 0.08, w - size * 0.16, h - size * 0.16, size * 0.05); c.fill();
    c.fillStyle = '#4fa3d9'; rr(c, -w / 2 + size * 0.16, -h / 2 + size * 0.16, w - size * 0.32, h - size * 0.32, size * 0.03); c.fill();
    c.strokeStyle = '#d8553f'; c.lineWidth = size * 0.035; for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(i * w * 0.14, -h / 2 + size * 0.2); c.lineTo(i * w * 0.14, h / 2 - size * 0.2); c.stroke(); }
    c.fillStyle = '#d8553f'; for (let i = 0; i < 9; i++) { c.fillRect(-w / 2 - size * 0.05, -h / 2 + 6 + i * (h - 12) / 8 - 1, size * 0.05, 3); c.fillRect(w / 2, -h / 2 + 6 + i * (h - 12) / 8 - 1, size * 0.05, 3); }
    c.restore(); return;
  }
  text(c, p, x, y, { size });
}

/** An answer card face (use inside a customDraw): state idle|right|wrong. Returns the y offset of the face (press). */
export function card(c, w, h, { fill = '#fff', hot = false, press = 0 } = {}) {
  const st = fill === '#8ee59a' ? 'right' : fill === '#ffb3a8' ? 'wrong' : 'idle';
  return cardFace(c, 0, 0, w, h, st, press, hot);
}
/** Monster speech bubble: Japanese large, English small, tail pointing down at the monster. */
export function speech(c, x, y, w, ja, en, tint = null) {
  if (!ja && !en) return;
  const wrap = (str, size, maxW, bold = true) => { c.font = `${bold ? '800 ' : '600 '}${size}px ${JP}`; const out = []; let line = '';
    for (const word of str.split(/(?<=[ 、。！？])/)) { if (line && c.measureText(line + word).width > maxW) { out.push(line); line = ''; } line += word; } if (line) out.push(line); return out; };
  const jl = ja ? wrap(ja, 24, w - 40) : [], el = en ? wrap(en, 18, w - 40, false) : [];
  const h = 26 + jl.length * 31 + (el.length ? 8 + el.length * 23 : 0) + 4;
  c.save(); c.translate(x, y);
  const T = tint === 'ok' ? { fill: '#e1f8de', border: '#67cf7d', lip: '#52bd68' } : tint === 'bad' ? { fill: '#ffe6e3', border: '#ff8686', lip: '#e5666b' } : { fill: '#fff', border: '#e4e9f1', lip: '#d0d8e4' };
  panel(c, 0, 0, w, h, { r: 26, ...T });
  c.fillStyle = T.fill; c.strokeStyle = T.border; c.lineWidth = 3; c.lineJoin = 'round';
  c.beginPath(); c.moveTo(w * 0.3, h + 3); c.quadraticCurveTo(w * 0.36, h + 22, w * 0.42, h + 36); c.quadraticCurveTo(w * 0.5, h + 20, w * 0.58, h + 3); c.fill();
  c.beginPath(); c.moveTo(w * 0.3, h + 3); c.quadraticCurveTo(w * 0.36, h + 22, w * 0.42, h + 36); c.quadraticCurveTo(w * 0.5, h + 20, w * 0.58, h + 3); c.stroke();
  c.fillStyle = T.fill; c.fillRect(w * 0.31, h - 6, w * 0.26, 10);
  let ty = 27; for (const l of jl) { text(c, l, w / 2, ty, { size: 24, color: tint === 'ok' ? '#1f7a37' : tint === 'bad' ? '#a8282e' : INK, font: JP, weight: '800' }); ty += 31; }
  if (el.length) { ty += 2; for (const l of el) { text(c, l, w / 2, ty, { size: 18, color: INK2, weight: '600', font: UIF }); ty += 23; } }
  c.restore();
}

/** Big heading with a white outline so it reads on any background. */
export function title(c, str, x, y, size = 44, { color = INK, outline = '#fff', font = JP, weight = '900' } = {}) {
  c.save(); c.shadowColor = 'rgba(30,70,120,.25)'; c.shadowBlur = 10; c.shadowOffsetY = 4;
  text(c, str, x, y, { size, color, font, weight, stroke: { w: Math.max(6, size / 5), c: outline } }); c.restore();
  text(c, str, x, y, { size, color, font, weight });
}
/** Small white pill caption (under icon buttons). */
export function caption(c, str, x, y, size = 15) {
  c.font = `800 ${size}px ${JP}`; const w = c.measureText(str).width + 22;
  c.fillStyle = 'rgba(255,255,255,.88)'; c.beginPath(); c.roundRect(x - w / 2, y - size * 0.85, w, size * 1.7, size); c.fill();
  text(c, str, x, y + 1, { size, color: INK, font: JP, weight: '800' });
}
