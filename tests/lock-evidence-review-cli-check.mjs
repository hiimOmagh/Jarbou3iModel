import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { CURRENT_PUBLIC_LABEL, CURRENT_RELEASE, CURRENT_VERSION } from './current-release-identity.mjs';
import { writeReleaseLockDashboardDigest } from '../scripts/release-lock-dashboard-digest.mjs';
import { readLockEvidenceReview, renderLockEvidenceReviewSummary } from '../scripts/lock-evidence-review.mjs';

const SCRIPT = 'scripts/lock-evidence-review.mjs';

for (const token of [
  'LOCK_EVIDENCE_REVIEW_CONTRACT',
  'readLockEvidenceReview',
  'renderLockEvidenceReviewSummary',
  'findEndOfCentralDirectory',
  'unsupported ZIP compression method',
  'release-lock-dashboard/release-lock-dashboard-digest.json',
  'release-lock-dashboard/release-lock-dashboard-digest.md',
  'checksum manifest must include dashboard digest file',
  'path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)'
]) {
  assert.ok(fs.readFileSync(SCRIPT, 'utf8').includes(token), `lock evidence review CLI must include token: ${token}`);
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

function writeChecksums(bundleDir, options = {}) {
  const checksumFile = path.join(bundleDir, 'checksums', 'SHA256SUMS.txt');
  const lines = listFiles(bundleDir)
    .filter((file) => file !== checksumFile)
    .filter((file) => !(options.omitDashboardJson && file.endsWith('release-lock-dashboard-digest.json')))
    .filter((file) => !(options.omitDashboardMarkdown && file.endsWith('release-lock-dashboard-digest.md')))
    .map((file) => `${sha256(file)}  ${path.relative(bundleDir, file).replaceAll(path.sep, '/')}`)
    .join('\n') + '\n';
  writeText(checksumFile, lines);
}

function createFixtureBundle(root, name = `lock-evidence-bundle_${CURRENT_VERSION}_review_fixture`) {
  const bundleDir = path.join(root, name);
  writeJson(path.join(bundleDir, 'evidence-manifest.json'), {
    evidence_manifest_version: CURRENT_VERSION,
    release: CURRENT_RELEASE,
    internal_build_version: CURRENT_VERSION,
    public_version_label: CURRENT_PUBLIC_LABEL,
    version: CURRENT_VERSION,
    run_id: 'review-fixture-run',
    run_attempt: '1',
    commit_sha: 'review-fixture-sha',
    branch: 'review-fixture-branch',
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
    run_id: 'review-fixture-run',
    run_attempt: '1',
    commit_sha: 'review-fixture-sha',
    branch: 'review-fixture-branch'
  });
  writeJson(path.join(bundleDir, 'ci', 'package-version.json'), {
    version: CURRENT_VERSION,
    public_version_label: CURRENT_PUBLIC_LABEL
  });
  writeJson(path.join(bundleDir, 'ci', 'test-summary.json'), {
    artifact_identity_count: 5
  });
  writeText(path.join(bundleDir, 'logs', 'no-browser.log'), 'CI gate passed: no-browser\nCI gate timing summary: checks=172 total_ms=12000\n');
  writeText(path.join(bundleDir, 'logs', 'browser.log'), 'CI gate passed: browser\nCI gate timing summary: checks=22 total_ms=34000\n');
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
  writeChecksums(bundleDir);
  return bundleDir;
}

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ -1) >>> 0;
}

function dosTimeDate(date = new Date('2026-01-01T00:00:00Z')) {
  const time = (date.getUTCHours() << 11) | (date.getUTCMinutes() << 5) | Math.floor(date.getUTCSeconds() / 2);
  const dosDate = ((date.getUTCFullYear() - 1980) << 9) | ((date.getUTCMonth() + 1) << 5) | date.getUTCDate();
  return { time, dosDate };
}

function createStoredZipFromDirectory(sourceDir, zipFile) {
  const records = [];
  const chunks = [];
  let offset = 0;
  const { time, dosDate } = dosTimeDate();
  for (const file of listFiles(sourceDir)) {
    const relative = path.relative(path.dirname(sourceDir), file).replaceAll(path.sep, '/');
    const name = Buffer.from(relative, 'utf8');
    const data = fs.readFileSync(file);
    const checksum = crc32(data);
    const local = Buffer.alloc(30 + name.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(checksum, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    name.copy(local, 30);
    chunks.push(local, data);
    records.push({ name, checksum, size: data.length, offset });
    offset += local.length + data.length;
  }
  const centralStart = offset;
  for (const record of records) {
    const central = Buffer.alloc(46 + record.name.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(time, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(record.checksum, 16);
    central.writeUInt32LE(record.size, 20);
    central.writeUInt32LE(record.size, 24);
    central.writeUInt16LE(record.name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(record.offset, 42);
    record.name.copy(central, 46);
    chunks.push(central);
    offset += central.length;
  }
  const centralSize = offset - centralStart;
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(records.length, 8);
  end.writeUInt16LE(records.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(centralStart, 16);
  end.writeUInt16LE(0, 20);
  chunks.push(end);
  fs.writeFileSync(zipFile, Buffer.concat(chunks));
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'lock-evidence-review-cli-'));
try {
  const bundleDir = createFixtureBundle(tempRoot);
  const review = readLockEvidenceReview(bundleDir);
  assert.equal(review.lock_decision.reviewer_decision, 'LOCKABLE');
  assert.equal(review.gates.no_browser.checks, 172);
  assert.equal(review.gates.browser.checks, 22);
  assert.equal(review.evidence.evidence_matrix.passed_rows, 39);
  assert.equal(review.evidence.targeted_regions.passed_count, 5);
  assert.equal(review.checksum_manifest_includes_dashboard_digest, true);
  const rendered = renderLockEvidenceReviewSummary(review);
  for (const token of [
    'Lock evidence review: LOCKABLE',
    CURRENT_RELEASE,
    'no-browser: passed (172 checks)',
    'browser: passed (22 checks)',
    'Evidence matrix: 39/39',
    'Hosted captures: 4/4',
    'Targeted regions: 5/5',
    'Dashboard digest checksums: present',
    'Next action: merge to main after branch CI is green'
  ]) {
    assert.ok(rendered.includes(token), `rendered review summary must include: ${token}`);
  }

  const dirRun = spawnSync(process.execPath, [SCRIPT, '--bundle', bundleDir], { encoding: 'utf8' });
  assert.equal(dirRun.status, 0, dirRun.stderr || dirRun.stdout);
  assert.ok(dirRun.stdout.includes('Lock evidence review: LOCKABLE'), 'directory CLI output must print lockable decision');
  assert.ok(dirRun.stdout.includes('Dashboard digest checksums: present'), 'directory CLI output must print checksum status');

  const zipFile = path.join(tempRoot, `${path.basename(bundleDir)}.zip`);
  createStoredZipFromDirectory(bundleDir, zipFile);
  const zipRun = spawnSync(process.execPath, [SCRIPT, '--bundle', zipFile], { encoding: 'utf8' });
  assert.equal(zipRun.status, 0, zipRun.stderr || zipRun.stdout);
  assert.ok(zipRun.stdout.includes('Lock evidence review: LOCKABLE'), 'ZIP CLI output must print lockable decision');
  assert.ok(zipRun.stdout.includes('no-browser: passed (172 checks)'), 'ZIP CLI output must print no-browser status');

  const jsonRun = spawnSync(process.execPath, [SCRIPT, '--bundle', zipFile, '--json'], { encoding: 'utf8' });
  assert.equal(jsonRun.status, 0, jsonRun.stderr || jsonRun.stdout);
  const jsonReview = JSON.parse(jsonRun.stdout);
  assert.equal(jsonReview.version, CURRENT_VERSION);
  assert.equal(jsonReview.source_type, 'zip');
  assert.equal(jsonReview.lock_decision.lockable, true);

  const brokenDir = createFixtureBundle(tempRoot, `lock-evidence-bundle_${CURRENT_VERSION}_missing_digest_fixture`);
  fs.rmSync(path.join(brokenDir, 'release-lock-dashboard', 'release-lock-dashboard-digest.md'));
  const brokenRun = spawnSync(process.execPath, [SCRIPT, '--bundle', brokenDir], { encoding: 'utf8' });
  assert.notEqual(brokenRun.status, 0, 'missing Markdown digest must fail review CLI');
  assert.ok(brokenRun.stderr.includes('release-lock-dashboard/release-lock-dashboard-digest.md') || brokenRun.stderr.includes('Markdown'), 'missing digest failure must name missing digest');
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log('Lock evidence review CLI checks passed.');
