import Meeple3D from "../Meeple3D/Meeple3D";
import Road from "../../assets/Icons/Road";
import City from "../../assets/Icons/City";
import Monastery from "../../assets/Icons/Monastery";
import Garden from "../../assets/Icons/Garden";
import Field from "../../assets/Icons/Field";
import ScoringOptionType from "../../types/scoringOptionType";
import ScoringPlayerType from "../../types/scoringPlayerType";
import FinalScreen from "../FinalScreen/FinalScreen";
import scorableLabel from "../../utils/scorableLabel";
import X from "../../assets/Icons/X";

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
  onDeleteScore?: (index: number) => void;
}> = ({ mode, scoringPlayers, score, options, onDeleteScore }) => {
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
      <table className="w-full overflow-hidden rounded-[10px] border-collapse bg-graysoft text-center">
        <thead>
          <tr className="h-[60px]">
            {scoringPlayers.map((player: ScoringPlayerType) => (
              <th key={player.playerId} className="h-[60px] text-base">
                <div className="flex flex-col items-center">
                  <Meeple3D
                    color={player.color}
                    width={"28px"}
                    height={"28px"}
                  />
                  {
                    totalArray.filter(
                      (total: any) => total.playerId === player.playerId
                    )[0].points
                  }
                </div>
              </th>
            ))}
          </tr>
        </thead>
      </table>
    );
  };

  const ScoreHistory = () => {
    if (!score.length) {
      return (
        <div className="mt-3 text-center text-xs font-medium text-graysoft">
          Aún no hay puntos cargados.
        </div>
      );
    }

    return (
      <div className="mt-3 flex flex-col gap-2">
        {score.map((item: ScoreType, index: number) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-[10px] bg-lightgray px-3 py-2"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center">
              {optionIcons[item.option]}
            </div>
            <span className="text-xs font-semibold">
              {scorableLabel(item.option)}
            </span>
            <div className="flex items-center gap-1">
              {scoringPlayers
                .filter((p) => item.playersId.includes(p.playerId))
                .map((p) => (
                  <Meeple3D
                    key={p.playerId}
                    color={p.color}
                    width={"20px"}
                    height={"20px"}
                  />
                ))}
            </div>
            <span className="ml-auto text-base font-bold">+{item.points}</span>
            <button
              type="button"
              aria-label="Borrar jugada"
              onClick={() => onDeleteScore?.(index)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200"
            >
              <X width="14px" height="14px" color="#777" />
            </button>
          </div>
        ))}
      </div>
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
        <table className="h-fit min-h-[180px] w-full overflow-hidden rounded-[10px] border-collapse bg-lightgray text-center">
          <thead>
            <tr className="flex h-[60px] items-center justify-between">
              <th className="flex h-[60px] w-1/2 flex-col items-center justify-center bg-graysoft text-[11px] font-medium capitalize">
                Resultado
              </th>
              {options.map((option: ScoringOptionType) => (
                <th
                  className="flex h-[60px] w-1/2 flex-col items-center justify-center bg-graysoft text-[11px] font-medium capitalize"
                  key={option.scorable}
                >
                  {optionIcons[option.scorable]}
                  <div>{scorableLabel(option.scorable)}</div>
                </th>
              ))}
              <th className="flex h-[60px] w-1/2 flex-col items-center justify-center bg-graysoft text-[11px] font-medium capitalize">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {finalScore.map((item: any, index: number) => {
              return (
                <tr
                  className={`flex h-[52px] items-center justify-between border-b border-graysoft/50 last:border-b-0 ${
                    index % 2 === 1 ? "bg-black/[0.03]" : ""
                  }`}
                >
                  <td className="flex flex-1 items-center justify-center">
                    <Meeple3D
                      color={item.color}
                      width="28px"
                      height="28px"
                    />
                  </td>
                  {options.map((option: ScoringOptionType) => {
                    if (Object.keys(item.points).includes(option.scorable)) {
                      return (
                        <td className="flex flex-1 items-center justify-center">
                          {item.points[option.scorable]}
                        </td>
                      );
                    } else
                      return (
                        <td className="flex flex-1 items-center justify-center">
                          0
                        </td>
                      );
                  })}
                  <td className="flex flex-1 items-center justify-center">
                    {item.total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="mx-[15px] text-sm font-bold">
      {mode === "gameInProgress" ? (
        <>
          <GameTable />
          <ScoreHistory />
        </>
      ) : (
        <>
          <FinalScore />
          <br />
          <FinalScreen score={score} scoringPlayers={scoringPlayers} />
        </>
      )}
    </div>
  );
};

export default Table;
