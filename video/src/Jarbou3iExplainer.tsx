import { Audio } from "@remotion/media";
import { AbsoluteFill, Interactive, Series, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { WordCaptions } from "./components/WordCaptions";
import { fontFamily } from "./fonts";
import { CtaScene } from "./scenes/CtaScene";
import { EvidenceScene } from "./scenes/EvidenceScene";
import { HookScene } from "./scenes/HookScene";
import { LensesScene } from "./scenes/LensesScene";
import { ReviewScene } from "./scenes/ReviewScene";
import type { SceneProps } from "./scenes/types";
import { WorkflowScene } from "./scenes/WorkflowScene";
import { WorkspaceScene } from "./scenes/WorkspaceScene";
import { SCENE_ORDER, type Jarbou3iVideoProps, type SceneId } from "./types/jarbou3iSchema";

const SCENES: Record<SceneId, { name: string; Component: React.FC<SceneProps> }> = {
  hook: { name: "Hook", Component: HookScene },
  workflow: { name: "How it works", Component: WorkflowScene },
  lenses: { name: "Two lenses", Component: LensesScene },
  evidence: { name: "Evidence discipline", Component: EvidenceScene },
  review: { name: "In-depth review", Component: ReviewScene },
  workspace: { name: "Local-first", Component: WorkspaceScene },
  cta: { name: "Call to action", Component: CtaScene },
};

export const Jarbou3iExplainer: React.FC<Jarbou3iVideoProps> = (video) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#090D16",
        backgroundImage:
          "radial-gradient(ellipse at 50% -10%, rgba(56,189,248,0.14) 0%, rgba(9,13,22,0) 55%), linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        fontFamily,
        color: "#F8FAFC",
      }}
    >
      <Series>
        {SCENE_ORDER.map((id) => {
          const { name, Component } = SCENES[id];
          const scene = video.scenes[id];
          return (
            <Series.Sequence key={id} name={name} durationInFrames={scene.durationInFrames}>
              <Component video={video} captions={scene.captions} />
              <Audio src={staticFile(scene.audioFile)} />
              <WordCaptions captions={scene.captions} />
            </Series.Sequence>
          );
        })}
      </Series>

      <Interactive.Div
        name="Progress bar"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 8,
          backgroundColor: "#38BDF8",
          width: interpolate(frame, [0, durationInFrames - 1], [0, 1920], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
