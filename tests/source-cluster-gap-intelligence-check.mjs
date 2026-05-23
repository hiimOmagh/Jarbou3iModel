import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.2.0-alpha.6';
const read = (file) => fs.readFileSync(file, 'utf8');
const scorerSource = read('src/research/evidence-scorer.js');
const clusterSource = read('src/research/source-cluster-engine.js');
const engineSource = read('src/research-engine.js');
const index = read('index.html');
const schema = JSON.parse(read('schema/research-workflow.schema.json'));
const registry = JSON.parse(read('tests/ci-gate-registry.json'));

new vm.Script(scorerSource, {filename:'src/research/evidence-scorer.js'});
new vm.Script(clusterSource, {filename:'src/research/source-cluster-engine.js'});

const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(scorerSource, context, {filename:'src/research/evidence-scorer.js'});
vm.runInContext(clusterSource, context, {filename:'src/research/source-cluster-engine.js'});

const scorer = context.window.Jarbou3iResearchModules.evidenceScorer;
const clusterEngine = context.window.Jarbou3iResearchModules.sourceClusterEngine;
assert.equal(clusterEngine.VERSION, VERSION);
assert.equal(typeof clusterEngine.buildSourceClusterIntelligence, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official semiconductor controls expanded export restrictions against advanced AI chips.', source_title:'Official export control notice', source_url:'https://commerce.gov/export-controls-ai-chips', source_type:'official', source_date:'2026-01-10', evidence_strength:5, public_signal_score:2, time_relevance_score:5, confidence:'high', supports:['T1'], contradicts:[]},
  {evidence_id:'E2', claim:'A major newspaper reported expanded export restrictions for advanced AI chips.', source_title:'News export controls report', source_url:'https://example-news.test/ai-chip-export-controls', source_type:'news', source_date:'2026-01-11', evidence_strength:4, public_signal_score:3, time_relevance_score:5, confidence:'medium', supports:['T1'], contradicts:[]},
  {evidence_id:'E3', claim:'Social media claimed the AI chip export control expansion was immediate and total.', source_title:'Public discussion thread', source_url:'https://reddit.com/r/example/comments/abc', source_type:'social', source_date:'2026-01-12', evidence_strength:2, public_signal_score:5, time_relevance_score:5, confidence:'low', supports:['N1'], contradicts:['R1']},
  {evidence_id:'E4', claim:'Social media claimed the AI chip export control expansion was immediate and total.', source_title:'Duplicate public discussion thread', source_url:'https://reddit.com/r/example/comments/def', source_type:'social', source_date:'2026-01-12', evidence_strength:2, public_signal_score:5, time_relevance_score:5, confidence:'low', supports:['N1'], contradicts:['R1']},
  {evidence_id:'E5', claim:'Unlinked background note without source URL or date.', source_title:'Manual analyst note', source_url:'', source_type:'other', source_date:'unknown', evidence_strength:2, public_signal_score:1, time_relevance_score:2, confidence:'low', supports:[], contradicts:[]}
].map((item) => scorer.attachEvidenceScoring(item, {version: VERSION, now:'2026-05-21T00:00:00.000Z'}));

const intelligence = clusterEngine.buildSourceClusterIntelligence(evidence, {version: VERSION, now:'2026-05-21T00:00:00.000Z'});
assert.equal(intelligence.source_cluster_version, VERSION);
assert.equal(intelligence.live_fetching_performed, false);
assert.equal(intelligence.verification_claimed, false);
assert.ok(intelligence.clusters.length >= 4, 'target and unlinked clusters should be generated');
const t1 = intelligence.clusters.find((cluster) => cluster.target_id === 'T1');
assert.ok(t1, 'T1 cluster missing');
assert.ok(t1.source_types.includes('official'));
assert.ok(t1.source_types.includes('news'));
assert.equal(t1.review_gate, 'cluster_review_required');
assert.equal(t1.verification_claimed, false);
assert.equal(t1.live_fetching_performed, false);
assert.ok(Number.isFinite(t1.reliability_score));
assert.ok(Number.isFinite(t1.traceability_score));
const n1 = intelligence.clusters.find((cluster) => cluster.target_id === 'N1');
assert.ok(n1.duplicate_count >= 1, 'duplicate/overlap detection should flag repeated social claims');
assert.ok(n1.gap_flags.includes('social_only_cluster'));
assert.ok(intelligence.gap_report.global_gap_flags.includes('duplicate_or_overlap_review_required'));
assert.equal(intelligence.gap_report.release_gate, 'review_required');
assert.equal(intelligence.gap_report.policy, 'local_review_only_source_cluster_gap_intelligence_no_fetch_no_verification');

assert.ok(index.includes('src/research/source-cluster-engine.js'), 'source cluster engine must be loaded');
assert.ok(index.indexOf('source-cluster-engine.js') < index.indexOf('research-engine.js'), 'source cluster engine must load before research-engine');
assert.ok(engineSource.includes('sourceClusterEngine'), 'research-engine must consume sourceClusterEngine');
assert.ok(engineSource.includes('source_cluster_report'), 'research packet must export source cluster report');
assert.ok(engineSource.includes('source_gap_report'), 'research packet must export source gap report');
assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(schema.properties.source_clusters, 'schema must expose source_clusters');
assert.ok(schema.properties.source_cluster_report, 'schema must expose source_cluster_report');
assert.ok(schema.properties.source_gap_report, 'schema must expose source_gap_report');
assert.equal(schema.$defs.source_gap_report.properties.cluster_model.const, 'source_cluster_gap_intelligence.v1');
assert.ok(registry.gates.source.node_checks.includes('tests/source-cluster-gap-intelligence-check.mjs'), 'source gate must register source cluster check');
assert.ok(registry.syntax_matrix.files.includes('src/research/source-cluster-engine.js'), 'syntax matrix must cover source cluster engine');

console.log('Source cluster + gap intelligence checks passed.');
process.exit(0);
