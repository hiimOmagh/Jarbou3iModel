# v1.1.0-alpha.14 targeted edits for `index.html`, `package.json`, and QA suite

## `package.json`

- Change `version` from `1.1.0-alpha.13` to `1.1.0-alpha.14`.
- Update description to: `Jarbou3i Research Engine v1.1.0-alpha.14 evidence workspace and source import V2. Adds manual raw-to-reviewed-to-accepted/rejected evidence workflow hardening, contradiction markers, source confidence/type classification, evidence-to-claim linking, and source gap warnings while preserving prompt compiler, visible-text snapshot guards, privacy/export boundaries, and no live provider/source/OAuth/backend expansion.`

## `index.html`

Replace all user-visible and metadata occurrences of `1.1.0-alpha.13` with `1.1.0-alpha.14`.

Update alpha badge:

```html
<div class="researchEyebrow" data-r-i18n="alphaBadge">v1.1.0-alpha.14 · Evidence Workspace + Source Import V2</div>
```

Update the hosted-demo body copy so it says alpha.14 adds a manual evidence workspace/source-import V2 instead of the alpha.13 prompt compiler scope.

Insert this script tag before `evidence-review-controller.js`:

```html
<script src="src/research/evidence-workspace.js" defer></script>
```

Recommended insertion block:

```html
<script src="src/research/evidence-controller.js" defer></script>
<script src="src/research/evidence-scorer.js" defer></script>
<script src="src/research/evidence-workspace.js" defer></script>
<script src="src/research/evidence-review-controller.js" defer></script>
```

Update the screen-reader release note:

```html
<span class="sr-only" data-r-i18n="analysisReleaseNote">تضيف v1.1.0-alpha.14 مساحة أدلة يدوية ومسار استيراد مصادر V2 مع تصنيف الثقة، علامات التناقض، ربط الدليل بالادعاء، وتحذيرات فجوات المصدر دون جلب خارجي أو مزوّد حي.</span>
```

## `tests/no-browser-qa-suite.mjs`

Add this after `tests/evidence-scoring-check.mjs`:

```js
  'tests/evidence-workspace-check.mjs',
```
