import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context = {
  console,
  globalThis: {},
  Jarbou3iResearchModules: {}
};
context.window = context;
context.globalThis = context;

for (const file of [
  'src/research/evidence-workspace.js',
  'src/research/source-packet-importer.js',
  'src/research/source-import-adapter.js',
  'src/research/evidence-review-controller.js'
]) {
  const code = fs.readFileSync(file, 'utf8');
  vm.runInNewContext(code, context, { filename: file });
}

const modules = context.Jarbou3iResearchModules;
assert.ok(modules.evidenceWorkspace, 'evidenceWorkspace module should register');
assert.equal(modules.evidenceWorkspace.VERSION, '1.3.0-alpha.8');

const raw = modules.evidenceWorkspace.normalizeWorkspaceCandidate({
  claim: 'Official report supports I1 and contradicts N1 on procurement transparency.',
  source_title: 'Official report',
  source_url: 'https://example.gov/report',
  source_type: 'government',
  source_date: '2026-05-01',
  supports: ['I1'],
  contradicts: ['N1'],
  evidence_strength: 4,
  public_signal_score: 2,
  confidence: 'medium'
});

assert.equal(raw.source_type, 'official');
assert.equal(raw.source_confidence, 'high');
assert.equal(raw.contradiction_marker, true);
assert.deepEqual(raw.evidence_to_claim_links.map((link) => link.relationship).sort(), ['contradicts', 'supports']);
assert.equal(raw.workspace_meta.live_fetching_performed, false);
assert.equal(raw.workspace_meta.verification_claimed, false);

const weak = modules.evidenceWorkspace.normalizeWorkspaceCandidate({
  claim: 'A vague imported claim without traceability.',
  source_type: 'other',
  source_date: 'unknown',
  supports: [],
  contradicts: [],
  evidence_strength: 1,
  public_signal_score: 5
});
assert.ok(weak.source_gap_warnings.includes('missing_source_url'));
assert.ok(weak.source_gap_warnings.includes('missing_source_date'));
assert.ok(weak.source_gap_warnings.includes('no_evidence_to_claim_links'));
assert.ok(weak.source_gap_warnings.includes('attention_signal_without_reliability'));

const importText = `
- Finding: Official budget report supports I1. Source: https://example.gov/budget published 2026-05-02
- Counter-evidence: public comments contradict N1 and dispute the headline narrative https://reddit.com/r/example/comments/abc
`;
const parsed = modules.sourceImportAdapter.parseSourceImportText(importText, { format: 'auto' });
assert.equal(parsed.ok, true);
assert.equal(parsed.report.import_adapter_model, 'source_import_v2');
assert.equal(parsed.report.live_fetching_performed, false);
assert.equal(parsed.report.verification_claimed, false);
assert.equal(parsed.report.queue_only, true);
assert.ok(parsed.report.raw_candidate_count >= 2);
assert.ok(parsed.report.contradiction_candidate_count >= 1);
assert.ok(parsed.evidence.every((item) => item.workspace_meta?.workspace_version === '1.3.0-alpha.8'));

const packet = modules.sourcePacketImporter.examplePacket();
const packetParsed = modules.sourcePacketImporter.parseSourcePacketImportText(JSON.stringify(packet));
assert.equal(packetParsed.ok, true);
assert.equal(packetParsed.report.import_adapter_model, 'source_import_v2');
assert.equal(packetParsed.report.live_fetching_performed, false);
assert.equal(packetParsed.report.verification_claimed, false);
assert.ok(packetParsed.evidence.some((item) => item.contradiction_marker));

const queue = parsed.evidence.map((evidence, index) => modules.evidenceWorkspace.buildReviewItem(evidence, {
  import_id: 'IMP-test',
  index,
  review_id: `RQ${index + 1}`
}));
queue[0].status = 'accepted';
queue[0].review_stage = 'accepted';
queue[1].status = 'rejected';
queue[1].review_stage = 'rejected';
const report = modules.evidenceReviewController.report(queue);
assert.equal(report.workspace_version, '1.3.0-alpha.8');
assert.equal(report.accepted_count, 1);
assert.equal(report.rejected_count, 1);
assert.equal(report.live_fetching_performed, false);
assert.equal(report.verification_claimed, false);

console.log('PASS evidence-workspace-check');
