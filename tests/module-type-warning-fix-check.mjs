import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const worker = fs.readFileSync('backend/cloudflare-worker.js', 'utf8');
const smoke = fs.readFileSync('tests/backend-worker-smoke.mjs', 'utf8');

assert.equal(pkg.version, '1.1.0-alpha.9', 'package version must be v1.1.0-alpha.9');
assert.equal(pkg.type, 'module', 'package.json must declare package-level ESM mode');
assert.ok(worker.includes("const VERSION = '1.1.0-alpha.9'"), 'Worker proxy version must be v1.1.0-alpha.9');
assert.ok(smoke.includes("backend/cloudflare-worker.js"), 'backend smoke test must import the Worker module directly');

const result = spawnSync(process.execPath, ['tests/backend-worker-smoke.mjs'], {
  encoding: 'utf8',
  env: { ...process.env, NO_COLOR: '1' }
});

assert.equal(result.status, 0, `backend-worker-smoke failed:\nSTDOUT:\n${result.stdout}\nSTDERR:\n${result.stderr}`);
assert.equal(/MODULE_TYPELESS_PACKAGE_JSON/.test(result.stderr), false, `module type warning still present:\n${result.stderr}`);
assert.equal(/Reparsing as ES module/.test(result.stderr), false, `ESM reparsing warning still present:\n${result.stderr}`);
assert.ok(result.stdout.includes('Backend Worker smoke checks passed.'), 'backend smoke output missing pass marker');

console.log('Module type warning fix checks passed.');
process.exit(0);
