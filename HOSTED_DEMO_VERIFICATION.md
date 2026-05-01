# Hosted Demo Verification — v1.0.8

This guide defines the release proof needed before publishing the hosted public demo.

## Required verification

1. Deploy the current static package to the hosted demo target.
2. Open the hosted URL and verify `meta[name="app-version"]` is `1.0.8`.
3. Confirm the first-run guide, public-demo panel, and hosted-demo verification panel are visible.
4. Run browser CI and capture desktop, mobile, provider-mode, and quality/export evidence.
5. Confirm privacy/export gates remain green before sharing an export package.

## Compatibility boundary

v1.0.8 does not change provider behavior, OAuth behavior, backend endpoint behavior, source connector behavior, or storage behavior. It adds release proof, not new runtime capability.


This release requires browser evidence before treating the hosted demo as publish-ready.
