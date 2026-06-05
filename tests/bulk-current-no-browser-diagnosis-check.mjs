import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { CURRENT_RELEASE } from './current-release-identity.mjs';

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const currentGate = registry.gates?.['current-no-browser'];
assert.ok(currentGate, 'current-no-browser gate must exist in CI gate registry');
assert.ok(Array.isArray(currentGate.node_checks), 'current-no-browser gate must expose node checks');
assert.ok(currentGate.node_checks.length > 0, 'current-no-browser gate must not be empty');

const selfFile = 'tests/bulk-current-no-browser-diagnosis-check.mjs';
const checksToRun = currentGate.node_checks.filter((file) => file !== selfFile);

const FAILURE_FAMILIES = Object.freeze({
  current_release_identity_drift: ['current-release', 'release identity', 'version mismatch', 'public label', 'runtime scope'],
  runtime_optimization_lineage_mismatch: ['runtime optimization', 'optimization_scope', 'current_candidate'],
  localized_public_labels_visible_copy_mismatch: ['localized', 'locale', 'visible-text', 'publicVersionLabels', 'html_lang'],
  release_corpus_continuity_issue: ['release-history', 'corpus', 'timeline', 'ledger'],
  module_extraction_stale_test_surface_assumption: ['module boundary', 'research-engine.js', 'script order', 'extracted module'],
  repo_hygiene_package_artifact_pollution: ['hygiene', 'patch package', 'PACKAGE-MANIFEST', '_patch-', '.zip', 'playwright-report', 'test-results'],
  real_runtime_product_regression: ['runtime', 'provider', 'backend', 'source', 'storage', 'OAuth']
});

function classifyFailure(output) {
  const normalized = output.toLowerCase();
  for (const [family, tokens] of Object.entries(FAILURE_FAMILIES)) {
    if (tokens.some((token) => normalized.includes(token.toLowerCase()))) return family;
  }
  return 'unclassified_failure';
}

function runCheck(file) {
  const started = Date.now();
  const result = spawnSync(process.execPath, [file], {
    encoding: 'utf8',
    timeout: Number.parseInt(process.env.BULK_CURRENT_DIAGNOSIS_TIMEOUT_MS || '60000', 10)
  });
  const output = `${result.stdout || ''}\n${result.stderr || ''}`.trim();
  return {
    file,
    status: result.status,
    signal: result.signal,
    duration_ms: Date.now() - started,
    family: result.status === 0 ? null : classifyFailure(output),
    output
  };
}

const expectedStaticTokens = [
  'current_release_identity_drift',
  'runtime_optimization_lineage_mismatch',
  'localized_public_labels_visible_copy_mismatch',
  'release_corpus_continuity_issue',
  'module_extraction_stale_test_surface_assumption',
  'repo_hygiene_package_artifact_pollution',
  'real_runtime_product_regression',
  'unclassified_failure'
];
const source = fs.readFileSync(selfFile, 'utf8');
for (const token of expectedStaticTokens) assert.ok(source.includes(token), `bulk diagnosis source must encode family: ${token}`);
assert.ok(source.includes('RUN_BULK_CURRENT_DIAGNOSIS'), 'bulk diagnosis must be opt-in for full execution');
assert.ok(source.includes('spawnSync(process.execPath, [file]'), 'bulk diagnosis must execute checks independently, not via stop-on-first-failure gate runner');

if (process.argv.includes('--list')) {
  console.log(JSON.stringify({ release: CURRENT_RELEASE, check_count: checksToRun.length, checks: checksToRun }, null, 2));
  process.exit(0);
}

if (process.env.RUN_BULK_CURRENT_DIAGNOSIS !== '1') {
  console.log(`Bulk current no-browser diagnosis check passed in static mode: ${checksToRun.length} checks available for ${CURRENT_RELEASE}.`);
  process.exit(0);
}

const results = checksToRun.map(runCheck);
const failures = results.filter((result) => result.status !== 0);
const report = {
  release: CURRENT_RELEASE,
  total_checks: results.length,
  passed_checks: results.length - failures.length,
  failed_checks: failures.length,
  failures: failures.map((failure) => ({
    file: failure.file,
    status: failure.status,
    signal: failure.signal,
    duration_ms: failure.duration_ms,
    family: failure.family,
    output_tail: failure.output.split(/\r?\n/).slice(-20)
  }))
};

console.log(JSON.stringify(report, null, 2));
assert.equal(failures.length, 0, 'bulk current no-browser diagnosis found failing checks');
