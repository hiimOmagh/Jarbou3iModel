# Release Notes — v1.0.9

## v1.0.9 — Hosted Demo Smoke Fixes + Evidence Review

This patch turns hosted-demo browser evidence into a reviewable proof bundle. It supports running the evidence spec against a real hosted URL, writes stable screenshot files, writes a metadata snapshot, and adds an evidence-review release gate.

### Added

- Hosted-demo smoke-fix metadata and release gate.
- Hosted-demo evidence-review metadata and release gate.
- Evidence-review panel on the first screen.
- `HOSTED_DEMO_URL` support in Playwright config.
- Stable `test-results/hosted-demo-evidence/hosted-demo-metadata.json` artifact.
- Dedicated GitHub Actions upload for `hosted-demo-evidence`.

### Compatibility boundary

No provider behavior, OAuth behavior, backend endpoint behavior, source connector behavior, or storage behavior changed. Manual/private mode remains the default.

The public demo layer remains active; this patch only hardens hosted evidence review.
