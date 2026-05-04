# Hosted Demo Verification

The hosted demo must be verified as a deployed artifact, not only as a local static page.

## v1.0.25 — Public Demo Release Lock

This guide applies to v1.0.25 — Public Demo Release Lock.

## v1.0.25 requirements

- Run no-browser CI gates.
- Run browser evidence capture locally or in GitHub Actions.
- For real deployment proof, run browser evidence with `HOSTED_DEMO_URL`.
- Review screenshots and `hosted-demo-metadata.json` before publishing; this is the evidence review gate.
- Confirm no provider/OAuth/backend/source/storage behavior changed.
- Confirm public-demo claims match only available capabilities.
- Confirm screenshots alone and ZIP existence alone are not used as release approval.

## Commands

Local static server mode:

```bash
npm run test:browser:evidence
```

Hosted URL mode:

```bash
HOSTED_DEMO_URL="https://example.github.io/jarbou3i-research-engine" npm run test:browser:evidence
```

## Release gates

- `hosted_demo_verified`
- `hosted_demo_smoke_fixed`
- `browser_evidence_capture_ready`
- `evidence_review_complete`
- `public_demo_release_locked`
