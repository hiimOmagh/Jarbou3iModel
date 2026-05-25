# Jarbou3i Research Engine

`v1.3.0-alpha.8 — Signed Export Handoff Pack + Lock Ledger Review Surface`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs.

This alpha turns the locked alpha.6 operator-signoff/lock-ledger state into a reviewer-facing handoff surface. It adds a signed-export handoff pack and lock-ledger review surface for manual review and export packaging. The “signed” term is explicitly non-cryptographic: it records operator-review metadata only.

Alpha.8 capability surface:

- Signed Export Handoff Pack
- Lock Ledger Review Surface
- Locked / blocked / unlocked handoff status
- Operator ID, signoff timestamp, and lock hash only when explicit signoff created a lock
- JSON/Markdown export artifacts for handoff review
- UI panels and EN/AR/FR copy for reviewer-facing lock state

Preserved alpha.6 / alpha.7 baseline:

- Operator Signoff State
- Export Lock Ledger
- Brief Assembly Preview Diff
- Export Review Signoff dossier
- Release Truth Sweep + Roadmap Compression guardrails
- Trilingual review/export copy

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

Public release label: v1.3.0-alpha.8 Signed Export Handoff Pack + Lock Ledger Review Surface.

Last locked release: v1.3.0-alpha.7 Release Truth Sweep + Roadmap Compression.

Public Demo continuity is preserved; release lock still requires hosted evidence review.

Node 24 CI compatibility is preserved.

v1.1.0 stable public-demo baseline remains protected.

Continuity: source strategy continuity, release evidence continuity, repository hygiene continuity, PLAYWRIGHT_SKIP_INSTALL continuity, evidence scoring continuity, fixture/test debt ledger continuity, professional trilingual language-description review continuity, package script compression and CI gate registry, fixture registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.

Historical continuity note: v1.1.0 Diagnostic Repair Queue + Export Risk Resolution remains preserved in release corpus history.
