import { Minus, Plus } from "lucide-react";

const ScoringPoints = ({ points, setScoringPoints }: any) => {
  const current = Number(points) || 0;

  const dec = () => {
    const next = current - 1;
    setScoringPoints(next > 0 ? String(next) : "");
  };

  const inc = () => setScoringPoints(String(current + 1));

  return (
    <div className="flex h-[52px] w-full items-stretch overflow-hidden rounded-[12px] border-2 border-lightgray focus-within:border-graysoft">
      <button
        type="button"
        onClick={dec}
        disabled={current <= 0}
        aria-label="Restar punto"
        className="flex w-14 shrink-0 items-center justify-center border-r-2 border-lightgray text-primary disabled:text-graysoft"
      >
        <Minus width="22px" height="22px" />
      </button>

      <input
        className="min-w-0 flex-1 bg-transparent text-center text-[18px] font-bold text-black outline-none"
        type="number"
        placeholder="0"
        value={points}
        onChange={(e) => setScoringPoints(e.target.value)}
      />

      <button
        type="button"
        onClick={inc}
        aria-label="Sumar punto"
        className="flex w-14 shrink-0 items-center justify-center border-l-2 border-lightgray text-primary"
      >
        <Plus width="22px" height="22px" />
      </button>
    </div>
  );
};

export default ScoringPoints;
