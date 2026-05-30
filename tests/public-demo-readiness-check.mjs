import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.3.0-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0.json');
const docs = readReleaseDoc('docs/v1.0.7-public-demo-readiness-release-notes.md');
const publicDemoGuide = read('PUBLIC_DEMO.md');
const releaseNotesDoc = read('RELEASE_NOTES.md');
const readme = read('README.md');
const changelog = read('CHANGELOG.md');
const qaMatrix = read('docs/qa-matrix.md');

const sandbox = { window: {}, console };
sandbox.window.Jarbou3iResearchModules = {};
vm.createContext(sandbox);
vm.runInContext(read('src/research/public-demo-readiness.js'), sandbox, { filename:'src/research/public-demo-readiness.js' });
const publicDemo = sandbox.window.Jarbou3iResearchModules.publicDemoReadiness;

assert.equal(pkg.version, '1.4.0-alpha.24');
assert.equal(publicDemo.VERSION, '1.3.0');
assert.ok(index.includes('id="publicDemoReadinessPanel"'), 'public demo panel missing');
assert.ok(index.includes('src="src/research/public-demo-readiness.js" defer'), 'public demo module missing from index');
assert.ok(index.includes('v1.3.0 · Stable Manual Workflow Release'), 'public demo badge missing');
assert.ok(engine.includes('publicDemoReport()'), 'research packet must include public demo report');
assert.ok(engine.includes('releaseNotesReport()'), 'research packet must include release notes report');
assert.ok(schema.required.includes('public_demo'), 'schema must require public_demo metadata');
assert.ok(schema.required.includes('release_notes'), 'schema must require release_notes metadata');
assert.equal(schema.properties.public_demo.properties.public_demo_version.const, '1.3.0');
assert.equal(schema.properties.release_notes.properties.release_notes_version.const, '1.3.0');

const readiness = publicDemo.buildPublicDemoReadiness({}, { version:'1.3.0', now:'2026-04-30T00:00:00.000Z' });
assert.equal(readiness.release_gate, 'public_demo_ready_checked');
assert.equal(readiness.runtime_capability_change, false);
assert.equal(readiness.provider_behavior_changed, false);
assert.equal(readiness.oauth_behavior_changed, false);
assert.equal(readiness.backend_behavior_changed, false);
assert.equal(readiness.source_behavior_changed, false);
assert.equal(readiness.local_only_default, true);
assert.equal(readiness.readiness_score, 100);
assert.ok(readiness.checklist.length >= 7);
assert.ok(readiness.demo_script.length >= 3);

const blocked = publicDemo.buildPublicDemoReadiness({ release_notes_polished:false }, { version:'1.3.0', now:'2026-04-30T00:00:00.000Z' });
assert.equal(blocked.release_gate, 'public_demo_blocked');
assert.equal(blocked.fail_count, 1);

const notes = publicDemo.releaseNotes({ version:'1.3.0', now:'2026-04-30T00:00:00.000Z' });
assert.equal(notes.release_gate, 'release_notes_polished');
assert.equal(notes.runtime_capability_change, false);
assert.ok(notes.unchanged_boundaries.includes('Manual/private mode remains the default.'));

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.public_demo.public_demo_version, '1.3.0');
  assert.equal(packet.public_demo.release_gate, 'public_demo_ready_checked');
  assert.equal(packet.public_demo.runtime_capability_change, false);
  assert.equal(packet.public_demo.provider_behavior_changed, false);
  assert.equal(packet.public_demo.oauth_behavior_changed, false);
  assert.equal(packet.public_demo.backend_behavior_changed, false);
  assert.equal(packet.public_demo.source_behavior_changed, false);
  assert.equal(packet.public_demo.local_only_default, true);
  assert.equal(packet.release_notes.release_notes_version, '1.3.0');
  assert.equal(packet.release_notes.release_gate, 'release_notes_polished');
  assert.equal(packet.release_notes.runtime_capability_change, false);
}

for (const corpus of [docs, publicDemoGuide, releaseNotesDoc, readme, changelog, qaMatrix]) {
  assert.ok(corpus.includes('Public Demo') || corpus.includes('public demo') || corpus.includes('public-demo'), 'public demo docs/copy missing');
}
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');

console.log('Public demo readiness checks passed.');
process.reallyExit ? process.reallyExit(0) : process.exit(0);
