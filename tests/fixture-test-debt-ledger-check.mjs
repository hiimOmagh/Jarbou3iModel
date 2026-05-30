import assert from 'node:assert/strict';
import fs from 'node:fs';
import { migrationRegistry, privacyRegistry } from './fixture-registry-loader.mjs';

const CURRENT_VERSION = '1.4.0-alpha.26';
const CURRENT_TITLE = 'Adapter Replay Insight UX + Operator Decision Surface';
const VERSION = '1.3.0';
const TITLE = 'Stable Manual Workflow Release';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const ci = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const ledger = fs.readFileSync('docs/technical-debt-ledger.md', 'utf8');

assert.equal(pkg.version, CURRENT_VERSION);
assert.ok(pkg.description.includes('fixture/test debt ledger'));
assert.ok(pkg.description.includes('professional trilingual language-description review'));
assert.ok(ledger.includes(`# Fixture/Test Debt Ledger`));
assert.ok(ledger.includes(`v${VERSION} — ${TITLE}`));
for (const id of ['FTD-001', 'FTD-002', 'FTD-003', 'FTD-004', 'FTD-005']) {
  assert.ok(ledger.includes(id), `debt ledger missing ${id}`);
}
for (const boundary of [
  'no runtime behavior change',
  'provider expansion',
  'OAuth enablement',
  'backend changes',
  'source connector changes',
  'storage changes',
  'fixture semantic thinning'
]) {
  assert.ok(ledger.includes(boundary), `debt ledger missing boundary: ${boundary}`);
}
assert.equal(migrationRegistry.registry_version, VERSION);
assert.equal(privacyRegistry.registry_version, VERSION);
assert.equal(migrationRegistry.payload_compression.semantic_thinning, false);
assert.equal(privacyRegistry.payload_compression.semantic_thinning, false);
assert.ok(migrationRegistry.entries.length >= 58, 'migration fixture registry coverage must not shrink');
assert.ok(privacyRegistry.entries.length >= 48, 'privacy fixture registry coverage must not shrink');
for (const check of ['tests/fixture-test-debt-ledger-check.mjs', 'tests/source-refactor-readiness-audit-check.mjs', 'tests/language-description-audit-check.mjs']) {
  assert.ok(ci.gates['no-browser'].node_checks.includes(check), `${check} must run in full no-browser gate`);
  assert.ok(ci.gates['current-no-browser'].node_checks.includes(check), `${check} must run in current gate`);
  assert.ok(ci.syntax_matrix.files.includes(check), `${check} must be syntax-matrix covered`);
}

console.log('Fixture/test debt ledger checks passed.');
process.exit(0);
