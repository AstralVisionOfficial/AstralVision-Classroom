// The big one — Mission 001: Save the ISS
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { CurriculumBadge } from "@/components/astral/CurriculumBadge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";
import {
  MISSION_001, MISSION_001_CURRICULUM,
  orbitalPeriodMinutes, orbitalVelocityKms, estimateMissKm,
  type MissionTier, TIER_META, TIER_COPY, getTier, type PracticeQuestion,
} from "@/lib/mission-001";
import {
  AlertTriangle, Rocket, ArrowRight, ArrowLeft, Sparkles, ClipboardCheck,
  BookOpen, Award, Download, Radar, CheckCircle2, Play, Timer,
} from "lucide-react";

export const Route = createFileRoute("/demo/lesson/mission-001-save-the-iss")({
  head: () => ({
    meta: [
      { title: "Mission 001: Save the ISS — Astral Vision" },
      { name: "description", content: "A curriculum-aligned Year 8 space mission: analyse a debris conjunction and plan an avoidance manoeuvre." },
    ],
  }),
  component: LessonPage,
});

type Stage = "cover" | "alert" | "briefing" | "learn-orbit" | "learn-debris" | "analyse" | "debrief" | "reflection" | "closer";

const STAGES: { id: Stage; label: string }[] = [
  { id: "cover",         label: "Cover" },
  { id: "alert",         label: "Cold Open" },
  { id: "briefing",      label: "Briefing" },
  { id: "learn-orbit",   label: "Orbital Motion" },
  { id: "learn-debris",  label: "Gravity & Debris" },
  { id: "analyse",       label: "The Manoeuvre" },
  { id: "debrief",       label: "Debrief" },
  { id: "reflection",    label: "Reflection" },
  { id: "closer",        label: "Did You Know?" },
];

function LessonPage() {
  const [stage, setStage] = useState<Stage>("cover");
  const idx = STAGES.findIndex((s) => s.id === stage);
  const progress = ((idx) / (STAGES.length - 1)) * 100;

  const [studentName, setStudentName] = useState("");
  const [deltaV, setDeltaV] = useState(0.5); // m/s
  const [direction, setDirection] = useState<"prograde" | "retrograde" | "radial">("prograde");
  const [minutesBefore, setMinutesBefore] = useState(20);
  const [committed, setCommitted] = useState(false);
  const missKm = estimateMissKm(deltaV, direction, minutesBefore);
  const success = missKm > 2;

  const [reflections, setReflections] = useState<Record<number, string>>({});

  // Tier is read from localStorage after hydration; SSR default is "standard".
  const [tier, setTierState] = useState<MissionTier>("standard");
  useEffect(() => { setTierState(getTier()); }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [stage]);

  return (
    <main className="min-h-[calc(100vh-3.5rem)]">
      {stage !== "cover" && stage !== "alert" && (
        <div className="border-b border-border/60 bg-background/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5 sm:px-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
              <span className="telemetry">MISSION 001</span> · Save the ISS
            </div>
            <div className="hidden sm:block h-3 w-px bg-border" />
            <div className="hidden sm:block text-[11px] text-muted-foreground truncate">
              AC {MISSION_001_CURRICULUM.code} · {MISSION_001_CURRICULUM.yearLevel} · {MISSION_001_CURRICULUM.strand}
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Link
                to="/demo/mission"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary hover:bg-primary/10"
                title="Change grade level"
              >
                <span>{TIER_META[tier].label}</span>
                <span className="text-muted-foreground normal-case tracking-normal">· {TIER_META[tier].years}</span>
              </Link>
              <span className="hidden sm:inline text-[11px] text-muted-foreground telemetry">
                Stage {idx}/{STAGES.length - 1}
              </span>
              <TeacherNotes />
            </div>
          </div>
          <div className="h-0.5 w-full bg-border/40">
            <div className="h-full bg-cyan-grad transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12" id="teacher-guide">
        {stage === "cover" && (
          <CoverStage
            onStart={() => setStage("alert")}
            studentName={studentName}
            setStudentName={setStudentName}
          />
        )}
        {stage === "alert" && <AlertStage onContinue={() => setStage("briefing")} />}
        {stage === "briefing" && <BriefingStage tier={tier} onContinue={() => setStage("learn-orbit")} />}
        {stage === "learn-orbit" && (
          <LearnOrbitStage tier={tier} onBack={() => setStage("briefing")} onNext={() => setStage("learn-debris")} />
        )}
        {stage === "learn-debris" && (
          <LearnDebrisStage tier={tier} onBack={() => setStage("learn-orbit")} onNext={() => setStage("analyse")} />
        )}
        {stage === "analyse" && (
          <AnalyseStage
            tier={tier}
            deltaV={deltaV} setDeltaV={setDeltaV}
            direction={direction} setDirection={setDirection}
            minutesBefore={minutesBefore} setMinutesBefore={setMinutesBefore}
            missKm={missKm} success={success} committed={committed}
            onCommit={() => setCommitted(true)}
            onBack={() => setStage("learn-debris")}
            onNext={() => setStage("debrief")}
          />
        )}
        {stage === "debrief" && (
          <DebriefStage
            studentName={studentName}
            onNext={() => setStage("reflection")}
          />
        )}
        {stage === "reflection" && (
          <ReflectionStage
            reflections={reflections} setReflections={setReflections}
            onNext={() => setStage("closer")}
          />
        )}
        {stage === "closer" && <CloserStage />}
      </div>
    </main>
  );
}

/* ---------------- Stages ---------------- */

function CoverStage({ onStart, studentName, setStudentName }: {
  onStart: () => void; studentName: string; setStudentName: (n: string) => void;
}) {
  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <div className="telemetry text-[11px] tracking-[0.3em] text-cyan">MISSION 001</div>
          <h1 className="mt-1 font-display text-4xl font-bold sm:text-6xl">Save the ISS</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Debris on a projected collision path with the International Space Station. Your team has
            45 minutes to analyse the situation and recommend the safest course of action.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cyan">
          <span className="relative flex h-1.5 w-1.5"><span className="absolute h-full w-full rounded-full bg-primary animate-ping-slow" /><span className="relative h-1.5 w-1.5 rounded-full bg-primary" /></span>
          Live mission
        </div>
      </div>

      <CurriculumBadge info={MISSION_001_CURRICULUM} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <GlassPanel className="p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Before you begin</div>
          <label className="mt-4 block text-sm font-medium">Mission Controller name</label>
          <input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter your name for the certificate"
            className="mt-1 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-primary/60"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Your name will appear on your Mission Certificate at the end of the mission.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={onStart} className="bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow">
              <Play className="mr-1 h-4 w-4 fill-current" /> Start Lesson
            </Button>
            <TeacherNotesButton />
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Mission Objectives</div>
          <ul className="mt-3 space-y-2 text-sm">
            {MISSION_001.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>
    </div>
  );
}

function AlertStage({ onContinue }: { onContinue: () => void }) {
  const [line, setLine] = useState("");
  const [countdown, setCountdown] = useState(15 * 60);

  useEffect(() => {
    let i = 0;
    const txt = MISSION_001.narrationOpening;
    const t = setInterval(() => {
      i += 2;
      setLine(txt.slice(0, i));
      if (i >= txt.length) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  return (
    <div className="relative animate-fade-in">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-alert to-transparent animate-sweep" />
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-10 text-center sm:py-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-alert/60 bg-alert/10 px-4 py-1.5 animate-pulse-alert">
          <AlertTriangle className="h-4 w-4 text-alert" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-alert-foreground">
            Mission Alert · ISS Conjunction
          </span>
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold sm:text-6xl">
          <span className="bg-alert-grad bg-clip-text text-transparent">Debris on Track</span>
        </h1>
        <div className="mt-6 grid gap-2 telemetry text-sm">
          <Line k="Object" v="Unclassified debris (~30 cm)" />
          <Line k="Target" v="International Space Station · 25544" />
          <Line k="Risk" v="MODERATE — closing at 14.6 km/s" />
          <Line k="Time to conjunction" v={`T-${mm}:${ss}`} highlight />
        </div>
        <GlassPanel tone="strong" className="mt-8 max-w-2xl p-6 sm:p-8 text-left">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Incoming Transmission</div>
          <p className="mt-3 text-sm text-foreground/90 sm:text-base leading-relaxed">
            {line}<span className="ml-0.5 inline-block w-1.5 h-4 -mb-0.5 bg-primary animate-[typewriter-caret_1s_steps(1)_infinite]" />
          </p>
        </GlassPanel>
        <Button
          onClick={onContinue}
          size="lg"
          className="mt-8 bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow"
        >
          Accept Mission <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Line({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className={"flex items-center justify-between rounded-md border px-4 py-1.5 " + (highlight ? "border-alert/50 bg-alert/10" : "border-border bg-surface")}>
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{k}</span>
      <span className={highlight ? "text-alert" : ""}>{v}</span>
    </div>
  );
}

function BriefingStage({ tier, onContinue }: { tier: MissionTier; onContinue: () => void }) {
  const copy = TIER_COPY[tier];
  return (
    <div className="animate-fade-in-up space-y-6">
      <StageHeader eyebrow="Briefing" title="Flight Director requests your assistance" />
      <GlassPanel className="p-6 sm:p-8">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
          {TIER_META[tier].label} · {TIER_META[tier].years}
        </div>
        <p className="mt-3 text-sm sm:text-base text-foreground/90 leading-relaxed">
          {copy.briefing}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["1", "Learn how orbits behave"],
            ["2", "Understand debris in orbit"],
            ["3", "Recommend a manoeuvre"],
          ].map(([n, t]) => (
            <div key={n} className="rounded-md border border-border bg-surface p-4">
              <div className="telemetry text-xs text-cyan">Objective {n}</div>
              <div className="mt-1 font-medium">{t}</div>
            </div>
          ))}
        </div>
      </GlassPanel>
      <div className="flex justify-end">
        <Button onClick={onContinue} size="lg" className="bg-cyan-grad text-primary-foreground hover:opacity-90">
          Begin briefing <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function LearnOrbitStage({ tier, onBack, onNext }: { tier: MissionTier; onBack: () => void; onNext: () => void }) {
  const [altitude, setAltitude] = useState(408); // ISS altitude
  const period = orbitalPeriodMinutes(altitude);
  const velocity = orbitalVelocityKms(altitude);
  const copy = TIER_COPY[tier];
  return (
    <div className="animate-fade-in-up space-y-6">
      <StageHeader eyebrow="Learn · Stage 1" title="Orbital Motion — how altitude changes the game" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassPanel className="p-6">
          <p className="text-sm sm:text-base leading-relaxed">{copy.learnOrbitLead}</p>
          <p className="mt-3 text-sm text-muted-foreground">{copy.learnOrbitHint}</p>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="flex items-baseline justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">Altitude</div>
            <div className="telemetry text-lg font-semibold text-cyan">{altitude} km</div>
          </div>
          <Slider value={[altitude]} min={200} max={2000} step={10} onValueChange={(v) => setAltitude(v[0]!)} className="mt-3" />
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Stat label="Period (T)" value={`${period.toFixed(1)} min`} />
            <Stat label="Velocity (v)" value={`${velocity.toFixed(2)} km/s`} tone="orange" />
          </div>
          <div className="mt-4 rounded-md bg-secondary/40 p-3 text-xs text-muted-foreground">
            The ISS orbits at ~408 km, ~7.66 km/s, once every ~92.7 minutes.
          </div>
        </GlassPanel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <FormulaCard
          term="Orbital Period (T)"
          definition="The time it takes to complete one full lap around Earth. Higher orbits are slower and take longer."
          formula="T = 2π √( a³ / GM )"
          variables={[
            ["a", "Orbital radius = Earth radius (6,371 km) + altitude"],
            ["G", "Gravitational constant = 6.674 × 10⁻¹¹ N·m²/kg²"],
            ["M", "Mass of Earth = 5.972 × 10²⁴ kg"],
          ]}
          example={`At 408 km: a = 6,779 km → T ≈ ${orbitalPeriodMinutes(408).toFixed(1)} min`}
        />
        <FormulaCard
          term="Orbital Velocity (v)"
          definition="The speed needed to stay in a stable circular orbit at that altitude. Higher orbits require less speed."
          formula="v = √( GM / a )"
          variables={[
            ["a", "Orbital radius (m)"],
            ["G, M", "Same constants as above"],
          ]}
          example={`At 408 km: v ≈ ${orbitalVelocityKms(408).toFixed(2)} km/s (~27,600 km/h)`}
        />
      </div>
      <StageNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
  );
}

function LearnDebrisStage({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="animate-fade-in-up space-y-6">
      <StageHeader eyebrow="Learn · Stage 2" title="Gravity, Debris & the Kessler problem" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassPanel className="p-6">
          <p className="text-sm sm:text-base leading-relaxed">
            Space is not empty. There are over <span className="text-cyan font-semibold">36,500 tracked objects</span>
            larger than 10 cm orbiting Earth — plus an estimated <span className="text-cyan font-semibold">1 million</span> between 1 and 10 cm.
            Each moves at roughly 7-8 km/s.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            A 1 cm fragment carries the kinetic energy of a hand grenade at those speeds. That's why even
            small debris on a projected path is treated as a critical threat.
          </p>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">Key idea</div>
          <div className="mt-2 font-display text-xl font-semibold">
            Small velocity changes → large positional changes.
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A tiny burn of just a few m/s applied 20 minutes before conjunction can shift the ISS by
            kilometres by the time debris arrives. That's the manoeuvre you'll design next.
          </p>
        </GlassPanel>
      </div>
      <StageNav onBack={onBack} onNext={onNext} nextLabel="Design the manoeuvre" />
    </div>
  );
}

function AnalyseStage(props: {
  deltaV: number; setDeltaV: (n: number) => void;
  direction: "prograde" | "retrograde" | "radial"; setDirection: (d: "prograde" | "retrograde" | "radial") => void;
  minutesBefore: number; setMinutesBefore: (n: number) => void;
  missKm: number; success: boolean; committed: boolean;
  onCommit: () => void; onBack: () => void; onNext: () => void;
}) {
  const { deltaV, setDeltaV, direction, setDirection, minutesBefore, setMinutesBefore, missKm, success, committed, onCommit, onBack, onNext } = props;
  return (
    <div className="animate-fade-in-up space-y-6">
      <StageHeader eyebrow="Analyse" title="Recommend the manoeuvre" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassPanel className="p-6">
          <div className="flex items-baseline justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">Δv (delta-v)</div>
            <div className="telemetry text-lg font-semibold text-cyan">{deltaV.toFixed(2)} m/s</div>
          </div>
          <Slider value={[deltaV]} min={0} max={2} step={0.05} onValueChange={(v) => setDeltaV(v[0]!)} className="mt-3" />

          <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">Burn direction</div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
            {(["prograde","retrograde","radial"] as const).map((d) => (
              <button key={d}
                onClick={() => setDirection(d)}
                className={"rounded-md border px-3 py-2 capitalize " + (direction === d ? "border-primary/60 bg-primary/10 text-primary" : "border-border hover:bg-secondary/40")}>
                {d}
              </button>
            ))}
          </div>
          <div className="mt-3 rounded-md border border-border bg-secondary/30 p-3 text-xs text-muted-foreground leading-relaxed">
            {direction === "prograde" && (
              <><span className="text-cyan font-semibold">Prograde</span> — burn in the direction of motion. Adds energy, raises orbit, shifts you <em>ahead</em> along the track over time. Full effect on along-track position.</>
            )}
            {direction === "retrograde" && (
              <><span className="text-cyan font-semibold">Retrograde</span> — burn opposite to motion. Removes energy, lowers orbit, shifts you <em>behind</em> along the track. Full effect on along-track position.</>
            )}
            {direction === "radial" && (
              <><span className="text-cyan font-semibold">Radial</span> — burn perpendicular to motion (toward or away from Earth). Distorts the orbit shape but produces only ~35% of the along-track shift a prograde/retrograde burn would.</>
            )}
          </div>

          <div className="mt-6 flex items-baseline justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">Minutes before conjunction</div>
            <div className="telemetry text-lg font-semibold text-cyan">{minutesBefore} min</div>
          </div>
          <Slider value={[minutesBefore]} min={2} max={45} step={1} onValueChange={(v) => setMinutesBefore(v[0]!)} className="mt-3" />
        </GlassPanel>
        <GlassPanel className={"p-6 " + (success ? "border-primary/50" : "border-alert/40")}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">Projected miss distance</div>
          <div className={"mt-2 telemetry text-4xl font-semibold " + (success ? "text-cyan" : "text-alert")}>
            {missKm >= 0 ? "+" : ""}{missKm.toFixed(2)} km
          </div>
          <div className="mt-3">
            <Progress value={Math.max(0, Math.min(100, ((missKm + 3) / 10) * 100))} className="h-2" />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>Collision</span><span>Safe margin</span>
            </div>
          </div>
          <div className={"mt-4 rounded-md p-3 text-xs " + (success ? "bg-primary/10 text-primary" : "bg-alert/10 text-alert")}>
            {success
              ? "SAFE — the ISS clears the projected debris path with margin."
              : "UNSAFE — projected miss distance below the 2 km safety threshold."}
          </div>
          <Button
            onClick={() => { onCommit(); toast.success("Recommendation logged to Mission Control."); }}
            disabled={!success}
            className="mt-5 w-full bg-cyan-grad text-primary-foreground hover:opacity-90"
          >
            <ClipboardCheck className="mr-1 h-4 w-4" /> Commit recommendation
          </Button>
          {!success && (
            <p className="mt-2 text-[11px] text-muted-foreground">
              Reach a safe miss distance before committing — adjust Δv, direction, or timing.
            </p>
          )}
        </GlassPanel>
      </div>

      <FormulaCard
        term="Along-track shift (Δs)"
        definition="The distance the ISS is displaced along its orbit by the time debris arrives. This is what your projected miss distance is built from."
        formula="Δs ≈ Δv × t × k"
        variables={[
          ["Δv", "Burn magnitude (m/s) — the delta-v slider"],
          ["t", "Time before conjunction (seconds) — the minutes slider × 60"],
          ["k", "Direction factor: 1.0 for prograde/retrograde, 0.35 for radial"],
        ]}
        example={`Now: Δv=${deltaV.toFixed(2)} m/s · t=${minutesBefore*60}s · k=${direction==="radial"?"0.35":"1.0"} → Δs ≈ ${(deltaV*minutesBefore*60*(direction==="radial"?0.35:1)/1000).toFixed(2)} km`}
      />

      <PracticeQuestions deltaV={deltaV} minutesBefore={minutesBefore} direction={direction} />

      <StageNav onBack={onBack} onNext={onNext} nextLabel="View debrief" nextDisabled={!committed} />
    </div>
  );
}

function DebriefStage({ studentName, onNext }: { studentName: string; onNext: () => void }) {
  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-grad cyan-glow animate-fade-in">
          <Sparkles className="h-7 w-7 text-primary-foreground" />
        </div>
        <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">Mission Successful</div>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl">
          <span className="bg-cyan-grad bg-clip-text text-transparent">Well done.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          You successfully prevented a collision with the International Space Station.
        </p>
      </div>

      <GlassPanel tone="strong" className="p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Today you learned</div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {MISSION_001.outcomes.map((o) => (
                <li key={o} className="flex items-center gap-2 rounded-md bg-secondary/40 px-3 py-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {o}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-cyan-grad text-primary-foreground hover:opacity-90">
                <a href={certificateDataUri(studentName || "Mission Controller")}
                   download="astral-vision-mission-001-certificate.svg">
                  <Download className="mr-1 h-4 w-4" /> Download Certificate
                </a>
              </Button>
              <Button variant="outline" onClick={onNext}>
                Continue to reflection <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RewardTile icon={Award} label="+250 XP" sub="Experience earned" />
            <RewardTile icon={Radar} label="Orbital Guardian" sub="Badge unlocked" tone="orange" />
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}

function ReflectionStage({ reflections, setReflections, onNext }: {
  reflections: Record<number, string>;
  setReflections: (r: Record<number, string>) => void;
  onNext: () => void;
}) {
  const filled = MISSION_001.reflectionPrompts.every((_, i) => (reflections[i] ?? "").trim().length > 0);
  return (
    <div className="animate-fade-in-up space-y-6">
      <StageHeader eyebrow="Reflection" title="What did you learn?" />
      <div className="grid gap-4 lg:grid-cols-2">
        {MISSION_001.reflectionPrompts.map((q, i) => (
          <GlassPanel key={q} className="p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">Prompt {i + 1}</div>
            <div className="mt-1 font-display text-lg font-semibold">{q}</div>
            <Textarea
              value={reflections[i] ?? ""}
              onChange={(e) => setReflections({ ...reflections, [i]: e.target.value })}
              rows={3}
              placeholder="Write a sentence or two…"
              className="mt-3"
            />
          </GlassPanel>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Reflections are saved to your device for this demo. Signed-in students save to their profile.
        </p>
        <Button
          onClick={() => {
            try { localStorage.setItem("astral:mission-001:reflection", JSON.stringify(reflections)); } catch {}
            toast.success("Reflection saved.");
            onNext();
          }}
          disabled={!filled}
          className="bg-cyan-grad text-primary-foreground hover:opacity-90"
        >
          Save & continue <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function CloserStage() {
  return (
    <div className="animate-fade-in-up space-y-6">
      <GlassPanel tone="strong" className="p-8 sm:p-12">
        <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">Did you know?</div>
        <p className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
          {MISSION_001.didYouKnow}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow">
            <Link to="/demo/principal">View Principal Dashboard <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/">Return home</Link>
          </Button>
        </div>
      </GlassPanel>
    </div>
  );
}

/* ---------------- Sub-components ---------------- */

function StageHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">{eyebrow}</div>
      <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
    </div>
  );
}
function StageNav({ onBack, onNext, nextLabel, nextDisabled }: { onBack: () => void; onNext: () => void; nextLabel: string; nextDisabled?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" onClick={onBack}><ArrowLeft className="mr-1 h-4 w-4" /> Back</Button>
      <Button onClick={onNext} disabled={nextDisabled} className="bg-cyan-grad text-primary-foreground hover:opacity-90">
        {nextLabel} <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}
function Stat({ label, value, tone }: { label: string; value: string; tone?: "cyan" | "orange" }) {
  return (
    <div className="rounded-md border border-border bg-secondary/40 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={"telemetry text-lg font-semibold " + (tone === "cyan" ? "text-cyan" : tone === "orange" ? "text-orange" : "")}>{value}</div>
    </div>
  );
}
function RewardTile({ icon: Icon, label, sub, tone }: { icon: typeof Award; label: string; sub: string; tone?: "orange" }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className={"grid h-9 w-9 place-items-center rounded-md " + (tone === "orange" ? "bg-accent/15" : "bg-primary/10")}>
        <Icon className={"h-4 w-4 " + (tone === "orange" ? "text-orange" : "text-primary")} />
      </div>
      <div className="mt-3 font-display text-lg font-semibold">{label}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function TeacherNotesButton() {
  return <TeacherNotes triggerVariant="outline" triggerLabel="Teacher Guide" />;
}

function TeacherNotes({
  triggerVariant = "ghost", triggerLabel = "Teacher Notes",
}: { triggerVariant?: "ghost" | "outline"; triggerLabel?: string }) {
  const g = MISSION_001.teacherGuide;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant={triggerVariant}>
          <BookOpen className="mr-1 h-4 w-4" /> {triggerLabel}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Teacher Guide — Mission 001</SheetTitle>
          <SheetDescription>
            Learning intentions, discussion prompts, misconceptions, and assessment rubric.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6 pb-10 pr-4">
          <TSection title="Learning Intentions" items={g.learningIntentions} />
          <TSection title="Success Criteria" items={g.successCriteria} />
          <TSection title="Materials" items={g.materials} />
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-cyan">Lesson Flow</h3>
            <ul className="mt-2 space-y-1.5 text-sm">
              {g.lessonFlow.map(([t, d]) => (
                <li key={t as string} className="flex gap-3"><span className="telemetry w-16 shrink-0 text-cyan">{t}</span><span className="text-muted-foreground">{d}</span></li>
              ))}
            </ul>
          </div>
          <TSection title="Discussion Questions" items={g.discussionQuestions} />
          <TSection title="Expected Misconceptions" items={g.misconceptions} tone="orange" />
          <TSection title="Common Student Mistakes" items={g.commonMistakes} tone="orange" />
          <TSection title="Discussion Ideas" items={g.discussionIdeas} />
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-cyan">Assessment Rubric</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {g.assessmentRubric.map(([level, d]) => (
                <li key={level as string} className="rounded-md border border-border bg-secondary/40 p-3">
                  <div className="font-semibold">{level}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{d}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-cyan">Extension</h3>
            <p className="mt-2 text-sm text-muted-foreground">{g.extension}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
function TSection({ title, items, tone }: { title: string; items: string[]; tone?: "orange" }) {
  return (
    <div>
      <h3 className={"font-display text-sm font-semibold uppercase tracking-widest " + (tone === "orange" ? "text-orange" : "text-cyan")}>{title}</h3>
      <ul className="mt-2 space-y-1.5 text-sm">
        {items.map((s) => (
          <li key={s} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /><span className="text-muted-foreground">{s}</span></li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Formula & practice ---------------- */

function FormulaCard({ term, definition, formula, variables, example }: {
  term: string; definition: string; formula: string; variables: [string, string][]; example?: string;
}) {
  return (
    <GlassPanel className="p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">Definition · Formula</div>
      <div className="mt-1 font-display text-lg font-semibold">{term}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{definition}</p>
      <div className="mt-3 rounded-md border border-primary/30 bg-primary/5 px-4 py-3 telemetry text-base sm:text-lg text-cyan text-center">
        {formula}
      </div>
      <ul className="mt-3 space-y-1 text-xs">
        {variables.map(([sym, desc]) => (
          <li key={sym} className="flex gap-2">
            <span className="telemetry text-cyan shrink-0 w-14">{sym}</span>
            <span className="text-muted-foreground">{desc}</span>
          </li>
        ))}
      </ul>
      {example && (
        <div className="mt-3 rounded-md bg-secondary/40 px-3 py-2 text-xs text-foreground/80">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Worked example · </span>
          {example}
        </div>
      )}
    </GlassPanel>
  );
}

function PracticeQuestions({ deltaV, minutesBefore, direction }: {
  deltaV: number; minutesBefore: number; direction: "prograde" | "retrograde" | "radial";
}) {
  // Q1: computed from current sliders — students must compute along-track shift in km.
  const k = direction === "radial" ? 0.35 : 1;
  const q1Answer = (deltaV * minutesBefore * 60 * k) / 1000; // km
  // Q2: fixed scenario — Δv=0.8 m/s prograde, 15 min before → 0.72 km
  const q2Answer = (0.8 * 15 * 60 * 1) / 1000;
  // Q3: fixed altitude question — period at 500 km
  const q3Answer = orbitalPeriodMinutes(500);

  return (
    <GlassPanel className="p-6">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">Check your maths</div>
      <div className="mt-1 font-display text-lg font-semibold">Use the formulas to justify your recommendation</div>
      <p className="mt-1 text-sm text-muted-foreground">
        Work these out on paper first, then type your answer. Round to 2 decimal places.
      </p>
      <div className="mt-4 space-y-3">
        <Question
          n={1}
          prompt={`Using your current settings (Δv = ${deltaV.toFixed(2)} m/s, t = ${minutesBefore} min, direction = ${direction}), what is the along-track shift Δs in kilometres? Formula: Δs = Δv × t × k ÷ 1000.`}
          answer={q1Answer}
          unit="km"
          tolerance={0.05}
        />
        <Question
          n={2}
          prompt="A prograde burn of Δv = 0.8 m/s is applied 15 minutes before conjunction. What along-track shift does this produce (in km)?"
          answer={q2Answer}
          unit="km"
          tolerance={0.05}
        />
        <Question
          n={3}
          prompt="Using T = 2π√(a³/GM) with G = 6.674×10⁻¹¹, M = 5.972×10²⁴ kg, and Earth's radius 6,371 km, what is the orbital period (in minutes) at an altitude of 500 km?"
          answer={q3Answer}
          unit="min"
          tolerance={0.5}
        />
      </div>
    </GlassPanel>
  );
}

function Question({ n, prompt, answer, unit, tolerance }: {
  n: number; prompt: string; answer: number; unit: string; tolerance: number;
}) {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const check = () => {
    const num = parseFloat(val);
    if (isNaN(num)) { setStatus("wrong"); return; }
    setStatus(Math.abs(num - answer) <= tolerance ? "correct" : "wrong");
  };
  return (
    <div className="rounded-md border border-border bg-surface p-4">
      <div className="flex gap-3">
        <div className="telemetry text-xs text-cyan shrink-0">Q{n}</div>
        <div className="text-sm leading-relaxed">{prompt}</div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={val}
          onChange={(e) => { setVal(e.target.value); setStatus("idle"); }}
          inputMode="decimal"
          placeholder="Your answer"
          className="w-32 rounded-md border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-primary/60"
        />
        <span className="text-xs text-muted-foreground">{unit}</span>
        <Button size="sm" variant="outline" onClick={check}>Check</Button>
        {status === "correct" && (
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <CheckCircle2 className="h-3.5 w-3.5" /> Correct — {answer.toFixed(2)} {unit}
          </span>
        )}
        {status === "wrong" && (
          <span className="text-xs text-alert">Not quite — try again. Re-check units and rounding.</span>
        )}
      </div>
    </div>
  );
}



/* Certificate: generated as an inline SVG data URI so the demo has no server dependency. */
function certificateDataUri(name: string) {
  const safe = name.replace(/[<>&"']/g, "").slice(0, 60);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="990" viewBox="0 0 1400 990">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a1024"/><stop offset="1" stop-color="#0b1a2e"/>
    </linearGradient>
    <linearGradient id="cyan" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#67e8f9"/><stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="1400" height="990" fill="url(#bg)"/>
  <rect x="40" y="40" width="1320" height="910" fill="none" stroke="url(#cyan)" stroke-width="2"/>
  <text x="700" y="180" fill="#67e8f9" font-family="Space Grotesk, sans-serif" font-size="18" text-anchor="middle" letter-spacing="8">ASTRAL VISION · FOUNDING SCHOOL PROGRAM</text>
  <text x="700" y="330" fill="#ffffff" font-family="Space Grotesk, sans-serif" font-size="72" font-weight="700" text-anchor="middle">MISSION SUCCESSFUL</text>
  <text x="700" y="400" fill="#94a3b8" font-family="Inter, sans-serif" font-size="24" text-anchor="middle">This certifies that</text>
  <text x="700" y="500" fill="#ffffff" font-family="Space Grotesk, sans-serif" font-size="60" font-weight="600" text-anchor="middle">${safe}</text>
  <text x="700" y="560" fill="#94a3b8" font-family="Inter, sans-serif" font-size="22" text-anchor="middle">successfully completed</text>
  <text x="700" y="620" fill="#f59e0b" font-family="Space Grotesk, sans-serif" font-size="34" font-weight="600" text-anchor="middle">MISSION 001 — SAVE THE ISS</text>
  <text x="700" y="740" fill="#cbd5e1" font-family="Inter, sans-serif" font-size="18" text-anchor="middle">Orbital motion · Gravity · Velocity · Engineering design · Critical thinking</text>
  <text x="700" y="890" fill="#67e8f9" font-family="JetBrains Mono, monospace" font-size="14" text-anchor="middle" letter-spacing="4">ASTRAL VISION · ${new Date().getFullYear()}</text>
</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
