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
const workbenchApi = modules.sourceToBriefWorkbench;
const exportPack = modules.exportPack;

assert.equal(workbenchApi.VERSION, VERSION);
assert.equal(exportPack.EXPORT_PACK_VERSION, VERSION);
assert.equal(typeof workbenchApi.buildLockLedgerReviewSurface, 'function');
assert.equal(typeof workbenchApi.buildSignedExportHandoffPack, 'function');
assert.equal(typeof workbenchApi.lockLedgerReviewSurfaceMarkdown, 'function');
assert.equal(typeof workbenchApi.signedExportHandoffPackMarkdown, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official support for I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-05-01', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:5},
  {evidence_id:'E2', claim:'Academic support for I1', source_title:'Academic source', source_type:'academic', source_url:'https://example.com/academic', source_date:'2026-05-02', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:5}
];
const basePacket = {
  workflow_version:VERSION,
  research_mode:'source-heavy',
  research_plan:{plan_version:VERSION, mode:'source-heavy', topic:'Signed export handoff topic', questions:['Can the export be locked and handed off?'], counter_evidence_targets:[]},
  previous_brief_assembly_preview:{
    baseline_source:'operator_previous_export_review',
    title:'Signed export handoff topic',
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
  analysis_brief:{brief_version:VERSION, topic:'Signed export handoff topic', handoff_summary:'Manual signed export handoff.'},
  privacy_export:{release_gate:'pass'}
};

const unsignedWorkbench = workbenchApi.buildSourceToBriefWorkbench(basePacket, {version:VERSION, now:'2026-05-25T00:00:00.000Z'});
assert.ok(unsignedWorkbench.lock_ledger_review_surface, 'lock ledger review surface missing');
assert.ok(unsignedWorkbench.signed_export_handoff_pack, 'signed export handoff pack missing');
assert.equal(unsignedWorkbench.lock_ledger_review_surface.review_surface_model, 'lock_ledger_review_surface.v1');
assert.equal(unsignedWorkbench.signed_export_handoff_pack.handoff_pack_model, 'signed_export_handoff_pack.v1');
assert.equal(unsignedWorkbench.signed_export_handoff_pack.handoff_status, 'unlocked');
assert.equal(unsignedWorkbench.signed_export_handoff_pack.export_locked, false);
assert.equal(unsignedWorkbench.signed_export_handoff_pack.operator_signed_off, false);
assert.equal(unsignedWorkbench.signed_export_handoff_pack.cryptographic_signature_claimed, false);
assert.equal(unsignedWorkbench.signed_export_handoff_pack.lock_hash, null);
assert.equal(unsignedWorkbench.lock_ledger_review_surface.lock_hash, null);
assert.ok(unsignedWorkbench.lock_ledger_review_surface.blocker_reasons.includes('manual_operator_signoff_missing'));
assert.ok(unsignedWorkbench.lock_ledger_review_surface.review_cards.length >= 6);

const requiredConfirmations = unsignedWorkbench.export_review_signoff.required_operator_confirmations;
const signedPacket = {
  ...basePacket,
  operator_signoff_input:{
    decision:'signed_off',
    operator_id:'operator-alpha8',
    signed_at:'2026-05-25T01:00:00.000Z',
    confirmations:requiredConfirmations,
    notes:'Reviewed lock ledger review surface and signed export handoff pack.'
  }
};
const signedWorkbench = workbenchApi.buildSourceToBriefWorkbench(signedPacket, {version:VERSION, now:'2026-05-25T00:00:00.000Z'});
assert.equal(signedWorkbench.export_lock_ledger.export_locked, true);
assert.equal(signedWorkbench.lock_ledger_review_surface.export_handoff_status, 'locked');
assert.equal(signedWorkbench.lock_ledger_review_surface.release_gate, 'lock_ledger_review_locked');
assert.equal(signedWorkbench.signed_export_handoff_pack.handoff_status, 'locked');
assert.equal(signedWorkbench.signed_export_handoff_pack.release_gate, 'signed_export_handoff_locked');
assert.equal(signedWorkbench.signed_export_handoff_pack.export_locked, true);
assert.equal(signedWorkbench.signed_export_handoff_pack.export_allowed, true);
assert.equal(signedWorkbench.signed_export_handoff_pack.operator_signed_off, true);
assert.equal(signedWorkbench.signed_export_handoff_pack.operator_id, 'operator-alpha8');
assert.equal(signedWorkbench.signed_export_handoff_pack.operator_signed_at, '2026-05-25T01:00:00.000Z');
assert.match(signedWorkbench.signed_export_handoff_pack.lock_hash, /^[a-f0-9]{8}$/);
assert.equal(signedWorkbench.signed_export_handoff_pack.cryptographic_signature_claimed, false);
assert.equal(signedWorkbench.signed_export_handoff_pack.non_cryptographic_operator_signature_only, true);
assert.equal(signedWorkbench.signed_export_handoff_pack.signed_from_explicit_operator_input, true);
assert.ok(signedWorkbench.signed_export_handoff_pack.included_file_plan.includes('source-to-brief/lock-ledger-review-surface.json'));

const pack = exportPack.createExportPack(Object.assign({}, signedPacket, {source_to_brief_workbench:signedWorkbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/signed-export-handoff-pack.json',
  'source-to-brief/signed-export-handoff-pack.md',
  'source-to-brief/lock-ledger-review-surface.json',
  'source-to-brief/lock-ledger-review-surface.md',
  'source-to-brief/operator-handoff.md'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/signed-export-handoff-pack.md').content.includes('Signed Export Handoff Pack'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/lock-ledger-review-surface.md').content.includes('Lock Ledger Review Surface'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/operator-handoff.md').content.includes('Signed export handoff status'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/operator-handoff.md').content.includes('Lock ledger review gate'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['lockLedgerReviewSurfacePanel','signedExportHandoffPanel','lock-ledger-review-surface','signed-export-handoff-pack']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Lock Ledger Review Surface','Signed Export Handoff Pack','سطح مراجعة سجل قفل التصدير','حزمة تسليم التصدير المعتمدة','Surface de revue du registre de verrouillage','Pack de remise export signé']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['lockLedgerReviewSurfacePanel','signedExportHandoffPanel','lockLedgerReviewGrid','signedExportFiles']) assert.ok(styles.includes(marker), `style missing ${marker}`);

const serializedUnsigned = JSON.stringify(unsignedWorkbench);
for (const forbidden of ['automatic_source_verification_claimed":true','live_web_search_performed":true','provider_execution_expanded":true','production_oauth_enabled":true','backend_behavior_expanded":true','automatic_signoff_performed":true','automatic_export_lock_performed":true','cryptographic_signature_claimed":true','export_locked":true']) assert.equal(serializedUnsigned.includes(forbidden), false, `unsigned default must not contain ${forbidden}`);
const serializedSigned = JSON.stringify(signedWorkbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['automatic_source_verification_claimed":true','live_web_search_performed":true','provider_execution_expanded":true','production_oauth_enabled":true','backend_behavior_expanded":true','automatic_signoff_performed":true','automatic_export_lock_performed":true','cryptographic_signature_claimed":true']) assert.equal(serializedSigned.includes(forbidden), false, `explicit signoff must not enable forbidden capability: ${forbidden}`);

console.log('Signed export handoff pack and lock ledger review surface checks passed.');
