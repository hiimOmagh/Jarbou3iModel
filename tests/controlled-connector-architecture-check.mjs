import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture, registryHasMigrationFixture, registryHasPrivacyFixture } from './fixture-registry-loader.mjs';

const VERSION = '1.1.0-alpha.20';
const read = (file) => fs.readFileSync(file, 'utf8');
const moduleSource = read('src/research/controlled-connector-engine.js');
const sourceConnectors = read('src/research/source-connectors.js');
const engine = read('src/research-engine.js');
const index = read('index.html');
const schema = JSON.parse(read('schema/research-workflow.schema.json'));
const fixture = JSON.parse(read('fixtures/research/sample-research-workflow-en.json'));
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.1.0-alpha.20-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0-alpha.20.json');

new vm.Script(moduleSource, {filename:'src/research/controlled-connector-engine.js'});
const context = {console, window:{Jarbou3iResearchModules:{}}};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, {filename:'src/research/controlled-connector-engine.js'});
const controlled = context.window.Jarbou3iResearchModules.controlledConnectorEngine;
assert.equal(controlled.VERSION, VERSION);
assert.equal(controlled.MODEL, 'controlled_connector_architecture.v1');
for (const id of ['url_list_import','manual_transcript_import','manual_source_list_import','web_search_api','github_public_repo']) {
  const contract = controlled.buildConnectorInterfaceContract(id, {version:VERSION});
  assert.equal(contract.connector_id, id);
  assert.equal(contract.review_gate, 'evidence_review_queue_required');
  assert.equal(contract.live_fetching_performed, false);
  assert.equal(contract.verification_claimed, false);
}
const normalized = controlled.normalizeConnectorResults({connector_id:'url_list_import', raw_text:'EU AI Act official timeline https://example.eu/ai-act\nCritical counter-source https://example.com/counter'}, {version:VERSION});
assert.equal(normalized.ok, true);
assert.equal(normalized.report.connector_id, 'url_list_import');
assert.equal(normalized.report.live_fetching_performed, false);
assert.equal(normalized.report.verification_claimed, false);
assert.equal(normalized.report.review_gate, 'evidence_review_queue_required');
assert.ok(normalized.evidence.length >= 2);
assert.ok(normalized.evidence.every((item) => item.import_meta?.connector_model === 'controlled_connector_architecture.v1'));
assert.ok(normalized.evidence.every((item) => item.import_meta?.review_gate === 'evidence_review_queue_required'));
const dry = controlled.dryRunConnectorExecution({connector:'manual_transcript_import', connector_options:{transcript_text:'Speaker: policy changed after evidence review https://example.com/transcript'}}, {version:VERSION});
assert.equal(dry.ok, true);
assert.equal(dry.data.live_fetching_performed, false);
assert.equal(dry.safety.uncontrolled_scraping_performed, false);
assert.equal(dry.safety.live_web_search_performed, false);
assert.equal(dry.safety.automatic_source_verification_claimed, false);
const registry = controlled.connectorCapabilityRegistry({version:VERSION});
assert.equal(registry.connector_registry_version, VERSION);
assert.equal(registry.safety_boundary.uncontrolled_scraping_allowed, false);
assert.equal(registry.safety_boundary.live_web_search_enabled, false);
assert.ok(registry.connectors.some((item)=>item.connector_id==='url_list_import'));

assert.ok(index.includes('src/research/controlled-connector-engine.js'), 'controlled connector module must load');
assert.ok(index.includes('value="url_list_import"'), 'URL list connector option missing');
assert.ok(index.includes('value="manual_transcript_import"'), 'manual transcript connector option missing');
assert.ok(sourceConnectors.includes('controlledConnectorEngine'), 'source connectors must delegate controlled manual connectors');
assert.ok(engine.includes('controlledConnectorReport'), 'research packet must export controlled connector report');
assert.ok(engine.includes('connector_safety_report'), 'research packet must export connector safety report');
assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(schema.required.includes('controlled_connector_report'));
assert.ok(schema.required.includes('connector_safety_report'));
assert.equal(schema.$defs.controlled_connector_report.properties.controlled_connector_report_version.const, VERSION);
assert.equal(schema.$defs.connector_safety_report.properties.connector_safety_report_version.const, VERSION);
for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, VERSION);
  assert.equal(packet.controlled_connector_report.controlled_connector_report_version, VERSION);
  assert.equal(packet.connector_safety_report.connector_safety_report_version, VERSION);
  assert.equal(packet.controlled_connector_report.uncontrolled_scraping_performed, false);
  assert.equal(packet.connector_safety_report.live_web_search_performed, false);
  assert.equal(packet.connector_safety_report.automatic_source_verification_claimed, false);
  assert.equal(packet.release_notes.release_title, 'v1.1.0-alpha.20 — Provider Router + Cost-Aware Run Ledger');
}
assert.ok(registryHasMigrationFixture('fixtures/migrations/v1.1.0-alpha.20-packet.json'));
assert.ok(registryHasPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0-alpha.20.json'));
console.log('Controlled connector architecture checks passed.');
process.exit(0);
