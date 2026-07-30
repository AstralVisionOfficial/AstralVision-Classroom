import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel, PanelHeader } from "@/components/astral/GlassPanel";
import { CurriculumBadge } from "@/components/astral/CurriculumBadge";
import { MISSION_001_CURRICULUM } from "@/lib/mission-001";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, FileText, Users, Eye, TrendingUp, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/demo/classroom")({
  head: () => ({
    meta: [
      { title: "Teacher Demo — Astral Vision" },
      { name: "description", content: "Explore a fully populated Year 8 Science classroom running Mission 001: Save the ISS." },
    ],
  }),
  component: TeacherDemo,
});

const CLASS_INFO = {
  title: "Year 8 Science",
  subtitle: "Term 4 · Week 6 · Room 12",
  students: 28,
  avgProgress: 74,
  engagement: 92,
};

const STUDENTS = [
  "Amelia N.", "Noah T.", "Olivia W.", "Liam C.", "Isla K.", "Oliver H.", "Aria D.", "William F.",
  "Charlotte M.", "Jack S.", "Mia R.", "Leo P.", "Ava G.", "Lucas B.", "Zoe V.", "Henry J.",
  "Ruby E.", "Ethan L.", "Sophie O.", "Max Q.", "Chloe Y.", "James U.", "Grace X.", "Harvey Z.",
  "Ella A.", "Tom I.", "Lily V.", "Sam O.",
];

function seededProgress(i: number) {
  return Math.max(15, Math.min(100, ((i * 37 + 51) % 100)));
}

function TeacherDemo() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Class header */}
      <div className="animate-fade-in-up flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Teacher Demo</div>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{CLASS_INFO.title}</h1>
          <div className="mt-1 text-sm text-muted-foreground">{CLASS_INFO.subtitle}</div>
        </div>
        <div className="flex gap-4 text-sm">
          <Stat label="Students" value={CLASS_INFO.students} />
          <Stat label="Avg progress" value={`${CLASS_INFO.avgProgress}%`} tone="cyan" />
          <Stat label="Engagement" value={`${CLASS_INFO.engagement}%`} tone="orange" />
        </div>
      </div>

      {/* Today's Mission */}
      <GlassPanel tone="strong" className="mt-8 overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
          <div className="p-6 sm:p-8">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
              Today's Mission
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="telemetry text-xs tracking-[0.2em] text-cyan">MISSION 001</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                ● Live
              </span>
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Save the ISS</h2>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground">
              Debris on a projected collision path with the International Space Station. Your class
              has 45 minutes to analyse the situation and recommend the safest manoeuvre.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild size="lg" className="bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow">
                <Link to="/demo/lesson/mission-001-save-the-iss">
                  <Play className="mr-1 h-4 w-4 fill-current" /> Start Lesson
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/demo/lesson/mission-001-save-the-iss" search={{ resume: true } as never}>Continue Yesterday</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/demo/lesson/mission-001-save-the-iss" hash="teacher-guide">
                  <FileText className="mr-1 h-4 w-4" /> Teacher Resources
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/demo/mission"><Eye className="mr-1 h-4 w-4" /> Student View</Link>
              </Button>
            </div>
          </div>
          <div className="border-t border-border/60 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <CurriculumBadge info={MISSION_001_CURRICULUM} compact />
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Learning intentions & success criteria",
                "Teacher notes & discussion prompts",
                "Formative assessment with rubric",
                "Extension activity for early finishers",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassPanel>

      {/* Roster + curriculum coverage */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <GlassPanel>
          <PanelHeader eyebrow="Class Roster" title="28 students" meta={<><Users className="mr-1 inline h-3 w-3" /> Live</>} />
          <div className="grid gap-2 p-5 sm:grid-cols-2">
            {STUDENTS.map((s, i) => {
              const p = seededProgress(i);
              return (
                <div key={s} className="flex items-center gap-3 rounded-md bg-secondary/30 px-3 py-2">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 telemetry text-xs font-semibold text-primary">
                    {s.split(" ")[0]![0]}{s.split(" ")[1]?.[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{s}</div>
                    <Progress value={p} className="mt-1 h-1" />
                  </div>
                  <div className="telemetry text-xs text-muted-foreground w-8 text-right">{p}%</div>
                </div>
              );
            })}
          </div>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel>
            <PanelHeader eyebrow="Curriculum Coverage" title="Term 4" />
            <div className="p-5 space-y-3 text-sm">
              {[
                ["Earth & Space Sciences", 82],
                ["Physical Sciences", 61],
                ["Science Inquiry Skills", 74],
              ].map(([label, val]) => (
                <div key={label as string}>
                  <div className="flex justify-between">
                    <span>{label}</span>
                    <span className="telemetry text-muted-foreground">{val}%</span>
                  </div>
                  <Progress value={val as number} className="mt-1 h-1.5" />
                </div>
              ))}
            </div>
          </GlassPanel>
          <GlassPanel>
            <PanelHeader eyebrow="Trending" title="Most attempted objective" />
            <div className="p-5">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Δv burn direction</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                18 of 28 students explored prograde vs. retrograde options at least twice.
              </p>
              <Button asChild variant="link" className="mt-3 h-auto p-0 text-primary">
                <Link to="/demo/principal">View principal dashboard <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </div>
          </GlassPanel>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone?: "cyan" | "orange" }) {
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={"telemetry text-lg font-semibold " + (tone === "cyan" ? "text-cyan" : tone === "orange" ? "text-orange" : "")}>{value}</div>
    </div>
  );
}
