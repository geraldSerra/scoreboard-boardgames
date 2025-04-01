import "./ScoringOptions.css";
import Road from "../../assets/Icons/Road";
import City from "../../assets/Icons/City";
import Monastery from "../../assets/Icons/Monastery";
import Garden from "../../assets/Icons/Graden";
import Field from "../../assets/Icons/Field";

const optionIcons: any = {
  road: <Road color="black" width="30px" height="30px" />,
  city: <City color="black" width="30px" height="30px" />,
  monastery: <Monastery color="black" width="30px" height="30px" />,
  garden: <Garden color="black" width="30px" height="30px" />,
  field: <Field color="black" width="30px" height="30px" />,
};

const ScoringOptions = ({
  scoringOptions,
  handleAddOption,
  setScoringOptions,
}: any) => {
  const handleOptionSelected = (selected: string) => {
    setScoringOptions((prev: any) =>
      prev.map((option: any) => {
        if (selected === option.name) {
          return { ...option, selected: true };
        } else return { ...option, selected: false };
      })
    );
  };

  return (
    <div className="options-container">
      <div className="options-icons-container">
        {scoringOptions.map((option: any) => (
          <div
            key={option.name}
            className={`option ${option.selected ? "selected" : ""}`}
            onClick={() => {
              handleOptionSelected(option.name);
              handleAddOption(option.name);
            }}
          >
            {optionIcons[option.name]}
          </div>
        ))}
      </div>
      <div className="option-label">
        {scoringOptions.filter((option: any) => option.selected)[0]?.name ?? ""}
      </div>
    </div>
  );
};

export default ScoringOptions;
