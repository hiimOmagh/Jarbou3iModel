import { monoFamily } from "../fonts";
import { EPISTEMIC_COLORS, type EpistemicType } from "../types/jarbou3iSchema";

export const EpistemicChip: React.FC<{
  type: EpistemicType;
  fontSize?: number;
  brackets?: boolean;
  dim?: boolean;
}> = ({ type, fontSize = 18, brackets = false, dim = false }) => {
  const color = dim ? "#64748B" : EPISTEMIC_COLORS[type];
  return (
    <span
      style={{
        fontFamily: monoFamily,
        fontSize,
        fontWeight: 700,
        color,
        backgroundColor: `${color}1F`,
        border: `1px solid ${color}80`,
        borderRadius: 8,
        padding: "4px 10px",
        whiteSpace: "nowrap",
      }}
    >
      {brackets ? `[${type}]` : type}
    </span>
  );
};
