import type { Caption } from "@remotion/captions";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { StatusChip } from "../components/StatusChip";
import { monoFamily } from "../fonts";
import { wordStartFrame } from "../lib/wordTiming";
import type { Pillar } from "../types/jarbou3iSchema";

// Fixed 3x2 grid inside the 72px side / 130px bottom safe area. Lanes between
// the cards and the margins carry the connectors and the feedback loop.
const CARD_W = 500;
const CARD_H = 300;
const COL_X = [132, 710, 1288];
const ROW_Y = [240, 630];
const cardBox = (i: number) => ({ x: COL_X[i % 3], y: ROW_Y[Math.floor(i / 3)] });

// Reading-order connectors: A→I→T, T↘N, N→R→F.
const EDGES = [
  "M632 390 L704 390",
  "M1210 390 L1282 390",
  "M1538 540 C1538 600 382 566 382 624",
  "M632 780 L704 780",
  "M1210 780 L1282 780",
];
// Feedback Loops → back to Actors, via the right and top lanes.
const LOOP = "M1788 780 L1806 780 Q1822 780 1822 764 L1822 224 Q1822 208 1806 208 L398 208 Q382 208 382 224 L382 234";

// The spoken word that lights each card.
const CUE_WORDS = ["actors", "interests", "tools", "narratives", "results", "feedback"];

export const PillarsGraphScene: React.FC<{ pillars: Pillar[]; captions: Caption[] }> = ({ pillars, captions }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const litFrames = CUE_WORDS.map((w, i) => wordStartFrame(captions, w, fps, Math.round((3 + i * 0.9) * fps)));
  const loopStart = litFrames[5] + 14;
  const loopProgress = interpolate(frame, [loopStart, loopStart + 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  return (
    <AbsoluteFill
      name="Pillars scene"
      style={{
        opacity: interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <Interactive.Div
        name="Pillars heading"
        style={{
          position: "absolute",
          top: 72,
          left: 72,
          right: 72,
          textAlign: "center",
          opacity: interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 800, color: "#F8FAFC", letterSpacing: -1, lineHeight: 1.1 }}>
          Six interlocking pillars
        </div>
        <div style={{ marginTop: 8, fontSize: 28, color: "#94A3B8" }}>
          Plain-English meaning · JSON key · epistemic status
        </div>
      </Interactive.Div>

      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#38BDF8" />
          </marker>
          <marker id="arrow-loop" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#F59E0B" />
          </marker>
        </defs>
        {EDGES.map((d, i) => {
          const target = litFrames[i + 1];
          const p = interpolate(frame, [target - 8, target + 4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <path
              key={d}
              d={d}
              pathLength={1}
              fill="none"
              stroke="#38BDF8"
              strokeWidth={3}
              strokeDasharray="1 1"
              strokeDashoffset={1 - p}
              markerEnd={p > 0.98 ? "url(#arrow)" : undefined}
              opacity={0.9}
            />
          );
        })}
        <path
          d={LOOP}
          pathLength={1}
          fill="none"
          stroke="#F59E0B"
          strokeWidth={3}
          strokeDasharray="1 1"
          strokeDashoffset={1 - loopProgress}
          markerEnd={loopProgress > 0.98 ? "url(#arrow-loop)" : undefined}
          opacity={0.55}
        />
        {/* Moving dashes show the loop cycling once it has closed. */}
        <path
          d={LOOP}
          pathLength={1}
          fill="none"
          stroke="#FCD34D"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="0.012 0.028"
          strokeDashoffset={-(frame - loopStart) * 0.004}
          opacity={interpolate(frame, [loopStart + 20, loopStart + 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </svg>

      <Interactive.Div
        name="Loop label"
        style={{
          position: "absolute",
          top: 192,
          left: 960,
          translate: "-50% 0px",
          padding: "4px 16px",
          borderRadius: 999,
          backgroundColor: "#090D16",
          border: "1px solid #F59E0B",
          fontFamily: monoFamily,
          fontSize: 20,
          color: "#F59E0B",
          opacity: interpolate(frame, [loopStart + 16, loopStart + 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        feedback ⟲ adapts actors
      </Interactive.Div>

      {pillars.map((pillar, i) => {
        const { x, y } = cardBox(i);
        const enter = spring({ frame: frame - i * 3, fps, config: { damping: 200 } });
        const lit = spring({ frame: frame - litFrames[i], fps, config: { damping: 14, stiffness: 160 } });
        const litClamped = Math.min(lit, 1);
        return (
          <div
            key={pillar.id}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: CARD_W,
              height: CARD_H,
              boxSizing: "border-box",
              padding: "24px 28px",
              borderRadius: 22,
              backgroundColor: "#0F172A",
              border: `2px solid ${interpolateColors(frame - litFrames[i], [0, 6, 36], ["#1E293B", "#38BDF8", "#334155"])}`,
              boxShadow: `0 0 ${36 * interpolate(frame - litFrames[i], [0, 6, 40], [0, 1, 0.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px #38BDF855`,
              display: "flex",
              flexDirection: "column",
              opacity: enter * (0.5 + 0.5 * litClamped),
              translate: `0px ${(1 - enter) * 40}px`,
              scale: String(0.96 + 0.04 * lit),
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontFamily: monoFamily, fontSize: 24, fontWeight: 700, color: "#38BDF8" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: 42, fontWeight: 800, color: "#F8FAFC", letterSpacing: -0.5 }}>{pillar.label}</span>
            </div>
            <div style={{ marginTop: 12, fontSize: 27, lineHeight: 1.32, color: "#CBD5E1" }}>{pillar.plainSummary}</div>
            <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: monoFamily,
                  fontSize: 20,
                  color: "#38BDF8",
                  backgroundColor: "#38BDF81A",
                  borderRadius: 8,
                  padding: "4px 10px",
                }}
              >
                "{pillar.jsonKey}"
              </span>
              <StatusChip status={pillar.status} fontSize={17} />
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
