import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflowPath = '.github/workflows/ci.yml';
const workflow = fs.readFileSync(workflowPath, 'utf8');

assert.ok(
  workflow.includes('npm ci --no-audit --no-fund --ignore-scripts'),
  'CI workflow must install with locked npm ci flags, not unbounded npm install'
);

assert.equal(
  /\brun:\s*npm install\b/.test(workflow),
  false,
  'CI workflow must not use npm install; use npm ci with lockfile-safe flags'
);

assert.ok(
  workflow.includes('cache: npm'),
  'CI workflow should use setup-node npm cache for dependency-install stability'
);

assert.equal(
  workflow.includes('node-version: 20'),
  false,
  'CI workflow must not pin Node 20 after v1.1.0-alpha.8 Node 24 action-runtime migration'
);

assert.equal(
  workflow.includes('node-version: 22'),
  false,
  'CI workflow must not pin Node 22 while prior npm 10.9.x install instability remains out of scope'
);

assert.ok(
  workflow.includes('node-version: 24'),
  'CI workflow must pin project test runtime to Node 24 for v1.1.0-alpha.8 compatibility validation'
);

assert.ok(
  workflow.includes('node tests/lockfile-public-registry-check.mjs'),
  'CI workflow must validate package-lock.json for public npm registry URLs before dependency install'
);

const validateIndex = workflow.indexOf('node tests/lockfile-public-registry-check.mjs');
const installIndex = workflow.indexOf('npm ci --no-audit --no-fund --ignore-scripts');
assert.ok(
  validateIndex !== -1 && installIndex !== -1 && validateIndex < installIndex,
  'CI workflow must validate the public lockfile before the first npm ci install step'
);

console.log('CI workflow install checks passed.');
