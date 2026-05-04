import { spawnSync } from 'node:child_process';

const tests = [
  'tests/lockfile-public-registry-check.mjs',
  'tests/ci-workflow-install-check.mjs',
  'tests/node24-ci-compat-check.mjs',
  'tests/release-evidence-repo-hygiene-check.mjs',
  'tests/ci-result-review-browser-evidence-audit-check.mjs',
  'tests/repo-hygiene-execution-stale-docs-check.mjs',
  'tests/repo-file-hygiene-check.mjs',
  'tests/repository-hygiene-cleanup-check.mjs',
  'tests/release-packaging-cleanup-check.mjs',
  'tests/stable-release-check.mjs',
  'tests/patch-stabilization-check.mjs',
  'tests/public-demo-readiness-check.mjs',
  'tests/hosted-demo-evidence-review-check.mjs',
  'tests/browser-visual-project-scope-check.mjs',
  'tests/source-packet-template-browser-qa-check.mjs',
  'tests/public-demo-release-lock-check.mjs'
];

for (const file of tests) {
  const result = spawnSync(process.execPath, [file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log(`v1.1.0-alpha.2 no-browser suite passed (${tests.length} checks).`);
process.exit(0);
