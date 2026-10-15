import { Composition, staticFile, type CalculateMetadataFunction } from "remotion";
import { Jarbou3iExplainer } from "./Jarbou3iExplainer";
import {
  Jarbou3iVideoSchema,
  SCENE_ORDER,
  TtsManifestSchema,
  type Jarbou3iVideoProps,
} from "./types/jarbou3iSchema";

// Audio length drives everything: each scene takes its voiceover duration
// (+0.6s breathing buffer) and captions from public/tts/manifest.json, which
// `npx tsx scripts/generate-tts.ts` writes. Without a manifest, the props'
// own scene data is used as-is.
const calculateMetadata: CalculateMetadataFunction<Jarbou3iVideoProps> = async ({ props, abortSignal }) => {
  let scenes = props.scenes;
  try {
    const response = await fetch(staticFile("tts/manifest.json"), { signal: abortSignal, cache: "no-store" });
    if (response.ok) {
      const manifest = TtsManifestSchema.parse(await response.json());
      scenes = Object.fromEntries(
        SCENE_ORDER.map((id) => {
          const { audioFile, durationInFrames, captions } = manifest.scenes[id];
          return [id, { audioFile, durationInFrames, captions }];
        }),
      ) as Jarbou3iVideoProps["scenes"];
    }
  } catch (error) {
    if (abortSignal.aborted) throw error;
    console.warn("tts/manifest.json unavailable; using scene data from props.", error);
  }

  return {
    durationInFrames: SCENE_ORDER.reduce((sum, id) => sum + scenes[id].durationInFrames, 0),
    props: { ...props, scenes },
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Jarbou3iExplainer"
      component={Jarbou3iExplainer}
      schema={Jarbou3iVideoSchema}
      calculateMetadata={calculateMetadata}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={2100}
      defaultProps={{
        siteUrl: "jarbou3i-model.pages.dev",
        tagline: "Evidence-disciplined analysis with the AI assistant you already use.",
        rawHeadline: "Ministry: the new digital subsidy card will cut fraud by 40% and reach every family in need.",
        claims: [
          { type: "verified_fact", text: "Ministry, card contractor, 2.1M households", note: "Traceable to a verified source" },
          { type: "institutional_claim", text: "Card will cut fraud by 40%", note: "Asserted by an institution, not shown" },
          { type: "plausible_inference", text: "Cut the subsidy bill before budget review", note: "Inferred from structure, never stated" },
        ],
        scenes: {
          hook: { audioFile: "tts/scene-hook.mp3", durationInFrames: 300, captions: [] },
          workflow: { audioFile: "tts/scene-workflow.mp3", durationInFrames: 300, captions: [] },
          lenses: { audioFile: "tts/scene-lenses.mp3", durationInFrames: 300, captions: [] },
          evidence: { audioFile: "tts/scene-evidence.mp3", durationInFrames: 300, captions: [] },
          review: { audioFile: "tts/scene-review.mp3", durationInFrames: 300, captions: [] },
          workspace: { audioFile: "tts/scene-workspace.mp3", durationInFrames: 300, captions: [] },
          cta: { audioFile: "tts/scene-cta.mp3", durationInFrames: 300, captions: [] },
        },
      }}
    />
  );
};
