import { useCallback, useState } from "react";
import SelectTime from "../SelectTime/SelectTime";
import SelectQuantity from "../SelectQuantity/SelectQuantity";
import SelectColorType from "../../types/selectColorType";
import SelectColor from "../SelectColor/SelectColor";
import "./Settings.css";

const SelectPlayers = ({ handleSettings }: any) => {
  console.log("<SettingsScreen rendered");

  const [quantityOfPlayers, setQuantityOfPlayers] = useState<number>(2);
  const [colorOfPlayers, setColorOfPlayers] = useState<SelectColorType[]>([]);
  const [timeOfPlayers, setTimeOfPlayers] = useState<number>(15);

  const isReadyToStart = colorOfPlayers.length === quantityOfPlayers;

  const handleQuantity = useCallback(
    (quantity: number) => {
      if (quantity === quantityOfPlayers) return;
      setQuantityOfPlayers(quantity);
      setColorOfPlayers([]);
    },
    [quantityOfPlayers]
  );

  const handleColor = useCallback(
    function handleColor(color: string) {
      if (color === "reset") {
        setColorOfPlayers([]);
        return;
      }

      if (quantityOfPlayers === colorOfPlayers.length) return;

      setColorOfPlayers((prev: SelectColorType[]) => {
        return [...prev, { playerId: prev.length + 1, color: color }];
      });
    },
    [colorOfPlayers.length, quantityOfPlayers]
  );

  const handleTime = useCallback(function handleTime(time: number) {
    setTimeOfPlayers(time);
  }, []);

  const handleStart = () => {
    if (!isReadyToStart) return;

    const settings = colorOfPlayers.map((item: SelectColorType, index) => {
      return {
        ...item,
        time: `${timeOfPlayers}:00`,
        isPlayerTurn: index === 0 ? true : false,
      };
    });

    handleSettings(settings);
  };

  const Title = () => {
    return <div className="title-screen">Settings</div>;
  };

  const Start = () => {
    return (
      <div
        className={isReadyToStart ? "start" : "start startDisabled"}
        onClick={handleStart}
      >
        START
      </div>
    );
  };

  return (
    <div className="select-screen-container">
      <Title />
      <SelectQuantity
        quantity={quantityOfPlayers}
        handleSelect={handleQuantity}
      />
      <SelectColor players={colorOfPlayers} handleSelect={handleColor} />
      <SelectTime time={timeOfPlayers} handleSelect={handleTime} />
      <Start />
    </div>
  );
};

export default SelectPlayers;
