import { useState } from "react";
import Timer from "./components/Timer/Timer";
import SelectPlayers from "./components/SelectPlayers/SelectPlayers";
import Chip from "./components/Chips/Chip";
import ScoreBoard from "./components/ScoreBoard/ScoreBorad";
import AnchorDrawer from "./components/Drawer/Drawer";
import Dialog from "./components/Dialog/Dialog";
import Player from "./types/playerType";
import ActionButton from "./components/ActionButton/ActionButton";
import "./App.css";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [arePlayersSelected, setArePlayersSelected] = useState(false);
  const [inputTime, setInputTime] = useState("10:00");
  const [initialTime, setInitialTime] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [openScoringTable, setOpenScoringTable] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const addInitialTimeToPlayers = () => {
    setPlayers((prev) => {
      const newState: any = [];

      prev.forEach((player) => {
        newState.push({ ...player, time: initialTime });
      });

      return newState;
    });
  };

  const handleChangePlayerTurn = () => {
    if (!isPaused) {
      const playerTurn = players.filter((player) => player.isPlayerTurn)[0];

      setPlayers((prev: any) =>
        prev?.map((item: any) => {
          if (playerTurn.player === item.player) {
            return { ...item, isPlayerTurn: false };
          } else if (
            playerTurn.player < players.length &&
            item.player === playerTurn.player + 1
          ) {
            return { ...item, isPlayerTurn: true };
          } else if (
            playerTurn.player === players.length &&
            item.player === 1
          ) {
            return { ...item, isPlayerTurn: true };
          } else {
            return item;
          }
        })
      );
    }
  };

  const handlePause = () => {
    setIsPaused((prev) => !prev);
    console.log('PAUSE')
  };

  const handleOpenScore = () => {
    setOpenScoringTable(true);
  };

  const handleCloseScore = () => {
    setOpenScoringTable(false);
  };

  return (
    <div className="App">
      <Dialog
        open={openDialog}
        setOpen={setOpenDialog}
        setIsGameFinished={setIsGameFinished}
      />
      <div className="container">
        <SelectPlayers
          players={players}
          setPlayers={setPlayers}
          setArePlayersSelected={setArePlayersSelected}
        />
        {arePlayersSelected && !isGameStarted && (
          <div>
            <div className="players-selection-title">
              Set limit time for each player
            </div>
            <input
              type="text"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              placeholder="00:00"
            />
            <button onClick={() => setInitialTime(inputTime)}>Set</button>
          </div>
        )}

        {initialTime && !isGameStarted && (
          <h1
            onClick={() => {
              addInitialTimeToPlayers();
              setIsGameStarted(true);
            }}
          >
            START
          </h1>
        )}
        {isGameStarted && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <div className="chips-container" style={{ height: "100px" }}>
              {players
                .filter((player: any) => !player.isPlayerTurn)
                .map((player: any) => (
                  <Chip color={player.color} time={player.time} />
                ))}
            </div>

            <div style={{ height: "fit-content", margin: "20px 0" }}>
              Player {players.filter((player) => player.isPlayerTurn)[0].player}
              turn
            </div>
            <div className="timer" style={{ height: "100%", margin: "20px 0" }}>
              {players
                .filter((player) => player.isPlayerTurn)
                .map((currentPlayer) => (
                  <Timer
                    currentPlayer={currentPlayer}
                    setPlayers={setPlayers}
                    handleChangePlayerTurn={handleChangePlayerTurn}
                    initialTime={initialTime}
                    isPaused={isPaused}
                    setIsPaused={setIsPaused}
                  />
                ))}
            </div>
            <div onClick={() => setOpenDialog(true)} className="finish-game">
              Finish game?
            </div>
            <div style={{ height: "fit-content", margin: "20px 0" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "100px",
                }}
              >
                <ActionButton
                  variant="pause"
                  action={isPaused}
                  onClick={handlePause}
                  width="30px"
                />
                <ActionButton
                  variant="score"
                  onClick={handleOpenScore}
                  width="30px"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {isGameStarted ? (
        <AnchorDrawer
          open={openScoringTable || isGameFinished}
          handleClose={handleCloseScore}
        >
          <ScoreBoard
            mode={isGameFinished ? "gameFinished" : "gameInProgress"}
            players={players}
          />
        </AnchorDrawer>
      ) : null}
    </div>
  );
}

export default App;
