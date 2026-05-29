import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const VERSION = '1.4.0-alpha.19';
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

function normalizeRegistryPath(value){
  return String(value || '').replace(/\\/g, '/');
}

assert.equal(registry.ci_gate_registry_version, VERSION);
assert.equal(pkg.version, VERSION);
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must stay compressed after alpha.10');

const requiredGates = ['no-browser','current-no-browser','privacy','source','provider','backend','fixtures','release','browser'];
for (const gateName of requiredGates) assert.ok(registry.gates[gateName], `missing CI gate: ${gateName}`);

const operationalScriptTargets = Object.entries(pkg.scripts)
  .filter(([, command]) => command.includes('ci-gate-runner.mjs'))
  .map(([script, command]) => ({ script, gate: command.trim().split(/\s+/).at(-1) }));
for (const target of operationalScriptTargets) {
  assert.ok(registry.gates[target.gate], `${target.script} points at missing registry gate ${target.gate}`);
}

const allChecks = new Set();
const syntaxMatrixFiles = new Set((registry.syntax_matrix?.files || []).map(normalizeRegistryPath));
assert.ok(syntaxMatrixFiles.has('tests/ci-gate-runner.mjs'), 'syntax matrix must cover CI gate runner');
assert.ok(syntaxMatrixFiles.has('tests/provider-mode-browser.spec.mjs'), 'syntax matrix must cover browser specs');
for (const [gateName, gate] of Object.entries(registry.gates)) {
  for (const collectionName of ['node_checks','syntax_checks','playwright_specs']) {
    const collection = gate[collectionName];
    assert.ok(Array.isArray(collection), `${gateName}.${collectionName} must be an array`);
    assert.equal(new Set(collection).size, collection.length, `${gateName}.${collectionName} must not contain duplicates`);
    for (const file of collection) {
      assert.ok(fs.existsSync(file), `${gateName}.${collectionName} references missing file: ${file}`);
      allChecks.add(normalizeRegistryPath(file));
    }
  }
}

for (const requiredCheck of [
  'tests/fixture-payload-budget-check.mjs',
  'tests/test-organization-audit-check.mjs',
  'tests/ci-gate-registry-check.mjs',
  'tests/fixture-registry-consolidation-check.mjs',
  'tests/test-matrix-runtime-optimization-check.mjs',
  'tests/release-doc-timeline-pruning-check.mjs',
  'tests/syntax-matrix-check.mjs',
  'tests/hosted-evidence-capture-polish-check.mjs',
  'tests/fixture-test-debt-ledger-check.mjs',
  'tests/source-refactor-readiness-audit-check.mjs',
  'tests/language-description-audit-check.mjs'
]) {
  assert.ok(allChecks.has(normalizeRegistryPath(requiredCheck)), `required alpha.10 check is not registered in CI gate registry: ${requiredCheck}`);
}

const testFiles = fs.readdirSync('tests').filter((name) => /\.(mjs|js)$/.test(name)).map((name) => normalizeRegistryPath(path.join('tests', name)));
const unregisteredCheckFiles = testFiles
  .filter((file) => !file.endsWith('.spec.mjs') && !file.endsWith('.spec.js'))
  .filter((file) => file.endsWith('-check.mjs'))
  .filter((file) => !allChecks.has(file));
assert.deepEqual(unregisteredCheckFiles, [], `unregistered check files: ${unregisteredCheckFiles.join(', ')}`);

const legacyVersionScripts = Object.keys(pkg.scripts).filter((name) => /^test:v\d/.test(name) || name.includes('alpha'));
assert.deepEqual(legacyVersionScripts, [], `legacy version-specific package scripts must stay removed: ${legacyVersionScripts.join(', ')}`);

console.log('Test organization audit checks passed.');
process.exit(0);
