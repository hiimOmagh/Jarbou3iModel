import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { monoFamily } from "../fonts";

// Screenshots are 1920x1080 captures of the live site. A focus is the image
// point to centre on and a zoom relative to "cover" fit of the viewport.
export type Focus = { x: number; y: number; zoom: number };
export type Shot = { src: string; at: number; from?: Focus; to?: Focus };

const IMG_W = 1920;
const IMG_H = 1080;
const BAR_H = 44;
const CENTER: Focus = { x: 960, y: 540, zoom: 1 };
const FADE = 10;

export const BrowserFrame: React.FC<{
  shots: Shot[];
  width: number;
  height: number;
  url: string;
  endFrame: number;
}> = ({ shots, width, height, url, endFrame }) => {
  const frame = useCurrentFrame();
  const vw = width;
  const vh = height - BAR_H;
  const cover = Math.max(vw / IMG_W, vh / IMG_H);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "#0B1120",
        border: "1px solid #334155",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: BAR_H,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "0 16px",
          backgroundColor: "#111827",
          borderBottom: "1px solid #1E293B",
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#F87171" }} />
        <span style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#FBBF24" }} />
        <span style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#34D399" }} />
        <span
          style={{
            marginLeft: 14,
            padding: "4px 16px",
            borderRadius: 999,
            backgroundColor: "#0B1120",
            border: "1px solid #1E293B",
            fontFamily: monoFamily,
            fontSize: 17,
            color: "#CBD5E1",
          }}
        >
          🔒 {url}
        </span>
      </div>
      <div style={{ position: "relative", width: vw, height: vh, overflow: "hidden" }}>
        {shots.map((shot, i) => {
          const start = shot.at;
          const end = shots[i + 1]?.at ?? endFrame;
          if (frame < start - 1 || frame > end + FADE) return null;
          const p = interpolate(frame, [start, Math.max(start + 1, end)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.45, 0, 0.25, 1),
          });
          const from = shot.from ?? CENTER;
          const to = shot.to ?? { ...from, zoom: from.zoom * 1.06 };
          const zoom = from.zoom + (to.zoom - from.zoom) * p;
          const x = from.x + (to.x - from.x) * p;
          const y = from.y + (to.y - from.y) * p;
          const scale = cover * zoom;
          const w = IMG_W * scale;
          const h = IMG_H * scale;
          const left = Math.min(0, Math.max(vw - w, vw / 2 - x * scale));
          const top = Math.min(0, Math.max(vh - h, vh / 2 - y * scale));
          const opacity = i === 0 ? 1 : interpolate(frame, [start, start + FADE], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <Img
              key={`${shot.src}-${i}`}
              src={staticFile(`ui/${shot.src}`)}
              style={{ position: "absolute", left, top, width: w, height: h, opacity }}
            />
          );
        })}
      </div>
    </div>
  );
};
