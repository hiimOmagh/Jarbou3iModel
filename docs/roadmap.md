# Roadmap

## v1.1.0-alpha.2 — Repository Consolidation Audit + Retention Registry

Current post-freeze alpha gate. Converts the v1.1.0-alpha.1 planning lanes into explicit acceptance criteria, falsifiers, evidence requirements, owners, and blocked-until gates. Implementation remains blocked. No live scraping, production OAuth, live provider execution, backend expansion, source connector expansion, storage expansion, or automated verification is introduced.

## Phase 1 — Post-freeze expansion gates before implementation

| Stage | Version | Title | Status |
|---|---:|---|---|
| Current alpha | `v1.1.0-alpha.2` | **Repository Consolidation Audit + Retention Registry** | Current |
| Previous alpha | `v1.1.0-alpha.1` | **Post-Freeze Product Expansion Planning Gate** | Completed |
| Freeze baseline | `v1.0.30` | **Mobile Header Geometry Lock / Final Public Demo Visual Freeze** | Locked |
| Next implementation candidate | `v1.1.0-alpha.3` | **Repository Consolidation Audit + Retention Registry** | Planned |
| Blocked | — | Live scraping, production OAuth, real provider execution, new live connectors, storage expansion | Explicitly blocked |

## Boundary assertions

- Manual/private mode remains default.
- No live scraping is added.
- No real OAuth or PKCE production path is added.
- No provider expansion is added.
- No backend endpoint expansion is added.
- No source connector expansion is added.
- Evidence upload does not equal release approval.
- GitHub Actions status must be reviewed against the intended release commit SHA.
- Current-state documentation must not advertise stale or unavailable capabilities.

## CI baseline

Node 24 remains the GitHub Actions runtime baseline for v1.0.25.

## Retained v1.0.23 audit boundary

- v1.0.23 — CI Result Review + Browser Evidence Artifact Audit remains the historical CI/browser evidence audit patch.
- Evidence upload is still inspection material, not release approval.


### `v1.1.0-alpha.2 — Repository Consolidation Audit + Retention Registry`

Purpose: changed-files-only patch apply verification before capability expansion.
