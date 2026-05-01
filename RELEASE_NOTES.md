# Release Notes — v1.0.8

## v1.0.8 — Hosted Demo Deployment Verification + Browser Evidence Capture

This patch adds publish-time proof for the hosted public demo. It introduces hosted-demo verification metadata, browser evidence capture, and CI checks that force the release to prove the deployed UI state instead of relying only on local no-browser tests.

### Added

- Hosted-demo verification panel and export-safe packet metadata.
- Browser evidence capture metadata and Playwright evidence spec.
- Hosted demo and browser evidence documentation.
- Stronger repository hygiene detection for stray temporary `XX*` artifacts.

### Compatibility boundary

No provider behavior, OAuth behavior, backend endpoint behavior, source connector behavior, or storage behavior changed. Manual/private mode remains the default.
