import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const VERSION = '1.1.0-rc.2-fix.2';
const RELEASE = 'v1.1.0-rc.2-fix.2 — Evidence Matrix + Canonical Bundle Validation';
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const ciNoBrowser = fs.readFileSync('scripts/ci-no-browser.sh', 'utf8');
const ciBrowser = fs.readFileSync('scripts/ci-browser.sh', 'utf8');

assert.equal(pkg.version, VERSION);
assert.equal(registry.ci_gate_registry_version, VERSION);
assert.equal(registry.release_title, RELEASE);
assert.equal(registry.registry_type, 'ci_gate_registry');
assert.equal(registry.runtime_capability_change, false);
assert.equal(registry.provider_behavior_changed, false);
assert.equal(registry.oauth_behavior_changed, false);
assert.equal(registry.backend_behavior_changed, false);
assert.equal(registry.source_behavior_changed, false);
assert.equal(registry.storage_behavior_changed, false);

const expectedScripts = [
    'test',
  'test:qa',
  'test:ci',
  'test:ci:no-browser',
  'test:ci:browser',
  'test:current:no-browser',
  'test:browser',
  'test:browser:provider',
  'test:browser:layout',
  'test:browser:visual',
  'test:privacy',
  'test:source',
  'test:provider',
  'test:backend',
  'test:fixtures',
  'test:release',
  'dev:doctor',
  'dev:baseline',
  'dev:impact',
  'dev:handoff'
];

assert.deepEqual(Object.keys(pkg.scripts).sort(), expectedScripts.slice().sort(), 'package script surface must stay compressed and operational');
for (const script of expectedScripts) assert.ok(pkg.scripts[script], `missing package script ${script}`);
assert.equal(Object.keys(pkg.scripts).some((script) => /^test:v[0-9]/.test(script)), false, 'historical numeric version scripts must remain removed');
assert.equal(Object.keys(pkg.scripts).some((script) => /^(test:patch|test:stable|test:repo:|test:hosted-demo|test:source:packet|test:evidence:|test:ci:node24|test:release:)/.test(script)), false, 'one-off historical aliases must stay out of package.json');

for (const target of registry.package_script_surface_target) {
  assert.ok(pkg.scripts[target], `registry target script missing from package.json: ${target}`);
}

for (const [name, gate] of Object.entries(registry.gates)) {
  assert.ok(gate.description, `gate ${name} missing description`);
  for (const file of [...(gate.node_checks || []), ...(gate.syntax_checks || [])]) {
    assert.ok(fs.existsSync(file), `gate ${name} references missing file: ${file}`);
  }
  for (const spec of gate.playwright_specs || []) {
    assert.ok(fs.existsSync(spec), `gate ${name} references missing browser spec: ${spec}`);
  }
}

for (const requiredGate of ['no-browser','browser','current-no-browser','privacy','source','provider','backend','fixtures','release']) {
  assert.ok(registry.gates[requiredGate], `missing registry gate: ${requiredGate}`);
}

assert.ok(registry.gates['no-browser'].node_checks.includes('tests/ci-gate-registry-check.mjs'), 'full no-browser gate must run CI gate registry check');
assert.equal(registry.gates['no-browser'].syntax_checks.length, 0, 'full no-browser gate must not keep the old serialized syntax tail');
assert.ok(registry.gates['no-browser'].node_checks.includes('tests/syntax-matrix-check.mjs'), 'full no-browser gate must run parallel syntax matrix check');
assert.ok(registry.syntax_matrix.files.includes('tests/ci-gate-runner.mjs'), 'syntax matrix must preserve CI gate runner syntax coverage');
assert.ok(registry.gates.browser.playwright_specs.includes('tests/hosted-demo-browser-evidence.spec.mjs'), 'browser gate must preserve hosted-demo evidence capture');
assert.ok(registry.gates.browser.playwright_specs.includes('tests/browser-visual-regression.spec.mjs'), 'browser gate must preserve visual regression capture');
assert.ok(registry.gates.browser.playwright_specs.includes('tests/provider-mode-browser.spec.mjs'), 'browser gate must preserve provider-mode browser QA');

assert.ok(ciNoBrowser.includes('node tests/ci-gate-runner.mjs no-browser'), 'no-browser shell wrapper must delegate to CI gate registry runner');
assert.equal(ciNoBrowser.includes('run_node tests/'), false, 'no-browser shell wrapper must no longer duplicate registry composition');
assert.ok(ciBrowser.includes('node tests/ci-gate-runner.mjs browser'), 'browser shell wrapper must delegate to CI gate registry runner');
assert.ok(ciBrowser.includes('HOSTED_DEMO_EVIDENCE_DIR'), 'browser shell wrapper must preserve hosted evidence directory setup');
assert.equal(ciBrowser.includes('npm run test:browser:evidence'), false, 'browser shell wrapper must no longer depend on removed package aliases');

for (const file of ['tests/ci-gate-runner.mjs', 'tests/ci-gate-registry-check.mjs', 'tests/syntax-matrix-check.mjs', 'tests/test-matrix-runtime-optimization-check.mjs', 'tests/release-doc-timeline-pruning-check.mjs', 'tests/hosted-evidence-capture-polish-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax check failed`);
}

console.log('CI gate registry and package script compression checks passed.');
process.exit(0);
