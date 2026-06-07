const PRESETS: Record<string, { label: string; value: number }[]> = {
  city: [{ label: "Ciudad pequeña +4", value: 4 }],
  road: [{ label: "Camino corto +2", value: 2 }],
  monastery: [{ label: "Completo +9", value: 9 }],
  garden: [{ label: "Completo +9", value: 9 }],
  field: [
    { label: "1 ciudad +3", value: 3 },
    { label: "2 ciudades +6", value: 6 },
  ],
};

type Props = {
  scorable: string;
  onPick: (value: number) => void;
};

const QuickPresets = ({ scorable, onPick }: Props) => {
  const presets = PRESETS[scorable];
  if (!presets) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((p) => (
        <button
          key={p.label}
          type="button"
          onClick={() => onPick(p.value)}
          className="rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-white"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};

export default QuickPresets;
