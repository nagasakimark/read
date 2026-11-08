// The visual kit, all drawn in code so it stays crisp on any screen: chunky "lipped" buttons, cards and panels,
// stars, progress bars and the storybook background. (Replaces the earlier bitmap UI pack.)
import { icon, hasIcon } from './icons.js';

export const PAL = {
  Green:  ['#5bd16f', '#33a04a'], Blue: ['#42b4f5', '#2386cc'], Yellow: ['#ffc83d', '#dc9a10'], Orange: ['#ff9f4a', '#dd7420'],
  Red:    ['#ff6b6b', '#d6404a'], Purple: ['#a97cf8', '#7a50d0'], Grey: ['#e6ebf1', '#bcc6d3'], Teal: ['#2fc9b6', '#16978a'],
};
export const INK = '#26384b', INK2 = '#566b7f';

export async function loadSprites() { return true; }
const famCache = {};
/** Map any hex colour to the nearest palette family name. */
export function family(hex) {
  if (famCache[hex]) return famCache[hex];
  const h = hex.replace('#', ''), r = parseInt(h.slice(0, 2), 16) / 255, g = parseInt(h.slice(2, 4), 16) / 255, b = parseInt(h.slice(4, 6), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, l = (mx + mn) / 2, sat = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let hue = 0; if (d) { hue = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; hue = (hue * 60 + 360) % 360; }
  const f = sat < 0.2 ? 'Grey' : hue < 14 || hue >= 335 ? 'Red' : hue < 36 ? 'Orange' : hue < 72 ? 'Yellow' : hue < 160 ? 'Green' : hue < 185 ? 'Teal' : hue < 262 ? 'Blue' : 'Purple';
  return (famCache[hex] = f);
}
export const faceOf = hex => PAL[family(hex)] || PAL.Blue;

const shadeHex = (hex, f) => { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const t = f < 0 ? 0 : 255, p = Math.abs(f); r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b); return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`; };

/** A "lipped" slab: face + darker thick bottom edge. h is the full height including the lip. press 0..1 sinks the face. */
export function slab(c, x, y, w, h, { r = 24, face = '#fff', lip = '#cfd6e0', depth = 7, press = 0, border = null, sheen = true, glow = null } = {}) {
  const d = depth, off = press * (d - 1), fh = h - d;
  r = Math.min(r, fh / 2);
  if (glow) { c.save(); c.shadowColor = glow; c.shadowBlur = 30; c.fillStyle = glow; c.beginPath(); c.roundRect(x + 2, y + 2, w - 4, h - 4, r); c.fill(); c.restore(); }
  c.fillStyle = lip; c.beginPath(); c.roundRect(x, y + d - 1, w, fh + 1, r); c.fill();           // lip
  c.beginPath(); c.roundRect(x, y + off, w, fh, r);
  if (sheen) { const g = c.createLinearGradient(0, y + off, 0, y + off + fh); g.addColorStop(0, shadeHex(face.startsWith('#') && face.length === 7 ? face : '#ffffff', 0.14)); g.addColorStop(0.5, face); g.addColorStop(1, face); c.fillStyle = g; } else c.fillStyle = face;
  c.fill();
  if (border) { c.lineWidth = 3; c.strokeStyle = border; c.stroke(); }
  return off;
}
/** Buttons: colour family from a hex (or name). Returns the y offset of the face for label/icon placement. */
export function buttonFace(c, hex, x, y, w, h, press = 0, enabled = true) {
  const [face, lip] = enabled ? faceOf(hex) : ['#b9c3cd', '#98a3ae'];
  return slab(c, x, y, w, h, { r: Math.min(26, h * 0.34), face, lip, depth: Math.max(6, Math.min(10, h * 0.09)), press });
}
export function button(c, fam, shape, x, y, w, h) { const [face, lip] = PAL[fam] || PAL.Blue; slab(c, x, y, w, h, { r: Math.min(26, h * 0.34), face, lip, depth: Math.max(6, Math.min(10, h * 0.09)) }); return true; }
export const nine = () => false;
export const sprite = () => null;

/** White panel with a soft shadow and a lip, e.g. dialogs and the results card. */
export function panel(c, x, y, w, h, { r = 30, fill = '#fff', border = '#e4e9f1', lip = '#d0d8e4' } = {}) {
  c.save(); c.shadowColor = 'rgba(30,60,110,.22)'; c.shadowBlur = 26; c.shadowOffsetY = 12; c.fillStyle = lip; c.beginPath(); c.roundRect(x, y + 6, w, h, r); c.fill(); c.restore();
  slab(c, x, y, w, h + 6, { r, face: fill, lip, depth: 6, border, sheen: false }); return true;
}

/** Answer card. state: idle | right | wrong | hot. */
export function cardFace(c, x, y, w, h, state = 'idle', press = 0, hot = false) {
  const S = {
    idle:  { face: '#ffffff', lip: '#cdd6e2', border: '#e1e7ef' },
    right: { face: '#e1f8de', lip: '#52bd68', border: '#67cf7d' },
    wrong: { face: '#ffe6e3', lip: '#e5666b', border: '#ff8686' },
  }[state] || {};
  return slab(c, x, y, w, h, { r: 28, face: S.face, lip: S.lip, border: S.border, depth: 8, press, sheen: false, glow: hot ? 'rgba(255,200,60,.85)' : null });
}

/** Pill progress bar. */
export function progress(c, x, y, w, h, frac, { track = 'rgba(255,255,255,.65)', fill = PAL.Green } = {}) {
  c.fillStyle = track; c.beginPath(); c.roundRect(x, y, w, h, h / 2); c.fill();
  const fw = Math.max(h, w * Math.max(0, Math.min(1, frac)));
  if (frac > 0) {
    c.save(); c.beginPath(); c.roundRect(x, y, w, h, h / 2); c.clip();
    c.fillStyle = fill[1]; c.beginPath(); c.roundRect(x, y + 2, fw, h - 2, h / 2); c.fill();
    c.fillStyle = fill[0]; c.beginPath(); c.roundRect(x, y, fw, h - 4, h / 2); c.fill();
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.roundRect(x + 8, y + 3, Math.max(0, fw - 16), h * 0.28, h * 0.14); c.fill();
    c.restore();
  }
}

/** One vector star (gold or grey). */
export function starShape(c, cx, cy, size, on = true, spin = 0) {
  c.save(); c.translate(cx, cy); c.rotate(spin);
  const R = size / 2, path = () => { c.beginPath(); for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? R * 0.5 : R; c.lineTo(Math.cos(a) * r, Math.sin(a) * r + R * 0.05); } c.closePath(); };
  c.lineJoin = 'round';
  path(); c.lineWidth = R * 0.34; c.strokeStyle = on ? '#e5a30f' : '#b6c0cc'; c.stroke(); c.save(); c.translate(0, R * 0.08); path(); c.fillStyle = on ? '#e5a30f' : '#b6c0cc'; c.fill(); c.restore();
  path(); const g = c.createLinearGradient(0, -R, 0, R); g.addColorStop(0, on ? '#ffe36b' : '#e4e9ef'); g.addColorStop(1, on ? '#ffbb1f' : '#cdd5de'); c.fillStyle = g; c.fill();
  path(); c.lineWidth = R * 0.34; c.strokeStyle = g; c.stroke();
  if (on) { c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(-R * 0.22, -R * 0.38, R * 0.17, R * 0.1, -0.6, 0, 7); c.fill(); }
  c.restore();
}
/** Row of n stars, the first `got` gold. `t` (0..1+) staggers a pop-in. */
export function starRow(c, cx, cy, got, n = 3, size = 80, t = 9) {
  const gap = size * 0.1, tw = n * size + (n - 1) * gap;
  for (let i = 0; i < n; i++) {
    const k = Math.max(0, Math.min(1, t - i * 0.35)), s = i < got ? (k < 1 ? k * k * (3 - 2 * k) * 1.25 : 1) : 1;
    const lift = i === 1 ? -size * 0.12 : 0;   // the middle star sits a little higher
    starShape(c, cx - tw / 2 + size / 2 + i * (size + gap), cy + lift, size * s, i < got, (i - 1) * 0.18);
  }
}

// ------------------------------------------------------------------ background
const cache = {};
function paintScenery(c, kind) {
  const W = 1366, H = 598, night = kind === 'night';
  const sky = c.createLinearGradient(0, 0, 0, H);
  if (night) { sky.addColorStop(0, '#1d2a66'); sky.addColorStop(0.7, '#4a3f95'); sky.addColorStop(1, '#8a62b8'); }
  else { sky.addColorStop(0, '#6fcbff'); sky.addColorStop(0.55, '#b9ecff'); sky.addColorStop(1, '#fff1cc'); }
  c.fillStyle = sky; c.fillRect(0, 0, W, H);
  if (night) { c.fillStyle = 'rgba(255,255,255,.9)'; let s = 7; for (let i = 0; i < 70; i++) { s = (s * 9301 + 49297) % 233280; const x = s / 233280 * W; s = (s * 9301 + 49297) % 233280; const y = s / 233280 * 380; c.beginPath(); c.arc(x, y, 1 + (i % 3) * 0.7, 0, 7); c.fill(); } }
  else {   // sun with a soft glow
    const g = c.createRadialGradient(1180, 90, 10, 1180, 90, 260); g.addColorStop(0, 'rgba(255,248,200,.95)'); g.addColorStop(0.25, 'rgba(255,240,170,.5)'); g.addColorStop(1, 'rgba(255,240,170,0)');
    c.fillStyle = g; c.fillRect(800, 0, 566, 360); c.fillStyle = '#fff7c4'; c.beginPath(); c.arc(1180, 90, 42, 0, 7); c.fill();
  }
  const hill = (pts, top, bot) => { const g = c.createLinearGradient(0, top, 0, H); g.addColorStop(0, top === 0 ? bot : bot); g.addColorStop(1, bot); return g; };
  const layer = (y0, amp, ph, col1, col2) => {
    const g = c.createLinearGradient(0, y0 - amp, 0, H); g.addColorStop(0, col1); g.addColorStop(1, col2); c.fillStyle = g; c.beginPath(); c.moveTo(0, H);
    for (let x = 0; x <= W; x += 20) c.lineTo(x, y0 + Math.sin(x / 210 + ph) * amp + Math.sin(x / 90 + ph * 2) * amp * 0.25); c.lineTo(W, H); c.closePath(); c.fill();
  };
  const tree = (x, y, s, col) => { c.fillStyle = night ? '#35306b' : '#7a5a43'; c.fillRect(x - 3 * s, y - 14 * s, 6 * s, 16 * s); c.fillStyle = col; c.beginPath(); for (const [dx, dy, r] of [[0, -30, 20], [-14, -20, 14], [14, -20, 14]]) { c.moveTo(x + dx * s + r * s, y + dy * s); c.arc(x + dx * s, y + dy * s, r * s, 0, 7); } c.fill(); };
  layer(430, 26, 0.5, night ? '#4d4fa4' : '#bdeacb', night ? '#3b3c86' : '#a6dfb8');
  layer(470, 22, 2.2, night ? '#3f4290' : '#92d8a6', night ? '#2f3277' : '#7ccb92');
  for (const [x, s] of [[160, 1.1], [330, 0.8], [980, 1], [1210, 1.2], [1310, 0.8]]) tree(x, 470 + Math.sin(x / 210 + 2.2) * 22 + 6, s, night ? '#3a3f8e' : '#58b977');
  layer(525, 14, 4.1, night ? '#2e3274' : '#63c57c', night ? '#232663' : '#48ac64');
  // flowers + tufts on the front hill
  let s = 31; for (let i = 0; i < 46; i++) { s = (s * 9301 + 49297) % 233280; const x = s / 233280 * W; s = (s * 9301 + 49297) % 233280; const y = 545 + (s / 233280) * 50;
    c.fillStyle = ['#fff', '#ffd6e8', '#fff2a6', '#ffe0c2'][i % 4]; if (!night) { c.beginPath(); c.arc(x, y, 4, 0, 7); c.fill(); c.fillStyle = '#ffcf4a'; c.beginPath(); c.arc(x, y, 1.6, 0, 7); c.fill(); } }
}
function sceneryFor(kind) {
  if (cache[kind]) return cache[kind];
  const cv = document.createElement('canvas'); cv.width = 2732; cv.height = 1196; const x = cv.getContext('2d'); x.scale(2, 2); paintScenery(x, kind); return (cache[kind] = cv);
}
const CL = [[0.0, 70, 1.0, 12], [0.3, 150, 0.7, 8], [0.62, 90, 1.25, 10], [0.88, 190, 0.8, 7]];
export function backdrop(c, t, kind = 'day') {
  c.drawImage(sceneryFor(kind === 'night' ? 'night' : 'day'), 0, 0, 1366, 598);
  c.fillStyle = kind === 'night' ? 'rgba(255,255,255,.22)' : 'rgba(255,255,255,.85)';
  for (const [ph, y, s, sp] of CL) {
    const x = ((t * sp + ph * 1700) % (1366 + 360)) - 180; c.save(); c.translate(x, y); c.scale(s, s); c.beginPath();
    for (const [dx, dy, r] of [[0, 0, 30], [34, -14, 38], [80, -2, 32], [52, 12, 30], [-28, 12, 24]]) { c.moveTo(dx + r, dy); c.arc(dx, dy, r, 0, 7); } c.fill(); c.restore();
  }
  c.fillStyle = kind === 'night' ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.7)';   // slow floating motes
  for (let i = 0; i < 14; i++) { const k = i * 97.3, x = (k * 13 + t * (6 + (i % 4) * 3)) % 1366, y = 520 - ((t * (14 + (i % 3) * 6) + k * 7) % 480), a = 0.25 + 0.35 * Math.sin(t * 1.5 + i); c.globalAlpha = Math.max(0, a) * 0.8; c.beginPath(); c.arc(x, y, 2 + (i % 3), 0, 7); c.fill(); }
  c.globalAlpha = 1;
}
export { icon, hasIcon };
