import { useCallback, useState } from "react";
import Player from "../../types/playerType";
import Chip from "../Chips/Chip";
import Timer from "../Timer/Timer";
import ActionButton from "../ActionButton/ActionButton";
import GameConfig from "../../types/gameConfigType";

type totalPointsType = {
  playerId: number;
  points: number;
};

type InGameScreenProps = {
  players: Player[];
  totalPoints: totalPointsType[];
  initialTime: string;
  isPaused: boolean;
  handleTogglePause: () => void;
  handleOpenScore: () => void;
  onFinish: () => void;
  /** Selected expansions/pieces — reserved for upcoming in-game features. */
  gameConfig?: GameConfig | null;
};

const InGameScreen = ({
  players,
  totalPoints,
  initialTime,
  handleOpenScore,
  isPaused,
  handleTogglePause,
  onFinish,
}: InGameScreenProps) => {
  const [playersInfo, setPlayersInfo] = useState<Player[]>(players);

  const playerTurn = playersInfo.filter(
    (player: Player) => player.isPlayerTurn
  )[0];

  const handleParticularScore = (playerId: number) => {
    const score = totalPoints.filter(
      (item: totalPointsType) => item.playerId === playerId
    )[0]?.points;

    return score ?? 0;
  };

  const handleChangeTurn = useCallback(() => {
    if (isPaused) return;
    const length = playersInfo.length;
    const turn = playerTurn.playerId;

    setPlayersInfo((prev: Player[]) =>
      prev?.map((item: Player) => {
        if (turn === item.playerId) {
          return { ...item, isPlayerTurn: false };
        } else if (turn < length && item.playerId === turn + 1) {
          return { ...item, isPlayerTurn: true };
        } else if (turn === length && item.playerId === 1) {
          return { ...item, isPlayerTurn: true };
        } else {
          return item;
        }
      })
    );
  }, [isPaused, playerTurn.playerId, playersInfo.length]);

  return (
    <div className="mx-[15px] flex h-full w-full flex-col items-center justify-between">
      <div className="mt-20 flex w-full justify-center gap-[10px]">
        {playersInfo.map((player: Player) => (
          <Chip
            key={player.playerId}
            color={player.color}
            name={player.name}
            time={player.time}
            score={handleParticularScore(player.playerId)}
          />
        ))}
      </div>
      <div>
        <Timer
          key={playerTurn.playerId}
          currentPlayer={playerTurn}
          setPlayersInfo={setPlayersInfo}
          handleChangePlayerTurn={handleChangeTurn}
          initialTime={initialTime}
          isPaused={isPaused}
        />
      </div>
      <div className="mb-10 flex flex-col items-center gap-4">
        <div className="flex gap-[100px]">
          <ActionButton
            variant="pause"
            action={isPaused}
            onClick={handleTogglePause}
            width="30px"
          />
          <ActionButton variant="score" onClick={handleOpenScore} width="30px" />
        </div>
        <button
          type="button"
          onClick={onFinish}
          className="rounded-full border border-secondary px-4 py-1.5 text-xs font-semibold text-accent"
        >
          Terminar juego
        </button>
      </div>
    </div>
  );
};

export default InGameScreen;
