/* Jarbou3i Research Engine evidence surface budget enforcement + evidence/runtime budget v1.4.0-alpha.16. */
/* Static guardrail metadata only. No provider calls, network calls, OAuth/token lifecycle, credential persistence, live source fetching, backend, storage, or source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.16';
  const MILESTONE = 'v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement';
  const MODEL = 'manual_provider_adapter_ux_compression_evidence_runtime_budget.v1';
  const LOCKED_BASELINE = '1.4.0-alpha.14';
  const LOCKED_BASELINE_TITLE = 'v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix';
  const ADAPTER_REPLAY_CORPUS_MODULE = 'adapterReplayFixtureCorpusCoverageMatrix';

  const EVIDENCE_RUNTIME_BUDGET = Object.freeze({
    evidence_surface_budget_version: VERSION,
    locked_baseline: LOCKED_BASELINE,
    locked_baseline_title: LOCKED_BASELINE_TITLE,
    browser_check_budget_max: 20,
    hosted_language_count_expected: 3,
    hosted_surface_count_expected_max: 13,
    visible_snapshot_rows_expected_max: 39,
    runtime_budget_policy: 'guardrail_only',
    runtime_budget_enforced_without_network: true,
    provider_execution_performed: false,
    live_fetching_performed: false,
    credential_persistence_allowed: false
  });

  const BOUNDARY_FLAGS = Object.freeze({
    ux_compression_only: true,
    roadmap_lock_completion_only: true,
    evidence_runtime_budget_guard_only: true,
    static_metadata_only: true,
    runtime_budget_policy: 'guardrail_only',
    network_invocation_allowed: false,
    hidden_network_calls_allowed: false,
    live_provider_execution_enabled: false,
    live_provider_execution_performed: false,
    live_source_fetching_enabled: false,
    live_source_fetching_performed: false,
    real_oauth_token_lifecycle_enabled: false,
    real_api_credentials_stored: false,
    real_tokens_stored: false,
    credential_persistence_allowed: false,
    backend_behavior_changed: false,
    storage_behavior_changed: false,
    source_behavior_changed: false,
    automatic_source_verification_claimed: false,
    provider_suggested_source_auto_acceptance: false,
    automatic_signoff_performed: false,
    automatic_export_lock_performed: false,
    publication_permission_claimed: false
  });

  function stableStringify(value) {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
    return '{' + Object.keys(value).sort().map((key) => JSON.stringify(key) + ':' + stableStringify(value[key])).join(',') + '}';
  }

  function deterministicChecksum(value) {
    const body = stableStringify(value);
    let hash = 2166136261;
    for (let index = 0; index < body.length; index += 1) {
      hash ^= body.charCodeAt(index);
      hash = Math.imul(hash, 16777619) >>> 0;
    }
    return `fnv1a32:${hash.toString(16).padStart(8, '0')}`;
  }

  function buildEvidenceRuntimeBudgetReport(options = {}) {
    const generatedAt = typeof options.generated_at === 'string' && options.generated_at ? options.generated_at : '2026-05-29T00:00:00.000Z';
    const budget = Object.assign({}, EVIDENCE_RUNTIME_BUDGET, options.budget_overrides || {});
    const boundary_flags = Object.assign({}, BOUNDARY_FLAGS, options.boundary_overrides || {});
    const report = {
      evidence_runtime_budget_report_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      locked_baseline: LOCKED_BASELINE,
      locked_baseline_title: LOCKED_BASELINE_TITLE,
      current_candidate: VERSION,
      current_candidate_title: MILESTONE,
      adapter_replay_corpus_module_required: ADAPTER_REPLAY_CORPUS_MODULE,
      adapter_replay_corpus_preserved: true,
      budget,
      boundary_flags,
      safe_metadata_only: true,
      can_execute_now: false,
      network_invocation_allowed: false,
      hidden_network_calls_allowed: false,
      provider_execution_performed: false,
      live_fetching_performed: false,
      credential_persistence_allowed: false
    };
    report.checksum = deterministicChecksum(Object.assign({}, report, { generated_at: undefined, checksum: undefined }));
    return Object.freeze(report);
  }

  root.manualProviderAdapterUxCompressionEvidenceRuntimeBudget = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    LOCKED_BASELINE,
    LOCKED_BASELINE_TITLE,
    ADAPTER_REPLAY_CORPUS_MODULE,
    EVIDENCE_RUNTIME_BUDGET,
    BOUNDARY_FLAGS,
    deterministicChecksum,
    buildEvidenceRuntimeBudgetReport
  });
})(typeof window !== 'undefined' ? window : globalThis);
