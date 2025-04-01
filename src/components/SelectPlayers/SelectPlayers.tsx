import { useState } from "react";
import "./SelectPlayers.css";
import Meeple from "../../assets/Icons/Meeple";

let colors = ["red", "blue", "yellow", "green", "black", "pink"];

const removedSelectedColor = (color: string) => {
  const index = colors.indexOf(color);
  if (index !== -1) {
    colors.splice(index, 1);
  }
};

const SelectPlayers = ({ players, setPlayers, setArePlayersSelected }: any) => {
  const [numOfPlayers, setNumOfPlayers] = useState(0);

  const PlayersNum = () => {
    return (
      <div className="select-number-of-players-container">
        <div className="players-selection-title">Select num of players</div>
        <div className="select-number-of-players">
          <div
            className="select-number-of-players-button"
            onClick={() => setNumOfPlayers(2)}
          >
            2
          </div>
          <div
            className="select-number-of-players-button"
            onClick={() => setNumOfPlayers(3)}
          >
            3
          </div>
          <div
            className="select-number-of-players-button"
            onClick={() => setNumOfPlayers(4)}
          >
            4
          </div>
          <div
            className="select-number-of-players-button"
            onClick={() => setNumOfPlayers(5)}
          >
            5
          </div>
          <div
            className="select-number-of-players-button"
            onClick={() => setNumOfPlayers(6)}
          >
            6
          </div>
        </div>
      </div>
    );
  };

  const PlayersColor = () => {
    const recursive = (playerturn = players.length + 1) => {
      if (playerturn <= numOfPlayers) {
        return (
          <div>
            <div className="players-selection-title">
              Player {playerturn} select your color
            </div>
            <div className="select-color-of-players">
              {colors.map((color) => (
                <div
                  onClick={() => {
                    setPlayers((prev: any) => [
                      ...prev,
                      {
                        player: playerturn,
                        color: color,
                        isPlayerTurn: playerturn === 1 ? true : false,
                      },
                    ]);
                    removedSelectedColor(color);
                    recursive(playerturn + 1);
                  }}
                >
                  <Meeple color={color} width={"40px"} height={"40px"} />
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        setArePlayersSelected(true);
        return <></>;
      }
    };

    return recursive();
  };

  return (
    <>
      {numOfPlayers === 0 && <PlayersNum />}
      {numOfPlayers > 0 && <PlayersColor />}
    </>
  );
};

export default SelectPlayers;
