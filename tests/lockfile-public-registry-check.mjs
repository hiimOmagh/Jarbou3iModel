import assert from 'node:assert/strict';
import fs from 'node:fs';

const lockfilePath = 'package-lock.json';
const lockfile = fs.readFileSync(lockfilePath, 'utf8');
const parsed = JSON.parse(lockfile);

const forbiddenPatterns = [
  /applied-caas/i,
  /internal\.api\.openai/i,
  /artifactory\/api\/npm\/npm-public/i,
  /localhost/i,
  /127\.0\.0\.1/,
  /0\.0\.0\.0/
];

for (const pattern of forbiddenPatterns) {
  assert.equal(
    pattern.test(lockfile),
    false,
    `package-lock.json must not contain non-public or sandbox-internal registry URL pattern: ${pattern}`
  );
}

const packages = parsed.packages || {};
const invalidResolved = Object.entries(packages)
  .filter(([, pkg]) => typeof pkg?.resolved === 'string')
  .filter(([, pkg]) => !pkg.resolved.startsWith('https://registry.npmjs.org/'))
  .map(([name, pkg]) => `${name || '<root>'}: ${pkg.resolved}`);

assert.deepEqual(
  invalidResolved,
  [],
  'all package-lock resolved tarballs must use the public npm registry so GitHub Actions can install deterministically'
);

console.log('Lockfile public registry checks passed.');
