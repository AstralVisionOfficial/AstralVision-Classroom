import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel, PanelHeader } from "@/components/astral/GlassPanel";
import { Button } from "@/components/ui/button";
import {
  Rocket, Users, GraduationCap, Radar, BookOpen, Shield, Sparkles,
  ArrowRight, Trophy, School, Brain, Satellite,
} from "lucide-react";

// Flip to true when the Founding Education Partner is approved.
const FOUNDING_PARTNER_ENABLED = false;
const FOUNDING_PARTNER_NAME = "Good Samaritan Catholic College";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Astral Vision — Inspiring Australia's Next Generation of Space Explorers" },
      { name: "description", content: "The Astral Vision Founding School Program brings Mission Control into the Australian classroom. Interactive missions, real space data, curriculum-aligned lessons." },
      { property: "og:title", content: "Astral Vision — Mission Control for the Classroom" },
      { property: "og:description", content: "The Astral Vision Founding School Program. Real space. Real missions. Real learning." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping-slow" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              The Astral Vision Founding School Program
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Inspiring Australia's<br />
              <span className="bg-cyan-grad bg-clip-text text-transparent">Next Generation</span>
              <br />of Space Explorers
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Astral Vision brings Mission Control into the classroom. Interactive missions,
              real-time space data, and curriculum-aligned lessons — built to make every student
              feel like they're sitting inside a real space agency.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild size="lg"
                className="bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow"
              >
                <Link to="/demo/classroom">
                  Launch Teacher Demo <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border">
                <Link to="/demo/mission">View Student Experience</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              No signup required. Explore a fully populated Year 8 Science classroom in 30 seconds.
            </p>
          </div>

          {/* Founding partner slot */}
          {FOUNDING_PARTNER_ENABLED && (
            <GlassPanel tone="strong" className="mt-14 max-w-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-cyan-grad">
                  <School className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
                    Founding Education Partner
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold">{FOUNDING_PARTNER_NAME}</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Building the future of Australian space education.
                  </p>
                </div>
              </div>
            </GlassPanel>
          )}
        </div>
      </section>

      {/* WHY / TEACHER + STUDENT + CURRICULUM */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              eyebrow: "For teachers",
              title: "Save preparation time",
              points: [
                "Curriculum-aligned lesson plans",
                "Ready-made assessments & rubrics",
                "Teacher notes for every mission",
                "One-click 'Start Lesson' immersive mode",
              ],
            },
            {
              icon: Rocket,
              eyebrow: "For students",
              title: "Feel like a mission controller",
              points: [
                "Cinematic mission briefings",
                "Real orbital physics — hands-on",
                "Certificates, XP and mission badges",
                "Reflection prompts that build learning",
              ],
            },
            {
              icon: Shield,
              eyebrow: "For schools",
              title: "Safe, aligned, evaluable",
              points: [
                "Mapped to the Australian Curriculum",
                "Principal dashboard — engagement at a glance",
                "Built by an Australian student, for Australian schools",
                "Pilot program with founding-partner benefits",
              ],
            },
          ].map((c) => (
            <GlassPanel key={c.title} className="p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
                {c.eyebrow}
              </div>
              <h3 className="mt-1 font-display text-xl font-semibold">{c.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* ABOUT RILEY */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <GlassPanel tone="strong" className="p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="grid h-24 w-24 place-items-center rounded-2xl bg-cyan-grad cyan-glow">
              <Trophy className="h-10 w-10 text-primary-foreground" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
                About the Founder
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                Built by Riley Flannery
              </h2>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                Year 10 student, Australian Astronaut Challenge finalist, and aspiring aerospace
                engineer. Astral Vision was created to inspire students through real-time space
                exploration, interactive missions and AI-powered learning — starting with his own
                school and reaching for classrooms across Australia.
              </p>
            </div>
          </div>
        </GlassPanel>
      </section>

      {/* MISSION SERIES PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="mb-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
            Mission Series
          </div>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
            One curriculum. A universe of missions.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Every Astral Vision lesson is a mission — starting with Mission 001. New missions
            arrive with each classroom cohort.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MISSIONS.map((m) => (
            <GlassPanel key={m.code} className={"p-5 " + (m.status === "live" ? "border-primary/40" : "opacity-60")}>
              <div className="flex items-baseline justify-between">
                <span className="telemetry text-[11px] tracking-[0.2em] text-cyan">{m.code}</span>
                <span className={"text-[10px] uppercase tracking-widest " + (m.status === "live" ? "text-primary" : "text-muted-foreground")}>
                  {m.status === "live" ? "● Live" : "● Locked"}
                </span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.blurb}</p>
              {m.status === "live" ? (
                <Link
                  to="/demo/lesson/mission-001-save-the-iss"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Start mission <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <span className="mt-4 inline-block text-xs text-muted-foreground">Coming soon</span>
              )}
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="mb-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
            The Astral Vision Ecosystem
          </div>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
            One Space Engine. Four products.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM.map((p) => (
            <GlassPanel key={p.name} className="p-5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10">
                <p.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-3 font-display text-lg font-semibold">{p.name}</div>
              <p className="mt-1 text-xs text-muted-foreground">{p.blurb}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <GlassPanel tone="strong" className="p-8 sm:p-12 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
            Founding School Program
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Explore Astral Vision in 30 seconds.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            No signup. No setup. Open a fully populated Year 8 classroom and press Start Lesson.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow">
              <Link to="/demo/classroom">
                Launch Teacher Demo <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/demo/principal">Principal Dashboard</Link>
            </Button>
          </div>
        </GlassPanel>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Astral Vision · Built in Australia · Founding School Program
      </footer>
    </main>
  );
}

const MISSIONS = [
  { code: "MISSION 001", title: "Save the ISS", blurb: "Analyse a debris conjunction and plan an avoidance manoeuvre.", status: "live" as const },
  { code: "MISSION 002", title: "Defend Earth", blurb: "Model a near-Earth object trajectory and evaluate deflection options.", status: "locked" as const },
  { code: "MISSION 003", title: "Launch Artemis", blurb: "Plan the trans-lunar injection burn for a crewed lunar mission.", status: "locked" as const },
  { code: "MISSION 004", title: "Rescue Hubble", blurb: "Design a servicing rendezvous with the Hubble Space Telescope.", status: "locked" as const },
  { code: "MISSION 005", title: "Moon Base Alpha", blurb: "Engineer a sustainable outpost using lunar resources.", status: "locked" as const },
];

const ECOSYSTEM = [
  { name: "Classroom", icon: BookOpen, blurb: "The K–10 education platform. Missions, teacher tools, principal dashboard." },
  { name: "Senior", icon: GraduationCap, blurb: "Senior physics, engineering and space science extension." },
  { name: "Orbit", icon: Satellite, blurb: "Professional aerospace intelligence for satellite operators." },
  { name: "eVTOL", icon: Sparkles, blurb: "Future domestic airspace product for Australian aviation." },
];
