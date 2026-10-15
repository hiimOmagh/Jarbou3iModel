import { monoFamily } from "../fonts";
import { STATUS_COLORS, type EpistemicStatus } from "../types/jarbou3iSchema";

export const StatusChip: React.FC<{
  status: EpistemicStatus;
  fontSize?: number;
  brackets?: boolean;
}> = ({ status, fontSize = 18, brackets = false }) => {
  const color = STATUS_COLORS[status];
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
        letterSpacing: 0.3,
      }}
    >
      {brackets ? `[${status}]` : status}
    </span>
  );
};
