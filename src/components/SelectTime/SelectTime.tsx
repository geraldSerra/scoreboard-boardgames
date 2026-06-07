import { memo } from "react";
import Plus from "../../assets/Icons/Plus";
import Minus from "../../assets/Icons/Minus";
import getCssVariable from "../../utils/getCssVariable";
import SelectCardTitle from "../SelectCardsTitle/SelectCardsTitle";

const MIN = 10;
const MAX = 30;

const secondaryColor = getCssVariable("--secondary-color");

type SelectTimeProps = {
  time: number;
  handleSelect: (time: number) => void;
};

const SelectTime: React.FC<SelectTimeProps> = memo(({ time, handleSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSelect(Number(event.target.value));
  };

  const handleIncrease = () => {
    if (time >= MAX) return;
    handleSelect(time + 1);
  };

  const handleDecrease = () => {
    if (time <= MIN) return;
    handleSelect(time - 1);
  };

  return (
    <div className="box-border flex w-full flex-col justify-center rounded-[20px] bg-black/30 p-[15px]">
      <SelectCardTitle>Tiempo por jugador</SelectCardTitle>
      <div className="flex flex-row items-baseline gap-0.5">
        <span className="text-[40px] font-medium">{time}</span>
        <span>{` min`}</span>
      </div>
      <div className="mb-2 flex w-[200px] items-center gap-2">
        <Minus
          onClick={handleDecrease}
          color={secondaryColor}
          width="32px"
          height="32px"
        />
        <input
          type="range"
          className="h-1 w-full cursor-pointer appearance-none rounded bg-secondary accent-accent"
          min={MIN}
          max={MAX}
          value={time}
          onChange={handleChange}
        />
        <Plus
          onClick={handleIncrease}
          color={secondaryColor}
          width="32px"
          height="32px"
        />
      </div>
    </div>
  );
});

export default SelectTime;
