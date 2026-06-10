import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CURRENT_PUBLIC_LABEL, CURRENT_RELEASE, CURRENT_VERSION, evidenceMatrixConfig } from './current-release-identity.mjs';

const BUILD_SCRIPT = 'scripts/build-lock-evidence-bundle.mjs';
const DASHBOARD_SCRIPT = 'scripts/release-lock-dashboard-digest.mjs';
const CHECK = 'tests/live-evidence-performance-trend-diff-bundle-inclusion-check.mjs';

for (const [file, tokens] of [
  [BUILD_SCRIPT, [
    'writeHostedEvidencePerformanceTrendDiff',
    'resolvePreviousPerformanceTrendLedgerFile',
    'hosted-evidence-performance-trend-diff.json',
    'included_in_canonical_lock_bundle',
    'dashboard_evaluation_expected'
  ]],
  [DASHBOARD_SCRIPT, [
    'performance-trends/hosted-evidence-performance-trend-diff.json',
    'performance_policy',
    'No performance trend diff artifact was present in this lock bundle.'
  ]]
]) {
  const source = fs.readFileSync(file, 'utf8');
  for (const token of tokens) assert.ok(source.includes(token), `${file} must include live trend-diff bundle inclusion token: ${token}`);
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function writeText(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
}

function writeIdentity(file, artifactKind, jobName) {
  writeJson(file, {
    app_version: CURRENT_VERSION,
    run_id: 'live-trend-diff-run',
    git_sha: 'live-trend-diff-sha',
    job_name: jobName,
    artifact_kind: artifactKind,
    run_attempt: '1',
    ref_name: 'live-trend-diff-check'
  });
}

function previousLedger() {
  return {
    hosted_evidence_performance_trend_ledger_version: 1,
    release: 'previous-release',
    version: 'previous-version',
    current_entry: {
      version: 'previous-version',
      release: 'previous-release',
      run_id: 'previous-run',
      commit_sha: 'previous-sha',
      ref_name: 'main',
      total_duration_ms: 121000,
      total_capture_budget_ms: 360000,
      total_within_budget: true,
      phase_count: 3,
      all_phases_within_budget: true,
      phase_records: [
        { phase: 'page-ready', duration_ms: 1000, budget_ms: 20000, within_budget: true, budget_utilization: 0.05 },
        { phase: 'evidence-matrix', duration_ms: 101000, budget_ms: 180000, within_budget: true, budget_utilization: 0.5611 },
        { phase: 'targeted-region-capture', duration_ms: 19000, budget_ms: 180000, within_budget: true, budget_utilization: 0.1056 }
      ]
    }
  };
}

function seedHostedEvidence(hostedDir) {
  const matrixRows = [];
  for (const locale of evidenceMatrixConfig.locales) {
    fs.mkdirSync(path.join(hostedDir, locale), { recursive: true });
    for (const surface of evidenceMatrixConfig.surfaces) {
      const row = {
        matrix_id: `${surface.id}-${locale}`,
        locale,
        surface: surface.slug,
        surface_id: surface.id,
        internal_build_version: CURRENT_VERSION,
        public_version_label: CURRENT_PUBLIC_LABEL,
        screenshot: `${locale}/${surface.slug}.png`,
        visible_text_file: `${locale}/${surface.slug}.visible-text.json`,
        dom_facts_file: `${locale}/${surface.slug}.dom-facts.json`,
        required_copy_present: true,
        version_visible: true,
        language_purity_passed: true,
        stale_version_residue_detected: false,
        horizontal_overflow_px: 0,
        capture_settled: true,
        visual_artifact_guard_passed: true,
        required_state_present: true,
        pass: true
      };
      matrixRows.push(row);
      writeText(path.join(hostedDir, row.screenshot), 'png-placeholder');
      writeJson(path.join(hostedDir, row.visible_text_file), { visible_text: [`v${CURRENT_VERSION} ${surface.slug} ${locale}`, CURRENT_PUBLIC_LABEL] });
      writeJson(path.join(hostedDir, row.dom_facts_file), { app_version: CURRENT_VERSION, public_version_label: CURRENT_PUBLIC_LABEL, required_selector_present: true });
      writeJson(path.join(hostedDir, locale, `${surface.slug}.validation.json`), row);
    }
  }

  writeJson(path.join(hostedDir, 'matrix-summary.json'), {
    internal_build_version: CURRENT_VERSION,
    public_version_label: CURRENT_PUBLIC_LABEL,
    languages: evidenceMatrixConfig.locales,
    surface_count: evidenceMatrixConfig.surfaces.length,
    surfaces: evidenceMatrixConfig.surfaces,
    expected_rows: 39,
    actual_rows: 39,
    passed_rows: 39,
    failed_rows: 0,
    language_purity_passed: true,
    visual_guard_passed: true,
    horizontal_overflow_max_px: 0,
    stale_version_residue_detected: false,
    golden_workflow_loaded: true,
    export_pack_v3_valid: true,
    publication_review_valid: true,
    rows: matrixRows
  });

  writeJson(path.join(hostedDir, 'hosted-demo-metadata.json'), {
    evidence_review_version: CURRENT_VERSION,
    capture_polish_version: CURRENT_VERSION,
    capture_count: 4,
    all_required_captures_present: true,
    visual_artifact_guard_required: true,
    capture_settle_required: true,
    public_version_label: CURRENT_PUBLIC_LABEL,
    page: { app_version: CURRENT_VERSION },
    captures: [
      { name: 'desktop-first-screen', horizontal_overflow_px: 0, visual_artifact_guard_passed: true, pass: true },
      { name: 'mobile-first-screen', horizontal_overflow_px: 0, visual_artifact_guard_passed: true, pass: true },
      { name: 'provider-mode', horizontal_overflow_px: 0, visual_artifact_guard_passed: true, pass: true },
      { name: 'quality-export', horizontal_overflow_px: 0, visual_artifact_guard_passed: true, pass: true }
    ],
    evidence_matrix: {
      captures: matrixRows,
      expected_rows: 39,
      actual_rows: 39,
      passed_rows: 39,
      failed_rows: 0,
      language_purity_passed: true,
      visual_guard_passed: true,
      horizontal_overflow_max_px: 0,
      stale_version_residue_detected: false
    },
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

  for (const locale of ['en', 'ar', 'fr']) writeJson(path.join(hostedDir, `visible-text-${locale}.json`), { visible_text: [`v${CURRENT_VERSION} visible ${locale}`, CURRENT_PUBLIC_LABEL] });
  for (const image of ['desktop-first-screen.png', 'mobile-first-screen.png', 'provider-mode.png', 'quality-export.png']) writeText(path.join(hostedDir, image), 'png-placeholder');
  fs.mkdirSync(path.join(hostedDir, 'exports'), { recursive: true });
  for (const file of ['export-pack-v3-manifest.json', 'golden-workflow-export-validation.json', 'publication-review-report.json', 'export-artifact-consistency.json']) {
    writeJson(path.join(hostedDir, 'exports', file), { valid: true, internal_build_version: CURRENT_VERSION });
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jarbou3i-live-trend-diff-bundle-'));
const hosted = path.join(tmp, 'hosted-demo-evidence');
const input = path.join(tmp, 'lock-evidence-input');
const logs = path.join(input, 'logs');
const output = path.join(tmp, 'bundle-output');
fs.mkdirSync(hosted, { recursive: true });
fs.mkdirSync(logs, { recursive: true });

seedHostedEvidence(hosted);
writeIdentity(path.join(logs, 'no-browser-lock-evidence-log.identity.json'), 'no-browser-lock-evidence-log', 'no-browser');
writeIdentity(path.join(logs, 'playwright-install-deps-log.identity.json'), 'playwright-install-deps-log', 'browser');
writeIdentity(path.join(logs, 'playwright-install-log.identity.json'), 'playwright-install-log', 'browser');
writeIdentity(path.join(logs, 'browser-lock-evidence-log.identity.json'), 'browser-lock-evidence-log', 'browser');
writeIdentity(path.join(hosted, 'hosted-demo-evidence.identity.json'), 'hosted-demo-evidence', 'browser');
writeText(path.join(logs, 'no-browser.log'), `Registry: ${CURRENT_RELEASE}\nCI gate timing summary: checks=182 total_ms=1000\nCI gate passed: no-browser\n`);
writeText(path.join(logs, 'playwright-install-deps.log'), 'Playwright install-deps started: timeout 10m npx playwright install-deps chromium\n');
writeText(path.join(logs, 'playwright-install.log'), 'Playwright browser install started: timeout 8m npx playwright install chromium\n');
writeText(path.join(logs, 'browser.log'), `Browser gate started: HOSTED_DEMO_EVIDENCE_DIR with PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser\nRegistry: ${CURRENT_RELEASE}\nCI gate timing summary: checks=22 total_ms=2000\nCI gate passed: browser\n`);
writeJson(path.join(input, 'performance-trends', 'hosted-evidence-performance-trend-ledger.json'), previousLedger());

const result = spawnSync(process.execPath, [BUILD_SCRIPT], {
  encoding: 'utf8',
  env: {
    ...process.env,
    HOSTED_DEMO_EVIDENCE_DIR: hosted,
    LOCK_EVIDENCE_INPUT_DIR: input,
    LOCK_EVIDENCE_BUNDLE_DIR: output,
    GITHUB_RUN_ID: 'live-trend-diff-run',
    GITHUB_RUN_ATTEMPT: '1',
    GITHUB_SHA: 'live-trend-diff-sha',
    GITHUB_REF_NAME: 'live-trend-diff-check'
  }
});
assert.equal(result.status, 0, result.stderr || result.stdout);

const bundleDir = path.join(output, `lock-evidence-bundle_${CURRENT_VERSION}_live-trend-diff-run`);
const trendDiffJson = path.join(bundleDir, 'performance-trends', 'hosted-evidence-performance-trend-diff.json');
const trendDiffMd = path.join(bundleDir, 'performance-trends', 'hosted-evidence-performance-trend-diff.md');
const dashboardJson = path.join(bundleDir, 'release-lock-dashboard', 'release-lock-dashboard-digest.json');
const dashboardMd = path.join(bundleDir, 'release-lock-dashboard', 'release-lock-dashboard-digest.md');
assert.ok(fs.existsSync(trendDiffJson), 'canonical bundle must include hosted evidence performance trend diff JSON');
assert.ok(fs.existsSync(trendDiffMd), 'canonical bundle must include hosted evidence performance trend diff Markdown');
const trendDiff = JSON.parse(fs.readFileSync(trendDiffJson, 'utf8'));
assert.equal(trendDiff.bundle_inclusion.included_in_canonical_lock_bundle, true, 'trend diff must declare canonical bundle inclusion');
assert.equal(trendDiff.bundle_inclusion.previous_ledger_source, 'provided_previous_ledger', 'trend diff must use provided previous ledger when available');
assert.equal(trendDiff.threshold_policy.status, 'pass', 'fixture trend diff should evaluate to pass');
assert.equal(trendDiff.threshold_policy.passed, true, 'fixture trend diff should pass threshold policy');
const dashboard = JSON.parse(fs.readFileSync(dashboardJson, 'utf8'));
assert.equal(dashboard.evidence.performance_policy.status, 'pass', 'dashboard must evaluate bundled live trend diff');
assert.equal(dashboard.evidence.performance_policy.diff_file, 'performance-trends/hosted-evidence-performance-trend-diff.json');
assert.ok(fs.readFileSync(dashboardMd, 'utf8').includes('Policy status: `pass`'), 'dashboard Markdown must surface live policy pass status');
const checksumText = fs.readFileSync(path.join(bundleDir, 'checksums', 'SHA256SUMS.txt'), 'utf8');
assert.ok(checksumText.includes('performance-trends/hosted-evidence-performance-trend-diff.json'), 'checksums must include trend diff JSON');
assert.ok(checksumText.includes('performance-trends/hosted-evidence-performance-trend-diff.md'), 'checksums must include trend diff Markdown');
assert.ok(fs.readFileSync('tests/current-release-contract.json', 'utf8').includes(CHECK), 'current release contract must register this live bundle inclusion check');

console.log('Live evidence performance trend diff bundle inclusion checks passed.');
