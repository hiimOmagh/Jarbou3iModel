# Jarbou3i Research Engine

`v1.3.0-alpha.7 — Release Truth Sweep + Roadmap Compression`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs.

This alpha is a release-truth and planning compression pass. It does **not** add runtime, UI, provider, OAuth, backend, source, or storage capability. It aligns the repository's public release copy, roadmap, current-release notes, manifest metadata, and CI guardrails after the locked alpha.6 evidence bundle.

Alpha.6 locked capability baseline preserved:

- Operator Signoff State
- Export Lock Ledger
- Brief Assembly Preview Diff
- Export Review Signoff dossier
- JSON/Markdown export-review artifacts
- Trilingual review/export copy

Alpha.7 correction surface:

- Current release status no longer treats locked alpha.6 as pending browser evidence.
- Roadmap is compressed around the next highest-value milestones.
- Stale milestone residue is removed from source-refactor readiness documentation.
- Release-truth consistency is guarded by a dedicated no-browser check.

Preserved boundaries: manual/private mode remains first-class; no live scraping; no production OAuth; no backend behavior expansion; no live provider execution expansion; no storage expansion; no automatic source verification claims; no automatic signoff.

Core local validation:

```bash
npm install
npm run test:qa
npm run test:current:no-browser
npm run test:release
```

Browser validation before publication:

```bash
npx playwright install --with-deps
npm run test:ci:browser
```

Release-lock evidence boundary: screenshots alone are insufficient. ZIP archive alone is insufficient. Lock requires green no-browser CI, green browser CI, hosted-demo evidence, and the canonical lock bundle.

Public release label: v1.3.0-alpha.7 Release Truth Sweep + Roadmap Compression.

Last locked release: v1.3.0-alpha.6 Operator Signoff State + Export Lock Ledger.

Public Demo continuity is preserved; release lock still requires hosted evidence review.

Node 24 CI compatibility is preserved.

v1.1.0 stable public-demo baseline remains protected.

Continuity: source strategy continuity, release evidence continuity, repository hygiene continuity, PLAYWRIGHT_SKIP_INSTALL continuity, evidence scoring continuity, fixture/test debt ledger continuity, professional trilingual language-description review continuity, package script compression and CI gate registry, fixture registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.

Continuity note: v1.1.0 stable public-demo baseline and Diagnostic Repair Queue + Export Risk Resolution remain preserved.
