Current release reference: v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation. Planning/preflight only; no live/provider/OAuth/backend/source/storage expansion. Locked stable baseline: v1.3.0 — Stable Manual Workflow Release. Locked trace/readiness baseline: v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report.

# QA Matrix

Current release candidate: v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation

Required gates:
- No-browser CI
- Browser CI
- Hosted-demo evidence capture
- Visible-text snapshots AR/EN/FR
- Golden workflow regression lock
- Export Pack v3 consistency lock
- Source-to-brief workflow structure, claim/evidence linkage, support levels, contradiction grouping, gap warnings, confidence metadata, and export integrity
- No automatic source verification claims
- Release candidate hygiene / stale-copy sweep
- Repo/package hygiene verification

Node 24 CI compatibility is preserved for v1.3.0.

No live scraping, no live connector expansion, no live provider execution expansion, no OAuth/backend expansion, and no automatic source verification claims.

Screenshots alone are insufficient. ZIP existence alone is insufficient. A ZIP archive alone is insufficient. A local ZIP archive alone is insufficient.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.

Public Demo evidence, hosted-demo review, and source-to-brief export review remain required for lock.

No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone, ZIP existence alone, and ZIP archive alone are insufficient for release approval.

## Stable baseline note

Stable baseline retained: v1.1.0 remains the locked Public Demo reference for post-stable expansion gating. Node 24 CI compatibility remains preserved for the local/manual source-to-brief release.


Alpha.8 preserved feature surface: Diagnostic Repair Queue + Export Risk Resolution.
