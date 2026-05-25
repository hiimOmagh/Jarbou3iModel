import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0';
const filesToLoad = [
  'src/research/evidence-workspace-ux.js',
  'src/research/operator-command-palette.js',
  'src/research/source-to-brief-workbench.js',
  'src/research/export-pack.js'
];
const context = {console, TextEncoder, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
for (const file of filesToLoad) vm.runInContext(fs.readFileSync(file, 'utf8'), context, {filename:file});

const modules = context.window.Jarbou3iResearchModules;
const ux = modules.evidenceWorkspaceUx;
const workbenchApi = modules.sourceToBriefWorkbench;
const exportPack = modules.exportPack;

assert.equal(workbenchApi.VERSION, VERSION);
assert.equal(exportPack.EXPORT_PACK_VERSION, VERSION);
assert.equal(typeof workbenchApi.buildClaimTraceabilityConsole, 'function');
assert.equal(typeof workbenchApi.buildReviewDecisionLedger, 'function');
assert.equal(typeof exportPack.claimTraceabilityCsv, 'function');
assert.equal(typeof exportPack.reviewDecisionLedgerMarkdown, 'function');

const queue = [
  {review_id:'RQ1', status:'pending', created_at:'2026-01-03T00:00:00.000Z', evidence:{evidence_id:'E1', claim:'Official position supports I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-01-02', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:4, evidence_scoring:{reliability_score:86, attention_signal_score:20}}},
  {review_id:'RQ2', status:'needs_edit', created_at:'2026-01-04T00:00:00.000Z', evidence:{evidence_id:'E2', claim:'Counter evidence challenges I1', source_title:'Counter source', source_type:'academic', source_url:'', source_date:'unknown', supports:[], contradicts:['I1'], confidence:'medium', evidence_strength:3, evidence_scoring:{reliability_score:55, attention_signal_score:88}}}
];
const evidence = queue.map((item)=>item.evidence).concat([{evidence_id:'E3', claim:'Unlinked note for gap visibility', source_title:'Context note', source_type:'media', source_url:'https://example.com/context', source_date:'2026-01-05', supports:[], contradicts:[], confidence:'medium', evidence_strength:2}]);
const throughput = ux.throughputReport(queue, {status:'unresolved', sort:'needs_review_first'}, {source_gap_report:{gap_warnings:['missing_counter_evidence_for_A1']}});
const packet = {
  workflow_version:VERSION,
  research_plan:{topic:'Alpha5 traceability topic'},
  evidence_review_queue:queue,
  evidence_workspace_ux_report:ux.workspaceUxReport(queue, {status:'unresolved', sort:'needs_review_first'}, {}),
  review_throughput_report:throughput,
  evidence_matrix:evidence,
  causal_links:[{from:'I1', to:'N1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  analysis_brief:{topic:'Alpha5 traceability topic', handoff_summary:'Manual traceability handoff.', source_clusters:[{cluster_id:'CL1', target_id:'I1', evidence_ids:['E1','E2']}]},
  privacy_export:{release_gate:'pass'}
};

const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-23T00:00:00.000Z'});
assert.equal(workbench.source_to_brief_version, VERSION);
assert.ok(workbench.claim_traceability_console, 'claim traceability console missing');
assert.equal(workbench.claim_traceability_console.claim_traceability_console_version, VERSION);
assert.equal(workbench.claim_traceability_console.traceability_model, 'claim_traceability_console.v1');
assert.ok(workbench.claim_traceability_console.rows.some((row)=>row.claim_id === 'I1' && row.traceability_status === 'partial_traceability'));
assert.ok(workbench.claim_traceability_console.rows.some((row)=>row.decision_state === 'contradiction_review_required'));
assert.equal(workbench.claim_traceability_console.live_fetching_performed, false);
assert.equal(workbench.claim_traceability_console.automatic_source_verification_claimed, false);

assert.ok(workbench.review_decision_ledger, 'review decision ledger missing');
assert.equal(workbench.review_decision_ledger.review_decision_ledger_version, VERSION);
assert.equal(workbench.review_decision_ledger.ledger_model, 'review_decision_ledger.v1');
assert.ok(workbench.review_decision_ledger.entries.some((entry)=>entry.decision_type === 'claim_traceability_decision' && entry.claim_id === 'I1'));
assert.ok(workbench.review_decision_ledger.entries.some((entry)=>entry.decision_type === 'contradiction_resolution_decision'));
assert.ok(workbench.review_decision_ledger.entries.some((entry)=>entry.decision_type === 'export_handoff_decision'));
assert.equal(workbench.review_decision_ledger.queue_bypass_enabled, false);
assert.equal(workbench.review_decision_ledger.live_fetching_performed, false);
assert.equal(workbench.review_decision_ledger.provider_execution_expanded, false);
assert.equal(workbench.review_decision_ledger.automatic_source_verification_claimed, false);
assert.ok(workbench.export_polish_report.handoff_file_plan.includes('source-to-brief/claim-traceability-console.json'));
assert.ok(workbench.export_polish_report.handoff_file_plan.includes('source-to-brief/review-decision-ledger.json'));

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/claim-traceability-console.json',
  'source-to-brief/claim-traceability.csv',
  'source-to-brief/review-decision-ledger.json',
  'source-to-brief/review-decision-ledger.md',
  'source-to-brief/operator-command-palette.json',
  'source-to-brief/review-navigation-shortcuts.json'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
assert.equal(pack.manifest.export_pack_version, VERSION);
assert.equal(JSON.parse(pack.files.find((file)=>file.path === 'source-to-brief/review-decision-ledger.json').content).automatic_source_verification_claimed, false);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/review-decision-ledger.md',
  'source-to-brief/operator-command-palette.json',
  'source-to-brief/review-navigation-shortcuts.json').content.includes('do not verify source truth'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['claimTraceabilityTitle','decisionLedgerTitle','claimTraceabilityConsole','reviewDecisionLedgerPanel']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Claim traceability console','Review decision ledger','لوحة تتبع الادعاءات','سجل قرارات المراجعة','Console de traçabilité des affirmations','Registre des décisions de revue']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['claimTraceabilityPanel','reviewDecisionLedgerPanel','claimTraceabilityRow','reviewDecisionLedgerList']) assert.ok(styles.includes(marker), `styles missing ${marker}`);

const serialized = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['live_scraping_enabled:true','automatic_source_verification_claimed:true','provider_execution_expanded:true','production_oauth_enabled:true','queue_bypass_enabled:true']) assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);

console.log('Source-to-brief claim traceability console checks passed.');
