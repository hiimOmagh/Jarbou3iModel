# Jarbou3i Research Engine

`v1.2.0-alpha.1 — Post-Stable Capability Roadmap + Expansion Gate`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs.

This alpha does not add live execution capability. It adds a post-stable roadmap and expansion gate so future source, provider, evidence, export, UX, and release-operation work is selected through explicit acceptance criteria, falsifiers, owners, and evidence requirements.

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

## Release-lock evidence boundary

Screenshots alone are insufficient for release approval. ZIP archive alone is insufficient for release approval. The v1.2.0-alpha.1 post-stable expansion gate preserves the v1.1.0 public-demo baseline until no-browser CI, browser CI, hosted-demo evidence, and privacy/export gates are reviewed.

Planning gate note: this release is a changed-files-only post-stable planning gate with release apply integrity controls.

Public release label: v1.2.0-alpha.1 Post-Stable Capability Roadmap + Expansion Gate.
