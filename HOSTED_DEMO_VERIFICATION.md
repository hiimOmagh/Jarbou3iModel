# Hosted Demo Verification

## v1.1.0-alpha.5 — Version Suite Registry + Package Script Compression

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


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

## v1.1.0-alpha.5 evidence-manifest hardening

The hosted-demo evidence artifact must now contain one final `hosted-demo-metadata.json` with all four required captures, viewport dimensions, screenshot dimensions, byte counts, and horizontal-overflow sanity. Partial per-test metadata overwrites are blocked by the v1.1.0-alpha.5 no-browser gate.


Boundary reminder: No live scraping, no real OAuth/account login, and no automated source verification are enabled by this public-demo freeze audit. Screenshots and ZIP existence alone remain insufficient for release approval.


Evidence manifest continuity: v1.1.0-alpha.5 preserves the single final metadata hosted-demo evidence manifest gate.
