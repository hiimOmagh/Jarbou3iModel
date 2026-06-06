import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CURRENT_PUBLIC_LABEL, CURRENT_RELEASE, CURRENT_VERSION } from './current-release-identity.mjs';

const SCRIPT = 'scripts/release-lock-dashboard-digest.mjs';
const BUILDER = 'scripts/build-lock-evidence-bundle.mjs';

for (const [file, tokens] of [
  [SCRIPT, [
    'RELEASE_LOCK_DASHBOARD_DIGEST_CONTRACT',
    'release-lock-dashboard-digest.json',
    'release-lock-dashboard-digest.md',
    'buildReleaseLockDashboardDigest',
    'renderReleaseLockDashboardMarkdown',
    'fileURLToPath(import.meta.url)',
    'path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)',
    'Reviewer decision',
    'targeted_regions',
    'stale_version_residue_detected'
  ]],
  [BUILDER, [
    'release-lock-dashboard-digest.mjs',
    'writeReleaseLockDashboardDigest',
    'release-lock-dashboard'
  ]]
]) {
  const source = fs.readFileSync(file, 'utf8');
  for (const token of tokens) assert.ok(source.includes(token), `${file} must include release lock dashboard token: ${token}`);
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function writeText(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jarbou3i-lock-dashboard-'));
const bundleDir = path.join(tempRoot, `lock-evidence-bundle_${CURRENT_VERSION}_fixture`);
const outputDir = path.join(tempRoot, 'dashboard-output');

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
  artifact_identity_guard: {
    status: 'passed',
    required_identity_count: 5,
    verified_identity_count: 5
  },
  no_browser: {
    status: 'passed',
    log_file: 'logs/no-browser.log'
  },
  browser: {
    status: 'passed',
    log_file: 'logs/browser.log'
  },
  hosted_demo: {
    capture_count: 4,
    all_required_captures_present: true,
    max_horizontal_overflow_px: 0,
    all_visual_artifact_guards_passed: true
  },
  evidence_matrix: {
    languages: ['en', 'ar', 'fr'],
    surface_count: 13,
    expected_rows: 39,
    actual_rows: 39,
    passed_rows: 39,
    failed_rows: 0,
    language_purity_passed: true,
    visual_guard_passed: true,
    horizontal_overflow_max_px: 0,
    stale_version_residue_detected: false
  },
  exports: {
    export_pack_v3_valid: true,
    golden_workflow_valid: true,
    publication_review_valid: true
  },
  bundle_validation: {
    status: 'passed',
    stale_version_residue_detected: false,
    lock_artifact_ready: true,
    lockable: true
  }
});
writeJson(path.join(bundleDir, 'ci', 'workflow-run.json'), {
  run_id: 'fixture-run',
  run_attempt: '1',
  commit_sha: 'fixture-sha',
  branch: 'fixture-branch'
});
writeJson(path.join(bundleDir, 'ci', 'test-summary.json'), {
  artifact_identity_count: 5,
  matrix_rows: 39,
  normalized_capture_count: 39
});
writeJson(path.join(bundleDir, 'ci', 'package-version.json'), {
  name: 'jarbou3i-research-engine',
  version: CURRENT_VERSION,
  release: CURRENT_RELEASE,
  public_version_label: CURRENT_PUBLIC_LABEL
});
writeJson(path.join(bundleDir, 'hosted-demo-evidence', 'targeted-region-evidence-manifest.json'), {
  internal_build_version: CURRENT_VERSION,
  public_version_label: CURRENT_PUBLIC_LABEL,
  required_region_count: 5,
  targeted_region_count: 5,
  all_targeted_regions_visible: true,
  all_targeted_regions_have_expected_tokens: true,
  all_targeted_region_tokens_found: true,
  locator_screenshot_required: true,
  full_page_only_proof_allowed: false,
  regions: Array.from({ length: 5 }, (_, index) => ({
    region_id: `fixture-region-${index + 1}`,
    passed: true,
    region_validation_passed: true
  }))
});
writeText(path.join(bundleDir, 'logs', 'no-browser.log'), 'CI gate timing summary: checks=169 total_ms=12345\nCI gate passed: no-browser\n');
writeText(path.join(bundleDir, 'logs', 'browser.log'), 'CI gate timing summary: checks=22 total_ms=67890\nCI gate passed: browser\n');
writeText(path.join(bundleDir, 'checksums', 'SHA256SUMS.txt'), 'abc  evidence-manifest.json\ndef  logs/no-browser.log\n');

const result = spawnSync(process.execPath, [SCRIPT, '--bundle-dir', bundleDir, '--output-dir', outputDir], { encoding: 'utf8' });
assert.equal(result.status, 0, `${SCRIPT} must exit cleanly: ${result.stderr || result.stdout}`);
assert.ok(result.stdout.includes('Release lock dashboard digest written'), 'script must announce JSON digest output');
assert.ok(result.stdout.includes('Reviewer decision: LOCKABLE'), 'script must announce lockable reviewer decision');

const jsonPath = path.join(outputDir, 'release-lock-dashboard-digest.json');
const markdownPath = path.join(outputDir, 'release-lock-dashboard-digest.md');
assert.ok(fs.existsSync(jsonPath), 'release dashboard JSON digest must be written');
assert.ok(fs.existsSync(markdownPath), 'release dashboard Markdown digest must be written');

const digest = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
assert.equal(digest.release_lock_dashboard_digest_version, 1, 'digest contract version must be stable');
assert.equal(digest.version, CURRENT_VERSION, 'digest version must match current release');
assert.equal(digest.release, CURRENT_RELEASE, 'digest release must match current release');
assert.equal(digest.public_version_label, CURRENT_PUBLIC_LABEL, 'digest public label must match current release');
assert.equal(digest.identity.run_id, 'fixture-run', 'digest must expose run id');
assert.equal(digest.identity.commit_sha, 'fixture-sha', 'digest must expose commit sha');
assert.equal(digest.identity.ref_name, 'fixture-branch', 'digest must expose ref name');
assert.equal(digest.gates.no_browser.status, 'passed', 'digest must expose no-browser pass status');
assert.equal(digest.gates.no_browser.checks, 169, 'digest must parse no-browser check count');
assert.equal(digest.gates.browser.status, 'passed', 'digest must expose browser pass status');
assert.equal(digest.gates.browser.checks, 22, 'digest must parse browser check count');
assert.equal(digest.evidence.artifact_identity_guard.verified_identity_count, 5, 'digest must expose artifact identity count');
assert.equal(digest.evidence.evidence_matrix.passed_rows, 39, 'digest must expose evidence matrix passed rows');
assert.equal(digest.evidence.hosted_demo.capture_count, 4, 'digest must expose hosted capture count');
assert.equal(digest.evidence.targeted_regions.passed_count, 5, 'digest must expose targeted region pass count');
assert.equal(digest.evidence.checksum_rows, 2, 'digest must expose checksum row count');
assert.equal(digest.lock_decision.stale_version_residue_detected, false, 'digest must expose stale residue false');
assert.equal(digest.lock_decision.lockable, true, 'digest must mark fixture lockable');
assert.equal(digest.lock_decision.reviewer_decision, 'LOCKABLE', 'digest must expose reviewer decision');
assert.ok(digest.reviewer_checklist.some((item) => item.includes('no-browser gate: passed')), 'digest must include no-browser checklist item');
assert.ok(digest.reviewer_checklist.some((item) => item.includes('targeted regions: 5/5')), 'digest must include targeted region checklist item');

const markdown = fs.readFileSync(markdownPath, 'utf8');
for (const token of [
  `# Release Lock Dashboard — ${CURRENT_RELEASE}`,
  '## Gate status',
  '## Evidence digest',
  '## Reviewer checklist',
  'Reviewer decision: **LOCKABLE**',
  'no-browser: `passed` (169 checks)',
  'browser: `passed` (22 checks)',
  'Evidence matrix: `39/39` rows passed',
  'Targeted regions: `5/5`',
  'Lockable: `true`'
]) {
  assert.ok(markdown.includes(token), `Markdown digest must include token: ${token}`);
}

fs.rmSync(tempRoot, { recursive: true, force: true });
console.log(`Release lock dashboard artifact checks passed for ${CURRENT_RELEASE}.`);
