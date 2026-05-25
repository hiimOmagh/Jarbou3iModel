import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0-alpha.7';
const filesToLoad = [
  'src/research/evidence-workspace-ux.js',
  'src/research/operator-command-palette.js',
  'src/research/source-to-brief-workbench.js',
  'src/research/export-pack.js'
];
for (const file of filesToLoad) new vm.Script(fs.readFileSync(file, 'utf8'), {filename:file});
const context = {console, TextEncoder, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
for (const file of filesToLoad) vm.runInContext(fs.readFileSync(file, 'utf8'), context, {filename:file});

const modules = context.window.Jarbou3iResearchModules;
const ux = modules.evidenceWorkspaceUx;
const workbenchApi = modules.sourceToBriefWorkbench;
const exportPack = modules.exportPack;

assert.equal(ux.VERSION, VERSION);
assert.equal(workbenchApi.VERSION, VERSION);
assert.equal(exportPack.EXPORT_PACK_VERSION, VERSION);
assert.equal(typeof ux.reviewLanes, 'function');
assert.equal(typeof ux.nextReviewActions, 'function');
assert.equal(typeof workbenchApi.reviewThroughputSummary, 'function');
assert.equal(typeof workbenchApi.exportPolishReport, 'function');

const queue = [
  {review_id:'RQ1', status:'pending', created_at:'2026-01-03T00:00:00.000Z', evidence:{evidence_id:'E1', claim:'Official position supports claim I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-01-02', supports:['I1'], contradicts:[], evidence_scoring:{reliability_score:84, attention_signal_score:22}}},
  {review_id:'RQ2', status:'needs_edit', created_at:'2026-01-04T00:00:00.000Z', evidence:{evidence_id:'E2', claim:'Counter evidence challenges N1', source_title:'Counter source', source_type:'academic', source_url:'', source_date:'unknown', supports:[], contradicts:['N1'], evidence_scoring:{reliability_score:58, attention_signal_score:92}}},
  {review_id:'RQ3', status:'pending', created_at:'2026-01-05T00:00:00.000Z', evidence:{evidence_id:'E3', claim:'Unlinked context source', source_title:'Context source', source_type:'media', source_url:'https://example.com/context', source_date:'2026-01-03', supports:[], contradicts:[], evidence_scoring:{reliability_score:50, attention_signal_score:38}}}
];
const contextData = {source_gap_report:{gap_warnings:['counter_evidence_missing_for_A1']}};
const throughput = ux.throughputReport(queue, {status:'unresolved', sort:'needs_review_first'}, contextData);
assert.equal(throughput.throughput_version, VERSION);
assert.equal(throughput.review_lanes.lane_model, 'evidence_review_throughput_lanes.v1');
assert.ok(throughput.review_lanes.lanes.some((lane)=>lane.lane_id === 'contradictions' && lane.items.some((item)=>item.review_id === 'RQ2')));
assert.ok(throughput.review_lanes.lanes.some((lane)=>lane.lane_id === 'traceability' && lane.items.some((item)=>item.review_id === 'RQ2')));
assert.ok(throughput.review_lanes.lanes.some((lane)=>lane.lane_id === 'unlinked' && lane.items.some((item)=>item.review_id === 'RQ3')));
assert.ok(throughput.next_review_actions.some((action)=>action.action_id === 'review_top_contradiction' && action.human_review_required === true));
assert.equal(throughput.export_throughput_gate, 'manual_review_queue_open');
assert.equal(throughput.release_gate, 'review_required');

const packet = {
  workflow_version:VERSION,
  research_plan:{topic:'Alpha4 throughput topic'},
  evidence_review_queue:queue,
  evidence_workspace_ux_report:ux.workspaceUxReport(queue, {status:'unresolved', sort:'needs_review_first'}, contextData),
  review_throughput_report:throughput,
  evidence_matrix:queue.map((item)=>item.evidence),
  causal_links:[{from:'I1', to:'N1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  analysis_brief:{topic:'Alpha4 throughput topic', handoff_summary:'Manual source-to-brief handoff.', source_clusters:[{cluster_id:'CL1', target_id:'I1', evidence_ids:['E1']},{cluster_id:'CL2', target_id:'N1', evidence_ids:['E2']}]},
  privacy_export:{release_gate:'pass'}
};
const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-23T00:00:00.000Z'});
assert.equal(workbench.source_to_brief_version, VERSION);
assert.equal(workbench.export_polish_model, 'source_to_brief_export_polish.v1');
assert.equal(workbench.review_throughput_summary.review_throughput_summary_version, VERSION);
assert.equal(workbench.review_throughput_summary.unresolved_count, 3);
assert.equal(workbench.review_throughput_summary.export_throughput_gate, 'manual_review_queue_open');
assert.ok(workbench.review_throughput_summary.priority_lanes.some((lane)=>lane.lane_id === 'contradictions' && lane.review_ids.includes('RQ2')));
assert.equal(workbench.export_polish_report.export_polish_version, VERSION);
assert.ok(workbench.export_polish_report.handoff_file_plan.includes('source-to-brief/operator-command-palette.json',
  'source-to-brief/review-navigation-shortcuts.json',
  'source-to-brief/operator-handoff.md'));
assert.ok(workbench.export_polish_report.handoff_file_plan.includes('source-to-brief/export-readiness.json'));
assert.ok(workbench.export_polish_report.warnings.includes('review_queue_unresolved'));
assert.equal(workbench.export_polish_report.no_automatic_verification_claim, true);
assert.equal(workbench.export_polish_report.live_fetching_performed, false);
assert.equal(workbench.export_polish_report.provider_execution_expanded, false);
assert.equal(workbench.export_polish_report.automatic_source_verification_claimed, false);

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/export-readiness.json',
  'source-to-brief/export-polish-report.json',
  'source-to-brief/review-throughput-summary.json',
  'source-to-brief/operator-command-palette.json',
  'source-to-brief/review-navigation-shortcuts.json',
  'source-to-brief/operator-handoff.md',
  'review/review-throughput-report.json'
]) {
  assert.ok(paths.includes(required), `export pack missing ${required}`);
}
assert.equal(pack.manifest.export_pack_version, VERSION);
assert.equal(pack.manifest.workflow_version, VERSION);

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['sourceToBriefLaneGrid','sourceToBriefExportPolishPanel','exportPolishTitle','review_throughput_summary','export_polish_report']) {
  assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
}
const engine = fs.readFileSync('src/research-engine.js','utf8');
for (const marker of ['reviewLaneGrid','reviewNextActions','export_throughput_gate']) {
  assert.ok(engine.includes(marker), `research engine missing ${marker}`);
}
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Export polish review','مراجعة صقل التصدير','Revue de finition export','reviewLaneTraceability']) {
  assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
}
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['reviewLaneGrid','sourceToBriefLaneGrid','sourceToBriefExportPolishPanel']) {
  assert.ok(styles.includes(marker), `styles missing ${marker}`);
}

const forbidden = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const marker of ['live_scraping_enabled:true','automatic_source_verification_claimed:true','provider_execution_expanded:true','production_oauth_enabled:true']) {
  assert.equal(forbidden.includes(marker), false, `forbidden capability marker present: ${marker}`);
}

console.log('Source-to-brief export polish checks passed.');
process.exit(0);
