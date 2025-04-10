import { JSX, RefObject, useRef } from "react";
import Pause from "../../assets/Icons/Pause";
import Play from "../../assets/Icons/Play";
import Score from "../../assets/Icons/Score";
import getCssVariable from "../../utils/getCssVariable";

const ActionButton: React.FC<{
  variant: "pause" | "score";
  action?: boolean;
  width: string;
  height?: string;
  onClick: () => void;
}> = ({ variant, action, width, height, onClick }) => {
  let icon: JSX.Element | null = null;
  let label: string = "";
  const color: RefObject<string> = useRef(getCssVariable("--accent-color"));

  const iconsProps = {
    color: color.current ?? "black",
    width: width,
    height: height ?? width,
  };

  switch (variant) {
    case "pause":
      icon = action ? <Play {...iconsProps} /> : <Pause {...iconsProps} />;
      label = action ? "Continue" : "Pause";
      break;
    case "score":
      icon = <Score {...iconsProps} />;
      label = "Score";
      break;
  }

  return (
    <div>
      <div onClick={onClick}>{icon}</div>
      <div>{label}</div>
    </div>
  );
};

export default ActionButton;
