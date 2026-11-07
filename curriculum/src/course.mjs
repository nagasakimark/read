// THE COURSE MAP: the complete teaching order from first sounds to comfortable reading (Stages 0-7, Units 0-38).
// This is the single source of truth for scope & sequence. docs/COURSE_PLAN.md is GENERATED from it
// (tools/build_course_doc.mjs) and tools/validate.mjs cross-checks it against the authored content in
// units.mjs / gpcs.mjs / words.mjs / stories.mjs. Order follows docs/BLUEPRINT.md ("hybrid order"); every
// number marked DR is a design recommendation to validate with real children.
//
// A unit is either AUTHORED (it also exists in units.mjs: words, stories, audio, lessons) or PLANNED (specified
// here only). Authoring a planned unit = add its GPCs/words/stories to the other files; the status flips itself.

// ---- Strand weights: P phonics, A phonemic awareness, T tricky words, V vocabulary/oral language, F fluency, C comprehension
//      ● core  ◐ active  ○ light/maintenance  — not yet
export const STAGES = [
  { id: 0, name: 'Sound start', ja: 'おとあそび', units: [0], strands: 'P— A● T— V● F— C◐',
    exit: 'Isolates the first sound of known words; hears same/different words; taps syllables.',
    why: 'Phoneme awareness linked to letters is the strongest foundation; this stage is oral, brief and skippable by placement. Initial-sound work comes before rhyme (alliteration is easier).',
    risk: 'Japanese kana are mora-based (か = /k/+/a/), so single consonants have no native "address": hold continuous sounds, keep vowels off consonants.' },
  { id: 1, name: 'Alphabet code', ja: 'もじと おと', units: [1, 2, 3, 4, 5, 6, 7], strands: 'P● A◐ T◐ V● F○ C◐',
    exit: 'Decodes unseen CVC pseudo-words from the 26 letters + ff/ll/ss/ck/zz/qu and reads 1–3 sentence ditties.',
    why: 'Systematic synthetic phonics: grapheme-phoneme correspondences taught explicitly, blended left to right, spelled by segmenting. Continuous sounds first; confusable letters (b/d, i/e) separated.',
    risk: 'Final-consonant vowel insertion ("map" → "mapu"), r/l, b/v, short a/o/u. Contrast packs unlock as both members are taught.' },
  { id: 2, name: 'Consonant digraphs', ja: 'ふたもじ ひとおと', units: [8, 9, 10], strands: 'P● A○ T◐ V● F◐ C◐',
    exit: 'Reads and spells sh/ch/th/ng/nk words; reads 4–8 page stories.',
    why: 'A digraph is ONE sound and is taught as one tile (WWC). Introduced while vowels are still all short so each lesson adds one new difficulty.',
    risk: 's/sh, th/s/z (heard as /s/ /z/ or /t/ /d/), final /ŋ/ + inserted /g/ or "gu".' },
  { id: 3, name: 'Adjacent consonants and first inflections', ja: 'ならぶ しいん', units: [11, 12, 13, 14, 15, 16], strands: 'P● A◐ T◐ V● F◐ C◐',
    exit: 'Reads and spells CVCC / CCVC / CCCVC words, and words with -ing / -ed, with no inserted vowels.',
    why: 'Clusters are the biggest Japanese-specific hazard (CV syllable habit), so they come EARLY while vowels are short: final clusters before initial (Letters & Sounds Phase 4 logic). Clusters are blended sound by sound, never memorised as chunks.',
    risk: 'Epenthetic vowels (hand → "hando", stop → "sutoppu"); r/l inside clusters; -ed as "edo"/"to".' },
  { id: 4, name: 'Long vowels and other vowels, one spelling each', ja: 'ながい おと', units: [17, 18, 19, 20, 21, 22], strands: 'P● A○ T◐ V● F● C◐',
    exit: 'Knows the "simple code" (one spelling per sound); reads short decodable books.',
    why: 'One spelling per sound first (limits spelling load; DfE simple-then-complex code). Order suits Japanese phonology: ee/oo (length is a native strength) before the English diphthongs ai/oa/igh/ow/oi.',
    risk: 'Flattened diphthongs (cake → "keeki"), i/ee, oo/oo (book/moon), rhotic vowels (ar/or/ur/er/air/ear; accent en-US).' },
  { id: 5, name: 'Split digraphs, alternative spellings and pronunciations', ja: 'おなじ おと ちがう つづり', units: [23, 24, 25, 26, 27, 28, 29, 30, 31], strands: 'P● A○ T○ V● F● C●',
    exit: 'Chooses between alternatives when reading ("tries the other sound") and when spelling; reads short chapter-like texts.',
    why: 'Alternatives are added only after the first spelling of that sound is secure. "Try the other sound" needs the word to be known orally, so vocabulary leads. Use ONE term ("split digraph") consistently (DfE fidelity guidance).',
    risk: 'Needs oral vocabulary to self-check a decoding attempt; ea/ow/ie/ch have 2+ pronunciations.' },
  { id: 6, name: 'Multisyllable words and morphology', ja: 'ながい ことば', units: [32, 33, 34, 35, 36, 37], strands: 'P● A○ T○ V● F● C●',
    exit: 'Decodes 2–3 syllable words; uses prefixes/suffixes to read and spell; handles schwa with "say it, then fix it".',
    why: 'Syllable types + division rules turn long words into familiar chunks; affixes carry meaning (morphology absent in Japanese, so explicit teaching).',
    risk: 'Stress and weak vowels are unfamiliar (Japanese is mora-timed); plural/past morphology has no Japanese counterpart.' },
  { id: 7, name: 'Fluency and reading-for-meaning bridge', ja: 'すらすら よもう', units: [38], strands: 'P◐ A— T— V● F● C●',
    exit: 'Rising rate on unpractised text; reads less-controlled texts with comprehension.',
    why: 'No new GPCs. After decoding is secure, vocabulary and knowledge limit comprehension (Castles et al.), so the filter switches from "% decodable" to "% of words known orally".',
    risk: 'Vocabulary, not code, holds Japanese EFL readers back; connected speech/weak forms are practised in listening only.' },
];

// ---- Special lesson variants by unit kind: how the standard 9-step template changes (see COURSE_PLAN.md)
export const KINDS = {
  oral: { label: 'Oral listening', template: 'Short games only, no print. Same/different words, first sounds, syllable taps.', activities: ['same-different', 'initial-sound', 'syllable'] },
  code: { label: 'New letter-sound(s)', template: 'Standard 9-step template. 1-2 new GPCs per lesson (max 2 in Stage 1).', activities: ['meet', 'listen-pick', 'recall-flash', 'blend-choose', 'spell-tiles', 'read-match', 'word-chain', 'pseudo', 'heart', 'dictation', 'story'] },
  digraph: { label: 'Digraph (two letters, one sound)', template: 'Standard template; the digraph is ONE tile; minimal-pair listening before print.', activities: ['meet', 'minimal-pair', 'spell-tiles (digraph = one tile)', 'blend-choose', 'word-chain', 'pseudo', 'story'] },
  cluster: { label: 'Adjacent consonants (no new GPCs)', template: 'Stretch-and-segment: one Elkonin box per sound, tiles per letter. Contrast "real word" vs "word + extra vowel" in listening. Blend sound by sound, never as chunks.', activities: ['cluster-segment (new)', 'epenthesis-listen (word vs word+vowel pack)', 'blend-choose', 'spell-tiles', 'word-chain', 'pseudo', 'story'] },
  inflection: { label: 'Inflection (-ing, -ed)', template: 'Word sums (base + ending), ending-sound sort (/t/ /d/ /ɪd/), spell by adding the ending to a known base.', activities: ['word-sum (new)', 'ed-sound-sort (new)', 'spell-tiles', 'dictation', 'story'] },
  vowel: { label: 'Vowel sound, one spelling', template: 'Standard template plus length/glide modelling in the mouth cue; sorts against the nearest short vowel.', activities: ['meet', 'minimal-pair', 'sort (new)', 'blend-choose', 'spell-tiles', 'pseudo', 'story'] },
  split: { label: 'Split digraph', template: 'The two letters are one unit with a gap: tiles with a gap slot. Word chains between short and long vowel words (cap → cape).', activities: ['split-tiles (new)', 'word-chain', 'sort (new)', 'spell-tiles', 'pseudo', 'story'] },
  altspell: { label: 'Alternative spelling of a known sound', template: 'Sound is known; teach another way to write it. Sort by sound, choose the right spelling in a word, keep a "spelling map" of the sound.', activities: ['sort (new)', 'choose-spelling (new)', 'spell-tiles', 'dictation', 'story'] },
  altpron: { label: 'Alternative pronunciation of a known spelling', template: '"Try the other sound": decode → check against a word you know → if it is not a word, try the other sound. Needs oral vocabulary.', activities: ['try-other-sound (new)', 'sort (new)', 'blend-choose', 'story'] },
  syllable: { label: 'Syllables', template: 'Chop the word, label syllable types, then blend chunk by chunk.', activities: ['syllable-chop (new)', 'blend-choose', 'spell-tiles', 'story'] },
  morph: { label: 'Morphology', template: 'Word sums and word builders: prefix + base + suffix; meaning first, then spelling-change rules.', activities: ['word-sum (new)', 'affix-builder (new)', 'spelling-rule-sort (new)', 'dictation', 'story'] },
  bridge: { label: 'Bridge to independent reading', template: 'Repeated reading, unpractised-passage fluency (personal curve), knowledge-themed text sets, listening library.', activities: ['fluency-passage (new)', 'record-compare (new)', 'story', 'comprehension'] },
};

// ---- The units. gpcs: [id, grapheme, IPA, example]  ('_' marks a split digraph gap)
const U = (id, stage, kind, title, ja, o) => ({ id, stage, kind, title, ja, gpcs: [], concepts: [], pack: '', words: [], tricky: [], prereq: [], activities: [], ...o });
export const COURSE = [
  U(0, 0, 'oral', 'Listening', 'きいてみよう', { concepts: ['same or different word', 'first sound of a word (alliteration before rhyme)', 'syllable taps', 'a word is made of sounds'], pack: 'Pure consonants via the kana grid (か = /k/ + /a/)', words: ['(oral only)'] }),
  // ---------------- Stage 1
  U(1, 1, 'code', 's a m t', 's a m t', { gpcs: [['s', 's', 's', 'sun'], ['a', 'a', 'æ', 'apple'], ['m', 'm', 'm', 'mouse'], ['t', 't', 't', 'tiger']], pack: 'Pure /s/ /m/ /t/ with no vowel added', words: ['am', 'at', 'sat', 'mat', 'Sam'], prereq: [0] }),
  U(2, 1, 'code', 'i n p', 'i n p', { gpcs: [['i', 'i', 'ɪ', 'insect'], ['n', 'n', 'n', 'nose'], ['p', 'p', 'p', 'pig']], pack: '/s/ before /i/ (sit)', words: ['in', 'it', 'sit', 'pin', 'pan', 'map', 'man', 'tip'], tricky: ['i'], prereq: [1] }),
  U(3, 1, 'code', 'o d g c', 'o d g c', { gpcs: [['o', 'o', 'ɑ', 'octopus'], ['d', 'd', 'd', 'dog'], ['g', 'g', 'g', 'goat'], ['c', 'c', 'k', 'cat']], pack: 'Final consonants stay bare ("dog" not "doggu")', words: ['dog', 'cat', 'cap', 'pot', 'top', 'dig', 'cod'], tricky: ['a', 'the'], prereq: [2] }),
  U(4, 1, 'code', 'k e u r h', 'k e u r h', { gpcs: [['k', 'k', 'k', 'kite'], ['e', 'e', 'ɛ', 'egg'], ['u', 'u', 'ʌ', 'umbrella'], ['r', 'r', 'ɹ', 'rabbit'], ['h', 'h', 'h', 'hat']], pack: 'Short vowels a/o/u (cat/cot/cut) and i/e (pin/pen)', words: ['kid', 'pen', 'red', 'ten', 'sun', 'cup', 'run', 'hat', 'hen'], tricky: ['to', 'no', 'go'], prereq: [3] }),
  U(5, 1, 'code', 'b f l + ff ll ss ck', 'b f l + ff ll ss ck', { gpcs: [['b', 'b', 'b', 'banana'], ['f', 'f', 'f', 'fish'], ['l', 'l', 'l', 'lion'], ['ff', 'ff', 'f', 'cliff'], ['ll', 'll', 'l', 'bell'], ['ss', 'ss', 's', 'kiss'], ['ck', 'ck', 'k', 'duck']], pack: 'b/v pre-teach, f/h (fun/hun), r/l (rock/lock)', words: ['bed', 'bus', 'bag', 'fan', 'leg', 'bell', 'doll', 'kiss', 'duck', 'back'], tricky: ['is', 'of'], prereq: [4] }),
  U(6, 1, 'code', 'j v w x y z zz qu', 'j v w x y z zz qu', { gpcs: [['j', 'j', 'dʒ', 'jam'], ['v', 'v', 'v', 'van'], ['w', 'w', 'w', 'web'], ['x', 'x', 'ks', 'box'], ['y', 'y', 'j', 'yes'], ['z', 'z', 'z', 'zip'], ['zz', 'zz', 'z', 'buzz'], ['qu', 'qu', 'kw', 'quiz']], pack: 'b/v (bet/vet); w vs oo', words: ['jam', 'van', 'web', 'box', 'six', 'yes', 'zip', 'quiz', 'buzz'], tricky: ['he', 'we', 'me', 'be', 'you'], prereq: [5] }),
  U(7, 1, 'code', 's says /z/ (plurals)', 's が「ズ」', { gpcs: [['sz', 's', 'z', 'dogs']], concepts: ['-s plural / verb ending says /s/ or /z/'], pack: 'Final /z/ is not "zu"', words: ['cats', 'dogs', 'pens', 'bugs', 'is', 'his', 'has'], tricky: ['like', 'do', 'said'], prereq: [6] }),
  // ---------------- Stage 2
  U(8, 2, 'digraph', 'sh ch', 'sh ch', { gpcs: [['sh', 'sh', 'ʃ', 'ship'], ['ch', 'ch', 'tʃ', 'chip']], pack: 's/sh (sip/ship), ch/sh', words: ['ship', 'shop', 'fish', 'dish', 'chin', 'chip', 'much', 'such'], tricky: ['she', 'have'], prereq: [7] }),
  U(9, 2, 'digraph', 'th (two sounds)', 'th（2つの おと）', { gpcs: [['th', 'th', 'θ', 'thin'], ['thv', 'th', 'ð', 'this']], pack: 'th/s/z/t: tolerated in production, REQUIRED in recognition', words: ['thin', 'thick', 'bath', 'moth', 'this', 'that', 'with', 'them'], tricky: ['they', 'are', 'was'], prereq: [8] }),
  U(10, 2, 'digraph', 'ng nk', 'ng nk', { gpcs: [['ng', 'ng', 'ŋ', 'ring'], ['nk', 'nk', 'ŋk', 'pink']], concepts: ['review of all digraphs'], pack: 'Final /ŋ/ with no added "g"/"gu"', words: ['ring', 'king', 'sing', 'long', 'pink', 'sink', 'bank', 'think'], tricky: ['what', 'my', 'all'], prereq: [9] }),
  // ---------------- Stage 3 (no new GPCs: clusters are sequences of known GPCs)
  U(11, 3, 'cluster', 'Final clusters (CVCC)', 'おわりの ならぶ しいん', { concepts: ['nd nt mp st sk lk ft nch (and nk review)'], pack: 'Cluster epenthesis: "hand" vs "hando"', words: ['hand', 'tent', 'jump', 'desk', 'milk', 'gift', 'best', 'lunch'], tricky: ['come', 'some'], prereq: [10] }),
  U(12, 3, 'cluster', 'Initial s-clusters', 's ではじまる ならび', { concepts: ['st sp sn sm sw sk'], pack: '"stop" vs "sutoppu"', words: ['stop', 'spin', 'swim', 'snap', 'skip', 'step'], tricky: ['one', 'there'], prereq: [11] }),
  U(13, 3, 'cluster', 'Initial l-clusters', 'l の ならび', { concepts: ['bl cl fl gl pl sl'], pack: 'r/l inside clusters', words: ['black', 'clap', 'flag', 'glad', 'plan', 'slip'], tricky: ['here', 'when'], prereq: [12] }),
  U(14, 3, 'cluster', 'Initial r-clusters', 'r の ならび', { concepts: ['br cr dr fr gr tr'], pack: 'r/l (fly/fry), b/v', words: ['frog', 'drum', 'crab', 'trip', 'grin', 'brush'], tricky: ['out', 'little'], prereq: [13] }),
  U(15, 3, 'inflection', 'Three-consonant onsets + -ing', '3つの しいん と -ing', { concepts: ['CCCVC: str spl scr shr thr (thr only after th is secure)', 'suffix -ing (base + ing; ng already known)'], pack: 'Three-consonant onsets; -ing is not "ingu"', words: ['strap', 'split', 'scrub', 'shrink', 'jumping', 'singing'], tricky: ['were', 'your'], prereq: [14] }),
  U(16, 3, 'inflection', 'Suffix -ed + compound words', '-ed と ふたつの ことば', { gpcs: [['ed_t', 'ed', 't', 'jumped'], ['ed_d', 'ed', 'd', 'filled'], ['ed_id', 'ed', 'ɪd', 'landed']], concepts: ['-ed says /t/ /d/ or /ɪd/', 'compound words made of closed syllables'], pack: '-ed is not "edo" / "to"', words: ['jumped', 'filled', 'landed', 'sunset', 'desktop', 'catfish'], prereq: [15] }),
  // ---------------- Stage 4 (simple code: one spelling per sound)
  U(17, 4, 'vowel', 'ee, oo (long)', 'ee oo', { gpcs: [['ee', 'ee', 'iː', 'tree'], ['oo', 'oo', 'uː', 'moon']], pack: 'i/ee (ship/sheep); length is a native strength', words: ['see', 'tree', 'green', 'sheep', 'moon', 'food', 'spoon'], prereq: [16] }),
  U(18, 4, 'vowel', 'ai, oa', 'ai oa', { gpcs: [['ai', 'ai', 'eɪ', 'rain'], ['oa', 'oa', 'oʊ', 'boat']], pack: 'Glide: "rain" is not "reen", "boat" is not "booto"', words: ['rain', 'train', 'tail', 'boat', 'coat', 'road'], prereq: [17] }),
  U(19, 4, 'vowel', 'igh, ow (cow), oi', 'igh ow oi', { gpcs: [['igh', 'igh', 'aɪ', 'night'], ['ow_au', 'ow', 'aʊ', 'cow'], ['oi', 'oi', 'ɔɪ', 'coin']], pack: 'Diphthongs /aɪ/ /aʊ/ /ɔɪ/', words: ['night', 'light', 'high', 'cow', 'down', 'coin', 'oil'], prereq: [18] }),
  U(20, 4, 'vowel', 'oo (short), ar, or', 'oo ar or', { gpcs: [['oo_s', 'oo', 'ʊ', 'book'], ['ar', 'ar', 'ɑr', 'car'], ['or', 'or', 'ɔr', 'fork']], pack: 'oo/oo (book/moon); rhotic vowels (accent en-US)', words: ['book', 'look', 'foot', 'car', 'star', 'park', 'fork', 'corn'], prereq: [19] }),
  U(21, 4, 'vowel', 'ur, er, air, ear', 'ur er air ear', { gpcs: [['ur', 'ur', 'ɜr', 'turn'], ['er', 'er', 'ɚ', 'letter'], ['air', 'air', 'ɛr', 'hair'], ['ear', 'ear', 'ɪr', 'hear']], pack: 'Rhotic vowels; final -er is not "aa"', words: ['turn', 'hurt', 'burn', 'letter', 'sister', 'hair', 'fair', 'ear', 'hear'], prereq: [20] }),
  U(22, 4, 'vowel', 'y as /i/ and /aɪ/; simple code review', 'y と ふくしゅう', { gpcs: [['y_i', 'y', 'i', 'happy'], ['y_ai', 'y', 'aɪ', 'my']], concepts: ['consolidation of the simple code'], pack: '—', words: ['happy', 'funny', 'sunny', 'my', 'fly', 'sky'], prereq: [21] }),
  // ---------------- Stage 5
  U(23, 5, 'split', 'a_e, i_e', 'a_e i_e', { gpcs: [['a_e', 'a_e', 'eɪ', 'cake'], ['i_e', 'i_e', 'aɪ', 'five'], ['e_s', 'e', '∅', 'cake']], concepts: ['split digraph (use this one term only)'], pack: 'One term: split digraph', words: ['cake', 'name', 'game', 'five', 'nine', 'bike', 'like'], prereq: [22] }),
  U(24, 5, 'split', 'o_e, u_e, e_e', 'o_e u_e e_e', { gpcs: [['o_e', 'o_e', 'oʊ', 'home'], ['u_e', 'u_e', 'ju:', 'cute'], ['u_e_oo', 'u_e', 'uː', 'rule'], ['e_e', 'e_e', 'iː', 'these']], pack: '/oʊ/, /ju:/', words: ['home', 'nose', 'cute', 'tube', 'these'], prereq: [23] }),
  U(25, 5, 'altspell', 'ay (a long spelling for /eɪ/)', 'ay', { gpcs: [['ay', 'ay', 'eɪ', 'day']], concepts: ['choosing a spelling: ai / ay / a_e'], pack: 'Choosing a spelling', words: ['day', 'play', 'say', 'stay'], prereq: [24] }),
  U(26, 5, 'altspell', 'Spellings of /iː/: ea, e, ey', 'ea e ey', { gpcs: [['ea_i', 'ea', 'iː', 'eat'], ['e_open', 'e', 'iː', 'me'], ['ey', 'ey', 'iː', 'key']], concepts: ['he / we / me / be become decodable'], pack: '—', words: ['eat', 'sea', 'read', 'he', 'we', 'me', 'be', 'key'], prereq: [25] }),
  U(27, 5, 'altspell', 'Spellings of /oʊ/ and /aɪ/: ow, o, oe; ie, i', 'ow o oe ie i', { gpcs: [['ow_ou', 'ow', 'oʊ', 'snow'], ['o_open', 'o', 'oʊ', 'go'], ['oe', 'oe', 'oʊ', 'toe'], ['ie', 'ie', 'aɪ', 'pie'], ['i_open', 'i', 'aɪ', 'hi']], concepts: ['go / no / so become decodable'], pack: '—', words: ['snow', 'go', 'no', 'so', 'toe', 'pie', 'tie', 'hi'], prereq: [26] }),
  U(28, 5, 'altspell', 'Spellings of /uː/ and /ɜr/: ew, ue; ir, wor', 'ew ue ir wor', { gpcs: [['ew', 'ew', 'uː', 'new'], ['ue', 'ue', 'uː', 'blue'], ['ir', 'ir', 'ɜr', 'bird'], ['wor', 'wor', 'wɜr', 'word']], pack: '—', words: ['new', 'blue', 'clue', 'bird', 'girl', 'word', 'work'], prereq: [27] }),
  U(29, 5, 'altspell', 'ou, oy, aw, au', 'ou oy aw au', { gpcs: [['ou', 'ou', 'aʊ', 'out'], ['oy', 'oy', 'ɔɪ', 'toy'], ['aw', 'aw', 'ɔ', 'saw'], ['au', 'au', 'ɔ', 'sauce']], concepts: ['aw/au vowel is accent-dependent: check with the recorded voice'], pack: '—', words: ['out', 'house', 'toy', 'boy', 'saw', 'paw', 'sauce'], prereq: [28] }),
  U(30, 5, 'altpron', 'Alternative pronunciations: "try the other sound"', 'ちがう よみかた', { gpcs: [['ea_e', 'ea', 'ɛ', 'head'], ['ie_i', 'ie', 'iː', 'field'], ['c_soft', 'c', 's', 'city'], ['g_soft', 'g', 'dʒ', 'giant'], ['ch_k', 'ch', 'k', 'school']], concepts: ['ea (bread/eat), ow (snow/cow), ie (pie/field), soft c/g before e i y'], pack: '—', words: ['bread', 'head', 'ice', 'city', 'giant', 'page', 'school'], prereq: [29] }),
  U(31, 5, 'altspell', 'Consonant spellings: ph wh tch dge kn wr mb -ve', 'ph wh tch dge kn wr mb', { gpcs: [['ph', 'ph', 'f', 'phone'], ['wh', 'wh', 'w', 'when'], ['tch', 'tch', 'tʃ', 'catch'], ['dge', 'dge', 'dʒ', 'bridge'], ['kn', 'kn', 'n', 'knee'], ['wr', 'wr', 'r', 'write'], ['mb', 'mb', 'm', 'lamb'], ['ve', 've', 'v', 'give']], concepts: ['give / have become decodable'], pack: '—', words: ['phone', 'when', 'catch', 'bridge', 'knee', 'write', 'lamb', 'give', 'have'], prereq: [30] }),
  // ---------------- Stage 6
  U(32, 6, 'syllable', 'Syllable types and division', 'おとの かたまり', { concepts: ['closed, open, VCe (split digraph), vowel team, r-controlled', 'divide VC/CV, then V/CV and VC/V'], pack: 'Stress placement introduced in listening', words: ['rabbit', 'napkin', 'robot', 'tiger', 'cupcake'], prereq: [31] }),
  U(33, 6, 'syllable', '-le and the schwa', '-le と あいまいな おと', { gpcs: [['le', 'le', 'əl', 'apple'], ['schwa', 'a', 'ə', 'about'], ['a_open', 'a', 'eɪ', 'table']], concepts: ['"say it, then fix it" for weak vowels'], pack: 'Weak vowels', words: ['apple', 'table', 'little', 'about', 'sofa'], prereq: [32] }),
  U(34, 6, 'morph', 'Suffixes: -s/-es, -er/-est, -ly, -ful, -less', '-s -es -er -est -ly -ful -less', { concepts: ['plural and past morphology (absent in Japanese)'], pack: '—', words: ['boxes', 'faster', 'slowly', 'helpful', 'careless'], prereq: [33] }),
  U(35, 6, 'morph', 'Prefixes: un-, re-, pre-, dis-', 'un- re- pre- dis-', { concepts: ['prefixes change meaning'], pack: '—', words: ['undo', 'replay', 'unlock', 'dislike'], prereq: [34] }),
  U(36, 6, 'morph', 'Spelling-change rules', 'つづりの ルール', { concepts: ['doubling (run → running)', 'drop the e (make → making)', 'y → i (happy → happier)'], pack: '—', words: ['running', 'making', 'happier'], prereq: [35] }),
  U(37, 6, 'morph', '-tion, -sion, -ture and further affixes', '-tion -sion -ture', { gpcs: [['tion', 'tion', 'ʃən', 'station'], ['sion', 'sion', 'ʒən', 'vision'], ['ture', 'ture', 'tʃɚ', 'picture']], pack: '—', words: ['station', 'vision', 'picture'], prereq: [36] }),
  // ---------------- Stage 7
  U(38, 7, 'bridge', 'Fluency and reading-for-meaning bridge', 'すらすら よもう', { concepts: ['no new GPCs', 'repeated reading, unpractised passages, personal fluency curve', 'knowledge-themed text sets and listening library', 'filter switches from % decodable to % known words'], pack: 'Connected speech and weak forms in listening only', words: [], prereq: [37] }),
];

// ---- Stage checkpoints (DR thresholds): short mixed assessments inside the app; they inform placement/teacher view,
//      they never lock a child out. Based on the DIBELS-style "words recoded correctly" and PSC-style real+pseudo mix.
export const CHECKPOINTS = [
  { id: 'cp1', after: 7, name: 'Alphabet code check', items: '24 items: 12 CVC pseudo-words + 12 real CVC words (choose-from-audio)', pass: '>= 85% pseudo-words; every Stage-1 GPC at rung >= 4', then: 'Stage 2' },
  { id: 'cp2', after: 10, name: 'Digraph check', items: '24 items: sh/ch/th/ng/nk words + 2 short stories (>= 90% word accuracy)', pass: '>= 85% pseudo-words; stories read at >= 90%', then: 'Stage 3' },
  { id: 'cp3', after: 16, name: 'Cluster and ending check', items: '24 items: CVCC/CCVC/CCCVC, -ing/-ed; spell 6 words (no inserted vowels)', pass: '>= 85% reading; <= 1 inserted-vowel spelling', then: 'Stage 4' },
  { id: 'cp4', after: 22, name: 'Simple code check', items: '30 items across all Stage 4 vowels + 3 short books', pass: '>= 85% pseudo-words; books read at >= 90%', then: 'Stage 5' },
  { id: 'cp5', after: 31, name: 'Alternatives check', items: '30 items: sort by sound, choose the spelling, "try the other sound" on 10 words', pass: '>= 80% on choices; self-corrects on >= 6/10 other-sound words', then: 'Stage 6' },
  { id: 'cp6', after: 37, name: 'Multisyllable and morphology check', items: '30 items: 2–3 syllable words (real + pseudo), word sums, 2 less-controlled passages', pass: '>= 80% decoding; comprehension >= 2/3', then: 'Stage 7' },
];

// ---- Cumulative review points: weekly/monthly spaced review of everything (Rosenshine), on top of the half-life scheduler.
export const REVIEW_POINTS = [4, 7, 10, 13, 16, 19, 22, 26, 31, 34, 37];

// ---- Knowledge themes for story/text sets (strand V/C): vocabulary repeats within a theme.
export const THEMES = [
  { id: 'animals', ja: 'どうぶつ', from: 3 }, { id: 'school', ja: 'がっこう', from: 4 }, { id: 'food', ja: 'たべもの', from: 5 },
  { id: 'home', ja: 'いえ', from: 5 }, { id: 'places', ja: 'まち', from: 6 }, { id: 'sports', ja: 'スポーツ', from: 4 },
  { id: 'weather', ja: 'てんき', from: 4 }, { id: 'people', ja: 'ひと', from: 6 }, { id: 'nagasaki', ja: 'ながさき', from: 11 },
  { id: 'seasons', ja: 'きせつ', from: 17 }, { id: 'nature', ja: 'しぜん', from: 20 }, { id: 'science', ja: 'かがく', from: 30 },
];
