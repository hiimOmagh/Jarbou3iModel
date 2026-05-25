# Jarbou3i Research Engine

`v1.3.0-alpha.9 — Source-to-Claim Gap Closure Queue`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs.

This alpha adds a **Source-to-Claim Gap Closure Queue** before export. It converts unresolved research-quality problems into explicit closure items: claims missing evidence, weak evidence linkage, evidence without claim links, unresolved contradiction gaps, counter-evidence target gaps, scenario falsifier gaps, and workflow source gaps.

Alpha.9 capability surface:

- Source-to-Claim Gap Closure Queue
- export-blocking before-export closure item count
- claim/evidence linkage diagnostics
- unresolved contradiction gap diagnostics
- counter-evidence target gap diagnostics
- scenario falsifier gap diagnostics
- JSON/Markdown queue artifacts
- UI review panel and EN/AR/FR copy

Preserved alpha.8 baseline:

- Signed Export Handoff Pack
- Lock Ledger Review Surface
- Operator Signoff State
- Export Lock Ledger
- Brief Assembly Preview Diff
- Export Review Signoff dossier
- Release Truth Sweep + Roadmap Compression guardrails

Preserved boundaries: manual/private mode remains first-class; no live scraping; no production OAuth; no backend behavior expansion; no live provider execution expansion; no storage expansion; no automatic source verification claims; no automatic signoff; no automatic export lock; no cryptographic signature claim.

Core local validation:

```bash
npm install
npm run test:qa
npm run test:current:no-browser
npm run test:source
npm run test:release
```

Browser validation before publication:

```bash
npx playwright install --with-deps
npm run test:ci:browser
```

Release-lock evidence boundary: screenshots alone are insufficient. ZIP archive alone is insufficient. Lock requires green no-browser CI, green browser CI, hosted-demo evidence, and the canonical lock bundle.

Public release label: v1.3.0-alpha.9 Source-to-Claim Gap Closure Queue.

Last locked release: v1.3.0-alpha.8 — Signed Export Handoff Pack + Lock Ledger Review Surface.

Public Demo continuity is preserved; release lock still requires hosted evidence review.

Node 24 CI compatibility is preserved.

v1.1.0 stable public-demo baseline remains protected.

Continuity: source strategy continuity, release evidence continuity, repository hygiene continuity, PLAYWRIGHT_SKIP_INSTALL continuity, evidence scoring continuity, fixture/test debt ledger continuity, professional trilingual language-description review continuity, package script compression and CI gate registry, fixture registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.

Historical continuity note: v1.1.0 Diagnostic Repair Queue + Export Risk Resolution remains preserved in release corpus history.
