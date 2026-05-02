## v1.0.17 — Source Packet Builder Browser QA + UX Tightening

This patch tightens the browser-facing Source Packet Builder introduced in v1.0.16.

### Added

- Browser-QA hook on the Source Packet Builder card.
- Explicit local/manual guardrail copy.
- Responsive builder action layout.
- Bounded metadata preview for generated source packets.
- Overflow-safe builder chips, warnings, and preview content.
- Dedicated static browser-QA check.
- Dedicated Playwright browser spec for source packet builder UI.

### Preserved

- No live scraping.
- No production OAuth.
- No provider behavior change.
- No backend endpoint behavior change.
- No source connector behavior change.
- No storage behavior change.
- Manual/private mode remains default.
- Builder output remains transport metadata, not source verification.

### Required validation

```bash
npm run test:source:packet-builder:browser-qa
npm run test:source:packet-builder
npm run test:v117:no-browser
npm run test:ci:no-browser
npx playwright install --with-deps
npm run test:ci:browser
```

Public Demo boundary: hosted/static demo remains honest about local/manual behavior and unavailable live features.
