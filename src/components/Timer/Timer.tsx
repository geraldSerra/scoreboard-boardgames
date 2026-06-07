import { useEffect } from "react";
import TurnButton from "../TurnButton/TurnButton";
import CircularProgress from "../ProgressBar/CicularProgressBar";

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
  const progress =
    (parseTime(currentPlayer.time) * 100) / parseTime(initialTime);

  useEffect(() => {
    if (isPaused || !currentPlayer.isPlayerTurn) return;

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
  }, [isPaused, currentPlayer.isPlayerTurn, setPlayersInfo]);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="max-w-[280px] truncate text-[22px] font-bold">
        {currentPlayer.name}
      </div>
      <div className="flex justify-center">
        <CircularProgress strokeWidth={12} progress={progress}>
          <TurnButton
            color={currentPlayer.color}
            onClick={handleChangePlayerTurn}
          />
        </CircularProgress>
      </div>

      <div className="text-[70px]">{currentPlayer.time}</div>
    </div>
  );
};

export default Timer;
