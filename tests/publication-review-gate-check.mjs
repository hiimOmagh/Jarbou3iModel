import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0';
const source = fs.readFileSync('src/research/publication-review-gate.js', 'utf8');
const engine = fs.readFileSync('src/research-engine.js', 'utf8');
const exportPack = fs.readFileSync('src/research/export-pack.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const schema = JSON.parse(fs.readFileSync('schema/research-workflow.schema.json', 'utf8'));
const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));

new vm.Script(source, {filename:'src/research/publication-review-gate.js'});
const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(source, context, {filename:'src/research/publication-review-gate.js'});
const gate = context.window.Jarbou3iResearchModules.publicationReviewGate;

assert.equal(gate.VERSION, VERSION);
assert.equal(gate.MODEL, 'publication_review_gate.v1');
assert.equal(gate.classifyClaimText('Reuters reported the filing on 2026-05-01.'), 'observation');
assert.equal(gate.classifyClaimText('This indicates a shift in incentives.'), 'inference');
assert.equal(gate.classifyClaimText('This could raise escalation risk if deterrence fails.'), 'estimate');

const packet = {
  workflow_version: VERSION,
  research_plan:{disconfirming_conditions:['Disproven if E2 is rejected by higher-reliability evidence.']},
  evidence_matrix:[
    {evidence_id:'E1', claim:'Official source reported the policy on 2026-05-01.', source_url:'https://example.gov/report', source_date:'2026-05-01', evidence_strength:4, supports:['I1'], contradicts:[], confidence:'high'},
    {evidence_id:'E2', claim:'This indicates implementation risk could rise if procurement is delayed.', source_url:'https://example.com/analysis', source_date:'2026-05-02', evidence_strength:3, supports:['R1'], contradicts:['N1'], confidence:'medium'}
  ],
  causal_links:[{from:'N1', to:'R1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  brief_traceability_report:{paragraph_links:[
    {paragraph_id:'P1', section:'handoff_summary', paragraph_text:'The conclusion follows from E1 and E2.', evidence_ids:['E1','E2']},
    {paragraph_id:'P2', section:'scenario', paragraph_text:'Risk could increase if procurement is delayed; disproven if E2 is rejected.', evidence_ids:['E2']}
  ]},
  contradiction_falsifier_appendix:{falsifiers:[{falsifier_id:'FAL1', condition:'Disproven if E2 is rejected.', linked_evidence_ids:['E2']}]},
  publication_readiness_export_report:{publication_readiness_score:84, blockers:[]}
};
const classification = gate.classifyEvidenceClaims(packet, {version:VERSION});
assert.equal(classification.claim_classification_report_version, VERSION);
assert.equal(classification.claim_count, 2);
assert.equal(classification.live_fetching_performed, false);
assert.equal(classification.verification_claimed, false);
assert.ok(classification.observation_count >= 1);
assert.ok(classification.estimate_count >= 1 || classification.inference_count >= 1);

const boundary = gate.auditClaimBoundaries(packet, {version:VERSION});
assert.equal(boundary.claim_boundary_audit_version, VERSION);
assert.equal(boundary.unsupported_conclusion_count, 0);
assert.equal(boundary.live_fetching_performed, false);

const completeness = gate.contradictionFalsifierCompleteness(packet, {version:VERSION});
assert.equal(completeness.contradiction_falsifier_completeness_version, VERSION);
assert.ok(completeness.completeness_score >= 75);
assert.equal(completeness.live_fetching_performed, false);

const final = gate.buildExportSafeFinalReviewReport(packet, {version:VERSION});
assert.equal(final.export_safe_final_review_report_version, VERSION);
assert.equal(final.export_safety.live_fetching_performed, false);
assert.equal(final.export_safety.provider_execution_expanded, false);
assert.equal(final.export_safety.oauth_backend_expanded, false);
assert.ok(['export_safe_manual_review_required','manual_correction_required'].includes(final.final_review_status));

const bundle = gate.buildPublicationReviewBundle(packet, {version:VERSION});
for (const key of ['claim_classification_report','claim_boundary_audit_report','contradiction_falsifier_completeness_report','publication_review_gate_report','export_safe_final_review_report']) assert.ok(bundle[key], `missing ${key}`);
assert.equal(bundle.publication_review_gate_report.evidence_review_queue_required, true);
assert.equal(bundle.publication_review_gate_report.live_fetching_performed, false);

assert.ok(index.includes('src/research/publication-review-gate.js'), 'publication review gate script missing');
assert.ok(index.indexOf('evidence-pack-v3.js') < index.indexOf('publication-review-gate.js'), 'publication review gate must load after evidence pack v3');
assert.ok(index.indexOf('publication-review-gate.js') < index.indexOf('export-pack.js'), 'publication review gate must load before export pack');
assert.ok(engine.includes('publicationReviewGate'), 'research engine must reference publication review gate');
assert.ok(engine.includes('publicationReviewBundle'), 'research packet must build publication review bundle');
assert.ok(exportPack.includes('publicationReviewFiles'), 'export pack must include publication review files');
assert.ok(exportPack.includes('publication-review/publication-review-gate-report.json'), 'export pack must write publication review report');

for (const key of ['claim_classification_report','claim_boundary_audit_report','contradiction_falsifier_completeness_report','publication_review_gate_report','export_safe_final_review_report']) {
  assert.ok(schema.properties[key], `schema missing ${key}`);
  assert.ok(fixture[key], `fixture missing ${key}`);
}
assert.ok(registry.gates['no-browser'].node_checks.includes('tests/publication-review-gate-check.mjs'), 'no-browser gate must include publication review gate check');
assert.ok(registry.gates.release.node_checks.includes('tests/publication-review-gate-check.mjs'), 'release gate must include publication review gate check');
assert.ok(registry.syntax_matrix.files.includes('src/research/publication-review-gate.js'), 'syntax matrix must cover publication review gate module');

console.log('Publication review gate and claim boundary audit checks passed.');
process.exit(0);
