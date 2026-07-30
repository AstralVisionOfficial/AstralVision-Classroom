import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Pill } from "@/components/common/Primitives";
import { readyLessons, LESSONS } from "@/lib/content";
import { Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/teach/")({
  head: () => ({
    meta: [
      { title: "Today — Teacher App | Astral Vision Classroom" },
      { name: "description", content: "Your teaching day at a glance: the lesson to run next, what it covers, and how long it takes." },
      { property: "og:title", content: "Today — Teacher App" },
      { property: "og:description", content: "Your next lesson, ready to teach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeachToday,
});

function TeachToday() {
  const ready = readyLessons();
  const next = ready[0];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Today</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {ready.length} lesson{ready.length === 1 ? "" : "s"} ready to teach · {LESSONS.length} in the library
      </p>

      {next && (
        <GlassPanel tone="strong" className="mt-6 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="primary">Ready to teach</Pill>
            <Pill>Year {next.year}</Pill>
            <Pill>{next.strand}</Pill>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {next.minutes} min
            </span>
          </div>
          <h2 className="mt-3 font-display text-xl font-semibold">{next.title}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">{next.concept}</p>
          <p className="mt-1 text-sm text-muted-foreground/80">{next.context}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/lesson-preview/$slug"
              params={{ slug: next.slug }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Preview and teach <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/teach/library" className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary/50">
              Browse library
            </Link>
          </div>
        </GlassPanel>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Coverage", "See which curriculum codes your classes have met."],
          ["Planner", "Drag lessons into a term sequence."],
          ["Insights", "Spot misconceptions before the test."],
        ].map(([t, d]) => (
          <GlassPanel key={t} className="p-5">
            <div className="font-display text-base font-semibold">{t}</div>
            <p className="mt-1 text-xs text-muted-foreground">{d}</p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
