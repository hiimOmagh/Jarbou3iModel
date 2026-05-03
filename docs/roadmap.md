# Roadmap

## Phase 0 — Stabilize release evidence before new features

| Stage | Version | Title | Status |
| ---: | --- | --- | --- |
| Current patch | `v1.0.23` | **CI Result Review + Browser Evidence Artifact Audit** | Current |
| Immediate next | `v1.0.24` | **Repo Hygiene Execution + Stale Documentation Correction** | Next candidate |
| Release lock | `v1.0.25` | **Public Demo Release Lock** | After hygiene |
| Next capability jump | `v1.1.0` | **Controlled Source Workflow MVP** | Only after QA/release stability |
| Blocked | — | Live scraping, production OAuth, BrainLink/OpenRouter PKCE, new live connectors, provider behavior changes | Explicitly blocked |

### `v1.0.23 — CI Result Review + Browser Evidence Artifact Audit`

Purpose: verify the real GitHub Actions state, not just local or sandbox assumptions.

Must do:

- review actual GitHub Actions logs;
- verify no-browser CI;
- verify browser CI;
- inspect uploaded browser evidence artifacts;
- confirm evidence upload is not treated as release approval;
- confirm Playwright install discipline remains correct;
- confirm Node 24 workflow is stable;
- confirm public repository state matches the release archive.

Acceptance gate:

```bash
npm run test:ci:no-browser
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

No new product features.

### `v1.0.24 — Repo Hygiene Execution + Stale Documentation Correction`

Purpose: execute cleanup that is currently documented but still needs Git-level verification.

Must do:

- run documented `git rm` cleanup commands;
- verify stale tracked files are actually gone from Git;
- correct stale docs such as `docs/ai-integration.md`;
- rebuild release archive;
- confirm `.releaseignore` excludes generated artifacts;
- confirm no ZIP/test-report/browser artifact pollution.

Acceptance gate:

```bash
git status --short
git ls-files | grep -E 'node_modules|test-results|playwright-report|\.zip|XX'
npm run test:ci:no-browser
```

Expected result: clean repo, clean docs, clean artifact boundary.

### `v1.0.25 — Public Demo Release Lock`

Purpose: make the current stable/manual/private public demo fully releasable.

Must do:

- final public demo walkthrough;
- verify onboarding path;
- verify manual/private mode default;
- verify export safety;
- verify source packet builder UX;
- verify no unavailable feature is visually advertised as live;
- verify hosted demo docs match actual UI.

Acceptance gate:

```bash
npm run test:stable
npm run test:ci
```

After this, the repo can be considered a clean stable baseline.

## Phase 1 — Controlled Source Workflow MVP

### `v1.1.0 — Controlled Source Workflow MVP`

Purpose: make the source workflow usable without uncontrolled scraping.

Core feature:

```text
Topic → Source Strategy → Source Packet Builder → Evidence Review Queue → Evidence Matrix → Exported Research Packet
```

Must include:

- source-plan generator;
- source-type targets: article, official document, transcript, code, social signal, market signal;
- manual/import-first collection;
- reliability labels;
- coverage gaps;
- contradiction detection;
- source review queue;
- no live scraping.

Acceptance criteria:

- user can start a topic and get a structured source acquisition plan;
- imported/manual sources become evidence candidates;
- evidence candidates must pass review before entering final matrix;
- exports clearly separate observation, inference, assumption, unsupported claim, public signal, and source-backed evidence.

### `v1.1.1 — Source Coverage Metrics`

Purpose: detect weak research coverage. This is a coverage score, not a truth score.

Add scoring for actor coverage, time coverage, geography coverage, evidence-type diversity, primary-source ratio, contradiction coverage, freshness coverage, and missing-source warnings.

### `v1.1.2 — Evidence Reliability Calibration`

Purpose: improve ranking of evidence.

Reliability dimensions: source proximity, recency, verifiability, institutional quality, conflict risk, and claim specificity.

Disproven if: low-quality social posts can outrank primary documents without explicit justification.

### `v1.1.3 — Contradiction + Counter-Evidence Engine`

Purpose: prevent one-sided analysis.

Must detect claims with no counter-evidence, actor rhetoric/action contradictions, timeline contradictions, source conflict, weak causal chains, and missing falsifiers.

Output must include claim, supporting evidence, counter-evidence, confidence, and what would disprove it.

## Phase 2 — Controlled live retrieval, not scraping

### `v1.2.0 — Web Search Provider Adapter`

Purpose: add a controlled search provider abstraction through a compliant backend/API path.

Boundary:

- no raw scraping;
- no browser-session hijacking;
- no hidden user tokens;
- no live connector shown unless configured;
- search results remain candidates, not verified evidence.

### `v1.2.1 — Result Normalization + Deduplication`

Purpose: prevent noisy web retrieval by handling duplicate URLs, syndicated copies, stale pages, missing dates, weak snippets, non-authoritative copies, and source-type classification.

### `v1.2.2 — Query Tuning + Weak-Case Feedback`

Purpose: improve retrieval quality from failed searches with query variants, actor-specific searches, official-source searches, academic-source searches, local-language searches, weak-case detection, and a retrieval run ledger.

Metrics:

```text
useful_sources / total_sources
primary_sources / total_sources
review_approved / imported_candidates
```

## Phase 3 — Analysis engine hardening

### `v1.3.0 — Analysis Contract v2`

Purpose: force better analytical output. Every major inference must point to either evidence or an explicit assumption.

### `v1.3.1 — Prompt/Provider Evaluation Harness`

Purpose: compare provider output quality without blindly expanding provider features.

Measure schema compliance, evidence grounding, contradiction handling, source misuse, hallucination risk, missing actors, overconfident claims, and weak falsifiers.

## Phase 4 — Product UX consolidation

### `v1.4.0 — Research Workspace v2`

Purpose: make the tool feel like a real editorial intelligence workspace.

Add project dashboard, saved research briefs, source board, evidence matrix view, contradiction panel, export preview, research status checklist, and weak-area warnings.

### `v1.4.1 — Export Pack v3`

Purpose: create professional deliverables: strategic brief, evidence report, source audit, contradiction memo, scenario memo, JSON packet, and Markdown report.

No fake citations. No hidden generated evidence.

## Phase 5 — Backend and auth expansion

### `v1.5.0 — Hosted Backend Production Gate`

Only after the manual/source workflow is stable.

Must complete Cloudflare secret handling, CORS restriction, rate limiting, model allowlist, timeout handling, metadata-only audit logs, no prompt/response logging unless explicitly designed, abuse protection, and public privacy notice.

### `v1.6.0 — Portable OAuth Threat-Modeled Spike`

Only after backend production gate.

Before implementation: threat model, token storage design, PKCE flow validation, spending-limit UX, export redaction, failure-mode tests, and provider terms review.

This remains blocked until explicitly scoped.

## Strategic sequencing verdict

```text
v1.0.23
→ v1.0.24
→ v1.0.25
→ v1.1.0
→ v1.1.1
→ v1.1.2
→ v1.1.3
→ v1.2.0
```
