import { useState } from "react";
import { GlassPanel } from "@/components/astral/GlassPanel";

/**
 * Investigate activity: panel angle vs incident light vs power output.
 * Model: P = intensity * area * efficiency * cos(angle).
 */
export function SolarAngleSim() {
  const [angle, setAngle] = useState(55);
  const [intensity, setIntensity] = useState(1361);
  const efficiency = 0.2;
  const area = 1.5;

  const cos = Math.max(0, Math.cos((angle * Math.PI) / 180));
  const power = intensity * area * efficiency * cos;
  const maxPower = intensity * area * efficiency;

  const points = Array.from({ length: 91 }, (_, deg) => {
    const p = Math.max(0, Math.cos((deg * Math.PI) / 180)) * maxPower;
    return `${(deg / 90) * 260 + 30},${110 - (p / maxPower) * 85}`;
  }).join(" ");

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <GlassPanel className="p-5">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Panel model</div>
        <div className="mt-4 grid place-items-center">
          <svg viewBox="0 0 320 200" className="w-full max-w-md">
            <defs>
              <linearGradient id="ray" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <circle cx="34" cy="46" r="16" fill="var(--accent)" opacity={0.25 + (intensity / 1361) * 0.6} />
            <circle cx="34" cy="46" r="8" fill="var(--accent)" />
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="50"
                y1={40 + i * 18}
                x2="150"
                y2={40 + i * 18}
                stroke="url(#ray)"
                strokeWidth="2"
                strokeDasharray="6 5"
              />
            ))}
            <g transform={`translate(200 110) rotate(${angle - 90})`}>
              <rect x="-52" y="-5" width="104" height="10" rx="2" fill="var(--primary)" opacity="0.85" />
              <rect x="-52" y="-5" width="104" height="10" rx="2" fill="none" stroke="var(--primary-glow)" />
            </g>
            <line x1="200" y1="110" x2="200" y2="180" stroke="var(--border)" strokeWidth="3" />
            <text x="200" y="196" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
              {angle}° from the incoming light
            </text>
          </svg>
        </div>

        <label className="mt-4 block text-xs text-muted-foreground">
          Panel angle · <span className="font-mono text-foreground">{angle}°</span>
          <input
            type="range"
            min={0}
            max={90}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--primary)]"
          />
        </label>
        <label className="mt-3 block text-xs text-muted-foreground">
          Light intensity · <span className="font-mono text-foreground">{intensity} W/m²</span>
          <input
            type="range"
            min={200}
            max={1361}
            step={1}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--primary)]"
          />
        </label>
      </GlassPanel>

      <GlassPanel className="p-5">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Output</div>
        <div className="mt-3 font-display text-4xl font-semibold text-primary">
          {power.toFixed(0)}
          <span className="ml-1 text-base text-muted-foreground">W</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {((power / maxPower) * 100).toFixed(0)}% of the best possible output at this brightness
        </div>

        <svg viewBox="0 0 320 130" className="mt-5 w-full">
          <line x1="30" y1="110" x2="300" y2="110" stroke="var(--border)" />
          <line x1="30" y1="20" x2="30" y2="110" stroke="var(--border)" />
          <polyline points={points} fill="none" stroke="var(--primary)" strokeWidth="2" />
          <circle
            cx={(angle / 90) * 260 + 30}
            cy={110 - (power / maxPower) * 85}
            r="4"
            fill="var(--accent)"
          />
          <text x="165" y="126" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">
            angle (0° → 90°)
          </text>
        </svg>

        <div className="mt-4 rounded-lg border border-border/60 bg-secondary/30 p-3 text-xs text-muted-foreground">
          Power = intensity × area × efficiency × cos(angle). Turning the panel doesn't change how
          bright the Sun is — it changes how much of that light lands on the panel.
        </div>
      </GlassPanel>
    </div>
  );
}
