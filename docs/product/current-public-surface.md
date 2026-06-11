# Current Public Surface

Purpose: describe the public/product-facing state without duplicating the full release history in README, public demo notes, and QA matrices.

## Public mode

The current public surface remains a controlled, manual, evidence-oriented research workflow. It emphasizes local/manual source handling, evidence review, dry-run governance, and operator-controlled export behavior.

## Capability boundaries

The public surface must not imply:

- live scraping
- automatic provider execution
- production OAuth
- real OAuth connection
- real API key use
- backend storage activation
- cryptographic signing
- source verification beyond the explicit evidence available in the local or hosted run

## User-facing promise

The product promise is controlled research assistance with explicit evidence boundaries. The interface may demonstrate planning, source packet handling, review, export, and evidence capture, but it must not claim hidden live execution or unverified source acquisition.

## Documentation relationship

Public-facing docs should reference this file for current public surface language instead of copying the full release-truth timeline.

Recommended wrappers:

- `README.md` should summarize the product and link to canonical release/evidence docs.
- `PUBLIC_DEMO.md` should describe demo availability and boundaries, then link here.
- `docs/qa-matrix.md` should retain gate summaries and link to the canonical QA/evidence surface.

## Current consolidation status

Alpha.67 introduces this canonical surface but does not yet rewrite public wrappers. That wrapper reduction should be a later patch after no-browser and browser gates remain green.
