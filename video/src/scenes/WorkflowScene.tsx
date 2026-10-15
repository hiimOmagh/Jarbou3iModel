import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserFrame } from "../components/BrowserFrame";
import { SceneShell } from "../components/SceneShell";
import { monoFamily } from "../fonts";
import { wordStartFrame } from "../lib/wordTiming";
import type { SceneProps } from "./types";

const STEPS = [
  { label: "Topic", hint: "One clear question, place and period" },
  { label: "Lens", hint: "Strategic or Biopolitical" },
  { label: "Settings", hint: "Depth, source access, output language" },
  { label: "Prompt", hint: "Copy it into any AI assistant" },
  { label: "Answer", hint: "Paste the JSON back to import" },
];

const SAFEGUARDS = [
  { cue: "repaired", text: "Format slips repaired, every fix listed" },
  { cue: "missing", text: "Cut-off or missing parts → targeted prompt" },
  { cue: "invented", text: "Nothing is ever invented" },
];

export const WorkflowScene: React.FC<SceneProps> = ({ video, captions }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const stepAt = [
    0,
    wordStartFrame(captions, "lens", fps, 2 * fps),
    wordStartFrame(captions, "precise", fps, 3 * fps),
    wordStartFrame(captions, "prompt", fps, 4 * fps),
    wordStartFrame(captions, "paste", fps, 7 * fps),
  ];
  const active = stepAt.reduce((acc, at, i) => (frame >= at ? i : acc), 0);

  return (
    <SceneShell name="Workflow scene" eyebrow="01 · HOW IT WORKS" title="Works with the AI assistant you already use">
      <div style={{ display: "flex", gap: 48, height: "100%" }}>
        <div style={{ width: 560, display: "flex", flexDirection: "column", gap: 10 }}>
          {STEPS.map((step, i) => {
            const state = i < active ? "done" : i === active ? "active" : "next";
            return (
              <div
                key={step.label}
                style={{
                  height: 74,
                  boxSizing: "border-box",
                  padding: "0 20px",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  backgroundColor: state === "active" ? "#38BDF81A" : "#0F172A",
                  border: `2px solid ${state === "active" ? "#38BDF8" : "#1E293B"}`,
                  opacity: state === "next" ? 0.5 : 1,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    flexShrink: 0,
                    borderRadius: 21,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: monoFamily,
                    fontSize: 20,
                    fontWeight: 700,
                    color: state === "next" ? "#94A3B8" : "#090D16",
                    backgroundColor: state === "done" ? "#10B981" : state === "active" ? "#38BDF8" : "#1E293B",
                  }}
                >
                  {state === "done" ? "✓" : i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#F8FAFC" }}>{step.label}</div>
                  <div style={{ fontSize: 20, color: "#94A3B8" }}>{step.hint}</div>
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            {SAFEGUARDS.map((s, i) => {
              const at = wordStartFrame(captions, s.cue, fps, (10 + i * 2) * fps);
              const enter = spring({ frame: frame - at, fps, config: { damping: 200 } });
              const isLast = i === SAFEGUARDS.length - 1;
              return (
                <div
                  key={s.cue}
                  style={{
                    height: 52,
                    boxSizing: "border-box",
                    padding: "0 18px",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 23,
                    fontWeight: 600,
                    color: isLast ? "#10B981" : "#E2E8F0",
                    backgroundColor: isLast ? "#10B9811A" : "#111827",
                    border: `1px solid ${isLast ? "#10B981" : "#334155"}`,
                    opacity: enter,
                    translate: `${(1 - enter) * -30}px 0px`,
                  }}
                >
                  <span style={{ color: isLast ? "#10B981" : "#38BDF8" }}>{isLast ? "✓" : "↻"}</span>
                  {s.text}
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            opacity: interpolate(frame, [4, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            translate: interpolate(frame, [4, 22], ["40px 0px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 200 }),
            }),
          }}
        >
          <BrowserFrame
            url={video.siteUrl}
            width={1168}
            height={701}
            endFrame={durationInFrames}
            shots={[
              { src: "02-topic.jpg", at: 0, from: { x: 1180, y: 560, zoom: 1.25 }, to: { x: 1180, y: 520, zoom: 1.35 } },
              { src: "03-lens.jpg", at: stepAt[1], from: { x: 1180, y: 600, zoom: 1.3 }, to: { x: 1300, y: 600, zoom: 1.45 } },
              { src: "05-prompt.jpg", at: stepAt[3], from: { x: 1140, y: 500, zoom: 1.25 }, to: { x: 1000, y: 520, zoom: 1.4 } },
              { src: "07-review-overview.jpg", at: stepAt[4], from: { x: 1140, y: 330, zoom: 1.3 }, to: { x: 1150, y: 320, zoom: 1.42 } },
            ]}
          />
        </div>
      </div>
    </SceneShell>
  );
};
