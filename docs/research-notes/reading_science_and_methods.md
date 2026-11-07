# The Science of Learning to Read English and the Evidence on Phonics Methods (for a children's phonics/reading web app; audience includes Japanese EFL children aged ~6-12)

Conventions used in these notes:
- **[F]** = fetched/verified this session (content read from the linked page).
- **[DK]** = from researcher domain knowledge; the citation and DOI are given so someone can check them, but the page was NOT fetched this session. Treat numbers marked [DK] as "check before quoting".
- Evidence-strength labels: **STRONG CONSENSUS** / **PROMISING** / **DISPUTED or THIN**.
- "Cited Findings" = what sources say. "Inferences" = my interpretation and app-design implications, including a per-concept profile (meaning / why / when / development / methods / mistakes / strength).

---

## 1. Simple View of Reading (SVR) and Scarborough's Reading Rope: claims, evidence status, limitations (Active View of Reading)

### Takeaway
SVR (Reading Comprehension = Decoding x Language Comprehension) is still the best-supported top-level framework and justifies teaching both code and language. It is a simplification, though: Duke & Cartwright's Active View of Reading (2021) argues that the two components overlap, that "bridging" skills and self-regulation also contribute, and that reading difficulties have more causes than SVR covers. Treat SVR as a planning frame, not a full model.

### Cited Findings
- SVR was originally stated by Gough & Tunmer (1986), "Decoding, reading, and reading disability," *Remedial and Special Education* 7(1), 6–10. It says reading comprehension is the product of decoding and linguistic (listening) comprehension, so if either is zero, comprehension is zero. [DK] — [DOI 10.1177/074193258600700104](https://doi.org/10.1177/074193258600700104)
- Hoover & Gough (1990), "The simple view of reading," *Reading and Writing* 2, 127–160, tested the multiplicative model empirically. [DK] — [DOI 10.1007/BF00401799](https://doi.org/10.1007/BF00401799)
- Castles, Rastle & Nation (2018) use SVR as a central organising framework for the move from novice to expert reader, and argue that systematic phonics is essential early while language/knowledge become dominant later. [F: bibliographic record; content DK] — [APS summary page](https://www.psychologicalscience.org/publications/ending-the-reading-wars-reading-acquisition-from-novice-to-expert.html); [Reading Rockets record](https://www.readingrockets.org/resources/resource-library/ending-reading-wars-reading-acquisition-novice-expert); *Psychological Science in the Public Interest* 19(1), 5–51, June 2018, [DOI 10.1177/1529100618772271](https://doi.org/10.1177/1529100618772271)
- Scarborough's Reading Rope (Scarborough, 2001, chapter in Neuman & Dickinson (eds.), *Handbook of Early Literacy Research*, Guilford) breaks SVR into strands. Word recognition = phonological awareness, decoding, sight recognition, which become "increasingly automatic." Language comprehension = background knowledge, vocabulary, language structures, verbal reasoning, literacy knowledge, which become "increasingly strategic." The Rope is a heuristic illustration, not a separately tested model. [DK; no stable URL found]
- Duke & Cartwright (2021), "The Science of Reading Progresses: Communicating Advances Beyond the Simple View of Reading," *Reading Research Quarterly* 56(S1), S25–S44. They argue: (1) "Reading difficulties have a number of causes, not all of which fall under decoding and/or listening comprehension"; (2) word recognition and language comprehension are not fully independent but overlap; (3) contributors outside SVR, including active self-regulation, play a substantial role. They propose the Active View of Reading (AVR), whose overlap component is "bridging processes" (e.g., print concepts, reading fluency, vocabulary knowledge, morphological awareness, graphophonological-semantic cognitive flexibility). The bridging-process list is DK; the fetched summary did not name them. — [dyslexia.com reference summary [F]](https://www.dyslexia.com/reference/duke-cartwright-2021/); [DOI 10.1002/rrq.411](https://doi.org/10.1002/rrq.411)
- The fetched summary reported no variance-explained figures or effect sizes for AVR. Its evidence base is a synthesis of separate findings and the model as a whole has not been tested. — [dyslexia.com summary [F]](https://www.dyslexia.com/reference/duke-cartwright-2021/)
- The EEF notes that phonics "improves reading accuracy but not necessarily comprehension, which must be taught separately." This is consistent with SVR's two-component logic. [F, page updated Oct 2025] — [EEF Teaching & Learning Toolkit: Phonics](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics)

### Inferences
- **Concept profile, SVR/Rope.** *Practical meaning:* a child can only understand text they can both decode and would understand if it were read aloud. *Why it matters:* it is the reason the app must build oral English (vocabulary, sentence patterns) alongside phonics. For EFL learners this matters even more, because the language-comprehension factor starts near zero. *When:* from day one; both strands run in parallel. *Development:* early on, decoding limits comprehension most. Once decoding is fluent, language comprehension becomes the main limit (Castles et al. 2018). *Methods:* a decoding curriculum plus deliberate oral vocabulary and listening work. *Mistakes:* treating decodable reading as "reading done"; or, the reverse, asking for comprehension of text the child cannot decode. *Strength:* SVR is STRONG CONSENSUS as a framework. The multiplicative formula and the claim that the two components are independent are DISPUTED/refined. AVR is PROMISING as a framework but is not a validated model.
- For an EFL app, SVR's prediction is clear: Japanese children may decode English words they do not know orally, which gives "barking at print." Every decodable word should ideally be pictured or voiced with meaning, especially at the start.
- AVR's "self-regulation" component maps onto app features such as self-monitoring ("does that make sense?") and persistence and motivation design. That mapping is my interpretation.

### Gaps
- I did not fetch Hoover & Gough (1990) or recent SVR validation studies (e.g., variance explained in large samples), so no figures are given.
- No independent empirical test of the AVR as a whole was found.
- Scarborough (2001) is a book chapter with no stable open URL.

---

## 2. Phonological vs phonemic awareness; blending and segmenting; which PA skills matter; the "advanced PA" dispute

### Takeaway
Phonemic awareness (PA) is causally useful, especially **blending and segmenting**, **taught with letters**, focused on **1–2 skills**, and kept **brief**. Claims that oral-only "advanced" phoneme manipulation (deletion and substitution drills such as Heggerty, promoted by Kilpatrick) is necessary for orthographic mapping are DISPUTED and currently lack causal evidence (Clemens et al. 2021).

### Cited Findings
- **Definitions (DK):** phonological awareness is the umbrella term (awareness of words, syllables, onset-rime, rhyme, and phonemes). Phonemic awareness is the phoneme-level subset. Phonics is the link between phonemes and letters. — consistent with [NRP report (2000)](https://www.nichd.nih.gov/publications/pubs/nrp/smallbook) [DK]
- NRP (2000) PA effect sizes, as reported in Clemens et al.: blending/segmenting d = 0.67 (reading) and 0.79 (spelling) vs d = 0.27 (reading) and 0.23 (spelling) for other PA skills. **With letters**: d = 0.67 reading, 0.61 spelling. **Without letters**: d = 0.38 reading, 0.34 spelling. Teaching **one or two skills** gave d = 0.71–0.79 (reading) vs d = 0.27 for three or more. NRP concluded that manipulating phonemes with letters beats oral-only manipulation. — [Clemens et al. 2021, preprint PDF [F]](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf)
- NRP also found that PA programmes of moderate total length were most effective (DK: about 5–18 hours in total, with no benefit from longer programmes). [DK] — [NRP report](https://www.nichd.nih.gov/publications/pubs/nrp/smallbook)
- Bus & van IJzendoorn (1999) also found that integrating print improved PA training outcomes. — [Clemens et al. 2021 [F]](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf)
- **Clemens, Solari, Kearns, Fien, Nelson, Stalega, Burns, St. Martin & Hoeft (2021)**, "They say you can do phonemic awareness instruction 'in the dark', but should you? A critical evaluation of the trend toward advanced phonemic awareness training." Preprint, PsyArXiv, DOI 10.31234/osf.io/ajxbv, updated 21 Dec 2021; peer-review status was pending at that time. Findings [F]:
  - Factor analyses show phonemic tasks load on a single factor, so "advanced" tasks are not a distinct skill.
  - Melby-Lervåg et al. (2012) meta-analysis (235 studies): poor readers d = −1.37 on phonemic tasks, with no significant difference by task type.
  - Many skilled readers fail deletion tasks. For example, only 33% of skilled adolescent readers made no errors on cluster deletion (Scarborough et al. 1998).
  - PA and reading are bidirectional; spelling/reading knowledge drives later gains in deletion.
  - Of the 11 "highly effective" studies cited by Kilpatrick & O'Brien (2019), none permit causal inference about advanced PA.
  - The only experiment on advanced PA (Coyne et al., manuscript) compared Heggerty with business-as-usual in K–1. It found ES 0.55 on the phonemic measure but **no significant differences in pseudoword decoding or oral reading fluency (effects < .05)**.
  - Once letters are introduced, the benefit of oral-only activities "appears to disappear," including for at-risk students.
  - 10–15 min/day of oral advanced PA (36–54 hours/year) could be "a tremendous missed opportunity."
  - O'Connor (2011) is cited as supporting segmenting/blending of 3–4 sounds as a sufficient foundation.
  — [Clemens et al. 2021 PDF](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf); [Reading Rockets reprint](https://www.readingrockets.org/resources/resource-library/they-say-you-can-do-phonemic-awareness-instruction-dark-should-you)
- Other meta-analyses summarised by Clemens et al. [F]:
  - Suggate (2010): PA dw = .38 and phonics .42 immediately; at follow-up phonics .32 vs PA .18.
  - Galuschka et al. (2014): PA g = .28 (k = 3, not significant); phonics g = .32 (k = 29), the only significant approach.
  - Gersten et al. (2020): interventions with PA components had smaller-than-average effects.
  — [Clemens et al. 2021](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf)
- Ehri (2014) reports that teaching articulatory features of phonemes (mouth-position pictures) helped preschoolers learn to read words faster than letter instruction alone (Boyer & Ehri 2011; Castiglioni-Spalten & Ehri 2003). — [Ehri 2014 PDF [F]](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf)
- The WWC Foundational Skills guide's Recommendation 2 is to "develop awareness of the segments of sounds in speech and how they link to letters." [F] — [APA Div. 16 summary of the WWC guide (July 2016)](https://apadivision16.org/2016/07/new-wwc-practice-guide-strategies-for-teaching-foundational-reading-skills-in-the-early-grades/)

### Inferences
- **Concept profile, PA.** *Meaning:* hearing and manipulating the individual sounds in spoken words (c-a-t → "cat"; "ship" → /ʃ/ /ɪ/ /p/). *Why:* the alphabet encodes phonemes, so a child who cannot isolate phonemes cannot use GPCs. *When:* immediately, alongside the first letters. Optional brief oral warm-ups (syllables, rhyme, initial sound) for the youngest pre-readers. *Development:* larger units (syllable, onset-rime) usually precede phonemes; letter learning then sharpens phoneme awareness (bidirectional). *Methods:* blend and segment with letter tiles/graphemes on screen ("say it, tap it, build it"); articulatory/mouth cues; keep it brief and fold it into phonics lessons. *Mistakes:* long oral-only PA sequences that delay letters; drilling deletion and substitution ("say 'stack' without /t/") as a goal in itself; teaching many PA skill types at once. *Strength:* PA blending/segmenting linked to letters is STRONG CONSENSUS. Advanced oral manipulation as necessary or causal is DISPUTED/THIN.
- App implication: phoneme manipulation is still a good activity when done with letters (e.g., change the letter in "cat" to make "cut"). This is effectively phonics-based manipulation and fits the NRP "with letters" finding.
- **L2 note (brief):** Japanese is mora-timed and its phonotactics are mostly CV. Japanese children may insert epenthetic vowels (e.g., "su-to-ri-i-to" for "street") and confuse non-native contrasts (/l/–/r/, /b/–/v/, /s/–/ʃ/ before /i/). PA for EFL learners therefore partly overlaps with learning the L2 phoneme inventory. Consonant clusters and final consonants need explicit practice, and the app needs clear native audio models. This is my interpretation and is covered in depth by the other researcher.

### Gaps
- I did not confirm whether Clemens et al. (2021) was later published in a peer-reviewed journal, or under what title. Check before citing as peer-reviewed.
- I did not fetch Shanahan's specific blog commentary on advanced PA or responses from Kilpatrick.
- The NRP "5–18 hours" figure is DK and should be verified in the NRP report (Ch. 2).

---

## 3. GPC knowledge, decoding and encoding, and the role of spelling in reading

### Takeaway
Explicit, systematic teaching of grapheme–phoneme correspondences (GPCs), with blending to decode and segmenting to spell (encode), is the core of early word reading. Spelling practice strengthens reading because it forces complete mapping of the letters in a word.

### Cited Findings
- NRP / Ehri et al. (2001) effect sizes for systematic phonics, by outcome: decoding regular words d = 0.67, pseudowords d = 0.60, irregular words d = 0.40, reading comprehension d = 0.51 (as reported by Buckingham 2020). — [Buckingham 2020, LDA Bulletin 52(1) [F]](https://www.ldaustralia.org/app/uploads/2022/09/Buckingham-Evidence-strongly-favours-systematic-synthetic-phonics.pdf); original: Ehri, Nunes, Stahl & Willows (2001), *Review of Educational Research* 71(3), 393–447, [DOI 10.3102/00346543071003393](https://doi.org/10.3102/00346543071003393) (page fetch failed)
- WWC Recommendation 3: "Teach students to decode words, analyze word parts, and write and recognize words." [F] — [APA Div. 16 summary](https://apadivision16.org/2016/07/new-wwc-practice-guide-strategies-for-teaching-foundational-reading-skills-in-the-early-grades/)
- Ehri (2014): orthographic mapping depends on PA (especially segmenting and blending) and GPC knowledge. Ehri recommends teaching grapheme-phoneme relations, phonemic segmentation and a decoding strategy, and practising sequences of similarly spelled words (sock, sack, sick). — [Ehri 2014 [F]](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf)
- Ehri (2014): embedded picture mnemonics, where the letter shape is drawn into a related object (e.g., a house shaped like "h"), helped children learn letter-sounds better than pictures unrelated to the letter's shape (Shmidman & Ehri 2010). — [Ehri 2014 [F]](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf)
- Clackmannanshire: children in the synthetic phonics group spent ~20 min/day on letter sounds. Several letter sounds were taught at once so blending could start right away. At age ~11.5, word reading was 3.5 years ahead of chronological age and spelling 1.75 years ahead. — [Univ. of St Andrews news, 11 Feb 2005 [F]](https://news.st-andrews.ac.uk/archive/easy-as-a-b-c/)
- Torgerson et al. (2006) found that evidence for effects on spelling was inconclusive. — [Univ. of York news, 26 Jan 2006 [F]](https://www.york.ac.uk/news-and-events/news/2006/phonics-teaching/)
- Bowers (2020) argues that the evidence for systematic phonics over alternatives is weaker than claimed. In a reply titled "Yes children need to learn their GPCs but there really is little..." (Bristol research record), he accepts that children must learn GPCs. The dispute is about systematic phonics vs other GPC-inclusive methods, not about whether GPCs matter. — [Bristol research record [F: title only]](https://research-information.bris.ac.uk/en/publications/yes-children-need-to-learn-their-gpcs-but-there-really-is-little-/)

### Inferences
- **Concept profile, GPC/decoding/encoding.** *Meaning:* knowing that ⟨sh⟩ → /ʃ/, ⟨igh⟩ → /aɪ/, etc., and blending them left to right into a word (decode), or segmenting a spoken word into phonemes and writing the graphemes (encode). *Why:* it is the generative mechanism. Once a child knows ~40–50 core GPCs and can blend, they can attempt thousands of words. *When:* start with a high-utility set of single letters that allows early CVC words (UK programmes often start s, a, t, p, i, n), then digraphs, then adjacent consonants, then alternative spellings. *Development:* single-letter GPCs → digraphs/trigraphs → CCVC/CVCC → vowel teams and split digraphs → alternative pronunciations → multisyllable words and morphology. *Methods:* explicit "I do / we do / you do"; continuous blending; dictation and word building (encoding) every lesson; cumulative review. *Mistakes:* teaching letter names in place of sounds for decoding; adding a schwa to stop consonants ("buh-a-tuh"); slow pacing (one letter a week) that delays blending; skipping encoding. *Strength:* STRONG CONSENSUS that GPCs must be taught and that decoding/encoding practice works. The specific claim that spelling improves reading is PROMISING to STRONG (theory plus NRP spelling effects), but Torgerson (2006) found the RCT evidence on spelling outcomes inconclusive.
- App design: an encoding mode (hear a word, build it from grapheme tiles) is as important as decoding mode. Tiles should be graphemes (⟨sh⟩ as one tile), not only single letters.

### Gaps
- I could not fetch Ehri et al. (2001) directly. The figures here come via Buckingham (2020) [F], a secondary source written by a phonics advocate. Effect sizes by outcome should be checked against the original.
- I found no direct meta-analytic figure for "encoding instruction improves reading" in this session. Graham & Santangelo (2014), a spelling meta-analysis, is DK and not verified.

---

## 4. Orthographic mapping (Ehri), self-teaching (Share 1995), Ehri's phases, and how to teach "sight words", high-frequency and irregular words

### Takeaway
Fluent word recognition comes from **orthographic mapping**: bonding a word's spelling to its pronunciation and meaning through grapheme–phoneme connections. It does not come from visual memory of word shapes. Every repeatedly decoded word becomes a "sight word." Irregular high-frequency words should be taught by mapping their regular parts and flagging only the tricky part (the "heart word" approach), not by rote whole-word flashcards.

### Cited Findings
- Ehri (2014), "Orthographic mapping in the acquisition of sight word reading, spelling memory, and vocabulary learning," *Scientific Studies of Reading* 18(1), 5–21. OM means forming connections between graphemes or larger spelling units and phonemes, syllables or morphemes; these bond spelling, pronunciation and meaning in memory. "All words become sight words with practice," not just high-frequency or irregular words. — [Ehri 2014 PDF [F]](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf); [DOI 10.1080/10888438.2013.819356](https://doi.org/10.1080/10888438.2013.819356)
- Ehri's phases [F]:
  - **Pre-alphabetic:** visual or contextual cues (logos); unreliable memory.
  - **Partial alphabetic:** some letters, often first and last, linked to sounds; similar words confused; reliance on prediction.
  - **Full alphabetic:** complete grapheme–phoneme connections; decodes and spells phonetically.
  - **Consolidated alphabetic:** larger units (rimes, syllables, affixes) support multisyllabic words and analogy.
  The phases overlap. — [Ehri 2014](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf)
- Rosenthal & Ehri (2008): showing the spellings of new vocabulary words improved second and fifth graders' recall of their pronunciations and meanings. Rosenthal & Ehri (2011): having fifth graders say target words aloud during silent reading improved their memory for meanings and spellings, with the most benefit for poorer readers. — [Ehri 2014 [F]](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf)
- Share (1995), "Phonological recoding and self-teaching: sine qua non of reading acquisition," *Cognition* 55(2), 151–218. Each successful decoding of an unfamiliar word is a self-teaching trial that builds a word-specific orthographic representation. Partial decoding plus context lets children resolve irregular words. [DK] — [DOI 10.1016/0010-0277(94)00645-2](https://doi.org/10.1016/0010-0277(94)00645-2). Ehri (2014) cites Share (2004b) for self-teaching findings [F]. A later Share paper on the same theme was found in search but not read: [Frankfurt repository, 2009](https://publikationen.ub.uni-frankfurt.de/frontdoor/index/index/year/2009/docId/12240).
- Castles et al. (2018) argue that expert word recognition relies on direct orthography-to-meaning links, built through extensive reading experience on top of the phonics foundation. [DK content] — [APS page](https://www.psychologicalscience.org/publications/ending-the-reading-wars-reading-acquisition-from-novice-to-expert.html)
- PLD (Australian practitioner organisation) terminology: a "sight word" is an instructional *outcome*, not an input. High-frequency words (HFWs) split into "Flash Words" (regular and decodable) and "Heart Words" (containing an irregular or not-yet-taught part, learned "by heart" but still through orthographic mapping). Recommendations: name the tricky part explicitly (in *said*, ⟨ai⟩ = /e/, while ⟨s⟩ and ⟨d⟩ decode normally); sequence from regular to irregular to highly irregular (*eye*, *one*); group words with shared irregularities; embed a small set of irregular HFWs (*the*, *I*, *my*) in decodable texts. This is practitioner guidance drawing on Ehri (2014) and Castles et al. (2018). — [PLD, "Clarifying sight words" [F]](https://pld-literacy.org/clarifying-sight-words-research-backed-insights/)
- Florida DOE handout "Every word is a sight word" (found, not read) reflects the same position. — [FLDOE PDF](https://cdn.fldoe.org/file/7539/EveryWordSightWord.pdf)
- Ehri et al. (2001), via Buckingham: systematic phonics improved **irregular word reading** too (d = 0.40). McArthur et al. (2018) found d = 0.84 for irregular word accuracy in poor readers. Phonics therefore does not leave irregular words untaught. — [Buckingham 2020 [F]](https://www.ldaustralia.org/app/uploads/2022/09/Buckingham-Evidence-strongly-favours-systematic-synthetic-phonics.pdf)

### Inferences
- **Concept profile, orthographic mapping and sight words.** *Meaning:* after a child has decoded "ship" a few times, they recognise it instantly because its letters are anchored to its sounds. *Why:* automatic word recognition frees attention for meaning, and the size of the sight vocabulary drives fluency. *When:* from the first decodable words. Heart words are introduced sparingly as needed for sentences (*the, I, a, is, to, was, said, you*). *Development:* follows Ehri's phases. Partial-alphabetic children guess from first letters; full mapping needs full GPC and segmentation knowledge. *Methods:* repeated decoding of the same words across varied texts; spelling the words; for heart words, say the word, segment the sounds, map each sound to letters, and mark the irregular grapheme (e.g., with a heart icon). *Mistakes:* long whole-word HFW lists taught as visual shapes (e.g., Dolch/Fry flashcards before phonics); teaching "sight words" as a separate visual-memory channel; calling decodable words like "and"/"it" "sight words" that must be memorised. *Strength:* orthographic mapping theory is STRONG CONSENSUS among reading researchers (convergent experimental evidence). The heart-word approach specifically has THIN direct comparative evidence: it follows logically from OM theory, but I found no RCT of heart words vs flashcards (see Gaps).
- App design: a "heart word" UI (graphemes highlighted, the irregular part marked) is low-cost and fits the theory. Avoid timed flashcards of whole words before the child can segment.
- Self-teaching means the app should increasingly let children decode new words themselves, with audio feedback after the attempt, rather than auto-playing every word first.
- **L2 note:** self-teaching relies on the decoded pronunciation matching a word already in the child's spoken vocabulary. EFL children often lack that match, so a decoded word should be followed by audio plus a picture or meaning (Share's mechanism is weaker without oral vocabulary). This is my inference.

### Gaps
- I did not verify Miles & Ehri's specific work (e.g., Miles, Rubin & Gonzalez-Frey 2018 on mapping HFWs; Ehri's chapter with Miles). I found no RCT comparing the heart-word method with whole-word flashcards, so the comparative evidence is unconfirmed.
- Share (1995) was not fetched; its claims are DK.

---

## 5. Vocabulary, oral language, syntax, morphology; listening vs reading comprehension

### Takeaway
Oral language (vocabulary, syntax, narrative/inferential language) is the "language comprehension" half of SVR and the long-term limit on reading comprehension. Morphological instruction has positive meta-analytic effects, works for younger as well as older children, and works best combined with other literacy instruction.

### Cited Findings
- WWC (Foorman et al. 2016) Recommendation 1: "Teach students academic language skills, including the use of inferential and narrative language, and vocabulary knowledge." (DK: rated **minimal evidence** by the WWC panel.) — [APA Div. 16 summary [F]](https://apadivision16.org/2016/07/new-wwc-practice-guide-strategies-for-teaching-foundational-reading-skills-in-the-early-grades/); full guide (NCEE 2016-4008): [IES WWC guide (EPUB)](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_070516.epub)
- Bowers, Kirby & Deacon (2010), "The Effects of Morphological Instruction on Literacy Skills: A Systematic Review of the Literature," *Review of Educational Research* 80(2), 144–179 (published online 1 June 2010). Based on 22 studies, preschool to Grade 8. Morphological instruction benefits learners; benefits are "particularly strong for less able readers"; it is "no less effective for younger students"; and it is "more effective when combined with other aspects of literacy instruction." — [SAGE abstract [F]](https://journals.sagepub.com/doi/10.3102/0034654309359353)
- Goodwin & Ahn (2013), "A meta-analysis of morphological interventions in English: Effects on literacy outcomes for school-age children," *Scientific Studies of Reading* 17(4), 257–285. DK: about 30 studies; overall d ≈ 0.32, larger for phonological awareness, morphological knowledge and vocabulary than for comprehension or fluency. Numbers are unverified. — [DOI 10.1080/10888438.2012.689791](https://doi.org/10.1080/10888438.2012.689791). Goodwin & Ahn (2010) (Annals of Dyslexia, children with literacy difficulties), found but not read: [ResearchGate PDF](https://researchgate.net/profile/Amanda-Goodwin-2/publication/46010226_A_meta-analysis_of_morphological_interventions_Effects_on_literacy_achievement_of_children_with_literacy_difficulties/links/02e7e53208c8340c90000000/A-meta-analysis-of-morphological-interventions-Effects-on-literacy-achievement-of-children-with-literacy-difficulties.pdf)
- A 2024 *Educational Psychology Review* meta-analysis on morphological instruction was found in search but not read. — [Springer link](https://link.springer.com/article/10.1007/s10648-024-09953-3)
- Buckingham (2020): there are no studies showing Structured Word Inquiry (the morphology-first approach championed by Bowers) works for *beginning* reading. Cited morphology studies support its use only after initial phonics. — [Buckingham 2020 [F]](https://www.ldaustralia.org/app/uploads/2022/09/Buckingham-Evidence-strongly-favours-systematic-synthetic-phonics.pdf)
- Rosenthal & Ehri (2008): exposure to spellings boosts vocabulary learning, so print supports oral vocabulary. — [Ehri 2014 [F]](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf)

### Inferences
- **Concept profile, vocabulary and oral language.** *Meaning:* knowing what words mean and how sentences work in spoken English. *Why:* decoding a word the child doesn't know gives no comprehension. For EFL children this is the largest component of SVR to build. *When:* from the start, in parallel with phonics, through listening and pictured vocabulary. *Development:* listening comprehension exceeds reading comprehension in young L1 readers, and the gap closes as decoding becomes automatic (standard SVR prediction, DK). For EFL learners, listening may not exceed decoding, so decoding can outrun comprehension. *Methods:* explicit teaching of target words with pictures and audio; repeated encounters in varied contexts; read-alouds and listening stories above decoding level; showing spellings with new words. *Mistakes:* assuming phonics alone produces readers; teaching vocabulary as isolated lists with no repeated use. *Strength:* oral language as a cause of comprehension is STRONG CONSENSUS (correlational and longitudinal). The effect of specific early vocabulary interventions on later *reading comprehension* is PROMISING but modest (WWC rating "minimal," DK).
- **Concept profile, morphology.** *Meaning:* recognising meaningful parts (plural -s, -ed, -ing, un-, -er, compounds). *When:* inflections (-s, -ed, -ing) early, once CVC decoding is secure (they appear in decodable texts). Derivational morphology (pre-, -ful, -ness) later (consolidated phase, roughly ages 8+ in L1). *Methods:* word sums (jump + ed → jumped), noting that -ed has three pronunciations (/t/, /d/, /ɪd/), combined with phonics rather than replacing it. *Mistakes:* teaching the -ed spelling as "sounds like /ɛd/". *Strength:* PROMISING to STRONG for benefits (meta-analytic), with modest effects on comprehension.
- Japanese learners: English inflections such as plural -s and past -ed have no direct Japanese parallel, so explicit morphology teaching likely helps grammar and reading together (my interpretation; the other researcher covers this).

### Gaps
- The WWC per-recommendation evidence ratings are DK (minimal for Rec. 1; strong for Recs. 2 and 3; moderate for Rec. 4). The fetched summary did not list them. Verify in the guide.
- Goodwin & Ahn (2013) figures are unverified.
- I did not fetch the Bowers, Kirby & Deacon (2010) effect sizes. The abstract gives none (DK: about d = 0.4 for morphological-sublexical outcomes when compared with controls; unverified).

---

## 6. Fluency: accuracy, automaticity, prosody; repeated reading; WCPM norms

### Takeaway
Fluency is accuracy plus rate (automaticity) plus prosody. It is the bridge between decoding and comprehension. Guided repeated oral reading with feedback has support (NRP). Hasbrouck & Tindal (2017) give US L1 WCPM norms (e.g., 50th percentile end of Grade 1 = 60 WCPM; Grade 2 = 100; Grade 3 = 112). These are L1 norms and should not be applied directly to EFL children.

### Cited Findings
- Hasbrouck & Tindal (2017), *An update to compiled ORF norms* (Technical Report No. 1702, University of Oregon). 50th-percentile WCPM [F]:

| Grade | Fall | Winter | Spring |
|---|---|---|---|
| 1 | – | 29 | 60 |
| 2 | 50 | 84 | 100 |
| 3 | 83 | 97 | 112 |
| 4 | 94 | 120 | 133 |
| 5 | 121 | 133 | 146 |
| 6 | 132 | 145 | 146 |

  Students 10 or more words below the 50th percentile (average of two unpractised grade-level readings) "need a fluency-building program." — [Reading Rockets, "Fluency norms chart (2017 update)"](https://www.readingrockets.org/article/fluency-norms-chart-2017-update)
- WWC Recommendation 4: "Ensure that each student reads connected text every day to support reading accuracy, fluency, and comprehension." [F] — [APA Div. 16 summary](https://apadivision16.org/2016/07/new-wwc-practice-guide-strategies-for-teaching-foundational-reading-skills-in-the-early-grades/)
- DfE Reading Framework (first published 10 July 2021; updated 11 July 2023 with new sections including **fluency**; corrected 22 Sept 2023). — [GOV.UK page [F]](https://www.gov.uk/government/publications/the-reading-framework-teaching-the-foundations-of-literacy)
- McArthur et al. (2018) (phonics for poor readers): word reading fluency d = 0.45; nonword fluency d = 0.39. — [Buckingham 2020 [F]](https://www.ldaustralia.org/app/uploads/2022/09/Buckingham-Evidence-strongly-favours-systematic-synthetic-phonics.pdf)
- NRP (2000), fluency chapter: guided repeated oral reading had a positive effect on word recognition, fluency and comprehension (DK: mean ES ≈ 0.41). The panel found no evidence that independent silent reading programmes ("encourage kids to read more") improve fluency. [DK] — [NRP report](https://www.nichd.nih.gov/publications/pubs/nrp/smallbook)

### Inferences
- **Concept profile, fluency.** *Meaning:* reading accurately, at a conversational pace, with natural phrasing and expression. *Why:* automatic decoding frees working memory for comprehension, and prosody signals that the reader is parsing syntax. *When:* fluency work on connected decodable text starts once children can blend CVC words. Formal rate targets matter more from about Grade 1 spring onward. *Development:* accuracy → automaticity → prosody. Rate gains are steep in Grades 1–3 and flatten after Grade 5 (see the norms). *Methods:* repeated reading of the same short decodable text (e.g., 3–4 times) with a model (listen, then read; echo or choral reading), feedback on errors, and recording and playback. Reading the same words across *different* texts also builds generalisation. *Mistakes:* pushing speed over accuracy or prosody ("read as fast as you can"); unguided silent reading as a fluency intervention; using L1 WCPM norms for EFL learners. *Strength:* repeated reading with feedback is STRONG to PROMISING; WCPM as a screening indicator for L1 is STRONG; prosody instruction specifically is PROMISING/THIN.
- App: browser speech recognition could estimate accuracy, but children's L2 speech recognition is unreliable (my inference; needs testing). Self-recording with comparison against a model voice is a safer feature.
- EFL norms: Japanese children's English reading rate will reflect L2 oral proficiency. The app should track a personal growth curve (WCPM on unpractised decodable passages), not a percentile against L1 norms.

### Gaps
- NRP fluency effect sizes were not verified this session.
- I found no EFL-specific WCPM norms for Japanese elementary children (deferred to the other researcher).

---

## 7. Comprehension: background knowledge, strategy instruction (and its limits), Willingham, Shanahan

### Takeaway
Comprehension depends heavily on vocabulary and background knowledge. Strategy instruction (summarising, questioning, monitoring) has consistent positive effects in short doses. Its value is DISPUTED in degree: Willingham argues the benefit comes quickly and doesn't keep growing; Shanahan argues the evidence doesn't support capping it. Knowledge-building is widely endorsed, but direct causal evidence for it is less complete.

### Cited Findings
- Shanahan (16 July 2015) describes Willingham's view that strategy instruction should be limited because students get what they need in about two weeks. He calls that claim "on very thin ice." Reviews such as NICHD/NRP (2000; 200+ studies) and Shanahan et al. (2010) are consistently positive. Most studies lasted ≤ 6 weeks, and whether larger doses help is unknown. Summarisation and questioning have the largest effects, while teaching question types has effects "so small" that it isn't worth the time. Multiple strategies outperform single strategies. He recommends concentrated daily doses, with about 6 weeks as a starting point. — [Shanahan on Literacy, Reading Rockets [F]](https://www.readingrockets.org/blogs/shanahan-on-literacy/how-much-comprehension-strategy-instruction)
- Willingham & Lovette (2014), "Can reading comprehension be taught?" (*Teachers College Record*). DK: across reviewed studies, short strategy programmes (about 6 sessions) produced gains similar to long ones (about 50 sessions), which suggests strategies are a quick "bag of tricks" rather than a skill that keeps developing. Not verified this session. A related Willingham talk/paper (2024) was found but not read: [MultiLit Nomanis PDF](https://info.multilit.com/hubfs/NOMANIS-17-JUN24/PDFS/WILLINGHAM-JUN-24.pdf)
- Recht & Leslie (1988), *Journal of Educational Psychology* 80(1), 16–20, the "baseball study": prior knowledge of baseball affected comprehension and recall more than general reading ability did. [DK] — [DOI 10.1037/0022-0663.80.1.16](https://doi.org/10.1037/0022-0663.80.1.16)
- EEF: phonics improves accuracy, but comprehension "must be taught separately." [F] — [EEF Phonics](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics)
- Hall et al. (2023): intervention effects were significantly smaller on reading comprehension than on word reading/spelling outcomes (b = −0.080). [F] — [Harvard Bridges Lab record](https://bridgeslab.gse.harvard.edu/publication/forty-years-reading-intervention-research-elementary-students-or-risk-dyslexia)

### Inferences
- **Concept profile, comprehension.** *Meaning:* building a mental model of what a text says. *Why:* it is the goal of reading. *When:* from the start, through listening comprehension (read-aloud stories with questions). Reading-comprehension tasks on decodable or early texts come once a child can decode short sentences. *Development:* limited by decoding early and by language and knowledge later. *Methods:* questions about meaning after every decodable story; brief explicit modelling of a few strategies (predict, ask questions, retell/summarise, notice when it doesn't make sense); topic-coherent text sets that build knowledge and vocabulary (e.g., a unit of stories about animals, school, Nagasaki). *Mistakes:* endless strategy worksheets ("find the main idea") on random topics; question-type drills; testing comprehension of texts the child can't decode. *Strength:* knowledge and vocabulary matter: STRONG CONSENSUS. Short strategy instruction helps: STRONG. Extended strategy instruction adds value: DISPUTED/THIN. Knowledge-building curricula causally boost general comprehension: PROMISING.
- App: simple, tappable picture-choice comprehension checks after each story suit young EFL children who can't answer in written English.

### Gaps
- Willingham & Lovette (2014) and Recht & Leslie (1988) were not fetched.
- Recent knowledge-building RCT evidence (e.g., Kim et al. 2021 MORE, Core Knowledge studies) was not searched.

---

## 8. Cognitive load, working memory, retrieval practice, spacing, interleaving applied to early literacy

### Takeaway
Dunlosky et al. (2013) rated **practice testing** and **distributed (spaced) practice** as the only two "high-utility" learning techniques, with interleaving at moderate utility. These map directly onto phonics review (cumulative, spaced GPC and word retrieval). Direct evidence from early-literacy trials is thinner than the lab and classroom base, so applying these techniques to young readers is a well-founded extrapolation.

### Cited Findings
- Dunlosky, Rawson, Marsh, Nathan & Willingham (2013), "Improving students' learning with effective learning techniques," *Psychological Science in the Public Interest* 14(1), 4–58. Of 10 techniques, practice testing and distributed practice were rated high utility; interleaved practice, elaborative interrogation and self-explanation moderate; highlighting, rereading, summarisation, keyword mnemonic and imagery low. — [APS press release, Jan 2013 [found; content DK]](https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html); [DOI 10.1177/1529100612453266](https://doi.org/10.1177/1529100612453266)
- Cepeda, Pashler, Vul, Wixted & Rohrer (2006), "Distributed practice in verbal recall tasks: A review and quantitative synthesis," *Psychological Bulletin* 132(3), 354–380. Spaced practice beats massed practice, and the optimal gap grows with the retention interval. [DK] — [DOI 10.1037/0033-2909.132.3.354](https://doi.org/10.1037/0033-2909.132.3.354). Cepeda et al. (2008), *Psychological Science* 19(11), 1095–1102: the optimal gap is roughly 10–20% of the retention interval for intervals of about a week to a year. [DK] — [DOI 10.1111/j.1467-9280.2008.02209.x](https://doi.org/10.1111/j.1467-9280.2008.02209.x)
- Hall et al. (2023): higher intervention **dosage** gave significantly larger effects (p = .040). [F] — [Bridges Lab record](https://bridgeslab.gse.harvard.edu/publication/forty-years-reading-intervention-research-elementary-students-or-risk-dyslexia)
- NRP PA finding: teaching 1–2 skills beat 3 or more (d ≈ 0.71–0.79 vs 0.27). This fits a cognitive-load reading, although the NRP did not frame it that way. [F] — [Clemens et al. 2021](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf)

### Inferences
- **Concept profile, learning-science principles.** *Meaning:* retrieval practice means recalling (say the sound for ⟨sh⟩) rather than re-seeing; spacing means revisiting items over days; interleaving means mixing similar items (b/d, ⟨ai⟩/⟨ay⟩) once each is known; cognitive load means limiting new elements per lesson. *Why:* young children have small working memory, and EFL children carry extra load from unfamiliar phonemes and vocabulary. *When:* throughout, but interleave only after initial learning (blocked first, then mixed). *Methods:* daily cumulative review of all taught GPCs with spaced repetition scheduling; brief daily sessions rather than long weekly ones; 1–3 new GPCs per lesson; clean screens with no decorative animation during decoding (attention and extraneous load); immediate corrective feedback. *Mistakes:* "covered once = learned"; long sessions; busy, game-heavy UIs that split attention; massing all practice of a GPC in its introduction week. *Strength:* spacing and retrieval in general: STRONG CONSENSUS. Specific application to phonics: PROMISING (consistent with UK SSP programme design and dosage findings, but few literacy RCTs isolate the effect).
- Spaced repetition is a natural fit for an app (per-item scheduling of GPCs, heart words and vocabulary).

### Gaps
- I did not fetch Dunlosky (2013) or Cepeda (2006/2008) full texts; ratings and figures are DK.
- I found no RCTs isolating spacing or interleaving within early phonics instruction.

---

## 9. Phonics methodologies compared (systematic synthetic, analytic, embedded, analogy/onset-rime, multisensory, decodable text, whole-word); key reviews; what combines and what conflicts

### Takeaway
Systematic phonics, synthetic or analytic, beats unsystematic or no-phonics approaches. Effects are largest in kindergarten and Grade 1, and are moderate overall (d ≈ 0.4–0.5 in NRP; smaller in Torgerson 2006 RCTs). Synthetic phonics has a slight edge in some data but no definitive superiority over analytic. Embedded and analogy phonics show smaller effects. "Multisensory" (Orton-Gillingham) adds no demonstrated benefit beyond the structured phonics it contains. Three-cueing/MSV guessing conflicts with phonics. Bowers (2020) disputes the strength of the evidence, and Buckingham and Fletcher et al. dispute Bowers; the consensus still favours systematic phonics within a broader literacy programme.

### Cited Findings
**Major reviews**
- **NRP (2000) / Ehri et al. (2001)** (via Buckingham 2020): synthetic d = 0.45 vs analytic (larger-unit) d = 0.35 (averaged over all measures). By grade: K d = 0.56, Grade 1 d = 0.54, Grades 2–6 d = 0.27. [F via secondary] — [Buckingham 2020](https://www.ldaustralia.org/app/uploads/2022/09/Buckingham-Evidence-strongly-favours-systematic-synthetic-phonics.pdf); NRP report: [nichd.nih.gov](https://www.nichd.nih.gov/publications/pubs/nrp/smallbook) (April 2000); Ehri et al. 2001: [DOI 10.3102/00346543071003393](https://doi.org/10.3102/00346543071003393). DK: the overall effect was d = 0.41 across 66 treatment–control comparisons from 38 studies.
- **Torgerson, Brooks & Hall (2006)** (UK DfES): 12 RCTs since 1970, the largest with 120 children. Systematic phonics had a significant positive effect on reading accuracy. Evidence on comprehension and spelling was inconclusive. There was "no definitive conclusion" on synthetic vs analytic. — [Univ. of York news, 26 Jan 2006 [F]](https://www.york.ac.uk/news-and-events/news/2006/phonics-teaching/). Effect sizes (via Buckingham): word reading accuracy d = 0.27 fixed / 0.38 random; comprehension d = 0.24 fixed / 0.35 random (the comprehension effect was not significant). — [Buckingham 2020 [F]](https://www.ldaustralia.org/app/uploads/2022/09/Buckingham-Evidence-strongly-favours-systematic-synthetic-phonics.pdf)
- **Johnston & Watson, Clackmannanshire** (2005 report): 304 P1 children; synthetic phonics (several letter sounds at once, immediate blending, 20 min/day) compared with traditional analytic phonics (one initial letter sound at a time). At the end of P7, word reading was 3.5 years ahead and spelling 1.75 years ahead of chronological age. — [St Andrews news, 11 Feb 2005 [F]](https://news.st-andrews.ac.uk/archive/easy-as-a-b-c/). *Caveat (DK):* the design was quasi-experimental, not fully randomised, and comprehension gains were much smaller (about 3.5 months ahead); critics including Ellis & Moss and Wyse & Goswami have questioned the generalisation. Later, larger related study: Johnston, McGeown & Watson (2011) (via Buckingham [F]).
- **EEF Toolkit (Phonics)**, updated Oct 2025: +5 months; high security; 228 studies; very low cost. "Synthetic and analytic phonics have the highest impact. Analogy and embedded phonics show smaller, though still positive, effects." Phonics is more effective than whole language. **Digital technology-led delivery is less successful than delivery led by a teacher or teaching assistant.** Commercial-provider evaluations show larger impacts, which may inflate the average. One-to-one support +8 months; small groups +4 months. — [EEF [F]](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics)
- **WWC (Foorman et al. 2016)**, *Foundational Skills to Support Reading for Understanding in K–3rd Grade* (released 5 July 2016): 4 recommendations: (1) academic language; (2) sound segments linked to letters; (3) decoding, word analysis, writing and recognising words; (4) daily connected text reading. — [APA Div. 16 summary [F]](https://apadivision16.org/2016/07/new-wwc-practice-guide-strategies-for-teaching-foundational-reading-skills-in-the-early-grades/); [guide EPUB](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_070516.epub)
- **Other meta-analyses** (via Buckingham 2020 [F]):
  - McArthur et al. (2018) (poor readers): nonword accuracy d = 0.67, irregular words 0.84, comprehension 0.28.
  - Suggate (2010): average d = 0.5; follow-up 0.32.
  - Suggate (2016): post-test 0.44; follow-up 0.25, with comprehension at follow-up −0.03.
  — [Buckingham 2020](https://www.ldaustralia.org/app/uploads/2022/09/Buckingham-Evidence-strongly-favours-systematic-synthetic-phonics.pdf). Note that Clemens et al. report different Suggate figures (PA vs phonics comparisons), which reflects different subsets and adjustments. — [Clemens et al.](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf)

**The Bowers (2020) dispute**
- Bowers (2020), "Reconsidering the evidence that systematic phonics is more effective than alternative methods of reading instruction," *Educational Psychology Review* 32, 681–705 [DK DOI: [10.1007/s10648-019-09515-y](https://doi.org/10.1007/s10648-019-09515-y)]. Argues that the effects are small, mostly short-term, often compared against weak controls, and that English national data after 2006 do not show clear benefits. Bowers' reply to critics is titled "Yes children need to learn their GPCs but there really is little..." — [Bristol record [F: title]](https://research-information.bris.ac.uk/en/publications/yes-children-need-to-learn-their-gpcs-but-there-really-is-little-/); [UCL Discovery response PDF (found, not read)](https://discovery-pp.ucl.ac.uk/10113101/1/Educational%20Psychology%20Review%20response%202SV.pdf); [Springer 10.1007/s10648-021-09602-z (found, not read)](https://link.springer.com/10.1007/s10648-021-09602-z)
- Buckingham (2020) responds that the effects of systematic phonics are larger than for any other method. They are "very large" by Kraft's (2020) education benchmarks and moderate by Cohen's. Comparing against non-systematic phonics is reasonable, and there are no studies supporting Structured Word Inquiry for beginners. — [Buckingham 2020 [F]](https://www.ldaustralia.org/app/uploads/2022/09/Buckingham-Evidence-strongly-favours-systematic-synthetic-phonics.pdf)
- Fletcher, Savage & Vaughn (2021), "A commentary on Bowers (2020) and the role of phonics instruction in reading," *Educational Psychology Review*. DK: they agree that effects are moderate and that phonics is not sufficient alone, but argue that explicit systematic phonics is a necessary component of a comprehensive programme. — Texas Center for Learning Disabilities summary (found, not read): [texasldcenter.org](https://texasldcenter.org/?p=281)
- Castles, Rastle & Nation (2018): the "reading wars" should end with phonics as essential for beginners *and* extensive reading and language/knowledge for expertise. — [APS page](https://www.psychologicalscience.org/publications/ending-the-reading-wars-reading-acquisition-from-novice-to-expert.html)

**Multisensory / Orton-Gillingham**
- Stevens, Austin, Moore, Scammacca, Boucher & Vaughn (2021), *Exceptional Children* 87(4), 397–417: OG interventions did **not** produce statistically significant improvements in foundational skills (the mean effect was positive but not significant), and showed no significant effects on vocabulary or comprehension. The authors call for more rigorous research. — [Reading Rockets summary [F]](https://readingrockets.org/resources/resource-library/current-state-evidence-examining-effects-orton-gillingham-reading); [DOI 10.1177/0014402921993406](https://doi.org/10.1177/0014402921993406)
- Hall, Dahl-Leonard, Cho, Solari, Capin, Conner, Henry, Cook, Hayes, Vargas, Richmond & Kehoe (2023), *Reading Research Quarterly* 58(2), 285–312: 53 studies, K–5, with or at risk for dyslexia, 6,053 students. Overall g = 0.33 (p < .001). Dosage and outcome domain were the only significant moderators. **Multisensory nature, grade level and group size were not significant moderators.** — [Harvard Bridges Lab [F]](https://bridgeslab.gse.harvard.edu/publication/forty-years-reading-intervention-research-elementary-students-or-risk-dyslexia); [DOI 10.1002/rrq.477](https://doi.org/10.1002/rrq.477)
- (Note: the assignment's "Hall et al. 2023 meta-analysis on Orton-Gillingham" is two papers. The OG-specific meta-analysis is **Stevens et al. 2021**; the **Hall et al. 2023** meta-analysis found that multisensory instruction did not moderate effects.)

**Three-cueing / MSV**
- DK: three-cueing (meaning, structure/syntax, visual; associated with Clay's Reading Recovery and Fountas & Pinnell's guided reading) encourages children to guess words from pictures, context and first letters. This matches Ehri's *partial alphabetic* behaviour ("rely mainly on prediction") [F: [Ehri 2014](https://library.ecu.edu/wp-content/pv-uploads/sites/257/2019/07/ehri.pdf)]. The DfE Reading Framework and Castles et al. (2018) both advise against guessing strategies and in favour of decoding with fully decodable texts. That claim about these documents is DK because their full text was not fetched; see the GOV.UK page: [Reading Framework](https://www.gov.uk/government/publications/the-reading-framework-teaching-the-foundations-of-literacy). A Lexia white paper on three-cueing (found, not read): [Lexia PDF](https://www.lexialearning.com/user_area/content_media/raw/2023-Q2-FL-3-Cueing-v1-12.pdf)

### Inferences
- **Method profiles (interpretation of the above):**
  - *Systematic synthetic phonics (SSP):* teach GPCs in a set sequence; blend all-through-the-word from the start; fully decodable texts. **Best fit for an app; STRONG.** Its advantage over analytic phonics is small or uncertain (PROMISING), but its fast pace and early blending suit app delivery.
  - *Analytic phonics:* infer the GPC from known whole words (e.g., "bat, ball, bed all start with /b/"). Systematic analytic phonics is also effective (EEF), but it presupposes a known word stock, which EFL children lack. This is my inference and a reason to favour synthetic phonics for this audience.
  - *Embedded phonics:* GPCs taught incidentally as they come up in texts. Smaller effects (EEF). Avoid as the main approach.
  - *Analogy / onset-rime (word families -at, -ig):* smaller effects as a primary method (EEF). **Useful as a complement** after GPCs are known (Ehri's consolidated phase), e.g., word-family games for fluency.
  - *Multisensory (tracing, tapping, sky-writing):* no evidence that multisensory features add value beyond structured explicit phonics (Hall 2023; Stevens 2021). Fine as engagement or handwriting practice, but don't treat it as the active ingredient. (Note: Ehri's articulatory/mouth-picture cues are a specific, evidenced exception.) **DISPUTED/THIN.**
  - *Decodable texts:* practice text matched to taught GPCs (plus a few taught heart words). Strong theoretical rationale and consensus in UK and Australian guidance; direct comparative RCT evidence is **mixed/THIN** (DK: e.g., Price-Mohr & Price 2020; Cheatham & Allor 2012 review). Use them as a scaffold for a limited period (typically until the alphabetic code is largely known), then move on.
  - *Whole-word / look-say:* poorer outcomes for word reading than systematic phonics (NRP, EEF vs whole language). Avoid, except for a small number of heart words taught through mapping.
  - *Three-cueing / MSV guessing:* **incompatible** with phonics because it trains the partial-alphabetic prediction habit. Do not combine. Pictures in decodable stories should not let children read the text from the picture alone.
- **Combines well:** SSP + PA with letters + encoding/dictation + decodable text + repeated reading + vocabulary/oral language + read-alouds + later morphology and analogy.
- **Explicit vs exposure:** GPCs, blending, and the irregular parts of heart words need explicit teaching. The bulk of sight vocabulary, many low-frequency GPC variants, orthographic patterns and much vocabulary come through extensive reading and exposure (self-teaching; Castles et al. 2018).
- **For the app specifically:** EEF reports that technology-led phonics delivery is less successful than adult-led delivery. The app should therefore probably be positioned as **a complement to teacher-led instruction** (e.g., in Mark's classroom), not a stand-alone replacement, or it should mimic tutor features (immediate feedback, modelling, adaptive pace). This is an important design caveat.

### Gaps
- The Ehri et al. (2001) original could not be fetched (SAGE error); figures are via Buckingham (2020), a pro-SSP secondary source.
- The Rose Review (2006, *Independent Review of the Teaching of Early Reading*, DfES) was not fetched. DK: it recommended "high quality, systematic phonic work" as the prime approach, taught discretely and daily, within a language-rich curriculum (the "simple view" framing was adopted into the UK curriculum).
- Stuart & Stainthorp (2016) (*Reading Development and Teaching*, SAGE) was not fetched.
- The Fletcher et al. (2021) commentary was not fetched; its description is DK.
- AERO (Australia) guidance was not fetched.
- I did not verify decodable-text RCT evidence this session.

---

## 10. Recommended daily amount and duration of phonics, and the transition from phonics to broader reading

### Takeaway
Evidence and practice guidance converge on **short, daily, fast-paced** phonics. Clackmannanshire used ~20 min/day; UK SSP programmes typically run ~20–30 min daily in Reception/Year 1 (DK). EEF finds targeted interventions work best at 4–5 sessions a week for up to about 14 weeks. Higher dosage gives larger effects in interventions (Hall 2023). PA should be brief. Phonics effects are largest in K–Grade 1. After the code is secure (typically by the end of Year 1/2 in L1), emphasis shifts to fluency, vocabulary, knowledge and comprehension, while spelling and morphology continue.

### Cited Findings
- Clackmannanshire synthetic phonics: 20 minutes a day on letter sounds. — [St Andrews news [F]](https://news.st-andrews.ac.uk/archive/easy-as-a-b-c/)
- EEF: most successful targeted structure is "regular sessions (four to five times a week), over a period of up to 14 weeks." The EEF gives no daily length. For older pupils, phonics is appropriate if decoding is the problem; if the difficulty is vocabulary or comprehension, other interventions may suit better. — [EEF Phonics [F]](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics)
- Hall et al. (2023): dosage was a significant moderator (higher dosage gives larger effects). — [Bridges Lab [F]](https://bridgeslab.gse.harvard.edu/publication/forty-years-reading-intervention-research-elementary-students-or-risk-dyslexia)
- NRP/Ehri et al. (2001): K d = 0.56, Grade 1 d = 0.54, Grades 2–6 d = 0.27. — [Buckingham 2020 [F]](https://www.ldaustralia.org/app/uploads/2022/09/Buckingham-Evidence-strongly-favours-systematic-synthetic-phonics.pdf)
- Clemens et al.: 10–15 min/day of oral advanced PA may displace more useful reading and spelling practice. — [Clemens et al. [F]](https://literacy.virginia.edu/sites/g/files/jsddwu1006/files/2023-03/Clemens%20et%20al.%202021%20Advanced%20PA%20Critique.pdf)
- DfE Reading Framework (2021; 2023 update extended to Year 9 and added fluency, pupils needing most support, and skilled readers). — [GOV.UK [F]](https://www.gov.uk/government/publications/the-reading-framework-teaching-the-foundations-of-literacy). DK, from the framework text (not fetched): daily discrete phonics from the start of Reception; aim for most children to complete the core programme by the end of Year 1 or 2 (ages ~6–7); same-day "keep-up" sessions for children falling behind; decodable books closely matched to the child's GPC knowledge until children are fluent; and no teaching of guessing strategies.
- WWC Rec. 4: read connected text daily. — [APA Div. 16 [F]](https://apadivision16.org/2016/07/new-wwc-practice-guide-strategies-for-teaching-foundational-reading-skills-in-the-early-grades/)

### Inferences
- **Dosage for the app:** 10–20 minute daily sessions are realistic and consistent with the evidence. A plausible structure: review/retrieval (2–4 min) → new GPC(s) (3–5 min) → blending and segmenting with tiles (3–5 min) → read a decodable sentence or story (3–5 min) → spell/dictate 2–3 words. This is my design synthesis, not a tested protocol.
- **Pace:** SSP programmes typically introduce roughly 3–5 GPCs per week early on (DK; e.g., Letters and Sounds Phase 2 ~4/week). The app could expose all basic single-letter GPCs within the first ~6–8 weeks, but must gate progress on mastery (accuracy thresholds) with spaced review.
- **Transition indicators:** the child can decode unfamiliar words containing taught GPCs accurately, has reached the consolidated phase (handles multisyllable words, uses larger units), and shows rising WCPM on unpractised passages. Then reduce reliance on decodables, increase vocabulary-rich text, read-alouds, and comprehension and knowledge tasks, and add morphology.
- **EFL (brief):** Japanese children aged 8–12 are cognitively older than L1 phonics beginners. They can move faster through GPCs but need much more oral vocabulary support. Older beginners also need age-appropriate (not babyish) decodable content. EEF's older-pupil finding (+5 months average for secondary-age struggling decoders) supports using phonics with older beginners. The transition to broader reading will be limited by oral English, not by decoding.

### Gaps
- I found no high-quality experimental evidence specifying an optimal daily number of minutes for whole-class phonics. The 20–30 minute norm is practice-based (programme design and Clackmannanshire).
- Reading Framework specifics (minutes, completion targets, decodable guidance, three-cueing) are DK because the 171-page PDF was not fetched. Verify before quoting.
- **L2-specific evidence (brief, for handoff):** the National Literacy Panel on Language-Minority Children and Youth (August & Shanahan, 2006) found, per DK, that L2 learners benefit from the same foundational-skills components (PA, phonics, fluency) as L1 learners, and that their word-level skills can reach native-like levels while comprehension lags because of oral language. Not verified this session; the Japanese EFL researcher should confirm.
- Rastle et al. (2021), *Psychological Science* (DK; [DOI 10.1177/0956797620968790](https://doi.org/10.1177/0956797620968790)), artificial-script study: adults given explicit instruction in spelling–sound mappings vastly outperformed adults who learned through exposure alone. This is relevant to the explicit-vs-exposure question but was not verified this session.
