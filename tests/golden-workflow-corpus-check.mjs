import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0-rc.1';
const source = fs.readFileSync('src/research/golden-workflow-corpus.js', 'utf8');
const engine = fs.readFileSync('src/research-engine.js', 'utf8');
const exportPackSource = fs.readFileSync('src/research/export-pack.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');
const schema = JSON.parse(fs.readFileSync('schema/research-workflow.schema.json', 'utf8'));
const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));
const goldenFixture = JSON.parse(fs.readFileSync('fixtures/research/golden-workflow-corpus-v1.3.0-rc.1.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

new vm.Script(source, {filename:'src/research/golden-workflow-corpus.js'});
const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(source, context, {filename:'src/research/golden-workflow-corpus.js'});
const golden = context.window.Jarbou3iResearchModules.goldenWorkflowCorpus;

assert.equal(pkg.version, VERSION);
assert.equal(golden.VERSION, VERSION);
assert.equal(golden.MODEL, 'golden_workflow_corpus.v1');
const corpus = golden.buildGoldenWorkflowCorpus({version:VERSION});
assert.equal(corpus.corpus_version, VERSION);
assert.equal(corpus.corpus_id, 'golden-workflow-alpha24');
assert.equal(corpus.live_fetching_performed, false);
assert.equal(corpus.provider_execution_performed, false);
assert.equal(corpus.verification_claimed, false);
assert.ok(corpus.evidence_matrix.length >= 5);
assert.ok(corpus.entity_profiles.length >= 2);
assert.ok(corpus.source_clusters.length >= 2);
assert.ok(corpus.strategic_evidence_graph.graph_nodes.length >= 3);

const report = golden.buildGoldenEndToEndDemoReport(Object.assign({}, fixture, corpus, {publication_review_gate_report:{release_gate:'publication_review_passed_manual_review_required'}, export_pack:{format:'export_pack_v3'}}), {version:VERSION});
assert.equal(report.golden_end_to_end_demo_report_version, VERSION);
assert.equal(report.demo_model, 'golden_workflow_corpus.v1');
assert.equal(report.live_fetching_performed, false);
assert.equal(report.provider_execution_performed, false);
assert.equal(report.verification_claimed, false);
assert.equal(report.failed_stage_count, 0);

const exportValidation = golden.buildGoldenExportPackValidationReport(fixture, {files:[
  {path:'export-manifest.json'}, {path:'research-packet.json'}, {path:'analysis-brief.md'}, {path:'evidence-matrix.csv'}, {path:'traceability/brief-traceability-report.json'}, {path:'publication-review/publication-review-gate-report.json'}], manifest:{export_pack_format:'export_pack_v3'}}, {version:VERSION});
assert.equal(exportValidation.golden_export_pack_validation_report_version, VERSION);
assert.equal(exportValidation.missing_required_paths.length, 0);
assert.equal(exportValidation.release_gate, 'golden_export_pack_reviewable');

const scenario = golden.buildHostedDemoScenarioEvidence(fixture, {version:VERSION});
assert.equal(scenario.hosted_demo_scenario_evidence_version, VERSION);
assert.equal(scenario.app_version_expected, VERSION);
assert.ok(scenario.required_captures.includes('desktop-first-screen.png'));
assert.ok(scenario.required_visible_text_snapshots.includes('visible-text-en.json'));

const runbook = golden.buildReleaseReadinessRunbook(fixture, {version:VERSION});
assert.equal(runbook.release_readiness_runbook_version, VERSION);
assert.ok(runbook.steps.some((step) => step.includes('no-browser')));
assert.ok(runbook.blocker_policy.some((item) => item.includes('Screenshots alone')));

const bundle = golden.buildGoldenWorkflowBundle(fixture, null, {version:VERSION});
for (const key of ['golden_workflow_corpus','golden_end_to_end_demo_report','golden_export_pack_validation_report','hosted_demo_scenario_evidence','release_readiness_runbook']) assert.ok(bundle[key], `missing ${key}`);

for (const key of ['golden_workflow_corpus','golden_end_to_end_demo_report','golden_export_pack_validation_report','hosted_demo_scenario_evidence','release_readiness_runbook']) {
  assert.ok(schema.properties[key], `schema missing ${key}`);
  assert.ok(fixture[key], `fixture missing ${key}`);
}
assert.equal(goldenFixture.corpus_version, VERSION);
assert.equal(goldenFixture.corpus_model, 'golden_workflow_corpus.v1');
assert.ok(index.includes('src/research/golden-workflow-corpus.js'));
assert.ok(index.indexOf('publication-review-gate.js') < index.indexOf('golden-workflow-corpus.js'), 'golden workflow module must load after publication review gate');
assert.ok(index.indexOf('golden-workflow-corpus.js') < index.indexOf('export-pack.js'), 'golden workflow module must load before export pack');
assert.ok(engine.includes('goldenWorkflowCorpus'), 'research engine must reference golden workflow corpus');
assert.ok(engine.includes('goldenWorkflowBundle'), 'research packet must build golden workflow bundle');
assert.ok(exportPackSource.includes('goldenWorkflowFiles'), 'export pack must include golden workflow files');
assert.ok(exportPackSource.includes('golden/golden-end-to-end-demo-report.json'), 'export pack must emit golden workflow reports');
assert.ok(registry.gates['no-browser'].node_checks.includes('tests/golden-workflow-corpus-check.mjs'));
assert.ok(registry.gates.release.node_checks.includes('tests/golden-workflow-corpus-check.mjs'));
assert.ok(registry.syntax_matrix.files.includes('src/research/golden-workflow-corpus.js'));

console.log('Golden workflow corpus and end-to-end demo checks passed.');
process.exit(0);
