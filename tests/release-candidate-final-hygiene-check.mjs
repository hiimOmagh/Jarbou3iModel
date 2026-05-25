import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0-alpha.8';
const source = fs.readFileSync('src/research/release-candidate-hygiene.js', 'utf8');
const engine = fs.readFileSync('src/research-engine.js', 'utf8');
const exportPack = fs.readFileSync('src/research/export-pack.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');
const schema = JSON.parse(fs.readFileSync('schema/research-workflow.schema.json', 'utf8'));
const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

new vm.Script(source, {filename:'src/research/release-candidate-hygiene.js'});
const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(source, context, {filename:'src/research/release-candidate-hygiene.js'});
const hygiene = context.window.Jarbou3iResearchModules.releaseCandidateHygiene;

assert.equal(pkg.version, VERSION);
assert.equal(hygiene.VERSION, VERSION);
assert.equal(hygiene.MODEL, 'release_candidate_hygiene.v1');
assert.equal(typeof hygiene.buildFinalRepoHygieneReport, 'function');
assert.equal(typeof hygiene.buildReleaseCandidateHygieneBundle, 'function');

const corpus = {files:{
  'README.md':'v1.1.0 current release',
  'CHANGELOG.md':'v1.1.0 current release',
  'PUBLIC_DEMO.md':'v1.1.0 current release',
  'docs/current-release.md':'v1.1.0 current release',
  'docs/qa-matrix.md':'v1.1.0 current release',
  'src/research/golden-workflow-corpus.js':'module',
  'src/research/publication-review-gate.js':'module',
  'src/research/evidence-pack-v3.js':'module',
  'src/research/export-pack.js':'module'
}};
const stale = hygiene.buildStaleReleaseCopySweep(corpus, {version:VERSION});
assert.equal(stale.stale_release_copy_sweep_version, VERSION);
assert.equal(stale.stale_match_count, 0);
assert.equal(stale.release_gate, 'stale_release_copy_clear');
assert.equal(stale.live_fetching_performed, false);
assert.equal(stale.verification_claimed, false);

const repo = hygiene.buildFinalRepoHygieneReport(corpus, {version:VERSION});
assert.equal(repo.final_repo_hygiene_report_version, VERSION);
assert.equal(repo.release_gate, 'final_repo_hygiene_clear');
assert.equal(repo.live_fetching_performed, false);
assert.equal(repo.verification_claimed, false);

const packet = Object.assign({}, fixture, {
  golden_end_to_end_demo_report:{failed_stage_count:0, live_fetching_performed:false, provider_execution_performed:false},
  golden_export_pack_validation_report:{missing_required_paths:[]},
  golden_workflow_corpus:{deterministic:true, live_fetching_performed:false, provider_execution_performed:false},
  privacy_export:{release_gate:'pass'},
  export_pack:{format:'export_pack_v3'},
  ci_validation:{no_browser_passed:true, browser_passed:true, hosted_evidence_accepted:true}
});
const exportResult = {manifest:{export_pack_format:'export_pack_v3'}, files:hygiene.REQUIRED_EXPORT_PATHS.map((path) => ({path}))};
const bundle = hygiene.buildReleaseCandidateHygieneBundle(packet, corpus, exportResult, {version:VERSION});
for (const key of ['final_repo_hygiene_report','stale_release_copy_sweep','golden_workflow_regression_lock','export_pack_artifact_consistency_lock','hosted_demo_evidence_runbook','no_browser_browser_ci_parity_report','release_candidate_readiness_report']) assert.ok(bundle[key], `missing ${key}`);
assert.equal(bundle.golden_workflow_regression_lock.release_gate, 'golden_workflow_regression_locked');
assert.equal(bundle.export_pack_artifact_consistency_lock.release_gate, 'export_pack_artifact_consistency_locked');
assert.equal(bundle.no_browser_browser_ci_parity_report.release_gate, 'ci_parity_ready_for_lock');
assert.equal(bundle.release_candidate_readiness_report.no_new_major_feature_surface, true);
assert.equal(bundle.release_candidate_readiness_report.live_connector_expansion, false);
assert.equal(bundle.release_candidate_readiness_report.live_provider_execution_expansion, false);
assert.equal(bundle.release_candidate_readiness_report.oauth_backend_expansion, false);
assert.equal(bundle.release_candidate_readiness_report.automatic_source_verification_claimed, false);

assert.ok(index.includes('src/research/release-candidate-hygiene.js'));
assert.ok(index.indexOf('golden-workflow-corpus.js') < index.indexOf('release-candidate-hygiene.js'), 'hygiene module must load after golden workflow corpus');
assert.ok(index.indexOf('release-candidate-hygiene.js') < index.indexOf('export-pack.js'), 'hygiene module must load before export pack');
assert.ok(engine.includes('releaseCandidateHygiene'), 'research engine must reference releaseCandidateHygiene');
assert.ok(engine.includes('releaseCandidateHygieneBundle'), 'research packet must build release candidate hygiene bundle');
assert.ok(exportPack.includes('releaseCandidateHygieneFiles'), 'export pack must include release candidate hygiene files');
assert.ok(exportPack.includes('release-candidate/release-candidate-readiness-report.json'), 'export pack must emit release candidate readiness report');

for (const key of ['final_repo_hygiene_report','stale_release_copy_sweep','golden_workflow_regression_lock','export_pack_artifact_consistency_lock','hosted_demo_evidence_runbook','no_browser_browser_ci_parity_report','release_candidate_readiness_report']) {
  assert.ok(schema.properties[key], `schema missing ${key}`);
  assert.ok(fixture[key], `fixture missing ${key}`);
}
assert.equal(fixture.workflow_version, VERSION);
assert.equal(fixture.final_repo_hygiene_report.final_repo_hygiene_report_version, VERSION);
assert.equal(fixture.release_candidate_readiness_report.release_candidate_readiness_report_version, VERSION);
assert.ok(registry.gates['no-browser'].node_checks.includes('tests/release-candidate-final-hygiene-check.mjs'));
assert.ok(registry.gates.release.node_checks.includes('tests/release-candidate-final-hygiene-check.mjs'));
assert.ok(registry.syntax_matrix.files.includes('src/research/release-candidate-hygiene.js'));

console.log('Release candidate final hygiene checks passed.');
process.exit(0);
