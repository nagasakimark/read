#!/usr/bin/env python3
"""Generate PLACEHOLDER audio (eSpeak NG) for every audio key the app uses.
Real recorded human audio replaces these (tools/recorder.html). Writes audio/*.mp3 + audio/manifest.json.
Keys: gpc:<id> (pure sound), w:<word>, b:<word> (alias of w:), sent:<text>."""
import json, os, re, subprocess, sys, tempfile
sys.path.insert(0, os.path.dirname(__file__))
import espeak_synth as E

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cur = lambda n: json.load(open(f'{ROOT}/curriculum/{n}.json'))
phon = {p['id']: p for p in cur('phonemes')}
gpcs, words, tricky, stories, sents = cur('gpcs'), cur('words'), cur('tricky'), cur('stories'), cur('sentences')
out = f'{ROOT}/audio'; os.makedirs(out, exist_ok=True)
manifest = {}
slug = lambda s: re.sub(r'[^a-z0-9]+', '_', s.lower()).strip('_')

def encode(samples, path, cont):
    with tempfile.TemporaryDirectory() as d:
        w = f'{d}/a.wav'; E.write_wav(w, samples)
        # trim leading/trailing silence; short sounds are hard-capped so stops stay clipped, continuants <= 0.9 s
        dur = '0.35' if not cont else '0.9'
        af = 'silenceremove=start_periods=1:start_threshold=-45dB:stop_periods=1:stop_threshold=-45dB:stop_duration=0.1'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', w, '-af', af, '-t', dur if cont is not None else '30',
                        '-ar', '22050', '-ac', '1', '-b:a', '48k', path], check=True)

def add(key, text, rate=130, pitch=65, cont=None, file=None):
    f = file or (key.replace(':', '_', 1).split('_', 1)[0] + '_' + slug(key.split(':', 1)[1]) + '.mp3')
    p = f'{out}/{f}'
    if not os.path.exists(p):
        encode(E.synth(text, rate, pitch), p, cont)
    manifest[key] = f

for g in gpcs:
    ph = phon[g['ph'][0]]
    # digraph/double letters carry one phoneme; 'qu' = k+w
    mn = ''.join(phon[x]['esp'] for x in g['ph'])
    add('gpc:' + g['id'], f'[[{mn}]]', rate=110, cont=bool(ph['cont']) if len(g['ph']) == 1 else False)
spoken = {w['t'] for w in words} | {t['id'] for t in tricky}
for g in gpcs:
    for b in (g.get('bank') or []) + (g.get('fbank') or []): spoken.add(b[0])
for t in sorted(spoken):
    add('w:' + t, t, rate=120)
    manifest['b:' + t] = manifest['w:' + t]
texts = {s['text'] for s in sents}
for st in stories:
    for pg in st['pages']: texts.add(pg['text'])
for t in sorted(texts):
    add('sent:' + t, t, rate=115)
json.dump(manifest, open(f'{out}/manifest.json', 'w'), indent=0, sort_keys=True)
print(len(manifest), 'keys,', len(os.listdir(out)) - 1, 'files')
