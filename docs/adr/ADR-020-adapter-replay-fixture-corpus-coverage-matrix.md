# ADR-020 — Adapter Replay Fixture Corpus + Coverage Matrix

## Status

Accepted for `v1.4.0-alpha.14`.

## Context

`v1.4.0-alpha.13` introduced a deterministic adapter contract test bench and no-network invocation replay QA surface. That proved replay safety for adapter contract artifacts, but it did not provide a compact corpus-level view of which replay scenarios are covered across provider families and contract surfaces.

The next release needs a coverage matrix that is useful for operators and CI without expanding runtime/provider/source/OAuth/backend/storage behavior.

## Decision

Add `src/research/adapter-replay-fixture-corpus-coverage-matrix.js` as a metadata-only planning module. It builds a deterministic replay fixture corpus across:

- `openai_style`
- `anthropic_style`
- `local_llm_style`

Each provider family is mapped across these scenario classes:

- `metadata_success_replay`
- `request_envelope_shape_drift`
- `response_envelope_shape_drift`
- `missing_fixture_block`
- `adapter_failure_ux_rehearsal`
- `safe_transcript_comparison`
- `capability_matrix_mapping`

The module also builds a coverage matrix with cell states of `covered`, `gap`, `blocked`, or `review_required`, deterministic checksums, and explicit gap warnings.

## Boundaries

This milestone is coverage-only. It does not enable:

- real provider calls
- hidden network calls
- live source fetching
- real OAuth/token lifecycle
- real API keys
- token storage
- credential persistence
- backend/storage expansion
- uncontrolled scraping
- automatic source verification
- automatic signoff
- automatic export lock
- publication permission claims

## Consequences

Positive:

- Adapter replay coverage becomes auditable by provider family and scenario class.
- Missing replay cells become visible as deterministic gap warnings.
- CI can assert full corpus coverage without contacting providers or sources.

Tradeoff:

- The matrix proves fixture coverage only. It does not prove live execution readiness or real provider compatibility.

## Validation

Primary check:

```bash
node tests/adapter-replay-fixture-corpus-coverage-matrix-check.mjs
```

Release checks must also preserve alpha.13 adapter contract test bench validation and the existing no-browser/browser gates.
