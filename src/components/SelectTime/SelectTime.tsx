import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { memo, useState } from "react";
import Plus from "@mui/icons-material/AddCircleRounded";
import Minus from "@mui/icons-material/RemoveCircleRounded";
import getCssVariable from "../../utils/getCssVariable";
import styles from "./SelectTime.module.css";
import SelectCardTitle from "../SelectCardsTitle/SelectCardsTitle";

const MIN = 10;
const MAX = 30;

const accentColor = getCssVariable("--accent-color");
const secondaryColor = getCssVariable("--secondary-color");

type SelectTimeProps = {
  time: number;
  handleSelect: (time: number) => void;
};

const SelectTime: React.FC<SelectTimeProps> = memo(({ time, handleSelect }) => {
  console.log("<SelectTime /> rendered");

  const handleChange = (event: Event, value: number) => {
    handleSelect(value);
  };

  const handleIncrease = () => {
    if (time >= MAX) return;
    handleSelect(time + 1);
  };

  const handleDecrease = () => {
    if (time <= MIN) return;
    handleSelect(time - 1);
  };

  return (
    <div className={styles.container}>
      <SelectCardTitle>Timers</SelectCardTitle>
      <Stack flexDirection={"row"} alignItems={"baseline"} gap={0.5}>
        <span style={{ fontSize: "40px", fontWeight: "500" }}>{time}</span>
        <span>{` min`}</span>
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        sx={{ width: 200, alignItems: "center", mb: 1 }}
      >
        <Minus
          onClick={handleDecrease}
          fontSize="large"
          sx={{ color: secondaryColor }}
        />
        <Slider
          sx={{ color: accentColor }}
          min={MIN}
          max={MAX}
          value={time}
          onChange={handleChange}
          track={false}
        />
        <Plus
          onClick={handleIncrease}
          fontSize="large"
          sx={{ color: secondaryColor }}
        />
      </Stack>
    </div>
  );
});

export default SelectTime;
