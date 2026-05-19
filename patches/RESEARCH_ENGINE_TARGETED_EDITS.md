# v1.1.0-alpha.14 targeted edits for `src/research-engine.js`

This file is intentionally a targeted edit map instead of a full replacement because `src/research-engine.js` is a large historical integration file. Apply these edits after adding `src/research/evidence-workspace.js` and replacing the three smaller modules in this patch packet.

## 1. Bump runtime version

Replace:

```js
/* Jarbou3i Research Engine v1.1.0-alpha.13 — prompt compiler and research plan upgrade. Manual mode remains first-class. */
```

with:

```js
/* Jarbou3i Research Engine v1.1.0-alpha.14 — evidence workspace and source import V2. Manual mode remains first-class. */
```

Replace:

```js
const VERSION = '1.1.0-alpha.13';
```

with:

```js
const VERSION = '1.1.0-alpha.14';
```

## 2. Register the workspace module

After:

```js
const evidenceReviewController = modules.evidenceReviewController;
```

add:

```js
const evidenceWorkspace = modules.evidenceWorkspace;
```

## 3. Normalize manual evidence entries

After `function scoreEvidence(item){...}` add:

```js
function normalizeWorkspaceEvidence(item, context = {}){
  return evidenceWorkspace?.normalizeWorkspaceCandidate
    ? evidenceWorkspace.normalizeWorkspaceCandidate(item, Object.assign({origin:'manual_evidence_entry'}, context))
    : item;
}

function evidenceWorkspaceReport(){
  return evidenceWorkspace?.workspaceSummary
    ? evidenceWorkspace.workspaceSummary(state, {version: VERSION, now: nowIso()})
    : {workspace_version: VERSION, live_fetching_performed:false, verification_claimed:false, release_gate:'workspace_module_unavailable'};
}
```

In `makeEvidenceEntry()`, replace:

```js
return scoreEvidence(entry);
```

with:

```js
return scoreEvidence(normalizeWorkspaceEvidence(entry, {origin:'manual_evidence_entry'}));
```

## 4. Add workspace report to exports

Inside `researchPacket()`, after:

```js
evidence_review_report: evidenceReviewReport(),
```

add:

```js
evidence_workspace: evidenceWorkspaceReport(),
```

## 5. Upgrade review reporting

Replace the body of `evidenceReviewReport()` with:

```js
const queue = state.evidence_review_queue || [];
const report = evidenceWorkspace?.reviewReport
  ? evidenceWorkspace.reviewReport(queue, {version: VERSION, now: nowIso()})
  : {
      review_version: VERSION,
      generated_at: nowIso(),
      queue_count: queue.length,
      pending_count: queue.filter(item => item.status === 'pending' || item.status === 'needs_edit').length,
      accepted_count: queue.filter(item => item.status === 'accepted').length,
      rejected_count: queue.filter(item => item.status === 'rejected').length,
      live_fetching_performed: false,
      verification_claimed: false,
      readiness: 'review_required'
    };
state.evidence_review_report = report;
return report;
```

## 6. Upgrade queue creation

Inside `queueImportedEvidence(parsed)`, replace the current `queued = parsed.evidence.map(...)` expression with:

```js
const queued = parsed.evidence.map((e, idx) => {
  const candidateEvidence = scoreEvidence(normalizeWorkspaceEvidence(Object.assign({}, e, {
    evidence_id: `CAND${existing.length + idx + 1}`,
    notes: [e.notes || '', 'Review required before promotion to Evidence Matrix.'].filter(Boolean).join(' ')
  }), {origin: parsed.report?.input_format || 'source_import'}));
  if(evidenceWorkspace?.buildReviewItem){
    return evidenceWorkspace.buildReviewItem(candidateEvidence, {
      review_id: `RQ${existing.length + idx + 1}`,
      import_id: importId,
      index: existing.length + idx,
      created_at: nowIso(),
      status: 'pending',
      origin: parsed.report?.input_format || 'source_import',
      review_notes: 'Raw imported candidate; classify source confidence, link claims, and accept/reject before synthesis.'
    });
  }
  return {
    review_id: `RQ${existing.length + idx + 1}`,
    import_id: importId,
    created_at: nowIso(),
    status: 'pending',
    review_stage: 'raw',
    raw_status: 'raw',
    decision_at: null,
    accepted_evidence_id: null,
    evidence: candidateEvidence,
    contradiction_marker: !!candidateEvidence.contradiction_marker,
    source_confidence: candidateEvidence.source_confidence || 'medium',
    source_gap_warnings: candidateEvidence.source_gap_warnings || [],
    evidence_to_claim_links: candidateEvidence.evidence_to_claim_links || [],
    review_notes: 'Raw imported candidate; source metadata and layer links require human review.'
  };
});
```

## 7. Preserve review stage transitions

In `markReviewItemNeedsEdit(index)`, after:

```js
item.status = 'needs_edit';
```

add:

```js
item.review_stage = 'reviewed';
```

In `promoteReviewItem(index, overrideEvidence = null)`, after:

```js
item.status = 'accepted';
```

add:

```js
item.review_stage = 'accepted';
```

Also normalize before scoring:

```js
const scoredEvidence = scoreEvidence(normalizeWorkspaceEvidence(evidence, {origin:'review_queue_acceptance'}));
```

In `rejectReviewItem(index)`, after:

```js
item.status = 'rejected';
```

add:

```js
item.review_stage = 'rejected';
```

## 8. Render alpha.14 evidence workspace fields

In `renderEvidenceReviewQueue()`, inside each row claim cell, add these `small` rows near the scoring line:

```js
<small>${esc(tr('sourceConfidence') || 'Source confidence')}: ${esc(e.source_confidence || item.source_confidence || 'medium')} · ${esc(tr('sourceGapWarnings') || 'Gap warnings')}: ${esc((e.source_gap_warnings || item.source_gap_warnings || []).join(', ') || '—')}</small>
<small>${esc(tr('contradictionMarker') || 'Contradiction marker')}: ${esc(localizedBoolean(e.contradiction_marker || item.contradiction_marker))} · ${esc(tr('evidenceLinks') || 'Links')}: ${esc((e.evidence_to_claim_links || item.evidence_to_claim_links || []).map(link => `${link.relationship}:${link.target_id}`).join(', ') || '—')}</small>
```

In `renderSourceImportAdapter()`, add columns for source confidence, contradiction marker, and gap warnings in the sample table.

## 9. Validation commands

Run:

```bash
node tests/evidence-workspace-check.mjs
node tests/source-import-check.mjs
node tests/evidence-review-queue-check.mjs
node tests/static-check.mjs
node tests/research-module-check.mjs
npm run test:ci:no-browser
npm run test:ci:browser
```
