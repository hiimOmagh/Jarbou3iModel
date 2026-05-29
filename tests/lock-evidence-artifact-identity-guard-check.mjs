import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const VERSION = '1.4.0-alpha.13';
const workflow = fs.readFileSync('.github/workflows/ci.yml', 'utf8');
const script = fs.readFileSync('scripts/build-lock-evidence-bundle.mjs', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));

const artifacts = [
  { kind: 'no-browser-lock-evidence-log', job: 'no-browser' },
  { kind: 'playwright-install-deps-log', job: 'browser' },
  { kind: 'playwright-install-log', job: 'browser' },
  { kind: 'browser-lock-evidence-log', job: 'browser' },
  { kind: 'hosted-demo-evidence', job: 'browser' },
  { kind: 'lock-evidence-bundle-decision', job: 'lock-evidence-bundle' }
];

for (const { kind, job } of artifacts) {
  const staticKind = workflow.includes(`\"artifact_kind\": \"${kind}\"`);
  const dynamicBrowserKind = ['playwright-install-deps-log', 'playwright-install-log', 'browser-lock-evidence-log'].includes(kind)
    && workflow.includes('for artifact_kind in playwright-install-deps-log playwright-install-log browser-lock-evidence-log')
    && workflow.includes('\"artifact_kind\": \"${artifact_kind}\"');
  assert.ok(staticKind || dynamicBrowserKind, `workflow must stamp artifact kind ${kind}`);
  assert.ok(workflow.includes(`\"job_name\": \"${job}\"`) || workflow.includes('\"job_name\": \"${job_name}\"'), `workflow must stamp job ${job}`);
  assert.ok(workflow.includes(`${kind}.identity.json`) || (dynamicBrowserKind && workflow.includes('${artifact_kind}.identity.json')), `workflow must upload identity JSON for ${kind}`);
}

for (const field of ['app_version', 'run_id', 'git_sha', 'job_name', 'artifact_kind', 'run_attempt', 'ref_name']) {
  assert.ok(workflow.includes(`\"${field}\"`), `workflow identity stamp missing ${field}`);
}
assert.ok(workflow.includes(`\"app_version\": \"${VERSION}\"`), 'workflow identity stamps must use current app version');
assert.ok(workflow.includes('path: |'), 'multi-file artifact uploads must include log + identity files');
assert.ok(workflow.includes('${{ runner.temp }}/lock-evidence-bundle-diagnostic'), 'decision artifact must upload its identity sidecar with the decision text');

for (const token of [
  'function validateArtifactIdentity',
  'expectedArtifactIdentities',
  'artifact_identity_guard',
  'artifact_identity_guard_present',
  'lock-evidence-bundle.identity.json',
  'ci/artifact-identities',
  'canonical-lock-evidence-bundle'
]) {
  assert.ok(script.includes(token), `bundle script missing identity guard token: ${token}`);
}

for (const { kind, job } of artifacts.filter((artifact) => artifact.kind !== 'lock-evidence-bundle-decision')) {
  assert.ok(script.includes(`artifactKind:'${kind}'`), `bundle script must require ${kind}`);
  assert.ok(script.includes(`jobName:'${job}'`), `bundle script must bind ${kind} to job ${job}`);
}

assert.ok(registry.gates['no-browser'].node_checks.includes('tests/lock-evidence-artifact-identity-guard-check.mjs'));
assert.ok(registry.gates.release.node_checks.includes('tests/lock-evidence-artifact-identity-guard-check.mjs'));
assert.ok(registry.syntax_matrix.files.includes('tests/lock-evidence-artifact-identity-guard-check.mjs'));

for (const file of ['scripts/build-lock-evidence-bundle.mjs', 'tests/lock-evidence-artifact-identity-guard-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax check failed`);
}

console.log('Lock evidence artifact identity guard checks passed.');
process.exit(0);
