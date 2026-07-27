import { createFileRoute } from "@tanstack/react-router";
import { MissionControlPage } from "@/components/mission-control/MissionControlPage";

export const Route = createFileRoute("/_authenticated/mission-control")({
  head: () => ({ meta: [{ title: "Mission Control — Astral Vision" }] }),
  component: AuthenticatedMissionControl,
});

function AuthenticatedMissionControl() {
  // TODO Phase 3: read crew count from teacher's class roster.
  return <MissionControlPage crewLabel="28 Students" />;
}
