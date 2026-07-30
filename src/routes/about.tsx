import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/common/Primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Astral Vision Classroom" },
      { name: "description", content: "An Australian team building interactive, curriculum-aligned science lessons for Years 6–8, with space as the context." },
      { property: "og:title", content: "About — Astral Vision Classroom" },
      { property: "og:description", content: "Why we build science lessons students actually do." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="About"
        title="Space is the context. Science is the point."
        lede="We build Years 6–8 Science lessons that students do rather than read, mapped to the Australian Curriculum and written so a teacher can run one with five minutes' notice."
      />
      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Astral Vision Classroom is an Australian project. Every lesson leads with the curriculum
        concept and uses a real space scenario — a satellite, a rover, an orbit — to make that
        concept worth caring about. Teachers stay in control: the guides, timing and rubrics are
        written, and nothing depends on students having their own accounts.
      </p>
    </main>
  ),
});
