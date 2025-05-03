import Meeple from "../../assets/Icons/Meeple";
import ScoringPlayerType from "../../types/scoringPlayerType";
import getColor from "../../utils/getColor";
import "./ScoringPlayer.css";

const ScoringPlayer: React.FC<{
  scoringPlayers: ScoringPlayerType[];
  selectPlayer: (player: ScoringPlayerType) => void;
}> = ({ scoringPlayers, selectPlayer }) => {
  console.log("<ScoringPlayer rendered");

  return (
    <div className="scoring-player-container">
      {scoringPlayers.map((player: ScoringPlayerType) => (
        <div
          className={`scoring-player ${player.selected ? "selected" : ""}`}
          onClick={() => {
            selectPlayer(player);
          }}
        >
          <Meeple color={getColor(player.color)} width={"30px"} height={"30px"} />
        </div>
      ))}
    </div>
  );
};

export default ScoringPlayer;
