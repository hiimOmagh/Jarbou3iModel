## v1.0.14 — Evidence Scoring v1

Patch release. Adds local evidence scoring v1 so attention signals are tracked separately from evidence reliability before synthesis.

Runtime capability change: no. Manual/private mode remains default. No live scraping, production OAuth, provider behavior, backend endpoint behavior, source connector behavior, or storage behavior is enabled.

## What changed

- Added `src/research/evidence-scorer.js`.
- Added `evidence_scoring` to each evidence item.
- Added `evidence_scoring_report` to exported research packets.
- Added schema and fixture coverage for `evidence_scoring.v1`.
- Added Quality Gate v3 dimensions for evidence reliability and attention-signal integrity.
- Added risk flags for high-attention/low-reliability items.
- Preserved the manual source import review queue.

## Validation

```bash
npm run test:evidence:scoring
npm run test:v114:no-browser
npm run test:ci:no-browser
```

Browser validation remains required before updating a hosted demo:

```bash
npm run test:ci:browser
```

Public Demo boundary remains unchanged: use manual/mock mode unless browser QA and release gates pass.
