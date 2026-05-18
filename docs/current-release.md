# Current Release

## v1.1.0-alpha.10 — Hosted Evidence Capture Polish + Visual Artifact Guard

This cleanup release consolidates root-level release and evidence documents into the maintained documentation layer while preserving release-provenance, public-demo, hosted-evidence, and changed-files-only discipline.

Current status:

- Runtime capability change: false
- Provider behavior change: false
- OAuth behavior change: false
- Backend/source/storage behavior change: false
- Public-demo honesty boundary: preserved
- Migration/privacy fixture registries: preserved from v1.1.0-alpha.4
- Version-suite and release-doc registries: preserved from v1.1.0-alpha.5
- Root release/evidence files: consolidated into `docs/release-and-evidence.md`, `docs/current-release.md`, and `MANIFEST.json`

Retained source-root documents:

- `README.md`
- `CHANGELOG.md`
- `PUBLIC_DEMO.md`
- `MANIFEST.json`

Consolidated legacy root artifacts:

- `BROWSER_EVIDENCE.md`
- `HOSTED_DEMO_VERIFICATION.md`
- `RELEASE_MANIFEST.md`
- `RELEASE_NOTES.md`
- `MANIFEST.md`
- `CHANGED_FILES_MANIFEST.json`
- `DELETE_FILES_MANIFEST.json`

Required validation:

- `npm run test:current:no-browser`
- `npm run test:root-release-artifacts`
- `npm run test:ci:no-browser`
- `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`

No live scraping, no real OAuth, no live provider execution, no backend endpoint expansion, no source connector expansion, no automated source verification, and no storage expansion are introduced.

Release approval still requires green no-browser CI, green browser CI, reviewed hosted-demo evidence, aligned public claims, privacy/export safety, artifact SHA256, and a clean archive boundary for the intended release commit.

## Consolidated release manifest compatibility

- Package: `jarbou3i-research-engine`
- Version: `1.1.0-alpha.10`
- Runtime capability change: no
- Required browser gates before publishing
- Release archive exclusions
- Required cleanup commands

Node 24 CI compatibility is preserved with actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v6, npm ci --no-audit --no-fund --ignore-scripts, and PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser.

## Release-lock requirement tokens

Screenshots alone are insufficient.
A ZIP archive alone is insufficient.
This release requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence before approval.


Evidence manifest continuity: v1.1.0-alpha.10 preserves hosted-demo evidence manifest discipline, including the single final metadata capture manifest boundary.
