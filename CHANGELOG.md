# Changelog

## v1.2.0-alpha.8.1 — CI Stabilization + Workflow Quarantine

- Adds local/manual review quality diagnostics for weak, unsupported, contradicted, and source-gap-heavy claims.
- Adds weak-claim repair suggestions with explicit operator actions and manual-only boundaries.
- Adds Source-to-Brief export artifacts for review-quality diagnostics and weak-claim repair suggestions.
- Adds compact UI panels for review quality findings and repair suggestions inside the Source-to-Brief operator surface.
- Preserves alpha.6 command palette and review navigation shortcuts.
- Preserves alpha.5 claim traceability console and review decision ledger behavior.
- Preserves manual/private default behavior, the v1.1.0 stable public-demo boundary, and the v1.2.0-alpha.1 post-stable expansion gate.
- Adds no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, no storage expansion, and no automatic source verification claims.

Release-lock guard: any future capability expansion requires green no-browser CI, green browser CI, reviewed hosted evidence, privacy/export gates, and explicit lane approval. Screenshots or ZIPs alone are insufficient.

`v1.2.0-alpha.8.1 — CI Stabilization + Workflow Quarantine`

Public label: `v1.2.0-alpha.8.1 CI Stabilization + Workflow Quarantine`. Internal evidence metadata: `1.2.0-alpha.8.1`. This controlled alpha improves review-quality triage and weak-claim repair guidance inside the local/manual Source-to-Brief workbench; it does not verify sources, fetch live data, expand providers, enable production OAuth, add backend behavior, or change persistent storage.

## v1.2.0-alpha.1 - Post-Stable Capability Roadmap + Expansion Gate

- Historical note for v1.2.0-alpha.1: added the post-stable capability roadmap and expansion gate.
- Defined roadmap lanes, acceptance criteria, falsifiers, decision owners, blocked claims, and evidence requirements before implementation.
- Preserved manual/private default behavior and the v1.1.0 stable public-demo boundary.
- Preserved no-live, no-OAuth/backend-expansion, no-provider-expansion, no-broad-redesign boundaries.

Release-lock guard: 1.2.0-alpha.1 Post-Stable Capability Roadmap + Expansion Gate requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A ZIP archive alone is insufficient.

Node 24 CI compatibility is preserved for 1.1.0.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.

No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone, ZIP existence alone, and ZIP archive alone are insufficient for release approval.


Alpha.8 preserved feature surface: Diagnostic Repair Queue + Export Risk Resolution.
