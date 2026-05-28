/* Jarbou3i Research Engine provider execution preflight gate v1.4.0-alpha.4. */
/* Planning gate only. No live execution enabled. See ADR-001, ADR-002, ADR-003. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.4';
  const STABLE_BASELINE = '1.3.0';
  const MILESTONE = 'v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report';
  const MODEL = 'provider_execution_preflight.v1';

  const PREFLIGHT_CHECKS = Object.freeze([
    {
      id: 'credential_presence',
      label: 'Credential presence (not value)',
      description: 'A provider credential is configured. The preflight checks presence only — never the raw value.',
      required_for_live: true,
      planning_mode_value: false
    },
    {
      id: 'cost_controls_configured',
      label: 'Cost controls configured',
      description: 'Per-session token budget and hard abort threshold are set to valid non-zero values.',
      required_for_live: true,
      planning_mode_value: false
    },
    {
      id: 'timeout_controls_configured',
      label: 'Timeout controls configured',
      description: 'Provider call timeout is configured (>0ms, <=60000ms). AbortController support confirmed.',
      required_for_live: true,
      planning_mode_value: false
    },
    {
      id: 'mock_equivalence_tested',
      label: 'Mock-to-live equivalence tested',
      description: 'The mock provider and live provider share a validated input/output contract. CI confirms equivalence.',
      required_for_live: true,
      planning_mode_value: false
    },
    {
      id: 'privacy_review_completed',
      label: 'Privacy review completed',
      description: 'Privacy audit confirms: no PII in prompts by default, no credential in any export, no third-party telemetry beyond provider endpoint.',
      required_for_live: true,
      planning_mode_value: false
    },
    {
      id: 'failure_ux_specified',
      label: 'Failure UX specified',
      description: 'Error states (timeout, abort, auth failure, rate limit) have defined UI representations. No silent failure.',
      required_for_live: true,
      planning_mode_value: false
    },
    {
      id: 'no_automatic_verification_claim',
      label: 'No automatic verification claim',
      description: 'Provider output is labeled as AI-generated and unverified at every consumer surface.',
      required_for_live: true,
      planning_mode_value: true
    },
    {
      id: 'boundary_flags_reviewed',
      label: 'CI boundary flags reviewed',
      description: 'ci-gate-registry.json boundary flags have been deliberately reviewed and updated to reflect the new execution scope.',
      required_for_live: true,
      planning_mode_value: false
    }
  ]);

  function runPreflight(config, opts) {
    const cfg = config || {};
    const options = opts || {};
    const now = (options.now) ? new Date(options.now) : new Date();
    const isPlanningMode = cfg.planning_mode !== false;

    const results = PREFLIGHT_CHECKS.map(check => {
      const value = isPlanningMode
        ? check.planning_mode_value
        : Boolean(cfg[check.id]);
      return Object.freeze({
        id: check.id,
        label: check.label,
        passed: value,
        required_for_live: check.required_for_live,
        planning_mode: isPlanningMode
      });
    });

    const allPassed = results.every(r => r.passed);
    const failedRequired = results.filter(r => r.required_for_live && !r.passed);

    return Object.freeze({
      preflight_version: VERSION,
      alpha_milestone: MILESTONE,
      model: MODEL,
      evaluated_at: now.toISOString(),
      planning_mode: isPlanningMode,
      live_execution_enabled: false,
      provider_behavior_changed: false,
      runtime_capability_change: false,
      preflight_passed: allPassed,
      checks: results,
      check_count: results.length,
      passed_count: results.filter(r => r.passed).length,
      failed_count: results.filter(r => !r.passed).length,
      failed_required: failedRequired.map(r => r.id),
      boundary_statement: isPlanningMode
        ? 'Preflight running in planning mode. All required checks will be false until an implementation milestone configures them.'
        : allPassed
          ? 'All preflight checks passed. Live provider execution may proceed subject to registry boundary flag update.'
          : `Preflight failed. ${failedRequired.length} required check(s) not satisfied: ${failedRequired.map(r => r.id).join(', ')}.`
    });
  }

  function getCheckDefinitions() {
    return PREFLIGHT_CHECKS;
  }

  function getRequiredChecks() {
    return PREFLIGHT_CHECKS.filter(c => c.required_for_live);
  }

  root.providerExecutionPreflight = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    MILESTONE,
    MODEL,
    runPreflight,
    getCheckDefinitions,
    getRequiredChecks
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
