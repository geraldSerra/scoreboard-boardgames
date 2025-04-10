import { useState } from "react";
import ScoringPlayer from "../ScoringPlayer/ScoringPlayer";
import ScoringOptions from "../ScoringOption/ScoringOption";
import ScoringPoints from "../ScoringPoints/ScoringPoints";
import Table from "../Table/Table";
//Types
import ScoringOptionType from "../../types/scoringOptionType";
//CSS
import "./ScoreBoard.css";

type ScoreType = {
  option: string;
  playersId: number[];
  points: string;
};

type ScoringPlayerType = {
  color: "red" | "blue" | "green" | "yellow" | "black" | "pink";
  isPlayerTurn: boolean;
  player: 1 | 2 | 3 | 4 | 5 | 6;
  selected: boolean;
  time: string;
};

const options: ScoringOptionType[] = [
  { scorable: "city", selected: false },
  { scorable: "road", selected: false },
  { scorable: "monastery", selected: false },
  { scorable: "garden", selected: false },
  { scorable: "field", selected: false },
];

let initialPlayers: any = [];

const ScoreBoard = ({ mode, players }: any) => {
  initialPlayers = players.map((player: any) => {
    return { ...player, selected: false };
  });

  const [score, setScore] = useState<ScoreType[]>([]);
  const [scoringPlayers, setScoringPlayers] =
    useState<ScoringPlayerType[]>(initialPlayers);
  const [scoringPoints, setScoringPoints] = useState<string>("");
  const [scoringOptions, setScoringOptions] =
    useState<ScoringOptionType[]>(options);

  const handlePlayerSelected = (selectedPlayer: any) => {
    setScoringPlayers((prev: any) => {
      return prev.map((item: any) => {
        if (item.player === selectedPlayer.player) {
          return { ...item, selected: !item.selected };
        } else return item;
      });
    });
  };

  const handleOptionSelected = (selectedOption: string) => {
    setScoringOptions((prev: ScoringOptionType[]) =>
      prev.map((option: ScoringOptionType) => {
        if (selectedOption === option.scorable) {
          return { ...option, selected: true };
        } else return { ...option, selected: false };
      })
    );
  };

  const readyToScore = () => {
    return (
      scoringPlayers.filter((player) => player.selected).length &&
      scoringPoints &&
      scoringOptions.filter((option) => option.selected).length
    );
  };

  const handleSummit = () => {
    if (!readyToScore()) return;

    setScore([
      ...score,
      {
        playersId: scoringPlayers
          .filter((player: any) => player.selected)
          .map((player: any) => player.player),
        option: scoringOptions.filter((option: any) => option.selected)[0]
          .scorable,
        points: scoringPoints,
      },
    ]);
    setScoringPoints("");
    setScoringOptions(options);
    setScoringPlayers(initialPlayers);
  };

  return (
    <div className="scoring-container">
      <div className="scoring-title">
        {mode === "gameInProgress" ? "Scoreboard" : "Final Score"}
      </div>
      {mode === "gameInProgress" && (
        <>
          <ScoringPlayer
            players={scoringPlayers}
            selectPlayer={handlePlayerSelected}
          />
          <ScoringOptions
            options={scoringOptions}
            selectOption={handleOptionSelected}
          />
          <div className="points-submit">
            <ScoringPoints
              points={scoringPoints}
              setScoringPoints={setScoringPoints}
            />
            <div
              className={`submit ${readyToScore() ? "" : "disabled"}`}
              onClick={() => handleSummit()}
            >
              Add points
            </div>
          </div>
        </>
      )}
      <Table
        mode={mode}
        scoringPlayers={scoringPlayers}
        score={score}
        options={options}
      />
    </div>
  );
};

export default ScoreBoard;
