import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserFrame } from "../components/BrowserFrame";
import { SceneShell } from "../components/SceneShell";
import { EpistemicChip } from "../components/StatusChip";
import { monoFamily } from "../fonts";
import { wordStartFrame } from "../lib/wordTiming";
import { EpistemicTypeSchema, type EpistemicType } from "../types/jarbou3iSchema";
import type { SceneProps } from "./types";

// Spoken types light up when named; the rest of the taxonomy stays visible.
const CUES: Partial<Record<EpistemicType, string>> = {
  verified_fact: "verified",
  institutional_claim: "institutional",
  plausible_inference: "plausible",
  speculation: "speculation",
};

// The publication gate of the Biopolitical v2.1 contract.
const GATE = [
  "Canonical contract",
  "Schema and integrity checks pass",
  "Every source verified and traceable",
  "Every relevant explanation assessed",
  "No open self-audit concern",
];

export const EvidenceScene: React.FC<SceneProps> = ({ video, captions }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const lit = (at: number) => Math.min(1, spring({ frame: frame - at, fps, config: { damping: 200 } }));
  const readinessAt = wordStartFrame(captions, "readiness", fps, 10 * fps);
  const gateAt = wordStartFrame(captions, "publication", fps, 12 * fps);
  const tierAt = wordStartFrame(captions, "tier", fps, 7 * fps);

  return (
    <SceneShell name="Evidence scene" eyebrow="03 · EVIDENCE DISCIPLINE" title="Every claim typed. Publication gated.">
      <div style={{ display: "flex", gap: 40, height: "100%" }}>
        <div style={{ width: 760, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: monoFamily, fontSize: 19, letterSpacing: 2, color: "#94A3B8" }}>10 EPISTEMIC TYPES</div>
          <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {EpistemicTypeSchema.options.map((t) => {
              const cue = CUES[t];
              const on = cue ? lit(wordStartFrame(captions, cue, fps, 2 * fps)) : 0;
              return (
                <span key={t} style={{ scale: String(1 + 0.06 * on), opacity: 0.45 + 0.55 * Math.max(on, cue ? 0 : 0.2) }}>
                  <EpistemicChip type={t} fontSize={19} dim={!cue || on < 0.5} />
                </span>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 26,
              boxSizing: "border-box",
              padding: "20px 24px",
              borderRadius: 18,
              backgroundColor: "#0F172A",
              border: "1px solid #1E293B",
              opacity: 0.4 + 0.6 * lit(gateAt),
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: "#F8FAFC" }}>Publication requires</span>
              <span style={{ fontFamily: monoFamily, fontSize: 17, color: "#94A3B8" }}>score can't override</span>
            </div>
            {GATE.map((g, i) => {
              const on = lit(gateAt + 6 + i * 6);
              return (
                <div
                  key={g}
                  style={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontSize: 23,
                    color: "#E2E8F0",
                    opacity: 0.35 + 0.65 * on,
                    translate: `${(1 - on) * -12}px 0px`,
                  }}
                >
                  <span style={{ fontFamily: monoFamily, color: "#38BDF8" }}>🔒</span>
                  {g}
                </div>
              );
            })}
            <div
              style={{
                marginTop: 18,
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: 10,
                border: "1px solid #F59E0B",
                backgroundColor: "#F59E0B1F",
                fontFamily: monoFamily,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 1,
                color: "#F59E0B",
                opacity: lit(gateAt + 40),
              }}
            >
              ▲ BUNDLED SAMPLE: REVIEW NEEDED
            </div>
          </div>
        </div>

        <BrowserFrame
          url={video.siteUrl}
          width={976}
          height={593}
          endFrame={durationInFrames}
          shots={[
            { src: "10-review-evidence.jpg", at: 0, from: { x: 1190, y: 300, zoom: 1.45 }, to: { x: 1190, y: 340, zoom: 1.6 } },
            { src: "10-review-evidence.jpg", at: tierAt, from: { x: 1060, y: 270, zoom: 1.85 }, to: { x: 1060, y: 300, zoom: 1.95 } },
            { src: "07-review-overview.jpg", at: readinessAt, from: { x: 1560, y: 340, zoom: 2.0 }, to: { x: 1560, y: 340, zoom: 2.15 } },
            { src: "07-review-overview.jpg", at: gateAt, from: { x: 1500, y: 200, zoom: 2.0 }, to: { x: 1450, y: 260, zoom: 1.6 } },
          ]}
        />
      </div>
    </SceneShell>
  );
};
