# Source Refactor Partition Plan — v1.1.0-alpha.18

## Purpose

Plan safe future extraction seams without refactoring `src/app.js`, `src/research-engine.js`, or `src/styles.css` in alpha.12.

## Target files

- `src/app.js`
- `src/research-engine.js`
- `src/styles.css`

## Future extraction order

1. Localization infrastructure and translation dictionaries.
2. Provider/source diagnostic renderers.
3. Quality/export renderers.
4. Command center and workflow shell rendering.
5. CSS design tokens, layout, components, RTL/LTR layers.
6. App boot/event/persistence orchestration.
7. Research engine deep split.

## Alpha.12 boundary

No source-file refactor yet. No UI redesign. No runtime behavior change. No provider/OAuth/backend/source/storage feature change.
