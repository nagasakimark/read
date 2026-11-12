// Teacher class report (report.html): decodes progress codes or reads this device's players, then shows
// where each child is, which sounds the class finds hard, and a printable card per child.
import { loadCurriculum } from './learn/loader.browser.js';
import { Store, fromCode, COLORS } from './game/store.js';
import * as M from './learn/mastery.js';
import { gLabel, unitInfo } from './game/unitinfo.js';

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
let C = null;
const ready = loadCurriculum().then(c => { C = c; });

function summarise(name, st) {
  const gl = C.gpcList.filter(g => !['suffix', 'silent'].includes(g.type));
  const seen = gl.filter(g => st.items['gpc:' + g.id]?.a?.length);
  const known = gl.filter(g => (st.items['gpc:' + g.id]?.rung || 0) >= M.K.mastered);
  const weak = seen.filter(g => (st.items['gpc:' + g.id]?.rung || 0) < M.K.mastered);
  const next = M.nextLesson(C, st);
  const unit = next?.unit ?? C.units.length;
  const stories = Object.values(st.units || {}).reduce((a, u) => a + Object.keys(u.stories || {}).length, 0);
  const acc = (() => { const all = Object.values(st.items).flatMap(i => i.a || []); return all.length ? Math.round(100 * all.reduce((s, a) => s + a.ok, 0) / all.length) : null; })();
  const last = Math.max(0, ...Object.values(st.items).map(i => i.last || 0));
  return { name, st, gl, known, weak, unit, next, stories, acc, last, minutes: Math.round((st.stats?.secondsPlayed || 0) / 60), conf: M.confusionPairs(st, 2).slice(0, 4) };
}

function render(rows) {
  if (!rows.length) { $('out').innerHTML = ''; return; }
  const gl = rows[0].gl;
  // class view of every sound taught to at least one child: share of children for whom it is secure
  const taught = gl.filter(g => rows.some(r => r.st.items['gpc:' + g.id]?.a?.length));
  const cells = taught.map(g => {
    const met = rows.filter(r => r.st.items['gpc:' + g.id]?.a?.length), sec = met.filter(r => (r.st.items['gpc:' + g.id]?.rung || 0) >= M.K.mastered);
    const p = met.length ? sec.length / met.length : 0;
    const bg = p >= 0.8 ? '#d6f5df' : p >= 0.5 ? '#fff4cf' : '#ffe1e1';
    return { g, p, html: `<div class="g" style="background:${bg}"><b>${esc(gLabel(g))}</b><span>${sec.length}/${met.length}</span></div>` };
  });
  const hardest = cells.filter(x => x.p < 0.5).sort((a, b) => a.p - b.p).slice(0, 10);
  const mix = {}; rows.forEach(r => r.conf.forEach(c => { const k = c.pair.join('→'); mix[k] = (mix[k] || 0) + c.n; }));
  const mixes = Object.entries(mix).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const date = d => d ? new Date(d).toLocaleDateString('ja-JP') : '–';
  $('out').innerHTML = `
  <div class="card"><h2>クラス ぜんたい · Whole class (${rows.length} students)</h2>
    <p class="muted">Each tile: students secure on that sound / students who have met it. Green ≥ 80%, yellow ≥ 50%, red &lt; 50% — red sounds are worth re-teaching together.</p>
    <div class="grid">${cells.map(x => x.html).join('')}</div>
    <p><b>Re-teach first:</b> ${hardest.length ? hardest.map(x => `<span class="pill bad">${esc(gLabel(x.g))}</span>`).join(' ') : 'nothing below 50% 🎉'}</p>
    <p><b>Common mix-ups (target → chosen):</b> ${mixes.length ? mixes.map(([k, n]) => `<span class="pill">${esc(k)} ×${n}</span>`).join(' ') : 'none yet'}</p>
  </div>
  <div class="card"><h2>せいと · Students</h2><table>
    <tr><th>Student</th><th>Now at</th><th>Sounds secure</th><th>Still learning</th><th>Stories</th><th>Accuracy</th><th>Minutes</th><th>Last played</th></tr>
    ${rows.map(r => `<tr><td><b>${esc(r.name)}</b></td><td>Unit ${r.unit} · ${esc(unitInfo(r.unit).en)}</td>
      <td><span class="bar"><i style="width:${Math.round(100 * r.known.length / r.gl.length)}%"></i></span> ${r.known.length}/${r.gl.length}</td>
      <td class="weak">${r.weak.slice(0, 8).map(g => esc(gLabel(g))).join(' ') || '–'}</td><td>${r.stories}</td><td>${r.acc ?? '–'}%</td><td>${r.minutes}</td><td>${date(r.last)}</td></tr>`).join('')}
  </table></div>
  ${rows.map(r => `<div class="card student"><h2>${esc(r.name)} — Unit ${r.unit} ${esc(unitInfo(r.unit).ja)} (${esc(unitInfo(r.unit).en)})</h2>
    <p>よめる おと · Sounds secure: <b>${r.known.length}</b> / ${r.gl.length} &nbsp; · &nbsp; えほん · Stories read: <b>${r.stories}</b> &nbsp; · &nbsp; Time: <b>${r.minutes} min</b> &nbsp; · &nbsp; Accuracy: <b>${r.acc ?? '–'}%</b></p>
    <p>Secure: ${r.known.map(g => `<span class="pill">${esc(gLabel(g))}</span>`).join('') || '–'}</p>
    <p>Practising: ${r.weak.map(g => `<span class="pill bad">${esc(gLabel(g))}</span>`).join('') || '–'}</p>
    ${r.conf.length ? `<p class="muted">Mix-ups: ${r.conf.map(c => esc(c.pair.join('→')) + ' ×' + c.n).join(', ')}</p>` : ''}
  </div>`).join('')}`;
}

$('go').onclick = async () => {
  await ready; const rows = [], bad = [];
  for (const [i, line] of $('codes').value.split('\n').map(s => s.trim()).filter(Boolean).entries()) {
    const m = line.match(/^(.*?)[:：\t]\s*(LRE\d\..+)$/); const name = m ? m[1].trim() || `Student ${i + 1}` : `Student ${i + 1}`, code = m ? m[2] : line;
    try { rows.push(summarise(name, await fromCode(code))); } catch { bad.push(i + 1); }
  }
  $('msg').textContent = bad.length ? `Could not read line(s): ${bad.join(', ')}` : `${rows.length} student(s) loaded.`;
  render(rows);
};
$('local').onclick = async () => {
  await ready; const s = new Store(); await s.open(); const list = await s.list();
  const rows = list.map(r => summarise((COLORS.find(c => c.id === r.color)?.ja || r.color) + ' monster', r.state));
  $('msg').textContent = `${rows.length} player(s) on this device.`; render(rows);
};
$('print').onclick = () => print();
