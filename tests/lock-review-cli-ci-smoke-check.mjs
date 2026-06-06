import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { CURRENT_PUBLIC_LABEL, CURRENT_RELEASE, CURRENT_VERSION } from './current-release-identity.mjs';
import { writeReleaseLockDashboardDigest } from '../scripts/release-lock-dashboard-digest.mjs';

const SCRIPT = 'scripts/lock-evidence-review.mjs';
const DOC = 'docs/lock-evidence-review-cli.md';
const WORKFLOW = '.github/workflows/ci.yml';

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

function createFixtureBundle(root, name = `lock-evidence-bundle_${CURRENT_VERSION}_ci_smoke_fixture`) {
  const bundleDir = path.join(root, name);
  writeJson(path.join(bundleDir, 'evidence-manifest.json'), {
    evidence_manifest_version: CURRENT_VERSION,
    release: CURRENT_RELEASE,
    internal_build_version: CURRENT_VERSION,
    public_version_label: CURRENT_PUBLIC_LABEL,
    version: CURRENT_VERSION,
    run_id: 'lock-review-ci-smoke-run',
    run_attempt: '1',
    commit_sha: 'lock-review-ci-smoke-sha',
    branch: 'lock-review-ci-smoke-branch',
    bundle_name: name,
    artifact_identity_guard: { status: 'passed', required_identity_count: 5, verified_identity_count: 5 },
    no_browser: { status: 'passed', log_file: 'logs/no-browser.log' },
    browser: { status: 'passed', log_file: 'logs/browser.log' },
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
    exports: { export_pack_v3_valid: true, golden_workflow_valid: true, publication_review_valid: true },
    bundle_validation: { status: 'passed', stale_version_residue_detected: false, lock_artifact_ready: true, lockable: true }
  });
  writeJson(path.join(bundleDir, 'ci', 'workflow-run.json'), {
    run_id: 'lock-review-ci-smoke-run',
    run_attempt: '1',
    commit_sha: 'lock-review-ci-smoke-sha',
    branch: 'lock-review-ci-smoke-branch'
  });
  writeJson(path.join(bundleDir, 'ci', 'package-version.json'), {
    version: CURRENT_VERSION,
    public_version_label: CURRENT_PUBLIC_LABEL
  });
  writeJson(path.join(bundleDir, 'ci', 'test-summary.json'), { artifact_identity_count: 5 });
  writeText(path.join(bundleDir, 'logs', 'no-browser.log'), 'CI gate passed: no-browser\nCI gate timing summary: checks=173 total_ms=12000\n');
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

function createStoredZipFromDirectory(sourceDir, zipFile) {
  const records = [];
  const chunks = [];
  let offset = 0;
  const time = 0;
  const dosDate = ((2026 - 1980) << 9) | (1 << 5) | 1;
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

for (const token of [
  'Smoke lock evidence review CLI',
  'node scripts/lock-evidence-review.mjs --bundle "$bundle"',
  'node scripts/lock-evidence-review.mjs --bundle "$bundle" --json',
  'lock evidence review CLI smoke expected LOCKABLE decision',
  `review.version !== '${CURRENT_VERSION}'`
]) {
  assert.ok(fs.readFileSync(WORKFLOW, 'utf8').includes(token), `workflow must include lock review CLI CI smoke token: ${token}`);
}

for (const token of [
  CURRENT_RELEASE,
  'Review an extracted bundle',
  'Review a ZIP bundle directly',
  'Emit JSON for automation handoff',
  'Failure example: missing dashboard digest',
  'Failure example: checksum omission',
  'CI smoke expectation',
  'node scripts/lock-evidence-review.mjs --bundle .\\lock-evidence-bundle_1.4.0-alpha.55_<run_id>',
  'node scripts/lock-evidence-review.mjs --bundle .\\lock-evidence-bundle_1.4.0-alpha.55_<run_id>.zip',
  'lock-evidence-review failed: checksum manifest must include dashboard digest file'
]) {
  assert.ok(fs.readFileSync(DOC, 'utf8').includes(token), `operator docs must include token: ${token}`);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'lock-review-cli-ci-smoke-'));
try {
  const bundleDir = createFixtureBundle(tempRoot);
  const textRun = spawnSync(process.execPath, [SCRIPT, '--bundle', bundleDir], { encoding: 'utf8' });
  assert.equal(textRun.status, 0, textRun.stderr || textRun.stdout);
  assert.ok(textRun.stdout.includes('Lock evidence review: LOCKABLE'), 'directory smoke must print lockable decision');
  assert.ok(textRun.stdout.includes('Dashboard digest checksums: present'), 'directory smoke must print checksum coverage');

  const jsonRun = spawnSync(process.execPath, [SCRIPT, '--bundle', bundleDir, '--json'], { encoding: 'utf8' });
  assert.equal(jsonRun.status, 0, jsonRun.stderr || jsonRun.stdout);
  const parsed = JSON.parse(jsonRun.stdout);
  assert.equal(parsed.version, CURRENT_VERSION);
  assert.equal(parsed.lock_decision.reviewer_decision, 'LOCKABLE');
  assert.equal(parsed.checksum_manifest_includes_dashboard_digest, true);

  const zipFile = path.join(tempRoot, `${path.basename(bundleDir)}.zip`);
  createStoredZipFromDirectory(bundleDir, zipFile);
  const zipRun = spawnSync(process.execPath, [SCRIPT, '--bundle', zipFile], { encoding: 'utf8' });
  assert.equal(zipRun.status, 0, zipRun.stderr || zipRun.stdout);
  assert.ok(zipRun.stdout.includes('Lock evidence review: LOCKABLE'), 'ZIP smoke must print lockable decision');

  const brokenBundle = createFixtureBundle(tempRoot, `lock-evidence-bundle_${CURRENT_VERSION}_missing_checksum_fixture`);
  writeChecksums(brokenBundle, { omitDashboardJson: true });
  const brokenRun = spawnSync(process.execPath, [SCRIPT, '--bundle', brokenBundle], { encoding: 'utf8' });
  assert.equal(brokenRun.status, 1, 'missing checksum smoke must fail');
  assert.ok(brokenRun.stderr.includes('checksum manifest must include dashboard digest file'), 'missing checksum smoke must explain failure');
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log('Lock review CLI CI smoke and operator command docs checks passed.');
