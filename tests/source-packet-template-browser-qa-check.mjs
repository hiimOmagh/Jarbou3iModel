import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const styles = read('src/styles.css');
const browserSpec = read('tests/source-packet-template-browser.spec.mjs');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const ciBrowser = read('scripts/ci-browser.sh');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.3.0-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0.json');
const templatesSource = read('src/research/source-packet-templates.js');
const importerSource = read('src/research/source-packet-importer.js');
const roundtripSource = read('src/research/source-packet-roundtrip.js');
const scorerSource = read('src/research/evidence-scorer.js');

for (const [file, source] of [
  ['src/research/source-packet-templates.js', templatesSource],
  ['src/research/source-packet-importer.js', importerSource],
  ['src/research/source-packet-roundtrip.js', roundtripSource],
  ['src/research/evidence-scorer.js', scorerSource],
  ['src/research-engine.js', engine]
]) new vm.Script(source, { filename: file });

const syntax = spawnSync(process.execPath, ['--check', 'tests/source-packet-template-browser.spec.mjs'], { encoding: 'utf8' });
assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || 'browser spec syntax check failed');

const context = { console, window: { Jarbou3iResearchModules: {} }, globalThis: null };
context.globalThis = context;
vm.createContext(context);
for (const source of [scorerSource, importerSource, roundtripSource, templatesSource]) vm.runInContext(source, context);
const templates = context.window.Jarbou3iResearchModules.sourcePacketTemplates;
const importer = context.window.Jarbou3iResearchModules.sourcePacketImporter;
const roundtrip = context.window.Jarbou3iResearchModules.sourcePacketRoundtrip;

assert.equal(pkg.version, '1.4.0-alpha.10');
assert.equal(templates.VERSION, '1.3.0');
assert.equal(schema.properties.workflow_version.const, '1.3.0');
assert.equal(schema.$defs.source_packet_template_report.properties.template_report_version.const, '1.3.0');

const expectedIds = ['official_report', 'reddit_thread', 'youtube_transcript', 'market_signal', 'github_release', 'generic_article'];
assert.equal(JSON.stringify(templates.listTemplates().map((item) => item.template_id)), JSON.stringify(expectedIds));

for (const id of expectedIds) {
  const packet = templates.sourcePacketFromTemplate(id, {
    title: `${id} copy-safety source`,
    url: `https://example.com/${id}`,
    claim: `Template ${id} claim remains a manual drafting scaffold.`,
    quote: `Template ${id} traceable excerpt placeholder.`
  }, { now: '2026-05-03T00:00:00.000Z' });
  assert.equal(packet.workflow_version, '1.3.0');
  assert.equal(packet.builder_report.live_fetching_performed, false);
  assert.equal(packet.builder_report.verification_claimed, false);
  assert.match(packet.builder_report.policy, /no_fetch_no_verification/);
  assert.equal(JSON.stringify(packet).includes('live scraping performed'), false, `${id} must not imply live scraping`);
  assert.equal(JSON.stringify(packet).includes('verified source truth'), false, `${id} must not imply verified truth`);
  const parsed = importer.parseSourcePacketImportText(JSON.stringify(packet));
  assert.equal(parsed.ok, true, `${id} must re-import through manual source packet importer`);
  assert.equal(parsed.report.queue_only, true, `${id} must remain queue-only after import`);
  const report = roundtrip.buildRoundtripReport(packet, parsed, { now: '2026-05-03T00:00:00.000Z' });
  assert.equal(report.live_fetching_performed, false);
  assert.equal(report.verification_claimed, false);
  assert.equal(report.attention_is_truth_score, false);
}

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, '1.3.0');
  assert.equal(packet.release_notes.release_title, 'v1.3.0 — Stable Manual Workflow Release');
  assert.equal(packet.source_packet_template_report.template_report_version, '1.3.0');
  assert.equal(packet.source_packet_template_report.live_fetching_performed, false);
  assert.equal(packet.source_packet_template_report.verification_claimed, false);
  assert.equal(packet.source_packet_template_report.source_behavior_changed, false);
  assert.equal(packet.source_packet_template_report.provider_behavior_changed, false);
}

assert.ok(index.includes('sourcePacketTemplateSelect'), 'template selector must be visible in the builder card');
assert.ok(index.includes('buildSourcePacketFromTemplateBtn'), 'template build control missing');
assert.ok(engine.includes('buildSourcePacketFromTemplate'), 'engine must expose template build flow');
assert.ok(engine.includes('copySourcePacketBuilderBtn'), 'copy control must remain wired');
assert.ok(engine.includes('exportSourcePacketBuilderBtn'), 'export control must remain wired');
assert.ok(styles.includes('.sourcePacketTemplateField'), 'template selector must have layout CSS');
assert.ok(browserSpec.includes('sourcePacketTemplateSelect'), 'browser spec must exercise template selector');
assert.ok(browserSpec.includes('copySourcePacketBuilderBtn'), 'browser spec must exercise copy control');
assert.ok(browserSpec.includes('exportSourcePacketBuilderBtn'), 'browser spec must exercise export control');
assert.ok(browserSpec.includes('live_fetching_performed'), 'browser spec must assert no live fetching');
assert.ok(browserSpec.includes('verification_claimed'), 'browser spec must assert no verification claim');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'));
assert.ok(ciBrowser.includes('ci-gate-runner.mjs browser'));

console.log('Source packet template browser QA + copy safety checks passed.');
process.exit(0);
