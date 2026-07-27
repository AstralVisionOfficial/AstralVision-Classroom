import { useEffect, useState } from "react";

const STORAGE_KEY = "astral:cold-open-seen";

/**
 * 4-5s cinematic. Silent (browsers block autoplay).
 * Plays once per browser (localStorage). Skipped under prefers-reduced-motion.
 * Callers can pass `forceReplay` (used by "Replay Boot Sequence" link).
 */
export function ColdOpen({ forceReplay = false, onDone }: { forceReplay?: boolean; onDone?: () => void }) {
  const [phase, setPhase] = useState<"pre" | "playing" | "done">("pre");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.localStorage.getItem(STORAGE_KEY);
    if (reduced || (seen && !forceReplay)) { setPhase("done"); onDone?.(); return; }
    setPhase("playing");
    const t = setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setPhase("done");
      onDone?.();
    }, 4400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceReplay]);

  if (phase !== "playing") return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background animate-fade-in"
      role="dialog"
      aria-label="Mission Control boot sequence"
    >
      <button
        onClick={() => { window.localStorage.setItem(STORAGE_KEY, "1"); setPhase("done"); onDone?.(); }}
        className="absolute top-4 right-4 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
      >
        Skip
      </button>

      <div className="text-center">
        {/* Earth rise */}
        <div className="mx-auto mb-6 h-40 w-40 rounded-full animate-earth-rise"
             style={{
               background: "radial-gradient(circle at 35% 30%, oklch(0.55 0.15 220), oklch(0.25 0.08 250) 55%, oklch(0.1 0.03 260) 100%)",
               boxShadow: "0 0 80px oklch(0.85 0.14 220 / 0.4)",
             }} />
        {/* Booting line */}
        <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
          Boot Sequence
        </div>
        <div className="mt-2 font-display text-2xl sm:text-3xl animate-fade-in-up" style={{ animationDelay: "0.9s", animationFillMode: "both" }}>
          Good morning, Mission Control.
        </div>
        <div className="mt-2 telemetry text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "1.8s", animationFillMode: "both" }}>
          Receiving data<span className="animate-caret">_</span>
        </div>
        {/* Satellites tracing in */}
        <div className="relative mx-auto mt-8 h-1 w-64">
          <span className="absolute inline-block h-1 w-1 rounded-full bg-primary animate-satellite-1" />
          <span className="absolute inline-block h-1 w-1 rounded-full bg-primary animate-satellite-2" />
          <span className="absolute inline-block h-1 w-1 rounded-full bg-accent animate-satellite-3" />
        </div>
      </div>
    </div>
  );
}

export function replayColdOpen() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}
