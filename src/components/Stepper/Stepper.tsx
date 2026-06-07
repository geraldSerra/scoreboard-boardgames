import { Check } from "lucide-react";

type StepperProps = {
  steps: string[];
  current: number;
  onStepClick: (index: number) => void;
};

const Stepper: React.FC<StepperProps> = ({ steps, current, onStepClick }) => {
  return (
    <div className="flex w-full">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div
            key={label}
            className="relative flex flex-1 flex-col items-center gap-1.5"
          >
            {i > 0 && (
              <div
                className={`absolute left-0 right-1/2 top-[15px] h-0.5 ${
                  i <= current ? "bg-accent" : "bg-secondary"
                }`}
              />
            )}
            {i < steps.length - 1 && (
              <div
                className={`absolute left-1/2 right-0 top-[15px] h-0.5 ${
                  i < current ? "bg-accent" : "bg-secondary"
                }`}
              />
            )}
            <button
              type="button"
              disabled={i > current}
              onClick={() => onStepClick(i)}
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                active
                  ? "border-accent bg-accent text-primary"
                  : done
                  ? "border-accent bg-primary text-accent"
                  : "border-secondary bg-primary text-graysoft"
              }`}
            >
              {done ? <Check width="16px" height="16px" strokeWidth={3} /> : i + 1}
            </button>
            <div
              className={`text-center text-[11px] ${
                active
                  ? "font-semibold text-white"
                  : done
                  ? "text-accent"
                  : "text-graysoft"
              }`}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
