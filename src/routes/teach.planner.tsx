import { createFileRoute } from "@tanstack/react-router";
import { InDevelopment } from "@/components/common/Primitives";

export const Route = createFileRoute("/teach/planner")({
  head: () => ({
    meta: [
      { title: "Planner — Teacher App | Astral Vision Classroom" },
      { name: "description", content: "Sequence lessons into a term plan and see curriculum coverage build as you go." },
      { property: "og:title", content: "Planner — Astral Vision Classroom" },
      { property: "og:description", content: "Sequence lessons into a term plan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div>
      <h1 className="font-display text-2xl font-semibold">Planner</h1>
      <p className="mt-1 text-sm text-muted-foreground">Build a term sequence from the library.</p>
      <div className="mt-6">
        <InDevelopment
          title="Term planning arrives once the library reaches full coverage"
          description="Planning is only useful when there are enough lessons to sequence. We're building lessons first."
        />
      </div>
    </div>
  ),
});
