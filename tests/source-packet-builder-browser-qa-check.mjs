import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const styles = read('src/styles.css');
const renderHelpers = read('src/research/render-helpers.js');
const browserSpec = read('tests/source-packet-builder-browser.spec.mjs');
const ciBrowser = read('scripts/ci-browser.sh');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.1.0-alpha.6-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0-alpha.6.json');

assert.equal(pkg.version, '1.1.0-alpha.6');
assert.equal(schema.properties.workflow_version.const, '1.1.0-alpha.6');
for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, '1.1.0-alpha.6');
  assert.equal(packet.source_packet_builder_report.builder_version, '1.1.0-alpha.6');
  assert.equal(packet.last_built_source_packet.workflow_version, '1.1.0-alpha.6');
  assert.equal(packet.last_built_source_packet.builder_version, 'source_packet_builder.v1');
  assert.equal(packet.release_notes.release_title, 'v1.1.0-alpha.6 — Root Manifest + Release Artifact Consolidation');
}

assert.ok(index.includes('data-browser-qa="source-packet-builder"'), 'builder card must expose a browser-QA hook');
assert.ok(index.includes('sourcePacketBuilderGuardrail'), 'builder card must include explicit QA guardrail copy');
assert.ok(index.includes('sourcePacketBuilderActions'), 'builder actions must be grouped for layout QA');
assert.ok(index.includes('sourcePacketBuilderOutput" aria-live="polite"'), 'builder output must be announced politely');

assert.ok(engine.includes("sourcePacketBuilderTitle:['sources','quality']"), 'builder card must be visible in Sources and Quality tabs, not hidden under Advanced only');
assert.ok(engine.includes('sourcePacketBuilderQaChecklist'), 'empty builder state must show browser-QA checklist');
assert.ok(engine.includes('sourcePacketBuilderPreview'), 'built packet output must include a bounded metadata preview');
assert.ok(engine.includes('live_fetching_performed: report?.live_fetching_performed === true'), 'preview must preserve live-fetching false semantics');
assert.ok(engine.includes('verification_claimed: report?.verification_claimed === true'), 'preview must preserve verification false semantics');

for (const token of [
  '.sourcePacketBuilderCard{overflow:hidden;contain:layout paint;}',
  '.sourcePacketBuilderActions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));',
  '.sourcePacketBuilderChips span{max-width:100%;min-width:0;white-space:normal;overflow-wrap:anywhere;',
  '.sourcePacketBuilderRiskGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));',
  '@media(max-width:780px){.sourcePacketBuilderActions,.sourcePacketBuilderRiskGrid,.sourcePacketBuilderQaChecklist{grid-template-columns:1fr}'
]) {
  assert.ok(styles.includes(token), `missing source packet builder UX/overflow CSS token: ${token}`);
}

for (const key of [
  'sourcePacketBuilderGuardrail',
  'sourcePacketBuilderBrowserQaNote',
  'sourcePacketBuilderQaNoLive',
  'sourcePacketBuilderQaLocalOnly',
  'sourcePacketBuilderQaWrap',
  'sourcePacketWarnings',
  'sourcePacketWeakTraceability',
  'sourcePacketAttentionReliabilityRisks'
]) {
  assert.ok(renderHelpers.includes(`${key}:`), `missing translation key ${key}`);
}

assert.ok(browserSpec.includes("data-browser-qa=\"source-packet-builder\""), 'browser spec must target stable QA hook');
assert.ok(browserSpec.includes('assertNoHorizontalOverflow'), 'browser spec must assert no horizontal overflow');
assert.ok(browserSpec.includes('buildSourcePacketFromEvidenceBtn'), 'browser spec must exercise build-from-evidence');
assert.ok(browserSpec.includes('copySourcePacketBuilderBtn'), 'browser spec must keep copy control visible');
assert.ok(browserSpec.includes('exportSourcePacketBuilderBtn'), 'browser spec must keep export control visible');
assert.ok(browserSpec.includes('live_fetching_performed'), 'browser spec must assert no live fetch semantics');
assert.ok(browserSpec.includes('verification_claimed'), 'browser spec must assert no verification claim semantics');

assert.ok(pkg.scripts['test:source:packet-builder:browser-qa'].includes('source-packet-builder-browser-qa-check.mjs'));
assert.ok(pkg.scripts['test:browser:source-packet-builder'].includes('source-packet-builder-browser.spec.mjs'));
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'));
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'));
assert.ok(ciBrowser.includes('npm run test:browser:source-packet-builder'), 'browser CI must include source packet builder browser QA');
assert.ok(ciNoBrowser.includes('tests/source-packet-builder-browser-qa-check.mjs'), 'no-browser CI must include static builder browser QA guard');
assert.ok(ciNoBrowser.includes('tests/version-suite-registry-check.mjs'), 'syntax gate must include v117 suite');

console.log('Source packet builder browser QA checks passed.');
process.exit(0);
