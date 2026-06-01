import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';

const read = (file) => fs.readFileSync(file, 'utf8');
const scorerSource = read('src/research/evidence-scorer.js');
const engine = read('src/research-engine.js');
const index = read('index.html');
const renderHelpers = read('src/research/render-helpers.js');
const schema = JSON.parse(read('schema/research-workflow.schema.json'));
const fixture = JSON.parse(read('fixtures/research/sample-research-workflow-en.json'));
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.3.0-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0.json');
const pkg = JSON.parse(read('package.json'));

new vm.Script(scorerSource, {filename:'src/research/evidence-scorer.js'});
new vm.Script(engine, {filename:'src/research-engine.js'});

const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(scorerSource, context, {filename:'src/research/evidence-scorer.js'});
const scorer = context.window.Jarbou3iResearchModules.evidenceScorer;

assert.equal(pkg.version, '1.4.0-alpha.37');
assert.equal(scorer.VERSION, '1.3.0');
assert.equal(scorer.SCORING_VERSION, 'evidence_scoring.v1');
assert.equal(scorer.CALIBRATION_VERSION, 'evidence_scoring_calibration.v1');
assert.equal(typeof scorer.calibrateScores, 'function');
assert.equal(typeof scorer.bandFor, 'function');
assert.equal(scorer.EXPLANATION_POLICY.attention, 'Attention = public visibility only. It is not a truth score.');

const viralWeak = scorer.scoreEvidenceItem({
  evidence_id:'E1', claim:'A viral social claim with weak traceability.', source_type:'social', source_date:'unknown', public_signal_score:5, evidence_strength:2, supports:[], contradicts:[], confidence:'low', import_meta:{engagement:{views:1200000}}
}, {now:'2026-05-02T00:00:00.000Z'});
assert.equal(viralWeak.attention_is_truth_score, false);
assert.equal(viralWeak.calibration_version, 'evidence_scoring_calibration.v1');
assert.equal(viralWeak.calibration_profile, 'conservative_editorial_research');
assert.equal(viralWeak.score_theater_guard, 'scores_explain_prioritization_not_truth');
assert.equal(viralWeak.attention_band, 'very_strong');
assert.ok(['low','moderate'].includes(viralWeak.reliability_band), 'weak viral evidence should not get a strong reliability band');
assert.ok(viralWeak.calibration_warnings.includes('attention_signal_must_not_be_read_as_truth'));
assert.ok(viralWeak.risk_flags.includes('attention_without_reliability'));

const officialStrong = scorer.scoreEvidenceItem({
  evidence_id:'E2', claim:'Official publication with dated traceable source metadata and specific finding.', source_type:'official', source_title:'Official report', source_url:'https://example.gov/report', source_date:'2026-04-30', public_signal_score:1, evidence_strength:5, supports:['I1'], contradicts:['N1'], confidence:'high', notes:'Quote/excerpt: primary document states the implementation constraint.'
}, {now:'2026-05-02T00:00:00.000Z'});
assert.ok(officialStrong.reliability_score > viralWeak.reliability_score);
assert.ok(['strong','very_strong'].includes(officialStrong.reliability_band));
assert.ok(officialStrong.calibration_warnings.includes('strong_low_attention_evidence_should_not_be_buried'));

const setReport = scorer.scoreEvidenceSet([
  {evidence_id:'E1', claim:'weak viral', source_type:'social', source_date:'unknown', public_signal_score:5, evidence_strength:2, supports:[], contradicts:[], confidence:'low', import_meta:{engagement:{views:1200000}}},
  {evidence_id:'E2', claim:'traceable official evidence with a specific dated source', source_type:'official', source_title:'Official report', source_url:'https://example.gov/report', source_date:'2026-04-30', public_signal_score:1, evidence_strength:5, supports:['I1'], contradicts:['N1'], confidence:'high', notes:'Quote/excerpt: source text.'}
], {now:'2026-05-02T00:00:00.000Z'});
assert.equal(setReport.scoring_model, 'evidence_scoring.v1');
assert.equal(setReport.calibration_version, 'evidence_scoring_calibration.v1');
assert.equal(setReport.calibration_profile, 'conservative_editorial_research');
assert.equal(setReport.score_theater_guard, 'scores_explain_prioritization_not_truth');
assert.ok(setReport.calibration_warning_count >= 1);
assert.ok(setReport.risk_flags.includes('calibration_warning_present'));

assert.ok(index.includes('content="1.4.0-alpha.37"'), 'current hosted metadata missing');
assert.ok(index.includes('data-r-i18n="evidenceScoringCalibrationShort"'), 'UI must expose localized evidence-scoring calibration copy');
assert.ok(renderHelpers.includes('evidenceScoringCalibrationShort'), 'render helpers must provide localized evidence-scoring calibration copy');
assert.ok(engine.includes('calibration_warning_count'), 'engine UI must surface calibration warning count');
assert.ok(engine.includes('score_theater_guard'), 'engine UI must expose score-theater guard');

assert.equal(schema.properties.workflow_version.const, '1.3.0');
assert.equal(schema.$defs.evidence_scoring.properties.scorer_version.const, '1.3.0');
assert.equal(schema.$defs.evidence_scoring.properties.calibration_version.const, 'evidence_scoring_calibration.v1');
assert.ok(schema.$defs.evidence_scoring.required.includes('score_theater_guard'));
assert.equal(schema.$defs.evidence_scoring_report.properties.evidence_scoring_version.const, '1.3.0');
assert.equal(schema.$defs.evidence_scoring_report.properties.calibration_version.const, 'evidence_scoring_calibration.v1');
assert.ok(schema.$defs.evidence_scoring_report.required.includes('calibration_warning_count'));

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, '1.3.0');
  assert.equal(packet.evidence_scoring_report.evidence_scoring_version, '1.3.0');
  assert.equal(packet.evidence_scoring_report.scoring_model, 'evidence_scoring.v1');
  assert.equal(packet.evidence_scoring_report.calibration_version, 'evidence_scoring_calibration.v1');
  assert.equal(packet.evidence_scoring_report.score_theater_guard, 'scores_explain_prioritization_not_truth');
  assert.ok(Number.isFinite(packet.evidence_scoring_report.calibration_warning_count));
  for (const item of packet.evidence_matrix) {
    assert.equal(item.evidence_scoring.scoring_version, 'evidence_scoring.v1');
    assert.equal(item.evidence_scoring.scorer_version, '1.3.0');
    assert.equal(item.evidence_scoring.calibration_version, 'evidence_scoring_calibration.v1');
    assert.equal(item.evidence_scoring.attention_is_truth_score, false);
    assert.equal(item.evidence_scoring.score_theater_guard, 'scores_explain_prioritization_not_truth');
    assert.ok(['low','moderate','strong','very_strong'].includes(item.evidence_scoring.reliability_band));
  }
  assert.equal(packet.release_notes.release_title, 'v1.3.0 — Stable Manual Workflow Release');
}

console.log('Evidence scoring calibration checks passed.');
process.exit(0);
