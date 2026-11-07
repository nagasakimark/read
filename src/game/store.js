// Local-only persistence (blueprint: no accounts, no server). IndexedDB with a localStorage fallback.
// Profiles are chosen by monster colour (no names, no personal data). Progress can be exported as a code/file.
import { newState } from '../learn/mastery.js';

export const COLORS = [
  { id: 'green', hex: '#58c46a', ja: 'みどり' }, { id: 'blue', hex: '#4aa3e8', ja: 'あお' }, { id: 'orange', hex: '#f59a3c', ja: 'オレンジ' },
  { id: 'purple', hex: '#a478e8', ja: 'むらさき' }, { id: 'pink', hex: '#f27fb0', ja: 'ピンク' }, { id: 'yellow', hex: '#f2cf3c', ja: 'きいろ' },
  { id: 'red', hex: '#ec5d57', ja: 'あか' }, { id: 'teal', hex: '#35c0b4', ja: 'みずいろ' },
];

const DB = 'lets-read-english', STORE = 'profiles';
function idb() {
  return new Promise((res, rej) => {
    if (!('indexedDB' in globalThis)) return rej(new Error('no idb'));
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE, { keyPath: 'id' });
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
const tx = (db, mode, fn) => new Promise((res, rej) => { const t = db.transaction(STORE, mode); const rq = fn(t.objectStore(STORE)); t.oncomplete = () => res(rq?.result); t.onerror = () => rej(t.error); });

export class Store {
  constructor() { this.db = null; this.mem = {}; this.pending = new Map(); }
  async open() {
    try { this.db = await idb(); } catch { this.db = null; }
    if (!this.db) { try { this.mem = JSON.parse(localStorage.getItem(DB) || '{}'); } catch { this.mem = {}; } }
    try { navigator.storage?.persist?.(); } catch {}
  }
  async list() {
    if (this.db) return (await tx(this.db, 'readonly', s => s.getAll())) || [];
    return Object.values(this.mem);
  }
  async put(rec) {
    if (this.db) return tx(this.db, 'readwrite', s => s.put(rec));
    this.mem[rec.id] = rec; try { localStorage.setItem(DB, JSON.stringify(this.mem)); } catch {}
  }
  async remove(id) {
    if (this.db) return tx(this.db, 'readwrite', s => s.delete(id));
    delete this.mem[id]; try { localStorage.setItem(DB, JSON.stringify(this.mem)); } catch {}
  }
  async create(colorId) { const rec = { id: colorId, color: colorId, state: newState({ color: colorId }), updated: Date.now() }; await this.put(rec); return rec; }
  /** Debounced save of a profile's state. */
  save(rec) {
    clearTimeout(this.pending.get(rec.id));
    this.pending.set(rec.id, setTimeout(() => { rec.updated = Date.now(); this.put(rec); }, 400));
  }
  flush(rec) { clearTimeout(this.pending.get(rec.id)); rec.updated = Date.now(); return this.put(rec); }
}

// ---- progress code (copy/paste) and file export/import
const b64 = {
  enc: u8 => btoa(String.fromCharCode(...u8)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
  dec: s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)),
};
async function pipe(bytes, stream) { const r = new Response(new Blob([bytes]).stream().pipeThrough(stream)); return new Uint8Array(await r.arrayBuffer()); }
export async function toCode(state) {
  const json = new TextEncoder().encode(JSON.stringify(state));
  try { return 'LRE1.' + b64.enc(await pipe(json, new CompressionStream('deflate-raw'))); } catch { return 'LRE0.' + b64.enc(json); }
}
export async function fromCode(code) {
  const [tag, body] = code.trim().split('.');
  const bytes = b64.dec(body);
  const json = tag === 'LRE1' ? await pipe(bytes, new DecompressionStream('deflate-raw')) : bytes;
  const state = JSON.parse(new TextDecoder().decode(json));
  if (!state || state.v !== 1 || !state.items) throw new Error('bad code');
  return state;
}
