import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.8';
const STABLE_BASELINE = '1.3.0';
const SOURCE_ACQUISITION_BASELINE = '1.4.0-alpha.7';
const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
const REPLAY_BASELINE = '1.4.0-alpha.5';
const MILESTONE = 'v1.4.0-alpha.8 — Credential Boundary Runtime Drill';

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('src/research/credential-boundary-runtime-drill.js', 'utf8'), ctx, { filename: 'src/research/credential-boundary-runtime-drill.js' });

const mod = ctx.window.Jarbou3iResearchModules.credentialBoundaryRuntimeDrill;
assert.ok(mod, 'credentialBoundaryRuntimeDrill must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.SOURCE_ACQUISITION_BASELINE, SOURCE_ACQUISITION_BASELINE);
assert.equal(mod.MOCK_TO_LIVE_BASELINE, MOCK_TO_LIVE_BASELINE);
assert.equal(mod.REPLAY_BASELINE, REPLAY_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'credential_boundary_runtime_drill.v1');

assert.deepEqual(Array.from(mod.DRILL_IDS), [
  'fake_secret_injection',
  'export_leak_drill',
  'log_leak_drill',
  'browser_visible_text_leak_drill',
  'fixture_leak_drill',
  'provider_payload_secret_boundary_drill',
  'release_bundle_secret_boundary_drill'
]);

assert.equal(mod.isSensitiveKey('api_key'), true);
assert.equal(mod.isSensitiveKey('access_token'), true);
assert.equal(mod.isSensitiveKey('raw_token'), true);
assert.equal(mod.isSensitiveKey('token_hash'), false);
assert.equal(mod.isSensitiveKey('credential_fingerprint'), false);
assert.equal(mod.isSensitiveKey('key_exported'), false);
assert.ok(mod.secretTextMatches('Bearer FAKEBOUNDARYTOKEN1234567890').includes('bearer_token_text'));
assert.ok(mod.secretTextMatches('api_key="FAKE_KEY_VALUE_1234567890"').includes('api_key_assignment'));

const fixture = mod.fakeSecretFixture();
const audit = mod.auditCredentialPayload(fixture);
assert.equal(audit.credential_boundary_report.safe, false);
assert.ok(audit.credential_boundary_report.finding_count >= 5);
assert.equal(audit.credential_boundary_report.raw_token_exported, false);
assert.equal(audit.credential_boundary_report.access_token_exported, false);
assert.equal(audit.credential_boundary_report.refresh_token_exported, false);
assert.equal(audit.credential_boundary_report.key_exported, false);
assert.equal(audit.credential_boundary_report.secret_exported, false);
assert.equal(audit.credential_boundary_report.credential_exported, false);
assert.equal(audit.sanitized_payload.provider_config.api_key, mod.REDACTION);
assert.equal(audit.sanitized_payload.portable_account.token_hash, 'hash_fake_only_12345678');
assert.equal(audit.sanitized_payload.portable_account.raw_token, mod.REDACTION);
assert.equal(audit.sanitized_payload.provider_payload.credential_fingerprint, 'fp_fake_only_1234');
assert.equal(audit.sanitized_payload.provider_payload.access_token, mod.REDACTION);
assert.equal(JSON.stringify(audit.sanitized_payload).includes('FAKEBOUNDARYTOKEN'), false);
assert.equal(JSON.stringify(audit.sanitized_payload).includes('sk-FAKEBOUNDARYDRILL'), false);

for (const drillId of mod.DRILL_IDS) {
  const drill = mod.runDrill(drillId, { now: '2026-05-28T00:00:00.000Z' });
  assert.equal(drill.credential_boundary_runtime_drill_version, VERSION);
  assert.equal(drill.drill_id, drillId);
  assert.equal(drill.allowed_real_credentials, false);
  assert.equal(drill.fake_secret_drill_only, true);
  assert.equal(drill.sanitized_output_contains_secret_like_text, false, `${drillId} sanitized output must not contain secret-like text`);
  assert.equal(drill.raw_token_exported, false);
  assert.equal(drill.access_token_exported, false);
  assert.equal(drill.refresh_token_exported, false);
  assert.equal(drill.key_exported, false);
  assert.equal(drill.secret_exported, false);
  assert.equal(drill.credential_exported, false);
  assert.equal(drill.pass, true, `${drillId} must pass`);
  assert.ok(drill.drill_checksum.startsWith('fnv1a32:'));
}

const report = mod.runCredentialBoundaryRuntimeDrill({ now: '2026-05-28T00:00:00.000Z' });
assert.equal(report.credential_boundary_runtime_drill_version, VERSION);
assert.equal(report.stable_baseline, STABLE_BASELINE);
assert.equal(report.source_acquisition_baseline, SOURCE_ACQUISITION_BASELINE);
assert.equal(report.mock_to_live_baseline, MOCK_TO_LIVE_BASELINE);
assert.equal(report.replay_baseline, REPLAY_BASELINE);
assert.equal(report.milestone, MILESTONE);
assert.equal(report.ok, true);
assert.equal(report.release_gate, 'credential_boundary_runtime_drill_ready');
assert.equal(report.drill_count, 7);
assert.equal(report.issue_count, 0);
assert.equal(report.real_oauth_enabled, false);
assert.equal(report.real_api_keys_used, false);
assert.equal(report.real_token_storage_enabled, false);
assert.equal(report.live_provider_execution_enabled, false);
assert.equal(report.live_source_fetching_enabled, false);
assert.equal(report.backend_storage_expanded, false);
assert.equal(report.safe_metadata_only, true);
assert.ok(report.boundary_statement.includes('deterministic fake-secret vectors'));
assert.ok(report.drill_report_checksum.startsWith('fnv1a32:'));

for (const [key, value] of Object.entries(report.boundary_flags)) {
  if (['fake_secret_drill_only','redaction_required','export_leak_blocked','log_leak_blocked','browser_visible_text_leak_blocked','fixture_leak_blocked','release_bundle_leak_blocked'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}

const index = fs.readFileSync('index.html', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.ok(index.includes('src="src/research/credential-boundary-runtime-drill.js" defer'), 'index must load credential boundary runtime drill module');
assert.ok(index.includes('Credential Boundary Runtime Drill'), 'index must expose alpha.8 credential boundary label');
for (const gate of ['no-browser', 'current-no-browser', 'privacy', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes('tests/credential-boundary-runtime-drill-check.mjs'), `${gate} must run credential boundary runtime drill check`);
}
assert.ok(registry.syntax_matrix.files.includes('src/research/credential-boundary-runtime-drill.js'));
assert.ok(registry.syntax_matrix.files.includes('tests/credential-boundary-runtime-drill-check.mjs'));

console.log('Credential boundary runtime drill checks passed.');
process.exit(0);
