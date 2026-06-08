import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CURRENT_RELEASE, CURRENT_RUNTIME_SCOPE, CURRENT_VERSION } from './current-release-identity.mjs';

const SCRIPT = 'scripts/hosted-evidence-performance-trend-diff.mjs';
const CHECK = 'tests/hosted-evidence-performance-trend-diff-check.mjs';

for (const [file, tokens] of [
  [SCRIPT, [
    'HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT',
    'hosted-evidence-performance-trend-diff.json',
    'hosted-evidence-performance-trend-diff.md',
    'buildHostedEvidencePerformanceTrendDiff',
    'renderHostedEvidencePerformanceTrendDiffMarkdown',
    'writeHostedEvidencePerformanceTrendDiff',
    'regressed_phases',
    'phase_diffs'
  ]]
]) {
  const source = fs.readFileSync(file, 'utf8');
  for (const token of tokens) assert.ok(source.includes(token), `${file} must include trend diff token: ${token}`);
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function ledger({ version, release, total, evidenceMatrix, targeted = 18000 }) {
  return {
    hosted_evidence_performance_trend_ledger_version: 1,
    release,
    version,
    current_entry: {
      version,
      release,
      run_id: `${version}-run`,
      commit_sha: `${version}-sha`,
      ref_name: 'main',
      total_duration_ms: total,
      total_capture_budget_ms: 360000,
      total_within_budget: total <= 360000,
      phase_count: 3,
      all_phases_within_budget: true,
      phase_records: [
        { phase: 'page-ready', duration_ms: 1000, budget_ms: 20000, within_budget: true, budget_utilization: 0.05 },
        { phase: 'evidence-matrix', duration_ms: evidenceMatrix, budget_ms: 180000, within_budget: true, budget_utilization: Number((evidenceMatrix / 180000).toFixed(4)) },
        { phase: 'targeted-region-capture', duration_ms: targeted, budget_ms: 180000, within_budget: true, budget_utilization: Number((targeted / 180000).toFixed(4)) }
      ]
    }
  };
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jarbou3i-hosted-trend-diff-'));
const previousFile = path.join(tempRoot, 'previous.json');
const stableCurrentFile = path.join(tempRoot, 'current-stable.json');
const improvedCurrentFile = path.join(tempRoot, 'current-improved.json');
const regressedCurrentFile = path.join(tempRoot, 'current-regressed.json');
const outputDir = path.join(tempRoot, 'trend-diff-output');

writeJson(previousFile, ledger({ version: '1.4.0-alpha.59', release: 'v1.4.0-alpha.59 — Evidence Capture Performance Trend Ledger', total: 120000, evidenceMatrix: 100000 }));
writeJson(stableCurrentFile, ledger({ version: CURRENT_VERSION, release: CURRENT_RELEASE, total: 123000, evidenceMatrix: 102000 }));
writeJson(improvedCurrentFile, ledger({ version: CURRENT_VERSION, release: CURRENT_RELEASE, total: 100000, evidenceMatrix: 78000 }));
writeJson(regressedCurrentFile, ledger({ version: CURRENT_VERSION, release: CURRENT_RELEASE, total: 150000, evidenceMatrix: 132000 }));

const stable = spawnSync(process.execPath, [SCRIPT, '--current-ledger', stableCurrentFile, '--previous-ledger', previousFile, '--output-dir', outputDir], { encoding: 'utf8' });
assert.equal(stable.status, 0, `${SCRIPT} stable comparison must exit cleanly: ${stable.stderr || stable.stdout}`);
assert.ok(stable.stdout.includes('Hosted evidence performance trend diff written'), 'script must announce trend diff output');
assert.ok(stable.stdout.includes('Regression guard: stable'), 'stable comparison must report stable guard');
const stableJson = path.join(outputDir, 'hosted-evidence-performance-trend-diff.json');
const stableMd = path.join(outputDir, 'hosted-evidence-performance-trend-diff.md');
assert.ok(fs.existsSync(stableJson), 'trend diff JSON must be written');
assert.ok(fs.existsSync(stableMd), 'trend diff Markdown must be written');
const stableDiff = JSON.parse(fs.readFileSync(stableJson, 'utf8'));
assert.equal(stableDiff.hosted_evidence_performance_trend_diff_version, 1, 'trend diff contract version must be stable');
assert.equal(stableDiff.current.version, CURRENT_VERSION, 'trend diff current version must match current release');
assert.equal(stableDiff.previous.version, '1.4.0-alpha.59', 'trend diff previous version must be retained');
assert.equal(stableDiff.total_duration_diff.status, 'stable', 'stable fixture total status must be stable');
assert.equal(stableDiff.regression_guard.passed, true, 'stable fixture must pass guard');
assert.equal(stableDiff.phase_diffs.find((record) => record.phase === 'evidence-matrix').status, 'stable', 'stable phase must stay stable');

const stableMarkdown = fs.readFileSync(stableMd, 'utf8');
for (const token of [
  `# Hosted Evidence Performance Trend Diff — ${CURRENT_RELEASE}`,
  '## Phase trend diff',
  'Regression guard: `stable`',
  '| evidence-matrix | 100000 | 102000 | 2000 | 2 | stable |'
]) {
  assert.ok(stableMarkdown.includes(token), `trend diff Markdown must include token: ${token}`);
}

const improved = spawnSync(process.execPath, [SCRIPT, '--current-ledger', improvedCurrentFile, '--previous-ledger', previousFile, '--output-dir', path.join(tempRoot, 'improved')], { encoding: 'utf8' });
assert.equal(improved.status, 0, 'improved comparison must remain passable');
assert.ok(improved.stdout.includes('Regression guard: improved'), 'improved comparison must report improved guard');

const regressed = spawnSync(process.execPath, [SCRIPT, '--current-ledger', regressedCurrentFile, '--previous-ledger', previousFile, '--output-dir', path.join(tempRoot, 'regressed')], { encoding: 'utf8' });
assert.equal(regressed.status, 2, 'regressed comparison must exit with regression status code 2');
assert.ok(regressed.stdout.includes('Regression guard: regressed'), 'regressed comparison must report regressed guard');
assert.ok(regressed.stdout.includes('Regressed phases: evidence-matrix'), 'regressed comparison must identify regressed phase');

const jsonOutput = spawnSync(process.execPath, [SCRIPT, '--current-ledger', stableCurrentFile, '--previous-ledger', previousFile, '--output-dir', path.join(tempRoot, 'json'), '--json'], { encoding: 'utf8' });
assert.equal(jsonOutput.status, 0, 'JSON output comparison must exit cleanly');
const parsedJsonOutput = JSON.parse(jsonOutput.stdout);
assert.equal(parsedJsonOutput.regression_guard.status, 'stable', 'JSON output must expose regression guard status');

const missingPrevious = spawnSync(process.execPath, [SCRIPT, '--current-ledger', stableCurrentFile, '--previous-ledger', path.join(tempRoot, 'missing.json')], { encoding: 'utf8' });
assert.equal(missingPrevious.status, 1, 'missing previous ledger must fail deterministically');
assert.ok(missingPrevious.stderr.includes('missing ledger file'), 'missing ledger failure must explain missing ledger file');

const contract = JSON.parse(fs.readFileSync('tests/current-release-contract.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.equal(contract.version, CURRENT_VERSION);
assert.equal(contract.runtime_scope, CURRENT_RUNTIME_SCOPE);
assert.ok(contract.required_tests.includes(SCRIPT), 'current release contract must require trend diff script');
assert.ok(contract.required_tests.includes(CHECK), 'current release contract must require trend diff check');
assert.ok(contract.expected_changed_files.includes(SCRIPT), 'expected changed files must include trend diff script');
assert.ok(contract.expected_changed_files.includes(CHECK), 'expected changed files must include trend diff check');
assert.ok(contract.lock_assertions.some((assertion) => assertion.includes('trend diff')), 'lock assertions must mention trend diff');

for (const gate of ['no-browser', 'current-no-browser', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} gate must run trend diff check before browser evidence`);
}
assert.ok(registry.syntax_matrix.files.includes(SCRIPT), 'syntax matrix must cover trend diff script');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover trend diff check');
assert.equal(registry.evidence_performance_trend_diff_guard.version, CURRENT_VERSION);
assert.equal(registry.evidence_performance_trend_diff_guard.previous_ledger_required, true);
assert.equal(registry.evidence_performance_trend_diff_guard.regressed_timing_exit_code, 2);
assert.equal(registry.evidence_performance_trend_diff_guard.runtime_capability_change, false);

fs.rmSync(tempRoot, { recursive: true, force: true });
console.log(`Hosted evidence performance trend diff checks passed for ${CURRENT_RELEASE}.`);
