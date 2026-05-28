/* Jarbou3i Research Engine provider/source dry-run trace inspector v1.4.0-alpha.4. */
/* Deterministic trace review only. No live execution enabled. See ADR-008. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.4';
  const STABLE_BASELINE = '1.3.0';
  const CONTROL_BASELINE = '1.4.0-alpha.4';
  const DRY_RUN_BASELINE = '1.4.0-alpha.3';
  const MILESTONE = 'v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report';
  const MODEL = 'provider_source_dry_run_trace_inspector.v1';

  const TRACE_LEVELS = Object.freeze({
    INFO: 'info',
    REVIEW: 'review',
    BLOCKING: 'blocking'
  });

  const BOUNDARY_FLAGS = Object.freeze({
    runtime_capability_change: false,
    provider_behavior_changed: false,
    oauth_behavior_changed: false,
    backend_behavior_changed: false,
    source_behavior_changed: false,
    storage_behavior_changed: false,
    source_connector_behavior_changed: false,
    live_provider_execution_enabled: false,
    live_source_fetching_enabled: false,
    production_oauth_enabled: false,
    trace_inspection_only: true,
    deterministic_fixture_backed: true,
    network_side_effects_allowed: false
  });

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function getHarnessTraces(opts) {
    const options = opts || {};
    if (Array.isArray(options.traces)) return options.traces;
    if (options.harness && Array.isArray(options.harness.traces)) return options.harness.traces;
    const harness = root.providerSourceDryRunExecutionHarness;
    if (harness && typeof harness.runDryRunHarness === 'function') {
      return asArray(harness.runDryRunHarness({ now: options.now }).traces);
    }
    return [];
  }

  function classifyTrace(trace) {
    if (!trace || typeof trace !== 'object') return TRACE_LEVELS.BLOCKING;
    if (trace.live_network_attempted || trace.provider_execution_performed || trace.source_fetch_performed || trace.credential_read_attempted) return TRACE_LEVELS.BLOCKING;
    if (trace.allowed_to_proceed === false || trace.failure_contract_id) return TRACE_LEVELS.REVIEW;
    return TRACE_LEVELS.INFO;
  }

  function inspectTrace(trace, index) {
    const item = trace || {};
    const level = classifyTrace(item);
    const sideEffectViolations = [];
    if (item.live_network_attempted) sideEffectViolations.push('live_network_attempted');
    if (item.provider_execution_performed) sideEffectViolations.push('provider_execution_performed');
    if (item.source_fetch_performed) sideEffectViolations.push('source_fetch_performed');
    if (item.credential_read_attempted) sideEffectViolations.push('credential_read_attempted');
    return Object.freeze({
      trace_index: index,
      trace_id: item.scenario_id || item.case_id || `trace_${index + 1}`,
      surface: item.surface || 'unknown',
      requested_mode: item.requested_mode || (item.request && item.request.mode) || 'unknown',
      policy_state: item.policy_state || item.decision || 'unknown',
      state_transition: item.state_transition || 'not_recorded',
      level,
      requires_operator_review: level !== TRACE_LEVELS.INFO,
      allowed_to_proceed: item.allowed_to_proceed === true || item.allowed === true,
      failure_contract_id: item.failure_contract_id || null,
      operator_message_present: typeof item.operator_message === 'string' && item.operator_message.length > 20,
      side_effect_violation_count: sideEffectViolations.length,
      side_effect_violations: Object.freeze(sideEffectViolations),
      live_network_attempted: item.live_network_attempted === true || item.live_network_allowed === true,
      provider_execution_performed: item.provider_execution_performed === true || item.provider_execution_allowed === true && item.live_network_allowed === true,
      source_fetch_performed: item.source_fetch_performed === true || item.source_fetch_allowed === true,
      credential_read_attempted: item.credential_read_attempted === true || item.credential_value_access_allowed === true,
      verification_claimed: item.verification_claimed === true,
      automatic_signoff_performed: item.automatic_signoff_performed === true,
      automatic_export_lock_performed: item.automatic_export_lock_performed === true
    });
  }

  function inspectDryRunTraces(opts) {
    const options = opts || {};
    const now = options.now ? new Date(options.now) : new Date();
    const traces = getHarnessTraces(options);
    const inspections = traces.map(inspectTrace);
    const blocking = inspections.filter(item => item.level === TRACE_LEVELS.BLOCKING);
    const review = inspections.filter(item => item.level === TRACE_LEVELS.REVIEW);
    const info = inspections.filter(item => item.level === TRACE_LEVELS.INFO);
    return Object.freeze({
      trace_inspector_version: VERSION,
      stable_baseline: STABLE_BASELINE,
      control_baseline: CONTROL_BASELINE,
      dry_run_baseline: DRY_RUN_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: now.toISOString(),
      planning_control_plane_only: true,
      trace_inspection_only: true,
      deterministic_fixture_backed: true,
      live_execution_enabled: false,
      live_source_fetching_enabled: false,
      production_oauth_enabled: false,
      boundary_flags: BOUNDARY_FLAGS,
      inspections,
      trace_count: inspections.length,
      info_count: info.length,
      review_count: review.length,
      blocking_count: blocking.length,
      review_trace_ids: review.map(item => item.trace_id),
      blocking_trace_ids: blocking.map(item => item.trace_id),
      side_effect_violation_count: inspections.reduce((sum, item) => sum + item.side_effect_violation_count, 0),
      no_live_network_attempted: inspections.every(item => item.live_network_attempted === false),
      no_provider_execution_performed: inspections.every(item => item.provider_execution_performed === false),
      no_source_fetch_performed: inspections.every(item => item.source_fetch_performed === false),
      no_credential_read_attempted: inspections.every(item => item.credential_read_attempted === false),
      no_verification_claimed: inspections.every(item => item.verification_claimed === false),
      no_automatic_signoff: inspections.every(item => item.automatic_signoff_performed === false),
      no_automatic_export_lock: inspections.every(item => item.automatic_export_lock_performed === false),
      all_review_items_have_failure_contract: review.every(item => typeof item.failure_contract_id === 'string' && item.failure_contract_id.length > 5),
      boundary_statement: 'Trace inspector reviews deterministic dry-run traces only. v1.4.0-alpha.4 does not perform live provider execution, live source fetching, production OAuth, backend expansion, or storage expansion.'
    });
  }

  root.providerSourceDryRunTraceInspector = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    CONTROL_BASELINE,
    DRY_RUN_BASELINE,
    MILESTONE,
    MODEL,
    TRACE_LEVELS,
    BOUNDARY_FLAGS,
    inspectTrace,
    inspectDryRunTraces
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
