import { createFileRoute } from "@tanstack/react-router";
import { InDevelopment } from "@/components/common/Primitives";

export const Route = createFileRoute("/learn/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Astral Vision Classroom" },
      { name: "description", content: "Short, curiosity-led science explorations that sit alongside your lessons." },
      { property: "og:title", content: "Explore — Astral Vision Classroom" },
      { property: "og:description", content: "Curiosity-led science explorations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div>
      <h1 className="font-display text-2xl font-semibold">Explore</h1>
      <div className="mt-6">
        <InDevelopment
          title="Explorations are being written"
          description="Short optional activities for students who finish early. Lessons come first."
        />
      </div>
    </div>
  ),
});
