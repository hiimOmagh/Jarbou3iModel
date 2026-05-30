/* Jarbou3i Research Engine evidence budget regression dashboard + evidence/runtime budget v1.4.0-alpha.22. */
/* Static guardrail metadata only. No provider calls, network calls, OAuth/token lifecycle, credential persistence, live source fetching, backend, storage, or source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.22';
  const MILESTONE = 'v1.4.0-alpha.22 — Alpha.21 Lock Completion + Handoff Productivity Command Center';
  const MODEL = 'manual_provider_adapter_ux_compression_evidence_runtime_budget.v1';
  const DASHBOARD_MODEL = 'evidence_budget_regression_dashboard.v1';
  const LOCKED_BASELINE = '1.4.0-alpha.14';
  const LOCKED_BASELINE_TITLE = 'v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix';
  const LOCKED_ALPHA15 = '1.4.0-alpha.15';
  const LOCKED_ALPHA15_TITLE = 'v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression';
  const LOCKED_ALPHA16 = '1.4.0-alpha.16';
  const LOCKED_ALPHA16_TITLE = 'v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement';
  const LOCKED_ALPHA16_RUN_ID = '26646993357';
  const LOCKED_ALPHA16_COMMIT = 'd40d2054060c14326c5871ec86bd7ef5d9aab2ed';
  const ADAPTER_REPLAY_CORPUS_MODULE = 'adapterReplayFixtureCorpusCoverageMatrix';

  const EVIDENCE_RUNTIME_BUDGET = Object.freeze({
    evidence_surface_budget_version: VERSION,
    locked_baseline: LOCKED_BASELINE,
    locked_baseline_title: LOCKED_BASELINE_TITLE,
    locked_alpha15_baseline: LOCKED_ALPHA15,
    locked_alpha15_baseline_title: LOCKED_ALPHA15_TITLE,
    locked_alpha16_baseline: LOCKED_ALPHA16,
    locked_alpha16_baseline_title: LOCKED_ALPHA16_TITLE,
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

  const LOCKED_ALPHA16_OBSERVED = Object.freeze({
    run_id: LOCKED_ALPHA16_RUN_ID,
    commit: LOCKED_ALPHA16_COMMIT,
    no_browser_checks: 146,
    browser_checks: 17,
    hosted_language_count: 3,
    hosted_surface_count: 13,
    visible_snapshot_rows: 39,
    hosted_evidence_passed: true,
    visible_text_snapshots_passed: true,
    evidence_matrix_passed_rows: 39,
    evidence_matrix_failed_rows: 0,
    artifact_identity_guard_passed: true,
    bundle_validation_passed: true
  });

  const BOUNDARY_FLAGS = Object.freeze({
    alpha16_lock_completion_only: true,
    evidence_budget_regression_dashboard_only: true,
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

  function buildBudgetStatus(budget = EVIDENCE_RUNTIME_BUDGET, observed = LOCKED_ALPHA16_OBSERVED) {
    return Object.freeze({
      browser_checks_over_budget: observed.browser_checks > budget.browser_check_budget_max,
      hosted_languages_match_budget: observed.hosted_language_count === budget.hosted_language_count_expected,
      hosted_surfaces_over_budget: observed.hosted_surface_count > budget.hosted_surface_count_expected_max,
      visible_snapshot_rows_over_budget: observed.visible_snapshot_rows > budget.visible_snapshot_rows_expected_max,
      hosted_evidence_passed: observed.hosted_evidence_passed === true,
      visible_text_snapshots_passed: observed.visible_text_snapshots_passed === true,
      evidence_matrix_complete: observed.evidence_matrix_passed_rows === budget.visible_snapshot_rows_expected_max && observed.evidence_matrix_failed_rows === 0,
      artifact_identity_guard_passed: observed.artifact_identity_guard_passed === true,
      bundle_validation_passed: observed.bundle_validation_passed === true
    });
  }

  function buildEvidenceBudgetRegressionDashboard(options = {}) {
    const generatedAt = typeof options.generated_at === 'string' && options.generated_at ? options.generated_at : '2026-05-29T00:00:00.000Z';
    const budget = Object.assign({}, EVIDENCE_RUNTIME_BUDGET, options.budget_overrides || {});
    const observed = Object.assign({}, LOCKED_ALPHA16_OBSERVED, options.observed_overrides || {});
    const boundary_flags = Object.assign({}, BOUNDARY_FLAGS, options.boundary_overrides || {});
    const budget_status = buildBudgetStatus(budget, observed);
    const report = {
      evidence_budget_regression_dashboard_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: DASHBOARD_MODEL,
      current_candidate: VERSION,
      current_candidate_title: MILESTONE,
      locked_alpha16_baseline: LOCKED_ALPHA16,
      locked_alpha16_baseline_title: LOCKED_ALPHA16_TITLE,
      locked_alpha16_run_id: LOCKED_ALPHA16_RUN_ID,
      locked_alpha16_commit: LOCKED_ALPHA16_COMMIT,
      adapter_replay_corpus_module_required: ADAPTER_REPLAY_CORPUS_MODULE,
      adapter_replay_corpus_preserved: true,
      budget,
      observed,
      budget_status,
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

  function validateEvidenceBudgetRegressionDashboard(report) {
    const failures = [];
    if (!report || typeof report !== 'object') failures.push('report_missing');
    const candidate = report || {};
    if (candidate.safe_metadata_only !== true) failures.push('safe_metadata_only_not_true');
    if (candidate.network_invocation_allowed !== false) failures.push('network_invocation_not_false');
    if (candidate.hidden_network_calls_allowed !== false) failures.push('hidden_network_calls_not_false');
    if (candidate.provider_execution_performed !== false) failures.push('provider_execution_not_false');
    if (candidate.live_fetching_performed !== false) failures.push('live_fetching_not_false');
    if (candidate.credential_persistence_allowed !== false) failures.push('credential_persistence_not_false');
    const status = candidate.budget_status || {};
    if (status.browser_checks_over_budget !== false) failures.push('browser_checks_over_budget');
    if (status.hosted_languages_match_budget !== true) failures.push('hosted_language_budget_mismatch');
    if (status.hosted_surfaces_over_budget !== false) failures.push('hosted_surfaces_over_budget');
    if (status.visible_snapshot_rows_over_budget !== false) failures.push('visible_snapshot_rows_over_budget');
    return Object.freeze({ ok: failures.length === 0, failures });
  }

  function buildEvidenceRuntimeBudgetReport(options = {}) {
    const dashboard = buildEvidenceBudgetRegressionDashboard(options);
    const report = {
      evidence_runtime_budget_report_version: VERSION,
      generated_at: dashboard.generated_at,
      milestone: MILESTONE,
      model: MODEL,
      locked_baseline: LOCKED_BASELINE,
      locked_baseline_title: LOCKED_BASELINE_TITLE,
      locked_alpha16_baseline: LOCKED_ALPHA16,
      locked_alpha16_baseline_title: LOCKED_ALPHA16_TITLE,
      current_candidate: VERSION,
      current_candidate_title: MILESTONE,
      adapter_replay_corpus_module_required: ADAPTER_REPLAY_CORPUS_MODULE,
      adapter_replay_corpus_preserved: true,
      budget: dashboard.budget,
      boundary_flags: dashboard.boundary_flags,
      budget_status: dashboard.budget_status,
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
    LOCKED_ALPHA15,
    LOCKED_ALPHA15_TITLE,
    LOCKED_ALPHA16,
    LOCKED_ALPHA16_TITLE,
    LOCKED_ALPHA16_RUN_ID,
    LOCKED_ALPHA16_COMMIT,
    ADAPTER_REPLAY_CORPUS_MODULE,
    EVIDENCE_RUNTIME_BUDGET,
    LOCKED_ALPHA16_OBSERVED,
    BOUNDARY_FLAGS,
    deterministicChecksum,
    buildBudgetStatus,
    buildEvidenceRuntimeBudgetReport
  });

  root.evidenceBudgetRegressionDashboard = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL: DASHBOARD_MODEL,
    LOCKED_ALPHA16,
    LOCKED_ALPHA16_TITLE,
    LOCKED_ALPHA16_RUN_ID,
    LOCKED_ALPHA16_COMMIT,
    EVIDENCE_RUNTIME_BUDGET,
    LOCKED_ALPHA16_OBSERVED,
    BOUNDARY_FLAGS,
    deterministicChecksum,
    buildBudgetStatus,
    buildEvidenceBudgetRegressionDashboard,
    validateEvidenceBudgetRegressionDashboard
  });
})(typeof window !== 'undefined' ? window : globalThis);
