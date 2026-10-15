import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { StatusChip } from "../components/StatusChip";
import { monoFamily } from "../fonts";
import { STATUS_COLORS, type EpistemicStatus, type Pillar } from "../types/jarbou3iSchema";

const C = {
  punct: "#94A3B8",
  key: "#7DD3FC",
  string: "#FDE68A",
  id: "#C4B5FD",
};
const HEADER_FRAMES = 25;
// Longest value that fits one 22px mono line in the editor (~60 columns).
const MAX_VALUE_CHARS = 46;

type Seg = { text: string; color: string; status?: EpistemicStatus };
type Line = Seg[];

const fit = (s: string) => (s.length <= MAX_VALUE_CHARS ? s : `${s.slice(0, MAX_VALUE_CHARS - 1)}…`);

const pillarLines = (p: Pillar, last: boolean): Line[] => [
  [
    { text: "  ", color: C.punct },
    { text: `"${p.jsonKey}"`, color: C.key },
    { text: ": [{ ", color: C.punct },
    { text: '"id"', color: C.key },
    { text: ": ", color: C.punct },
    { text: `"${p.recordId}"`, color: C.id },
    { text: ",", color: C.punct },
  ],
  [
    { text: "    ", color: C.punct },
    { text: '"name"', color: C.key },
    { text: ": ", color: C.punct },
    { text: `"${fit(p.sampleValue)}"`, color: C.string },
    { text: ",", color: C.punct },
  ],
  [
    { text: "    ", color: C.punct },
    { text: '"epistemic_status"', color: C.key },
    { text: ": ", color: C.punct },
    { text: `"${p.status}"`, color: STATUS_COLORS[p.status], status: p.status },
    { text: last ? " }]" : " }],", color: C.punct },
  ],
];

const HEADER: Line[] = [
  [{ text: "{", color: C.punct }],
  [
    { text: "  ", color: C.punct },
    { text: '"schema_version"', color: C.key },
    { text: ": ", color: C.punct },
    { text: '"1.1.0"', color: C.string },
    { text: ",", color: C.punct },
  ],
];
const FOOTER: Line[] = [[{ text: "}", color: C.punct }]];

const blockLength = (lines: Line[]) => lines.reduce((n, l) => n + l.reduce((m, s) => m + s.text.length, 0), 0);

// Renders a block of lines with only the first `visible` characters shown.
const TypedBlock: React.FC<{ lines: Line[]; visible: number; showCursor: boolean; badgeFrame: number | null }> = ({
  lines,
  visible,
  showCursor,
  badgeFrame,
}) => {
  const { fps } = useVideoConfig();
  let offset = 0;
  const lineVisible = lines.map((line) => {
    const len = line.reduce((n, seg) => n + seg.text.length, 0);
    const shown = Math.max(0, Math.min(len, visible - offset));
    offset += len;
    return shown;
  });
  const cursorLine = lineVisible.reduce((acc, shown, i) => (shown > 0 ? i : acc), -1);
  return (
    <>
      {lines.map((line, li) => {
        if (lineVisible[li] === 0) return null;
        let segBudget = lineVisible[li];
        const cursorHere = showCursor && li === cursorLine;
        return (
          <div key={li} style={{ height: 32, display: "flex", alignItems: "center", whiteSpace: "pre" }}>
            {line.map((seg, si) => {
              const shown = seg.text.slice(0, Math.max(0, segBudget));
              segBudget -= seg.text.length;
              if (!shown) return null;
              const complete = shown.length === seg.text.length;
              if (seg.status && complete && badgeFrame !== null) {
                const pop = spring({ frame: badgeFrame, fps, config: { damping: 12, stiffness: 180 } });
                return (
                  <span key={si} style={{ display: "inline-block", scale: String(0.85 + 0.15 * pop) }}>
                    <StatusChip status={seg.status} fontSize={18} />
                  </span>
                );
              }
              return (
                <span key={si} style={{ color: seg.color }}>
                  {shown}
                </span>
              );
            })}
            {cursorHere ? (
              <span style={{ display: "inline-block", width: 12, height: 26, marginLeft: 2, backgroundColor: "#38BDF8" }} />
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export const SplitDemoScene: React.FC<{
  pillars: Pillar[];
  caseStudyTitle: string;
  rawHeadline: string;
}> = ({ pillars, caseStudyTitle, rawHeadline }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Dynamic pacing: the sequence's own duration (= demo voiceover + buffer)
  // sets how long each pillar gets, so typing always ends with the narration.
  const framesPerPillar = Math.floor((durationInFrames - HEADER_FRAMES) / pillars.length);
  const typeFrames = Math.max(10, Math.floor(framesPerPillar * 0.6));
  const activeIndex = Math.max(-1, Math.min(pillars.length - 1, Math.floor((frame - HEADER_FRAMES) / framesPerPillar)));
  const blinkOn = Math.floor(frame / 15) % 2 === 0;

  const headerVisible = Math.round(
    interpolate(frame, [0, HEADER_FRAMES - 5], [0, blockLength(HEADER)], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );
  const lastDone = HEADER_FRAMES + (pillars.length - 1) * framesPerPillar + typeFrames;
  const allValid = frame >= lastDone + 4;

  return (
    <AbsoluteFill
      name="Demo scene"
      style={{
        padding: "72px 72px 130px",
        flexDirection: "column",
        opacity: interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <Interactive.Div name="Demo header" style={{ display: "flex", alignItems: "center", gap: 20, height: 58 }}>
        <span
          style={{
            fontFamily: monoFamily,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#090D16",
            backgroundColor: "#38BDF8",
            borderRadius: 8,
            padding: "6px 14px",
          }}
        >
          LIVE DEMO
        </span>
        <span style={{ fontSize: 36, fontWeight: 700, color: "#F8FAFC" }}>{caseStudyTitle}</span>
      </Interactive.Div>

      <div style={{ marginTop: 28, flex: 1, display: "flex", gap: 40, minHeight: 0 }}>
        {/* Left: plain-language walkthrough */}
        <div style={{ width: 740, display: "flex", flexDirection: "column", gap: 12 }}>
          <Interactive.Div
            name="Raw claim"
            style={{
              boxSizing: "border-box",
              padding: "16px 22px",
              borderRadius: 16,
              backgroundColor: "#111827",
              border: "1px dashed #475569",
              marginBottom: 6,
            }}
          >
            <div style={{ fontFamily: monoFamily, fontSize: 17, letterSpacing: 2, color: "#94A3B8" }}>RAW CLAIM</div>
            <div style={{ marginTop: 6, fontSize: 25, lineHeight: 1.3, color: "#E2E8F0", fontStyle: "italic" }}>
              “{rawHeadline}”
            </div>
          </Interactive.Div>
          {pillars.map((p, i) => {
            const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "upcoming";
            const start = HEADER_FRAMES + i * framesPerPillar;
            const reveal = interpolate(frame, [start + 4, start + 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={p.id}
                style={{
                  height: 84,
                  boxSizing: "border-box",
                  padding: "10px 18px",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  backgroundColor: state === "active" ? "#38BDF81A" : "#0F172A",
                  border: `2px solid ${state === "active" ? "#38BDF8" : "#1E293B"}`,
                  opacity: state === "upcoming" ? 0.45 : 1,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    borderRadius: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: monoFamily,
                    fontSize: 20,
                    fontWeight: 700,
                    color: state === "upcoming" ? "#94A3B8" : "#090D16",
                    backgroundColor: state === "done" ? STATUS_COLORS[p.status] : state === "active" ? "#38BDF8" : "#1E293B",
                  }}
                >
                  {state === "done" ? "✓" : i + 1}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 25, whiteSpace: "nowrap" }}>
                    <span style={{ fontWeight: 800, color: "#F8FAFC" }}>{p.label}</span>
                    <span style={{ color: state === "active" ? "#38BDF8" : "#94A3B8" }}> — {p.question}</span>
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 23,
                      color: "#CBD5E1",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      opacity: reveal,
                    }}
                  >
                    <span style={{ color: STATUS_COLORS[p.status] }}>● </span>
                    {p.sampleValue}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: IDE window typing the validated JSON */}
        <Interactive.Div
          name="IDE window"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: 18,
            overflow: "hidden",
            backgroundColor: "#0B1120",
            border: "1px solid #334155",
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            translate: interpolate(frame, [0, 18], ["40px 0px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 200 }),
            }),
          }}
        >
          <div
            style={{
              height: 54,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 20px",
              backgroundColor: "#111827",
              borderBottom: "1px solid #1E293B",
            }}
          >
            <span style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#F87171" }} />
            <span style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#FBBF24" }} />
            <span style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#34D399" }} />
            <span style={{ marginLeft: 16, fontFamily: monoFamily, fontSize: 20, color: "#E2E8F0" }}>jarbou3i_output.json</span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: monoFamily,
                fontSize: 18,
                color: allValid ? "#10B981" : "#94A3B8",
              }}
            >
              {allValid ? "✓ schema 1.1.0 · valid" : "validating…"}
            </span>
          </div>
          <div style={{ padding: "22px 28px", fontFamily: monoFamily, fontSize: 22, color: "#E2E8F0" }}>
            <TypedBlock lines={HEADER} visible={headerVisible} showCursor={activeIndex < 0 && blinkOn} badgeFrame={null} />
            {pillars.map((p, i) => {
              const start = HEADER_FRAMES + i * framesPerPillar;
              const lines = pillarLines(p, i === pillars.length - 1);
              const visible = Math.round(
                interpolate(frame, [start, start + typeFrames], [0, blockLength(lines)], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              );
              if (visible === 0) return null;
              return (
                <TypedBlock
                  key={p.id}
                  lines={lines}
                  visible={visible}
                  showCursor={i === activeIndex && blinkOn && !allValid}
                  badgeFrame={frame - (start + typeFrames)}
                />
              );
            })}
            {allValid ? <TypedBlock lines={FOOTER} visible={1} showCursor={false} badgeFrame={null} /> : null}
          </div>
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};
