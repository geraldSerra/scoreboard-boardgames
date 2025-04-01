import Meeple from "../../assets/Icons/Meeple";
import "./ScoringPlayer.css";

const ScoringPlayer = ({
  scoringPlayers,
  addPlayer,
  setScoringPlayers,
}: any) => {
  const handlePlayerSelected = (player: any) => {
    console.log("scoring player", scoringPlayers);

    setScoringPlayers((prev: any) => {
      return prev.map((item: any) => {
        if (item.player === player.player) {
          return { ...item, selected: !item.selected };
        } else return item;
      });
    });
  };

  console.log("scoring players", scoringPlayers);

  return (
    <div className="scoring-player-container">
      {scoringPlayers.map((player: any) => (
        <div
          className={`scoring-player ${player.selected ? "selected" : ""}`}
          onClick={() => {
            addPlayer(player.player);
            handlePlayerSelected(player);
          }}
        >
          <Meeple color={player.color} width={"30px"} height={"30px"} />
        </div>
      ))}
    </div>
  );
};

export default ScoringPlayer;
