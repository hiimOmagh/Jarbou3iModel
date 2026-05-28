import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.7';
const STABLE_BASELINE = '1.3.0';
const CONTROL_BASELINE = '1.4.0-alpha.7';
const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
const REPLAY_BASELINE = '1.4.0-alpha.5';
const MILESTONE = 'v1.4.0-alpha.7 — Source Acquisition Control Surface';

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('src/research/source-acquisition-control-surface.js', 'utf8'), ctx, { filename: 'src/research/source-acquisition-control-surface.js' });

const mod = ctx.window.Jarbou3iResearchModules.sourceAcquisitionControlSurface;
assert.ok(mod, 'sourceAcquisitionControlSurface must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CONTROL_BASELINE, CONTROL_BASELINE);
assert.equal(mod.MOCK_TO_LIVE_BASELINE, MOCK_TO_LIVE_BASELINE);
assert.equal(mod.REPLAY_BASELINE, REPLAY_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'source_acquisition_control_surface.v1');

const requiredModes = [
  'manual_source',
  'imported_evidence',
  'fixture_source',
  'provider_proposed_source',
  'blocked_source',
  'future_controlled_fetch'
];
assert.deepEqual(Object.values(mod.ACQUISITION_MODES), requiredModes);

const audit = mod.auditSourceAcquisitionControlSurface({ now: '2026-05-28T00:00:00.000Z' });
assert.equal(audit.source_acquisition_control_surface_version, VERSION);
assert.equal(audit.stable_baseline, STABLE_BASELINE);
assert.equal(audit.control_baseline, CONTROL_BASELINE);
assert.equal(audit.mock_to_live_baseline, MOCK_TO_LIVE_BASELINE);
assert.equal(audit.replay_baseline, REPLAY_BASELINE);
assert.equal(audit.milestone, MILESTONE);
assert.equal(audit.ok, true);
assert.equal(audit.release_gate, 'source_acquisition_control_surface_ready');
assert.equal(audit.mode_count, 6);
assert.equal(audit.live_source_fetching_enabled, false);
assert.equal(audit.uncontrolled_scraping_enabled, false);
assert.equal(audit.hidden_background_fetching_enabled, false);
assert.equal(audit.production_oauth_enabled, false);
assert.equal(audit.automatic_source_verification_claimed, false);
assert.equal(audit.provider_suggested_sources_auto_accepted, false);
assert.equal(audit.review_queue_required, true);
assert.equal(audit.source_gap_warnings_enabled, true);
assert.equal(audit.source_to_claim_linkage_preserved, true);
assert.ok(audit.control_surface_checksum.startsWith('fnv1a32:'));
assert.ok(audit.boundary_statement.includes('never fetch, scrape, verify, auto-accept'));

for (const [key, value] of Object.entries(audit.boundary_flags)) {
  if (['source_acquisition_control_surface_only', 'review_queue_required', 'deterministic_fixture_backed'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}

for (const row of audit.rows) {
  assert.ok(requiredModes.includes(row.mode), `unexpected mode ${row.mode}`);
  assert.equal(row.live_fetch_allowed, false, `${row.mode} must not allow live fetch`);
  assert.equal(row.hidden_background_fetch_allowed, false, `${row.mode} must not allow hidden background fetch`);
  assert.equal(row.automatic_verification_allowed, false, `${row.mode} must not allow automatic verification`);
  assert.equal(row.auto_accept_allowed, false, `${row.mode} must not auto-accept`);
  assert.equal(row.no_live_fetch, true, `${row.mode} must preserve no-live-fetch flag`);
  assert.equal(row.no_hidden_background_fetch, true, `${row.mode} must preserve no-hidden-fetch flag`);
  assert.equal(row.no_auto_verification, true, `${row.mode} must preserve no-auto-verification flag`);
  assert.equal(row.no_auto_accept, true, `${row.mode} must preserve no-auto-accept flag`);
  assert.ok(row.row_checksum.startsWith('fnv1a32:'));
}

const providerProposal = mod.normalizeSourceAcquisitionCandidate({
  evidence_id: 'P1',
  provider_proposed: true,
  claim: 'Provider suggested a possible source but did not fetch it.',
  supports: []
});
assert.equal(providerProposal.mode, 'provider_proposed_source');
assert.equal(providerProposal.provenance_state, 'provider_suggested_unfetched');
assert.equal(providerProposal.queue_destination, 'evidence_review_queue');
assert.equal(providerProposal.review_queue_required, true);
assert.equal(providerProposal.provider_proposal, true);
assert.equal(providerProposal.live_fetch_allowed, false);
assert.equal(providerProposal.source_fetching_performed, false);
assert.equal(providerProposal.automatic_source_verification_claimed, false);
assert.equal(providerProposal.auto_accepted, false);
assert.equal(providerProposal.export_allowed_after_review, false);
assert.ok(providerProposal.source_gap_warnings.includes('provider_proposal_requires_operator_review_before_use'));
assert.ok(providerProposal.source_gap_warnings.includes('missing_source_to_claim_linkage'));

const blocked = mod.normalizeSourceAcquisitionCandidate({ id: 'B1', blocked: true, claim: 'Blocked item' });
assert.equal(blocked.mode, 'blocked_source');
assert.equal(blocked.review_state, 'blocked_by_policy');
assert.equal(blocked.queue_destination, 'blocked_sources');
assert.equal(blocked.review_queue_required, false);
assert.equal(blocked.export_allowed_after_review, false);
assert.ok(blocked.source_gap_warnings.includes('blocked_source_cannot_enter_synthesis'));

const futureFetch = mod.normalizeSourceAcquisitionCandidate({ id: 'F1', requested_live_fetch: true, claim: 'Future fetch candidate', supports: ['C1'] });
assert.equal(futureFetch.mode, 'future_controlled_fetch');
assert.equal(futureFetch.review_state, 'future_gate_required');
assert.equal(futureFetch.live_fetch_allowed, false);
assert.equal(futureFetch.hidden_background_fetching_performed, false);
assert.ok(futureFetch.source_gap_warnings.includes('future_controlled_fetch_disabled_until_later_gate'));

const manual = mod.normalizeSourceAcquisitionCandidate({ id: 'M1', claim: 'Manual note from operator', supports: ['C2'] });
assert.equal(manual.mode, 'manual_source');
assert.equal(manual.provenance_state, 'user_supplied');
assert.equal(manual.queue_destination, 'evidence_review_queue');
assert.equal(manual.export_allowed_after_review, true);

const surface = mod.buildSourceAcquisitionControlSurface({
  now: '2026-05-28T00:00:00.000Z',
  candidates: [providerProposal, blocked, futureFetch, manual]
});
assert.equal(surface.source_acquisition_control_surface_version, VERSION);
assert.equal(surface.milestone, MILESTONE);
assert.equal(surface.live_fetching_performed, false);
assert.equal(surface.source_fetching_performed, false);
assert.equal(surface.uncontrolled_scraping_performed, false);
assert.equal(surface.automatic_source_verification_claimed, false);
assert.equal(surface.provider_suggested_sources_auto_accepted, false);
assert.equal(surface.publication_permission_claimed, false);
assert.equal(surface.summary.candidate_count, 4);
assert.equal(surface.summary.queued_for_review_count, 3);
assert.equal(surface.summary.blocked_count, 1);
assert.equal(surface.summary.provider_proposal_count, 1);
assert.ok(surface.summary.source_gap_warning_count >= 3);
assert.ok(surface.surface_checksum.startsWith('fnv1a32:'));

const index = fs.readFileSync('index.html', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.ok(index.includes('src="src/research/source-acquisition-control-surface.js" defer'), 'index must load source acquisition control surface module');
for (const gate of ['no-browser', 'current-no-browser', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes('tests/source-acquisition-control-surface-check.mjs'), `${gate} must run source acquisition control surface check`);
}
assert.ok(registry.syntax_matrix.files.includes('src/research/source-acquisition-control-surface.js'));
assert.ok(registry.syntax_matrix.files.includes('tests/source-acquisition-control-surface-check.mjs'));

console.log('Source acquisition control surface checks passed.');
process.exit(0);
