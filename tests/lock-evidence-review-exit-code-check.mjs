import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { CURRENT_PUBLIC_LABEL, CURRENT_RELEASE, CURRENT_VERSION } from './current-release-identity.mjs';
import { writeReleaseLockDashboardDigest } from '../scripts/release-lock-dashboard-digest.mjs';
import {
  LOCK_EVIDENCE_REVIEW_EXIT_CODES,
  LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES,
  classifyLockEvidenceReviewError,
  formatLockEvidenceReviewError
} from '../scripts/lock-evidence-review.mjs';

const SCRIPT = 'scripts/lock-evidence-review.mjs';
const DOC = 'docs/lock-evidence-review-cli.md';

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function writeText(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
}

function sha256(file) {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function listFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(absolute));
    else files.push(absolute);
  }
  return files;
}

function writeChecksums(bundleDir, options = {}) {
  const checksumFile = path.join(bundleDir, 'checksums', 'SHA256SUMS.txt');
  const lines = listFiles(bundleDir)
    .filter((file) => file !== checksumFile)
    .filter((file) => !(options.omitDashboardJson && file.endsWith('release-lock-dashboard-digest.json')))
    .map((file) => `${sha256(file)}  ${path.relative(bundleDir, file).replaceAll(path.sep, '/')}`)
    .join('\n') + '\n';
  writeText(checksumFile, lines);
}

function createFixtureBundle(root, name, options = {}) {
  const bundleDir = path.join(root, name);
  const browserPassed = options.browserPassed !== false;
  const staleResidue = options.staleResidue === true;
  writeJson(path.join(bundleDir, 'evidence-manifest.json'), {
    evidence_manifest_version: CURRENT_VERSION,
    release: CURRENT_RELEASE,
    internal_build_version: CURRENT_VERSION,
    public_version_label: CURRENT_PUBLIC_LABEL,
    version: CURRENT_VERSION,
    run_id: `${name}-run`,
    run_attempt: '1',
    commit_sha: `${name}-sha`,
    branch: `${name}-branch`,
    bundle_name: name,
    artifact_identity_guard: { status: 'passed', required_identity_count: 5, verified_identity_count: 5 },
    no_browser: { status: 'passed', log_file: 'logs/no-browser.log' },
    browser: { status: browserPassed ? 'passed' : 'failed', log_file: 'logs/browser.log' },
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
      stale_version_residue_detected: staleResidue
    },
    exports: { export_pack_v3_valid: true, golden_workflow_valid: true, publication_review_valid: true },
    bundle_validation: { status: browserPassed && !staleResidue ? 'passed' : 'failed', stale_version_residue_detected: staleResidue, lock_artifact_ready: browserPassed && !staleResidue, lockable: browserPassed && !staleResidue }
  });
  writeJson(path.join(bundleDir, 'ci', 'workflow-run.json'), {
    run_id: `${name}-run`,
    run_attempt: '1',
    commit_sha: `${name}-sha`,
    branch: `${name}-branch`
  });
  writeJson(path.join(bundleDir, 'ci', 'package-version.json'), { version: CURRENT_VERSION, public_version_label: CURRENT_PUBLIC_LABEL });
  writeJson(path.join(bundleDir, 'ci', 'test-summary.json'), { artifact_identity_count: 5 });
  writeText(path.join(bundleDir, 'logs', 'no-browser.log'), 'CI gate passed: no-browser\nCI gate timing summary: checks=174 total_ms=12000\n');
  writeText(path.join(bundleDir, 'logs', 'browser.log'), `${browserPassed ? 'CI gate passed: browser' : 'CI gate failed: browser'}\nCI gate timing summary: checks=22 total_ms=34000\n`);
  writeJson(path.join(bundleDir, 'hosted-demo-evidence', 'targeted-region-evidence-manifest.json'), {
    required_region_count: 5,
    targeted_region_count: 5,
    all_targeted_regions_visible: true,
    all_targeted_regions_have_expected_tokens: true,
    all_targeted_region_tokens_found: true,
    locator_screenshot_required: true,
    full_page_only_proof_allowed: false,
    regions: Array.from({ length: 5 }, (_, index) => ({ region_id: `region-${index + 1}`, passed: true }))
  });
  writeReleaseLockDashboardDigest(bundleDir, path.join(bundleDir, 'release-lock-dashboard'));
  writeChecksums(bundleDir, options);
  return bundleDir;
}

function run(args) {
  return spawnSync(process.execPath, [SCRIPT, ...args], { encoding: 'utf8' });
}

for (const [name, code] of Object.entries({
  success: 0,
  unexpected_error: 1,
  usage_error: 64,
  input_error: 65,
  bundle_contract_error: 66,
  checksum_contract_error: 67,
  not_lockable: 68
})) {
  assert.equal(LOCK_EVIDENCE_REVIEW_EXIT_CODES[name], code, `exit code ${name} must be stable`);
}

for (const family of ['usage', 'input', 'bundle_contract', 'checksum_contract', 'lock_decision', 'unexpected']) {
  assert.equal(LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES[family], family, `failure family ${family} must be stable`);
}

assert.equal(classifyLockEvidenceReviewError(new Error('checksum manifest must include dashboard digest file')).exit_code, LOCK_EVIDENCE_REVIEW_EXIT_CODES.checksum_contract_error);
assert.equal(classifyLockEvidenceReviewError(new Error('lock evidence input not found')).failure_family, LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES.input);
assert.ok(formatLockEvidenceReviewError(new Error('checksum manifest must include dashboard digest file')).includes('/checksum_contract/exit 67'), 'formatted error must include machine-readable family and exit code');

const docs = fs.readFileSync(DOC, 'utf8');
for (const token of [
  'Exit code contract',
  '64',
  '65',
  '66',
  '67',
  '68',
  'usage',
  'input',
  'bundle_contract',
  'checksum_contract',
  'lock_decision',
  'lock-evidence-review failed [LOCK_EVIDENCE_REVIEW_CHECKSUM_CONTRACT/checksum_contract/exit 67]'
]) {
  assert.ok(docs.includes(token), `operator docs must include exit-code/failure token: ${token}`);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'lock-evidence-review-exit-code-'));
try {
  const usage = run([]);
  assert.equal(usage.status, LOCK_EVIDENCE_REVIEW_EXIT_CODES.usage_error);
  assert.ok(usage.stderr.includes('/usage/exit 64'), 'usage failure must expose usage family and exit 64');

  const missing = run(['--bundle', path.join(tempRoot, 'missing-bundle')]);
  assert.equal(missing.status, LOCK_EVIDENCE_REVIEW_EXIT_CODES.input_error);
  assert.ok(missing.stderr.includes('/input/exit 65'), 'missing input must expose input family and exit 65');

  const goodBundle = createFixtureBundle(tempRoot, `lock-evidence-bundle_${CURRENT_VERSION}_exit_good`);
  const good = run(['--bundle', goodBundle]);
  assert.equal(good.status, LOCK_EVIDENCE_REVIEW_EXIT_CODES.success, good.stderr || good.stdout);
  assert.ok(good.stdout.includes('Lock evidence review: LOCKABLE'), 'success run must print lockable decision');

  const json = run(['--bundle', goodBundle, '--json']);
  assert.equal(json.status, LOCK_EVIDENCE_REVIEW_EXIT_CODES.success, json.stderr || json.stdout);
  const parsed = JSON.parse(json.stdout);
  assert.equal(parsed.exit_codes.not_lockable, LOCK_EVIDENCE_REVIEW_EXIT_CODES.not_lockable);
  assert.equal(parsed.failure_families.checksum_contract, 'checksum_contract');

  const blockedBundle = createFixtureBundle(tempRoot, `lock-evidence-bundle_${CURRENT_VERSION}_exit_blocked`, { browserPassed: false });
  const blocked = run(['--bundle', blockedBundle]);
  assert.equal(blocked.status, LOCK_EVIDENCE_REVIEW_EXIT_CODES.not_lockable);
  assert.ok(blocked.stderr.includes('/lock_decision/exit 68'), 'blocked lock decision must expose lock_decision family and exit 68');
  const allowedBlocked = run(['--bundle', blockedBundle, '--allow-blocked']);
  assert.equal(allowedBlocked.status, LOCK_EVIDENCE_REVIEW_EXIT_CODES.success, allowedBlocked.stderr || allowedBlocked.stdout);
  assert.ok(allowedBlocked.stdout.includes('Lock evidence review: BLOCKED'), 'allow-blocked must still print blocked decision');

  const missingMarkdownBundle = createFixtureBundle(tempRoot, `lock-evidence-bundle_${CURRENT_VERSION}_missing_markdown`);
  fs.rmSync(path.join(missingMarkdownBundle, 'release-lock-dashboard', 'release-lock-dashboard-digest.md'), { force: true });
  writeChecksums(missingMarkdownBundle);
  const missingMarkdown = run(['--bundle', missingMarkdownBundle]);
  assert.equal(missingMarkdown.status, LOCK_EVIDENCE_REVIEW_EXIT_CODES.bundle_contract_error);
  assert.ok(missingMarkdown.stderr.includes('/bundle_contract/exit 66'), 'missing dashboard markdown must expose bundle_contract family and exit 66');

  const missingChecksumBundle = createFixtureBundle(tempRoot, `lock-evidence-bundle_${CURRENT_VERSION}_missing_checksum`, { omitDashboardJson: true });
  const missingChecksum = run(['--bundle', missingChecksumBundle]);
  assert.equal(missingChecksum.status, LOCK_EVIDENCE_REVIEW_EXIT_CODES.checksum_contract_error);
  assert.ok(missingChecksum.stderr.includes('/checksum_contract/exit 67'), 'missing checksum entry must expose checksum_contract family and exit 67');
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log('Lock evidence review CLI exit code and failure family checks passed.');
