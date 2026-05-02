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

console.log('CI workflow install checks passed.');
