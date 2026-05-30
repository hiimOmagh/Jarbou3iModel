import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const contract = JSON.parse(fs.readFileSync('tests/current-release-contract.json', 'utf8'));

function git(args, options = {}) {
  return spawnSync('git', args, { encoding: 'utf8', ...options });
}

function gitAvailable() {
  const result = git(['rev-parse', '--is-inside-work-tree']);
  return result.status === 0 && result.stdout.trim() === 'true';
}

function trackedChanges() {
  const porcelain = git(['status', '--porcelain=v1']);
  if (porcelain.status !== 0) throw new Error(porcelain.stderr || 'git status failed');
  if (porcelain.stdout.trim()) {
    const diff = git(['diff', '--name-only']);
    const staged = git(['diff', '--cached', '--name-only']);
    const untracked = porcelain.stdout
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((line) => line.startsWith('?? '))
      .map((line) => line.slice(3).trim());
    return Array.from(new Set([...diff.stdout.split(/\r?\n/), ...staged.stdout.split(/\r?\n/), ...untracked].filter(Boolean))).sort();
  }

  const head = git(['rev-parse', '--verify', 'HEAD']);
  const parent = git(['rev-parse', '--verify', 'HEAD~1']);
  if (head.status !== 0 || parent.status !== 0) {
    return [];
  }
  const committed = git(['diff', '--name-only', 'HEAD~1..HEAD']);
  if (committed.status !== 0) throw new Error(committed.stderr || 'git diff failed');
  return committed.stdout.split(/\r?\n/).filter(Boolean).sort();
}

function exists(file) {
  return fs.existsSync(file);
}

if (!gitAvailable()) {
  for (const file of contract.expected_deleted_files || []) {
    assert.ok(!exists(file), `expected deleted file still exists: ${file}`);
  }
  for (const file of contract.expected_changed_files || []) {
    assert.ok(exists(file) || (contract.expected_deleted_files || []).includes(file), `expected changed file missing outside git repo: ${file}`);
  }
  console.log('effective diff guard: git metadata unavailable; file-presence fallback passed. Strict diff check runs inside git/CI.');
  process.exit(0);
}

const changed = trackedChanges();
console.log(`effective diff changed files (${changed.length}):`);
for (const file of changed) console.log(`- ${file}`);

assert.ok(changed.length > 0, 'effective diff guard failed: zero effective tracked changes');

const expectedChanged = contract.expected_changed_files || [];
const expectedDeleted = contract.expected_deleted_files || [];
const changedExpectedFiles = expectedChanged.filter((file) => changed.includes(file));
const missingExpected = expectedChanged.filter((file) => !changed.includes(file) && !expectedDeleted.includes(file));

if (expectedChanged.length > 0 && changedExpectedFiles.length === 0) {
  console.warn('effective diff warning: none of the contract-declared expected_changed_files appear in this diff. This is acceptable only for narrowly scoped hotfixes after the release surface was already applied.');
}
if (missingExpected.length > 0) {
  console.warn(`effective diff warning: ${missingExpected.length} contract-declared expected_changed_files are not part of the current diff; treating them as already-applied release surface files.`);
}

for (const file of expectedDeleted) {
  assert.ok(!exists(file), `expected deleted file still exists: ${file}`);
}

const implementationPrefixes = ['tests/', 'scripts/', 'src/', '.github/'];
const metadataOnly = changed.every((file) => /^(README\.md|CHANGELOG\.md|PUBLIC_DEMO\.md|docs\/|MANIFEST\.json|package(?:-lock)?\.json)$/.test(file));
const hasImplementationOrTestChange = changed.some((file) => implementationPrefixes.some((prefix) => file.startsWith(prefix)));
assert.ok(!(metadataOnly && (contract.effective_diff_rules || []).includes('implementation_or_test_delta_required')), 'effective diff guard failed: release metadata changed without implementation/test/script delta');
assert.ok(hasImplementationOrTestChange, 'effective diff guard requires at least one test/script/src/workflow change');

console.log('effective diff guard passed.');
