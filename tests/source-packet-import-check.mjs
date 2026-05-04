import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read = (file) => fs.readFileSync(file, 'utf8');
const scorerSource = read('src/research/evidence-scorer.js');
const importerSource = read('src/research/source-packet-importer.js');
const adapterSource = read('src/research/source-import-adapter.js');
const sample = read('fixtures/research/source-packet-sample.json');
const index = read('index.html');
const schema = JSON.parse(read('schema/research-workflow.schema.json'));
const fixture = JSON.parse(read('fixtures/research/sample-research-workflow-en.json'));
const migrationFixture = JSON.parse(read('fixtures/migrations/v1.0.25-packet.json'));
const privacyFixture = JSON.parse(read('fixtures/privacy/browser-generated-export-v1.0.25.json'));

new vm.Script(scorerSource, {filename:'src/research/evidence-scorer.js'});
new vm.Script(importerSource, {filename:'src/research/source-packet-importer.js'});
new vm.Script(adapterSource, {filename:'src/research/source-import-adapter.js'});

const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(scorerSource, context, {filename:'src/research/evidence-scorer.js'});
vm.runInContext(importerSource, context, {filename:'src/research/source-packet-importer.js'});
vm.runInContext(adapterSource, context, {filename:'src/research/source-import-adapter.js'});

const importer = context.window.Jarbou3iResearchModules.sourcePacketImporter;
const adapter = context.window.Jarbou3iResearchModules.sourceImportAdapter;
assert.equal(importer.VERSION, '1.0.25');
assert.equal(importer.PACKET_SCHEMA, 'manual_source_packet.v1');
assert.equal(typeof importer.parseSourcePacketImportText, 'function');
assert.equal(adapter.inferFormat(sample), 'source_packet');

const parsed = importer.parseSourcePacketImportText(sample);
assert.equal(parsed.ok, true);
assert.equal(parsed.report.input_format, 'source_packet');
assert.equal(parsed.report.source_packet_schema, 'manual_source_packet.v1');
assert.equal(parsed.report.live_fetching_performed, false);
assert.equal(parsed.report.verification_claimed, false);
assert.equal(parsed.report.packet_count, 2);
assert.equal(parsed.report.converted_count, 3);
assert.equal(parsed.evidence.length, 3);
assert.ok(parsed.evidence.some((item) => item.source_type === 'social'));
assert.ok(parsed.evidence.some((item) => item.source_type === 'official'));
assert.ok(parsed.evidence.every((item) => item.import_meta?.format === 'source_packet'));
assert.ok(parsed.evidence.every((item) => item.import_meta?.live_fetching_performed === false));
assert.ok(parsed.evidence.every((item) => item.import_meta?.verification_claimed === false));
assert.ok(parsed.evidence.every((item) => Array.isArray(item.supports) && Array.isArray(item.contradicts)));
assert.ok(parsed.evidence.every((item) => item.evidence_scoring?.scoring_version === 'evidence_scoring.v1'));
assert.ok(parsed.evidence.every((item) => item.evidence_scoring?.attention_is_truth_score === false));

const viaAdapter = adapter.parseSourceImportText(sample, {format:'auto'});
assert.equal(viaAdapter.ok, true);
assert.equal(viaAdapter.report.input_format, 'source_packet');
assert.equal(viaAdapter.evidence.length, 3);

assert.ok(index.includes('src/research/source-packet-importer.js'), 'source packet importer must load before adapter');
assert.ok(index.indexOf('source-packet-importer.js') < index.indexOf('source-import-adapter.js'), 'packet importer must load before source import adapter');
assert.ok(index.includes('value="source_packet"'), 'source packet format option missing');
assert.equal(schema.$defs.source_import_report.properties.import_version.const, '1.0.25');
assert.equal(schema.$defs.evidence_scoring.properties.scoring_version.const, 'evidence_scoring.v1');
assert.ok(schema.$defs.source_import_report.properties.input_format.enum.includes('source_packet'));
assert.equal(schema.$defs.source_import_report.properties.source_packet_schema.const, 'manual_source_packet.v1');

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, '1.0.25');
  assert.equal(packet.source_import_report.import_version, '1.0.25');
  assert.equal(packet.evidence_scoring_report.scoring_model, 'evidence_scoring.v1');
  assert.equal(packet.source_import_report.input_format, 'source_packet');
  assert.equal(packet.source_import_report.source_packet_schema, 'manual_source_packet.v1');
  assert.equal(packet.source_import_report.live_fetching_performed, false);
  assert.equal(packet.source_import_report.verification_claimed, false);
  assert.ok(packet.source_import_report.packet_count >= 1);
  assert.ok(Array.isArray(packet.source_imports) && packet.source_imports.some((item) => item.queue_only === true));
  assert.equal(packet.source_capability_registry.source_strategy_version, '1.0.25');
  assert.ok(packet.source_capability_registry.registry.some((item) => item.source_id === 'manual_source_packet' && item.status === 'available_manual_import'));
  assert.equal(packet.release_notes.release_title, 'v1.0.25 — Public Demo Release Lock');
}

console.log('Source packet import checks passed.');
process.exit(0);
