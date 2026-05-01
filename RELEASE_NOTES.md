# Release Notes — v1.0.10

## v1.0.10 — Hosted URL CI Artifact Review + Module-Type Warning Fix

This patch rebuilds the failed-download v1.0.10 from the confirmed v1.0.9 baseline. It keeps the hosted-demo evidence workflow intact and removes the Node ESM warning emitted during backend Worker smoke validation.

### Added

- Package-level ESM declaration with `"type": "module"`.
- `tests/module-type-warning-fix-check.mjs` to assert the Worker smoke test exits without `MODULE_TYPELESS_PACKAGE_JSON` or ESM reparsing warnings.
- `tests/v110-no-browser-suite.mjs` as the canonical v1.0.10 no-browser suite.
- v1.0.10 migration and privacy snapshots.
- v1.0.10 release documentation and manifest updates.

### Compatibility boundary

No provider behavior, OAuth behavior, backend endpoint behavior, source connector behavior, browser runtime behavior, or storage behavior changed. Manual/private mode remains the default.

### Required validation

```bash
npm run test:module-type-warning
npm run test:v110:no-browser
npm run test:ci:no-browser
```

The Public Demo layer remains active; this patch only improves CI/module hygiene around the existing hosted-demo evidence workflow.
