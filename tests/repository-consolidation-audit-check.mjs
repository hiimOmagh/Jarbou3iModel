import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repoRoot = process.cwd();
const read = (file) => fs.readFileSync(path.join(repoRoot, file), 'utf8');
const json = (file) => JSON.parse(read(file));
const exists = (file) => fs.existsSync(path.join(repoRoot, file));
const walk = (dir) => {
  const out = [];
  for (const name of fs.readdirSync(path.join(repoRoot, dir))) {
    const rel = path.join(dir, name).replace(/\\/g, '/');
    const abs = path.join(repoRoot, rel);
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) out.push(...walk(rel));
    else out.push(rel);
  }
  return out;
};

const VERSION = '1.1.0-alpha.3';
const PREVIOUS_VERSION = '1.1.0-alpha.2';
const FREEZE_BASELINE = '1.0.30';
const TITLE = 'Repository Consolidation Audit + Retention Registry';
const DOC = 'docs/v1.1.0-alpha.3-repository-consolidation-audit-retention-registry.md';
const ARTIFACT = 'jarbou3i-research-engine-v1.1.0-alpha.3-repository-consolidation-audit-retention-registry-patch.zip';

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const index = read('index.html');
const auditSource = read('src/research/repository-consolidation-audit.js');
const postFreezeSource = read('src/research/post-freeze-planning-gate.js');
const releaseDoc = read(DOC);
const migrationFixture = json('fixtures/migrations/v1.1.0-alpha.3-packet.json');
const privacyFixture = json('fixtures/privacy/browser-generated-export-v1.1.0-alpha.3.json');

assert.equal(pkg.version, VERSION);
assert.equal(lock.version, VERSION);
assert.equal(lock.packages[''].version, VERSION);
assert.ok(pkg.description.includes('repository consolidation audit and retention registry'));
assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(index.includes(`v${VERSION} · ${TITLE}`), 'index badge must expose alpha.3 consolidation audit identity');
assert.ok(index.includes('audits repository retention'), 'index must communicate audit-only repository cleanup');
assert.ok(index.includes('without deleting files or changing runtime behavior'), 'index must block cleanup from becoming deletion');
assert.ok(auditSource.includes("const VERSION = '1.1.0-alpha.3'"));
assert.ok(auditSource.includes("const PREVIOUS_VERSION = '1.1.0-alpha.2'"));
assert.ok(auditSource.includes("const FREEZE_BASELINE = '1.0.30'"));
assert.ok(auditSource.includes('KEEP_ACTIVE'));
assert.ok(auditSource.includes('MERGE_TO_REGISTRY'));
assert.ok(auditSource.includes('ARCHIVE_DOCS'));
assert.ok(auditSource.includes('DELETE_ONLY_IF_UNREFERENCED'));
assert.ok(auditSource.includes('No file deletion in this release'));
assert.ok(postFreezeSource.includes("const VERSION = '1.1.0-alpha.3'"), 'post-freeze planning module must remain version-aligned');

await import(`file://${path.join(repoRoot, 'src/research/repository-consolidation-audit.js')}`);
const auditApi = globalThis.Jarbou3iResearchModules.repositoryConsolidationAudit;
assert.equal(auditApi.VERSION, VERSION);
assert.equal(auditApi.PREVIOUS_VERSION, PREVIOUS_VERSION);
assert.equal(auditApi.FREEZE_BASELINE, FREEZE_BASELINE);

const files = [
  'src/research-engine.js',
  'backend/cloudflare-worker.js',
  'index.html',
  'styles.css',
  'tests/privacy-export-check.mjs',
  'tests/provider-mode-browser.spec.mjs',
  'tests/v128-no-browser-suite.mjs',
  'fixtures/migrations/v1.0.30-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.30.json',
  'docs/v1.0.30-mobile-header-geometry-lock-final-public-demo-visual-freeze.md',
  'ci-artifacts/hosted-demo-evidence/desktop-first-screen.png',
  'jarbou3i-research-engine-v1.0.30-full-source.zip'
];
const audit = auditApi.buildRepositoryConsolidationAudit(files, {now:'2026-05-05T00:00:00.000Z'});
assert.equal(audit.repository_consolidation_audit_version, VERSION);
assert.equal(audit.previous_version, PREVIOUS_VERSION);
assert.equal(audit.freeze_baseline_version, FREEZE_BASELINE);
assert.equal(audit.stage, 'repository_consolidation_audit_retention_registry');
assert.equal(audit.audit_only, true);
assert.equal(audit.implementation_allowed, false);
assert.equal(audit.runtime_capability_change, false);
assert.equal(audit.provider_behavior_changed, false);
assert.equal(audit.oauth_behavior_changed, false);
assert.equal(audit.backend_behavior_changed, false);
assert.equal(audit.source_behavior_changed, false);
assert.equal(audit.storage_behavior_changed, false);
assert.equal(audit.release_gate, 'retention_registry_ready');
assert.equal(audit.consolidation_summary.direct_deletion_allowed_count, 0, 'audit gate must not authorize direct deletion');
assert.ok(audit.candidates.merge_to_registry.includes('tests/v128-no-browser-suite.mjs'));
assert.ok(audit.candidates.merge_to_registry.includes('fixtures/migrations/v1.0.30-packet.json'));
assert.ok(audit.candidates.merge_to_registry.includes('fixtures/privacy/browser-generated-export-v1.0.30.json'));
assert.ok(audit.candidates.archive_docs.includes('docs/v1.0.30-mobile-header-geometry-lock-final-public-demo-visual-freeze.md'));
assert.ok(audit.candidates.delete_only_if_unreferenced.includes('ci-artifacts/hosted-demo-evidence/desktop-first-screen.png'));
assert.ok(audit.blocked_actions.some(action => action.includes('No file deletion')));
assert.ok(audit.next_safe_steps.some(step => step.includes('migration-registry')));
for (const entry of audit.sample_entries) {
  for (const field of audit.required_audit_fields) assert.ok(field in entry, `${entry.path} missing ${field}`);
}

const repoFiles = [...walk('fixtures'), ...walk('tests'), ...walk('docs'), ...walk('src')];
const repoAudit = auditApi.buildRepositoryConsolidationAudit(repoFiles, {now:'2026-05-05T00:00:00.000Z'});
assert.ok(repoAudit.files_audited >= 250, 'repo audit must cover a large repository slice');
assert.ok(repoAudit.consolidation_summary.merge_to_registry_count >= 80, 'migration/privacy/version-suite reduction candidates should be visible');
assert.ok(repoAudit.consolidation_summary.archive_docs_count >= 30, 'historical release docs should be visible as archive candidates');
assert.equal(repoAudit.consolidation_summary.direct_deletion_allowed_count, 0, 'no actual deletion is allowed in alpha.3');

for (const packet of [migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, VERSION);
  assert.equal(packet.release_notes.release_title, `v${VERSION} — ${TITLE}`);
  assert.equal(packet.release_apply_integrity.base_version, FREEZE_BASELINE);
  assert.equal(packet.release_apply_integrity.artifact_name, ARTIFACT);
  assert.equal(packet.release_apply_integrity.runtime_capability_change, false);
  assert.equal(packet.release_apply_integrity.provider_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.oauth_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.backend_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.source_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.storage_behavior_changed, false);
}

assert.ok(exists('fixtures/migrations/v1.1.0-alpha.2-packet.json'), 'alpha.2 fixture must remain for retention audit baseline');
assert.ok(exists('fixtures/privacy/browser-generated-export-v1.1.0-alpha.2.json'), 'alpha.2 privacy fixture must remain for retention audit baseline');
assert.ok(exists(DOC), 'alpha.3 release doc must exist');
assert.ok(releaseDoc.includes('audit-only'));
assert.ok(releaseDoc.includes('No files are deleted'));
assert.ok(releaseDoc.includes('MERGE_TO_REGISTRY'));
assert.ok(releaseDoc.includes('DELETE_ONLY_IF_UNREFERENCED'));
assert.ok(releaseDoc.includes('v1.1.0-alpha.4'));

for (const file of ['src/research/repository-consolidation-audit.js','src/research/post-freeze-planning-gate.js','tests/repository-consolidation-audit-check.mjs','tests/v110a3-no-browser-suite.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax failed`);
}

console.log('Repository consolidation audit and retention registry checks passed.');
process.exit(0);
