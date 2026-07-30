import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Pill } from "@/components/common/Primitives";
import { readyLessons } from "@/lib/content";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Your Lessons — Astral Vision Classroom" },
      { name: "description", content: "Pick up where you left off and start your next interactive science lesson." },
      { property: "og:title", content: "Your Lessons — Astral Vision Classroom" },
      { property: "og:description", content: "Start your next interactive science lesson." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const ready = readyLessons();
    return (
      <div>
        <h1 className="font-display text-2xl font-semibold">Your lessons</h1>
        <p className="mt-1 text-sm text-muted-foreground">Four short beats. About 45 minutes.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ready.map((l) => (
            <Link key={l.slug} to="/learn/lesson/$slug" params={{ slug: l.slug }}>
              <GlassPanel className="h-full p-5 transition hover:border-primary/40">
                <Pill tone="primary">Year {l.year} · {l.strand}</Pill>
                <div className="mt-3 font-display text-lg font-semibold">{l.title}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{l.context}</p>
                <div className="mt-4 text-xs font-semibold text-primary">Start lesson →</div>
              </GlassPanel>
            </Link>
          ))}
        </div>
      </div>
    );
  },
});
