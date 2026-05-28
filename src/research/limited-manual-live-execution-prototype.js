/* Jarbou3i Research Engine limited manual live-execution prototype v1.4.0-alpha.10. */
/* Manual opt-in shell only. Disabled by default. No hidden network calls, OAuth/token lifecycle, credential persistence, automatic source fetching, backend, or storage expansion enabled. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.10';
  const STABLE_BASELINE = '1.3.0';
  const CANDIDATE_GATE_BASELINE = '1.4.0-alpha.9';
  const CREDENTIAL_BOUNDARY_BASELINE = '1.4.0-alpha.8';
  const SOURCE_ACQUISITION_BASELINE = '1.4.0-alpha.7';
  const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
  const MILESTONE = 'v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype';
  const MODEL = 'limited_manual_live_execution_prototype.v1';

  const PROTOTYPE_STATES = Object.freeze({
    DISABLED_BY_DEFAULT: 'disabled_by_default',
    MANUAL_PRECONDITIONS_MISSING: 'manual_preconditions_missing',
    MANUAL_PROTOTYPE_READY_FOR_REVIEW: 'manual_prototype_ready_for_review'
  });

  const REQUIRED_PRECONDITIONS = Object.freeze([
    'operator_explicit_opt_in_recorded',
    'operator_runtime_abort_acknowledged',
    'operator_cost_timeout_limits_acknowledged',
    'ephemeral_credential_handoff_confirmed_without_storage',
    'source_scope_reviewed_without_auto_fetch',
    'provider_payload_reviewed_without_secrets',
    'failure_ux_reviewed_before_manual_attempt',
    'candidate_gate_locked',
    'credential_boundary_locked',
    'source_acquisition_locked'
  ]);

  const BOUNDARY_FLAGS = Object.freeze({
    manual_only_live_execution_prototype_shell: true,
    disabled_by_default: true,
    execution_enabled_by_default: false,
    execution_enabled_now: false,
    live_provider_execution_performed: false,
    live_source_fetching_performed: false,
    hidden_network_calls_allowed: false,
    background_execution_allowed: false,
    production_oauth_enabled: false,
    real_api_keys_stored: false,
    real_token_storage_enabled: false,
    credential_persistence_allowed: false,
    backend_behavior_changed: false,
    storage_behavior_changed: false,
    automatic_source_fetching_enabled: false,
    automatic_source_verification_claimed: false,
    provider_suggested_source_auto_acceptance: false,
    automatic_signoff_performed: false,
    automatic_export_lock_performed: false,
    cryptographic_signature_claimed: false,
    publication_permission_claimed: false,
    safe_metadata_only: true,
    deterministic_fixture_backed: true,
    hard_failure_reasons_required: true
  });

  const HARD_FAILURE_REASONS = Object.freeze([
    'manual_live_execution_disabled_by_default',
    'operator_explicit_opt_in_missing',
    'runtime_abort_control_not_confirmed',
    'cost_timeout_limits_not_confirmed',
    'ephemeral_credential_handoff_absent',
    'credential_storage_forbidden',
    'source_scope_not_reviewed',
    'automatic_source_fetching_forbidden',
    'provider_payload_secret_boundary_not_confirmed',
    'background_execution_forbidden',
    'oauth_token_lifecycle_forbidden',
    'backend_storage_expansion_forbidden',
    'automatic_verification_signoff_export_lock_forbidden',
    'publication_permission_claim_forbidden'
  ]);

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

  function asRecord(value){
    return Object.prototype.toString.call(value) === '[object Object]' ? value : {};
  }

  function asBoolean(value){
    return value === true;
  }

  function getCandidateGateReport(options){
    if (options.candidate_gate_report) return options.candidate_gate_report;
    const mod = root.controlledExecutionCandidateGate;
    if (mod && typeof mod.buildNoExecutionDryCandidateReport === 'function') return mod.buildNoExecutionDryCandidateReport({ now: options.now });
    return null;
  }

  function getCredentialBoundaryReport(options){
    if (options.credential_boundary_report) return options.credential_boundary_report;
    const mod = root.credentialBoundaryRuntimeDrill;
    if (mod && typeof mod.runCredentialBoundaryRuntimeDrill === 'function') return mod.runCredentialBoundaryRuntimeDrill({ now: options.now });
    return null;
  }

  function getSourceAcquisitionAudit(options){
    if (options.source_acquisition_audit) return options.source_acquisition_audit;
    const mod = root.sourceAcquisitionControlSurface;
    if (mod && typeof mod.auditSourceAcquisitionControlSurface === 'function') return mod.auditSourceAcquisitionControlSurface({ now: options.now });
    return null;
  }

  function buildManualPreconditionRows(options = {}){
    const manual = asRecord(options.manual_operator_controls);
    const candidate = getCandidateGateReport(options);
    const credential = getCredentialBoundaryReport(options);
    const source = getSourceAcquisitionAudit(options);
    const rows = [
      {
        id: 'operator_explicit_opt_in_recorded',
        label: 'Explicit operator opt-in recorded',
        satisfied: asBoolean(manual.operator_explicit_opt_in_recorded),
        failure_reason: 'operator_explicit_opt_in_missing',
        evidence: 'Manual live prototype shell cannot advance without an explicit per-run operator opt-in.'
      },
      {
        id: 'operator_runtime_abort_acknowledged',
        label: 'Runtime abort control acknowledged',
        satisfied: asBoolean(manual.operator_runtime_abort_acknowledged),
        failure_reason: 'runtime_abort_control_not_confirmed',
        evidence: 'Manual attempts require a visible abort control before any future live call path can be considered.'
      },
      {
        id: 'operator_cost_timeout_limits_acknowledged',
        label: 'Cost and timeout limits acknowledged',
        satisfied: asBoolean(manual.operator_cost_timeout_limits_acknowledged),
        failure_reason: 'cost_timeout_limits_not_confirmed',
        evidence: 'Manual attempts require bounded cost, timeout, and retry limits.'
      },
      {
        id: 'ephemeral_credential_handoff_confirmed_without_storage',
        label: 'Ephemeral credential handoff confirmed without storage',
        satisfied: asBoolean(manual.ephemeral_credential_handoff_confirmed_without_storage),
        failure_reason: 'ephemeral_credential_handoff_absent',
        evidence: 'The prototype shell may only reference an ephemeral handoff; it must not persist credentials.'
      },
      {
        id: 'source_scope_reviewed_without_auto_fetch',
        label: 'Source scope reviewed without automatic fetch',
        satisfied: asBoolean(manual.source_scope_reviewed_without_auto_fetch),
        failure_reason: 'source_scope_not_reviewed',
        evidence: 'Source scope must be reviewed manually; automatic source fetching stays forbidden.'
      },
      {
        id: 'provider_payload_reviewed_without_secrets',
        label: 'Provider payload reviewed without secrets',
        satisfied: asBoolean(manual.provider_payload_reviewed_without_secrets),
        failure_reason: 'provider_payload_secret_boundary_not_confirmed',
        evidence: 'Provider payload review must confirm safe metadata only and no raw credentials.'
      },
      {
        id: 'failure_ux_reviewed_before_manual_attempt',
        label: 'Failure UX reviewed before manual attempt',
        satisfied: asBoolean(manual.failure_ux_reviewed_before_manual_attempt),
        failure_reason: 'failure_ux_not_reviewed',
        evidence: 'Operator must review failure UX before any future manual live attempt.'
      },
      {
        id: 'candidate_gate_locked',
        label: 'Controlled execution candidate gate locked',
        satisfied: Boolean(candidate && (candidate.ok === true || candidate.controlled_execution_candidate_only === true)),
        failure_reason: 'candidate_gate_not_locked',
        evidence: 'Locked alpha.9 candidate gate is required as a baseline.'
      },
      {
        id: 'credential_boundary_locked',
        label: 'Credential boundary runtime drill locked',
        satisfied: Boolean(credential && credential.ok === true),
        failure_reason: 'credential_boundary_not_locked',
        evidence: 'Locked alpha.8 credential boundary drill must remain green.'
      },
      {
        id: 'source_acquisition_locked',
        label: 'Source acquisition control surface locked',
        satisfied: Boolean(source && source.ok === true),
        failure_reason: 'source_acquisition_not_locked',
        evidence: 'Locked alpha.7 source acquisition control surface must remain green.'
      }
    ];
    return Object.freeze(rows.map((row) => Object.freeze(Object.assign({}, row, {
      live_execution_enabled: false,
      authorizes_execution_now: false,
      credential_persistence_allowed: false,
      automatic_source_fetching_enabled: false,
      background_execution_allowed: false
    }))));
  }

  function buildLimitedManualLiveExecutionPrototype(options = {}){
    const preconditions = buildManualPreconditionRows(options);
    const missingPreconditions = preconditions.filter((row) => row.satisfied !== true);
    const dynamicFailureReasons = missingPreconditions.map((row) => row.failure_reason);
    const allFailureReasons = Array.from(new Set([...HARD_FAILURE_REASONS, ...dynamicFailureReasons]));
    const allManualSatisfied = missingPreconditions.length === 0;
    const report = {
      limited_manual_live_execution_prototype_version: VERSION,
      generated_at: options.now || new Date().toISOString(),
      stable_baseline: STABLE_BASELINE,
      candidate_gate_baseline: CANDIDATE_GATE_BASELINE,
      credential_boundary_baseline: CREDENTIAL_BOUNDARY_BASELINE,
      source_acquisition_baseline: SOURCE_ACQUISITION_BASELINE,
      mock_to_live_baseline: MOCK_TO_LIVE_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      prototype_state: allManualSatisfied ? PROTOTYPE_STATES.MANUAL_PROTOTYPE_READY_FOR_REVIEW : PROTOTYPE_STATES.MANUAL_PRECONDITIONS_MISSING,
      manual_only_live_execution_prototype_shell: true,
      disabled_by_default: true,
      execution_enabled: false,
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
      backend_storage_expanded: false,
      automatic_source_fetching_enabled: false,
      automatic_source_verification_claimed: false,
      provider_suggested_source_auto_acceptance: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      cryptographic_signature_claimed: false,
      publication_permission_claimed: false,
      safe_metadata_only: true,
      boundary_flags: BOUNDARY_FLAGS,
      required_preconditions: REQUIRED_PRECONDITIONS,
      manual_preconditions: preconditions,
      missing_preconditions: missingPreconditions.map((row) => row.id),
      missing_precondition_count: missingPreconditions.length,
      hard_failure_reasons: allFailureReasons,
      hard_failure_reason_count: allFailureReasons.length,
      prototype_shell_ready_for_manual_review: allManualSatisfied,
      release_gate: 'limited_manual_live_execution_prototype_shell_ready',
      ok: true,
      can_execute_now: false,
      boundary_statement: 'Limited manual live-execution prototype is a disabled-by-default manual opt-in shell. It records explicit preconditions and hard failure reasons, but performs no live provider execution, source fetching, hidden network call, OAuth/token lifecycle, credential persistence, background execution, automatic verification, signoff, export lock, signature, or publication permission claim.'
    };
    return Object.freeze(Object.assign(report, { prototype_shell_checksum: deterministicChecksum(report) }));
  }

  function evaluateLimitedManualLiveExecutionPrototype(options = {}){
    return buildLimitedManualLiveExecutionPrototype(options);
  }

  root.limitedManualLiveExecutionPrototype = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    CANDIDATE_GATE_BASELINE,
    CREDENTIAL_BOUNDARY_BASELINE,
    SOURCE_ACQUISITION_BASELINE,
    MOCK_TO_LIVE_BASELINE,
    MILESTONE,
    MODEL,
    PROTOTYPE_STATES,
    REQUIRED_PRECONDITIONS,
    BOUNDARY_FLAGS,
    HARD_FAILURE_REASONS,
    deterministicChecksum,
    buildManualPreconditionRows,
    buildLimitedManualLiveExecutionPrototype,
    evaluateLimitedManualLiveExecutionPrototype
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
