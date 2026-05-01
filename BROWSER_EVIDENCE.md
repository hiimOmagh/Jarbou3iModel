# Browser Evidence

Browser evidence is the proof bundle for the public hosted demo.

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

The screenshots must show no horizontal overflow, visible first-run/public-demo/hosted-demo/evidence-review panels, and reachable provider/export states. The metadata snapshot must show app version `1.0.9` and the evidence-review panel present.
