import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0-alpha.8';
const filesToLoad = [
  'src/research/evidence-workspace-ux.js',
  'src/research/operator-command-palette.js',
  'src/research/guided-research-session.js',
  'src/research/brief-template-system.js',
  'src/research/source-to-brief-workbench.js',
  'src/research/export-pack.js'
];
const context = {console, TextEncoder, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
for (const file of filesToLoad) vm.runInContext(fs.readFileSync(file, 'utf8'), context, {filename:file});

const modules = context.window.Jarbou3iResearchModules;
const guided = modules.guidedResearchSession;
const workbenchApi = modules.sourceToBriefWorkbench;
const exportPack = modules.exportPack;

assert.equal(guided.VERSION, VERSION);
assert.equal(workbenchApi.VERSION, VERSION);
assert.equal(exportPack.EXPORT_PACK_VERSION, VERSION);
assert.equal(typeof guided.buildOperatorSignoffState, 'function');
assert.equal(typeof guided.buildExportLockLedger, 'function');
assert.equal(typeof guided.operatorSignoffStateMarkdown, 'function');
assert.equal(typeof guided.exportLockLedgerMarkdown, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official support for I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-05-01', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:5},
  {evidence_id:'E2', claim:'Academic support for I1', source_title:'Academic source', source_type:'academic', source_url:'https://example.com/academic', source_date:'2026-05-02', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:5}
];
const basePacket = {
  workflow_version:VERSION,
  research_mode:'source-heavy',
  research_plan:{plan_version:VERSION, mode:'source-heavy', topic:'Operator signoff lock topic', questions:['Can the export be locked?'], counter_evidence_targets:[]},
  previous_brief_assembly_preview:{
    baseline_source:'operator_previous_export_review',
    title:'Operator signoff lock topic',
    assembly_state:'review_ready',
    supported_claim_count:1,
    partial_claim_count:0,
    weak_or_unsupported_claim_count:0,
    contradiction_group_count:0,
    source_gap_warning_count:0,
    unresolved_export_risk_count:0,
    ready_to_export:true,
    preview_sections:['research_question','executive_summary','claim_map','evidence_boundary','contradictions','source_gaps','confidence_review','export_risks','manual_disclaimer']
  },
  evidence_matrix:evidence,
  analysis_brief:{brief_version:VERSION, topic:'Operator signoff lock topic', handoff_summary:'Manual signoff state handoff.'},
  privacy_export:{release_gate:'pass'}
};

const unsignedWorkbench = workbenchApi.buildSourceToBriefWorkbench(basePacket, {version:VERSION, now:'2026-05-25T00:00:00.000Z'});
assert.ok(unsignedWorkbench.operator_signoff_state, 'operator signoff state missing');
assert.ok(unsignedWorkbench.export_lock_ledger, 'export lock ledger missing');
assert.equal(unsignedWorkbench.operator_signoff_state.state_model, 'operator_signoff_state.v1');
assert.equal(unsignedWorkbench.export_lock_ledger.ledger_model, 'export_lock_ledger.v1');
assert.equal(unsignedWorkbench.operator_signoff_state.current_state, 'awaiting_operator_confirmation');
assert.equal(unsignedWorkbench.operator_signoff_state.operator_signed_off, false);
assert.equal(unsignedWorkbench.operator_signoff_state.automatic_signoff_performed, false);
assert.equal(unsignedWorkbench.export_lock_ledger.lock_status, 'unlocked_manual_signoff_required');
assert.equal(unsignedWorkbench.export_lock_ledger.export_locked, false);
assert.equal(unsignedWorkbench.export_lock_ledger.automatic_lock_performed, false);
assert.equal(unsignedWorkbench.export_lock_ledger.lock_created_from_explicit_operator_input, false);
assert.equal(unsignedWorkbench.export_lock_ledger.export_allowed, false);
assert.ok(unsignedWorkbench.operator_signoff_state.missing_confirmation_count > 0, 'unsigned state must expose missing confirmations');

const requiredConfirmations = unsignedWorkbench.export_review_signoff.required_operator_confirmations;
const signedPacket = {
  ...basePacket,
  operator_signoff_input:{
    decision:'signed_off',
    operator_id:'operator-1',
    signed_at:'2026-05-25T01:00:00.000Z',
    confirmations:requiredConfirmations,
    notes:'Reviewed preview diff, evidence boundary, QA warnings, and no-auto-verification boundary.'
  }
};
const signedWorkbench = workbenchApi.buildSourceToBriefWorkbench(signedPacket, {version:VERSION, now:'2026-05-25T00:00:00.000Z'});
assert.equal(signedWorkbench.operator_signoff_state.current_state, 'signed_off_ready_for_export_lock');
assert.equal(signedWorkbench.operator_signoff_state.signoff_gate, 'operator_signoff_lock_allowed');
assert.equal(signedWorkbench.operator_signoff_state.export_permission, 'export_lock_allowed');
assert.equal(signedWorkbench.operator_signoff_state.operator_signed_off, true);
assert.equal(signedWorkbench.operator_signoff_state.automatic_signoff_performed, false);
assert.equal(signedWorkbench.operator_signoff_state.missing_confirmation_count, 0);
assert.equal(signedWorkbench.export_lock_ledger.lock_status, 'locked_for_export');
assert.equal(signedWorkbench.export_lock_ledger.lock_gate, 'export_locked_operator_signed');
assert.equal(signedWorkbench.export_lock_ledger.export_locked, true);
assert.equal(signedWorkbench.export_lock_ledger.export_allowed, true);
assert.equal(signedWorkbench.export_lock_ledger.lock_created_from_explicit_operator_input, true);
assert.equal(signedWorkbench.export_lock_ledger.automatic_lock_performed, false);
assert.match(signedWorkbench.export_lock_ledger.export_lock_hash, /^[a-f0-9]{8}$/);
assert.ok(signedWorkbench.export_lock_ledger.lock_entries.some((entry)=>entry.event_type === 'export_locked_by_operator' && entry.automatic_event === false));

const pack = exportPack.createExportPack(Object.assign({}, signedPacket, {source_to_brief_workbench:signedWorkbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/operator-signoff-state.json',
  'source-to-brief/operator-signoff-state.md',
  'source-to-brief/export-lock-ledger.json',
  'source-to-brief/export-lock-ledger.md'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/operator-signoff-state.md').content.includes('Operator Signoff State'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/export-lock-ledger.md').content.includes('Export Lock Ledger'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/operator-handoff.md').content.includes('Operator signoff state'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/operator-handoff.md').content.includes('Export lock status'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['operatorSignoffStatePanel','exportLockLedgerPanel','operator-signoff-state','export-lock-ledger']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Operator Signoff State','Export Lock Ledger','حالة اعتماد المشغّل','سجل قفل التصدير','État de visa opérateur','Registre de verrouillage export']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['operatorSignoffStatePanel','exportLockLedgerPanel','operatorSignoffStateList','exportLockLedgerList']) assert.ok(styles.includes(marker), `style missing ${marker}`);

const serializedUnsigned = JSON.stringify(unsignedWorkbench);
for (const forbidden of ['automatic_source_verification_claimed":true','live_web_search_performed":true','provider_execution_expanded":true','production_oauth_enabled":true','backend_behavior_expanded":true','automatic_signoff_performed":true','automatic_lock_performed":true','export_locked":true']) assert.equal(serializedUnsigned.includes(forbidden), false, `unsigned default must not contain ${forbidden}`);
const serializedSigned = JSON.stringify(signedWorkbench);
for (const forbidden of ['automatic_source_verification_claimed":true','live_web_search_performed":true','provider_execution_expanded":true','production_oauth_enabled":true','backend_behavior_expanded":true','automatic_signoff_performed":true','automatic_lock_performed":true']) assert.equal(serializedSigned.includes(forbidden), false, `explicit signoff must not enable forbidden capability: ${forbidden}`);

console.log('Operator signoff state and export lock ledger checks passed.');
