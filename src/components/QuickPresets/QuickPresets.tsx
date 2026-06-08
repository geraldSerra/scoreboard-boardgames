import { FastForward } from "lucide-react";

const PRESETS: Record<string, { label: string; value: number }[]> = {
  city: [{ label: "Ciudad pequeña +4", value: 4 }],
  road: [{ label: "Camino corto +2", value: 2 }],
  monastery: [{ label: "Monasterio completo +9", value: 9 }],
  garden: [{ label: "Jardín completo +9", value: 9 }],
  field: [
    { label: "1 ciudad +3", value: 3 },
    { label: "2 ciudades +6", value: 6 },
  ],
};

type Props = {
  scorable: string;
  onPick: (value: number) => void;
  disabled?: boolean;
};

const QuickPresets = ({ scorable, onPick, disabled = false }: Props) => {
  const presets = PRESETS[scorable];
  if (!presets) return null;

  return (
    <>
      {presets.map((p) => (
        <button
          key={p.label}
          type="button"
          disabled={disabled}
          aria-label={`Puntaje rápido: ${p.label}`}
          onClick={() => onPick(p.value)}
          className={`flex h-[52px] shrink-0 items-center gap-1.5 rounded-[12px] px-4 text-[15px] font-bold transition-colors ${
            disabled
              ? "cursor-not-allowed border-2 border-lightgray bg-transparent text-graysoft"
              : "bg-secondary text-white"
          }`}
        >
          <FastForward width="18px" height="18px" className="shrink-0" />
          {p.label}
        </button>
      ))}
    </>
  );
};

export default QuickPresets;
