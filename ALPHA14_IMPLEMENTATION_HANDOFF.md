# v1.1.0-alpha.14 — Evidence Workspace + Source Import V2

## Build thesis

Alpha.14 should not add scraping, OAuth, provider behavior, backend expansion, or a broad UI redesign. It upgrades the already-existing manual source-import/review path into a stronger evidence workspace.

## Included files in this patch packet

Changed/new files supplied as full copy-paste-ready files:

- `src/research/evidence-workspace.js` — new pure module for source confidence, contradiction markers, evidence-to-claim links, source gap warnings, queue reports, and workspace summaries.
- `src/research/source-import-adapter.js` — full replacement; Source Import V2 manual parser with workspace metadata.
- `src/research/source-packet-importer.js` — full replacement; manual source packet imports now emit workspace metadata.
- `src/research/evidence-review-controller.js` — full replacement; review reports delegate to the workspace model.
- `tests/evidence-workspace-check.mjs` — new no-browser validation for the alpha.14 workspace model.

Targeted integration edits supplied separately:

- `patches/RESEARCH_ENGINE_TARGETED_EDITS.md`
- `patches/INDEX_AND_PACKAGE_TARGETED_EDITS.md`

## Acceptance criteria

- Raw imported source candidates remain queue-only.
- Review states remain explicit: raw → reviewed/needs_edit → accepted/rejected.
- Accepted candidates are promoted into the Evidence Matrix only after review action.
- Contradiction markers are explicit and do not imply proof.
- Source confidence is classification metadata, not truth scoring.
- Evidence-to-claim links remain ID-based and reviewable.
- Source gap warnings are surfaced and exported.
- No uncontrolled scraping is added.
- No live provider call is added.
- No OAuth/backend expansion is added.
- Prompt compiler and visible-text snapshot guard remain preserved.

## Validation command set

```bash
node tests/evidence-workspace-check.mjs
node tests/source-import-check.mjs
node tests/evidence-review-queue-check.mjs
node tests/static-check.mjs
node tests/research-module-check.mjs
npm run test:ci:no-browser
npm run test:ci:browser
```

## Commit suggestion

```bash
git add package.json index.html src/research-engine.js src/research/evidence-workspace.js src/research/source-import-adapter.js src/research/source-packet-importer.js src/research/evidence-review-controller.js tests/evidence-workspace-check.mjs tests/no-browser-qa-suite.mjs
git commit -m "feat: add evidence workspace source import v2"
git push
```

## Known limitation of this packet

This packet includes full files for the new/small changed modules and targeted edit instructions for `src/research-engine.js`, `index.html`, and `package.json`. It is not a full repository release ZIP and was not executed against the complete repository in this sandbox.
