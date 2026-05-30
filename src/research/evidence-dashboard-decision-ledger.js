/* Jarbou3i Research Engine evidence dashboard decision ledger v1.4.0-alpha.22. */
/* Static metadata-only review ledger. No provider calls, network calls, OAuth/token lifecycle, credential persistence, live source fetching, backend, storage, or source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.22';
  const MILESTONE = 'v1.4.0-alpha.22 — Alpha.21 Lock Completion + Handoff Productivity Command Center';
  const LOCKED_BASELINE = '1.4.0-alpha.22';
  const LOCKED_BASELINE_TITLE = 'v1.4.0-alpha.22 — Alpha.21 Lock Completion + Handoff Productivity Command Center';
  const LOCKED_BASELINE_RUN_ID = '26660959763';
  const LOCKED_BASELINE_COMMIT = '4e2c852fa0568fcc12881d7565ba9fd50844e0c4';
  const ACTIONABILITY_BASELINE = '1.4.0-alpha.22';
  const REGRESSION_DASHBOARD_BASELINE = '1.4.0-alpha.17';
  const EVIDENCE_BUDGET_BASELINE = '1.4.0-alpha.16';
  const MODEL = 'evidence_dashboard_decision_ledger.v1';

  const STATUS = Object.freeze({
    pass: 'pass',
    warn: 'warn',
    fail: 'fail',
    review_required: 'review_required'
  });

  const DECISION_STATE = Object.freeze({
    lock_review_ready: 'lock_review_ready',
    review_budget_pressure_before_lock: 'review_budget_pressure_before_lock',
    block_lock_until_evidence_budget_regression_fixed: 'block_lock_until_evidence_budget_regression_fixed',
    capture_current_evidence_before_lock: 'capture_current_evidence_before_lock'
  });

  const LOCKED_ALPHA18_OBSERVED = Object.freeze({
    run_id: LOCKED_BASELINE_RUN_ID,
    commit: LOCKED_BASELINE_COMMIT,
    no_browser_checks: 147,
    browser_checks: 17,
    hosted_language_count: 3,
    hosted_surface_count: 13,
    visible_snapshot_rows: 39,
    evidence_matrix_passed_rows: 39,
    evidence_matrix_failed_rows: 0,
    horizontal_overflow_max_px: 0,
    hosted_evidence_passed: true,
    evidence_matrix_passed: true,
    visible_text_snapshots_passed: true,
    artifact_identity_guard_passed: true,
    bundle_validation_passed: true,
    lockable: true
  });

  const SAFETY_BOUNDARY_FLAGS = Object.freeze({
    decision_ledger_only: true,
    static_metadata_only: true,
    actionability_interpretation_only: true,
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

  function normalizeStatus(input) {
    const status = input && typeof input === 'object'
      ? (input.overall_dashboard_status || input.overall_status || input.status_summary?.overall_dashboard_status || input.status)
      : input;
    if (Object.values(STATUS).includes(status)) return status;
    return STATUS.review_required;
  }

  function decisionStateForStatus(status) {
    if (status === STATUS.pass) return DECISION_STATE.lock_review_ready;
    if (status === STATUS.warn) return DECISION_STATE.review_budget_pressure_before_lock;
    if (status === STATUS.fail) return DECISION_STATE.block_lock_until_evidence_budget_regression_fixed;
    return DECISION_STATE.capture_current_evidence_before_lock;
  }

  function buildLedgerEntries(status, action) {
    const base = [
      {
        entry_id: 'ledger_001_capture_evidence_snapshot',
        phase: 'evidence_snapshot',
        status: status === STATUS.review_required ? STATUS.review_required : STATUS.pass,
        operator_action: status === STATUS.review_required ? DECISION_STATE.capture_current_evidence_before_lock : 'evidence_snapshot_available',
        operator_decision_required: status === STATUS.review_required,
        automatic_transition_allowed: false
      },
      {
        entry_id: 'ledger_002_interpret_dashboard_status',
        phase: 'dashboard_interpretation',
        status,
        operator_action: action,
        operator_decision_required: true,
        automatic_transition_allowed: false
      },
      {
        entry_id: 'ledger_003_confirm_boundaries',
        phase: 'boundary_confirmation',
        status: status === STATUS.fail ? STATUS.fail : STATUS.pass,
        operator_action: status === STATUS.fail ? DECISION_STATE.block_lock_until_evidence_budget_regression_fixed : 'confirm_no_behavior_expansion',
        operator_decision_required: true,
        automatic_transition_allowed: false
      },
      {
        entry_id: 'ledger_004_lock_handoff_decision',
        phase: 'lock_handoff',
        status,
        operator_action: action,
        operator_decision_required: true,
        automatic_transition_allowed: false
      }
    ];
    return Object.freeze(base.map((entry) => Object.freeze(Object.assign({}, entry, {
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false,
      checksum: deterministicChecksum({
        entry_id: entry.entry_id,
        phase: entry.phase,
        status: entry.status,
        operator_action: entry.operator_action,
        operator_decision_required: entry.operator_decision_required,
        automatic_transition_allowed: entry.automatic_transition_allowed
      })
    }))));
  }

  function buildDecisionSummary(status, action) {
    return Object.freeze({
      dashboard_status: status,
      decision_state: action,
      operator_review_required: true,
      lock_review_ready: action === DECISION_STATE.lock_review_ready,
      budget_pressure_requires_review: action === DECISION_STATE.review_budget_pressure_before_lock,
      lock_blocked: action === DECISION_STATE.block_lock_until_evidence_budget_regression_fixed,
      evidence_capture_required: action === DECISION_STATE.capture_current_evidence_before_lock,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false
    });
  }

  function walkForbiddenFields(value, path, findings) {
    if (!value || typeof value !== 'object') return;
    const forbidden = new Set(forbiddenFieldNames());
    for (const key of Object.keys(value)) {
      const nextPath = path ? `${path}.${key}` : key;
      if (forbidden.has(key)) findings.push(nextPath);
      walkForbiddenFields(value[key], nextPath, findings);
    }
  }

  function validateDashboardDecisionLedgerSafety(report) {
    const forbiddenPresent = [];
    walkForbiddenFields(report, '', forbiddenPresent);
    const flags = report && report.safety_boundary_flags ? report.safety_boundary_flags : {};
    const unsafeFlags = [];
    for (const key of [
      'network_invocation_allowed',
      'hidden_network_calls_allowed',
      'live_provider_execution_enabled',
      'live_provider_execution_performed',
      'live_source_fetching_enabled',
      'live_source_fetching_performed',
      'real_oauth_token_lifecycle_enabled',
      'real_api_credentials_stored',
      'real_tokens_stored',
      'credential_persistence_allowed',
      'backend_behavior_changed',
      'storage_behavior_changed',
      'source_behavior_changed',
      'automatic_source_verification_claimed',
      'provider_suggested_source_auto_acceptance',
      'automatic_signoff_performed',
      'automatic_export_lock_performed',
      'publication_permission_claimed'
    ]) {
      if (flags[key] !== false) unsafeFlags.push(key);
    }
    if (report && report.safe_metadata_only !== true) unsafeFlags.push('safe_metadata_only');
    if (report && report.can_execute_now !== false) unsafeFlags.push('can_execute_now');
    return Object.freeze({ ok: forbiddenPresent.length === 0 && unsafeFlags.length === 0, forbidden_present: forbiddenPresent, unsafe_flags: unsafeFlags });
  }

  function buildEvidenceDashboardDecisionLedger(options = {}) {
    const generatedAt = options.generated_at || '2026-05-29T00:00:00.000Z';
    const dashboardInput = options.actionability_report || options.status_summary || options.dashboard_status || null;
    const status = normalizeStatus(dashboardInput);
    const action = decisionStateForStatus(status);
    const ledgerEntries = buildLedgerEntries(status, action);
    const decisionSummary = buildDecisionSummary(status, action);
    const report = {
      evidence_dashboard_decision_ledger_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      locked_baseline: LOCKED_BASELINE,
      locked_baseline_title: LOCKED_BASELINE_TITLE,
      locked_baseline_run_id: LOCKED_BASELINE_RUN_ID,
      locked_baseline_commit: LOCKED_BASELINE_COMMIT,
      actionability_baseline: ACTIONABILITY_BASELINE,
      regression_dashboard_baseline: REGRESSION_DASHBOARD_BASELINE,
      evidence_budget_baseline: EVIDENCE_BUDGET_BASELINE,
      model: MODEL,
      locked_alpha18_observed: LOCKED_ALPHA18_OBSERVED,
      actionability_input_status: status,
      decision_summary: decisionSummary,
      decision_ledger_entries: ledgerEntries,
      recommended_operator_actions: Object.freeze([action]),
      safety_boundary_flags: SAFETY_BOUNDARY_FLAGS,
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
    report.checksum = deterministicChecksum(Object.assign({}, report, { generated_at: 'deterministic', checksum: undefined }));
    return Object.freeze(report);
  }

  root.evidenceDashboardDecisionLedger = Object.freeze({
    VERSION,
    MILESTONE,
    LOCKED_BASELINE,
    LOCKED_BASELINE_TITLE,
    LOCKED_BASELINE_RUN_ID,
    LOCKED_BASELINE_COMMIT,
    ACTIONABILITY_BASELINE,
    REGRESSION_DASHBOARD_BASELINE,
    EVIDENCE_BUDGET_BASELINE,
    MODEL,
    STATUS,
    DECISION_STATE,
    LOCKED_ALPHA18_OBSERVED,
    SAFETY_BOUNDARY_FLAGS,
    deterministicChecksum,
    normalizeStatus,
    decisionStateForStatus,
    buildLedgerEntries,
    buildDecisionSummary,
    buildEvidenceDashboardDecisionLedger,
    validateDashboardDecisionLedgerSafety
  });
})(typeof window !== 'undefined' ? window : globalThis);
