// Node-side loader for tools/ (validator, guess-bot). The browser uses fetch (see src/game/boot).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Curriculum } from './curriculum.js';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export function loadCurriculumNode() {
  const rd = n => JSON.parse(fs.readFileSync(path.join(root, 'curriculum', n + '.json'), 'utf8'));
  return new Curriculum({ meta: rd('meta'), phonemes: rd('phonemes'), gpcs: rd('gpcs'), words: rd('words'),
    tricky: rd('tricky'), packs: rd('packs'), stories: rd('stories'), sentences: rd('sentences'), units: rd('units') });
}
