import { memo } from "react";
import { Crown } from "lucide-react";
import Meeple from "../../assets/Icons/Meeple";
import getColor from "../../utils/getColor";

type ChipProps = {
  color: string;
  name: string;
  time: string;
  score: number;
  initialTime?: string;
  isCurrent?: boolean;
  isLeader?: boolean;
};

const secondsOf = (t: string) => {
  const [m, s] = t.split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
};

const Chip = memo(
  ({
    color,
    name,
    time,
    score = 0,
    initialTime,
    isCurrent = false,
    isLeader = false,
  }: ChipProps) => {
    const hasTimer = !!time;
    const left = hasTimer ? secondsOf(time) : 0;
    const total = initialTime ? secondsOf(initialTime) : 0;
    const progress =
      total > 0 ? Math.max(0, Math.min(100, (left / total) * 100)) : 0;
    const low = hasTimer && left <= 30;
    // Same thresholds/colours as the main circular timer.
    const barColor =
      progress <= 20 ? "#E72929" : progress <= 50 ? "#FFD63A" : "#4CAF50";

    return (
      <div
        className={`w-full overflow-hidden rounded-[12px] border-2 bg-primary transition-all ${
          isLeader ? "border-[#f7c566]" : "border-secondary"
        } ${
          isCurrent
            ? "ring-2 ring-accent shadow-[0_0_14px_rgba(0,201,170,0.45)]"
            : ""
        }`}
      >
        <div className="flex items-center gap-3 px-3 py-2">
          <Meeple color={getColor(color)} width={"34px"} height={"34px"} />

          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">
              {name}
            </div>
            {hasTimer && (
              <div
                className={`text-base font-bold tabular-nums ${
                  low ? "text-red-400" : "text-graysoft"
                }`}
              >
                {time}
              </div>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {isLeader && (
              <Crown width="18px" height="18px" color="#e8a73a" fill="#f7c566" />
            )}
            <div
              className={`text-2xl font-bold tabular-nums ${
                isLeader ? "text-[#f7c566]" : "text-white"
              }`}
            >
              {score}
            </div>
          </div>
        </div>

        {hasTimer && (
          <div className="h-1.5 w-full bg-black/30">
            <div
              className="h-full transition-[width] duration-1000 ease-linear"
              style={{ width: `${progress}%`, backgroundColor: barColor }}
            />
          </div>
        )}
      </div>
    );
  }
);

export default Chip;
