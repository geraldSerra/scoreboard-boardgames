import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard/ScoreBorad";
import AnchorDrawer from "./components/Drawer/Drawer";
import Dialog from "./components/Dialog/Dialog";
import Player from "./types/playerType";
import Settings from "./components/SettingsScreen/Settings";
import InGameScreen from "./components/InGameScreen/InGameScreen";
import ScoreType from "./types/scoreType";
import GameConfig from "./types/gameConfigType";
import RulesHelp from "./components/RulesHelp/RulesHelp";
import SoundToggle from "./components/SoundToggle/SoundToggle";
import { unlockAudio } from "./utils/sound";

type TotalType = {
  playerId: number;
  points: number;
};

const STORAGE_KEY = "cc-scoreboard-v1";

const loadSaved = (): any => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

function App() {
  const [saved] = useState(loadSaved);
  const [players, setPlayers] = useState<Player[]>(saved?.players ?? []);
  const [playersInfo, setPlayersInfo] = useState<Player[]>(
    saved?.playersInfo ?? []
  );
  const [score, setScore] = useState<ScoreType[]>(saved?.score ?? []);
  const [totalPoints, setTotalPoints] = useState<TotalType[]>(
    saved?.totalPoints ?? []
  );
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(
    saved?.gameConfig ?? null
  );
  const [isGameStarted, setIsGameStarted] = useState<boolean>(
    saved?.isGameStarted ?? false
  );
  const [isGameFinished, setIsGameFinished] = useState<boolean>(
    saved?.isGameFinished ?? false
  );
  const [isEndgameScoring, setIsEndgameScoring] = useState<boolean>(
    saved?.isEndgameScoring ?? false
  );
  const [openScoringTable, setOpenScoringTable] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isPaused, setIsPaused] = useState<boolean>(saved?.isPaused ?? false);
  const [gameKey, setGameKey] = useState(0);

  // Persist game + last config so a refresh/close mid-game can resume.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          players,
          playersInfo,
          score,
          totalPoints,
          gameConfig,
          isGameStarted,
          isGameFinished,
          isEndgameScoring,
          isPaused,
        })
      );
    } catch {
      /* storage unavailable — ignore */
    }
  }, [
    players,
    playersInfo,
    score,
    totalPoints,
    gameConfig,
    isGameStarted,
    isGameFinished,
    isEndgameScoring,
    isPaused,
  ]);

  // Unlock the audio context on the first user gesture (autoplay policy).
  useEffect(() => {
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

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
    setPlayersInfo(settings.map((p) => ({ ...p })));
    setGameConfig(config);
    setScore([]);
    setTotalPoints([]);
    setIsGameFinished(false);
    setIsEndgameScoring(false);
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

  const handleDeleteScore = (index: number) => {
    const newScore = score.filter((_, i) => i !== index);
    setScore(newScore);
    handleTotalScore(newScore, players);
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
    setIsEndgameScoring(true);
    setOpenDialog(false);
  };

  const handleShowResults = () => {
    setIsEndgameScoring(false);
    setIsGameFinished(true);
  };

  const handleCancelEndgame = () => {
    setIsEndgameScoring(false);
    setIsPaused(false);
  };

  const handleRematch = () => {
    setPlayersInfo(players.map((p) => ({ ...p })));
    setScore([]);
    setTotalPoints([]);
    setIsGameFinished(false);
    setIsEndgameScoring(false);
    setOpenScoringTable(false);
    setIsPaused(false);
    setGameKey((k) => k + 1);
  };

  const handleReconfigure = () => {
    setScore([]);
    setTotalPoints([]);
    setIsGameFinished(false);
    setIsEndgameScoring(false);
    setOpenScoringTable(false);
    setIsPaused(false);
    setIsGameStarted(false);
  };

  const currentPlayerId = playersInfo.find((p) => p.isPlayerTurn)?.playerId;

  const initialConfig = players.length
    ? {
        quantity: players.length,
        players: players.map((p) => ({
          playerId: p.playerId,
          name: p.name,
          color: p.color,
        })),
        time: parseInt(players[0].time, 10) || 15,
        timerEnabled: players[0].time !== "",
        expansions: gameConfig?.expansions,
        advancedScoring: gameConfig?.advancedScoring ?? false,
      }
    : undefined;

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-primary text-whitesoft">
      <RulesHelp />
      <SoundToggle />
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
          playersInfo={playersInfo}
          setPlayersInfo={setPlayersInfo}
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
          open={openScoringTable || isEndgameScoring || isGameFinished}
          handleClose={handleCloseScore}
          hideClose={isEndgameScoring || isGameFinished}
        >
          <ScoreBoard
            key={`${gameKey}-${
              isGameFinished ? "f" : isEndgameScoring ? "e" : "p"
            }-${currentPlayerId}`}
            score={score}
            handleScore={handleScore}
            currentPlayerId={currentPlayerId}
            mode={
              isGameFinished
                ? "gameFinished"
                : isEndgameScoring
                ? "endgame"
                : "gameInProgress"
            }
            players={players}
            handleTotalScore={handleTotalScore}
            gameConfig={gameConfig}
            onRematch={handleRematch}
            onReconfigure={handleReconfigure}
            onDeleteScore={handleDeleteScore}
            onShowResults={handleShowResults}
            onCancelEndgame={handleCancelEndgame}
          />
        </AnchorDrawer>
      ) : null}
    </div>
  );
}

export default App;
