import { createFileRoute } from "@tanstack/react-router";
import { InDevelopment } from "@/components/common/Primitives";

export const Route = createFileRoute("/teach/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Teacher App | Astral Vision Classroom" },
      { name: "description", content: "Printable worksheets, answer keys and rubrics that match each lesson." },
      { property: "og:title", content: "Resources — Astral Vision Classroom" },
      { property: "og:description", content: "Printables and rubrics for every lesson." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div>
      <h1 className="font-display text-2xl font-semibold">Resources</h1>
      <p className="mt-1 text-sm text-muted-foreground">Printables, answer keys and rubrics.</p>
      <div className="mt-6">
        <InDevelopment
          title="Downloadables are attached to lessons first"
          description="Each ready lesson carries its own worksheet and rubric. A central download hub follows."
        />
      </div>
    </div>
  ),
});
