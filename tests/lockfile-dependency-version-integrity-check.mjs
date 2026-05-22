import assert from 'node:assert/strict';
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const packages = lock.packages || {};

assert.equal(lock.version, pkg.version, 'package-lock root version must match package.json version');
assert.equal(packages['']?.version, pkg.version, 'package-lock root package version must match package.json version');

const pollutedDependencyVersions = [];
for (const [name, meta] of Object.entries(packages)) {
  if (!name.startsWith('node_modules/')) continue;
  const version = String(meta?.version || '');
  if (/alpha|rc|fix|Public Demo|Stable/i.test(version)) {
    pollutedDependencyVersions.push(`${name}@${version}`);
  }
}

assert.deepEqual(
  pollutedDependencyVersions,
  [],
  'dependency versions in package-lock.json must not be polluted by app release labels; only the root package may carry rc/fix labels'
);

const tarballMismatches = [];
for (const [name, meta] of Object.entries(packages)) {
  if (!name.startsWith('node_modules/')) continue;
  const resolved = String(meta?.resolved || '');
  const version = String(meta?.version || '');
  const match = resolved.match(/-((?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[A-Za-z0-9._-]+)?)\.tgz(?:$|[?#])/);
  if (match && version !== match[1]) tarballMismatches.push(`${name}: version=${version} resolved=${resolved}`);
}

assert.deepEqual(
  tarballMismatches,
  [],
  'package-lock dependency versions must match their resolved public npm tarball versions'
);

for (const dep of ['node_modules/has-symbols', 'node_modules/math-intrinsics', 'node_modules/side-channel']) {
  assert.equal(packages[dep]?.version, '1.1.0', `${dep} must remain at npm dependency version 1.1.0`);
}

console.log('Lockfile dependency version integrity checks passed.');
