// The mascot: a procedural blob monster. Colour = the child's profile; mouth poses cue how each sound is made.
import { shade, rr } from './engine.js';

const HATS = ['none', 'cap', 'crown', 'party', 'flower', 'tophat', 'star', 'halo'];
export const hatFor = unitsPassed => HATS[Math.min(unitsPassed, HATS.length - 1)];

/** mood: idle|happy|oops|think. mouth: phoneme mouth pose or null. t: time in seconds for idle motion. */
export function drawMonster(c, x, y, size, { color = '#58c46a', mouth = null, mood = 'idle', t = 0, hat = 'none', blink = true, look = 0 } = {}) {
  const s = size / 200;
  c.save(); c.translate(x, y);
  const bob = Math.sin(t * 2.2) * 4 * s, sq = 1 + Math.sin(t * 2.2) * 0.02;
  c.translate(0, bob); c.scale(s, s * sq);
  // feet
  c.fillStyle = shade(color, -0.35);
  c.beginPath(); c.ellipse(-48, 92, 30, 14, 0, 0, 7); c.ellipse(48, 92, 30, 14, 0, 0, 7); c.fill();
  // little arms
  c.strokeStyle = shade(color, -0.2); c.lineWidth = 16; c.lineCap = 'round';
  const wave = mood === 'happy' ? Math.sin(t * 12) * 18 : 0;
  c.beginPath(); c.moveTo(-86, 20); c.quadraticCurveTo(-120, 30 - wave, -118, -10 - wave * 1.5); c.stroke();
  c.beginPath(); c.moveTo(86, 20); c.quadraticCurveTo(120, 30 + wave, 118, -10 + wave * 1.5); c.stroke();
  // horns / antennae
  c.fillStyle = shade(color, -0.25);
  c.beginPath(); c.moveTo(-50, -78); c.lineTo(-68, -122); c.lineTo(-24, -92); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(50, -78); c.lineTo(68, -122); c.lineTo(24, -92); c.closePath(); c.fill();
  // body
  const g = c.createRadialGradient(-30, -50, 20, 0, 0, 120); g.addColorStop(0, shade(color, 0.3)); g.addColorStop(1, color);
  c.fillStyle = g; c.beginPath(); c.ellipse(0, 10, 100, 96, 0, 0, 7); c.fill();
  c.lineWidth = 4; c.strokeStyle = shade(color, -0.3); c.stroke();
  // belly
  c.fillStyle = shade(color, 0.45); c.globalAlpha = 0.5; c.beginPath(); c.ellipse(0, 52, 60, 38, 0, 0, 7); c.fill(); c.globalAlpha = 1;
  // eyes
  const bl = blink && (t % 4.2) > 4.05 ? 0.12 : 1;
  for (const ex of [-34, 34]) {
    c.fillStyle = '#fff'; c.beginPath(); c.ellipse(ex, -26, 24, 28 * bl, 0, 0, 7); c.fill(); c.lineWidth = 3; c.strokeStyle = shade(color, -0.4); c.stroke();
    c.fillStyle = '#1d2b36'; c.beginPath(); c.ellipse(ex + look * 8 + (mood === 'think' ? 6 : 0), -24 + (mood === 'think' ? -6 : 0), 11, 13 * bl, 0, 0, 7); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(ex + 4, -30, 4, 0, 7); c.fill();
  }
  if (mood === 'oops') { c.strokeStyle = shade(color, -0.45); c.lineWidth = 5; c.beginPath(); c.moveTo(-60, -62); c.lineTo(-14, -52); c.moveTo(60, -62); c.lineTo(14, -52); c.stroke(); }
  // mouth
  drawMouth(c, 0, 34, mouth || (mood === 'happy' ? 'smile' : mood === 'oops' ? 'flat' : 'rest'), color, t);
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
  if (hat === 'cap') { c.fillStyle = '#e24b4b'; c.beginPath(); c.arc(0, 0, 52, Math.PI, 0); c.fill(); c.fillRect(-4, -6, 76, 12); }
  if (hat === 'crown') { c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(-46, 8); c.lineTo(-46, -30); c.lineTo(-23, -8); c.lineTo(0, -40); c.lineTo(23, -8); c.lineTo(46, -30); c.lineTo(46, 8); c.closePath(); c.fill(); c.strokeStyle = '#c9971c'; c.lineWidth = 4; c.stroke(); }
  if (hat === 'party') { c.fillStyle = '#ff7ac8'; c.beginPath(); c.moveTo(-34, 8); c.lineTo(0, -80); c.lineTo(34, 8); c.closePath(); c.fill(); c.fillStyle = '#ffd23f'; c.beginPath(); c.arc(0, -82, 9, 0, 7); c.fill(); }
  if (hat === 'flower') { for (let i = 0; i < 6; i++) { c.fillStyle = '#ff8fb8'; c.beginPath(); c.ellipse(Math.cos(i) * 20, -10 + Math.sin(i) * 20, 14, 14, 0, 0, 7); c.fill(); } c.fillStyle = '#ffd23f'; c.beginPath(); c.arc(0, -10, 12, 0, 7); c.fill(); }
  if (hat === 'tophat') { c.fillStyle = '#2b2f4a'; c.fillRect(-30, -64, 60, 70); c.fillRect(-52, 0, 104, 12); c.fillStyle = '#e24b4b'; c.fillRect(-30, -16, 60, 12); }
  if (hat === 'star') { c.fillStyle = '#ffd23f'; c.beginPath(); for (let i = 0; i < 10; i++) { const a = (i * Math.PI) / 5 - Math.PI / 2, r = i % 2 ? 22 : 50; c.lineTo(Math.cos(a) * r, -30 + Math.sin(a) * r); } c.closePath(); c.fill(); }
  if (hat === 'halo') { c.strokeStyle = '#ffe680'; c.lineWidth = 9; c.beginPath(); c.ellipse(0, -22, 46, 12, 0, 0, 7); c.stroke(); }
  c.restore();
}
