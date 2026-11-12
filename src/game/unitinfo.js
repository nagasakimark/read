// Child-facing names for units and stages. Teachers' notation (a_e, ^st, af:un) never reaches the child:
// every unit is shown as a friendly name plus one example word with its new letters highlighted.
// ex: example word, hi: mask of letters to colour ('x' = new letters), ja/en: short names.
export const UNIT_INFO = {
  0: { ja: 'おとあそび', en: 'Sound games', ex: '', hi: '' },
  1: { ja: 'はじめの もじ', en: 'First letters', ex: 'sat', hi: 'xxx' },
  2: { ja: 'i n p', en: 'More letters', ex: 'pin', hi: 'xxx' },
  3: { ja: 'o d g c', en: 'More letters', ex: 'dog', hi: 'xxx' },
  4: { ja: 'k e u r h', en: 'More letters', ex: 'hen', hi: 'xx.' },
  5: { ja: 'b f l', en: 'Double letters', ex: 'bell', hi: 'x.xx' },
  6: { ja: 'j v w x y z', en: 'Last letters', ex: 'fox', hi: '..x' },
  7: { ja: 's が z の おと', en: 's sounds like z', ex: 'dogs', hi: '...x' },
  8: { ja: 'ふたもじ sh ch', en: 'Two letters, one sound', ex: 'ship', hi: 'xx..' },
  9: { ja: 'ふたもじ th', en: 'Two letters, one sound', ex: 'this', hi: 'xx..' },
  10: { ja: 'ng と nk', en: 'Ringing sounds', ex: 'ring', hi: '..xx' },
  11: { ja: 'おわりの ふたつ', en: 'Ending blends', ex: 'hand', hi: '..xx' },
  12: { ja: 's で はじまる', en: 's-blends', ex: 'stop', hi: 'xx..' },
  13: { ja: 'l の なかま', en: 'l-blends', ex: 'flag', hi: 'xx..' },
  14: { ja: 'r の なかま', en: 'r-blends', ex: 'frog', hi: 'xx..' },
  15: { ja: 'みっつ と ing', en: 'Big blends & -ing', ex: 'string', hi: 'xxx.xx' },
  16: { ja: 'ed の おわり', en: 'Past -ed', ex: 'jumped', hi: '....xx' },
  17: { ja: 'ee と oo', en: 'Long ee, oo', ex: 'feet', hi: '.xx.' },
  18: { ja: 'ai と oa', en: 'Long ai, oa', ex: 'boat', hi: '.xx.' },
  19: { ja: 'igh ow oi', en: 'Long vowels', ex: 'night', hi: '.xxx.' },
  20: { ja: 'ar と or', en: 'Car & fork', ex: 'car', hi: '.xx' },
  21: { ja: 'ur er air ear', en: 'r-vowels', ex: 'hair', hi: '.xxx' },
  22: { ja: 'y の おと', en: 'y as a vowel', ex: 'sky', hi: '..x' },
  23: { ja: 'マジック e', en: 'Magic e', ex: 'cake', hi: '.x.x' },
  24: { ja: 'マジック e 2', en: 'More magic e', ex: 'bone', hi: '.x.x' },
  25: { ja: 'ay', en: 'Long a: ay', ex: 'play', hi: '..xx' },
  26: { ja: 'ea と ey', en: 'Long e spellings', ex: 'sea', hi: '.xx' },
  27: { ja: 'ow と ie', en: 'Long o & i', ex: 'snow', hi: '..xx' },
  28: { ja: 'ew ue ir', en: 'More vowels', ex: 'bird', hi: '.xx.' },
  29: { ja: 'ou oy aw', en: 'Funny vowels', ex: 'toy', hi: '.xx' },
  30: { ja: 'もう ひとつの おと', en: 'Other sounds', ex: 'city', hi: 'x...' },
  31: { ja: 'めずらしい つづり', en: 'Tricky spellings', ex: 'phone', hi: 'xx...' },
  32: { ja: 'ながい ことば', en: 'Syllables', ex: 'rabbit', hi: '......' },
  33: { ja: 'le の おわり', en: '-le words', ex: 'apple', hi: '...xx' },
  34: { ja: 'おわりに つける', en: 'Word endings', ex: 'helpful', hi: '....xxx' },
  35: { ja: 'まえに つける', en: 'Word beginnings', ex: 'undo', hi: 'xx..' },
  36: { ja: 'つづりの きまり', en: 'Spelling rules', ex: 'hopping', hi: '..xxxxx' },
  37: { ja: 'tion ture', en: 'Long endings', ex: 'station', hi: '...xxxx' },
  38: { ja: 'すらすら よもう', en: 'Reading bridge', ex: 'story', hi: '' },
};
export const STAGE_INFO = {
  0: { ja: 'おとあそび', en: 'Sound games' },
  1: { ja: 'もじと おと', en: 'Letter sounds' },
  2: { ja: 'ふたもじ', en: 'Two letters, one sound' },
  3: { ja: 'ならぶ おと', en: 'Blends' },
  4: { ja: 'ながい おと', en: 'Long vowels' },
  5: { ja: 'マジック e と つづり', en: 'Magic e & spellings' },
  6: { ja: 'ながい ことば', en: 'Long words' },
  7: { ja: 'すらすら よもう', en: 'Reading bridge' },
};
export const unitInfo = id => UNIT_INFO[id] || { ja: '', en: 'Unit ' + id, ex: '', hi: '' };

/** Draw an example word with its new letters in colour, fitting `maxW`. */
export function drawExample(c, info, x, y, size, maxW, col, ink, font) {
  const w = info.ex; if (!w) return;
  c.font = `bold ${size}px ${font}`; let tw = c.measureText(w).width;
  if (tw > maxW) { size = Math.floor(size * maxW / tw); c.font = `bold ${size}px ${font}`; tw = c.measureText(w).width; }
  let cx = x - tw / 2; c.textAlign = 'left'; c.textBaseline = 'middle';
  for (let i = 0; i < w.length; i++) { c.fillStyle = info.hi[i] === 'x' ? col : ink; c.fillText(w[i], cx, y); cx += c.measureText(w[i]).width; }
  c.textAlign = 'center';
}

/** How a letter-sound is written for a child: split digraphs as 'a-e', s-as-z simply as 's'. */
export const gLabel = g => (g.id === 'sz' ? 's' : g.type === 'split' ? g.g + '-e' : g.g);
