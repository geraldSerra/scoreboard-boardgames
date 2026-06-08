import { memo } from "react";
import Field from "../../assets/Icons/Field";
import ScoringOptionType from "../../types/scoringOptionType";
import scorableLabel from "../../utils/scorableLabel";
import ciudad from "../../assets/puntuables/ciudad.webp";
import camino from "../../assets/puntuables/camino.webp";
import monasterio from "../../assets/puntuables/monasterio.webp";
import jardin from "../../assets/puntuables/jardin.webp";

const TILE: Record<string, string> = {
  city: ciudad,
  road: camino,
  monastery: monasterio,
  garden: jardin,
};

const ScoringOptions: React.FC<{
  options: ScoringOptionType[];
  selectOption: (option: string) => void;
}> = memo(({ options, selectOption }) => {
  return (
    <div className="mx-[15px] flex justify-center gap-2">
      {options.map((option: ScoringOptionType) => {
        const img = TILE[option.scorable];
        return (
          <button
            key={option.scorable}
            type="button"
            onClick={() => selectOption(option.scorable)}
            className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[16px] border-2 p-1.5 transition-all ${
              option.selected
                ? "border-accent bg-accent/10"
                : "border-graysoft bg-transparent"
            }`}
          >
            {img ? (
              <img
                src={img}
                alt=""
                className="aspect-square w-full rounded-[12px] object-contain"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-[12px] bg-[#5a8f3a]">
                <Field color="#ffffff" width="48px" height="48px" />
              </div>
            )}
            <span className="w-full truncate text-center text-xs font-bold text-black">
              {scorableLabel(option.scorable)}
            </span>
          </button>
        );
      })}
    </div>
  );
});

export default ScoringOptions;
