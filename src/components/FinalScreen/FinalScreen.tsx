import ScoreType from "../../types/scoreType";
import ScoringPlayerType from "../../types/scoringPlayerType";
import Stats from "../Stats/Stats";

const FinalScreen = ({
  score,
  scoringPlayers,
}: {
  score: ScoreType[];
  scoringPlayers: ScoringPlayerType[];
}) => {
  //[{scorable: city, data: []}]

  type PlayerPercentageData = {
    playerId: number;
    color: string;
    percentage: number;
  };

  type ResultEntry = {
    option: string;
    data: PlayerPercentageData[];
  };

  // Agrupamos los puntos por opción y playerId
  const grouped: Record<string, Record<number, number>> = {};

  for (const item of score) {
    if (!grouped[item.option]) {
      grouped[item.option] = {};
    }
    for (const id of item.playersId) {
      grouped[item.option][id] = (grouped[item.option][id] || 0) + +item.points;
    }
  }

  // Convertimos a porcentaje respecto al total
  const result: ResultEntry[] = Object.entries(grouped).map(
    ([option, playerPoints]) => {
      const totalPoints = Object.values(playerPoints).reduce(
        (sum, val) => sum + val,
        0
      );

      const data: PlayerPercentageData[] = scoringPlayers.map((player) => {
        const points = playerPoints[player.playerId] || 0;
        const percentage =
          totalPoints === 0 ? 0 : +((points / totalPoints) * 100);
        return {
          playerId: player.playerId,
          color: player.color,
          percentage,
        };
      });

      return { option, data };
    }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
        width: "100%",
        gap: "15px",
      }}
    >
      {result.map((item: ResultEntry) => (
        <Stats scorable={item.option} data={item.data} />
      ))}
    </div>
  );
};

export default FinalScreen;
