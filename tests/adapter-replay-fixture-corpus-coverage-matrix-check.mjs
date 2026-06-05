import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CURRENT_RUNTIME_SCOPE, CURRENT_VERSION } from './current-release-identity.mjs';

const VERSION = '1.4.0-alpha.14';
const MILESTONE = 'v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix';
const MODEL = 'adapter_replay_fixture_corpus_coverage_matrix.v1';
const NEW_MODULE = 'src/research/adapter-replay-fixture-corpus-coverage-matrix.js';
const NEW_CHECK = 'tests/adapter-replay-fixture-corpus-coverage-matrix-check.mjs';

const ctx = vm.createContext({ window: { Jarbou3iResearchModules: {} }, console });
for (const file of [
  'src/research/provider-execution-mock-to-live-equivalence.js',
  'src/research/source-acquisition-control-surface.js',
  'src/research/credential-boundary-runtime-drill.js',
  'src/research/controlled-execution-candidate-gate.js',
  'src/research/limited-manual-live-execution-prototype.js',
  'src/research/manual-execution-safety-cockpit-session-ledger.js',
  'src/research/manual-provider-adapter-sandbox-ephemeral-invocation-contract.js',
  'src/research/adapter-contract-test-bench-no-network-invocation-replay-qa.js',
  NEW_MODULE
]) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.adapterReplayFixtureCorpusCoverageMatrix;
assert.ok(mod, 'adapterReplayFixtureCorpusCoverageMatrix must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, MODEL);
assert.equal(mod.ADAPTER_CONTRACT_BENCH_BASELINE, '1.4.0-alpha.13');
assert.equal(mod.ADAPTER_SANDBOX_BASELINE, '1.4.0-alpha.12');
assert.equal(mod.SAFETY_COCKPIT_BASELINE, '1.4.0-alpha.11');
assert.equal(mod.STABLE_BASELINE, '1.3.0');

assert.deepEqual(Array.from(mod.PROVIDER_FAMILIES), ['openai_style','anthropic_style','local_llm_style']);
assert.deepEqual(Array.from(mod.SCENARIO_CLASSES), [
  'metadata_success_replay',
  'request_envelope_shape_drift',
  'response_envelope_shape_drift',
  'missing_fixture_block',
  'adapter_failure_ux_rehearsal',
  'safe_transcript_comparison',
  'capability_matrix_mapping'
]);

const reportA = mod.buildAdapterReplayFixtureCorpusCoverageMatrix({ generated_at: '2026-05-29T00:00:00.000Z' });
const reportB = mod.buildAdapterReplayFixtureCorpusCoverageMatrix({ generated_at: '2026-05-29T00:00:00.000Z' });
assert.equal(reportA.adapter_replay_fixture_corpus_coverage_matrix_version, VERSION);
assert.equal(reportA.milestone, MILESTONE);
assert.equal(reportA.model, MODEL);
assert.equal(reportA.adapter_contract_bench_summary_available, true);
assert.equal(reportA.safe_metadata_only, true);
assert.equal(reportA.can_execute_now, false);
assert.equal(reportA.network_invocation_allowed, false);
assert.equal(reportA.live_provider_execution_enabled, false);
assert.equal(reportA.live_provider_execution_performed, false);
assert.equal(reportA.live_source_fetching_enabled, false);
assert.equal(reportA.live_source_fetching_performed, false);
assert.equal(reportA.hidden_network_calls_allowed, false);
assert.equal(reportA.real_oauth_token_lifecycle_enabled, false);
assert.equal(reportA.real_api_keys_stored, false);
assert.equal(reportA.real_tokens_stored, false);
assert.equal(reportA.credential_persistence_allowed, false);
assert.equal(reportA.backend_storage_expanded, false);
assert.equal(reportA.automatic_source_verification_claimed, false);
assert.equal(reportA.automatic_signoff_performed, false);
assert.equal(reportA.automatic_export_lock_performed, false);
assert.equal(reportA.publication_permission_claimed, false);
assert.equal(reportA.corpus.length, 21, 'default corpus must cover 3 provider families × 7 scenario classes');
assert.equal(reportA.coverage_matrix.total_cells, 21);
assert.equal(reportA.coverage_matrix.covered_cells, 21);
assert.equal(reportA.coverage_matrix.gap_cells, 0);
assert.equal(reportA.coverage_matrix.coverage_percentage, 100);
assert.equal(reportA.coverage_matrix.threshold_met, true);
assert.equal(reportA.coverage_gap_warnings.length, 0);
assert.equal(reportA.safety_validation.ok, true);
assert.ok(reportA.coverage_matrix.matrix_checksum.startsWith('fnv1a32:'));
assert.ok(reportA.checksum.startsWith('fnv1a32:'));

for (const family of mod.PROVIDER_FAMILIES) {
  const rows = reportA.coverage_matrix.rows.filter((row) => row.provider_family === family);
  assert.equal(rows.length, 1, `coverage row missing for ${family}`);
  for (const scenario of mod.SCENARIO_CLASSES) {
    const item = reportA.corpus.find((candidate) => candidate.provider_family === family && candidate.scenario_class === scenario);
    assert.ok(item, `${family}/${scenario} fixture missing`);
    assert.equal(item.network_invocation_allowed, false);
    assert.equal(item.live_provider_execution_performed, false);
    assert.equal(item.live_source_fetching_performed, false);
    assert.equal(item.raw_request_body_included, false);
    assert.equal(item.raw_response_body_included, false);
    assert.equal(item.authorization_header_included, false);
    assert.equal(item.secret_material_included, false);
    assert.equal(item.safe_metadata_only, true);
    assert.ok(item.checksum.startsWith('fnv1a32:'));
    assert.ok(['covered','blocked','review_required'].includes(rows[0].cells[scenario].state));
  }
}

assert.deepEqual(reportA.corpus.map((item) => item.checksum), reportB.corpus.map((item) => item.checksum));
assert.equal(reportA.coverage_matrix.matrix_checksum, reportB.coverage_matrix.matrix_checksum);
assert.equal(reportA.coverage_matrix.coverage_percentage, reportB.coverage_matrix.coverage_percentage);
assert.equal(reportA.checksum, reportB.checksum);

const reportDifferentGeneratedAt = mod.buildAdapterReplayFixtureCorpusCoverageMatrix({ generated_at: '2030-01-01T00:00:00.000Z' });
assert.deepEqual(reportA.corpus.map((item) => item.checksum), reportDifferentGeneratedAt.corpus.map((item) => item.checksum), 'generated_at must not perturb corpus checksums');
assert.equal(reportA.coverage_matrix.matrix_checksum, reportDifferentGeneratedAt.coverage_matrix.matrix_checksum, 'generated_at must not perturb matrix checksum');
assert.equal(reportA.checksum, reportDifferentGeneratedAt.checksum, 'generated_at must be excluded from report checksum');

const incompleteCorpus = mod.buildAdapterReplayFixtureCorpus({
  omit_fixture_ids: [
    'openai_style__metadata_success_replay',
    'anthropic_style__safe_transcript_comparison',
    'local_llm_style__capability_matrix_mapping'
  ]
});
const incompleteMatrix = mod.buildCoverageMatrix(incompleteCorpus);
const incompleteWarnings = mod.buildCoverageGapWarnings(incompleteMatrix);
assert.equal(incompleteMatrix.total_cells, 21);
assert.equal(incompleteMatrix.covered_cells, 18);
assert.equal(incompleteMatrix.gap_cells, 3);
assert.ok(incompleteMatrix.coverage_percentage < reportA.coverage_matrix.coverage_percentage);
assert.equal(incompleteWarnings.length, 3);
assert.ok(incompleteWarnings.some((warning) => warning.provider_family === 'openai_style' && warning.scenario_class === 'metadata_success_replay'));
assert.ok(incompleteWarnings.some((warning) => warning.provider_family === 'anthropic_style' && warning.scenario_class === 'safe_transcript_comparison'));
assert.ok(incompleteWarnings.some((warning) => warning.provider_family === 'local_llm_style' && warning.scenario_class === 'capability_matrix_mapping'));

const unsafe = [{
  fixture_id: 'unsafe_fixture',
  provider_family: 'openai_style',
  scenario_class: 'metadata_success_replay',
  access_token: 'unsafe',
  network_invocation_allowed: true,
  live_provider_execution_performed: false,
  live_source_fetching_performed: false,
  raw_request_body_included: false,
  raw_response_body_included: false,
  authorization_header_included: false,
  secret_material_included: false,
  safe_metadata_only: true
}];
const unsafeValidation = mod.validateCorpusSafety(unsafe);
assert.equal(unsafeValidation.ok, false);
assert.ok(unsafeValidation.forbidden_present.some((finding) => finding.includes('access_token')));
assert.ok(unsafeValidation.forbidden_present.some((finding) => finding.includes('network_invocation_allowed')));

const source = fs.readFileSync(NEW_MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${NEW_MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-fixture-corpus-coverage-matrix.js" defer'), 'index must load alpha.14 module');
assert.ok(index.includes('data-browser-qa="adapter-replay-fixture-corpus-coverage-matrix"'), 'index must expose alpha.14 browser QA card');
assert.ok(index.includes('Adapter Replay Fixture Corpus + Coverage Matrix'), 'index must expose alpha.14 visible copy');
assert.ok(index.includes('v1.4.0-alpha.14 Adapter Replay Fixture Corpus + Coverage Matrix'), 'index must expose alpha.14 version label');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(NEW_CHECK), `${gate} must run alpha.14 coverage matrix check`);
}
assert.ok(registry.syntax_matrix.files.includes(NEW_MODULE), 'syntax matrix must cover alpha.14 module');
assert.ok(registry.syntax_matrix.files.includes(NEW_CHECK), 'syntax matrix must cover alpha.14 check');
assert.ok([CURRENT_RUNTIME_SCOPE, 'adapter_replay_fixture_corpus_coverage_matrix','manual_provider_adapter_ux_compression_evidence_runtime_budget','handoff_productivity_runbook_gate', 'adapter_replay_insight_ux_operator_decision_surface', 'adapter_replay_review_pack_operator_handoff_export', 'source_to_brief_operator_continuity_console', 'targeted_hosted_evidence_capture', 'source_to_brief_operator_continuity_console', 'targeted_hosted_evidence_capture'].includes(registry.runtime_optimization.optimization_scope));
assert.ok([CURRENT_RUNTIME_SCOPE, CURRENT_VERSION, VERSION,'1.4.0-alpha.28', '1.4.0-alpha.43', '1.4.0-alpha.43'].includes(registry.runtime_optimization.version));

console.log('Adapter replay fixture corpus + coverage matrix checks passed.');
process.exit(0);
