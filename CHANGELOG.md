# Changelog

## v1.2.0-alpha.4 — Evidence Review Throughput + Source-to-Brief Export Polish

- Adds evidence-review priority lanes for priority review, contradictions, traceability repairs, unlinked evidence, and ready-to-decide candidates.
- Adds next-review actions so the operator can triage the highest-value queue item before export.
- Adds an export throughput gate that keeps unresolved review work visible without bypassing human review.
- Adds Source-to-Brief export polish metadata: export-polish report, review-throughput summary, export-readiness JSON, and operator-handoff Markdown.
- Adds Source-to-Brief export-polish UI panels that surface handoff files, blockers, warnings, review queue pressure, and manual/local boundaries.
- Keeps the alpha.3 operator-flow compression intact while improving review throughput and export handoff clarity.
- Preserves manual/private default behavior, the v1.1.0 stable public-demo boundary, and the v1.2.0-alpha.1 post-stable expansion gate.
- Adds no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, no storage expansion, and no automatic source verification claims.

Release-lock guard: any future capability expansion requires green no-browser CI, green browser CI, reviewed hosted evidence, privacy/export gates, and explicit lane approval. Screenshots or ZIPs alone are insufficient.

`v1.2.0-alpha.4 — Evidence Review Throughput + Source-to-Brief Export Polish`

Public label: `v1.2.0-alpha.4 Evidence Review Throughput + Source-to-Brief Export Polish`. Internal evidence metadata: `1.2.0-alpha.4`. This controlled alpha improves local/manual evidence-review throughput and source-to-brief export handoff; it does not verify sources, fetch live data, expand providers, enable production OAuth, add backend behavior, or change persistent storage.

## v1.2.0-alpha.1 - Post-Stable Capability Roadmap + Expansion Gate

- Historical note for v1.2.0-alpha.1: added the post-stable capability roadmap and expansion gate.
- Defined roadmap lanes, acceptance criteria, falsifiers, decision owners, blocked claims, and evidence requirements before implementation.
- Preserved manual/private default behavior and the v1.1.0 stable public-demo boundary.
- Preserved no-live, no-OAuth/backend-expansion, no-provider-expansion, no-broad-redesign boundaries.

Release-lock guard: 1.2.0-alpha.1 Post-Stable Capability Roadmap + Expansion Gate requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A ZIP archive alone is insufficient.

Node 24 CI compatibility is preserved for 1.1.0.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.

No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone, ZIP existence alone, and ZIP archive alone are insufficient for release approval.
