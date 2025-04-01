import { useState } from "react";
import Timer from "./components/Timer/Timer";
import SelectPlayers from "./components/SelectPlayers/SelectPlayers";
import Chip from "./components/Chips/Chip";
import Pause from "./assets/Icons/Pause";
import Score from "./assets/Icons/Score";
import Play from "./assets/Icons/Play";
import ScoreTable from "./components/ScoreTable/ScoreTable";
import AnchorDrawer from "./components/Drawer/Drawer";
import Dialog from "./components/Dialog/Dialog";
import "./App.css";

interface playerInterface {
  player: number;
  color: string;
  time: string;
  isPlayerTurn: boolean;
}

const ChipsIndicators = ({ players }: any) => {
  return (
    <div className="chips-container" style={{ height: "100px" }}>
      {players
        .filter((player: any) => !player.isPlayerTurn)
        .map((player: any) => (
          <Chip color={player.color} time={player.time} />
        ))}
    </div>
  );
};

const Actions = ({ isPaused, setPause, handleOpenScoringTable }: any) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "100px" }}
    >
      <div>
        <div onClick={() => setPause((prev: boolean) => !prev)}>
          {isPaused ? (
            <Play color="#00c9aa" width="30px" height="30px" />
          ) : (
            <Pause color="#00c9aa" width="30px" height="30px" />
          )}
        </div>
        <div>{isPaused ? "Continue" : "Pause"}</div>
      </div>

      <div onClick={handleOpenScoringTable(true)}>
        <div>
          <Score color="#00c9aa" width="30px" height="30px" />
        </div>
        <div>Score</div>
      </div>
    </div>
  );
};

function App() {
  const [players, setPlayers] = useState<playerInterface[]>([]);
  const [arePlayersSelected, setArePlayersSelected] = useState(false);
  const [inputTime, setInputTime] = useState("10:00");
  const [initialTime, setInitialTime] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [openScoringTable, setOpenScoringTable] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  console.log("drawer", openScoringTable);

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

  const handleOpenScoringTable =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenScoringTable(open);
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
            <ChipsIndicators players={players} />

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
              <Actions
                isPaused={isPaused}
                setPause={setIsPaused}
                handleOpenScoringTable={handleOpenScoringTable}
              />
            </div>
          </div>
        )}
      </div>
      {isGameStarted ? (
        <AnchorDrawer
          open={openScoringTable || isGameFinished}
          handleClose={handleOpenScoringTable}
        >
          <ScoreTable
            mode={isGameFinished ? "gameFinished" : "gameInProgress"}
            players={players}
          />
        </AnchorDrawer>
      ) : null}
    </div>
  );
}

export default App;
