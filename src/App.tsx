import { useState } from "react";
import ScoreBoard from "./components/ScoreBoard/ScoreBorad";
import AnchorDrawer from "./components/Drawer/Drawer";
import Dialog from "./components/Dialog/Dialog";
import Player from "./types/playerType";
import Settings from "./components/SettingsScreen/Settings";
import InGameScreen from "./components/InGameScreen/InGameScreen";
import ScoreType from "./types/scoreType";
import "./App.css";

type TotalType = {
  playerId: number;
  points: number;
};

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [score, setScore] = useState<ScoreType[]>([]);
  const [totalPoints, setTotalPoints] = useState<TotalType[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [openScoringTable, setOpenScoringTable] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleTotalScore = (score: ScoreType[], players: Player[]) => {
    let totalArray: TotalType[] = players.map((item: Player) => {
      return { playerId: item.playerId, points: 0 };
    });

    totalArray = totalArray.map((itemTotal: TotalType) => {
      const points = score.filter((score: ScoreType) =>
        score.playersId.includes(itemTotal.playerId)
      );

      return {
        ...itemTotal,
        points: points.reduce(
          (acc: number, current: ScoreType) => acc + +current.points,
          itemTotal.points ? itemTotal.points : 0
        ),
      };
    });

    setTotalPoints(totalArray);
  };

  const handleSettings = (settings: Player[]) => {
    setPlayers([...settings]);
    setIsGameStarted(true);
  };

  const handleCloseScore = () => {
    setOpenScoringTable(false);
    handleTogglePause();
  };

  const handleScore = (score: ScoreType[]) => {
    setScore([...score]);
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleOpenScore = () => {
    setOpenScoringTable(true);
    handleTogglePause();
  };

  return (
    <div className="App">
      <Dialog
        open={openDialog}
        setOpen={setOpenDialog}
        setIsGameFinished={setIsGameFinished}
      />
      {!isGameStarted && <Settings handleSettings={handleSettings} />}
      {isGameStarted && (
        <InGameScreen
          players={players}
          handleOpenScore={handleOpenScore}
          totalPoints={totalPoints}
          initialTime={players[0].time}
          isPaused={isPaused}
          handleTogglePause={handleTogglePause}
        />
      )}
      {isGameStarted ? (
        <AnchorDrawer
          open={openScoringTable || isGameFinished}
          handleClose={handleCloseScore}
        >
          <ScoreBoard
            score={score}
            handleScore={handleScore}
            mode={isGameFinished ? "gameFinished" : "gameInProgress"}
            players={players}
            handleTotalScore={handleTotalScore}
          />
        </AnchorDrawer>
      ) : null}
    </div>
  );
}

export default App;
