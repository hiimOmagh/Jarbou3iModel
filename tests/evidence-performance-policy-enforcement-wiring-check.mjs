import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CURRENT_PUBLIC_LABEL, CURRENT_RELEASE, CURRENT_RUNTIME_SCOPE, CURRENT_VERSION } from './current-release-identity.mjs';

const TREND_DIFF_SCRIPT = 'scripts/hosted-evidence-performance-trend-diff.mjs';
const DASHBOARD_SCRIPT = 'scripts/release-lock-dashboard-digest.mjs';
const CHECK = 'tests/evidence-performance-policy-enforcement-wiring-check.mjs';

for (const [file, tokens] of [
  [TREND_DIFF_SCRIPT, [
    'operatorNextActionsForPolicy',
    'operator_next_action',
    'operator_next_actions',
    'ALLOW MERGE: evidence performance policy passed',
    'ALLOW MERGE WITH REVIEW',
    'BLOCK MERGE'
  ]],
  [DASHBOARD_SCRIPT, [
    'loadPerformancePolicySummary',
    'performance_policy',
    'Evidence performance policy',
    'Operator next action'
  ]]
]) {
  const source = fs.readFileSync(file, 'utf8');
  for (const token of tokens) assert.ok(source.includes(token), `${file} must include policy enforcement wiring token: ${token}`);
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function writeText(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
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

function seedBundle(bundleDir, trendDiffJsonFile) {
  writeJson(path.join(bundleDir, 'evidence-manifest.json'), {
    evidence_manifest_version: CURRENT_VERSION,
    release: CURRENT_RELEASE,
    internal_build_version: CURRENT_VERSION,
    public_version_label: CURRENT_PUBLIC_LABEL,
    version: CURRENT_VERSION,
    run_id: 'fixture-run',
    run_attempt: '1',
    commit_sha: 'fixture-sha',
    branch: 'fixture-branch',
    bundle_name: `lock-evidence-bundle_${CURRENT_VERSION}_fixture`,
    artifact_identity_guard: { status: 'passed', required_identity_count: 5, verified_identity_count: 5 },
    no_browser: { status: 'passed', log_file: 'logs/no-browser.log' },
    browser: { status: 'passed', log_file: 'logs/browser.log' },
    hosted_demo: { capture_count: 4, all_required_captures_present: true, max_horizontal_overflow_px: 0, all_visual_artifact_guards_passed: true },
    evidence_matrix: { languages: ['en', 'ar', 'fr'], surface_count: 13, expected_rows: 39, actual_rows: 39, passed_rows: 39, failed_rows: 0, language_purity_passed: true, visual_guard_passed: true, horizontal_overflow_max_px: 0, stale_version_residue_detected: false },
    exports: { export_pack_v3_valid: true, golden_workflow_valid: true, publication_review_valid: true },
    bundle_validation: { status: 'passed', stale_version_residue_detected: false, lock_artifact_ready: true, lockable: true }
  });
  writeJson(path.join(bundleDir, 'ci', 'workflow-run.json'), { run_id: 'fixture-run', run_attempt: '1', commit_sha: 'fixture-sha', branch: 'fixture-branch' });
  writeJson(path.join(bundleDir, 'ci', 'test-summary.json'), { artifact_identity_count: 5, matrix_rows: 39, normalized_capture_count: 39 });
  writeJson(path.join(bundleDir, 'ci', 'package-version.json'), { name: 'jarbou3i-research-engine', version: CURRENT_VERSION, release: CURRENT_RELEASE, public_version_label: CURRENT_PUBLIC_LABEL });
  writeJson(path.join(bundleDir, 'hosted-demo-evidence', 'targeted-region-evidence-manifest.json'), {
    internal_build_version: CURRENT_VERSION,
    public_version_label: CURRENT_PUBLIC_LABEL,
    required_region_count: 5,
    targeted_region_count: 5,
    all_targeted_regions_visible: true,
    all_targeted_region_tokens_found: true,
    locator_screenshot_required: true,
    full_page_only_proof_allowed: false,
    regions: Array.from({ length: 5 }, (_, index) => ({ region_id: `fixture-region-${index + 1}`, passed: true, region_validation_passed: true }))
  });
  writeText(path.join(bundleDir, 'logs', 'no-browser.log'), 'CI gate timing summary: checks=181 total_ms=12345\nCI gate passed: no-browser\n');
  writeText(path.join(bundleDir, 'logs', 'browser.log'), 'CI gate timing summary: checks=22 total_ms=67890\nCI gate passed: browser\n');
  writeText(path.join(bundleDir, 'checksums', 'SHA256SUMS.txt'), 'abc  evidence-manifest.json\ndef  release-lock-dashboard/release-lock-dashboard-digest.json\n');
  fs.mkdirSync(path.join(bundleDir, 'performance-trends'), { recursive: true });
  fs.copyFileSync(trendDiffJsonFile, path.join(bundleDir, 'performance-trends', 'hosted-evidence-performance-trend-diff.json'));
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jarbou3i-policy-enforcement-wiring-'));
const previousFile = path.join(tempRoot, 'previous.json');
const passFile = path.join(tempRoot, 'current-pass.json');
const warnFile = path.join(tempRoot, 'current-warn.json');
const failFile = path.join(tempRoot, 'current-fail.json');

writeJson(previousFile, ledger({ version: '1.4.0-alpha.62', release: 'v1.4.0-alpha.62 — Evidence Performance Policy Docs + Operator Playbook', total: 120000, evidenceMatrix: 100000 }));
writeJson(passFile, ledger({ version: CURRENT_VERSION, release: CURRENT_RELEASE, total: 123000, evidenceMatrix: 102000 }));
writeJson(warnFile, ledger({ version: CURRENT_VERSION, release: CURRENT_RELEASE, total: 134000, evidenceMatrix: 116000 }));
writeJson(failFile, ledger({ version: CURRENT_VERSION, release: CURRENT_RELEASE, total: 150000, evidenceMatrix: 132000 }));

const passDir = path.join(tempRoot, 'pass');
const pass = spawnSync(process.execPath, [TREND_DIFF_SCRIPT, '--current-ledger', passFile, '--previous-ledger', previousFile, '--output-dir', passDir], { encoding: 'utf8' });
assert.equal(pass.status, 0, `pass policy comparison must exit cleanly: ${pass.stderr || pass.stdout}`);
assert.ok(pass.stdout.includes('Operator next action: ALLOW MERGE: evidence performance policy passed.'), 'pass CLI output must expose operator next action');
const passDiff = JSON.parse(fs.readFileSync(path.join(passDir, 'hosted-evidence-performance-trend-diff.json'), 'utf8'));
assert.equal(passDiff.threshold_policy.status, 'pass', 'pass fixture policy status must be pass');
assert.equal(passDiff.threshold_policy.operator_next_action, 'ALLOW MERGE: evidence performance policy passed.', 'pass fixture next action must be stable');
assert.ok(passDiff.threshold_policy.operator_next_actions.length >= 3, 'pass fixture must expose actionable checklist');
assert.ok(fs.readFileSync(path.join(passDir, 'hosted-evidence-performance-trend-diff.md'), 'utf8').includes('## Operator next actions'), 'Markdown diff must include operator next actions section');

const warnDir = path.join(tempRoot, 'warn');
const warn = spawnSync(process.execPath, [TREND_DIFF_SCRIPT, '--current-ledger', warnFile, '--previous-ledger', previousFile, '--output-dir', warnDir], { encoding: 'utf8' });
assert.equal(warn.status, 0, `warning policy comparison must remain mergeable: ${warn.stderr || warn.stdout}`);
assert.ok(warn.stdout.includes('Operator next action: ALLOW MERGE WITH REVIEW'), 'warning CLI output must expose review next action');
const warnDiffFile = path.join(warnDir, 'hosted-evidence-performance-trend-diff.json');
const warnDiff = JSON.parse(fs.readFileSync(warnDiffFile, 'utf8'));
assert.equal(warnDiff.threshold_policy.status, 'warn', 'warning fixture policy status must be warn');
assert.equal(warnDiff.threshold_policy.warned, true, 'warning fixture must expose warned=true');
assert.ok(warnDiff.threshold_policy.operator_next_action.includes('ALLOW MERGE WITH REVIEW'), 'warning fixture must expose review action');

const failDir = path.join(tempRoot, 'fail');
const fail = spawnSync(process.execPath, [TREND_DIFF_SCRIPT, '--current-ledger', failFile, '--previous-ledger', previousFile, '--output-dir', failDir], { encoding: 'utf8' });
assert.equal(fail.status, 2, 'failure policy comparison must exit with regression code 2');
assert.ok(fail.stdout.includes('Operator next action: BLOCK MERGE'), 'failure CLI output must expose block next action');
const failDiff = JSON.parse(fs.readFileSync(path.join(failDir, 'hosted-evidence-performance-trend-diff.json'), 'utf8'));
assert.equal(failDiff.threshold_policy.status, 'fail', 'failure fixture policy status must be fail');
assert.equal(failDiff.threshold_policy.failed, true, 'failure fixture must expose failed=true');
assert.ok(failDiff.threshold_policy.operator_next_action.includes('BLOCK MERGE'), 'failure fixture must expose block action');

const bundleDir = path.join(tempRoot, 'bundle');
const dashboardDir = path.join(tempRoot, 'dashboard');
seedBundle(bundleDir, warnDiffFile);
const dashboard = spawnSync(process.execPath, [DASHBOARD_SCRIPT, '--bundle-dir', bundleDir, '--output-dir', dashboardDir], { encoding: 'utf8' });
assert.equal(dashboard.status, 0, `${DASHBOARD_SCRIPT} must read policy wiring fixture: ${dashboard.stderr || dashboard.stdout}`);
const dashboardDigest = JSON.parse(fs.readFileSync(path.join(dashboardDir, 'release-lock-dashboard-digest.json'), 'utf8'));
assert.equal(dashboardDigest.evidence.performance_policy.status, 'warn', 'dashboard digest must expose performance policy status');
assert.equal(dashboardDigest.evidence.performance_policy.warned, true, 'dashboard digest must expose warned policy state');
assert.ok(dashboardDigest.evidence.performance_policy.operator_next_action.includes('ALLOW MERGE WITH REVIEW'), 'dashboard digest must expose operator next action');
assert.ok(dashboardDigest.reviewer_checklist.some((item) => item.includes('performance policy: warn')), 'dashboard checklist must include performance policy item');
const dashboardMarkdown = fs.readFileSync(path.join(dashboardDir, 'release-lock-dashboard-digest.md'), 'utf8');
assert.ok(dashboardMarkdown.includes('## Evidence performance policy'), 'dashboard Markdown must include performance policy section');
assert.ok(dashboardMarkdown.includes('Policy status: `warn`'), 'dashboard Markdown must expose warning policy status');
assert.ok(dashboardMarkdown.includes('Operator next action: ALLOW MERGE WITH REVIEW'), 'dashboard Markdown must expose operator next action');

const contract = JSON.parse(fs.readFileSync('tests/current-release-contract.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.equal(contract.version, CURRENT_VERSION);
assert.equal(contract.runtime_scope, CURRENT_RUNTIME_SCOPE);
assert.ok(contract.required_tests.includes(CHECK), 'current release contract must require policy enforcement wiring check');
assert.ok(contract.expected_changed_files.includes(CHECK), 'expected changed files must include policy enforcement wiring check');
assert.ok(contract.lock_assertions.some((assertion) => assertion.includes('operator next action')), 'lock assertions must mention operator next action wiring');
for (const gate of ['no-browser', 'current-no-browser', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} gate must run policy enforcement wiring check`);
}
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover policy enforcement wiring check');
assert.equal(registry.evidence_performance_policy_enforcement_wiring.version, CURRENT_VERSION);
assert.equal(registry.evidence_performance_policy_enforcement_wiring.runtime_capability_change, false);
assert.equal(registry.evidence_performance_policy_enforcement_wiring.dashboard_digest_policy_status_required, true);
assert.equal(registry.evidence_performance_policy_enforcement_wiring.operator_next_action_required, true);

fs.rmSync(tempRoot, { recursive: true, force: true });
console.log(`Evidence performance policy enforcement wiring checks passed for ${CURRENT_RELEASE}.`);
