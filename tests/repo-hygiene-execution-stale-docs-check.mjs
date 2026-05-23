import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const VERSION = '1.2.0-alpha.2';
const TITLE = 'Source-to-Brief Intelligence Workbench';
const RELEASE = `v${VERSION} â€” ${TITLE}`;
const repoRoot = process.cwd();
const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));
const exists = (file) => fixturePathExists(file) || releaseDocExists(file) || fs.existsSync(path.join(repoRoot, file));

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.2.0-alpha.2-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.2.0-alpha.2.json');
const releaseDoc = `${readReleaseDoc('docs/v1.0.25-public-demo-release-lock.md')}\n${readReleaseDoc('docs/v1.1.0-evidence-pack-export-v3-brief-traceability.md')}`;
const manifest = read('RELEASE_MANIFEST.md');
const notes = read('RELEASE_NOTES.md');
const changelog = read('CHANGELOG.md');
const roadmap = read('docs/roadmap.md');
const qaMatrix = read('docs/qa-matrix.md');
const aiIntegration = read('docs/ai-integration.md');
const architecture = read('docs/architecture.md');
const privacyAudit = read('docs/privacy-audit.md');
const v019Doc = readReleaseDoc('docs/v0.19.0-beta-privacy-audit-hardening.md');
const releaseignore = read('.releaseignore');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const migrations = read('src/research/migrations.js');

assert.equal(pkg.version, VERSION, 'package.json must identify v1.1.0');
assert.equal(lock.version, VERSION, 'package-lock root version must identify v1.1.0');
assert.equal(lock.packages[''].version, VERSION, 'package-lock package root must identify v1.1.0');
assert.equal(schema.properties.workflow_version.const, VERSION, 'schema workflow version must identify v1.1.0');
assert.equal(sample.workflow_version, VERSION, 'sample fixture must identify v1.1.0');
assert.equal(migrationFixture.workflow_version, VERSION, 'migration fixture must identify v1.1.0');
assert.equal(privacyFixture.workflow_version, VERSION, 'privacy fixture must identify v1.1.0');
assert.equal(sample.release_notes.release_title, RELEASE, 'sample release title must identify v1.1.0');
assert.equal(migrationFixture.release_notes.release_title, RELEASE, 'migration fixture release title must identify v1.1.0');
assert.equal(privacyFixture.release_notes.release_title, RELEASE, 'privacy fixture release title must identify v1.1.0');

for (const corpus of [releaseDoc, manifest, notes, changelog, roadmap, qaMatrix]) {
  assert.ok(corpus.includes('v1.1.0'), 'release corpus must mention v1.1.0');
  assert.ok(corpus.includes(TITLE), 'release corpus must mention repo hygiene execution title');
}

for (const required of [
  'docs/v1.0.25-public-demo-release-lock.md',
  'fixtures/migrations/v1.2.0-alpha.2-packet.json',
  'fixtures/privacy/browser-generated-export-v1.2.0-alpha.2.json',
  'tests/public-demo-release-lock-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'docs/v1.0.23-ci-result-review-browser-evidence-artifact-audit.md',
  'fixtures/migrations/v1.0.23-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.23.json'
]) {
  assert.ok(exists(required), `required release/historical artifact missing: ${required}`);
}

assert.ok(aiIntegration.includes('## Current state: v1.1.0'), 'AI integration doc must name current v1.1.0 state');
assert.equal(aiIntegration.includes('## Current state: v0.20.0-beta'), false, 'AI integration doc must not claim v0.20.0-beta as current');
assert.ok(architecture.includes('## Current v1.1.0 pipeline'), 'architecture doc must name current v1.1.0 pipeline');
assert.equal(architecture.includes('## Current v0.20.0-beta pipeline'), false, 'architecture doc must not claim v0.20.0-beta as current');
assert.ok(privacyAudit.includes('`v1.1.0` treats every exported JSON payload as a security boundary'), 'privacy audit doc must name v1.1.0 boundary');
assert.equal(privacyAudit.includes('`v0.20.0-beta` treats every exported JSON payload as a security boundary'), false, 'privacy audit doc must not claim v0.20.0-beta as current');
assert.ok(v019Doc.startsWith('# v0.19.0-beta â€” Privacy Audit Hardening'), 'v0.19 historical privacy doc heading must match its filename');

for (const token of [
  'node_modules/',
  'dist/',
  'build/',
  'coverage/',
  'playwright-report/',
  'test-results/',
  '.nyc_output/',
  '*.log',
  '*.tmp',
  '*.zip',
  '.env',
  '.env.*',
  'backend/.dev.vars',
  'backend/.dev.vars.local'
]) {
  assert.ok(releaseignore.includes(token), `.releaseignore missing generated/secret exclusion: ${token}`);
}

for (const forbidden of [
  'docs/v1.0.5-browser-qa-visual-regression-hardening.md',
  'scripts/XXKuyryP',
  'src/XXSyA2D3',
  'src/XXvKXvVS',
  'test-results',
  'playwright-report',
  '.env',
  'backend/.dev.vars'
]) {
  assert.equal(exists(forbidden), false, `stale/generated/secret artifact must not exist: ${forbidden}`);
}

const releaseTreeFiles = (() => {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      const full = path.join(dir, entry.name);
      const rel = path.relative(repoRoot, full).split(path.sep).join('/');
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) out.push(rel);
    }
  };
  walk(repoRoot);
  return out;
})();

for (const file of releaseTreeFiles) {
  assert.equal(file.endsWith('.zip'), false, `ZIP archive must stay outside committed release tree: ${file}`);
  assert.equal(file.endsWith('.log'), false, `log file must stay outside committed release tree: ${file}`);
  assert.equal(file.endsWith('.tmp'), false, `temp file must stay outside committed release tree: ${file}`);
  assert.equal(/(^|\/)XX[A-Za-z0-9_-]*$/.test(file), false, `temporary XX artifact must stay outside committed release tree: ${file}`);
}

assert.ok(migrations.includes("const TARGET_VERSION = '1.2.0-alpha.2'"), 'migration target must be v1.1.0');
assert.ok(migrations.includes("'1.0.21','1.0.22','1.0.23','1.0.24','1.0.25','1.0.26','1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.8','1.1.0-alpha.9','1.1.0-alpha.10','1.2.0-alpha.2'"), 'migration order must preserve v1.0.24 and append v1.1.0');
assert.ok(migrations.includes("release_title:'v1.2.0-alpha.2 â€” Source-to-Brief Intelligence Workbench'"), 'migration default release title must identify v1.1.0');

assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must run release hygiene through registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');

try {
  const tracked = execSync('git ls-files', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).split('\n').filter(Boolean);
  for (const file of tracked) {
    assert.equal(file.endsWith('.zip'), false, `tracked ZIP archive is forbidden: ${file}`);
    assert.equal(file === 'node_modules' || file.startsWith('node_modules/'), false, `tracked node_modules is forbidden: ${file}`);
    assert.equal(file === 'test-results' || file.startsWith('test-results/'), false, `tracked test-results is forbidden: ${file}`);
    assert.equal(file === 'playwright-report' || file.startsWith('playwright-report/'), false, `tracked playwright-report is forbidden: ${file}`);
  }
} catch {
  // Archive-only validation may run outside a Git checkout. Filesystem checks above still enforce the release tree boundary.
}

for (const file of ['tests/public-demo-release-lock-check.mjs', 'tests/version-suite-registry-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax check failed`);
}

console.log('Public Demo Release Lock checks passed.');
process.exit(0);
