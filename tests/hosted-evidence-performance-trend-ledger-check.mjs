import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CURRENT_RELEASE, CURRENT_RUNTIME_SCOPE, CURRENT_VERSION } from './current-release-identity.mjs';

const SCRIPT = 'scripts/hosted-evidence-performance-trend-ledger.mjs';
const BUILDER = 'scripts/build-lock-evidence-bundle.mjs';
const CHECK = 'tests/hosted-evidence-performance-trend-ledger-check.mjs';

for (const [file, tokens] of [
  [SCRIPT, [
    'HOSTED_EVIDENCE_PERFORMANCE_TREND_LEDGER_CONTRACT',
    'hosted-evidence-performance-trend-ledger.json',
    'hosted-evidence-performance-trend-ledger.md',
    'buildHostedEvidencePerformanceTrendLedger',
    'renderHostedEvidencePerformanceTrendLedgerMarkdown',
    'writeHostedEvidencePerformanceTrendLedger',
    'slowest_phase'
  ]],
  [BUILDER, [
    'hosted-evidence-performance-trend-ledger.mjs',
    'writeHostedEvidencePerformanceTrendLedger',
    'performance-trends'
  ]]
]) {
  const source = fs.readFileSync(file, 'utf8');
  for (const token of tokens) assert.ok(source.includes(token), `${file} must include performance trend ledger token: ${token}`);
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jarbou3i-hosted-trend-ledger-'));
const bundleDir = path.join(tempRoot, `lock-evidence-bundle_${CURRENT_VERSION}_fixture`);
const outputDir = path.join(tempRoot, 'performance-trends');

writeJson(path.join(bundleDir, 'evidence-manifest.json'), {
  version: CURRENT_VERSION,
  release: CURRENT_RELEASE,
  public_version_label: `v${CURRENT_VERSION} Evidence Performance Policy Enforcement Wiring`,
  run_id: 'fixture-run',
  run_attempt: '1',
  commit_sha: 'fixture-sha',
  branch: 'fixture-branch'
});
writeJson(path.join(bundleDir, 'hosted-demo-evidence', 'hosted-demo-metadata.json'), {
  evidence_review_version: CURRENT_VERSION,
  capture_polish_version: CURRENT_VERSION,
  public_version_label: `v${CURRENT_VERSION} Evidence Performance Policy Enforcement Wiring`,
  generated_at: '2026-06-07T00:00:00.000Z',
  timing_budget_guard: {
    guard: 'hosted_evidence_capture_timeout_budget_guard',
    total_duration_ms: 120000,
    total_capture_budget_ms: 360000,
    total_within_budget: true,
    all_phases_within_budget: true,
    phase_records: [
      { phase: 'page-ready', duration_ms: 1000, budget_ms: 20000, within_budget: true },
      { phase: 'evidence-matrix', duration_ms: 100000, budget_ms: 180000, within_budget: true },
      { phase: 'targeted-region-capture', duration_ms: 19000, budget_ms: 180000, within_budget: true }
    ]
  }
});

const result = spawnSync(process.execPath, [SCRIPT, '--bundle-dir', bundleDir, '--output-dir', outputDir], { encoding: 'utf8' });
assert.equal(result.status, 0, `${SCRIPT} must exit cleanly: ${result.stderr || result.stdout}`);
assert.ok(result.stdout.includes('Hosted evidence trend diff ledger written'), 'script must announce trend ledger output');
assert.ok(result.stdout.includes('Slowest phase: evidence-matrix'), 'script must announce slowest phase');
assert.ok(result.stdout.includes('Regression guard: passed'), 'script must announce regression guard status');

const jsonPath = path.join(outputDir, 'hosted-evidence-performance-trend-ledger.json');
const markdownPath = path.join(outputDir, 'hosted-evidence-performance-trend-ledger.md');
assert.ok(fs.existsSync(jsonPath), 'trend ledger JSON must be written');
assert.ok(fs.existsSync(markdownPath), 'trend ledger Markdown must be written');
const ledger = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
assert.equal(ledger.hosted_evidence_performance_trend_ledger_version, 1, 'trend ledger contract version must be stable');
assert.equal(ledger.version, CURRENT_VERSION, 'ledger version must match current release');
assert.equal(ledger.release, CURRENT_RELEASE, 'ledger release must match current release');
assert.equal(ledger.current_entry.run_id, 'fixture-run', 'ledger current entry must expose run id');
assert.equal(ledger.current_entry.total_duration_ms, 120000, 'ledger must expose total duration');
assert.equal(ledger.current_entry.total_capture_budget_ms, 360000, 'ledger must expose total budget');
assert.equal(ledger.current_entry.total_within_budget, true, 'ledger must expose total budget pass');
assert.equal(ledger.current_entry.phase_count, 3, 'ledger must expose phase count');
assert.equal(ledger.current_entry.slowest_phase.phase, 'evidence-matrix', 'ledger must identify slowest phase');
assert.equal(ledger.current_entry.slowest_phase.budget_utilization, 0.5556, 'ledger must compute slowest phase budget utilization');
assert.deepEqual(ledger.current_entry.over_budget_phases, [], 'fixture must not report over-budget phases');
assert.equal(ledger.regression_guard.status, 'passed', 'ledger regression guard must pass for in-budget fixture');
assert.equal(ledger.trend_window.length, 1, 'ledger must include one current trend entry');

const markdown = fs.readFileSync(markdownPath, 'utf8');
for (const token of [
  `# Hosted Evidence Performance Trend Ledger — ${CURRENT_RELEASE}`,
  '## Current entry',
  '## Phase records',
  'Regression guard: `passed`',
  'Slowest phase: `evidence-matrix`',
  '| evidence-matrix | 100000 | 180000 | true | 0.5556 |'
]) {
  assert.ok(markdown.includes(token), `trend ledger Markdown must include token: ${token}`);
}

const missingTimingDir = path.join(tempRoot, 'missing-timing-bundle');
writeJson(path.join(missingTimingDir, 'hosted-demo-evidence', 'hosted-demo-metadata.json'), {
  evidence_review_version: CURRENT_VERSION
});
const missingTiming = spawnSync(process.execPath, [SCRIPT, '--bundle-dir', missingTimingDir, '--output-dir', path.join(tempRoot, 'missing-output')], { encoding: 'utf8' });
assert.notEqual(missingTiming.status, 0, 'missing timing metadata must fail deterministically');
assert.ok(missingTiming.stderr.includes('timing_budget_guard.phase_records'), 'missing timing failure must explain missing phase records');

const contract = JSON.parse(fs.readFileSync('tests/current-release-contract.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.equal(contract.version, CURRENT_VERSION);
assert.equal(contract.runtime_scope, CURRENT_RUNTIME_SCOPE);
assert.ok(contract.required_tests.includes(SCRIPT), 'current release contract must require trend ledger script');
assert.ok(contract.required_tests.includes(CHECK), 'current release contract must require trend ledger check');
assert.ok(contract.expected_changed_files.includes(SCRIPT), 'expected changed files must include trend ledger script');
assert.ok(contract.lock_assertions.some((assertion) => assertion.includes('threshold policy')), 'lock assertions must mention threshold policy');

for (const gate of ['no-browser', 'current-no-browser', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} gate must run trend ledger check before browser evidence`);
}
assert.ok(registry.syntax_matrix.files.includes(SCRIPT), 'syntax matrix must cover trend ledger script');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover trend ledger check');
assert.equal(registry.hosted_evidence_performance_policy_enforcement_wiring.version, CURRENT_VERSION);
assert.equal(registry.hosted_evidence_performance_policy_enforcement_wiring.ledger_json_required, true);
assert.equal(registry.hosted_evidence_performance_policy_enforcement_wiring.slowest_phase_required, true);

fs.rmSync(tempRoot, { recursive: true, force: true });
console.log(`Hosted evidence trend ledger checks passed for ${CURRENT_RELEASE}.`);
