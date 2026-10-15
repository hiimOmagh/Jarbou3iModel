import {
  AbsoluteFill,
  Easing,
  Interactive,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EpistemicChip } from "../components/StatusChip";
import { monoFamily } from "../fonts";
import { wordStartFrame } from "../lib/wordTiming";
import { EPISTEMIC_COLORS, type Claim } from "../types/jarbou3iSchema";
import type { SceneProps } from "./types";

const CARD_W = 400;
const CARD_H = 214;

// A claim card emerging from the gate. Its clock starts at its cue word.
const ClaimCard: React.FC<{ claim: Claim; slot: number }> = ({ claim, slot }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = EPISTEMIC_COLORS[claim.type];
  const dx = [430, 0, -430][slot];
  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
        boxSizing: "border-box",
        padding: "22px 26px",
        borderRadius: 22,
        backgroundColor: "#0F172A",
        border: `2px solid ${color}`,
        boxShadow: `0 0 ${interpolate(frame, [0, 1 * fps], [0, 44], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px ${color}66`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        translate: interpolate(frame, [0, 0.8 * fps], [`${dx}px -110px`, "0px 0px"], {
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
      <div>
        <EpistemicChip type={claim.type} fontSize={19} brackets />
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: "#F8FAFC", lineHeight: 1.22 }}>{claim.text}</div>
      <div style={{ marginTop: "auto", fontSize: 21, color: "#94A3B8" }}>{claim.note}</div>
    </div>
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
          top: 19,
          height: 3,
          borderRadius: 2,
          background: "linear-gradient(90deg, #10B981 0%, #F87171 50%, #F59E0B 100%)",
          boxShadow: "0 0 18px #38BDF8AA",
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

const BlockedChip: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="Publication blocked chip"
      style={{
        position: "absolute",
        top: 20,
        right: 26,
        padding: "6px 14px",
        borderRadius: 10,
        border: "1px solid #F87171",
        backgroundColor: "#F871711F",
        fontFamily: monoFamily,
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: 1.5,
        color: "#F87171",
        opacity: interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        scale: interpolate(frame, [0, 10], [1.25, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 12 }),
        }),
      }}
    >
      PUBLICATION GATE · BLOCKED
    </Interactive.Div>
  );
};

export const HookScene: React.FC<SceneProps> = ({ video, captions }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const gateAt = wordStartFrame(captions, "separates", fps, Math.round(9 * fps));
  const cardAt = [
    wordStartFrame(captions, "verified", fps, Math.round(10 * fps)),
    wordStartFrame(captions, "institutional", fps, Math.round(11 * fps)),
    wordStartFrame(captions, "plausible", fps, Math.round(12 * fps)),
  ];
  const blockedAt = wordStartFrame(captions, "blocked", fps, Math.round(15 * fps));

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
        name="Site badge"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          height: 56,
          padding: "0 24px",
          borderRadius: 999,
          backgroundColor: "#0F172A",
          border: "1px solid #334155",
          fontFamily: monoFamily,
          fontSize: 24,
          color: "#E2E8F0",
          opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ color: "#38BDF8" }}>●</span>
        {video.siteUrl}
      </Interactive.Div>

      <Interactive.Div
        name="Title"
        style={{
          marginTop: 24,
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
          fontSize: 36,
          color: "#94A3B8",
          opacity: interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        {video.tagline}
      </Interactive.Div>

      <Interactive.Div
        name="Raw claim card"
        style={{
          position: "relative",
          marginTop: 40,
          width: 1260,
          boxSizing: "border-box",
          padding: "22px 36px",
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
        <div style={{ fontFamily: monoFamily, fontSize: 20, letterSpacing: 2, color: "#94A3B8" }}>RAW CLAIM</div>
        <div style={{ marginTop: 10, fontSize: 36, fontWeight: 600, color: "#F8FAFC", lineHeight: 1.3 }}>
          “{video.rawHeadline}”
        </div>
        <Sequence name="Blocked chip" from={blockedAt} layout="none">
          <BlockedChip />
        </Sequence>
      </Interactive.Div>

      <div style={{ marginTop: 30, width: 1260, height: 40, position: "relative" }}>
        <Sequence name="Epistemic gate" from={gateAt} layout="none">
          <EpistemicGate />
        </Sequence>
      </div>

      <div style={{ marginTop: 28, width: 1260, height: CARD_H, display: "flex", justifyContent: "space-between" }}>
        {video.claims.map((claim, i) => (
          <div key={claim.type + i} style={{ width: CARD_W, height: CARD_H }}>
            <Sequence name={`Claim card ${i + 1}`} from={cardAt[i]} layout="none">
              <ClaimCard claim={claim} slot={i} />
            </Sequence>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
