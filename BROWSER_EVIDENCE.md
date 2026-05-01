# Browser Evidence Capture — v1.0.8

Browser evidence is captured through Playwright and attached to the browser test report.

## Evidence states

- Desktop first screen.
- Mobile first screen.
- Provider/settings mode.
- Quality/export mode.
- Hosted-demo metadata snapshot through packet export metadata.

## Command

```bash
npm run test:browser:evidence
```

Use this after no-browser CI and before public publishing. The evidence is intentionally generated under `test-results/` and must not be committed.


This release requires browser evidence before treating the hosted demo as publish-ready.
