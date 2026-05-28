import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.5';
const STABLE_BASELINE = '1.3.0';
const CONTROL_BASELINE = '1.4.0-alpha.5';
const DRY_RUN_BASELINE = '1.4.0-alpha.4';
const MILESTONE = 'v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation';
const dependencies = [
  'src/research/provider-source-dry-run-execution-harness.js',
  'src/research/provider-source-dry-run-trace-inspector.js',
  'src/research/provider-source-execution-readiness-report.js',
  'src/research/provider-source-dry-run-replay-pack.js'
];

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);

for (const file of dependencies) {
  const source = fs.readFileSync(file, 'utf8');
  new vm.Script(source, { filename: file });
  vm.runInContext(source, ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.providerSourceDryRunReplayPack;
assert.ok(mod, 'providerSourceDryRunReplayPack must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CONTROL_BASELINE, CONTROL_BASELINE);
assert.equal(mod.DRY_RUN_BASELINE, DRY_RUN_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_source_dry_run_replay_pack.v1');

const pack = mod.buildDryRunReplayPack({ now: '2026-05-28T00:00:00.000Z' });
assert.equal(pack.dry_run_replay_pack_version, VERSION);
assert.equal(pack.stable_baseline, STABLE_BASELINE);
assert.equal(pack.control_baseline, CONTROL_BASELINE);
assert.equal(pack.dry_run_baseline, DRY_RUN_BASELINE);
assert.equal(pack.milestone, MILESTONE);
assert.equal(pack.planning_control_plane_only, true);
assert.equal(pack.replay_pack_only, true);
assert.equal(pack.deterministic_fixture_backed, true);
assert.equal(pack.live_execution_enabled, false);
assert.equal(pack.live_source_fetching_enabled, false);
assert.equal(pack.production_oauth_enabled, false);
assert.ok(pack.replay_item_count >= 6, 'replay pack must cover deterministic dry-run traces');
assert.ok(pack.replayable_count >= 2, 'mock/manual traces should be replayable for local review');
assert.ok(pack.review_required_count >= 3, 'blocked policy/preflight traces must require review');
assert.equal(pack.blocked_count, 0, 'locked dry-run fixture pack should not contain side-effect-blocked traces');
assert.equal(pack.trace_inspection_summary.available, true);
assert.equal(pack.trace_inspection_summary.side_effect_violation_count, 0);
assert.equal(pack.readiness_summary.available, true);
assert.equal(pack.readiness_summary.live_execution_ready, false);
assert.ok(pack.readiness_summary.blocker_count >= 3);
assert.equal(pack.no_live_network_attempted, true);
assert.equal(pack.no_provider_execution_performed, true);
assert.equal(pack.no_source_fetch_performed, true);
assert.equal(pack.no_credential_read_attempted, true);
assert.equal(pack.no_verification_claimed, true);
assert.equal(pack.no_automatic_signoff, true);
assert.equal(pack.no_automatic_export_lock, true);
assert.equal(pack.cryptographic_signature_claimed, false);
assert.equal(pack.automatic_source_verification_claimed, false);
assert.equal(pack.publication_permission_claimed, false);
assert.ok(pack.replay_pack_checksum.startsWith('fnv1a32:'), 'replay pack must expose deterministic non-crypto checksum');
assert.ok(pack.replay_manifest.deterministic_checksum_algorithm.includes('non_crypto'));
assert.equal(pack.replay_manifest.cryptographic_signature_claimed, false);
assert.ok(pack.boundary_statement.includes('review-only'));

for (const [key, value] of Object.entries(pack.boundary_flags)) {
  if (key === 'replay_pack_only' || key === 'deterministic_fixture_backed') {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `boundary flag ${key} must remain false`);
  }
}

const replayable = pack.replay_items.filter(item => item.replay_state === mod.REPLAY_ITEM_STATES.REPLAYABLE);
const review = pack.replay_items.filter(item => item.replay_state === mod.REPLAY_ITEM_STATES.REVIEW_REQUIRED);
assert.equal(replayable.every(item => item.replay_allowed === true && item.operator_review_required === false), true);
assert.equal(review.every(item => item.replay_allowed === false && item.operator_review_required === true), true);
assert.equal(pack.replay_items.every(item => typeof item.replay_checksum === 'string' && item.replay_checksum.startsWith('fnv1a32:')), true);

const unsafe = mod.buildReplayItem({ scenario_id: 'unsafe', surface: 'provider', requested_mode: 'live_provider_execution' }, {
  trace_id: 'unsafe',
  level: 'blocking',
  side_effect_violation_count: 1,
  failure_contract_id: 'credential_boundary_violation'
}, 0);
assert.equal(unsafe.replay_state, mod.REPLAY_ITEM_STATES.BLOCKED);
assert.equal(unsafe.replay_allowed, false);
assert.equal(unsafe.operator_review_required, true);

console.log('Provider/source dry-run replay pack checks passed.');
process.exit(0);
