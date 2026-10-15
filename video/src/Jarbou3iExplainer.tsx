import { Audio } from "@remotion/media";
import { AbsoluteFill, Interactive, Series, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { WordCaptions } from "./components/WordCaptions";
import { fontFamily } from "./fonts";
import { HookScene } from "./scenes/HookScene";
import { PillarsGraphScene } from "./scenes/PillarsGraphScene";
import { QuickstartScene } from "./scenes/QuickstartScene";
import { SplitDemoScene } from "./scenes/SplitDemoScene";
import type { Jarbou3iVideoProps } from "./types/jarbou3iSchema";

export const Jarbou3iExplainer: React.FC<Jarbou3iVideoProps> = ({
  repoName,
  version,
  tagline,
  caseStudyTitle,
  rawHeadline,
  pillars,
  scenes,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fact = pillars.find((p) => p.status === "VERIFIED_FACT") ?? pillars[0];
  const inference = pillars.find((p) => p.status === "STRUCTURAL_INFERENCE") ?? pillars[1];

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
        <Series.Sequence name="Hook" durationInFrames={scenes.hook.durationInFrames}>
          <HookScene
            repoName={repoName}
            version={version}
            tagline={tagline}
            rawHeadline={rawHeadline}
            fact={fact}
            inference={inference}
            captions={scenes.hook.captions}
          />
          <Audio src={staticFile(scenes.hook.audioFile)} />
          <WordCaptions captions={scenes.hook.captions} />
        </Series.Sequence>
        <Series.Sequence name="Pillars" durationInFrames={scenes.pillars.durationInFrames}>
          <PillarsGraphScene pillars={pillars} captions={scenes.pillars.captions} />
          <Audio src={staticFile(scenes.pillars.audioFile)} />
          <WordCaptions captions={scenes.pillars.captions} />
        </Series.Sequence>
        <Series.Sequence name="Demo" durationInFrames={scenes.demo.durationInFrames}>
          <SplitDemoScene pillars={pillars} caseStudyTitle={caseStudyTitle} rawHeadline={rawHeadline} />
          <Audio src={staticFile(scenes.demo.audioFile)} />
          <WordCaptions captions={scenes.demo.captions} />
        </Series.Sequence>
        <Series.Sequence name="Quickstart" durationInFrames={scenes.quickstart.durationInFrames}>
          <QuickstartScene repoName={repoName} captions={scenes.quickstart.captions} />
          <Audio src={staticFile(scenes.quickstart.audioFile)} />
          <WordCaptions captions={scenes.quickstart.captions} />
        </Series.Sequence>
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
