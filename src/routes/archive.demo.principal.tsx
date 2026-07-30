import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel, PanelHeader } from "@/components/astral/GlassPanel";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, BookOpen, Award, Quote, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/demo/principal")({
  head: () => ({
    meta: [
      { title: "Principal Dashboard — Astral Vision" },
      { name: "description", content: "How Astral Vision performs across a school. Engagement, curriculum coverage and teacher feedback at a glance." },
    ],
  }),
  component: PrincipalDashboard,
});

function PrincipalDashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="animate-fade-in-up">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Principal Dashboard</div>
        <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Founding School Pilot — Week 6</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A snapshot of Astral Vision across your school. All figures are from the ongoing pilot.
        </p>
      </div>

      {/* KPIs */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={Users} label="Active students" value="126" delta="+18 this week" />
        <Kpi icon={BookOpen} label="Lessons completed" value="94" delta="7 classes" />
        <Kpi icon={TrendingUp} label="Avg engagement" value="92%" delta="↑ 14% vs prev unit" tone="cyan" />
        <Kpi icon={Award} label="Most popular mission" value="Save the ISS" delta="Mission 001" tone="orange" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Curriculum coverage */}
        <GlassPanel>
          <PanelHeader eyebrow="Curriculum Coverage" title="Australian Curriculum · Year 8 Science" />
          <div className="p-5 space-y-3 text-sm">
            {[
              ["Earth & Space Sciences (ACSSU115)", 82],
              ["Science Understanding — Physical", 61],
              ["Science Inquiry Skills", 74],
              ["Science as a Human Endeavour", 55],
            ].map(([label, val]) => (
              <div key={label as string}>
                <div className="flex justify-between">
                  <span>{label}</span>
                  <span className="telemetry text-muted-foreground">{val}%</span>
                </div>
                <Progress value={val as number} className="mt-1 h-1.5" />
              </div>
            ))}
            <div className="mt-4 rounded-md border border-primary/30 bg-primary/5 p-3 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" /> Ready for reporting
              </div>
              <p className="mt-1 text-muted-foreground">
                Coverage exports directly to Term 4 progress reports.
              </p>
            </div>
          </div>
        </GlassPanel>

        {/* Teacher comments */}
        <GlassPanel>
          <PanelHeader eyebrow="Teacher Comments" title="From your staff" />
          <div className="space-y-3 p-5">
            {TEACHER_COMMENTS.map((c) => (
              <blockquote key={c.by} className="rounded-md border border-border bg-secondary/30 p-4">
                <Quote className="h-4 w-4 text-primary" />
                <p className="mt-2 text-sm">{c.quote}</p>
                <footer className="mt-2 text-xs text-muted-foreground">— {c.by}</footer>
              </blockquote>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Student feedback + CTA */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <GlassPanel>
          <PanelHeader eyebrow="Student Feedback" title="Sample responses" />
          <div className="grid gap-3 p-5 sm:grid-cols-2">
            {STUDENT_FEEDBACK.map((s) => (
              <blockquote key={s.by} className="rounded-md border border-border bg-secondary/30 p-4 text-sm">
                <p>"{s.quote}"</p>
                <footer className="mt-2 text-xs text-muted-foreground">— {s.by}</footer>
              </blockquote>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel tone="strong" className="p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Next step</div>
          <h3 className="mt-1 font-display text-xl font-semibold">Approve the Founding School Program</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Continue the pilot into Term 1, unlock Missions 002-005, and secure your school's
            founding-partner status.
          </p>
          <Button asChild size="lg" className="mt-5 w-full bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow">
            <a href="mailto:hello@astralvision.au?subject=Astral%20Vision%20Founding%20School%20Program">
              Approve Founding School Program
            </a>
          </Button>
          <Button asChild variant="outline" className="mt-2 w-full">
            <Link to="/demo/lesson/mission-001-save-the-iss">Preview Mission 001 again</Link>
          </Button>
        </GlassPanel>
      </div>
    </main>
  );
}

function Kpi({ icon: Icon, label, value, delta, tone }: {
  icon: typeof Users; label: string; value: string; delta: string; tone?: "cyan" | "orange";
}) {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <div className={"mt-3 telemetry text-2xl font-semibold " + (tone === "cyan" ? "text-cyan" : tone === "orange" ? "text-orange" : "")}>
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{delta}</div>
    </GlassPanel>
  );
}

const TEACHER_COMMENTS = [
  { by: "Ms. Patel — Year 8 Science", quote: "This was the most engaged I've seen my class during our space unit." },
  { by: "Mr. Nguyen — Year 8 Science", quote: "Students who normally don't participate were discussing orbital mechanics." },
  { by: "Ms. Lee — Head of Science", quote: "This replaced an entire PowerPoint lesson — and did it better." },
];
const STUDENT_FEEDBACK = [
  { by: "Amelia, Year 8", quote: "Felt like we were actually saving the ISS. I want to do the next mission." },
  { by: "Noah, Year 8", quote: "The countdown made it feel real. I finally understood what a burn is." },
  { by: "Olivia, Year 8", quote: "The certificate is going on my wall." },
  { by: "Liam, Year 8", quote: "This was way better than the textbook chapter." },
];
