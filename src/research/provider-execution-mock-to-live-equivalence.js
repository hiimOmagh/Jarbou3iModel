/* Jarbou3i Research Engine provider execution mock-to-live equivalence v1.4.0-alpha.6. */
/* Deterministic equivalence validation only. No live execution enabled. See ADR-012. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.6';
  const STABLE_BASELINE = '1.3.0';
  const CONTROL_BASELINE = '1.4.0-alpha.6';
  const REPLAY_BASELINE = '1.4.0-alpha.5';
  const TRACE_BASELINE = '1.4.0-alpha.4';
  const MILESTONE = 'v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence';
  const MODEL = 'provider_execution_mock_to_live_equivalence.v1';

  const EQUIVALENCE_STATES = Object.freeze({
    EQUIVALENT_FOR_PLANNING: 'equivalent_for_planning',
    REVIEW_REQUIRED: 'review_required',
    NON_EQUIVALENT_BLOCKED: 'non_equivalent_blocked'
  });

  const REQUIRED_SHAPE_KEYS = Object.freeze([
    'scenario_id',
    'surface',
    'requested_mode',
    'policy_state',
    'state_transition',
    'failure_contract_id',
    'operator_message'
  ]);

  const FORBIDDEN_ENVELOPE_KEYS = Object.freeze([
    'api_key',
    'access_token',
    'refresh_token',
    'client_secret',
    'raw_credential',
    'authorization_header',
    'network_invocation',
    'fetch',
    'xhr'
  ]);

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
    automatic_source_verification_claimed: false,
    automatic_signoff_performed: false,
    automatic_export_lock_performed: false,
    cryptographic_signature_claimed: false,
    publication_permission_claimed: false,
    mock_to_live_equivalence_only: true,
    deterministic_fixture_backed: true,
    future_live_envelope_only: true,
    network_side_effects_allowed: false
  });

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function stableStringify(value) {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
    return '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + stableStringify(value[key])).join(',') + '}';
  }

  function deterministicChecksum(value) {
    const text = stableStringify(value);
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619) >>> 0;
    }
    return `fnv1a32:${hash.toString(16).padStart(8, '0')}`;
  }

  function getReplayPack(options) {
    if (options.replay_pack) return options.replay_pack;
    const replay = root.providerSourceDryRunReplayPack;
    if (replay && typeof replay.buildDryRunReplayPack === 'function') return replay.buildDryRunReplayPack({ now: options.now });
    return null;
  }

  function getApprovalSimulation(options, replayPack) {
    if (options.operator_approval_simulation) return options.operator_approval_simulation;
    const approval = root.providerSourceOperatorApprovalSimulation;
    if (approval && typeof approval.simulateOperatorApproval === 'function') return approval.simulateOperatorApproval({ now: options.now, replay_pack: replayPack });
    return null;
  }

  function getPolicyMatrix(options) {
    if (options.policy_matrix) return options.policy_matrix;
    const policy = root.providerSourceExecutionPolicyMatrix;
    if (policy && typeof policy.buildPolicyMatrix === 'function') return policy.buildPolicyMatrix({ now: options.now });
    return null;
  }

  function getFailureContracts(options) {
    if (options.failure_ux_contracts) return options.failure_ux_contracts;
    const failure = root.providerSourceFailureUxContracts;
    if (failure && typeof failure.buildFailureUxContracts === 'function') return failure.buildFailureUxContracts({ now: options.now });
    return null;
  }

  function getReadinessReport(options) {
    if (options.readiness_report) return options.readiness_report;
    const readiness = root.providerSourceExecutionReadinessReport;
    if (readiness && typeof readiness.buildExecutionReadinessReport === 'function') return readiness.buildExecutionReadinessReport({ now: options.now });
    return null;
  }

  function findApproval(approvalSimulation, replayId) {
    return asArray(approvalSimulation && approvalSimulation.approval_records).find(record => record.replay_id === replayId) || null;
  }

  function findFailureContract(failureContracts, contractId) {
    if (!contractId) return null;
    return asArray(failureContracts && failureContracts.contracts).find(contract => contract.id === contractId) || null;
  }

  function mapPolicyBoundary(item, policyMatrix) {
    const rows = asArray(policyMatrix && policyMatrix.rows);
    const mode = item && item.requested_mode;
    const surface = item && item.surface;
    const row = rows.find(entry => entry.mode === mode || entry.id === mode || (entry.surface === surface && entry.allowed_now === item?.replay_allowed));
    return Object.freeze({
      policy_row_id: row ? row.id : null,
      policy_surface: row ? row.surface : surface || 'unknown',
      allowed_now: row ? row.allowed_now === true : item?.replay_allowed === true,
      live_network_allowed: false,
      future_gate_required: row ? row.allowed_now !== true : item?.replay_allowed !== true,
      policy_state_preserved: typeof item?.policy_state === 'string' && item.policy_state.length > 2
    });
  }

  function buildPlannedLiveEnvelope(replayItem, approvalRecord, policyBoundary, failureContract, index) {
    const item = replayItem || {};
    const envelope = {
      envelope_index: index,
      envelope_id: `planned_live_envelope_${String(index + 1).padStart(2, '0')}_${item.scenario_id || 'unknown'}`,
      replay_id: item.replay_id || null,
      scenario_id: item.scenario_id || 'unknown',
      surface: item.surface || 'unknown',
      requested_mode: item.requested_mode || 'unknown',
      policy_state: item.policy_state || 'unknown',
      state_transition: item.state_transition || 'not_recorded',
      failure_contract_id: item.failure_contract_id || null,
      operator_message: item.operator_message || 'Planned live envelope generated from deterministic replay item only.',
      planned_execution_mode: 'future_live_execution_disabled_envelope',
      payload_contract_version: VERSION,
      payload_shape_keys: REQUIRED_SHAPE_KEYS.slice(),
      policy_boundary: policyBoundary || mapPolicyBoundary(item, null),
      failure_contract_mapped: item.failure_contract_id ? Boolean(failureContract) : true,
      failure_contract_severity: failureContract ? failureContract.severity : null,
      operator_approval_state: approvalRecord ? approvalRecord.simulated_approval_state : 'missing_approval_record',
      operator_approval_boundary_preserved: Boolean(approvalRecord)
        && approvalRecord.live_execution_authorized === false
        && approvalRecord.live_source_fetching_authorized === false
        && approvalRecord.credential_access_authorized === false
        && approvalRecord.export_lock_authorized === false
        && approvalRecord.publication_authorized === false,
      live_execution_enabled: false,
      live_network_allowed: false,
      provider_execution_allowed: false,
      source_fetch_allowed: false,
      credential_value_access_allowed: false,
      credential_reference_present: false,
      raw_secret_value_present: false,
      network_invocation_present: false,
      automatic_source_verification_claimed: false,
      automatic_signoff_authorized: false,
      automatic_export_lock_authorized: false,
      cryptographic_signature_claimed: false,
      publication_permission_claimed: false
    };
    return Object.freeze(Object.assign(envelope, {
      envelope_checksum: deterministicChecksum(envelope)
    }));
  }

  function collectObjectKeys(value, found) {
    const keys = found || [];
    if (!value || typeof value !== 'object') return keys;
    if (Array.isArray(value)) {
      value.forEach(item => collectObjectKeys(item, keys));
      return keys;
    }
    Object.keys(value).forEach(key => {
      keys.push(key.toLowerCase());
      collectObjectKeys(value[key], keys);
    });
    return keys;
  }

  function comparePayloadShape(replayItem, plannedLiveEnvelope) {
    const mock = replayItem || {};
    const envelope = plannedLiveEnvelope || {};
    const missingFromMock = REQUIRED_SHAPE_KEYS.filter(key => !(key in mock));
    const missingFromEnvelope = REQUIRED_SHAPE_KEYS.filter(key => !(key in envelope));
    const typeMismatches = REQUIRED_SHAPE_KEYS.filter(key => {
      if (!(key in mock) || !(key in envelope)) return false;
      if (mock[key] === null || envelope[key] === null) return false;
      return typeof mock[key] !== typeof envelope[key];
    });
    const envelopeKeys = collectObjectKeys(envelope);
    const forbiddenKeyHits = FORBIDDEN_ENVELOPE_KEYS.filter(key => envelopeKeys.includes(key));
    return Object.freeze({
      required_shape_keys: REQUIRED_SHAPE_KEYS.slice(),
      missing_from_mock: Object.freeze(missingFromMock),
      missing_from_planned_live_envelope: Object.freeze(missingFromEnvelope),
      type_mismatches: Object.freeze(typeMismatches),
      forbidden_envelope_key_hits: Object.freeze(forbiddenKeyHits),
      payload_shape_equivalent: missingFromMock.length === 0 && missingFromEnvelope.length === 0 && typeMismatches.length === 0,
      planned_live_envelope_secret_safe: forbiddenKeyHits.length === 0
        && envelope.credential_reference_present === false
        && envelope.raw_secret_value_present === false
        && envelope.network_invocation_present === false
    });
  }

  function buildEquivalenceRow(replayItem, index, context) {
    const approval = findApproval(context.approvalSimulation, replayItem.replay_id);
    const failureContract = findFailureContract(context.failureContracts, replayItem.failure_contract_id);
    const policyBoundary = mapPolicyBoundary(replayItem, context.policyMatrix);
    const envelope = buildPlannedLiveEnvelope(replayItem, approval, policyBoundary, failureContract, index);
    const shape = comparePayloadShape(replayItem, envelope);
    const policyPreserved = policyBoundary.live_network_allowed === false && policyBoundary.policy_state_preserved === true;
    const failureMapped = replayItem.failure_contract_id ? Boolean(failureContract) : true;
    const approvalPreserved = envelope.operator_approval_boundary_preserved === true;
    const liveDisabled = envelope.live_execution_enabled === false
      && envelope.live_network_allowed === false
      && envelope.provider_execution_allowed === false
      && envelope.source_fetch_allowed === false
      && envelope.credential_value_access_allowed === false;
    const state = shape.payload_shape_equivalent && shape.planned_live_envelope_secret_safe && policyPreserved && failureMapped && approvalPreserved && liveDisabled
      ? EQUIVALENCE_STATES.EQUIVALENT_FOR_PLANNING
      : EQUIVALENCE_STATES.REVIEW_REQUIRED;
    return Object.freeze({
      equivalence_index: index,
      equivalence_id: `equivalence_${String(index + 1).padStart(2, '0')}_${replayItem.scenario_id || 'unknown'}`,
      replay_id: replayItem.replay_id,
      scenario_id: replayItem.scenario_id,
      surface: replayItem.surface,
      requested_mode: replayItem.requested_mode,
      replay_state: replayItem.replay_state,
      equivalence_state: state,
      payload_shape_equivalent: shape.payload_shape_equivalent,
      planned_live_envelope_secret_safe: shape.planned_live_envelope_secret_safe,
      failure_contract_mapped: failureMapped,
      policy_boundary_preserved: policyPreserved,
      operator_approval_boundary_preserved: approvalPreserved,
      live_execution_boundary_preserved: liveDisabled,
      readiness_blockers_preserved: context.readinessReport ? context.readinessReport.live_execution_ready === false && context.readinessReport.blocker_count >= 3 : false,
      shape_comparison: shape,
      planned_live_envelope: envelope
    });
  }

  function buildMockToLiveEquivalenceReport(opts) {
    const options = opts || {};
    const now = options.now ? new Date(options.now) : new Date();
    const replayPack = getReplayPack(Object.assign({}, options, { now }));
    const approvalSimulation = getApprovalSimulation(Object.assign({}, options, { now }), replayPack);
    const policyMatrix = getPolicyMatrix(Object.assign({}, options, { now }));
    const failureContracts = getFailureContracts(Object.assign({}, options, { now }));
    const readinessReport = getReadinessReport(Object.assign({}, options, { now }));
    const context = { approvalSimulation, policyMatrix, failureContracts, readinessReport };
    const replayItems = asArray(replayPack && replayPack.replay_items);
    const rows = replayItems.map((item, index) => buildEquivalenceRow(item, index, context));
    const equivalent = rows.filter(row => row.equivalence_state === EQUIVALENCE_STATES.EQUIVALENT_FOR_PLANNING);
    const review = rows.filter(row => row.equivalence_state !== EQUIVALENCE_STATES.EQUIVALENT_FOR_PLANNING);
    const checksumBasis = rows.map(row => ({ id: row.equivalence_id, state: row.equivalence_state, envelope_checksum: row.planned_live_envelope.envelope_checksum }));

    return Object.freeze({
      mock_to_live_equivalence_version: VERSION,
      stable_baseline: STABLE_BASELINE,
      control_baseline: CONTROL_BASELINE,
      replay_baseline: REPLAY_BASELINE,
      trace_baseline: TRACE_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: now.toISOString(),
      planning_control_plane_only: true,
      mock_to_live_equivalence_only: true,
      deterministic_fixture_backed: true,
      future_live_envelope_only: true,
      live_execution_enabled: false,
      live_source_fetching_enabled: false,
      production_oauth_enabled: false,
      boundary_flags: BOUNDARY_FLAGS,
      dependency_summary: Object.freeze({
        replay_pack_available: Boolean(replayPack),
        replay_item_count: replayPack ? replayPack.replay_item_count : 0,
        operator_approval_simulation_available: Boolean(approvalSimulation),
        approval_record_count: approvalSimulation ? approvalSimulation.approval_record_count : 0,
        policy_matrix_available: Boolean(policyMatrix),
        policy_row_count: policyMatrix ? policyMatrix.row_count : 0,
        failure_ux_contracts_available: Boolean(failureContracts),
        failure_contract_count: failureContracts ? failureContracts.contract_count : 0,
        readiness_report_available: Boolean(readinessReport),
        readiness_state: readinessReport ? readinessReport.readiness_state : 'unknown',
        readiness_blocker_count: readinessReport ? readinessReport.blocker_count : 0
      }),
      equivalence_rows: Object.freeze(rows),
      equivalence_row_count: rows.length,
      equivalent_for_planning_count: equivalent.length,
      review_required_count: review.length,
      review_required_ids: review.map(row => row.equivalence_id),
      all_payload_shapes_equivalent: rows.length > 0 && rows.every(row => row.payload_shape_equivalent === true),
      all_planned_live_envelopes_secret_safe: rows.length > 0 && rows.every(row => row.planned_live_envelope_secret_safe === true),
      all_failure_contracts_mapped: rows.length > 0 && rows.every(row => row.failure_contract_mapped === true),
      all_policy_boundaries_preserved: rows.length > 0 && rows.every(row => row.policy_boundary_preserved === true),
      all_operator_approval_boundaries_preserved: rows.length > 0 && rows.every(row => row.operator_approval_boundary_preserved === true),
      all_live_execution_boundaries_preserved: rows.length > 0 && rows.every(row => row.live_execution_boundary_preserved === true),
      all_readiness_blockers_preserved: rows.length > 0 && rows.every(row => row.readiness_blockers_preserved === true),
      no_live_network_attempted: true,
      no_provider_execution_performed: true,
      no_source_fetch_performed: true,
      no_credential_read_attempted: true,
      verification_claimed: false,
      automatic_source_verification_claimed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      cryptographic_signature_claimed: false,
      publication_permission_claimed: false,
      release_gate: review.length ? 'mock_to_live_equivalence_review_required' : 'mock_to_live_equivalence_passed_for_planning',
      equivalence_checksum: deterministicChecksum({ rows: checksumBasis, boundary_flags: BOUNDARY_FLAGS }),
      boundary_statement: 'Mock-to-live equivalence validates future live envelope shape, policy decisions, failure UX mapping, readiness blockers, and approval boundaries. It never authorizes live provider execution, live source fetching, credential access, source verification, signoff, export lock, cryptographic signing, or publication permission.'
    });
  }

  root.providerExecutionMockToLiveEquivalence = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    CONTROL_BASELINE,
    REPLAY_BASELINE,
    TRACE_BASELINE,
    MILESTONE,
    MODEL,
    EQUIVALENCE_STATES,
    REQUIRED_SHAPE_KEYS,
    FORBIDDEN_ENVELOPE_KEYS,
    BOUNDARY_FLAGS,
    buildPlannedLiveEnvelope,
    comparePayloadShape,
    buildEquivalenceRow,
    buildMockToLiveEquivalenceReport
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
