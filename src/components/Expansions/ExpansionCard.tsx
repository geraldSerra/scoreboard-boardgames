import { Check } from "lucide-react";
import Expansion from "../../types/expansionType";
import Piece from "../../types/pieceType";
import abbotWhite from "../../assets/meeples/abbot.png";
import farmerWhite from "../../assets/meeples/campesino_feet_left.png";
import bigMeeple from "../../assets/meeples/big-meeple.png";

const pieceAvatar = (id: string) => {
  switch (id) {
    case "abbot":
      return <img src={abbotWhite} alt="" className="h-7 w-7 object-contain" />;
    case "farmer":
      return <img src={farmerWhite} alt="" className="h-6 w-6 object-contain" />;
    case "big-meeple":
      return <img src={bigMeeple} alt="" className="h-8 w-8 object-contain" />;
    default:
      return null;
  }
};

const Switch = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
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

const PieceRow = ({
  piece,
  onToggle,
}: {
  piece: Piece;
  onToggle: () => void;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className={`flex w-full items-center gap-3 rounded-[14px] border-2 px-3 py-2 text-left transition-all ${
      piece.enabled ? "border-accent bg-accent/10" : "border-secondary bg-transparent"
    }`}
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/50">
      {pieceAvatar(piece.id)}
    </div>
    <div className="min-w-0 flex-1">
      <div className="text-sm font-bold text-white">{piece.name}</div>
      <div className="truncate text-xs text-graysoft">{piece.description}</div>
    </div>
    <div
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
        piece.enabled
          ? "border-accent bg-accent text-primary"
          : "border-graysoft text-transparent"
      }`}
    >
      <Check width="16px" height="16px" strokeWidth={3} />
    </div>
  </button>
);

type ExpansionCardProps = {
  expansion: Expansion;
  onToggleExpansion: (expansionId: string) => void;
  onTogglePiece: (expansionId: string, pieceId: string) => void;
};

const ExpansionCard: React.FC<ExpansionCardProps> = ({
  expansion,
  onToggleExpansion,
  onTogglePiece,
}) => {
  const active = expansion.enabled;

  return (
    <div className="box-border w-full rounded-[20px] bg-black/30 p-[15px]">
      <div className="flex items-center gap-3">
        <img
          src={expansion.image}
          alt={expansion.name}
          className="h-14 w-14 shrink-0 rounded-[10px] object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-bold text-white">
            {expansion.name}
          </div>
          {expansion.required ? (
            <div className="text-xs font-medium text-accent">Incluido</div>
          ) : (
            <div
              className={`text-xs ${
                active ? "font-medium text-accent" : "text-graysoft"
              }`}
            >
              {active ? "Activada" : "Desactivada"}
            </div>
          )}
        </div>
        {!expansion.required && (
          <Switch on={active} onToggle={() => onToggleExpansion(expansion.id)} />
        )}
      </div>

      {active && expansion.pieces.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {expansion.pieces.map((piece) => (
            <PieceRow
              key={piece.id}
              piece={piece}
              onToggle={() => onTogglePiece(expansion.id, piece.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpansionCard;
