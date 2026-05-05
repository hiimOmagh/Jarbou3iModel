# Release and Evidence Policy

This document consolidates the release/evidence policy previously scattered across root release artifacts and per-version docs.

## Rules

- CI green alone is not sufficient for public-demo approval.
- Screenshots alone are not sufficient for public-demo approval.
- ZIP existence alone is not sufficient for public-demo approval.
- The hosted-demo evidence artifact must include a single final `hosted-demo-metadata.json` with all required captures.
- Required captures remain: `desktop-first-screen`, `mobile-first-screen`, `provider-mode`, and `quality-export`.
- Evidence metadata must preserve viewport dimensions, screenshot dimensions, byte counts, full-page status, and horizontal-overflow sanity.
- Public-demo wording must not imply live scraping, real OAuth, live provider execution, automated source verification, or real source fetching unless implemented.

## Current baseline

- Public-demo visual freeze baseline: v1.0.30 — Mobile Header Geometry Lock / Final Public Demo Visual Freeze.
- Current structural cleanup line: v1.1.0-alpha.5 — Repository-Wide Structural Cleanup + Version/Documentation Registry Consolidation.

