import { createFileRoute } from "@tanstack/react-router";
import { TeacherShell } from "@/components/shell/TeacherShell";

export const Route = createFileRoute("/teach")({
  head: () => ({
    meta: [
      { title: "Teacher App — Astral Vision Classroom" },
      { name: "description", content: "Plan, preview and run interactive Years 6–8 Science lessons mapped to the Australian Curriculum." },
      { property: "og:title", content: "Teacher App — Astral Vision Classroom" },
      { property: "og:description", content: "Plan, preview and run interactive science lessons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeacherShell,
});
