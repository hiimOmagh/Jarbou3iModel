import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const posix = (value) => value.split(path.sep).join('/');

const FORBIDDEN_ROOT_ENTRIES = Object.freeze([
  'README.md',
  'MANIFEST.json',
  'manifest.json',
  'package.json',
  'package-lock.json',
  'CHANGELOG.md',
  'PUBLIC_DEMO.md',
  'index.html'
]);

const REQUIRED_NESTED_METADATA = Object.freeze([
  'PACKAGE-MANIFEST.json',
  'README-PACKAGE.md'
]);

function listRepoEntries(dir = repoRoot, base = '') {
  const entries = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const relative = posix(path.join(base, entry.name));
    const full = path.join(dir, entry.name);
    entries.push({ name: entry.name, relative, full, isDirectory: entry.isDirectory(), isFile: entry.isFile() });
    if (entry.isDirectory()) entries.push(...listRepoEntries(full, relative));
  }
  return entries;
}

function readUInt16LE(buffer, offset) {
  return buffer.readUInt16LE(offset);
}

function readUInt32LE(buffer, offset) {
  return buffer.readUInt32LE(offset);
}

function findEndOfCentralDirectory(buffer) {
  const minimumSize = 22;
  const maxComment = 0xffff;
  const start = Math.max(0, buffer.length - minimumSize - maxComment);
  for (let index = buffer.length - minimumSize; index >= start; index -= 1) {
    if (readUInt32LE(buffer, index) === 0x06054b50) return index;
  }
  throw new Error('ZIP end-of-central-directory record not found');
}

function listZipEntries(zipPath) {
  const buffer = fs.readFileSync(zipPath);
  const eocd = findEndOfCentralDirectory(buffer);
  const entryCount = readUInt16LE(buffer, eocd + 10);
  const centralDirectorySize = readUInt32LE(buffer, eocd + 12);
  const centralDirectoryOffset = readUInt32LE(buffer, eocd + 16);
  assert.ok(
    centralDirectoryOffset + centralDirectorySize <= buffer.length,
    `${zipPath}: central directory exceeds ZIP size`
  );

  const entries = [];
  let offset = centralDirectoryOffset;
  for (let index = 0; index < entryCount; index += 1) {
    assert.equal(readUInt32LE(buffer, offset), 0x02014b50, `${zipPath}: invalid central directory header at ${offset}`);
    const fileNameLength = readUInt16LE(buffer, offset + 28);
    const extraLength = readUInt16LE(buffer, offset + 30);
    const commentLength = readUInt16LE(buffer, offset + 32);
    const nameStart = offset + 46;
    const nameEnd = nameStart + fileNameLength;
    const rawName = buffer.subarray(nameStart, nameEnd).toString('utf8').replaceAll('\\', '/');
    entries.push(rawName);
    offset = nameEnd + extraLength + commentLength;
  }
  return entries;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function validateZipPackage(zipPath) {
  const entries = listZipEntries(zipPath).filter(Boolean);
  assert.ok(entries.length > 0, `${zipPath}: patch package ZIP must not be empty`);

  const rootEntries = entries
    .map((entry) => entry.split('/').filter(Boolean))
    .filter((parts) => parts.length === 1)
    .map((parts) => parts[0]);

  const rootFiles = rootEntries.filter((entry) => !entry.endsWith('/'));
  assert.deepEqual(
    rootFiles.filter((entry) => FORBIDDEN_ROOT_ENTRIES.includes(entry)),
    [],
    `${zipPath}: patch package must not contain root repo-colliding files`
  );

  const firstSegments = new Set(entries.map((entry) => entry.split('/').filter(Boolean)[0]).filter(Boolean));
  assert.equal(firstSegments.size, 1, `${zipPath}: patch package must contain exactly one nested top-level folder`);

  const rootFolder = [...firstSegments][0];
  assert.ok(rootFolder && !FORBIDDEN_ROOT_ENTRIES.includes(rootFolder), `${zipPath}: nested folder name must not collide with repo root files`);

  for (const metadataName of REQUIRED_NESTED_METADATA) {
    assert.ok(
      entries.includes(`${rootFolder}/${metadataName}`),
      `${zipPath}: missing nested ${metadataName}`
    );
  }

  assert.ok(
    entries.some((entry) => new RegExp(`^${escapeRegex(rootFolder)}/apply-.+\\.mjs$`).test(entry)),
    `${zipPath}: missing nested apply-<slug>.mjs`
  );
  assert.ok(
    entries.some((entry) => new RegExp(`^${escapeRegex(rootFolder)}/validate-.+\\.mjs$`).test(entry)),
    `${zipPath}: missing nested validate-<slug>.mjs`
  );

  return { zipPath, entryCount: entries.length, rootFolder };
}

const allEntries = listRepoEntries();
const rootEntries = allEntries.filter((entry) => !entry.relative.includes('/'));
const rootArtifactFailures = [];

for (const entry of rootEntries) {
  if (entry.isDirectory && /^_patch[-_]/.test(entry.name)) rootArtifactFailures.push(`${entry.name}/`);
  if (entry.isFile && ['PACKAGE-MANIFEST.json', 'README-PACKAGE.md'].includes(entry.name)) rootArtifactFailures.push(entry.name);
  if (entry.isFile && /^apply-.+\.mjs$/.test(entry.name)) rootArtifactFailures.push(entry.name);
  if (entry.isFile && /^validate-.+\.mjs$/.test(entry.name)) rootArtifactFailures.push(entry.name);
  if (entry.isFile && /-package\.zip$/.test(entry.name)) rootArtifactFailures.push(entry.name);
}

assert.deepEqual(rootArtifactFailures, [], `root patch package artifacts must not exist: ${rootArtifactFailures.join(', ')}`);

const contractDoc = 'docs/patch-package-contract.md';
assert.ok(fs.existsSync(contractDoc), 'patch package safety contract doc must exist');
const docBody = fs.readFileSync(contractDoc, 'utf8');
for (const token of [...FORBIDDEN_ROOT_ENTRIES, ...REQUIRED_NESTED_METADATA, 'apply-<slug>.mjs', 'validate-<slug>.mjs']) {
  assert.ok(docBody.includes(token), `patch package contract doc must include ${token}`);
}

const candidateArgs = process.argv.slice(2);
const envCandidates = (process.env.PATCH_PACKAGE_CANDIDATES || '')
  .split(path.delimiter)
  .map((entry) => entry.trim())
  .filter(Boolean);
const repoZipCandidates = allEntries
  .filter((entry) => entry.isFile && entry.relative.endsWith('.zip'))
  .map((entry) => entry.relative);
const candidates = [...new Set([...candidateArgs, ...envCandidates, ...repoZipCandidates])];

const reports = [];
for (const candidate of candidates) {
  const fullPath = path.isAbsolute(candidate) ? candidate : path.join(repoRoot, candidate);
  assert.ok(fs.existsSync(fullPath), `patch package candidate not found: ${candidate}`);
  reports.push(validateZipPackage(fullPath));
}

if (reports.length) {
  for (const report of reports) console.log(`Patch package ZIP contract passed: ${report.zipPath} (${report.entryCount} entries under ${report.rootFolder}/)`);
} else {
  console.log('Patch package safety checks passed: static contract and root artifact guard verified.');
}
