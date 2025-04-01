import Meeple from "../../assets/Icons/Meeple";
import "./TurnButton.css";

const TurnButton = ({ currentPlayer, onClick }: any) => {
  return (
    <div className="turn-button-container" onClick={() => onClick()}>
      <Meeple color={currentPlayer.color} width={"100px"} height={"100px"} />
    </div>
  );
};

export default TurnButton;
