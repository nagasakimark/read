"""Better audio backends for tools/make_audio.py.
- human_gpc(phonemes): isolated letter sounds from real human IPA recordings (audio_src/ipa, CC BY-SA - see audio_src/CREDITS.md)
- PiperVoice words/sentences when PIPER_VOICE=/path/to/en_US-ljspeech-high.onnx is set (pip install piper-tts)
Both return float32 mono samples at 22050 Hz (or None when unavailable, so the caller can fall back to eSpeak)."""
import os, subprocess, numpy as np
SR = 22050
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IPA = f'{ROOT}/audio_src/ipa'
# diphthongs / r-coloured vowels are blends of two recorded vowels (approximation until a teacher records them)
BLEND = {'ai': ['e', 'i'], 'igh': ['o', 'i'], 'oa': ['aw', 'uu'], 'ow': ['o', 'uu'], 'oi': ['aw', 'i'],
         'ar': ['o', 'r'], 'or': ['aw', 'r'], 'air': ['e', 'r'], 'ear': ['i', 'schwa', 'r']}
_cache = {}

def _load(pid):
    if pid in _cache: return _cache[pid]
    p = f'{IPA}/{pid}.ogg'
    if not os.path.exists(p): return None
    r = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True)
    if r.returncode != 0 or not r.stdout: return None   # corrupt/missing download: caller falls back to eSpeak
    raw = r.stdout
    a = np.frombuffer(raw, dtype=np.float32).copy()
    # trim leading/trailing near-silence
    thr = max(0.01, 0.04 * float(np.abs(a).max() or 1)); idx = np.where(np.abs(a) > thr)[0]
    if len(idx): a = a[max(0, idx[0] - 200): idx[-1] + 400]
    _cache[pid] = a; return a

def _join(parts, xfade=0.04):
    n = int(xfade * SR); out = parts[0]
    for p in parts[1:]:
        k = min(n, len(out), len(p)); 
        if k > 0:
            fo = np.linspace(1, 0, k, dtype=np.float32); fi = 1 - fo
            out = np.concatenate([out[:-k], out[-k:] * fo + p[:k] * fi, p[k:]])
        else: out = np.concatenate([out, p])
    return out

def human_gpc(phonemes):
    parts = []
    for ph in phonemes:
        if ph in BLEND: seg = [_load(x) for x in BLEND[ph]]; seg = None if any(s is None for s in seg) else _join(seg, 0.06)
        else: seg = _load(ph)
        if seg is None: return None
        parts.append(seg)
    return _join(parts, 0.03)

_voice = None
def piper(text, length_scale=1.12):
    global _voice
    path = os.environ.get('PIPER_VOICE')
    if not path: return None
    if _voice is None:
        from piper import PiperVoice
        _voice = PiperVoice.load(path)
    from piper.config import SynthesisConfig
    chunks = [c.audio_float_array for c in _voice.synthesize(text, SynthesisConfig(length_scale=length_scale))]
    return np.concatenate(chunks).astype(np.float32) if chunks else None
