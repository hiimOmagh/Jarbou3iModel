# ADR-016 — Limited Manual Live-Execution Prototype

Status: Accepted for v1.4.0-alpha.10

## Context

v1.4.0-alpha.9 locked a controlled execution candidate gate without enabling execution. The next step is a limited manual live-execution prototype shell that can express operator preconditions and hard failure reasons while preserving every safety boundary from alpha.6 through alpha.9.

## Decision

Add a deterministic, disabled-by-default manual opt-in shell. The shell records whether a future manual attempt has the required operator preconditions, but it does not perform provider calls, source fetching, OAuth, token lifecycle, credential persistence, background execution, automatic verification, signoff, export lock, cryptographic signing, or publication permission claims.

## Boundary

The prototype is not a live execution release. It is a control-plane shell only.

Forbidden in this milestone:

- default live execution
- hidden network calls
- real OAuth or token lifecycle
- credential persistence
- uncontrolled scraping
- automatic source fetching
- provider-suggested source auto-acceptance
- automatic source verification
- automatic signoff or export lock
- publication permission claims

## Acceptance

The release is acceptable only if tests prove:

- live execution remains disabled by default
- manual opt-in is required and not sufficient to execute immediately
- no raw credentials or token storage are introduced
- no network-call primitives are introduced in the prototype module
- hard failure reasons are returned when prerequisites are missing
- existing alpha.6, alpha.7, alpha.8, and alpha.9 boundaries remain intact
