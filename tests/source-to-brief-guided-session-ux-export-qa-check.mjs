import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0';
const filesToLoad = [
  'src/research/evidence-workspace-ux.js',
  'src/research/operator-command-palette.js',
  'src/research/guided-research-session.js',
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
assert.equal(typeof guided.buildGuidedSessionUxCompression, 'function');
assert.equal(typeof guided.buildBriefAssemblyExportQa, 'function');
assert.equal(typeof guided.briefAssemblyExportQaMarkdown, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official evidence supports I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-02-01', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:4},
  {evidence_id:'E2', claim:'Academic counter-evidence pressures I1', source_title:'Academic counter-source', source_type:'academic', source_url:'https://example.com/counter', source_date:'2026-02-03', supports:[], contradicts:['I1'], confidence:'medium', evidence_strength:3},
  {evidence_id:'E3', claim:'Manual note needs traceability', source_title:'Manual note', source_type:'other', source_url:'', source_date:'unknown', supports:['A1'], contradicts:[], confidence:'low', evidence_strength:1}
];
const packet = {
  workflow_version:VERSION,
  research_mode:'source-heavy',
  research_plan:{plan_version:VERSION, mode:'source-heavy', topic:'Guided UX compression topic', questions:['Which claim is export-ready?'], counter_evidence_targets:['Find pressure against I1.']},
  evidence_matrix:evidence,
  evidence_review_queue:[{review_id:'RQ1', status:'pending', created_at:'2026-02-03T00:00:00.000Z', evidence:evidence[1]}],
  causal_links:[{from:'I1', to:'N1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  analysis_brief:{brief_version:VERSION, topic:'Guided UX compression topic', handoff_summary:'Manual guided UX QA handoff.'},
  privacy_export:{release_gate:'pass'}
};
const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-24T00:00:00.000Z'});

assert.ok(workbench.guided_research_session, 'guided session missing');
assert.ok(workbench.guided_session_ux_compression, 'guided session UX compression missing');
assert.ok(workbench.brief_assembly_export_qa, 'brief assembly export QA missing');
assert.equal(workbench.guided_session_ux_compression.compression_model, 'guided_session_ux_compression.v1');
assert.equal(workbench.guided_session_ux_compression.compact_group_count, 4);
assert.equal(workbench.guided_session_ux_compression.visible_step_count, 4);
assert.ok(workbench.guided_session_ux_compression.reduced_visible_decision_count >= 7, 'UX compression should reduce visible decision count');
assert.ok(['setup','evidence_review','repair_clearance','brief_export'].includes(workbench.guided_session_ux_compression.primary_focus_group));
assert.equal(workbench.guided_session_ux_compression.automatic_source_verification_claimed, false);
assert.equal(workbench.guided_session_ux_compression.live_web_search_performed, false);

const qa = workbench.brief_assembly_export_qa;
assert.equal(qa.qa_model, 'brief_assembly_export_qa.v1');
assert.ok(qa.check_count >= 8, 'export QA should contain a real checklist');
assert.ok(qa.checks.some((check)=>check.check_id === 'evidence_boundary_present' && check.passed === true));
assert.ok(qa.checks.some((check)=>check.check_id === 'no_auto_verification_claim' && check.passed === true));
assert.ok(qa.required_export_files.includes('source-to-brief/brief-assembly-export-qa.md'));
assert.equal(qa.automatic_source_verification_claimed, false);
assert.equal(qa.provider_execution_expanded, false);

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/guided-session-ux-compression.json',
  'source-to-brief/brief-assembly-export-qa.json',
  'source-to-brief/brief-assembly-export-qa.md',
  'source-to-brief/guided-research-session.md',
  'source-to-brief/brief-assembly-preview.md'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/brief-assembly-export-qa.md').content.includes('Brief Assembly Export QA'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/brief-assembly-export-qa.md').content.includes('Local/manual QA only') || pack.files.find((file)=>file.path === 'source-to-brief/brief-assembly-export-qa.md').content.includes('local/manual'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['guidedUxCompressionPanel','briefAssemblyExportQaPanel','guided-session-ux-compression','brief-assembly-export-qa']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Guided Session UX Compression','Brief Assembly Export QA','ضغط تجربة الجلسة الموجّهة','تدقيق تصدير تجميع الموجز','Compression UX de session guidée','QA export assemblage du brief']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['guidedUxCompressionPanel','briefAssemblyExportQaPanel','briefAssemblyExportQaList']) assert.ok(styles.includes(marker), `styles missing ${marker}`);

const serialized = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['automatic_source_verification_claimed":true','live_web_search_performed":true','provider_execution_expanded":true','production_oauth_enabled":true','backend_behavior_expanded":true']) assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);

console.log('Guided session UX compression and brief assembly export QA checks passed.');
