import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';

const VERSION = '1.0.25';
const TITLE = 'Public Demo Release Lock';
const RELEASE = `v${VERSION} — ${TITLE}`;
const repoRoot = process.cwd();
const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));
const exists = (file) => fs.existsSync(path.join(repoRoot, file));

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = json('fixtures/migrations/v1.0.25-packet.json');
const privacyFixture = json('fixtures/privacy/browser-generated-export-v1.0.25.json');
const releaseDoc = read('docs/v1.0.25-public-demo-release-lock.md');
const manifest = read('RELEASE_MANIFEST.md');
const notes = read('RELEASE_NOTES.md');
const changelog = read('CHANGELOG.md');
const roadmap = read('docs/roadmap.md');
const qaMatrix = read('docs/qa-matrix.md');
const aiIntegration = read('docs/ai-integration.md');
const architecture = read('docs/architecture.md');
const privacyAudit = read('docs/privacy-audit.md');
const v019Doc = read('docs/v0.19.0-beta-privacy-audit-hardening.md');
const releaseignore = read('.releaseignore');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const migrations = read('src/research/migrations.js');

assert.equal(pkg.version, VERSION, 'package.json must identify v1.0.25');
assert.equal(lock.version, VERSION, 'package-lock root version must identify v1.0.25');
assert.equal(lock.packages[''].version, VERSION, 'package-lock package root must identify v1.0.25');
assert.equal(schema.properties.workflow_version.const, VERSION, 'schema workflow version must identify v1.0.25');
assert.equal(sample.workflow_version, VERSION, 'sample fixture must identify v1.0.25');
assert.equal(migrationFixture.workflow_version, VERSION, 'migration fixture must identify v1.0.25');
assert.equal(privacyFixture.workflow_version, VERSION, 'privacy fixture must identify v1.0.25');
assert.equal(sample.release_notes.release_title, RELEASE, 'sample release title must identify v1.0.25');
assert.equal(migrationFixture.release_notes.release_title, RELEASE, 'migration fixture release title must identify v1.0.25');
assert.equal(privacyFixture.release_notes.release_title, RELEASE, 'privacy fixture release title must identify v1.0.25');

for (const corpus of [releaseDoc, manifest, notes, changelog, roadmap, qaMatrix]) {
  assert.ok(corpus.includes('v1.0.25'), 'release corpus must mention v1.0.25');
  assert.ok(corpus.includes(TITLE), 'release corpus must mention repo hygiene execution title');
}

for (const required of [
  'docs/v1.0.25-public-demo-release-lock.md',
  'fixtures/migrations/v1.0.25-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.25.json',
  'tests/public-demo-release-lock-check.mjs',
  'tests/v124-no-browser-suite.mjs',
  'docs/v1.0.23-ci-result-review-browser-evidence-artifact-audit.md',
  'fixtures/migrations/v1.0.23-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.23.json'
]) {
  assert.ok(exists(required), `required release/historical artifact missing: ${required}`);
}

assert.ok(aiIntegration.includes('## Current state: v1.0.25'), 'AI integration doc must name current v1.0.25 state');
assert.equal(aiIntegration.includes('## Current state: v0.20.0-beta'), false, 'AI integration doc must not claim v0.20.0-beta as current');
assert.ok(architecture.includes('## Current v1.0.25 pipeline'), 'architecture doc must name current v1.0.25 pipeline');
assert.equal(architecture.includes('## Current v0.20.0-beta pipeline'), false, 'architecture doc must not claim v0.20.0-beta as current');
assert.ok(privacyAudit.includes('`v1.0.25` treats every exported JSON payload as a security boundary'), 'privacy audit doc must name v1.0.25 boundary');
assert.equal(privacyAudit.includes('`v0.20.0-beta` treats every exported JSON payload as a security boundary'), false, 'privacy audit doc must not claim v0.20.0-beta as current');
assert.ok(v019Doc.startsWith('# v0.19.0-beta — Privacy Audit Hardening'), 'v0.19 historical privacy doc heading must match its filename');

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

assert.ok(migrations.includes("const TARGET_VERSION = '1.0.25'"), 'migration target must be v1.0.25');
assert.ok(migrations.includes("'1.0.21','1.0.22','1.0.23','1.0.24','1.0.25'"), 'migration order must preserve v1.0.24 and append v1.0.25');
assert.ok(migrations.includes("release_title:'v1.0.25 — Public Demo Release Lock'"), 'migration default release title must identify v1.0.25');

assert.ok(ciNoBrowser.includes('tests/public-demo-release-lock-check.mjs'), 'no-browser CI must run v1.0.25 repo hygiene guard');
assert.ok(ciNoBrowser.includes('run_node --check tests/v124-no-browser-suite.mjs'), 'no-browser CI must syntax-check v124 wrapper');
assert.equal(ciNoBrowser.includes('run_node tests/v124-no-browser-suite.mjs'), false, 'no-browser CI must not recursively run v124 wrapper');
assert.ok(pkg.scripts['test:repo:hygiene-execution']?.includes('repo-hygiene-execution-stale-docs-check.mjs'), 'package must expose repo hygiene execution check');
assert.ok(pkg.scripts['test:v124:no-browser']?.includes('v124-no-browser-suite.mjs'), 'package must expose v124 no-browser suite');
assert.ok(pkg.scripts['test:v124']?.includes('test:ci:browser'), 'package must expose v124 browser gate composition');
assert.ok(pkg.scripts['test:stable']?.includes('public-demo-release-lock-check.mjs'), 'stable suite must include v1.0.25 hygiene check');
assert.ok(pkg.scripts['test:patch']?.includes('public-demo-release-lock-check.mjs'), 'patch suite must include v1.0.25 hygiene check');

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

for (const file of ['tests/public-demo-release-lock-check.mjs', 'tests/v124-no-browser-suite.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax check failed`);
}

console.log('Public Demo Release Lock checks passed.');
process.exit(0);
