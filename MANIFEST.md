# v1.0.23 RTL/mobile collapsed-welcome assertion hotfix

Apply this patch after `jarbou3i-research-engine-v1.0.23-rtl-mobile-spec-alignment-hotfix-patch.zip`.

Changed files:

- `tests/rtl-mobile.spec.js`

Purpose:

- Fix the remaining RTL/mobile CI failure where `.welcomeCard` is expected to be visible while the Command Center is still intentionally collapsed.
- Preserve the app behavior: `#workflowPanel` starts with `screenDisciplineCollapsed`; content below `.panelHeader`, including `#welcomeCard`, is hidden until the panel is expanded.
- Keep the smoke test strict: it still verifies Arabic RTL mode, expands the workflow panel, runs the sample flow, checks review visibility, and checks horizontal overflow with diagnostic offender reporting.
- Align the assertion order with the actual UI state: expand first, then assert `#workflowPanel:not(.screenDisciplineCollapsed) #welcomeCard` is visible.

Validation performed locally:

```bash
node tests/v123-no-browser-suite.mjs
```

Browser validation required in GitHub Actions:

```bash
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

Expected result:

- `tests/rtl-mobile.spec.js` should no longer fail at `.welcomeCard` visibility before panel expansion.
- If a true layout overflow remains, the assertion will print `Horizontal overflow report` with the offending DOM nodes.
