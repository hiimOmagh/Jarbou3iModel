import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.1.0-rc.0';
const read = (file) => fs.readFileSync(file, 'utf8');
const scorerSource = read('src/research/evidence-scorer.js');
const clusterSource = read('src/research/source-cluster-engine.js');
const entitySource = read('src/research/entity-intelligence.js');
const engineSource = read('src/research-engine.js');
const stateStoreSource = read('src/research/state-store.js');
const index = read('index.html');
const schema = JSON.parse(read('schema/research-workflow.schema.json'));
const registry = JSON.parse(read('tests/ci-gate-registry.json'));

for (const [file, source] of [
  ['src/research/evidence-scorer.js', scorerSource],
  ['src/research/source-cluster-engine.js', clusterSource],
  ['src/research/entity-intelligence.js', entitySource],
  ['src/research-engine.js', engineSource],
  ['src/research/state-store.js', stateStoreSource]
]) new vm.Script(source, {filename:file});

const context = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(scorerSource, context, {filename:'src/research/evidence-scorer.js'});
vm.runInContext(clusterSource, context, {filename:'src/research/source-cluster-engine.js'});
vm.runInContext(entitySource, context, {filename:'src/research/entity-intelligence.js'});

const scorer = context.window.Jarbou3iResearchModules.evidenceScorer;
const clusterEngine = context.window.Jarbou3iResearchModules.sourceClusterEngine;
const entity = context.window.Jarbou3iResearchModules.entityIntelligence;
assert.equal(entity.VERSION, VERSION);
assert.equal(entity.MODEL, 'entity_intelligence_layer.v1');
assert.equal(typeof entity.buildEntityIntelligence, 'function');
assert.equal(entity.classifyEntity('OpenAI', 'AI platform provider'), 'organization');
assert.equal(entity.classifyEntity('Semiconductor export controls', 'policy restriction'), 'policy');
assert.ok(entity.similarity('TSMC', 'T.S.M.C') > 0.5 || entity.extractCandidateNames('TSMC and Taiwan Semiconductor Manufacturing Company').includes('TSMC'));

const evidence = [
  {evidence_id:'E1', claim:'OpenAI and Microsoft expanded AI compute partnerships while NVIDIA chips remained constrained by export controls.', source_title:'Official AI compute partnership notice', source_url:'https://openai.com/example', source_type:'official', source_date:'2026-02-10', evidence_strength:5, public_signal_score:3, time_relevance_score:5, confidence:'high', supports:['A1','T1'], contradicts:[]},
  {evidence_id:'E2', claim:'TSMC reported demand linked to NVIDIA GPU supply and Taiwan semiconductor capacity.', source_title:'TSMC investor report', source_url:'https://tsmc.com/example', source_type:'primary', source_date:'2026-02-11', evidence_strength:5, public_signal_score:2, time_relevance_score:5, confidence:'high', supports:['A2','R1'], contradicts:[]},
  {evidence_id:'E3', claim:'Reddit users claimed OpenAI depends entirely on Microsoft and NVIDIA for AI chips.', source_title:'Reddit AI infrastructure thread', source_url:'https://reddit.com/r/example/comments/ai', source_type:'social', source_date:'2026-02-12', evidence_strength:2, public_signal_score:5, time_relevance_score:5, confidence:'low', supports:['N1'], contradicts:['R1']},
  {evidence_id:'E4', claim:'European Union policy debate focused on AI infrastructure sovereignty and semiconductor controls.', source_title:'EU policy debate note', source_url:'https://europa.eu/example', source_type:'official', source_date:'2026-02-13', evidence_strength:4, public_signal_score:2, time_relevance_score:5, confidence:'medium', supports:['N1','T1'], contradicts:[]}
].map((item) => scorer.attachEvidenceScoring(item, {version: VERSION, now:'2026-05-21T00:00:00.000Z'}));
const clusterIntel = clusterEngine.buildSourceClusterIntelligence(evidence, {version: VERSION, now:'2026-05-21T00:00:00.000Z'});
const intel = entity.buildEntityIntelligence(evidence, clusterIntel.clusters, {version: VERSION, now:'2026-05-21T00:00:00.000Z', ignore_list:['Official']});
assert.equal(intel.entity_intelligence_version, VERSION);
assert.equal(intel.live_fetching_performed, false);
assert.equal(intel.verification_claimed, false);
assert.ok(intel.entity_profiles.length >= 5, 'entity profiles should be extracted from evidence');
const openai = intel.entity_profiles.find((p) => /openai/i.test(p.canonical_name));
assert.ok(openai, 'OpenAI entity profile missing');
assert.ok(openai.evidence_ids.includes('E1'));
assert.ok(openai.evidence_ids.includes('E3'));
assert.ok(openai.cluster_ids.length >= 1, 'entities should link to source clusters');
assert.equal(openai.live_fetching_performed, false);
assert.equal(openai.verification_claimed, false);
assert.ok(['organization','technology','platform','other'].includes(openai.category));
assert.ok(intel.entity_map_report.entity_count >= 5);
assert.equal(intel.entity_map_report.entity_model, 'entity_intelligence_layer.v1');
assert.equal(intel.entity_map_report.policy, 'local_entity_extraction_no_external_model_no_fetch_no_verification');
assert.equal(intel.entity_alias_report.fuzzy_merge_policy, 'canonical_normalization_initials_and_levenshtein_0_86');

assert.ok(index.includes('src/research/entity-intelligence.js'), 'entity module must load in index');
assert.ok(index.indexOf('entity-intelligence.js') < index.indexOf('research-engine.js'), 'entity module must load before research-engine');
assert.ok(engineSource.includes('entityIntelligence'), 'research-engine must consume entityIntelligence');
assert.ok(engineSource.includes('entity_profiles'), 'research packet must export entity profiles');
assert.ok(engineSource.includes('entity_map_report'), 'research packet must export entity map report');
assert.ok(stateStoreSource.includes('entity_profiles'), 'state store must preserve entity profiles');
assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(schema.properties.entity_profiles, 'schema must expose entity_profiles');
assert.ok(schema.properties.entity_map_report, 'schema must expose entity_map_report');
assert.ok(schema.properties.entity_alias_report, 'schema must expose entity_alias_report');
assert.equal(schema.$defs.entity_profile.properties.entity_model.const, 'entity_intelligence_layer.v1');
assert.equal(schema.$defs.entity_map_report.properties.entity_model.const, 'entity_intelligence_layer.v1');
assert.ok(registry.gates.source.node_checks.includes('tests/entity-intelligence-layer-check.mjs'), 'source gate must register entity intelligence check');
assert.ok(registry.syntax_matrix.files.includes('src/research/entity-intelligence.js'), 'syntax matrix must cover entity module');
assert.equal(registry.runtime_capability_change, false);
assert.equal(registry.source_behavior_changed, false);

console.log('Entity intelligence layer checks passed.');
process.exit(0);
