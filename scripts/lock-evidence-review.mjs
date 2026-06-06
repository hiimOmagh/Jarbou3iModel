#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import {
  RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT,
  validateReleaseLockDashboardDigestSchema,
  validateReleaseLockDashboardMarkdown
} from './release-lock-dashboard-schema-contract.mjs';

export const LOCK_EVIDENCE_REVIEW_CONTRACT = Object.freeze({
  version: 2,
  digest_json: 'release-lock-dashboard/release-lock-dashboard-digest.json',
  digest_markdown: 'release-lock-dashboard/release-lock-dashboard-digest.md',
  checksum_file: 'checksums/SHA256SUMS.txt',
  evidence_manifest: 'evidence-manifest.json'
});

export const LOCK_EVIDENCE_REVIEW_EXIT_CODES = Object.freeze({
  success: 0,
  unexpected_error: 1,
  usage_error: 64,
  input_error: 65,
  bundle_contract_error: 66,
  checksum_contract_error: 67,
  not_lockable: 68
});

export const LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES = Object.freeze({
  usage: 'usage',
  input: 'input',
  bundle_contract: 'bundle_contract',
  checksum_contract: 'checksum_contract',
  lock_decision: 'lock_decision',
  unexpected: 'unexpected'
});

function normalizeBundlePath(value) {
  return String(value || '').replaceAll('\\\\', '/').replaceAll('\\', '/').replace(/^\.\//, '');
}

function readJsonText(text, label) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${label} is not valid JSON: ${error.message}`);
  }
}

function reviewError(message, exitCode, failureFamily, code) {
  const error = new Error(message);
  error.exitCode = exitCode;
  error.failureFamily = failureFamily;
  error.code = code;
  return error;
}

export function classifyLockEvidenceReviewError(error) {
  const message = String(error?.message || error || 'unknown lock evidence review failure');
  if (Number.isInteger(error?.exitCode) && error?.failureFamily) {
    return {
      code: error.code || 'LOCK_EVIDENCE_REVIEW_ERROR',
      exit_code: error.exitCode,
      failure_family: error.failureFamily,
      message
    };
  }
  if (/missing --bundle|usage/i.test(message)) {
    return { code: 'LOCK_EVIDENCE_REVIEW_USAGE', exit_code: LOCK_EVIDENCE_REVIEW_EXIT_CODES.usage_error, failure_family: LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES.usage, message };
  }
  if (/not found|ZIP end-of-central-directory|invalid ZIP|unsupported ZIP|local header|central directory/i.test(message)) {
    return { code: 'LOCK_EVIDENCE_REVIEW_INPUT', exit_code: LOCK_EVIDENCE_REVIEW_EXIT_CODES.input_error, failure_family: LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES.input, message };
  }
  if (/checksum manifest/i.test(message)) {
    return { code: 'LOCK_EVIDENCE_REVIEW_CHECKSUM_CONTRACT', exit_code: LOCK_EVIDENCE_REVIEW_EXIT_CODES.checksum_contract_error, failure_family: LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES.checksum_contract, message };
  }
  if (/release-lock-dashboard|dashboard digest|schema|Markdown|not valid JSON|lock evidence file missing|evidence-manifest/i.test(message)) {
    return { code: 'LOCK_EVIDENCE_REVIEW_BUNDLE_CONTRACT', exit_code: LOCK_EVIDENCE_REVIEW_EXIT_CODES.bundle_contract_error, failure_family: LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES.bundle_contract, message };
  }
  return { code: 'LOCK_EVIDENCE_REVIEW_UNEXPECTED', exit_code: LOCK_EVIDENCE_REVIEW_EXIT_CODES.unexpected_error, failure_family: LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES.unexpected, message };
}

export function formatLockEvidenceReviewError(error) {
  const classified = classifyLockEvidenceReviewError(error);
  return `lock-evidence-review failed [${classified.code}/${classified.failure_family}/exit ${classified.exit_code}]: ${classified.message}`;
}

function findEndOfCentralDirectory(buffer) {
  const signature = 0x06054b50;
  const minOffset = Math.max(0, buffer.length - 0x10000 - 22);
  for (let offset = buffer.length - 22; offset >= minOffset; offset -= 1) {
    if (buffer.readUInt32LE(offset) === signature) return offset;
  }
  throw new Error('ZIP end-of-central-directory record not found');
}

function readZipEntries(zipFile) {
  const buffer = fs.readFileSync(zipFile);
  const end = findEndOfCentralDirectory(buffer);
  const totalEntries = buffer.readUInt16LE(end + 10);
  let centralOffset = buffer.readUInt32LE(end + 16);
  const entries = new Map();

  for (let index = 0; index < totalEntries; index += 1) {
    if (buffer.readUInt32LE(centralOffset) !== 0x02014b50) {
      throw new Error(`invalid ZIP central directory header at offset ${centralOffset}`);
    }
    const method = buffer.readUInt16LE(centralOffset + 10);
    const compressedSize = buffer.readUInt32LE(centralOffset + 20);
    const fileNameLength = buffer.readUInt16LE(centralOffset + 28);
    const extraLength = buffer.readUInt16LE(centralOffset + 30);
    const commentLength = buffer.readUInt16LE(centralOffset + 32);
    const localHeaderOffset = buffer.readUInt32LE(centralOffset + 42);
    const fileName = normalizeBundlePath(buffer.slice(centralOffset + 46, centralOffset + 46 + fileNameLength).toString('utf8'));
    centralOffset += 46 + fileNameLength + extraLength + commentLength;

    if (fileName.endsWith('/')) continue;
    if (buffer.readUInt32LE(localHeaderOffset) !== 0x04034b50) {
      throw new Error(`invalid ZIP local header for ${fileName}`);
    }
    const localNameLength = buffer.readUInt16LE(localHeaderOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localHeaderOffset + 28);
    const dataOffset = localHeaderOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.slice(dataOffset, dataOffset + compressedSize);
    let data;
    if (method === 0) data = compressed;
    else if (method === 8) data = zlib.inflateRawSync(compressed);
    else throw new Error(`unsupported ZIP compression method ${method} for ${fileName}`);
    entries.set(fileName, data.toString('utf8'));
  }
  return entries;
}

function normalizeZipEntryMap(entries) {
  const normalized = new Map();
  for (const [name, value] of entries) {
    const pathName = normalizeBundlePath(name);
    normalized.set(pathName, value);
    const firstSlash = pathName.indexOf('/');
    if (firstSlash > 0) normalized.set(pathName.slice(firstSlash + 1), value);
  }
  return normalized;
}

function createBundleReader(inputPath) {
  const resolved = path.resolve(inputPath);
  if (!fs.existsSync(resolved)) throw reviewError(`lock evidence input not found: ${resolved}`, LOCK_EVIDENCE_REVIEW_EXIT_CODES.input_error, LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES.input, 'LOCK_EVIDENCE_REVIEW_INPUT');
  const stat = fs.statSync(resolved);
  if (stat.isDirectory()) {
    return {
      type: 'directory',
      source: resolved,
      read(relativePath) {
        const file = path.join(resolved, relativePath);
        if (!fs.existsSync(file)) throw new Error(`lock evidence file missing: ${relativePath}`);
        return fs.readFileSync(file, 'utf8');
      }
    };
  }
  const entries = normalizeZipEntryMap(readZipEntries(resolved));
  return {
    type: 'zip',
    source: resolved,
    read(relativePath) {
      const normalized = normalizeBundlePath(relativePath);
      if (!entries.has(normalized)) throw new Error(`lock evidence ZIP entry missing: ${normalized}`);
      return entries.get(normalized);
    }
  };
}

function checksumContains(checksumText, requiredPath) {
  const normalizedRequired = normalizeBundlePath(requiredPath);
  return checksumText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => normalizeBundlePath(line.replace(/^\S+\s+/, '')))
    .includes(normalizedRequired);
}

export function readLockEvidenceReview(inputPath) {
  const reader = createBundleReader(inputPath);
  const evidenceManifest = readJsonText(reader.read(LOCK_EVIDENCE_REVIEW_CONTRACT.evidence_manifest), 'evidence-manifest.json');
  const digest = readJsonText(reader.read(LOCK_EVIDENCE_REVIEW_CONTRACT.digest_json), LOCK_EVIDENCE_REVIEW_CONTRACT.digest_json);
  const markdown = reader.read(LOCK_EVIDENCE_REVIEW_CONTRACT.digest_markdown);
  const checksumText = reader.read(LOCK_EVIDENCE_REVIEW_CONTRACT.checksum_file);

  validateReleaseLockDashboardDigestSchema(digest, {
    expectedVersion: evidenceManifest.version || evidenceManifest.internal_build_version,
    expectedRelease: evidenceManifest.release,
    expectedPublicLabel: evidenceManifest.public_version_label,
    expectedCommitSha: evidenceManifest.commit_sha,
    expectedRefName: evidenceManifest.branch,
    expectedRunId: evidenceManifest.run_id
  });
  validateReleaseLockDashboardMarkdown(markdown, digest);

  for (const required of [LOCK_EVIDENCE_REVIEW_CONTRACT.digest_json, LOCK_EVIDENCE_REVIEW_CONTRACT.digest_markdown]) {
    if (!checksumContains(checksumText, required)) throw new Error(`checksum manifest must include dashboard digest file: ${required}`);
  }

  return {
    review_contract_version: LOCK_EVIDENCE_REVIEW_CONTRACT.version,
    exit_code_contract_version: 1,
    exit_codes: LOCK_EVIDENCE_REVIEW_EXIT_CODES,
    failure_families: LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES,
    source_type: reader.type,
    source: reader.source,
    release: digest.release,
    version: digest.version,
    public_version_label: digest.public_version_label,
    identity: digest.identity,
    gates: digest.gates,
    evidence: digest.evidence,
    lock_decision: digest.lock_decision,
    checksum_manifest_includes_dashboard_digest: true,
    dashboard_schema_contract_version: RELEASE_LOCK_DASHBOARD_SCHEMA_CONTRACT.version,
    next_action: digest.lock_decision.lockable
      ? 'merge to main after branch CI is green, then run post-merge lock evidence'
      : 'inspect failed gates and repair before merge'
  };
}

export function renderLockEvidenceReviewSummary(review) {
  const matrix = review.evidence.evidence_matrix;
  const hosted = review.evidence.hosted_demo;
  const targeted = review.evidence.targeted_regions;
  return [
    `Lock evidence review: ${review.lock_decision.reviewer_decision}`,
    `Release: ${review.release}`,
    `Version: ${review.version}`,
    `Public label: ${review.public_version_label}`,
    `Commit: ${review.identity.commit_sha}`,
    `Ref: ${review.identity.ref_name}`,
    `Run: ${review.identity.run_id} attempt ${review.identity.run_attempt}`,
    `no-browser: ${review.gates.no_browser.status} (${review.gates.no_browser.checks ?? 'unknown'} checks)`,
    `browser: ${review.gates.browser.status} (${review.gates.browser.checks ?? 'unknown'} checks)`,
    `Evidence matrix: ${matrix.passed_rows}/${matrix.expected_rows}`,
    `Hosted captures: ${hosted.capture_count}/4`,
    `Targeted regions: ${targeted.passed_count}/${targeted.required_count || targeted.actual_count}`,
    `Stale version residue: ${review.lock_decision.stale_version_residue_detected}`,
    `Dashboard digest checksums: ${review.checksum_manifest_includes_dashboard_digest ? 'present' : 'missing'}`,
    `Next action: ${review.next_action}`,
    ''
  ].join('\n');
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
  const bundlePath = readArg('--bundle') || readArg('--bundle-dir') || readArg('--bundle-zip') || process.argv.find((arg, index) => index > 1 && !arg.startsWith('--')) || process.env.LOCK_EVIDENCE_REVIEW_BUNDLE;
  const json = process.argv.includes('--json');
  const allowBlocked = process.argv.includes('--allow-blocked');
  if (!bundlePath) {
    const error = reviewError('missing --bundle <zip-or-directory>', LOCK_EVIDENCE_REVIEW_EXIT_CODES.usage_error, LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES.usage, 'LOCK_EVIDENCE_REVIEW_USAGE');
    console.error(formatLockEvidenceReviewError(error));
    process.exit(LOCK_EVIDENCE_REVIEW_EXIT_CODES.usage_error);
  }
  try {
    const review = readLockEvidenceReview(bundlePath);
    if (json) console.log(JSON.stringify(review, null, 2));
    else process.stdout.write(renderLockEvidenceReviewSummary(review));
    if (!allowBlocked && review.lock_decision.lockable !== true) {
      const error = reviewError('lock evidence reviewer decision is BLOCKED; pass --allow-blocked to inspect without failing automation', LOCK_EVIDENCE_REVIEW_EXIT_CODES.not_lockable, LOCK_EVIDENCE_REVIEW_FAILURE_FAMILIES.lock_decision, 'LOCK_EVIDENCE_REVIEW_NOT_LOCKABLE');
      console.error(formatLockEvidenceReviewError(error));
      process.exit(LOCK_EVIDENCE_REVIEW_EXIT_CODES.not_lockable);
    }
  } catch (error) {
    const classified = classifyLockEvidenceReviewError(error);
    console.error(formatLockEvidenceReviewError(error));
    process.exit(classified.exit_code);
  }
}
