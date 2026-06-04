import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CURRENT_RELEASE } from './current-release-identity.mjs';


const VERSION = '1.4.0-alpha.43';
const MILESTONE = CURRENT_RELEASE;
const MODULE = 'src/research/adapter-replay-review-pack-operator-review-console.js';
const CHECK = 'tests/adapter-replay-review-pack-operator-review-console-check.mjs';
const DEPENDENCIES = [
  'src/research/adapter-replay-fixture-corpus-coverage-matrix.js',
  'src/research/adapter-replay-insight-ux-operator-decision-surface.js',
  'src/research/adapter-replay-decision-drilldown-evidence-trace-links.js',
  'src/research/adapter-replay-review-pack-operator-handoff-export.js',
  'src/research/adapter-replay-review-pack-ui-export-preview.js',
  'src/research/adapter-replay-review-pack-operator-workflow-polish.js',
  'src/research/adapter-replay-review-pack-evidence-trace-reader.js',
  'src/research/adapter-replay-review-pack-decision-queue.js',
  'src/research/adapter-replay-review-pack-triage-workbench.js',
  'src/research/adapter-replay-review-pack-handoff-dossier.js',
  MODULE
];

const sandbox = { console, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const root = sandbox.window.Jarbou3iResearchModules;
const mod = root.adapterReplayReviewPackOperatorReviewConsole;
assert.ok(root.adapterReplayReviewPackHandoffDossier, 'alpha.35 handoff dossier must remain available');
assert.ok(root.adapterReplayReviewPackTriageWorkbench, 'alpha.34 triage workbench must remain available');
assert.ok(root.adapterReplayReviewPackDecisionQueue, 'alpha.33 decision queue must remain available');
assert.ok(root.adapterReplayReviewPackEvidenceTraceReader, 'alpha.32 evidence trace reader must remain available');
assert.ok(mod, 'alpha.36 operator review console module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'source_to_brief_operator_continuity_console.v1');
assert.equal(mod.HANDOFF_DOSSIER_BASELINE, '1.4.0-alpha.35');
assert.equal(mod.TRIAGE_WORKBENCH_BASELINE, '1.4.0-alpha.34');
assert.equal(mod.DECISION_QUEUE_BASELINE, '1.4.0-alpha.33');
assert.equal(mod.TRACE_READER_BASELINE, '1.4.0-alpha.32');
assert.equal(typeof mod.buildAdapterReplayReviewPackOperatorReviewConsole, 'function');

const reviewConsole = mod.buildAdapterReplayReviewPackOperatorReviewConsole({ generated_at: '2026-06-01T15:00:00.000Z' });
assert.equal(reviewConsole.source_to_brief_operator_continuity_console_version, VERSION);
assert.equal(reviewConsole.milestone, MILESTONE);
assert.equal(reviewConsole.operator_review_console_ready, true);
assert.equal(reviewConsole.safe_metadata_only, true);
assert.equal(reviewConsole.can_execute_now, false);
assert.ok(reviewConsole.console_sections.length >= 6, 'operator console must expose review sections');
assert.ok(reviewConsole.review_tabs.length >= reviewConsole.console_sections.length, 'operator console must expose tab navigation');
assert.ok(reviewConsole.unified_review_cards.length >= 1, 'operator console must expose unified review cards');
assert.ok(reviewConsole.trace_navigation.length >= 1, 'operator console must expose trace navigation');
assert.ok(reviewConsole.batch_review_controls.length >= 1, 'operator console must expose batch review controls');
assert.ok(reviewConsole.unified_review_cards.every((card) => Array.isArray(card.trace_ids)), 'review cards must include trace IDs');
assert.ok(reviewConsole.unified_review_cards.some((card) => ['blocked','needs_review','ready_for_handoff_review'].includes(card.batch_status)), 'review cards must retain triage status');
assert.ok(reviewConsole.batch_review_controls.every((control) => control.applies_status_mutation === false && control.persists_status === false), 'batch controls must be preview-only');
assert.equal(reviewConsole.handoff_readiness.manual_review_required, true);
assert.equal(reviewConsole.handoff_readiness.export_lock_performed, false);
assert.equal(reviewConsole.handoff_readiness.verification_claimed, false);
assert.equal(reviewConsole.export_review_console_summary.manual_review_required, true);
assert.equal(reviewConsole.export_review_console_summary.safe_to_publish, false);
assert.ok(reviewConsole.export_review_console_summary.export_note.includes('metadata-only'), 'export summary must restate metadata-only boundary');
assert.ok(reviewConsole.manual_operator_review_console_copy.includes('Operator review console verdict'), 'manual copy must summarize console verdict');
assert.ok(reviewConsole.manual_operator_review_console_copy.includes('no live provider calls'), 'manual copy must restate no-live-provider boundary');
assert.equal(reviewConsole.operator_review_console_safety_contract.operator_review_console_only, true);
assert.equal(reviewConsole.operator_review_console_safety_contract.metadata_only, true);
assert.equal(reviewConsole.operator_review_console_safety_contract.manual_operator_review_required, true);
assert.equal(reviewConsole.operator_review_console_safety_contract.no_auto_verification, true);
assert.equal(reviewConsole.operator_review_console_safety_contract.no_auto_signoff, true);
assert.equal(reviewConsole.operator_review_console_safety_contract.no_auto_export_lock, true);
assert.equal(reviewConsole.operator_review_console_safety_contract.no_status_persistence, true);
assert.equal(reviewConsole.operator_review_console_safety_contract.no_batch_mutation, true);

for (const [key, value] of Object.entries(reviewConsole.boundary_flags)) {
  if (['operator_review_console_only','metadata_preview_only','deterministic_handoff_dossier_backed','no_network_replay_only','manual_operator_review_required','review_console_navigation_only'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','cryptographic_signature_claimed','publication_permission_claimed','status_persistence_enabled','batch_mutation_enabled'
]) {
  assert.equal(reviewConsole[key], false, `${key} must remain false`);
}

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-review-pack-operator-review-console.js" defer'), 'index must load alpha.36 operator review console module');
assert.ok(index.includes('data-browser-qa="adapter-replay-review-pack-operator-review-console"'), 'index must expose alpha.36 operator review console surface');
assert.ok(index.includes('adapterReplayOperatorReviewConsoleMount'), 'index must expose alpha.36 render mount');
assert.ok(index.includes('Targeted Hosted Evidence Capture'), 'index must expose alpha.36 visible title');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.36 operator review console check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.36 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.36 check');
assert.equal(registry.runtime_optimization.version, VERSION);
assert.equal(registry.runtime_optimization.optimization_scope, 'targeted_hosted_evidence_capture');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

console.log('Adapter replay review pack operator review console checks passed.');
