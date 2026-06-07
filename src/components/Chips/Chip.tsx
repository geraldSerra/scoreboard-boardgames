import { memo } from "react";
import Meeple from "../../assets/Icons/Meeple";
import getColor from "../../utils/getColor";

type ChipProps = {
  color: string;
  name: string;
  time: string;
  score: number;
};

const Chip = memo(({ color, name, time, score = 0 }: ChipProps) => {
  return (
    <div className="flex h-full w-full max-w-[110px] flex-col justify-between gap-1 overflow-hidden rounded-[10px] border-2 border-secondary text-white">
      <div className="box-border flex flex-col items-center justify-center gap-3 rounded-t-[18px] bg-primary pt-[15px]">
        <div className="absolute mb-[70px] flex h-[25px] w-[25px] scale-[2.4] items-center justify-center rounded-[20px]">
          <Meeple color={getColor(color)} width={"20px"} height={"20px"} />
        </div>
        <div className="text-[22px] font-bold">{score}</div>
      </div>

      <div className="flex flex-col items-center bg-secondary">
        <div className="w-full truncate px-1 text-center text-xs font-semibold">
          {name}
        </div>
        <div className="flex h-7 w-full items-center justify-center overflow-hidden text-base tracking-[0.3px]">
          {time}
        </div>
      </div>
    </div>
  );
});

export default Chip;
