# Build the reading code first, then widen

The evidence supports one plan, staged so the foundation is solid before anything is added. The app should teach **systematic synthetic phonics**: an explicit, cumulative sequence of grapheme–phoneme correspondences (GPCs), blending to read, segmenting to spell, and reading decodable text every day. **Alongside it, from the first day, run a separate oral-language and vocabulary strand**, because phonics improves reading accuracy but comprehension "must be taught separately" ([EEF](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics)). For Japanese elementary learners that second strand matters more than for native speakers. They can learn to decode words they do not understand, and comprehension in second-language learners is tied to oral language ([Escamilla 2009, summarising the National Literacy Panel](https://www.shanahanonliteracy.com/upload/publications/45/pdf/10862960903340165.pdf)).

**Ordering decision.** I recommend a hybrid. Keep the UK "simple code first" principle: one spelling per sound before alternative spellings, as in RWI ([Oxford Owl](https://home.oxfordowl.co.uk/reading/reading-schemes-oxford-levels/read-write-inc-phonics-guide/)). Start with continuous sounds, following US guidance ([WWC 2016](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf)). Then **bring consonant clusters forward**, ahead of vowel digraphs, as UFLI does. Clusters and final consonants are the biggest problem for Japanese learners: they insert vowels into clusters and even *hear* vowels that are not there ([Dupoux et al.](https://web-archive.southampton.ac.uk/cogprints.org/747/index.html)). Bringing clusters forward gives them the longest stretch of spaced practice. No study compares UK and US orders ([scope notes, WWC/DfE](https://assets.publishing.service.gov.uk/media/664f600c05e5fe28788fc437/The_reading_framework_.pdf)), so this is a reasoned design decision to test with real children, not an evidence-dictated one.

**Positioning.** Phonics apps have the weakest independent evidence of any delivery mode. EEF finds technology-led phonics "less successful" than adult-led delivery. GraphoGame's large UK trial matched business-as-usual teaching, and the only significant moderator across GraphoGame studies was adult interaction ([Ahmed et al. 2020](https://www.frontiersin.org/articles/10.3389/feduc.2020.00132)). So the app should be built as a tool a teacher can lead (a class/projector mode) as well as a home practice tool.

**Build order.** Phase 0 builds the content schema, the decodability validator and a recorded phoneme audio library. Phase 1 ships one complete, testable slice: the alphabet code through CVC words, the first tricky words and decodable "ditties". Each later phase adds a curriculum stage only after the previous one has been tested with children.

---

## Three findings are settled; most of the rest is design judgement

### What counts as strong consensus

The evidence sorts into three tiers.

**Systematic phonics.** Its superiority over unsystematic or no-phonics teaching is the best-replicated finding. NRP/Ehri et al. (2001) effect sizes, as reported by Buckingham, are:

| Outcome or group | Effect size (d) |
|---|---|
| Regular-word decoding | **0.67** |
| Pseudowords | **0.60** |
| Irregular words | 0.40 |
| Kindergarten | 0.56 |
| Grade 1 | 0.54 |
| Grades 2–6 | 0.27 |

Source: [Buckingham 2020](https://www.ldaustralia.org/app/uploads/2022/09/Buckingham-Evidence-strongly-favours-systematic-synthetic-phonics.pdf). Buckingham is a pro-phonics secondary source, and the original paper could not be fetched.

- **EEF** gives phonics **+5 months** at high security across 228 studies, and finds synthetic and analytic phonics have the highest impact ([EEF](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics)).
- **Torgerson et al. (2006)**, using only RCTs, found a significant effect on reading accuracy but inconclusive evidence for comprehension and spelling, and no definitive answer on synthetic versus analytic ([York](https://www.york.ac.uk/news-and-events/news/2006/phonics-teaching/)).

So "systematic" is settled, while "synthetic beats analytic" is only *promising*.

**Phonemic awareness (PA) linked to letters.** The useful part of PA training is narrow: blending and segmenting, done with letters, focused on one or two skills. NRP effect sizes, as reported by Clemens et al.:

| PA training type | Reading (d) | Spelling (d) |
|---|---|---|
| Blending and segmenting | 0.67 | 0.79 |
| Other PA skills | 0.27 | 0.23 |
| With letters | 0.67 | — |
| Without letters | 0.38 | — |
| One or two skills taught | 0.71–0.79 | — |
| Three or more skills taught | 0.27 | — |

Source: [Clemens et al. 2021](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf). The WWC rates "awareness of the segments of sounds in speech and how they link to letters" as **strong evidence** ([WWC 2016](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf)).

**Orthographic mapping.** Fluent word recognition comes from bonding spellings to pronunciations through grapheme–phoneme connections, not from memorising word shapes. In Ehri's words, **"all words become sight words with practice"** ([Ehri 2014](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf)).

**The two-component frame.** The Simple View of Reading (decoding × language comprehension) remains the best organising frame, endorsed by Castles, Rastle & Nation's synthesis ([APS](https://www.psychologicalscience.org/publications/ending-the-reading-wars-reading-acquisition-from-novice-to-expert.html)). It has refinements: Duke & Cartwright's Active View argues the components overlap and that self-regulation matters, but that model has not been tested as a whole ([summary](https://www.dyslexia.com/reference/duke-cartwright-2021/)). For an app the implication is stable: build decoding and language together.

### What is promising

The following are well-founded but less directly tested in early literacy:

- **Morphological instruction.** Positive across 22 studies, "no less effective for younger students," and "more effective when combined with other aspects of literacy instruction" ([Bowers, Kirby & Deacon 2010](https://journals.sagepub.com/doi/10.3102/0034654309359353)).
- **Repeated reading with feedback for fluency.**
- **Spaced retrieval practice applied to phonics review.** The lab evidence is strong, but no literacy RCT isolates it.
- **Short, concentrated comprehension-strategy instruction.** Shanahan reports that summarising and questioning have the largest effects, multiple strategies beat single ones, and teaching question types has effects "so small" that it isn't worth the time ([Shanahan](https://www.readingrockets.org/blogs/shanahan-on-literacy/how-much-comprehension-strategy-instruction)).
- **Mastery learning.** Kulik et al.'s meta-analysis of 108 evaluations found **0.52 SD**, and **higher mastery standards worked better** ([Kulik et al. 1990](https://scispace.com/pdf/effectiveness-of-mastery-learning-programs-a-meta-analysis-45bgwh1byb.pdf)). It does not say what the standard should be.

### What is disputed or thin

**Advanced oral phoneme manipulation.** Deletion and substitution drills done "in the dark" lack causal support. The only experiment found improved the phonemic measure (ES 0.55) but produced **no significant differences in pseudoword decoding or oral reading fluency**. Once letters are introduced, the benefit of oral-only activity "appears to disappear" ([Clemens et al. 2021](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf)). That paper was a preprint when fetched.

**Multisensory (Orton-Gillingham) methods.** These add no demonstrated value beyond the structured phonics they contain:
- Stevens et al. found no significant effects on foundational skills ([Reading Rockets summary](https://readingrockets.org/resources/resource-library/current-state-evidence-examining-effects-orton-gillingham-reading)).
- Hall et al.'s 53-study meta-analysis found multisensory delivery was not a significant moderator. Only **dosage** and outcome domain were ([Hall et al. 2023](https://bridgeslab.gse.harvard.edu/publication/forty-years-reading-intervention-research-elementary-students-or-risk-dyslexia)).

**Decodable texts.** They give immediate accuracy gains and encourage decoding. Long-term evidence is mixed, and reviewers warn against judging text on decodability alone ([Cheatham & Allor 2012](https://www.readingrockets.org/resources/resource-library/influence-decodability-early-reading-text-reading-achievement-review)).

**The "heart word" method.** Teaching irregular words by mapping their regular parts follows logically from orthographic-mapping theory and practitioner guidance ([PLD](https://pld-literacy.org/clarifying-sight-words-research-backed-insights/)). No RCT comparing it with flashcards was found.

**Three-cueing (guessing from pictures, context and first letters).** Both the WWC and DfE discourage it, and it trains Ehri's "partial alphabetic" prediction habit ([WWC](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf); [Reading Framework](https://assets.publishing.service.gov.uk/media/664f600c05e5fe28788fc437/The_reading_framework_.pdf)). It **must not be combined** with phonics.

**The broader phonics dispute.** Bowers argues the case for systematic phonics is overstated, but even he concedes children must learn their GPCs ([Bristol record](https://research-information.bris.ac.uk/en/publications/yes-children-need-to-learn-their-gpcs-but-there-really-is-little-/)). The dispute is about *how much better* systematic phonics is, not *whether* to teach the code.

| Claim | Status | What it means for the app |
|---|---|---|
| Systematic phonics beats unsystematic/none | **Strong** | Fixed GPC sequence; no incidental-only phonics |
| PA blending/segmenting *with letters* | **Strong** | PA lives inside phonics activities, kept brief |
| Orthographic mapping, not visual memory | **Strong** | Every word is decoded and spelled; heart words are mapped |
| Comprehension needs language and knowledge as well as decoding | **Strong** | Parallel oral language/vocabulary strand from day one |
| Synthetic beats analytic | Promising | Synthetic chosen, mainly because EFL children lack a known word stock |
| Decodable text as a temporary scaffold | Promising/mixed | Decodable stories gated by the validator, phased out after the core code |
| Spaced retrieval for GPC review | Promising (extrapolated) | Per-item scheduler |
| Morphology after initial phonics | Promising | Inflections early; derivations in Stage 6 |
| Advanced oral PA drills | **Disputed/thin** | Exclude as a goal |
| Multisensory as the active ingredient | **Disputed/thin** | Tracing allowed for handwriting and engagement, not counted as instruction |
| Three-cueing / picture guessing | **Rejected** | Pictures revealed *after* reading |
| Phonics apps as stand-alone teachers | **Weak** (EEF; GraphoGame null) | Teacher-led class mode plus home practice |

---

## Competitors share an opening, diverge after the alphabet, and none designs for EFL

Every programme opens with a small, high-utility set of single letters plus a vowel, so children can blend VC/CVC words within days. Their first letters differ:

| Programme | First letters |
|---|---|
| Letters and Sounds, Jolly, Little Wandle, Teach Your Monster to Read (TYMTR) | s a t p i n |
| RWI | m a s d t |
| UFLI | a m s t |
| Duolingo ABC | m a t s i f d r |

After the alphabet they split into two families:

- **UK programmes** teach consonant digraphs, then vowel digraphs as a "simple code", then adjacent consonants, then alternative spellings in Year 1.
- **US programmes (UFLI, Duolingo ABC)** teach blends with short vowels, then VCe (silent e), then vowel teams, and reach multisyllabic words and affixes earlier.

Mastery thresholds, error handling and review algorithms are **not publicly documented for any app**. Only RWI has a large independent RCT, which found a small, cautious **+1 month** ([EEF](https://educationendowmentfoundation.org.uk/news/eef-publishes-independent-evaluation-of-read-write-inc-phonics-and-fresh-start)). No independent efficacy study of TYMTR or Duolingo ABC was found. Duolingo's own efficacy roundup covers its language courses, not ABC ([Duolingo blog](https://blog.duolingo.com/results-duolingo-efficacy-studies)).

Labels in the table: **D** = publicly documented, **I** = inferred, **U** = unknown or not found.

| Programme | Opening order | Consonant digraphs | Clusters | Long vowels | VCe | Alt. spellings | Multisyllabic | Connected text and decodability | Independent evidence |
|---|---|---|---|---|---|---|---|---|---|
| **TYMTR** ([help](https://help.teachyourmonster.org/en/articles/5458453-what-does-each-game-cover)) | s a t p i n m d g o c k ck e u r h b f ff l ll ss j qu v w x y z zz (31 GPCs, Game 1) **D** | Game 2: ch sh th ng **D** | Game 2: CVCC/CCVC **D** | Game 2 as digraphs (ai ee igh oa…) **D** | Game 3 **I** | Game 3 (eight/they; fin/find) **D** | **U** | CVC in Game 1; sentences in Game 2; "little books" in Game 3 **D**; decodability **U** | None found; Roehampton-designed **D** ([Horn Book](https://hbook.com/story/teach-your-monster-to-read-app-review)) |
| **Duolingo ABC** ([S&S](https://lit-lessons-cdn.duolingo.com/resources/duolingo_abc_scope_and_sequence_english.pdf)) | m a t s i f d r / g o l h u c b n / k v e p w j y x **D** | L4: sh ch th **D** | L4–5 **D** | L6–7 via VCe, then vowel teams **D** | L6 **D** | L8 "tricky patterns" **D** | L6 **D** | Narrated stories from L1; grade 2 stories are "leveled" **D**; not stated as decodable **I** | No ABC study found **U** |
| **UFLI** ([S&S PDF](https://ufli.education.ufl.edu/wp-content/uploads/2022/06/UFLI-Scope2.pdf)) | a m s t (VC/CVC) p f i n o d c u g b e… **D** (my OCR of the official PDF; a third-party summary marks it unknown) | L42–53 (FLSZ, ck, sh, th, ch, wh/ph, ng, nk) **D** | Within L35–41 longer-word review **D** (a third-party summary says L47–53; the official chart wins) | L84–94 **D** | L54–62 **D** | L111–118 **D** | L63–68 syllables; affixes L99–128 **D** | Connected text in every lesson **D** ([UFLI](https://ufli.education.ufl.edu/foundations)) | WestEd quasi-experimental pilot, "significant and meaningful" **D** ([WestEd](https://www.wested.org/resources/districtwide-pilot-study-of-ufli-foundations/)) |
| **RWI** ([Oxford Owl](https://home.oxfordowl.co.uk/reading/reading-schemes-oxford-levels/read-write-inc-phonics-guide/)) | m a s d t i n p g o c k u b f e l h r j v y w z x **D** | Set 1 "special friends" **D** | **U** | Set 2, one spelling each **D** | Set 3 **D** | Set 3 **D** | **U** | Ditties, then colour-banded books, each read 3× **D** | EEF RCT: +1 month overall, +3 for FSM pupils, interpret cautiously **D** |
| **Jolly Phonics** ([map](https://henhamugley.essex.sch.uk/wp-content/uploads/2022/11/Jolly-Phonics-progression-map-1.pdf)) | s a t i p n / c k e h r m d / g o u l f b **D** | Group 6 **D** | 2nd cycle **D** | Group 4 (ai oa ie ee) **D** | **U** | Group 7 partial **D** | **U** | **U** | Not researched **U** |
| **Little Wandle** ([school copy](https://parc-eglos.croftymat.org/wp-content/uploads/sites/17/2023/03/Little-Wandle-for-Website.pdf)) | s a t p i n m d g o c k ck e u r h b f l **D** (school reproduction) | Reception Autumn 2 **D** | Reception Summer **D** | Reception Spring, as digraphs **D** | Y1 Autumn 2 **D** | Y1 **D** | Compound words and -ing/-ed in Reception Summer **D** | Phase-matched books **D** | Not researched **U** |
| **Reading Eggs** ([overview](https://readingeggs.com/about/lesson-overview/reading/)) | Letters plus sight words (the/I/and/is/see) in Maps 1–4; order **U** | Map 13 **D** | **U** | Maps 9–12 **D** | Maps 9–12 (cake, kite) **D** | Map 13 **D** | Map 13 **D** | Stories from Maps 1–4; decodability **U** | Correlational, company-commissioned ESSA III claim **D** ([claim](https://readingeggs.com/articles/reading-eggs-meets-essa-rating-evidence-standards/)) |
| **Nessy** | **U** | **U** | **U** | **U** | **U** | **U** | **U** | **U** | Case studies only, no controls **D** ([Nessy](https://www.nessy.com/en-gb/about-us/our-expert-research)) |
| **Starfall** | Short-vowel books begin with "Zac the Rat" (short a) **D** ([Starfall](https://starfall.com/h/learn-to-read/)) | **U** | **U** | **U** | **U** | **U** | **U** | Books from the start **D** | **U** |
| **Amira** (AI reading tutor) | N/A | — | — | — | — | — | — | Listens to oral reading **D** | Evidence for ESSA "Moderate", mean ES +0.15 (K +0.26, G1 +0.06) **D** ([Evidence for ESSA](https://evidenceforessa.org/?p=665)) |

Hooked on Phonics, Oxford Reading Tree/Floppy's Phonics and Phonics Hero were not researched.

**Discrepancies to note.**
- Duolingo ABC's scope document lists 68 units, while Common Sense Education counts 127; the app has probably grown ([Common Sense](https://www.commonsense.org/education/app/duolingo-abc-learn-to-read)).
- Reading Eggs labels Map 13 "Lessons 121 to 160" on a page claiming 130 lessons.

### What to borrow from each

| Programme | Borrow | Avoid |
|---|---|---|
| UFLI | **Eight-step lesson skeleton**: phonemic awareness, visual drill, auditory drill, blending drill, new concept, word work, irregular words, connected text ([UFLI](https://ufli.education.ufl.edu/foundations)). The strongest lesson template available. | — |
| RWI | **One spelling per sound first.** "Fred Talk", a frog character who can only say sounds so the child blends. **Read every book three times**: accuracy, fluency, then "storyteller voice". | — |
| TYMTR | Three-game arc (letters + CVC, then digraphs + sentences, then alternative spellings + books). Avatar ownership. **Nonsense words as monster names.** | — |
| Jolly Phonics | One action per sound (good for whole-class use). | — |
| Duolingo ABC | Short sessions on a visible path; tracing tied to the sound. | Rigid start for every child. Common Sense notes teachers cannot choose a start point and there is "little learning support for kids who are struggling". |
| Reading Eggs | — | Sight words from lesson 1 and non-decodable "levelled" stories during the phonics phase. |

The main gap is clear: **every competitor assumes a native speaker's oral vocabulary**. None restricts decoding to words the child understands, none drills the contrasts Japanese children find hard, and none offers Japanese-language scaffolding.

---

## Six parallel strands climb through eight curriculum stages

### The architecture: strands, not a single ladder

The brief's eight research stages are educationally sound as *phonics* milestones. But treating them as one sequence repeats the error the brief warns against: phonics alone. The recommended architecture is **six strands running in parallel**, with curriculum stages defined by the phonics strand because it has the strictest dependencies.

| Strand | What it covers |
|---|---|
| **P** Phonics/decoding and encoding | The GPC sequence: blending to read, segmenting to spell |
| **A** Phonemic awareness | Brief, letter-linked, folded into P after Stage 0 |
| **T** Tricky (heart) words | Released in small numbers when sentences need them, auto-converting to decodable when their GPC is taught |
| **V** Vocabulary and oral language | Picture, audio and meaning *before* a word is decoded, plus listening stories above decoding level |
| **F** Fluency | Repeated reading of decodable text from Stage 2, timed only on unpractised passages and only later |
| **C** Comprehension | Picture-tap questions after every story; listening comprehension from day one; strategies later |

The table shows how much weight each strand gets at each stage (● = core focus, ◐ = active but secondary, ○ = light or maintenance, — = not yet).

| Stage | Name | P | A | T | V | F | C | Exit milestone |
|---|---|---|---|---|---|---|---|---|
| 0 | Sound start (optional, skippable by placement) | — | ● oral: initial sound, syllables, same/different | — | ● | — | ◐ listening | Isolates initial phonemes in known words |
| 1 | Alphabet code (single letters + CVC) | ● | ◐ blend/segment with tiles | ◐ first 6–8 | ● | ○ ditties | ◐ picture questions | Decodes unseen CVC pseudo-words from taught GPCs |
| 2 | Consonant digraphs | ● | ○ | ◐ | ● | ◐ | ◐ | Reads and spells sh/ch/th/ng/nk words; reads 2–3 sentence stories |
| 3 | Adjacent consonants + first inflections | ● | ◐ cluster segmenting | ◐ | ● | ◐ | ◐ | CVCC/CCVC/CCCVC without inserted vowels in segmenting tasks |
| 4 | Long vowels and other vowels, one spelling each | ● | ○ | ◐ | ● | ● | ◐ | Full "simple code" known; reads short decodable books |
| 5 | Split digraphs + alternative spellings and pronunciations | ● | ○ | ○ | ● | ● | ● | Chooses between alternatives in reading; "tries the other sound" |
| 6 | Multisyllable words and morphology | ● | ○ | ○ | ● | ● | ● | Decodes 2–3 syllable words; uses affixes |
| 7 | Fluency and reading-for-meaning bridge | ◐ spelling and morphology | — | — | ● | ● | ● | Rising rate on unpractised text; reads less-controlled texts with comprehension |

This mirrors Castles et al.'s developmental claim: decoding limits comprehension early, and language and knowledge become the limit later ([APS](https://www.psychologicalscience.org/publications/ending-the-reading-wars-reading-acquisition-from-novice-to-expert.html)). It also follows the WWC's four recommendations: academic language; sound segments linked to letters; decoding and writing words; daily connected text ([WWC](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf)).

### Decision: a hybrid order, justified for Japanese learners

The choice is between three options:
- **UK style**: vowel digraphs as a simple code *before* clusters.
- **US style**: clusters and VCe first, then vowel teams.
- **Hybrid**, which I recommend.

The case for the hybrid has four parts.

**1. Clusters are the largest Japanese-specific hazard.** Japanese syllables are mostly CV. Learners insert vowels after final consonants (map → "mapɯ") and break clusters following katakana patterns ([Lesley 2014](https://aws1.hpu.edu/research-publications/tesol-working-papers/2014/TESOL_WPS_2014_Lesley.pdf)). Japanese listeners even report hearing vowels inside clusters that contain none ([Dupoux et al.](https://web-archive.southampton.ac.uk/cogprints.org/747/index.html)). A skill that is perceptually hard and slow to automate should be introduced early and practised over the longest possible spaced period. It should also be practised while the vowel load is minimal: short vowels only, so each lesson adds one new difficulty. The DfE notes that "many children need extra support to blend words with consonant clusters, particularly when they occur at the start of words" ([Reading Framework](https://assets.publishing.service.gov.uk/media/664f600c05e5fe28788fc437/The_reading_framework_.pdf)). That justifies final clusters (CVCC) before initial ones, as in Letters and Sounds Phase 4.

**2. Keep RWI's principle for vowels: one spelling per sound first.** Teach each long vowel with a single spelling, then add split digraphs and alternatives as a separate stage. This limits early spelling load and fits the DfE's "simple code then complex code" guidance.

**3. Order long vowels to suit Japanese phonology.** Japanese uses vowel length contrastively, so length is a native strength. English "long" a/i/o are diphthongs, which Japanese lacks, and learners tend to flatten them (cake → "keeki") ([Lesley 2014](https://aws1.hpu.edu/research-publications/tesol-working-papers/2014/TESOL_WPS_2014_Lesley.pdf)). So teach ee and oo (/uː/) first, then the diphthongs ai/oa/igh/ow/oi with explicit glide modelling.

**4. Open with continuous sounds and the most-documented letters.** The WWC recommends continuous consonants for early phoneme work because they are "easier for students to elongate" ([WWC](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf)). For Japanese children, held sounds (/sss/, /mmm/) also make it easier to model a consonant with no vowel attached.

The opening set **s, a, m, t, i, n, p, d** takes s/a/t/i/n/p from the UK consensus and swaps in **m** early, as RWI, UFLI and Duolingo all do. Confusable letters are kept apart: d in Unit 3 and b in Unit 5; i in Unit 2 and e in Unit 4. Every programme's order separates these pairs, though no source states the principle explicitly.

**Caveat.** No controlled study compares orders. This is a hypothesis for the pilot, and the schema must let units be reordered without code changes.

**Accent dependency.** The UK GPC inventories assume a non-rhotic accent; Little Wandle even flags put/pull/full/push/ask/half/father as accent-dependent ([Little Wandle reproduction](https://parc-eglos.croftymat.org/wp-content/uploads/sites/17/2023/03/Little-Wandle-for-Website.pdf)). If the app uses North American audio to match Japanese classroom textbooks (likely, but unverified), then ar/or/ur/er/air/ear are taught as rhotic vowel+r units. This is a **Phase 0 decision**, recorded in the data as `accent: "en-US"`.

### First-pass GPC introduction order and unit list

Unit sizes target **2–4 new GPCs per unit**, with each unit lasting about 3–6 short lessons, gated by mastery rather than the calendar. For reference, Letters and Sounds Phase 2 introduces 19 GPCs in up to 6 weeks and Jolly introduces one sound a day ([L&S summary](https://www.st-patricksrc.notts.sch.uk/wp-content/uploads/sites/11/2022/02/letters-and-sounds-progression-expectations.pdf); [Jolly](https://henhamugley.essex.sch.uk/wp-content/uploads/2022/11/Jolly-Phonics-progression-map-1.pdf)). Lower-exposure EFL learners need slower, mastery-gated pacing; no study sets an EFL pace.

The example words are first-pass candidates and must pass the vocabulary filter described later, so a few may change. Known-vocabulary or loanword candidates are preferred. "Silly words" are explicitly marked nonsense used for transfer.

| Unit | New GPCs / concept | Japanese contrast pack unlocked | Example decodable words | Tricky words released |
|---|---|---|---|---|
| **Stage 0** | Listening, same/different words, initial sound (alliteration before rhyme), syllable clapping, "a word is made of sounds" | Pure consonants via the kana grid (か = /k/ + /a/) | (oral only) | — |
| 1 | s, a, m, t | Pure /s/ /m/ /t/ with no vowel added | am, at, sat, mat, Sam | — |
| 2 | i, n, p | /s/ before /i/ (sit, not "shit") | in, it, sit, pin, pan, map, man, tip | I |
| 3 | o, d, g, c | Final-consonant contrast ("dog" vs "doggu") | dog, cat, cap, pot, top, god→*avoid*, dig, cod | the, a |
| 4 | k, e, u, r, h | **Short-vowel pack** a/o/u (cat/cot/cut) and i/e (pin/pen) | kid, pen, red, ten, sun, cup, run, hat, hen | to, no, go |
| 5 | b, f, l, ff, ll, ss, ck | **b/v pre-teach**, **f/h** (fun/hun), **r/l** (rock/lock) | bed, bus, bag, fan, fox→U6, leg, bell, doll, kiss, duck, back | is (temporarily irregular: s = /z/), of |
| 6 | j, v, w, x, y, z, zz, qu | **b/v** (bet/vet), w vs oo | jam, van, web, box, six, fox, yes, zip, quiz, buzz | he, we, me, be, you |
| 7 | -s plural/verb (/s/ and /z/); consolidation | Final /z/ is not "zu" | cats, dogs, pens, bugs; is, his, has become decodable | like, do, said |
| **Stage 2** | | | | |
| 8 | sh, ch | **s/sh** (sip/ship) | ship, shop, fish, dish, chin, chip, much, lunch→U11 | she, have |
| 9 | th (voiced/unvoiced) | **th/s/z** (think/sink) tolerated in production, required in recognition | thin, this, that, with, bath, moth | they, are, was |
| 10 | ng, nk; review of all digraphs | Final /ŋ/ without "gu" | ring, king, song, long, pink, sink, bank | what, my, all |
| **Stage 3** | | | | |
| 11 | Final clusters CVCC (-nd -nt -mp -st -sk -lk -ft -nch) | **Cluster epenthesis**: "hand" vs "hando" | hand, tent, jump, desk, milk, gift, best, lunch | come, some |
| 12 | Initial s-clusters (st sp sn sm sw sk) | "stop" vs "sutoppu" | stop, spin, swim, snap, skip, step | one, there |
| 13 | l-clusters (bl cl fl gl pl sl) | **r/l** in clusters | black, clap, flag, glad, plan, slip | here, when |
| 14 | r-clusters (br cr dr fr gr tr) | **r/l** (fly/fry), **b/v** | frog, drum, crab, trip, grin, brush | out, little |
| 15 | CCVCC, CCCVC (str spl scr shr thr); suffix **-ing** | Three-consonant onsets | strap, split, scrub, shrink, three→U17; jumping, singing | were, your |
| 16 | Suffix **-ed** (/t/ /d/ /ɪd/); compound words of closed syllables | -ed is not "edo"/"to" | jumped, filled, landed; sunset, desktop, catfish | — |
| **Stage 4** | | | | |
| 17 | ee, oo (/uː/) | **i/ee** (ship/sheep); length as a native strength | see, tree, green, sheep, moon, food, spoon | — |
| 18 | ai, oa | Diphthong glide (rain is not "reen"; boat is not "booto") | rain, train, tail, boat, coat, road | — |
| 19 | igh, ow (cow), oi | Diphthongs /aɪ/ /aʊ/ /ɔɪ/ | night, light, high, cow, down, coin, oil | — |
| 20 | oo (/ʊ/), ar, or | **oo/oo** (book/moon); rhotic vowels | book, look, foot, car, star, park, fork, horse→later | — |
| 21 | ur, er (final), air, ear | Rhotic vowels; final -er is not "aa" | turn, hurt, burn, letter, sister, hair, fair, ear, hear | — |
| 22 | y as /iː/ (happy) and /aɪ/ (my); consolidation of the simple code | — | happy, funny, sunny, my, fly, sky | my (now decodable) |
| **Stage 5** | | | | |
| 23 | a_e, i_e | "Split digraph" (use one term only, per DfE fidelity guidance) | cake, name, game, five, nine, bike, like (now decodable) | — |
| 24 | o_e, u_e, e_e | /oʊ/, /juː/ | home, nose, cute, tube, these | — |
| 25 | /eɪ/: ay (ai and a_e known) | Choosing a spelling | day, play, say, rain/play sort | — |
| 26 | /iː/: ea, e (open syllable), ey | — | eat, sea, read, he/we/me/be (now decodable), key | — |
| 27 | /oʊ/: ow, o (open), oe; /aɪ/: ie, i (open) | — | snow, go/no/so (now decodable), toe, pie, tie | — |
| 28 | /uː/ /juː/: ew, ue; /ɜr/: ir, w+or | — | new, blue, bird, girl, word | — |
| 29 | ou, oy, aw/au (accent-checked) | — | out, house, toy, boy, saw, paw | — |
| 30 | Alternative pronunciations: ea (head), ow (snow/cow), ie (field), soft c/g (ce ci ge), ch (school) | "Try the other sound" routine | bread, head, ice, city, giant, page | — |
| 31 | Consonant alternatives: ph, wh, tch, dge, kn, wr, mb, -ve | — | phone, when, catch, bridge, knee, write, lamb, give/have (now decodable) | — |
| **Stage 6** | | | | |
| 32 | Syllable types (closed, open, VCe, vowel team, r-controlled) and division VC/CV, then V/CV and VC/V | Stress placement introduced in listening | rabbit, napkin, robot, tiger, cupcake | — |
| 33 | -le; **schwa** with "say it, then fix it" | Weak vowels | apple, little (decodable), table; about, sofa | — |
| 34 | Suffixes -s/-es, -er/-est, -ly, -ful, -less | Plural and past morphology (absent in Japanese) | boxes, faster, slowly, helpful | — |
| 35 | Prefixes un-, re-, pre-, dis- | — | undo, replay, unlock, dislike | — |
| 36 | Spelling-change rules: doubling, drop-e, y→i | — | running, making, happier | — |
| 37 | -tion/-sion, -ture; further affixes as needed | — | station, picture, vision | — |
| **Stage 7** | No new GPCs; fluency, morphology, vocabulary and genre breadth; graded move toward less-controlled text | Connected speech and weak forms in listening only | — | — |

Notes on the table:
- "god" in Unit 3 is flagged *avoid*. It is decodable but unsuitable. This shows the vocabulary filter overriding decodability.
- "she" (Unit 8) and "they"/"was" (Unit 9) follow the DfE rule that exception words "contain GPCs that are unusual or have not yet been taught". The app teaches them by "noting the part that is an exception": in *said*, s and d decode normally and ai = /e/ ([Reading Framework](https://assets.publishing.service.gov.uk/media/664f600c05e5fe28788fc437/The_reading_framework_.pdf)).
- Tricky-word ordering is deliberately weighted toward words that complete classroom sentence frames (I, like, do, you, have, what, my, is). Elementary English classes in Japan rely heavily on these. **Check the release order against the actual Let's Try 1–2 and New Horizon Elementary frames before Phase 1.** That alignment comes from the curriculum named in the brief and is not drawn from the research notes.
- About 6–8 tricky words in Stage 1 matches TYMTR's "first 6 non-decodable words" and Little Wandle's 3 in the first half-term ([TYMTR](https://help.teachyourmonster.org/en/articles/5458453-what-does-each-game-cover)). The total here (~35 by Stage 4) is close to TYMTR's 30 in Game 2.

### Dependency map

```
STAGE 0 (oral, brief, skippable)
  listening discrimination ─┐
  initial-sound isolation ──┼──► [gate] can isolate first sound in known words
  syllable awareness ───────┘          │
                                       ▼
STRAND V (runs throughout) ─ oral word known (picture+audio+meaning) ─┐
                                                                      │ prerequisite for every
STRAND P                                                              │ decodable word used
  GPC recognition (hear → pick grapheme)                              │
     └► GPC recall (see grapheme → produce/select sound)              │
          └► oral blending with 2–3 phonemes ──► written blending VC/CVC ◄┘
          └► oral segmenting ──► encoding CVC with grapheme tiles
                 └► CVC decoding transfer (pseudo-words) ──► sentence reading (+ tricky words, STRAND T)
                        └► decodable ditties/stories ──► STRAND F repeated reading ──► STRAND C questions
  consonant digraphs (needs: digraph-as-one-tile concept; component letters known)
     └► adjacent consonants (needs: secure CVC segmenting; final before initial)
          └► -ing / -ed (needs: ng; final clusters; /t/ /d/ /ɪd/ listening)
     └► long vowels, one spelling each (needs: digraph concept; short vowels secure)
          └► split digraphs & alternative spellings (needs: one spelling of that sound already secure)
               └► alternative pronunciations ("try the other sound"; needs vocabulary to check against)
                    └► multisyllable/syllable types (needs: closed+open+VCe+vowel team)
                         └► schwa, affixes, spelling-change rules (needs: morphology concept + vocabulary)
STRAND T: each tricky word needs its regular GPCs taught; flips to decodable when its exception GPC is taught
STRAND C: listening comprehension from day 1; reading comprehension needs sentence-level decoding
```

The map distinguishes four kinds of relationship:

| Relationship | Skills |
|---|---|
| **Hard prerequisites** (gate progression) | GPC recall before blending those GPCs; CVC segmenting before clusters; one spelling of a vowel before its alternatives |
| **Concurrent** | Letter formation/tracing with GPC introduction; oral vocabulary with phonics; listening comprehension at every stage |
| **Continuously reinforced** | All taught GPCs (spaced review); tricky words; the Japanese contrast packs |
| **Introduced, consolidated later** | Schwa, alternative pronunciations, rhyme/rime awareness |

The language-dependent concepts are alternative pronunciations, schwa, morphology and comprehension. Each needs the child to check a decoding attempt against a word they know orally. That is why the V strand must lead, especially for EFL learners.

---

## Every lesson follows one routine, and every activity must require reading

### Standard lesson template

The template combines three sources: UFLI's eight steps ([UFLI](https://ufli.education.ufl.edu/foundations)); the DfE's direct-teaching list of revise, teach, practise, exception words, decodable reading, re-read and dictation, where "dictation is a vital part of a phonics session" ([Reading Framework](https://assets.publishing.service.gov.uk/media/664f600c05e5fe28788fc437/The_reading_framework_.pdf)); and Rosenshine's principles of daily review, small steps, modelling, guided practice, a high success rate of "about 80 percent", and weekly and monthly review ([Rosenshine 2012](https://www.aft.org/sites/default/files/periodicals/Rosenshine.pdf)).

Session length is a **design recommendation**. The DfE says sessions "might be only ten minutes long in the first few days". Clackmannanshire used about 20 minutes a day ([St Andrews](https://news.st-andrews.ac.uk/archive/easy-as-a-b-c/)), and GraphoGame's trial dose was 10–15 minutes a day. No experimental source sets an optimal length.

| Step | Purpose | Typical app activity | Minutes (10–15 min session) |
|---|---|---|---|
| 1. Warm-up retrieval | Spaced review of taught GPCs and tricky words (scheduler-chosen) | Flash: see grapheme, choose/say sound; hear sound, pick grapheme | 2 |
| 2. Sound focus (PA + contrast) | 1–2 PA skills with letters; one Japanese contrast item | Elkonin boxes with tiles; minimal-pair listening | 1–2 |
| 3. New GPC | Explicit teaching: hear the sound in known words, mouth cue, embedded-picture mnemonic, grapheme in both cases, tracing | "Meet the sound" sequence (below) | 2 |
| 4. Blending drill | Blend new and old GPCs left to right | Fred-style sound talk, then child builds or chooses the word; picture revealed **after** | 2 |
| 5. Word building (encoding) | Segment and spell with grapheme tiles; word chains (cat→cap→map) | Spell from audio | 2 |
| 6. Tricky word | Map the regular parts, mark the irregular part with a heart | Heart-word builder | 0.5–1 |
| 7. Connected text | Decodable sentence or mini-story; re-read | Story reader with tap-for-sound support | 2–3 |
| 8. Dictation + check | One short sentence from taught GPCs only; 1–2 meaning questions | Tile dictation; picture-tap question | 1–2 |
| 9. Close | Informational praise; mastery map update; neutral stop | "You can read 42 words now" | <0.5 |

**Instructional sequence for a new GPC.** The /sh/ example in the brief generalises well and is consistent with WWC and Ehri:
1. Hear /ʃ/ in three known words, with pictures, before seeing print.
2. Discriminate it from its nearest confusion: /s/ for Japanese learners, using minimal pairs such as sip/ship.
3. See the mouth cue. Ehri reports articulatory pictures helped preschoolers learn to read words faster ([Ehri 2014](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf)).
4. Meet the grapheme as **one tile** with an embedded mnemonic, where the letter shape is drawn into the object. Shmidman & Ehri found this beat unrelated pictures (same source).
5. Recognise it: hear the sound, pick the grapheme.
6. Recall it: see the grapheme, produce or select the sound.
7. Find it within words.
8. Blend words containing it.
9. Segment and spell words containing it.
10. Read it in a sentence, then a story.
11. Return to it in spaced review and in later stories.

For digraphs the WWC is explicit: "a digraph makes a single sound and must be taught as a unit". Clusters, by contrast, are taught sound by sound and blended, never memorised as units ([WWC](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf)).

### Activity taxonomy: essential, optional, avoid

The governing rule comes from two findings. Children must be "minds-on", not merely tapping ([Hirsh-Pasek et al. 2015](https://www.psychologicalscience.org/index.php/publications/educational-apps.html)). And in *Zombie Division*, where the learning was built into the core mechanic, children scored higher on a delayed test and played **more than 7× as long** in free choice ([Habgood 2015](https://core.ac.uk/download/42540939.pdf)). In this app the reading act *is* the game action.

The guessing risk is quantifiable. With 3 options, 5 correct in a row by chance is about 0.4%; but 4 of 5 correct is still about 4.5% ([Pelánek on guessing floors](https://www.fi.muni.cz/~xpelanek/publications/CAE-elo.pdf); arithmetic from the assessment notes). So mastery evidence should come mostly from **constructed responses**.

| Activity | Skill / purpose | Introduce | Difficulty progression | Feedback | Game wrapper that keeps the objective | Status |
|---|---|---|---|---|---|---|
| Listen & pick grapheme | GPC recognition | Unit 1 | 2 → 4 options; lures chosen from known confusions | Replay sound, highlight correct tile, re-queue | Feed the monster the right "sound fruit" | **Essential** (not mastery evidence alone) |
| See grapheme → choose/say sound | GPC recall | Unit 1 | Untimed → about 2 s latency once accurate | Model sound + mouth cue | Speed-sounds flash (accuracy first) | **Essential** |
| Minimal-pair discrimination | Phoneme perception (EFL) | Stage 0 / as pairs unlock | Single words → in sentences; several voices | Replay both, show the mouth difference | "Which one did Fred say?" | **Essential for Japanese learners** |
| Initial/final phoneme isolation | PA (onset first, then final) | Stage 0 | Initial → final → medial | Model the stretched word | Sound-hunt with tiles | **Essential**, brief |
| Elkonin boxes (segment with tiles) | PA + encoding | Unit 1 | Counters → letter tiles; 2 → 4–5 phonemes | Run finger under boxes, replay | Fill the train carriages | **Essential** |
| Blend to read (sound talk) | Decoding | Unit 1 | VC → CVC → clusters → multisyllable; continuous before stop sounds | Re-blend slowly; reveal the word *after* the attempt | Fred says the sounds, child builds or chooses the word | **Essential** |
| Build word from audio (spell) | Encoding | Unit 1 | Only taught GPCs; minimal-pair chains | Show the mismatched tile, replay that phoneme | Repair the robot's word | **Essential** (strong mastery evidence) |
| Word chains (change one grapheme) | Manipulation with letters | Unit 2 | One position → any position | Highlight the changed sound | Magic-wand transformations | **Essential** |
| Read word → match picture | Decoding + meaning | Unit 1 | Lures share initial letter (cat/cap/cot) so the first letter alone fails | Re-blend; reveal picture | Tap the right sticker | **Essential, if the lures are designed this way** |
| Pseudo-word reading ("monster names") | Decoding transfer | End of Unit 3 | CVC → structures from the current stage | Model; no meaning check | Name the new monster | **Essential** as an assessment probe, used sparingly |
| Heart-word mapping | Tricky words | Unit 2 | 1–2 per unit | Highlight the irregular part | Heart sticker on the tricky bit | **Essential** |
| Sentence read → picture/choice | Sentence comprehension | Unit 3–4 | 3 → 6+ words | Re-read with highlighting | Make the scene happen | **Essential** |
| Decodable story, 3 reads | Connected text, fluency, comprehension | End of Unit 3 | Ditties → books | Tap-for-sounds on read 1; model voice on read 2 | Unlock the story in the monster's library | **Essential** |
| Dictation sentence | Encoding in context | Stage 2 | 3 → 8 words | Show the first error, retry | Write the monster a note | **Essential** |
| Sort words by sound/spelling | Alternative spellings | Stage 5 | 2 → 3 categories | Explain the category with audio | Sorting machine | Optional |
| Syllable chop and blend | Multisyllable decoding | Stage 6 | Compound → VC/CV → V/CV | Show the chop, re-blend | Chop the log | **Essential in Stage 6** |
| Word sums (affixes) | Morphology | Stage 3 (inflections); Stage 6 | -s/-ing/-ed → derivational affixes | Show meaning change | Word-factory | **Essential from Stage 6** |
| Timed reading of an unpractised passage | Fluency measure | Stage 4+ | Personal growth curve | No "fast!" pressure; accuracy is shown first | Private "my reading graph" | Optional measure |
| Record-and-compare read-aloud | Fluency/prosody practice | Stage 2+ | Word → sentence → story | Self-compare with the model | Monster echo | Optional (on-device only) |
| Letter tracing | Letter formation | Unit 1 | Guided → free | Generous stroke tolerance | Paint the letter | Optional (handwriting, not phonics evidence) |
| Rhyme/rime games | Analogy | Stage 4+ | Supported, with audio | — | Rhyme rocket | Optional, late for Japanese learners |
| Listening story + questions | Language comprehension, vocabulary | Stage 0 | Pictures → longer narratives | Replay the relevant part | Story time | **Essential (V/C strands)** |

**Activities to avoid:**

| Activity | Why |
|---|---|
| Picture-first word matching | The picture gives away the answer |
| Two-option taps counted as mastery | Too easy to succeed by chance |
| Reaction-speed bubble popping where speed beats accuracy | Rewards speed, not reading |
| Whole-word flashcards before segmenting is secure | Trains visual memory instead of mapping |
| Riddle hints ("the place you live" for h-o-m-e) | The WWC explicitly cautions against them ([WWC](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf)) |
| Oral-only deletion drills as a goal | No causal support (see the evidence section) |
| Long celebratory animations between items | The DfE advises activities that "maximise the number of words children read and spell" |

---

## Mastery requires a ladder of evidence, not a streak of taps

### What evidence sets, and what it does not

**What established assessments do.** They test decoding with **pseudo-words read aloud**, and fluency with timed measures:
- DIBELS 8 scores Nonsense Word Fluency as "words recoded correctly", so sounding out and then blending earns credit ([DIBELS 8](https://dibels.amplify.com/docs/dibels/Whats-New-DIBELS-Eighth-Edition.pdf)).
- England's Phonics Screening Check has 40 items read aloud, "a mix of real words and pseudo-words" ([STA](https://assets.publishing.service.gov.uk/media/662b8448fddcc9e7ab225285/Phonics_2024_technical_specification_v1.0.pdf)).

**What the evidence says about thresholds.** High mastery standards beat low ones ([Kulik et al.](https://scispace.com/pdf/effectiveness-of-mastery-learning-programs-a-meta-analysis-45bgwh1byb.pdf)). But only **two studies** have systematically tested how mastery-criterion dimensions affect maintenance, and practitioners tend to use lower criteria than those that reliably produce maintenance ([McDougale et al. 2020](https://link.springer.com/article/10.1007/s40617-019-00365-2)). **No empirical source sets a specific number.** Every threshold below is labelled **DR (design recommendation — validate)**.

### The six-rung ladder

| Rung | Evidence required (DR) | Typical activity | Why |
|---|---|---|---|
| 1 Recognition | ≥4 of last 5 correct with ≥3 plausible options | Listen & pick | Cheap entry signal, discounted for guessing |
| 2 Recall | ≥4 of last 5 correct on grapheme→sound | Flash recall | Production, not recognition |
| 3 Application | ≥90% across ≥10 attempts reading/building words containing the GPC, from **≥2 different activity types** | Blend, build, chains | Prevents the skill being tied to one activity |
| 4 Transfer | ≥4 of 5 pseudo-words or unseen words containing the GPC decoded correctly | Monster names | The decoding test used by the PSC and NWF |
| 5 Automaticity | Median recall latency ≤ ~2 s *after* accuracy is established | Flash | Borrowed from incremental rehearsal's definition of a "known" item ([Tucker & Burns 2016](https://nj.dyslexiaida.org/wp-content/uploads/sites/18/2025/10/Tucker-and-Burns-CQ_44_6.pdf)) |
| 6 Retention | Correct on review in a session ≥24 h later | Spaced review | Multi-session criterion; the literature leans toward these for maintenance |

A GPC is "mastered" only at rungs 4–6. A **unit** is passed when every new GPC in it is at rung ≥4 and the unit's story has been read with ≥90% word accuracy and a correct answer to ≥2 of 3 picture questions. Rung 6 can complete during the next unit, so slow consolidation does not block progress.

**Japanese learners and pseudo-words.** Pseudo-word *spelling* tests were found "counterproductive for young foreign language learners" ([Tamai Allen](https://www.tuj.ac.jp/tesol/publications/working-papers/vol-14/tamaiallen)). So use pseudo-words for reading only, framed as monster names, and validate whether they confuse children. For these learners many real words already behave like pseudo-words, so unseen real words with no meaning check can serve as an alternative transfer probe.

### Assessment by skill

| Skill | In-app measure | Response format | Notes |
|---|---|---|---|
| Letter recognition / names | Name ↔ letter matching, both cases | Choose, 4 options | MEXT requires recognising printed letters and pronouncing their "readings" ([Course of Study](https://jp-cos.github.io/en/82H/12D2200000000)) |
| Letter–sound correspondence | Rungs 1–2, 5 | Choose + latency | Lures from confusion pairs |
| Phoneme discrimination | Minimal-pair accuracy by contrast | Choose (2 options, needs many trials) | Track per contrast (r/l, b/v, vowels) |
| Blending | Build/choose the word after sound talk | Construct | Rung 3 |
| Segmenting / spelling | Tile spelling from audio; dictation | Construct | The DfE notes reading runs ahead of spelling; don't hold reading back on spelling |
| Decoding unfamiliar words | Pseudo-words / unseen words | Choose-from-audio or self-read + reveal | Rung 4 |
| Tricky words | Recognition + heart-word build | Choose + construct | |
| Reading accuracy | % words correct in story read 1 (tap-help counted as an error) | Self-read with help taps | Proxy, since speech is not graded |
| Fluency | Time per unpractised passage; personal curve | Timed self-paced read | **Not** compared with US L1 norms, which are designed for native speakers (e.g. 60 words correct per minute at the 50th percentile, end of grade 1) ([Hasbrouck & Tindal](https://www.readingrockets.org/article/fluency-norms-chart-2017-update)) |
| Vocabulary | Picture-choice from audio and from print | Choose | Separates "can't decode" from "doesn't know the word" |
| Comprehension | 1–3 picture questions per story (literal, then one inference) | Choose | Low-level in early stages (DIBELS notes maze measures tap mainly low-level comprehension) |

**Speech recognition must not be a mastery gate.** Off-the-shelf ASR on young L2 learners had word error rates of 0.25–0.38, and models "tend to correct the speakers' errors, which renders giving corrective feedback impossible" ([Michot et al. 2024](https://ar5iv.labs.arxiv.org/html/2406.03235)). The browser Web Speech API is server-based by default ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)). The amended COPPA Rule adds voiceprints to "personal information" ([Federal Register](https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule)). A vendor study did report about 95% agreement with teachers on known text ([Scientific Learning](https://www.scilearn.com/wp-content/uploads/30389RASensitivity.pdf)), but that used constrained text and a tuned engine. The recommendation stands: on-device record-and-compare playback only.

### Adaptive engine and spaced review

Settles & Meeder's half-life regression beat Leitner on prediction error (MAE 0.128 vs 0.235), but it was trained on 12.9 million traces. In live tests it moved daily retention only +0.3% ([Settles & Meeder 2016](https://preview.aclanthology.org/fix_video/P16-1174.pdf)). Elo models need about 100 students before item difficulties are reliable, and item selection can target about 75% success ([Pelánek 2016](https://www.fi.muni.cz/~xpelanek/publications/CAE-elo.pdf)). Incremental rehearsal places each unknown item among **8–9 known items**, and children recalled about 90% after a day ([Tucker & Burns](https://nj.dyslexiaida.org/wp-content/uploads/sites/18/2025/10/Tucker-and-Burns-CQ_44_6.pdf)).

So launch with a **hand-tuned half-life (continuous Leitner)** scheduler, stored on-device. Add Elo difficulty calibration only after pilot data exists. Every constant below is a DR.

```text
# Per item (GPC, tricky word, vocabulary word, contrast pair):
item = {id, rung:0..6, halfLifeHrs:12, lastSeen, attempts[], confusions{}}

recallProb(item, now) = 2 ** (-(now - item.lastSeen) / item.halfLifeHrs)

on_answer(item, correct, latency, activityType, optionsCount):
    weight = 1.0 if activityType in CONSTRUCTED else (1 - 1/optionsCount)   # discount guessing
    log attempt
    if correct: item.halfLifeHrs *= (2.0 if weight >= 0.66 else 1.4)
    else:
        item.halfLifeHrs = max(4, item.halfLifeHrs / 2)
        record confusion with chosen lure          # e.g. b→d, r→l
        requeue item after 2–4 other items         # same session
        if 2 errors on item this session or failed delayed review:
            item.rung = min(item.rung, 2); schedule RETEACH micro-lesson
    promote rung when the ladder criteria are met (see table)

build_session(child):
    due   = items where recallProb < 0.85, sorted lowest first
    new   = next unit GPCs if gate_open(child) else []
    ratio = 1 new : 8 known   if child.recentAccuracy < 0.75 or child.stage <= 1
            1 new : 4 known   otherwise
    maxNew = 2 (Stage 0–1), 3 (later)
    add confusion-pair drills for any pair with ≥3 confusions in last 7 days
    target expected success 0.75–0.85; if forecast > 0.9, pull 1 harder item; if < 0.7, swap in easier knowns
    always end with connected text if the unit has a story

during_session:
    if errors on KNOWN items rise (≥3 of last 6): stop introducing new items   # IR fatigue rule
    hard stop at the configured session length; neutral "see you next time"

gate_open(child):
    all GPCs of current unit at rung ≥ 4 AND unit story read ≥ 90% accurate
    AND no prior-unit GPC with recallProb < 0.6 after review

placement (optional, start or teacher-triggered):
    sample 2 items per unit, pseudo-words + recall, stop after 2 consecutive failed units;
    start at first failed unit; mark earlier units "provisionally mastered" (rung 4) pending review
```

**What to collect** (on-device only): per-item attempts with correctness, latency, activity type, options count and chosen lure; story accuracy, help-taps and question answers; session length and time of day. No names, voices or free text leave the device.

---

## Decodable stories are generated against a validator, never by hand alone

### The story specification

The DfE says decodable texts should "run alongside or a little behind the teaching of the GPCs" and be read "most days" ([Reading Framework](https://assets.publishing.service.gov.uk/media/664f600c05e5fe28788fc437/The_reading_framework_.pdf)). Cheatham & Allor warn that decodability should be only one of several criteria ([review](https://www.readingrockets.org/resources/resource-library/influence-decodability-early-reading-text-reading-achievement-review)). So each story carries a machine-checked specification. The decodability thresholds are **conventions**: the circulating figures range from 80% to 100%, with no primary evidence for any cutoff.

| Field | Content | Rule (DR) |
|---|---|---|
| `unit` | The unit after which the story is readable | Earliest unit where the validator passes |
| `allowedGpcs` | Derived automatically from the sequence up to `unit` | Never hand-edited |
| `focusGpcs` | The unit's new GPCs | ≥30% of content words contain one |
| `trickyWords` | Taught tricky words used | Max 1–2 *new* ones, pre-taught |
| `decodability` | % of tokens decodable or taught tricky words | **100% in Stages 1–3**; ≥95% later |
| `vocabulary` | Each content word's tier: known oral, loanword, picture-supported new | ≤1 new picture-supported word per page early; every word glossed on tap |
| `sentenceSpec` | Words per sentence, sentences per page | Stage 1: 3–6 words, 1–2 sentences; grows by stage |
| `pictureRule` | Illustration supports but must not reveal the decodable words | Reviewer checklist |
| `comprehension` | 1–3 questions: literal first, then one inference | Picture-tap answers |
| `reads` | Read 1 decode (sound-button help) → read 2 fluency (model available, echo) → read 3 expression/comprehension | Copies RWI's three reads |
| `difficulty` | Computed: unit, mean sentence length, multisyllable % | For ordering within a unit |
| `topicSet` | Knowledge theme (school, animals, food, Nagasaki, seasons) | Stories cluster into coherent sets so vocabulary repeats |

### How the library grows and when it loosens

The library expands in step with the sequence:
- **Stage 1**: "ditties" of 1–3 sentences.
- **Stage 2**: 4–8 page stories.
- **Stage 4**: short books.
- **Stage 6**: multi-chapter stories and simple non-fiction, which builds the knowledge that Castles et al. identify as the long-term limit.

**Generation pipeline:**
1. A person or an LLM drafts from the unit's allowed-word list.
2. The validator rejects any token not decodable at the unit.
3. A human reviews naturalness, age-appropriateness for 6–12-year-olds (older beginners must not get babyish content) and the picture rule.
4. Only then is the story published.

Unvalidated generated text never ships. UNC TRI's free decodable books are a possible reference resource ([UNC TRI](https://tri.fpg.unc.edu/decodable-books/)), but their licence must be checked.

**Transition to less-controlled text** (DR) requires three things:
- the simple code plus common alternatives are at rung ≥4;
- pseudo-word transfer is above 90% at the Stage 5–6 level;
- reading time on unpractised decodable passages is rising.

The DfE's case study child "no longer needed the support of 'decodable' books" by the end of Year 1 ([Reading Framework](https://assets.publishing.service.gov.uk/media/664f600c05e5fe28788fc437/The_reading_framework_.pdf)). Japanese EFL learners will be held back by vocabulary, not code. So in Stage 7 the filter switches from "% decodable" to "% of words known orally plus % of untaught GPCs". Listening stories above reading level continue throughout.

---

## Japanese learners need the same code, different input

### What the evidence says about the learner

**Phonology.** Japanese has five vowels, no diphthongs, no /l/–/r/, /v/ or /θ ð/ contrasts. Final consonants and clusters attract inserted vowels ([Lesley 2014](https://aws1.hpu.edu/research-publications/tesol-working-papers/2014/TESOL_WPS_2014_Lesley.pdf)). The difficulty is perceptual as well as articulatory ([Dupoux et al.](https://web-archive.southampton.ac.uk/cogprints.org/747/index.html)).

**Katakana.** Katakana collapses contrasts: *cold, called, code* and *cord* all become "kōdō" ([Beasom 2011](https://accentsasia.org/issues/4-1/beasom.pdf)). Beasom argues learners need explicit phonological instruction rather than katakana guides. That argument rests on small diagnostic studies, not trials.

**Mora segmentation.** Kana literacy pushes children toward mora segmentation ([Inagaki et al. 2000](https://acnpsearch.tweb-dev.unibo.it/singlejournalindex/68429415)). Phoneme awareness is weak without alphabetic literacy ([Spagnoletti et al. 1989](https://link.springer.com/article/10.1007/BF00377644)). But it **is trainable**, and training worked best when it referred explicitly to the kana grid's consonant rows and vowel columns ([Goetry et al. 2005](https://www.cambridge.org/core/journals/applied-psycholinguistics/article/abs/paths-to-phonemic-awareness-in-japanese-evidence-from-a-training-study/CCAB2224CBCB0984EDA178D78B8BEA50)).

**Small Japanese studies.** Twelve sessions of synthetic phonics improved phonemic awareness in 17 second graders, with no control group ([Sasaki 2024](https://www.jstage.jst.go.jp/article/seec/12/0/12_41/_article/-char/en)). In a 59-child Tokyo pilot, alliteration was easier than rhyme ([Tamai Allen](https://www.tuj.ac.jp/tesol/publications/working-papers/vol-14/tamaiallen)).

**Romaji.** Japanese students fall back on a romaji strategy for unfamiliar English words ([Doki 1996](https://www.ideals.illinois.edu/items/132958)).

**MEXT policy.** Grades 5–6 must recognise letters and pronounce their readings, and understand words "sufficiently familiarised through sound" ([Course of Study](https://jp-cos.github.io/en/82H/12D2200000000)). The commentary states that English letters have both a name and a sound ([Allen-Tamai](https://www.benesse.jp/berd/special/arcle/report/pdf/2019_01.pdf)).

**Second-language literacy.** Word-level skills can match native levels, but text-level skills "rarely reach levels equal to monolingual English speakers". Methods that work for native speakers work with "lower" effects, and "adjustments are needed" ([Escamilla 2009](https://www.shanahanonliteracy.com/upload/publications/45/pdf/10862960903340165.pdf)). That evidence comes from immersed ESL learners. Japanese children with one or two lessons a week face a more severe oral-language bottleneck.

**No controlled trial** compares a Japanese-adapted phonics programme with an unadapted one. Every adaptation below is inferred.

### What stays and what changes

| Keep unchanged | Change or add (all inferred; validate) |
|---|---|
| Explicit cumulative GPC sequence; blending and segmenting; grapheme tiles | **Meaning first**: every decodable word is met with picture, audio and (if needed) a Japanese gloss before it is decoded, satisfying MEXT's "familiarised through sound" |
| Decodable text from taught GPCs + few taught tricky words | **Vocabulary filter**: known Let's Try / New Horizon words, picturable words and useful loanwords first; obscure CVC words (nab, vat, cog) only as marked "silly words" |
| Heart-word mapping of irregular parts | **Contrast packs** unlocked as both members are taught: a/o/u, i/e, i/ee, oo/oo, r/l, b/v, f/h, s/sh before i, th/s, final consonant vs added vowel. Several native voices (high-variability training literature not fetched; unverified for children) |
| Daily connected text, three reads | **Pure consonants** taught with the kana-grid analogy (か = k + a), directly countering vowel insertion |
| Spaced cumulative review | **Onset before rime**: initial sound, then final, then medial; rhyme late and supported |
| English phoneme distinctions are all taught, including hard ones | **Romaji-conflict callouts** for vowels and r/f/h/c/x/q ("ローマ字の a とちがうよ") |
| Letter names *and* sounds (MEXT) | **No katakana pronunciation**, ever. Japanese for instructions, hints and meanings only |
| Same GPC order principles | **Clusters brought forward** (the hybrid decision); **diphthong teaching** at long vowels; final-consonant tasks throughout |
| Mastery gating | **Slower, mastery-gated pacing**; pseudo-words for reading only |
| — | **Pronunciation goal = intelligibility, not native accent** (below) |

**Intelligibility, not accent.** Accent, comprehensibility and intelligibility are partly independent dimensions, a finding confirmed in a 2021 replication ([FORRT record](https://forrt.org/flora-replication-atlas/doi/10.1111/j.1467-1770.1995.tb00963.x/)). Jenkins' Lingua Franca Core keeps consonant contrasts (including r/l), avoidance of consonant deletion, and vowel length. It tolerates th-substitution, a final added vowel ("ri:do" for read), vowel quality differences, weak forms and connected speech ([summary](https://helhoard.com/2022-06-17.html)).

For a decoding app this produces a clean rule: **require the distinction in recognition and spelling tasks** (the child must pick "lock" vs "rock" and spell "think" with th), but never mark accented production as wrong. Decoding English and speaking it fluently are separate goals, and the app assesses the first.

**Loanwords cut both ways.** Bus, cup, pen and bed are known through katakana, which protects meaning. But the stored form "basu" competes with the English one. Use them deliberately, with an "English sound vs katakana sound" contrast moment.

---

## Engagement must come from the reading act, and the stack can stay static

### Design principles

**Rewards.** Deci, Koestner & Ryan's 128-study meta-analysis found that expected, tangible rewards undermine intrinsic motivation:

| Reward type | Effect on free-choice motivation (d) |
|---|---|
| Engagement-contingent | **−0.40** |
| Completion-contingent | −0.36 |
| All tangible | −0.34 |

Tangible rewards harmed **children more than college students**, and verbal praise helped children less (d = 0.11, not significant) ([Deci et al. 1999](https://depts.washington.edu/techdocs/papers/deciExtrinsicRewardsAndIntrinsicMotivation99.pdf)).

**Games and gamification.** Games improve learning on average (g = 0.33), and **design, not the medium**, explains the difference ([Clark et al.](https://www.sri.com/publication/education-learning-pubs/digital-learning-pubs/digital-games-design-and-learning-a-systematic-review-and-meta-analysis-brief/)). Gamification's cognitive effects held in rigorous studies. Narrative and fantasy framing looked promising, and competition alone can be problematic ([Sailer & Homner summary](https://gamification-research.org/2019/08/does-gamification-of-learning-work/)).

**What apps are good at.** Apps work best on **constrained skills** such as letter-sounds and decoding. The mean effect is +0.31 SD, and it is inflated on researcher-made tests ([Kim et al. 2021](https://doaj.org/article/f2edb9ab9f2e49169c5c4ee715c3994b)). That is exactly the P strand. Vocabulary and comprehension need people talking.

Those findings produce a concrete game structure:

| Element | Recommendation |
|---|---|
| World and mascot | A monster that "learns" each sound the child teaches it. The **mastery map is the progression system**: each GPC is a visible collectible earned at rung 4, not by logins or time |
| Cosmetic unlocks | Unexpected or tied to mastery milestones, never purchasable with a time-earned currency |
| Feedback | Informational ("You blended s-u-n!") |
| Forbidden mechanics | Streak penalties, loot boxes, variable-ratio prize wheels, guilt-laden "continue" prompts. The UK Children's Code names reward loops and autoplay as detrimental "sticky" features, and asks for neutral continue options and pause without lost progress ([ICO Standard 5](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/5-detrimental-use-of-data/)) |
| Social / classroom | A **class/projector mode** with whole-class call-and-response, sound-talk and story reading, backed by the GraphoGame adult-interaction moderator and Hirsh-Pasek's social pillar. Class-wide cooperative goals instead of individual leaderboards |
| Screen layout | On a 1366×598 Chromebook screen, use targets of at least 2 cm (NN/g's figure for young children; roughly 75–90 CSS px depending on DPI) and 2–6 choices per screen |
| Input | **Every interaction works with a single click**, because under-9s find dragging and small targets hard with a mouse or trackpad ([NN/g](https://www.nngroup.com/articles/children-ux-physical-development/)) |
| Audio and visuals | Audio-first instructions with a replay button; no decorative animation during decoding. The DfE cites evidence that highly decorated environments undermine concentration |
| Parent/teacher view | Shows mastered sounds, current unit and struggling contrasts. No evidence base was found for dashboards, so keep them simple |

### Technical architecture: curriculum as data

**Audio.**
- Use **recorded human audio** for phonemes, words and instructions. Browser speechSynthesis is unreliable: Chrome desktop voices need internet, utterances over about 14 s are cut off, and ChromeOS voice packs can vanish after updates, with first-utterance delays of up to a minute ([Readium audit](https://readium.org/speech/docs/WebSpeech.html)).
- Audio cannot play until the user interacts ([MDN Autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)), so begin with a "tap to start" screen that creates one AudioContext. Play decoded buffers through it.
- Ship **MP3** as the baseline, since it is supported across Chrome, Firefox and Safari ([MDN codecs](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Audio_codecs)).
- Package audio as per-lesson sprites to suit slow school Wi-Fi.
- Record continuous sounds held for about 0.5–1 s and stop sounds clipped with no "uh". One consistent accent throughout.

**Offline and storage.** The app is a PWA: service worker plus Cache API for lesson packs, IndexedDB for progress. Call `navigator.storage.persist()` during a meaningful user action, because storage is otherwise evictable ([web.dev](https://web.dev/articles/persistent-storage)). Shared or wiped school Chromebooks are likely (unverified for Nagasaki schools), so add a **progress code**: a short string or QR code encoding unit and mastered items, plus JSON export/import.

**Rendering.** DOM/CSS for text and buttons, canvas only for animated scenes and tracing, using Pointer Events.

```json
{
  "contentVersion": "0.1.0",
  "accent": "en-US",
  "phonemes":  [{"id":"ph_sh","ipa":"ʃ","audio":"ph/sh.mp3","mouthCue":"img/mouth/sh.png",
                 "contrasts":["ph_s"],"jaNote":"「シ」ではなく、息だけ"}],
  "gpcs":      [{"id":"g_sh","grapheme":"sh","phoneme":"ph_sh","type":"digraph",
                 "unit":"U08","mnemonic":"img/mn/sh_ship.png","tile":"sh"}],
  "words":     [{"id":"w_ship","text":"ship","segments":["g_sh","g_i","g_p"],
                 "audio":"w/ship.mp3","image":"img/w/ship.png","meaningJa":"ふね",
                 "vocabTier":"known-oral|loanword|new-pictured|silly",
                 "sourceList":["LetsTry2"],"structure":"CVC"}],
  "trickyWords":[{"id":"t_said","text":"said","segments":["g_s","x_ai_e","g_d"],
                 "irregular":[{"index":1,"note":"ai says /e/"}],"releaseUnit":"U07",
                 "decodableFromUnit":null}],
  "units":     [{"id":"U08","stage":2,"newGpcs":["g_sh","g_ch"],"newTricky":["t_she","t_have"],
                 "contrastPacks":["cp_s_sh"],"prereqs":["U07"],
                 "lessons":["L08_1","L08_2","L08_3","L08_4"],"stories":["s_shop_ditty"],
                 "mastery":{"rungRequired":4,"storyAccuracy":0.9,"questionsCorrect":2}}],
  "lessons":   [{"id":"L08_1","steps":[
                 {"type":"retrieval-flash","pool":"due"},
                 {"type":"minimal-pair","pack":"cp_s_sh","n":6},
                 {"type":"meet-sound","gpc":"g_sh"},
                 {"type":"blend-build","words":["w_ship","w_shop","w_fish"]},
                 {"type":"spell-tiles","words":["w_dish"]},
                 {"type":"heart-word","word":"t_she"},
                 {"type":"story-read","story":"s_shop_ditty","reads":[1]},
                 {"type":"dictation","sentence":"I can see a fish."}]}],
  "stories":   [{"id":"s_shop_ditty","unit":"U08","pages":[{"text":"Sam is in the shop.","image":"..."}],
                 "focusGpcs":["g_sh"],"questions":[{"type":"literal","answerImage":"..."}],
                 "topicSet":"shopping","validated":{"decodability":1.0,"by":"validator@0.1"}}],
  "activityTypes": ["retrieval-flash","minimal-pair","meet-sound","blend-build","spell-tiles",
                    "word-chain","read-match-picture","pseudo-word","heart-word","story-read",
                    "dictation","sort","syllable-chop","word-sum","listening-story"]
}
```

**Engine rules.**
- The engine maps each `activityType` to a game module and never hard-codes curriculum.
- Progress references stable IDs, never array positions.
- A build-time validator enforces three checks: (a) every word's segments exist and are taught by the unit that uses the word; (b) every story passes its decodability rule; (c) every unit's prerequisites come earlier.

This is how "technical convenience never dictates sequencing": units can be reordered for the pilot by editing JSON, and the validator re-certifies every story.

| Feature | Static site? | Notes |
|---|---|---|
| All lessons, audio, stories, offline play | **Yes** | PWA + lesson packs |
| Adaptive engine, spaced review, placement | **Yes** | Runs on-device |
| Progress persistence | **Yes** (fragile) | IndexedDB + persist() + progress code/QR + JSON export |
| Class/projector mode, printable certificates and cards | **Yes** | |
| Record-and-compare self-listening | **Yes** | MediaRecorder, never uploaded |
| Aggregate class view | **Partly** | Teacher scans students' progress QR codes on their own device |
| Cross-device sync, accounts, live teacher dashboard | **No** (server) | Privacy obligations; defer |
| Speech-recognition grading | **No** (server or unreliable) | Excluded from v1 |
| Analytics | Avoid, or self-hosted aggregate-only | No third-party trackers, no ads |

On privacy, a fully static, on-device, tracker-free design is the simplest posture under COPPA (amended 2025, compliance date 22 April 2026) and the UK Children's Code. **Japan's APPI and MEXT's school cloud-security guidance were not researched** and must be checked before any school deployment.

---

## The roadmap ships one tested stage at a time

| Phase | Delivers | Exit criteria (all DR) |
|---|---|---|
| **0. Foundations** | Accent decision; JSON schema; build-time validator (decodability, prerequisites, segment integrity); phoneme audio spec and recording of all phonemes plus Stage 0–1 words in one voice, with a second voice for contrast packs; engine shell (1366×598 letterboxed stage, single-click input, AudioContext unlock, audio sprites); IndexedDB progress + progress code; offline caching; privacy notice; vocabulary list for Stages 0–2 cross-checked against Let's Try / New Horizon | Validator rejects a deliberately undecodable story; app loads and runs offline on a school Chromebook and a home tablet; progress survives reload and round-trips through the code; a colleague (e.g. another ALT) audits phoneme recordings for pure sounds and no added vowels |
| **1. MVP: Stage 0 + Stage 1 (Units 1–7)** | Lesson template end-to-end; essential activities (listen-pick, recall flash, minimal pair, Elkonin/spell tiles, blend-build, word chain, read-match-picture with initial-letter lures, pseudo-word, heart word, story reader with 3 reads, dictation); mastery ladder rungs 1–6; half-life scheduler; ~10–15 ditties; class/projector mode; simple teacher view | **Guess-bot test**: a simulated random clicker never reaches rung 4 on any GPC. Every Unit 1–7 word and story passes the validator. Pilot with one or more classes: item-level logs exported anonymously by hand; completion rates and time-per-unit recorded against targets **set before the pilot**; teacher can run class mode unaided |
| **2. Stages 2–3 (digraphs, clusters, -ing/-ed)** | Units 8–16; cluster-specific segmenting tasks; contrast packs s/sh, th, r/l-in-clusters; placement test; 4–8 page stories; confusion-pair drill generator | Pilot data shows cluster spelling without inserted vowels improving across units; placement agrees with teacher judgement; story accuracy ≥ target on unpractised stories |
| **3. Stage 4–5 (simple code complete, alternatives)** | Units 17–31; sort activities; "try the other sound" routine; fluency timing on unpractised passages (personal curve); record-and-compare; short books; Japanese-gloss tap | Retention (rung 6) rates stable at the larger item count; scheduler keeps session success at 75–85%; children choose between alternative spellings above chance on sorts |
| **4. Stage 6–7 (multisyllable, morphology, bridge)** | Units 32–37+; syllable-chop and word-sum; schwa routine; knowledge-themed text sets and listening library; less-controlled texts filtered by known-vocabulary %; Elo difficulty calibration once ~100+ learners exist | Pseudo-word transfer at Stage 6 level; rising reading rate on unpractised passages; comprehension questions answered on less-controlled texts |
| **5. Optional infrastructure** | Only if justified by use: opt-in sync, class dashboard, research-grade evaluation with an independent standardised measure | Privacy review (APPI/MEXT, COPPA) passed before any data leaves devices |

---

## Gaps, open questions and decisions that need real children

### Audit against the brief's checklist

| Check | Status | Remaining issue |
|---|---|---|
| 1. Every concept has an introduction point | Met for GPCs, structures and tricky words through Unit 37 | Stage 7 content (genres, knowledge sets) is only sketched |
| 2. Prerequisites identified | Met in the dependency map and `prereqs` | Vocabulary prerequisites per word must be filled during content build |
| 3. No concept depends on untaught knowledge | Enforced by the validator | Tricky words with temporarily untaught GPCs are an intentional, flagged exception |
| 4. Sufficient practice | Scheduler + ratios | **Practice quantity per GPC is unvalidated**; the EFL dose is unknown |
| 5. Systematic revisiting | Half-life review + contrast packs | Constants are guesses |
| 6. Regular application to reading | Connected text in every lesson from Unit 3 | Units 1–2 have only phrases; acceptable but thin |
| 7. Decodables match the curriculum | Validator | Picture-giveaway rule needs human review |
| 8. Assessment measures skill, not game play | Constructed responses + transfer + delayed retention + guess-bot test | Reading accuracy without speech grading is a proxy |
| 9. Vocabulary and comprehension alongside decoding | V and C strands | Unconstrained skills are where apps work least; class mode is the mitigation |
| 10. Progression beyond phonics | Stages 6–7 | The authentic-text transition rule is a convention |

**Sequencing risks spotted:**
- "he/we/me/be" are released as tricky words in Unit 6 but only become decodable in Unit 26. That is a long tricky period, so consider teaching open-syllable e earlier.
- "the" is taught as tricky in Unit 3 and stays tricky until schwa (Unit 33).
- Bringing clusters forward delays vowel digraphs by about six units, which postpones words like "tree", "green" and "moon". These appear in early Japanese classroom vocabulary, so the trade-off must be measured.
- The UFLI letter order comes from my OCR of the official chart and disagrees with a third-party summary on where blends sit. Re-check against the official PDF.

### Evidence gaps

Several sources were reported only second-hand:
- Ehri et al. (2001) via a pro-phonics secondary source.
- The NRP's PA dose of roughly 5–18 hours, unverified.
- The DfE "4 GPCs per week" figure, not found in the Reading Framework.

There is no study of perceptual epenthesis or vowel discrimination in Japanese children aged 6–12. All the Japanese perception evidence comes from adults. There is no trial of heart words against flashcards, no trial of UK against US ordering, no evidence-based decodability threshold, no evidence-based latency cutoff, and no EFL fluency norms. Japan's APPI and MEXT guidance on school data were not researched. Several competitor rows are largely unknown: Nessy, Starfall, Hooked on Phonics, Phonics Hero and Floppy's Phonics.

### Decisions to validate with real children

| # | Decision | How to test |
|---|---|---|
| 1 | Hybrid order (clusters before vowel digraphs) vs UK simple-code order | Two content branches (JSON reorder) across classes; compare cluster spelling and Stage 4 progress |
| 2 | Opening set s a m t i n p d | Early blending success; error patterns on stop sounds |
| 3 | Accent choice (en-US) and rhotic vowel teaching | Teacher feedback against textbook audio; r-vowel spelling errors |
| 4 | All mastery thresholds (rungs, 90%, ≥24 h, 2 s) | Compare rung-4 status with delayed retention at 1 and 4 weeks |
| 5 | New:known ratios and the 0.85 review trigger | Session success rates; retention; child frustration signals (quits) |
| 6 | Pseudo-words as monster names for Japanese children | Confusion rates; correlation with real-word reading |
| 7 | Contrast-pack placement and dose; multi-voice audio | Minimal-pair accuracy curves per contrast |
| 8 | Kana-grid explanation of pure consonants | Rate of added-vowel errors in segmenting tasks, with vs without |
| 9 | Session length (10 vs 15 min) and frequency | Completion and retention per minute |
| 10 | Picture-after-reading rule vs guessing | Accuracy on initial-letter-lure items |
| 11 | Decodability thresholds (100% early, ≥95% later) | Story accuracy and help-tap rates |
| 12 | Tricky-word release order tuned to classroom frames | Use in sentences; teacher judgement |
| 13 | Class mode vs solo use | Unit progress and retention per mode (the GraphoGame moderator suggests adult involvement matters) |
| 14 | Progress-code workflow on shared Chromebooks | Lost-progress incidents |
| 15 | Mascot and collectibles vs plain progress map | Voluntary return without prompts; time on task vs words read per minute |

---

## Conclusion

Most of the hard decisions in this blueprint are not settled by research. The evidence fixes the method: systematic GPCs, blending and segmenting with letters, decoding instead of guessing, daily connected text, and language built alongside. It leaves open the order details, thresholds, pacing and almost everything about EFL learners. The sensible response is to **make the curriculum data, the validator and the pilot the product's core**, so that every unvalidated choice can be swapped without rewriting code. The unknowns then become experiments Mark can run in his own classroom.

The clearest gap in the market is not a better game. It is a phonics app that refuses to let children decode words they do not understand, drills the contrasts their first language hides, and expects a teacher in the room. The biggest educational risk is building a polished solo app that teaches decoding without meaning. The independent evidence on solo phonics apps (EEF's technology finding, GraphoGame's null trial) says that version is likely to underperform. **Build Phase 0 and the Units 1–7 slice first, test them with real children, and let the data decide the order of everything after.**
