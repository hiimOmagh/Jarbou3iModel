import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.3.0-alpha.9-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0-alpha.9.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
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
]) new vm.Script(source, {filename:file});

const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
for (const source of [scorerSource, importerSource, roundtripSource, templatesSource]) vm.runInContext(source, context);
const templates = context.window.Jarbou3iResearchModules.sourcePacketTemplates;
const importer = context.window.Jarbou3iResearchModules.sourcePacketImporter;
const roundtrip = context.window.Jarbou3iResearchModules.sourcePacketRoundtrip;

assert.equal(pkg.version, '1.3.0-alpha.9');
assert.equal(templates.VERSION, '1.3.0-alpha.9');
assert.equal(templates.TEMPLATE_MODEL, 'source_packet_template_presets.v1');
assert.equal(templates.PACKET_SCHEMA, 'manual_source_packet.v1');
assert.equal(typeof templates.listTemplates, 'function');
assert.equal(typeof templates.sourcePacketFromTemplate, 'function');
assert.equal(templates.listTemplates().length, 6);

const expectedIds = ['official_report','reddit_thread','youtube_transcript','market_signal','github_release','generic_article'];
assert.equal(JSON.stringify(templates.listTemplates().map((item) => item.template_id)), JSON.stringify(expectedIds));
for (const id of expectedIds) {
  const packet = templates.sourcePacketFromTemplate(id, {title:`${id} title`, url:`https://example.com/${id}`, claim:`Template ${id} claim is explicit enough for review.`, quote:`Template ${id} excerpt.`}, {now:'2026-05-02T00:00:00.000Z'});
  assert.equal(packet.source_packet_version, 'manual_source_packet.v1');
  assert.equal(packet.builder_version, 'source_packet_builder.v1');
  assert.equal(packet.workflow_version, '1.3.0-alpha.9');
  assert.equal(packet.template_model, 'source_packet_template_presets.v1');
  assert.equal(packet.builder_report.live_fetching_performed, false);
  assert.equal(packet.builder_report.verification_claimed, false);
  assert.equal(packet.source_packets[0].template_id, id);
  const parsed = importer.parseSourcePacketImportText(JSON.stringify(packet));
  assert.equal(parsed.ok, true, `${id} should re-import`);
  assert.equal(parsed.report.live_fetching_performed, false);
  assert.equal(parsed.report.verification_claimed, false);
  assert.equal(parsed.report.queue_only, true);
  const report = roundtrip.buildRoundtripReport(packet, parsed, {now:'2026-05-02T00:00:00.000Z'});
  assert.equal(report.live_fetching_performed, false);
  assert.equal(report.verification_claimed, false);
  assert.equal(report.attention_is_truth_score, false);
  assert.ok(['roundtrip_qa_pass','roundtrip_review_required'].includes(report.release_gate));
}
const reddit = templates.sourcePacketFromTemplate('reddit_thread', {title:'Thread', claim:'A public discussion signal exists but is not proof.', quote:'Top comments discuss implementation risk.'}, {now:'2026-05-02T00:00:00.000Z'});
assert.equal(reddit.builder_report.scoring_review.risk_flags.includes('attention_is_not_reliability'), true);

assert.ok(index.includes('src/research/source-packet-templates.js'), 'template module must load in index');
assert.ok(index.indexOf('source-packet-importer.js') < index.indexOf('source-packet-templates.js'), 'templates load after importer');
assert.ok(index.indexOf('source-packet-templates.js') < index.indexOf('source-packet-builder.js'), 'templates load before builder/browser consumers');
assert.ok(index.includes('sourcePacketTemplateSelect'), 'template selector missing');
assert.ok(index.includes('buildSourcePacketFromTemplateBtn'), 'template build button missing');
assert.ok(engine.includes('sourcePacketTemplatePresets'), 'engine must expose template helper');
assert.ok(engine.includes('buildSourcePacketFromTemplate'), 'engine must build template packets');
assert.ok(engine.includes('source_packet_template_report'), 'research packet must export template report');

assert.equal(schema.properties.workflow_version.const, '1.3.0-alpha.9');
assert.ok(schema.required.includes('source_packet_template_report'));
assert.equal(schema.$defs.source_packet_template_report.properties.template_report_version.const, '1.3.0-alpha.9');
assert.equal(schema.$defs.source_packet_template_report.properties.template_model.const, 'source_packet_template_presets.v1');
assert.equal(schema.$defs.source_packet_template_report.properties.live_fetching_performed.const, false);
assert.equal(schema.$defs.source_packet_template_report.properties.verification_claimed.const, false);

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, '1.3.0-alpha.9');
  assert.equal(packet.release_notes.release_title, 'v1.3.0-alpha.9 — Source-to-Claim Gap Closure Queue');
  assert.equal(packet.source_packet_template_report.template_report_version, '1.3.0-alpha.9');
  assert.equal(packet.source_packet_template_report.template_model, 'source_packet_template_presets.v1');
  assert.equal(packet.source_packet_template_report.template_count, 6);
  assert.equal(packet.source_packet_template_report.live_fetching_performed, false);
  assert.equal(packet.source_packet_template_report.verification_claimed, false);
  assert.equal(packet.source_packet_template_report.source_behavior_changed, false);
  assert.equal(packet.source_packet_template_report.provider_behavior_changed, false);
  assert.equal(packet.source_packet_template_report.release_gate, 'template_presets_ready');
  assert.equal(packet.source_packet_template_report.policy, 'local_manual_source_packet_templates_no_fetch_no_verification');
}

console.log('Source packet template preset checks passed.');
process.exit(0);
