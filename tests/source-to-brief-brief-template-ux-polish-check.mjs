import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0';
const CURRENT_VERSION = '1.4.0-alpha.25';
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
const templateApi = modules.briefTemplateSystem;
const workbenchApi = modules.sourceToBriefWorkbench;
const exportPack = modules.exportPack;

assert.equal(templateApi.VERSION, VERSION);
assert.equal(typeof templateApi.buildBriefTemplateUxPolish, 'function');
assert.equal(typeof templateApi.buildAssemblyVariantComparison, 'function');
assert.equal(typeof templateApi.briefTemplateUxPolishMarkdown, 'function');
assert.equal(typeof templateApi.assemblyVariantComparisonMarkdown, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official evidence supports I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-02-01', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:4},
  {evidence_id:'E2', claim:'Academic counter-evidence pressures I1', source_title:'Academic counter-source', source_type:'academic', source_url:'https://example.com/counter', source_date:'2026-02-03', supports:[], contradicts:['I1'], confidence:'medium', evidence_strength:3},
  {evidence_id:'E3', claim:'Manual note requires source-audit treatment', source_title:'Manual note', source_type:'other', source_url:'', source_date:'unknown', supports:['A1'], contradicts:[], confidence:'low', evidence_strength:1}
];
const packet = {
  workflow_version:VERSION,
  research_mode:'source-heavy',
  research_plan:{plan_version:VERSION, mode:'source-heavy', topic:'Template UX polish topic', questions:['Which brief variant is safest?'], counter_evidence_targets:['Find pressure against I1.']},
  evidence_matrix:evidence,
  evidence_review_queue:[{review_id:'RQ1', status:'pending', created_at:'2026-02-03T00:00:00.000Z', evidence:evidence[1]}],
  causal_links:[{from:'I1', to:'N1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  analysis_brief:{brief_version:VERSION, topic:'Template UX polish topic', handoff_summary:'Manual UX polish QA handoff.'},
  privacy_export:{release_gate:'pass'}
};
const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-24T00:00:00.000Z'});

assert.ok(workbench.brief_template_ux_polish, 'brief template UX polish missing');
assert.ok(workbench.assembly_variant_comparison, 'assembly variant comparison missing');
assert.equal(workbench.brief_template_ux_polish.ux_model, 'brief_template_ux_polish.v1');
assert.equal(workbench.assembly_variant_comparison.comparison_model, 'assembly_variant_comparison.v1');
assert.ok(workbench.brief_template_ux_polish.visible_decision_count <= 4, 'UX polish should compress visible decisions');
assert.ok(workbench.brief_template_ux_polish.readability_checks.length >= 6, 'readability check set too thin');
assert.ok(workbench.brief_template_ux_polish.readability_checks.some((check)=>check.check_id === 'matrix_hygiene_current' && check.passed === true));
assert.equal(workbench.brief_template_ux_polish.matrix_hygiene_cleanup.stale_language_requirement_removed, true);
assert.equal(workbench.brief_template_ux_polish.matrix_hygiene_cleanup.guided_session_legacy_requirement_removed, true);
assert.equal(workbench.assembly_variant_comparison.variant_count, 4);
assert.ok(workbench.assembly_variant_comparison.variants.every((variant)=>variant.evidence_boundary_required === true));
assert.ok(workbench.assembly_variant_comparison.variants.every((variant)=>['low','medium','high'].includes(variant.risk_band)));
assert.ok(workbench.assembly_variant_comparison.comparison_columns.includes('qa_coverage'));
assert.equal(workbench.brief_template_ux_polish.automatic_source_verification_claimed, false);
assert.equal(workbench.assembly_variant_comparison.provider_execution_expanded, false);

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/brief-template-ux-polish.json',
  'source-to-brief/brief-template-ux-polish.md',
  'source-to-brief/assembly-variant-comparison.json',
  'source-to-brief/assembly-variant-comparison.md'
]) assert.ok(paths.includes(required), `missing export file ${required}`);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/brief-template-ux-polish.md').content.includes('Brief Template UX Polish'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/assembly-variant-comparison.md').content.includes('Assembly Variant Comparison'));

const matrix = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json','utf8'));
assert.equal(matrix.internal_build_version, CURRENT_VERSION);
assert.equal(matrix.public_version_label, 'v1.4.0-alpha.25 Release System Consolidation + Effective Diff Guard');
assert.equal(JSON.stringify(matrix.language_rules).includes('Guided Research Session'), false, 'legacy guided-session matrix requirement should be removed');
assert.ok(matrix.language_rules.en.required.includes('Stable Manual Workflow Release') || matrix.language_rules.en.required.includes('Release System Consolidation + Effective Diff Guard'));
assert.ok(matrix.language_rules.ar.required.includes('فرق معاينة تجميع الموجز'));
assert.ok(matrix.language_rules.ar.required.includes('اعتماد مراجعة التصدير'));
assert.ok(matrix.language_rules.fr.required.includes('Diff aperçu assemblage du brief'));
assert.ok(matrix.language_rules.fr.required.includes('visa de revue export'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['briefTemplateUxPolishPanel','assemblyVariantComparisonPanel','brief-template-ux-polish','assembly-variant-comparison']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['briefTemplateUxPolishPanel','assemblyVariantComparisonPanel','briefTemplateUxPolishList','assemblyVariantComparisonGrid']) assert.ok(styles.includes(marker), `style missing ${marker}`);

const serialized = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['automatic_source_verification_claimed":true','live_web_search_performed":true','provider_execution_expanded":true','production_oauth_enabled":true','backend_behavior_expanded":true']) assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);

console.log('Brief template UX polish and matrix hygiene checks passed.');
