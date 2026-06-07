import { useEffect } from "react";
import TurnButton from "../TurnButton/TurnButton";
import CircularProgress from "../ProgressBar/CicularProgressBar";
import vibrate from "../../utils/haptics";
import { sound } from "../../utils/sound";

const parseTime = (timeString: string) => {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const Timer = ({
  currentPlayer,
  initialTime,
  setPlayersInfo,
  handleChangePlayerTurn,
  isPaused,
}: any) => {
  const timed = !!initialTime && !!currentPlayer.time;
  const secondsLeft = timed ? parseTime(currentPlayer.time) : 0;
  const progress = timed ? (secondsLeft * 100) / parseTime(initialTime) : 100;
  const low = timed && secondsLeft <= 30;
  const timedOut = timed && secondsLeft === 0;

  useEffect(() => {
    if (timedOut) {
      vibrate([120, 60, 120]);
      sound.timeout();
    }
  }, [timedOut]);

  useEffect(() => {
    if (!timed || isPaused || !currentPlayer.isPlayerTurn) return;

    const id = setInterval(() => {
      setPlayersInfo((prev: any) =>
        prev?.map((player: any) => {
          if (!player.isPlayerTurn) return player;
          const parsedTime = parseTime(player.time);
          return {
            ...player,
            time: formatTime(parsedTime > 0 ? parsedTime - 1 : 0),
          };
        })
      );
    }, 1000);

    return () => clearInterval(id);
  }, [timed, isPaused, currentPlayer.isPlayerTurn, setPlayersInfo]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="max-w-[280px] truncate text-[22px] font-bold">
        {currentPlayer.name}
      </div>
      <div className="flex justify-center">
        {timed ? (
          <CircularProgress strokeWidth={12} progress={progress}>
            <TurnButton
              color={currentPlayer.color}
              onClick={handleChangePlayerTurn}
            />
          </CircularProgress>
        ) : (
          <TurnButton
            color={currentPlayer.color}
            onClick={handleChangePlayerTurn}
          />
        )}
      </div>

      {timed && (
        <div
          className={`text-[70px] leading-none ${
            low ? "text-red-500" : ""
          }`}
        >
          {currentPlayer.time}
        </div>
      )}

      <div className="text-xs font-medium text-gray-400">
        Tocá el meeple para pasar turno
      </div>
    </div>
  );
};

export default Timer;
