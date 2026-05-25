import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture } from './fixture-registry-loader.mjs';

const VERSION='1.3.0-alpha.5';
const RELEASE='v1.3.0-alpha.5 — Brief Assembly Preview Diff + Export Review Signoff';
const read=(file)=>fs.readFileSync(file,'utf8');
const source=read('src/research/research-planner-v2.js');
const engine=read('src/research-engine.js');
const stateStore=read('src/research/state-store.js');
const index=read('index.html');
const schema=JSON.parse(read('schema/research-workflow.schema.json'));
const registry=JSON.parse(read('tests/ci-gate-registry.json'));
const sample=JSON.parse(read('fixtures/research/sample-research-workflow-en.json'));
const migrationFixture=getMigrationFixture('fixtures/migrations/v1.3.0-alpha.5-packet.json');
const privacyFixture=getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0-alpha.5.json');

new vm.Script(source,{filename:'src/research/research-planner-v2.js'});
const context={console, window:{Jarbou3iResearchModules:{}}, globalThis:null}; context.globalThis=context; vm.createContext(context); vm.runInContext(source, context, {filename:'src/research/research-planner-v2.js'});
const planner=context.window.Jarbou3iResearchModules.researchPlannerV2;
assert.equal(planner.VERSION, VERSION);
assert.equal(planner.MODEL, 'research_planner_v2.v1');
assert.ok(planner.DEPTH_PRESETS.quick && planner.DEPTH_PRESETS.standard && planner.DEPTH_PRESETS.deep);
const report=planner.buildResearchPlannerV2({
  plan:{topic:'US China AI semiconductor rivalry', context:'2024-2026', mode:'source-heavy', questions:['What changed?'], counter_evidence_targets:['Find evidence against escalation thesis'], disconfirming_conditions:['Stable diplomacy disproves escalation-only framing'], keywords:['AI','semiconductors']},
  evidence:[{evidence_id:'E1', claim:'TSMC and export controls shape rivalry.', source_type:'news'}],
  clusters:[{cluster_id:'CL1', cluster_label:'semiconductor controls', has_counter_evidence:false}],
  entities:[{entity_id:'ENT1', canonical_name:'TSMC', category:'organization', aliases:['Taiwan Semiconductor Manufacturing Company'], review_flags:[]}]
},{version:VERSION, now:'2026-05-21T00:00:00.000Z'});
assert.equal(report.research_planner_version, VERSION);
assert.equal(report.planner_model, 'research_planner_v2.v1');
assert.equal(report.depth_preset, 'deep');
assert.ok(report.source_type_budget.budget.official >= 4);
assert.ok(report.entity_aware_queries.some((q)=>q.entity_ids.includes('ENT1')));
assert.ok(report.counter_evidence_targets.length >= 2);
assert.ok(report.platform_source_recommendations.some((x)=>x.source_id === 'official_sources'));
assert.ok(report.connector_readiness.every((x)=>x.live_fetching_performed === false));
assert.equal(report.live_fetching_performed, false);
assert.equal(report.verification_claimed, false);
assert.ok(report.planner_quality_score >= 70);

assert.ok(engine.includes('researchPlannerV2'), 'research-engine must consume researchPlannerV2');
assert.ok(engine.includes('research_planner_report'), 'research packet must export research_planner_report');
assert.ok(engine.includes('buildResearchPlannerReport'), 'research-engine must build planner reports');
assert.ok(stateStore.includes('research_planner_report'), 'state store must preserve planner report');
assert.ok(index.includes('src/research/research-planner-v2.js'), 'index must load research planner module');
assert.ok(index.includes('researchPlannerOutput'), 'UI must expose planner output');
assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(schema.properties.research_planner_report, 'schema must expose research_planner_report');
assert.equal(schema.$defs.research_planner_report.properties.planner_model.const, 'research_planner_v2.v1');
assert.equal(schema.$defs.research_planner_report.properties.live_fetching_performed.const, false);
assert.equal(schema.$defs.research_planner_report.properties.verification_claimed.const, false);
for (const packet of [sample, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, VERSION);
  assert.ok(packet.research_planner_report, 'packet must include planner report');
  assert.equal(packet.research_planner_report.planner_model, 'research_planner_v2.v1');
  assert.equal(packet.research_planner_report.live_fetching_performed, false);
  assert.equal(packet.research_planner_report.verification_claimed, false);
  assert.ok(Array.isArray(packet.research_planner_report.entity_aware_queries));
  assert.ok(Array.isArray(packet.research_planner_report.counter_evidence_targets));
  assert.equal(packet.release_notes.release_title, RELEASE);
}
assert.ok(registry.gates.source.node_checks.includes('tests/research-planner-v2-check.mjs'), 'source gate must register planner check');
assert.ok(registry.gates['no-browser'].node_checks.includes('tests/research-planner-v2-check.mjs'), 'no-browser gate must register planner check');
assert.equal(registry.runtime_capability_change, false);
assert.equal(registry.source_behavior_changed, false);
console.log('Research Planner V2 checks passed.');
process.exit(0);
