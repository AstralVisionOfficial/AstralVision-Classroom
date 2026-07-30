import { createFileRoute } from "@tanstack/react-router";
import { StudentShell } from "@/components/shell/StudentShell";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Student App — Astral Vision Classroom" },
      { name: "description", content: "Do the science: explore a phenomenon, run the simulation, take the challenge." },
      { property: "og:title", content: "Student App — Astral Vision Classroom" },
      { property: "og:description", content: "Interactive science lessons for Years 6–8." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentShell,
});
