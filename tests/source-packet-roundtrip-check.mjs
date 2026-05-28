import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.3.0-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const importerSource = read('src/research/source-packet-importer.js');
const builderSource = read('src/research/source-packet-builder.js');
const scorerSource = read('src/research/evidence-scorer.js');
const roundtripSource = read('src/research/source-packet-roundtrip.js');

for (const [file, source] of [
  ['src/research/evidence-scorer.js', scorerSource],
  ['src/research/source-packet-importer.js', importerSource],
  ['src/research/source-packet-builder.js', builderSource],
  ['src/research/source-packet-roundtrip.js', roundtripSource]
]) new vm.Script(source, {filename:file});

const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
for (const source of [scorerSource, importerSource, builderSource, roundtripSource]) vm.runInContext(source, context);

const modules = context.window.Jarbou3iResearchModules;
const scorer = modules.evidenceScorer;
const builder = modules.sourcePacketBuilder;
const importer = modules.sourcePacketImporter;
const roundtrip = modules.sourcePacketRoundtrip;

assert.equal(pkg.version, '1.4.0-alpha.11');
assert.equal(builder.VERSION, '1.3.0');
assert.equal(importer.VERSION, '1.3.0');
assert.equal(roundtrip.VERSION, '1.3.0');
assert.equal(roundtrip.ROUNDTRIP_MODEL, 'source_packet_roundtrip.v1');
assert.equal(typeof roundtrip.runSourcePacketRoundtrip, 'function');

const evidence = [
  scorer.attachEvidenceScoring({
    evidence_id:'E1',
    claim:'Traceable official source supports the implementation-risk claim with dated source metadata.',
    source_type:'official',
    source_title:'Official implementation report',
    source_url:'https://example.gov/implementation-report',
    source_date:'2026-04-30',
    time_relevance_score:5,
    evidence_strength:5,
    public_signal_score:1,
    supports:['I1'],
    contradicts:['N1'],
    confidence:'high',
    notes:'Quote/excerpt: Official implementation timetable identifies grid-connection constraints.'
  }, {now:'2026-05-02T00:00:00.000Z'}),
  scorer.attachEvidenceScoring({
    evidence_id:'E2',
    claim:'A high-attention social discussion exists but should remain separate from reliability scoring.',
    source_type:'social',
    source_title:'Public discussion thread',
    source_url:'https://example.com/thread',
    source_date:'2026-04-29',
    time_relevance_score:5,
    evidence_strength:3,
    public_signal_score:5,
    supports:['N1'],
    contradicts:[],
    confidence:'medium',
    notes:'Quote/excerpt: Top comments discuss procurement opacity.',
    import_meta:{engagement:{upvotes:2500, comments:700}}
  }, {now:'2026-05-02T00:00:00.000Z'})
];

const result = roundtrip.runSourcePacketRoundtrip(evidence, {now:'2026-05-02T00:00:00.000Z'});
assert.equal(result.ok, true);
assert.equal(result.packet.source_packet_version, 'manual_source_packet.v1');
assert.equal(result.packet.builder_version, 'source_packet_builder.v1');
assert.equal(result.packet.workflow_version, '1.3.0');
assert.equal(result.parsed.ok, true);
assert.equal(result.parsed.report.input_format, 'source_packet');
assert.equal(result.parsed.report.live_fetching_performed, false);
assert.equal(result.parsed.report.verification_claimed, false);
assert.equal(result.parsed.report.queue_only, true);
assert.equal(result.report.release_gate, 'roundtrip_qa_pass');
assert.equal(result.report.live_fetching_performed, false);
assert.equal(result.report.verification_claimed, false);
assert.equal(result.report.attention_is_truth_score, false);
assert.equal(result.report.scoring_review_preserved, true);
assert.equal(result.report.queue_only_preserved, true);
assert.equal(result.report.privacy_boundary_preserved, true);
assert.equal(result.report.exported_evidence_item_count, 2);
assert.equal(result.report.reimported_evidence_item_count, 2);
assert.equal(result.report.scored_reimported_evidence_item_count, 2);
assert.equal(result.report.risk_flags.length, 0);
assert.ok(result.parsed.evidence.every((item) => item.import_meta?.source_packet_scoring_review));
assert.ok(result.parsed.evidence.every((item) => item.import_meta?.scoring_review_preserved === true));
assert.ok(result.parsed.evidence.every((item) => item.import_meta?.live_fetching_performed === false));
assert.ok(result.parsed.evidence.every((item) => item.import_meta?.verification_claimed === false));
assert.ok(result.parsed.evidence.every((item) => item.evidence_scoring?.attention_is_truth_score === false));
assert.ok(result.parsed.evidence.every((item) => item.evidence_scoring?.scoring_version === 'evidence_scoring.v1'));

assert.ok(index.includes('src/research/source-packet-roundtrip.js'), 'roundtrip module must load in index');
assert.ok(index.indexOf('source-packet-builder.js') < index.indexOf('source-packet-roundtrip.js'), 'roundtrip must load after builder');
assert.ok(index.indexOf('source-packet-roundtrip.js') < index.indexOf('source-import-adapter.js'), 'roundtrip must load before adapter/browser consumers');
assert.ok(engine.includes('source_packet_roundtrip_report'), 'research packet must export roundtrip report');
assert.ok(engine.includes('runSourcePacketRoundtrip'), 'engine must invoke roundtrip QA when builder runs');

assert.equal(schema.properties.workflow_version.const, '1.3.0');
assert.ok(schema.required.includes('source_packet_roundtrip_report'));
assert.equal(schema.$defs.source_packet_roundtrip_report.properties.roundtrip_version.const, '1.3.0');
assert.equal(schema.$defs.source_packet_roundtrip_report.properties.roundtrip_model.const, 'source_packet_roundtrip.v1');
assert.equal(schema.$defs.source_packet_roundtrip_report.properties.live_fetching_performed.const, false);
assert.equal(schema.$defs.source_packet_roundtrip_report.properties.verification_claimed.const, false);
assert.equal(schema.$defs.source_packet_roundtrip_report.properties.attention_is_truth_score.const, false);

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, '1.3.0');
  assert.equal(packet.release_notes.release_title, 'v1.3.0 — Stable Manual Workflow Release');
  assert.equal(packet.source_packet_roundtrip_report.roundtrip_version, '1.3.0');
  assert.equal(packet.source_packet_roundtrip_report.roundtrip_model, 'source_packet_roundtrip.v1');
  assert.equal(packet.source_packet_roundtrip_report.live_fetching_performed, false);
  assert.equal(packet.source_packet_roundtrip_report.verification_claimed, false);
  assert.equal(packet.source_packet_roundtrip_report.attention_is_truth_score, false);
  assert.equal(packet.source_packet_roundtrip_report.scoring_review_preserved, true);
  assert.equal(packet.source_packet_roundtrip_report.queue_only_preserved, true);
  assert.equal(packet.source_packet_roundtrip_report.privacy_boundary_preserved, true);
  assert.equal(packet.source_packet_roundtrip_report.release_gate, 'roundtrip_qa_pass');
  assert.equal(packet.last_built_source_packet.source_packet_version, 'manual_source_packet.v1');
  assert.equal(packet.last_built_source_packet.builder_report.live_fetching_performed, false);
  assert.equal(packet.last_built_source_packet.builder_report.verification_claimed, false);
}

console.log('Source packet roundtrip checks passed.');
process.exit(0);
