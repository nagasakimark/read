// The mascot: a procedural blob monster. Colour = the child's profile; mouth poses cue how each sound is made.
import { shade, rr } from './engine.js';

const HATS = ['none', 'cap', 'crown', 'party', 'flower', 'tophat', 'star', 'halo'];
export const hatFor = unitsPassed => HATS[Math.min(unitsPassed, HATS.length - 1)];

/** mood: idle|happy|oops|think. mouth: phoneme mouth pose or null. t: time in seconds for idle motion. */
export function drawMonster(c, x, y, size, { color = '#58c46a', mouth = null, mood = 'idle', t = 0, hat = 'none', blink = true, look = 0, jump = 0 } = {}) {
  const s = size / 200, base = color, lite = shade(color, 0.34), dark = shade(color, -0.22), deep = shade(color, -0.42);
  const bob = Math.sin(t * 2.4) * 3.5, breathe = 1 + Math.sin(t * 2.4) * 0.018;
  const hop = mood === 'happy' ? -Math.abs(Math.sin(t * 7)) * 10 : 0;
  c.save(); c.translate(x, y);
  // ground shadow (stays on the ground while the body bobs)
  c.save(); c.translate(0, 104 * s); c.fillStyle = 'rgba(20,60,50,.22)'; const sh = 1 - (bob + hop + jump) / -90; c.beginPath(); c.ellipse(0, 0, 88 * s * Math.min(1.1, sh), 13 * s * Math.min(1.1, sh), 0, 0, 7); c.fill(); c.restore();
  c.translate(0, (bob + hop + jump) * s); c.scale(s, s * breathe);
  // feet
  c.fillStyle = deep; c.beginPath(); c.ellipse(-46, 92, 32, 15, 0, 0, 7); c.ellipse(46, 92, 32, 15, 0, 0, 7); c.fill();
  c.fillStyle = dark; c.beginPath(); c.ellipse(-46, 89, 32, 14, 0, 0, 7); c.ellipse(46, 89, 32, 14, 0, 0, 7); c.fill();
  // arms (round capsules with hands)
  const wave = mood === 'happy' ? Math.sin(t * 11) * 22 : Math.sin(t * 1.8) * 4;
  c.lineCap = 'round';
  for (const side of [-1, 1]) {
    const w = side === 1 ? wave : -wave * 0.6, hx = side * 122, hy = 12 - (mood === 'happy' ? 34 : 0) - w;
    c.strokeStyle = dark; c.lineWidth = 26; c.beginPath(); c.moveTo(side * 78, 28); c.quadraticCurveTo(side * 112, 40, hx, hy); c.stroke();
    c.strokeStyle = base; c.lineWidth = 20; c.beginPath(); c.moveTo(side * 78, 28); c.quadraticCurveTo(side * 112, 40, hx, hy); c.stroke();
    c.fillStyle = base; c.beginPath(); c.arc(hx, hy, 15, 0, 7); c.fill();
  }
  // horns
  for (const side of [-1, 1]) {
    c.fillStyle = '#fff1c9'; c.beginPath(); c.moveTo(side * 38, -80); c.quadraticCurveTo(side * 66, -104, side * 70, -128); c.quadraticCurveTo(side * 30, -116, side * 16, -88); c.closePath(); c.fill();
    c.fillStyle = shade('#fff1c9', -0.12); c.beginPath(); c.moveTo(side * 38, -80); c.quadraticCurveTo(side * 54, -92, side * 58, -108); c.lineTo(side * 70, -128); c.quadraticCurveTo(side * 60, -100, side * 50, -86); c.closePath(); c.fill();
  }
  // body
  c.save(); c.beginPath(); c.moveTo(0, -86); c.bezierCurveTo(70, -90, 108, -34, 104, 22); c.bezierCurveTo(100, 84, 54, 104, 0, 104); c.bezierCurveTo(-54, 104, -100, 84, -104, 22); c.bezierCurveTo(-108, -34, -70, -90, 0, -86); c.closePath();
  const g = c.createRadialGradient(-34, -52, 10, 0, 10, 130); g.addColorStop(0, lite); g.addColorStop(0.45, base); g.addColorStop(1, dark); c.fillStyle = g; c.fill(); c.clip();
  c.fillStyle = shade(color, 0.5); c.globalAlpha = 0.55; c.beginPath(); c.ellipse(0, 58, 62, 44, 0, 0, 7); c.fill(); c.globalAlpha = 1;      // belly
  c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-48, -50, 22, 11, -0.7, 0, 7); c.fill();       // gloss
  c.restore();
  // cheeks
  c.fillStyle = 'rgba(255,178,196,.8)'; for (const sx of [-1, 1]) { c.beginPath(); c.ellipse(sx * 66, 14, 17, 11, 0, 0, 7); c.fill(); }
  // eyes
  const bl = blink && (t % 4.4) > 4.28 ? 0.1 : 1;
  for (const ex of [-34, 34]) {
    if (mood === 'happy' && Math.floor(t * 1.2) % 3 === 2) {   // happy squint
      c.strokeStyle = '#1d2b36'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.arc(ex, -18, 17, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); continue;
    }
    c.fillStyle = '#fff'; c.beginPath(); c.ellipse(ex, -26, 25, 30 * bl, 0, 0, 7); c.fill();
    c.fillStyle = shade(color, -0.1); c.globalAlpha = 0.25; c.beginPath(); c.ellipse(ex, -44 + 30 * (1 - bl), 24, 10, 0, 0, 7); c.fill(); c.globalAlpha = 1;
    const px = ex + look * 8 + (mood === 'think' ? 7 : 0) + Math.sin(t * 0.7) * 2, py = -24 + (mood === 'think' ? -7 : 0);
    c.fillStyle = '#1b2733'; c.beginPath(); c.ellipse(px, py, 14, 17 * bl, 0, 0, 7); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(px + 5, py - 6, 5, 0, 7); c.arc(px - 5, py + 6, 2.4, 0, 7); c.fill();
  }
  if (mood === 'oops') { c.strokeStyle = deep; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(-62, -66); c.lineTo(-14, -56); c.moveTo(62, -66); c.lineTo(14, -56); c.stroke(); }
  drawMouth(c, 0, 36, mouth || (mood === 'happy' ? 'smile' : mood === 'oops' ? 'flat' : 'rest'), color, t);
  if (hat !== 'none') drawHat(c, hat);
  c.restore();
}

function drawMouth(c, x, y, m, color, t) {
  c.save(); c.translate(x, y);
  const dark = '#3b1620', tongue = '#ff7f95', teeth = '#fff';
  const lipLine = shade(color, -0.5);
  c.lineWidth = 5; c.lineCap = 'round';
  switch (m) {
    case 'lips': // m b p: lips pressed
      c.strokeStyle = lipLine; c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(0, 8, 26, 0); c.stroke();
      c.fillStyle = shade(color, -0.1); rr(c, -22, -7, 44, 14, 7); c.fill(); c.strokeStyle = lipLine; c.stroke(); break;
    case 'teeth': // s z: teeth together, smile
      c.fillStyle = dark; rr(c, -34, -10, 68, 26, 10); c.fill(); c.fillStyle = teeth; rr(c, -30, -10, 60, 11, 4); c.fill(); rr(c, -30, 6, 60, 9, 4); c.fill(); break;
    case 'teethLip': // f v: top teeth on lower lip
      c.fillStyle = dark; rr(c, -32, -8, 64, 24, 10); c.fill(); c.fillStyle = teeth; rr(c, -26, -8, 52, 12, 4); c.fill();
      c.fillStyle = shade(color, -0.1); rr(c, -26, 5, 52, 12, 6); c.fill(); break;
    case 'tongue': // t d n l: tongue up behind teeth
      c.fillStyle = dark; rr(c, -32, -8, 64, 32, 12); c.fill(); c.fillStyle = teeth; rr(c, -26, -8, 52, 9, 3); c.fill();
      c.fillStyle = tongue; c.beginPath(); c.ellipse(0, -1, 20, 12, 0, 0, 7); c.fill(); break;
    case 'tongueOut': // th: tongue between the teeth
      c.fillStyle = dark; rr(c, -30, -8, 60, 24, 10); c.fill(); c.fillStyle = teeth; rr(c, -26, -8, 52, 9, 3); c.fill(); rr(c, -26, 8, 52, 8, 3); c.fill();
      c.fillStyle = tongue; c.beginPath(); c.ellipse(0, 6, 17, 9, 0, 0, 7); c.fill(); break;
    case 'round': // w oo: small round
      c.fillStyle = dark; c.beginPath(); c.ellipse(0, 4, 15, 18, 0, 0, 7); c.fill(); c.strokeStyle = lipLine; c.stroke(); break;
    case 'open': // a: wide open
      c.fillStyle = dark; c.beginPath(); c.ellipse(0, 6, 34, 30, 0, 0, 7); c.fill(); c.fillStyle = tongue; c.beginPath(); c.ellipse(0, 24, 22, 11, 0, 0, 7); c.fill(); break;
    case 'mid': // o u e: medium
      c.fillStyle = dark; c.beginPath(); c.ellipse(0, 5, 26, 20, 0, 0, 7); c.fill(); c.fillStyle = tongue; c.beginPath(); c.ellipse(0, 17, 16, 7, 0, 0, 7); c.fill(); break;
    case 'smile': // i ee, happy
      c.fillStyle = dark; c.beginPath(); c.moveTo(-40, -4); c.quadraticCurveTo(0, 46, 40, -4); c.quadraticCurveTo(0, 8, -40, -4); c.fill();
      c.fillStyle = teeth; c.beginPath(); c.moveTo(-34, -2); c.quadraticCurveTo(0, 14, 34, -2); c.quadraticCurveTo(0, 6, -34, -2); c.fill(); break;
    case 'throat': // k g h: mouth open slightly, throat
      c.fillStyle = dark; c.beginPath(); c.ellipse(0, 6, 22, 22, 0, 0, 7); c.fill(); c.fillStyle = tongue; c.beginPath(); c.ellipse(10, 14, 11, 8, 0, 0, 7); c.fill(); break;
    case 'flat': c.strokeStyle = lipLine; c.beginPath(); c.moveTo(-22, 10); c.quadraticCurveTo(0, 2, 22, 10); c.stroke(); break;
    default: // rest: gentle smile
      c.strokeStyle = lipLine; c.beginPath(); c.moveTo(-30, 0); c.quadraticCurveTo(0, 26 + Math.sin(t * 2) * 2, 30, 0); c.stroke();
  }
  c.restore();
}

function drawHat(c, hat) {
  c.save(); c.translate(0, -84);
  if (hat === 'cap') { c.fillStyle = '#d93f46'; c.beginPath(); c.arc(0, 4, 50, Math.PI, 0); c.closePath(); c.fill(); c.fillStyle = '#ff6b6b'; c.beginPath(); c.arc(0, 0, 46, Math.PI * 1.05, Math.PI * 1.95); c.closePath(); c.fill(); c.fillStyle = '#d93f46'; c.beginPath(); c.ellipse(34, 8, 40, 9, 0.08, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, -46, 6, 0, 7); c.fill(); }
  if (hat === 'crown') { c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(-46, 8); c.lineTo(-46, -30); c.lineTo(-23, -8); c.lineTo(0, -40); c.lineTo(23, -8); c.lineTo(46, -30); c.lineTo(46, 8); c.closePath(); c.fill(); c.strokeStyle = '#c9971c'; c.lineWidth = 4; c.stroke(); }
  if (hat === 'party') { c.fillStyle = '#ff7ac8'; c.beginPath(); c.moveTo(-34, 8); c.lineTo(0, -80); c.lineTo(34, 8); c.closePath(); c.fill(); c.fillStyle = '#ffd23f'; c.beginPath(); c.arc(0, -82, 9, 0, 7); c.fill(); }
  if (hat === 'flower') { for (let i = 0; i < 6; i++) { c.fillStyle = '#ff8fb8'; c.beginPath(); c.ellipse(Math.cos(i) * 20, -10 + Math.sin(i) * 20, 14, 14, 0, 0, 7); c.fill(); } c.fillStyle = '#ffd23f'; c.beginPath(); c.arc(0, -10, 12, 0, 7); c.fill(); }
  if (hat === 'tophat') { c.fillStyle = '#2b2f4a'; c.fillRect(-30, -64, 60, 70); c.fillRect(-52, 0, 104, 12); c.fillStyle = '#e24b4b'; c.fillRect(-30, -16, 60, 12); }
  if (hat === 'star') { c.fillStyle = '#ffd23f'; c.beginPath(); for (let i = 0; i < 10; i++) { const a = (i * Math.PI) / 5 - Math.PI / 2, r = i % 2 ? 22 : 50; c.lineTo(Math.cos(a) * r, -30 + Math.sin(a) * r); } c.closePath(); c.fill(); }
  if (hat === 'halo') { c.strokeStyle = '#ffe680'; c.lineWidth = 9; c.beginPath(); c.ellipse(0, -22, 46, 12, 0, 0, 7); c.stroke(); }
  c.restore();
}
