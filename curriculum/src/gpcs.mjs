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
  ['dh','ð','D','tongueOut',true], ['ng','ŋ','N','throat',true],
  // Stage 4 vowels (en-US)
  ['ee','iː','i:','smile',true], ['oo','uː','u:','round',true], ['ai','eɪ','eI','smile',true], ['oa','oʊ','oU','round',true],
  ['igh','aɪ','aI','open',true], ['ow','aʊ','aU','open',true], ['oi','ɔɪ','OI','round',true], ['uu','ʊ','U','round',true],
  ['ar','ɑr','A@','open',true], ['or','ɔr','O@','round',true], ['ur','ɜr','3:','mid',true], ['air','ɛr','e@','open',true], ['ear','ɪr','i@','smile',true],
  // Stage 5
  ['aw','ɔ','O:','round',true],
  // Stage 6
  ['schwa','ə','@','mid',true], ['zh','ʒ','Z','round',true],
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
  ['i','i',['i'],2,'single',[['insect','🐛'],['iguana','🦎'],['inch','📏']]],
  ['n','n',['n'],2,'single',[['nose','👃'],['nut','🥜'],['nest','🪺']]],
  ['p','p',['p'],2,'single',[['pig','🐷'],['pizza','🍕'],['panda','🐼']]],
  // Unit 3
  ['o','o',['o'],3,'single',[['octopus','🐙'],['otter','🦦'],['ox','🐂']]],
  ['d','d',['d'],3,'single',[['dog','🐶'],['duck','🦆'],['door','🚪']]],
  ['g','g',['g'],3,'single',[['goat','🐐'],['gorilla','🦍'],['guitar','🎸']]],
  ['c','c',['k'],3,'single',[['cat','🐱'],['cake','🍰'],['cow','🐄']]],
  // Unit 4
  ['k','k',['k'],4,'single',[['kite','🪁'],['key','🔑'],['kangaroo','🦘']]],
  ['e','e',['e'],4,'single',[['egg','🥚'],['elephant','🐘'],['envelope','✉️']]],
  ['u','u',['u'],4,'single',[['umbrella','☂️'],['up','⬆️'],['uncle','👨']]],
  ['r','r',['r'],4,'single',[['rabbit','🐰'],['rain','🌧️'],['robot','🤖']]],
  ['h','h',['h'],4,'single',[['hat','🎩'],['horse','🐴'],['house','🏠']]],
  // Unit 5  (b is the only new sound; f/l new letters; ff ll ss ck are final spellings of known sounds)
  ['b','b',['b'],5,'single',[['banana','🍌'],['bus','🚌'],['bear','🐻']]],
  ['f','f',['f'],5,'single',[['fish','🐟'],['frog','🐸'],['fox','🦊']]],
  ['l','l',['l'],5,'single',[['lion','🦁'],['lemon','🍋'],['leaf','🍃']]],
  ['ff','ff',['f'],5,'doubled',null,[['leaf','🍃'],['wolf','🐺'],['roof','🏠']]],
  ['ll','ll',['l'],5,'doubled',null,[['bell','🔔'],['doll','🪆'],['hill','⛰️']]],
  ['ss','ss',['s'],5,'doubled',null,[['kiss','😘'],['bus','🚌'],['grass','🌱']]],
  ['ck','ck',['k'],5,'digraph-final',null,[['duck','🦆'],['sock','🧦'],['clock','🕐']]],
  // Unit 6
  ['j','j',['dj'],6,'single',[['juice','🧃'],['jet','✈️'],['jam','🍓']]],
  ['v','v',['v'],6,'single',[['van','🚐'],['violin','🎻'],['volcano','🌋']]],
  ['w','w',['w'],6,'single',[['watch','⌚'],['worm','🪱'],['window','🪟']]],
  ['x','x',['k','s'],6,'single',null,[['box','📦'],['fox','🦊'],['six','6️⃣']]],
  ['y','y',['y'],6,'single',[['yo-yo','🪀'],['yellow','💛'],['yarn','🧶']]],
  ['z','z',['z'],6,'single',[['zebra','🦓'],['zero','0️⃣'],['zoo','🐘']]],
  ['zz','zz',['z'],6,'doubled',null,[['buzz','🐝'],['fizz','🥤'],['jazz','🎷']]],
  ['qu','qu',['k','w'],6,'digraph',[['queen','👑'],['quack','🦆'],['quiz','❓']]],
  // Unit 7: the same letter s, now saying /z/ at the end of a word
  ['sz','s',['z'],7,'single',null,[['dogs','🐶'],['pigs','🐷'],['hens','🐔']]],
  // Unit 8: digraphs (two letters, ONE sound)
  ['sh','sh',['sh'],8,'digraph',[['ship','🚢'],['shoe','👟'],['sheep','🐑']]],
  ['ch','ch',['ch'],8,'digraph',[['chair','🪑'],['cheese','🧀'],['chicken','🐔']]],
  // Unit 9: th, both sounds
  ['th','th',['th'],9,'digraph',[['thumb','👍'],['three','3️⃣'],['thunder','⛈️']]],
  ['thv','th',['dh'],9,'digraph',[['this','👉'],['that','👈'],['them','👥']]],
  // Unit 10: ng / nk (final only)
  ['ng','ng',['ng'],10,'digraph-final',null,[['ring','💍'],['king','🤴'],['sing','🎤']]],
  ['nk','nk',['ng','k'],10,'digraph-final',null,[['bank','🏦'],['sink','🚰'],['junk','🗑️']]],

  // ---- Stage 4: vowel sounds. vbank = pictured words that CONTAIN the sound (mnemonic first). type vowel-open can end a word.
  ['ee','ee',['ee'],17,'vowel-open',null,null,[['tree','🌳'],['sheep','🐑'],['bee','🐝'],['feet','🦶']]],
  ['oo','oo',['oo'],17,'vowel-open',null,null,[['moon','🌙'],['spoon','🥄'],['zoo','🦒'],['boot','🥾']]],
  ['ai','ai',['ai'],18,'vowel',null,null,[['rain','🌧️'],['train','🚂'],['snail','🐌'],['mail','📬']]],
  ['oa','oa',['oa'],18,'vowel',null,null,[['boat','⛵'],['goat','🐐'],['coat','🧥'],['soap','🧼']]],
  ['igh','igh',['igh'],19,'vowel-open',null,null,[['night','🌃'],['light','💡'],['high','🧗'],['flight','✈️']]],
  ['ow_au','ow',['ow'],19,'vowel-open',null,null,[['cow','🐄'],['clown','🤡'],['owl','🦉'],['crown','👑']]],
  ['oi','oi',['oi'],19,'vowel',null,null,[['coin','🪙'],['oil','🛢️'],['boil','♨️'],['foil','🧻']]],
  ['oo_s','oo',['uu'],20,'vowel',null,null,[['book','📖'],['foot','🦶'],['wood','🪵'],['hook','🪝']]],
  ['ar','ar',['ar'],20,'vowel-open',null,null,[['car','🚗'],['star','⭐'],['shark','🦈'],['farm','🚜']]],
  ['or','or',['or'],20,'vowel-open',null,null,[['fork','🍴'],['corn','🌽'],['storm','⛈️'],['horse','🐴']]],
  ['ur','ur',['ur'],21,'vowel-open',null,null,[['turtle','🐢'],['purple','🟣'],['nurse','🧑‍⚕️'],['burger','🍔']]],
  ['er','er',['ur'],21,'vowel-open',null,null,[['letter','✉️'],['ladder','🪜'],['hammer','🔨'],['sister','👧']]],
  ['air','air',['air'],21,'vowel-open',null,null,[['hair','💇'],['chair','🪑'],['stair','🪜'],['pear','🍐']]],
  ['ear','ear',['ear'],21,'vowel-open',null,null,[['ear','👂'],['deer','🦌'],['beard','🧔'],['gear','⚙️']]],
  ['y_i','y',['ee'],22,'vowel-open',null,null,[['bunny','🐰'],['puppy','🐶'],['baby','👶'],['happy','😊']]],
  ['y_ai','y',['igh'],22,'vowel-open',null,null,[['fly','🪰'],['sky','🌌'],['spy','🕵️'],['cry','😢']]],

  // ---- Stage 5: split digraphs (the vowel letter + a later silent e), alternative spellings, alternative pronunciations.
  // 'split' = vowel letter whose e comes later (shown a_e); 'silent' = that e as its own tile, with no sound; 'initial' = word-start only.
  ['a_e','a',['ai'],23,'split',null,null,[['cake','🍰'],['snake','🐍'],['plate','🍽️'],['lake','🏞️']]],
  ['i_e','i',['igh'],23,'split',null,null,[['bike','🚲'],['kite','🪁'],['slide','🛝'],['smile','😊']]],
  ['e_s','e',[],23,'silent'],
  ['o_e','o',['oa'],24,'split',null,null,[['home','🏠'],['nose','👃'],['rope','🪢'],['bone','🦴']]],
  ['u_e','u',['y','oo'],24,'split',null,null,[['cube','🧊'],['cute','🥰'],['mule','🫏'],['mute','🔇']]],
  ['u_e_oo','u',['oo'],24,'split',null,null,[['tube','🧪'],['flute','🪈'],['rule','📏'],['dune','🏜️']]],
  ['e_e','e',['ee'],24,'split',null,null,[['these','👉'],['theme','🎨'],['Steve','👦'],['Pete','👦']]],
  ['ay','ay',['ai'],25,'vowel-open',null,null,[['day','🌞'],['play','🎮'],['hay','🌾'],['clay','🏺']]],
  ['ea_i','ea',['ee'],26,'vowel-open',null,null,[['eat','🍽️'],['sea','🌊'],['tea','🍵'],['leaf','🍃']]],
  ['e_open','e',['ee'],26,'vowel-open',null,null,[['he','👦'],['me','🙋'],['we','👫'],['she','👧']]],
  ['ey','ey',['ee'],26,'vowel-open',null,null,[['key','🔑'],['donkey','🫏'],['turkey','🦃'],['valley','🏞️']]],
  ['ow_ou','ow',['oa'],27,'vowel-open',null,null,[['snow','⛄'],['window','🪟'],['rainbow','🌈'],['yellow','💛']]],
  ['o_open','o',['oa'],27,'vowel-open',null,null,[['go','🚶'],['no','🚫'],['old','👴'],['gold','🥇']]],
  ['oe','oe',['oa'],27,'vowel-open',null,null,[['toe','🦶'],['doe','🦌'],['Joe','👦']]],
  ['ie','ie',['igh'],27,'vowel-open',null,null,[['pie','🥧'],['tie','👔'],['flies','🪰'],['cried','😢']]],
  ['i_open','i',['igh'],27,'vowel-open',null,null,[['hi','👋'],['find','🔎'],['child','🧒'],['tiger','🐯']]],
  ['ew','ew',['oo'],28,'vowel-open',null,null,[['new','🆕'],['blew','💨'],['grew','🌱'],['flew','🕊️']]],
  ['ue','ue',['oo'],28,'vowel-open',null,null,[['blue','🟦'],['glue','🧴'],['clue','🔍'],['true','✅']]],
  ['ir','ir',['ur'],28,'vowel',null,null,[['bird','🐦'],['girl','👧'],['shirt','👕'],['dirt','🟫']]],
  ['wor','wor',['w','ur'],28,'vowel',null,null,[['word','📝'],['worm','🪱'],['world','🌍'],['work','💼']]],
  ['ou','ou',['ow'],29,'vowel',null,null,[['house','🏠'],['mouse','🐭'],['cloud','☁️'],['mouth','👄']]],
  ['oy','oy',['oi'],29,'vowel-open',null,null,[['toy','🧸'],['boy','👦'],['joy','😄'],['cowboy','🤠']]],
  ['aw','aw',['aw'],29,'vowel-open',null,null,[['saw','🪚'],['paw','🐾'],['claw','🦞'],['straw','🥤']]],
  ['au','au',['aw'],29,'vowel',null,null,[['launch','🚀'],['haul','🚛'],['vault','🏦'],['haunt','👻']]],
  ['ea_e','ea',['e'],30,'vowel',null,null,[['bread','🍞'],['head','🗣️'],['feather','🪶'],['weather','🌦️']]],
  ['ie_i','ie',['ee'],30,'vowel',null,null,[['field','🌾'],['shield','🛡️'],['chief','🧑‍✈️']]],
  ['c_soft','c',['s'],30,'initial',[['city','🏙️'],['circus','🎪'],['cent','🪙']]],
  ['g_soft','g',['dj'],30,'initial',[['giraffe','🦒'],['gym','🏋️'],['gem','💎']]],
  ['ch_k','ch',['k'],30,'initial',[['school','🏫'],['chorus','🎶'],['Christmas','🎄']]],
  ['ph','ph',['f'],31,'initial',[['phone','📱'],['photo','📷'],['pharmacy','💊']]],
  ['wh','wh',['w'],31,'initial',[['whale','🐋'],['wheel','🛞'],['white','🤍']]],
  ['tch','tch',['ch'],31,'digraph-final',null,[['witch','🧙'],['match','🔥'],['stitch','🪡']]],
  ['dge','dge',['dj'],31,'digraph-final',null,[['bridge','🌉'],['fudge','🍫'],['badge','🏅'],['judge','👩‍⚖️']]],
  ['kn','kn',['n'],31,'initial',[['knee','🦵'],['knock','🚪'],['knot','🪢']]],
  ['wr','wr',['r'],31,'initial',[['write','✍️'],['wrap','🎁'],['wrist','⌚']]],
  ['mb','mb',['m'],31,'digraph-final',null,[['lamb','🐑'],['comb','🪮'],['thumb','👍'],['climb','🧗']]],
  ['ve','ve',['v'],31,'digraph-final',null,[['give','🎁'],['olive','🫒'],['live','❤️']]],

  // ---- Stage 6: syllable endings and weak vowels. 'ending' = word-final syllable spelling (never a lure position); 'schwa' = the weak vowel.
  ['le','le',['schwa','l'],33,'ending',null,[['apple','🍎'],['candle','🕯️'],['bubble','🫧'],['turtle','🐢']]],
  ['schwa','a',['schwa'],33,'schwa',null,null,[['banana','🍌'],['sofa','🛋️'],['zebra','🦓'],['pizza','🍕']]],
  ['a_open','a',['ai'],33,'vowel-open',null,null,[['table','🍽️'],['baby','👶'],['paper','📄'],['lady','👩']]],
  ['tion','tion',['sh','schwa','n'],37,'ending',null,[['station','🚉'],['nation','🏳️'],['lotion','🧴']]],
  ['sion','sion',['zh','schwa','n'],37,'ending',null,[['vision','👓'],['television','📺'],['division','➗']]],
  ['ture','ture',['ch','ur'],37,'ending',null,[['picture','🖼️'],['nature','🌿'],['creature','🦎']]],
  // suffix -ed: one spelling, three sounds. Taught as word endings (unit 16 patterns), never as stand-alone sound cards.
  ['ed_t','ed',['t'],16,'suffix',null,null],
  ['ed_d','ed',['d'],16,'suffix',null,null],
  ['ed_id','ed',['i','d'],16,'suffix',null,null],
].map(([id,g,ph,unit,type,bank,fbank,vbank]) => ({ id, g, ph, unit, type, ...(bank ? { bank } : {}), ...(fbank ? { fbank } : {}), ...(vbank ? { vbank } : {}) }));

// Plural-/s/ contrast words used as lures when teaching final /z/ (sz). Not GPC data; build copies it to meta.
export const S_FINAL_BANK = [['cats','🐱'],['hats','🎩'],['cups','🥤']];
