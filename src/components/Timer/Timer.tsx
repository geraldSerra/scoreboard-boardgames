import { useState, useEffect, useRef } from "react";
import TurnButton from "../TurnButton/TurnButton";
import "./Timer.css";
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

const CountdownTimer = ({
  currentPlayer,
  initialTime,
  setPlayers,
  handleChangePlayerTurn,
  isPaused,
}: any) => {
  const timer: any = useRef(null);

  const progress =
    (parseTime(currentPlayer.time) * 100) / parseTime(initialTime);

  const handleStart = () => {
    timer.current = setInterval(() => {
      setPlayers((prev: any) =>
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

    console.log("new timer", timer.current);
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
        <CircularProgress progress={progress}>
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

export default CountdownTimer;
