# alpha.14 registry fix v2

This replaces the corrupt patch workflow with a deterministic Node script.

From the repository root:

```powershell
node fix-alpha14-registry.mjs
node tests/evidence-workspace-check.mjs
node tests/test-organization-audit-check.mjs
node tests/ci-gate-registry-check.mjs
npm run test:ci:no-browser
npm run test:ci:browser
```

The script only adds missing registry entries. It does not change package version, release title, runtime code, provider behavior, OAuth, backend, storage, or live source behavior.
