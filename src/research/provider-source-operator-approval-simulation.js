/* Jarbou3i Research Engine provider/source operator approval simulation v1.4.0-alpha.5. */
/* Deterministic approval-state simulation only. No signoff, lock, live execution, or publication permission is performed. See ADR-011. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.5';
  const STABLE_BASELINE = '1.3.0';
  const CONTROL_BASELINE = '1.4.0-alpha.5';
  const DRY_RUN_BASELINE = '1.4.0-alpha.4';
  const MILESTONE = 'v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation';
  const MODEL = 'provider_source_operator_approval_simulation.v1';

  const APPROVAL_STATES = Object.freeze({
    SIMULATED_APPROVED_FOR_REPLAY_REVIEW: 'simulated_approved_for_replay_review',
    SIMULATED_HELD_FOR_OPERATOR_REVIEW: 'simulated_held_for_operator_review',
    SIMULATED_REJECTED_FOR_LIVE_EXECUTION: 'simulated_rejected_for_live_execution'
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
    operator_approval_simulation_only: true,
    deterministic_fixture_backed: true,
    network_side_effects_allowed: false,
    real_operator_signoff_performed: false,
    export_lock_performed: false
  });

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function getReplayPack(options) {
    if (options.replay_pack) return options.replay_pack;
    const replay = root.providerSourceDryRunReplayPack;
    if (replay && typeof replay.buildDryRunReplayPack === 'function') return replay.buildDryRunReplayPack({ now: options.now });
    return null;
  }

  function classifyApproval(item) {
    if (!item || item.replay_state === 'blocked') return APPROVAL_STATES.SIMULATED_REJECTED_FOR_LIVE_EXECUTION;
    if (item.operator_review_required || item.replay_state === 'review_required') return APPROVAL_STATES.SIMULATED_HELD_FOR_OPERATOR_REVIEW;
    return APPROVAL_STATES.SIMULATED_APPROVED_FOR_REPLAY_REVIEW;
  }

  function buildApprovalRecord(item, index) {
    const state = classifyApproval(item);
    const approved = state === APPROVAL_STATES.SIMULATED_APPROVED_FOR_REPLAY_REVIEW;
    const held = state === APPROVAL_STATES.SIMULATED_HELD_FOR_OPERATOR_REVIEW;
    const rejected = state === APPROVAL_STATES.SIMULATED_REJECTED_FOR_LIVE_EXECUTION;
    return Object.freeze({
      approval_index: index,
      approval_id: `approval_${String(index + 1).padStart(2, '0')}_${item?.scenario_id || 'unknown'}`,
      replay_id: item?.replay_id || `replay_${index + 1}`,
      scenario_id: item?.scenario_id || 'unknown',
      surface: item?.surface || 'unknown',
      requested_mode: item?.requested_mode || 'unknown',
      replay_state: item?.replay_state || 'blocked',
      simulated_approval_state: state,
      simulated_approved_for_replay_review: approved,
      simulated_held_for_operator_review: held,
      simulated_rejected_for_live_execution: rejected,
      operator_comment_required: held || rejected,
      live_execution_authorized: false,
      live_source_fetching_authorized: false,
      credential_access_authorized: false,
      export_lock_authorized: false,
      publication_authorized: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      cryptographic_signature_claimed: false,
      rationale: approved
        ? 'Replay item is deterministic and side-effect-free; approve only for local replay review.'
        : (held
          ? 'Replay item represents a blocked/failed-policy path and remains held for explicit human review.'
          : 'Replay item is rejected for live execution because live provider/source/credential paths remain blocked.')
    });
  }

  function simulateOperatorApproval(opts) {
    const options = opts || {};
    const now = options.now ? new Date(options.now) : new Date();
    const replayPack = getReplayPack(Object.assign({}, options, { now }));
    const replayItems = asArray(replayPack && replayPack.replay_items);
    const approvals = replayItems.map(buildApprovalRecord);
    const approved = approvals.filter(item => item.simulated_approved_for_replay_review);
    const held = approvals.filter(item => item.simulated_held_for_operator_review);
    const rejected = approvals.filter(item => item.simulated_rejected_for_live_execution);
    return Object.freeze({
      operator_approval_simulation_version: VERSION,
      stable_baseline: STABLE_BASELINE,
      control_baseline: CONTROL_BASELINE,
      dry_run_baseline: DRY_RUN_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: now.toISOString(),
      planning_control_plane_only: true,
      operator_approval_simulation_only: true,
      deterministic_fixture_backed: true,
      live_execution_enabled: false,
      live_source_fetching_enabled: false,
      production_oauth_enabled: false,
      boundary_flags: BOUNDARY_FLAGS,
      replay_pack_summary: Object.freeze({
        available: Boolean(replayPack),
        replay_item_count: replayPack ? replayPack.replay_item_count : 0,
        replayable_count: replayPack ? replayPack.replayable_count : 0,
        review_required_count: replayPack ? replayPack.review_required_count : 0,
        blocked_count: replayPack ? replayPack.blocked_count : 0,
        replay_pack_checksum: replayPack ? replayPack.replay_pack_checksum : null
      }),
      approval_records: Object.freeze(approvals),
      approval_record_count: approvals.length,
      simulated_approved_count: approved.length,
      simulated_held_count: held.length,
      simulated_rejected_count: rejected.length,
      held_or_rejected_ids: held.concat(rejected).map(item => item.approval_id),
      all_live_execution_authorizations_false: approvals.every(item => item.live_execution_authorized === false),
      all_source_fetch_authorizations_false: approvals.every(item => item.live_source_fetching_authorized === false),
      all_credential_access_authorizations_false: approvals.every(item => item.credential_access_authorized === false),
      all_export_lock_authorizations_false: approvals.every(item => item.export_lock_authorized === false),
      all_publication_authorizations_false: approvals.every(item => item.publication_authorized === false),
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
      release_gate: held.length || rejected.length ? 'operator_review_required' : 'approval_simulation_ready_for_manual_review',
      boundary_statement: 'Operator approval simulation is deterministic and local-only. It simulates replay-review decisions but does not perform real signoff, export lock, credential access, live provider execution, live source fetching, cryptographic signing, or publication authorization.'
    });
  }

  root.providerSourceOperatorApprovalSimulation = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    CONTROL_BASELINE,
    DRY_RUN_BASELINE,
    MILESTONE,
    MODEL,
    APPROVAL_STATES,
    BOUNDARY_FLAGS,
    classifyApproval,
    buildApprovalRecord,
    simulateOperatorApproval
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
