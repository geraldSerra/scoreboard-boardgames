import Meeple from "../../assets/Icons/Meeple";
import "./ScoringPlayer.css";

type ScoringPlayerType = {
  color: "red" | "blue" | "green" | "yellow" | "black" | "pink";
  isPlayerTurn: boolean;
  player: 1 | 2 | 3 | 4 | 5 | 6;
  selected: boolean;
  time: string;
};

const ScoringPlayer: React.FC<{
  players: ScoringPlayerType[];
  selectPlayer: (player: ScoringPlayerType) => void;
}> = ({ players, selectPlayer }) => {
  console.log("scoring players Component");

  return (
    <div className="scoring-player-container">
      {players.map((player: any) => (
        <div
          className={`scoring-player ${player.selected ? "selected" : ""}`}
          onClick={() => {
            selectPlayer(player);
          }}
        >
          <Meeple color={player.color} width={"30px"} height={"30px"} />
        </div>
      ))}
    </div>
  );
};

export default ScoringPlayer;
