#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT = Object.freeze({
  version: 1,
  dashboard_dir: 'release-lock-dashboard',
  json: 'release-lock-dashboard-digest.json',
  markdown: 'release-lock-dashboard-digest.md',
  checksum_file: 'checksums/SHA256SUMS.txt',
  required_markdown_sections: Object.freeze([
    '# Release Lock Dashboard',
    '## Gate status',
    '## Evidence digest',
    '## Reviewer checklist'
  ])
});

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function assertContract(condition, message) {
  if (!condition) throw new Error(message);
}

function getValue(object, dottedPath) {
  return dottedPath.split('.').reduce((current, segment) => current?.[segment], object);
}

function assertString(object, dottedPath) {
  const value = getValue(object, dottedPath);
  assertContract(typeof value === 'string' && value.length > 0, `digest field must be a non-empty string: ${dottedPath}`);
  return value;
}

function assertBoolean(object, dottedPath) {
  const value = getValue(object, dottedPath);
  assertContract(typeof value === 'boolean', `digest field must be boolean: ${dottedPath}`);
  return value;
}

function assertNumberOrNull(object, dottedPath) {
  const value = getValue(object, dottedPath);
  assertContract(value === null || (typeof value === 'number' && Number.isFinite(value)), `digest field must be number or null: ${dottedPath}`);
  return value;
}

function assertNumber(object, dottedPath) {
  const value = getValue(object, dottedPath);
  assertContract(typeof value === 'number' && Number.isFinite(value), `digest field must be finite number: ${dottedPath}`);
  return value;
}

function assertStatus(object, dottedPath, allowed = ['passed', 'failed', 'unknown']) {
  const value = assertString(object, dottedPath);
  assertContract(allowed.includes(value), `digest field has invalid status ${dottedPath}: ${value}`);
  return value;
}

function normalizedChecksumPaths(bundleDir) {
  const checksumFile = path.join(bundleDir, RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT.checksum_file);
  assertContract(fs.existsSync(checksumFile), `checksum file missing: ${RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT.checksum_file}`);
  return new Set(readText(checksumFile)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^\S+\s+/, '').replaceAll('\\', '/')));
}

export function releaseLockDashboardPaths(bundleDir) {
  const dashboardDir = path.join(bundleDir, RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT.dashboard_dir);
  return {
    dashboardDir,
    jsonPath: path.join(dashboardDir, RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT.json),
    markdownPath: path.join(dashboardDir, RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT.markdown)
  };
}

export function validateReleaseLockDashboardDigestSchema(digest, options = {}) {
  assertContract(digest && typeof digest === 'object', 'digest must be an object');
  assertContract(digest.release_lock_dashboard_digest_version === RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT.version, 'digest contract version must match release lock dashboard schema contract');
  assertContract(digest.generated_from === 'lock-evidence-bundle', 'digest must declare generated_from lock-evidence-bundle');

  assertString(digest, 'generated_at');
  assertString(digest, 'release');
  assertString(digest, 'version');
  assertString(digest, 'public_version_label');
  assertString(digest, 'identity.commit_sha');
  assertString(digest, 'identity.ref_name');
  assertString(digest, 'identity.run_id');
  assertString(digest, 'identity.run_attempt');
  assertString(digest, 'identity.bundle_name');

  assertStatus(digest, 'gates.no_browser.status');
  assertNumberOrNull(digest, 'gates.no_browser.checks');
  assertNumberOrNull(digest, 'gates.no_browser.total_ms');
  assertBoolean(digest, 'gates.no_browser.pass_marker_present');
  assertString(digest, 'gates.no_browser.log_file');

  assertStatus(digest, 'gates.browser.status');
  assertNumberOrNull(digest, 'gates.browser.checks');
  assertNumberOrNull(digest, 'gates.browser.total_ms');
  assertBoolean(digest, 'gates.browser.pass_marker_present');
  assertString(digest, 'gates.browser.log_file');

  assertStatus(digest, 'evidence.artifact_identity_guard.status');
  assertNumber(digest, 'evidence.artifact_identity_guard.required_identity_count');
  assertNumber(digest, 'evidence.artifact_identity_guard.verified_identity_count');
  assertNumber(digest, 'evidence.hosted_demo.capture_count');
  assertBoolean(digest, 'evidence.hosted_demo.all_required_captures_present');
  assertNumber(digest, 'evidence.hosted_demo.max_horizontal_overflow_px');
  assertBoolean(digest, 'evidence.hosted_demo.all_visual_artifact_guards_passed');
  assertNumber(digest, 'evidence.evidence_matrix.expected_rows');
  assertNumber(digest, 'evidence.evidence_matrix.actual_rows');
  assertNumber(digest, 'evidence.evidence_matrix.passed_rows');
  assertNumber(digest, 'evidence.evidence_matrix.failed_rows');
  assertContract(Array.isArray(digest.evidence.evidence_matrix.languages), 'digest evidence matrix languages must be an array');
  assertNumber(digest, 'evidence.evidence_matrix.surface_count');
  assertBoolean(digest, 'evidence.evidence_matrix.language_purity_passed');
  assertBoolean(digest, 'evidence.evidence_matrix.visual_guard_passed');
  assertBoolean(digest, 'evidence.evidence_matrix.stale_version_residue_detected');
  assertNumber(digest, 'evidence.targeted_regions.required_count');
  assertNumber(digest, 'evidence.targeted_regions.actual_count');
  assertNumber(digest, 'evidence.targeted_regions.passed_count');
  assertBoolean(digest, 'evidence.targeted_regions.all_visible');
  assertBoolean(digest, 'evidence.targeted_regions.all_tokens_found');
  assertBoolean(digest, 'evidence.targeted_regions.locator_screenshot_required');
  assertBoolean(digest, 'evidence.targeted_regions.full_page_only_proof_allowed');
  assertBoolean(digest, 'evidence.exports.export_pack_v3_valid');
  assertBoolean(digest, 'evidence.exports.golden_workflow_valid');
  assertBoolean(digest, 'evidence.exports.publication_review_valid');
  assertNumberOrNull(digest, 'evidence.checksum_rows');

  assertBoolean(digest, 'lock_decision.lockable');
  assertBoolean(digest, 'lock_decision.stale_version_residue_detected');
  assertStatus(digest, 'lock_decision.status', ['lockable', 'blocked']);
  assertStatus(digest, 'lock_decision.reviewer_decision', ['LOCKABLE', 'BLOCKED']);
  assertContract(Array.isArray(digest.reviewer_checklist), 'digest reviewer_checklist must be an array');
  assertContract(digest.reviewer_checklist.length >= 5, 'digest reviewer_checklist must include operator review items');

  const noBrowserPassed = digest.gates.no_browser.status === 'passed';
  const browserPassed = digest.gates.browser.status === 'passed';
  const staleFree = digest.lock_decision.stale_version_residue_detected === false;
  const expectedLockable = noBrowserPassed && browserPassed && staleFree;
  assertContract(digest.lock_decision.lockable === expectedLockable, 'digest lockable decision must match gate/stale-residue contract');
  assertContract(digest.lock_decision.reviewer_decision === (expectedLockable ? 'LOCKABLE' : 'BLOCKED'), 'digest reviewer decision must match lockable boolean');
  assertContract(digest.lock_decision.status === (expectedLockable ? 'lockable' : 'blocked'), 'digest status must match lockable boolean');

  if (options.expectedVersion) assertContract(digest.version === options.expectedVersion, `digest version mismatch: ${digest.version} !== ${options.expectedVersion}`);
  if (options.expectedRelease) assertContract(digest.release === options.expectedRelease, `digest release mismatch: ${digest.release} !== ${options.expectedRelease}`);
  if (options.expectedPublicLabel) assertContract(digest.public_version_label === options.expectedPublicLabel, `digest public label mismatch: ${digest.public_version_label} !== ${options.expectedPublicLabel}`);
  if (options.expectedCommitSha) assertContract(digest.identity.commit_sha === options.expectedCommitSha, `digest commit mismatch: ${digest.identity.commit_sha} !== ${options.expectedCommitSha}`);
  if (options.expectedRefName) assertContract(digest.identity.ref_name === options.expectedRefName, `digest ref mismatch: ${digest.identity.ref_name} !== ${options.expectedRefName}`);
  if (options.expectedRunId) assertContract(String(digest.identity.run_id) === String(options.expectedRunId), `digest run id mismatch: ${digest.identity.run_id} !== ${options.expectedRunId}`);
  return true;
}

export function validateReleaseLockDashboardMarkdown(markdown, digest) {
  assertContract(typeof markdown === 'string' && markdown.length > 0, 'dashboard Markdown digest must be non-empty');
  for (const section of RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT.required_markdown_sections) {
    assertContract(markdown.includes(section), `dashboard Markdown digest missing required section: ${section}`);
  }
  for (const token of [
    digest.release,
    digest.version,
    digest.public_version_label,
    digest.identity.commit_sha,
    digest.identity.ref_name,
    String(digest.identity.run_id),
    `Reviewer decision: **${digest.lock_decision.reviewer_decision}**`,
    `no-browser: \`${digest.gates.no_browser.status}\``,
    `browser: \`${digest.gates.browser.status}\``,
    `Evidence matrix: \`${digest.evidence.evidence_matrix.passed_rows}/${digest.evidence.evidence_matrix.expected_rows}\` rows passed`,
    `Targeted regions: \`${digest.evidence.targeted_regions.passed_count}/${digest.evidence.targeted_regions.required_count || digest.evidence.targeted_regions.actual_count}\``,
    `Lockable: \`${digest.lock_decision.lockable}\``
  ]) {
    assertContract(markdown.includes(token), `dashboard Markdown digest missing identity/evidence token: ${token}`);
  }
  return true;
}

export function validateReleaseLockDashboardBundle(bundleDir) {
  const resolvedBundleDir = path.resolve(bundleDir);
  const { jsonPath, markdownPath } = releaseLockDashboardPaths(resolvedBundleDir);
  assertContract(fs.existsSync(jsonPath), `release lock dashboard JSON digest missing: ${path.relative(resolvedBundleDir, jsonPath).replaceAll(path.sep, '/')}`);
  assertContract(fs.existsSync(markdownPath), `release lock dashboard Markdown digest missing: ${path.relative(resolvedBundleDir, markdownPath).replaceAll(path.sep, '/')}`);
  const evidenceManifest = readJson(path.join(resolvedBundleDir, 'evidence-manifest.json'));
  const digest = readJson(jsonPath);
  validateReleaseLockDashboardDigestSchema(digest, {
    expectedVersion: evidenceManifest.version || evidenceManifest.internal_build_version,
    expectedRelease: evidenceManifest.release,
    expectedPublicLabel: evidenceManifest.public_version_label,
    expectedCommitSha: evidenceManifest.commit_sha,
    expectedRefName: evidenceManifest.branch,
    expectedRunId: evidenceManifest.run_id
  });
  validateReleaseLockDashboardMarkdown(readText(markdownPath), digest);

  const checksumPaths = normalizedChecksumPaths(resolvedBundleDir);
  for (const requiredPath of [
    'release-lock-dashboard/release-lock-dashboard-digest.json',
    'release-lock-dashboard/release-lock-dashboard-digest.md'
  ]) {
    assertContract(checksumPaths.has(requiredPath), `checksum manifest must include dashboard digest file: ${requiredPath}`);
  }
  return { digest, jsonPath, markdownPath };
}

function readArg(name) {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1];
  return null;
}

function isCliEntrypoint() {
  if (!process.argv[1]) return false;
  return path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
}

if (isCliEntrypoint()) {
  const bundleDir = readArg('--bundle-dir') || process.env.RELEASE_LOCK_DASHBOARD_SCHEMA_BUNDLE_DIR;
  if (!bundleDir) {
    console.error('release-lock-dashboard-schema-contract failed: missing --bundle-dir');
    process.exit(1);
  }
  try {
    const result = validateReleaseLockDashboardBundle(bundleDir);
    console.log(`Release lock dashboard schema contract checks passed: ${result.digest.release}`);
    console.log(`Dashboard digest JSON: ${result.jsonPath}`);
    console.log(`Dashboard digest Markdown: ${result.markdownPath}`);
  } catch (error) {
    console.error(`release-lock-dashboard-schema-contract failed: ${error.message}`);
    process.exit(1);
  }
}
