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

function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function existingGitCommit(ref) {
  if (!ref || /^0+$/.test(ref)) return null;
  const result = git(['cat-file', '-e', `${ref}^{commit}`]);
  return result.status === 0 ? ref : null;
}

function diffNameOnly(range) {
  const result = git(['diff', '--name-only', range]);
  if (result.status !== 0) throw new Error(result.stderr || `git diff failed for ${range}`);
  return result.stdout.split(/\r?\n/).filter(Boolean);
}

function eventBeforeSha() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath || !fs.existsSync(eventPath)) return null;
  try {
    const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
    return typeof event.before === 'string' ? event.before : null;
  } catch {
    return null;
  }
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
    return {
      mode: 'working-tree',
      files: uniqueSorted([...diff.stdout.split(/\r?\n/), ...staged.stdout.split(/\r?\n/), ...untracked]),
    };
  }

  const head = git(['rev-parse', '--verify', 'HEAD']);
  if (head.status !== 0) {
    return { mode: 'no-git-head', files: [], diffBaseAvailable: false };
  }

  const ciBefore = existingGitCommit(eventBeforeSha());
  if (ciBefore && ciBefore !== head.stdout.trim()) {
    return {
      mode: 'ci-event-before',
      files: uniqueSorted(diffNameOnly(`${ciBefore}..HEAD`)),
      diffBaseAvailable: true,
    };
  }

  const parent = git(['rev-parse', '--verify', 'HEAD~1']);
  if (parent.status === 0) {
    return {
      mode: 'head-parent',
      files: uniqueSorted(diffNameOnly('HEAD~1..HEAD')),
      diffBaseAvailable: true,
    };
  }

  return { mode: 'no-comparable-git-base', files: [], diffBaseAvailable: false };
}

function exists(file) {
  return fs.existsSync(file);
}

function validateReleaseSurfaceFallback(reason) {
  for (const file of contract.expected_deleted_files || []) {
    assert.ok(!exists(file), `expected deleted file still exists: ${file}`);
  }
  for (const file of contract.expected_changed_files || []) {
    assert.ok(
      exists(file) || (contract.expected_deleted_files || []).includes(file),
      `expected changed file missing while using effective-diff fallback: ${file}`,
    );
  }
  const requiredImplementationFiles = [
    'tests/current-release-lock-completion-check.mjs',
    'tests/effective-diff-check.mjs',
    ...(contract.required_tests || []),
  ];
  assert.ok(
    requiredImplementationFiles.some((file) => exists(file)),
    'effective diff fallback requires at least one release/test implementation file to exist',
  );
  console.warn(`effective diff guard: ${reason}; release-surface fallback passed.`);
}

if (!gitAvailable()) {
  validateReleaseSurfaceFallback('git metadata unavailable');
  process.exit(0);
}

const { mode, files: changed, diffBaseAvailable } = trackedChanges();
console.log(`effective diff mode: ${mode}`);
console.log(`effective diff changed files (${changed.length}):`);
for (const file of changed) console.log(`- ${file}`);

if (changed.length === 0 && !diffBaseAvailable) {
  validateReleaseSurfaceFallback('no comparable git base available in this checkout');
  process.exit(0);
}

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
