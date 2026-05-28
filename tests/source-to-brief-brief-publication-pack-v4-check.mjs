import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0';
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
assert.equal(typeof workbenchApi.buildBriefPublicationPackV4, 'function');
assert.equal(typeof workbenchApi.briefPublicationPackV4Markdown, 'function');
assert.equal(typeof workbenchApi.publicationReadyBriefMarkdown, 'function');
assert.equal(typeof workbenchApi.evidenceAppendixMarkdown, 'function');
assert.equal(typeof workbenchApi.contradictionFalsifierAppendixMarkdown, 'function');
assert.equal(typeof workbenchApi.sourceGapAppendixMarkdown, 'function');
assert.equal(typeof workbenchApi.operatorSignoffLockLedgerAppendixMarkdown, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official support for I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-05-01', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:5},
  {evidence_id:'E2', claim:'Academic support for I1', source_title:'Academic source', source_type:'academic', source_url:'https://example.com/academic', source_date:'2026-05-02', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:5}
];
const basePacket = {
  workflow_version:VERSION,
  research_mode:'source-heavy',
  research_plan:{plan_version:VERSION, mode:'source-heavy', topic:'Brief publication pack topic', questions:['Can the brief be packed for publication review?'], counter_evidence_targets:[]},
  previous_brief_assembly_preview:{
    baseline_source:'operator_previous_export_review',
    title:'Brief publication pack topic',
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
  analysis_brief:{brief_version:VERSION, topic:'Brief publication pack topic', handoff_summary:'Manual publication pack handoff.'},
  privacy_export:{release_gate:'pass'}
};

const unsignedWorkbench = workbenchApi.buildSourceToBriefWorkbench(basePacket, {version:VERSION, now:'2026-05-25T03:00:00.000Z'});
const unsignedPack = unsignedWorkbench.brief_publication_pack_v4;
assert.ok(unsignedPack, 'brief publication pack missing');
assert.equal(unsignedPack.publication_pack_model, 'brief_publication_pack_v4.v1');
assert.equal(unsignedPack.publication_pack_status, 'manual_publication_review_required');
assert.equal(unsignedPack.publication_ready, false);
assert.equal(unsignedPack.publication_permission_claimed, false);
assert.equal(unsignedPack.operator_signoff_lock_ledger_appendix.export_locked, false);
assert.equal(unsignedPack.operator_signoff_lock_ledger_appendix.cryptographic_signature_claimed, false);
assert.ok(unsignedPack.included_file_plan.includes('source-to-brief/publication-ready-brief.md'));
assert.ok(unsignedPack.included_file_plan.includes('source-to-brief/operator-signoff-lock-ledger-appendix.md'));
assert.equal(unsignedPack.evidence_appendix.evidence_count, 2);
assert.equal(unsignedPack.evidence_appendix.traceable_evidence_count, 2);
assert.equal(unsignedPack.contradiction_falsifier_appendix.contradiction_group_count, 0);
assert.equal(unsignedPack.source_gap_appendix.source_to_claim_required_before_export_count, 0);
assert.equal(unsignedPack.live_fetching_performed, false);
assert.equal(unsignedPack.provider_execution_expanded, false);
assert.equal(unsignedPack.automatic_source_verification_claimed, false);
assert.equal(unsignedPack.verification_claimed, false);

const requiredConfirmations = unsignedWorkbench.export_review_signoff.required_operator_confirmations;
const signedPacket = {
  ...basePacket,
  operator_signoff_input:{
    decision:'signed_off',
    operator_id:'operator-alpha10',
    signed_at:'2026-05-25T04:00:00.000Z',
    confirmations:requiredConfirmations,
    notes:'Reviewed Stable Manual Workflow Release appendices and lock ledger.'
  }
};
const signedWorkbench = workbenchApi.buildSourceToBriefWorkbench(signedPacket, {version:VERSION, now:'2026-05-25T03:00:00.000Z'});
const publicationPack = signedWorkbench.brief_publication_pack_v4;
assert.equal(signedWorkbench.export_lock_ledger.export_locked, true);
assert.equal(publicationPack.publication_pack_status, 'locked_publication_review_ready');
assert.equal(publicationPack.publication_ready, true);
assert.equal(publicationPack.publication_readiness_summary.publication_release_gate, 'brief_publication_pack_review_ready');
assert.equal(publicationPack.operator_signoff_lock_ledger_appendix.operator_signed_off, true);
assert.equal(publicationPack.operator_signoff_lock_ledger_appendix.operator_id, 'operator-alpha10');
assert.equal(publicationPack.operator_signoff_lock_ledger_appendix.export_locked, true);
assert.match(publicationPack.operator_signoff_lock_ledger_appendix.lock_hash, /^[a-f0-9]{8}$/);
assert.equal(publicationPack.operator_signoff_lock_ledger_appendix.cryptographic_signature_claimed, false);
assert.ok(signedWorkbench.workflow_steps.includes('brief_publication_pack_v4'));

const blockedPacket = {
  ...basePacket,
  research_plan:{...basePacket.research_plan, counter_evidence_targets:[{target_id:'N1', label:'Missing counter evidence'}]},
  evidence_matrix:[...evidence, {evidence_id:'E3', claim:'Unlinked source', source_title:'Unlinked', source_type:'other', source_url:'', source_date:'unknown', supports:[], contradicts:[], confidence:'low', evidence_strength:1}],
  scenarios:{items:[{id:'S1', name:'Scenario missing falsifier', probability:30, drivers:['D1']}]}
};
const blockedWorkbench = workbenchApi.buildSourceToBriefWorkbench(blockedPacket, {version:VERSION, now:'2026-05-25T03:00:00.000Z'});
assert.equal(blockedWorkbench.brief_publication_pack_v4.publication_pack_status, 'blocked_manual_gap_closure_required');
assert.equal(blockedWorkbench.brief_publication_pack_v4.publication_ready, false);
assert.ok(blockedWorkbench.brief_publication_pack_v4.publication_readiness_summary.blocker_count > 0);
assert.equal(blockedWorkbench.brief_publication_pack_v4.publication_readiness_summary.publication_release_gate, 'brief_publication_pack_blocked');

const markdown = workbenchApi.briefPublicationPackV4Markdown(signedWorkbench);
assert.ok(markdown.includes('Stable Manual Workflow Release'));
assert.ok(markdown.includes('Publication Readiness Summary'));
assert.ok(workbenchApi.publicationReadyBriefMarkdown(signedWorkbench).includes('Publication pack status'));
assert.ok(workbenchApi.evidenceAppendixMarkdown(signedWorkbench).includes('Evidence Appendix'));
assert.ok(workbenchApi.contradictionFalsifierAppendixMarkdown(signedWorkbench).includes('Contradiction and Falsifier Appendix'));
assert.ok(workbenchApi.sourceGapAppendixMarkdown(signedWorkbench).includes('Source Gap Appendix'));
assert.ok(workbenchApi.operatorSignoffLockLedgerAppendixMarkdown(signedWorkbench).includes('Operator Signoff and Lock Ledger Appendix'));

const pack = exportPack.createExportPack(Object.assign({}, signedPacket, {source_to_brief_workbench:signedWorkbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/brief-publication-pack-v4.json',
  'source-to-brief/brief-publication-pack-v4.md',
  'source-to-brief/publication-ready-brief.md',
  'source-to-brief/evidence-appendix.md',
  'source-to-brief/contradiction-falsifier-appendix.md',
  'source-to-brief/source-gap-appendix.md',
  'source-to-brief/operator-signoff-lock-ledger-appendix.md',
  'source-to-brief/operator-handoff.md'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/brief-publication-pack-v4.md').content.includes('Stable Manual Workflow Release'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/operator-handoff.md').content.includes('Brief publication pack status'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['briefPublicationPackPanel','stable-manual-workflow-release','briefPublicationFiles']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Credential Boundary Runtime Drill','سطح التحكم في اكتساب المصادر','Surface de contrôle d’acquisition des sources']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['briefPublicationPackPanel','briefPublicationFiles']) assert.ok(styles.includes(marker), `style missing ${marker}`);

const serialized = JSON.stringify(signedWorkbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['automatic_source_verification_claimed":true','live_web_search_performed":true','provider_execution_expanded":true','production_oauth_enabled":true','backend_behavior_expanded":true','automatic_signoff_performed":true','automatic_export_lock_performed":true','cryptographic_signature_claimed":true','publication_permission_claimed":true']) {
  assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);
}

console.log('Brief Publication Pack v4 checks passed.');
process.exit(0);
