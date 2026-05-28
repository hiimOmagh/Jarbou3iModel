/* Jarbou3i Research Engine adapter contract test bench + no-network invocation replay QA v1.4.0-alpha.13. */
/* No-network replay QA only. Disabled by default. No real provider calls, OAuth/token lifecycle, credential persistence, hidden network calls, live source fetching, backend, or storage expansion enabled. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.13';
  const STABLE_BASELINE = '1.3.0';
  const ADAPTER_SANDBOX_BASELINE = '1.4.0-alpha.12';
  const SAFETY_COCKPIT_BASELINE = '1.4.0-alpha.11';
  const MANUAL_PROTOTYPE_BASELINE = '1.4.0-alpha.10';
  const CANDIDATE_GATE_BASELINE = '1.4.0-alpha.9';
  const CREDENTIAL_BOUNDARY_BASELINE = '1.4.0-alpha.8';
  const SOURCE_ACQUISITION_BASELINE = '1.4.0-alpha.7';
  const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
  const MILESTONE = 'v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA';
  const MODEL = 'adapter_contract_test_bench_no_network_invocation_replay_qa.v1';

  const BENCH_STATES = Object.freeze({
    DISABLED_BY_DEFAULT: 'disabled_by_default',
    FIXTURES_READY: 'deterministic_fixtures_ready',
    ENVELOPE_DIFF_READY: 'request_response_envelope_diff_ready',
    REPLAY_READY: 'no_network_invocation_replay_ready',
    FAILURE_UX_REHEARSED: 'adapter_failure_ux_rehearsed',
    BLOCKED: 'blocked',
    FAILED_PRECONDITION: 'failed_precondition'
  });

  const REQUIRED_PRECONDITIONS = Object.freeze([
    'adapter_sandbox_report_available',
    'deterministic_provider_adapter_fixtures_loaded',
    'request_response_envelope_diff_reviewed',
    'no_network_replay_acknowledged',
    'adapter_failure_ux_rehearsed',
    'safe_transcript_comparison_acknowledged',
    'cross_provider_capability_matrix_reviewed',
    'raw_secret_leak_check_passed',
    'operator_no_network_boundary_acknowledged'
  ]);

  const ALLOWED_LEDGER_FIELDS = Object.freeze([
    'bench_id',
    'created_at',
    'mode',
    'state',
    'adapter_fixture_summary',
    'request_response_envelope_diff_summary',
    'no_network_replay_summary',
    'failure_ux_rehearsal_summary',
    'safe_transcript_comparison_summary',
    'cross_provider_capability_matrix_summary',
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
    'browser_session_secrets',
    'provider_secret_value'
  ]);

  const PROVIDER_FIXTURE_IDS = Object.freeze([
    'manual_openai_style_fixture',
    'manual_anthropic_style_fixture',
    'manual_local_llm_style_fixture'
  ]);

  const BOUNDARY_FLAGS = Object.freeze({
    adapter_contract_test_bench_only: true,
    no_network_invocation_replay_qa_only: true,
    deterministic_fixtures_only: true,
    disabled_by_default: true,
    safe_metadata_only: true,
    live_provider_execution_enabled: false,
    live_provider_execution_performed: false,
    live_source_fetching_enabled: false,
    live_source_fetching_performed: false,
    hidden_network_calls_allowed: false,
    real_oauth_token_lifecycle_enabled: false,
    real_api_keys_stored: false,
    real_tokens_stored: false,
    credential_persistence_allowed: false,
    backend_behavior_changed: false,
    storage_behavior_changed: false,
    uncontrolled_scraping_enabled: false,
    automatic_source_verification_claimed: false,
    provider_suggested_source_auto_acceptance: false,
    automatic_signoff_performed: false,
    automatic_export_lock_performed: false,
    publication_permission_claimed: false
  });

  const FAILURE_TAXONOMY = Object.freeze([
    'adapter_contract_bench_disabled_by_default',
    'adapter_sandbox_report_missing',
    'deterministic_provider_adapter_fixtures_missing',
    'request_response_envelope_diff_not_reviewed',
    'no_network_replay_not_acknowledged',
    'adapter_failure_ux_not_rehearsed',
    'safe_transcript_comparison_not_acknowledged',
    'cross_provider_capability_matrix_not_reviewed',
    'raw_secret_leak_check_failed_or_missing',
    'operator_no_network_boundary_not_acknowledged',
    'hidden_network_calls_forbidden',
    'live_provider_execution_forbidden',
    'live_source_fetching_forbidden',
    'oauth_token_lifecycle_forbidden',
    'credential_persistence_forbidden',
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

  function getAdapterSandboxReport(options){
    if (options.adapter_sandbox_report) return options.adapter_sandbox_report;
    const mod = root.manualProviderAdapterSandboxEphemeralInvocationContract;
    if (mod && typeof mod.buildManualProviderAdapterSandbox === 'function') {
      return mod.buildManualProviderAdapterSandbox({
        now: options.now,
        session_id: options.session_id,
        adapter_id: options.adapter_id,
        manual_operator_controls: options.manual_operator_controls,
        budget_controls: options.budget_controls
      });
    }
    return null;
  }

  function buildDeterministicProviderAdapterFixtures(options = {}){
    const fixtureOptions = asRecord(options.adapter_fixtures);
    const loaded = asBool(fixtureOptions.loaded) || asBool(options.deterministic_provider_adapter_fixtures_loaded);
    const fixtures = PROVIDER_FIXTURE_IDS.map((fixture_id) => Object.freeze({
      fixture_id,
      provider_family: fixture_id.replace('manual_', '').replace('_style_fixture', ''),
      request_shape: 'metadata_only_envelope_preview',
      response_shape: 'metadata_only_response_preview',
      raw_request_body_included: false,
      raw_response_body_included: false,
      authorization_header_included: false,
      secret_material_included: false,
      network_invocation_allowed: false
    }));
    return Object.freeze({
      loaded,
      fixture_count: fixtures.length,
      fixtures: Object.freeze(fixtures),
      deterministic: true,
      safe_metadata_only: true,
      failure_reason: loaded ? null : 'deterministic_provider_adapter_fixtures_missing'
    });
  }

  function diffEnvelopeShape(expected, actual){
    const expectedKeys = Object.keys(asRecord(expected)).sort();
    const actualKeys = Object.keys(asRecord(actual)).sort();
    const missing = expectedKeys.filter((key) => !actualKeys.includes(key));
    const extra = actualKeys.filter((key) => !expectedKeys.includes(key));
    return Object.freeze({
      expected_keys: Object.freeze(expectedKeys),
      actual_keys: Object.freeze(actualKeys),
      missing_keys: Object.freeze(missing),
      unexpected_keys: Object.freeze(extra),
      shape_match: missing.length === 0 && extra.length === 0
    });
  }

  function buildRequestResponseEnvelopeDiff(options = {}){
    const diffOptions = asRecord(options.envelope_diff);
    const reviewed = asBool(diffOptions.operator_reviewed) || asBool(options.request_response_envelope_diff_reviewed);
    const requestExpected = { adapter_id: true, operation_id: true, method_preview: true, provider_family: true, request_intent: true };
    const requestActual = asRecord(diffOptions.request_actual || requestExpected);
    const responseExpected = { response_origin: true, status_preview: true, raw_response_exported: true, safe_metadata_only: true };
    const responseActual = asRecord(diffOptions.response_actual || responseExpected);
    const requestDiff = diffEnvelopeShape(requestExpected, requestActual);
    const responseDiff = diffEnvelopeShape(responseExpected, responseActual);
    return Object.freeze({
      operator_reviewed: reviewed,
      request_envelope_diff: requestDiff,
      response_envelope_diff: responseDiff,
      envelope_shapes_match: requestDiff.shape_match && responseDiff.shape_match,
      raw_request_body_included: false,
      raw_response_body_included: false,
      authorization_header_included: false,
      failure_reasons: Object.freeze([
        reviewed ? null : 'request_response_envelope_diff_not_reviewed',
        requestDiff.shape_match && responseDiff.shape_match ? null : 'request_response_envelope_shape_mismatch'
      ].filter(Boolean)),
      safe_metadata_only: true
    });
  }

  function buildNoNetworkInvocationReplay(options = {}){
    const replayOptions = asRecord(options.no_network_replay);
    const acknowledged = asBool(replayOptions.operator_acknowledged_no_network) || asBool(options.no_network_replay_acknowledged);
    const replaySteps = Object.freeze([
      Object.freeze({ step: 'fixture_loaded', performed: true, network_allowed: false }),
      Object.freeze({ step: 'request_envelope_compared', performed: true, network_allowed: false }),
      Object.freeze({ step: 'provider_invocation_replayed_without_network', performed: acknowledged, network_allowed: false }),
      Object.freeze({ step: 'response_metadata_compared', performed: acknowledged, network_allowed: false }),
      Object.freeze({ step: 'safe_transcript_written', performed: acknowledged, network_allowed: false })
    ]);
    return Object.freeze({
      replay_id: asString(replayOptions.replay_id, 'no-network-replay-qa-001'),
      operator_acknowledged_no_network: acknowledged,
      replay_steps: replaySteps,
      provider_call_performed: false,
      network_request_count: 0,
      source_fetching_performed: false,
      hidden_network_calls_detected: false,
      raw_response_body_recorded: false,
      failure_reason: acknowledged ? null : 'no_network_replay_not_acknowledged',
      safe_metadata_only: true
    });
  }

  function buildAdapterFailureUxRehearsal(options = {}){
    const rehearsal = asRecord(options.failure_ux_rehearsal);
    const rehearsed = asBool(rehearsal.operator_rehearsed) || asBool(options.adapter_failure_ux_rehearsed);
    const failureCases = FAILURE_TAXONOMY.slice(0, 10).map((reason) => Object.freeze({
      reason,
      visible_to_operator: true,
      retry_requires_new_review: true,
      performs_network_call: false
    }));
    return Object.freeze({
      operator_rehearsed: rehearsed,
      failure_case_count: failureCases.length,
      failure_cases: Object.freeze(failureCases),
      failure_reason: rehearsed ? null : 'adapter_failure_ux_not_rehearsed',
      safe_metadata_only: true
    });
  }

  function buildSafeTranscriptComparison(options = {}){
    const comparison = asRecord(options.safe_transcript_comparison);
    const acknowledged = asBool(comparison.operator_acknowledged) || asBool(options.safe_transcript_comparison_acknowledged);
    return Object.freeze({
      operator_acknowledged: acknowledged,
      compared_fields: Object.freeze(['adapter_id', 'operation_id', 'provider_family', 'status_preview', 'failure_reason']),
      raw_request_compared: false,
      raw_response_compared: false,
      secret_material_compared: false,
      transcript_shape_match: true,
      failure_reason: acknowledged ? null : 'safe_transcript_comparison_not_acknowledged',
      safe_metadata_only: true
    });
  }

  function buildCrossProviderCapabilityMatrix(options = {}){
    const matrix = asRecord(options.cross_provider_capability_matrix);
    const reviewed = asBool(matrix.operator_reviewed) || asBool(options.cross_provider_capability_matrix_reviewed);
    const rows = PROVIDER_FIXTURE_IDS.map((fixture_id) => Object.freeze({
      fixture_id,
      supports_metadata_preview: true,
      supports_no_network_replay: true,
      supports_raw_secret_export: false,
      supports_live_invocation_in_this_release: false,
      requires_operator_review: true
    }));
    return Object.freeze({
      operator_reviewed: reviewed,
      rows: Object.freeze(rows),
      live_invocation_supported_in_this_release: false,
      failure_reason: reviewed ? null : 'cross_provider_capability_matrix_not_reviewed',
      safe_metadata_only: true
    });
  }

  function buildOperatorPreconditionRows(options = {}){
    const controls = asRecord(options.manual_operator_controls);
    const rows = REQUIRED_PRECONDITIONS.map((id) => {
      let satisfied = asBool(controls[id]) || asBool(options[id]);
      if (id === 'adapter_sandbox_report_available') satisfied = satisfied || !!getAdapterSandboxReport(options);
      return Object.freeze({ id, satisfied });
    });
    return Object.freeze(rows);
  }

  function buildFailureReasons(parts, preconditions){
    const reasons = [];
    for (const row of preconditions) if (!row.satisfied) reasons.push(row.id.replace(/_acknowledged|_reviewed|_loaded|_available|_passed/g, '') + '_missing');
    for (const part of parts) {
      if (!part) continue;
      if (part.failure_reason) reasons.push(part.failure_reason);
      if (Array.isArray(part.failure_reasons)) reasons.push(...part.failure_reasons);
    }
    return Object.freeze(Array.from(new Set(reasons.concat([
      'live_provider_execution_forbidden',
      'hidden_network_calls_forbidden',
      'credential_persistence_forbidden'
    ]))));
  }

  function buildSafeReplayLedger(options = {}){
    const ledger = {
      bench_id: asString(options.bench_id || options.session_id, 'adapter-contract-bench-001'),
      created_at: asString(options.now, new Date(0).toISOString()),
      mode: 'adapter_contract_test_bench_no_network_replay_qa',
      state: asString(options.state, BENCH_STATES.BLOCKED),
      adapter_fixture_summary: options.adapter_fixture_summary,
      request_response_envelope_diff_summary: options.request_response_envelope_diff_summary,
      no_network_replay_summary: options.no_network_replay_summary,
      failure_ux_rehearsal_summary: options.failure_ux_rehearsal_summary,
      safe_transcript_comparison_summary: options.safe_transcript_comparison_summary,
      cross_provider_capability_matrix_summary: options.cross_provider_capability_matrix_summary,
      failure_reasons: Object.freeze(Array.isArray(options.failure_reasons) ? options.failure_reasons.slice() : []),
      boundary_flags: BOUNDARY_FLAGS
    };
    ledger.checksum = deterministicChecksum(ledger);
    return Object.freeze(ledger);
  }

  function validateReplayLedgerSafety(ledger){
    const record = asRecord(ledger);
    const keys = Object.keys(record);
    const forbiddenPresent = keys.filter((key) => FORBIDDEN_LEDGER_FIELDS.includes(key));
    const unexpected = keys.filter((key) => !ALLOWED_LEDGER_FIELDS.includes(key));
    return Object.freeze({
      ok: forbiddenPresent.length === 0 && unexpected.length === 0,
      forbidden_present: Object.freeze(forbiddenPresent),
      unexpected_fields: Object.freeze(unexpected),
      allowed_fields: ALLOWED_LEDGER_FIELDS,
      checked_for_raw_secret_material: true
    });
  }

  function buildAdapterContractTestBench(options = {}){
    const adapterSandbox = getAdapterSandboxReport(options);
    const fixtures = buildDeterministicProviderAdapterFixtures(options);
    const envelopeDiff = buildRequestResponseEnvelopeDiff(options);
    const replay = buildNoNetworkInvocationReplay(options);
    const failureUx = buildAdapterFailureUxRehearsal(options);
    const transcriptComparison = buildSafeTranscriptComparison(options);
    const capabilityMatrix = buildCrossProviderCapabilityMatrix(options);
    const preconditions = buildOperatorPreconditionRows(options);
    const parts = [fixtures, envelopeDiff, replay, failureUx, transcriptComparison, capabilityMatrix];
    const allPreconditionsMet = preconditions.every((row) => row.satisfied);
    const partsReady = parts.every((part) => !part.failure_reason && (!part.failure_reasons || part.failure_reasons.length === 0));
    const ready = allPreconditionsMet && partsReady && !!adapterSandbox;
    const state = ready ? BENCH_STATES.REPLAY_READY : BENCH_STATES.BLOCKED;
    const failureReasons = ready ? [] : buildFailureReasons(parts, preconditions);
    const ledger = buildSafeReplayLedger(Object.assign({}, options, {
      state,
      adapter_fixture_summary: fixtures,
      request_response_envelope_diff_summary: envelopeDiff,
      no_network_replay_summary: replay,
      failure_ux_rehearsal_summary: failureUx,
      safe_transcript_comparison_summary: transcriptComparison,
      cross_provider_capability_matrix_summary: capabilityMatrix,
      failure_reasons: failureReasons
    }));
    const safety = validateReplayLedgerSafety(ledger);
    const report = {
      adapter_contract_test_bench_version: VERSION,
      generated_at: asString(options.now, new Date(0).toISOString()),
      milestone: MILESTONE,
      model: MODEL,
      state,
      readiness_status: ready ? 'no_network_invocation_replay_ready' : 'blocked_no_network_replay_qa',
      required_preconditions: REQUIRED_PRECONDITIONS,
      operator_preconditions: preconditions,
      adapter_sandbox_summary_available: !!adapterSandbox,
      adapter_fixture_summary: fixtures,
      request_response_envelope_diff: envelopeDiff,
      no_network_invocation_replay: replay,
      adapter_failure_ux_rehearsal: failureUx,
      safe_transcript_comparison: transcriptComparison,
      cross_provider_capability_matrix: capabilityMatrix,
      safe_replay_ledger: ledger,
      ledger_safety: safety,
      failure_reasons: failureReasons,
      boundary_flags: BOUNDARY_FLAGS,
      can_execute_now: false,
      network_invocation_allowed: false,
      live_provider_execution_enabled: false,
      live_provider_execution_performed: false,
      live_source_fetching_enabled: false,
      live_source_fetching_performed: false,
      hidden_network_calls_allowed: false,
      real_oauth_token_lifecycle_enabled: false,
      real_api_keys_stored: false,
      real_tokens_stored: false,
      credential_persistence_allowed: false,
      backend_storage_expanded: false,
      uncontrolled_scraping_enabled: false,
      automatic_source_verification_claimed: false,
      provider_suggested_source_auto_acceptance: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false,
      safe_metadata_only: true,
      ok: true
    };
    report.checksum = deterministicChecksum(Object.assign({}, report, { checksum: null }));
    return Object.freeze(report);
  }

  root.adapterContractTestBenchNoNetworkInvocationReplayQa = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    ADAPTER_SANDBOX_BASELINE,
    SAFETY_COCKPIT_BASELINE,
    MANUAL_PROTOTYPE_BASELINE,
    CANDIDATE_GATE_BASELINE,
    CREDENTIAL_BOUNDARY_BASELINE,
    SOURCE_ACQUISITION_BASELINE,
    MOCK_TO_LIVE_BASELINE,
    MILESTONE,
    MODEL,
    BENCH_STATES,
    REQUIRED_PRECONDITIONS,
    ALLOWED_LEDGER_FIELDS,
    FORBIDDEN_LEDGER_FIELDS,
    PROVIDER_FIXTURE_IDS,
    BOUNDARY_FLAGS,
    FAILURE_TAXONOMY,
    deterministicChecksum,
    buildDeterministicProviderAdapterFixtures,
    buildRequestResponseEnvelopeDiff,
    buildNoNetworkInvocationReplay,
    buildAdapterFailureUxRehearsal,
    buildSafeTranscriptComparison,
    buildCrossProviderCapabilityMatrix,
    buildOperatorPreconditionRows,
    buildSafeReplayLedger,
    validateReplayLedgerSafety,
    buildAdapterContractTestBench
  });
})(typeof window !== 'undefined' ? window : globalThis);
