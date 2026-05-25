import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0-rc.2';
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
assert.equal(workbenchApi.VERSION, VERSION);
assert.equal(exportPack.EXPORT_PACK_VERSION, VERSION);
assert.equal(typeof templateApi.buildBriefTemplateSystem, 'function');
assert.equal(typeof templateApi.buildAssemblyVariantQa, 'function');
assert.equal(typeof templateApi.briefTemplateSystemMarkdown, 'function');
assert.equal(typeof templateApi.assemblyVariantQaMarkdown, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official evidence supports I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-02-01', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:4},
  {evidence_id:'E2', claim:'Academic counter-evidence pressures I1', source_title:'Academic counter-source', source_type:'academic', source_url:'https://example.com/counter', source_date:'2026-02-03', supports:[], contradicts:['I1'], confidence:'medium', evidence_strength:3},
  {evidence_id:'E3', claim:'Manual note needs traceability', source_title:'Manual note', source_type:'other', source_url:'', source_date:'unknown', supports:['A1'], contradicts:[], confidence:'low', evidence_strength:1}
];
const packet = {
  workflow_version:VERSION,
  research_mode:'source-heavy',
  research_plan:{plan_version:VERSION, mode:'source-heavy', topic:'Brief template topic', questions:['Which template should be exported?'], counter_evidence_targets:['Find pressure against I1.']},
  evidence_matrix:evidence,
  evidence_review_queue:[{review_id:'RQ1', status:'pending', created_at:'2026-02-03T00:00:00.000Z', evidence:evidence[1]}],
  causal_links:[{from:'I1', to:'N1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  analysis_brief:{brief_version:VERSION, topic:'Brief template topic', handoff_summary:'Manual brief template QA handoff.'},
  privacy_export:{release_gate:'pass'}
};
const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-24T00:00:00.000Z'});

assert.ok(workbench.brief_template_system, 'brief template system missing');
assert.ok(workbench.assembly_variant_qa, 'assembly variant QA missing');
assert.ok(workbench.assembly_variant_comparison, 'assembly variant comparison missing');
assert.ok(workbench.brief_template_ux_polish, 'brief template UX polish missing');
assert.equal(workbench.brief_template_system.template_model, 'brief_template_system.v1');
assert.equal(workbench.brief_template_system.template_count, 4);
for (const required of ['strategic_brief','source_audit_brief','contradiction_brief','executive_summary']) {
  assert.ok(workbench.brief_template_system.templates.some((template)=>template.template_id === required), `missing template ${required}`);
}
assert.ok(workbench.brief_template_system.templates.every((template)=>template.sections.length >= 5), 'each template should carry a real section plan');
assert.equal(workbench.brief_template_system.local_manual_only, true);
assert.equal(workbench.brief_template_system.automatic_source_verification_claimed, false);
assert.equal(workbench.brief_template_system.live_web_search_performed, false);
assert.equal(workbench.assembly_variant_qa.qa_model, 'assembly_variant_qa.v1');
assert.ok(workbench.assembly_variant_qa.check_count >= 16, 'variant QA should cover every template plus global guards');
assert.ok(workbench.assembly_variant_qa.checks.some((check)=>check.check_id === 'template_count_complete' && check.passed === true));
assert.ok(workbench.assembly_variant_qa.checks.some((check)=>check.check_id === 'no_auto_verification_claim' && check.passed === true));
assert.ok(workbench.assembly_variant_qa.required_export_files.includes('source-to-brief/assembly-variant-qa.md'));
assert.equal(workbench.assembly_variant_qa.provider_execution_expanded, false);
assert.equal(workbench.assembly_variant_comparison.comparison_model, 'assembly_variant_comparison.v1');
assert.equal(workbench.assembly_variant_comparison.variant_count, 4);
assert.ok(workbench.assembly_variant_comparison.variants.some((variant)=>variant.selected === true));
assert.ok(workbench.assembly_variant_comparison.variants.every((variant)=>['low','medium','high'].includes(variant.risk_band)));
assert.equal(workbench.assembly_variant_comparison.automatic_source_verification_claimed, false);
assert.equal(workbench.brief_template_ux_polish.ux_model, 'brief_template_ux_polish.v1');
assert.ok(workbench.brief_template_ux_polish.readability_checks.some((check)=>check.check_id === 'matrix_hygiene_current' && check.passed === true));
assert.equal(workbench.brief_template_ux_polish.matrix_hygiene_cleanup.guided_session_legacy_requirement_removed, true);
assert.equal(workbench.brief_template_ux_polish.automatic_source_verification_claimed, false);

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/brief-template-system.json',
  'source-to-brief/brief-template-system.md',
  'source-to-brief/assembly-variant-qa.json',
  'source-to-brief/assembly-variant-qa.md',
  'source-to-brief/brief-template-ux-polish.json',
  'source-to-brief/brief-template-ux-polish.md',
  'source-to-brief/assembly-variant-comparison.json',
  'source-to-brief/assembly-variant-comparison.md'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/brief-template-system.md').content.includes('Brief Template System'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/assembly-variant-qa.md').content.includes('Assembly Variant QA'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['briefTemplateSystemPanel','assemblyVariantQaPanel','briefTemplateUxPolishPanel','assemblyVariantComparisonPanel','brief-template-system','assembly-variant-qa','brief-template-ux-polish','assembly-variant-comparison']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Brief Template System','Assembly Variant QA','Brief Template UX Polish','Assembly Variant Comparison','نظام قوالب الموجز','تدقيق متغيرات التجميع','تحسين تجربة قوالب الموجز','مقارنة متغيرات التجميع','Système de modèles de brief','QA des variantes d’assemblage','Polish UX des modèles de brief','Comparaison des variantes d’assemblage']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['briefTemplateSystemPanel','assemblyVariantQaPanel','briefTemplateUxPolishPanel','assemblyVariantComparisonPanel','briefTemplateGrid','assemblyVariantQaList','briefTemplateUxPolishList','assemblyVariantComparisonGrid']) assert.ok(styles.includes(marker), `styles missing ${marker}`);

const serialized = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['automatic_source_verification_claimed":true','live_web_search_performed":true','provider_execution_expanded":true','production_oauth_enabled":true','backend_behavior_expanded":true']) assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);

console.log('Brief template system and assembly variant QA checks passed.');
