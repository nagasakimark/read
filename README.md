# Let's Read! — a phonics game for children learning English

A free, static, offline-capable HTML5 **canvas game** that takes a child from zero
letter-sound knowledge to independent reading. Built for Japanese elementary EFL
learners (school Chromebooks, 1366×598 usable screen) and usable anywhere.

**The source of truth for what to teach, when, and why is [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md).**
Research notes behind it are in `docs/research-notes/`. Build status against the
blueprint is tracked in [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md).

Run locally: `npx serve .` (or any static server), open `index.html`.
No build step is needed to run; `npm run build:curriculum` regenerates
`curriculum/*.json` from `curriculum/src/`.

## Run it

```
npx serve .        # then open http://localhost:3000
npm test           # validator + guess-bot simulations
```

See `docs/BUILD_LOG.md` for status against the blueprint and `tools/recorder.html` to record real voices.
