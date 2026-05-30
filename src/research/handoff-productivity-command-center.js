/* Jarbou3i Research Engine handoff productivity runbook gate v1.4.0-alpha.23. */
/* Static metadata-only productivity routing. No provider calls, network calls, OAuth/token lifecycle, credential persistence, live source fetching, backend, storage, or source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.23';
  const MILESTONE = 'v1.4.0-alpha.23 — Alpha.22 Lock Completion + Handoff Productivity Runbook Gate';
  const LOCKED_BASELINE = '1.4.0-alpha.21';
  const LOCKED_BASELINE_TITLE = 'v1.4.0-alpha.21 — Evidence Handoff Readiness Checklist';
  const LOCKED_BASELINE_RUN_ID = '26681464045';
  const LOCKED_BASELINE_COMMIT = '81675392a202ff1b175a8de62f6dbcd10962395e';
  const LOCKED_BASELINE_BUNDLE_SHA256 = 'a0be3068eedf344e25bb9bba0e7864790cb09fb0b0815c42a9edaca9185fcbfe';
  const READINESS_CHECKLIST_BASELINE = '1.4.0-alpha.21';
  const HANDOFF_AUDIT_BASELINE = '1.4.0-alpha.20';
  const DECISION_LEDGER_BASELINE = '1.4.0-alpha.19';
  const ACTIONABILITY_BASELINE = '1.4.0-alpha.18';
  const REGRESSION_DASHBOARD_BASELINE = '1.4.0-alpha.17';
  const EVIDENCE_BUDGET_BASELINE = '1.4.0-alpha.16';
  const MODEL = 'handoff_productivity_runbook_gate.v1';

  const STATUS = Object.freeze({
    pass: 'pass',
    warn: 'warn',
    fail: 'fail',
    review_required: 'review_required'
  });

  const PRODUCTIVITY_ACTION = Object.freeze({
    execute_lock_review_sequence: 'execute_lock_review_sequence',
    triage_budget_pressure_first: 'triage_budget_pressure_first',
    repair_blocking_handoff_defects_first: 'repair_blocking_handoff_defects_first',
    capture_missing_handoff_evidence_first: 'capture_missing_handoff_evidence_first'
  });

  const LOCKED_ALPHA21_OBSERVED = Object.freeze({
    run_id: LOCKED_BASELINE_RUN_ID,
    commit: LOCKED_BASELINE_COMMIT,
    bundle_sha256: LOCKED_BASELINE_BUNDLE_SHA256,
    no_browser_checks: 150,
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

  const REQUIRED_PRODUCTIVITY_SIGNALS = Object.freeze([
    'handoff_readiness_status',
    'decision_ledger_status',
    'dashboard_actionability_status',
    'evidence_budget_status',
    'localization_snapshot_status',
    'artifact_identity_status',
    'operator_review_path_status'
  ]);

  const SAFETY_BOUNDARY_FLAGS = Object.freeze({
    productivity_command_center_only: true,
    static_metadata_only: true,
    operator_prioritization_only: true,
    automatic_transition_allowed: false,
    operator_review_required: true,
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

  function forbiddenFieldNames() { return FORBIDDEN_FIELD_GROUPS.map((parts) => parts.join('_')); }

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

  function normalizeStatus(value) {
    if (value === STATUS.pass || value === true) return STATUS.pass;
    if (value === STATUS.warn) return STATUS.warn;
    if (value === STATUS.fail || value === false) return STATUS.fail;
    return STATUS.review_required;
  }

  function statusPriority(status) {
    if (status === STATUS.fail) return 3;
    if (status === STATUS.review_required) return 2;
    if (status === STATUS.warn) return 1;
    return 0;
  }

  function aggregateStatuses(statuses) {
    return statuses.reduce((current, next) => statusPriority(next) > statusPriority(current) ? next : current, STATUS.pass);
  }

  function actionForStatus(status) {
    if (status === STATUS.pass) return PRODUCTIVITY_ACTION.execute_lock_review_sequence;
    if (status === STATUS.warn) return PRODUCTIVITY_ACTION.triage_budget_pressure_first;
    if (status === STATUS.fail) return PRODUCTIVITY_ACTION.repair_blocking_handoff_defects_first;
    return PRODUCTIVITY_ACTION.capture_missing_handoff_evidence_first;
  }

  function evaluateProductivitySignal(signalId, evidence = {}) {
    const provided = evidence[signalId];
    const status = normalizeStatus(provided && typeof provided === 'object' ? provided.status : provided);
    const minutesSavedEstimate = provided && typeof provided === 'object' && Number.isFinite(provided.minutes_saved_estimate) ? Math.max(0, provided.minutes_saved_estimate) : 0;
    const note = provided && typeof provided === 'object' ? provided.note || null : null;
    return Object.freeze({
      signal_id: signalId,
      status,
      minutes_saved_estimate: minutesSavedEstimate,
      note,
      operator_review_required: true,
      automatic_transition_allowed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false,
      checksum: deterministicChecksum({ signal_id:signalId, status, minutes_saved_estimate:minutesSavedEstimate, operator_review_required:true })
    });
  }

  function buildProductivitySignals(options = {}) {
    const evidence = options.current_evidence || {};
    return Object.freeze(REQUIRED_PRODUCTIVITY_SIGNALS.map((signalId) => evaluateProductivitySignal(signalId, evidence)));
  }

  function buildOperatorPriorityQueue(signals) {
    const ordered = [...signals].sort((left, right) => {
      const priorityDelta = statusPriority(right.status) - statusPriority(left.status);
      if (priorityDelta !== 0) return priorityDelta;
      return right.minutes_saved_estimate - left.minutes_saved_estimate;
    });
    return Object.freeze(ordered.map((signal, index) => Object.freeze({
      rank: index + 1,
      signal_id: signal.signal_id,
      status: signal.status,
      minutes_saved_estimate: signal.minutes_saved_estimate,
      operator_action: actionForStatus(signal.status),
      automatic_transition_allowed: false,
      checksum: deterministicChecksum({ rank:index + 1, signal_id:signal.signal_id, status:signal.status, action:actionForStatus(signal.status) })
    })));
  }

  function buildProductivityActions(status, queue) {
    const actions = [actionForStatus(status)];
    if (status === STATUS.pass) actions.push('review_lock_bundle_then_capture_alpha22_evidence');
    if (status === STATUS.warn) actions.push('resolve_or_accept_budget_pressure_before_lock');
    if (status === STATUS.fail) actions.push('repair_failed_handoff_productivity_signals_before_lock');
    if (status === STATUS.review_required) actions.push('capture_current_handoff_productivity_evidence_before_lock');
    return Object.freeze({
      actions:Object.freeze(actions),
      top_priority_signal: queue[0] ? queue[0].signal_id : null,
      blocking_signals:Object.freeze(queue.filter((item) => item.status === STATUS.fail).map((item) => item.signal_id)),
      review_required_signals:Object.freeze(queue.filter((item) => item.status === STATUS.review_required).map((item) => item.signal_id))
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

  function validateProductivityCommandCenterSafety(report) {
    const forbiddenPresent = [];
    walkForbiddenFields(report, '', forbiddenPresent);
    const flags = report && report.safety_boundary_flags ? report.safety_boundary_flags : {};
    const unsafeFlags = [];
    for (const key of [
      'automatic_transition_allowed',
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

  function buildHandoffProductivityCommandCenter(options = {}) {
    const generatedAt = options.generated_at || '2026-05-30T00:00:00.000Z';
    const signals = buildProductivitySignals(options);
    const overallStatus = aggregateStatuses(signals.map((signal) => signal.status));
    const priorityQueue = buildOperatorPriorityQueue(signals);
    const actionPlan = buildProductivityActions(overallStatus, priorityQueue);
    const totalEstimatedMinutesSaved = signals.reduce((sum, signal) => sum + signal.minutes_saved_estimate, 0);
    const report = {
      handoff_productivity_runbook_gate_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      locked_baseline: LOCKED_BASELINE,
      locked_baseline_title: LOCKED_BASELINE_TITLE,
      locked_baseline_run_id: LOCKED_BASELINE_RUN_ID,
      locked_baseline_commit: LOCKED_BASELINE_COMMIT,
      locked_baseline_bundle_sha256: LOCKED_BASELINE_BUNDLE_SHA256,
      readiness_checklist_baseline: READINESS_CHECKLIST_BASELINE,
      handoff_audit_baseline: HANDOFF_AUDIT_BASELINE,
      decision_ledger_baseline: DECISION_LEDGER_BASELINE,
      actionability_baseline: ACTIONABILITY_BASELINE,
      regression_dashboard_baseline: REGRESSION_DASHBOARD_BASELINE,
      evidence_budget_baseline: EVIDENCE_BUDGET_BASELINE,
      model: MODEL,
      locked_alpha21_observed: LOCKED_ALPHA21_OBSERVED,
      required_productivity_signals: REQUIRED_PRODUCTIVITY_SIGNALS,
      productivity_signals: signals,
      operator_priority_queue: priorityQueue,
      overall_productivity_status: overallStatus,
      recommended_operator_actions: actionPlan.actions,
      top_priority_signal: actionPlan.top_priority_signal,
      blocking_signals: actionPlan.blocking_signals,
      review_required_signals: actionPlan.review_required_signals,
      total_estimated_minutes_saved: totalEstimatedMinutesSaved,
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
    report.checksum = deterministicChecksum(Object.assign({}, report, { generated_at:'deterministic', checksum:undefined }));
    return Object.freeze(report);
  }

  root.handoffProductivityCommandCenter = Object.freeze({
    VERSION,
    MILESTONE,
    LOCKED_BASELINE,
    LOCKED_BASELINE_TITLE,
    LOCKED_BASELINE_RUN_ID,
    LOCKED_BASELINE_COMMIT,
    LOCKED_BASELINE_BUNDLE_SHA256,
    READINESS_CHECKLIST_BASELINE,
    HANDOFF_AUDIT_BASELINE,
    DECISION_LEDGER_BASELINE,
    ACTIONABILITY_BASELINE,
    REGRESSION_DASHBOARD_BASELINE,
    EVIDENCE_BUDGET_BASELINE,
    MODEL,
    STATUS,
    PRODUCTIVITY_ACTION,
    REQUIRED_PRODUCTIVITY_SIGNALS,
    LOCKED_ALPHA21_OBSERVED,
    SAFETY_BOUNDARY_FLAGS,
    deterministicChecksum,
    normalizeStatus,
    aggregateStatuses,
    actionForStatus,
    evaluateProductivitySignal,
    buildProductivitySignals,
    buildOperatorPriorityQueue,
    buildProductivityActions,
    buildHandoffProductivityCommandCenter,
    validateProductivityCommandCenterSafety
  });
})(typeof window !== 'undefined' ? window : globalThis);
