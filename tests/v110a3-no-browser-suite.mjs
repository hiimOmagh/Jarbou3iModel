import { spawnSync } from 'node:child_process';

const commands = [
  ['node', ['tests/repository-consolidation-audit-check.mjs']],
  ['node', ['tests/post-freeze-planning-gate-check.mjs']],
  ['node', ['tests/expansion-lane-acceptance-matrix-check.mjs']],
  ['node', ['tests/migration-check.mjs']],
  ['node', ['tests/research-workflow-check.mjs']],
  ['node', ['tests/fixtures-check.mjs']],
  ['node', ['tests/privacy-export-check.mjs']],
  ['node', ['tests/release-packaging-cleanup-check.mjs']],
  ['node', ['tests/repo-file-hygiene-check.mjs']],
  ['node', ['tests/repository-hygiene-cleanup-check.mjs']]
];

for (const [cmd, args] of commands) {
  console.log(`RUN ${cmd} ${args.join(' ')}`);
  const result = spawnSync(cmd, args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log('v1.1.0-alpha.4 no-browser consolidation suite passed.');
