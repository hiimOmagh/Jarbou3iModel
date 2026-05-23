# Jarbou3i Research Engine

`v1.2.0-alpha.2 — Source-to-Brief Intelligence Workbench`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs.

This alpha does not add live execution capability. It adds a controlled local/manual source-to-brief workbench that connects the research plan, evidence cards, generated claims, contradiction groups, source gap warnings, inferred confidence review metadata, and structured strategic brief export.

Preserved boundaries: manual/private mode remains first-class; no live scraping; no production OAuth; no backend behavior expansion; no live provider execution expansion; no storage expansion; no automatic source verification claims.

Core local validation:

```bash
npm install
npm run test:qa
npm run test:ci:no-browser
```

Browser validation before publication:

```bash
npx playwright install --with-deps
npm run test:ci:browser
```

Public Demo boundary: the stable public-demo surface remains protected.

Evidence manifest continuity: hosted-demo review still requires a single final metadata capture manifest with desktop, mobile, provider-mode, and quality/export evidence.

## Release-lock evidence boundary

Screenshots alone are insufficient for release approval. ZIP archive alone is insufficient for release approval. The v1.2.0-alpha.1 post-stable expansion gate preserves the v1.1.0 public-demo baseline until no-browser CI, browser CI, hosted-demo evidence, and privacy/export gates are reviewed.

Workbench note: this release is a changed-files-only local/manual source-to-brief implementation with release apply integrity controls.

Public release label: v1.2.0-alpha.2 Source-to-Brief Intelligence Workbench.
