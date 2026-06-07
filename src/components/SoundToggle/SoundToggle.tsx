import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isMuted, setMuted } from "../../utils/sound";

const SoundToggle = () => {
  const [muted, setM] = useState(isMuted());

  const toggle = () => {
    const v = !muted;
    setMuted(v);
    setM(v);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Activar sonido" : "Silenciar"}
      className="fixed left-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border-2 border-secondary bg-primary text-accent"
    >
      {muted ? (
        <VolumeX width="18px" height="18px" />
      ) : (
        <Volume2 width="18px" height="18px" />
      )}
    </button>
  );
};

export default SoundToggle;
