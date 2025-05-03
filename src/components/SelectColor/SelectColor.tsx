import Meeple from "../../assets/Icons/Meeple";
import SelectColorType from "../../types/selectColorType";
import getCssVariable from "../../utils/getCssVariable";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import styles from "./SelectColor.module.css";
import SelectCardTitle from "../SelectCardsTitle/SelectCardsTitle";
import { memo } from "react";

const COLORS_OPTIONS = ["red", "blue", "yellow", "green", "black", "pink"];
const accentColor = getCssVariable("--accent-color");

type SelectColorProps = {
  players: SelectColorType[];
  handleSelect: (color: string) => void;
};

const SelectColor: React.FC<SelectColorProps> = memo(
  ({ players, handleSelect }) => {
    console.log("<SelectColor/> rendered");

    const handleReset = () => {
      handleSelect("reset");
    };

    return (
      <div className={styles.container}>
        <SelectCardTitle>Colors</SelectCardTitle>
        <div className={styles.list}>
          {COLORS_OPTIONS.map((color: string) => {
            const playerWithThisColor: number = players.filter(
              (item: SelectColorType) => item.color === color
            )[0]?.playerId;

            return (
              <div
                key={color}
                className={
                  playerWithThisColor
                    ? `${styles.button} ${styles.buttonSelected}`
                    : styles.button
                }
                onClick={() => handleSelect(color)}
              >
                <Meeple color={color} width={"40px"} />
                <div className={styles.indicator}>{playerWithThisColor}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.reset} onClick={handleReset}>
          <RotateLeftRoundedIcon fontSize="small" sx={{ color: accentColor }} />
          Reset
        </div>
      </div>
    );
  }
);

export default SelectColor;
