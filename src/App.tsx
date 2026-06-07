import { useState } from "react";
import ScoreBoard from "./components/ScoreBoard/ScoreBorad";
import AnchorDrawer from "./components/Drawer/Drawer";
import Dialog from "./components/Dialog/Dialog";
import Player from "./types/playerType";
import Settings from "./components/SettingsScreen/Settings";
import InGameScreen from "./components/InGameScreen/InGameScreen";
import ScoreType from "./types/scoreType";
import GameConfig from "./types/gameConfigType";

type TotalType = {
  playerId: number;
  points: number;
};

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [score, setScore] = useState<ScoreType[]>([]);
  const [totalPoints, setTotalPoints] = useState<TotalType[]>([]);
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [openScoringTable, setOpenScoringTable] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameKey, setGameKey] = useState(0);

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

  const handleSettings = (settings: Player[], config: GameConfig) => {
    setPlayers([...settings]);
    setGameConfig(config);
    setScore([]);
    setTotalPoints([]);
    setIsGameFinished(false);
    setIsPaused(false);
    setGameKey((k) => k + 1);
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

  const handleConfirmFinish = () => {
    setIsPaused(true);
    setIsGameFinished(true);
    setOpenDialog(false);
  };

  const handleRematch = () => {
    setScore([]);
    setTotalPoints([]);
    setIsGameFinished(false);
    setOpenScoringTable(false);
    setIsPaused(false);
    setGameKey((k) => k + 1);
  };

  const handleReconfigure = () => {
    setScore([]);
    setTotalPoints([]);
    setIsGameFinished(false);
    setOpenScoringTable(false);
    setIsPaused(false);
    setIsGameStarted(false);
  };

  const initialConfig = players.length
    ? {
        quantity: players.length,
        players: players.map((p) => ({
          playerId: p.playerId,
          name: p.name,
          color: p.color,
        })),
        time: parseInt(players[0].time, 10) || 15,
        expansions: gameConfig?.expansions,
      }
    : undefined;

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-primary text-whitesoft">
      <Dialog
        open={openDialog}
        title="¿Terminar la partida?"
        confirmLabel="Terminar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmFinish}
        onCancel={() => setOpenDialog(false)}
      />
      {!isGameStarted && (
        <Settings handleSettings={handleSettings} initialConfig={initialConfig} />
      )}
      {isGameStarted && (
        <InGameScreen
          key={gameKey}
          players={players}
          handleOpenScore={handleOpenScore}
          totalPoints={totalPoints}
          initialTime={players[0].time}
          isPaused={isPaused}
          handleTogglePause={handleTogglePause}
          onFinish={() => setOpenDialog(true)}
          gameConfig={gameConfig}
        />
      )}
      {isGameStarted ? (
        <AnchorDrawer
          open={openScoringTable || isGameFinished}
          handleClose={handleCloseScore}
          hideClose={isGameFinished}
        >
          <ScoreBoard
            key={gameKey}
            score={score}
            handleScore={handleScore}
            mode={isGameFinished ? "gameFinished" : "gameInProgress"}
            players={players}
            handleTotalScore={handleTotalScore}
            gameConfig={gameConfig}
            onRematch={handleRematch}
            onReconfigure={handleReconfigure}
          />
        </AnchorDrawer>
      ) : null}
    </div>
  );
}

export default App;
