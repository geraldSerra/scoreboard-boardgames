import { memo } from "react";
import Meeple from "../../assets/Icons/Meeple";
import getColor from "../../utils/getColor";

export const COLORS_OPTIONS = ["red", "blue", "yellow", "green", "black", "pink"];

type PlayerRowProps = {
  index: number;
  name: string;
  color: string;
  takenColors: string[];
  onName: (name: string) => void;
  onColor: (color: string) => void;
};

const PlayerRow: React.FC<PlayerRowProps> = memo(
  ({ index, name, color, takenColors, onName, onColor }) => {
    return (
      <div className="box-border flex w-full flex-col gap-3 rounded-[20px] bg-black/30 p-[15px]">
        <div className="flex items-center gap-3">
          <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center">
            <Meeple color={getColor(color) ?? "#8a93a3"} width={"40px"} />
          </div>
          <input
            className="w-full min-w-0 rounded-[10px] border-2 border-transparent bg-white/10 px-3 py-2 text-base text-white outline-none transition-colors placeholder:text-graysoft focus:border-accent focus:bg-white/20"
            type="text"
            maxLength={16}
            value={name}
            placeholder={`Jugador ${index + 1}`}
            onChange={(e) => onName(e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-2">
          {COLORS_OPTIONS.map((option: string) => {
            const isSelected = color === option;
            const isTaken = !isSelected && takenColors.includes(option);

            return (
              <button
                key={option}
                type="button"
                disabled={isTaken}
                onClick={() => onColor(option)}
                aria-label={option}
                className={`h-9 w-9 rounded-full ring-1 ring-white/30 transition-all ${
                  isSelected
                    ? "scale-110 ring-2 ring-white"
                    : isTaken
                    ? "cursor-not-allowed opacity-25"
                    : "hover:scale-110"
                }`}
                style={{ backgroundColor: getColor(option) }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

export default PlayerRow;
