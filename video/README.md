# Jarbou3i Explainer Video

A voice-narrated, word-captioned Remotion explainer (1920×1080, 30 fps, about 2 minutes)
for the Jarbou3i Model, live at **https://jarbou3i-model.pages.dev/**. That is
the only public link the video shows or speaks.

| # | Scene | What the viewer learns |
|---|---|---|
| 0 | Hook | A raw claim passes the Epistemic Gate and splits into `verified_fact`, `institutional_claim` and `plausible_inference`. Publication stays blocked. |
| 1 | How it works | Topic → Lens → Settings → Prompt → Answer, with any AI assistant. Imports are salvaged, continued or completed, and nothing is invented. |
| 2 | Two lenses | Strategic v1.1: six causal layers, tested against contradictions, scenarios, evidence and assumptions. Biopolitical Training Map v2.1: 9 pillars, 13 capture criteria, 9 rival explanations, 5 capture levels and an 18-point self-audit. |
| 3 | Evidence discipline | The 10 epistemic types and the publication gate. The readiness score cannot override the gate. |
| 4 | In-depth review | Overview, Protocol, Connections, Evidence test and Judgment. |
| 5 | Local-first | No account, backend or tracking. Immutable revisions, a review ledger, crash recovery and backups. HTML and canonical JSON exports. |
| 6 | Call to action | Arabic (RTL), French and the light theme, then jarbou3i-model.pages.dev. |

Product footage in `public/ui/` is captured from the live site. Every scene
lasts as long as its narration plus a 0.6 s pause. Captions are timed per word,
and visuals are cued to the spoken words.

## Commands

```console
npm i
npm run tts         # ElevenLabs voiceover + word timestamps -> public/tts/
npm run dev         # Remotion Studio
npm run typecheck
npm run render      # -> out/jarbou3i-explainer.mp4
```

## Secrets

`npm run tts` reads `ELEVENLABS_API_KEY` (and optional `ELEVENLABS_VOICE_ID`)
from `.env`, which git ignores. The key is used only inside the Node script. It never
appears in source, props, the manifest or the browser bundle. Without a key or
network, the script writes deterministic silent placeholder audio with synthetic
timings, so the pipeline never blocks.

```console
echo 'ELEVENLABS_API_KEY=sk_...' > .env
```

## Rendering a new case study

The hook's three claim cards can come from any analysis exported by the
workbench, in either lens:

```console
npx tsx scripts/json-to-props.ts my-analysis.json --headline "The raw claim" --out out/props.json
npx remotion render Jarbou3iExplainer out/my-case.mp4 --codec=h264 --props=out/props.json
```

Biopolitical evidence already carries an `epistemic_type`. Strategic evidence
is mapped from `basis` and `evidence_strength`:

| Strategic evidence | Card type |
|---|---|
| `basis` is `observation` or `source_based`, and `evidence_strength` ≥ 4 | `verified_fact` |
| `basis` is `inference` or `estimate`, and `evidence_strength` ≥ 3 | `plausible_inference` |
| `evidence_strength` ≤ 2 | `institutional_claim` |

When a wanted type is missing, its card takes the next unused typed item and
keeps that item's real type. With fewer than three typed items, the script stops
with an error.

The bundled `case-studies/subsidy-digitization.strategic.json` is an
**illustrative teaching case**: every name, figure and source is hypothetical.
It passes the workbench's canonical Strategic schema and its integrity gate.

## Layout

- `src/types/jarbou3iSchema.ts`: Zod props schema and TTS manifest schema
- `src/Root.tsx`: composition with `calculateMetadata`, which reads `public/tts/manifest.json`
- `src/Jarbou3iExplainer.tsx`: `<Series>` of scenes, each with `<Audio>` and `<WordCaptions>`
- `src/scenes/*`: the seven scenes; `src/components/BrowserFrame.tsx` shows live-site footage with zooms; `src/components/WordCaptions.tsx` holds the captions
- `scripts/generate-tts.ts`, `scripts/json-to-props.ts`: the pipeline scripts
- `public/fonts`: self-hosted Inter and JetBrains Mono (SIL OFL), so renders need no network
