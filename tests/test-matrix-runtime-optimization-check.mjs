import assert from 'node:assert/strict';
import fs from 'node:fs';

const VERSION = '1.1.0-alpha.9';
const TITLE = 'Test Matrix Runtime Optimization + Release Doc Timeline Pruning';
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const runner = fs.readFileSync('tests/ci-gate-runner.mjs', 'utf8');
const syntaxMatrix = fs.readFileSync('tests/syntax-matrix-check.mjs', 'utf8');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

assert.equal(pkg.version, VERSION);
assert.equal(registry.ci_gate_registry_version, VERSION);
assert.equal(registry.release_title, `v${VERSION} — ${TITLE}`);
assert.equal(registry.runtime_optimization?.version, VERSION);
assert.equal(registry.runtime_optimization?.syntax_matrix_parallelization_enabled, true);
assert.equal(registry.runtime_optimization?.node_check_parallelization_enabled, false);
assert.equal(registry.runtime_optimization?.runtime_capability_change, false);
assert.equal(registry.runtime_optimization?.provider_behavior_changed, false);
assert.equal(registry.runtime_optimization?.oauth_behavior_changed, false);
assert.equal(registry.runtime_optimization?.backend_behavior_changed, false);
assert.equal(registry.runtime_optimization?.source_behavior_changed, false);
assert.equal(registry.runtime_optimization?.storage_behavior_changed, false);

assert.equal(registry.gates['no-browser'].syntax_checks.length, 0, 'serialized no-browser syntax tail must be compressed out of the gate');
assert.ok(registry.gates['no-browser'].node_checks.includes('tests/syntax-matrix-check.mjs'), 'no-browser gate must run the syntax matrix replacement');
assert.ok(registry.gates['no-browser'].node_checks.includes('tests/test-matrix-runtime-optimization-check.mjs'), 'no-browser gate must register runtime optimization guard');
assert.ok(registry.gates['current-no-browser'].node_checks.includes('tests/test-matrix-runtime-optimization-check.mjs'), 'current gate must include runtime optimization guard');
assert.ok(registry.syntax_matrix?.files?.length >= registry.runtime_optimization.previous_serial_no_browser_syntax_checks, 'syntax matrix must preserve previous syntax coverage');
assert.equal(new Set(registry.syntax_matrix.files).size, registry.syntax_matrix.files.length, 'syntax matrix must not duplicate files');
assert.ok(registry.syntax_matrix.files.includes('tests/provider-mode-browser.spec.mjs'), 'syntax matrix must preserve browser spec syntax coverage');
assert.ok(registry.syntax_matrix.files.includes('src/research-engine.js'), 'syntax matrix must preserve core runtime syntax coverage');

assert.ok(runner.includes('durationMs'), 'CI gate runner must report per-check timing');
assert.ok(runner.includes('slowest'), 'CI gate runner must expose slowest check summary');
assert.ok(syntaxMatrix.includes('CI_SYNTAX_CONCURRENCY'), 'syntax matrix must expose concurrency knob');
assert.ok(syntaxMatrix.includes("spawn(process.execPath, ['--check', file]"), 'syntax matrix must run Node syntax validation');
assert.ok(syntaxMatrix.includes('concurrency'), 'syntax matrix must run checks in bounded parallelism');

console.log('Test matrix runtime optimization checks passed.');
process.exit(0);
