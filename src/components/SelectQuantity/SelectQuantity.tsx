import { memo } from "react";
import SelectCardTitle from "../SelectCardsTitle/SelectCardsTitle";

const QUANTITY_OPTIONS: number[] = [2, 3, 4, 5, 6];

type SelectQuantityProps = {
  quantity: number;
  handleSelect: (num: number) => void;
};

const SelectQuantity: React.FC<SelectQuantityProps> = memo(
  ({ quantity, handleSelect }) => {
    const handleSelectQuantity = (num: number) => {
      handleSelect(num);
    };

    return (
      <div className="box-border flex w-full flex-col justify-center rounded-[20px] bg-black/30 p-[15px]">
        <SelectCardTitle>Jugadores</SelectCardTitle>
        <div className="flex w-full justify-between gap-2">
          {QUANTITY_OPTIONS.map((num: number) => (
            <div
              key={num}
              className={`flex aspect-square flex-1 cursor-pointer items-center justify-center rounded-[10px] border-2 border-secondary text-[18px] font-bold text-accent transition-all duration-150 hover:bg-secondary ${
                quantity === num ? "bg-secondary" : "bg-transparent"
              }`}
              onClick={() => handleSelectQuantity(num)}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default SelectQuantity;
