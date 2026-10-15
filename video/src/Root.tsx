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
      scenes = {
        hook: { audioFile: manifest.scenes.hook.audioFile, durationInFrames: manifest.scenes.hook.durationInFrames, captions: manifest.scenes.hook.captions },
        pillars: { audioFile: manifest.scenes.pillars.audioFile, durationInFrames: manifest.scenes.pillars.durationInFrames, captions: manifest.scenes.pillars.captions },
        demo: { audioFile: manifest.scenes.demo.audioFile, durationInFrames: manifest.scenes.demo.durationInFrames, captions: manifest.scenes.demo.captions },
        quickstart: { audioFile: manifest.scenes.quickstart.audioFile, durationInFrames: manifest.scenes.quickstart.durationInFrames, captions: manifest.scenes.quickstart.captions },
      };
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
      durationInFrames={1200}
      defaultProps={{
        repoName: "hiimOmagh/Jarbou3i_Model",
        version: "v2.1.0-alpha.56",
        tagline: "Separate verified facts from structural inferences.",
        caseStudyTitle: "Illustrative case: digitizing a national food subsidy",
        rawHeadline: "Ministry: the new digital subsidy card will cut fraud by 40% and reach every family in need.",
        pillars: [
          {
            id: "actors",
            label: "Actors",
            question: "Who can act, block or decide?",
            plainSummary: "The people and institutions with the power to act, block or decide.",
            jsonKey: "actors",
            recordId: "A1",
            sampleValue: "Ministry, card contractor, 2.1M households",
            status: "VERIFIED_FACT",
          },
          {
            id: "interests",
            label: "Interests",
            question: "What does each side want?",
            plainSummary: "What each side stands to gain or lose, stated or hidden.",
            jsonKey: "interests",
            recordId: "I1",
            sampleValue: "Cut the subsidy bill before budget review",
            status: "STRUCTURAL_INFERENCE",
          },
          {
            id: "tools",
            label: "Tools",
            question: "How do they make it happen?",
            plainSummary: "The laws, money, technology and pressure used to get results.",
            jsonKey: "tools",
            recordId: "T1",
            sampleValue: "Biometric card + eligibility formula",
            status: "VERIFIED_FACT",
          },
          {
            id: "narratives",
            label: "Narratives",
            question: "What story are we being told?",
            plainSummary: "The public story used to justify the action and win consent.",
            jsonKey: "narrative",
            recordId: "N1",
            sampleValue: "Card will cut fraud by 40%",
            status: "UNVERIFIED_CLAIM",
          },
          {
            id: "results",
            label: "Results",
            question: "What actually happened?",
            plainSummary: "What really changed on the ground, for whom, at what cost.",
            jsonKey: "results",
            recordId: "R1",
            sampleValue: "1 in 11 eligible homes failed enrolment",
            status: "VERIFIED_FACT",
          },
          {
            id: "feedback_loops",
            label: "Feedback Loops",
            question: "How does the system adapt?",
            plainSummary: "How outcomes push the actors to adapt, and the cycle restarts.",
            jsonKey: "feedback",
            recordId: "F1",
            sampleValue: "Complaints force new municipal appeal desks",
            status: "STRUCTURAL_INFERENCE",
          },
        ],
        scenes: {
          hook: { audioFile: "tts/scene-hook.mp3", durationInFrames: 300, captions: [] },
          pillars: { audioFile: "tts/scene-pillars.mp3", durationInFrames: 300, captions: [] },
          demo: { audioFile: "tts/scene-demo.mp3", durationInFrames: 300, captions: [] },
          quickstart: { audioFile: "tts/scene-quickstart.mp3", durationInFrames: 300, captions: [] },
        },
      }}
    />
  );
};
