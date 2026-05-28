/* Jarbou3i Research Engine manual provider adapter sandbox + ephemeral invocation contract v1.4.0-alpha.12. */
/* No-network sandbox only. Disabled by default. No hidden network calls, real OAuth/token lifecycle, credential persistence, live source fetching, backend, or storage expansion enabled. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.12';
  const STABLE_BASELINE = '1.3.0';
  const SAFETY_COCKPIT_BASELINE = '1.4.0-alpha.12';
  const MANUAL_PROTOTYPE_BASELINE = '1.4.0-alpha.10';
  const CANDIDATE_GATE_BASELINE = '1.4.0-alpha.9';
  const CREDENTIAL_BOUNDARY_BASELINE = '1.4.0-alpha.8';
  const SOURCE_ACQUISITION_BASELINE = '1.4.0-alpha.7';
  const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
  const MILESTONE = 'v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract';
  const MODEL = 'manual_provider_adapter_sandbox_ephemeral_invocation_contract.v1';

  const SANDBOX_STATES = Object.freeze({
    DISABLED_BY_DEFAULT: 'disabled_by_default',
    OPERATOR_REVIEW_REQUIRED: 'operator_review_required',
    EPHEMERAL_CONTRACT_READY: 'ephemeral_contract_ready',
    DRY_INVOCATION_TRANSCRIPT_READY: 'dry_invocation_transcript_ready',
    BLOCKED: 'blocked',
    FAILED_PRECONDITION: 'failed_precondition'
  });

  const REQUIRED_PRECONDITIONS = Object.freeze([
    'operator_explicit_opt_in_recorded',
    'ephemeral_credential_handoff_acknowledged_without_storage',
    'provider_request_envelope_reviewed',
    'provider_payload_summary_confirmed_without_raw_secrets',
    'no_network_dry_invocation_acknowledged',
    'manual_response_metadata_only_acknowledged',
    'budget_timeout_request_limits_acknowledged',
    'kill_switch_available_before_invocation',
    'safety_cockpit_locked'
  ]);

  const ALLOWED_LEDGER_FIELDS = Object.freeze([
    'session_id',
    'created_at',
    'mode',
    'adapter_id',
    'state',
    'credential_handoff_summary',
    'provider_request_envelope_summary',
    'dry_invocation_transcript_summary',
    'response_metadata_summary',
    'operator_preconditions_summary',
    'failure_reasons',
    'boundary_flags',
    'checksum'
  ]);

  const FORBIDDEN_LEDGER_FIELDS = Object.freeze([
    'raw_credentials',
    'raw_tokens',
    'raw_api_keys',
    'authorization_headers',
    'raw_request_body',
    'raw_response_body',
    'raw_source_fetch_results',
    'raw_network_trace',
    'browser_session_secrets'
  ]);

  const BOUNDARY_FLAGS = Object.freeze({
    manual_provider_adapter_sandbox_only: true,
    no_network_dry_invocation_only: true,
    disabled_by_default: true,
    safe_metadata_only: true,
    ephemeral_credential_handoff_without_storage: true,
    live_provider_execution_enabled: false,
    live_provider_execution_performed: false,
    live_source_fetching_enabled: false,
    live_source_fetching_performed: false,
    hidden_network_calls_allowed: false,
    production_oauth_enabled: false,
    real_oauth_token_lifecycle_enabled: false,
    real_api_keys_stored: false,
    real_tokens_stored: false,
    credential_persistence_allowed: false,
    backend_behavior_changed: false,
    storage_behavior_changed: false,
    automatic_source_fetching_enabled: false,
    automatic_source_verification_claimed: false,
    provider_suggested_source_auto_acceptance: false,
    automatic_signoff_performed: false,
    automatic_export_lock_performed: false,
    cryptographic_signature_claimed: false,
    publication_permission_claimed: false
  });

  const FAILURE_TAXONOMY = Object.freeze([
    'manual_adapter_sandbox_disabled_by_default',
    'operator_explicit_opt_in_missing',
    'ephemeral_credential_handoff_not_acknowledged',
    'credential_storage_forbidden',
    'provider_request_envelope_not_reviewed',
    'provider_payload_secret_boundary_not_confirmed',
    'no_network_dry_invocation_not_acknowledged',
    'manual_response_metadata_only_not_acknowledged',
    'budget_timeout_request_limits_not_acknowledged',
    'kill_switch_not_available',
    'safety_cockpit_not_locked',
    'hidden_network_calls_forbidden',
    'live_source_fetching_forbidden',
    'oauth_token_lifecycle_forbidden',
    'backend_storage_expansion_forbidden',
    'automatic_verification_signoff_export_lock_forbidden',
    'publication_permission_claim_forbidden'
  ]);

  function asRecord(value){ return Object.prototype.toString.call(value) === '[object Object]' ? value : {}; }
  function asBool(value){ return value === true; }
  function asString(value, fallback){ return typeof value === 'string' && value.trim() ? value.trim() : fallback; }

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

  function getSafetyCockpitReport(options){
    if (options.safety_cockpit_report) return options.safety_cockpit_report;
    const mod = root.manualExecutionSafetyCockpitSessionLedger;
    if (mod && typeof mod.buildManualExecutionSafetyCockpit === 'function') {
      return mod.buildManualExecutionSafetyCockpit({ now: options.now });
    }
    return null;
  }

  function buildEphemeralCredentialHandoff(options = {}){
    const handoff = asRecord(options.ephemeral_credential_handoff);
    const acknowledged = asBool(handoff.operator_acknowledged_without_storage) || asBool(options.operator_acknowledged_ephemeral_handoff_without_storage);
    return Object.freeze({
      handoff_mode: asString(handoff.handoff_mode, 'manual_fake_reference_only'),
      credential_reference_type: asString(handoff.credential_reference_type, 'operator_supplied_ephemeral_reference'),
      operator_acknowledged_without_storage: acknowledged,
      raw_credential_received: false,
      raw_credential_persisted: false,
      raw_token_persisted: false,
      api_key_value_exported: false,
      authorization_header_constructed: false,
      oauth_token_lifecycle_enabled: false,
      browser_storage_used: false,
      failure_reason: acknowledged ? null : 'ephemeral_credential_handoff_not_acknowledged',
      safe_metadata_only: true
    });
  }

  function buildProviderRequestEnvelopePreview(options = {}){
    const request = asRecord(options.provider_request_preview);
    const adapterId = asString(request.adapter_id || options.adapter_id, 'manual-provider-adapter-sandbox');
    const operationId = asString(request.operation_id, 'dry-invocation-preview');
    const reviewed = asBool(request.operator_reviewed) || asBool(options.provider_request_envelope_reviewed);
    const payloadClean = asBool(request.provider_payload_summary_confirmed_without_raw_secrets) || asBool(options.provider_payload_summary_confirmed_without_raw_secrets);
    return Object.freeze({
      adapter_id: adapterId,
      operation_id: operationId,
      method_preview: asString(request.method_preview, 'POST_PREVIEW_ONLY'),
      endpoint_preview: 'redacted-no-network-endpoint',
      endpoint_url_exported: false,
      provider_family: asString(request.provider_family, 'manual_provider'),
      request_intent: asString(request.request_intent, 'operator_review_only'),
      operator_reviewed: reviewed,
      provider_payload_summary_confirmed_without_raw_secrets: payloadClean,
      raw_request_body_included: false,
      raw_headers_included: false,
      authorization_header_included: false,
      network_invocation_allowed: false,
      network_invocation_performed: false,
      failure_reasons: Object.freeze([
        reviewed ? null : 'provider_request_envelope_not_reviewed',
        payloadClean ? null : 'provider_payload_secret_boundary_not_confirmed'
      ].filter(Boolean)),
      safe_metadata_only: true
    });
  }

  function buildNoNetworkDryInvocationTranscript(options = {}){
    const transcript = asRecord(options.dry_invocation_transcript);
    const acknowledged = asBool(transcript.operator_acknowledged_no_network) || asBool(options.no_network_dry_invocation_acknowledged);
    const responseMetadataOnly = asBool(transcript.manual_response_metadata_only_acknowledged) || asBool(options.manual_response_metadata_only_acknowledged);
    const steps = Object.freeze([
      Object.freeze({ step: 'preflight_snapshot_loaded', performed: true, network_allowed: false }),
      Object.freeze({ step: 'ephemeral_handoff_reference_checked', performed: true, network_allowed: false }),
      Object.freeze({ step: 'provider_request_envelope_previewed', performed: true, network_allowed: false }),
      Object.freeze({ step: 'network_invocation_blocked_by_design', performed: true, network_allowed: false }),
      Object.freeze({ step: 'manual_response_metadata_placeholder_recorded', performed: responseMetadataOnly, network_allowed: false })
    ]);
    return Object.freeze({
      transcript_id: asString(transcript.transcript_id, 'dry-transcript-preview-001'),
      operator_acknowledged_no_network: acknowledged,
      manual_response_metadata_only_acknowledged: responseMetadataOnly,
      steps,
      provider_call_performed: false,
      source_fetching_performed: false,
      network_request_count: 0,
      raw_response_body_recorded: false,
      response_metadata_summary: Object.freeze({
        response_origin: 'manual_placeholder_only',
        status_preview: 'not_invoked',
        raw_response_exported: false,
        safe_metadata_only: true
      }),
      failure_reasons: Object.freeze([
        acknowledged ? null : 'no_network_dry_invocation_not_acknowledged',
        responseMetadataOnly ? null : 'manual_response_metadata_only_not_acknowledged'
      ].filter(Boolean)),
      safe_metadata_only: true
    });
  }

  function buildOperatorPreconditionRows(options = {}){
    const manual = asRecord(options.manual_operator_controls);
    const safety = getSafetyCockpitReport(options);
    const rows = [
      ['operator_explicit_opt_in_recorded', asBool(manual.operator_explicit_opt_in_recorded), 'operator_explicit_opt_in_missing'],
      ['ephemeral_credential_handoff_acknowledged_without_storage', asBool(manual.ephemeral_credential_handoff_acknowledged_without_storage), 'ephemeral_credential_handoff_not_acknowledged'],
      ['provider_request_envelope_reviewed', asBool(manual.provider_request_envelope_reviewed), 'provider_request_envelope_not_reviewed'],
      ['provider_payload_summary_confirmed_without_raw_secrets', asBool(manual.provider_payload_summary_confirmed_without_raw_secrets), 'provider_payload_secret_boundary_not_confirmed'],
      ['no_network_dry_invocation_acknowledged', asBool(manual.no_network_dry_invocation_acknowledged), 'no_network_dry_invocation_not_acknowledged'],
      ['manual_response_metadata_only_acknowledged', asBool(manual.manual_response_metadata_only_acknowledged), 'manual_response_metadata_only_not_acknowledged'],
      ['budget_timeout_request_limits_acknowledged', asBool(manual.budget_timeout_request_limits_acknowledged), 'budget_timeout_request_limits_not_acknowledged'],
      ['kill_switch_available_before_invocation', asBool(manual.kill_switch_available_before_invocation), 'kill_switch_not_available'],
      ['safety_cockpit_locked', Boolean(safety && safety.ok === true && safety.safe_metadata_only === true), 'safety_cockpit_not_locked']
    ];
    return Object.freeze(rows.map(([id, satisfied, failure_reason]) => Object.freeze({
      id,
      satisfied,
      failure_reason,
      authorizes_execution_now: false,
      network_invocation_allowed: false,
      credential_persistence_allowed: false
    })));
  }

  function buildAdapterFailureTaxonomy(preconditionRows, envelope, transcript){
    const dynamic = [];
    preconditionRows.forEach((row) => { if (!row.satisfied) dynamic.push(row.failure_reason); });
    asRecord(envelope).failure_reasons?.forEach?.((reason) => dynamic.push(reason));
    asRecord(transcript).failure_reasons?.forEach?.((reason) => dynamic.push(reason));
    return Object.freeze(Array.from(new Set([...FAILURE_TAXONOMY, ...dynamic])));
  }

  function summarizePreconditions(rows){
    const missing = rows.filter((row) => !row.satisfied).map((row) => row.id);
    return Object.freeze({
      required_count: rows.length,
      satisfied_count: rows.length - missing.length,
      missing_count: missing.length,
      missing,
      authorizes_execution_now: false
    });
  }

  function buildSafeAdapterInvocationLedger(options = {}){
    const handoff = options.credential_handoff_summary || buildEphemeralCredentialHandoff(options);
    const envelope = options.provider_request_envelope_summary || buildProviderRequestEnvelopePreview(options);
    const transcript = options.dry_invocation_transcript_summary || buildNoNetworkDryInvocationTranscript(options);
    const preconditions = options.operator_preconditions_summary || summarizePreconditions(buildOperatorPreconditionRows(options));
    const failureReasons = options.failure_reasons || buildAdapterFailureTaxonomy(buildOperatorPreconditionRows(options), envelope, transcript);
    const ledger = {
      session_id: asString(options.session_id, `manual-adapter-session-${VERSION}`),
      created_at: asString(options.now, new Date(0).toISOString()),
      mode: 'manual_provider_adapter_sandbox_no_network',
      adapter_id: envelope.adapter_id,
      state: asString(options.state, SANDBOX_STATES.BLOCKED),
      credential_handoff_summary: handoff,
      provider_request_envelope_summary: envelope,
      dry_invocation_transcript_summary: transcript,
      response_metadata_summary: transcript.response_metadata_summary,
      operator_preconditions_summary: preconditions,
      failure_reasons: Object.freeze(Array.from(new Set(failureReasons))),
      boundary_flags: BOUNDARY_FLAGS,
      checksum: null
    };
    ledger.checksum = deterministicChecksum(Object.assign({}, ledger, { checksum: null }));
    return Object.freeze(ledger);
  }

  function validateAdapterLedgerSafety(ledger){
    const record = asRecord(ledger);
    const keys = Object.keys(record).sort();
    const forbiddenPresent = keys.filter((key) => FORBIDDEN_LEDGER_FIELDS.includes(key));
    const outsideAllowed = keys.filter((key) => !ALLOWED_LEDGER_FIELDS.includes(key));
    const text = stableStringify(record).toLowerCase();
    const forbiddenTerms = ['access_token','refresh_token','client_secret','private_key_block','bearer '];
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

  function buildManualProviderAdapterSandbox(options = {}){
    const preconditions = buildOperatorPreconditionRows(options);
    const preconditionSummary = summarizePreconditions(preconditions);
    const handoff = buildEphemeralCredentialHandoff(Object.assign({}, options, {
      operator_acknowledged_ephemeral_handoff_without_storage: preconditions.some((row) => row.id === 'ephemeral_credential_handoff_acknowledged_without_storage' && row.satisfied)
    }));
    const envelope = buildProviderRequestEnvelopePreview(Object.assign({}, options, {
      provider_request_envelope_reviewed: preconditions.some((row) => row.id === 'provider_request_envelope_reviewed' && row.satisfied),
      provider_payload_summary_confirmed_without_raw_secrets: preconditions.some((row) => row.id === 'provider_payload_summary_confirmed_without_raw_secrets' && row.satisfied)
    }));
    const transcript = buildNoNetworkDryInvocationTranscript(Object.assign({}, options, {
      no_network_dry_invocation_acknowledged: preconditions.some((row) => row.id === 'no_network_dry_invocation_acknowledged' && row.satisfied),
      manual_response_metadata_only_acknowledged: preconditions.some((row) => row.id === 'manual_response_metadata_only_acknowledged' && row.satisfied)
    }));
    const failureReasons = buildAdapterFailureTaxonomy(preconditions, envelope, transcript);
    const readyForDryTranscript = preconditionSummary.missing_count === 0;
    const state = readyForDryTranscript ? SANDBOX_STATES.DRY_INVOCATION_TRANSCRIPT_READY : SANDBOX_STATES.BLOCKED;
    const ledger = buildSafeAdapterInvocationLedger(Object.assign({}, options, {
      state,
      credential_handoff_summary: handoff,
      provider_request_envelope_summary: envelope,
      dry_invocation_transcript_summary: transcript,
      operator_preconditions_summary: preconditionSummary,
      failure_reasons: failureReasons
    }));
    const safety = validateAdapterLedgerSafety(ledger);
    const report = {
      manual_provider_adapter_sandbox_version: VERSION,
      generated_at: asString(options.now, new Date(0).toISOString()),
      milestone: MILESTONE,
      model: MODEL,
      state,
      readiness_status: readyForDryTranscript ? 'dry_invocation_transcript_ready_no_network' : 'blocked_no_network_sandbox',
      required_preconditions: REQUIRED_PRECONDITIONS,
      operator_preconditions: preconditions,
      credential_handoff_summary: handoff,
      provider_request_envelope_preview: envelope,
      no_network_dry_invocation_transcript: transcript,
      adapter_failure_taxonomy: failureReasons,
      safe_invocation_ledger: ledger,
      ledger_safety: safety,
      boundary_flags: BOUNDARY_FLAGS,
      can_execute_now: false,
      network_invocation_allowed: false,
      live_provider_execution_enabled: false,
      live_provider_execution_performed: false,
      live_source_fetching_enabled: false,
      live_source_fetching_performed: false,
      hidden_network_calls_allowed: false,
      production_oauth_enabled: false,
      real_oauth_token_lifecycle_enabled: false,
      real_api_keys_stored: false,
      real_tokens_stored: false,
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
      ok: true
    };
    report.checksum = deterministicChecksum(Object.assign({}, report, { checksum: null }));
    return Object.freeze(report);
  }

  root.manualProviderAdapterSandboxEphemeralInvocationContract = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    SAFETY_COCKPIT_BASELINE,
    MANUAL_PROTOTYPE_BASELINE,
    CANDIDATE_GATE_BASELINE,
    CREDENTIAL_BOUNDARY_BASELINE,
    SOURCE_ACQUISITION_BASELINE,
    MOCK_TO_LIVE_BASELINE,
    MILESTONE,
    MODEL,
    SANDBOX_STATES,
    REQUIRED_PRECONDITIONS,
    ALLOWED_LEDGER_FIELDS,
    FORBIDDEN_LEDGER_FIELDS,
    BOUNDARY_FLAGS,
    FAILURE_TAXONOMY,
    deterministicChecksum,
    buildEphemeralCredentialHandoff,
    buildProviderRequestEnvelopePreview,
    buildNoNetworkDryInvocationTranscript,
    buildOperatorPreconditionRows,
    buildAdapterFailureTaxonomy,
    buildSafeAdapterInvocationLedger,
    validateAdapterLedgerSafety,
    buildManualProviderAdapterSandbox
  });
})(typeof window !== 'undefined' ? window : globalThis);
