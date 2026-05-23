# Changelog

## v1.2.0-alpha.5 — Claim Traceability Console + Review Decision Ledger

- Adds a claim traceability console that maps each claim to support level, evidence IDs, traceability status, source types, warnings, and manual decision state.
- Adds a review decision ledger covering evidence review decisions, claim traceability decisions, contradiction resolution, source-gap decisions, and export handoff decisions.
- Adds export artifacts for claim traceability JSON/CSV and review decision ledger JSON/Markdown.
- Adds compact UI panels for traceability rows and open ledger decisions inside the Source-to-Brief operator surface.
- Keeps the alpha.4 review-throughput and export-polish path intact while making decisions auditable before handoff.
- Preserves manual/private default behavior, the v1.1.0 stable public-demo boundary, and the v1.2.0-alpha.1 post-stable expansion gate.
- Adds no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, no storage expansion, and no automatic source verification claims.

Release-lock guard: any future capability expansion requires green no-browser CI, green browser CI, reviewed hosted evidence, privacy/export gates, and explicit lane approval. Screenshots or ZIPs alone are insufficient.

`v1.2.0-alpha.5 — Claim Traceability Console + Review Decision Ledger`

Public label: `v1.2.0-alpha.5 Claim Traceability Console + Review Decision Ledger`. Internal evidence metadata: `1.2.0-alpha.5`. This controlled alpha adds a local/manual claim traceability console and review decision ledger so every claim, evidence link, contradiction, gap, and export decision remains auditable before handoff; it does not verify sources, fetch live data, expand providers, enable production OAuth, add backend behavior, or change persistent storage.

## v1.2.0-alpha.1 - Post-Stable Capability Roadmap + Expansion Gate

- Historical note for v1.2.0-alpha.1: added the post-stable capability roadmap and expansion gate.
- Defined roadmap lanes, acceptance criteria, falsifiers, decision owners, blocked claims, and evidence requirements before implementation.
- Preserved manual/private default behavior and the v1.1.0 stable public-demo boundary.
- Preserved no-live, no-OAuth/backend-expansion, no-provider-expansion, no-broad-redesign boundaries.

Release-lock guard: 1.2.0-alpha.1 Post-Stable Capability Roadmap + Expansion Gate requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A ZIP archive alone is insufficient.

Node 24 CI compatibility is preserved for 1.1.0.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.

No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone, ZIP existence alone, and ZIP archive alone are insufficient for release approval.
