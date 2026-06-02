import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.39';
const MODULE = 'src/research/source-to-brief-operator-continuity-console.js';
const CHECK = 'tests/adapter-replay-review-pack-compact-navigation-ux-check.mjs';
const DEPENDENCIES = [
  'src/research/evidence-workspace-ux.js',
  'src/research/operator-command-palette.js',
  'src/research/guided-research-session.js',
  'src/research/brief-template-system.js',
  'src/research/source-to-brief-workbench.js',
  MODULE
];

const sandbox = { console, TextEncoder, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });

const root = sandbox.window.Jarbou3iResearchModules;
const continuity = root.sourceToBriefOperatorContinuityConsole;
assert.ok(continuity, 'alpha.38 continuity console must remain available after compact-navigation UX closure');
assert.equal(continuity.VERSION, VERSION);
const payload = continuity.buildSourceToBriefOperatorContinuityConsole({ generated_at: '2026-06-01T16:00:00.000Z' });
assert.equal(payload.continuity_console_ready, true);
assert.equal(payload.safe_metadata_only, true);
assert.equal(payload.boundary_flags.network_invocation_allowed, false);
assert.equal(payload.boundary_flags.live_provider_execution_performed, false);
assert.equal(payload.boundary_flags.status_persistence_enabled, false);
assert.equal(payload.boundary_flags.navigation_state_persistence_enabled, false);

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('Source-to-Brief Operator Control Room'), 'index must expose current continuity console title');
assert.ok(index.includes('src="src/research/source-to-brief-operator-continuity-console.js" defer'), 'index must load current continuity console module');
assert.ok(index.includes('data-browser-qa="source-to-brief-operator-continuity-console"'), 'index must expose current continuity console browser QA surface');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must retain compact-navigation closure compatibility check`);
}

console.log('Adapter replay review pack compact navigation UX closure checks passed.');
