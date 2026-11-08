import { W, H, FONT, JP, text, rr, shade, Btn } from './engine.js';
import { family, button, panel } from './sprites.js';

export function background(c, t, kind = 'day') {
  const g = c.createLinearGradient(0, 0, 0, H);
  if (kind === 'night') { g.addColorStop(0, '#1b2a5a'); g.addColorStop(1, '#4b3b86'); }
  else if (kind === 'warm') { g.addColorStop(0, '#ffd9a0'); g.addColorStop(1, '#ff9f9f'); }
  else { g.addColorStop(0, '#8fd3ff'); g.addColorStop(0.65, '#c9f0ff'); g.addColorStop(1, '#d7f7c8'); }
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  // drifting clouds
  c.fillStyle = 'rgba(255,255,255,.75)';
  for (let i = 0; i < 4; i++) { const x = ((t * 14 + i * 380) % (W + 300)) - 150, y = 60 + i * 38 + (i % 2) * 30;
    c.beginPath(); c.ellipse(x, y, 70, 22, 0, 0, 7); c.ellipse(x + 45, y + 6, 55, 18, 0, 0, 7); c.ellipse(x - 40, y + 8, 48, 16, 0, 0, 7); c.fill(); }
  // hills
  c.fillStyle = kind === 'night' ? '#2e3d7a' : '#9fdc7c'; c.beginPath(); c.moveTo(0, H); c.lineTo(0, 520); c.quadraticCurveTo(300, 450, 640, 520); c.quadraticCurveTo(1000, 580, W, 500); c.lineTo(W, H); c.fill();
  c.fillStyle = kind === 'night' ? '#26336b' : '#82c963'; c.beginPath(); c.moveTo(0, H); c.lineTo(0, 560); c.quadraticCurveTo(420, 520, 800, 575); c.quadraticCurveTo(1100, 600, W, 545); c.lineTo(W, H); c.fill();
}

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
export function drawTile(c, x, y, w, h, label, { size = 64, state = 'idle', hot = false, color = '#fff', textColor = '#23394b', press = 0 } = {}) {
  const fill = state === 'right' ? '#8ee59a' : state === 'wrong' ? '#ffb3a8' : state === 'ghost' ? 'rgba(255,255,255,.35)' : color;
  c.save(); c.translate(x + w / 2, y + h / 2); const s = 1 - press * 0.06; c.scale(s, s); c.translate(-w / 2, -h / 2);
  if (state !== 'ghost') card(c, w, h, { fill, hot });
  else { rr(c, 0, 0, w, h, 20); c.fillStyle = fill; c.fill(); c.lineWidth = 4; c.setLineDash([10, 8]); c.strokeStyle = 'rgba(255,255,255,.85)'; c.stroke(); c.setLineDash([]); }
  if (label) text(c, label, w / 2, h / 2 - 3, { size, color: textColor });
  c.restore();
}

export function speaker(c, x, y, r, active) {
  c.save(); c.translate(x, y);
  c.fillStyle = active ? '#ffd23f' : '#2e9cca'; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.lineWidth = 4; c.strokeStyle = '#fff'; c.stroke();
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-r * .45, -r * .2); c.lineTo(-r * .2, -r * .2); c.lineTo(r * .1, -r * .5); c.lineTo(r * .1, r * .5); c.lineTo(-r * .2, r * .2); c.lineTo(-r * .45, r * .2); c.closePath(); c.fill();
  c.strokeStyle = '#fff'; c.lineWidth = 4; c.lineCap = 'round';
  for (const k of [0.5, 0.8]) { c.beginPath(); c.arc(r * .1, 0, r * k, -0.8, 0.8); c.stroke(); }
  c.restore();
}

export function bubble(c, x, y, w, h, tail = 'left') {
  rr(c, x, y, w, h, 28); c.fillStyle = 'rgba(255,255,255,.95)'; c.fill(); c.lineWidth = 4; c.strokeStyle = '#bcd3e3'; c.stroke();
  c.fillStyle = 'rgba(255,255,255,.95)'; c.beginPath();
  if (tail === 'left') { c.moveTo(x + 4, y + h * .55); c.lineTo(x - 26, y + h * .7); c.lineTo(x + 6, y + h * .75); }
  c.fill();
}

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

/** An answer card: white glossy sprite (green/red when right/wrong), gold halo when "hot". */
export function card(c, w, h, { r = 28, fill = '#fff', stroke = '#9fb4c4', hot = false } = {}) {
  const fam = fill === '#fff' ? 'Grey' : family(fill);
  if (hot) { c.save(); c.shadowColor = '#ffd23f'; c.shadowBlur = 28; c.fillStyle = '#ffd23f'; rr(c, 4, 4, w - 8, h - 8, r); c.fill(); c.restore(); }
  if (!button(c, fam, 'rectangle', 0, 0, w, h)) { rr(c, 0, 8, w, h, r); c.fillStyle = 'rgba(30,50,70,.28)'; c.fill(); rr(c, 0, 0, w, h, r); c.fillStyle = fill; c.fill(); c.lineWidth = 4; c.strokeStyle = stroke; c.stroke(); }
}
/** Monster speech bubble with Japanese (big) and English (small) lines; tail points down to the monster. */
export function speech(c, x, y, w, ja, en) {
  if (!ja && !en) return;
  const wrap = (str, size, maxW, bold = true) => { c.font = `${bold ? 'bold ' : ''}${size}px ${JP}`; const out = []; let line = '';
    for (const word of str.split(/(?<=[ 、。！？])/)) { if (line && c.measureText(line + word).width > maxW) { out.push(line); line = ''; } line += word; } if (line) out.push(line); return out; };
  const jl = ja ? wrap(ja, 25, w - 36) : [], el = en ? wrap(en, 19, w - 36, false) : [];
  const h = 28 + jl.length * 32 + (el.length ? 8 + el.length * 24 : 0);
  c.save(); c.translate(x, y);
  c.beginPath(); c.moveTo(w * 0.34, h - 10); c.lineTo(w * 0.5, h + 26); c.lineTo(w * 0.6, h - 10); c.closePath(); c.fillStyle = '#fff'; c.fill(); c.lineWidth = 4; c.strokeStyle = '#a7a9bd'; c.lineJoin = 'round'; c.stroke();
  if (!panel(c, 0, 0, w, h)) { rr(c, 0, 0, w, h, 28); c.fillStyle = '#fffdf5'; c.fill(); }
  let ty = 26; for (const l of jl) { text(c, l, w / 2, ty, { size: 25, color: '#23394b', font: JP }); ty += 32; }
  if (el.length) { ty += 2; for (const l of el) { text(c, l, w / 2, ty, { size: 19, color: '#5b7388', weight: 'normal' }); ty += 24; } }
  c.restore();
}
