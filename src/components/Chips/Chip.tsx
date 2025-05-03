import Meeple from "../../assets/Icons/Meeple";
import getColor from "../../utils/getColor";
import styles from "./Chip.module.css";

type ChipProps = {
  color: string;
  time: string;
  score: number;
};

const Chip = ({ color, time, score = 0 }: ChipProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.points}>
        <div className={styles.icon}>
          <Meeple color={getColor(color)} width={"20px"} height={"20px"} />
        </div>
        <div className={styles.score}>{score}</div>
      </div>

      <div className={styles.time}>{time}</div>
    </div>
  );
};

export default Chip;
