Current release reference: v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation. Planning/preflight only; no live/provider/OAuth/backend/source/storage expansion. Locked stable baseline: v1.3.0 — Stable Manual Workflow Release.

# Fixture/Test Debt Ledger

Version: `1.3.0`
Release: `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`
Mode: audit-only, no runtime behavior change.

## Scope

This ledger records remaining fixture and test complexity after package script compression, fixture payload compression, test matrix runtime optimization, and hosted evidence capture hardening. It does not authorize feature work, UI redesign, provider expansion, OAuth enablement, backend changes, source connector changes, storage changes, or fixture semantic thinning.

## Debt register

| ID | Area | Observation | Risk | Readiness decision |
| --- | --- | --- | --- | --- |
| FTD-001 | Fixture registries | Migration and privacy fixtures are consolidated and compressed, but the registries still represent many release-era compatibility packets. | Accidental semantic thinning could weaken migration/privacy regression confidence. | Keep compressed registries; add budget checks before deleting or thinning payloads. |
| FTD-002 | Test inventory | The `tests/` directory keeps many focused historical gates. | Unregistered checks or ad-hoc aliases can silently drift from CI coverage. | Keep registry-owned execution; require all `*-check.mjs` files to be registered. |
| FTD-003 | Browser evidence | Hosted evidence capture is now guarded, but browser CI remains the slowest gate. | Evidence quality can regress if capture timing or project-scope rules are loosened. | Preserve canonical-project capture policy and settle/artifact metadata checks. |
| FTD-004 | Release docs | Release history is pruned into a timeline index with embedded anchors. | Duplicated release detail can inflate repository size and confuse handoff review. | Keep timeline pruning; move operational detail into current-release and release/evidence docs. |
| FTD-005 | Language/copy surface | The interface is trilingual and RTL-aware, but strategic descriptions require professional terminology parity across Arabic, English, and French. | Poor copy quality weakens trust and makes the product feel less institutional. | Add a language-description audit and avoid informal, underspecified, or mismatched translations. |

## Operating rule

Any future cleanup must satisfy all three conditions:

1. It preserves current CI gates and fixture coverage.
2. It reduces complexity without deleting evidence needed for release provenance.
3. It is disproven if runtime/provider/OAuth/backend/source/storage behavior changes.
