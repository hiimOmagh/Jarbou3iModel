/* Jarbou3i Research Engine controlled execution candidate gate v1.4.0-alpha.9. */
/* No-execution candidate gate only. No live provider execution, source fetching, real OAuth/API keys, token storage, backend, or storage expansion enabled. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.9';
  const STABLE_BASELINE = '1.3.0';
  const CREDENTIAL_BOUNDARY_BASELINE = '1.4.0-alpha.8';
  const SOURCE_ACQUISITION_BASELINE = '1.4.0-alpha.7';
  const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
  const REPLAY_BASELINE = '1.4.0-alpha.5';
  const MILESTONE = 'v1.4.0-alpha.9 — Controlled Execution Candidate Gate';
  const MODEL = 'controlled_execution_candidate_gate.v1';

  const CANDIDATE_STATES = Object.freeze({
    NO_EXECUTION_CANDIDATE_READY: 'no_execution_candidate_ready',
    REVIEW_REQUIRED: 'review_required',
    EXECUTION_BLOCKED: 'execution_blocked'
  });

  const REQUIRED_DEPENDENCIES = Object.freeze([
    'stable_manual_workflow_locked',
    'source_acquisition_control_surface_locked',
    'credential_boundary_runtime_drill_locked',
    'mock_to_live_equivalence_locked',
    'policy_matrix_present',
    'failure_ux_contracts_present',
    'dry_run_replay_pack_present',
    'operator_approval_simulation_present',
    'execution_readiness_report_present'
  ]);

  const OPERATOR_PRECONDITIONS = Object.freeze([
    {
      id: 'manual_operator_intent_recorded',
      label: 'Manual operator intent recorded',
      required_before_any_future_execution: true,
      satisfied_now: false,
      reason: 'No future live execution may start without an explicit operator intent record.'
    },
    {
      id: 'credential_boundary_green',
      label: 'Credential boundary green',
      required_before_any_future_execution: true,
      satisfied_now: true,
      reason: 'Locked alpha.8 fake-secret boundary drills are required before candidate promotion.'
    },
    {
      id: 'source_permissions_reviewed',
      label: 'Source permissions reviewed',
      required_before_any_future_execution: true,
      satisfied_now: false,
      reason: 'Source acquisition modes are control-surface labels only; source permissions are not execution grants.'
    },
    {
      id: 'cost_timeout_abort_controls_defined',
      label: 'Cost, timeout, and abort controls defined',
      required_before_any_future_execution: true,
      satisfied_now: false,
      reason: 'Candidate gate records missing runtime controls instead of enabling execution.'
    },
    {
      id: 'failure_ux_reviewed_by_operator',
      label: 'Failure UX reviewed by operator',
      required_before_any_future_execution: true,
      satisfied_now: true,
      reason: 'Failure UX contracts exist, but live handling remains disabled.'
    },
    {
      id: 'source_verification_claims_blocked',
      label: 'Automatic source-verification claims blocked',
      required_before_any_future_execution: true,
      satisfied_now: true,
      reason: 'The system may report source gaps but cannot claim automatic verification.'
    }
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
    real_api_keys_allowed: false,
    real_token_storage_allowed: false,
    automatic_source_verification_claimed: false,
    automatic_signoff_performed: false,
    automatic_export_lock_performed: false,
    cryptographic_signature_claimed: false,
    publication_permission_claimed: false,
    controlled_execution_candidate_gate_only: true,
    no_execution_dry_candidate_report: true,
    manual_operator_preconditions_required: true,
    deterministic_fixture_backed: true,
    failure_to_enable_reasons_required: true
  });

  const FAILURE_TO_ENABLE_REASONS = Object.freeze([
    'live_provider_execution_disabled_by_policy',
    'live_source_fetching_disabled_by_policy',
    'real_credentials_absent_by_design',
    'production_oauth_disabled_by_design',
    'manual_operator_intent_not_recorded',
    'source_permissions_not_live_grants',
    'cost_timeout_abort_controls_not_runtime_enabled',
    'backend_storage_expansion_absent',
    'automatic_source_verification_blocked',
    'automatic_signoff_export_lock_publication_blocked'
  ]);

  function asArray(value){ return Array.isArray(value) ? value : []; }
  function isObject(value){ return Object.prototype.toString.call(value) === '[object Object]'; }

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

  function dependencyRow(id, status, evidence, blocksPromotion){
    return Object.freeze({
      id,
      status,
      evidence,
      required_for_candidate_gate: true,
      blocks_future_live_execution: blocksPromotion === true,
      live_execution_enabled: false
    });
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

  function getReadinessReport(options){
    if (options.readiness_report) return options.readiness_report;
    const mod = root.providerSourceExecutionReadinessReport;
    if (mod && typeof mod.buildExecutionReadinessReport === 'function') return mod.buildExecutionReadinessReport({ now: options.now });
    return null;
  }

  function getEquivalenceReport(options){
    if (options.equivalence_report) return options.equivalence_report;
    const mod = root.providerExecutionMockToLiveEquivalence;
    if (mod && typeof mod.evaluateMockToLiveEquivalence === 'function') return mod.evaluateMockToLiveEquivalence({ now: options.now });
    return null;
  }

  function getReplayPack(options){
    if (options.replay_pack) return options.replay_pack;
    const mod = root.providerSourceDryRunReplayPack;
    if (mod && typeof mod.buildDryRunReplayPack === 'function') return mod.buildDryRunReplayPack({ now: options.now });
    return null;
  }

  function getApprovalSimulation(options){
    if (options.operator_approval_simulation) return options.operator_approval_simulation;
    const mod = root.providerSourceOperatorApprovalSimulation;
    if (mod && typeof mod.simulateOperatorApproval === 'function') return mod.simulateOperatorApproval({ now: options.now, replay_pack: getReplayPack(options) });
    return null;
  }

  function getPolicyMatrix(options){
    if (options.policy_matrix) return options.policy_matrix;
    const mod = root.providerSourceExecutionPolicyMatrix;
    if (mod && typeof mod.buildPolicyMatrix === 'function') return mod.buildPolicyMatrix({ now: options.now });
    return null;
  }

  function getFailureContracts(options){
    if (options.failure_ux_contracts) return options.failure_ux_contracts;
    const mod = root.providerSourceFailureUxContracts;
    if (mod && typeof mod.buildFailureUxContracts === 'function') return mod.buildFailureUxContracts({ now: options.now });
    return null;
  }

  function buildDependencyChecklist(options = {}){
    const credential = getCredentialBoundaryReport(options);
    const source = getSourceAcquisitionAudit(options);
    const readiness = getReadinessReport(options);
    const equivalence = getEquivalenceReport(options);
    const replay = getReplayPack(options);
    const approval = getApprovalSimulation(options);
    const policy = getPolicyMatrix(options);
    const failure = getFailureContracts(options);

    return Object.freeze([
      dependencyRow('stable_manual_workflow_locked', 'passed', 'v1.3.0 stable manual workflow baseline remains locked.', false),
      dependencyRow('source_acquisition_control_surface_locked', source && source.ok === true ? 'passed' : 'missing', 'v1.4.0-alpha.7 source acquisition control surface must preserve no-fetch/manual review semantics.', !source || source.ok !== true),
      dependencyRow('credential_boundary_runtime_drill_locked', credential && credential.ok === true ? 'passed' : 'missing', 'v1.4.0-alpha.8 credential boundary drill must be green before candidate promotion.', !credential || credential.ok !== true),
      dependencyRow('mock_to_live_equivalence_locked', equivalence && (equivalence.ok === true || equivalence.equivalence_state === 'equivalent_for_planning') ? 'passed' : 'present_or_locked_baseline_required', 'v1.4.0-alpha.6 mock-to-live equivalence baseline must remain available.', false),
      dependencyRow('policy_matrix_present', policy && (asArray(policy.rows).length > 0 || asArray(policy.policy_rows).length > 0) ? 'passed' : 'present_or_locked_baseline_required', 'Provider/source policy matrix must define allowed/blocked modes.', false),
      dependencyRow('failure_ux_contracts_present', failure && asArray(failure.contracts).length > 0 ? 'passed' : 'present_or_locked_baseline_required', 'Failure UX contracts must remain available for candidate review.', false),
      dependencyRow('dry_run_replay_pack_present', replay && (asArray(replay.replay_items).length > 0 || asArray(replay.items).length > 0) ? 'passed' : 'present_or_locked_baseline_required', 'Dry-run replay pack must provide no-execution rehearsal evidence.', false),
      dependencyRow('operator_approval_simulation_present', approval && asArray(approval.approval_records).length > 0 ? 'passed' : 'present_or_locked_baseline_required', 'Operator approval simulation must prove simulated approval is not authorization.', false),
      dependencyRow('execution_readiness_report_present', readiness && readiness.live_execution_enabled === false ? 'passed' : 'present_or_locked_baseline_required', 'Execution readiness report must keep live execution blocked.', false)
    ]);
  }

  function buildOperatorPreconditionRows(){
    return OPERATOR_PRECONDITIONS.map((item) => Object.freeze(Object.assign({}, item, {
      live_execution_enabled: false,
      future_live_execution_authorized_now: false
    })));
  }

  function buildCandidateChecklist(options = {}){
    const dependencies = buildDependencyChecklist(options);
    const preconditions = buildOperatorPreconditionRows();
    const dependencyFailures = dependencies.filter((row) => row.status === 'missing' && row.blocks_future_live_execution === true);
    const unsatisfiedPreconditions = preconditions.filter((row) => row.required_before_any_future_execution && row.satisfied_now !== true);
    const checklist = [
      ...dependencies.map((row) => Object.freeze({ type: 'dependency', id: row.id, status: row.status, passed_for_no_execution_candidate: row.status !== 'missing', blocks_future_live_execution: row.blocks_future_live_execution, evidence: row.evidence })),
      ...preconditions.map((row) => Object.freeze({ type: 'operator_precondition', id: row.id, status: row.satisfied_now ? 'satisfied_for_candidate_review' : 'unsatisfied_for_future_execution', passed_for_no_execution_candidate: true, blocks_future_live_execution: row.satisfied_now !== true, evidence: row.reason }))
    ];
    return Object.freeze({
      checklist: Object.freeze(checklist),
      dependency_failures: Object.freeze(dependencyFailures.map((row) => row.id)),
      unsatisfied_operator_preconditions: Object.freeze(unsatisfiedPreconditions.map((row) => row.id)),
      passed_for_no_execution_candidate: dependencyFailures.length === 0,
      future_live_execution_blocked: true
    });
  }

  function buildNoExecutionDryCandidateReport(options = {}){
    const checklistResult = buildCandidateChecklist(options);
    const report = {
      controlled_execution_candidate_gate_version: VERSION,
      generated_at: options.now || new Date().toISOString(),
      stable_baseline: STABLE_BASELINE,
      credential_boundary_baseline: CREDENTIAL_BOUNDARY_BASELINE,
      source_acquisition_baseline: SOURCE_ACQUISITION_BASELINE,
      mock_to_live_baseline: MOCK_TO_LIVE_BASELINE,
      replay_baseline: REPLAY_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      candidate_state: checklistResult.passed_for_no_execution_candidate ? CANDIDATE_STATES.NO_EXECUTION_CANDIDATE_READY : CANDIDATE_STATES.REVIEW_REQUIRED,
      no_execution_dry_candidate_report: true,
      controlled_execution_candidate_only: true,
      execution_enabled: false,
      live_provider_execution_enabled: false,
      live_source_fetching_enabled: false,
      real_oauth_enabled: false,
      real_api_keys_used: false,
      real_token_storage_enabled: false,
      backend_storage_expanded: false,
      automatic_source_verification_claimed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      cryptographic_signature_claimed: false,
      publication_permission_claimed: false,
      boundary_flags: BOUNDARY_FLAGS,
      required_dependencies: REQUIRED_DEPENDENCIES,
      dependency_checklist: checklistResult.checklist,
      dependency_failure_count: checklistResult.dependency_failures.length,
      dependency_failures: checklistResult.dependency_failures,
      operator_preconditions: buildOperatorPreconditionRows(),
      unsatisfied_operator_precondition_count: checklistResult.unsatisfied_operator_preconditions.length,
      unsatisfied_operator_preconditions: checklistResult.unsatisfied_operator_preconditions,
      failure_to_enable_reasons: FAILURE_TO_ENABLE_REASONS,
      failure_to_enable_reason_count: FAILURE_TO_ENABLE_REASONS.length,
      manual_operator_preconditions_required: true,
      future_live_execution_blocked: true,
      safe_metadata_only: true,
      release_gate: checklistResult.passed_for_no_execution_candidate ? 'controlled_execution_candidate_gate_ready' : 'controlled_execution_candidate_gate_review_required',
      ok: checklistResult.passed_for_no_execution_candidate,
      boundary_statement: 'Controlled execution candidate gate produces a no-execution dry candidate report. It can list dependencies and blockers, but it cannot authorize live provider execution, source fetching, credentials, OAuth, backend/storage expansion, automatic verification, signoff, export lock, signatures, or publication.'
    };
    return Object.freeze(Object.assign(report, { candidate_report_checksum: deterministicChecksum(report) }));
  }

  function evaluateControlledExecutionCandidate(options = {}){
    return buildNoExecutionDryCandidateReport(options);
  }

  root.controlledExecutionCandidateGate = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    CREDENTIAL_BOUNDARY_BASELINE,
    SOURCE_ACQUISITION_BASELINE,
    MOCK_TO_LIVE_BASELINE,
    REPLAY_BASELINE,
    MILESTONE,
    MODEL,
    CANDIDATE_STATES,
    REQUIRED_DEPENDENCIES,
    OPERATOR_PRECONDITIONS,
    BOUNDARY_FLAGS,
    FAILURE_TO_ENABLE_REASONS,
    deterministicChecksum,
    buildDependencyChecklist,
    buildOperatorPreconditionRows,
    buildCandidateChecklist,
    buildNoExecutionDryCandidateReport,
    evaluateControlledExecutionCandidate
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
