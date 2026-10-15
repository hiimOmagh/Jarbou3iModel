import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserFrame } from "../components/BrowserFrame";
import { SceneShell } from "../components/SceneShell";
import { monoFamily } from "../fonts";
import { wordStartFrame } from "../lib/wordTiming";
import type { SceneProps } from "./types";

const PRIVACY = [
  { label: "No account", cue: "account" },
  { label: "No backend", cue: "backend" },
  { label: "No tracking", cue: "tracking" },
];
const FEATURES = [
  { title: "Immutable revisions", body: "Every import is kept, each with its own SHA-256 checksum.", cue: "immutable" },
  { title: "Review ledger", body: "Append-only, hash-chained review decisions.", cue: "ledger" },
  { title: "Crash recovery", body: "Unfinished work is restored after a reload.", cue: "ledger" },
  { title: "Portable backups", body: "Integrity-checked bundles you can restore anywhere.", cue: "portable" },
];
const EXPORTS = [
  { title: "Standalone HTML report", body: "Readable, and embeds the full JSON." },
  { title: "Canonical JSON", body: "Lossless: verify, re-import, archive." },
];

export const WorkspaceScene: React.FC<SceneProps> = ({ video, captions }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const lit = (at: number) => Math.min(1, spring({ frame: frame - at, fps, config: { damping: 200 } }));
  const exportAt = wordStartFrame(captions, "export", fps, 12 * fps);

  return (
    <SceneShell name="Workspace scene" eyebrow="05 · LOCAL-FIRST" title="Runs in your browser. Stays on your device.">
      <div style={{ display: "flex", gap: 40, height: "100%" }}>
        <div style={{ width: 900, display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", gap: 14 }}>
            {PRIVACY.map((p) => {
              const on = lit(wordStartFrame(captions, p.cue, fps, 2 * fps));
              return (
                <div
                  key={p.label}
                  style={{
                    flex: 1,
                    height: 88,
                    borderRadius: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    fontSize: 30,
                    fontWeight: 800,
                    color: "#10B981",
                    backgroundColor: "#10B98114",
                    border: "2px solid #10B981",
                    opacity: on,
                    scale: String(0.85 + 0.15 * on),
                  }}
                >
                  ✓ {p.label}
                </div>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {FEATURES.map((f) => {
              const on = lit(wordStartFrame(captions, f.cue, fps, 6 * fps));
              return (
                <div
                  key={f.title}
                  style={{
                    height: 150,
                    boxSizing: "border-box",
                    padding: "20px 24px",
                    borderRadius: 18,
                    backgroundColor: "#0F172A",
                    border: "1px solid #1E293B",
                    borderLeft: "4px solid #38BDF8",
                    opacity: 0.25 + 0.75 * on,
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#F8FAFC" }}>{f.title}</div>
                  <div style={{ marginTop: 8, fontSize: 22, color: "#94A3B8", lineHeight: 1.35 }}>{f.body}</div>
                </div>
              );
            })}
          </div>
          <div style={{ fontFamily: monoFamily, fontSize: 18, color: "#64748B" }}>
            Stored in this browser's IndexedDB · export a backup bundle for important work
          </div>
        </div>

        <div style={{ width: 836, display: "flex", flexDirection: "column", gap: 18 }}>
          <BrowserFrame
            url={video.siteUrl}
            width={836}
            height={470}
            endFrame={durationInFrames}
            shots={[
              { src: "12-review-exports.jpg", at: 0, from: { x: 1100, y: 640, zoom: 1.4 }, to: { x: 1100, y: 640, zoom: 1.5 } },
              { src: "12-review-exports.jpg", at: exportAt, from: { x: 1150, y: 760, zoom: 1.42 }, to: { x: 1150, y: 760, zoom: 1.5 } },
            ]}
          />
          <div style={{ display: "flex", gap: 14 }}>
            {EXPORTS.map((e, i) => {
              const on = lit(exportAt + i * 10);
              return (
                <div
                  key={e.title}
                  style={{
                    flex: 1,
                    height: 150,
                    boxSizing: "border-box",
                    padding: "18px 22px",
                    borderRadius: 18,
                    backgroundColor: "#38BDF814",
                    border: "1px solid #38BDF8",
                    opacity: on,
                    translate: `0px ${(1 - on) * 24}px`,
                  }}
                >
                  <div style={{ fontFamily: monoFamily, fontSize: 18, color: "#38BDF8" }}>EXPORT</div>
                  <div style={{ marginTop: 6, fontSize: 26, fontWeight: 800, color: "#F8FAFC" }}>{e.title}</div>
                  <div style={{ marginTop: 6, fontSize: 21, color: "#CBD5E1" }}>{e.body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
