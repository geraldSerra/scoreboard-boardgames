import { memo } from "react";
import { Check } from "lucide-react";
import Meeple3D from "../Meeple3D/Meeple3D";
import ScoringPlayerType from "../../types/scoringPlayerType";
import getColor from "../../utils/getColor";

const ScoringPlayer: React.FC<{
  scoringPlayers: ScoringPlayerType[];
  selectPlayer: (player: ScoringPlayerType) => void;
}> = memo(({ scoringPlayers, selectPlayer }) => {
  const anySelected = scoringPlayers.some((player) => player.selected);

  return (
    <div className="mx-[15px] flex flex-col gap-2">
      <div className="text-sm font-bold text-graysoft">
        {anySelected ? "¿Quién puntúa?" : "Elegí a quién le sumás"}
      </div>

      <div className="flex flex-wrap gap-2">
        {scoringPlayers.map((player: ScoringPlayerType) => {
          const color = getColor(player.color);
          return (
            <button
              key={player.playerId}
              type="button"
              aria-pressed={player.selected}
              onClick={() => selectPlayer(player)}
              className={`relative flex min-h-[48px] items-center gap-2 rounded-full border-2 py-1.5 pl-1.5 pr-3 transition-colors ${
                player.selected
                  ? "border-accent bg-accent/10"
                  : "border-graysoft bg-transparent"
              }`}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: `${color}22` }}
              >
                <Meeple3D color={player.color} width="30px" height="30px" />
              </span>

              <span
                className={`max-w-[120px] truncate text-[15px] font-bold ${
                  player.selected ? "text-black" : "text-graysoft"
                }`}
              >
                {player.name}
              </span>

              {player.selected && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                  <Check width="14px" height="14px" color="#0b192c" strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default ScoringPlayer;
