import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CURRENT_RUNTIME_SCOPE, CURRENT_VERSION } from './current-release-identity.mjs';

const VERSION = '1.4.0-alpha.31';
const MILESTONE = 'v1.4.0-alpha.31 — Adapter Replay Review Pack Operator Workflow Polish';
const MODULE = 'src/research/adapter-replay-review-pack-operator-workflow-polish.js';
const CHECK = 'tests/adapter-replay-review-pack-operator-workflow-polish-check.mjs';

const sandbox = { console };
sandbox.globalThis = sandbox;
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const file of [
  'src/research/adapter-replay-review-pack-operator-handoff-export.js',
  'src/research/adapter-replay-review-pack-ui-export-preview.js',
  MODULE
]) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const mod = sandbox.Jarbou3iResearchModules.adapterReplayReviewPackOperatorWorkflowPolish;
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_replay_review_pack_operator_workflow_polish.v1');
assert.equal(mod.PREVIEW_BASELINE, '1.4.0-alpha.29');
assert.equal(mod.REVIEW_PACK_BASELINE, '1.4.0-alpha.28');
assert.equal(typeof mod.buildAdapterReplayReviewPackOperatorWorkflowPolish, 'function');

const workflow = mod.buildAdapterReplayReviewPackOperatorWorkflowPolish({ generated_at: '2026-06-01T12:00:00.000Z' });
assert.equal(workflow.adapter_replay_review_pack_operator_workflow_polish_version, VERSION);
assert.equal(workflow.milestone, MILESTONE);
assert.ok(workflow.prioritized_operator_actions.length >= 1, 'workflow must expose prioritized actions');
assert.ok(workflow.handoff_checklist.length >= 3, 'workflow must expose handoff checklist');
assert.ok(workflow.manual_next_step_copy.includes('Review pack verdict'), 'manual next-step copy must summarize verdict');
assert.ok(workflow.manual_next_step_copy.includes('metadata-only operator workflow polish'), 'manual next-step copy must restate safety boundary');
assert.ok(Object.keys(workflow.decision_lanes).includes('blockers'), 'decision lanes must include blockers');
assert.ok(Object.keys(workflow.decision_lanes).includes('review_required'), 'decision lanes must include review-required lane');
assert.equal(workflow.workflow_safety_contract.workflow_polish_only, true);
assert.equal(workflow.workflow_safety_contract.metadata_only, true);
assert.equal(workflow.workflow_safety_contract.manual_operator_review_required, true);
for (const key of Object.keys(mod.BOUNDARY_FLAGS)) {
  if (key.startsWith('no_') || key.endsWith('_only') || key === 'deterministic_review_pack_backed') continue;
  assert.equal(mod.BOUNDARY_FLAGS[key], false, `${key} must remain false`);
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','cryptographic_signature_claimed','publication_permission_claimed'
]) {
  assert.equal(workflow[key], false, `${key} must remain false`);
}
assert.equal(workflow.safe_metadata_only, true);
assert.equal(workflow.can_execute_now, false);

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-review-pack-operator-workflow-polish.js" defer'), 'index must load alpha.31 operator workflow module');
assert.ok(index.includes('data-browser-qa="adapter-replay-review-pack-operator-workflow-polish"'), 'index must expose alpha.31 operator workflow surface');
assert.ok(index.includes('adapterReplayOperatorWorkflowPolishMount'), 'index must expose alpha.31 render mount');
assert.ok(index.includes('Adapter Replay Review Pack Operator Workflow Polish'), 'index must expose alpha.31 visible title');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.31 operator workflow check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.31 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.31 check');
assert.ok([CURRENT_RUNTIME_SCOPE, CURRENT_VERSION, VERSION, '1.4.0-alpha.43', '1.4.0-alpha.43'].includes(registry.runtime_optimization.version), 'runtime optimization may advance to alpha.32 while preserving alpha.31 workflow check');
assert.ok([CURRENT_RUNTIME_SCOPE, 'adapter_replay_review_pack_operator_workflow_polish', 'source_to_brief_operator_continuity_console', 'targeted_hosted_evidence_capture', 'source_to_brief_operator_continuity_console', 'targeted_hosted_evidence_capture'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization may advance to alpha.32 while preserving alpha.31 workflow check');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

console.log('Adapter replay review pack operator workflow polish checks passed.');
