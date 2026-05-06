import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const requestedGate = process.argv[2] || 'no-browser';
const gate = registry.gates?.[requestedGate];

if (!gate) {
  console.error(`Unknown CI gate: ${requestedGate}`);
  console.error(`Available gates: ${Object.keys(registry.gates || {}).join(', ')}`);
  process.exit(2);
}

const timeoutSeconds = Number.parseInt(process.env.CI_NODE_TEST_TIMEOUT_SECONDS || '60', 10);
const timeoutMs = Number.isFinite(timeoutSeconds) && timeoutSeconds > 0 ? timeoutSeconds * 1000 : 60000;

function run(command, args, options = {}) {
  const rendered = [command, ...args].join(' ');
  console.log(`RUN ${rendered}`);
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env: process.env,
    timeout: options.timeout ?? timeoutMs
  });
  if (result.error) {
    console.error(`Failed while running ${rendered}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log(`CI gate: ${requestedGate}`);
console.log(`Registry: ${registry.release_title}`);

for (const file of gate.node_checks || []) {
  run(process.execPath, [file]);
}

for (const file of gate.syntax_checks || []) {
  run(process.execPath, ['--check', file]);
}

for (const spec of gate.playwright_specs || []) {
  run('./node_modules/.bin/playwright', ['test', spec], { timeout: 0 });
}

console.log(`CI gate passed: ${requestedGate}`);
process.exit(0);
