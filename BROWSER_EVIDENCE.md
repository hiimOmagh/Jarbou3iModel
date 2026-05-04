# Browser Evidence

## v1.0.27 — Release Provenance Ledger Gate

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


Browser evidence is the proof bundle for inspecting the public hosted demo. It is not standalone release approval.

## v1.0.25 — Public Demo Release Lock

This guide applies to v1.0.25 — Public Demo Release Lock.

## Artifact root

```text
test-results/hosted-demo-evidence
```

## Required artifacts

- `desktop-first-screen.png`
- `mobile-first-screen.png`
- `provider-mode.png`
- `quality-export.png`
- `hosted-demo-metadata.json`

## Capture modes

Local static mode:

```bash
npm run test:browser:evidence
```

Hosted URL mode:

```bash
HOSTED_DEMO_URL="https://example.github.io/jarbou3i-research-engine" npm run test:browser:evidence
```

## Evidence Review standard

The evidence review gate remains active before public-demo approval.

The screenshots must show no horizontal overflow, visible first-run/public-demo/hosted-demo/evidence-review panels, and reachable provider/export states. The metadata snapshot must show app version `1.0.25` and the evidence-review panel present.

## Release lock rule

Browser evidence must be reviewed together with CI status, release metadata, privacy/export boundaries, public-demo documentation, and archive hygiene. Screenshots alone are not sufficient for public-demo release approval.

ZIP existence alone is also not sufficient for public-demo release approval.
