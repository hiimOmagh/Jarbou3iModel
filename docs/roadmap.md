# Roadmap

Current milestone:

`v1.3.0-alpha.5 — Brief Assembly Preview Diff + Export Review Signoff`

Purpose: add a controlled review boundary before export by comparing the current brief assembly preview against an optional prior baseline and requiring explicit operator review signoff. This improves publication discipline without adding live acquisition or execution capability.

Priority lanes:

1. `source_strategy_v2` — source taxonomy, review status, source confidence, evidence-to-claim linking, and gap warnings before any live fetching.
2. `provider_execution_path` — threat model, ADR, backend/BYOK boundary, failure UX, and credential-leak proof before provider execution is exposed.
3. `evidence_workspace_v2` — higher-throughput evidence review, contradiction handling, and publication-readiness triage.
4. `export_publication_v4` — stronger traceability, provenance, release notes, and publication review packaging.
5. `ux_density_polish` — first-run clarity and reduced advanced-panel load without redesigning the product surface.
6. `release_ops_hardening` — commit-bound evidence, artifact checksums, gate registry consistency, and stale-artifact rejection.

Allowed in this alpha: local/manual brief assembly preview diffing, baseline-aware change summaries, signoff checks, required operator confirmation metadata, JSON/Markdown export review dossier files, UI panels, trilingual copy, docs, fixtures, tests, and release metadata.

Forbidden in this alpha: implementation of live scraping, uncontrolled source fetching, real OAuth, provider execution expansion, backend behavior expansion, storage expansion, broad UI redesign, automatic signoff, or automatic source verification claims.

Next valid milestone:

`v1.3.0-alpha.6 — Export Review UX Evidence Capture + Signoff Persistence Audit` only after alpha.5 no-browser CI, browser CI, hosted evidence review, privacy/export gates, and release evidence review stay green.


No live scraping. No production OAuth. No backend behavior expansion. No provider execution expansion. No storage expansion. No automatic source verification claims. No automatic signoff.

Node 24 CI compatibility preserved.

## Stable baseline note

Stable baseline retained: v1.1.0 remains the locked Public Demo reference for post-stable expansion gating. Node 24 CI compatibility remains preserved for the post-stable planning release.

Workbench note: this release is a changed-files-only local/manual source-to-brief implementation with release apply integrity controls.

Evidence manifest continuity: hosted-demo review still requires a single final metadata capture manifest with desktop, mobile, provider-mode, and quality/export evidence.


Alpha.8 preserved feature surface: Diagnostic Repair Queue + Export Risk Resolution.
