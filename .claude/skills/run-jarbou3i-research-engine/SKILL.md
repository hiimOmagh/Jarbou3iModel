---
name: run-jarbou3i-research-engine
description: Run, screenshot, and drive the Jarbou3i Research Engine web app. Use when asked to run the app, start the server, take a screenshot, test a UI change, verify layout, check overflow, or interact with the research engine.
---

# run-jarbou3i-research-engine

Jarbou3i Research Engine is a static, browser-side trilingual (AR/EN/FR) research workbench served by `http-server`. The agent path is: start `http-server` on port 4173, then drive the running app with `.claude/skills/run-jarbou3i-research-engine/driver.mjs` using a pre-installed Playwright Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. No Xvfb required — Chromium runs headless.

## Prerequisites

No `apt-get` installs needed. All runtime dependencies are pre-installed in this container:

- Playwright Chromium: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
- System Playwright: `/opt/node22/lib/node_modules/playwright`
- http-server: installed via `npm ci` into `node_modules/`

One-time dep install (if `node_modules/` absent):

```bash
npm ci --no-audit --no-fund --ignore-scripts
```

## Start the server

```bash
npx http-server . -p 4173 -c-1 &
```

Verify it's up:

```bash
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/
# → 200
```

If port 4173 is already in use (`EADDRINUSE`), a previous instance is still running — use it as-is.

## Run (agent path)

The driver is `.claude/skills/run-jarbou3i-research-engine/driver.mjs`. Run it with Node directly. The server must be up first.

**Full smoke test** (overflow + version + all 3 languages + guided CTA):
```bash
node .claude/skills/run-jarbou3i-research-engine/driver.mjs smoke
```
Expected output ends with `=== SMOKE PASS ===` and deposits 4 screenshots in `/tmp/`.

**Screenshot desktop viewport** (1280×800):
```bash
node .claude/skills/run-jarbou3i-research-engine/driver.mjs screenshot /tmp/my-shot.png
```

**Screenshot mobile viewport** (375×812):
```bash
node .claude/skills/run-jarbou3i-research-engine/driver.mjs mobile /tmp/mobile.png
```

**Switch language and screenshot**:
```bash
node .claude/skills/run-jarbou3i-research-engine/driver.mjs lang en
node .claude/skills/run-jarbou3i-research-engine/driver.mjs lang ar
node .claude/skills/run-jarbou3i-research-engine/driver.mjs lang fr
```

**Assert zero horizontal overflow** (exits 1 if overflow > 0):
```bash
node .claude/skills/run-jarbou3i-research-engine/driver.mjs overflow
```

**Click a nav tab by partial label** (first match in DOM order, switches to EN first):
```bash
node .claude/skills/run-jarbou3i-research-engine/driver.mjs navigate quality
node .claude/skills/run-jarbou3i-research-engine/driver.mjs navigate sources
```

**Click "Start guided setup" CTA**:
```bash
node .claude/skills/run-jarbou3i-research-engine/driver.mjs guided
```

**Print the visible version label**:
```bash
node .claude/skills/run-jarbou3i-research-engine/driver.mjs version
# → version: v1.3.0 الإصدار المستقر لسير العمل اليدوي
```

Screenshots land in `/tmp/jarbou3i-*.png` unless you pass a custom path.

## Run (human path)

```bash
npx http-server . -p 4173 -c-1
# Open http://127.0.0.1:4173 in a browser
# Ctrl-C to stop
```

This is useless headless — use the driver instead.

## Test suite

No-browser gates (fast, ~14 s):
```bash
npm run test:current:no-browser
```

Full no-browser CI suite (~14 s):
```bash
npm run test:ci:no-browser
```

Browser-driven Playwright specs (requires Chromium, ~3–4 min in CI):
```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run test:browser
```

Targeted suites:
```bash
npm run test:source    # source connector checks
npm run test:release   # release truth and hygiene checks
npm run test:privacy   # export guard and privacy boundary checks
```

## Gotchas

- **`navigate evidence` hits workflow step buttons before the nav tab.** The driver matches the first DOM button containing the partial text. The nav tabs come after the golden-workflow step list in DOM order. Use `navigate quality` (unambiguous) or pass a more specific label like `"Quality"` to reach the Quality & Export tab. For the Evidence tab, use `navigate "Evidence"` (exact case match works because `.includes()` is case-insensitive and the step label has number prefixes like "3Add or import evidence").

- **`npx playwright install chromium` fails with download error.** The network policy blocks Playwright CDN downloads. Do not attempt to download a new Chromium — use the pre-installed one at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. The driver hardcodes this path.

- **`npx playwright install --with-deps` fails with apt 403 errors.** The PPA repos (`deadsnakes`, `ondrej/php`) are blocked. Skip `--with-deps` entirely — system Chromium dependencies are already satisfied.

- **Port 4173 `EADDRINUSE`.** A previous `http-server` instance is still live. Check with `lsof -i :4173` and either reuse it or `kill <pid>` first.

- **`node_modules/` absent triggers `Cannot find module 'playwright'` in driver.** The driver imports from `/opt/node22/lib/node_modules/playwright` (system-global), so it works even without local `node_modules`. But `http-server` is a local dep — run `npm ci --no-audit --no-fund --ignore-scripts` first if it's missing.

- **App default language is Arabic (RTL).** `index.html` sets `lang="ar" dir="rtl"`. All driver commands that need tab labels switch to EN first (`lang en`) before navigating, because tab text is localized.

- **The app has no backend and makes no network calls.** All data is in-memory or imported manually. No API keys, no CORS headers, no OAuth flows — the app loads purely from static files.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `curl → 000` (no response on 4173) | Server not started. Run `npx http-server . -p 4173 -c-1 &` |
| `Error: Failed to download Chrome` | Network blocked. Use pre-installed chrome at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` — driver already does this |
| `Cannot find module '/opt/node22/lib/node_modules/playwright/index.mjs'` | Wrong Node version in PATH. The driver assumes `node` resolves to the system node that sees `/opt/node22`. Check `node --version` (must be v22+) |
| Screenshot is blank white | Chromium started before server was ready. Add `sleep 1` between server start and driver call |
| `overflow: 2` or similar | A CSS regression introduced horizontal overflow. Inspect the diff against `src/styles.css` |
