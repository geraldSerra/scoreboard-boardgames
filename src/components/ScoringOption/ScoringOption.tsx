import "./ScoringOptions.css";
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
}> = ({ options, selectOption }) => {
  console.log("scoring Options Component");

  return (
    <div className="options-container">
      <div className="options-icons-container">
        {options.map((option: ScoringOptionType) => (
          <div
            key={option.scorable}
            className={`option ${option.selected ? "selected" : ""}`}
            onClick={() => {
              selectOption(option.scorable);
            }}
          >
            {optionIcons[option.scorable]}
          </div>
        ))}
      </div>
      <div className="option-label">
        {options.filter((option: ScoringOptionType) => option.selected)[0]
          ?.scorable ?? ""}
      </div>
    </div>
  );
};

export default ScoringOptions;
