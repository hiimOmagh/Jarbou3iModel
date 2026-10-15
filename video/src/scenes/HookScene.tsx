import type { Caption } from "@remotion/captions";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { StatusChip } from "../components/StatusChip";
import { GitHubMark } from "../components/GitHubMark";
import { monoFamily } from "../fonts";
import { wordStartFrame } from "../lib/wordTiming";
import { STATUS_COLORS, type Pillar } from "../types/jarbou3iSchema";

type Props = {
  repoName: string;
  version: string;
  tagline: string;
  rawHeadline: string;
  fact: Pillar;
  inference: Pillar;
  captions: Caption[];
};

// One of the two cards that emerge from the gate. Its clock starts when the
// matching word ("verified" / "structural") is spoken.
const SplitCard: React.FC<{ pillar: Pillar; side: "left" | "right"; note: string }> = ({ pillar, side, note }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = STATUS_COLORS[pillar.status];
  return (
    <div
      style={{
        width: 600,
        height: 214,
        boxSizing: "border-box",
        padding: "26px 30px",
        borderRadius: 22,
        backgroundColor: "#0F172A",
        border: `2px solid ${color}`,
        boxShadow: `0 0 ${interpolate(frame, [0, 1 * fps], [0, 48], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px ${color}66`,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [0, 0.8 * fps], [side === "left" ? "300px -110px" : "-300px -110px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
        }),
        scale: interpolate(frame, [0, 0.8 * fps], [0.7, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
        }),
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StatusChip status={pillar.status} fontSize={22} brackets />
        <span style={{ fontFamily: monoFamily, fontSize: 20, color: "#94A3B8" }}>
          {pillar.jsonKey} · {pillar.recordId}
        </span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: "#F8FAFC", lineHeight: 1.2 }}>{pillar.sampleValue}</div>
      <div style={{ fontSize: 24, color: "#94A3B8" }}>{note}</div>
    </div>
  );
};

export const HookScene: React.FC<Props> = ({ repoName, version, tagline, rawHeadline, fact, inference, captions }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const gateFrame = wordStartFrame(captions, "separates", fps, Math.round(4 * fps));
  const factFrame = wordStartFrame(captions, "verified", fps, Math.round(5 * fps));
  const inferenceFrame = wordStartFrame(captions, "structural", fps, Math.round(6.5 * fps));

  return (
    <AbsoluteFill
      name="Hook scene"
      style={{
        padding: "72px 72px 130px",
        flexDirection: "column",
        alignItems: "center",
        opacity: interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <Interactive.Div
        name="Repo badge"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          height: 56,
          padding: "0 22px",
          borderRadius: 999,
          backgroundColor: "#0F172A",
          border: "1px solid #334155",
          fontFamily: monoFamily,
          fontSize: 24,
          color: "#E2E8F0",
          opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <GitHubMark size={28} />
        {repoName}
        <span style={{ color: "#38BDF8", fontSize: 20 }}>{version}</span>
      </Interactive.Div>

      <Interactive.Div
        name="Title"
        style={{
          marginTop: 26,
          fontSize: 104,
          fontWeight: 800,
          letterSpacing: -2,
          color: "#F8FAFC",
          lineHeight: 1.1,
          opacity: interpolate(frame, [4, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [4, 22], ["0px 24px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 200 }),
          }),
        }}
      >
        The Jarbou3i Model
      </Interactive.Div>
      <Interactive.Div
        name="Tagline"
        style={{
          marginTop: 8,
          fontSize: 38,
          color: "#94A3B8",
          opacity: interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        {tagline}
      </Interactive.Div>

      <Interactive.Div
        name="Raw headline card"
        style={{
          marginTop: 44,
          width: 1260,
          boxSizing: "border-box",
          padding: "24px 36px",
          borderRadius: 22,
          backgroundColor: "#111827",
          border: "1px solid #475569",
          opacity: interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [18, 36], ["0px 30px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 200 }),
          }),
        }}
      >
        <div style={{ fontFamily: monoFamily, fontSize: 20, letterSpacing: 2, color: "#94A3B8" }}>
          RAW INSTITUTIONAL CLAIM
        </div>
        <div style={{ marginTop: 10, fontSize: 38, fontWeight: 600, color: "#F8FAFC", lineHeight: 1.3 }}>
          “{rawHeadline}”
        </div>
      </Interactive.Div>

      {/* The gate: a scanning line that the claim is split through. */}
      <div style={{ marginTop: 32, width: 1260, height: 40, position: "relative" }}>
        <Sequence name="Epistemic gate" from={gateFrame} layout="none">
          <EpistemicGate />
        </Sequence>
      </div>

      <div style={{ marginTop: 30, width: 1260, height: 214, display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: 600, height: 214 }}>
          <Sequence name="Verified fact card" from={factFrame} layout="none">
            <SplitCard pillar={fact} side="left" note="Backed by a primary record" />
          </Sequence>
        </div>
        <div style={{ width: 600, height: 214 }}>
          <Sequence name="Structural inference card" from={inferenceFrame} layout="none">
            <SplitCard pillar={inference} side="right" note="Inferred from structure, never stated" />
          </Sequence>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EpistemicGate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Interactive.Div
        name="Gate line"
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 0.6 * fps], [630, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          right: interpolate(frame, [0, 0.6 * fps], [630, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          top: 19,
          height: 3,
          borderRadius: 2,
          background: "linear-gradient(90deg, #10B981 0%, #38BDF8 50%, #F59E0B 100%)",
          boxShadow: "0 0 18px #38BDF8AA",
        }}
      />
      <Interactive.Div
        name="Gate label"
        style={{
          position: "relative",
          padding: "6px 22px",
          borderRadius: 999,
          backgroundColor: "#090D16",
          border: "1px solid #38BDF8",
          fontFamily: monoFamily,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 3,
          color: "#38BDF8",
          opacity: interpolate(frame, [4, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        EPISTEMIC GATE
      </Interactive.Div>
    </AbsoluteFill>
  );
};
