#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RELEASE_LOCK_DASHBOARD_DIGEST_CONTRACT = Object.freeze({
  version: 1,
  json: 'release-lock-dashboard-digest.json',
  markdown: 'release-lock-dashboard-digest.md'
});

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function optionalJson(file, fallback = null) {
  return fs.existsSync(file) ? readJson(file) : fallback;
}

function readText(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function normalizeStatus(value) {
  const normalized = String(value || '').toLowerCase();
  if (['passed', 'pass', 'green', 'true'].includes(normalized)) return 'passed';
  if (['failed', 'fail', 'red', 'false'].includes(normalized)) return 'failed';
  return normalized || 'unknown';
}

function parseGateLog(text, gateName) {
  const timing = text.match(/CI gate timing summary:\s*checks=(\d+)\s+total_ms=(\d+)/);
  const passed = text.includes(`CI gate passed: ${gateName}`);
  return {
    status: passed ? 'passed' : 'unknown',
    checks: timing ? Number(timing[1]) : null,
    total_ms: timing ? Number(timing[2]) : null,
    pass_marker_present: passed
  };
}

function countChecksumRows(bundleDir) {
  const checksumFile = path.join(bundleDir, 'checksums', 'SHA256SUMS.txt');
  if (!fs.existsSync(checksumFile)) return null;
  return fs.readFileSync(checksumFile, 'utf8').split(/\r?\n/).filter(Boolean).length;
}

function loadTargetedRegionSummary(bundleDir) {
  const manifest = optionalJson(path.join(bundleDir, 'hosted-demo-evidence', 'targeted-region-evidence-manifest.json'), {});
  const regions = Array.isArray(manifest.regions) ? manifest.regions : [];
  return {
    required_count: Number(manifest.required_region_count ?? 0),
    actual_count: Number(manifest.targeted_region_count ?? regions.length),
    passed_count: regions.filter((region) => region.passed === true || region.region_validation_passed === true).length || (manifest.all_targeted_regions_visible === true && manifest.all_targeted_regions_have_expected_tokens === true ? Number(manifest.targeted_region_count ?? 0) : 0),
    all_visible: manifest.all_targeted_regions_visible === true,
    all_tokens_found: manifest.all_targeted_region_tokens_found === true || manifest.all_targeted_regions_have_expected_tokens === true,
    locator_screenshot_required: manifest.locator_screenshot_required === true,
    full_page_only_proof_allowed: manifest.full_page_only_proof_allowed === true
  };
}

export function buildReleaseLockDashboardDigest(bundleDir) {
  const evidenceManifest = readJson(path.join(bundleDir, 'evidence-manifest.json'));
  const workflowRun = optionalJson(path.join(bundleDir, 'ci', 'workflow-run.json'), {});
  const testSummary = optionalJson(path.join(bundleDir, 'ci', 'test-summary.json'), {});
  const packageVersion = optionalJson(path.join(bundleDir, 'ci', 'package-version.json'), {});
  const noBrowserLog = parseGateLog(readText(path.join(bundleDir, 'logs', 'no-browser.log')), 'no-browser');
  const browserLog = parseGateLog(readText(path.join(bundleDir, 'logs', 'browser.log')), 'browser');
  const targetedRegions = loadTargetedRegionSummary(bundleDir);
  const identityGuard = evidenceManifest.artifact_identity_guard || {};
  const hostedDemo = evidenceManifest.hosted_demo || {};
  const matrix = evidenceManifest.evidence_matrix || {};
  const bundleValidation = evidenceManifest.bundle_validation || {};
  const exportsSummary = evidenceManifest.exports || {};

  const noBrowserStatus = normalizeStatus(evidenceManifest.no_browser?.status || noBrowserLog.status);
  const browserStatus = normalizeStatus(evidenceManifest.browser?.status || browserLog.status);
  const matrixPassed = Number(matrix.passed_rows ?? 0);
  const matrixExpected = Number(matrix.expected_rows ?? 0);
  const hostedCaptureCount = Number(hostedDemo.capture_count ?? 0);
  const staleVersionResidueDetected = bundleValidation.stale_version_residue_detected === true || matrix.stale_version_residue_detected === true;
  const lockable = bundleValidation.lockable === true && noBrowserStatus === 'passed' && browserStatus === 'passed' && staleVersionResidueDetected === false;

  return {
    release_lock_dashboard_digest_version: RELEASE_LOCK_DASHBOARD_DIGEST_CONTRACT.version,
    generated_from: 'lock-evidence-bundle',
    generated_at: new Date().toISOString(),
    release: evidenceManifest.release,
    version: evidenceManifest.version || packageVersion.version,
    public_version_label: evidenceManifest.public_version_label || packageVersion.public_version_label,
    identity: {
      commit_sha: evidenceManifest.commit_sha || workflowRun.commit_sha,
      ref_name: evidenceManifest.branch || workflowRun.branch,
      run_id: evidenceManifest.run_id || workflowRun.run_id,
      run_attempt: evidenceManifest.run_attempt || workflowRun.run_attempt,
      bundle_name: evidenceManifest.bundle_name || path.basename(bundleDir)
    },
    gates: {
      no_browser: {
        status: noBrowserStatus,
        checks: noBrowserLog.checks,
        total_ms: noBrowserLog.total_ms,
        pass_marker_present: noBrowserLog.pass_marker_present,
        log_file: evidenceManifest.no_browser?.log_file || 'logs/no-browser.log'
      },
      browser: {
        status: browserStatus,
        checks: browserLog.checks,
        total_ms: browserLog.total_ms,
        pass_marker_present: browserLog.pass_marker_present,
        log_file: evidenceManifest.browser?.log_file || 'logs/browser.log'
      }
    },
    evidence: {
      artifact_identity_guard: {
        status: normalizeStatus(identityGuard.status),
        required_identity_count: Number(identityGuard.required_identity_count ?? testSummary.artifact_identity_count ?? 0),
        verified_identity_count: Number(identityGuard.verified_identity_count ?? testSummary.artifact_identity_count ?? 0)
      },
      hosted_demo: {
        capture_count: hostedCaptureCount,
        all_required_captures_present: hostedDemo.all_required_captures_present === true,
        max_horizontal_overflow_px: Number(hostedDemo.max_horizontal_overflow_px ?? matrix.horizontal_overflow_max_px ?? 0),
        all_visual_artifact_guards_passed: hostedDemo.all_visual_artifact_guards_passed === true
      },
      evidence_matrix: {
        expected_rows: matrixExpected,
        actual_rows: Number(matrix.actual_rows ?? 0),
        passed_rows: matrixPassed,
        failed_rows: Number(matrix.failed_rows ?? 0),
        languages: Array.isArray(matrix.languages) ? matrix.languages : [],
        surface_count: Number(matrix.surface_count ?? 0),
        language_purity_passed: matrix.language_purity_passed === true,
        visual_guard_passed: matrix.visual_guard_passed === true,
        stale_version_residue_detected: matrix.stale_version_residue_detected === true
      },
      targeted_regions: targetedRegions,
      exports: {
        export_pack_v3_valid: exportsSummary.export_pack_v3_valid === true,
        golden_workflow_valid: exportsSummary.golden_workflow_valid === true,
        publication_review_valid: exportsSummary.publication_review_valid === true
      },
      checksum_rows: countChecksumRows(bundleDir)
    },
    lock_decision: {
      lockable,
      stale_version_residue_detected: staleVersionResidueDetected,
      status: lockable ? 'lockable' : 'blocked',
      reviewer_decision: lockable ? 'LOCKABLE' : 'BLOCKED'
    },
    reviewer_checklist: [
      `no-browser gate: ${noBrowserStatus}${noBrowserLog.checks ? ` (${noBrowserLog.checks} checks)` : ''}`,
      `browser gate: ${browserStatus}${browserLog.checks ? ` (${browserLog.checks} checks)` : ''}`,
      `artifact identity guard: ${normalizeStatus(identityGuard.status)} (${Number(identityGuard.verified_identity_count ?? 0)}/${Number(identityGuard.required_identity_count ?? 0)})`,
      `evidence matrix: ${matrixPassed}/${matrixExpected} rows passed`,
      `hosted demo captures: ${hostedCaptureCount}/4 required root captures`,
      `targeted regions: ${targetedRegions.passed_count}/${targetedRegions.required_count || targetedRegions.actual_count} regions passed`,
      `stale version residue: ${staleVersionResidueDetected ? 'detected' : 'false'}`,
      `lock decision: ${lockable ? 'LOCKABLE' : 'BLOCKED'}`
    ]
  };
}

export function renderReleaseLockDashboardMarkdown(digest) {
  const matrix = digest.evidence.evidence_matrix;
  const targeted = digest.evidence.targeted_regions;
  const hosted = digest.evidence.hosted_demo;
  const identities = digest.evidence.artifact_identity_guard;
  return [
    `# Release Lock Dashboard — ${digest.release}`,
    '',
    `- Version: \`${digest.version}\``,
    `- Public label: \`${digest.public_version_label}\``,
    `- Commit: \`${digest.identity.commit_sha}\``,
    `- Ref: \`${digest.identity.ref_name}\``,
    `- Run: \`${digest.identity.run_id}\` attempt \`${digest.identity.run_attempt}\``,
    `- Reviewer decision: **${digest.lock_decision.reviewer_decision}**`,
    '',
    '## Gate status',
    '',
    `- no-browser: \`${digest.gates.no_browser.status}\` (${digest.gates.no_browser.checks ?? 'unknown'} checks)`,
    `- browser: \`${digest.gates.browser.status}\` (${digest.gates.browser.checks ?? 'unknown'} checks)`,
    '',
    '## Evidence digest',
    '',
    `- Artifact identity guard: \`${identities.status}\` (${identities.verified_identity_count}/${identities.required_identity_count})`,
    `- Evidence matrix: \`${matrix.passed_rows}/${matrix.expected_rows}\` rows passed`,
    `- Hosted root captures: \`${hosted.capture_count}/4\``,
    `- Targeted regions: \`${targeted.passed_count}/${targeted.required_count || targeted.actual_count}\``,
    `- Max horizontal overflow: \`${hosted.max_horizontal_overflow_px}px\``,
    `- Stale version residue: \`${digest.lock_decision.stale_version_residue_detected}\``,
    `- Lockable: \`${digest.lock_decision.lockable}\``,
    '',
    '## Reviewer checklist',
    '',
    ...digest.reviewer_checklist.map((item) => `- ${item}`),
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

function defaultOutputDir(bundleDir) {
  const safeName = path.basename(path.resolve(bundleDir)).replace(/[^A-Za-z0-9._-]+/g, '-');
  return path.join(os.tmpdir(), 'jarbou3i-release-lock-dashboard-digest', safeName);
}

export function writeReleaseLockDashboardDigest(bundleDir, outputDir = defaultOutputDir(bundleDir)) {
  const digest = buildReleaseLockDashboardDigest(bundleDir);
  ensureDir(outputDir);
  const jsonPath = path.join(outputDir, RELEASE_LOCK_DASHBOARD_DIGEST_CONTRACT.json);
  const markdownPath = path.join(outputDir, RELEASE_LOCK_DASHBOARD_DIGEST_CONTRACT.markdown);
  writeJson(jsonPath, digest);
  fs.writeFileSync(markdownPath, renderReleaseLockDashboardMarkdown(digest));
  return { digest, jsonPath, markdownPath };
}

function isCliEntrypoint() {
  if (!process.argv[1]) return false;
  return path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
}

if (isCliEntrypoint()) {
  const bundleDir = readArg('--bundle-dir') || process.env.RELEASE_LOCK_DASHBOARD_BUNDLE_DIR;
  if (!bundleDir) {
    console.error('release-lock-dashboard-digest failed: missing --bundle-dir');
    process.exit(1);
  }
  const outputDir = readArg('--output-dir') || process.env.RELEASE_LOCK_DASHBOARD_OUTPUT_DIR || defaultOutputDir(bundleDir);
  try {
    const result = writeReleaseLockDashboardDigest(bundleDir, outputDir);
    console.log(`Release lock dashboard digest written: ${result.jsonPath}`);
    console.log(`Release lock dashboard markdown written: ${result.markdownPath}`);
    console.log(`Reviewer decision: ${result.digest.lock_decision.reviewer_decision}`);
  } catch (error) {
    console.error(`release-lock-dashboard-digest failed: ${error.message}`);
    process.exit(1);
  }
}
