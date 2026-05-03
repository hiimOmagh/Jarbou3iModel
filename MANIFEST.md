# v1.0.23 RTL/mobile overflow hotfix

Apply this patch after `jarbou3i-research-engine-v1.0.23-ci-result-review-browser-evidence-audit-patch.zip`.

Changed files:

- `src/styles.css`

Purpose:

- Fix `tests/rtl-mobile.spec.js` failures in Chromium and mobile Chrome by constraining the Arabic 390px review flow to the viewport.
- Prevent nowrap buttons, chips, badges, cards, score boxes, review content, and source-packet surfaces from expanding `document.documentElement.scrollWidth`.
- Preserve desktop layout; the guard is scoped to `@media(max-width:720px)`.

Validated locally:

```bash
rm -rf test-results playwright-report blob-report
npm run test:v123:no-browser
```

Result:

```text
v1.0.23 no-browser suite passed (13 checks).
```

Browser validation still required in GitHub Actions:

```bash
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

Reason browser validation was not completed in this sandbox:

- The local environment cannot download Playwright Chromium because DNS access to `cdn.playwright.dev` is unavailable.
- The system Chromium binary blocks local/file navigation with `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
