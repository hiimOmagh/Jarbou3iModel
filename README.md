# Jarbou3i Research Engine

`v1.3.0 — Stable Manual Workflow Release`

Jarbou3i Research Engine is a dark editorial intelligence workspace for converting messy AI output into structured strategic briefs.

This stable release promotes the locked `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization` manual workflow to a stable handoff, while preserving the locked `v1.3.0-alpha.10 — Brief Publication Pack v4` manual workflow baseline. It is not a provider/OAuth/backend expansion.

Frozen surface:

- Source-to-Claim Gap Closure Queue
- Signed Export Handoff Pack
- Lock Ledger Review Surface
- Operator Signoff State
- Export Lock Ledger
- Brief Assembly Preview Diff
- Export Review Signoff dossier
- Brief Publication Pack v4
- final brief and evidence/contradiction/falsifier/source-gap/signoff appendices

Boundary:

- no live scraping
- no production OAuth
- no backend behavior expansion
- no provider execution expansion
- no storage expansion
- no automatic source verification claims
- no automatic signoff
- no automatic export lock
- no publishing permission claim
- no cryptographic signature claim

Public release label: v1.3.0 Stable Manual Workflow Release.

Last locked RC baseline: v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization.

Run local gates:

```bash
npm run test:current:no-browser
npm run test:source
npm run test:release
npm run test:qa
```

Run CI gates:

```bash
npm install
npx playwright install --with-deps
npm run test:ci:no-browser
npm run test:ci:browser
```

Release approval rule: screenshots alone are insufficient, and a ZIP archive alone is insufficient. Lock requires green no-browser CI, green browser CI, reviewed hosted-demo evidence, and the canonical lock-evidence bundle.

Continuity preserved: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only handoff discipline.

Stable baseline retained: v1.1.0 — Diagnostic Repair Queue + Export Risk Resolution remains the protected public-demo reference for post-stable expansion gating.
