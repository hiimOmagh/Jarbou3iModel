import { useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserFrame } from "../components/BrowserFrame";
import { SceneShell } from "../components/SceneShell";
import { wordStartFrame } from "../lib/wordTiming";
import type { SceneProps } from "./types";

const TABS = [
  { label: "Overview", cue: "matters", shot: "07-review-overview.jpg", focus: { x: 1140, y: 420, zoom: 1.2 } },
  { label: "Protocol", cue: "protocol", shot: "08-review-pillars.jpg", focus: { x: 1150, y: 480, zoom: 1.15 } },
  { label: "Connections", cue: "connections", shot: "09-review-connections.jpg", focus: { x: 1150, y: 520, zoom: 1.15 } },
  { label: "Evidence test", cue: "evidence", shot: "10-review-evidence.jpg", focus: { x: 1190, y: 440, zoom: 1.2 } },
  { label: "Judgment", cue: "judgment", shot: "11-review-conclusion.jpg", focus: { x: 1150, y: 520, zoom: 1.15 } },
];

export const ReviewScene: React.FC<SceneProps> = ({ video, captions }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const at = TABS.map((t, i) => (i === 0 ? 0 : wordStartFrame(captions, t.cue, fps, i * 2.5 * fps)));
  const active = at.reduce((acc, a, i) => (frame >= a ? i : acc), 0);

  return (
    <SceneShell name="Review scene" eyebrow="04 · IN-DEPTH REVIEW" title="From first finding to full audit trail">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, height: "100%" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {TABS.map((t, i) => (
            <div
              key={t.label}
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                fontSize: 24,
                fontWeight: 700,
                color: i === active ? "#090D16" : i < active ? "#E2E8F0" : "#64748B",
                backgroundColor: i === active ? "#38BDF8" : "#0F172A",
                border: `1px solid ${i === active ? "#38BDF8" : "#1E293B"}`,
              }}
            >
              {t.label}
            </div>
          ))}
        </div>
        <BrowserFrame
          url={video.siteUrl}
          width={1440}
          height={640}
          endFrame={durationInFrames}
          shots={TABS.map((t, i) => ({
            src: t.shot,
            at: at[i],
            from: t.focus,
            to: { ...t.focus, y: t.focus.y + 40, zoom: t.focus.zoom * 1.06 },
          }))}
        />
      </div>
    </SceneShell>
  );
};
