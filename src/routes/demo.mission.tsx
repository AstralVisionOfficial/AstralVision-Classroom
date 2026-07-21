import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Button } from "@/components/ui/button";
import { Play, User, GraduationCap, CheckCircle2 } from "lucide-react";
import { type MissionTier, TIER_META, getTier, setTier } from "@/lib/mission-001";

export const Route = createFileRoute("/demo/mission")({
  head: () => ({ meta: [{ title: "Student View — Astral Vision" }] }),
  component: StudentEntry,
});

const TIER_ORDER: MissionTier[] = ["foundation", "standard", "advanced"];

function StudentEntry() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<MissionTier>("standard");

  useEffect(() => { setSelected(getTier()); }, []);

  function chooseAndStart(tier: MissionTier) {
    setTier(tier);
    setSelected(tier);
    navigate({ to: "/demo/lesson/mission-001-save-the-iss" });
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-5xl px-4 py-12 sm:px-6">
      <GlassPanel tone="strong" className="w-full p-8 sm:p-12">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">
            Student View · Choose your level
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Welcome, Mission Controller.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Pick your year level so Mission 001 uses language and questions suited to you.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {TIER_ORDER.map((t) => {
            const meta = TIER_META[t];
            const isSelected = selected === t;
            return (
              <button
                key={t}
                onClick={() => chooseAndStart(t)}
                className={
                  "group relative rounded-xl border p-5 text-left transition " +
                  (isSelected
                    ? "border-primary/60 bg-primary/5 cyan-glow"
                    : "border-border bg-surface hover:border-primary/40 hover:bg-primary/5")
                }
              >
                {isSelected && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-primary">
                    <CheckCircle2 className="h-3 w-3" /> Last used
                  </span>
                )}
                <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-4 telemetry text-[10px] uppercase tracking-widest text-cyan">
                  {meta.years}
                </div>
                <div className="mt-1 font-display text-xl font-semibold">{meta.label}</div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{meta.blurb}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-80 group-hover:opacity-100">
                  <Play className="h-3 w-3 fill-current" /> Start at this level
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs">
          <Button asChild size="lg" className="bg-cyan-grad text-primary-foreground hover:opacity-90">
            <Link to="/demo/lesson/mission-001-save-the-iss" onClick={() => setTier(selected)}>
              <Play className="mr-1 h-4 w-4 fill-current" /> Begin at {TIER_META[selected].label}
            </Link>
          </Button>
          <span className="text-muted-foreground">
            Prefer the teacher view? <Link to="/demo/classroom" className="text-primary hover:underline">Open the classroom</Link>.
          </span>
        </div>
      </GlassPanel>
    </main>
  );
}
