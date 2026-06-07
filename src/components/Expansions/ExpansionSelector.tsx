import Expansion from "../../types/expansionType";
import ExpansionCard from "./ExpansionCard";

type ExpansionSelectorProps = {
  expansions: Expansion[];
  onToggleExpansion: (expansionId: string) => void;
  onTogglePiece: (expansionId: string, pieceId: string) => void;
};

const ExpansionSelector: React.FC<ExpansionSelectorProps> = ({
  expansions,
  onToggleExpansion,
  onTogglePiece,
}) => {
  return (
    <div className="flex w-full flex-col gap-[12px]">
      <div className="text-base font-medium text-graysoft">Expansiones</div>
      {expansions.map((expansion) => (
        <ExpansionCard
          key={expansion.id}
          expansion={expansion}
          onToggleExpansion={onToggleExpansion}
          onTogglePiece={onTogglePiece}
        />
      ))}
    </div>
  );
};

export default ExpansionSelector;
