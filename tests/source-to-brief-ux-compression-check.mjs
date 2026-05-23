import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.2.0-alpha.4';
const context = { console, TextEncoder, window: { Jarbou3iResearchModules: {} } };
context.globalThis = context;
context.window = context;
vm.createContext(context);

for (const file of [
  'src/research/source-to-brief-workbench.js'
]) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}

const api = context.window.Jarbou3iResearchModules.sourceToBriefWorkbench;
assert.equal(api.VERSION, VERSION);
assert.equal(api.UX_MODEL, 'source_to_brief_operator_flow.v1');
assert.equal(typeof api.buildOperatorFlow, 'function');
assert.equal(typeof api.buildExportReadinessChecklist, 'function');
assert.equal(typeof api.buildEmptyStateGuidance, 'function');

const packet = {
  research_plan: { topic: 'Critical minerals diplomacy', counter_evidence_targets: ['Find evidence that minerals constraints are overstated.'] },
  evidence_matrix: [
    { evidence_id:'E1', claim:'Official strategy names critical minerals as a priority.', source_url:'https://example.gov/strategy', source_date:'2026-05-01', source_type:'official', confidence:'high', evidence_strength:5, supports:['I1'] },
    { evidence_id:'E2', claim:'Industry source disputes shortage severity.', source_url:'https://example.com/industry', source_date:'2026-05-02', source_type:'primary', confidence:'medium', evidence_strength:3, supports:['N1'], contradicts:['I1'] },
    { evidence_id:'E3', claim:'Manual note lacks traceability.', source_type:'other', confidence:'low', evidence_strength:1, supports:['R1'] }
  ],
  analysis_brief: { topic:'Critical minerals diplomacy', handoff_summary:'Operator review required.' },
  causal_links: [{ from:'N1', to:'I1', relationship:'contradicts', evidence_ids:['E2'] }]
};

const workbench = api.buildSourceToBriefWorkbench(packet, { version: VERSION, now:'2026-05-23T00:00:00.000Z' });
assert.equal(workbench.ux_compression_model, 'source_to_brief_operator_flow.v1');
assert.ok(workbench.operator_flow, 'operator flow must be present');
assert.equal(workbench.operator_flow.operator_flow_version, VERSION);
assert.deepEqual(Array.from(workbench.operator_flow.workflow_steps.map((step)=>step.step_id)), ['question','plan','evidence','claims','contradictions','gaps','confidence','export']);
assert.ok(workbench.operator_flow.workflow_steps.some((step)=>step.step_id === 'export' && step.status === 'ready_with_manual_review'));
assert.ok(workbench.operator_flow.next_best_action, 'operator flow must expose next best action');
assert.equal(workbench.operator_flow.live_fetching_performed, false);
assert.equal(workbench.operator_flow.verification_claimed, false);

assert.ok(workbench.export_readiness_checklist, 'export readiness checklist must be present');
assert.equal(workbench.export_readiness_checklist.checklist_version, VERSION);
assert.deepEqual(Array.from(workbench.export_readiness_checklist.items.map((item)=>item.check_id)), [
  'supported_claims_present',
  'weak_or_unsupported_claims_flagged',
  'contradictions_reviewed',
  'source_gaps_reviewed',
  'confidence_notes_present',
  'manual_local_disclaimer_present',
  'no_automatic_verification_claim'
]);
assert.ok(workbench.export_readiness_checklist.items.some((item)=>item.check_id === 'manual_local_disclaimer_present' && item.passed === true));
assert.ok(workbench.export_readiness_checklist.items.some((item)=>item.check_id === 'no_automatic_verification_claim' && item.passed === true));
assert.equal(workbench.export_readiness_checklist.automatic_source_verification_claimed, false);
assert.equal(workbench.export_readiness_checklist.live_fetching_performed, false);

assert.ok(workbench.empty_state_guidance, 'empty state guidance must be present');
assert.equal(workbench.empty_state_guidance.no_evidence.visible, false);
assert.equal(workbench.empty_state_guidance.no_claims.visible, false);
assert.equal(typeof workbench.empty_state_guidance.no_export_ready_package.next_action, 'string');

const empty = api.buildSourceToBriefWorkbench({ analysis_brief:{topic:'Empty packet'} }, { version: VERSION, now:'2026-05-23T00:00:00.000Z' });
assert.equal(empty.empty_state_guidance.no_evidence.visible, true);
assert.equal(empty.empty_state_guidance.no_claims.visible, true);
assert.equal(empty.empty_state_guidance.no_export_ready_package.visible, true);
assert.equal(empty.export_readiness_checklist.export_readiness_status, 'not_ready');

const source = fs.readFileSync('src/research-engine.js', 'utf8');
const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js', 'utf8');
const helpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');
assert.ok(source.includes('modules.sourceToBriefOperatorRenderer'), 'research engine must delegate source-to-brief rendering');
for (const required of ['sourceToBriefFlow','preExportReadinessTitle','compactEvidenceCard','compactClaimCard','sourceGapWarningsTitle']) {
  assert.ok(renderer.includes(required), `operator renderer missing ${required}`);
}
assert.ok(helpers.includes('No automatic verification claim present'), 'localized readiness copy must preserve no-verification boundary');
const styles = fs.readFileSync('src/styles.css', 'utf8');
for (const required of ['sourceToBriefFlow','compactClaimCard','exportReadinessList','@media(max-width:920px)']) {
  assert.ok(styles.includes(required), `styles missing ${required}`);
}

const forbidden = ['live_scraping_enabled:true','automatic_source_verification_claimed:true','provider_execution_expanded:true','production_oauth_enabled:true'];
for (const marker of forbidden) {
  assert.equal(fs.readFileSync('src/research/source-to-brief-workbench.js','utf8').includes(marker), false, `forbidden capability marker present: ${marker}`);
}

console.log('Source-to-brief UX compression checks passed.');
process.exit(0);
