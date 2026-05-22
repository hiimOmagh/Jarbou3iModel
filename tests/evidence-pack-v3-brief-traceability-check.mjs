import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.1.0-rc.2-fix.3';
const moduleSource = fs.readFileSync('src/research/evidence-pack-v3.js', 'utf8');
const exportPackSource = fs.readFileSync('src/research/export-pack.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');
const schema = JSON.parse(fs.readFileSync('schema/research-workflow.schema.json', 'utf8'));
const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));

new vm.Script(moduleSource, { filename:'src/research/evidence-pack-v3.js' });
new vm.Script(exportPackSource, { filename:'src/research/export-pack.js' });
const context = { console, window:{Jarbou3iResearchModules:{}}, globalThis:null, TextEncoder };
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename:'src/research/evidence-pack-v3.js' });
vm.runInContext(exportPackSource, context, { filename:'src/research/export-pack.js' });

const packV3 = context.window.Jarbou3iResearchModules.evidencePackV3;
const exportPack = context.window.Jarbou3iResearchModules.exportPack;
assert.equal(packV3.VERSION, VERSION);
assert.equal(packV3.MODEL, 'evidence_pack_v3.v1');
assert.equal(exportPack.EXPORT_PACK_VERSION, VERSION);
assert.equal(exportPack.EXPORT_PACK_NAME, 'Export Pack v3');

const packet = JSON.parse(JSON.stringify(fixture));
packet.analysis_brief.handoff_summary = 'Conclusion paragraph uses E1 and E2 for traceability.';
const trace = packV3.buildBriefTraceabilityReport(packet, {version:VERSION});
assert.equal(trace.brief_traceability_version, VERSION);
assert.equal(trace.traceability_model, 'evidence_pack_v3.v1');
assert.ok(trace.paragraph_count >= 1);
assert.ok(trace.traceability_coverage_pct >= 1);
assert.ok(trace.evidence_to_conclusion_traceability_blocks.some((block) => block.evidence_ids.includes('E1')));
assert.equal(trace.live_fetching_performed, false);
assert.equal(trace.verification_claimed, false);

const appendix = packV3.buildContradictionFalsifierAppendix(packet, {version:VERSION});
assert.equal(appendix.contradiction_falsifier_appendix_version, VERSION);
assert.equal(appendix.appendix_model, 'evidence_pack_v3.v1');
assert.equal(appendix.live_fetching_performed, false);
assert.equal(appendix.verification_claimed, false);
assert.ok(Array.isArray(appendix.falsifiers));

const consistency = packV3.buildBundleConsistencyReport(packet, {version:VERSION});
assert.equal(consistency.bundle_consistency_report_version, VERSION);
assert.equal(consistency.bundle_model, 'evidence_pack_v3.v1');
assert.equal(consistency.live_fetching_performed, false);
assert.equal(consistency.verification_claimed, false);
assert.ok(consistency.consistency_score >= 0);

const readiness = packV3.buildPublicationReadinessExportReport(packet, trace, consistency, appendix, {version:VERSION});
assert.equal(readiness.publication_readiness_export_report_version, VERSION);
assert.equal(readiness.report_model, 'evidence_pack_v3.v1');
assert.equal(readiness.live_fetching_performed, false);
assert.equal(readiness.verification_claimed, false);

const bundle = packV3.buildEvidencePackV3Bundle(packet, [], {version:VERSION});
assert.equal(bundle.evidence_pack_v3_manifest.export_pack_format, 'export_pack_v3');
assert.equal(bundle.evidence_pack_v3_manifest.export_pack_version, VERSION);
assert.equal(bundle.evidence_pack_v3_manifest.live_fetching_performed, false);
assert.equal(bundle.evidence_pack_v3_manifest.verification_claimed, false);

const generated = exportPack.createExportPack(Object.assign({}, packet, bundle), {version:VERSION});
assert.equal(generated.export_pack_version, VERSION);
assert.equal(generated.export_pack_format, 'export_pack_v3');
assert.ok(generated.files.some((file) => file.path === 'traceability/brief-traceability-report.json'));
assert.ok(generated.files.some((file) => file.path === 'traceability/contradiction-falsifier-appendix.json'));
assert.ok(generated.files.some((file) => file.path === 'traceability/evidence-pack-v3-manifest.json'));
assert.ok(generated.manifest.export_pack_format === 'export_pack_v3');

assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(schema.required.includes('evidence_pack_v3_manifest'));
assert.ok(schema.required.includes('brief_traceability_report'));
assert.ok(schema.required.includes('contradiction_falsifier_appendix'));
assert.ok(schema.required.includes('publication_readiness_export_report'));
assert.equal(schema.$defs.brief_traceability_report.properties.traceability_model.const, 'evidence_pack_v3.v1');
assert.equal(fixture.workflow_version, VERSION);
assert.equal(fixture.evidence_pack_v3_manifest.export_pack_format, 'export_pack_v3');
assert.equal(fixture.brief_traceability_report.traceability_model, 'evidence_pack_v3.v1');
assert.equal(fixture.contradiction_falsifier_appendix.live_fetching_performed, false);
assert.equal(fixture.publication_readiness_export_report.verification_claimed, false);
assert.ok(index.includes('src/research/evidence-pack-v3.js'));
assert.ok(index.indexOf('evidence-pack-v3.js') < index.indexOf('export-pack.js'), 'evidence-pack-v3 must load before export-pack');

console.log('Evidence Pack v3 and brief traceability checks passed.');
process.exit(0);
