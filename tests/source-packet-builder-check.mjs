import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';

const read = (file) => fs.readFileSync(file, 'utf8');
const scorerSource = read('src/research/evidence-scorer.js');
const builderSource = read('src/research/source-packet-builder.js');
const engine = read('src/research-engine.js');
const index = read('index.html');
const schema = JSON.parse(read('schema/research-workflow.schema.json'));
const fixture = JSON.parse(read('fixtures/research/sample-research-workflow-en.json'));
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.1.0-alpha.25-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0-alpha.25.json');
const pkg = JSON.parse(read('package.json'));

new vm.Script(scorerSource, {filename:'src/research/evidence-scorer.js'});
new vm.Script(builderSource, {filename:'src/research/source-packet-builder.js'});
new vm.Script(engine, {filename:'src/research-engine.js'});

const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(scorerSource, context, {filename:'src/research/evidence-scorer.js'});
vm.runInContext(builderSource, context, {filename:'src/research/source-packet-builder.js'});
const scorer = context.window.Jarbou3iResearchModules.evidenceScorer;
const builder = context.window.Jarbou3iResearchModules.sourcePacketBuilder;

assert.equal(pkg.version, '1.1.0-alpha.25');
assert.equal(builder.VERSION, '1.1.0-alpha.25');
assert.equal(builder.BUILDER_VERSION, 'source_packet_builder.v1');
assert.equal(builder.PACKET_SCHEMA, 'manual_source_packet.v1');
assert.equal(typeof builder.buildSourcePacket, 'function');
assert.equal(typeof builder.reviewControlsForEvidence, 'function');
assert.equal(typeof builder.scoringReviewSummary, 'function');

const weakViral = scorer.attachEvidenceScoring({
  evidence_id:'E1', claim:'Viral but weakly traceable public claim about implementation risk.', source_type:'social', source_title:'Thread', source_url:'', source_date:'unknown', public_signal_score:5, evidence_strength:2, supports:[], contradicts:[], confidence:'low', import_meta:{engagement:{views:1200000}}
}, {now:'2026-05-02T00:00:00.000Z'});
const official = scorer.attachEvidenceScoring({
  evidence_id:'E2', claim:'Traceable official source with dated implementation evidence.', source_type:'official', source_title:'Official report', source_url:'https://example.gov/report', source_date:'2026-04-30', public_signal_score:1, evidence_strength:5, supports:['I1'], contradicts:['N1'], confidence:'high', notes:'Quote/excerpt: primary source text.'
}, {now:'2026-05-02T00:00:00.000Z'});

const controls = builder.reviewControlsForEvidence(weakViral);
assert.equal(controls.attention_is_truth_score, false);
assert.equal(controls.recommended_action, 'needs_edit');
assert.ok(controls.controls.includes('request_source_metadata'));
assert.ok(controls.controls.includes('downgrade_attention_claim'));

const packet = builder.buildSourcePacket([weakViral, official], {now:'2026-05-02T00:00:00.000Z'});
assert.equal(packet.source_packet_version, 'manual_source_packet.v1');
assert.equal(packet.builder_version, 'source_packet_builder.v1');
assert.equal(packet.workflow_version, '1.1.0-alpha.25');
assert.equal(packet.builder_report.live_fetching_performed, false);
assert.equal(packet.builder_report.verification_claimed, false);
assert.equal(packet.builder_report.queue_only_recommended, true);
assert.equal(packet.builder_report.scoring_review.attention_without_reliability_count, 1);
assert.equal(packet.builder_report.scoring_review.release_gate, 'review_required');
assert.ok(packet.source_packets.length >= 1);
assert.ok(packet.source_packets.every((sourcePacket) => Array.isArray(sourcePacket.evidence)));
assert.ok(packet.source_packets.flatMap((sourcePacket) => sourcePacket.evidence).every((item) => item.scoring_review.attention_is_truth_score === false));

assert.ok(index.includes('src/research/source-packet-builder.js'), 'builder module must be loaded by index');
assert.ok(index.indexOf('source-packet-builder.js') < index.indexOf('source-import-adapter.js'), 'builder must load before adapter consumers');
assert.ok(index.includes('sourcePacketBuilderCard'), 'builder UI card missing');
assert.ok(index.includes('buildSourcePacketFromEvidenceBtn'), 'build-from-evidence button missing');
assert.ok(index.includes('buildSourcePacketFromReviewBtn'), 'build-from-review button missing');
assert.ok(engine.includes('renderSourcePacketBuilder'), 'engine must render builder output');
assert.ok(engine.includes('markReviewItemNeedsEdit'), 'engine must expose scoring review controls');
assert.ok(engine.includes('source_packet_builder_report'), 'research packet must export builder report');

assert.equal(schema.properties.workflow_version.const, '1.1.0-alpha.25');
assert.ok(schema.required.includes('source_packet_builder_report'));
assert.ok(schema.required.includes('last_built_source_packet'));
assert.equal(schema.$defs.source_packet_builder_report.properties.builder_version.const, '1.1.0-alpha.25');
assert.equal(schema.$defs.manual_source_packet_payload.properties.builder_version.const, 'source_packet_builder.v1');

for (const packetFixture of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packetFixture.workflow_version, '1.1.0-alpha.25');
  assert.equal(packetFixture.source_packet_builder_report.builder_version, '1.1.0-alpha.25');
  assert.equal(packetFixture.source_packet_builder_report.live_fetching_performed, false);
  assert.equal(packetFixture.source_packet_builder_report.verification_claimed, false);
  assert.equal(packetFixture.last_built_source_packet.builder_version, 'source_packet_builder.v1');
  assert.equal(packetFixture.last_built_source_packet.source_packet_version, 'manual_source_packet.v1');
  assert.equal(packetFixture.release_notes.release_title, 'v1.1.0-alpha.25 — Release Candidate Hardening + Final Repo Hygiene');
}

console.log('Source packet builder checks passed.');
process.exit(0);
