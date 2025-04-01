import Meeple from "../../assets/Icons/Meeple";
import "./Chip.css"

const Chip = ({ color, time }: { color: string; time: string }) => {
  return (
    <div className="chip-container">
      <div className="chip-icon">
        <Meeple color={color} width={"20px"} height={"20px"} />
      </div>
      <div className="chip-icon-time">{time}</div>
    </div>
  );
};

export default Chip;
