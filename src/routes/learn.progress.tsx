import { createFileRoute } from "@tanstack/react-router";
import { InDevelopment } from "@/components/common/Primitives";

export const Route = createFileRoute("/learn/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Astral Vision Classroom" },
      { name: "description", content: "See the lessons you've completed and the science skills you've built." },
      { property: "og:title", content: "Progress — Astral Vision Classroom" },
      { property: "og:description", content: "Track completed lessons and skills." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div>
      <h1 className="font-display text-2xl font-semibold">Progress</h1>
      <div className="mt-6">
        <InDevelopment
          title="Progress builds as you finish lessons"
          description="Completed activities are saved on this device during the pilot."
        />
      </div>
    </div>
  ),
});
