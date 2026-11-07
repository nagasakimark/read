// Tricky ("heart") words. parts: '*' marks the irregular part. Blueprint: Strand T --
// map the regular parts, flag the irregular part; flips to decodable when its GPC is taught.
// [text, parts, releaseUnit, decodableFromUnit|null, noteEn, noteJa]
export const TRICKY = [
  ['I',['*I'],2,null,'I says its name: "eye".','I は「アイ」とよむよ'],
  ['a',['*a'],3,null,'In "a" the letter says /ə/ (uh).','a は「ア」じゃなくて「ウ」みたいに よむよ'],
  ['the',['*the'],3,null,'"the" is tricky: /ðə/.','the は とくべつ'],
  ['to',['t','*o'],4,null,'o says /uː/ (oo).','o は「ウー」'],
  ['no',['n','*o'],4,null,'o says /oʊ/ (oh).','o は「オウ」'],
  ['go',['g','*o'],4,null,'o says /oʊ/ (oh).','o は「オウ」'],
  ['is',['i','*s'],5,7,'s says /z/ here (it is a z sound).','s は「ズ」とよむよ'],
  ['of',['*o','*f'],5,null,'"of" is tricky: /əv/.','of は とくべつ'],
  ['he',['h','*e'],6,26,'e says /iː/ (ee).','e は「イー」'],
  ['we',['w','*e'],6,26,'e says /iː/ (ee).','e は「イー」'],
  ['me',['m','*e'],6,26,'e says /iː/ (ee).','e は「イー」'],
  ['be',['b','*e'],6,26,'e says /iː/ (ee).','e は「イー」'],
  ['you',['y','*ou'],6,null,'"ou" says /uː/ here.','ou は「ウー」'],
  ['like',['l','*i','k','*e'],7,23,'i...e says /aɪ/ (eye).','i と e で「アイ」'],
  ['do',['d','*o'],7,null,'o says /uː/ (oo).','o は「ウー」'],
  ['said',['s','*ai','d'],7,null,'ai says /ɛ/ (eh).','ai は「エ」'],
];
