import { memo, useState } from "react";
import SelectCardTitle from "../SelectCardsTitle/SelectCardsTitle";
import styles from "./SelectQuantity.module.css";

const QUANTITY_OPTIONS: number[] = [2, 3, 4, 5, 6];

type SelectQuantityProps = {
  quantity: number;
  handleSelect: (num: number) => void;
};

const SelectQuantity: React.FC<SelectQuantityProps> = memo(
  ({ quantity, handleSelect }) => {
    console.log("<SelectQuantity/> rendered");

    // const [quantity, setQuantity] = useState<number>(2);

    const handleSelectQuantity = (num: number) => {
      handleSelect(num);
      // setQuantity(num);
    };

    return (
      <div className={styles.container}>
        <SelectCardTitle>Players</SelectCardTitle>
        <div className={styles.list}>
          {QUANTITY_OPTIONS.map((num: number) => (
            <div
              key={num}
              className={
                quantity === num
                  ? `${styles.button} ${styles.buttonSelected}`
                  : styles.button
              }
              onClick={() => handleSelectQuantity(num)}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default SelectQuantity;
