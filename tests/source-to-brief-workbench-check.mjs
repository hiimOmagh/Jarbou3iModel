import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.2.0-alpha.8';
const context = { console, TextEncoder, window: { Jarbou3iResearchModules: {} } };
context.globalThis = context;
context.window = context;
vm.createContext(context);

for (const file of [
  'src/research/privacy-export-guard.js',
  'src/research/privacy-audit.js',
  'src/research/export-controller.js',
  'src/research/evidence-pack-v3.js',
  'src/research/source-to-brief-workbench.js',
  'src/research/export-pack.js'
]) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}

const modules = context.window.Jarbou3iResearchModules;
const workbenchApi = modules.sourceToBriefWorkbench;
assert.equal(workbenchApi.VERSION, VERSION);
assert.equal(workbenchApi.MODEL, 'source_to_brief_workbench.v1');

const packet = {
  workflow_version: VERSION,
  research_plan: {
    plan_version: VERSION,
    topic: 'AI chip export controls',
    questions: ['How do export controls reshape leverage?'],
    counter_evidence_targets: ['Find evidence that controls did not alter supply chains.']
  },
  evidence_matrix: [
    {evidence_id:'E1', claim:'Official rule documents expanded AI chip export restrictions.', source_title:'Official rule', source_url:'https://example.gov/rule', source_type:'official', source_date:'2026-05-01', evidence_strength:5, public_signal_score:1, confidence:'high', supports:['I1'], contradicts:[]},
    {evidence_id:'E2', claim:'Industry filing reports compliance-driven supply chain changes.', source_title:'Company filing', source_url:'https://example.com/filing', source_type:'primary', source_date:'2026-05-02', evidence_strength:4, public_signal_score:2, confidence:'medium', supports:['I1'], contradicts:[]},
    {evidence_id:'E3', claim:'Public commentary disputes the scale of the controls.', source_title:'Public thread', source_url:'https://example.social/thread', source_type:'social', source_date:'2026-05-03', evidence_strength:2, public_signal_score:5, confidence:'low', supports:['N1'], contradicts:['I1']},
    {evidence_id:'E4', claim:'Analyst note lacks a source URL and date.', source_title:'Manual note', source_url:'', source_type:'other', source_date:'unknown', evidence_strength:1, public_signal_score:4, confidence:'low', supports:[], contradicts:[]}
  ],
  causal_links: [{from:'N1', to:'I1', relationship:'contradicts', evidence_ids:['E3'], confidence:'medium'}],
  analysis_brief: {
    brief_version: VERSION,
    topic: 'AI chip export controls',
    handoff_summary: 'Manual brief handoff; source evidence still needs review.'
  },
  source_gap_report: {
    global_gap_flags: ['source_type_diversity_low'],
    cluster_gap_flags: ['social_attention_without_confirmation']
  },
  live_fetching_performed: false,
  verification_claimed: false
};

const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version: VERSION, now:'2026-05-23T00:00:00.000Z'});
assert.equal(workbench.source_to_brief_version, VERSION);
assert.deepEqual(Array.from(workbench.workflow_steps), ['research_question','research_plan','evidence_cards','claim_map','contradiction_map','source_gaps','confidence_review','exportable_strategic_brief']);
assert.equal(workbench.live_fetching_performed, false);
assert.equal(workbench.provider_execution_expanded, false);
assert.equal(workbench.backend_behavior_expanded, false);
assert.equal(workbench.production_oauth_enabled, false);
assert.equal(workbench.automatic_source_verification_claimed, false);
assert.equal(workbench.verification_claimed, false);
assert.ok(workbench.blocked_unavailable_capabilities.includes('live_scraping'));
assert.ok(workbench.blocked_unavailable_capabilities.includes('automatic_source_verification'));

const i1 = workbench.claim_map.find((claim) => claim.claim_id === 'I1');
const n1 = workbench.claim_map.find((claim) => claim.claim_id === 'N1');
const rq1 = workbench.claim_map.find((claim) => claim.claim_id === 'RQ1');
assert.equal(i1.support_level, 'strong');
assert.equal(n1.support_level, 'partial');
assert.equal(rq1.support_level, 'unsupported');
assert.deepEqual(Array.from(i1.supporting_evidence_ids).sort(), ['E1','E2']);
assert.deepEqual(Array.from(i1.contradicting_evidence_ids), ['E3']);

assert.ok(workbench.evidence_to_claim_links.some((link) => link.evidence_id === 'E3' && link.relationship === 'contradicts' && link.claim_id === 'I1'));
assert.ok(workbench.contradiction_groups.some((group) => group.target_claim_id === 'I1' && group.contradicting_evidence_ids.includes('E3')));
assert.ok(workbench.source_gaps.warnings.some((warning) => warning.warning === 'missing_source_url' && warning.evidence_id === 'E4'));
assert.ok(workbench.source_gaps.warnings.some((warning) => warning.warning === 'claim_without_supporting_evidence' && warning.claim_id === 'RQ1'));
assert.equal(workbench.confidence_review.manual_review_required, true);
assert.equal(workbench.confidence_review.support_level_counts.strong, 1);
assert.equal(workbench.confidence_review.support_level_counts.unsupported, 1);
assert.equal(workbench.exportable_strategic_brief.publication_status, 'not_publication_ready');
assert.ok(workbench.exportable_strategic_brief.source_boundary_note.includes('does not verify'));

const pack = modules.exportPack.createExportPack(Object.assign({}, packet, {
  source_to_brief_workbench: workbench,
  source_to_brief_package: workbench,
  privacy_export: {release_gate:'pass'},
  evidence_pack_v3_manifest: null
}), {version: VERSION});
const paths = pack.files.map((file) => file.path);
for (const required of [
  'source-to-brief/source-to-brief-package.json',
  'source-to-brief/strategic-brief.md',
  'source-to-brief/claim-map.csv',
  'source-to-brief/source-gaps.json',
  'source-to-brief/confidence-review.json'
]) {
  assert.ok(paths.includes(required), `missing source-to-brief export file ${required}`);
}
const exported = JSON.parse(pack.files.find((file) => file.path === 'source-to-brief/source-to-brief-package.json').content);
assert.equal(exported.automatic_source_verification_claimed, false);
assert.equal(exported.live_fetching_performed, false);
assert.equal(exported.provider_execution_expanded, false);
assert.equal(exported.evidence_cards[0].source_provenance, 'user_provided_or_source_imported_evidence');
assert.equal(pack.files.map((file) => file.content).join('\n').includes('verified sources'), false);

console.log('Source-to-brief workbench checks passed.');
process.exit(0);
