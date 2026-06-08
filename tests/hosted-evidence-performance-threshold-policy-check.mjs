import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CURRENT_RELEASE, CURRENT_RUNTIME_SCOPE, CURRENT_VERSION } from './current-release-identity.mjs';

const SCRIPT = 'scripts/hosted-evidence-performance-trend-diff.mjs';
const CHECK = 'tests/hosted-evidence-performance-threshold-policy-check.mjs';
const DIFF_CHECK = 'tests/hosted-evidence-performance-trend-diff-check.mjs';

const source = fs.readFileSync(SCRIPT, 'utf8');
for (const token of [
  'default_total_warning_threshold_ratio',
  'default_total_failure_threshold_ratio',
  'default_phase_warning_threshold_ratio',
  'default_phase_failure_threshold_ratio',
  'default_phase_utilization_warning_ratio',
  'default_phase_utilization_failure_ratio',
  'threshold_policy',
  'warning_phases',
  'failed_phases',
  'Threshold policy:'
]) {
  assert.ok(source.includes(token), `${SCRIPT} must include threshold-policy token: ${token}`);
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function ledger({ version, release, total, evidenceMatrix, targeted = 18000, budget = 180000 }) {
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
        { phase: 'evidence-matrix', duration_ms: evidenceMatrix, budget_ms: budget, within_budget: true, budget_utilization: Number((evidenceMatrix / budget).toFixed(4)) },
        { phase: 'targeted-region-capture', duration_ms: targeted, budget_ms: 180000, within_budget: true, budget_utilization: Number((targeted / 180000).toFixed(4)) }
      ]
    }
  };
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jarbou3i-hosted-threshold-policy-'));
const previousFile = path.join(tempRoot, 'previous.json');
const passFile = path.join(tempRoot, 'pass.json');
const warnFile = path.join(tempRoot, 'warn.json');
const failFile = path.join(tempRoot, 'fail.json');
const utilizationPreviousFile = path.join(tempRoot, 'utilization-previous.json');
const utilizationWarnFile = path.join(tempRoot, 'utilization-warn.json');

writeJson(previousFile, ledger({ version: '1.4.0-alpha.60', release: 'v1.4.0-alpha.60 — Evidence Performance Ledger Reader + Trend Diff Guard', total: 120000, evidenceMatrix: 100000 }));
writeJson(passFile, ledger({ version: CURRENT_VERSION, release: CURRENT_RELEASE, total: 124000, evidenceMatrix: 104000 }));
writeJson(warnFile, ledger({ version: CURRENT_VERSION, release: CURRENT_RELEASE, total: 136000, evidenceMatrix: 118000 }));
writeJson(failFile, ledger({ version: CURRENT_VERSION, release: CURRENT_RELEASE, total: 150000, evidenceMatrix: 132000 }));
writeJson(utilizationPreviousFile, ledger({ version: '1.4.0-alpha.60', release: 'v1.4.0-alpha.60 — Evidence Performance Ledger Reader + Trend Diff Guard', total: 150000, evidenceMatrix: 132000, budget: 180000 }));
writeJson(utilizationWarnFile, ledger({ version: CURRENT_VERSION, release: CURRENT_RELEASE, total: 154000, evidenceMatrix: 136000, budget: 180000 }));

function runCase(name, currentFile) {
  const outputDir = path.join(tempRoot, name);
  const result = spawnSync(process.execPath, [SCRIPT, '--current-ledger', currentFile, '--previous-ledger', previousFile, '--output-dir', outputDir], { encoding: 'utf8' });
  const jsonFile = path.join(outputDir, 'hosted-evidence-performance-trend-diff.json');
  const mdFile = path.join(outputDir, 'hosted-evidence-performance-trend-diff.md');
  const json = fs.existsSync(jsonFile) ? JSON.parse(fs.readFileSync(jsonFile, 'utf8')) : null;
  const markdown = fs.existsSync(mdFile) ? fs.readFileSync(mdFile, 'utf8') : '';
  return { result, json, markdown };
}

const pass = runCase('pass', passFile);
assert.equal(pass.result.status, 0, `pass case must exit cleanly: ${pass.result.stderr || pass.result.stdout}`);
assert.equal(pass.json.threshold_policy.status, 'pass', 'pass fixture must produce pass policy');
assert.equal(pass.json.threshold_policy.passed, true, 'pass fixture must pass policy');
assert.equal(pass.json.threshold_policy.warned, false, 'pass fixture must not warn');
assert.ok(pass.markdown.includes('Threshold policy: `pass`'), 'Markdown must show pass threshold policy');

const warn = runCase('warn', warnFile);
assert.equal(warn.result.status, 0, 'warn case must remain mergeable');
assert.equal(warn.json.threshold_policy.status, 'warn', 'warn fixture must produce warn policy');
assert.equal(warn.json.threshold_policy.passed, true, 'warn fixture must still pass policy');
assert.equal(warn.json.threshold_policy.warned, true, 'warn fixture must mark warned=true');
assert.ok(warn.result.stdout.includes('Threshold policy: warn'), 'warn stdout must expose threshold warning');
assert.ok(warn.markdown.includes('Threshold policy: `warn`'), 'Markdown must show warning policy');

const utilizationWarn = (() => {
  const outputDir = path.join(tempRoot, 'utilization-warn');
  const result = spawnSync(process.execPath, [SCRIPT, '--current-ledger', utilizationWarnFile, '--previous-ledger', utilizationPreviousFile, '--output-dir', outputDir], { encoding: 'utf8' });
  const json = JSON.parse(fs.readFileSync(path.join(outputDir, 'hosted-evidence-performance-trend-diff.json'), 'utf8'));
  return { result, json };
})();
assert.equal(utilizationWarn.result.status, 0, 'utilization warning must remain passable');
assert.equal(utilizationWarn.json.threshold_policy.status, 'warn', 'high utilization fixture must warn');
assert.ok(utilizationWarn.json.threshold_policy.warning_phases.includes('evidence-matrix'), 'utilization warning must identify evidence-matrix');

const fail = runCase('fail', failFile);
assert.equal(fail.result.status, 2, 'fail fixture must exit with policy failure status code 2');
assert.equal(fail.json.threshold_policy.status, 'fail', 'fail fixture must produce fail policy');
assert.equal(fail.json.threshold_policy.passed, false, 'fail fixture must not pass policy');
assert.ok(fail.result.stdout.includes('Threshold policy: fail'), 'fail stdout must expose threshold failure');
assert.ok(fail.result.stdout.includes('Failed phases: evidence-matrix'), 'fail stdout must identify failed phase');

const contract = JSON.parse(fs.readFileSync('tests/current-release-contract.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.equal(contract.version, CURRENT_VERSION);
assert.equal(contract.runtime_scope, CURRENT_RUNTIME_SCOPE);
assert.ok(contract.required_tests.includes(SCRIPT), 'current release contract must require trend diff script');
assert.ok(contract.required_tests.includes(DIFF_CHECK), 'current release contract must require trend diff check');
assert.ok(contract.required_tests.includes(CHECK), 'current release contract must require threshold policy check');
assert.ok(contract.expected_changed_files.includes(CHECK), 'expected changed files must include threshold policy check');
assert.ok(contract.lock_assertions.some((assertion) => assertion.includes('threshold policy')), 'lock assertions must mention threshold policy');

for (const gate of ['no-browser', 'current-no-browser', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} gate must run threshold policy check`);
}
assert.equal(registry.evidence_performance_trend_threshold_policy.version, CURRENT_VERSION);
assert.equal(registry.evidence_performance_trend_threshold_policy.total_warning_threshold_ratio, 0.10);
assert.equal(registry.evidence_performance_trend_threshold_policy.total_failure_threshold_ratio, 0.20);
assert.equal(registry.evidence_performance_trend_threshold_policy.phase_warning_threshold_ratio, 0.15);
assert.equal(registry.evidence_performance_trend_threshold_policy.phase_failure_threshold_ratio, 0.30);
assert.equal(registry.evidence_performance_trend_threshold_policy.regressed_timing_exit_code, 2);
assert.equal(registry.evidence_performance_trend_threshold_policy.runtime_capability_change, false);
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover threshold policy check');

fs.rmSync(tempRoot, { recursive: true, force: true });
console.log(`Hosted evidence performance threshold policy checks passed for ${CURRENT_RELEASE}.`);
