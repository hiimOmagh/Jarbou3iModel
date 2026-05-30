/* Jarbou3i Research Engine changed-files patch hygiene guard v1.4.0-alpha.24. */
/* Static metadata-only patch-application hygiene guard. No provider calls, network calls, OAuth/token lifecycle, credential persistence, live source fetching, backend, storage, or source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.24';
  const MILESTONE = 'v1.4.0-alpha.24 — Alpha.23 Lock Completion + Changed-Files Patch Hygiene Guard';
  const LOCKED_BASELINE = '1.4.0-alpha.23';
  const LOCKED_BASELINE_TITLE = 'v1.4.0-alpha.23 — Handoff Productivity Runbook Gate';
  const LOCKED_BASELINE_RUN_ID = '26684865061';
  const LOCKED_BASELINE_COMMIT = '4675e12940112f734e0434421bf4553906093ff8';
  const LOCKED_BASELINE_BUNDLE_SHA256 = '441c4fb891effea54a8e4492730b2c851baec838a5e45b451ec3a501343356c6';
  const RUNBOOK_GATE_BASELINE = '1.4.0-alpha.23';
  const PRODUCTIVITY_COMMAND_CENTER_BASELINE = '1.4.0-alpha.22';
  const READINESS_CHECKLIST_BASELINE = '1.4.0-alpha.21';
  const MODEL = 'changed_files_patch_hygiene_guard.v1';

  const STATUS = Object.freeze({ pass:'pass', warn:'warn', fail:'fail', review_required:'review_required' });
  const ACTION = Object.freeze({
    apply_changed_files_patch: 'apply_changed_files_patch',
    run_cleanup_script_before_validation: 'run_cleanup_script_before_validation',
    block_zero_effect_patch: 'block_zero_effect_patch',
    capture_missing_patch_manifest: 'capture_missing_patch_manifest'
  });

  const LOCKED_ALPHA23_OBSERVED = Object.freeze({
    run_id: LOCKED_BASELINE_RUN_ID,
    commit: LOCKED_BASELINE_COMMIT,
    bundle_sha256: LOCKED_BASELINE_BUNDLE_SHA256,
    no_browser_checks: 144,
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

  const REQUIRED_PATCH_HYGIENE_ITEMS = Object.freeze([
    'changed_files_manifest_present',
    'changed_files_only_package',
    'effective_delta_detected',
    'zero_effect_patch_rejected',
    'cleanup_script_present_when_deletions_required',
    'cleanup_script_self_removes',
    'stale_lock_completion_tests_removed',
    'validation_logs_attached'
  ]);

  const SAFETY_BOUNDARY_FLAGS = Object.freeze({
    patch_hygiene_guard_only: true,
    static_metadata_only: true,
    operator_review_required: true,
    automatic_patch_apply_allowed: false,
    automatic_transition_allowed: false,
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
    if (status === STATUS.pass) return ACTION.apply_changed_files_patch;
    if (status === STATUS.warn) return ACTION.run_cleanup_script_before_validation;
    if (status === STATUS.fail) return ACTION.block_zero_effect_patch;
    return ACTION.capture_missing_patch_manifest;
  }
  function evaluatePatchHygieneItem(itemId, evidence = {}){
    const provided = evidence[itemId];
    const status = normalizeStatus(provided && typeof provided === 'object' ? provided.status : provided);
    const changedFiles = provided && typeof provided === 'object' && Number.isFinite(provided.changed_files_count) ? Math.max(0, provided.changed_files_count) : 0;
    const deletedFiles = provided && typeof provided === 'object' && Number.isFinite(provided.deleted_files_count) ? Math.max(0, provided.deleted_files_count) : 0;
    return Object.freeze({
      item_id: itemId,
      status,
      changed_files_count: changedFiles,
      deleted_files_count: deletedFiles,
      operator_review_required: true,
      automatic_patch_apply_allowed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false,
      checksum: deterministicChecksum({ item_id:itemId, status, changed_files_count:changedFiles, deleted_files_count:deletedFiles })
    });
  }
  function buildPatchHygieneItems(options = {}){
    const evidence = options.patch_evidence || {};
    return Object.freeze(REQUIRED_PATCH_HYGIENE_ITEMS.map((itemId) => evaluatePatchHygieneItem(itemId, evidence)));
  }
  function buildPatchHygieneQueue(items){
    return Object.freeze([...items].sort((left, right) => {
      const priorityDelta = statusPriority(right.status) - statusPriority(left.status);
      if (priorityDelta !== 0) return priorityDelta;
      return right.deleted_files_count - left.deleted_files_count;
    }).map((item, index) => Object.freeze({
      rank: index + 1,
      item_id: item.item_id,
      status: item.status,
      changed_files_count: item.changed_files_count,
      deleted_files_count: item.deleted_files_count,
      operator_action: actionForStatus(item.status),
      automatic_patch_apply_allowed: false,
      checksum: deterministicChecksum({ rank:index + 1, item_id:item.item_id, status:item.status, action:actionForStatus(item.status) })
    })));
  }
  function buildPatchHygieneActions(status, queue){
    const actions = [actionForStatus(status)];
    if (status === STATUS.pass) actions.push('run_targeted_validation_then_no_browser');
    if (status === STATUS.warn) actions.push('inspect_cleanup_script_and_changed_files_manifest');
    if (status === STATUS.fail) actions.push('repair_patch_before_any_lock_attempt');
    if (status === STATUS.review_required) actions.push('capture_changed_files_manifest_before_validation');
    return Object.freeze({
      actions:Object.freeze(actions),
      top_priority_item: queue[0] ? queue[0].item_id : null,
      blocking_items:Object.freeze(queue.filter((item) => item.status === STATUS.fail).map((item) => item.item_id)),
      review_required_items:Object.freeze(queue.filter((item) => item.status === STATUS.review_required).map((item) => item.item_id))
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
  function validatePatchHygieneGuardSafety(report){
    const forbiddenPresent = [];
    walkForbiddenFields(report, '', forbiddenPresent);
    const flags = report && report.safety_boundary_flags ? report.safety_boundary_flags : {};
    const unsafeFlags = [];
    for (const key of [
      'automatic_patch_apply_allowed', 'automatic_transition_allowed', 'network_invocation_allowed', 'hidden_network_calls_allowed',
      'live_provider_execution_enabled', 'live_provider_execution_performed', 'live_source_fetching_enabled', 'live_source_fetching_performed',
      'real_oauth_token_lifecycle_enabled', 'real_api_credentials_stored', 'real_tokens_stored', 'credential_persistence_allowed',
      'backend_behavior_changed', 'storage_behavior_changed', 'source_behavior_changed', 'automatic_source_verification_claimed',
      'provider_suggested_source_auto_acceptance', 'automatic_signoff_performed', 'automatic_export_lock_performed', 'publication_permission_claimed'
    ]) {
      if (flags[key] !== false) unsafeFlags.push(key);
    }
    return Object.freeze({ ok: forbiddenPresent.length === 0 && unsafeFlags.length === 0, forbidden_present:Object.freeze(forbiddenPresent), unsafe_flags:Object.freeze(unsafeFlags) });
  }
  function buildChangedFilesPatchHygieneGuard(options = {}){
    const generatedAt = options.generated_at || '2026-05-30T00:00:00.000Z';
    const items = buildPatchHygieneItems(options);
    const overall = aggregateStatuses(items.map((item) => item.status));
    const queue = buildPatchHygieneQueue(items);
    const actionSummary = buildPatchHygieneActions(overall, queue);
    const body = {
      changed_files_patch_hygiene_guard_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      locked_baseline: LOCKED_BASELINE,
      locked_baseline_title: LOCKED_BASELINE_TITLE,
      runbook_gate_baseline: RUNBOOK_GATE_BASELINE,
      productivity_command_center_baseline: PRODUCTIVITY_COMMAND_CENTER_BASELINE,
      readiness_checklist_baseline: READINESS_CHECKLIST_BASELINE,
      model: MODEL,
      locked_alpha23_observed: LOCKED_ALPHA23_OBSERVED,
      required_patch_hygiene_items: REQUIRED_PATCH_HYGIENE_ITEMS,
      patch_hygiene_items: items,
      patch_hygiene_queue: queue,
      overall_patch_hygiene_status: overall,
      recommended_operator_actions: actionSummary.actions,
      top_priority_item: actionSummary.top_priority_item,
      blocking_items: actionSummary.blocking_items,
      review_required_items: actionSummary.review_required_items,
      safety_boundary_flags: SAFETY_BOUNDARY_FLAGS,
      safe_metadata_only: true,
      can_execute_now: false,
      automatic_patch_apply_allowed: false,
      network_invocation_allowed: false,
      live_provider_execution_performed: false,
      live_source_fetching_performed: false,
      credential_persistence_allowed: false,
      automatic_source_verification_claimed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false
    };
    body.safety_validation = validatePatchHygieneGuardSafety(body);
    body.checksum = deterministicChecksum({
      version: body.changed_files_patch_hygiene_guard_version,
      milestone: body.milestone,
      locked_baseline: body.locked_baseline,
      items: body.patch_hygiene_items,
      queue: body.patch_hygiene_queue,
      status: body.overall_patch_hygiene_status,
      actions: body.recommended_operator_actions,
      safety: body.safety_validation
    });
    return Object.freeze(body);
  }

  root.changedFilesPatchHygieneGuard = Object.freeze({
    VERSION, MILESTONE, LOCKED_BASELINE, LOCKED_BASELINE_TITLE, LOCKED_BASELINE_RUN_ID, LOCKED_BASELINE_COMMIT,
    LOCKED_BASELINE_BUNDLE_SHA256, RUNBOOK_GATE_BASELINE, PRODUCTIVITY_COMMAND_CENTER_BASELINE, READINESS_CHECKLIST_BASELINE,
    MODEL, STATUS, ACTION, LOCKED_ALPHA23_OBSERVED, REQUIRED_PATCH_HYGIENE_ITEMS, SAFETY_BOUNDARY_FLAGS,
    deterministicChecksum, buildPatchHygieneItems, buildPatchHygieneQueue, buildPatchHygieneActions,
    validatePatchHygieneGuardSafety, buildChangedFilesPatchHygieneGuard
  });
})(typeof window !== 'undefined' ? window : globalThis);
