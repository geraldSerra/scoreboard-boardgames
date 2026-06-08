import { useCallback } from "react";
import { Flag } from "lucide-react";
import Player from "../../types/playerType";
import Chip from "../Chips/Chip";
import Timer from "../Timer/Timer";
import Pause from "../../assets/Icons/Pause";
import Play from "../../assets/Icons/Play";
import Score from "../../assets/Icons/Score";
import GameConfig from "../../types/gameConfigType";
import useWakeLock from "../../hooks/useWakeLock";
import vibrate from "../../utils/haptics";
import { sound } from "../../utils/sound";
import getColor from "../../utils/getColor";

type totalPointsType = {
  playerId: number;
  points: number;
};

const NAVY: [number, number, number] = [11, 25, 44];

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/** Darkened tint of the player colour (mixed toward navy) for a readable background. */
const tintWithNavy = (hex: string, colorWeight: number) => {
  const [r, g, b] = hexToRgb(hex);
  const m = (c: number, i: number) =>
    Math.round(c * colorWeight + NAVY[i] * (1 - colorWeight));
  return `rgb(${m(r, 0)}, ${m(g, 1)}, ${m(b, 2)})`;
};

type InGameScreenProps = {
  playersInfo: Player[];
  setPlayersInfo: (updater: Player[] | ((prev: Player[]) => Player[])) => void;
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
  playersInfo,
  setPlayersInfo,
  totalPoints,
  initialTime,
  handleOpenScore,
  isPaused,
  handleTogglePause,
  onFinish,
}: InGameScreenProps) => {
  useWakeLock(true);

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
    vibrate(30);
    sound.turn();
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

  const turnColor =
    playerTurn?.color === "black"
      ? "#7a8aa0"
      : getColor(playerTurn?.color) || "#1f4068";
  const turnBase = tintWithNavy(turnColor, 0.35);

  const maxScore = Math.max(
    0,
    ...playersInfo.map((p: Player) => handleParticularScore(p.playerId))
  );

  return (
    <>
      <div
        className="turn-bg fixed inset-0 z-0"
        style={{
          backgroundColor: turnBase,
          backgroundImage: `radial-gradient(circle at 25% 15%, ${turnColor}73, transparent 58%), radial-gradient(circle at 80% 88%, ${turnColor}40, transparent 58%)`,
        }}
      />
      <div className="relative z-10 mx-[15px] flex h-full w-full flex-col items-center justify-between">
        <div className="mt-12 flex w-full flex-col gap-2">
        {playersInfo.map((player: Player) => (
          <Chip
            key={player.playerId}
            color={player.color}
            name={player.name}
            time={player.time}
            initialTime={initialTime}
            score={handleParticularScore(player.playerId)}
            isCurrent={player.isPlayerTurn}
            isLeader={
              handleParticularScore(player.playerId) === maxScore &&
              maxScore > 0
            }
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
      <div className="mb-10 flex w-full max-w-[420px] flex-col gap-3">
        <div className="flex w-full gap-3">
          <button
            type="button"
            onClick={handleTogglePause}
            className="flex h-[54px] flex-1 items-center justify-center gap-2 rounded-[14px] bg-white text-[17px] font-bold text-primary"
          >
            {isPaused ? (
              <Play color="#0b192c" width="24px" height="24px" />
            ) : (
              <Pause color="#0b192c" width="24px" height="24px" />
            )}
            {isPaused ? "Continuar" : "Pausar"}
          </button>

          <button
            type="button"
            onClick={handleOpenScore}
            className="flex h-[54px] flex-1 items-center justify-center gap-2 rounded-[14px] bg-accent text-[18px] font-bold text-primary"
          >
            <Score color="#0b192c" width="26px" height="26px" />
            Puntuar
          </button>
        </div>

        <button
          type="button"
          onClick={onFinish}
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-lightgray text-[17px] font-bold text-[#E72929]"
        >
          <Flag width="22px" height="22px" color="#E72929" />
          Terminar juego
        </button>
        </div>
      </div>
    </>
  );
};

export default InGameScreen;
