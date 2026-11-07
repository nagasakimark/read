// Phonemes and grapheme-phoneme correspondences (GPCs) for Stage 0-1 (Units 1-7).
// Blueprint: "Decision: a hybrid order" + "First-pass GPC introduction order and unit list".
// Accent decision (Phase 0): en-US  (recorded in curriculum/meta.json).

// id, IPA, eSpeak mnemonic (placeholder audio only), mouth pose, can be held?
export const PHONEMES = [
  ['s','s','s','teeth',true],   ['m','m','m','lips',true],    ['t','t','t','tongue',false],
  ['a','æ','a','open',true],    ['i','ɪ','I','smile',true],   ['n','n','n','tongue',true],
  ['p','p','p','lips',false],   ['o','ɑ','A:','open',true],   ['d','d','d','tongue',false],
  ['g','g','g','throat',false], ['k','k','k','throat',false], ['e','ɛ','E','mid',true],
  ['u','ʌ','V','mid',true],     ['r','ɹ','r','round',true],   ['h','h','h','mid',true],
  ['b','b','b','lips',false],   ['f','f','f','teethLip',true],['l','l','l','tongue',true],
  ['dj','dʒ','dZ','teeth',false],['v','v','v','teethLip',true],['w','w','w','round',true],
  ['y','j','j','smile',true],   ['z','z','z','teeth',true],
  ['sh','ʃ','S','round',true],  ['ch','tʃ','tS','teeth',false],['th','θ','T','tongueOut',true],
].map(([id,ipa,esp,mouth,cont]) => ({ id, ipa, esp, mouth, cont }));

// id, grapheme, phonemes, unit, type, mnemonic bank [word, emoji] (first = mnemonic), note
// type: single | doubled (spelling of an already-taught sound) | digraph-final | letter-name-variant
export const GPCS = [
  // Unit 1
  ['s','s',['s'],1,'single',[['sun','☀️'],['snake','🐍'],['soap','🧼']]],
  ['a','a',['a'],1,'single',[['apple','🍎'],['ant','🐜'],['astronaut','🧑‍🚀']]],
  ['m','m',['m'],1,'single',[['mouse','🐭'],['moon','🌙'],['milk','🥛']]],
  ['t','t',['t'],1,'single',[['tiger','🐯'],['tree','🌳'],['tomato','🍅']]],
  // Unit 2
  ['i','i',['i'],2,'single',[['insect','🐛'],['iguana','🦎'],['igloo','🧊']]],
  ['n','n',['n'],2,'single',[['nose','👃'],['nut','🥜'],['nest','🪺']]],
  ['p','p',['p'],2,'single',[['pig','🐷'],['pizza','🍕'],['panda','🐼']]],
  // Unit 3
  ['o','o',['o'],3,'single',[['octopus','🐙'],['otter','🦦'],['ostrich','🦤']]],
  ['d','d',['d'],3,'single',[['dog','🐶'],['duck','🦆'],['door','🚪']]],
  ['g','g',['g'],3,'single',[['goat','🐐'],['gorilla','🦍'],['guitar','🎸']]],
  ['c','c',['k'],3,'single',[['cat','🐱'],['cake','🍰'],['cow','🐄']]],
  // Unit 4
  ['k','k',['k'],4,'single',[['kite','🪁'],['key','🔑'],['kangaroo','🦘']]],
  ['e','e',['e'],4,'single',[['egg','🥚'],['elephant','🐘'],['envelope','✉️']]],
  ['u','u',['u'],4,'single',[['umbrella','☂️'],['up','⬆️'],['umpire','🧑‍⚖️']]],
  ['r','r',['r'],4,'single',[['rabbit','🐰'],['rain','🌧️'],['robot','🤖']]],
  ['h','h',['h'],4,'single',[['hat','🎩'],['horse','🐴'],['house','🏠']]],
  // Unit 5  (b is the only new sound; f/l new letters; ff ll ss ck are final spellings of known sounds)
  ['b','b',['b'],5,'single',[['banana','🍌'],['bus','🚌'],['bear','🐻']]],
  ['f','f',['f'],5,'single',[['fish','🐟'],['frog','🐸'],['fox','🦊']]],
  ['l','l',['l'],5,'single',[['lion','🦁'],['lemon','🍋'],['leaf','🍃']]],
  ['ff','ff',['f'],5,'doubled',null,[['leaf','🍃'],['wolf','🐺'],['roof','🏠']]],
  ['ll','ll',['l'],5,'doubled',null,[['bell','🔔'],['doll','🪆'],['hill','⛰️']]],
  ['ss','ss',['s'],5,'doubled',null,[['kiss','💋'],['bus','🚌'],['grass','🌱']]],
  ['ck','ck',['k'],5,'digraph-final',null,[['duck','🦆'],['sock','🧦'],['clock','🕐']]],
  // Unit 6
  ['j','j',['dj'],6,'single',[['juice','🧃'],['jet','✈️'],['jam','🍓']]],
  ['v','v',['v'],6,'single',[['van','🚐'],['violin','🎻'],['volcano','🌋']]],
  ['w','w',['w'],6,'single',[['watch','⌚'],['worm','🪱'],['window','🪟']]],
  ['x','x',['k','s'],6,'single',null,[['box','📦'],['fox','🦊'],['six','6️⃣']]],
  ['y','y',['y'],6,'single',[['yo-yo','🪀'],['yellow','💛'],['yak','🦬']]],
  ['z','z',['z'],6,'single',[['zebra','🦓'],['zipper','🤐'],['zoo','🦒']]],
  ['zz','zz',['z'],6,'doubled',null,[['buzz','🐝'],['fizz','🥤'],['jazz','🎷']]],
  ['qu','qu',['k','w'],6,'digraph',[['queen','👑'],['quilt','🛏️'],['quail','🐦']]],
  // Unit 7: the same letter s, now saying /z/ at the end of a word
  ['sz','s',['z'],7,'single',null,[['dogs','🐶'],['pigs','🐷'],['hens','🐔']]],
  // Unit 8: digraphs (two letters, ONE sound)
  ['sh','sh',['sh'],8,'digraph',[['ship','🚢'],['shoe','👟'],['sheep','🐑']]],
  ['ch','ch',['ch'],8,'digraph',[['chair','🪑'],['cheese','🧀'],['chicken','🐔']]],
  ['th','th',['th'],8,'digraph',[['thumb','👍'],['three','3️⃣'],['thunder','⛈️']]],
].map(([id,g,ph,unit,type,bank,fbank]) => ({ id, g, ph, unit, type, ...(bank ? { bank } : {}), ...(fbank ? { fbank } : {}) }));

// Plural-/s/ contrast words used as lures when teaching final /z/ (sz). Not GPC data; build copies it to meta.
export const S_FINAL_BANK = [['cats','🐱'],['hats','🎩'],['cups','🥤']];
