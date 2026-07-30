import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { SectionHeading, Pill } from "@/components/common/Primitives";
import { Check } from "lucide-react";

export const Route = createFileRoute("/for-teachers")({
  head: () => ({
    meta: [
      { title: "For Teachers — Astral Vision Classroom" },
      { name: "description", content: "Open a lesson and teach it. Guides, timing, misconceptions and rubrics are written for you, mapped to the Australian Curriculum." },
      { property: "og:title", content: "For Teachers — Astral Vision Classroom" },
      { property: "og:description", content: "Zero-prep, curriculum-aligned Years 6–8 Science lessons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForTeachers,
});

function ForTeachers() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="For teachers"
        title="Five minutes from opening the app to teaching the lesson."
        lede="You are the primary customer. Every feature has to save you time, lift engagement, or show you what students understand."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          ["Pick", "Filter by year, strand, topic or curriculum code. Duration is on every card."],
          ["Preview", "See exactly what students see, with a guide panel: intentions, timing, misconceptions, rubric."],
          ["Teach", "Project it on the board — no student accounts required — or assign it to a class."],
          ["Review", "Insights show which concepts landed and which misconceptions are still active."],
        ].map(([t, d], i) => (
          <GlassPanel key={t} className="p-5">
            <Pill>{`Step ${i + 1}`}</Pill>
            <div className="mt-3 font-display text-lg font-semibold">{t}</div>
            <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
          </GlassPanel>
        ))}
      </div>

      <h2 className="mt-14 font-display text-2xl font-semibold">What comes with every lesson</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {[
          "Learning intentions and success criteria",
          "Timing for each of the four beats",
          "Known misconceptions and how to counter them",
          "Vocabulary list for the topic",
          "Printable worksheet and answer key",
          "Marking rubric aligned to the criteria",
        ].map((s) => (
          <li key={s} className="flex gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/lesson-preview/$slug"
          params={{ slug: "solar-power-in-orbit" }}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Preview a full lesson
        </Link>
        <Link to="/teach" className="rounded-lg border border-border px-5 py-2.5 text-sm hover:bg-secondary/50">
          Open the teacher app
        </Link>
      </div>
    </main>
  );
}
