import { useEffect, useRef } from "react";
import TurnButton from "../TurnButton/TurnButton";
import CircularProgress from "../ProgressBar/CicularProgressBar";
import "./Timer.css";

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
  const timer: any = useRef(null);

  const progress =
    (parseTime(currentPlayer.time) * 100) / parseTime(initialTime);

  const handleStart = () => {
    timer.current = setInterval(() => {
      setPlayersInfo((prev: any) =>
        prev?.map((player: any) => {
          const parsedTime = parseTime(player.time);

          if (player.isPlayerTurn) {
            return {
              ...player,
              time: formatTime(parsedTime > 0 ? parsedTime - 1 : 0),
            };
          } else {
            return player;
          }
        })
      );
    }, 1000);
  };

  useEffect(() => {
    if (!isPaused) {
      if (currentPlayer.isPlayerTurn) {
        clearInterval(timer.current);
        handleStart();
      }
    } else {
      clearInterval(timer.current);
    }

    return () => clearInterval(timer.current);
  }, [currentPlayer.player, isPaused]);

  return (
    <div className="timer-container">
      <div className="timer-player">
        <CircularProgress strokeWidth={12} progress={progress}>
          <TurnButton
            currentPlayer={currentPlayer}
            onClick={handleChangePlayerTurn}
          />
        </CircularProgress>
      </div>

      <div className="timer-time">{currentPlayer.time}</div>
    </div>
  );
};

export default Timer;
