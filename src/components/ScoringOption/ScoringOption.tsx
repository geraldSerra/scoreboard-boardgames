import { memo } from "react";
import Road from "../../assets/Icons/Road";
import City from "../../assets/Icons/City";
import Monastery from "../../assets/Icons/Monastery";
import Garden from "../../assets/Icons/Garden";
import Field from "../../assets/Icons/Field";
import ScoringOptionType from "../../types/scoringOptionType";

const optionIcons: any = {
  road: <Road color="black" width="30px" height="30px" />,
  city: <City color="black" width="30px" height="30px" />,
  monastery: <Monastery color="black" width="30px" height="30px" />,
  garden: <Garden color="black" width="30px" height="30px" />,
  field: <Field color="black" width="30px" height="30px" />,
};

const ScoringOptions: React.FC<{
  options: ScoringOptionType[];
  selectOption: (option: string) => void;
}> = memo(({ options, selectOption }) => {
  return (
    <div className="mx-[15px] flex flex-row items-center justify-between text-black">
      <div className="flex items-center gap-[10px] rounded-[50px] bg-lightgray p-1">
        {options.map((option: ScoringOptionType) => (
          <div
            key={option.scorable}
            className={`flex w-fit items-center justify-center rounded-[50px] p-2 transition-all duration-200 ${
              option.selected ? "scale-[1.3] bg-graysoft" : ""
            }`}
            onClick={() => {
              selectOption(option.scorable);
            }}
          >
            {optionIcons[option.scorable]}
          </div>
        ))}
      </div>
      <div className="font-bold capitalize">
        {options.filter((option: ScoringOptionType) => option.selected)[0]
          ?.scorable ?? ""}
      </div>
    </div>
  );
});

export default ScoringOptions;
