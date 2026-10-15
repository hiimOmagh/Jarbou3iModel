import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { monoFamily } from "../fonts";

// Shared scene frame: 72px top/side and 130px bottom safe area (captions live
// below), a fade in/out, and an eyebrow + title header.
export const SceneShell: React.FC<{
  name: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
}> = ({ name, eyebrow, title, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      name={name}
      style={{
        padding: "72px 72px 130px",
        flexDirection: "column",
        opacity: interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {title ? (
        <div
          style={{
            height: 104,
            flexShrink: 0,
            opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ fontFamily: monoFamily, fontSize: 22, fontWeight: 700, letterSpacing: 3, color: "#38BDF8" }}>
            {eyebrow}
          </div>
          <div style={{ marginTop: 8, fontSize: 56, fontWeight: 800, letterSpacing: -1, color: "#F8FAFC", lineHeight: 1.1 }}>
            {title}
          </div>
        </div>
      ) : null}
      <div style={{ position: "relative", flex: 1, minHeight: 0, marginTop: title ? 24 : 0 }}>{children}</div>
    </AbsoluteFill>
  );
};
