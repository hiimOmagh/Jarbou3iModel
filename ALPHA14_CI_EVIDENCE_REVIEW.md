# v1.1.0-alpha.14 CI/Evidence Review

## Verdict

Do **not** lock v1.1.0-alpha.14 yet.

## Failure

No-browser CI failed because `tests/evidence-workspace-check.mjs` exists but is not registered in `tests/ci-gate-registry.json`.

Observed failure:

```text
AssertionError [ERR_ASSERTION]: unregistered check files: tests/evidence-workspace-check.mjs
```

## Browser / hosted evidence

Browser CI passed and uploaded 8 hosted-demo evidence files. Artifact SHA-256:

```text
285632ec9950bd1878972a6f6d7e919d2ea241ee246bf101a62e6495329b7d7f
```

However the uploaded evidence is still versioned as `1.1.0-alpha.13`, not alpha.14. Treat it as technically valid browser evidence for the currently-rendered app, but **not valid release evidence for alpha.14** until the app/metadata visible text are bumped and recaptured.

## Hotfix

Apply:

```bash
git apply alpha14-ci-registry-hotfix.patch
```

Then run:

```bash
node tests/evidence-workspace-check.mjs
node tests/test-organization-audit-check.mjs
node tests/ci-gate-registry-check.mjs
npm run test:ci:no-browser
npm run test:ci:browser
```

## Version/evidence lock requirement

Before declaring alpha.14 locked, regenerate hosted-demo evidence and confirm:

```text
hosted-demo-metadata.json evidence_review_version = 1.1.0-alpha.14
visible-text-ar/fr/en mention v1.1.0-alpha.14
no-browser CI = green
browser CI = green
artifact upload = 8 files finalized
```
