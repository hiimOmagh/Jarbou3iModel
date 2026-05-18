import { spawnSync } from 'node:child_process';

const tests = [
  'tests/version-suite-registry-check.mjs',
  'tests/fixture-registry-consolidation-check.mjs',
  'tests/repository-consolidation-audit-check.mjs',
  'tests/repo-file-hygiene-check.mjs',
  'tests/migration-check.mjs'
];

for (const file of tests) {
  console.log(`RUN ${file}`);
  const result = spawnSync(process.execPath, [file], { stdio: 'inherit', env: process.env });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log('v1.1.0-alpha.9 current no-browser suite passed.');
process.exit(0);
