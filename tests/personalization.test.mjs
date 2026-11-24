import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import ts from 'typescript';
const nodeRequire = createRequire(import.meta.url);
const directory = path.dirname(fileURLToPath(import.meta.url));

// Exercise the same TypeScript modules used by the app without a second build tool.
const modules = new Map();
function load(name) {
  if (modules.has(name)) return modules.get(name);
  const loaded = { exports: {} };
  const filename = path.join(directory, '..', 'app', name + '.ts');
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'module', 'exports', code)((id) => id.startsWith('./') ? load(id.slice(2)) : nodeRequire(id), loaded, loaded.exports);
  modules.set(name, loaded.exports);
  return loaded.exports;
}
const { cards, ageOptions, chooseActivity } = load('activities');
const { rankActivities, parseProfile, defaultProfile, activityEvidence, playAdaptation } = load('personalization');
const day = Math.floor(Date.parse('2026-11-24T12:00:00Z') / 86400000);
const get = (id) => cards.find((card) => card.id === id);
const choices = [get('x-hold-babble'), get('x-hold-mirror')];

test('interests affect ordering and quiet mode changes a sound preference', () => {
  const profile = { ...defaultProfile, interests: ['sounds'] };
  assert.equal(rankActivities(choices, profile, [], day)[0].id, 'x-hold-babble');
  assert.equal(rankActivities(choices, { ...profile, quiet: true }, [], day)[0].id, 'x-hold-mirror');
});
test('observed engagement supports a familiar repeat, separately from caregiver ease', () => {
  const history = [{ activityId: choices[0].id, age: 'exploring', startedAt: '2026-11-22T12:00:00Z', babyResponse: 'engaged' }];
  assert.equal(rankActivities(choices, defaultProfile, history, day)[0].id, choices[0].id);
  const easy = [{ ...history[0], babyResponse: undefined, feedback: 'Easy to try' }];
  const baseline = rankActivities(choices, defaultProfile, [], day).map((item) => item.id);
  assert.deepEqual(rankActivities(choices, defaultProfile, easy, day).map((item) => item.id), baseline);
});
test('stop and disinterest lower a card temporarily, without permanently removing it', () => {
  for (const babyResponse of ['break', 'not-interested']) {
    const history = [{ activityId: choices[0].id, age: 'exploring', startedAt: '2026-11-23T12:00:00Z', babyResponse }];
    assert.equal(rankActivities(choices, { ...defaultProfile, interests: ['sounds'] }, history, day)[0].id, choices[1].id);
    assert.equal(rankActivities(choices, { ...defaultProfile, interests: ['sounds'] }, history, day + 4)[0].id, choices[0].id);
  }
});
test('comfort overrides still take priority for every age', () => {
  for (const age of ageOptions) {
    for (const state of ['fussy', 'sleepy', 'unsure']) assert.equal(chooseActivity({ age: age.id, state, capacity: 'three', context: 'floor', recent: [] }).age, 'all');
    assert.equal(chooseActivity({ age: age.id, state: 'active', capacity: 'empty', context: 'holding', recent: [] }).id, 'special-empty');
  }
});
test('profile parsing ignores unknown fields and limits stored text', () => {
  assert.deepEqual(parseProfile(null), defaultProfile);
  assert.deepEqual(parseProfile({ interests: ['faces', 'unsafe', null], nickname: 'x'.repeat(100), phrase: false }).interests, ['faces']);
  assert.equal(parseProfile({ nickname: 'x'.repeat(100) }).nickname.length, 30);
});
test('all activities have source notes; feeding and early baby adaptations stay gentle', () => {
  assert.equal(new Set(cards.map((card) => card.id)).size, cards.length);
  for (const card of cards) { assert.equal(card.steps.length, 3); assert(activityEvidence(card).links.every((link) => link.url.startsWith('https://'))); }
  assert.match(playAdaptation(get('n-feed-quiet'), defaultProfile, 'newborn').invitation, /feeding/);
  assert.match(playAdaptation(get('n-hold-face'), defaultProfile, 'newborn').variation, /quiet pause/);
});
