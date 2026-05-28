# Changelog

## v1.4.0-alpha.9 — Controlled Execution Candidate Gate

- Added deterministic credential boundary runtime drill.
- Added fake secret injection, export leak, log leak, browser-visible text leak, fixture leak, provider payload secret-boundary, and release bundle secret-boundary drills.
- Added redaction reports and safe metadata-only outputs.
- Added ADR-014 for credential boundary runtime drills.
- Added targeted check `tests/controlled-execution-candidate-gate-check.mjs` and CI registry integration.
- Preserved locked v1.4.0-alpha.7 source acquisition baseline, locked v1.4.0-alpha.6 mock-to-live equivalence baseline, locked v1.4.0-alpha.5 replay/approval baseline, locked v1.4.0-alpha.4 trace/readiness baseline, and locked v1.3.0 stable manual workflow baseline.
- No real OAuth, no real API keys, no real token storage, live scraping, live source fetching, hidden background fetching, provider execution expansion, no production OAuth, backend expansion, storage expansion, automatic source verification, provider-suggested source bypass, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission claim.


## v1.4.0-alpha.7 — Source Acquisition Control Surface

- Added deterministic source acquisition control surface.
- Added source modes: `manual_source`, `imported_evidence`, `fixture_source`, `provider_proposed_source`, `blocked_source`, and `future_controlled_fetch`.
- Added permission/provenance/risk labels, review queue routing, source-to-claim linkage preservation, and source-gap warnings.
- Added ADR-013 for source acquisition controls.
- Added targeted check `tests/source-acquisition-control-surface-check.mjs` and CI registry integration.
- Preserved locked v1.4.0-alpha.6 mock-to-live equivalence baseline, locked v1.4.0-alpha.5 replay/approval baseline, locked v1.4.0-alpha.4 trace/readiness baseline, and locked v1.3.0 stable manual workflow baseline.
- No live scraping, live source fetching, hidden background fetching, provider execution expansion, no production OAuth, backend expansion, storage expansion, automatic source verification, provider-suggested source bypass, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission claim.

## v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence

- Added deterministic provider execution mock-to-live equivalence report.
- Added planned future-live envelope shape validation without enabling future-live execution.
- Added payload-shape comparison, policy-boundary preservation, failure-contract mapping, readiness-blocker preservation, and operator-approval boundary checks.
- Added ADR-012 for the mock-to-live equivalence boundary.
- Added targeted check `tests/provider-execution-mock-to-live-equivalence-check.mjs` and CI registry integration.
- Preserved locked v1.4.0-alpha.5 replay/approval baseline, locked v1.4.0-alpha.4 trace/readiness baseline, and locked v1.3.0 stable manual workflow baseline.
- No live scraping, live source fetching, provider execution expansion, no production OAuth, backend expansion, storage expansion, automatic source verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission claim.

## v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation

- LOCKED by no-browser CI, browser CI, hosted evidence matrix, and canonical lock evidence bundle.
- Added deterministic provider/source dry-run replay pack.
- Added deterministic provider/source operator approval simulation.
- Added ADR-010 and ADR-011 for replay-pack and approval-simulation boundaries.
- Added targeted checks for replay pack and approval simulation.
- Preserved locked v1.4.0-alpha.4 trace/readiness baseline and locked v1.3.0 stable manual workflow baseline.
- No live scraping, live source fetching, provider execution expansion, no production OAuth, backend expansion, storage expansion, automatic source verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission claim.

## v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report

- Adds provider/source dry-run trace inspector.
- Adds provider/source execution readiness report.
- Adds ADR-008 provider/source dry-run trace inspector.
- Adds ADR-009 provider/source execution readiness report.
- Preserves locked `v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator` as the dry-run baseline.
- Preserves locked `v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts` as the policy/failure UX baseline.
- Preserves locked `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation` as the preparation baseline.
- Preserves locked `v1.3.0 — Stable Manual Workflow Release`, `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`, and `v1.3.0-alpha.10 — Brief Publication Pack v4` baselines.
- Preserves no live scraping, no live source fetching, no provider execution expansion, no production OAuth, no backend/storage expansion, no automatic source verification, no automatic signoff, no automatic export lock, no cryptographic signature claim, and no publication permission claim.

## v1.3.0 — Stable Manual Workflow Release

- Promotes the locked `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization` manual workflow to stable release identity.
- Preserves the locked `v1.3.0-alpha.10 — Brief Publication Pack v4` manual workflow baseline.
- Preserves Brief Publication Pack v4, Source-to-Claim Gap Closure Queue, Signed Export Handoff Pack, Lock Ledger Review Surface, Operator Signoff State, and Export Lock Ledger.
- Adds explicit Stable Manual Workflow Release coverage.
- Preserves no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, no storage expansion, no automatic signoff, no automatic export lock, no publishing permission claim, no cryptographic signature claim, and no automatic source verification claims.

Public label: `v1.3.0 Stable Manual Workflow Release`. Internal evidence metadata: `1.3.0`.

## v1.3.0-rc.1 — Manual Workflow Release Candidate Freeze

- LOCKED by no-browser CI, browser CI, hosted evidence matrix, visible-text snapshots, and canonical lock evidence bundle.
- Froze the manual source-to-brief/publication workflow after the locked `v1.3.0-alpha.10 — Brief Publication Pack v4` baseline.
- Added explicit RC freeze guard coverage.
- Preserved no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, no storage expansion, no automatic signoff, no automatic export lock, no publishing permission claim, no cryptographic signature claim, and no automatic source verification claims.

## v1.3.0-alpha.10 — Brief Publication Pack v4

- LOCKED by no-browser CI, browser CI, hosted evidence matrix, visible-text snapshots, and canonical lock evidence bundle.
- Added Brief Publication Pack v4 for manual publication-review handoff.
- Added final/publication-ready brief Markdown export.
- Added evidence, contradiction/falsifier, source-gap, and operator signoff/lock-ledger appendices.
- Preserved the manual review boundary and did not claim automatic verification, publication permission, cryptographic signing, automatic signoff, or automatic export lock.

## v1.3.0-alpha.9 — Source-to-Claim Gap Closure Queue

- LOCKED by no-browser CI, browser CI, hosted evidence matrix, visible-text snapshots, and canonical lock evidence bundle.
- Added source-to-claim gap closure queue.
- Added export-blocking claim/evidence gap diagnostics before export.
- Preserved manual/local source-review boundary.

## v1.3.0-alpha.8 — Signed Export Handoff Pack + Lock Ledger Review Surface

- LOCKED by no-browser CI, browser CI, hosted evidence matrix, visible-text snapshots, and canonical lock evidence bundle.
- Added signed export handoff pack as non-cryptographic operator-review metadata.
- Added lock ledger review surface.

## v1.3.0-alpha.7 — Release Truth Sweep + Roadmap Compression

- LOCKED by no-browser CI, browser CI, hosted evidence matrix, visible-text snapshots, and canonical lock evidence bundle.
- Corrected release-truth documentation after the locked v1.3.0-alpha.6 evidence bundle.
- Compressed the next roadmap into a smaller high-throughput sequence.
- Added release-truth consistency coverage.

## v1.3.0-alpha.6 — Operator Signoff State + Export Lock Ledger

- LOCKED by no-browser CI, browser CI, hosted evidence matrix, visible-text snapshots, and canonical lock evidence bundle.
- Added local/manual operator signoff state.
- Added export lock ledger.
- Preserved the correct boundary: no automatic signoff, no automatic export lock, no live provider execution, no live scraping, and no automatic source verification claim.

Continuity note: v1.1.0 stable public-demo baseline and Diagnostic Repair Queue + Export Risk Resolution remain preserved.

Node 24 CI compatibility is preserved for v1.3.0 and the v1.1.0 stable public-demo baseline.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.

Screenshots alone are insufficient. ZIP archive alone is insufficient; local ZIP existence must be paired with green CI, reviewed hosted evidence, and canonical lock evidence.
