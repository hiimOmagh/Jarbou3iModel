import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { monoFamily } from "../fonts";
import { wordStartFrame } from "../lib/wordTiming";
import type { SceneProps } from "./types";

const VARIANTS = [
  { src: "13-ar-overview.jpg", label: "العربية · RTL", cue: "arabic" },
  { src: "14-fr-overview.jpg", label: "Français", cue: "french" },
  { src: "15-light-overview.jpg", label: "Light or dark", cue: "light" },
];

export const CtaScene: React.FC<SceneProps> = ({ video, captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lit = (at: number) => Math.min(1, spring({ frame: frame - at, fps, config: { damping: 200 } }));
  const openAt = wordStartFrame(captions, "open", fps, 4 * fps);

  return (
    <SceneShell name="CTA scene" eyebrow="06 · FOR EVERYONE" title="Arabic, English, French. Light or dark. Any screen.">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
        <div style={{ display: "flex", gap: 36 }}>
          {VARIANTS.map((v, i) => {
            const on = lit(wordStartFrame(captions, v.cue, fps, i * 20));
            return (
              <div key={v.src} style={{ opacity: on, translate: `0px ${(1 - on) * 40}px` }}>
                <div
                  style={{
                    width: 568,
                    height: 320,
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid #334155",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                  }}
                >
                  <Img src={staticFile(`ui/${v.src}`)} style={{ width: 568, height: 320, objectFit: "cover" }} />
                </div>
                <div style={{ marginTop: 12, textAlign: "center", fontSize: 26, fontWeight: 700, color: "#E2E8F0" }}>{v.label}</div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 52,
            width: 1500,
            height: 150,
            boxSizing: "border-box",
            padding: "0 44px",
            borderRadius: 28,
            display: "flex",
            alignItems: "center",
            gap: 30,
            background: "linear-gradient(90deg, #0F172A 0%, #0C2A3D 100%)",
            border: "2px solid #38BDF8",
            boxShadow: `0 0 ${48 * lit(openAt)}px #38BDF855`,
            opacity: lit(openAt),
            scale: interpolate(frame, [openAt, openAt + 18], [0.92, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 200 }),
            }),
          }}
        >
          <div style={{ fontSize: 64, lineHeight: 1 }}>🌐</div>
          <div>
            <div style={{ fontFamily: monoFamily, fontSize: 56, fontWeight: 700, color: "#F8FAFC", letterSpacing: -1 }}>
              {video.siteUrl}
            </div>
            <div style={{ marginTop: 6, fontSize: 24, color: "#94A3B8" }}>Opens in your browser. No install, no account.</div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              padding: "16px 32px",
              borderRadius: 999,
              fontSize: 28,
              fontWeight: 800,
              color: "#090D16",
              backgroundColor: "#38BDF8",
              whiteSpace: "nowrap",
            }}
          >
            Start an analysis →
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
