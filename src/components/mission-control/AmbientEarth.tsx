/**
 * Pure CSS/SVG Earth — no three.js. GPU-cheap.
 * Rotating conic gradient over a sphere, with an ISS dot orbiting.
 */
export function AmbientEarth({ issLon }: { issLon?: number }) {
  return (
    <div
      className="relative aspect-square w-full max-w-[280px] mx-auto"
      aria-hidden
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-full blur-2xl opacity-60"
           style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }} />
      {/* Sphere */}
      <div
        className="absolute inset-2 rounded-full overflow-hidden shadow-[inset_-20px_-30px_60px_rgba(0,0,0,0.6)]"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, oklch(0.55 0.15 220), oklch(0.25 0.08 250) 55%, oklch(0.1 0.03 260) 100%)",
        }}
      >
        {/* Continents-ish texture — animated conic gradient (paused under reduced motion by global CSS) */}
        <div
          className="absolute inset-0 opacity-70 animate-spin-slow"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, oklch(0.4 0.1 155 / 0.35) 40deg, transparent 90deg, oklch(0.4 0.1 155 / 0.4) 160deg, transparent 220deg, oklch(0.4 0.1 155 / 0.3) 280deg, transparent 340deg)",
            mixBlendMode: "screen",
          }}
        />
        {/* Terminator shading */}
        <div className="absolute inset-0"
             style={{ background: "linear-gradient(120deg, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
      </div>
      {/* ISS orbit ring */}
      <div className="absolute inset-0 rounded-full border border-primary/40" />
      {/* ISS marker */}
      <div
        className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
        style={{
          transform: `translate(-50%, -50%) rotate(${(issLon ?? 0)}deg) translateX(50%)`,
        }}
      />
    </div>
  );
}
