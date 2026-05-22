import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, fixturePathExists } from './fixture-registry-loader.mjs';

const context = { console, TextEncoder, window: {} };
context.globalThis = context;
context.window = context;
vm.createContext(context);
for (const file of [
  'src/research/privacy-export-guard.js',
  'src/research/privacy-audit.js',
  'src/research/export-controller.js',
  'src/research/evidence-pack-v3.js',
  'src/research/export-pack.js',
  'src/research/migrations.js'
]) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}
const modules = context.Jarbou3iResearchModules;
const exportPack = modules.exportPack;
const migrations = modules.migrations;
const audit = modules.privacyAudit;

assert.equal(exportPack.EXPORT_PACK_VERSION, '1.1.0-alpha.25');
assert.equal(typeof exportPack.createExportPack, 'function');
assert.equal(typeof exportPack.analysisBriefMarkdown, 'function');
assert.equal(typeof exportPack.evidenceMatrixCsv, 'function');
assert.equal(typeof exportPack.reviewQueueCsv, 'function');

const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));
assert.equal(fixture.workflow_version, '1.1.0-alpha.25');
assert.equal(fixture.export_pack.export_pack_version, '1.1.0-alpha.25');
assert.equal(fixture.export_pack.format, 'export_pack_v3');

const hostile = JSON.parse(JSON.stringify(fixture));
hostile.provider_config = { endpoint: 'https://api.example.test', model: 'x', api_key: 'sk-testsecretSHOULDNOTEXPORT1234567890', allow_live: true };
hostile.ai_runs = [{ run_id: 'R1', output_summary: 'Bearer SHOULDNOTEXPORT1234567890abcdef', response_validation: { accepted: true } }];
hostile.evidence_matrix[0].notes = 'access_token="SHOULDNOTEXPORT1234567890abcdef"';

const pack = exportPack.createExportPack(hostile, { version: '1.1.0-alpha.25' });
assert.equal(pack.export_pack_version, '1.1.0-alpha.25');
assert.equal(pack.manifest.file_count, 42, 'manifest should describe core export artifacts, graph artifacts, provider-router artifacts, review artifacts, and traceability artifacts before manifest insertion');
assert.equal(pack.files.length, 43, 'pack should include manifest plus core, graph, provider-router, review, and traceability artifacts');
const paths = pack.files.map((file) => file.path);
for (const required of ['export-manifest.json','research-packet.json','analysis-brief.md','evidence-matrix.csv','review-queue.csv','provider-run-ledger.json','quality-report.json','privacy-audit.json','graph/gephi-nodes.csv','graph/gephi-edges.csv','graph/kumu-map.json','graph/neo4j-nodes.csv','graph/neo4j-edges.csv','graph/graph-quality-report.json','graph/graph-export-report.json','provider/provider-route-plan.json','provider/provider-route-report.json','provider/provider-cost-report.json','provider/provider-router-safety-report.json','review/evidence-workspace-ux-report.json','review/brief-traceability-report.json','traceability/brief-traceability-report.json','traceability/contradiction-falsifier-appendix.json','traceability/bundle-consistency-report.json','traceability/publication-readiness-export-report.json','traceability/evidence-pack-v3-manifest.json','publication-review/claim-classification-report.json','publication-review/claim-boundary-audit-report.json','publication-review/contradiction-falsifier-completeness-report.json','publication-review/publication-review-gate-report.json','publication-review/export-safe-final-review-report.json','golden/golden-workflow-corpus.json','golden/golden-end-to-end-demo-report.json','golden/golden-export-pack-validation-report.json','golden/hosted-demo-scenario-evidence.json','golden/release-readiness-runbook.json','release-candidate/final-repo-hygiene-report.json','release-candidate/stale-release-copy-sweep.json','release-candidate/golden-workflow-regression-lock.json','release-candidate/export-pack-artifact-consistency-lock.json','release-candidate/hosted-demo-evidence-runbook.json','release-candidate/no-browser-browser-ci-parity-report.json','release-candidate/release-candidate-readiness-report.json']) {
  assert.ok(paths.includes(required), `missing export pack file ${required}`);
}

const evidenceCsv = pack.files.find((file) => file.path === 'evidence-matrix.csv').content;
assert.ok(evidenceCsv.startsWith('evidence_id,claim,source_title,source_url'), 'evidence CSV header missing');
const reviewCsv = pack.files.find((file) => file.path === 'review-queue.csv').content;
assert.ok(reviewCsv.startsWith('review_id,import_id,status'), 'review queue CSV header missing');
const briefMd = pack.files.find((file) => file.path === 'analysis-brief.md').content;
assert.ok(briefMd.includes('# Sample: US-China chip war'), 'markdown brief title missing');
assert.ok(briefMd.includes('## Quality Gate Fix Actions'), 'markdown quality section missing');
assert.ok(briefMd.includes('## Strategic Evidence Graph'), 'markdown graph section missing');
assert.ok(briefMd.includes('## Provider Routing'), 'markdown provider routing section missing');
assert.ok(briefMd.includes('## Publication Review Gate'), 'markdown publication review section missing');
assert.ok(briefMd.includes('## Golden Workflow Demo'), 'markdown golden workflow section missing');
assert.ok(briefMd.includes('## Release Candidate Hardening'), 'markdown release candidate hardening section missing');
assert.ok(paths.includes('review/evidence-workspace-ux-report.json'), 'review UX report export missing');
assert.ok(paths.includes('review/brief-traceability-report.json'), 'review throughput report export missing');

const joined = pack.files.map((file) => file.content).join('\n---FILE---\n');
for (const forbidden of ['SHOULDNOTEXPORT', 'sk-testsecret', 'Bearer SHOULDNOTEXPORT', 'access_token="']) {
  assert.equal(joined.includes(forbidden), false, `export pack leaked forbidden marker: ${forbidden}`);
}
for (const file of pack.files) {
  const report = audit.assertPrivacyReleaseGate({ path: file.path, content: file.content }, { throw: false });
  assert.equal(report.safe, true, `${file.path} failed privacy release gate`);
}

const privacyFile = JSON.parse(pack.files.find((file) => file.path === 'privacy-audit.json').content);
assert.equal(privacyFile.export_pack_version, '1.1.0-alpha.25');
assert.equal(privacyFile.release_gate, 'pass');
assert.ok(Array.isArray(privacyFile.file_reports));

const migrated = migrations.migrateResearchPacket(getMigrationFixture('fixtures/migrations/v0.23.0-packet.json'));
assert.equal(migrated.ok, true);
assert.equal(migrated.packet.workflow_version, '1.1.0-alpha.25');
assert.equal(migrated.packet.export_pack.export_pack_version, '1.1.0-alpha.25');
assert.equal(migrated.packet.export_pack.format, 'export_pack_v3');
assert.ok(migrated.packet.export_pack.files.includes('privacy-audit.json'));

const schema = JSON.parse(fs.readFileSync('schema/research-workflow.schema.json', 'utf8'));
assert.ok(schema.required.includes('export_pack'), 'workflow schema must require export_pack metadata');
assert.equal(schema.properties.export_pack.properties.export_pack_version.const, '1.1.0-alpha.25');

console.log('Export Pack v2 checks passed.');
process.exit(0);
