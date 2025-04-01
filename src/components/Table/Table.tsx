import Meeple from "../../assets/Icons/Meeple";
import Road from "../../assets/Icons/Road";
import City from "../../assets/Icons/City";
import Monastery from "../../assets/Icons/Monastery";
import "./Table.css";
import Garden from "../../assets/Icons/Graden";
import Field from "../../assets/Icons/Field";

const optionIcons: any = {
  road: <Road color="black" width="30px" height="30px" />,
  city: <City color="black" width="30px" height="30px" />,
  monastery: <Monastery color="black" width="30px" height="30px" />,
  garden: <Garden color="black" width="30px" height="30px" />,
  field: <Field color="black" width="30px" height="30px" />,
};

let totalArray: any = [];

const Table = ({ mode, scoringPlayers, score, options }: any) => {
  totalArray = scoringPlayers.map((player: any) => {
    return { playerId: player.player, points: 0 };
  });

  totalArray = totalArray.map((total: any) => {
    return {
      playerId: total.playerId,
      points: score
        .filter((item: any) => item.playersId.includes(total.playerId))
        .reduce(
          (acc: any, current: any) => acc + +current.points,
          +total.points ? +total.points : 0
        ),
    };
  });

  const FinalScore = () => {
    let finalScore = [];

    //create final structure
    finalScore = scoringPlayers.map((player: any) => {
      let optionScore = score.filter((item: any) =>
        item.playersId.includes(player.player)
      );

      if (optionScore.length) {
        optionScore = optionScore.map((item: any) => {
          return { [item.option]: item.points };
        });

        optionScore = optionScore.reduce((acc: any, obj: any) => {
          const key = Object.keys(obj)[0];
          const value = parseInt(obj[key], 10);

          acc[key] = (acc[key] || 0) + value;
          return acc;
        }, {});
      }

      // console.log("TEST", optionScore);

      return {
        playerId: player.player,
        color: player.color,
        total: totalArray.filter(
          (total: any) => total.playerId === player.player
        )[0].points,
        points: optionScore,
      };
    });

    //order the positions
    finalScore = finalScore.sort((a: any, b: any) => b.total - a.total);

    // console.log("FINAL", finalScore);

    return (
      <div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "gray" }}>
              <th>Results</th>
              {options.map((option: any) => (
                <th key={option.name}>{optionIcons[option.name]}</th>
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
                  {options.map((option: any) => {
                    if (Object.keys(item.points).includes(option.name)) {
                      return (
                        <td style={{ textAlign: "center" }}>
                          {item.points[option.name]}
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
        <FinalScore />
      )}
    </div>
  );
};

export default Table;
