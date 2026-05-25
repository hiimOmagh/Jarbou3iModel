import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0-alpha.10';
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
assert.equal(typeof guided.buildBriefAssemblyPreviewDiff, 'function');
assert.equal(typeof guided.buildExportReviewSignoff, 'function');
assert.equal(typeof guided.briefAssemblyPreviewDiffMarkdown, 'function');
assert.equal(typeof guided.exportReviewSignoffMarkdown, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official evidence supports I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-02-01', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:4},
  {evidence_id:'E2', claim:'Academic counter-evidence pressures I1', source_title:'Academic counter-source', source_type:'academic', source_url:'https://example.com/counter', source_date:'2026-02-03', supports:[], contradicts:['I1'], confidence:'medium', evidence_strength:3},
  {evidence_id:'E3', claim:'Manual note requires source-audit treatment', source_title:'Manual note', source_type:'other', source_url:'', source_date:'unknown', supports:['A1'], contradicts:[], confidence:'low', evidence_strength:1}
];
const packet = {
  workflow_version:VERSION,
  research_mode:'source-heavy',
  research_plan:{plan_version:VERSION, mode:'source-heavy', topic:'Preview diff signoff topic', questions:['Which preview changed?'], counter_evidence_targets:['Find pressure against I1.']},
  previous_brief_assembly_preview:{
    baseline_source:'operator_previous_export_review',
    title:'Preview diff signoff topic',
    assembly_state:'review_ready',
    supported_claim_count:1,
    partial_claim_count:0,
    weak_or_unsupported_claim_count:0,
    contradiction_group_count:0,
    source_gap_warning_count:0,
    unresolved_export_risk_count:0,
    ready_to_export:true,
    preview_sections:['research_question','executive_summary','claim_map','evidence_boundary','manual_disclaimer']
  },
  evidence_matrix:evidence,
  evidence_review_queue:[{review_id:'RQ1', status:'pending', created_at:'2026-02-03T00:00:00.000Z', evidence:evidence[1]}],
  causal_links:[{from:'I1', to:'N1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  analysis_brief:{brief_version:VERSION, topic:'Preview diff signoff topic', handoff_summary:'Manual preview diff signoff handoff.'},
  privacy_export:{release_gate:'pass'}
};
const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-25T00:00:00.000Z'});

assert.ok(workbench.brief_assembly_preview_diff, 'brief assembly preview diff missing');
assert.ok(workbench.export_review_signoff, 'export review signoff missing');
assert.equal(workbench.brief_assembly_preview_diff.diff_model, 'brief_assembly_preview_diff.v1');
assert.equal(workbench.brief_assembly_preview_diff.baseline_available, true);
assert.ok(workbench.brief_assembly_preview_diff.scalar_diff_rows.length >= 8, 'scalar diff should compare core preview fields');
assert.ok(workbench.brief_assembly_preview_diff.section_diff_rows.length >= 5, 'section diff should compare preview sections');
assert.ok(workbench.brief_assembly_preview_diff.change_count > 0, 'fixture should expose changed preview fields');
assert.equal(workbench.brief_assembly_preview_diff.automatic_source_verification_claimed, false);
assert.equal(workbench.brief_assembly_preview_diff.provider_execution_expanded, false);

const signoff = workbench.export_review_signoff;
assert.equal(signoff.signoff_model, 'export_review_signoff.v1');
assert.equal(signoff.operator_signed_off, false, 'the system must not auto-sign operator review');
assert.equal(signoff.automatic_signoff_performed, false, 'automatic signoff must stay impossible');
assert.ok(['manual_operator_signoff_required','export_review_signoff_blocked'].includes(signoff.signoff_gate));
assert.ok(signoff.required_operator_confirmations.includes('review_preview_diff_or_confirm_no_baseline'));
assert.ok(signoff.checks.some((check)=>check.check_id === 'no_auto_verification_claim' && check.passed === true));
assert.equal(signoff.automatic_source_verification_claimed, false);
assert.equal(signoff.provider_execution_expanded, false);

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/brief-assembly-preview-diff.json',
  'source-to-brief/brief-assembly-preview-diff.md',
  'source-to-brief/export-review-signoff.json',
  'source-to-brief/export-review-signoff.md'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/brief-assembly-preview-diff.md').content.includes('Brief Assembly Preview Diff'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/export-review-signoff.md').content.includes('Export Review Signoff'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/operator-handoff.md').content.includes('Preview diff gate'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/operator-handoff.md').content.includes('Export signoff gate'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['briefAssemblyPreviewDiffPanel','exportReviewSignoffPanel','brief-assembly-preview-diff','export-review-signoff']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Brief Assembly Preview Diff','Export Review Signoff','فرق معاينة تجميع الموجز','اعتماد مراجعة التصدير','Diff aperçu assemblage du brief','Visa de revue export']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['briefAssemblyPreviewDiffPanel','exportReviewSignoffPanel','briefAssemblyPreviewDiffList','exportReviewSignoffList']) assert.ok(styles.includes(marker), `style missing ${marker}`);

const serialized = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['automatic_source_verification_claimed":true','live_web_search_performed":true','provider_execution_expanded":true','production_oauth_enabled":true','backend_behavior_expanded":true','operator_signed_off":true','automatic_signoff_performed":true']) assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);

console.log('Brief assembly preview diff and export review signoff checks passed.');
