# Language Description Audit

Version: `1.3.0-alpha.3`
Release: `v1.3.0-alpha.3 — Brief Template System + Assembly Variant QA`
Mode: copy-quality hardening, no runtime behavior change.

## Language policy

The product UI and public descriptions must remain professional, accurate, and aligned across Arabic, English, and French.

Required standards:

- Arabic: formal Modern Standard Arabic for product and workflow descriptions; no informal filler or vague marketing phrasing.
- English: concise strategic-product terminology; no soft consumer wording where an institutional tone is needed.
- French: clear professional French; avoid literal translation when a standard product term is better.
- RTL: Arabic remains the default `html lang="ar" dir="rtl"` shell.
- Public metadata: descriptions must describe the available product only: trilingual, client-side, source-aware, schema-governed, evidence-disciplined, quality-gated, and safe-export oriented.

## Audited surfaces

| Surface | Requirement |
| --- | --- |
| `src/app.js` i18n catalog | Same key structure across `ar`, `en`, and `fr`; professional descriptions for app subtitle, onboarding body, pillar descriptions, report subtitle, and quality score guide. |
| `index.html` metadata | Accurate public-demo description; no claims of live scraping, production OAuth, automated verification, or unavailable provider behavior. |
| `manifest.webmanifest` | Consistent public-demo description suitable for install surfaces. |
| Language selector | Arabic, English, and French remain visible and accessible. |

## Disproven if

The audit fails if any language has missing keys, empty descriptions, informal wording in core descriptions, a metadata claim about unavailable live functionality, or a regression in Arabic RTL defaults.
