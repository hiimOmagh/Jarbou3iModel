## v1.0.13 — Manual Source Packet Import

Patch release. Adds structured manual source packet JSON import and routes converted evidence candidates through the Evidence Review Queue. Runtime capability change: no. Public Demo boundary remains unchanged. Manual/private mode remains default. No live scraping, production OAuth, provider behavior, backend endpoint behavior, or storage behavior is enabled.

## Validation

```bash
npm run test:source:packet
npm run test:v113:no-browser
npm run test:ci:no-browser
```

Browser validation remains required before updating a hosted demo:

```bash
npm run test:ci:browser
```

## v1.0.12 — Research Source Strategy Blueprint

Patch release. Added source capability registry metadata and gates. Runtime capability change: no.
