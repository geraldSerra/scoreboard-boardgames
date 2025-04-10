import Meeple from "../../assets/Icons/Meeple";
import Road from "../../assets/Icons/Road";
import City from "../../assets/Icons/City";
import Monastery from "../../assets/Icons/Monastery";
import "./Table.css";
import Garden from "../../assets/Icons/Garden";
import Field from "../../assets/Icons/Field";
import ScoringOptionType from "../../types/scoringOptionType";
import WinPercentage from "../WinPercentage/WinPercentage";
import { useState } from "react";

const optionIcons: any = {
  road: <Road color="black" width="30px" height="30px" />,
  city: <City color="black" width="30px" height="30px" />,
  monastery: <Monastery color="black" width="30px" height="30px" />,
  garden: <Garden color="black" width="30px" height="30px" />,
  field: <Field color="black" width="30px" height="30px" />,
};

let totalArray: { playerId: 1 | 2 | 3 | 4 | 5 | 6; points: number }[] = [];

type ScoringPlayerType = {
  color: "red" | "blue" | "green" | "yellow" | "black" | "pink";
  isPlayerTurn: boolean;
  player: 1 | 2 | 3 | 4 | 5 | 6;
  selected: boolean;
  time: string;
};

type ScoreType = {
  option: string;
  playersId: number[];
  points: string;
};

let finalScore: any = [];

let scoreByScorable: any = [];

const Table: React.FC<{
  mode: string;
  scoringPlayers: ScoringPlayerType[];
  score: ScoreType[];
  options: ScoringOptionType[];
}> = ({ mode, scoringPlayers, score, options }) => {
  console.log("Table Component");

  totalArray = scoringPlayers.map((player: ScoringPlayerType) => {
    return { playerId: player.player, points: 0 };
  });

  totalArray = totalArray.map((total: any) => {
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

  // const [percentage, setPercentage] = useState<any>([]);

  // if (mode === "gameFinished") {
  //   setPercentage(transformScores(finalScore));
  // }

  // function transformScores(players: any) {
  //   const scorableMap: any = {};

  //   players.forEach(({ playerId, color, points }: any) => {
  //     Object.entries(points).forEach(([scorable, value]) => {
  //       if (!scorableMap[scorable]) {
  //         scorableMap[scorable] = {
  //           scorable,
  //           players: [],
  //           total: 0,
  //         };
  //       }

  //       scorableMap[scorable].players.push({
  //         player: playerId,
  //         color,
  //         points: value,
  //       });

  //       scorableMap[scorable].total += value;
  //     });
  //   });

  //   // Convertir el objeto en un array
  //   return Object.values(scorableMap);
  // }

  const FinalScore = () => {
    //create final structure
    finalScore = scoringPlayers.map((player: ScoringPlayerType) => {
      let scoreFilteredByPlayer: ScoreType[] = score.filter((item: ScoreType) =>
        item.playersId.includes(player.player)
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
        playerId: player.player,
        color: player.color,
        total: totalArray.filter(
          (total: any) => total.playerId === player.player
        )[0].points,
        points: optionScore,
      };
    });

    console.log(scoreByScorable);

    finalScore = finalScore.sort((a: any, b: any) => b.total - a.total);

    return (
      <div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "gray" }}>
              <th>Results</th>
              {options.map((option: ScoringOptionType) => (
                <th key={option.scorable}>{optionIcons[option.scorable]}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {finalScore.map((item: any) => {
              return (
                <tr>
                  <td>
                    <Meeple color={item.color} width="30px" height="30px" />
                  </td>
                  {options.map((option: ScoringOptionType) => {
                    if (Object.keys(item.points).includes(option.scorable)) {
                      return (
                        <td style={{ textAlign: "center" }}>
                          {item.points[option.scorable]}
                        </td>
                      );
                    } else return <td style={{ textAlign: "center" }}>0</td>;
                  })}
                  <td style={{ textAlign: "center" }}>{item.total}</td>
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
      {mode === "gameInProgress" ? (
        <table className="scoring-table">
          <thead>
            <tr>
              {scoringPlayers.map((player: any) => (
                <th className="scoring-th">
                  <Meeple color={player.color} width={"24px"} height={"24px"} />
                  {
                    totalArray.filter(
                      (total: any) => total.playerId === player.player
                    )[0].points
                  }
                </th>
              ))}
            </tr>
          </thead>

          {score.map((item: any) => (
            <tr style={{ height: "30px" }}>
              {scoringPlayers.map((player: any) => {
                if (item.playersId.includes(player.player)) {
                  return <td>{item.points}</td>;
                } else return <td></td>;
              })}
            </tr>
          ))}
        </table>
      ) : (
        <>
          <FinalScore />
        </>
      )}
    </div>
  );
};

export default Table;
