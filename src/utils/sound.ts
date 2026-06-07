let ctx: AudioContext | null = null;
let muted = false;
try {
  muted = localStorage.getItem("cc-muted") === "1";
} catch {
  /* ignore */
}

const getCtx = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx && ctx.state === "suspended") ctx.resume();
  return ctx;
};

const tone = (
  freq: number,
  durationMs: number,
  type: OscillatorType = "sine",
  gain = 0.18,
  delay = 0
) => {
  const c = getCtx();
  if (!c) return;
  const start = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  osc.connect(g);
  g.connect(c.destination);
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.0001, start + durationMs / 1000);
  osc.start(start);
  osc.stop(start + durationMs / 1000);
};

export const isMuted = () => muted;

export const setMuted = (m: boolean) => {
  muted = m;
  try {
    localStorage.setItem("cc-muted", m ? "1" : "0");
  } catch {
    /* ignore */
  }
};

/** Resume the AudioContext on a user gesture so later sounds can play. */
export const unlockAudio = () => {
  getCtx();
};

export const sound = {
  turn: () => {
    if (!muted) tone(680, 90, "triangle", 0.2);
  },
  score: () => {
    if (muted) return;
    tone(740, 70, "sine", 0.18);
    tone(988, 120, "sine", 0.18, 0.07);
  },
  timeout: () => {
    if (muted) return;
    tone(440, 200, "square", 0.2);
    tone(330, 320, "square", 0.2, 0.18);
  },
};
