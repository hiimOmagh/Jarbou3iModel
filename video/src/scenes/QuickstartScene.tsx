import type { Caption } from "@remotion/captions";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GitHubMark } from "../components/GitHubMark";
import { monoFamily } from "../fonts";
import { wordStartFrame } from "../lib/wordTiming";

const StepCard: React.FC<{ index: string; title: string; body: string; snippet: string }> = ({
  index,
  title,
  body,
  snippet,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        width: 560,
        height: 470,
        boxSizing: "border-box",
        padding: "30px 30px",
        borderRadius: 24,
        backgroundColor: "#0F172A",
        border: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
        opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        translate: interpolate(frame, [0, 0.7 * fps], ["0px 60px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
        }),
      }}
    >
      <div style={{ fontFamily: monoFamily, fontSize: 64, fontWeight: 700, color: "#38BDF8", lineHeight: 1 }}>{index}</div>
      <div style={{ marginTop: 18, fontSize: 38, fontWeight: 800, color: "#F8FAFC", lineHeight: 1.18, letterSpacing: -0.5 }}>
        {title}
      </div>
      <div style={{ marginTop: 14, fontSize: 26, lineHeight: 1.35, color: "#CBD5E1" }}>{body}</div>
      <div
        style={{
          marginTop: "auto",
          fontFamily: monoFamily,
          fontSize: 20,
          color: "#E2E8F0",
          backgroundColor: "#0B1120",
          border: "1px solid #1E293B",
          borderRadius: 12,
          padding: "12px 16px",
          whiteSpace: "pre",
          lineHeight: 1.5,
        }}
      >
        {snippet}
      </div>
    </div>
  );
};

export const QuickstartScene: React.FC<{ repoName: string; captions: Caption[] }> = ({ repoName, captions }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const step1 = wordStartFrame(captions, "clone", fps, 6, 0);
  const step2 = wordStartFrame(captions, "audit", fps, Math.round(3 * fps));
  const step3 = wordStartFrame(captions, "stress-test", fps, Math.round(4.5 * fps));
  const callout = wordStartFrame(captions, "github", fps, Math.round(2 * fps));

  return (
    <AbsoluteFill
      name="Quickstart scene"
      style={{
        padding: "72px 72px 130px",
        flexDirection: "column",
        alignItems: "center",
        opacity: interpolate(frame, [0, 10, durationInFrames - 12, durationInFrames], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <Interactive.Div
        name="Quickstart title"
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: "#F8FAFC",
          letterSpacing: -1,
          lineHeight: 1.1,
          opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        Start auditing in three steps
      </Interactive.Div>
      <Interactive.Div name="Quickstart subtitle" style={{ marginTop: 10, fontSize: 28, color: "#94A3B8" }}>
        Open source (MIT) · local-first browser workbench · Arabic, English, French
      </Interactive.Div>

      <div style={{ marginTop: 40, width: 1776, height: 470, display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: 560, height: 470 }}>
          <Sequence name="Step 01" from={step1} layout="none">
            <StepCard
              index="01"
              title="Clone the Repo"
              body="Grab the open workbench from GitHub and start it locally."
              snippet={"gh repo clone hiimOmagh/Jarbou3i_Model\nnpm run dev"}
            />
          </Sequence>
        </div>
        <div style={{ width: 560, height: 470 }}>
          <Sequence name="Step 02" from={step2} layout="none">
            <StepCard
              index="02"
              title="Feed Any Contested Policy/Event"
              body="Pick the Strategic lens, enter a topic, and send the generated prompt to any AI assistant."
              snippet={"Lens: Strategic\nPaste the JSON answer → Import"}
            />
          </Sequence>
        </div>
        <div style={{ width: 560, height: 470 }}>
          <Sequence name="Step 03" from={step3} layout="none">
            <StepCard
              index="03"
              title="Audit Feedback Loops & Export JSON"
              body="Resolve every evidence warning, then export the HTML report and canonical JSON."
              snippet={"✓ evidence gate passed\n→ jarbou3i_output.json"}
            />
          </Sequence>
        </div>
      </div>

      {/* GitHub callout: bottom edge sits near y = 864, clear of the 130px caption safe zone. */}
      <div style={{ marginTop: 36, width: 1776, height: 132 }}>
        <Sequence name="GitHub callout" from={callout} layout="none">
          <GitHubCallout repoName={repoName} />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

const GitHubCallout: React.FC<{ repoName: string }> = ({ repoName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="GitHub callout bar"
      style={{
        width: 1776,
        height: 132,
        boxSizing: "border-box",
        padding: "0 40px",
        borderRadius: 24,
        display: "flex",
        alignItems: "center",
        gap: 28,
        background: "linear-gradient(90deg, #0F172A 0%, #0C2A3D 100%)",
        border: "2px solid #38BDF8",
        boxShadow: "0 0 40px #38BDF833",
        opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        scale: interpolate(frame, [0, 0.6 * fps], [0.94, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
        }),
      }}
    >
      <GitHubMark size={64} />
      <div>
        <div style={{ fontSize: 44, fontWeight: 800, color: "#F8FAFC", letterSpacing: -0.5 }}>github.com/{repoName}</div>
        <div style={{ marginTop: 4, fontSize: 24, color: "#94A3B8" }}>
          Audit complex systems · stress-test competing hypotheses · cut rhetorical inflation
        </div>
      </div>
      <div
        style={{
          marginLeft: "auto",
          fontSize: 28,
          fontWeight: 800,
          color: "#090D16",
          backgroundColor: "#38BDF8",
          borderRadius: 999,
          padding: "14px 30px",
          whiteSpace: "nowrap",
        }}
      >
        ★ Star &amp; clone
      </div>
    </Interactive.Div>
  );
};
