# Roadmap

Current milestone:

`v1.2.0-alpha.1 — Post-Stable Capability Roadmap + Expansion Gate`

Purpose: move beyond the stable public-demo lock without collapsing into uncontrolled feature expansion.

Priority lanes:

1. `source_strategy_v2` — source taxonomy, review status, source confidence, evidence-to-claim linking, and gap warnings before any live fetching.
2. `provider_execution_path` — threat model, ADR, backend/BYOK boundary, failure UX, and credential-leak proof before provider execution is exposed.
3. `evidence_workspace_v2` — higher-throughput evidence review, contradiction handling, and publication-readiness triage.
4. `export_publication_v4` — stronger traceability, provenance, release notes, and publication review packaging.
5. `ux_density_polish` — first-run clarity and reduced advanced-panel load without redesigning the product surface.
6. `release_ops_hardening` — commit-bound evidence, artifact checksums, gate registry consistency, and stale-artifact rejection.

Allowed in this alpha: roadmap lanes, acceptance criteria, falsifiers, gate rules, docs, fixtures, tests, and release metadata.

Forbidden in this alpha: implementation of live scraping, uncontrolled source fetching, real OAuth, provider execution expansion, backend behavior expansion, storage expansion, broad UI redesign, or automatic source verification claims.

Next valid milestone:

`v1.2.0-alpha.2 — Selected Lane Implementation Plan` only after this expansion gate stays green.


No live scraping. No production OAuth. No backend behavior expansion. No provider execution expansion. No storage expansion. No automatic source verification claims.

Node 24 CI compatibility preserved.

## Stable baseline note

Stable baseline retained: v1.1.0 remains the locked Public Demo reference for post-stable expansion gating. Node 24 CI compatibility remains preserved for the post-stable planning release.

Planning gate note: this release is a changed-files-only post-stable planning gate with release apply integrity controls.
