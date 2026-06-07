import { useEffect, useState } from "react";
import Plus from "../../assets/Icons/Plus";
import Minus from "../../assets/Icons/Minus";

const SECONDARY = "#1f4068";

const Stepper = ({
  label,
  value,
  setValue,
  min = 0,
  max = 80,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min?: number;
  max?: number;
}) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-sm font-semibold text-black">{label}</span>
    <div className="flex items-center gap-3">
      <Minus
        color={SECONDARY}
        width="26px"
        height="26px"
        onClick={() => setValue(Math.max(min, value - 1))}
      />
      <span className="w-7 text-center text-xl font-bold text-black">
        {value}
      </span>
      <Plus
        color={SECONDARY}
        width="26px"
        height="26px"
        onClick={() => setValue(Math.min(max, value + 1))}
      />
    </div>
  </div>
);

const Pill = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold transition-colors ${
      active
        ? "border-accent bg-accent text-primary"
        : "border-graysoft bg-transparent text-black"
    }`}
  >
    {children}
  </button>
);

const Quick = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-white"
  >
    {children}
  </button>
);

type Props = {
  scorable: string;
  innsCathedrals: boolean;
  onTotalChange: (total: number) => void;
  defaultCompleted?: boolean;
};

const ScoreCalculator: React.FC<Props> = ({
  scorable,
  innsCathedrals,
  onTotalChange,
  defaultCompleted = true,
}) => {
  const [tiles, setTiles] = useState(2);
  const [pennants, setPennants] = useState(0);
  const [completed, setCompleted] = useState(defaultCompleted);
  const [special, setSpecial] = useState(false); // posada (camino) o catedral (ciudad)
  const [adjacent, setAdjacent] = useState(0); // monasterio/jardín incompleto
  const [cities, setCities] = useState(0); // campo

  let total = 0;
  if (scorable === "city") {
    const mult = special ? (completed ? 3 : 0) : completed ? 2 : 1;
    total = mult * (tiles + pennants);
  } else if (scorable === "road") {
    const mult = special ? (completed ? 2 : 0) : 1;
    total = mult * tiles;
  } else if (scorable === "monastery" || scorable === "garden") {
    total = completed ? 9 : 1 + adjacent;
  } else if (scorable === "field") {
    total = cities * 3;
  }

  useEffect(() => {
    onTotalChange(total);
  }, [total, onTotalChange]);

  if (!scorable) {
    return (
      <div className="rounded-[16px] bg-lightgray p-4 text-center text-sm font-medium text-graysoft">
        Elegí una categoría para calcular los puntos.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-[16px] bg-lightgray p-4">
      {scorable === "city" && (
        <>
          <div className="flex flex-wrap gap-2">
            <Quick
              onClick={() => {
                setTiles(2);
                setPennants(0);
                setSpecial(false);
                setCompleted(true);
              }}
            >
              Ciudad pequeña +4
            </Quick>
          </div>
          <Stepper label="Losetas" value={tiles} setValue={setTiles} min={1} />
          <Stepper label="Escudos" value={pennants} setValue={setPennants} />
          <div className="flex flex-wrap gap-2">
            <Pill active={completed} onClick={() => setCompleted(true)}>
              Completa
            </Pill>
            <Pill active={!completed} onClick={() => setCompleted(false)}>
              Incompleta
            </Pill>
            {innsCathedrals && (
              <Pill active={special} onClick={() => setSpecial(!special)}>
                Catedral
              </Pill>
            )}
          </div>
        </>
      )}

      {scorable === "road" && (
        <>
          <div className="flex flex-wrap gap-2">
            <Quick
              onClick={() => {
                setTiles(2);
                setSpecial(false);
                setCompleted(true);
              }}
            >
              Camino corto +2
            </Quick>
          </div>
          <Stepper label="Losetas" value={tiles} setValue={setTiles} min={1} />
          <div className="flex flex-wrap gap-2">
            <Pill active={completed} onClick={() => setCompleted(true)}>
              Completo
            </Pill>
            <Pill active={!completed} onClick={() => setCompleted(false)}>
              Incompleto
            </Pill>
            {innsCathedrals && (
              <Pill active={special} onClick={() => setSpecial(!special)}>
                Posada
              </Pill>
            )}
          </div>
        </>
      )}

      {(scorable === "monastery" || scorable === "garden") && (
        <>
          <div className="flex flex-wrap gap-2">
            <Pill active={completed} onClick={() => setCompleted(true)}>
              Completo +9
            </Pill>
            <Pill active={!completed} onClick={() => setCompleted(false)}>
              Incompleto
            </Pill>
          </div>
          {!completed && (
            <Stepper
              label="Losetas alrededor"
              value={adjacent}
              setValue={setAdjacent}
              min={0}
              max={8}
            />
          )}
        </>
      )}

      {scorable === "field" && (
        <>
          <div className="flex flex-wrap gap-2">
            <Quick onClick={() => setCities(1)}>1 ciudad +3</Quick>
            <Quick onClick={() => setCities(2)}>2 ciudades +6</Quick>
          </div>
          <Stepper
            label="Ciudades completas adyacentes"
            value={cities}
            setValue={setCities}
          />
        </>
      )}

      <div className="mt-1 flex items-baseline justify-end gap-1 border-t border-graysoft pt-2">
        <span className="text-3xl font-bold text-black">{total}</span>
        <span className="text-sm font-semibold text-graysoft">puntos</span>
      </div>
    </div>
  );
};

export default ScoreCalculator;
