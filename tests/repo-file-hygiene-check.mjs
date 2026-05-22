import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';

const repoRoot = process.cwd();
const exists = (relativePath) => fs.existsSync(path.join(repoRoot, relativePath));
const posix = (value) => value.split(path.sep).join('/');

const readDirSafe = (dir) => {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    return [];
  }
};

const walk = (dir, base = '') => {
  const entries = [];
  for (const entry of readDirSafe(path.join(repoRoot, dir))) {
    const relative = posix(path.join(base, entry.name));
    if (relative === '.git' || relative === 'node_modules') continue;
    if (entry.isDirectory()) {
      entries.push({ type: 'dir', path: relative });
      entries.push(...walk(path.join(dir, entry.name), relative));
    } else if (entry.isFile()) {
      entries.push({ type: 'file', path: relative });
    } else {
      entries.push({ type: 'special', path: relative });
    }
  }
  return entries;
};

const allEntries = walk('.');
const allPaths = new Set(allEntries.map((entry) => entry.path));
const trackedPaths = (() => {
  try {
    return new Set(execSync('git ls-files', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean));
  } catch (error) {
    return new Set();
  }
})();

const requiredDeletes = [
  {
    path: 'docs/v1.0.5-browser-qa-visual-regression-hardening.md',
    reason: 'misnamed duplicate of the v1.0.4 browser QA / visual regression document'
  },
  {
    path: 'scripts/XXKuyryP',
    reason: 'orphan temporary script artifact'
  },
  {
    path: 'src/XXSyA2D3',
    reason: 'orphan temporary source artifact'
  },
  {
    path: 'src/XXvKXvVS',
    reason: 'orphan temporary source artifact'
  }
];

const generatedRootNames = [
  'dist',
  'build',
  'coverage',
  'playwright-report',
  'test-results',
  '.nyc_output'
];

const forbiddenSecretFiles = [
  '.env',
  '.env.local',
  '.env.production',
  '.env.development',
  'backend/.dev.vars',
  'backend/.dev.vars.local'
];

const failures = [];
for (const item of requiredDeletes) {
  if (exists(item.path)) failures.push(`DELETE ${item.path} — ${item.reason}`);
}

for (const name of generatedRootNames) {
  if (exists(name)) failures.push(`DELETE ${name}/ — generated dependency/build/test output must not be committed`);
}
if ([...trackedPaths].some((file) => file === 'node_modules' || file.startsWith('node_modules/'))) {
  failures.push('DELETE node_modules/ — generated dependency output must not be committed');
}

for (const file of forbiddenSecretFiles) {
  if (exists(file)) failures.push(`DELETE ${file} — local secret/config file must not be committed`);
}

for (const entry of allEntries) {
  if (entry.type === 'special') failures.push(`DELETE ${entry.path} — special filesystem entry is not release-safe`);
  if (entry.type === 'file' && entry.path.endsWith('.zip')) failures.push(`DELETE ${entry.path} — release archives must stay outside the committed repo`);
  if (entry.type === 'file' && /(^|\/)Thumbs\.db$|(^|\/)\.DS_Store$/.test(entry.path)) failures.push(`DELETE ${entry.path} — OS metadata file`);
  if (entry.type === 'file' && /(^|\/).*\.tmp$/.test(entry.path)) failures.push(`DELETE ${entry.path} — temporary file`);
  if (entry.type === 'file' && /(^|\/).*\.log$/.test(entry.path)) failures.push(`DELETE ${entry.path} — log file`);
  if (entry.type === 'file' && /(^|\/)[A-Za-z]*XX[A-Za-z0-9_-]*$/.test(entry.path)) failures.push(`DELETE ${entry.path} — temporary XX* artifact`);
}

const expectedReleaseDocs = [
  'docs/v0.16.0-beta-provider-browser-privacy-qa.md',
  'docs/v0.17.0-beta-state-migration.md',
  'docs/v0.18.0-beta-module-split.md',
  'docs/v0.19.0-beta-privacy-audit-hardening.md',
  'docs/v0.20.0-beta-ux-reliability-pass.md',
  'docs/v0.21.0-beta-project-workspace.md',
  'docs/v0.22.0-beta-analysis-template-system.md',
  'docs/v0.23.0-beta-advanced-quality-gate-v3.md',
  'docs/v0.24.0-beta-export-pack-v2.md',
  'docs/v0.25.0-beta-real-backend-provider-hardening.md',
  'docs/v0.26.0-beta-real-source-connector-prototype.md',
  'docs/v0.27.0-beta-web-search-provider-abstraction.md',
  'docs/v0.28.0-beta-real-portable-oauth-spike.md',
  'docs/v0.29.0-rc.1-release-candidate-freeze.md',
  'docs/v1.0.0-ci-browser-validation.md',
  'docs/v1.0.0-public-beta-stable-research-engine.md',
  'docs/v1.0.1-patch-only-stabilization.md',
  'docs/v1.0.2-ux-stabilization-patch.md',
  'docs/v1.0.3-screen-discipline-patch.md',
  'docs/v1.0.4-browser-qa-visual-regression-hardening.md',
  'docs/v1.0.5-onboarding-first-run-success.md',
  'docs/v1.0.6-documentation-release-packaging-cleanup.md',
  'docs/repo-cleanup-audit-v1.0.6.md',
  'docs/v1.0.7-public-demo-readiness-release-notes.md',
  'docs/v1.0.8-hosted-demo-deployment-browser-evidence.md',
  'docs/v1.0.9-hosted-demo-smoke-fixes-evidence-review.md',
  'docs/v1.0.10-hosted-url-ci-artifact-review-module-type-warning-fix.md',
  'docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md',
  'docs/v1.0.12-research-source-strategy-blueprint.md',
  'docs/v1.0.13-manual-source-packet-import.md',
  'docs/v1.0.14-evidence-scoring-v1.md',
  'docs/v1.0.15-evidence-scoring-ui-calibration.md',
  'docs/v1.0.16-source-packet-builder-ui-scoring-review-controls.md',
  'docs/v1.0.17-source-packet-builder-browser-qa-ux-tightening.md',
  'docs/v1.0.18-source-packet-builder-export-roundtrip-qa.md',
  'docs/v1.0.19-source-packet-template-presets.md',
  'docs/v1.0.20-source-packet-template-browser-qa-copy-safety.md',
  'docs/v1.0.21-node-24-ci-compatibility.md',
  'docs/v1.0.22-release-evidence-repo-hygiene-verification.md',
  'docs/v1.0.23-ci-result-review-browser-evidence-artifact-audit.md',
  'docs/v1.0.24-repo-hygiene-execution-stale-documentation-correction.md',
  'docs/v1.0.25-public-demo-release-lock.md',
  'docs/v1.0.26-release-apply-integrity-gate.md',
  'docs/v1.0.27-release-provenance-ledger-gate.md',
  'docs/v1.0.28-hosted-demo-evidence-manifest-gate.md',
  'docs/v1.0.29-final-public-demo-hardening-release-freeze-audit.md',
  'docs/v1.0.30-mobile-header-geometry-lock-final-public-demo-visual-freeze.md',
  'docs/v1.1.0-alpha.1-post-freeze-product-expansion-planning-gate.md',
  'docs/v1.1.0-alpha.2-expansion-lane-acceptance-criteria-matrix.md',
  'docs/v1.1.0-alpha.4-migration-privacy-fixture-registry-consolidation.md',
  'docs/v1.1.0-alpha.22-evidence-pack-export-v3-brief-traceability.md'
];

const actualReleaseDocs = [...allPaths]
  .filter((file) => /^docs\/v\d+\.\d+\.\d+/.test(file))
  .sort();

for (const expected of expectedReleaseDocs) {
  if (!releaseDocExists(expected)) failures.push(`RESTORE ${expected} — expected release-history entry missing`);
}

const unexpectedReleaseDocs = actualReleaseDocs.filter((file) => !expectedReleaseDocs.includes(file));
for (const file of unexpectedReleaseDocs) failures.push(`REVIEW ${file} — unexpected standalone versioned release document`);

if (actualReleaseDocs.length !== 0) {
  failures.push(`MERGE ${actualReleaseDocs.length} standalone versioned release docs into docs/release-history.md`);
}

if (failures.length) {
  console.error('Repository file hygiene check failed. Required actions:');
  for (const failure of failures) console.error(`- ${failure}`);
  assert.fail(`${failures.length} repository hygiene issue(s) found`);
}

console.log('Repository file hygiene checks passed.');
process.exit(0);
