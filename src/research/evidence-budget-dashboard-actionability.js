/* Jarbou3i Research Engine evidence budget dashboard actionability v1.4.0-alpha.18. */
/* Static metadata-only review surface. No provider calls, network calls, OAuth/token lifecycle, credential persistence, live source fetching, backend, storage, or source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.18';
  const MILESTONE = 'v1.4.0-alpha.18 — Alpha.17 Lock Completion + Evidence Budget Dashboard Actionability';
  const LOCKED_BASELINE = '1.4.0-alpha.17';
  const LOCKED_BASELINE_TITLE = 'v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard';
  const LOCKED_BASELINE_RUN_ID = '26655823066';
  const LOCKED_BASELINE_COMMIT = 'fef004abd43511cca247debc417917a4c8fb1c27';
  const EVIDENCE_BUDGET_BASELINE = '1.4.0-alpha.16';
  const REGRESSION_DASHBOARD_BASELINE = '1.4.0-alpha.17';
  const MODEL = 'evidence_budget_dashboard_actionability.v1';

  const STATUS = Object.freeze({
    pass: 'pass',
    warn: 'warn',
    fail: 'fail',
    review_required: 'review_required'
  });

  const BUDGET_THRESHOLDS = Object.freeze({
    browser_check_budget_max: 20,
    hosted_language_count_expected: 3,
    hosted_surface_count_expected_max: 13,
    visible_snapshot_rows_expected_max: 39,
    evidence_matrix_rows_expected: 39,
    horizontal_overflow_max_px_expected: 0
  });

  const LOCKED_ALPHA17_OBSERVED = Object.freeze({
    run_id: LOCKED_BASELINE_RUN_ID,
    commit: LOCKED_BASELINE_COMMIT,
    no_browser_checks: 146,
    browser_checks: 17,
    hosted_language_count: 3,
    hosted_surface_count: 13,
    visible_snapshot_rows: 39,
    evidence_matrix_passed_rows: 39,
    evidence_matrix_failed_rows: 0,
    horizontal_overflow_max_px: 0,
    localization_passed: true,
    artifact_identity_guard_passed: true,
    bundle_validation_passed: true,
    hosted_evidence_passed: true,
    visible_text_snapshots_passed: true
  });

  const SAFETY_BOUNDARY_FLAGS = Object.freeze({
    actionability_layer_only: true,
    static_metadata_only: true,
    evidence_budget_dashboard_actionability_only: true,
    runtime_budget_policy: 'guardrail_only',
    no_dynamic_browser_timing_collection_added: true,
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

  const FORBIDDEN_FIELD_GROUPS = Object.freeze([
    ['raw','credentials'],
    ['raw','tokens'],
    ['raw','api','keys'],
    ['authorization','headers'],
    ['authorization','header'],
    ['raw','request','body'],
    ['raw','response','body'],
    ['raw','source','fetch','results'],
    ['raw','network','trace'],
    ['browser','session','secrets'],
    ['provider','secret','value'],
    ['access','token'],
    ['refresh','token'],
    ['api','key'],
    ['bearer','token']
  ]);

  function forbiddenFieldNames() {
    return FORBIDDEN_FIELD_GROUPS.map((parts) => parts.join('_'));
  }

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

  function evaluateBudgetStatus(value, threshold, mode = 'max') {
    if (value === undefined || value === null || Number.isNaN(Number(value))) return STATUS.review_required;
    const numericValue = Number(value);
    const numericThreshold = Number(threshold);
    if (mode === 'exact') return numericValue === numericThreshold ? STATUS.pass : STATUS.fail;
    if (mode === 'boolean') return value === true ? STATUS.pass : STATUS.fail;
    if (mode === 'zero') return numericValue === numericThreshold ? STATUS.pass : STATUS.fail;
    if (numericValue > numericThreshold) return STATUS.fail;
    if (mode === 'max_warn_near' && numericThreshold > 0 && numericValue >= Math.ceil(numericThreshold * 0.9)) return STATUS.warn;
    return STATUS.pass;
  }

  function includesStatus(statusSummary, status) {
    return Object.keys(statusSummary || {}).some((key) => statusSummary[key] === status);
  }

  function deriveOverallStatus(statusSummary) {
    if (!statusSummary || Object.keys(statusSummary).length === 0) return STATUS.review_required;
    if (includesStatus(statusSummary, STATUS.fail)) return STATUS.fail;
    if (includesStatus(statusSummary, STATUS.review_required)) return STATUS.review_required;
    if (includesStatus(statusSummary, STATUS.warn)) return STATUS.warn;
    return STATUS.pass;
  }

  function buildStatusSummary(observed, thresholds) {
    if (!observed || typeof observed !== 'object') {
      return Object.freeze({
        browser_check_status: STATUS.review_required,
        hosted_language_status: STATUS.review_required,
        hosted_surface_status: STATUS.review_required,
        visible_snapshot_row_status: STATUS.review_required,
        evidence_matrix_status: STATUS.review_required,
        horizontal_overflow_status: STATUS.review_required,
        localization_status: STATUS.review_required,
        artifact_identity_status: STATUS.review_required,
        overall_dashboard_status: STATUS.review_required
      });
    }
    const browserStatus = evaluateBudgetStatus(observed.browser_checks, thresholds.browser_check_budget_max, observed.warn_near_budget === true ? 'max_warn_near' : 'max');
    const surfaceStatus = evaluateBudgetStatus(observed.hosted_surface_count, thresholds.hosted_surface_count_expected_max, observed.warn_near_budget === true ? 'max_warn_near' : 'max');
    const rowStatus = evaluateBudgetStatus(observed.visible_snapshot_rows, thresholds.visible_snapshot_rows_expected_max, observed.warn_near_budget === true ? 'max_warn_near' : 'max');
    const evidenceMatrixStatus = observed.evidence_matrix_failed_rows === 0
      ? evaluateBudgetStatus(observed.evidence_matrix_passed_rows, thresholds.evidence_matrix_rows_expected, 'exact')
      : STATUS.fail;
    const statusSummary = {
      browser_check_status: browserStatus,
      hosted_language_status: evaluateBudgetStatus(observed.hosted_language_count, thresholds.hosted_language_count_expected, 'exact'),
      hosted_surface_status: surfaceStatus,
      visible_snapshot_row_status: rowStatus,
      evidence_matrix_status: evidenceMatrixStatus,
      horizontal_overflow_status: evaluateBudgetStatus(observed.horizontal_overflow_max_px, thresholds.horizontal_overflow_max_px_expected, 'zero'),
      localization_status: evaluateBudgetStatus(observed.localization_passed === true && observed.visible_text_snapshots_passed === true, true, 'boolean'),
      artifact_identity_status: evaluateBudgetStatus(observed.artifact_identity_guard_passed === true && observed.bundle_validation_passed === true, true, 'boolean')
    };
    statusSummary.overall_dashboard_status = deriveOverallStatus(statusSummary);
    return Object.freeze(statusSummary);
  }

  function buildDashboardActions(statusReport) {
    const overall = statusReport && statusReport.overall_dashboard_status;
    if (overall === STATUS.pass) return Object.freeze(['lock_review_ready']);
    if (overall === STATUS.warn) return Object.freeze(['review_budget_pressure_before_lock']);
    if (overall === STATUS.fail) return Object.freeze(['block_lock_until_evidence_budget_regression_fixed']);
    return Object.freeze(['capture_current_evidence_before_lock']);
  }

  function walkForbiddenFields(value, path, findings) {
    if (!value || typeof value !== 'object') return;
    const forbidden = new Set(forbiddenFieldNames());
    for (const key of Object.keys(value)) {
      const childPath = path ? `${path}.${key}` : key;
      const normalized = String(key).toLowerCase();
      if (forbidden.has(normalized)) findings.push(childPath);
      walkForbiddenFields(value[key], childPath, findings);
    }
  }

  function validateDashboardActionabilitySafety(report) {
    const failures = [];
    const forbidden_present = [];
    if (!report || typeof report !== 'object') failures.push('report_missing');
    const candidate = report || {};
    walkForbiddenFields(candidate, '', forbidden_present);
    if (forbidden_present.length) failures.push('forbidden_field_present');
    if (candidate.safe_metadata_only !== true) failures.push('safe_metadata_only_not_true');
    if (candidate.network_invocation_allowed !== false) failures.push('network_invocation_not_false');
    if (candidate.live_provider_execution_performed !== false) failures.push('provider_execution_not_false');
    if (candidate.live_source_fetching_performed !== false) failures.push('live_source_fetching_not_false');
    if (candidate.credential_persistence_allowed !== false) failures.push('credential_persistence_not_false');
    if (candidate.automatic_source_verification_claimed !== false) failures.push('automatic_source_verification_not_false');
    if (candidate.automatic_signoff_performed !== false) failures.push('automatic_signoff_not_false');
    if (candidate.automatic_export_lock_performed !== false) failures.push('automatic_export_lock_not_false');
    if (candidate.publication_permission_claimed !== false) failures.push('publication_permission_not_false');
    return Object.freeze({ ok: failures.length === 0, failures, forbidden_present });
  }

  function buildEvidenceBudgetDashboardActionability(options = {}) {
    const generatedAt = typeof options.generated_at === 'string' && options.generated_at ? options.generated_at : '2026-05-29T00:00:00.000Z';
    const thresholds = Object.assign({}, BUDGET_THRESHOLDS, options.budget_thresholds || {});
    const observedEvidence = Object.prototype.hasOwnProperty.call(options, 'observed_evidence')
      ? options.observed_evidence
      : Object.assign({}, LOCKED_ALPHA17_OBSERVED, options.observed_overrides || {});
    const safetyBoundaryFlags = Object.assign({}, SAFETY_BOUNDARY_FLAGS, options.safety_boundary_overrides || {});
    const statusSummary = buildStatusSummary(observedEvidence, thresholds);
    const recommendedOperatorActions = buildDashboardActions(statusSummary);
    const report = {
      evidence_budget_dashboard_actionability_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      locked_baseline: LOCKED_BASELINE,
      locked_baseline_title: LOCKED_BASELINE_TITLE,
      locked_baseline_run_id: LOCKED_BASELINE_RUN_ID,
      locked_baseline_commit: LOCKED_BASELINE_COMMIT,
      budget_baseline: EVIDENCE_BUDGET_BASELINE,
      regression_dashboard_baseline: REGRESSION_DASHBOARD_BASELINE,
      budget_thresholds: thresholds,
      observed_evidence: observedEvidence || null,
      status_summary: statusSummary,
      recommended_operator_actions: recommendedOperatorActions,
      safety_boundary_flags: safetyBoundaryFlags,
      safe_metadata_only: true,
      can_execute_now: false,
      network_invocation_allowed: false,
      live_provider_execution_performed: false,
      live_source_fetching_performed: false,
      credential_persistence_allowed: false,
      automatic_source_verification_claimed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false
    };
    report.checksum = deterministicChecksum(Object.assign({}, report, { generated_at: undefined, checksum: undefined }));
    return Object.freeze(report);
  }

  root.evidenceBudgetDashboardActionability = Object.freeze({
    VERSION,
    MILESTONE,
    LOCKED_BASELINE,
    LOCKED_BASELINE_TITLE,
    LOCKED_BASELINE_RUN_ID,
    LOCKED_BASELINE_COMMIT,
    EVIDENCE_BUDGET_BASELINE,
    REGRESSION_DASHBOARD_BASELINE,
    MODEL,
    STATUS,
    BUDGET_THRESHOLDS,
    LOCKED_ALPHA17_OBSERVED,
    SAFETY_BOUNDARY_FLAGS,
    deterministicChecksum,
    evaluateBudgetStatus,
    buildDashboardActions,
    validateDashboardActionabilitySafety,
    buildEvidenceBudgetDashboardActionability
  });
})(typeof window !== 'undefined' ? window : globalThis);
