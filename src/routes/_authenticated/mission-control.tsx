import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { GlassPanel, PanelHeader } from "@/components/astral/GlassPanel";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { getISSPosition, getAPOD, getNextLaunch, getSpaceWeather } from "@/lib/space.functions";
import { Play, FileText, Eye, ArrowRight, Satellite, Rocket, Sun, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/mission-control")({
  head: () => ({ meta: [{ title: "Mission Control — Astral Vision" }] }),
  component: MissionControl,
});

function MissionControl() {
  const [displayName, setDisplayName] = useState("Mission Controller");
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const n = (data.user?.user_metadata?.display_name as string | undefined)
        || data.user?.email?.split("@")[0];
      if (n) setDisplayName(n);
    });
  }, []);

  const iss = useQuery({ queryKey: ["iss"], queryFn: () => getISSPosition(), refetchInterval: 8000 });
  const apod = useQuery({ queryKey: ["apod"], queryFn: () => getAPOD() });
  const launch = useQuery({ queryKey: ["launch"], queryFn: () => getNextLaunch() });
  const weather = useQuery({ queryKey: ["weather"], queryFn: () => getSpaceWeather() });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <GlassPanel tone="strong" className="overflow-hidden">
        <div className="relative p-6 sm:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-sweep" />
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">Mission Control</div>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">
            Good day, <span className="bg-cyan-grad bg-clip-text text-transparent">{displayName}</span>.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">Today's mission begins now.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">Today's Mission</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="telemetry text-xs tracking-[0.2em] text-cyan">MISSION 001</span>
              </div>
              <div className="mt-1 font-display text-2xl font-semibold">Save the ISS</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild className="bg-cyan-grad text-primary-foreground hover:opacity-90">
                  <Link to="/demo/lesson/mission-001-save-the-iss">
                    <Play className="mr-1 h-4 w-4 fill-current" /> Start Lesson
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/demo/lesson/mission-001-save-the-iss">Continue Yesterday</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/demo/lesson/mission-001-save-the-iss" hash="teacher-guide">
                    <FileText className="mr-1 h-4 w-4" /> Teacher Resources
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/demo/mission"><Eye className="mr-1 h-4 w-4" /> Student View</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Local UTC</div>
              <ClockTicker />
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Live telemetry */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <GlassPanel>
          <PanelHeader eyebrow="Live" title="International Space Station" meta={<><Satellite className="mr-1 inline h-3 w-3" /> Tracking</>} />
          <div className="p-5 text-sm space-y-1.5 telemetry">
            {iss.data ? (
              <>
                <Row label="Latitude"  value={iss.data.latitude.toFixed(2) + "°"} />
                <Row label="Longitude" value={iss.data.longitude.toFixed(2) + "°"} />
                <Row label="Altitude"  value={iss.data.altitudeKm.toFixed(1) + " km"} />
                <Row label="Velocity"  value={Math.round(iss.data.velocityKmh).toLocaleString() + " km/h"} />
                <Row label="Visibility" value={iss.data.visibility} />
              </>
            ) : (
              <p className="text-muted-foreground">Acquiring signal…</p>
            )}
          </div>
        </GlassPanel>

        <GlassPanel>
          <PanelHeader eyebrow="Countdown" title="Next launch" meta={<><Rocket className="mr-1 inline h-3 w-3" /> LL2</>} />
          <div className="p-5 text-sm">
            {launch.data ? (
              <>
                <div className="font-display text-lg font-semibold">{launch.data.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {launch.data.provider} · {launch.data.pad}
                </div>
                <div className="mt-3 telemetry text-2xl text-cyan">
                  <LaunchCountdown iso={launch.data.net} />
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">No upcoming launches on record.</p>
            )}
          </div>
        </GlassPanel>

        <GlassPanel>
          <PanelHeader eyebrow="Solar" title="Space weather" meta={<><Sun className="mr-1 inline h-3 w-3" /> NASA DONKI</>} />
          <div className="p-5 text-sm">
            {weather.data && weather.data.length > 0 ? (
              <ul className="space-y-2">
                {weather.data.map((w) => (
                  <li key={w.id} className="rounded-md bg-secondary/40 px-3 py-2">
                    <div className="text-xs font-semibold text-primary">{w.type}</div>
                    <div className="text-[11px] text-muted-foreground telemetry">{new Date(w.issued).toUTCString()}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">All quiet on the solar front.</p>
            )}
          </div>
        </GlassPanel>
      </div>

      {/* APOD */}
      {apod.data && (
        <GlassPanel className="mt-8 overflow-hidden">
          <PanelHeader eyebrow="Astronomy Picture of the Day" title={apod.data.title} meta={<><ImageIcon className="mr-1 inline h-3 w-3" /> NASA APOD · {apod.data.date}</>} />
          <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
            {apod.data.mediaType === "image" ? (
              <img src={apod.data.url} alt={apod.data.title} className="h-full max-h-[420px] w-full object-cover" />
            ) : (
              <a href={apod.data.url} target="_blank" rel="noreferrer" className="grid place-items-center p-8 text-primary underline">
                View media on NASA APOD
              </a>
            )}
            <div className="p-6">
              <p className="text-sm text-muted-foreground line-clamp-[12]">{apod.data.explanation}</p>
            </div>
          </div>
        </GlassPanel>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function ClockTicker() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="mt-1 telemetry text-3xl font-semibold text-cyan">
      {now.toISOString().slice(11, 19)}Z
    </div>
  );
}

function LaunchCountdown({ iso }: { iso: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const diff = Math.max(0, new Date(iso).getTime() - now);
  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return <span>T-{d}d {String(h).padStart(2,"0")}:{String(m).padStart(2,"0")}:{String(sec).padStart(2,"0")}</span>;
}
