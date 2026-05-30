/* Jarbou3i Research Engine handoff productivity runbook gate v1.4.0-alpha.23. */
/* Static metadata-only operator runbook routing. No provider calls, network calls, OAuth/token lifecycle, credential persistence, live source fetching, backend, storage, or source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.23';
  const MILESTONE = 'v1.4.0-alpha.23 — Alpha.22 Lock Completion + Handoff Productivity Runbook Gate';
  const LOCKED_BASELINE = '1.4.0-alpha.22';
  const LOCKED_BASELINE_TITLE = 'v1.4.0-alpha.22 — Handoff Productivity Command Center';
  const LOCKED_BASELINE_RUN_ID = '26683651807';
  const LOCKED_BASELINE_COMMIT = 'a86d23efa3df7450c34d151f0dbb30fe3abdabef';
  const LOCKED_BASELINE_BUNDLE_SHA256 = 'a93d248dbe256fe073f93d977ab7cf432207293e2d59fdef0dbc0652d45f0068';
  const PRODUCTIVITY_COMMAND_CENTER_BASELINE = '1.4.0-alpha.22';
  const READINESS_CHECKLIST_BASELINE = '1.4.0-alpha.21';
  const HANDOFF_AUDIT_BASELINE = '1.4.0-alpha.20';
  const DECISION_LEDGER_BASELINE = '1.4.0-alpha.19';
  const ACTIONABILITY_BASELINE = '1.4.0-alpha.18';
  const MODEL = 'handoff_productivity_runbook_gate.v1';

  const STATUS = Object.freeze({ pass:'pass', warn:'warn', fail:'fail', review_required:'review_required' });

  const RUNBOOK_ACTION = Object.freeze({
    execute_operator_lock_runbook: 'execute_operator_lock_runbook',
    review_budget_pressure_then_continue: 'review_budget_pressure_then_continue',
    repair_blockers_before_runbook: 'repair_blockers_before_runbook',
    capture_missing_evidence_before_runbook: 'capture_missing_evidence_before_runbook'
  });

  const LOCKED_ALPHA22_OBSERVED = Object.freeze({
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

  const REQUIRED_RUNBOOK_STEPS = Object.freeze([
    'verify_current_candidate_identity',
    'verify_no_browser_gate_green',
    'verify_browser_gate_green',
    'verify_hosted_evidence_matrix_green',
    'verify_visible_text_snapshots_green',
    'verify_artifact_identity_guard_green',
    'verify_operator_review_boundary',
    'verify_no_automatic_signoff_or_export_lock'
  ]);

  const SAFETY_BOUNDARY_FLAGS = Object.freeze({
    runbook_gate_only: true,
    static_metadata_only: true,
    operator_runbook_only: true,
    automatic_transition_allowed: false,
    operator_review_required: true,
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
    ['raw','credentials'], ['raw','tokens'], ['raw','api','keys'], ['authorization','headers'], ['authorization','header'],
    ['raw','request','body'], ['raw','response','body'], ['raw','source','fetch','results'], ['raw','network','trace'],
    ['browser','session','secrets'], ['provider','secret','value'], ['access','token'], ['refresh','token'], ['api','key'], ['bearer','token']
  ]);

  function forbiddenFieldNames(){ return FORBIDDEN_FIELD_GROUPS.map((parts) => parts.join('_')); }
  function stableStringify(value){
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
    return '{' + Object.keys(value).sort().map((key) => JSON.stringify(key) + ':' + stableStringify(value[key])).join(',') + '}';
  }
  function deterministicChecksum(value){
    const body = stableStringify(value);
    let hash = 2166136261;
    for (let index = 0; index < body.length; index += 1) {
      hash ^= body.charCodeAt(index);
      hash = Math.imul(hash, 16777619) >>> 0;
    }
    return `fnv1a32:${hash.toString(16).padStart(8, '0')}`;
  }
  function normalizeStatus(value){
    if (value === STATUS.pass || value === true) return STATUS.pass;
    if (value === STATUS.warn) return STATUS.warn;
    if (value === STATUS.fail || value === false) return STATUS.fail;
    return STATUS.review_required;
  }
  function statusPriority(status){
    if (status === STATUS.fail) return 3;
    if (status === STATUS.review_required) return 2;
    if (status === STATUS.warn) return 1;
    return 0;
  }
  function aggregateStatuses(statuses){
    return statuses.reduce((current, next) => statusPriority(next) > statusPriority(current) ? next : current, STATUS.pass);
  }
  function actionForStatus(status){
    if (status === STATUS.pass) return RUNBOOK_ACTION.execute_operator_lock_runbook;
    if (status === STATUS.warn) return RUNBOOK_ACTION.review_budget_pressure_then_continue;
    if (status === STATUS.fail) return RUNBOOK_ACTION.repair_blockers_before_runbook;
    return RUNBOOK_ACTION.capture_missing_evidence_before_runbook;
  }
  function evaluateRunbookStep(stepId, evidence = {}){
    const provided = evidence[stepId];
    const status = normalizeStatus(provided && typeof provided === 'object' ? provided.status : provided);
    const impact = provided && typeof provided === 'object' && Number.isFinite(provided.operator_minutes_at_risk) ? Math.max(0, provided.operator_minutes_at_risk) : 0;
    return Object.freeze({
      step_id: stepId,
      status,
      operator_minutes_at_risk: impact,
      operator_review_required: true,
      automatic_transition_allowed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false,
      checksum: deterministicChecksum({ step_id:stepId, status, operator_minutes_at_risk:impact, operator_review_required:true })
    });
  }
  function buildRunbookSteps(options = {}){
    const evidence = options.current_evidence || {};
    return Object.freeze(REQUIRED_RUNBOOK_STEPS.map((stepId) => evaluateRunbookStep(stepId, evidence)));
  }
  function buildRunbookQueue(steps){
    return Object.freeze([...steps].sort((left, right) => {
      const priorityDelta = statusPriority(right.status) - statusPriority(left.status);
      if (priorityDelta !== 0) return priorityDelta;
      return right.operator_minutes_at_risk - left.operator_minutes_at_risk;
    }).map((step, index) => Object.freeze({
      rank: index + 1,
      step_id: step.step_id,
      status: step.status,
      operator_minutes_at_risk: step.operator_minutes_at_risk,
      operator_action: actionForStatus(step.status),
      automatic_transition_allowed: false,
      checksum: deterministicChecksum({ rank:index + 1, step_id:step.step_id, status:step.status, action:actionForStatus(step.status) })
    })));
  }
  function buildRunbookActions(status, queue){
    const actions = [actionForStatus(status)];
    if (status === STATUS.pass) actions.push('review_lock_bundle_and_publish_alpha23_evidence_request');
    if (status === STATUS.warn) actions.push('resolve_or_accept_runbook_pressure_before_lock');
    if (status === STATUS.fail) actions.push('repair_failed_runbook_steps_before_lock');
    if (status === STATUS.review_required) actions.push('capture_current_runbook_evidence_before_lock');
    return Object.freeze({
      actions:Object.freeze(actions),
      top_priority_step: queue[0] ? queue[0].step_id : null,
      blocking_steps:Object.freeze(queue.filter((item) => item.status === STATUS.fail).map((item) => item.step_id)),
      review_required_steps:Object.freeze(queue.filter((item) => item.status === STATUS.review_required).map((item) => item.step_id))
    });
  }
  function walkForbiddenFields(value, path, findings){
    if (!value || typeof value !== 'object') return;
    const forbidden = new Set(forbiddenFieldNames());
    for (const key of Object.keys(value)) {
      const nextPath = path ? `${path}.${key}` : key;
      if (forbidden.has(key)) findings.push(nextPath);
      walkForbiddenFields(value[key], nextPath, findings);
    }
  }
  function validateRunbookGateSafety(report){
    const forbiddenPresent = [];
    walkForbiddenFields(report, '', forbiddenPresent);
    const flags = report && report.safety_boundary_flags ? report.safety_boundary_flags : {};
    const unsafeFlags = [];
    for (const key of [
      'automatic_transition_allowed', 'network_invocation_allowed', 'hidden_network_calls_allowed',
      'live_provider_execution_enabled', 'live_provider_execution_performed', 'live_source_fetching_enabled',
      'live_source_fetching_performed', 'real_oauth_token_lifecycle_enabled', 'real_api_credentials_stored',
      'real_tokens_stored', 'credential_persistence_allowed', 'backend_behavior_changed', 'storage_behavior_changed',
      'source_behavior_changed', 'automatic_source_verification_claimed', 'provider_suggested_source_auto_acceptance',
      'automatic_signoff_performed', 'automatic_export_lock_performed', 'publication_permission_claimed'
    ]) {
      if (flags[key] !== false) unsafeFlags.push(key);
    }
    return Object.freeze({ ok: forbiddenPresent.length === 0 && unsafeFlags.length === 0, forbidden_present:Object.freeze(forbiddenPresent), unsafe_flags:Object.freeze(unsafeFlags) });
  }
  function buildHandoffProductivityRunbookGate(options = {}){
    const generatedAt = options.generated_at || '2026-05-30T00:00:00.000Z';
    const steps = buildRunbookSteps(options);
    const overall = aggregateStatuses(steps.map((step) => step.status));
    const queue = buildRunbookQueue(steps);
    const actionSummary = buildRunbookActions(overall, queue);
    const body = {
      handoff_productivity_runbook_gate_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      locked_baseline: LOCKED_BASELINE,
      productivity_command_center_baseline: PRODUCTIVITY_COMMAND_CENTER_BASELINE,
      readiness_checklist_baseline: READINESS_CHECKLIST_BASELINE,
      handoff_audit_baseline: HANDOFF_AUDIT_BASELINE,
      decision_ledger_baseline: DECISION_LEDGER_BASELINE,
      actionability_baseline: ACTIONABILITY_BASELINE,
      model: MODEL,
      locked_alpha22_observed: LOCKED_ALPHA22_OBSERVED,
      runbook_steps: steps,
      operator_runbook_queue: queue,
      overall_runbook_status: overall,
      recommended_operator_actions: actionSummary.actions,
      top_priority_step: actionSummary.top_priority_step,
      blocking_steps: actionSummary.blocking_steps,
      review_required_steps: actionSummary.review_required_steps,
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
    body.safety_validation = validateRunbookGateSafety(body);
    body.checksum = deterministicChecksum(Object.assign({}, body, { checksum:undefined, safety_validation:undefined }));
    return Object.freeze(body);
  }

  root.handoffProductivityRunbookGate = Object.freeze({
    VERSION, MILESTONE, LOCKED_BASELINE, LOCKED_BASELINE_TITLE, LOCKED_BASELINE_RUN_ID, LOCKED_BASELINE_COMMIT,
    LOCKED_BASELINE_BUNDLE_SHA256, PRODUCTIVITY_COMMAND_CENTER_BASELINE, READINESS_CHECKLIST_BASELINE, HANDOFF_AUDIT_BASELINE,
    DECISION_LEDGER_BASELINE, ACTIONABILITY_BASELINE, MODEL, STATUS, RUNBOOK_ACTION, LOCKED_ALPHA22_OBSERVED,
    REQUIRED_RUNBOOK_STEPS, SAFETY_BOUNDARY_FLAGS, deterministicChecksum, normalizeStatus, actionForStatus,
    buildRunbookSteps, buildRunbookQueue, buildRunbookActions, validateRunbookGateSafety, buildHandoffProductivityRunbookGate
  });
})(typeof window !== 'undefined' ? window : globalThis);
