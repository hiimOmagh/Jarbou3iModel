# Jarbou3i Explainer Video

A voice-narrated, word-captioned Remotion explainer (1920×1080, 30 fps) for
[`hiimOmagh/Jarbou3i_Model`](https://github.com/hiimOmagh/Jarbou3i_Model).
It walks through the **Strategic v1.1** lens one level at a time, so any viewer can follow:

| Scene | What the viewer sees |
|---|---|
| Hook | A raw institutional claim is split through an *Epistemic Gate* into a `VERIFIED_FACT` and a `STRUCTURAL_INFERENCE`. |
| Pillars | The six pillars (Actors, Interests, Tools, Narratives, Results, Feedback Loops) light up as they are spoken; the feedback loop cycles back to Actors. |
| Demo | Plain-language questions on the left; a JSON editor types the validated record, each claim gated by its epistemic status. |
| Quickstart | Three onboarding steps and a GitHub call to action. |

Durations come from the voiceover. Each scene lasts as long as its narration
plus a 0.6 s pause, and the captions are timed per word.

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

Export any Strategic v1.1 analysis from the Jarbou3i workbench, then:

```console
npx tsx scripts/json-to-props.ts my-analysis.json --headline "The raw claim" --out out/props.json
npx remotion render Jarbou3iExplainer out/my-case.mp4 --codec=h264 --props=out/props.json
```

`json-to-props` takes the first record of each pillar. It derives the status
label from the evidence that `links` attach to that record:

| Strongest linked evidence | Label |
|---|---|
| `basis` is `observation` or `source_based`, and `evidence_strength` ≥ 4 | `VERIFIED_FACT` |
| `evidence_strength` ≥ 3 | `STRUCTURAL_INFERENCE` |
| `evidence_strength` ≤ 2, or no linked evidence | `UNVERIFIED_CLAIM` |

A record can override its label with an explicit `epistemic_status` field.
These three labels belong to the video. They are not fields in the Strategic contract.

The bundled case, `case-studies/subsidy-digitization.strategic.json`, is an
**illustrative teaching case**: every name, figure and source is hypothetical.
It passes the repo's canonical Strategic schema and its semantic integrity gate.

## Layout

- `src/types/jarbou3iSchema.ts`: Zod props schema and TTS manifest schema
- `src/Root.tsx`: composition with `calculateMetadata`, which reads `public/tts/manifest.json`
- `src/Jarbou3iExplainer.tsx`: `<Series>` of scenes, each with `<Audio>` and `<WordCaptions>`
- `src/scenes/*`: the four scenes; `src/components/WordCaptions.tsx` holds the captions
- `scripts/generate-tts.ts`, `scripts/json-to-props.ts`: the pipeline scripts
- `public/fonts`: self-hosted Inter and JetBrains Mono (SIL OFL), so renders need no network
