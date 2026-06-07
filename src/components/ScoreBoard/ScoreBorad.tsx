import { useCallback, useMemo, useState } from "react";
import ScoringPlayer from "../ScoringPlayer/ScoringPlayer";
import ScoringOptions from "../ScoringOption/ScoringOption";
import ScoreCalculator from "../ScoreCalculator/ScoreCalculator";
import ScoringPoints from "../ScoringPoints/ScoringPoints";
import QuickPresets from "../QuickPresets/QuickPresets";
import Podium from "../Podium/Podium";
import Table from "../Table/Table";
//Types
import ScoringOptionType from "../../types/scoringOptionType";
import Player from "../../types/playerType";
import ScoreType from "../../types/scoreType";
import ScoringType from "../../types/scoringPlayerType";
import GameConfig from "../../types/gameConfigType";
import { sound } from "../../utils/sound";

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
  config: GameConfig | null | undefined,
  includeField = true
): ScoringOptionType[] => {
  const scorables: Scorable[] = [...BASE_SCORABLES];
  if (isPieceEnabled(config, "abbot")) scorables.push("garden"); // Abad puntúa jardines
  // El campo solo se puntúa al final de la partida.
  if (includeField && isPieceEnabled(config, "farmer")) scorables.push("field");
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
  onDeleteScore?: (index: number) => void;
  onShowResults?: () => void;
  onCancelEndgame?: () => void;
  currentPlayerId?: number;
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
  onDeleteScore,
  onShowResults,
  onCancelEndgame,
  currentPlayerId,
}: ScoreBoardProps) => {
  initialPlayers = players.map((player: Player) => {
    return { ...player, selected: player.playerId === currentPlayerId };
  });

  const isEndgame = mode === "endgame";
  const tableOptions = useMemo(() => buildOptions(gameConfig, true), [
    gameConfig,
  ]);
  const options = useMemo(
    () => buildOptions(gameConfig, isEndgame),
    [gameConfig, isEndgame]
  );

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

  const selectedScorable =
    scoringOptions.find((option) => option.selected)?.scorable ?? "";

  const innsCathedralsEnabled = !!gameConfig?.expansions?.some(
    (expansion) => expansion.id === "inns-cathedrals" && expansion.enabled
  );

  const advancedScoring = !!gameConfig?.advancedScoring;

  const hasPlayerSelected = scoringPlayers.some((player) => player.selected);

  const handleTotalChange = useCallback(
    (total: number) => setScoringPoints(total ? String(total) : ""),
    []
  );

  const commitScore = (points: number) => {
    const selectedPlayerIds = scoringPlayers
      .filter((player: ScoringType) => player.selected)
      .map((player: ScoringType) => player.playerId);

    if (!selectedPlayerIds.length || !selectedScorable || !points) return;

    const newScore = [
      ...score,
      {
        playersId: selectedPlayerIds,
        option: selectedScorable,
        points: String(points),
      },
    ];

    sound.score();
    handleScore(newScore);
    setScoringPoints("");
    setScoringOptions(options);
    setScoringPlayers(initialPlayers);
    handleTotalScore(newScore, players);
  };

  const handleSummit = () => {
    if (!readyToScore()) return;
    commitScore(Number(scoringPoints));
  };

  return (
    <div className="flex h-full w-full max-w-[100vw] flex-col gap-5 overflow-y-auto overflow-x-hidden rounded-t-[20px] bg-white py-5 text-black">
      <div className="mx-[15px] mb-5 mt-10 text-[30px] font-bold">
        {mode === "gameFinished"
          ? "Puntuación final"
          : isEndgame
          ? "Cierre de partida"
          : "Marcador"}
      </div>
      {mode !== "gameFinished" && (
        <>
          {isEndgame && (
            <div className="mx-[15px] rounded-[12px] bg-lightgray p-3 text-xs font-medium text-black">
              Cargá las <b>construcciones incompletas</b> (con seguidores aún en
              el tablero) y los <b>campos</b>. Cuando termines, tocá{" "}
              <b>Ver resultados</b>.
            </div>
          )}
          <ScoringPlayer
            scoringPlayers={scoringPlayers}
            selectPlayer={handlePlayerSelected}
          />

          {hasPlayerSelected ? (
            <>
              <ScoringOptions
                options={scoringOptions}
                selectOption={handleOptionSelected}
              />
              <div className="mx-[15px] flex flex-col gap-3">
                {advancedScoring ? (
                  <ScoreCalculator
                    key={selectedScorable || "none"}
                    scorable={selectedScorable}
                    innsCathedrals={innsCathedralsEnabled}
                    onTotalChange={handleTotalChange}
                    defaultCompleted={!isEndgame}
                  />
                ) : (
                  <>
                    <QuickPresets
                      scorable={selectedScorable}
                      onPick={(value) => commitScore(value)}
                    />
                    <ScoringPoints
                      points={scoringPoints}
                      setScoringPoints={setScoringPoints}
                    />
                  </>
                )}
                <div
                  className={`flex h-[50px] items-center justify-center whitespace-nowrap rounded-[10px] font-bold ${
                    readyToScore()
                      ? "bg-black/[0.785] text-white"
                      : "border-2 border-lightgray bg-transparent text-graysoft"
                  }`}
                  onClick={() => handleSummit()}
                >
                  Sumar puntos{scoringPoints ? ` (+${scoringPoints})` : ""}
                </div>
              </div>
            </>
          ) : (
            <div className="mx-[15px] rounded-[12px] bg-lightgray p-4 text-center text-sm font-medium text-graysoft">
              Elegí un jugador para puntuar.
            </div>
          )}
        </>
      )}
      {mode === "gameFinished" && <Podium players={players} score={score} />}

      <Table
        mode={mode === "gameFinished" ? "gameFinished" : "gameInProgress"}
        scoringPlayers={scoringPlayers}
        score={score}
        options={tableOptions}
        onDeleteScore={onDeleteScore}
      />

      {isEndgame && (
        <div className="mx-[15px] mb-2 flex flex-col gap-3">
          <button
            type="button"
            onClick={onShowResults}
            className="flex h-[52px] items-center justify-center rounded-[12px] bg-accent text-[18px] font-bold text-primary"
          >
            Ver resultados
          </button>
          <button
            type="button"
            onClick={onCancelEndgame}
            className="flex h-[52px] items-center justify-center rounded-[12px] border-2 border-secondary text-[16px] font-bold text-secondary"
          >
            Volver al juego
          </button>
        </div>
      )}

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
