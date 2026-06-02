import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.42';
const MILESTONE = 'v1.4.0-alpha.42 — Manual Workflow UX Consolidation';
const MODULE = 'src/research/source-to-brief-operator-continuity-console.js';
const CHECK = 'tests/source-to-brief-operator-continuity-console-check.mjs';
const DEPENDENCIES = [
  'src/research/evidence-workspace-ux.js',
  'src/research/operator-command-palette.js',
  'src/research/guided-research-session.js',
  'src/research/brief-template-system.js',
  'src/research/source-to-brief-workbench.js',
  MODULE
];

const sandbox = { console, TextEncoder, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });

const root = sandbox.window.Jarbou3iResearchModules;
const workbenchApi = root.sourceToBriefWorkbench;
const mod = root.sourceToBriefOperatorContinuityConsole;
assert.ok(workbenchApi, 'source-to-brief workbench must remain available');
assert.ok(mod, 'alpha.38 source-to-brief operator continuity console module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'source_to_brief_operator_continuity_console.v1');
assert.equal(mod.SOURCE_TO_BRIEF_BASELINE, '1.3.0');
assert.equal(mod.OPERATOR_REVIEW_CONSOLE_BASELINE, '1.4.0-alpha.36');
assert.equal(mod.COMPACT_NAVIGATION_BASELINE, '1.4.0-alpha.37');
assert.equal(typeof mod.buildSourceToBriefOperatorContinuityConsole, 'function');

const packet = {
  workflow_version:'1.3.0',
  research_mode:'source-heavy',
  research_plan:{ plan_version:'1.3.0', mode:'source-heavy', topic:'Continuity topic', questions:['Which evidence gaps block export?'], counter_evidence_targets:[{target_id:'N1', label:'Narrative needs falsifier'}] },
  evidence_matrix:[
    {evidence_id:'E1', claim:'Supported claim', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-05-01', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:5},
    {evidence_id:'E2', claim:'Contradiction source', source_title:'Academic source', source_type:'academic', source_url:'https://example.com/academic', source_date:'2026-05-02', supports:[], contradicts:['I1'], confidence:'high', evidence_strength:4},
    {evidence_id:'E3', claim:'Unlinked background', source_title:'Background note', source_type:'other', source_url:'', source_date:'unknown', supports:[], contradicts:[], confidence:'low', evidence_strength:1}
  ],
  causal_links:[{from:'A1', to:'I1', relationship:'motivates', evidence_ids:[], confidence:'low'}],
  scenarios:{items:[{id:'S1', name:'Scenario missing falsifier', probability:35, timeframe:'near term', drivers:['D1']}]},
  analysis_brief:{brief_version:'1.3.0', topic:'Continuity topic', handoff_summary:'Manual continuity handoff.'},
  privacy_export:{release_gate:'pass'}
};

const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:'1.3.0', now:'2026-06-01T16:00:00.000Z'});
const consolePayload = mod.buildSourceToBriefOperatorContinuityConsole({ source_to_brief_workbench: workbench, generated_at:'2026-06-01T16:00:00.000Z' });
assert.equal(consolePayload.source_to_brief_operator_continuity_console_version, VERSION);
assert.equal(consolePayload.milestone, MILESTONE);
assert.equal(consolePayload.model, 'source_to_brief_operator_continuity_console.v1');
assert.equal(consolePayload.continuity_console_ready, true);
assert.equal(consolePayload.safe_metadata_only, true);
assert.ok(consolePayload.brief_stage_summary.current_brief_stage, 'brief stage summary must expose current stage');
assert.ok(consolePayload.unresolved_evidence_gap_summary.unresolved_gap_count >= 1, 'continuity console must expose unresolved evidence gaps');
assert.ok(consolePayload.source_to_claim_repair_state.open_gap_count >= 1, 'continuity console must expose source-to-claim repair state');
assert.equal(consolePayload.operator_signoff_readiness.manual_operator_review_required, true);
assert.equal(consolePayload.operator_signoff_readiness.automatic_signoff_performed, false);
assert.equal(consolePayload.operator_signoff_readiness.automatic_export_lock_performed, false);
assert.ok(consolePayload.export_publication_readiness.publication_release_gate, 'export/publication readiness must expose release gate');
assert.equal(consolePayload.export_publication_readiness.publication_permission_claimed, false);
assert.equal(consolePayload.export_publication_readiness.verification_claimed, false);
assert.ok(consolePayload.continuity_risk_rail.length >= 1, 'continuity risk rail must expose operator risks');
assert.ok(consolePayload.continuity_risk_rail.some((item)=>item.risk_id === 'evidence-gaps-open'), 'risk rail must prioritize evidence gaps');
assert.ok(consolePayload.next_operator_action.includes('evidence gaps'), 'next operator action must prioritize evidence gaps');
assert.equal(consolePayload.export_continuity_summary.manual_review_required, true);
assert.equal(consolePayload.export_continuity_summary.safe_to_publish, false);
assert.equal(consolePayload.export_continuity_summary.verification_claimed, false);
assert.equal(consolePayload.export_continuity_summary.signoff_performed, false);
assert.equal(consolePayload.export_continuity_summary.export_lock_performed, false);
assert.equal(consolePayload.export_continuity_summary.publication_permission_claimed, false);
assert.ok(consolePayload.manual_continuity_copy.includes('Source-to-brief continuity verdict'), 'manual copy must summarize continuity verdict');
assert.ok(consolePayload.manual_continuity_copy.includes('no live provider calls'), 'manual copy must restate no-live-provider boundary');
assert.equal(consolePayload.continuity_safety_contract.source_to_brief_continuity_console_only, true);
assert.equal(consolePayload.continuity_safety_contract.metadata_only, true);
assert.equal(consolePayload.continuity_safety_contract.no_auto_verification, true);
assert.equal(consolePayload.continuity_safety_contract.no_auto_signoff, true);
assert.equal(consolePayload.continuity_safety_contract.no_auto_export_lock, true);
assert.equal(consolePayload.continuity_safety_contract.no_publication_permission, true);

for (const [key, value] of Object.entries(consolePayload.boundary_flags)) {
  if (['source_to_brief_continuity_console_only','metadata_preview_only','source_to_brief_workbench_backed','operator_review_layer_continuity','manual_operator_review_required'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','source_behavior_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','cryptographic_signature_claimed','publication_permission_claimed','status_persistence_enabled','batch_mutation_enabled','navigation_state_persistence_enabled'
]) assert.equal(consolePayload[key], false, `${key} must remain false`);

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}
const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/source-to-brief-operator-continuity-console.js" defer'), 'index must load alpha.38 continuity console module');
assert.ok(index.includes('data-browser-qa="source-to-brief-operator-continuity-console"'), 'index must expose alpha.38 continuity console surface');
assert.ok(index.includes('sourceToBriefOperatorContinuityConsoleMount'), 'index must expose alpha.38 render mount');
assert.ok(index.includes('Manual Workflow UX Consolidation'), 'index must expose alpha.38 visible title');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.38 continuity console check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.38 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.38 check');
assert.equal(registry.runtime_optimization.version, VERSION);
assert.equal(registry.runtime_optimization.optimization_scope, 'manual_workflow_ux_consolidation');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

const releaseCopy = fs.readFileSync('src/research/release-copy-contract.js', 'utf8');
for (const token of ['Manual Workflow UX Consolidation', 'operator control room', 'stage board', 'no live provider calls']) {
  assert.ok(releaseCopy.includes(token), `release copy must include ${token}`);
}

console.log('Source-to-brief operator continuity console checks passed.');
