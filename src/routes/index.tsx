import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Pill } from "@/components/common/Primitives";
import { TOPICS, LESSONS } from "@/lib/content";
import { ArrowRight, Beaker, Clock, GraduationCap, MousePointerClick } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Astral Vision Classroom — Interactive Science for Years 6–8" },
      {
        name: "description",
        content:
          "Curriculum-aligned Years 6–8 Science lessons students actually do: simulations, challenges and visual explanations. Built for Australian teachers.",
      },
      { property: "og:title", content: "Astral Vision Classroom — Interactive Science for Years 6–8" },
      {
        property: "og:description",
        content: "Interactive, curriculum-aligned science lessons for Australian Years 6–8. Zero prep for teachers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const ready = LESSONS.filter((l) => l.status === "ready");

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Pill tone="primary">Australian Curriculum v9 · Years 6–8 Science</Pill>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
              Science your students
              <br />
              <span className="text-primary">actually do.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Every lesson is four short beats — a phenomenon to notice, a simulation to manipulate, a
              challenge to solve, and a check that shows what stuck. Curriculum first. Space for
              curiosity. No prep.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/lesson-preview/$slug"
                params={{ slug: "solar-power-in-orbit" }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Try a full lesson <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/for-teachers"
                className="rounded-lg border border-border px-5 py-3 text-sm font-medium hover:bg-secondary/50"
              >
                How it works for teachers
              </Link>
            </div>
            <div className="mt-6 text-xs text-muted-foreground">
              No account needed to preview · Works on a projector, laptop or tablet
            </div>
          </div>

          <GlassPanel tone="strong" className="p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
              Every lesson, the same four beats
            </div>
            <ol className="mt-4 space-y-3">
              {[
                ["Explore", "One phenomenon. One question. Five minutes.", MousePointerClick],
                ["Investigate", "A simulation students change and test.", Beaker],
                ["Challenge", "Applied problems with instant feedback.", GraduationCap],
                ["Check", "Four questions and one explanation.", Clock],
              ].map(([label, desc, Icon]) => {
                const I = Icon as typeof Clock;
                return (
                  <li key={label as string} className="flex gap-3 rounded-lg bg-secondary/30 p-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/15">
                      <I className="h-4 w-4 text-primary" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{label as string}</div>
                      <div className="text-xs text-muted-foreground">{desc as string}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </GlassPanel>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/30">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6">
          {[
            ["Saves teachers time", "Open a lesson and teach it. Guides, timing, misconceptions and rubrics are already written."],
            ["Engages students", "Nothing is read-only. Students manipulate models and get feedback within seconds."],
            ["Shows understanding", "Every answer maps back to a curriculum code, so coverage and gaps are visible."],
          ].map(([t, d]) => (
            <div key={t}>
              <h2 className="font-display text-lg font-semibold">{t}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Topics, not modules</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Organised the way teachers plan: year level, strand, topic. {ready.length} lesson
              {ready.length === 1 ? "" : "s"} ready now, more in development.
            </p>
          </div>
          <Link to="/curriculum" className="hidden text-sm text-primary hover:underline sm:block">
            See curriculum coverage →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.slice(0, 8).map((t) => (
            <GlassPanel key={t.slug} className="p-5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Year {t.year}</span>
                <span>{t.strand}</span>
              </div>
              <div className="mt-2 font-display text-base font-semibold">{t.title}</div>
              <p className="mt-1.5 text-xs text-muted-foreground">{t.summary}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <GlassPanel tone="strong" className="p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Run one lesson with your class</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Pilot schools get the full library, teacher guides and printables. Start with the lesson
            above, then tell us what your Year 8s made of it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/for-schools" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
              School pilot program
            </Link>
            <Link to="/teach" className="rounded-lg border border-border px-5 py-2.5 text-sm hover:bg-secondary/50">
              Open the teacher app
            </Link>
          </div>
        </GlassPanel>
      </section>
    </main>
  );
}
