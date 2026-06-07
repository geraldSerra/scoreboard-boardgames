import { memo } from "react";
import Meeple from "../../assets/Icons/Meeple";
import ScoringPlayerType from "../../types/scoringPlayerType";
import getColor from "../../utils/getColor";

const ScoringPlayer: React.FC<{
  scoringPlayers: ScoringPlayerType[];
  selectPlayer: (player: ScoringPlayerType) => void;
}> = memo(({ scoringPlayers, selectPlayer }) => {
  return (
    <div className="mx-[15px] flex h-[50px] w-fit flex-row items-center justify-center gap-5 rounded-[50px] bg-lightgray p-1">
      {scoringPlayers.map((player: ScoringPlayerType) => (
        <div
          className={`flex items-center justify-center rounded-[50px] p-2 transition-all duration-200 ${
            player.selected ? "scale-[1.3] bg-graysoft" : ""
          }`}
          onClick={() => {
            selectPlayer(player);
          }}
        >
          <Meeple color={getColor(player.color)} width={"30px"} height={"30px"} />
        </div>
      ))}
    </div>
  );
});

export default ScoringPlayer;
