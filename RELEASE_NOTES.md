# Release Notes — v1.0.7

## v1.0.7 — Public Demo Readiness + Release Notes Polish

This patch prepares the stable research engine for public demonstration and handoff.

### Added

- Public demo readiness metadata in research packets.
- Release-note metadata in research packets.
- Public demo readiness panel on the first screen.
- Public demo operator guide.
- Dedicated public-demo readiness test.

### Unchanged boundaries

- No provider behavior changed.
- No OAuth behavior changed.
- No backend behavior changed.
- No source connector behavior changed.
- Manual/private mode remains the default.
- No raw provider key or token is exported.

### Required checks before publishing

```bash
npm run test:ci:no-browser
npm run test:ci:browser
```
