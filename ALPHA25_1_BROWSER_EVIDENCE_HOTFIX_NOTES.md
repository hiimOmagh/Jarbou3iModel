# v1.4.0-alpha.25.1 — Browser Evidence Contract Hotfix

This hotfix removes a stale, manually duplicated Arabic expected-token list from `tests/hosted-demo-browser-evidence.spec.mjs`.

The browser evidence test now compares AR/FR/EN current-release description tokens against `expectedCurrentReleaseDescriptionTokens(locale)`, which is sourced from `src/research/release-copy-contract.js`.

This preserves the alpha.25 objective: visible-text evidence expectations must use one source of truth.

Local generated Playwright artifacts are not a code patch. Clean them before no-browser validation:

```powershell
Remove-Item -Recurse -Force .\playwright-report, .\test-results -ErrorAction SilentlyContinue
```

Then run:

```powershell
node tests/hosted-demo-browser-evidence.spec.mjs # syntax only does not apply; use Playwright command below
node node_modules\playwright\cli.js test tests/hosted-demo-browser-evidence.spec.mjs
npm run test:current:no-browser
npm run test:ci:no-browser
node tests/ci-gate-runner.mjs scripts/ci-browser.sh browser
```
