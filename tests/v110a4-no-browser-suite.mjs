import { spawnSync } from 'node:child_process';

const commands = [
  ['node', ['tests/fixture-registry-consolidation-check.mjs']],
  ['node', ['tests/migration-check.mjs']],
  ['node', ['tests/privacy-export-check.mjs']],
  ['node', ['tests/privacy-release-gate-check.mjs']],
  ['node', ['tests/repository-consolidation-audit-check.mjs']],
  ['node', ['tests/repo-file-hygiene-check.mjs']]
];

for (const [cmd, args] of commands) {
  const label = `${cmd} ${args.join(' ')}`;
  console.log(`RUN ${label}`);
  const result = spawnSync(cmd, args, { stdio: 'inherit', env: process.env });
  if (result.status !== 0) {
    console.error(`FAIL ${label}`);
    process.exit(result.status || 1);
  }
}

console.log('v1.1.0-alpha.4 no-browser fixture registry consolidation suite passed.');
process.exit(0);
