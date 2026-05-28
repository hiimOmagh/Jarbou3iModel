/* Jarbou3i Research Engine provider execution threat model v1.4.0-alpha.3. */
/* Planning gate only. No live execution enabled. See ADR-001, ADR-003. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.3';
  const STABLE_BASELINE = '1.3.0';
  const MILESTONE = 'v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator';
  const MODEL = 'provider_execution_threat_model.v1';

  const THREAT_CATEGORIES = Object.freeze([
    {
      id: 'credential_leak',
      title: 'Credential Leak',
      severity: 'critical',
      vectors: [
        'Raw API key serialized into localStorage during session persistence.',
        'Raw API key included in JSON export payload.',
        'API key logged to browser console on provider call failure.',
        'API key embedded in DOM data attribute for display convenience.',
        'Refresh token exposed in clipboard copy of export.'
      ],
      mitigations: [
        'privacy-export-guard.js scans every export payload for credential patterns before emission.',
        'portable-account-mock.js establishes the pattern: token_hash_only:true, raw value never stored.',
        'ADR-003 prohibits raw credential at every observable surface.',
        'Provider module receives credential as function argument only — never stored in module state.'
      ],
      ci_gates: ['tests/privacy-export-guard-check.mjs', 'tests/privacy-audit-check.mjs'],
      live_execution_prerequisite: true
    },
    {
      id: 'cost_runaway',
      title: 'Unbounded Cost / Token Budget Overrun',
      severity: 'high',
      vectors: [
        'Provider call loop triggered by malformed response retry logic with no abort limit.',
        'Large context window filled with unfiltered source text before any truncation.',
        'Parallel provider calls initiated without concurrency cap.',
        'No per-session budget configured — all calls succeed until external rate limit.'
      ],
      mitigations: [
        'Per-session token budget must be configured and enforced before any live call.',
        'Hard abort threshold triggers ProviderAbortError after N tokens or N requests.',
        'Context assembly must apply a max-token limit before sending to provider.',
        'Preflight gate requires cost_controls_configured:true before enabling live calls.'
      ],
      ci_gates: ['tests/provider-execution-preflight-check.mjs'],
      live_execution_prerequisite: true
    },
    {
      id: 'timeout_hang',
      title: 'Provider Timeout / Silent Hang',
      severity: 'high',
      vectors: [
        'Provider endpoint unreachable — app waits indefinitely with no user feedback.',
        'Slow response with streaming — partial output displayed as complete.',
        'Timeout set too high (>60s) — user cannot cancel without page reload.',
        'No AbortController wired — in-flight request cannot be cancelled.'
      ],
      mitigations: [
        'Every provider call must use a configurable timeout with a hard default of 30s.',
        'AbortController must be wired to every fetch/stream call.',
        'On timeout, provider returns ProviderTimeoutError — never resolves as success.',
        'Preflight gate requires timeout_controls_configured:true.'
      ],
      ci_gates: ['tests/provider-execution-preflight-check.mjs'],
      live_execution_prerequisite: true
    },
    {
      id: 'pii_in_prompt',
      title: 'PII Leakage in Provider Prompt',
      severity: 'high',
      vectors: [
        'User-pasted source text containing PII (names, emails, IDs) sent verbatim to provider.',
        'Workspace state serialized into prompt context without PII scrubbing.',
        'Research topic string containing sensitive query sent to third-party provider.'
      ],
      mitigations: [
        'Prompt assembly must document which fields are included — no implicit full-state serialization.',
        'Privacy audit must confirm no PII fields are forwarded by default.',
        'User must be informed which data will be sent before any live call.',
        'Preflight gate requires privacy_review_completed:true.'
      ],
      ci_gates: ['tests/privacy-audit-check.mjs', 'tests/provider-execution-preflight-check.mjs'],
      live_execution_prerequisite: true
    },
    {
      id: 'automatic_verification_claim',
      title: 'False Verification / Epistemic Boundary Violation',
      severity: 'high',
      vectors: [
        'Provider output displayed without "AI-generated, unverified" label.',
        'Evidence card produced from provider output marked as verified:true.',
        'Publication pack includes provider output without disclaimer.',
        'Quality gate marks provider-only evidence as sufficient for publication.'
      ],
      mitigations: [
        'Provider output must always carry provider_generated:true and verification_claimed:false.',
        'Evidence cards from provider output must display an unverified label in UI.',
        'Publication review gate blocks export if provider-generated evidence is not flagged.',
        'Banned claim list includes "verified sources", "automatic source truth checking".'
      ],
      ci_gates: ['tests/publication-review-gate-check.mjs', 'tests/privacy-export-guard-check.mjs'],
      live_execution_prerequisite: true
    },
    {
      id: 'uncontrolled_source_acquisition',
      title: 'Uncontrolled Source Fetching / Scraping',
      severity: 'high',
      vectors: [
        'Source connector invoked without registry check — arbitrary URL fetched.',
        'Connector result bypasses evidence review queue.',
        'Web search result injected directly into evidence without dry-run validation.',
        'Rate limiting absent — connector hammers external endpoint.'
      ],
      mitigations: [
        'controlled-connector-engine.js is the sole entry point — rejects unregistered connectors.',
        'Every connector result requires review_gate:evidence_review_queue_required.',
        'Dry-run mode tested in CI before live mode is enabled (ADR-002).',
        'Per-session request limit enforced in connector engine.'
      ],
      ci_gates: ['tests/controlled-connector-architecture-check.mjs', 'tests/source-capability-registry-check.mjs'],
      live_execution_prerequisite: true
    },
    {
      id: 'mock_live_divergence',
      title: 'Mock-to-Live Contract Divergence',
      severity: 'medium',
      vectors: [
        'Mock provider returns different output shape than live provider.',
        'Tests pass against mock but fail silently against live provider.',
        'Live provider adds fields not in mock schema — downstream code breaks.'
      ],
      mitigations: [
        'Mock provider must implement identical input/output contract as live provider.',
        'Contract is schema-validated in CI against both mock and live response fixtures.',
        'Any live provider response field not in mock schema is a CI failure.',
        'ADR-001 mandates mock-equivalence testing before live path enablement.'
      ],
      ci_gates: ['tests/provider-execution-preflight-check.mjs'],
      live_execution_prerequisite: true
    }
  ]);

  function buildThreatModel(opts) {
    const options = opts || {};
    const now = (options.now) ? new Date(options.now) : new Date();
    return Object.freeze({
      threat_model_version: VERSION,
      alpha_milestone: MILESTONE,
      model: MODEL,
      generated_at: now.toISOString(),
      live_execution_enabled: false,
      provider_behavior_changed: false,
      runtime_capability_change: false,
      threats: THREAT_CATEGORIES,
      threat_count: THREAT_CATEGORIES.length,
      all_require_live_prerequisite: THREAT_CATEGORIES.every(t => t.live_execution_prerequisite === true),
      severity_summary: Object.freeze(
        THREAT_CATEGORIES.reduce((acc, t) => {
          acc[t.severity] = (acc[t.severity] || 0) + 1;
          return acc;
        }, {})
      ),
      boundary_statement: 'This threat model is planning-gate only. No live provider execution is enabled in v1.4.0-alpha.3. All mitigations listed are implementation requirements for future milestones.'
    });
  }

  function getThreat(id) {
    return THREAT_CATEGORIES.find(t => t.id === id) || null;
  }

  function getCriticalThreats() {
    return THREAT_CATEGORIES.filter(t => t.severity === 'critical');
  }

  function getHighThreats() {
    return THREAT_CATEGORIES.filter(t => t.severity === 'high');
  }

  root.providerExecutionThreatModel = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    MILESTONE,
    MODEL,
    buildThreatModel,
    getThreat,
    getCriticalThreats,
    getHighThreats
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
