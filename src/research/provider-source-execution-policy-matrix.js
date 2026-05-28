/* Jarbou3i Research Engine provider/source execution policy matrix v1.4.0-alpha.3. */
/* Planning/control-plane only. No live execution enabled. See ADR-001 through ADR-005. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.3';
  const STABLE_BASELINE = '1.3.0';
  const CONTROL_BASELINE = '1.4.0-alpha.1';
  const MILESTONE = 'v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator';
  const MODEL = 'provider_source_execution_policy_matrix.v1';

  const POLICY_STATES = Object.freeze({
    ALLOWED_MANUAL: 'allowed_manual',
    ALLOWED_MOCK: 'allowed_mock',
    PLANNING_ONLY: 'planning_only',
    BLOCKED_UNTIL_FUTURE_GATE: 'blocked_until_future_gate',
    FORBIDDEN_IN_ALPHA2: 'forbidden_in_alpha2'
  });

  const POLICY_ROWS = Object.freeze([
    {
      id: 'manual_source_import',
      surface: 'source',
      state: POLICY_STATES.ALLOWED_MANUAL,
      operator_visible_label: 'Manual source import',
      allowed_now: true,
      live_network_allowed: false,
      credential_required: false,
      review_gate_required: true,
      failure_contract_required: false,
      rationale: 'Manual/private workflow is the locked v1.3.0 baseline and remains first-class.'
    },
    {
      id: 'mock_provider_response',
      surface: 'provider',
      state: POLICY_STATES.ALLOWED_MOCK,
      operator_visible_label: 'Mock provider response',
      allowed_now: true,
      live_network_allowed: false,
      credential_required: false,
      review_gate_required: true,
      failure_contract_required: true,
      rationale: 'Mock execution may exercise UI/contracts without contacting an external provider.'
    },
    {
      id: 'provider_dry_run_preflight',
      surface: 'provider',
      state: POLICY_STATES.PLANNING_ONLY,
      operator_visible_label: 'Provider dry-run preflight',
      allowed_now: true,
      live_network_allowed: false,
      credential_required: false,
      review_gate_required: true,
      failure_contract_required: true,
      rationale: 'Preflight can evaluate policy readiness but must not execute live calls.'
    },
    {
      id: 'live_provider_execution',
      surface: 'provider',
      state: POLICY_STATES.BLOCKED_UNTIL_FUTURE_GATE,
      operator_visible_label: 'Live provider execution',
      allowed_now: false,
      live_network_allowed: false,
      credential_required: true,
      review_gate_required: true,
      failure_contract_required: true,
      unlock_requires: [
        'provider_execution_preflight_passed',
        'credential_boundary_runtime_drill_passed',
        'cost_timeout_controls_enforced',
        'failure_ux_contracts_implemented',
        'mock_to_live_equivalence_passed',
        'ci_boundary_flags_deliberately_changed'
      ],
      rationale: 'Live provider execution remains blocked in alpha.2; this milestone only defines policy states.'
    },
    {
      id: 'live_source_fetching',
      surface: 'source',
      state: POLICY_STATES.BLOCKED_UNTIL_FUTURE_GATE,
      operator_visible_label: 'Live source fetching',
      allowed_now: false,
      live_network_allowed: false,
      credential_required: false,
      review_gate_required: true,
      failure_contract_required: true,
      unlock_requires: [
        'source_acquisition_adr_accepted',
        'connector_registry_allowlist_enforced',
        'rate_limit_controls_enforced',
        'source_review_queue_required',
        'robots_terms_policy_recorded'
      ],
      rationale: 'Source acquisition controls are planned, not enabled; no uncontrolled fetching or scraping.'
    },
    {
      id: 'production_oauth',
      surface: 'credential',
      state: POLICY_STATES.FORBIDDEN_IN_ALPHA2,
      operator_visible_label: 'Production OAuth',
      allowed_now: false,
      live_network_allowed: false,
      credential_required: true,
      review_gate_required: true,
      failure_contract_required: true,
      unlock_requires: [
        'credential_boundary_adr_accepted',
        'oauth_threat_model_complete',
        'token_storage_policy_implemented',
        'secret_export_leak_tests_passed'
      ],
      rationale: 'Portable OAuth remains mock/spike only; production OAuth is outside alpha.2 scope.'
    },
    {
      id: 'backend_proxy_live_execution',
      surface: 'backend',
      state: POLICY_STATES.FORBIDDEN_IN_ALPHA2,
      operator_visible_label: 'Backend proxy live execution',
      allowed_now: false,
      live_network_allowed: false,
      credential_required: true,
      review_gate_required: true,
      failure_contract_required: true,
      unlock_requires: [
        'backend_threat_model_complete',
        'server_secret_boundary_enforced',
        'provider_timeout_controls_enforced',
        'audit_log_privacy_review_passed'
      ],
      rationale: 'Backend scaffold exists, but backend behavior is not expanded in alpha.2.'
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
    automatic_source_verification_claimed: false
  });

  function cloneRow(row) {
    return Object.freeze(Object.assign({}, row, {
      unlock_requires: Object.freeze(Array.isArray(row.unlock_requires) ? row.unlock_requires.slice() : [])
    }));
  }

  function getPolicyRows() {
    return POLICY_ROWS.map(cloneRow);
  }

  function getPolicy(id) {
    const row = POLICY_ROWS.find(item => item.id === id);
    return row ? cloneRow(row) : null;
  }

  function getAllowedPolicies() {
    return POLICY_ROWS.filter(row => row.allowed_now === true).map(cloneRow);
  }

  function getBlockedPolicies() {
    return POLICY_ROWS.filter(row => row.allowed_now === false).map(cloneRow);
  }

  function buildPolicyMatrix(opts) {
    const options = opts || {};
    const now = options.now ? new Date(options.now) : new Date();
    const rows = getPolicyRows();
    const allowed = rows.filter(row => row.allowed_now === true);
    const blocked = rows.filter(row => row.allowed_now === false);
    return Object.freeze({
      policy_matrix_version: VERSION,
      stable_baseline: STABLE_BASELINE,
      control_baseline: CONTROL_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: now.toISOString(),
      planning_control_plane_only: true,
      live_execution_enabled: false,
      live_source_fetching_enabled: false,
      production_oauth_enabled: false,
      boundary_flags: BOUNDARY_FLAGS,
      rows,
      row_count: rows.length,
      allowed_count: allowed.length,
      blocked_count: blocked.length,
      blocked_policy_ids: blocked.map(row => row.id),
      allowed_policy_ids: allowed.map(row => row.id),
      all_live_network_disabled: rows.every(row => row.live_network_allowed === false),
      all_blocked_have_unlock_requirements: blocked.every(row => Array.isArray(row.unlock_requires) && row.unlock_requires.length >= 3),
      boundary_statement: 'Policy matrix is a planning/control-plane artifact. v1.4.0-alpha.3 does not enable live provider execution, live source fetching, production OAuth, backend expansion, or storage expansion.'
    });
  }

  root.providerSourceExecutionPolicyMatrix = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    CONTROL_BASELINE,
    MILESTONE,
    MODEL,
    POLICY_STATES,
    BOUNDARY_FLAGS,
    buildPolicyMatrix,
    getPolicyRows,
    getPolicy,
    getAllowedPolicies,
    getBlockedPolicies
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
