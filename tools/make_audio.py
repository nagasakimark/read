#!/usr/bin/env python3
"""Generate PLACEHOLDER audio (eSpeak NG) for every audio key the app uses.
Real recorded human audio replaces these (tools/recorder.html). Writes audio/*.mp3 + audio/manifest.json.
Keys: gpc:<id> (pure sound), w:<word>, b:<word> (alias of w:), sent:<text>."""
import json, os, re, subprocess, sys, tempfile
sys.path.insert(0, os.path.dirname(__file__))
import espeak_synth as E
import audio_v2 as V
import numpy as np

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

def encode_f32(a, path, cont, loud=True):
    with tempfile.TemporaryDirectory() as d:
        r = f'{d}/a.f32'; np.asarray(a, dtype=np.float32).tofile(r)
        af = 'silenceremove=start_periods=1:start_threshold=-45dB:stop_periods=1:stop_threshold=-45dB:stop_duration=0.1,loudnorm=I=-18:TP=-2:LRA=7'
        cap = ['-t', '0.9' if cont else '0.5'] if cont is not None else []
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'f32le', '-ar', str(V.SR), '-ac', '1', '-i', r, '-af', af, *cap, '-ar', '22050', '-ac', '1', '-b:a', '56k', path], check=True)

def fname(key): return key.replace(':', '_', 1).split('_', 1)[0] + '_' + slug(key.split(':', 1)[1]) + '.mp3'

def add_samples(key, samples, cont=None):
    f = fname(key); encode_f32(samples, f'{out}/{f}', cont); manifest[key] = f

def add(key, text, rate=130, pitch=65, cont=None, file=None):
    f = file or (key.replace(':', '_', 1).split('_', 1)[0] + '_' + slug(key.split(':', 1)[1]) + '.mp3')
    p = f'{out}/{f}'
    if not os.path.exists(p):
        encode(E.synth(text, rate, pitch), p, cont)
    manifest[key] = f

for g in gpcs:
    if not g['ph']: continue   # silent e: no sound
    ph = phon[g['ph'][0]]
    # digraph/double letters carry one phoneme; 'qu' = k+w
    mn = ''.join(phon[x]['esp'] for x in g['ph'])
    cont = bool(ph['cont']) if len(g['ph']) == 1 else False
    h = V.human_gpc(g['ph']) if not os.environ.get('ESPEAK_ONLY') else None
    if h is not None: add_samples('gpc:' + g['id'], h, cont)
    else: add('gpc:' + g['id'], f'[[{mn}]]', rate=110, cont=cont)
spoken = {w['t'] for w in words} | {t['id'] for t in tricky}
for g in gpcs:
    for b in (g.get('bank') or []) + (g.get('fbank') or []) + (g.get('vbank') or []): spoken.add(b[0])
for t in sorted(spoken):
    if os.environ.get('REUSE_WORDS') and os.path.exists(f'{out}/{fname("w:" + t)}'): manifest['w:' + t] = fname('w:' + t); manifest['b:' + t] = manifest['w:' + t]; continue
    pw = V.piper(t, 1.2)
    if pw is not None: add_samples('w:' + t, pw, None)
    else: add('w:' + t, t, rate=120)
    manifest['b:' + t] = manifest['w:' + t]
texts = {s['text'] for s in sents}
for st in stories:
    for pg in st['pages']: texts.add(pg['text'])
    for q in st.get('questions', []): texts.add(q['q'])
for t in sorted(texts):
    if os.environ.get('REUSE_WORDS') and os.path.exists(f'{out}/{fname("sent:" + t)}'): manifest['sent:' + t] = fname('sent:' + t); continue
    ps = V.piper(t, 1.12)
    if ps is not None: add_samples('sent:' + t, ps, None)
    else: add('sent:' + t, t, rate=115)
json.dump(manifest, open(f'{out}/manifest.json', 'w'), indent=0, sort_keys=True)
print(len(manifest), 'keys,', len(os.listdir(out)) - 1, 'files')
