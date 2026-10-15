import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { monoFamily } from "../fonts";
import { wordStartFrame } from "../lib/wordTiming";
import type { SceneProps } from "./types";

// Strategic v1.1: the six causal layers in contract order, lit by spoken cue.
const CHAIN = [
  { label: "Interests", cue: "interests" },
  { label: "Actors", cue: "actors" },
  { label: "Tools", cue: "tools" },
  { label: "Narrative", cue: "narratives" },
  { label: "Results", cue: "outcomes" },
  { label: "Feedback", cue: "feedback" },
];
const TESTS = ["Contradictions", "Scenarios", "Evidence", "Assumptions"];

// Biopolitical Training Map v2.1: the nine review pillars.
const PILLARS = [
  "Question & context",
  "Human functions",
  "Actors & populations",
  "Mechanisms & infrastructure",
  "Meaning & classification",
  "Intervention & capture test",
  "Distribution & effects",
  "Evidence & explanations",
  "Agency & alternatives",
];
const COUNTS = [
  { n: "13", label: "capture criteria", cue: "thirteen" },
  { n: "9", label: "rival explanations", cue: "rival" },
  { n: "5", label: "capture levels", cue: "rival" },
  { n: "18", label: "point self-audit", cue: "eighteen-point" },
];

const Panel: React.FC<{ accent: string; tag: string; lede: string; width: number; children: React.ReactNode }> = ({
  accent,
  tag,
  lede,
  width,
  children,
}) => (
  <div
    style={{
      width,
      height: "100%",
      boxSizing: "border-box",
      padding: "26px 30px",
      borderRadius: 24,
      backgroundColor: "#0F172A",
      border: "1px solid #1E293B",
      borderTop: `4px solid ${accent}`,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div style={{ fontFamily: monoFamily, fontSize: 20, fontWeight: 700, letterSpacing: 2, color: accent }}>{tag}</div>
    <div style={{ marginTop: 8, fontSize: 30, fontWeight: 700, color: "#F8FAFC", lineHeight: 1.25 }}>{lede}</div>
    <div style={{ marginTop: 24, flex: 1, minHeight: 0 }}>{children}</div>
  </div>
);

export const LensesScene: React.FC<SceneProps> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lit = (at: number) => Math.min(1, spring({ frame: frame - at, fps, config: { damping: 200 } }));
  const stratAt = wordStartFrame(captions, "strategic", fps, 2 * fps);
  const bioAt = wordStartFrame(captions, "biopolitical", fps, 11 * fps);
  const testsAt = wordStartFrame(captions, "contradictions", fps, 8 * fps);
  const pillarsAt = wordStartFrame(captions, "pillars", fps, 16 * fps);

  return (
    <SceneShell name="Lenses scene" eyebrow="02 · TWO LENSES" title="Two lenses, two rigorous methods">
      <div style={{ display: "flex", gap: 40, height: "100%" }}>
        <div style={{ opacity: 0.35 + 0.65 * lit(stratAt) }}>
          <Panel accent="#38BDF8" tag="STRATEGIC · v1.1" lede="Follows interests to results." width={720}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "34px 34px" }}>
              {CHAIN.map((node, i) => {
                const on = lit(wordStartFrame(captions, node.cue, fps, stratAt + i * 12));
                return (
                  <div
                    key={node.label}
                    style={{
                      position: "relative",
                      height: 86,
                      borderRadius: 14,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "0 16px",
                      backgroundColor: on > 0.5 ? "#38BDF81F" : "#111827",
                      border: `2px solid ${on > 0.5 ? "#38BDF8" : "#1E293B"}`,
                      opacity: 0.4 + 0.6 * on,
                      scale: String(0.94 + 0.06 * on),
                    }}
                  >
                    <span style={{ fontFamily: monoFamily, fontSize: 17, color: "#38BDF8" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 27, fontWeight: 800, color: "#F8FAFC" }}>{node.label}</span>
                    {i % 3 !== 2 ? (
                      <span style={{ position: "absolute", right: -30, top: 26, fontSize: 26, color: "#38BDF8" }}>→</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 34, fontSize: 22, color: "#94A3B8", opacity: lit(testsAt) }}>Tested against</div>
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {TESTS.map((t, i) => {
                const on = lit(testsAt + i * 5);
                return (
                  <div
                    key={t}
                    style={{
                      height: 54,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      padding: "0 18px",
                      fontSize: 23,
                      fontWeight: 700,
                      color: "#E2E8F0",
                      backgroundColor: "#111827",
                      border: "1px solid #334155",
                      opacity: on,
                      translate: `0px ${(1 - on) * 16}px`,
                    }}
                  >
                    {t}
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        <div style={{ opacity: 0.35 + 0.65 * lit(bioAt) }}>
          <Panel accent="#F59E0B" tag="BIOPOLITICAL TRAINING MAP · v2.1" lede="Traces how bodies, data and classifications become governed." width={1016}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {PILLARS.map((p, i) => {
                const on = lit(bioAt + 8 + i * 4);
                const glow = frame >= pillarsAt && frame < pillarsAt + 24;
                return (
                  <div
                    key={p}
                    style={{
                      height: 84,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "0 16px",
                      backgroundColor: glow ? "#F59E0B1F" : "#111827",
                      border: `1px solid ${glow ? "#F59E0B" : "#334155"}`,
                      opacity: on,
                      scale: String(0.92 + 0.08 * on),
                    }}
                  >
                    <span style={{ fontFamily: monoFamily, fontSize: 18, fontWeight: 700, color: "#F59E0B" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: 22, fontWeight: 700, color: "#F8FAFC", lineHeight: 1.2 }}>{p}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {COUNTS.map((c) => {
                const on = lit(wordStartFrame(captions, c.cue, fps, bioAt + 3 * fps));
                return (
                  <div
                    key={c.label}
                    style={{
                      height: 118,
                      borderRadius: 14,
                      boxSizing: "border-box",
                      padding: "14px 18px",
                      backgroundColor: "#F59E0B14",
                      border: "1px solid #F59E0B80",
                      opacity: on,
                      scale: String(0.85 + 0.15 * on),
                    }}
                  >
                    <div style={{ fontFamily: monoFamily, fontSize: 48, fontWeight: 700, color: "#F59E0B", lineHeight: 1 }}>{c.n}</div>
                    <div style={{ marginTop: 8, fontSize: 21, color: "#E2E8F0" }}>{c.label}</div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>
    </SceneShell>
  );
};
