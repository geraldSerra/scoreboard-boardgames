import { useState } from "react";
import ScoringPlayer from "../ScoringPlayer/ScoringPlayer";
import ScoringOptions from "../ScoringOption/ScoringOption";
import ScoringPoints from "../ScoringPoints/ScoringPoints";
import Table from "../Table/Table";
//Types
import ScoringOptionType from "../../types/scoringOptionType";
//CSS
import "./ScoreBoard.css";
import Player from "../../types/playerType";
import ScoreType from "../../types/scoreType";
import ScoringType from "../../types/scoringPlayerType";

const options: ScoringOptionType[] = [
  { scorable: "city", selected: false },
  { scorable: "road", selected: false },
  { scorable: "monastery", selected: false },
  { scorable: "garden", selected: false },
  { scorable: "field", selected: false },
];

let initialPlayers: ScoringType[] = [];

type ScoreBoardProps = {
  mode: string;
  players: Player[];
  score: ScoreType[];
  handleScore: (score: ScoreType[]) => void;
  handleTotalScore: (score: ScoreType[], players: Player[]) => void;
};

const ScoreBoard = ({
  mode,
  players,
  score,
  handleScore,
  handleTotalScore,
}: ScoreBoardProps) => {
  initialPlayers = players.map((player: Player) => {
    return { ...player, selected: false };
  });

  const [scoringPlayers, setScoringPlayers] =
    useState<ScoringType[]>(initialPlayers);
  const [scoringPoints, setScoringPoints] = useState<string>("");
  const [scoringOptions, setScoringOptions] =
    useState<ScoringOptionType[]>(options);

  const handlePlayerSelected = (selectedPlayer: ScoringType) => {
    setScoringPlayers((prev: ScoringType[]) => {
      return prev.map((item: ScoringType) => {
        if (item.playerId === selectedPlayer.playerId) {
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

    const newScore = [
      ...score,
      {
        playersId: scoringPlayers
          .filter((player: ScoringType) => player.selected)
          .map((player: ScoringType) => player.playerId),
        option: scoringOptions.filter(
          (option: ScoringOptionType) => option.selected
        )[0].scorable,
        points: scoringPoints,
      },
    ];

    handleScore(newScore);
    setScoringPoints("");
    setScoringOptions(options);
    setScoringPlayers(initialPlayers);
    handleTotalScore(newScore, players);
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
