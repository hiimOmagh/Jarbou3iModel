import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CURRENT_RELEASE } from './current-release-identity.mjs';

const CHECK = 'tests/bulk-current-no-browser-diagnosis-check.mjs';
const source = fs.readFileSync(CHECK, 'utf8');

for (const token of [
  'DIAGNOSIS_ARTIFACT_ROOTS_FORBIDDEN_IN_REPO',
  'jarbou3i-diagnosis-artifacts',
  '--write-static-artifacts',
  '--allow-repo-artifact-dir',
  'WRITE_BULK_DIAGNOSIS_STATIC_ARTIFACTS',
  'ALLOW_REPO_DIAGNOSIS_ARTIFACT_DIR',
  'Bulk diagnosis artifact export skipped in static mode',
  'validateArtifactOutputDir'
]) {
  assert.ok(source.includes(token), `${CHECK} must encode lifecycle guard token: ${token}`);
}

function runBulk(args = [], env = {}) {
  return spawnSync(process.execPath, [CHECK, ...args], {
    encoding: 'utf8',
    env: {
      ...process.env,
      ...env
    }
  });
}

fs.rmSync('dist', { recursive: true, force: true });

const leakedEnvStaticRun = runBulk([], {
  WRITE_BULK_DIAGNOSIS_ARTIFACTS: '1',
  BULK_DIAGNOSIS_ARTIFACT_DIR: path.join(process.cwd(), 'dist', 'diagnosis')
});

assert.equal(leakedEnvStaticRun.status, 0, 'static diagnosis check must stay green when artifact-export env leaks into no-browser');
assert.ok(leakedEnvStaticRun.stdout.includes('artifact export skipped in static mode'), 'static run must explain skipped artifact export');
assert.equal(fs.existsSync('dist'), false, 'static diagnosis check must not create dist/ from leaked artifact env');

const unsafeRepoOutputRun = runBulk([
  '--fixture-failure-report',
  '--fixture-exit-zero',
  '--write-artifacts',
  '--artifact-dir',
  path.join(process.cwd(), 'dist', 'diagnosis')
]);

assert.notEqual(unsafeRepoOutputRun.status, 0, 'fixture export must reject repo-root generated output directories by default');
assert.ok(
  `${unsafeRepoOutputRun.stdout}\n${unsafeRepoOutputRun.stderr}`.includes('Unsafe diagnosis artifact output directory'),
  'unsafe repo output rejection must explain the lifecycle boundary'
);
assert.equal(fs.existsSync('dist'), false, 'unsafe artifact output rejection must not create dist/');

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jarbou3i-diagnosis-lifecycle-'));
const safeArtifactDir = path.join(tempRoot, 'diagnosis');
const safeFixtureRun = runBulk([
  '--fixture-failure-report',
  '--fixture-exit-zero',
  '--write-artifacts',
  '--artifact-dir',
  safeArtifactDir
]);

assert.equal(safeFixtureRun.status, 0, 'fixture export must succeed when artifact directory is outside repo');
for (const file of [
  'bulk-current-no-browser-diagnosis-report.json',
  'operator-handoff-snapshot.md',
  'diagnosis-artifact-manifest.json'
]) {
  assert.ok(fs.existsSync(path.join(safeArtifactDir, file)), `safe fixture export must write ${file}`);
}

const defaultOutputRun = runBulk([
  '--fixture-failure-report',
  '--fixture-exit-zero',
  '--write-artifacts'
]);
assert.equal(defaultOutputRun.status, 0, 'default artifact export must use a safe external temp directory');
assert.equal(fs.existsSync('dist'), false, 'default artifact export must not create dist/');

fs.rmSync(tempRoot, { recursive: true, force: true });
fs.rmSync(path.join(os.tmpdir(), 'jarbou3i-diagnosis-artifacts'), { recursive: true, force: true });
fs.rmSync('dist', { recursive: true, force: true });

console.log(`Diagnosis artifact lifecycle guard checks passed for ${CURRENT_RELEASE}.`);
