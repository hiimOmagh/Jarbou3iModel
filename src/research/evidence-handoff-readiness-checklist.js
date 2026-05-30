/* Jarbou3i Research Engine evidence handoff readiness checklist v1.4.0-alpha.21. */
/* Static metadata-only readiness checklist. No provider calls, network calls, OAuth/token lifecycle, credential persistence, live source fetching, backend, storage, or source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.21';
  const MILESTONE = 'v1.4.0-alpha.21 — Alpha.20 Lock Completion + Evidence Handoff Readiness Checklist';
  const LOCKED_BASELINE = '1.4.0-alpha.20';
  const LOCKED_BASELINE_TITLE = 'v1.4.0-alpha.20 — Evidence Decision Ledger Handoff Audit';
  const LOCKED_BASELINE_RUN_ID = '26680024039';
  const LOCKED_BASELINE_COMMIT = 'd492d8e7de270f6bab5780a5dad5f821056c74b7';
  const LOCKED_BASELINE_BUNDLE_SHA256 = '4b5f1d224c4fca49681981265c0d412c804972ede0e5636cdd2d3b5f06508147';
  const HANDOFF_AUDIT_BASELINE = '1.4.0-alpha.20';
  const DECISION_LEDGER_BASELINE = '1.4.0-alpha.19';
  const ACTIONABILITY_BASELINE = '1.4.0-alpha.18';
  const REGRESSION_DASHBOARD_BASELINE = '1.4.0-alpha.17';
  const EVIDENCE_BUDGET_BASELINE = '1.4.0-alpha.16';
  const MODEL = 'evidence_handoff_readiness_checklist.v1';

  const STATUS = Object.freeze({
    pass: 'pass',
    warn: 'warn',
    fail: 'fail',
    review_required: 'review_required'
  });

  const READINESS_ACTION = Object.freeze({
    handoff_packet_ready_for_review: 'handoff_packet_ready_for_review',
    review_handoff_warnings_before_lock: 'review_handoff_warnings_before_lock',
    block_handoff_until_repaired: 'block_handoff_until_repaired',
    capture_handoff_evidence_before_review: 'capture_handoff_evidence_before_review'
  });

  const LOCKED_ALPHA20_OBSERVED = Object.freeze({
    run_id: LOCKED_BASELINE_RUN_ID,
    commit: LOCKED_BASELINE_COMMIT,
    bundle_sha256: LOCKED_BASELINE_BUNDLE_SHA256,
    no_browser_checks: 149,
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

  const REQUIRED_CHECKLIST_ITEMS = Object.freeze([
    'locked_alpha20_identity_recorded',
    'decision_ledger_handoff_audit_available',
    'current_evidence_matrix_available',
    'visible_text_snapshots_available',
    'artifact_identity_guard_available',
    'behavior_boundaries_confirmed',
    'operator_review_path_confirmed'
  ]);

  const SAFETY_BOUNDARY_FLAGS = Object.freeze({
    readiness_checklist_only: true,
    static_metadata_only: true,
    handoff_packet_interpretation_only: true,
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
    if (status === STATUS.pass) return READINESS_ACTION.handoff_packet_ready_for_review;
    if (status === STATUS.warn) return READINESS_ACTION.review_handoff_warnings_before_lock;
    if (status === STATUS.fail) return READINESS_ACTION.block_handoff_until_repaired;
    return READINESS_ACTION.capture_handoff_evidence_before_review;
  }

  function evaluateChecklistItem(itemId, evidence = {}) {
    const provided = evidence[itemId];
    const status = normalizeStatus(provided && typeof provided === 'object' ? provided.status : provided);
    const note = provided && typeof provided === 'object' ? provided.note || null : null;
    return Object.freeze({
      item_id: itemId,
      status,
      note,
      required_for_handoff: true,
      operator_review_required: true,
      automatic_transition_allowed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false,
      checksum: deterministicChecksum({ item_id:itemId, status, required_for_handoff:true, operator_review_required:true })
    });
  }

  function buildReadinessChecklist(options = {}) {
    const evidence = options.current_evidence || {};
    return Object.freeze(REQUIRED_CHECKLIST_ITEMS.map((itemId) => evaluateChecklistItem(itemId, evidence)));
  }

  function buildReadinessActions(status, checklist) {
    const actions = [actionForStatus(status)];
    if (status === STATUS.pass) actions.push('review_canonical_lock_bundle_before_lock');
    if (status === STATUS.warn) actions.push('review_warning_items_before_operator_handoff');
    if (status === STATUS.fail) actions.push('repair_failed_handoff_items_before_lock');
    if (status === STATUS.review_required) actions.push('capture_current_handoff_evidence_before_lock');
    const failedItems = checklist.filter((item) => item.status === STATUS.fail).map((item) => item.item_id);
    const missingItems = checklist.filter((item) => item.status === STATUS.review_required).map((item) => item.item_id);
    return Object.freeze({ actions:Object.freeze(actions), failed_items:Object.freeze(failedItems), missing_or_review_required_items:Object.freeze(missingItems) });
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

  function validateReadinessChecklistSafety(report) {
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

  function buildEvidenceHandoffReadinessChecklist(options = {}) {
    const generatedAt = options.generated_at || '2026-05-30T00:00:00.000Z';
    const checklist = buildReadinessChecklist(options);
    const overallStatus = aggregateStatuses(checklist.map((item) => item.status));
    const readinessActions = buildReadinessActions(overallStatus, checklist);
    const report = {
      evidence_handoff_readiness_checklist_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      locked_baseline: LOCKED_BASELINE,
      locked_baseline_title: LOCKED_BASELINE_TITLE,
      locked_baseline_run_id: LOCKED_BASELINE_RUN_ID,
      locked_baseline_commit: LOCKED_BASELINE_COMMIT,
      locked_baseline_bundle_sha256: LOCKED_BASELINE_BUNDLE_SHA256,
      handoff_audit_baseline: HANDOFF_AUDIT_BASELINE,
      decision_ledger_baseline: DECISION_LEDGER_BASELINE,
      actionability_baseline: ACTIONABILITY_BASELINE,
      regression_dashboard_baseline: REGRESSION_DASHBOARD_BASELINE,
      evidence_budget_baseline: EVIDENCE_BUDGET_BASELINE,
      model: MODEL,
      locked_alpha20_observed: LOCKED_ALPHA20_OBSERVED,
      required_checklist_items: REQUIRED_CHECKLIST_ITEMS,
      readiness_checklist: checklist,
      overall_readiness_status: overallStatus,
      recommended_operator_actions: readinessActions.actions,
      failed_items: readinessActions.failed_items,
      missing_or_review_required_items: readinessActions.missing_or_review_required_items,
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

  root.evidenceHandoffReadinessChecklist = Object.freeze({
    VERSION,
    MILESTONE,
    LOCKED_BASELINE,
    LOCKED_BASELINE_TITLE,
    LOCKED_BASELINE_RUN_ID,
    LOCKED_BASELINE_COMMIT,
    LOCKED_BASELINE_BUNDLE_SHA256,
    HANDOFF_AUDIT_BASELINE,
    DECISION_LEDGER_BASELINE,
    ACTIONABILITY_BASELINE,
    REGRESSION_DASHBOARD_BASELINE,
    EVIDENCE_BUDGET_BASELINE,
    MODEL,
    STATUS,
    READINESS_ACTION,
    REQUIRED_CHECKLIST_ITEMS,
    LOCKED_ALPHA20_OBSERVED,
    SAFETY_BOUNDARY_FLAGS,
    deterministicChecksum,
    normalizeStatus,
    aggregateStatuses,
    actionForStatus,
    evaluateChecklistItem,
    buildReadinessChecklist,
    buildReadinessActions,
    buildEvidenceHandoffReadinessChecklist,
    validateReadinessChecklistSafety
  });
})(typeof window !== 'undefined' ? window : globalThis);
