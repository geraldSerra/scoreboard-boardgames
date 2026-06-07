import { useEffect } from "react";

/**
 * Keeps the screen awake while `active` is true (e.g. during a game).
 * Re-acquires the lock when the tab becomes visible again.
 */
const useWakeLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return;

    let lock: any = null;

    const request = async () => {
      try {
        lock = await (navigator as any).wakeLock?.request("screen");
      } catch {
        /* not supported / denied — ignore */
      }
    };

    request();

    const onVisible = () => {
      if (document.visibilityState === "visible") request();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      try {
        lock?.release();
      } catch {
        /* ignore */
      }
    };
  }, [active]);
};

export default useWakeLock;
