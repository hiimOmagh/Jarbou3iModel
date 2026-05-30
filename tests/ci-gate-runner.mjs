import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const requestedArgs = process.argv.slice(2);
const requestedGate = requestedArgs.find((arg) => registry.gates?.[arg]) || requestedArgs[0] || 'no-browser';
const gate = registry.gates?.[requestedGate];

if (!gate) {
  console.error(`Unknown CI gate: ${requestedGate}`);
  console.error(`Available gates: ${Object.keys(registry.gates || {}).join(', ')}`);
  process.exit(2);
}

const timeoutSeconds = Number.parseInt(process.env.CI_NODE_TEST_TIMEOUT_SECONDS || '60', 10);
const timeoutMs = Number.isFinite(timeoutSeconds) && timeoutSeconds > 0 ? timeoutSeconds * 1000 : 60000;
const timings = [];
function buildPlaywrightInvocation() {
  const localCli = path.join('node_modules', 'playwright', 'cli.js');
  if (fs.existsSync(localCli)) {
    return {
      command: process.execPath,
      argsPrefix: [localCli]
    };
  }

  const localBinary = process.platform === 'win32'
    ? path.join('node_modules', '.bin', 'playwright.cmd')
    : './node_modules/.bin/playwright';

  return {
    command: localBinary,
    argsPrefix: []
  };
}

const playwrightInvocation = buildPlaywrightInvocation();

function run(command, args, options = {}) {
  const rendered = [command, ...args].join(' ');
  const startedAt = Date.now();
  console.log(`RUN ${rendered}`);
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env: process.env,
    timeout: options.timeout ?? timeoutMs
  });
  const durationMs = Date.now() - startedAt;
  timings.push({ command: rendered, durationMs });
  if (result.error) {
    console.error(`Failed while running ${rendered}: ${result.error.message}`);
    printTimingSummary();
    process.exit(1);
  }
  if (result.status !== 0) {
    printTimingSummary();
    process.exit(result.status || 1);
  }
}

function printTimingSummary() {
  if (!timings.length) return;
  const totalMs = timings.reduce((sum, item) => sum + item.durationMs, 0);
  const slowest = timings.slice().sort((a, b) => b.durationMs - a.durationMs).slice(0, 5);
  console.log(`CI gate timing summary: checks=${timings.length} total_ms=${totalMs}`);
  for (const item of slowest) {
    console.log(`CI gate slowest: duration_ms=${item.durationMs} command=${item.command}`);
  }
}

console.log(`CI gate: ${requestedGate}`);
console.log(`Registry: ${registry.release_title}`);
if (registry.runtime_optimization?.version) {
  console.log(`Runtime optimization: ${registry.runtime_optimization.version} ${registry.runtime_optimization.optimization_scope}`);
}

for (const file of gate.node_checks || []) {
  run(process.execPath, [file]);
}

for (const file of gate.syntax_checks || []) {
  run(process.execPath, ['--check', file]);
}

for (const spec of gate.playwright_specs || []) {
  run(playwrightInvocation.command, [...playwrightInvocation.argsPrefix, 'test', spec], { timeout: 0 });
}

printTimingSummary();
console.log(`CI gate passed: ${requestedGate}`);
process.exit(0);
