import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0-alpha.9';
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
assert.equal(typeof workbenchApi.buildSourceToClaimGapClosureQueue, 'function');
assert.equal(typeof workbenchApi.sourceToClaimGapClosureQueueMarkdown, 'function');

const packet = {
  workflow_version:VERSION,
  research_plan:{
    plan_version:VERSION,
    mode:'source-heavy',
    topic:'Source-to-claim gap topic',
    questions:['Which claims can safely move to export?'],
    counter_evidence_targets:[{target_id:'N1', label:'Narrative claim needs falsifier'}]
  },
  evidence_matrix:[
    {evidence_id:'E1', claim:'Partial source supports I1 but lacks date', source_title:'Partial source', source_type:'journalistic', source_url:'https://example.com/partial', source_date:'unknown', supports:['I1'], contradicts:[], confidence:'medium', evidence_strength:2},
    {evidence_id:'E2', claim:'Counter source contradicts I1', source_title:'Counter source', source_type:'academic', source_url:'https://example.com/counter', source_date:'2026-05-01', supports:[], contradicts:['I1'], confidence:'high', evidence_strength:4},
    {evidence_id:'E3', claim:'Unlinked background source', source_title:'Unlinked source', source_type:'other', source_url:'', source_date:'unknown', supports:[], contradicts:[], confidence:'low', evidence_strength:1}
  ],
  causal_links:[{from:'A1', to:'I1', relationship:'motivates', evidence_ids:[], confidence:'low'}],
  scenarios:{items:[{id:'S1', name:'Scenario missing falsifier', probability:35, timeframe:'near term', drivers:['D1']}]},
  analysis_brief:{brief_version:VERSION, topic:'Source-to-claim gap topic', handoff_summary:'Manual gap closure handoff.'},
  privacy_export:{release_gate:'pass'}
};

const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-25T02:00:00.000Z'});
const queue = workbench.source_to_claim_gap_closure_queue;
assert.ok(queue, 'source-to-claim gap closure queue missing');
assert.equal(queue.queue_model, 'source_to_claim_gap_closure_queue.v1');
assert.equal(queue.release_gate, 'source_to_claim_gap_closure_required_before_export');
assert.equal(queue.export_lock_blocking, true);
assert.ok(queue.required_before_export_count >= 4, 'expected export-blocking gaps');
assert.ok(queue.counts.claim_gap_count >= 1, 'expected claim gap count');
assert.ok(queue.counts.weak_linkage_count >= 1, 'expected weak linkage count');
assert.ok(queue.counts.contradiction_gap_count >= 1, 'expected contradiction gap count');
assert.ok(queue.counts.falsifier_gap_count >= 2, 'expected counter-evidence and scenario falsifier gaps');
for (const category of ['claim_missing_evidence','evidence_without_claim_link','unresolved_contradiction_gap','counter_evidence_target_gap','scenario_falsifier_gap']) {
  assert.ok(queue.items.some((item)=>item.category === category), `missing gap category ${category}`);
}
assert.equal(queue.live_fetching_performed, false);
assert.equal(queue.provider_execution_expanded, false);
assert.equal(queue.automatic_source_verification_claimed, false);
assert.equal(queue.verification_claimed, false);

assert.ok(workbench.export_risk_resolution.risk_items.some((risk)=>risk.risk_type === 'source_to_claim_gap_open'), 'export risk must include source-to-claim blockers');
assert.equal(workbench.lock_ledger_review_surface.export_handoff_status, 'blocked');
assert.equal(workbench.signed_export_handoff_pack.handoff_status, 'blocked');
assert.equal(workbench.signed_export_handoff_pack.review_summary.source_to_claim_gap_blocking_count, queue.required_before_export_count);
assert.ok(workbench.workflow_steps.includes('source_to_claim_gap_closure_queue'));

const markdown = workbenchApi.sourceToClaimGapClosureQueueMarkdown(workbench);
assert.ok(markdown.includes('Source-to-Claim Gap Closure Queue'));
assert.ok(markdown.includes('Required before export'));

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
for (const required of [
  'source-to-brief/source-to-claim-gap-closure-queue.json',
  'source-to-brief/source-to-claim-gap-closure-queue.md',
  'source-to-brief/source-to-brief-package.json',
  'source-to-brief/operator-handoff.md'
]) assert.ok(paths.includes(required), `export pack missing ${required}`);
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/operator-handoff.md').content.includes('Source-to-claim gaps open'));
assert.ok(pack.files.find((file)=>file.path === 'source-to-brief/signed-export-handoff-pack.md').content.includes('Source-to-claim export blockers'));

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['sourceToClaimGapClosurePanel','sourceToClaimGapClosureList','source-to-claim-gap-closure-queue']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Source-to-Claim Gap Closure Queue','قائمة إغلاق فجوات المصدر إلى الادعاء','File de clôture des écarts source-affirmation']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['sourceToClaimGapClosurePanel','sourceToClaimGapClosureList','sourceToClaimGapItem']) assert.ok(styles.includes(marker), `style missing ${marker}`);

const serialized = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['automatic_source_verification_claimed":true','live_web_search_performed":true','provider_execution_expanded":true','production_oauth_enabled":true','backend_behavior_expanded":true','automatic_signoff_performed":true','automatic_export_lock_performed":true','cryptographic_signature_claimed":true']) {
  assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);
}

console.log('Source-to-claim gap closure queue checks passed.');
process.exit(0);
