import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const CURRENT_VERSION = '1.4.0-alpha.11';
const CURRENT_TITLE = 'Manual Execution Safety Cockpit + Session Ledger';
const VERSION = '1.3.0';
const source = fs.readFileSync('src/research/evidence-workspace-ux.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');
const engine = fs.readFileSync('src/research-engine.js', 'utf8');
const helpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');
const schema = JSON.parse(fs.readFileSync('schema/research-workflow.schema.json', 'utf8'));
const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));

new vm.Script(source, {filename:'src/research/evidence-workspace-ux.js'});
const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(source, context, {filename:'src/research/evidence-workspace-ux.js'});
const ux = context.window.Jarbou3iResearchModules.evidenceWorkspaceUx;

assert.equal(pkg.version, CURRENT_VERSION);
assert.equal(ux.VERSION, VERSION);
assert.equal(typeof ux.filterAndSortReviewQueue, 'function');
assert.equal(typeof ux.batchDecisionPlan, 'function');
assert.equal(typeof ux.workspaceUxReport, 'function');

const queue = [
  {review_id:'RQ1', status:'pending', created_at:'2026-01-01T00:00:00.000Z', evidence:{evidence_id:'CAND1', claim:'OpenAI announced a pricing change', source_title:'Official update', source_type:'official', source_url:'https://example.com/a', source_date:'2026-01-01', supports:['I1'], contradicts:[], evidence_scoring:{reliability_score:82, attention_signal_score:20}}},
  {review_id:'RQ2', status:'needs_edit', created_at:'2026-01-02T00:00:00.000Z', evidence:{evidence_id:'CAND2', claim:'Reddit users contradict the official framing', source_title:'Public thread', source_type:'social', source_url:'', source_date:'unknown', supports:[], contradicts:['N1'], evidence_scoring:{reliability_score:38, attention_signal_score:91}}},
  {review_id:'RQ3', status:'accepted', created_at:'2026-01-03T00:00:00.000Z', evidence:{evidence_id:'E3', claim:'Accepted background source', source_type:'academic', supports:['A1'], contradicts:[], evidence_scoring:{reliability_score:76, attention_signal_score:14}}}
];
const contextData = {entity_profiles:[{entity_id:'ENT1', name:'OpenAI', evidence_ids:['CAND1']}], source_clusters:[{cluster_id:'CL1', target_id:'N1', evidence_ids:['CAND2']}], source_gap_report:{gap_warnings:['official_source_missing_for_social_claim']}};
const filtered = ux.filterAndSortReviewQueue(queue, {keyword:'reddit', status:'unresolved', source_type:'social', relationship:'contradicts', sort:'attention_desc'}, contextData);
assert.equal(filtered.visible_count, 1);
assert.equal(filtered.items[0].review_id, 'RQ2');
assert.equal(filtered.items[0].__review_index, 1);

const facets = ux.deriveFacets(queue, contextData);
assert.ok(facets.source_types.includes('official'));
assert.ok(facets.entities.some((item)=>item.id === 'ENT1'));
assert.ok(facets.clusters.some((item)=>item.id === 'CL1'));

const batch = ux.batchDecisionPlan(queue, [0,1,2], 'reject');
assert.equal(batch.eligible_count, 2);
assert.equal(JSON.stringify(batch.target_indexes), JSON.stringify([0,1]));
assert.equal(batch.release_gate, 'human_review_required');

const report = ux.workspaceUxReport(queue, {status:'unresolved', sort:'needs_review_first'}, contextData);
assert.equal(report.workspace_ux_version, VERSION);
assert.equal(report.local_only, true);
assert.equal(report.queue_bypass_enabled, false);
assert.equal(report.batch_controls_enabled, true);
assert.equal(report.throughput_report.contradiction_open_count, 1);
assert.equal(report.unresolved_signals.low_traceability_items.includes('RQ2'), true);
assert.equal(report.throughput_report.keyboard_flow.enabled, true);

assert.ok(index.includes('src/research/evidence-workspace-ux.js'), 'index must load evidence workspace UX module');
assert.ok(index.indexOf('evidence-workspace.js') < index.indexOf('evidence-workspace-ux.js'), 'UX module must load after base evidence workspace');
assert.ok(index.includes('acceptVisibleReviewEvidenceBtn'), 'visible accept batch control missing');
assert.ok(index.includes('needsEditVisibleReviewEvidenceBtn'), 'visible needs-edit batch control missing');
assert.ok(index.includes('rejectVisibleReviewEvidenceBtn'), 'visible reject batch control missing');
assert.ok(engine.includes('evidenceWorkspaceUxReport'), 'research engine must export evidence workspace UX report');
assert.ok(engine.includes('reviewThroughputReport'), 'research engine must export review throughput report');
assert.ok(helpers.includes('reviewThroughputTitle'), 'localized throughput labels missing');
assert.ok(helpers.includes('Diagnostic Repair Queue + Export Risk Resolution'));
assert.ok(helpers.includes('مرشح مستقر'));
assert.ok(helpers.includes('candidat stable'));

assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(schema.properties.evidence_workspace_ux_report, 'schema must expose evidence workspace UX report');
assert.ok(schema.properties.review_throughput_report, 'schema must expose review throughput report');
assert.equal(fixture.workflow_version, VERSION);
assert.equal(fixture.evidence_workspace_ux_report.workspace_ux_version, VERSION);
assert.equal(fixture.review_throughput_report.throughput_version, VERSION);
assert.equal(fixture.evidence_workspace_ux_report.queue_bypass_enabled, false);
assert.ok(registry.gates['no-browser'].node_checks.includes('tests/evidence-workspace-ux-throughput-check.mjs'));
assert.ok(registry.gates.source.node_checks.includes('tests/evidence-workspace-ux-throughput-check.mjs'));
assert.ok(registry.syntax_matrix.files.includes('src/research/evidence-workspace-ux.js'));

console.log('Evidence Pack v3 throughput checks passed.');
process.exit(0);
