import { memo } from "react";
import Meeple from "../../assets/Icons/Meeple";
import getColor from "../../utils/getColor";

const TurnButton = memo(({ color, onClick }: any) => {
  return (
    <div
      className="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-secondary shadow-[rgba(66,65,68,0.4)_0px_5px,rgba(13,13,13,0.3)_0px_10px]"
      onClick={() => onClick()}
    >
      <Meeple color={getColor(color)} width={"100px"} height={"100px"} />
    </div>
  );
});

export default TurnButton;
