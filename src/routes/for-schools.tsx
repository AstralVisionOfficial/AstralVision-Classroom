import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/common/Primitives";

export const Route = createFileRoute("/for-schools")({
  head: () => ({
    meta: [
      { title: "For Schools — Astral Vision Classroom" },
      { name: "description", content: "Pilot Astral Vision Classroom with your Science faculty: full library access, teacher guides and curriculum coverage reporting." },
      { property: "og:title", content: "For Schools — Astral Vision Classroom" },
      { property: "og:description", content: "Pilot interactive, curriculum-aligned Science with your faculty." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="For schools"
        title="Run a term-long pilot with your Science faculty."
        lede="Pilot schools get full library access, teacher guides and coverage reporting — and direct input into what gets built next."
      />
      <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
        <li>· Whole-faculty access for one term</li>
        <li>· Onboarding session and teacher guides for every lesson</li>
        <li>· Curriculum coverage reporting for leadership</li>
        <li>· A direct line to the team building it</li>
      </ul>
      <div className="mt-10">
        <Link to="/for-teachers" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          See how it works for teachers
        </Link>
      </div>
    </main>
  ),
});
