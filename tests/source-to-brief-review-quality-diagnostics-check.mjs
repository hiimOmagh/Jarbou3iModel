import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0-alpha.2';
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
const workbenchApi = modules.sourceToBriefWorkbench;
const exportPack = modules.exportPack;

assert.equal(workbenchApi.VERSION, VERSION);
assert.equal(exportPack.EXPORT_PACK_VERSION, VERSION);
assert.equal(typeof workbenchApi.buildReviewQualityDiagnostics, 'function');
assert.equal(typeof workbenchApi.weakClaimRepairMarkdown, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official source partially supports I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-01-02', supports:['I1'], contradicts:[], confidence:'medium', evidence_strength:2},
  {evidence_id:'E2', claim:'Counter source contradicts I1', source_title:'Counter source', source_type:'academic', source_url:'', source_date:'unknown', supports:[], contradicts:['I1'], confidence:'medium', evidence_strength:2},
  {evidence_id:'E3', claim:'Unlinked media signal', source_title:'Media signal', source_type:'media', source_url:'https://example.com/signal', source_date:'2026-01-03', supports:[], contradicts:[], confidence:'low', evidence_strength:1}
];
const packet = {
  workflow_version:VERSION,
  research_plan:{topic:'Alpha7 weak-claim diagnostic topic'},
  evidence_matrix:evidence,
  evidence_review_queue:[{review_id:'RQ1', status:'pending', created_at:'2026-01-03T00:00:00.000Z', evidence:evidence[1]}],
  causal_links:[{from:'I1', to:'N1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  analysis_brief:{topic:'Alpha7 weak-claim diagnostic topic', handoff_summary:'Manual review quality handoff.', source_clusters:[{cluster_id:'CL1', target_id:'I1', evidence_ids:['E1','E2']}]},
  privacy_export:{release_gate:'pass'}
};
const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-23T00:00:00.000Z'});
assert.ok(workbench.review_quality_diagnostics, 'review quality diagnostics missing');
assert.equal(workbench.review_quality_diagnostics.review_quality_diagnostics_version, VERSION);
assert.equal(workbench.review_quality_diagnostics.diagnostics_model, 'review_quality_diagnostics.v1');
assert.ok(workbench.review_quality_diagnostics.findings.some((finding)=>finding.issue_types.includes('weak_claim') || finding.issue_types.includes('unsupported_claim')));
assert.ok(workbench.review_quality_diagnostics.findings.some((finding)=>finding.issue_types.includes('unresolved_contradiction')));
assert.ok(workbench.review_quality_diagnostics.weak_claim_repair_suggestions, 'weak claim repair suggestions missing');
assert.equal(workbench.review_quality_diagnostics.weak_claim_repair_suggestions.weak_claim_repair_version, VERSION);
assert.ok(workbench.review_quality_diagnostics.weak_claim_repair_suggestions.suggestions.length >= 1);
assert.equal(workbench.review_quality_diagnostics.live_fetching_performed, false);
assert.equal(workbench.review_quality_diagnostics.provider_execution_expanded, false);
assert.equal(workbench.review_quality_diagnostics.automatic_source_verification_claimed, false);
assert.equal(workbench.review_quality_diagnostics.verification_claimed, false);

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/review-quality-diagnostics.json',
  'source-to-brief/weak-claim-repair-suggestions.json',
  'source-to-brief/weak-claim-repair-suggestions.md',
  'source-to-brief/operator-command-palette.json',
  'source-to-brief/review-navigation-shortcuts.json'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
const exportedDiagnostics = JSON.parse(pack.files.find((file)=>file.path === 'source-to-brief/review-quality-diagnostics.json').content);
assert.equal(exportedDiagnostics.automatic_source_verification_claimed, false);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/weak-claim-repair-suggestions.md').content.includes('do not verify sources'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['reviewQualityDiagnosticsTitle','reviewQualityFindingGrid','weakClaimRepairList','review-quality-diagnostics']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Review quality diagnostics','Weak-claim repair suggestions','تشخيص جودة المراجعة','اقتراحات إصلاح الادعاءات الضعيفة','Diagnostics qualité de revue','Suggestions de réparation des affirmations faibles']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['reviewQualityDiagnosticsPanel','reviewQualityFindingGrid','weakClaimRepairList']) assert.ok(styles.includes(marker), `styles missing ${marker}`);

const serialized = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['live_scraping_enabled:true','automatic_source_verification_claimed:true','provider_execution_expanded:true','production_oauth_enabled:true','queue_bypass_enabled:true']) assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);

console.log('Source-to-brief review quality diagnostics checks passed.');
