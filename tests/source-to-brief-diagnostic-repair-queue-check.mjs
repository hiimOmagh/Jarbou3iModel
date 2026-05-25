import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0-rc.2';
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
assert.equal(typeof workbenchApi.buildDiagnosticRepairQueue, 'function');
assert.equal(typeof workbenchApi.buildExportRiskResolution, 'function');
assert.equal(typeof workbenchApi.diagnosticRepairQueueMarkdown, 'function');
assert.equal(typeof workbenchApi.exportRiskResolutionMarkdown, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official source weakly supports I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-01-02', supports:['I1'], contradicts:[], confidence:'medium', evidence_strength:1},
  {evidence_id:'E2', claim:'Counter source contradicts I1', source_title:'Counter source', source_type:'academic', source_url:'', source_date:'unknown', supports:[], contradicts:['I1'], confidence:'medium', evidence_strength:2},
  {evidence_id:'E3', claim:'Unlinked media signal', source_title:'Media signal', source_type:'media', source_url:'https://example.com/signal', source_date:'2026-01-03', supports:[], contradicts:[], confidence:'low', evidence_strength:1}
];
const packet = {
  workflow_version:VERSION,
  research_plan:{topic:'Alpha8 diagnostic repair topic', counter_evidence_targets:['Find counter evidence for I1.']},
  evidence_matrix:evidence,
  evidence_review_queue:[{review_id:'RQ1', status:'pending', created_at:'2026-01-03T00:00:00.000Z', evidence:evidence[1]}],
  causal_links:[{from:'I1', to:'N1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  analysis_brief:{topic:'Alpha8 diagnostic repair topic', handoff_summary:'Manual diagnostic repair handoff.', source_clusters:[{cluster_id:'CL1', target_id:'I1', evidence_ids:['E1','E2']}]},
  privacy_export:{release_gate:'pass'}
};
const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-23T00:00:00.000Z'});

assert.ok(workbench.diagnostic_repair_queue, 'diagnostic repair queue missing');
assert.equal(workbench.diagnostic_repair_queue.diagnostic_repair_queue_version, VERSION);
assert.equal(workbench.diagnostic_repair_queue.queue_model, 'diagnostic_repair_queue.v1');
assert.ok(workbench.diagnostic_repair_queue.items.length >= 1, 'repair queue should contain open items');
assert.ok(workbench.diagnostic_repair_queue.items.some((item)=>item.source_type === 'review_quality_diagnostic'), 'quality diagnostic repair missing');
assert.ok(workbench.diagnostic_repair_queue.items.some((item)=>item.source_type === 'review_decision_ledger'), 'ledger repair item missing');
assert.ok(workbench.diagnostic_repair_queue.items.some((item)=>item.source_type === 'export_readiness_checklist' || item.source_type === 'export_polish_warning'), 'export repair item missing');
assert.equal(workbench.diagnostic_repair_queue.queue_bypass_enabled, false);
assert.equal(workbench.diagnostic_repair_queue.live_fetching_performed, false);
assert.equal(workbench.diagnostic_repair_queue.provider_execution_expanded, false);
assert.equal(workbench.diagnostic_repair_queue.automatic_source_verification_claimed, false);
assert.equal(workbench.diagnostic_repair_queue.verification_claimed, false);

assert.ok(workbench.export_risk_resolution, 'export risk resolution missing');
assert.equal(workbench.export_risk_resolution.export_risk_resolution_version, VERSION);
assert.equal(workbench.export_risk_resolution.risk_model, 'export_risk_resolution.v1');
assert.ok(workbench.export_risk_resolution.risk_items.length >= 1, 'export risk items should be present');
assert.ok(workbench.export_risk_resolution.clearance_checklist.some((item)=>item.check_id === 'required_repairs_cleared'));
assert.equal(workbench.export_risk_resolution.export_allowed_without_manual_review, false);
assert.equal(workbench.export_risk_resolution.live_fetching_performed, false);
assert.equal(workbench.export_risk_resolution.provider_execution_expanded, false);
assert.equal(workbench.export_risk_resolution.automatic_source_verification_claimed, false);
assert.equal(workbench.export_risk_resolution.verification_claimed, false);

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/diagnostic-repair-queue.json',
  'source-to-brief/diagnostic-repair-queue.md',
  'source-to-brief/export-risk-resolution.json',
  'source-to-brief/export-risk-resolution.md',
  'source-to-brief/review-quality-diagnostics.json',
  'source-to-brief/operator-handoff.md'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
const exportedQueue = JSON.parse(pack.files.find((file)=>file.path === 'source-to-brief/diagnostic-repair-queue.json').content);
const exportedRisk = JSON.parse(pack.files.find((file)=>file.path === 'source-to-brief/export-risk-resolution.json').content);
assert.equal(exportedQueue.automatic_source_verification_claimed, false);
assert.equal(exportedRisk.automatic_source_verification_claimed, false);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/diagnostic-repair-queue.md').content.includes('do not verify sources'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/export-risk-resolution.md').content.includes('does not automatically verify evidence'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['diagnosticRepairQueueTitle','exportRiskResolutionTitle','diagnosticRepairQueueList','exportRiskResolutionList','diagnostic-repair-queue','export-risk-resolution']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Diagnostic Repair Queue','Export Risk Resolution','صف إصلاح التشخيص','حل مخاطر التصدير','File de réparation diagnostique','Résolution des risques export']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['diagnosticRepairQueuePanel','exportRiskResolutionPanel','diagnosticRepairItem','exportRiskItem']) assert.ok(styles.includes(marker), `styles missing ${marker}`);

const serialized = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['live_scraping_enabled:true','automatic_source_verification_claimed:true','provider_execution_expanded:true','production_oauth_enabled:true','queue_bypass_enabled:true']) assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);

console.log('Source-to-brief diagnostic repair queue checks passed.');
