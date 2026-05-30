# alpha22 browser Arabic visible-copy fix

Target: `v1.4.0-alpha.22`

Changed file:

- `src/research/render-helpers.js`

Reason:

- Browser evidence failed because `tests/hosted-demo-browser-evidence.spec.mjs` expected the Arabic token `طبقة تدقيق تسليم فقط`, but the visible UI copy exposed `طبقة مركز إنتاجية التسليم فقط` instead.
- The previous patch package only included the hosted-demo browser spec and was effectively a zero-diff package against the generated alpha.22 source. This patch changes the actual visible Arabic copy.

Apply:

1. Extract this ZIP at the repository root and overwrite files.
2. Run:

```powershell
node tests/hosted-evidence-capture-polish-check.mjs
node tests/localization-regression-matrix-check.mjs
node tests/public-demo-release-candidate-check.mjs
node tests/test-organization-audit-check.mjs
npm run test:ci:no-browser
npm run test:ci:browser
```

No files are deleted by this patch.
