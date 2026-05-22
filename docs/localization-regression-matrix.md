# Localization Regression Matrix — v1.1.0-rc.2-fix.3

## Scope

Arabic, French, and English visible UI must remain professionally localized across hosted evidence surfaces.

## Required screens

- desktop-first-screen
- mobile-first-screen
- provider-mode
- quality-export

## Required snapshots

- `visible-text-ar.json`
- `visible-text-fr.json`
- `visible-text-en.json`

## Allowed technical tokens

JSON, API, OAuth, PKCE, BYOK, OpenAI, URL, CSV, GitHub.

## Failure rule

Arabic and French snapshots fail when unexpected English fallback phrases appear outside the allowlist.
