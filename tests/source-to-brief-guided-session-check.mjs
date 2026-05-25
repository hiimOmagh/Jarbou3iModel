import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0-alpha.10';
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
assert.equal(guided.SESSION_MODEL, 'guided_research_session_engine.v1');
assert.equal(guided.BRIEF_ASSEMBLY_MODEL, 'brief_assembly_workflow.v1');
assert.equal(workbenchApi.VERSION, VERSION);
assert.equal(exportPack.EXPORT_PACK_VERSION, VERSION);
assert.equal(typeof guided.buildGuidedResearchSession, 'function');
assert.equal(typeof guided.guidedSessionMarkdown, 'function');
assert.equal(typeof guided.briefAssemblyMarkdown, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official source supports I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-01-02', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:4},
  {evidence_id:'E2', claim:'Counter source contradicts I1', source_title:'Counter source', source_type:'academic', source_url:'https://example.com/counter', source_date:'2026-01-03', supports:[], contradicts:['I1'], confidence:'medium', evidence_strength:3},
  {evidence_id:'E3', claim:'Unlinked source note', source_title:'Manual note', source_type:'other', source_url:'', source_date:'unknown', supports:[], contradicts:[], confidence:'low', evidence_strength:1}
];
const packet = {
  workflow_version:VERSION,
  research_mode:'source-heavy',
  research_plan:{plan_version:VERSION, mode:'source-heavy', topic:'Guided session topic', questions:['What changes the leverage structure?'], counter_evidence_targets:['Find evidence against I1.']},
  evidence_matrix:evidence,
  evidence_review_queue:[{review_id:'RQ1', status:'pending', created_at:'2026-01-03T00:00:00.000Z', evidence:evidence[1]}],
  causal_links:[{from:'I1', to:'N1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  analysis_brief:{brief_version:VERSION, topic:'Guided session topic', handoff_summary:'Manual guided session handoff.'},
  privacy_export:{release_gate:'pass'}
};
const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-23T00:00:00.000Z'});

assert.ok(workbench.guided_research_session, 'guided research session missing');
assert.equal(workbench.guided_research_session.guided_research_session_version, VERSION);
assert.equal(workbench.guided_research_session.session_model, 'guided_research_session_engine.v1');
assert.equal(workbench.guided_research_session.steps.length, guided.STEP_IDS.length);
assert.equal(JSON.stringify(workbench.guided_research_session.steps.map((step)=>step.step_id)), JSON.stringify(Array.from(guided.STEP_IDS)));
assert.ok(workbench.guided_research_session.session_progress_percent >= 0);
assert.ok(workbench.guided_research_session.next_best_action.target_step, 'next-best action must target a step');
assert.ok(workbench.guided_research_session.manual_operator_checkpoints.length >= 1, 'manual checkpoints should be explicit');
assert.equal(workbench.guided_research_session.local_manual_session, true);
assert.equal(workbench.guided_research_session.live_fetching_performed, false);
assert.equal(workbench.guided_research_session.live_web_search_performed, false);
assert.equal(workbench.guided_research_session.provider_execution_expanded, false);
assert.equal(workbench.guided_research_session.production_oauth_enabled, false);
assert.equal(workbench.guided_research_session.automatic_source_verification_claimed, false);
assert.equal(workbench.guided_research_session.verification_claimed, false);
assert.ok(workbench.guided_research_session.blocked_unavailable_capabilities.includes('live_web_search'));

assert.ok(workbench.brief_assembly_preview, 'brief assembly preview missing');
assert.equal(workbench.brief_assembly_preview.brief_assembly_version, VERSION);
assert.equal(workbench.brief_assembly_preview.manual_review_required, true);
assert.equal(workbench.brief_assembly_preview.automatic_source_verification_claimed, false);
assert.ok(workbench.brief_assembly_preview.preview_sections.includes('manual_disclaimer'));

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/guided-research-session.json',
  'source-to-brief/guided-research-session.md',
  'source-to-brief/brief-assembly-preview.md',
  'source-to-brief/source-to-brief-package.json',
  'source-to-brief/operator-handoff.md'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
const exportedSession = JSON.parse(pack.files.find((file)=>file.path === 'source-to-brief/guided-research-session.json').content);
assert.equal(exportedSession.automatic_source_verification_claimed, false);
assert.equal(exportedSession.live_web_search_performed, false);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/guided-research-session.md').content.includes('does not fetch live sources'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/brief-assembly-preview.md').content.includes('Evidence Boundary'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['guidedSessionTitle','briefAssemblyTitle','guidedResearchSessionPanel','briefAssemblyPanel','guidedSessionStepList']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Guided Research Session','Brief Assembly Workflow','جلسة بحث موجّهة','سير تجميع الموجز','Session de recherche guidée','Workflow d’assemblage du brief']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['guidedResearchSessionPanel','briefAssemblyPanel','guidedSessionStepList']) assert.ok(styles.includes(marker), `styles missing ${marker}`);

const serialized = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['live_scraping_enabled:true','automatic_source_verification_claimed:true','provider_execution_expanded:true','production_oauth_enabled:true','backend_behavior_expanded:true']) assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);

console.log('Source-to-brief guided session checks passed.');
