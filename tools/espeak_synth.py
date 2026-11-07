#!/usr/bin/env python3
"""Placeholder audio generator (eSpeak NG via the espeakng-loader wheel).

PLACEHOLDER ONLY. The blueprint calls for recorded human audio (pure phonemes,
no added schwa). This script gives the engine *something* to play so the app is
testable end to end. Replace files in audio/ with real recordings (see
tools/recorder.html) and nothing else needs to change.

usage: espeak_synth.py <out.wav> <text-or-[[phonemes]]> [rate_wpm] [pitch]
"""
import ctypes, sys, wave, array, espeakng_loader

lib = ctypes.CDLL(espeakng_loader.get_library_path())
CB = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.c_void_p)
lib.espeak_Initialize.restype = ctypes.c_int
rate_hz = lib.espeak_Initialize(1, 0, espeakng_loader.get_data_path().encode(), 0)
lib.espeak_SetVoiceByName(b"en-us")
_buf = array.array('h')

@CB
def _cb(wav, n, ev):
    if wav and n > 0:
        _buf.extend(wav[:n])
    return 0
lib.espeak_SetSynthCallback(_cb)

def synth(text, rate=130, pitch=65, amp=100):
    del _buf[:]
    lib.espeak_SetParameter(1, int(rate), 0)   # espeakRATE
    lib.espeak_SetParameter(3, int(pitch), 0)  # espeakPITCH
    lib.espeak_SetParameter(2, int(amp), 0)    # espeakVOLUME
    data = text.encode('utf-8')
    lib.espeak_Synth(data, len(data) + 1, 0, 0, 0, 1, None, None)  # chars_utf8
    lib.espeak_Synchronize()
    return array.array('h', _buf)

def write_wav(path, samples):
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate_hz)
        w.writeframes(samples.tobytes())

if __name__ == '__main__':
    out, text = sys.argv[1], sys.argv[2]
    rate = int(sys.argv[3]) if len(sys.argv) > 3 else 130
    pitch = int(sys.argv[4]) if len(sys.argv) > 4 else 65
    s = synth(text, rate, pitch)
    write_wav(out, s)
    print(f"{out}: {len(s)/rate_hz:.2f}s @ {rate_hz}Hz")
