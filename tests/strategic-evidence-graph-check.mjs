import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture, registryHasMigrationFixture, registryHasPrivacyFixture } from './fixture-registry-loader.mjs';

const VERSION = '1.2.0-alpha.2';
const read = (file) => fs.readFileSync(file, 'utf8');
const graphSource = read('src/research/strategic-evidence-graph.js');
const engineSource = read('src/research-engine.js');
const stateStoreSource = read('src/research/state-store.js');
const exportPackSource = read('src/research/export-pack.js');
const index = read('index.html');
const schema = JSON.parse(read('schema/research-workflow.schema.json'));
const fixture = JSON.parse(read('fixtures/research/sample-research-workflow-en.json'));
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.2.0-alpha.2-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.2.0-alpha.2.json');
const registry = JSON.parse(read('tests/ci-gate-registry.json'));

new vm.Script(graphSource, {filename:'src/research/strategic-evidence-graph.js'});
const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(graphSource, context, {filename:'src/research/strategic-evidence-graph.js'});
const graph = context.window.Jarbou3iResearchModules.strategicEvidenceGraph;
assert.equal(graph.VERSION, VERSION);
assert.equal(graph.GRAPH_MODEL, 'strategic_evidence_graph.v1');
assert.equal(typeof graph.buildGraph, 'function');
assert.equal(typeof graph.buildGraphExports, 'function');

const built = graph.buildGraph({
  evidence: [
    {evidence_id:'E1', claim:'OpenAI uses Microsoft and NVIDIA infrastructure signals.', source_title:'Official note', source_url:'https://openai.com/example', source_type:'primary', source_date:'2026-05-20', confidence:'high', supports:['A1','T1'], contradicts:[]},
    {evidence_id:'E2', claim:'A counter-source disputes NVIDIA dependency claims.', source_title:'Counter source', source_url:'https://example.com/counter', source_type:'news', source_date:'2026-05-21', confidence:'medium', supports:['R1'], contradicts:['N1']}
  ],
  source_clusters: [{cluster_id:'CL1', cluster_label:'AI infrastructure', target_id:'T1', evidence_ids:['E1','E2'], review_gate:'cluster_review_required', reliability_score:75, attention_signal_score:40, traceability_score:90, gap_flags:['counter_evidence_absent']}],
  entity_profiles: [{entity_id:'EN1', canonical_name:'OpenAI', category:'organization', aliases:['Open AI'], evidence_ids:['E1'], cluster_ids:['CL1'], strategic_relevance_score:88, review_gate:'entity_review_required'}],
  causal_links: [{from:'A1', to:'T1', relationship:'enables', evidence_ids:['E1'], confidence:'medium'}]
}, {version:VERSION, now:'2026-05-22T00:00:00.000Z'});
assert.equal(built.strategic_evidence_graph_version, VERSION);
assert.equal(built.graph_model, 'strategic_evidence_graph.v1');
assert.ok(built.graph_nodes.some((n)=>n.node_type === 'evidence'));
assert.ok(built.graph_nodes.some((n)=>n.node_type === 'entity'));
assert.ok(built.graph_nodes.some((n)=>n.node_type === 'source_cluster'));
assert.ok(built.graph_nodes.some((n)=>n.node_type === 'causal_link'));
assert.ok(built.graph_edges.some((e)=>e.edge_type === 'mentioned_in_evidence'));
assert.ok(built.graph_edges.some((e)=>e.edge_type === 'clusters_evidence'));
assert.ok(built.graph_edges.some((e)=>e.edge_type === 'supports'));
assert.equal(built.live_fetching_performed, false);
assert.equal(built.verification_claimed, false);
assert.ok(built.graph_exports.gephi_nodes_csv.startsWith('Id,Label,Type'));
assert.ok(built.graph_exports.gephi_edges_csv.startsWith('Source,Target,Type'));
assert.ok(built.graph_exports.kumu_json.includes('elements'));
assert.ok(built.graph_exports.neo4j_nodes_csv.startsWith('id:ID,label,node_type:LABEL'));
assert.ok(built.graph_exports.neo4j_edges_csv.startsWith(':START_ID,:END_ID,:TYPE'));
assert.equal(built.graph_quality_report.graph_quality_report_version, VERSION);
assert.equal(built.graph_export_report.graph_export_report_version, VERSION);
assert.ok(built.graph_export_report.formats.includes('gephi_csv'));
assert.ok(built.graph_export_report.formats.includes('kumu_json'));
assert.ok(built.graph_export_report.formats.includes('neo4j_csv'));

assert.ok(index.includes('src/research/strategic-evidence-graph.js'), 'strategic evidence graph module must load');
assert.ok(index.indexOf('strategic-evidence-graph.js') < index.indexOf('research-engine.js'), 'graph module must load before research-engine');
assert.ok(engineSource.includes('strategicEvidenceGraph'), 'research-engine must consume strategicEvidenceGraph');
assert.ok(engineSource.includes('strategic_evidence_graph'), 'research packet must export strategic_evidence_graph');
assert.ok(engineSource.includes('graph_quality_report'), 'research packet must export graph quality report');
assert.ok(engineSource.includes('graph_export_report'), 'research packet must export graph export report');
assert.ok(stateStoreSource.includes('strategic_evidence_graph'), 'state store must preserve graph bundle');
assert.ok(exportPackSource.includes('graph/gephi-nodes.csv'), 'export pack must include Gephi nodes');
assert.ok(exportPackSource.includes('graph/kumu-map.json'), 'export pack must include Kumu JSON');
assert.ok(exportPackSource.includes('graph/neo4j-nodes.csv'), 'export pack must include Neo4J nodes');

assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(schema.required.includes('strategic_evidence_graph'));
assert.ok(schema.required.includes('graph_quality_report'));
assert.ok(schema.required.includes('graph_export_report'));
assert.equal(schema.$defs.strategic_evidence_graph.properties.strategic_evidence_graph_version.const, VERSION);
assert.equal(schema.$defs.graph_quality_report.properties.graph_quality_report_version.const, VERSION);
assert.equal(schema.$defs.graph_export_report.properties.graph_export_report_version.const, VERSION);
assert.equal(schema.$defs.graph_node.properties.node_type.type, 'string');
assert.equal(schema.$defs.graph_edge.properties.edge_model.const, 'strategic_evidence_graph.v1');

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, VERSION);
  assert.equal(packet.strategic_evidence_graph.strategic_evidence_graph_version, VERSION);
  assert.equal(packet.strategic_evidence_graph.graph_model, 'strategic_evidence_graph.v1');
  assert.ok(Array.isArray(packet.strategic_evidence_graph.graph_nodes));
  assert.ok(Array.isArray(packet.strategic_evidence_graph.graph_edges));
  assert.equal(packet.graph_quality_report.graph_quality_report_version, VERSION);
  assert.equal(packet.graph_export_report.graph_export_report_version, VERSION);
  assert.equal(packet.strategic_evidence_graph.live_fetching_performed, false);
  assert.equal(packet.strategic_evidence_graph.verification_claimed, false);
  assert.ok(packet.graph_export_report.formats.includes('gephi_csv'));
  assert.ok(packet.graph_export_report.formats.includes('kumu_json'));
  assert.ok(packet.graph_export_report.formats.includes('neo4j_csv'));
  assert.equal(packet.release_notes.release_title, 'v1.2.0-alpha.2 â€” Source-to-Brief Intelligence Workbench');
}
assert.ok(registry.gates.source.node_checks.includes('tests/strategic-evidence-graph-check.mjs'), 'source gate must register graph check');
assert.ok(registry.gates.release.node_checks.includes('tests/strategic-evidence-graph-check.mjs'), 'release gate must register graph check');
assert.ok(registry.syntax_matrix.files.includes('src/research/strategic-evidence-graph.js'), 'syntax matrix must cover graph module');
assert.ok(registry.syntax_matrix.files.includes('tests/strategic-evidence-graph-check.mjs'), 'syntax matrix must cover graph check');
assert.ok(registryHasMigrationFixture('fixtures/migrations/v1.2.0-alpha.2-packet.json'));
assert.ok(registryHasPrivacyFixture('fixtures/privacy/browser-generated-export-v1.2.0-alpha.2.json'));
assert.equal(registry.runtime_capability_change, false);
assert.equal(registry.source_behavior_changed, false);
console.log('Strategic evidence graph checks passed.');
process.exit(0);
