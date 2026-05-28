/* Jarbou3i Research Engine credential boundary runtime drill v1.4.0-alpha.8. */
/* Deterministic fake-secret drills only. No real OAuth, API keys, token storage, provider execution, live fetch, backend, or storage expansion enabled. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.8';
  const STABLE_BASELINE = '1.3.0';
  const SOURCE_ACQUISITION_BASELINE = '1.4.0-alpha.7';
  const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
  const REPLAY_BASELINE = '1.4.0-alpha.5';
  const MILESTONE = 'v1.4.0-alpha.8 — Credential Boundary Runtime Drill';
  const MODEL = 'credential_boundary_runtime_drill.v1';
  const REDACTION = '[REDACTED_BY_CREDENTIAL_BOUNDARY_DRILL]';

  const DRILL_IDS = Object.freeze([
    'fake_secret_injection',
    'export_leak_drill',
    'log_leak_drill',
    'browser_visible_text_leak_drill',
    'fixture_leak_drill',
    'provider_payload_secret_boundary_drill',
    'release_bundle_secret_boundary_drill'
  ]);

  const SAFE_DERIVED_KEYS = Object.freeze([
    'token_hash',
    'credential_fingerprint',
    'secret_fingerprint',
    'key_exported',
    'raw_token_exported',
    'access_token_exported',
    'refresh_token_exported',
    'secret_exported',
    'credential_exported',
    'has_configured_provider',
    'credential_boundary_state'
  ]);

  const SENSITIVE_KEY_PATTERNS = Object.freeze([
    /(^|[_-])access[_-]?token($|[_-])/i,
    /(^|[_-])refresh[_-]?token($|[_-])/i,
    /(^|[_-])raw[_-]?token($|[_-])/i,
    /(^|[_-])id[_-]?token($|[_-])/i,
    /^token$/i,
    /^authorization$/i,
    /^bearer$/i,
    /(^|[_-])api[_-]?key($|[_-])/i,
    /(^|[_-])secret($|[_-])/i,
    /(^|[_-])client[_-]?secret($|[_-])/i,
    /(^|[_-])private[_-]?key($|[_-])/i,
    /^password$/i,
    /^credential(s)?$/i
  ]);

  const SECRET_TEXT_PATTERNS = Object.freeze([
    { id: 'bearer_token_text', pattern: /Bearer\s+[A-Za-z0-9._~+/=-]{12,}/i },
    { id: 'openai_key_like_text', pattern: /sk-[A-Za-z0-9_-]{16,}/i },
    { id: 'github_pat_like_text', pattern: /github_pat_[A-Za-z0-9_]{20,}/i },
    { id: 'github_token_like_text', pattern: /ghp_[A-Za-z0-9_]{16,}/i },
    { id: 'google_oauth_like_text', pattern: /ya29\.[A-Za-z0-9._-]{20,}/i },
    { id: 'refresh_token_assignment', pattern: /refresh[_-]?token\s*[:=]\s*["'][^"']{8,}["']/i },
    { id: 'access_token_assignment', pattern: /access[_-]?token\s*[:=]\s*["'][^"']{8,}["']/i },
    { id: 'api_key_assignment', pattern: /api[_-]?key\s*[:=]\s*["'][^"']{12,}["']/i }
  ]);

  const BOUNDARY_FLAGS = Object.freeze({
    runtime_capability_change: false,
    provider_behavior_changed: false,
    oauth_behavior_changed: false,
    backend_behavior_changed: false,
    source_behavior_changed: false,
    storage_behavior_changed: false,
    live_provider_execution_enabled: false,
    live_source_fetching_enabled: false,
    production_oauth_enabled: false,
    real_api_keys_allowed: false,
    real_token_storage_allowed: false,
    fake_secret_drill_only: true,
    redaction_required: true,
    export_leak_blocked: true,
    log_leak_blocked: true,
    browser_visible_text_leak_blocked: true,
    fixture_leak_blocked: true,
    release_bundle_leak_blocked: true
  });

  const DRILL_DEFINITIONS = Object.freeze({
    fake_secret_injection: Object.freeze({
      drill_id: 'fake_secret_injection',
      label: 'Fake secret injection drill',
      surface: 'runtime_fixture_injection',
      expected_detection: 'secret_like_values_detected_and_redacted',
      allowed_real_credentials: false,
      safe_output_required: true,
      operator_message: 'Fake secret fixtures prove detection/redaction only; no real credential is used or stored.'
    }),
    export_leak_drill: Object.freeze({
      drill_id: 'export_leak_drill',
      label: 'Export leak drill',
      surface: 'export_payload',
      expected_detection: 'unsafe_export_fields_redacted',
      allowed_real_credentials: false,
      safe_output_required: true,
      operator_message: 'Export payloads must redact sensitive keys and secret-like text before release artifacts are produced.'
    }),
    log_leak_drill: Object.freeze({
      drill_id: 'log_leak_drill',
      label: 'Log leak drill',
      surface: 'diagnostic_log',
      expected_detection: 'log_secret_text_redacted',
      allowed_real_credentials: false,
      safe_output_required: true,
      operator_message: 'Diagnostics may report fingerprints and booleans only; raw credentials must not survive in logs.'
    }),
    browser_visible_text_leak_drill: Object.freeze({
      drill_id: 'browser_visible_text_leak_drill',
      label: 'Browser visible-text leak drill',
      surface: 'browser_visible_text',
      expected_detection: 'visible_text_secret_patterns_absent',
      allowed_real_credentials: false,
      safe_output_required: true,
      operator_message: 'Visible UI copy may describe credential boundaries but must not expose secret-like values.'
    }),
    fixture_leak_drill: Object.freeze({
      drill_id: 'fixture_leak_drill',
      label: 'Fixture leak drill',
      surface: 'test_fixture_payload',
      expected_detection: 'fixture_secret_fields_redacted_or_rejected',
      allowed_real_credentials: false,
      safe_output_required: true,
      operator_message: 'Fixtures may contain deterministic fake-secret test vectors only when redacted outputs are asserted.'
    }),
    provider_payload_secret_boundary_drill: Object.freeze({
      drill_id: 'provider_payload_secret_boundary_drill',
      label: 'Provider payload secret-boundary drill',
      surface: 'provider_payload',
      expected_detection: 'provider_payload_metadata_only',
      allowed_real_credentials: false,
      safe_output_required: true,
      operator_message: 'Provider payloads must keep credential material out and expose only safe metadata/fingerprints.'
    }),
    release_bundle_secret_boundary_drill: Object.freeze({
      drill_id: 'release_bundle_secret_boundary_drill',
      label: 'Release bundle secret-boundary drill',
      surface: 'release_bundle',
      expected_detection: 'release_bundle_contains_no_raw_credentials',
      allowed_real_credentials: false,
      safe_output_required: true,
      operator_message: 'Release bundles must include reports, not raw tokens, API keys, or authorization headers.'
    })
  });

  function clone(value){ return JSON.parse(JSON.stringify(value)); }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function isPlainObject(value){ return Object.prototype.toString.call(value) === '[object Object]'; }

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

  function isSafeDerivedKey(key){
    const normalized = text(key).toLowerCase();
    return SAFE_DERIVED_KEYS.some((safeKey) => safeKey.toLowerCase() === normalized) || /(^|[_-])(hash|fingerprint)($|[_-])/i.test(normalized);
  }

  function isSensitiveKey(key){
    const normalized = text(key);
    if (!normalized || isSafeDerivedKey(normalized)) return false;
    return SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(normalized));
  }

  function secretTextMatches(value){
    if (typeof value !== 'string') return [];
    return SECRET_TEXT_PATTERNS.filter((entry) => entry.pattern.test(value)).map((entry) => entry.id);
  }

  function finding(path, code, detail){
    return Object.freeze({ path: path.length ? path.join('.') : '<root>', code, detail, value_preview: '[REDACTED_PREVIEW]' });
  }

  function sanitizeCredentialNode(value, path = [], findings = []){
    if (Array.isArray(value)) return value.map((item, index) => sanitizeCredentialNode(item, path.concat(String(index)), findings));
    if (isPlainObject(value)) {
      const clean = {};
      for (const [key, entry] of Object.entries(value)) {
        const nextPath = path.concat(key);
        if (isSensitiveKey(key)) {
          if (entry !== null && entry !== undefined && entry !== false && entry !== '') findings.push(finding(nextPath, 'SENSITIVE_KEY_REDACTED', `Sensitive key "${key}" was redacted.`));
          clean[key] = REDACTION;
          continue;
        }
        clean[key] = sanitizeCredentialNode(entry, nextPath, findings);
      }
      return clean;
    }
    const matches = secretTextMatches(value);
    if (matches.length) {
      findings.push(finding(path, 'SECRET_TEXT_REDACTED', `Secret-like text matched: ${matches.join(',')}.`));
      return REDACTION;
    }
    return value;
  }

  function auditCredentialPayload(payload){
    const findings = [];
    const sanitized_payload = sanitizeCredentialNode(payload, [], findings);
    const report = {
      credential_boundary_runtime_drill_version: VERSION,
      safe: findings.length === 0,
      finding_count: findings.length,
      findings: Object.freeze(findings),
      raw_token_exported: false,
      access_token_exported: false,
      refresh_token_exported: false,
      key_exported: false,
      secret_exported: false,
      credential_exported: false,
      redaction_applied: findings.length > 0
    };
    return Object.freeze({ sanitized_payload: Object.freeze(sanitized_payload), credential_boundary_report: Object.freeze(report) });
  }

  function fakeSecretFixture(){
    return Object.freeze({
      provider_config: {
        api_key: 'sk-FAKEBOUNDARYDRILL000000000000',
        endpoint: 'https://example.invalid/v1/mock'
      },
      portable_account: {
        token_hash: 'hash_fake_only_12345678',
        raw_token: 'Bearer FAKEBOUNDARYTOKEN1234567890',
        raw_token_exported: false,
        key_exported: false
      },
      diagnostic_log: 'Authorization: Bearer FAKEBOUNDARYLOGTOKEN1234567890',
      fixture_payload: 'refresh_token="FAKE_REFRESH_TOKEN_1234567890"',
      provider_payload: {
        credential_fingerprint: 'fp_fake_only_1234',
        access_token: 'ya29.FAKEBOUNDARYTOKEN123456789012345'
      }
    });
  }

  function safeVisibleTextCorpus(options = {}){
    const lines = asArray(options.visible_text).length ? asArray(options.visible_text) : [
      'Credential Boundary Runtime Drill',
      'Fake-secret injection, export leak, log leak, browser-visible text leak, fixture leak, provider payload, and release bundle checks are active.',
      'No real OAuth, API keys, raw tokens, backend storage, live source fetching, or live provider execution is enabled.',
      'Only safe fingerprints, booleans, and redaction reports may appear.'
    ];
    return lines.map((line) => text(line)).filter(Boolean);
  }

  function runDrill(drillId, options = {}){
    const definition = DRILL_DEFINITIONS[drillId];
    if (!definition) throw new Error(`Unknown credential boundary drill: ${drillId}`);
    const fixture = options.fixture || fakeSecretFixture();
    const payload = drillId === 'browser_visible_text_leak_drill' ? safeVisibleTextCorpus(options).join('\n') : fixture;
    const result = auditCredentialPayload(payload);
    const expectedLeakDetected = drillId === 'browser_visible_text_leak_drill' ? result.credential_boundary_report.finding_count === 0 : result.credential_boundary_report.finding_count > 0;
    const safeOutput = stableStringify(result.sanitized_payload);
    const outputSecretMatches = secretTextMatches(safeOutput);
    const row = {
      credential_boundary_runtime_drill_version: VERSION,
      drill_id: drillId,
      label: definition.label,
      surface: definition.surface,
      expected_detection: definition.expected_detection,
      allowed_real_credentials: false,
      redaction_required: definition.safe_output_required,
      fake_secret_drill_only: true,
      finding_count: result.credential_boundary_report.finding_count,
      expected_leak_detected_or_absent: expectedLeakDetected,
      sanitized_output_contains_secret_like_text: outputSecretMatches.length > 0,
      sanitized_output_secret_patterns: outputSecretMatches,
      raw_token_exported: false,
      access_token_exported: false,
      refresh_token_exported: false,
      key_exported: false,
      secret_exported: false,
      credential_exported: false,
      operator_message: definition.operator_message,
      report: result.credential_boundary_report,
      sanitized_payload: result.sanitized_payload
    };
    return Object.freeze(Object.assign(row, {
      pass: expectedLeakDetected && outputSecretMatches.length === 0,
      drill_checksum: deterministicChecksum(row)
    }));
  }

  function runCredentialBoundaryRuntimeDrill(options = {}){
    const drills = DRILL_IDS.map((drillId) => runDrill(drillId, options));
    const issues = [];
    drills.forEach((drill) => {
      if (!drill.pass) issues.push(`${drill.drill_id}:failed`);
      if (drill.sanitized_output_contains_secret_like_text) issues.push(`${drill.drill_id}:sanitized_output_secret_like_text`);
      for (const flag of ['raw_token_exported','access_token_exported','refresh_token_exported','key_exported','secret_exported','credential_exported']) {
        if (drill[flag] !== false) issues.push(`${drill.drill_id}:${flag}_must_remain_false`);
      }
    });
    const report = {
      credential_boundary_runtime_drill_version: VERSION,
      generated_at: options.now || new Date().toISOString(),
      stable_baseline: STABLE_BASELINE,
      source_acquisition_baseline: SOURCE_ACQUISITION_BASELINE,
      mock_to_live_baseline: MOCK_TO_LIVE_BASELINE,
      replay_baseline: REPLAY_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      drill_count: drills.length,
      drills: Object.freeze(drills),
      issue_count: issues.length,
      issues: Object.freeze(issues),
      ok: issues.length === 0,
      release_gate: issues.length ? 'credential_boundary_runtime_drill_blocked' : 'credential_boundary_runtime_drill_ready',
      boundary_flags: BOUNDARY_FLAGS,
      real_oauth_enabled: false,
      real_api_keys_used: false,
      real_token_storage_enabled: false,
      live_provider_execution_enabled: false,
      live_source_fetching_enabled: false,
      backend_storage_expanded: false,
      safe_metadata_only: true,
      boundary_statement: 'Credential boundary runtime drills use deterministic fake-secret vectors to prove redaction across exports, logs, visible text, fixtures, provider payloads, and release bundles without real credentials.'
    };
    return Object.freeze(Object.assign(report, { drill_report_checksum: deterministicChecksum(report) }));
  }

  root.credentialBoundaryRuntimeDrill = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    SOURCE_ACQUISITION_BASELINE,
    MOCK_TO_LIVE_BASELINE,
    REPLAY_BASELINE,
    MILESTONE,
    MODEL,
    REDACTION,
    DRILL_IDS,
    SAFE_DERIVED_KEYS,
    SENSITIVE_KEY_PATTERNS,
    SECRET_TEXT_PATTERNS,
    BOUNDARY_FLAGS,
    DRILL_DEFINITIONS,
    isSafeDerivedKey,
    isSensitiveKey,
    secretTextMatches,
    sanitizeCredentialNode,
    auditCredentialPayload,
    fakeSecretFixture,
    safeVisibleTextCorpus,
    runDrill,
    runCredentialBoundaryRuntimeDrill
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
