import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Link } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Button } from "@/components/ui/button";
import { Play, Rocket, Satellite, Sun, Moon, AlertTriangle, Zap, Clock, ArrowRight } from "lucide-react";
import {
  getISSPosition, getNextLaunch, getSpaceWeather, getNextNearEarthObject,
} from "@/lib/space.functions";
import { pickGreeting } from "@/lib/greetings";
import { getMoonPhase } from "@/lib/moon-phase";
import { TODAYS_MISSION, MISSION_VAULT, type MissionMeta } from "@/lib/mission-catalog";
import { AmbientEarth } from "./AmbientEarth";
import { ColdOpen, replayColdOpen } from "./ColdOpen";
import { cn } from "@/lib/utils";

type Props = { crewLabel: string; showColdOpen?: boolean };

export function MissionControlPage({ crewLabel, showColdOpen = true }: Props) {
  const [greeting, setGreeting] = useState("Good morning, Mission Control.");
  const [now, setNow] = useState(() => new Date());
  const [present, setPresent] = useState(false);
  const [launching, setLaunching] = useState(false);
  const navigate = useNavigate();

  // Randomise greeting after hydration to avoid SSR mismatch
  useEffect(() => { setGreeting(pickGreeting()); }, []);

  // UTC clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Smartboard mode via ?present=1
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    setPresent(sp.get("present") === "1");
  }, []);

  // Keyboard shortcuts (only when in smartboard mode)
  useEffect(() => {
    if (!present) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const url = new URL(window.location.href);
        url.searchParams.delete("present");
        window.location.href = url.toString();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [present]);

  const iss = useQuery({ queryKey: ["iss"], queryFn: () => getISSPosition(), refetchInterval: 8000 });
  const launch = useQuery({ queryKey: ["launch"], queryFn: () => getNextLaunch() });
  const weather = useQuery({ queryKey: ["weather"], queryFn: () => getSpaceWeather() });
  const neo = useQuery({ queryKey: ["neo"], queryFn: () => getNextNearEarthObject() });

  const moon = getMoonPhase(now);
  const liveAlert = pickLiveAlert({ launch: launch.data, neo: neo.data, moon });

  const beginMission = () => {
    if (!TODAYS_MISSION.route) return;
    setLaunching(true);
    setTimeout(() => { navigate({ to: TODAYS_MISSION.route! }); }, 700);
  };

  return (
    <>
      {showColdOpen && <ColdOpen />}

      <main className={cn(
        "mx-auto max-w-7xl px-4 pb-16 sm:px-6",
        present ? "pt-4" : "pt-6 sm:pt-10",
        launching && "animate-launch",
      )}>
        {/* Row 1 — Greeting + Mission Status */}
        <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">
              Mission Control · Powered by Astral Vision
            </div>
            <h1 className={cn(
              "mt-2 font-display font-bold leading-tight",
              present ? "text-4xl sm:text-6xl" : "text-2xl sm:text-4xl",
            )}>
              {greeting}
            </h1>
            <p className="mt-2 telemetry text-xs text-muted-foreground">
              {now.toISOString().slice(0, 19).replace("T", " ")}Z · {now.toDateString()}
            </p>
          </div>
          <MissionStatusPanel crewLabel={crewLabel} difficulty={TODAYS_MISSION.difficulty} />
        </div>

        {/* Row 2 — Trust strip */}
        <TrustStrip className="mt-6" />

        {/* Row 3 — HERO */}
        <MissionHero
          mission={TODAYS_MISSION}
          onBegin={beginMission}
          liveAlert={liveAlert}
          className="mt-6"
        />

        {/* Row 4 — Atmosphere */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <AmbientEarth issLon={iss.data?.longitude} />
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
              Ambient Telemetry
            </div>
            <div className="grid grid-cols-3 gap-3">
              <MiniStat label="ISS Alt." value={iss.data ? `${iss.data.altitudeKm.toFixed(0)} km` : "—"} />
              <MiniStat label="ISS Vel." value={iss.data ? `${Math.round(iss.data.velocityKmh / 1000)}k km/h` : "—"} />
              <MiniStat label="Moon" value={`${moon.emoji} ${Math.round(moon.illumination * 100)}%`} />
            </div>
          </div>
        </div>

        {/* Row 5 — Space Events */}
        <SpaceEvents
          className="mt-8"
          launch={launch.data}
          iss={iss.data}
          neo={neo.data}
          moon={moon}
          weather={weather.data}
        />

        {/* Row 6 — Mission Vault */}
        <MissionVault className="mt-8" />

        {/* Footer */}
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 py-6 text-xs text-muted-foreground">
          <div>Mission Control © Astral Vision · Built in Australia</div>
          <button
            onClick={replayColdOpen}
            className="text-cyan hover:underline"
          >
            Replay Boot Sequence
          </button>
        </footer>
      </main>
    </>
  );
}

/* ---------------- sub-components ---------------- */

function TrustStrip({ className }: { className?: string }) {
  const items = [
    "Australian Curriculum v9 aligned",
    "No preparation required",
    "60-minute lesson included",
  ];
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((t) => (
        <div key={t} className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs">
          <span className="text-primary">✅</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface/70 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="telemetry mt-0.5 text-sm text-foreground">{value}</div>
    </div>
  );
}

function MissionStatusPanel({ crewLabel, difficulty }: { crewLabel: string; difficulty: string }) {
  const [systemPhase, setSystemPhase] = useState(0);
  const labels = ["Online", "Synchronising", "Updating Space Data"];
  useEffect(() => {
    const t = setInterval(() => setSystemPhase((p) => (p + 1) % 3), 3500);
    return () => clearInterval(t);
  }, []);
  const progress = readMissionProgress();

  return (
    <GlassPanel className="p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Mission Status</div>
      <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
        <StatusItem label="System" value={
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping-slow" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {labels[systemPhase]}
          </span>
        } />
        <StatusItem label="Difficulty" value={difficulty} />
        <StatusItem label="Crew" value={crewLabel} />
        <StatusItem label="Progress" value={progress ?? "Mission Ready"} />
      </div>
    </GlassPanel>
  );
}

function StatusItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}

function readMissionProgress(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("astral:mission-progress");
    if (!raw) return null;
    const n = parseInt(raw, 10);
    if (isNaN(n) || n <= 0) return null;
    return `${Math.min(n, 100)}%`;
  } catch { return null; }
}

type Alert = { icon: "rocket" | "moon" | "asteroid" | "sun"; label: string; sub: string } | null;

function pickLiveAlert(args: {
  launch: Awaited<ReturnType<typeof getNextLaunch>>;
  neo: Awaited<ReturnType<typeof getNextNearEarthObject>>;
  moon: ReturnType<typeof getMoonPhase>;
}): Alert {
  const { launch, neo, moon } = args;
  // Launch within 24h
  if (launch) {
    const ms = new Date(launch.net).getTime() - Date.now();
    if (ms > 0 && ms < 24 * 3600_000) {
      const hrs = Math.round(ms / 3600_000);
      return { icon: "rocket", label: `Launch in ${hrs}h`, sub: launch.name };
    }
  }
  // Large NEO within 3 days
  if (neo) {
    const ms = new Date(neo.approachAt.replace(" ", "T") + "Z").getTime() - Date.now();
    if (ms > 0 && ms < 3 * 86400_000 && neo.diameterM > 100) {
      return { icon: "asteroid", label: `Asteroid ${neo.name}`, sub: `Passes ${(neo.missKm / 1000).toFixed(0)}k km away` };
    }
  }
  // Full moon or new moon
  if (moon.name === "Full Moon" || moon.name === "New Moon") {
    return { icon: "moon", label: `${moon.name} tonight`, sub: "Look up after sunset" };
  }
  return null;
}

function MissionHero({
  mission, onBegin, liveAlert, className,
}: { mission: MissionMeta; onBegin: () => void; liveAlert: Alert; className?: string }) {
  return (
    <GlassPanel tone="strong" className={cn("overflow-hidden", className)}>
      <div className="relative p-6 sm:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-sweep" />
        <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="telemetry text-xs tracking-[0.25em] text-cyan">{mission.code}</span>
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent">
                Mission Focus · {mission.focus}
              </span>
            </div>
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Today's Mission
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold leading-tight sm:text-5xl">
              {mission.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {mission.subtitle}
            </p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
              {mission.objectives.map((o) => (
                <li key={o} className="rounded-md border border-border bg-surface/60 p-3 text-sm">
                  {o}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow"
                onClick={onBegin}
              >
                <Play className="mr-1 h-4 w-4 fill-current" /> Begin Mission
              </Button>
              {liveAlert && <LiveAlertButton alert={liveAlert} />}
            </div>
          </div>

          <div className="grid gap-2 text-sm">
            <MetaRow label="Duration" value={mission.duration} icon={<Clock className="h-3.5 w-3.5" />} />
            <MetaRow label="Difficulty" value={mission.difficulty} />
            <MetaRow label="Curriculum" value={mission.curriculum} />
            <MetaRow label="Status" value={<span className="text-primary">✅ Teacher Ready</span>} />
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function MetaRow({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-surface/60 px-3 py-2">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="inline-flex items-center gap-1.5 text-sm">{icon}{value}</span>
    </div>
  );
}

function LiveAlertButton({ alert }: { alert: NonNullable<Alert> }) {
  const [open, setOpen] = useState(false);
  const Icon = alert.icon === "rocket" ? Rocket
    : alert.icon === "asteroid" ? AlertTriangle
    : alert.icon === "moon" ? Moon : Sun;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 rounded-md border border-alert/60 bg-alert/10 px-4 py-2.5 text-sm font-semibold text-alert-foreground alert-glow animate-pulse-alert"
      >
        <Icon className="h-4 w-4 text-alert" />
        <span className="text-foreground">🚨 Live Alert · {alert.label}</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-background/80 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
          <GlassPanel tone="alert" className="max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Live Alert</div>
            <h3 className="mt-2 font-display text-2xl font-semibold">{alert.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{alert.sub}</p>
            <p className="mt-4 text-sm">
              Mission Control has detected an event teachers can share with the class right now.
              Take 30 seconds to talk about it — real space, real time.
            </p>
            <Button onClick={() => setOpen(false)} className="mt-4 w-full">Got it</Button>
          </GlassPanel>
        </div>
      )}
    </>
  );
}

function SpaceEvents({
  className, launch, iss, neo, moon, weather,
}: {
  className?: string;
  launch: Awaited<ReturnType<typeof getNextLaunch>>;
  iss: Awaited<ReturnType<typeof getISSPosition>>;
  neo: Awaited<ReturnType<typeof getNextNearEarthObject>>;
  moon: ReturnType<typeof getMoonPhase>;
  weather: Awaited<ReturnType<typeof getSpaceWeather>>;
}) {
  type Event = { dot: string; label: string; sub: string; priority: number };
  const events: Event[] = [];
  if (launch) {
    const ms = new Date(launch.net).getTime() - Date.now();
    const hrs = ms / 3600_000;
    if (hrs > 0) {
      events.push({
        dot: "🔵",
        label: `${launch.name}`,
        sub: hrs < 24 ? `Launch in ${Math.round(hrs)}h` : `Launch in ${Math.round(hrs / 24)}d`,
        priority: 2,
      });
    }
  }
  if (iss && iss.visibility === "daylight") {
    events.push({ dot: "🟢", label: "ISS visible tonight", sub: "Over Australia at dusk", priority: 3 });
  } else if (iss) {
    events.push({ dot: "🟢", label: `ISS at ${iss.latitude.toFixed(0)}°, ${iss.longitude.toFixed(0)}°`, sub: `${Math.round(iss.velocityKmh).toLocaleString()} km/h`, priority: 3 });
  }
  if (neo) {
    events.push({ dot: "⚪", label: `Asteroid ${neo.name}`, sub: `Passes ${(neo.missKm / 1_000_000).toFixed(2)}M km away`, priority: 4 });
  }
  events.push({ dot: "🟣", label: `Moon reaches ${moon.name}`, sub: `${Math.round(moon.illumination * 100)}% illuminated`, priority: 5 });
  if (weather && weather.length > 0) {
    events.push({ dot: "🟡", label: "Solar activity: Moderate", sub: weather[0].type, priority: 6 });
  }

  const top = events.sort((a, b) => a.priority - b.priority).slice(0, 4);

  return (
    <div className={className}>
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Today's Space Events</div>
          <h3 className="mt-1 font-display text-xl font-semibold">Live from orbit and beyond</h3>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {top.map((e) => (
          <GlassPanel key={e.label} className="p-4">
            <div className="text-lg">{e.dot}</div>
            <div className="mt-1 font-display text-sm font-semibold leading-tight">{e.label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{e.sub}</div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

function MissionVault({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mb-3">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Mission Vault</div>
        <h3 className="mt-1 font-display text-xl font-semibold">Rapid missions, ready to run</h3>
        <p className="text-xs text-muted-foreground">Ideal for early finishers, relief lessons or quick bonus activities.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MISSION_VAULT.map((m) => (
          <VaultCard key={m.id} mission={m} />
        ))}
      </div>
    </div>
  );
}

function VaultCard({ mission }: { mission: MissionMeta }) {
  const live = mission.status === "live";
  const inner = (
    <GlassPanel className={cn("p-4 h-full", live ? "hover:border-primary/40 transition" : "opacity-70")}>
      <div className="flex items-center justify-between">
        <span className="telemetry text-[10px] tracking-widest text-cyan">{mission.code}</span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-0.5 text-[10px]">
          <Clock className="h-3 w-3" /> {mission.duration}
        </span>
      </div>
      <div className="mt-2 font-display text-base font-semibold leading-tight">{mission.title}</div>
      <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{mission.subtitle}</div>
      <div className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">{mission.focus}</div>
      <div className="mt-2 text-xs font-semibold">
        {live ? (
          <span className="inline-flex items-center gap-1 text-primary">Start <ArrowRight className="h-3 w-3" /></span>
        ) : (
          <span className="text-muted-foreground">Coming online</span>
        )}
      </div>
    </GlassPanel>
  );
  return live && mission.route
    ? <Link to={mission.route} className="block">{inner}</Link>
    : <div>{inner}</div>;
}
