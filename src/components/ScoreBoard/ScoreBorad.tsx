import { useMemo, useState } from "react";
import ScoringPlayer from "../ScoringPlayer/ScoringPlayer";
import ScoringOptions from "../ScoringOption/ScoringOption";
import ScoringPoints from "../ScoringPoints/ScoringPoints";
import Table from "../Table/Table";
//Types
import ScoringOptionType from "../../types/scoringOptionType";
import Player from "../../types/playerType";
import ScoreType from "../../types/scoreType";
import ScoringType from "../../types/scoringPlayerType";
import GameConfig from "../../types/gameConfigType";

type Scorable = ScoringOptionType["scorable"];

const BASE_SCORABLES: Scorable[] = ["city", "road", "monastery"];

const isPieceEnabled = (
  config: GameConfig | null | undefined,
  pieceId: string
) =>
  !!config?.expansions?.some(
    (expansion) =>
      expansion.enabled &&
      expansion.pieces.some((piece) => piece.id === pieceId && piece.enabled)
  );

const buildOptions = (
  config: GameConfig | null | undefined
): ScoringOptionType[] => {
  const scorables: Scorable[] = [...BASE_SCORABLES];
  if (isPieceEnabled(config, "abbot")) scorables.push("garden"); // Abad puntúa jardines
  if (isPieceEnabled(config, "farmer")) scorables.push("field"); // Campesino puntúa campos
  return scorables.map((scorable) => ({ scorable, selected: false }));
};

let initialPlayers: ScoringType[] = [];

type ScoreBoardProps = {
  mode: string;
  players: Player[];
  score: ScoreType[];
  handleScore: (score: ScoreType[]) => void;
  handleTotalScore: (score: ScoreType[], players: Player[]) => void;
  gameConfig?: GameConfig | null;
  onRematch?: () => void;
  onReconfigure?: () => void;
};

const ScoreBoard = ({
  mode,
  players,
  score,
  handleScore,
  handleTotalScore,
  gameConfig,
  onRematch,
  onReconfigure,
}: ScoreBoardProps) => {
  initialPlayers = players.map((player: Player) => {
    return { ...player, selected: false };
  });

  const options = useMemo(() => buildOptions(gameConfig), [gameConfig]);

  const [scoringPlayers, setScoringPlayers] =
    useState<ScoringType[]>(initialPlayers);
  const [scoringPoints, setScoringPoints] = useState<string>("");
  const [scoringOptions, setScoringOptions] =
    useState<ScoringOptionType[]>(options);

  const handlePlayerSelected = (selectedPlayer: ScoringType) => {
    setScoringPlayers((prev: ScoringType[]) => {
      return prev.map((item: ScoringType) => {
        if (item.playerId === selectedPlayer.playerId) {
          return { ...item, selected: !item.selected };
        } else return item;
      });
    });
  };

  const handleOptionSelected = (selectedOption: string) => {
    setScoringOptions((prev: ScoringOptionType[]) =>
      prev.map((option: ScoringOptionType) => {
        if (selectedOption === option.scorable) {
          return { ...option, selected: true };
        } else return { ...option, selected: false };
      })
    );
  };

  const readyToScore = () => {
    return (
      scoringPlayers.filter((player) => player.selected).length &&
      scoringPoints &&
      scoringOptions.filter((option) => option.selected).length
    );
  };

  const handleSummit = () => {
    if (!readyToScore()) return;

    const newScore = [
      ...score,
      {
        playersId: scoringPlayers
          .filter((player: ScoringType) => player.selected)
          .map((player: ScoringType) => player.playerId),
        option: scoringOptions.filter(
          (option: ScoringOptionType) => option.selected
        )[0].scorable,
        points: scoringPoints,
      },
    ];

    handleScore(newScore);
    setScoringPoints("");
    setScoringOptions(options);
    setScoringPlayers(initialPlayers);
    handleTotalScore(newScore, players);
  };

  return (
    <div className="flex h-full w-full max-w-[100vw] flex-col gap-5 overflow-y-auto overflow-x-hidden rounded-t-[20px] bg-white py-5 text-black">
      <div className="mx-[15px] mb-5 mt-10 text-[30px] font-bold">
        {mode === "gameInProgress" ? "Scoreboard" : "Final Score"}
      </div>
      {mode === "gameInProgress" && (
        <>
          <ScoringPlayer
            scoringPlayers={scoringPlayers}
            selectPlayer={handlePlayerSelected}
          />
          <ScoringOptions
            options={scoringOptions}
            selectOption={handleOptionSelected}
          />
          <div className="mx-[15px] flex flex-row gap-5">
            <ScoringPoints
              points={scoringPoints}
              setScoringPoints={setScoringPoints}
            />
            <div
              className={`flex h-[50px] w-full items-center justify-center rounded-[10px] font-bold ${
                readyToScore()
                  ? "bg-black/[0.785] text-white"
                  : "border-2 border-lightgray bg-transparent text-graysoft"
              }`}
              onClick={() => handleSummit()}
            >
              Add points
            </div>
          </div>
        </>
      )}
      <Table
        mode={mode}
        scoringPlayers={scoringPlayers}
        score={score}
        options={options}
      />

      {mode === "gameFinished" && (
        <div className="mx-[15px] mb-2 mt-2 flex flex-col gap-3">
          <button
            type="button"
            onClick={onRematch}
            className="flex h-[52px] items-center justify-center rounded-[12px] bg-accent text-[18px] font-bold text-primary"
          >
            Revancha
          </button>
          <button
            type="button"
            onClick={onReconfigure}
            className="flex h-[52px] items-center justify-center rounded-[12px] border-2 border-secondary text-[16px] font-bold text-secondary"
          >
            Cambiar configuración
          </button>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
