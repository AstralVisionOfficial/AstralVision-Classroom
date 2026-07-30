import { createFileRoute } from "@tanstack/react-router";
import { InDevelopment } from "@/components/common/Primitives";

export const Route = createFileRoute("/teach/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Teacher App | Astral Vision Classroom" },
      { name: "description", content: "See which concepts landed and which misconceptions are still active across your classes." },
      { property: "og:title", content: "Insights — Astral Vision Classroom" },
      { property: "og:description", content: "Concept-level understanding, not just completion ticks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div>
      <h1 className="font-display text-2xl font-semibold">Insights</h1>
      <p className="mt-1 text-sm text-muted-foreground">Understanding by concept, not completion ticks.</p>
      <div className="mt-6">
        <InDevelopment
          title="Insights unlock once classes are running"
          description="Every question is already tagged to a curriculum code and a known misconception, so reporting switches on as soon as student attempts are recorded."
        />
      </div>
    </div>
  ),
});
