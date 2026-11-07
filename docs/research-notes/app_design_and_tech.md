# App Design (Evidence-Informed Engagement) and Technical Architecture for a Free Static Phonics/Reading Web App

Context: free static site (HTML5/canvas/JS), used by Japanese elementary students on school Chromebooks (usable area ~1366x598, school Wi-Fi) and on tablets at home. Research date: 2026-11-07. Budget limited to ~25 tool calls, so several sub-questions are listed under Gaps and not sourced. Items marked "(unverified, from background knowledge)" are NOT sourced and the report writer should not state them as fact without checking.

## 1. What makes educational apps for young children effective and engaging without displacing learning?

### Takeaway
The best evidence says learning comes from the core mechanic itself, not from added rewards. Children need to be mentally active, not just tapping, and the learning should sit inside the game action ("intrinsic integration"). Distractions should be kept to a minimum. Tangible, expected rewards for simply taking part tend to undermine intrinsic motivation in children, while informative verbal feedback does not. Meta-analyses find small-to-moderate average gains from games and gamification (about 0.3 SD), with large differences in quality from app to app.

### Cited Findings
**Four pillars (Hirsh-Pasek et al., 2015)**
- Hirsh-Pasek, Zosh, Golinkoff, Gray, Robb & Kaufman, "Putting Education in 'Educational' Apps: Lessons From the Science of Learning," *Psychological Science in the Public Interest* 16(1), published 13 Apr 2015. The four pillars are: learning is **active** (minds-on; tapping or swiping only counts if it requires thinking), **engaged** (on task, not distracted), **meaningful** (connected to prior knowledge and daily life), and **socially interactive** (with characters that respond, or with prompts to talk with parents or teachers). — [APS](https://www.psychologicalscience.org/index.php/publications/educational-apps.html)
- The paper describes noise, movement, and unrelated side games as distractions that pull children off task. It says apps are more effective when used with clearly defined learning goals and scaffolded exploration. — [APS](https://www.psychologicalscience.org/index.php/publications/educational-apps.html)

**Extrinsic rewards / overjustification (Deci, Koestner & Ryan, 1999)**
- Meta-analysis of 128 studies (*Psychological Bulletin* 1999). Effects on free-choice intrinsic motivation, where negative means undermining: engagement-contingent rewards d = −0.40, completion-contingent −0.36, performance-contingent −0.28, all tangible rewards −0.34, expected tangible rewards −0.36. Verbal rewards (positive feedback) were +0.33. — [Deci, Koestner & Ryan 1999 PDF](https://depts.washington.edu/techdocs/papers/deciExtrinsicRewardsAndIntrinsicMotivation99.pdf); [PubMed record](https://pubmed.ncbi.nlm.nih.gov/10589297/)
- **Tangible rewards harmed children more than college students.** Verbal rewards helped children less: for free-choice behaviour, d = 0.11 (not significant) in children vs 0.43 in college students. — [same PDF](https://depts.washington.edu/techdocs/papers/deciExtrinsicRewardsAndIntrinsicMotivation99.pdf)

**Gamification (Sailer & Homner, 2020)**
- Sailer & Homner, "The gamification of learning: a meta-analysis," *Educational Psychology Review* 32(1), 77–112 (DOI 10.1007/s10648-019-09498-w). It found positive effects on cognitive, motivational, and behavioural outcomes. In the subset of rigorous studies, effects on cognitive outcomes held up, but motivational and behavioural effects were less stable. Narrative/fantasy game worlds and competition combined with collaboration looked promising for behavioural outcomes. Competition alone can be problematic for some learners. — [gamification-research.org summary](https://gamification-research.org/2019/08/does-gamification-of-learning-work/); [Uni Augsburg OPUS](https://opus.bibliothek.uni-augsburg.de/opus4/frontdoor/index/index/docId/109056)
- (The commonly quoted effect sizes, roughly g ≈ 0.49 cognitive, 0.36 motivational, 0.25 behavioural, are unverified, from background knowledge. The summary I fetched gave no numbers. Check against the [open-access PDF](https://opus.bibliothek.uni-augsburg.de/opus4/files/109056/109056.pdf).)

**Game-based learning (Clark, Tanner-Smith & Killingsworth, 2016)**
- *Review of Educational Research* meta-analysis (K-16). Digital games improved learning compared with non-game conditions (g = 0.33, 95% CI 0.19–0.48; 57 media comparisons). "Augmented" game designs beat standard versions (g = 0.34, CI 0.17–0.51; 20 value-added comparisons). The authors conclude that **design, not the medium**, matters most. — [OpenDevEd record](https://docs.opendeved.net/lib/YHX5ZVR8); [SRI brief](https://www.sri.com/publication/education-learning-pubs/digital-learning-pubs/digital-games-design-and-learning-a-systematic-review-and-meta-analysis-brief/)

**Intrinsic integration ("chocolate-covered broccoli" fix; Habgood & Ainsworth, 2011)**
- Zombie Division taught division to 7–8 year olds. The intrinsic version built division into the combat mechanic. The extrinsic version had the same gameplay plus multiple-choice maths questions between levels. In a learning study with 58 pupils, the intrinsic group scored significantly higher than the extrinsic and control groups at delayed post-test. In a free-choice after-school study with 16 pupils, children played the intrinsic version **more than 7× as long**. Described by Habgood (2015, ECGBL), citing Habgood & Ainsworth (2011, *Journal of the Learning Sciences*). — [Habgood 2015 PDF via CORE](https://core.ac.uk/download/42540939.pdf); [SHU repository record](https://shura.shu.ac.uk/3556/)

**Child UX: touch targets and motor skills (NN/g)**
- NN/g (Feifei Liu, 8 Jul 2018) recommends **at least 2 cm × 2 cm touch targets for young children**, about 4× the adult figure of 1 cm × 1 cm. Precise or long-distance dragging is hard for under-9s, so offer tap alternatives. With a mouse or trackpad, dragging and clicking small objects is hard for under-9s. Under-5s should not need two-handed actions or fast reactions. — [NN/g](https://www.nngroup.com/articles/children-ux-physical-development/)

**Dark patterns / sticky design (UK Children's Code)**
- ICO Age Appropriate Design Code, Standard 5 (detrimental use of data). Reward loops, notifications, and autoplay are named as "sticky" features. Data-driven features that make it hard for children to leave and that exploit reward-seeking are likely to breach GDPR fairness. Alternatives: no personalised in-game advantages in exchange for extended play; present "continue" options neutrally, without implying loss; require an active choice to keep going; provide pause without losing progress, and age-appropriate break prompts. — [ICO Standard 5](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/5-detrimental-use-of-data/); [Full code PDF v2.1](https://ico.org.uk/media/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services-2-1.pdf)

### Inferences
- **Core mechanic = the reading act.** Hitting a target, feeding a monster, or moving a character should happen *by* blending, segmenting, or choosing the right grapheme. Avoid "answer a quiz, then get a minigame" (supported by the Habgood finding and the Clark "design matters" conclusion).
- **Rewards:** prefer informational and verbal feedback ("You blended c-a-t!") and progress that shows mastery (a map of sounds learned) over tangible, expected, completion-contingent prizes. If using collectibles or unlockables (stickers, monster costumes), make them unexpected or tied to mastery milestones, not to time or logins. This is an inference from Deci et al.'s finding that expected, engagement-contingent rewards are the most undermining.
- **No streak penalties, loot boxes, or variable-ratio prize wheels.** These are the reward-loop mechanisms the ICO flags. Use gentle "Great work today, see you next time" stopping points.
- **Narrative and mascot:** Sailer & Homner's narrative/fantasy moderator weakly supports a story world and mascot (as in TYMTR or Duolingo ABC), as long as animation and sound don't become distractions (Hirsh-Pasek's engaged pillar). For a classroom, competition + collaboration (class-wide goals) may beat purely individual leaderboards.
- **Touch targets on a 1366×598 Chromebook:** 2 cm is roughly 75–90 CSS px depending on the screen's DPI (inference; it depends on device pixel density). With only 598 px of height, the layout can fit about 4–5 rows of large targets, so design each activity screen around 2–6 big choices.
- **Social pillar:** add "say it with your teacher/parent" prompts, a class-mode/projector view, and offline print or companion cards.

### Gaps
- Hattie & Timperley (2007) feedback model (task/process/self-regulation/self levels; praise of the "self" is least effective) was not fetched. It is unverified background knowledge (*Review of Educational Research* 77(1), 81–112).
- Model–lead–test error correction in phonics (e.g., Direct Instruction / Carnine et al.) was not sourced.
- Session-length recommendations: the GraphoGame trial design used 10–15 min daily (see Q2), but I found no authoritative guideline on ideal session length for this age.
- Evidence on avatar customisation and unlockables specifically for young children was not found or searched in depth.
- 5Rights Foundation "Disrupted Childhood" / persuasive design reports were not fetched.
- Parental dashboards: no evidence found.
- Audio-first interface research for pre-readers was not specifically sourced beyond NN/g motor guidance.
- Apple HIG minimum hit target (44×44 pt) and WCAG 2.2 SC 2.5.8 Target Size (Minimum, 24×24 CSS px) / 2.5.5 (AAA, 44×44) are unverified background knowledge, not fetched.

## 2. Evidence on literacy apps' effectiveness (meta-analyses, GraphoGame, TYMTR, Duolingo ABC)

### Takeaway
Educational apps for preschool to grade 3 show a modest average effect (+0.31 SD). Effects are larger for constrained skills such as letter-sound knowledge and decoding, larger on researcher-made tests, and larger for younger children. GraphoGame in English has mixed results: a large UK RCT (EEF) found it no better than business-as-usual teaching, though some subgroups showed exploratory benefits. Adult interaction was the only significant moderator across GraphoGame studies. Teach Your Monster to Read and Duolingo ABC lack independent peer-reviewed efficacy evaluations that I could find.

### Cited Findings
- Kim, Gilbert, Yu & Gale (2021), "Measures Matter: A Meta-Analysis of the Effects of Educational Apps on Preschool to Grade 3 Children's Literacy and Math Skills," *AERA Open*. 36 studies, 285 effect sizes, mean **+0.31 SD**, with similar effects for literacy and math. Significant moderators: larger effects for **preschool vs K–3**, for **researcher-developed vs standardized** measures, and for **constrained vs unconstrained skills**. A positive average masks large variation between apps. — [DOAJ abstract](https://doaj.org/article/f2edb9ab9f2e49169c5c4ee715c3994b); [Harvard Kennedy School record](https://www.hks.harvard.edu/centers/cid/publications/measures-matter-meta-analysis-effects-educational-apps-preschool-grade-3)
- **GraphoGame Rime, UK EEF trial (Worth et al., 2018):** 398 Year 2 pupils (ages 6–7) in 15 schools who failed the Phonics Screening Check. Intended dose was 10–15 min/day for 12 weeks. **Gains were equivalent to business-as-usual literacy support**, and teachers found it easy to implement. — as reported in [Ahmed et al. 2020, *Frontiers in Education* 5:132](https://www.frontiersin.org/articles/10.3389/feduc.2020.00132)
- **Ahmed et al. (2020), secondary exploratory analysis:** the "top half" of players (about 8.5 h total over about 35 days) showed small gains in nonword decoding that were **not maintained over summer**. There was no difference in real-word reading. Subgroups (spring/summer-born children, schools rated "requires improvement") showed decoding gains that lasted. Tests were not blind-administered, so the authors call for confirmation. Most children did not finish all 25 streams, and they played largely alone. — [Frontiers](https://www.frontiersin.org/articles/10.3389/feduc.2020.00132)
- **Kyle et al. (2013)**, a small supervised study: GraphoGame Rime reading effect sizes of 0.66 and 0.53, decoding 1.43. The authors note that an experimenter was present throughout, which may have inflated the effects. — cited in [Ahmed et al. 2020](https://www.frontiersin.org/articles/10.3389/feduc.2020.00132)
- **McTigue et al. (2019)**, meta-analysis of 19 GraphoGame studies: effects varied widely. The **only significant moderator was higher adult interaction** (mean ES 0.48). — cited in [Ahmed et al. 2020](https://www.frontiersin.org/articles/10.3389/feduc.2020.00132)
- **Teach Your Monster to Read:** the company's site offers a 2013 parent testimonial ("Case Study," a parent and Head of ICT at the International School of Monaco), not a controlled evaluation. Searches surfaced no independent trial; several search hits were low-quality or spam pages. — [teachyourmonster.org case study](https://www.teachyourmonster.org/?p=1281)

### Inferences
- Constrained skills (letter-sound correspondences, blending CVC words) are where apps work best. This supports building the app around systematic GPC teaching and decoding, while treating comprehension/vocabulary (unconstrained) as needing teacher and parent talk.
- The adult-interaction moderator for GraphoGame and Hirsh-Pasek's social pillar together argue for a **teacher-led class mode** and home "read with me" prompts, rather than solo drill alone. This is especially relevant for Japanese EFL students, who rarely hear English at home.
- Expect researcher-made tests to overstate effects. If the project ever evaluates itself, include a standardized or independent measure.
- GraphoGame's evidence comes from L1 English struggling readers. Transfer to Japanese EFL children (who lack oral English vocabulary) is untested. Oral vocabulary and meaning should be built in, because decodable words the child doesn't know won't reward decoding.

### Gaps
- Griffith, Hagan et al. (2020) on apps in early literacy was not fetched.
- Ojanen et al. (2015) GraphoGame cross-language review was not fetched.
- Duolingo ABC: no independent peer-reviewed efficacy study found or searched within budget. Any Duolingo-internal claims would be company research.
- Evidence for phonics apps with **EFL/Japanese** learners specifically was not searched.

## 3. Feedback design, pre-reader interfaces, and child-specific UX

### Takeaway
Use immediate, informative, non-punitive feedback. Verbal or informational feedback supports motivation, while tangible contingent rewards undermine it. Design for pre-readers with audio-first instructions and big tap targets (2 cm or more), and offer tap alternatives to dragging.

### Cited Findings
- Positive verbal feedback raised free-choice intrinsic motivation (d = +0.33 overall), but much less for children (d = 0.11, not significant). — [Deci et al. 1999](https://depts.washington.edu/techdocs/papers/deciExtrinsicRewardsAndIntrinsicMotivation99.pdf)
- 2 cm targets; tap alternatives to drag; avoid fast reactions and two-handed gestures for under-5s; mouse and trackpad are hard for under-9s. — [NN/g 2018](https://www.nngroup.com/articles/children-ux-physical-development/)
- Pause without losing progress; neutral "continue" prompts. — [ICO Standard 5](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/5-detrimental-use-of-data/)

### Inferences
- Error flow (inference informed by the cited material plus standard phonics practice): on an error, replay the target sound, model the correct answer (highlight the grapheme and play its audio), then re-present the item later in the session. Avoid buzzers, lost lives, or sad characters. This keeps feedback informational rather than controlling.
- Many school Chromebooks are used with a trackpad in laptop mode, not touch. Make every interaction work with click only (no drag required), consistent with NN/g's desktop advice for under-9s.
- Every instruction should have a replay-audio button. Japanese-language support (furigana-free hiragana/katakana or audio in Japanese) could help with UI navigation for very young EFL learners. This is an inference; not sourced.

### Gaps
- Hattie & Timperley and elaborated-feedback meta-analyses (e.g., Shute 2008; Van der Kleij et al. 2015) were not fetched.
- No sourced guidance on optimal timing or wording of feedback for 4–8-year-olds.

## 4. Audio technology: Web Audio vs HTMLAudioElement, autoplay, formats

### Takeaway
All audible playback (HTMLAudioElement or Web Audio) is blocked until the user interacts with the page. Use a "Tap to start" screen that creates or resumes a single AudioContext, then play decoded phoneme buffers through Web Audio for low latency. Ship MP3 (universally supported) or AAC as the baseline. Opus is efficient but historically had limited Safari support.

### Cited Findings
- Audible media may autoplay only if muted, after user interaction (click, tap, key press), if the site is allowlisted, or if an iframe is granted autoplay via Permissions Policy. Calling `start()` on a Web Audio source outside a user input event is subject to autoplay rules. `navigator.getAutoplayPolicy("audiocontext")` reports the policy. `play()` rejects with `NotAllowedError` when blocked. Firefox's `media.autoplay.block-webaudio` lets AudioContexts play only after sticky activation. — [MDN Autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)
- Formats: MP3 is supported in Chrome, Edge, Firefox (direct since v71), Opera, and Safari (since 3.1). Opus is supported in Chrome/Edge/Firefox/Opera. MDN's table says Safari supports Opus in `<audio>` only in a CAF container (macOS 10.13 / iOS 11+). AAC in Chrome works only in MP4 containers and is unavailable in plain Chromium builds. MDN recommends multiple `<source>` fallbacks. — [MDN Audio codecs](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Audio_codecs)

### Inferences
- MDN's Safari/Opus statement may be outdated. Newer Safari versions are widely reported to support WebM/Opus (unverified). Check caniuse before relying on it. **MP3 or AAC (m4a) is the safe baseline** for iPad at home.
- Architecture: one AudioContext created or resumed on the first tap. Preload and `decodeAudioData` the current lesson's phonemes and words into AudioBuffers, then play via `AudioBufferSourceNode` (near-zero latency and overlap-safe). An **audio sprite** (one file plus a JSON offset map) cuts HTTP requests on slow school Wi-Fi. Per-lesson sprites keep downloads small.
- Handle `visibilitychange`: iOS may suspend the context, so call `resume()` again on the next tap.

### Gaps
- iOS-specific quirks (the hardware silent switch muting Web Audio but not `<audio>`, and the `navigator.audioSession` API) were not sourced.
- Latency measurements for HTMLAudioElement vs Web Audio on Chromebooks were not found.

## 5. Recorded human phonemes vs TTS

### Takeaway
Browser speechSynthesis is unreliable for a phonics app. Voice lists differ by platform, ChromeOS voice packs can disappear after updates, Chrome desktop voices require internet and cut off after about 14 s, and first-utterance latency on ChromeOS can reach a minute. Use **recorded human audio** for isolated phonemes, words, and instructions. TTS should be a fallback only, for example for user-generated content.

### Cited Findings
- Readium's cross-platform audit: Chrome desktop preloaded voices all need internet, with no offline fallback, and utterances over 14 s are cut off with no boundary events. On ChromeOS, voice packs are sometimes uninstalled after OS updates, and the first utterance can take up to a minute to start. Android's `getVoices()` lists languages, not installed voices. Safari marks every voice `default: true`, and installing higher-quality voices can make preloaded ones disappear. — [Readium "SpeechSynthesis in browsers and OSes"](https://readium.org/speech/docs/WebSpeech.html) (Android voice counts dated April 2024); see also [Recommended voices for the Web Speech API](https://hadriengardeur.github.io/web-speech-recommended-voices)

### Inferences
- TTS engines are built for words and sentences. Isolated phonemes (/b/, /t/) tend to come out as letter names or with an added schwa ("buh"). This is widely observed, but no source was fetched. Record "pure" (clipped) sounds: continuous sounds (/m/, /s/, /f/) held about 0.5–1 s; stop sounds (/b/, /t/, /k/) as short as possible with no "uh."
- Accent: Japanese elementary curricula (MEXT textbooks such as New Horizon Elementary) generally use North American English audio (unverified). Matching the classroom textbook accent would reduce confusion. Pick one accent and keep it consistent across all assets.
- Neural TTS services (cloud) can pre-generate word and sentence audio at build time and ship it as static files. This avoids runtime dependence and privacy issues, but licensing terms must allow redistribution (not verified).

### Gaps
- No authoritative source fetched on recording pure phonemes (e.g., UK DfE-validated SSP programme guidance or Jolly Phonics/Read Write Inc articulation guides).
- No source fetched on neural TTS quality for children's phonics or redistribution licensing.

## 6. Offline/PWA, storage, progress, sync

### Takeaway
A static PWA (service worker plus Cache API for assets, IndexedDB for progress) works offline on Chromebooks and tablets. Storage is evictable unless `navigator.storage.persist()` is granted; Chrome grants it silently based on engagement or installation. Provide export/import (file or QR code) of progress. Cross-device sync and teacher dashboards need a backend, or a manual file-based workflow.

### Cited Findings
- Under storage pressure, browsers can evict Cache API and IndexedDB data, least recently used origin first. Chrome found automatic clearing rare, while users clearing storage manually is more common. `persist()` protects Cache, IndexedDB, localStorage, service workers, and more. Chrome grants it silently based on site engagement, installation, or bookmarking. Firefox prompts the user. Safari supports it from 15.2. Request it during a meaningful user action, not on page load, and check `navigator.storage.persisted()`. — [web.dev Persistent storage](https://web.dev/articles/persistent-storage)

### Inferences
- **School Chromebooks are often managed with policies that wipe browsing data or use ephemeral/guest sessions** (unverified; varies by school board). Students may also share devices. So local-only progress may be lost or mixed up. Mitigations: a per-device profile picker (avatar, no names), plus a **"progress code"** (a short base32 string or QR code encoding mastered GPCs and lesson level) that the teacher or child can re-enter, plus JSON file export/import for parents.
- Cache strategy: precache the app shell. Cache each lesson pack (JSON plus audio sprite plus images) on first use or by "download for offline". Version cache names with the content version so updates invalidate cleanly (stale-while-revalidate for curriculum JSON; cache-first for hashed asset files).
- Safari ITP's 7-day cap on script-writable storage for sites not added to the home screen is unverified (web.dev did not cover it). If confirmed, recommend that home tablet users "Add to Home Screen".

### Gaps
- Safari/WebKit storage-eviction policy (7-day rule, home-screen exemption) was not verified. Check WebKit's blog.
- No fetched source on managed-Chromebook data-clearing policies in Japanese schools (GIGA School program).
- Options for backend-free class dashboards (e.g., teacher-scanned progress QR codes, Google Classroom integration) were not researched.

## 7. Content architecture (curriculum as data), rendering, accessibility, input

### Takeaway
Only the dyslexia-font question was sourced here. Rendering, schemas, and pointer-event tracing guidance below are inference or architecture proposals.

### Cited Findings
- Search surfaced Wery & Diliberto (2017), "The effect of a specialized dyslexia font, OpenDyslexic, on reading rate and accuracy," *Annals of Dyslexia* (PMC5629233). The page was blocked by a CAPTCHA, so findings were not verified this session. — [PMC5629233](https://pmc.ncbi.nlm.nih.gov/articles/PMC5629233)

### Inferences
- (Unverified, from background knowledge, so confirm before stating.) Wery & Diliberto found OpenDyslexic gave no improvement in reading rate or accuracy for students with dyslexia compared with Arial or Times New Roman. Recommendation: use a clear, familiar sans-serif with single-storey "a" and "g" (a school/infant-style font). Spacing and size matter more than special fonts.
- **Curriculum as data**: separate the engine from the content via versioned JSON files. A suggested schema set (proposal, not from a source):
  - `gpcs.json`: `{id, grapheme, phoneme (IPA), audio, exampleWord, mnemonicImage, stage}`
  - `words.json`: `{id, text, gpcSegmentation:[gpcId...], audio, image, isDecodable:boolean, trickyParts:[], meaningJa?}`
  - `lessons.json`: `{id, stage, newGpcs:[], reviewGpcs:[], words:[], activities:[{type, params}], story?}`
  - `activities`: type registry (`listen-choose-grapheme`, `blend-cvc`, `segment-spell`, `trace-letter`, `read-sentence-match-picture`); the engine maps the type to a game module.
  - `stories.json`: decodable texts tagged with required GPC set, so the engine can check "decodable at stage N" automatically.
  - Top-level `contentVersion` (semver) for cache-busting and progress migration. Progress references stable IDs, never array indices.
- Rendering: use **DOM/CSS for UI, text, and buttons** (crisp text at any DPI, keyboard and screen-reader access, easy localization). Use **canvas only for animated game scenes and letter tracing**. A hybrid is common and fits the 1366×598 fixed-aspect layout (scale a stage to fit with letterboxing).
- Tracing: use Pointer Events (`pointerdown/move/up`, `setPointerCapture`, CSS `touch-action: none` on the canvas) so mouse, touch, and stylus share one code path. Score stroke order and direction against template stroke paths with a tolerance band, and forgive generously for young children.

### Gaps
- WCAG 2.2 specifics (2.5.8 Target Size, 2.5.7 Dragging Movements: "provide single-pointer alternative to dragging") were not fetched. Background knowledge suggests 2.5.7 directly supports the NN/g "tap alternative to drag" advice. Verify at w3.org.
- No open phonics content schemas (e.g., existing open-source phonics datasets) were found or searched.

## 8. Child privacy (COPPA 2025, Japan APPI, UK Children's Code) and static vs server feasibility

### Takeaway
A fully static app that keeps all progress on-device, uses no third-party trackers or ads, and sends no personal data off-device largely avoids collecting children's personal information. That is the simplest compliance posture under COPPA, the UK Children's Code, and Japan's APPI. Speech recognition, class dashboards, and cross-device sync need servers and so bring privacy obligations.

### Cited Findings
- The amended COPPA Rule was published in the Federal Register on 22 Apr 2025. **Effective 23 Jun 2025; compliance date 22 Apr 2026.** Biometric identifiers (including voiceprints and faceprints) were added to "personal information". Persistent identifiers remain usable under the "support for internal operations" exception (with a new § 312.4(d)(3) notice). Proposed ed-tech/school-authorization changes were **not finalized**, pending possible FERPA changes. — [Federal Register 2025-05904](https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule)
- UK Children's Code Standard 5: avoid data-driven sticky features, allow easy disengagement. — [ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/5-detrimental-use-of-data/)

### Inferences
- The 2025 COPPA addition of voiceprints means **server-side speech recognition of children's voices** would be a significant compliance burden for a US audience. On-device or browser speech recognition (Web Speech API `SpeechRecognition` in Chrome sends audio to Google's servers, which is unverified but widely documented) has the same concern. Recommend skipping speech recognition in v1, or offering "record and listen to yourself" playback that stays on-device (MediaRecorder, never uploaded).
- Analytics: if needed, use cookieless, aggregate-only, self-hosted analytics with no persistent identifiers, or none at all. Avoid Google Analytics and ad SDKs. Hosting on GitHub Pages logs IP addresses at the host level (unverified), so a privacy notice should mention the host.
- Static-feasible: lessons, audio, offline play, local progress, export/import codes, printable certificates, and a projector class mode. Server-required: real cross-device sync, live teacher dashboards with automatic aggregation, cloud speech recognition, and accounts.

### Gaps
- Japan APPI (PPC) rules on minors' data and MEXT guidance on educational data and cloud tools in schools (GIGA School / 教育情報セキュリティポリシーに関するガイドライン) were **not researched**. This is important for Japanese school deployment.
- GDPR Article 8 (age of digital consent 13–16 by member state) was not fetched.
- Whether on-device-only storage counts as "collection" under COPPA was not confirmed from FTC FAQs.
