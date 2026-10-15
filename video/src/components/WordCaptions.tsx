import { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { createTikTokStyleCaptions, type Caption, type TikTokPage } from "@remotion/captions";
import { fontFamily } from "../fonts";

const SWITCH_CAPTIONS_EVERY_MS = 1400;

const CaptionPage: React.FC<{ page: TikTokPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Frame is relative to the page's Sequence; tokens are scene-relative.
  const currentTimeMs = page.startMs + (frame / fps) * 1000;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 36,
      }}
    >
      <Interactive.Div
        name="Caption pill"
        style={{
          backgroundColor: "rgba(9, 13, 22, 0.90)",
          border: "1px solid #334155",
          borderRadius: 28,
          padding: "12px 34px",
          maxWidth: 1600,
          fontFamily,
          fontSize: 40,
          fontWeight: 600,
          lineHeight: 1.25,
          textAlign: "center",
          whiteSpace: "pre-wrap",
          opacity: interpolate(frame, [0, 4], [0.6, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {page.tokens.map((token, i) => {
          const isActive = currentTimeMs >= token.fromMs && currentTimeMs < token.toMs;
          const isSpoken = currentTimeMs >= token.toMs;
          return (
            <span
              key={`${token.fromMs}-${i}`}
              style={{
                color: isActive ? "#38BDF8" : isSpoken ? "#F8FAFC" : "#94A3B8",
                fontWeight: isActive ? 800 : 600,
              }}
            >
              {token.text}
            </span>
          );
        })}
      </Interactive.Div>
    </AbsoluteFill>
  );
};

export const WordCaptions: React.FC<{ captions: Caption[] }> = ({ captions }) => {
  const { fps } = useVideoConfig();
  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
      }),
    [captions],
  );

  return (
    <AbsoluteFill name="Captions">
      {pages.map((page, index) => {
        const next = pages[index + 1] ?? null;
        const from = Math.round((page.startMs / 1000) * fps);
        // Each page holds until the next one starts; the last one holds to the
        // end of the scene (through the breathing buffer).
        const durationInFrames = next ? Math.round((next.startMs / 1000) * fps) - from : Infinity;
        if (durationInFrames <= 0) return null;
        return (
          <Sequence key={index} name={`Caption page ${index + 1}`} from={from} durationInFrames={durationInFrames}>
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
