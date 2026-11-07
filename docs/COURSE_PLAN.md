# Course plan: from first sounds to comfortable reading

> GENERATED from `curriculum/src/course.mjs` by `tools/build_course_doc.mjs`. Edit the data, not this file.
> Teaching order and pedagogy follow `docs/BLUEPRINT.md`. Every threshold marked **DR** is a design recommendation to validate with real children.

Status: **32 of 39 units authored** (Units 0-31); the other 7 are specified here and unlock as they are written. Audio and pictures are placeholders (eSpeak voice, emoji) until recordings and artwork replace them; practice games are planned (section 9).

## 1. Pedagogy: the principles that decide the order

1. **Explicit, systematic synthetic phonics.** Letter-sound correspondences are taught directly, in a fixed order, then blended left to right and used for spelling. ([WWC foundational reading guide](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf); [EEF phonics toolkit](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics); [DfE reading framework](https://assets.publishing.service.gov.uk/media/664f600c05e5fe28788fc437/The_reading_framework_.pdf))
2. **Phonemes linked to letters.** Phonemic awareness is taught with print, not in isolation, and kept short. ([National Reading Panel / Ehri](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf); [Clemens et al. on advanced PA](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf))
3. **Simple code before complex code.** One spelling per sound first, alternatives only after the first spelling is secure. ([DfE phonics technical specification](https://assets.publishing.service.gov.uk/media/662b8448fddcc9e7ab225285/Phonics_2024_technical_specification_v1.0.pdf); [Little Wandle progression](https://parc-eglos.croftymat.org/wp-content/uploads/sites/17/2023/03/Little-Wandle-for-Website.pdf))
4. **Decodable text only until the code is known.** A story may contain only taught GPCs and taught tricky words; the validator enforces it. Tricky words are taught by their decodable parts plus the one odd part ("heart" words).
5. **Mastery before progress, with spaced review.** A six-rung evidence ladder per GPC, a half-life scheduler, cumulative review points (section 7). Review is built in, not bolted on. (Rosenshine principles; blueprint section on mastery.)
6. **One new difficulty at a time.** Clusters are blended sound by sound only after all digraphs; vowels are short until Stage 4; split digraphs follow the simple code.
7. **Compare competitors, copy what works.** The opening (letters, sound-blend-read) matches [Duolingo ABC scope and sequence](https://lit-lessons-cdn.duolingo.com/resources/duolingo_abc_scope_and_sequence_english.pdf) and [Teach Your Monster to Read](https://help.teachyourmonster.org/en/articles/5458453-what-does-each-game-cover); ours differs after the alphabet by planning for Japanese EFL (below).
8. **Engagement comes from the reading act**, not decoration; rewards are small and never gate learning. (Self-determination research; blueprint section on engagement.)

## 2. Japanese EFL: what changes

- **Syllable habit.** Kana are CV moras, so English final consonants and clusters invite inserted vowels ("map" to "mapu"). This is why clusters (Stage 3) come while vowels are still short and why each is taught with an epenthesis listening contrast.
- **Sounds with no kana home:** /l/ vs /r/, /b/ vs /v/, /θ ð/, /s/ vs /ʃ/, final /ŋ/, short /æ ʌ ɑ/. Each gets a contrast pack that unlocks when both members are taught (`curriculum/src/packs.mjs`).
- **No katakana** as a crutch: it misrepresents English sounds and builds the wrong habit. Japanese appears only as short hints and unit labels.
- **Strengths used:** vowel length (ee/oo), alphabet familiarity from romaji, strong visual memory, and a classroom culture suited to short mastery loops.
- **Morphology** (-s/-ed/-er) and **stress/weak vowels** have no Japanese counterpart, so they are taught explicitly in Stage 6.
- **No speech-recognition gating.** The app never marks a child wrong for pronunciation; a mouth cue and a record-and-compare tool are the planned alternative.
- **Accent:** en-US (matches Let's Try / New Horizon audio). Words whose vowel is accent-dependent are flagged in the unit notes (e.g. aw/au).

## 3. Strand by stage

Strands: **P** phonics, **A** phonemic awareness, **T** tricky words, **V** vocabulary/oral language, **F** fluency, **C** comprehension. ● core, ◐ active, ○ maintenance, — none.

| Stage | Name | Units | Strands | Exit milestone |
| --- | --- | --- | --- | --- |
| 0 | Sound start (おとあそび) | 0 | P— A● T— V● F— C◐ | Isolates the first sound of known words; hears same/different words; taps syllables. |
| 1 | Alphabet code (もじと おと) | 1-7 | P● A◐ T◐ V● F○ C◐ | Decodes unseen CVC pseudo-words from the 26 letters + ff/ll/ss/ck/zz/qu and reads 1–3 sentence ditties. |
| 2 | Consonant digraphs (ふたもじ ひとおと) | 8-10 | P● A○ T◐ V● F◐ C◐ | Reads and spells sh/ch/th/ng/nk words; reads 4–8 page stories. |
| 3 | Adjacent consonants and first inflections (ならぶ しいん) | 11-16 | P● A◐ T◐ V● F◐ C◐ | Reads and spells CVCC / CCVC / CCCVC words, and words with -ing / -ed, with no inserted vowels. |
| 4 | Long vowels and other vowels, one spelling each (ながい おと) | 17-22 | P● A○ T◐ V● F● C◐ | Knows the "simple code" (one spelling per sound); reads short decodable books. |
| 5 | Split digraphs, alternative spellings and pronunciations (おなじ おと ちがう つづり) | 23-31 | P● A○ T○ V● F● C● | Chooses between alternatives when reading ("tries the other sound") and when spelling; reads short chapter-like texts. |
| 6 | Multisyllable words and morphology (ながい ことば) | 32-37 | P● A○ T○ V● F● C● | Decodes 2–3 syllable words; uses prefixes/suffixes to read and spell; handles schwa with "say it, then fix it". |
| 7 | Fluency and reading-for-meaning bridge (すらすら よもう) | 38 | P◐ A— T— V● F● C● | Rising rate on unpractised text; reads less-controlled texts with comprehension. |

## 4. The course, stage by stage

### Stage 0: Sound start

**Why this order:** Phoneme awareness linked to letters is the strongest foundation; this stage is oral, brief and skippable by placement. Initial-sound work comes before rhyme (alliteration is easier).

**Main risk for Japanese learners:** Japanese kana are mora-based (か = /k/+/a/), so single consonants have no native "address": hold continuous sounds, keep vowels off consonants.

| Unit | Teaches | Kind | New GPCs (IPA) | Concepts | Contrast pack | Tricky words | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Listening (きいてみよう) | Oral listening | — | same or different word; first sound of a word (alliteration before rhyme); syllable taps; a word is made of sounds | Pure consonants via the kana grid (か = /k/ + /a/) | — | authored |

Example words: U0: (oral only)

### Stage 1: Alphabet code

**Why this order:** Systematic synthetic phonics: grapheme-phoneme correspondences taught explicitly, blended left to right, spelled by segmenting. Continuous sounds first; confusable letters (b/d, i/e) separated.

**Main risk for Japanese learners:** Final-consonant vowel insertion ("map" → "mapu"), r/l, b/v, short a/o/u. Contrast packs unlock as both members are taught.

| Unit | Teaches | Kind | New GPCs (IPA) | Concepts | Contrast pack | Tricky words | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | s a m t (s a m t) | New letter-sound(s) | s /s/ sun; a /æ/ apple; m /m/ mouse; t /t/ tiger | — | Pure /s/ /m/ /t/ with no vowel added | — | authored |
| 2 | i n p (i n p) | New letter-sound(s) | i /ɪ/ insect; n /n/ nose; p /p/ pig | — | /s/ before /i/ (sit) | i | authored |
| 3 | o d g c (o d g c) | New letter-sound(s) | o /ɑ/ octopus; d /d/ dog; g /g/ goat; c /k/ cat | — | Final consonants stay bare ("dog" not "doggu") | a, the | authored |
| 4 | k e u r h (k e u r h) | New letter-sound(s) | k /k/ kite; e /ɛ/ egg; u /ʌ/ umbrella; r /ɹ/ rabbit; h /h/ hat | — | Short vowels a/o/u (cat/cot/cut) and i/e (pin/pen) | to, no, go | authored |
| 5 | b f l + ff ll ss ck (b f l + ff ll ss ck) | New letter-sound(s) | b /b/ banana; f /f/ fish; l /l/ lion; ff /f/ cliff; ll /l/ bell; ss /s/ kiss; ck /k/ duck | — | b/v pre-teach, f/h (fun/hun), r/l (rock/lock) | is, of | authored |
| 6 | j v w x y z zz qu (j v w x y z zz qu) | New letter-sound(s) | j /dʒ/ jam; v /v/ van; w /w/ web; x /ks/ box; y /j/ yes; z /z/ zip; zz /z/ buzz; qu /kw/ quiz | — | b/v (bet/vet); w vs oo | he, we, me, be, you | authored |
| 7 | s says /z/ (plurals) (s が「ズ」) | New letter-sound(s) | s /z/ dogs | -s plural / verb ending says /s/ or /z/ | Final /z/ is not "zu" | like, do, said | authored |

Example words: U1: am, at, sat, mat, Sam | U2: in, it, sit, pin, pan, map, man, tip | U3: dog, cat, cap, pot, top, dig, cod | U4: kid, pen, red, ten, sun, cup, run, hat, hen | U5: bed, bus, bag, fan, leg, bell, doll, kiss, duck, back | U6: jam, van, web, box, six, yes, zip, quiz, buzz | U7: cats, dogs, pens, bugs, is, his, has

### Stage 2: Consonant digraphs

**Why this order:** A digraph is ONE sound and is taught as one tile (WWC). Introduced while vowels are still all short so each lesson adds one new difficulty.

**Main risk for Japanese learners:** s/sh, th/s/z (heard as /s/ /z/ or /t/ /d/), final /ŋ/ + inserted /g/ or "gu".

| Unit | Teaches | Kind | New GPCs (IPA) | Concepts | Contrast pack | Tricky words | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 8 | sh ch (sh ch) | Digraph (two letters, one sound) | sh /ʃ/ ship; ch /tʃ/ chip | — | s/sh (sip/ship), ch/sh | she, have | authored |
| 9 | th (two sounds) (th（2つの おと）) | Digraph (two letters, one sound) | th /θ/ thin; th /ð/ this | — | th/s/z/t: tolerated in production, REQUIRED in recognition | they, are, was | authored |
| 10 | ng nk (ng nk) | Digraph (two letters, one sound) | ng /ŋ/ ring; nk /ŋk/ pink | review of all digraphs | Final /ŋ/ with no added "g"/"gu" | what, my, all | authored |

Example words: U8: ship, shop, fish, dish, chin, chip, much, such | U9: thin, thick, bath, moth, this, that, with, them | U10: ring, king, sing, long, pink, sink, bank, think

### Stage 3: Adjacent consonants and first inflections

**Why this order:** Clusters are the biggest Japanese-specific hazard (CV syllable habit), so they come EARLY while vowels are short: final clusters before initial (Letters & Sounds Phase 4 logic). Clusters are blended sound by sound, never memorised as chunks.

**Main risk for Japanese learners:** Epenthetic vowels (hand → "hando", stop → "sutoppu"); r/l inside clusters; -ed as "edo"/"to".

| Unit | Teaches | Kind | New GPCs (IPA) | Concepts | Contrast pack | Tricky words | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | Final clusters (CVCC) (おわりの ならぶ しいん) | Adjacent consonants (no new GPCs) | — | nd nt mp st sk lk ft nch (and nk review) | Cluster epenthesis: "hand" vs "hando" | come, some | authored |
| 12 | Initial s-clusters (s ではじまる ならび) | Adjacent consonants (no new GPCs) | — | st sp sn sm sw sk | "stop" vs "sutoppu" | one, there | authored |
| 13 | Initial l-clusters (l の ならび) | Adjacent consonants (no new GPCs) | — | bl cl fl gl pl sl | r/l inside clusters | here, when | authored |
| 14 | Initial r-clusters (r の ならび) | Adjacent consonants (no new GPCs) | — | br cr dr fr gr tr | r/l (fly/fry), b/v | out, little | authored |
| 15 | Three-consonant onsets + -ing (3つの しいん と -ing) | Inflection (-ing, -ed) | — | CCCVC: str spl scr shr thr (thr only after th is secure); suffix -ing (base + ing; ng already known) | Three-consonant onsets; -ing is not "ingu" | were, your | authored |
| 16 | Suffix -ed + compound words (-ed と ふたつの ことば) | Inflection (-ing, -ed) | ed /t/ jumped; ed /d/ filled; ed /ɪd/ landed | -ed says /t/ /d/ or /ɪd/; compound words made of closed syllables | -ed is not "edo" / "to" | — | authored |

Example words: U11: hand, tent, jump, desk, milk, gift, best, lunch | U12: stop, spin, swim, snap, skip, step | U13: black, clap, flag, glad, plan, slip | U14: frog, drum, crab, trip, grin, brush | U15: strap, split, scrub, shrink, jumping, singing | U16: jumped, filled, landed, sunset, desktop, catfish

### Stage 4: Long vowels and other vowels, one spelling each

**Why this order:** One spelling per sound first (limits spelling load; DfE simple-then-complex code). Order suits Japanese phonology: ee/oo (length is a native strength) before the English diphthongs ai/oa/igh/ow/oi.

**Main risk for Japanese learners:** Flattened diphthongs (cake → "keeki"), i/ee, oo/oo (book/moon), rhotic vowels (ar/or/ur/er/air/ear; accent en-US).

| Unit | Teaches | Kind | New GPCs (IPA) | Concepts | Contrast pack | Tricky words | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 17 | ee, oo (long) (ee oo) | Vowel sound, one spelling | ee /iː/ tree; oo /uː/ moon | — | i/ee (ship/sheep); length is a native strength | — | authored |
| 18 | ai, oa (ai oa) | Vowel sound, one spelling | ai /eɪ/ rain; oa /oʊ/ boat | — | Glide: "rain" is not "reen", "boat" is not "booto" | — | authored |
| 19 | igh, ow (cow), oi (igh ow oi) | Vowel sound, one spelling | igh /aɪ/ night; ow /aʊ/ cow; oi /ɔɪ/ coin | — | Diphthongs /aɪ/ /aʊ/ /ɔɪ/ | — | authored |
| 20 | oo (short), ar, or (oo ar or) | Vowel sound, one spelling | oo /ʊ/ book; ar /ɑr/ car; or /ɔr/ fork | — | oo/oo (book/moon); rhotic vowels (accent en-US) | — | authored |
| 21 | ur, er, air, ear (ur er air ear) | Vowel sound, one spelling | ur /ɜr/ turn; er /ɚ/ letter; air /ɛr/ hair; ear /ɪr/ hear | — | Rhotic vowels; final -er is not "aa" | — | authored |
| 22 | y as /i/ and /aɪ/; simple code review (y と ふくしゅう) | Vowel sound, one spelling | y /i/ happy; y /aɪ/ my | consolidation of the simple code | — | — | authored |

Example words: U17: see, tree, green, sheep, moon, food, spoon | U18: rain, train, tail, boat, coat, road | U19: night, light, high, cow, down, coin, oil | U20: book, look, foot, car, star, park, fork, corn | U21: turn, hurt, burn, letter, sister, hair, fair, ear, hear | U22: happy, funny, sunny, my, fly, sky

### Stage 5: Split digraphs, alternative spellings and pronunciations

**Why this order:** Alternatives are added only after the first spelling of that sound is secure. "Try the other sound" needs the word to be known orally, so vocabulary leads. Use ONE term ("split digraph") consistently (DfE fidelity guidance).

**Main risk for Japanese learners:** Needs oral vocabulary to self-check a decoding attempt; ea/ow/ie/ch have 2+ pronunciations.

| Unit | Teaches | Kind | New GPCs (IPA) | Concepts | Contrast pack | Tricky words | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 23 | a_e, i_e (a_e i_e) | Split digraph | a_e /eɪ/ cake; i_e /aɪ/ five; e /∅/ cake | split digraph (use this one term only) | One term: split digraph | — | authored |
| 24 | o_e, u_e, e_e (o_e u_e e_e) | Split digraph | o_e /oʊ/ home; u_e /ju:/ cute; u_e /uː/ rule; e_e /iː/ these | — | /oʊ/, /ju:/ | — | authored |
| 25 | ay (a long spelling for /eɪ/) (ay) | Alternative spelling of a known sound | ay /eɪ/ day | choosing a spelling: ai / ay / a_e | Choosing a spelling | — | authored |
| 26 | Spellings of /iː/: ea, e, ey (ea e ey) | Alternative spelling of a known sound | ea /iː/ eat; e /iː/ me; ey /iː/ key | he / we / me / be become decodable | — | — | authored |
| 27 | Spellings of /oʊ/ and /aɪ/: ow, o, oe; ie, i (ow o oe ie i) | Alternative spelling of a known sound | ow /oʊ/ snow; o /oʊ/ go; oe /oʊ/ toe; ie /aɪ/ pie; i /aɪ/ hi | go / no / so become decodable | — | — | authored |
| 28 | Spellings of /uː/ and /ɜr/: ew, ue; ir, wor (ew ue ir wor) | Alternative spelling of a known sound | ew /uː/ new; ue /uː/ blue; ir /ɜr/ bird; wor /wɜr/ word | — | — | — | authored |
| 29 | ou, oy, aw, au (ou oy aw au) | Alternative spelling of a known sound | ou /aʊ/ out; oy /ɔɪ/ toy; aw /ɔ/ saw; au /ɔ/ sauce | aw/au vowel is accent-dependent: check with the recorded voice | — | — | authored |
| 30 | Alternative pronunciations: "try the other sound" (ちがう よみかた) | Alternative pronunciation of a known spelling | ea /ɛ/ head; ie /iː/ field; c /s/ city; g /dʒ/ giant; ch /k/ school | ea (bread/eat), ow (snow/cow), ie (pie/field), soft c/g before e i y | — | — | authored |
| 31 | Consonant spellings: ph wh tch dge kn wr mb -ve (ph wh tch dge kn wr mb) | Alternative spelling of a known sound | ph /f/ phone; wh /w/ when; tch /tʃ/ catch; dge /dʒ/ bridge; kn /n/ knee; wr /r/ write; mb /m/ lamb; ve /v/ give | give / have become decodable | — | — | authored |

Example words: U23: cake, name, game, five, nine, bike, like | U24: home, nose, cute, tube, these | U25: day, play, say, stay | U26: eat, sea, read, he, we, me, be, key | U27: snow, go, no, so, toe, pie, tie, hi | U28: new, blue, clue, bird, girl, word, work | U29: out, house, toy, boy, saw, paw, sauce | U30: bread, head, ice, city, giant, page, school | U31: phone, when, catch, bridge, knee, write, lamb, give, have

### Stage 6: Multisyllable words and morphology

**Why this order:** Syllable types + division rules turn long words into familiar chunks; affixes carry meaning (morphology absent in Japanese, so explicit teaching).

**Main risk for Japanese learners:** Stress and weak vowels are unfamiliar (Japanese is mora-timed); plural/past morphology has no Japanese counterpart.

| Unit | Teaches | Kind | New GPCs (IPA) | Concepts | Contrast pack | Tricky words | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 32 | Syllable types and division (おとの かたまり) | Syllables | — | closed, open, VCe (split digraph), vowel team, r-controlled; divide VC/CV, then V/CV and VC/V | Stress placement introduced in listening | — | planned |
| 33 | -le and the schwa (-le と あいまいな おと) | Syllables | le /əl/ apple; a /ə/ about | "say it, then fix it" for weak vowels | Weak vowels | — | planned |
| 34 | Suffixes: -s/-es, -er/-est, -ly, -ful, -less (-s -es -er -est -ly -ful -less) | Morphology | — | plural and past morphology (absent in Japanese) | — | — | planned |
| 35 | Prefixes: un-, re-, pre-, dis- (un- re- pre- dis-) | Morphology | — | prefixes change meaning | — | — | planned |
| 36 | Spelling-change rules (つづりの ルール) | Morphology | — | doubling (run → running); drop the e (make → making); y → i (happy → happier) | — | — | planned |
| 37 | -tion, -sion, -ture and further affixes (-tion -sion -ture) | Morphology | tion /ʃən/ station; sion /ʒən/ vision; ture /tʃɚ/ picture | — | — | — | planned |

Example words: U32: rabbit, napkin, robot, tiger, cupcake | U33: apple, table, little, about, sofa | U34: boxes, faster, slowly, helpful, careless | U35: undo, replay, unlock, dislike | U36: running, making, happier | U37: station, vision, picture

### Stage 7: Fluency and reading-for-meaning bridge

**Why this order:** No new GPCs. After decoding is secure, vocabulary and knowledge limit comprehension (Castles et al.), so the filter switches from "% decodable" to "% of words known orally".

**Main risk for Japanese learners:** Vocabulary, not code, holds Japanese EFL readers back; connected speech/weak forms are practised in listening only.

| Unit | Teaches | Kind | New GPCs (IPA) | Concepts | Contrast pack | Tricky words | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 38 | Fluency and reading-for-meaning bridge (すらすら よもう) | Bridge to independent reading | — | no new GPCs; repeated reading, unpractised passages, personal fluency curve; knowledge-themed text sets and listening library; filter switches from % decodable to % known words | Connected speech and weak forms in listening only | — | planned |

Example words: U38: —

## 5. Lesson variants by unit kind

Every lesson follows the nine-step template in the blueprint (meet, listen, recall, blend, spell, read, play with pseudo-words, heart word, story). The kind decides which activities appear. Activities marked **(new)** do not exist in the engine yet.

| Kind | How the template changes | Activities |
| --- | --- | --- |
| Oral listening (`oral`) | Short games only, no print. Same/different words, first sounds, syllable taps. | same-different, initial-sound, syllable |
| New letter-sound(s) (`code`) | Standard 9-step template. 1-2 new GPCs per lesson (max 2 in Stage 1). | meet, listen-pick, recall-flash, blend-choose, spell-tiles, read-match, word-chain, pseudo, heart, dictation, story |
| Digraph (two letters, one sound) (`digraph`) | Standard template; the digraph is ONE tile; minimal-pair listening before print. | meet, minimal-pair, spell-tiles (digraph = one tile), blend-choose, word-chain, pseudo, story |
| Adjacent consonants (no new GPCs) (`cluster`) | Stretch-and-segment: one Elkonin box per sound, tiles per letter. Contrast "real word" vs "word + extra vowel" in listening. Blend sound by sound, never as chunks. | cluster-segment (new), epenthesis-listen (word vs word+vowel pack), blend-choose, spell-tiles, word-chain, pseudo, story |
| Inflection (-ing, -ed) (`inflection`) | Word sums (base + ending), ending-sound sort (/t/ /d/ /ɪd/), spell by adding the ending to a known base. | word-sum (new), ed-sound-sort (new), spell-tiles, dictation, story |
| Vowel sound, one spelling (`vowel`) | Standard template plus length/glide modelling in the mouth cue; sorts against the nearest short vowel. | meet, minimal-pair, sort (new), blend-choose, spell-tiles, pseudo, story |
| Split digraph (`split`) | The two letters are one unit with a gap: tiles with a gap slot. Word chains between short and long vowel words (cap → cape). | split-tiles (new), word-chain, sort (new), spell-tiles, pseudo, story |
| Alternative spelling of a known sound (`altspell`) | Sound is known; teach another way to write it. Sort by sound, choose the right spelling in a word, keep a "spelling map" of the sound. | sort (new), choose-spelling (new), spell-tiles, dictation, story |
| Alternative pronunciation of a known spelling (`altpron`) | "Try the other sound": decode → check against a word you know → if it is not a word, try the other sound. Needs oral vocabulary. | try-other-sound (new), sort (new), blend-choose, story |
| Syllables (`syllable`) | Chop the word, label syllable types, then blend chunk by chunk. | syllable-chop (new), blend-choose, spell-tiles, story |
| Morphology (`morph`) | Word sums and word builders: prefix + base + suffix; meaning first, then spelling-change rules. | word-sum (new), affix-builder (new), spelling-rule-sort (new), dictation, story |
| Bridge to independent reading (`bridge`) | Repeated reading, unpractised-passage fluency (personal curve), knowledge-themed text sets, listening library. | fluency-passage (new), record-compare (new), story, comprehension |

## 6. Mastery ladder (per GPC)

Rungs 0-5: heard, recognised, recalled, read in words, transferred to pseudo-words, retained after delay. All thresholds are DR. Evidence counts from the first attempt only. A GPC falls back only from a mastered rung, after 2 recent direct errors. A unit completes when every new GPC reaches rung 4 and stories are read at >= 90% accuracy (**DR**). Implemented in `src/learn/mastery.js`; tested by `tools/guessbot.mjs` (random bots must never pass; 85% learner must finish).

## 7. Assessment, review and checkpoints

Checkpoints are short mixed assessments at the end of each stage (real plus pseudo-words, plus connected text). They inform placement and the teacher view; they never lock a child out. Thresholds are **DR**.

| Checkpoint | After unit | Items | Pass | Leads to |
| --- | --- | --- | --- | --- |
| Alphabet code check | 7 | 24 items: 12 CVC pseudo-words + 12 real CVC words (choose-from-audio) | >= 85% pseudo-words; every Stage-1 GPC at rung >= 4 | Stage 2 |
| Digraph check | 10 | 24 items: sh/ch/th/ng/nk words + 2 short stories (>= 90% word accuracy) | >= 85% pseudo-words; stories read at >= 90% | Stage 3 |
| Cluster and ending check | 16 | 24 items: CVCC/CCVC/CCCVC, -ing/-ed; spell 6 words (no inserted vowels) | >= 85% reading; <= 1 inserted-vowel spelling | Stage 4 |
| Simple code check | 22 | 30 items across all Stage 4 vowels + 3 short books | >= 85% pseudo-words; books read at >= 90% | Stage 5 |
| Alternatives check | 31 | 30 items: sort by sound, choose the spelling, "try the other sound" on 10 words | >= 80% on choices; self-corrects on >= 6/10 other-sound words | Stage 6 |
| Multisyllable and morphology check | 37 | 30 items: 2–3 syllable words (real + pseudo), word sums, 2 less-controlled passages | >= 80% decoding; comprehension >= 2/3 | Stage 7 |

**Cumulative review points** (weekly/monthly mixed review of everything taught, on top of the half-life scheduler): after units 4, 7, 10, 13, 16, 19, 22, 26, 31, 34, 37.

## 8. Content production spec and definition of done

A unit is **done** when all of the following hold (enforced by `node tools/validate.mjs` unless marked manual):

1. Every GPC is in `gpcs.mjs` with phoneme, example bank, position rules and lures.
2. >= 6 real words per new GPC, >= 3 silly (pseudo) words per unit, each decodable with only taught GPCs and tricky words.
3. >= 2 one-GPC lure strings per word (for the "which is right" tasks).
4. Tricky words listed once, with the odd part marked.
5. >= 1 contrast pack where a Japanese-hard pair is complete; epenthesis pairs for every cluster unit.
6. 2-3 decodable stories, <= 6 pages, <= 8 words per sentence, >= 30% of content words using the unit's GPCs, with 2 comprehension questions.
7. Audio recorded for every word, sentence, story page and question (manual; placeholder eSpeak until then).
8. Pictures for concrete nouns (manual; emoji placeholders until then).
9. Guess-bot simulation still passes; a headless play-through of the unit completes.
10. Pilot check with 3+ children before the unit is called final (manual, **DR**).

**Story themes** (vocabulary repeats within a theme): animals (どうぶつ, from U3), school (がっこう, from U4), food (たべもの, from U5), home (いえ, from U5), places (まち, from U6), sports (スポーツ, from U4), weather (てんき, from U4), people (ひと, from U6), nagasaki (ながさき, from U11), seasons (きせつ, from U17), nature (しぜん, from U20), science (かがく, from U30).

## 9. Engine and activity backlog

Activities the course needs that are not built yet, in the order the units need them:

| Activity | First needed at unit |
| --- | --- |
| cluster-segment | 11 |
| word-sum | 15 |
| ed-sound-sort | 15 |
| sort | 17 |
| split-tiles | 23 |
| choose-spelling | 25 |
| try-other-sound | 30 |
| syllable-chop | 32 |
| affix-builder | 34 |
| spelling-rule-sort | 34 |
| fluency-passage | 38 |
| record-compare | 38 |

**Planned later (not blocking the course):** practice games per stage (Teach-Your-Monster-style mini games: sound hunt, word catch, spelling bridge), record-and-compare, teacher dashboard export, level placement test, a "stories library" browser, real artwork and recorded audio.

## 10. Open decisions and pilot validation

- **Placement:** short oral and letter-sound screen to skip Stage 0 / Stage 1 for learners who already know the alphabet (children in this context often do via romaji). **DR.**
- **Pacing:** target 3-6 lessons per unit, 10-12 minutes each, 2-3 sessions per week. **DR.**
- **Accent for aw/au, ar, or:** confirm with the recorded voice.
- **th production** tolerated, recognition required: confirm with the ALT team.
- **Alt-pronunciation order** (U30) may need to split once real error data exists.
- **Pilot plan:** 6-10 children across grades 3-6 for 4 weeks; log lessons-to-mastery per unit, error types (epenthesis, r/l, b/v), and engagement; revise thresholds from data, never from intuition.

