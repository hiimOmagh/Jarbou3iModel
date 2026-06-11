# Strategy Roadmap

Purpose: define forward direction without repeating full release-truth history in every roadmap-related document.

## Current milestone

**v1.4.0-alpha.67 — Release Truth Surface Reduction**

Goal: reduce duplicate release-truth and validation language by introducing canonical documents, then gradually converting legacy files into short wrappers.

## Phase 1 — Canonical surfaces

Status target: first alpha.67 patch.

Deliverables:

- `docs/release/current-release-and-truth.md`
- `docs/engineering/qa-and-evidence-gates.md`
- `docs/product/current-public-surface.md`
- `docs/engineering/operator-runbook.md`
- `docs/strategy/roadmap.md`
- `scripts/release-truth-surface-reduction-check.mjs`

Acceptance:

- verifier script passes
- current-no-browser passes
- no-browser passes
- browser passes if release-locking
- no behavior boundaries are weakened

## Phase 2 — Legacy wrapper conversion

Convert high-duplication files into shorter wrappers:

- `PUBLIC_DEMO.md`
- `docs/qa-matrix.md`
- `docs/release-and-evidence.md`
- `docs/roadmap.md`

Do not delete these files in Phase 2. Keep them as compatibility surfaces for existing tests and readers.

## Phase 3 — Release-truth test simplification

After wrappers are stable, reduce tests that force every legacy document to repeat the same historical continuity tokens.

Target direction:

- one structured release identity source
- one canonical release-truth document
- one canonical QA/evidence document
- legacy docs validated as wrappers rather than full truth surfaces

## Phase 4 — Product workflow work resumes

Only after release-truth surface reduction should product UX milestones resume, including any golden workflow compression work.
