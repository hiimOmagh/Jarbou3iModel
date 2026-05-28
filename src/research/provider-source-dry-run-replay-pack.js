/* Jarbou3i Research Engine provider/source dry-run replay pack v1.4.0-alpha.6. */
/* Deterministic replay packaging only. No live execution enabled. See ADR-010. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.6';
  const STABLE_BASELINE = '1.3.0';
  const CONTROL_BASELINE = '1.4.0-alpha.6';
  const DRY_RUN_BASELINE = '1.4.0-alpha.4';
  const MILESTONE = 'v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence';
  const MODEL = 'provider_source_dry_run_replay_pack.v1';

  const REPLAY_ITEM_STATES = Object.freeze({
    REPLAYABLE: 'replayable',
    REVIEW_REQUIRED: 'review_required',
    BLOCKED: 'blocked'
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
    replay_pack_only: true,
    deterministic_fixture_backed: true,
    network_side_effects_allowed: false,
    replay_executes_live_action: false
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

  function getHarness(options) {
    if (options.harness) return options.harness;
    const harness = root.providerSourceDryRunExecutionHarness;
    if (harness && typeof harness.runDryRunHarness === 'function') return harness.runDryRunHarness({ now: options.now });
    return null;
  }

  function getInspection(options, harness) {
    if (options.trace_inspection) return options.trace_inspection;
    const inspector = root.providerSourceDryRunTraceInspector;
    if (inspector && typeof inspector.inspectDryRunTraces === 'function') return inspector.inspectDryRunTraces({ now: options.now, harness });
    return null;
  }

  function getReadiness(options, traceInspection) {
    if (options.readiness_report) return options.readiness_report;
    const readiness = root.providerSourceExecutionReadinessReport;
    if (readiness && typeof readiness.buildExecutionReadinessReport === 'function') return readiness.buildExecutionReadinessReport({ now: options.now, trace_inspection: traceInspection });
    return null;
  }

  function classifyReplayItem(trace, inspection) {
    if (!inspection) return REPLAY_ITEM_STATES.BLOCKED;
    if (inspection.side_effect_violation_count > 0 || inspection.level === 'blocking') return REPLAY_ITEM_STATES.BLOCKED;
    if (inspection.requires_operator_review || trace.allowed_to_proceed === false) return REPLAY_ITEM_STATES.REVIEW_REQUIRED;
    return REPLAY_ITEM_STATES.REPLAYABLE;
  }

  function buildReplayItem(trace, inspection, index) {
    const state = classifyReplayItem(trace, inspection);
    const allowed = state === REPLAY_ITEM_STATES.REPLAYABLE;
    const reviewRequired = state !== REPLAY_ITEM_STATES.REPLAYABLE;
    const item = {
      replay_index: index,
      replay_id: `replay_${String(index + 1).padStart(2, '0')}_${trace.scenario_id || inspection?.trace_id || 'unknown'}`,
      scenario_id: trace.scenario_id || inspection?.trace_id || `trace_${index + 1}`,
      surface: trace.surface || inspection?.surface || 'unknown',
      requested_mode: trace.requested_mode || inspection?.requested_mode || 'unknown',
      outcome: trace.outcome || 'unknown',
      policy_state: trace.policy_state || inspection?.policy_state || 'unknown',
      state_transition: trace.state_transition || inspection?.state_transition || 'not_recorded',
      replay_state: state,
      replay_allowed: allowed,
      operator_review_required: reviewRequired,
      failure_contract_id: trace.failure_contract_id || inspection?.failure_contract_id || null,
      live_network_attempted: false,
      credential_read_attempted: false,
      provider_execution_performed: false,
      source_fetch_performed: false,
      verification_claimed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      replay_step: allowed
        ? 'Replay deterministic fixture trace for review only.'
        : 'Hold replay item for operator review; do not execute live/provider/source action.',
      operator_message: trace.operator_message || 'Dry-run replay item generated without side effects.'
    };
    return Object.freeze(Object.assign(item, { replay_checksum: deterministicChecksum(item) }));
  }

  function buildDryRunReplayPack(opts) {
    const options = opts || {};
    const now = options.now ? new Date(options.now) : new Date();
    const harness = getHarness(options);
    const traceInspection = getInspection(Object.assign({}, options, { now }), harness);
    const readinessReport = getReadiness(Object.assign({}, options, { now }), traceInspection);
    const traces = asArray(harness && harness.traces);
    const inspections = asArray(traceInspection && traceInspection.inspections);
    const replayItems = traces.map((trace, index) => buildReplayItem(trace, inspections[index], index));
    const replayable = replayItems.filter(item => item.replay_state === REPLAY_ITEM_STATES.REPLAYABLE);
    const review = replayItems.filter(item => item.replay_state === REPLAY_ITEM_STATES.REVIEW_REQUIRED);
    const blocked = replayItems.filter(item => item.replay_state === REPLAY_ITEM_STATES.BLOCKED);
    const sideEffectSafe = replayItems.every(item => item.live_network_attempted === false && item.credential_read_attempted === false && item.provider_execution_performed === false && item.source_fetch_performed === false);
    const replayManifest = Object.freeze({
      replay_pack_manifest_version: VERSION,
      release: MILESTONE,
      generated_at: now.toISOString(),
      item_count: replayItems.length,
      replayable_count: replayable.length,
      review_required_count: review.length,
      blocked_count: blocked.length,
      deterministic_checksum_algorithm: 'fnv1a32_non_crypto_integrity_check',
      cryptographic_signature_claimed: false,
      replay_pack_boundary: 'Replay pack packages deterministic dry-run traces for operator review only; it never executes providers, fetches live sources, reads production credentials, or locks exports.'
    });
    const integrityBasis = replayItems.map(item => ({ id: item.replay_id, checksum: item.replay_checksum, state: item.replay_state }));
    return Object.freeze({
      dry_run_replay_pack_version: VERSION,
      stable_baseline: STABLE_BASELINE,
      control_baseline: CONTROL_BASELINE,
      dry_run_baseline: DRY_RUN_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: now.toISOString(),
      planning_control_plane_only: true,
      replay_pack_only: true,
      deterministic_fixture_backed: true,
      live_execution_enabled: false,
      live_source_fetching_enabled: false,
      production_oauth_enabled: false,
      boundary_flags: BOUNDARY_FLAGS,
      replay_manifest: replayManifest,
      replay_items: Object.freeze(replayItems),
      replay_item_count: replayItems.length,
      replayable_count: replayable.length,
      review_required_count: review.length,
      blocked_count: blocked.length,
      review_required_ids: review.map(item => item.replay_id),
      blocked_ids: blocked.map(item => item.replay_id),
      trace_inspection_summary: Object.freeze({
        available: Boolean(traceInspection),
        trace_count: traceInspection ? traceInspection.trace_count : 0,
        review_count: traceInspection ? traceInspection.review_count : 0,
        blocking_count: traceInspection ? traceInspection.blocking_count : 0,
        side_effect_violation_count: traceInspection ? traceInspection.side_effect_violation_count : 0
      }),
      readiness_summary: Object.freeze({
        available: Boolean(readinessReport),
        readiness_state: readinessReport ? readinessReport.readiness_state : 'unknown',
        live_execution_ready: readinessReport ? readinessReport.live_execution_ready === true : false,
        blocker_count: readinessReport ? readinessReport.blocker_count : 0,
        blocker_ids: readinessReport ? asArray(readinessReport.blocker_ids) : []
      }),
      no_live_network_attempted: sideEffectSafe,
      no_provider_execution_performed: replayItems.every(item => item.provider_execution_performed === false),
      no_source_fetch_performed: replayItems.every(item => item.source_fetch_performed === false),
      no_credential_read_attempted: replayItems.every(item => item.credential_read_attempted === false),
      no_verification_claimed: replayItems.every(item => item.verification_claimed === false),
      no_automatic_signoff: replayItems.every(item => item.automatic_signoff_performed === false),
      no_automatic_export_lock: replayItems.every(item => item.automatic_export_lock_performed === false),
      replay_pack_checksum: deterministicChecksum({ manifest: replayManifest, items: integrityBasis }),
      cryptographic_signature_claimed: false,
      automatic_source_verification_claimed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false,
      release_gate: blocked.length ? 'blocked_replay_items_require_review' : (review.length ? 'operator_review_required' : 'replay_pack_ready_for_manual_review'),
      boundary_statement: 'Dry-run replay pack is deterministic and review-only. v1.4.0-alpha.6 does not perform live provider execution, live source fetching, production OAuth, backend expansion, storage expansion, automatic signoff, automatic export lock, cryptographic signing, or publication permission claims.'
    });
  }

  root.providerSourceDryRunReplayPack = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    CONTROL_BASELINE,
    DRY_RUN_BASELINE,
    MILESTONE,
    MODEL,
    REPLAY_ITEM_STATES,
    BOUNDARY_FLAGS,
    stableStringify,
    deterministicChecksum,
    buildReplayItem,
    buildDryRunReplayPack
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
