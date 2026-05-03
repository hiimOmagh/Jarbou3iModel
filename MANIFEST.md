# v1.0.23 RTL/mobile browser smoke alignment hotfix

Apply this patch after `jarbou3i-research-engine-v1.0.23-ci-result-review-browser-evidence-audit-patch.zip`.

Changed files:

- `tests/rtl-mobile.spec.js`
- `src/styles.css`

Purpose:

- Align the RTL/mobile smoke test with the v1.0.3+ screen-discipline default where the Command Center is collapsed by default.
- Expand the Command Center before clicking `#loadSampleBtn`, matching the already-correct helper pattern used in `tests/smoke.spec.js`.
- Preserve the strict horizontal overflow assertion instead of weakening it.
- Add overflow offender diagnostics to the assertion message so future CI failures identify the exact overflowing node.
- Keep the mobile CSS guard defensive for Arabic 390px Chromium/mobile-Chrome rendering.

Validation performed locally:

```bash
node tests/v123-no-browser-suite.mjs
```

Browser validation still required in GitHub Actions:

```bash
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

Reason browser validation is limited in this sandbox:

- Playwright's bundled Chromium is unavailable locally.
- The system Chromium blocks normal localhost navigation with `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
- An inline Chromium harness was used to verify the patched Arabic 390px flow reports `documentElement.scrollWidth === documentElement.clientWidth`.
