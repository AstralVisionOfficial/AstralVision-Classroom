// Mission 001 — Planet Killer
// A Year 8 interactive Mission Control experience.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import {
  AlertTriangle, ArrowRight, ArrowLeft, Radar, CheckCircle2,
  Shield, Sparkles, BookOpen, Award, Play, Telescope,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/archive/demo/lesson/mission-001-save-the-iss")({
  head: () => ({
    meta: [
      { title: "Mission 001: Planet Killer — Astral Vision" },
      { name: "description", content: "Can Mission Control save Earth from an asteroid? A Year 8 interactive mission." },
      { property: "og:title", content: "Mission 001: Planet Killer" },
      { property: "og:description", content: "Join Mission Control and decide whether Earth is really in danger." },
    ],
  }),
  component: LessonPage,
});

type Stage = "cinematic" | "detection" | "identify" | "lab" | "observe" | "defend" | "debrief" | "rewards";

const STAGES: { id: Stage; label: string }[] = [
  { id: "cinematic", label: "Alert" },
  { id: "detection", label: "Detection" },
  { id: "identify",  label: "Identify" },
  { id: "lab",       label: "Mission Lab" },
  { id: "observe",   label: "Observe" },
  { id: "defend",    label: "Defend" },
  { id: "debrief",   label: "Debrief" },
  { id: "rewards",   label: "Rewards" },
];

function LessonPage() {
  const [stage, setStage] = useState<Stage>("cinematic");
  const idx = STAGES.findIndex((s) => s.id === stage);
  const progress = (idx / (STAGES.length - 1)) * 100;

  const go = (s: Stage) => { setStage(s); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };
  const next = () => go(STAGES[Math.min(idx + 1, STAGES.length - 1)].id);
  const prev = () => go(STAGES[Math.max(idx - 1, 0)].id);

  return (
    <main className="min-h-screen">
      {/* Top HUD */}
      <div className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Link to="/demo/mission-control" className="text-xs text-muted-foreground hover:text-foreground">
            ← Mission Control
          </Link>
          <div className="hidden sm:block text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">
            Mission 001 · Planet Killer
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:block w-40"><Progress value={progress} /></div>
            <span className="telemetry text-[10px] text-muted-foreground">{idx + 1}/{STAGES.length}</span>
            <TeacherPanel />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {stage === "cinematic" && <Cinematic onBegin={() => go("detection")} />}
        {stage === "detection" && <Detection onNext={next} />}
        {stage === "identify"  && <Identify onNext={next} onBack={prev} />}
        {stage === "lab"       && <MissionLab onNext={next} onBack={prev} />}
        {stage === "observe"   && <Observe onNext={next} onBack={prev} />}
        {stage === "defend"    && <Defend onNext={next} onBack={prev} />}
        {stage === "debrief"   && <Debrief onNext={next} onBack={prev} />}
        {stage === "rewards"   && <Rewards onRestart={() => go("cinematic")} />}
      </div>
    </main>
  );
}

/* ---------------- 0. CINEMATIC ---------------- */

function Cinematic({ onBegin }: { onBegin: () => void }) {
  const lines = [
    "Attention Mission Control.",
    "A newly discovered asteroid has been detected.",
    "Our initial calculations show a possible close approach.",
    "We need your team to determine whether Earth is actually in danger.",
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), 1400);
    return () => clearTimeout(t);
  }, [shown, lines.length]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-alert/40 bg-gradient-to-b from-alert/15 via-background to-background p-6 sm:p-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-alert to-transparent animate-sweep" />
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-alert/60 bg-alert/15 px-4 py-1.5 animate-pulse-alert">
          <AlertTriangle className="h-4 w-4 text-alert" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-alert-foreground">🚨 Possible Impact Detected</span>
        </div>

        <div className="relative mt-10 h-56 w-56 sm:h-72 sm:w-72">
          {/* Earth */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#3b82f6,#0b3d91_55%,#020617)] shadow-[0_0_80px_-10px_hsl(var(--primary))] animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-cyan/20" />
          {/* Asteroid trajectory */}
          <div className="absolute inset-0 animate-[asteroid_6s_ease-in_infinite]">
            <div className="absolute right-0 top-4 h-3 w-3 rounded-full bg-alert shadow-[0_0_20px_hsl(var(--alert))]" />
          </div>
        </div>

        <div className="mt-10 max-w-xl space-y-2 min-h-[8rem]">
          {lines.slice(0, shown).map((l, i) => (
            <p key={i} className="animate-fade-in text-base sm:text-lg text-foreground/90">{l}</p>
          ))}
        </div>

        {shown >= lines.length && (
          <Button size="lg" onClick={onBegin} className="mt-8 bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow animate-fade-in">
            <Play className="mr-2 h-4 w-4 fill-current" /> Begin Investigation
          </Button>
        )}
      </div>
      <style>{`
        @keyframes asteroid {
          0%   { transform: translate(60%, -30%) rotate(0deg); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(-20%, 30%) rotate(45deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ---------------- 1. DETECTION ---------------- */

function Detection({ onNext }: { onNext: () => void }) {
  const [choice, setChoice] = useState<"panic" | "wait" | null>(null);
  const stats: [string, string][] = [
    ["Object Name", "AV-241"],
    ["Estimated Diameter", "220 metres"],
    ["Current Distance", "2.3 million km"],
    ["Speed", "18 km/s"],
    ["Confidence", "Low"],
  ];
  return (
    <StageShell title="Section 1 · The Detection" subtitle="First report from the Near-Earth Object network.">
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Incoming Report</div>
          <h3 className="mt-1 font-display text-2xl font-bold">AV-241</h3>
          <ul className="mt-4 divide-y divide-border">
            {stats.map(([k, v]) => (
              <li key={k} className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="telemetry">{v}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>

        <GlassPanel tone="strong" className="p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">Mission Prompt</div>
          <h3 className="mt-1 font-display text-2xl font-bold">Should everyone panic?</h3>

          <div className="mt-6 grid gap-3">
            <button
              onClick={() => setChoice("panic")}
              className={cn(
                "rounded-lg border p-4 text-left transition",
                choice === "panic" ? "border-alert bg-alert/10" : "border-border hover:border-alert/60",
              )}
            >
              <div className="font-semibold">🚨 Yes — sound the alarm</div>
              <div className="text-xs text-muted-foreground">Warn the world immediately.</div>
            </button>
            <button
              onClick={() => setChoice("wait")}
              className={cn(
                "rounded-lg border p-4 text-left transition",
                choice === "wait" ? "border-primary bg-primary/10" : "border-border hover:border-primary/60",
              )}
            >
              <div className="font-semibold">🛰️ Not yet — collect more data</div>
              <div className="text-xs text-muted-foreground">Get more observations first.</div>
            </button>
          </div>

          {choice && (
            <div className="mt-5 animate-fade-in rounded-md border border-primary/40 bg-primary/5 p-4 text-sm">
              <div className="font-semibold text-primary">Mission Control</div>
              <p className="mt-1 text-foreground/90">
                Scientists never panic. First they collect more data. Many objects look dangerous
                before enough observations are available — most turn out to be safe.
              </p>
              <div className="mt-4 flex justify-end">
                <Button onClick={onNext} className="bg-cyan-grad text-primary-foreground hover:opacity-90">
                  Continue <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </GlassPanel>
      </div>
    </StageShell>
  );
}

/* ---------------- 2. IDENTIFY ---------------- */

const OBJECTS = [
  { id: "asteroid",   emoji: "🪨", label: "Asteroid",   hint: "Rock in space" },
  { id: "comet",      emoji: "☄️", label: "Comet",      hint: "Ice and dust" },
  { id: "meteoroid",  emoji: "🌑", label: "Meteoroid",  hint: "Small rock in space" },
  { id: "meteor",     emoji: "🌠", label: "Meteor",     hint: "Streak of light" },
  { id: "meteorite",  emoji: "🪐", label: "Meteorite",  hint: "Rock that reaches Earth" },
] as const;
type ObjectId = typeof OBJECTS[number]["id"];

function Identify({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [labels] = useState(() => shuffle(OBJECTS.map((o) => ({ id: o.id, label: o.label }))));
  const [placed, setPlaced] = useState<Partial<Record<ObjectId, ObjectId>>>({});
  const [selected, setSelected] = useState<ObjectId | null>(null);

  const place = (cardId: ObjectId) => {
    if (!selected) return;
    setPlaced((p) => ({ ...p, [cardId]: selected }));
    setSelected(null);
  };

  const allDone = OBJECTS.every((o) => placed[o.id] === o.id);
  const remaining = labels.filter((l) => !Object.values(placed).includes(l.id));

  return (
    <StageShell title="Section 2 · What Are We Looking At?" subtitle="Match each label to the correct object.">
      <GlassPanel className="p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Tap a label, then tap the matching object</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {remaining.length === 0 ? (
            <span className="text-xs text-muted-foreground">All labels placed.</span>
          ) : remaining.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelected(l.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition",
                selected === l.id ? "border-cyan bg-cyan/20 cyan-glow" : "border-border hover:border-cyan/60",
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </GlassPanel>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {OBJECTS.map((o) => {
          const placedId = placed[o.id];
          const correct = placedId === o.id;
          const wrong = placedId && placedId !== o.id;
          return (
            <button
              key={o.id}
              onClick={() => place(o.id)}
              disabled={!!placedId && correct}
              className={cn(
                "rounded-xl border-2 p-4 text-center transition",
                correct && "border-primary bg-primary/10",
                wrong && "border-alert bg-alert/10 animate-pulse",
                !placedId && "border-dashed border-border hover:border-cyan/60",
              )}
            >
              <div className="text-5xl">{o.emoji}</div>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">{o.hint}</div>
              <div className="mt-2 min-h-[1.5rem] font-display text-sm font-semibold">
                {placedId ? (correct ? OBJECTS.find((x) => x.id === placedId)!.label : (
                  <span className="text-alert">✗ try again</span>
                )) : "—"}
              </div>
              {wrong && (
                <button
                  onClick={(e) => { e.stopPropagation(); setPlaced((p) => { const c = { ...p }; delete c[o.id]; return c; }); }}
                  className="mt-1 text-[10px] text-alert underline"
                >clear</button>
              )}
            </button>
          );
        })}
      </div>

      <NavRow onBack={onBack} onNext={onNext} nextDisabled={!allDone} nextLabel={allDone ? "Continue" : "Match all 5"} />
    </StageShell>
  );
}

/* ---------------- 3. MISSION LAB ---------------- */

function MissionLab({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [offset, setOffset] = useState(60); // px, from Earth centre
  const status = offset < 30 ? "impact" : offset < 55 ? "close" : "safe";
  const [explored, setExplored] = useState<Set<string>>(new Set());
  useEffect(() => { setExplored((s) => new Set(s).add(status)); }, [status]);
  const allExplored = explored.size >= 3;

  const cfg = {
    safe:   { color: "primary",  emoji: "✅", label: "Safe",           text: "Asteroid passes far from Earth." },
    close:  { color: "accent",   emoji: "⚠️", label: "Close Approach", text: "Visible with telescopes but no danger." },
    impact: { color: "alert",    emoji: "💥", label: "Impact",          text: "This is what scientists work to prevent." },
  }[status];

  return (
    <StageShell title="Section 3 · Mission Lab" subtitle="Drag the asteroid's path. Tiny changes matter.">
      <GlassPanel className="p-6">
        <div className="relative mx-auto h-64 sm:h-80 max-w-2xl overflow-hidden rounded-xl border border-border bg-[radial-gradient(circle_at_50%_50%,#0b0f2b,#000)]">
          {/* Stars */}
          {STARS.map((s, i) => (
            <div key={i} className="absolute h-0.5 w-0.5 rounded-full bg-white/60" style={{ top: `${s.y}%`, left: `${s.x}%` }} />
          ))}
          {/* Earth */}
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#3b82f6,#0b3d91_60%,#020617)] shadow-[0_0_40px_-5px_hsl(var(--primary))]" />
          {/* Trajectory line */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
            <line x1="0" y1={150 - offset * 1.5} x2="400" y2={150 + offset * 1.5}
              stroke={status === "impact" ? "hsl(var(--alert))" : status === "close" ? "hsl(var(--accent))" : "hsl(var(--primary))"}
              strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />
          </svg>
          {/* Asteroid */}
          <div
            className="absolute h-4 w-4 rounded-full bg-alert shadow-[0_0_15px_hsl(var(--alert))] transition-all"
            style={{ left: "82%", top: `calc(50% + ${offset * 1.5}px)` }}
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Trajectory Offset</div>
            <Slider value={[offset]} min={5} max={110} step={1} onValueChange={(v) => setOffset(v[0])} className="mt-2" />
            <div className="mt-1 text-xs text-muted-foreground">Slide to change where the asteroid crosses Earth's path.</div>
          </div>
          <div className={cn(
            "rounded-lg border p-4 text-center min-w-[180px]",
            status === "safe"   && "border-primary bg-primary/10",
            status === "close"  && "border-accent bg-accent/10",
            status === "impact" && "border-alert bg-alert/10 animate-pulse",
          )}>
            <div className="text-3xl">{cfg.emoji}</div>
            <div className="mt-1 font-display text-lg font-bold uppercase">{cfg.label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{cfg.text}</div>
          </div>
        </div>

        <p className="mt-6 rounded-md border border-primary/30 bg-primary/5 p-4 text-sm">
          <span className="font-semibold text-primary">Mission Control · </span>
          Even tiny changes in an asteroid's path can completely change what happens to Earth.
          That's why scientists measure so carefully.
        </p>
      </GlassPanel>

      <NavRow onBack={onBack} onNext={onNext} nextDisabled={!allExplored}
        nextLabel={allExplored ? "Continue" : `Try all 3 outcomes (${explored.size}/3)`} />
    </StageShell>
  );
}

const STARS = Array.from({ length: 40 }, () => ({ x: Math.random() * 100, y: Math.random() * 100 }));

/* ---------------- 4. OBSERVE ---------------- */

function Observe({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [confidence, setConfidence] = useState(15);
  const [scanning, setScanning] = useState(false);
  const [observations, setObservations] = useState(1);

  const scan = () => {
    if (scanning || confidence >= 99) return;
    setScanning(true);
    setTimeout(() => {
      setConfidence((c) => Math.min(99, c + 18 + Math.random() * 6));
      setObservations((n) => n + 1);
      setScanning(false);
    }, 1200);
  };

  const safe = confidence >= 95;
  const risk = Math.max(0.1, 100 - confidence) / 100 * 4; // starts high, drops

  return (
    <StageShell title="Section 4 · How Do We Know?" subtitle="Each telescope observation shrinks the uncertainty.">
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
            <Telescope className="h-3 w-3" /> Observatory Network
          </div>
          <div className="mt-4 relative mx-auto h-48 w-48 rounded-full border border-cyan/30">
            <div className={cn(
              "absolute inset-0 rounded-full border-t-2 border-cyan/70",
              scanning && "animate-spin",
            )} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Radar className={cn("h-16 w-16 text-cyan", scanning && "animate-pulse")} />
            </div>
          </div>
          <Button onClick={scan} disabled={scanning || safe} className="mt-6 w-full bg-cyan-grad text-primary-foreground hover:opacity-90">
            {scanning ? "Scanning…" : safe ? "Confidence reached" : "Request new observation"}
          </Button>
          <div className="mt-2 text-xs text-muted-foreground text-center">Observations collected: {observations}</div>
        </GlassPanel>

        <GlassPanel tone="strong" className="p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">Prediction Confidence</div>
          <div className="mt-4 text-5xl font-display font-bold telemetry">{Math.round(confidence)}%</div>
          <Progress value={confidence} className="mt-3" />

          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Impact Risk</div>
            <div className={cn(
              "mt-1 font-display text-2xl font-bold",
              safe ? "text-primary" : "text-alert",
            )}>
              {safe ? "0.00%" : `${risk.toFixed(2)}%`}
            </div>
          </div>

          {safe && (
            <div className="mt-6 animate-fade-in rounded-md border border-primary/40 bg-primary/10 p-4">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <CheckCircle2 className="h-4 w-4" /> Earth is no longer in danger.
              </div>
              <p className="mt-2 text-sm text-foreground/90">
                With enough observations, the predicted path narrowed and moved
                well clear of Earth. Most potential impacts disappear this way.
              </p>
            </div>
          )}
        </GlassPanel>
      </div>

      <NavRow onBack={onBack} onNext={onNext} nextDisabled={!safe}
        nextLabel={safe ? "Continue" : "Scan until confident"} />
    </StageShell>
  );
}

/* ---------------- 5. DEFEND ---------------- */

const STRATEGIES = [
  {
    id: "dart", emoji: "🚀", title: "Launch a spacecraft",
    pros: ["Proven — NASA's DART changed an asteroid's orbit in 2022.", "No radiation.", "Years of warning needed."],
    cons: ["Only works if we detect early.", "Small nudge — requires precision."],
    real: "In 2022, NASA's DART mission smashed a spacecraft into Dimorphos and shifted its orbit by 32 minutes.",
    correct: true,
  },
  {
    id: "nuke", emoji: "☢️", title: "Nuclear explosion",
    pros: ["High energy, could work on very large objects."],
    cons: ["Might break asteroid into many pieces.", "International treaties limit space nukes.", "Untested."],
    real: "Studied in theory only — never attempted.",
  },
  {
    id: "none", emoji: "🙈", title: "Do nothing",
    pros: ["No effort required."],
    cons: ["Only safe if the object is truly harmless.", "Wastes early-warning advantage."],
    real: "Science relies on evidence — not hoping.",
  },
  {
    id: "paint", emoji: "🎨", title: "Paint the asteroid",
    pros: ["Real idea — sunlight pressure on a lighter surface slowly changes orbit."],
    cons: ["Extremely slow — needs decades.", "Very hard to deliver paint at speed."],
    real: "Called the Yarkovsky effect — real physics, but very gradual.",
  },
] as const;

function Defend({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const [chose, setChose] = useState<string | null>(null);

  return (
    <StageShell title="Section 5 · Defend the Planet" subtitle="Which defence would Mission Control actually use?">
      <div className="grid gap-4 sm:grid-cols-2">
        {STRATEGIES.map((s) => (
          <GlassPanel key={s.id} className={cn(
            "p-5 transition cursor-pointer",
            open === s.id && "border-cyan",
            chose === s.id && "border-primary bg-primary/5",
          )} onClick={() => setOpen(open === s.id ? null : s.id)}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-3xl">{s.emoji}</div>
                <h3 className="mt-2 font-display text-lg font-bold">{s.title}</h3>
              </div>
              {"correct" in s && s.correct && chose === s.id && (
                <span className="rounded-full bg-primary/20 px-2 py-1 text-[10px] font-semibold text-primary">RECOMMENDED</span>
              )}
            </div>

            {open === s.id && (
              <div className="mt-4 animate-fade-in space-y-3 text-sm">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-primary">Pros</div>
                  <ul className="mt-1 list-disc pl-5 space-y-1">{s.pros.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-alert">Cons</div>
                  <ul className="mt-1 list-disc pl-5 space-y-1">{s.cons.map((c) => <li key={c}>{c}</li>)}</ul>
                </div>
                <div className="rounded-md border border-cyan/30 bg-cyan/5 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-cyan">Real world</div>
                  <p className="mt-1">{s.real}</p>
                </div>
                <Button
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); setChose(s.id); }}
                  variant={chose === s.id ? "default" : "outline"}
                  className="w-full"
                >
                  {chose === s.id ? "Selected" : "Select this strategy"}
                </Button>
              </div>
            )}
          </GlassPanel>
        ))}
      </div>

      {chose && (
        <div className="mt-6 animate-fade-in rounded-md border border-primary/40 bg-primary/5 p-4 text-sm">
          <div className="font-semibold text-primary">Mission Control</div>
          {chose === "dart" ? (
            <p className="mt-1">Excellent choice. This is the strategy NASA proved works — the DART mission successfully moved an asteroid in 2022.</p>
          ) : (
            <p className="mt-1">Good analysis. In reality, scientists chose the spacecraft-impact approach (NASA's DART). It's the only planetary defence method tested in space.</p>
          )}
        </div>
      )}

      <NavRow onBack={onBack} onNext={onNext} nextDisabled={!chose}
        nextLabel={chose ? "Mission Debrief" : "Pick a strategy"} />
    </StageShell>
  );
}

/* ---------------- 6. DEBRIEF ---------------- */

const REFLECTION_Q = [
  "Why didn't scientists panic when AV-241 was first detected?",
  "What makes predictions about asteroid orbits improve over time?",
  "What is the difference between a meteor and a meteorite?",
  "Why was NASA's DART mission important for planetary defence?",
  "Why are most asteroid alerts not emergencies?",
];

function Debrief({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const filled = REFLECTION_Q.filter((_, i) => (answers[i] ?? "").trim().length > 4).length;
  const done = filled >= 3;

  return (
    <StageShell title="Section 6 · Mission Debrief" subtitle="Earth is safe. Log your findings.">
      <GlassPanel tone="strong" className="p-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-4 py-1.5">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Mission Status · Success</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Earth is safe.</h2>
        <p className="mt-2 text-sm text-muted-foreground">Mission Control thanks the crew.</p>
      </GlassPanel>

      <div className="mt-6 space-y-4">
        {REFLECTION_Q.map((q, i) => (
          <GlassPanel key={i} className="p-4">
            <div className="text-[10px] uppercase tracking-widest text-cyan">Reflection {i + 1}</div>
            <div className="mt-1 font-medium">{q}</div>
            <Textarea
              value={answers[i] ?? ""}
              onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
              placeholder="Your answer…"
              className="mt-3"
              rows={2}
            />
          </GlassPanel>
        ))}
      </div>

      <div className="mt-3 text-xs text-muted-foreground">Answer at least 3 to continue ({filled}/5)</div>
      <NavRow onBack={onBack} onNext={onNext} nextDisabled={!done}
        nextLabel={done ? "Claim rewards" : "Reflect on 3+"} />
    </StageShell>
  );
}

/* ---------------- 7. REWARDS ---------------- */

function Rewards({ onRestart }: { onRestart: () => void }) {
  return (
    <StageShell title="" subtitle="">
      <div className="text-center">
        <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">Mission Complete</div>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl">
          <span className="bg-cyan-grad bg-clip-text text-transparent">Planet Protector</span>
        </h1>

        <div className="mt-8 mx-auto grid max-w-2xl gap-4 sm:grid-cols-3">
          <GlassPanel className="p-6">
            <Sparkles className="mx-auto h-8 w-8 text-accent" />
            <div className="mt-2 telemetry text-3xl font-bold">+250</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">XP earned</div>
          </GlassPanel>
          <GlassPanel className="p-6">
            <Shield className="mx-auto h-8 w-8 text-primary" />
            <div className="mt-2 font-display text-lg font-bold">Planet Protector</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Badge unlocked</div>
          </GlassPanel>
          <GlassPanel className="p-6">
            <Award className="mx-auto h-8 w-8 text-cyan" />
            <div className="mt-2 text-2xl">⭐⭐⭐⭐⭐</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Mission rating</div>
          </GlassPanel>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline"><Link to="/demo/mission-control">Return to Mission Control</Link></Button>
          <Button onClick={onRestart} className="bg-cyan-grad text-primary-foreground hover:opacity-90">
            Replay mission
          </Button>
        </div>
      </div>
    </StageShell>
  );
}

/* ---------------- shared ---------------- */

function StageShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      {title && (
        <header className="mb-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">{title}</div>
          <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{subtitle}</h2>
        </header>
      )}
      {children}
    </div>
  );
}

function NavRow({ onBack, onNext, nextDisabled, nextLabel }: {
  onBack?: () => void; onNext: () => void; nextDisabled?: boolean; nextLabel: string;
}) {
  return (
    <div className="mt-8 flex items-center justify-between">
      {onBack ? (
        <Button variant="ghost" onClick={onBack}><ArrowLeft className="mr-1 h-4 w-4" /> Back</Button>
      ) : <div />}
      <Button onClick={onNext} disabled={nextDisabled} className="bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow disabled:opacity-40">
        {nextLabel} <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}

function TeacherPanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 text-xs">
          <BookOpen className="mr-1 h-3 w-3" /> Teacher
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Teacher Panel · Mission 001</SheetTitle>
          <SheetDescription>Planet Killer — Year 8 Earth & Space Sciences.</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 text-sm">
          <Section title="Australian Curriculum v9">
            <p><strong>AC9S8U03</strong> — Model cyclic changes in the relative positions of the Earth, Sun and Moon and relate these to natural phenomena.</p>
            <p><strong>AC9S8H01</strong> — Explain how scientific knowledge develops as new evidence becomes available.</p>
          </Section>

          <Section title="Learning intentions">
            <ul className="list-disc pl-5 space-y-1">
              <li>Distinguish asteroids, meteoroids, meteors and meteorites.</li>
              <li>Explain how observations improve orbital predictions.</li>
              <li>Describe how scientists protect Earth from potential impacts.</li>
            </ul>
          </Section>

          <Section title="Success criteria">
            <ul className="list-disc pl-5 space-y-1">
              <li>Correctly labels all five object types.</li>
              <li>Explains why confidence increases with more observations.</li>
              <li>References NASA's DART mission as evidence.</li>
            </ul>
          </Section>

          <Section title="Lesson timing (60 min)">
            <ul className="list-disc pl-5 space-y-1">
              <li>Cinematic + Detection — 5 min</li>
              <li>Identify — 10 min</li>
              <li>Mission Lab — 15 min</li>
              <li>Observe — 10 min</li>
              <li>Defend — 10 min</li>
              <li>Debrief + Reflection — 10 min</li>
            </ul>
          </Section>

          <Section title="Discussion questions">
            <ul className="list-disc pl-5 space-y-1">
              <li>Why is early detection more valuable than a powerful weapon?</li>
              <li>How does science handle uncertainty in the news?</li>
              <li>Which country or agency should decide how to deflect an asteroid?</li>
            </ul>
          </Section>

          <Section title="Assessment rubric">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Emerging</strong> — Identifies some object types.</li>
              <li><strong>Developing</strong> — Explains role of observations.</li>
              <li><strong>Proficient</strong> — Compares defence strategies with evidence.</li>
              <li><strong>Extending</strong> — Evaluates DART using measured orbital change.</li>
            </ul>
          </Section>

          <Section title="Printable worksheet">
            <p className="text-muted-foreground">Coming soon — a one-page PDF summary of definitions and reflection questions.</p>
          </Section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">{title}</div>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}

/* ---------------- utils ---------------- */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
