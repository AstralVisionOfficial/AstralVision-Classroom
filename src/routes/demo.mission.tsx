import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Button } from "@/components/ui/button";
import { Play, User } from "lucide-react";

export const Route = createFileRoute("/demo/mission")({
  head: () => ({ meta: [{ title: "Student View — Astral Vision" }] }),
  component: StudentEntry,
});

function StudentEntry() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl items-center px-4 py-12">
      <GlassPanel tone="strong" className="w-full p-8 sm:p-12 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">
          Student View · Year 8 Science
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          Welcome, Mission Controller.
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
          Your team has been assigned <span className="text-cyan font-semibold">Mission 001 · Save the ISS</span>.
          Get ready — the mission begins the moment you press start.
        </p>
        <Button
          asChild size="lg"
          className="mt-8 bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow"
        >
          <Link to="/demo/lesson/mission-001-save-the-iss">
            <Play className="mr-1 h-4 w-4 fill-current" /> Begin Mission
          </Link>
        </Button>
        <div className="mt-4 text-xs text-muted-foreground">
          Prefer the teacher view? <Link to="/demo/classroom" className="text-primary hover:underline">Open the classroom</Link>.
        </div>
      </GlassPanel>
    </main>
  );
}
