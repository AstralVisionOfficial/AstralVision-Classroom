import { createFileRoute } from "@tanstack/react-router";
import { MissionControlPage } from "@/components/mission-control/MissionControlPage";

export const Route = createFileRoute("/archive/demo/mission-control")({
  head: () => ({
    meta: [
      { title: "Mission Control — Powered by Astral Vision" },
      { name: "description", content: "Turn your classroom into Mission Control. A live, curriculum-aligned Year 8 Science lesson — ready in seconds." },
      { property: "og:title", content: "Mission Control — Powered by Astral Vision" },
      { property: "og:description", content: "Turn your classroom into Mission Control. Live space data, ready-to-teach missions, zero preparation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoMissionControl,
});

function DemoMissionControl() {
  return <MissionControlPage crewLabel="Mission Demo" />;
}
