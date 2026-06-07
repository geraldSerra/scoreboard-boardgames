import { JSX, memo } from "react";
import Pause from "../../assets/Icons/Pause";
import Play from "../../assets/Icons/Play";
import Score from "../../assets/Icons/Score";
import getCssVariable from "../../utils/getCssVariable";

// Read the CSS variable once at module load instead of on every render
// (getComputedStyle forces a style recalc).
const ACCENT_COLOR = getCssVariable("--accent-color") || "#00c9aa";

const ActionButton: React.FC<{
  variant: "pause" | "score";
  action?: boolean;
  width: string;
  height?: string;
  onClick: () => void;
}> = memo(({ variant, action, width, height, onClick }) => {
  let icon: JSX.Element | null = null;
  let label: string = "";

  const iconsProps = {
    color: ACCENT_COLOR,
    width: width,
    height: height ?? width,
  };

  switch (variant) {
    case "pause":
      icon = action ? <Play {...iconsProps} /> : <Pause {...iconsProps} />;
      label = action ? "Continuar" : "Pausar";
      break;
    case "score":
      icon = <Score {...iconsProps} />;
      label = "Puntuar";
      break;
  }

  return (
    <div
      className="flex cursor-pointer flex-col items-center gap-1"
      onClick={onClick}
    >
      <div>{icon}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
});

export default ActionButton;
