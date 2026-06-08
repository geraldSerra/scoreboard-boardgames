import { memo } from "react";
import { Pencil } from "lucide-react";
import Meeple from "../../assets/Icons/Meeple";
import Meeple3D from "../Meeple3D/Meeple3D";
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
            {color ? (
              <Meeple3D color={color} width={"44px"} height={"44px"} />
            ) : (
              <Meeple color="#8a93a3" width={"40px"} />
            )}
          </div>
          <div className="relative w-full min-w-0">
            <input
              className="w-full min-w-0 rounded-[10px] border-2 border-transparent bg-white/10 px-3 py-2 pr-9 text-base text-white outline-none transition-colors placeholder:text-graysoft focus:border-accent focus:bg-white/20"
              type="text"
              maxLength={16}
              value={name}
              placeholder={`Jugador ${index + 1}`}
              onChange={(e) => onName(e.target.value)}
            />
            <Pencil
              width="16px"
              height="16px"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-accent"
            />
          </div>
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
                className={`h-7 w-7 rounded-full ring-1 ring-white/30 transition-all ${
                  isSelected
                    ? "scale-110 ring-2 ring-white"
                    : isTaken
                    ? "cursor-not-allowed"
                    : "hover:scale-110"
                }`}
                style={{ backgroundColor: isTaken ? "#6b7280" : getColor(option) }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

export default PlayerRow;
