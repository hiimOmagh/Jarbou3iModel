# Golden Baseline Inventory — v1.1.0-alpha.12

## Purpose

Lock the behavior that must remain stable before product expansion or source refactor work.

## Protected contracts

- manual/private mode remains first-class.
- Runtime/provider/OAuth/backend/source/storage boundaries remain unchanged.
- Hosted evidence capture keeps `capture_settled`, `visual_artifact_guard_passed`, canonical chromium capture, and duplicate-project overwrite guard.
- Arabic, French, and English visible-text snapshots must exist before lock.
- Valid technical tokens remain allowlisted: JSON, API, OAuth, PKCE, BYOK, OpenAI, URL, CSV.
- Fixture Registry payload compression and test organization audit remain preserved.
- Package Script Compression and CI Gate Registry remain preserved.
- Root Manifest and Release Artifact Consolidation continuity remains preserved.
- Node 24 CI compatibility remains preserved.

## Disproven if

The baseline is invalid if screenshots alone are accepted, ZIP existence alone is accepted, language fallback leaks are ignored, or a large source refactor occurs in alpha.12.
