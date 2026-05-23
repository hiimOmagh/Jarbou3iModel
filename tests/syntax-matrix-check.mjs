import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import { spawn } from 'node:child_process';

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const matrix = registry.syntax_matrix || {};
const files = Array.isArray(matrix.files) ? matrix.files : [];
const requestedConcurrency = Number.parseInt(process.env.CI_SYNTAX_CONCURRENCY || String(matrix.default_concurrency || 8), 10);
const concurrency = Math.max(1, Math.min(Number.isFinite(requestedConcurrency) ? requestedConcurrency : 8, os.cpus().length || 8, files.length || 1));

assert.equal(registry.ci_gate_registry_version, '1.2.0-alpha.5');
assert.equal(matrix.version, '1.2.0-alpha.5');
assert.equal(matrix.runner, 'tests/syntax-matrix-check.mjs');
assert.equal(matrix.parallelizable, true);
assert.ok(files.length >= 60, `syntax matrix unexpectedly small: ${files.length}`);
assert.equal(new Set(files).size, files.length, 'syntax matrix must not contain duplicate files');

const missing = files.filter((file) => !fs.existsSync(file));
assert.deepEqual(missing, [], `syntax matrix references missing files: ${missing.join(', ')}`);

const queue = files.slice();
const failures = [];
let active = 0;
let checked = 0;
const startedAt = Date.now();

function runOne(file) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ['--check', file], {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: process.env
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('close', (code, signal) => {
      checked += 1;
      if (code !== 0) failures.push({ file, code, signal, stdout, stderr });
      resolve();
    });
    child.on('error', (error) => {
      checked += 1;
      failures.push({ file, error: error.message, stdout, stderr });
      resolve();
    });
  });
}

await new Promise((resolve) => {
  const pump = () => {
    while (active < concurrency && queue.length) {
      const file = queue.shift();
      active += 1;
      runOne(file).then(() => {
        active -= 1;
        pump();
      });
    }
    if (active === 0 && queue.length === 0) resolve();
  };
  pump();
});

if (failures.length) {
  console.error(`Syntax matrix failed for ${failures.length}/${files.length} files.`);
  for (const failure of failures) {
    console.error(`--- ${failure.file}`);
    if (failure.error) console.error(failure.error);
    if (failure.stderr) console.error(failure.stderr.trim());
    if (failure.stdout) console.error(failure.stdout.trim());
  }
  process.exit(1);
}

const elapsedMs = Date.now() - startedAt;
console.log(`Syntax matrix checks passed (${checked} files, concurrency=${concurrency}, elapsed_ms=${elapsedMs}).`);
process.exit(0);
