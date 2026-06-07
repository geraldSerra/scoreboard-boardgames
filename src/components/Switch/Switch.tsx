type SwitchProps = {
  on: boolean;
  onToggle: () => void;
};

const Switch = ({ on, onToggle }: SwitchProps) => (
  <button
    type="button"
    onClick={onToggle}
    role="switch"
    aria-checked={on}
    className={`inline-flex h-7 w-12 shrink-0 items-center rounded-full px-0.5 transition-colors ${
      on ? "bg-accent" : "bg-secondary"
    }`}
  >
    <span
      className={`h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 ${
        on ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export default Switch;
