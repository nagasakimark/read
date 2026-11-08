// Vector icons drawn in code (crisp at any size, one consistent style: chunky, rounded, flat).
// icon(c, name, cx, cy, size, { color, color2 }) draws centred on cx,cy inside a size x size box.
const P = {};   // name -> (c, col, col2) drawing in a -50..50 box

const rrect = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
const stroke = (c, col, w) => { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke(); };

P.home = (c, col, col2) => {
  c.fillStyle = col; c.beginPath(); c.moveTo(0, -42); c.lineTo(44, -2); c.quadraticCurveTo(48, 2, 42, 4); c.lineTo(36, 4); c.lineTo(36, 38); c.quadraticCurveTo(36, 44, 30, 44); c.lineTo(-30, 44); c.quadraticCurveTo(-36, 44, -36, 38); c.lineTo(-36, 4); c.lineTo(-42, 4); c.quadraticCurveTo(-48, 2, -44, -2); c.closePath(); c.fill();
  c.fillStyle = col2; rrect(c, -9, 14, 18, 30, 6); c.fill();
};
P.star = (c, col) => { c.fillStyle = col; c.lineJoin = 'round'; c.beginPath(); for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? 20 : 46; c.lineTo(Math.cos(a) * r, Math.sin(a) * r + 3); } c.closePath(); c.fill(); stroke(c, col, 10); };
P.gear = (c, col, col2) => {
  c.fillStyle = col; c.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; for (const [da, r] of [[-0.2, 33], [-0.14, 44], [0.14, 44], [0.2, 33]]) c.lineTo(Math.cos(a + da) * r, Math.sin(a + da) * r); }
  c.closePath(); c.arc(0, 0, 15, 0, Math.PI * 2, true); c.fill('evenodd'); stroke(c, col, 3);
};
P.people = (c, col) => {
  c.fillStyle = col;
  for (const [x, s, y] of [[-20, 0.86, 4], [22, 1, 0]]) {
    c.save(); c.translate(x, y); c.scale(s, s); c.beginPath(); c.arc(0, -22, 15, 0, 7); c.fill();
    c.beginPath(); c.moveTo(-26, 40); c.quadraticCurveTo(-26, 2, 0, 2); c.quadraticCurveTo(26, 2, 26, 40); c.closePath(); c.fill(); c.restore();
  }
};
P.play = (c, col) => { c.fillStyle = col; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-22, -34); c.lineTo(36, 0); c.lineTo(-22, 34); c.closePath(); c.fill(); stroke(c, col, 12); };
P.next = P.play;
P.back = (c, col) => { c.beginPath(); c.moveTo(14, -34); c.lineTo(-16, 0); c.lineTo(14, 34); stroke(c, col, 15); };
P.fwd = (c, col) => { c.beginPath(); c.moveTo(-14, -34); c.lineTo(16, 0); c.lineTo(-14, 34); stroke(c, col, 15); };
P.speaker = (c, col) => {
  c.fillStyle = col; c.beginPath(); c.moveTo(-40, -14); c.lineTo(-24, -14); c.lineTo(-2, -36); c.quadraticCurveTo(4, -40, 4, -32); c.lineTo(4, 32); c.quadraticCurveTo(4, 40, -2, 36); c.lineTo(-24, 14); c.lineTo(-40, 14); c.quadraticCurveTo(-46, 14, -46, 8); c.lineTo(-46, -8); c.quadraticCurveTo(-46, -14, -40, -14); c.fill();
  for (const r of [18, 34]) { c.beginPath(); c.arc(8, 0, r, -0.9, 0.9); stroke(c, col, 8); }
};
P.listen = (c, col) => { c.beginPath(); c.arc(0, 6, 36, Math.PI * 1.02, Math.PI * 1.98); stroke(c, col, 10); c.fillStyle = col; rrect(c, -50, 2, 24, 44, 11); c.fill(); rrect(c, 26, 2, 24, 44, 11); c.fill(); };
P.ear = (c, col) => {
  c.beginPath(); c.moveTo(-8, 44); c.bezierCurveTo(-30, 36, -26, 14, -36, 4); c.bezierCurveTo(-48, -24, -26, -46, 2, -44); c.bezierCurveTo(30, -44, 42, -16, 32, 4); c.bezierCurveTo(26, 16, 10, 22, 8, 32); c.bezierCurveTo(6, 42, 0, 46, -8, 44); stroke(c, col, 9);
  c.beginPath(); c.moveTo(-12, 8); c.bezierCurveTo(-14, -14, 4, -24, 14, -10); c.bezierCurveTo(18, -2, 6, 8, 6, 18); stroke(c, col, 8);
};
P.trophy = (c, col, col2) => {
  c.fillStyle = col; c.beginPath(); c.moveTo(-28, -40); c.lineTo(28, -40); c.lineTo(26, -6); c.quadraticCurveTo(24, 16, 0, 20); c.quadraticCurveTo(-24, 16, -26, -6); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(-28, -30); c.quadraticCurveTo(-52, -30, -46, -10); c.quadraticCurveTo(-42, 4, -26, 4); stroke(c, col, 8);
  c.beginPath(); c.moveTo(28, -30); c.quadraticCurveTo(52, -30, 46, -10); c.quadraticCurveTo(42, 4, 26, 4); stroke(c, col, 8);
  c.fillRect(-5, 18, 10, 14); rrect(c, -22, 30, 44, 12, 5); c.fill();
  c.fillStyle = col2; c.save(); c.translate(0, -14); c.scale(0.4, 0.4); c.beginPath(); for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? 20 : 46; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath(); c.fill(); c.restore();
};
P.gamepad = (c, col, col2) => {
  c.fillStyle = col; c.beginPath(); c.moveTo(-26, -26); c.lineTo(26, -26); c.bezierCurveTo(52, -26, 52, 34, 40, 34); c.bezierCurveTo(30, 34, 26, 18, 18, 18); c.lineTo(-18, 18); c.bezierCurveTo(-26, 18, -30, 34, -40, 34); c.bezierCurveTo(-52, 34, -52, -26, -26, -26); c.fill();
  c.fillStyle = col2; rrect(c, -33, -10, 22, 7, 3); c.fill(); rrect(c, -25.5, -17.5, 7, 22, 3); c.fill();
  c.beginPath(); c.arc(20, -12, 5, 0, 7); c.arc(32, -2, 5, 0, 7); c.fill();
};
P.check = (c, col) => { c.beginPath(); c.moveTo(-30, 2); c.lineTo(-10, 24); c.lineTo(32, -22); stroke(c, col, 17); };
P.cross = (c, col) => { c.beginPath(); c.moveTo(-26, -26); c.lineTo(26, 26); c.moveTo(26, -26); c.lineTo(-26, 26); stroke(c, col, 16); };
P.lock = (c, col, col2) => {
  c.beginPath(); c.moveTo(-20, -6); c.lineTo(-20, -20); c.bezierCurveTo(-20, -48, 20, -48, 20, -20); c.lineTo(20, -6); stroke(c, col, 10);
  c.fillStyle = col; rrect(c, -32, -8, 64, 50, 12); c.fill(); c.fillStyle = col2; c.beginPath(); c.arc(0, 14, 7, 0, 7); c.fill(); c.fillRect(-3.5, 14, 7, 16);
};
P.replay = (c, col) => {
  c.beginPath(); c.arc(0, 2, 30, -2.4, 2.9); stroke(c, col, 12);
  c.fillStyle = col; c.beginPath(); c.moveTo(-36, -34); c.lineTo(-34, -4); c.lineTo(-8, -20); c.closePath(); c.fill(); stroke(c, col, 5);
};
P.heart = (c, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(0, 40); c.bezierCurveTo(-60, -2, -34, -50, 0, -18); c.bezierCurveTo(34, -50, 60, -2, 0, 40); c.fill(); };
P.book = (c, col, col2) => {
  c.fillStyle = col; c.beginPath(); c.moveTo(0, -26); c.bezierCurveTo(-14, -38, -34, -36, -46, -30); c.lineTo(-46, 34); c.bezierCurveTo(-34, 28, -14, 28, 0, 40); c.bezierCurveTo(14, 28, 34, 28, 46, 34); c.lineTo(46, -30); c.bezierCurveTo(34, -36, 14, -38, 0, -26); c.fill();
  c.strokeStyle = col2; c.lineWidth = 5; c.beginPath(); c.moveTo(0, -22); c.lineTo(0, 36); c.stroke();
};
P.sparkle = (c, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(0, -44); c.quadraticCurveTo(6, -6, 44, 0); c.quadraticCurveTo(6, 6, 0, 44); c.quadraticCurveTo(-6, 6, -44, 0); c.quadraticCurveTo(-6, -6, 0, -44); c.fill(); };
P.bolt = (c, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(8, -46); c.lineTo(-28, 4); c.lineTo(-4, 4); c.lineTo(-12, 46); c.lineTo(30, -8); c.lineTo(4, -8); c.closePath(); c.fill(); stroke(c, col, 6); };
P.equal = (c, col) => { for (const y of [-14, 14]) { c.beginPath(); c.moveTo(-34, y); c.lineTo(34, y); stroke(c, col, 14); } };
P.notequal = (c, col) => { P.equal(c, col); c.beginPath(); c.moveTo(22, -42); c.lineTo(-22, 42); stroke(c, col, 12); };
P.tap = (c, col) => {
  c.fillStyle = col; rrect(c, -10, -44, 20, 52, 10); c.fill();
  c.beginPath(); c.moveTo(-26, 0); c.bezierCurveTo(-26, -10, -10, -10, -10, 2); c.lineTo(10, 2); c.bezierCurveTo(14, -6, 30, -2, 28, 8); c.lineTo(28, 20); c.bezierCurveTo(28, 42, 14, 48, 0, 48); c.bezierCurveTo(-18, 48, -30, 36, -30, 14); c.closePath(); c.fill();
  c.globalAlpha = 0.6; c.beginPath(); c.arc(0, -42, 22, Math.PI * 1.1, Math.PI * 1.9); stroke(c, col, 6); c.globalAlpha = 1;
};
P.help = (c, col) => { c.font = '900 120px Nunito, sans-serif'; c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', 0, 8); };
P.flag = (c, col) => { c.beginPath(); c.moveTo(-26, -42); c.lineTo(-26, 44); stroke(c, col, 9); c.fillStyle = col; c.beginPath(); c.moveTo(-24, -40); c.lineTo(38, -26); c.lineTo(-24, -4); c.closePath(); c.fill(); };
P.pause = (c, col) => { c.fillStyle = col; rrect(c, -28, -34, 20, 68, 7); c.fill(); rrect(c, 8, -34, 20, 68, 7); c.fill(); };

export const hasIcon = n => !!P[n];
export function icon(c, name, cx, cy, size, { color = '#fff', color2 = 'rgba(0,0,0,.25)', shadow = 0 } = {}) {
  const f = P[name]; if (!f) return false;
  c.save(); c.translate(cx, cy); const k = size / 100; c.scale(k, k);
  if (shadow) { c.save(); c.translate(0, shadow / k); f(c, 'rgba(0,0,0,.22)', 'rgba(0,0,0,0)'); c.restore(); }
  f(c, color, color2); c.restore(); return true;
}
