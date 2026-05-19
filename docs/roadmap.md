# Roadmap

## v1.1.0-alpha.13 — Prompt Compiler + Research Plan Upgrade

Current alpha. The product remains inside the public-demo safety boundary while the core research workflow becomes more useful. Alpha.13 adds a local/template-driven prompt compiler that turns topic/context input into a structured research-plan seed without live AI calls, live scraping, OAuth/backend expansion, source connector expansion, storage expansion, UI redesign, or large source refactor.

## Phase 1 — Post-freeze cleanup and productivity gates

| Stage | Version | Title | Status |
|---|---:|---|---|
| Completed | `v1.1.0-alpha.7` | **Package Script Compression + CI Gate Registry** | Locked |
| Completed | `v1.1.0-alpha.8` | **Fixture Registry Payload Compression + Test Organization Audit** | Locked |
| Completed | `v1.1.0-alpha.9` | **Test Matrix Runtime Optimization + Release Doc Timeline Pruning** | Locked |
| Completed | `v1.1.0-alpha.10` | **Hosted Evidence Capture Polish + Visual Artifact Guard** | Locked |
| Completed | `v1.1.0-alpha.11` | **Fixture/Test Debt Ledger + Source-File Refactor Readiness Audit** | Locked |
| Completed | `v1.1.0-alpha.12` | **Dev Productivity Command Center + Golden Baseline Automation** | Locked |
| Current alpha | `v1.1.0-alpha.13` | **Prompt Compiler + Research Plan Upgrade** | Current |
| Next candidate | `v1.1.0-alpha.14` | **Evidence Workspace + Source Import V2** | Planned |

## Near-term product-value sequence

1. `v1.1.0-alpha.13` — Prompt Compiler + Research Plan Upgrade.
2. `v1.1.0-alpha.14` — Evidence Workspace + Source Import V2.
3. `v1.1.0-alpha.15` — Report Builder + Export Pack V1.
4. `v1.1.0-alpha.16` — Project Library + Run Ledger.
5. `v1.1.0-alpha.17` — Controlled Source Connector MVP.

## Boundary assertions

- Manual/private mode remains default.
- No live scraping is added.
- No real OAuth or PKCE production path is added.
- No live provider execution is added.
- No backend endpoint expansion is added.
- No source connector expansion is added in alpha.13.
- Prompt compiler output is planning guidance, not source verification and not factual proof.
- Evidence upload does not equal release approval.
- GitHub Actions status must be reviewed against the intended release commit SHA.
- Current-state documentation must not advertise stale or unavailable capabilities.

## CI baseline

Node 24 remains the GitHub Actions runtime baseline. Package Script Compression, CI Gate Registry, Version Suite Registry, Root Manifest, Release Artifact Consolidation, Fixture Registry payload compression, test organization audit, hosted evidence capture, visible-text localization snapshots, and dev-productivity automation continuity are preserved.

Evidence manifest continuity: v1.1.0-alpha.13 preserves the single final metadata hosted-demo evidence manifest gate.

Release approval reminder: screenshots alone and ZIP existence alone are insufficient for public-demo approval.

Node 24 CI compatibility is preserved with actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v6, npm ci --no-audit --no-fund --ignore-scripts, and PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.
