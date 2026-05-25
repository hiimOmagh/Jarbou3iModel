# Current Release

## v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation

Status: built locally. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle upload.

Public release label: v1.4.0-alpha.1 Controlled Provider/Source Execution Preparation.

Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
Last locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
Manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`. Do not patch v1.3.0, rc.2, or alpha.10 further.

## Scope

Planning/preflight only:

- Provider execution threat model.
- Provider execution preflight gate.
- ADR-001 provider execution model.
- ADR-002 source acquisition controls.
- ADR-003 credential boundary.

## Boundary flags

```text
live_fetching_performed: false
live_source_fetching_performed: false
provider_execution_performed: false
provider_behavior_changed: false
oauth_behavior_changed: false
backend_behavior_changed: false
source_behavior_changed: false
storage_behavior_changed: false
automatic_source_verification_claimed: false
automatic_signoff_performed: false
automatic_export_lock_performed: false
cryptographic_signature_claimed: false
publication_permission_claimed: false
```

No live scraping. No live source fetching. No provider execution expansion. No production OAuth. No backend behavior expansion. No storage expansion. No automatic source verification. No automatic signoff. No automatic export lock. No cryptographic signature claim. No publication permission claim.

Screenshots alone are insufficient. A ZIP archive alone is insufficient.

## Validation

- Version: `1.4.0-alpha.1`
- Required targeted checks: `tests/provider-execution-threat-model-check.mjs`, `tests/provider-execution-preflight-check.mjs`.
- Required CI: `npm run test:ci:no-browser`, `npm run test:ci:browser`.

Feature surface is frozen except planning/preflight artifacts; no live execution is enabled.

## Release Manifest Compatibility

Package: `jarbou3i-research-engine`
Version: `1.4.0-alpha.1`
Runtime capability change: no
Required browser gates before publishing: `npm run test:ci:browser`
Release archive exclusions: `node_modules/`, `playwright-report/`, `test-results/`, `*.zip`, `backend/.dev.vars`
Required cleanup commands: remove generated Playwright/test output before packaging.

Machine tokens: runtime_capability_change=false; release_type=controlled-provider-source-execution-preparation; release_scope=planning-preflight-only; test:ci:browser required.
Node 24 CI compatibility preserved.
Release lock requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence.
Planning gate continuity: apply integrity, changed-files-only patching, Package Script Compression, Version Suite Registry, Fixture Registry, and test organization checks remain active.
Public Demo boundary: v1.4.0-alpha.1 keeps the locked public demo/manual workflow behavior unchanged while preparing controlled execution gates.
