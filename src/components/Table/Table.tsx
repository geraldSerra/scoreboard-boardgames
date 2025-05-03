import Meeple from "../../assets/Icons/Meeple";
import Road from "../../assets/Icons/Road";
import City from "../../assets/Icons/City";
import Monastery from "../../assets/Icons/Monastery";
import Garden from "../../assets/Icons/Garden";
import Field from "../../assets/Icons/Field";
import ScoringOptionType from "../../types/scoringOptionType";
import ScoringPlayerType from "../../types/scoringPlayerType";
import "./Table.css";
import FinalScreen from "../FinalScreen/FinalScreen";
import getColor from "../../utils/getColor";

const optionIcons: any = {
  road: <Road color="black" width="24px" height="24px" />,
  city: <City color="black" width="24px" height="24px" />,
  monastery: <Monastery color="black" width="24px" height="24px" />,
  garden: <Garden color="black" width="24px" height="24px" />,
  field: <Field color="black" width="24px" height="24px" />,
};

let totalArray: TotalType[] = [];

type ScoreType = {
  option: string;
  playersId: number[];
  points: string;
};

type TotalType = {
  playerId: number;
  points: number;
};

let finalScore: { playerId: number; color: string; total: number }[] = [];

const Table: React.FC<{
  mode: string;
  scoringPlayers: ScoringPlayerType[];
  score: ScoreType[];
  options: ScoringOptionType[];
}> = ({ mode, scoringPlayers, score, options }) => {
  console.log("Table Component rendered");

  totalArray = scoringPlayers.map((player: ScoringPlayerType) => {
    return { playerId: player.playerId, points: 0 };
  });

  totalArray = totalArray.map((total: TotalType) => {
    return {
      playerId: total.playerId,
      points: score
        .filter((item: ScoreType) => item.playersId.includes(total.playerId))
        .reduce(
          (acc: number, current: ScoreType) => acc + +current.points,
          +total.points ? +total.points : 0
        ),
    };
  });

  const GameTable = () => {
    return (
      <table className="scoring-table">
        <thead>
          <tr className="scoring-tr">
            {scoringPlayers.map((player: ScoringPlayerType) => (
              <th className="scoring-th">
                <Meeple
                  color={getColor(player.color)}
                  width={"24px"}
                  height={"24px"}
                />
                {
                  totalArray.filter(
                    (total: any) => total.playerId === player.playerId
                  )[0].points
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {score.map((item: any) => (
            <tr style={{ height: "30px" }}>
              {scoringPlayers.map((player: ScoringPlayerType) => {
                if (item.playersId.includes(player.playerId)) {
                  return <td>{item.points}</td>;
                } else return <td></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const FinalScore = () => {
    finalScore = scoringPlayers.map((player: ScoringPlayerType) => {
      let scoreFilteredByPlayer: ScoreType[] = score.filter((item: ScoreType) =>
        item.playersId.includes(player.playerId)
      );

      let optionScore: any = [];

      if (scoreFilteredByPlayer.length) {
        optionScore = scoreFilteredByPlayer.map((item: ScoreType) => {
          return { [item.option]: item.points };
        });

        optionScore = optionScore.reduce((acc: any, obj: any) => {
          const key = Object.keys(obj)[0];
          const value = parseInt(obj[key], 10);

          acc[key] = (acc[key] || 0) + value;
          return acc;
        }, {});
      }

      return {
        playerId: player.playerId,
        color: player.color,
        total: totalArray.filter(
          (total: any) => total.playerId === player.playerId
        )[0].points,
        points: optionScore,
      };

      // statsData.push()
    });

    finalScore = finalScore.sort((a: any, b: any) => b.total - a.total);

    return (
      <div>
        <table className="scoring-table">
          <thead>
            <tr className="final-tr">
              <th className="final-th">Result</th>
              {options.map((option: ScoringOptionType) => (
                <th className="final-th" key={option.scorable}>
                  {optionIcons[option.scorable]}
                  <div className="final-th-label">{option.scorable}</div>
                </th>
              ))}
              <th className="final-th">Total</th>
            </tr>
          </thead>
          <tbody>
            {finalScore.map((item: any, index: number) => {
              return (
                <tr className={`final-tr ${index === 0 ? "winner" : ""}`}>
                  <td className="final-td">
                    <Meeple
                      color={getColor(item.color)}
                      width="24px"
                      height="24px"
                    />
                  </td>
                  {options.map((option: ScoringOptionType) => {
                    if (Object.keys(item.points).includes(option.scorable)) {
                      return (
                        <td className="final-td">
                          {item.points[option.scorable]}
                        </td>
                      );
                    } else return <td className="final-td">0</td>;
                  })}
                  <td className="final-td">{item.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="table-container">
      {/* {mode === "gameInProgress" ? <GameTable /> : <FinalScore />} */}
      <GameTable />
      <br />
      <FinalScore />
      <br />
      <FinalScreen score={score} scoringPlayers={scoringPlayers} />
    </div>
  );
};

export default Table;
