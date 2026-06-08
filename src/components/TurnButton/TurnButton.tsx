import { memo } from "react";
import Meeple3D from "../Meeple3D/Meeple3D";

const TurnButton = memo(({ color, onClick }: any) => {
  return (
    <div
      className="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-white shadow-[0_5px_0_#d6dbe3,0_10px_0_#bcc4d0,0_16px_22px_rgba(0,0,0,0.3)]"
      onClick={() => onClick()}
    >
      <Meeple3D color={color} width={"110px"} height={"110px"} />
    </div>
  );
});

export default TurnButton;
