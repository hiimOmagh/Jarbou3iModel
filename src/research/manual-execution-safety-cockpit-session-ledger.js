/* Jarbou3i Research Engine manual execution safety cockpit + session ledger v1.4.0-alpha.11. */
/* Safety cockpit and session ledger only. Disabled by default. No provider/source execution, OAuth/token lifecycle, credential persistence, automatic fetching, backend, or storage expansion enabled. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.11';
  const STABLE_BASELINE = '1.3.0';
  const MANUAL_PROTOTYPE_BASELINE = '1.4.0-alpha.11';
  const CANDIDATE_GATE_BASELINE = '1.4.0-alpha.9';
  const CREDENTIAL_BOUNDARY_BASELINE = '1.4.0-alpha.8';
  const SOURCE_ACQUISITION_BASELINE = '1.4.0-alpha.7';
  const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
  const MILESTONE = 'v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger';
  const MODEL = 'manual_execution_safety_cockpit_session_ledger.v1';

  const SESSION_STATES = Object.freeze({
    IDLE: 'idle',
    PREFLIGHT_READY: 'preflight_ready',
    OPERATOR_REVIEW_REQUIRED: 'operator_review_required',
    OPERATOR_ARMED: 'operator_armed',
    SIMULATED_RUNNING: 'simulated_running',
    ABORT_REQUESTED: 'abort_requested',
    KILL_SWITCH_TRIGGERED: 'kill_switch_triggered',
    TIMED_OUT: 'timed_out',
    COMPLETED_NO_EXECUTION: 'completed_no_execution',
    BLOCKED: 'blocked',
    FAILED_PRECONDITION: 'failed_precondition'
  });

  const TERMINAL_STATES = Object.freeze([
    SESSION_STATES.KILL_SWITCH_TRIGGERED,
    SESSION_STATES.TIMED_OUT,
    SESSION_STATES.COMPLETED_NO_EXECUTION,
    SESSION_STATES.BLOCKED,
    SESSION_STATES.FAILED_PRECONDITION
  ]);

  const ALLOWED_LEDGER_FIELDS = Object.freeze([
    'session_id',
    'created_at',
    'mode',
    'state',
    'operator_preconditions_summary',
    'source_scope_summary',
    'provider_payload_summary',
    'credential_boundary_summary',
    'budget_summary',
    'timeout_summary',
    'abort_reason',
    'failure_reasons',
    'no_execution_report',
    'checksum'
  ]);

  const FORBIDDEN_LEDGER_FIELDS = Object.freeze([
    'raw_credentials',
    'raw_tokens',
    'raw_api_keys',
    'authorization_headers',
    'raw_provider_payloads_containing_secrets',
    'raw_source_fetch_results',
    'raw_browser_session_secrets'
  ]);

  const BOUNDARY_FLAGS = Object.freeze({
    runtime_capability_change: false,
    provider_behavior_changed: false,
    oauth_behavior_changed: false,
    backend_behavior_changed: false,
    source_behavior_changed: false,
    storage_behavior_changed: false,
    source_connector_behavior_changed: false,
    safety_cockpit_simulation_only: true,
    disabled_by_default: true,
    live_provider_execution_enabled: false,
    live_provider_execution_performed: false,
    live_source_fetching_enabled: false,
    live_source_fetching_performed: false,
    hidden_network_calls_allowed: false,
    background_execution_allowed: false,
    production_oauth_enabled: false,
    real_api_keys_used: false,
    real_api_keys_stored: false,
    real_token_storage_enabled: false,
    credential_persistence_allowed: false,
    backend_behavior_expanded: false,
    storage_behavior_expanded: false,
    uncontrolled_scraping_enabled: false,
    automatic_source_fetching_enabled: false,
    automatic_source_verification_claimed: false,
    provider_suggested_source_auto_acceptance: false,
    automatic_signoff_performed: false,
    automatic_export_lock_performed: false,
    cryptographic_signature_claimed: false,
    publication_permission_claimed: false,
    safe_metadata_only: true,
    no_execution_fallback_required: true,
    kill_switch_drill_required: true,
    session_ledger_safe_metadata_only: true
  });

  const REQUIRED_CONTINUITY_LAYERS = Object.freeze([
    'provider_execution_mock_to_live_equivalence',
    'source_acquisition_control_surface',
    'credential_boundary_runtime_drill',
    'controlled_execution_candidate_gate',
    'manual_execution_safety_cockpit_session_ledger'
  ]);

  const FAILURE_REASONS = Object.freeze([
    'safety_cockpit_simulation_only',
    'live_execution_disabled_by_default',
    'operator_review_required_before_arm',
    'kill_switch_required_before_any_attempt',
    'budget_preview_missing',
    'max_request_count_missing',
    'timeout_limit_missing',
    'budget_timeout_acknowledgement_missing',
    'credential_boundary_requires_fake_secret_only',
    'source_scope_review_required_without_auto_fetch',
    'provider_payload_summary_required_without_raw_secrets',
    'no_execution_fallback_required',
    'real_oauth_token_lifecycle_forbidden',
    'credential_persistence_forbidden',
    'backend_storage_expansion_forbidden',
    'automatic_verification_signoff_export_lock_forbidden',
    'publication_permission_claim_forbidden'
  ]);

  function isRecord(value){ return Object.prototype.toString.call(value) === '[object Object]'; }
  function asRecord(value){ return isRecord(value) ? value : {}; }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function asBool(value){ return value === true; }
  function positiveNumber(value){ return typeof value === 'number' && Number.isFinite(value) && value > 0; }

  function stableStringify(value) {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
    return '{' + Object.keys(value).sort().map((key) => JSON.stringify(key) + ':' + stableStringify(value[key])).join(',') + '}';
  }

  function deterministicChecksum(value) {
    const body = stableStringify(value);
    let hash = 2166136261;
    for (let i = 0; i < body.length; i += 1) {
      hash ^= body.charCodeAt(i);
      hash = Math.imul(hash, 16777619) >>> 0;
    }
    return `fnv1a32:${hash.toString(16).padStart(8, '0')}`;
  }

  function defaultSessionId(now){
    const stamp = String(now || '1970-01-01T00:00:00.000Z').replace(/[^0-9TZ]/g, '').slice(0, 16) || 'session';
    return `manual-session-${stamp}`;
  }

  function getMockToLiveReport(options){
    if (options.mock_to_live_report) return options.mock_to_live_report;
    const mod = root.providerExecutionMockToLiveEquivalence;
    if (mod && typeof mod.evaluateMockToLiveEquivalence === 'function') return mod.evaluateMockToLiveEquivalence({ now: options.now });
    return null;
  }

  function getSourceAcquisitionAudit(options){
    if (options.source_acquisition_audit) return options.source_acquisition_audit;
    const mod = root.sourceAcquisitionControlSurface;
    if (mod && typeof mod.auditSourceAcquisitionControlSurface === 'function') return mod.auditSourceAcquisitionControlSurface({ now: options.now });
    return null;
  }

  function getCredentialBoundaryReport(options){
    if (options.credential_boundary_report) return options.credential_boundary_report;
    const mod = root.credentialBoundaryRuntimeDrill;
    if (mod && typeof mod.runCredentialBoundaryRuntimeDrill === 'function') return mod.runCredentialBoundaryRuntimeDrill({ now: options.now });
    return null;
  }

  function getCandidateGateReport(options){
    if (options.candidate_gate_report) return options.candidate_gate_report;
    const mod = root.controlledExecutionCandidateGate;
    if (mod && typeof mod.buildNoExecutionDryCandidateReport === 'function') return mod.buildNoExecutionDryCandidateReport({ now: options.now });
    return null;
  }

  function getManualPrototypeReport(options){
    if (options.manual_safety_cockpit_report) return options.manual_safety_cockpit_report;
    const mod = root.limitedManualLiveExecutionPrototype;
    if (mod && typeof mod.buildLimitedManualLiveExecutionPrototype === 'function') {
      return mod.buildLimitedManualLiveExecutionPrototype({ now: options.now, manual_operator_controls: options.manual_operator_controls });
    }
    return null;
  }

  function summarizeLayer(id, report, versionField){
    const safe = asRecord(report);
    const ok = safe.ok === true || safe.controlled_execution_candidate_only === true || safe.manual_execution_safety_cockpit_session_ledger_version === MANUAL_PROTOTYPE_BASELINE;
    return Object.freeze({
      id,
      present: Boolean(report),
      ok,
      version: safe[versionField] || safe.version || null,
      checksum: safe.checksum || safe.prototype_shell_checksum || safe.candidate_gate_checksum || safe.credential_boundary_checksum || safe.source_acquisition_checksum || safe.equivalence_checksum || null,
      live_execution_enabled: false,
      live_source_fetching_enabled: false,
      safe_summary_only: true
    });
  }

  function buildContinuitySummary(options = {}){
    return Object.freeze([
      summarizeLayer('provider_execution_mock_to_live_equivalence', getMockToLiveReport(options), 'mock_to_live_equivalence_version'),
      summarizeLayer('source_acquisition_control_surface', getSourceAcquisitionAudit(options), 'source_acquisition_control_surface_version'),
      summarizeLayer('credential_boundary_runtime_drill', getCredentialBoundaryReport(options), 'credential_boundary_runtime_drill_version'),
      summarizeLayer('controlled_execution_candidate_gate', getCandidateGateReport(options), 'controlled_execution_candidate_gate_version'),
      summarizeLayer('manual_execution_safety_cockpit_session_ledger', getManualPrototypeReport(options), 'manual_execution_safety_cockpit_session_ledger_version')
    ]);
  }

  function buildBudgetGuardrails(options = {}){
    const budget = asRecord(options.budget_controls);
    const budgetPreview = isRecord(budget.budget_preview) ? budget.budget_preview : null;
    const maxRequestCount = positiveNumber(budget.max_request_count) ? Math.floor(budget.max_request_count) : null;
    const timeoutLimitMs = positiveNumber(budget.timeout_limit_ms) ? Math.floor(budget.timeout_limit_ms) : null;
    const acknowledged = asBool(budget.operator_budget_timeout_acknowledged);
    const failureReasons = [];
    if (!budgetPreview) failureReasons.push('budget_preview_missing');
    if (!maxRequestCount) failureReasons.push('max_request_count_missing');
    if (!timeoutLimitMs) failureReasons.push('timeout_limit_missing');
    if (!acknowledged) failureReasons.push('budget_timeout_acknowledgement_missing');
    return Object.freeze({
      budget_preview: budgetPreview ? Object.freeze({
        currency: String(budgetPreview.currency || 'metadata_only'),
        max_estimated_cost: typeof budgetPreview.max_estimated_cost === 'number' ? budgetPreview.max_estimated_cost : null,
        billing_connection_enabled: false,
        live_cost_api_connected: false
      }) : null,
      max_request_count: maxRequestCount,
      timeout_limit_ms: timeoutLimitMs,
      operator_budget_timeout_acknowledged: acknowledged,
      request_budget_enforced_as_metadata: Boolean(maxRequestCount),
      timeout_enforced_as_metadata: Boolean(timeoutLimitMs),
      ok: failureReasons.length === 0,
      failure_reasons: Object.freeze(failureReasons)
    });
  }

  function buildOperatorPreconditions(options = {}){
    const manual = asRecord(options.manual_operator_controls);
    const budget = buildBudgetGuardrails(options);
    const rows = [
      ['operator_review_completed', asBool(manual.operator_review_completed), 'operator_review_required_before_arm'],
      ['operator_explicit_start_requested', asBool(manual.operator_explicit_start_requested), 'operator_start_missing'],
      ['operator_abort_control_acknowledged', asBool(manual.operator_abort_control_acknowledged), 'kill_switch_required_before_any_attempt'],
      ['operator_no_execution_fallback_acknowledged', asBool(manual.operator_no_execution_fallback_acknowledged), 'no_execution_fallback_required'],
      ['budget_timeout_acknowledged', budget.operator_budget_timeout_acknowledged, 'budget_timeout_acknowledgement_missing'],
      ['source_scope_reviewed_without_auto_fetch', asBool(manual.source_scope_reviewed_without_auto_fetch), 'source_scope_review_required_without_auto_fetch'],
      ['provider_payload_summary_reviewed_without_raw_secrets', asBool(manual.provider_payload_summary_reviewed_without_raw_secrets), 'provider_payload_summary_required_without_raw_secrets']
    ];
    return Object.freeze(rows.map(([id, satisfied, failure_reason]) => Object.freeze({
      id,
      satisfied,
      failure_reason,
      live_execution_enabled: false,
      authorizes_execution_now: false,
      credential_persistence_allowed: false,
      automatic_source_fetching_enabled: false
    })));
  }

  function collectFailureReasons(options = {}){
    const budget = buildBudgetGuardrails(options);
    const operatorRows = buildOperatorPreconditions(options);
    const continuity = buildContinuitySummary(options);
    const failures = new Set(FAILURE_REASONS);
    budget.failure_reasons.forEach((reason) => failures.add(reason));
    operatorRows.filter((row) => !row.satisfied).forEach((row) => failures.add(row.failure_reason));
    continuity.filter((layer) => !layer.present || !layer.ok).forEach((layer) => failures.add(`${layer.id}_missing_or_not_green`));
    return Object.freeze(Array.from(failures));
  }

  function buildNoExecutionFallbackReport(options = {}){
    const failureReasons = collectFailureReasons(options);
    const budget = buildBudgetGuardrails(options);
    return Object.freeze({
      fallback_required: true,
      execution_remains_blocked: true,
      can_execute_now: false,
      no_execution_reason: failureReasons.length ? 'manual_execution_safety_cockpit_blocks_execution_until_all_safety_preconditions_are_green' : 'safety_cockpit_reports_no_execution_by_design',
      failure_reasons: failureReasons,
      budget_timeout_status: budget.ok ? 'metadata_guardrails_present' : 'metadata_guardrails_incomplete',
      operator_message: 'No provider/source execution is performed. Complete manual review, budget, timeout, and kill-switch checks before considering a future separate execution release.',
      hidden_network_calls_allowed: false,
      live_provider_execution_performed: false,
      live_source_fetching_performed: false
    });
  }

  function deriveInitialState(options = {}){
    const budget = buildBudgetGuardrails(options);
    const operatorRows = buildOperatorPreconditions(options);
    const continuity = buildContinuitySummary(options);
    const continuityGreen = continuity.every((layer) => layer.present && layer.ok);
    if (!continuityGreen) return SESSION_STATES.FAILED_PRECONDITION;
    if (!budget.ok) return SESSION_STATES.BLOCKED;
    if (operatorRows.some((row) => !row.satisfied)) return SESSION_STATES.OPERATOR_REVIEW_REQUIRED;
    if (asBool(asRecord(options.manual_operator_controls).operator_explicit_start_requested)) return SESSION_STATES.OPERATOR_ARMED;
    return SESSION_STATES.PREFLIGHT_READY;
  }

  function buildSafeSessionLedger(options = {}){
    const now = options.now || new Date(0).toISOString();
    const state = options.state || deriveInitialState(options);
    const budget = buildBudgetGuardrails(options);
    const operatorRows = buildOperatorPreconditions(options);
    const fallback = buildNoExecutionFallbackReport(options);
    const session = {
      session_id: options.session_id || defaultSessionId(now),
      created_at: now,
      mode: 'manual_execution_safety_cockpit_simulation_only',
      state,
      operator_preconditions_summary: Object.freeze({
        total: operatorRows.length,
        satisfied: operatorRows.filter((row) => row.satisfied).length,
        missing: operatorRows.filter((row) => !row.satisfied).map((row) => row.id),
        authorizes_execution_now: false
      }),
      source_scope_summary: Object.freeze({ reviewed_without_auto_fetch: operatorRows.find((row) => row.id === 'source_scope_reviewed_without_auto_fetch')?.satisfied === true, live_source_fetching_enabled: false, automatic_source_verification_claimed: false }),
      provider_payload_summary: Object.freeze({ reviewed_without_raw_secrets: operatorRows.find((row) => row.id === 'provider_payload_summary_reviewed_without_raw_secrets')?.satisfied === true, raw_payload_exported: false, provider_call_performed: false }),
      credential_boundary_summary: Object.freeze({ fake_secret_only: true, raw_credentials_persisted: false, token_storage_enabled: false, credential_header_recorded: false }),
      budget_summary: Object.freeze({ budget_preview_present: Boolean(budget.budget_preview), max_request_count: budget.max_request_count, live_cost_api_connected: false }),
      timeout_summary: Object.freeze({ timeout_limit_ms: budget.timeout_limit_ms, timeout_enforced_as_metadata: Boolean(budget.timeout_limit_ms), background_execution_allowed: false }),
      abort_reason: options.abort_reason || null,
      failure_reasons: collectFailureReasons(options),
      no_execution_report: fallback
    };
    session.checksum = deterministicChecksum(Object.assign({}, session, { checksum: null }));
    return Object.freeze(session);
  }

  function transitionSession(session, event, options = {}){
    const current = asRecord(session);
    const currentState = current.state || SESSION_STATES.IDLE;
    const eventId = typeof event === 'string' ? event : asRecord(event).type;
    if (TERMINAL_STATES.includes(currentState)) {
      return Object.freeze({ state: currentState, transition_blocked: true, reason: 'terminal_session_requires_new_session_id', requires_new_session_id: true, can_rearm_same_session: false });
    }
    if (eventId === 'failed_precondition') return Object.freeze({ state: SESSION_STATES.BLOCKED, reason: 'failed_preconditions_block_session', can_rearm_same_session: false });
    if (eventId === 'operator_abort') return Object.freeze({ state: SESSION_STATES.KILL_SWITCH_TRIGGERED, reason: options.abort_reason || 'operator_abort', can_rearm_same_session: false });
    if (eventId === 'timeout') return Object.freeze({ state: SESSION_STATES.TIMED_OUT, reason: 'timeout_limit_reached', can_rearm_same_session: false });
    if (eventId === 'complete_no_execution') return Object.freeze({ state: SESSION_STATES.COMPLETED_NO_EXECUTION, reason: 'completed_without_execution', can_rearm_same_session: false });
    if (eventId === 'operator_review') return Object.freeze({ state: SESSION_STATES.OPERATOR_REVIEW_REQUIRED, reason: 'operator_review_required', can_rearm_same_session: true });
    if (eventId === 'arm') return Object.freeze({ state: SESSION_STATES.OPERATOR_ARMED, reason: 'operator_armed_for_simulation_only', can_rearm_same_session: true, live_execution_enabled: false });
    if (eventId === 'start_simulation') return Object.freeze({ state: SESSION_STATES.SIMULATED_RUNNING, reason: 'simulated_running_no_execution', can_rearm_same_session: true, live_execution_enabled: false });
    return Object.freeze({ state: SESSION_STATES.IDLE, reason: 'unknown_event_no_transition', can_rearm_same_session: true });
  }

  function buildKillSwitchReport(options = {}){
    const session = asRecord(options.session || {});
    const aborted = asBool(options.operator_abort_requested);
    const timedOut = asBool(options.timeout_triggered);
    const transition = timedOut ? transitionSession(session, 'timeout', options) : aborted ? transitionSession(session, 'operator_abort', options) : transitionSession(session, 'operator_review', options);
    return Object.freeze({
      kill_switch_drill_version: VERSION,
      session_id: session.session_id || options.session_id || defaultSessionId(options.now),
      from_state: session.state || SESSION_STATES.IDLE,
      to_state: transition.state,
      operator_abort_requested: aborted,
      timeout_triggered: timedOut,
      abort_reason: options.abort_reason || transition.reason,
      requires_new_session_id_after_terminal: TERMINAL_STATES.includes(transition.state),
      safe_metadata_only: true,
      raw_credentials_recorded: false,
      raw_tokens_recorded: false,
      provider_call_performed: false,
      live_source_fetching_performed: false,
      checksum: deterministicChecksum({ session_id: session.session_id || options.session_id || defaultSessionId(options.now), to_state: transition.state, reason: transition.reason })
    });
  }

  function buildManualExecutionSafetyCockpit(options = {}){
    const now = options.now || new Date(0).toISOString();
    const state = options.state || deriveInitialState(options);
    const budget = buildBudgetGuardrails(options);
    const operatorRows = buildOperatorPreconditions(options);
    const continuity = buildContinuitySummary(options);
    const fallback = buildNoExecutionFallbackReport(options);
    const ledger = buildSafeSessionLedger(Object.assign({}, options, { now, state }));
    const killSwitch = buildKillSwitchReport({ now, session: ledger, operator_abort_requested: options.operator_abort_requested, timeout_triggered: options.timeout_triggered, abort_reason: options.abort_reason });
    const report = {
      manual_execution_safety_cockpit_version: VERSION,
      generated_at: now,
      stable_baseline: STABLE_BASELINE,
      mock_to_live_baseline: MOCK_TO_LIVE_BASELINE,
      source_acquisition_baseline: SOURCE_ACQUISITION_BASELINE,
      credential_boundary_baseline: CREDENTIAL_BOUNDARY_BASELINE,
      candidate_gate_baseline: CANDIDATE_GATE_BASELINE,
      manual_safety_cockpit_baseline: MANUAL_PROTOTYPE_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      session_state_machine: SESSION_STATES,
      required_states: Object.freeze(Object.values(SESSION_STATES)),
      state,
      readiness_status: state === SESSION_STATES.OPERATOR_ARMED ? 'armed_for_simulation_only' : state === SESSION_STATES.PREFLIGHT_READY ? 'preflight_ready_no_execution' : 'blocked_or_review_required',
      blockers: fallback.failure_reasons,
      kill_switch_status: killSwitch,
      budget_guardrails: budget,
      operator_preconditions: operatorRows,
      continuity_summary: continuity,
      required_continuity_layers: REQUIRED_CONTINUITY_LAYERS,
      safe_session_ledger: ledger,
      no_execution_fallback_report: fallback,
      allowed_ledger_fields: ALLOWED_LEDGER_FIELDS,
      forbidden_ledger_fields: FORBIDDEN_LEDGER_FIELDS,
      boundary_flags: BOUNDARY_FLAGS,
      safe_metadata_only: true,
      can_execute_now: false,
      live_provider_execution_enabled: false,
      live_provider_execution_performed: false,
      live_source_fetching_enabled: false,
      live_source_fetching_performed: false,
      hidden_network_calls_allowed: false,
      production_oauth_enabled: false,
      real_api_keys_stored: false,
      real_token_storage_enabled: false,
      credential_persistence_allowed: false,
      backend_storage_expanded: false,
      automatic_source_fetching_enabled: false,
      automatic_source_verification_claimed: false,
      provider_suggested_source_auto_acceptance: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      cryptographic_signature_claimed: false,
      publication_permission_claimed: false,
      ok: true
    };
    report.checksum = deterministicChecksum(Object.assign({}, report, { checksum: null }));
    return Object.freeze(report);
  }

  function validateLedgerSafety(ledger){
    const record = asRecord(ledger);
    const keys = Object.keys(record).sort();
    const forbiddenPresent = keys.filter((key) => FORBIDDEN_LEDGER_FIELDS.includes(key));
    const outsideAllowed = keys.filter((key) => !ALLOWED_LEDGER_FIELDS.includes(key));
    const text = stableStringify(record).toLowerCase();
    const forbiddenTerms = ['access_token','refresh_token','client_secret','authorization_header','api_key_value','private_key_block','raw_provider_payload'];
    const forbiddenTermsPresent = forbiddenTerms.filter((term) => text.includes(term));
    return Object.freeze({
      ok: forbiddenPresent.length === 0 && outsideAllowed.length === 0 && forbiddenTermsPresent.length === 0,
      keys,
      forbidden_present: forbiddenPresent,
      outside_allowed_fields: outsideAllowed,
      forbidden_terms_present: forbiddenTermsPresent,
      safe_metadata_only: true
    });
  }

  root.manualExecutionSafetyCockpitSessionLedger = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    MANUAL_PROTOTYPE_BASELINE,
    CANDIDATE_GATE_BASELINE,
    CREDENTIAL_BOUNDARY_BASELINE,
    SOURCE_ACQUISITION_BASELINE,
    MOCK_TO_LIVE_BASELINE,
    MILESTONE,
    MODEL,
    SESSION_STATES,
    TERMINAL_STATES,
    ALLOWED_LEDGER_FIELDS,
    FORBIDDEN_LEDGER_FIELDS,
    BOUNDARY_FLAGS,
    REQUIRED_CONTINUITY_LAYERS,
    FAILURE_REASONS,
    buildBudgetGuardrails,
    buildOperatorPreconditions,
    buildContinuitySummary,
    buildNoExecutionFallbackReport,
    buildSafeSessionLedger,
    transitionSession,
    buildKillSwitchReport,
    buildManualExecutionSafetyCockpit,
    validateLedgerSafety
  });
})(typeof window !== 'undefined' ? window : globalThis);
