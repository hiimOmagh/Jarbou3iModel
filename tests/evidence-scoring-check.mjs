import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read = (file) => fs.readFileSync(file, 'utf8');
const scorerSource = read('src/research/evidence-scorer.js');
const engine = read('src/research-engine.js');
const quality = read('src/research/quality-gate.js');
const index = read('index.html');
const schema = JSON.parse(read('schema/research-workflow.schema.json'));
const fixture = JSON.parse(read('fixtures/research/sample-research-workflow-en.json'));
const migrationFixture = JSON.parse(read('fixtures/migrations/v1.0.20-packet.json'));
const privacyFixture = JSON.parse(read('fixtures/privacy/browser-generated-export-v1.0.20.json'));
const pkg = JSON.parse(read('package.json'));

new vm.Script(scorerSource, {filename:'src/research/evidence-scorer.js'});
new vm.Script(quality, {filename:'src/research/quality-gate.js'});
new vm.Script(engine, {filename:'src/research-engine.js'});

const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(scorerSource, context, {filename:'src/research/evidence-scorer.js'});
const scorer = context.window.Jarbou3iResearchModules.evidenceScorer;

assert.equal(pkg.version, '1.0.20');
assert.equal(scorer.VERSION, '1.0.20');
assert.equal(scorer.SCORING_VERSION, 'evidence_scoring.v1');
assert.equal(typeof scorer.scoreEvidenceItem, 'function');
assert.equal(typeof scorer.scoreEvidenceSet, 'function');

const viralWeak = scorer.scoreEvidenceItem({
  evidence_id:'E1', claim:'A viral social claim with weak traceability.', source_type:'social', source_date:'unknown', public_signal_score:5, evidence_strength:2, supports:[], contradicts:[], confidence:'low', import_meta:{engagement:{views:1200000}}
}, {now:'2026-05-02T00:00:00.000Z'});
assert.equal(viralWeak.attention_is_truth_score, false);
assert.ok(viralWeak.attention_signal_score >= 90, 'viral social item should carry high attention signal');
assert.ok(viralWeak.reliability_score < 55, 'weak social item should not become reliable because it is viral');
assert.ok(viralWeak.risk_flags.includes('attention_without_reliability'));
assert.ok(viralWeak.risk_flags.includes('high_attention_social_signal'));

const officialStrong = scorer.scoreEvidenceItem({
  evidence_id:'E2', claim:'Official publication with dated traceable source metadata and specific finding.', source_type:'official', source_title:'Official report', source_url:'https://example.gov/report', source_date:'2026-04-30', public_signal_score:1, evidence_strength:5, supports:['I1'], contradicts:['N1'], confidence:'high', notes:'Quote/excerpt: primary document states the implementation constraint.'
}, {now:'2026-05-02T00:00:00.000Z'});
assert.ok(officialStrong.reliability_score > viralWeak.reliability_score, 'traceable official evidence should outrank viral weak evidence on reliability');
assert.ok(officialStrong.contradiction_value_score >= 70);

const setReport = scorer.scoreEvidenceSet([
  {evidence_id:'E1', claim:'weak viral', source_type:'social', source_date:'unknown', public_signal_score:5, evidence_strength:2, supports:[], contradicts:[], confidence:'low', import_meta:{engagement:{views:1200000}}},
  {evidence_id:'E2', claim:'traceable official evidence with a specific dated source', source_type:'official', source_title:'Official report', source_url:'https://example.gov/report', source_date:'2026-04-30', public_signal_score:1, evidence_strength:5, supports:['I1'], contradicts:['N1'], confidence:'high', notes:'Quote/excerpt: source text.'}
], {now:'2026-05-02T00:00:00.000Z'});
assert.equal(setReport.scoring_model, 'evidence_scoring.v1');
assert.equal(setReport.policy, 'public attention is tracked separately from evidence reliability');
assert.ok(setReport.attention_dominance_risk_count >= 1);

assert.ok(index.includes('src="src/research/evidence-scorer.js" defer'), 'evidence scorer must load in index');
assert.ok(index.indexOf('evidence-scorer.js') < index.indexOf('source-packet-importer.js'), 'evidence scorer must load before source importers');
assert.ok(engine.includes('evidence_scoring_report'), 'research packet must export evidence scoring report');
assert.ok(engine.includes('attentionSignalIntegrityScore'), 'quality UI must surface attention integrity');
assert.ok(quality.includes('evidence_reliability'), 'quality gate must include evidence reliability dimension');
assert.ok(quality.includes('attention_signal_integrity'), 'quality gate must include attention signal integrity dimension');

assert.ok(schema.required.includes('evidence_scoring_report'), 'schema must require evidence_scoring_report');
assert.equal(schema.$defs.evidence_scoring.properties.scoring_version.const, 'evidence_scoring.v1');
assert.equal(schema.$defs.evidence_scoring.properties.attention_is_truth_score.const, false);
assert.equal(schema.$defs.evidence_scoring_report.properties.evidence_scoring_version.const, '1.0.20');

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, '1.0.20');
  assert.equal(packet.evidence_scoring_report.evidence_scoring_version, '1.0.20');
  assert.equal(packet.evidence_scoring_report.scoring_model, 'evidence_scoring.v1');
  assert.equal(packet.evidence_scoring_report.policy, 'public attention is tracked separately from evidence reliability');
  assert.ok(Array.isArray(packet.evidence_matrix) && packet.evidence_matrix.length > 0);
  for (const item of packet.evidence_matrix) {
    assert.equal(item.evidence_scoring.scoring_version, 'evidence_scoring.v1');
    assert.equal(item.evidence_scoring.scorer_version, '1.0.20');
    assert.equal(item.evidence_scoring.attention_is_truth_score, false);
    assert.equal(item.evidence_scoring.policy, 'attention_signal_is_not_evidence_reliability');
  }
  assert.equal(packet.release_notes.release_title, 'v1.0.20 — Source Packet Template Browser QA + Copy Safety');
}

console.log('Evidence scoring v1 checks passed.');
process.exit(0);
