import { useCallback, useState } from "react";
import SelectTime from "../SelectTime/SelectTime";
import SelectQuantity from "../SelectQuantity/SelectQuantity";
import PlayerRow, { COLORS_OPTIONS } from "../PlayerRow/PlayerRow";
import ExpansionSelector from "../Expansions/ExpansionSelector";
import Stepper from "../Stepper/Stepper";
import Switch from "../Switch/Switch";
import Expansion from "../../types/expansionType";
import { cloneExpansions } from "../../data/expansions";

const STEPS = ["Jugadores", "Expansiones", "Tiempo"];

type PlayerDraft = {
  playerId: number;
  name: string;
  color: string;
};

const makePlayers = (quantity: number, prev: PlayerDraft[] = []): PlayerDraft[] =>
  Array.from({ length: quantity }, (_, i) => ({
    playerId: i + 1,
    name: prev[i]?.name ?? "",
    color: prev[i]?.color ?? "",
  }));

const SelectPlayers = ({ handleSettings, initialConfig }: any) => {
  const [quantityOfPlayers, setQuantityOfPlayers] = useState<number>(
    initialConfig?.quantity ?? 2
  );
  const [players, setPlayers] = useState<PlayerDraft[]>(() =>
    makePlayers(initialConfig?.quantity ?? 2, initialConfig?.players ?? [])
  );
  const [timeOfPlayers, setTimeOfPlayers] = useState<number>(
    initialConfig?.time ?? 15
  );
  const [timerEnabled, setTimerEnabled] = useState<boolean>(
    initialConfig?.timerEnabled ?? false
  );
  const [advancedScoring, setAdvancedScoring] = useState<boolean>(
    initialConfig?.advancedScoring ?? false
  );
  const [expansions, setExpansions] = useState<Expansion[]>(() =>
    initialConfig?.expansions
      ? initialConfig.expansions.map((expansion: Expansion) => ({
          ...expansion,
          pieces: expansion.pieces.map((piece) => ({ ...piece })),
        }))
      : cloneExpansions()
  );
  const [step, setStep] = useState<number>(0);

  const isReadyToStart = players.every((player) => player.color !== "");
  const canGoNext = step !== 0 || isReadyToStart;

  const handleNext = () => {
    if (!canGoNext) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));
  const handleStepClick = (index: number) => setStep(index);

  const handleQuantity = useCallback((quantity: number) => {
    setQuantityOfPlayers(quantity);
    setPlayers((prev) => makePlayers(quantity, prev));
  }, []);

  const handleName = useCallback((index: number, name: string) => {
    setPlayers((prev) =>
      prev.map((player, i) => (i === index ? { ...player, name } : player))
    );
  }, []);

  const handleRandomColors = () => {
    const shuffled = [...COLORS_OPTIONS].sort(() => Math.random() - 0.5);
    setPlayers((prev) =>
      prev.map((player, i) => ({ ...player, color: shuffled[i] }))
    );
  };

  const handleColor = useCallback((index: number, color: string) => {
    setPlayers((prev) =>
      prev.map((player, i) =>
        i === index
          ? { ...player, color: player.color === color ? "" : color }
          : player
      )
    );
  }, []);

  const handleTime = useCallback((time: number) => {
    setTimeOfPlayers(time);
  }, []);

  const handleToggleExpansion = useCallback((expansionId: string) => {
    setExpansions((prev) =>
      prev.map((expansion) =>
        expansion.id === expansionId && !expansion.required
          ? { ...expansion, enabled: !expansion.enabled }
          : expansion
      )
    );
  }, []);

  const handleTogglePiece = useCallback(
    (expansionId: string, pieceId: string) => {
      setExpansions((prev) =>
        prev.map((expansion) =>
          expansion.id === expansionId
            ? {
                ...expansion,
                pieces: expansion.pieces.map((piece) =>
                  piece.id === pieceId
                    ? { ...piece, enabled: !piece.enabled }
                    : piece
                ),
              }
            : expansion
        )
      );
    },
    []
  );

  const handleStart = () => {
    if (!isReadyToStart) return;

    const settings = players.map((player, index) => ({
      playerId: index + 1,
      name: player.name.trim() || `Jugador ${index + 1}`,
      color: player.color,
      time: timerEnabled ? `${timeOfPlayers}:00` : "",
      isPlayerTurn: index === 0,
    }));

    handleSettings(settings, { expansions, advancedScoring });
  };

  return (
    <div className="mx-auto box-border flex h-screen w-screen max-w-[480px] flex-col px-4 py-6">
      <div className="mb-4 text-center text-[26px] font-bold">Nueva partida</div>

      <Stepper steps={STEPS} current={step} onStepClick={handleStepClick} />

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-5">
        {step === 0 && (
          <div className="flex flex-col gap-[15px]">
            <SelectQuantity
              quantity={quantityOfPlayers}
              handleSelect={handleQuantity}
            />
            <div className="flex w-full flex-col gap-[12px]">
              {players.map((player, index) => (
                <PlayerRow
                  key={player.playerId}
                  index={index}
                  name={player.name}
                  color={player.color}
                  takenColors={players
                    .filter((_, i) => i !== index)
                    .map((p) => p.color)
                    .filter(Boolean)}
                  onName={(name) => handleName(index, name)}
                  onColor={(color) => handleColor(index, color)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleRandomColors}
              className="self-center rounded-full border-2 border-secondary px-4 py-2 text-sm font-semibold text-accent"
            >
              🎲 Colores al azar
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-[15px]">
            <div className="box-border flex w-full items-center justify-between gap-3 rounded-[20px] bg-black/30 p-[15px]">
              <div className="min-w-0">
                <div className="font-bold">Puntuación avanzada</div>
                <div className="text-xs text-graysoft">
                  Calcula los puntos por losetas, escudos y construcciones
                  completas en vez de escribirlos a mano.
                </div>
              </div>
              <Switch
                on={advancedScoring}
                onToggle={() => setAdvancedScoring((v) => !v)}
              />
            </div>
            <ExpansionSelector
              expansions={expansions}
              onToggleExpansion={handleToggleExpansion}
              onTogglePiece={handleTogglePiece}
            />
          </div>
        )}

        {step === 2 && (
          <SelectTime
            time={timeOfPlayers}
            handleSelect={handleTime}
            enabled={timerEnabled}
            onToggleEnabled={() => setTimerEnabled((v) => !v)}
          />
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex h-[52px] items-center justify-center rounded-[12px] border-2 border-secondary px-6 font-bold text-graysoft transition-colors"
          >
            Atrás
          </button>
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
            className={`flex h-[52px] flex-1 items-center justify-center rounded-[12px] text-[18px] font-bold transition-all ${
              canGoNext
                ? "bg-accent text-primary"
                : "cursor-not-allowed border-2 border-secondary bg-transparent text-graysoft"
            }`}
          >
            Siguiente
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStart}
            disabled={!isReadyToStart}
            className={`flex h-[52px] flex-1 items-center justify-center rounded-[12px] text-[20px] font-bold tracking-wide transition-all ${
              isReadyToStart
                ? "bg-accent text-primary"
                : "cursor-not-allowed border-2 border-secondary bg-transparent text-graysoft"
            }`}
          >
            EMPEZAR
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectPlayers;
