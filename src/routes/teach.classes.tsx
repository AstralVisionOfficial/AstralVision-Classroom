import { createFileRoute } from "@tanstack/react-router";
import { InDevelopment } from "@/components/common/Primitives";

export const Route = createFileRoute("/teach/classes")({
  head: () => ({
    meta: [
      { title: "Classes — Teacher App | Astral Vision Classroom" },
      { name: "description", content: "Manage your Science classes, assign lessons and track who has finished what." },
      { property: "og:title", content: "Classes — Astral Vision Classroom" },
      { property: "og:description", content: "Manage classes and assign lessons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div>
      <h1 className="font-display text-2xl font-semibold">Classes</h1>
      <p className="mt-1 text-sm text-muted-foreground">Rosters, assignments and completion.</p>
      <div className="mt-6">
        <InDevelopment
          title="Class rosters are coming with the pilot release"
          description="During the pilot, run lessons directly from the library on a projector or shared device — no student accounts needed."
        />
      </div>
    </div>
  ),
});
