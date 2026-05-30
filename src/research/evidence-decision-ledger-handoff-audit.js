/* Jarbou3i Research Engine evidence decision ledger handoff audit v1.4.0-alpha.21. */
/* Static metadata-only handoff audit. No provider calls, network calls, OAuth/token lifecycle, credential persistence, live source fetching, backend, storage, or source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.21';
  const MILESTONE = 'v1.4.0-alpha.21 — Alpha.20 Lock Completion + Evidence Handoff Readiness Checklist';
  const LOCKED_BASELINE = '1.4.0-alpha.19';
  const LOCKED_BASELINE_TITLE = 'v1.4.0-alpha.19 — Evidence Dashboard Decision Ledger';
  const LOCKED_BASELINE_RUN_ID = '26668213509';
  const LOCKED_BASELINE_COMMIT = '2b3665b66861d631e779e9133d77399d0560d827';
  const LOCKED_BASELINE_BUNDLE_SHA256 = '5c44a5e37a9abeab16c8514103e32d046276956f11ec4500bd802415d502ec79';
  const DECISION_LEDGER_BASELINE = '1.4.0-alpha.19';
  const ACTIONABILITY_BASELINE = '1.4.0-alpha.18';
  const REGRESSION_DASHBOARD_BASELINE = '1.4.0-alpha.17';
  const EVIDENCE_BUDGET_BASELINE = '1.4.0-alpha.16';
  const MODEL = 'evidence_decision_ledger_handoff_audit.v1';

  const STATUS = Object.freeze({
    pass: 'pass',
    warn: 'warn',
    fail: 'fail',
    review_required: 'review_required'
  });

  const HANDOFF_STATE = Object.freeze({
    handoff_ready_for_operator_review: 'handoff_ready_for_operator_review',
    handoff_ready_with_budget_pressure_review: 'handoff_ready_with_budget_pressure_review',
    handoff_blocked_until_decision_ledger_repaired: 'handoff_blocked_until_decision_ledger_repaired',
    handoff_requires_current_evidence_capture: 'handoff_requires_current_evidence_capture'
  });

  const LOCKED_ALPHA19_OBSERVED = Object.freeze({
    run_id: LOCKED_BASELINE_RUN_ID,
    commit: LOCKED_BASELINE_COMMIT,
    bundle_sha256: LOCKED_BASELINE_BUNDLE_SHA256,
    no_browser_checks: 148,
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
    handoff_audit_only: true,
    static_metadata_only: true,
    decision_ledger_interpretation_only: true,
    operator_handoff_required: true,
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

  function normalizeLedgerDecision(input) {
    const value = input && typeof input === 'object'
      ? (input.decision_state || input.operator_action || input.status_summary?.decision_state || input.decision_summary?.decision_state || input.overall_dashboard_status || input.status)
      : input;
    if (value === 'lock_review_ready' || value === STATUS.pass || value === HANDOFF_STATE.handoff_ready_for_operator_review) return STATUS.pass;
    if (value === 'review_budget_pressure_before_lock' || value === STATUS.warn || value === HANDOFF_STATE.handoff_ready_with_budget_pressure_review) return STATUS.warn;
    if (value === 'block_lock_until_evidence_budget_regression_fixed' || value === STATUS.fail || value === HANDOFF_STATE.handoff_blocked_until_decision_ledger_repaired) return STATUS.fail;
    return STATUS.review_required;
  }

  function handoffStateForStatus(status) {
    if (status === STATUS.pass) return HANDOFF_STATE.handoff_ready_for_operator_review;
    if (status === STATUS.warn) return HANDOFF_STATE.handoff_ready_with_budget_pressure_review;
    if (status === STATUS.fail) return HANDOFF_STATE.handoff_blocked_until_decision_ledger_repaired;
    return HANDOFF_STATE.handoff_requires_current_evidence_capture;
  }

  function buildHandoffChecklist(status, state) {
    const items = [
      {
        item_id: 'handoff_001_confirm_locked_alpha19_identity',
        label: 'Confirm locked alpha.19 evidence identity',
        status: STATUS.pass,
        required_for_lock: true,
        operator_review_required: true
      },
      {
        item_id: 'handoff_002_review_decision_ledger_state',
        label: 'Review decision-ledger status before lock handoff',
        status,
        required_for_lock: true,
        operator_review_required: true
      },
      {
        item_id: 'handoff_003_confirm_no_behavior_expansion',
        label: 'Confirm no runtime/provider/backend/source/storage expansion',
        status: status === STATUS.fail ? STATUS.fail : STATUS.pass,
        required_for_lock: true,
        operator_review_required: true
      },
      {
        item_id: 'handoff_004_prepare_canonical_bundle_review',
        label: 'Prepare canonical lock-bundle review handoff',
        status,
        required_for_lock: true,
        operator_review_required: true
      }
    ];
    return Object.freeze(items.map((item) => Object.freeze(Object.assign({}, item, {
      handoff_state: state,
      automatic_transition_allowed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false,
      checksum: deterministicChecksum({
        item_id: item.item_id,
        status: item.status,
        required_for_lock: item.required_for_lock,
        operator_review_required: item.operator_review_required,
        handoff_state: state
      })
    }))));
  }

  function buildHandoffActions(status, state) {
    if (status === STATUS.pass) return Object.freeze(['handoff_ready_for_operator_review', 'review_canonical_lock_bundle_before_lock']);
    if (status === STATUS.warn) return Object.freeze(['handoff_ready_with_budget_pressure_review', 'review_budget_pressure_before_lock']);
    if (status === STATUS.fail) return Object.freeze(['handoff_blocked_until_decision_ledger_repaired', 'block_lock_until_evidence_budget_regression_fixed']);
    return Object.freeze(['handoff_requires_current_evidence_capture', 'capture_current_evidence_before_lock']);
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

  function validateHandoffAuditSafety(report) {
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

  function buildEvidenceDecisionLedgerHandoffAudit(options = {}) {
    const generatedAt = options.generated_at || '2026-05-30T00:00:00.000Z';
    const decisionInput = options.decision_ledger_report || options.decision_state || options.status_summary || null;
    const status = normalizeLedgerDecision(decisionInput);
    const handoffState = handoffStateForStatus(status);
    const handoffChecklist = buildHandoffChecklist(status, handoffState);
    const recommendedOperatorActions = buildHandoffActions(status, handoffState);
    const report = {
      evidence_decision_ledger_handoff_audit_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      locked_baseline: LOCKED_BASELINE,
      locked_baseline_title: LOCKED_BASELINE_TITLE,
      locked_baseline_run_id: LOCKED_BASELINE_RUN_ID,
      locked_baseline_commit: LOCKED_BASELINE_COMMIT,
      locked_baseline_bundle_sha256: LOCKED_BASELINE_BUNDLE_SHA256,
      decision_ledger_baseline: DECISION_LEDGER_BASELINE,
      actionability_baseline: ACTIONABILITY_BASELINE,
      regression_dashboard_baseline: REGRESSION_DASHBOARD_BASELINE,
      evidence_budget_baseline: EVIDENCE_BUDGET_BASELINE,
      model: MODEL,
      locked_alpha19_observed: LOCKED_ALPHA19_OBSERVED,
      input_decision_status: status,
      handoff_state: handoffState,
      handoff_checklist: handoffChecklist,
      recommended_operator_actions: recommendedOperatorActions,
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

  root.evidenceDecisionLedgerHandoffAudit = Object.freeze({
    VERSION,
    MILESTONE,
    LOCKED_BASELINE,
    LOCKED_BASELINE_TITLE,
    LOCKED_BASELINE_RUN_ID,
    LOCKED_BASELINE_COMMIT,
    LOCKED_BASELINE_BUNDLE_SHA256,
    DECISION_LEDGER_BASELINE,
    ACTIONABILITY_BASELINE,
    REGRESSION_DASHBOARD_BASELINE,
    EVIDENCE_BUDGET_BASELINE,
    MODEL,
    STATUS,
    HANDOFF_STATE,
    LOCKED_ALPHA19_OBSERVED,
    SAFETY_BOUNDARY_FLAGS,
    deterministicChecksum,
    normalizeLedgerDecision,
    handoffStateForStatus,
    buildHandoffChecklist,
    buildHandoffActions,
    buildEvidenceDecisionLedgerHandoffAudit,
    validateHandoffAuditSafety
  });
})(typeof window !== 'undefined' ? window : globalThis);
