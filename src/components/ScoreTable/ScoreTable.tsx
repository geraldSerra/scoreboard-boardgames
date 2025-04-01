import { useState } from "react";
import ScoringPlayer from "../ScoringPlayer/ScoringPlayer";
import ScoringOptions from "../ScoringOption/ScoringOption";
import ScoringPoints from "../ScoringPoints/ScoringPoints";
import Table from "../Table/Table";
import "./Scoring.css";

const options = [
  { name: "city", selected: false },
  { name: "road", selected: false },
  { name: "monastery", selected: false },
  { name: "garden", selected: false },
  { name: "field", selected: false },
];

let inTimeScore = { player: "", option: "", points: "" };
let initialPlayers: any = [];

const ScoreTable = ({ mode, players }: any) => {
  initialPlayers = players.map((player: any) => {
    return { ...player, selected: false };
  });

  const [score, setScore] = useState<any>([]);
  const [scoringPlayers, setScoringPlayers] = useState(initialPlayers);
  const [scoringPoints, setScoringPoints] = useState<string>();
  const [scoringOptions, setScoringOptions] = useState(options);

  const addPlayer = (player: string) => {
    inTimeScore.player = player;
  };

  const handleAddOption = (option: string) => {
    inTimeScore.option = option;
  };

  const handleSummit = () => {
    setScore([
      ...score,
      {
        playersId: scoringPlayers
          .filter((player: any) => player.selected)
          .map((player: any) => player.player),
        option: scoringOptions.filter((option: any) => option.selected)[0].name,
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
            scoringPlayers={scoringPlayers}
            addPlayer={addPlayer}
            setScoringPlayers={setScoringPlayers}
          />
          <ScoringOptions
            scoringOptions={scoringOptions}
            setScoringOptions={setScoringOptions}
            handleAddOption={handleAddOption}
          />
          <ScoringPoints
            points={scoringPoints}
            setScoringPoints={setScoringPoints}
            handleSummit={handleSummit}
          />
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

export default ScoreTable;
