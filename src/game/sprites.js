// UI sprites: Kenney "UI Pack" (CC0, see assets/ui/LICENSE-kenney-ui-pack.txt), rasterised at 4x at load so they stay crisp
// when stretched. Buttons, cards and panels are drawn 9-sliced from these.
const COLORS = ['Blue', 'Green', 'Red', 'Yellow', 'Grey'];
const KINDS = ['button_rectangle_depth_gloss', 'button_square_depth_gloss', 'button_round_depth_gloss', 'star'];
const R = 4;
const S = {};   // key -> canvas

const load = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
function raster(img, scale = R) {
  const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * scale); c.height = Math.round(img.naturalHeight * scale);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); return c;
}
export async function loadSprites() {
  const jobs = [];
  for (const col of COLORS) for (const k of KINDS) jobs.push(load(`assets/ui/${col}_${k}.svg`).then(i => { if (i) S[`${col}_${k}`] = raster(i); }));
  jobs.push(load('assets/ui/Extra_input_rectangle.svg').then(i => { if (i) S.input = raster(i); }), load('assets/ui/Grey_panel.svg').then(i => { if (i) S.panel = raster(i); }), load('assets/ui/Grey_panel_depth.svg').then(i => { if (i) S.panelDepth = raster(i); }));
  await Promise.all(jobs);
  // a purple family made from the blue sprites (hue rotated)
  for (const k of KINDS) { const b = S['Blue_' + k]; if (!b) continue; const c = document.createElement('canvas'); c.width = b.width; c.height = b.height; const x = c.getContext('2d'); x.filter = 'hue-rotate(58deg)'; x.drawImage(b, 0, 0); S['Purple_' + k] = c; }
  S.ready = true;
}

/** Map any hex colour to the nearest sprite family. */
const famCache = {};
export function family(hex) {
  if (famCache[hex]) return famCache[hex];
  const h = hex.replace('#', ''), r = parseInt(h.slice(0, 2), 16) / 255, g = parseInt(h.slice(2, 4), 16) / 255, b = parseInt(h.slice(4, 6), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, l = (mx + mn) / 2, sat = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let hue = 0; if (d) { hue = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; hue = (hue * 60 + 360) % 360; }
  let f = sat < 0.22 ? 'Grey' : hue < 14 || hue >= 335 ? 'Red' : hue < 75 ? 'Yellow' : hue < 170 ? 'Green' : hue < 260 ? 'Blue' : hue < 335 ? 'Purple' : 'Red';
  return (famCache[hex] = f);
}

/** 9-slice a sprite (source slices in 1x sprite units) into x,y,w,h. */
export function nine(c, img, x, y, w, h, { l = 16, r = 16, t = 12, b = 22, k = null } = {}) {
  if (!img) return false;
  const sw = img.width, sh = img.height, K = k ?? Math.max(0.5, Math.min(2.6, h / (sh / R))), cl = l * R, cr = r * R, ct = t * R, cb = b * R;
  const dl = l * K, dr = r * K, dt = t * K, db = b * K;
  const dwMid = Math.max(0, w - dl - dr), dhMid = Math.max(0, h - dt - db);
  const sx = [0, cl, sw - cr], sW = [cl, sw - cl - cr, cr], dx = [x, x + dl, x + w - dr], dW = [dl, dwMid, dr];
  const sy = [0, ct, sh - cb], sH = [ct, sh - ct - cb, cb], dy = [y, y + dt, y + h - db], dH = [dt, dhMid, db];
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) if (dW[i] > 0 && dH[j] > 0) c.drawImage(img, sx[i], sy[j], sW[i], sH[j], dx[i], dy[j], dW[i], dH[j]);
  return true;
}
export const sprite = key => S[key];
export function button(c, fam, shape, x, y, w, h) { return nine(c, S[`${fam}_button_${shape}_depth_gloss`], x, y, w, h, shape === 'round' ? { l: 30, r: 30, t: 28, b: 34 } : { l: 14, r: 14, t: 10, b: 42, k: Math.min(1.25, h / 64) }); }
export function panel(c, x, y, w, h) {   // white rounded panel with a chunky lower edge, matching the button sprites
  const r = Math.min(30, h / 3);
  c.save(); c.beginPath(); c.roundRect(x, y + 8, w, h, r); c.fillStyle = 'rgba(40,60,90,.30)'; c.fill();
  c.beginPath(); c.roundRect(x, y + 5, w, h, r); c.fillStyle = '#b7bbd0'; c.fill();
  c.beginPath(); c.roundRect(x, y, w, h, r); c.fillStyle = '#fff'; c.fill(); c.lineWidth = 4; c.strokeStyle = '#d3d6e6'; c.stroke();
  c.restore(); return true;
}
/** Row of n stars, the first `got` gold, the rest grey, centred on cx. */
export function starRow(c, cx, cy, got, n = 3, size = 80) {
  const gap = size * 0.12, tw = n * size + (n - 1) * gap;
  for (let i = 0; i < n; i++) { const img = S[(i < got ? 'Yellow' : 'Grey') + '_star']; if (img) c.drawImage(img, cx - tw / 2 + i * (size + gap), cy - size / 2, size, size * img.height / img.width); }
}
