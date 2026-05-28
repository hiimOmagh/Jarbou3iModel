/* Jarbou3i Research Engine provider/source failure UX contracts v1.4.0-alpha.4. */
/* Planning/control-plane only. No live execution enabled. See ADR-004 and ADR-005. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.4';
  const STABLE_BASELINE = '1.3.0';
  const CONTROL_BASELINE = '1.4.0-alpha.1';
  const MILESTONE = 'v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report';
  const MODEL = 'provider_source_failure_ux_contracts.v1';

  const CONTRACTS = Object.freeze([
    {
      id: 'provider_timeout',
      surface: 'provider',
      severity: 'blocking',
      user_message: 'Provider request timed out before completion.',
      operator_action: 'Review timeout/cost settings, keep current brief unchanged, and retry only after preflight passes.',
      retry_policy: 'manual_retry_only',
      state_transition: 'draft_preserved_provider_blocked',
      secret_handling: 'no_credentials_rendered',
      verification_claimed: false
    },
    {
      id: 'provider_auth_missing',
      surface: 'provider',
      severity: 'blocking',
      user_message: 'Provider credential is not configured.',
      operator_action: 'Remain in manual/mock mode. Do not request or display raw credential in the browser surface.',
      retry_policy: 'blocked_until_credential_boundary_drill',
      state_transition: 'provider_execution_blocked',
      secret_handling: 'presence_only_never_value',
      verification_claimed: false
    },
    {
      id: 'provider_rate_limited',
      surface: 'provider',
      severity: 'recoverable',
      user_message: 'Provider rate limit reached.',
      operator_action: 'Pause execution and preserve manual workspace state. No automatic retry loop.',
      retry_policy: 'manual_retry_after_cooldown',
      state_transition: 'provider_paused_workspace_preserved',
      secret_handling: 'no_credentials_rendered',
      verification_claimed: false
    },
    {
      id: 'provider_cost_budget_exceeded',
      surface: 'provider',
      severity: 'blocking',
      user_message: 'Provider cost or token budget would be exceeded.',
      operator_action: 'Reduce context size or raise budget explicitly in a future approved milestone.',
      retry_policy: 'blocked_until_budget_changed_by_operator',
      state_transition: 'provider_execution_blocked_budget_guard',
      secret_handling: 'no_credentials_rendered',
      verification_claimed: false
    },
    {
      id: 'provider_invalid_response',
      surface: 'provider',
      severity: 'blocking',
      user_message: 'Provider response did not match the expected schema.',
      operator_action: 'Route output to repair/review queue; do not merge as verified evidence.',
      retry_policy: 'manual_repair_then_retry',
      state_transition: 'response_quarantined_review_required',
      secret_handling: 'no_credentials_rendered',
      verification_claimed: false
    },
    {
      id: 'source_fetch_blocked',
      surface: 'source',
      severity: 'blocking',
      user_message: 'Live source fetching is blocked by policy.',
      operator_action: 'Use manual source import or approved source packet workflow.',
      retry_policy: 'no_retry_until_source_policy_unlocked',
      state_transition: 'manual_source_import_required',
      secret_handling: 'not_applicable',
      verification_claimed: false
    },
    {
      id: 'source_rate_limited',
      surface: 'source',
      severity: 'recoverable',
      user_message: 'Source connector request limit reached.',
      operator_action: 'Stop connector activity and preserve source queue state for manual review.',
      retry_policy: 'manual_retry_after_rate_limit_window',
      state_transition: 'source_acquisition_paused',
      secret_handling: 'not_applicable',
      verification_claimed: false
    },
    {
      id: 'credential_boundary_violation',
      surface: 'credential',
      severity: 'critical',
      user_message: 'Credential boundary violation detected.',
      operator_action: 'Abort execution path, block export, and run privacy/export guard before any handoff.',
      retry_policy: 'no_retry_until_privacy_guard_passes',
      state_transition: 'execution_aborted_export_blocked',
      secret_handling: 'redact_and_abort',
      verification_claimed: false
    }
  ]);

  function cloneContract(contract) {
    return Object.freeze(Object.assign({}, contract));
  }

  function getContracts() {
    return CONTRACTS.map(cloneContract);
  }

  function getContract(id) {
    const contract = CONTRACTS.find(item => item.id === id);
    return contract ? cloneContract(contract) : null;
  }

  function getCriticalContracts() {
    return CONTRACTS.filter(contract => contract.severity === 'critical').map(cloneContract);
  }

  function buildFailureUxContracts(opts) {
    const options = opts || {};
    const now = options.now ? new Date(options.now) : new Date();
    const contracts = getContracts();
    const severitySummary = contracts.reduce((acc, contract) => {
      acc[contract.severity] = (acc[contract.severity] || 0) + 1;
      return acc;
    }, {});
    return Object.freeze({
      failure_ux_contract_version: VERSION,
      stable_baseline: STABLE_BASELINE,
      control_baseline: CONTROL_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: now.toISOString(),
      planning_control_plane_only: true,
      live_execution_enabled: false,
      live_source_fetching_enabled: false,
      production_oauth_enabled: false,
      failure_ux_specified: true,
      silent_failure_allowed: false,
      automatic_retry_allowed: false,
      contracts,
      contract_count: contracts.length,
      severity_summary: Object.freeze(severitySummary),
      all_contracts_preserve_review_boundary: contracts.every(contract => contract.verification_claimed === false),
      all_contracts_define_operator_action: contracts.every(contract => typeof contract.operator_action === 'string' && contract.operator_action.length > 20),
      all_contracts_define_state_transition: contracts.every(contract => typeof contract.state_transition === 'string' && contract.state_transition.length > 5),
      boundary_statement: 'Failure UX contracts are planning/control-plane artifacts. v1.4.0-alpha.4 defines operator-visible failure states but does not enable live provider or source execution.'
    });
  }

  root.providerSourceFailureUxContracts = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    CONTROL_BASELINE,
    MILESTONE,
    MODEL,
    buildFailureUxContracts,
    getContracts,
    getContract,
    getCriticalContracts
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
