import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { CURRENT_PUBLIC_LABEL, CURRENT_RELEASE, CURRENT_VERSION } from './current-release-identity.mjs';
import { writeReleaseLockDashboardDigest } from '../scripts/release-lock-dashboard-digest.mjs';
import {
  RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT,
  validateReleaseLockDashboardBundle,
  validateReleaseLockDashboardDigestSchema,
  validateReleaseLockDashboardMarkdown
} from '../scripts/release-lock-dashboard-schema-contract.mjs';

const SCRIPT = 'scripts/release-lock-dashboard-schema-contract.mjs';
const DASHBOARD_SCRIPT = 'scripts/release-lock-dashboard-digest.mjs';
const BUILDER = 'scripts/build-lock-evidence-bundle.mjs';

for (const [file, tokens] of [
  [SCRIPT, [
    'RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT',
    'validateReleaseLockDashboardDigestSchema',
    'validateReleaseLockDashboardMarkdown',
    'validateReleaseLockDashboardBundle',
    'release-lock-dashboard/release-lock-dashboard-digest.json',
    'release-lock-dashboard/release-lock-dashboard-digest.md',
    'checksum manifest must include dashboard digest file',
    'path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)'
  ]],
  [DASHBOARD_SCRIPT, [
    'RELEASE_LOCK_DASHBOARD_DIGEST_CONTRACT',
    'release_lock_dashboard_digest_version',
    'lock_decision',
    'reviewer_checklist'
  ]],
  [BUILDER, [
    'writeReleaseLockDashboardDigest(bundleDir',
    'release-lock-dashboard',
    'SHA256SUMS.txt'
  ]]
]) {
  const source = fs.readFileSync(file, 'utf8');
  for (const token of tokens) assert.ok(source.includes(token), `${file} must include schema contract token: ${token}`);
}

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

function writeChecksums(bundleDir, omitDashboardMarkdown = false) {
  const checksumFile = path.join(bundleDir, 'checksums', 'SHA256SUMS.txt');
  const lines = listFiles(bundleDir)
    .filter((file) => file !== checksumFile)
    .filter((file) => !(omitDashboardMarkdown && file.endsWith('release-lock-dashboard-digest.md')))
    .map((file) => `${sha256(file)}  ${path.relative(bundleDir, file).replaceAll(path.sep, '/')}`)
    .join('\n') + '\n';
  writeText(checksumFile, lines);
}

function createFixtureBundle(root, name = `lock-evidence-bundle_${CURRENT_VERSION}_schema_fixture`) {
  const bundleDir = path.join(root, name);
  writeJson(path.join(bundleDir, 'evidence-manifest.json'), {
    evidence_manifest_version: CURRENT_VERSION,
    release: CURRENT_RELEASE,
    internal_build_version: CURRENT_VERSION,
    public_version_label: CURRENT_PUBLIC_LABEL,
    version: CURRENT_VERSION,
    run_id: 'schema-fixture-run',
    run_attempt: '1',
    commit_sha: 'schema-fixture-sha',
    branch: 'schema-fixture-branch',
    bundle_name: name,
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
    run_id: 'schema-fixture-run',
    run_attempt: '1',
    commit_sha: 'schema-fixture-sha',
    branch: 'schema-fixture-branch'
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
      region_id: `schema-region-${index + 1}`,
      passed: true,
      region_validation_passed: true
    }))
  });
  writeText(path.join(bundleDir, 'logs', 'no-browser.log'), 'CI gate timing summary: checks=170 total_ms=12345\nCI gate passed: no-browser\n');
  writeText(path.join(bundleDir, 'logs', 'browser.log'), 'CI gate timing summary: checks=22 total_ms=67890\nCI gate passed: browser\n');
  writeReleaseLockDashboardDigest(bundleDir, path.join(bundleDir, RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT.dashboard_dir));
  writeChecksums(bundleDir);
  return bundleDir;
}

function assertThrowsMessage(fn, token) {
  assert.throws(fn, (error) => String(error.message).includes(token), `expected error containing: ${token}`);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jarbou3i-lock-dashboard-schema-'));
try {
  const bundleDir = createFixtureBundle(tempRoot);
  const { digest, jsonPath, markdownPath } = validateReleaseLockDashboardBundle(bundleDir);
  assert.equal(digest.version, CURRENT_VERSION, 'validated digest version must match current release');
  assert.equal(digest.release, CURRENT_RELEASE, 'validated digest release must match current release');
  assert.equal(digest.public_version_label, CURRENT_PUBLIC_LABEL, 'validated digest public label must match current release');
  assert.equal(digest.lock_decision.reviewer_decision, 'LOCKABLE', 'validated digest must preserve lockable reviewer decision');
  assert.ok(fs.existsSync(jsonPath), 'validated JSON digest path must exist');
  assert.ok(fs.existsSync(markdownPath), 'validated Markdown digest path must exist');

  const cli = spawnSync(process.execPath, [SCRIPT, '--bundle-dir', bundleDir], { encoding: 'utf8' });
  assert.equal(cli.status, 0, `${SCRIPT} must pass fixture bundle validation: ${cli.stderr || cli.stdout}`);
  assert.ok(cli.stdout.includes('Release lock dashboard schema contract checks passed'), 'schema CLI must announce pass result');
  assert.ok(cli.stdout.includes(CURRENT_RELEASE), 'schema CLI must include current release title');

  const markdown = fs.readFileSync(markdownPath, 'utf8');
  validateReleaseLockDashboardMarkdown(markdown, digest);

  const malformedDigest = structuredClone(digest);
  delete malformedDigest.lock_decision.reviewer_decision;
  assertThrowsMessage(() => validateReleaseLockDashboardDigestSchema(malformedDigest), 'lock_decision.reviewer_decision');

  const staleDigest = structuredClone(digest);
  staleDigest.lock_decision.stale_version_residue_detected = true;
  assertThrowsMessage(() => validateReleaseLockDashboardDigestSchema(staleDigest), 'lockable decision');

  const missingMarkdownBundle = createFixtureBundle(tempRoot, `lock-evidence-bundle_${CURRENT_VERSION}_missing_markdown`);
  fs.rmSync(path.join(missingMarkdownBundle, 'release-lock-dashboard', 'release-lock-dashboard-digest.md'), { force: true });
  assertThrowsMessage(() => validateReleaseLockDashboardBundle(missingMarkdownBundle), 'Markdown digest missing');

  const checksumGapBundle = createFixtureBundle(tempRoot, `lock-evidence-bundle_${CURRENT_VERSION}_checksum_gap`);
  writeChecksums(checksumGapBundle, true);
  assertThrowsMessage(() => validateReleaseLockDashboardBundle(checksumGapBundle), 'checksum manifest must include dashboard digest file');
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log(`Release lock dashboard schema contract checks passed for ${CURRENT_RELEASE}.`);
