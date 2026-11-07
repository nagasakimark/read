// node tools/apply_recordings.mjs <folder-with-rec_*.webm>
// Trims silence, converts to mp3 and replaces the placeholder in audio/ (file names already match the manifest).
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const dir = process.argv[2]; if (!dir) { console.error('usage: node tools/apply_recordings.mjs <folder>'); process.exit(1); }
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
let n = 0;
for (const f of fs.readdirSync(dir).filter(f => /^rec_.*\.(webm|ogg|wav|m4a)$/.test(f))) {
  const out = path.join(root, 'audio', f.replace(/^rec_/, '').replace(/\.\w+$/, '.mp3'));
  if (!fs.existsSync(out)) { console.warn('skip (no matching placeholder):', f); continue; }
  const sound = path.basename(out).startsWith('gpc_');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(dir, f), '-af',
    'silenceremove=start_periods=1:start_threshold=-42dB:stop_periods=1:stop_threshold=-42dB:stop_duration=0.15,loudnorm=I=-18:TP=-2', '-t', sound ? '1.2' : '30', '-ar', '22050', '-ac', '1', '-b:a', '56k', out]);
  n++;
}
console.log(n, 'recordings applied. Commit audio/ to publish them.');
