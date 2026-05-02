## v1.0.18 — Source Packet Builder Export Roundtrip QA

This patch verifies that a generated local/manual source packet can be exported and re-imported without changing the product's trust boundary.

### Added

- `src/research/source-packet-roundtrip.js`.
- `tests/source-packet-roundtrip-check.mjs`.
- `tests/v118-no-browser-suite.mjs`.
- `source_packet_roundtrip_report` in schema, fixtures, migrations, and exported research packets.
- Import metadata preservation for source packet scoring reviews.

### Verified

- Generated source packets use `manual_source_packet.v1`.
- Re-import uses the source packet importer.
- Re-imported evidence remains queue-only and unverified.
- Evidence scoring remains attached after re-import.
- Attention remains explicitly separated from truth/reliability.
- No live fetching or verification claim is introduced.

### Preserved

- No live scraping.
- No production OAuth.
- No provider behavior change.
- No backend endpoint behavior change.
- No source connector behavior change.
- No storage behavior change.
- Manual/private mode remains default.

### Required validation

```bash
npm run test:source:packet-roundtrip
npm run test:v118:no-browser
npm run test:ci:no-browser
npx playwright install --with-deps
npm run test:ci:browser
```

Public Demo boundary: hosted/static demo remains honest about local/manual behavior and unavailable live features.
