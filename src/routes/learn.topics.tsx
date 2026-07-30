import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { TOPICS, lessonsInTopic } from "@/lib/content";

export const Route = createFileRoute("/learn/topics")({
  head: () => ({
    meta: [
      { title: "Topics — Astral Vision Classroom" },
      { name: "description", content: "Browse science topics by year level and strand, and jump into any lesson." },
      { property: "og:title", content: "Topics — Astral Vision Classroom" },
      { property: "og:description", content: "Browse science topics by year level and strand." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div>
      <h1 className="font-display text-2xl font-semibold">Topics</h1>
      <div className="mt-6 space-y-4">
        {TOPICS.map((t) => (
          <GlassPanel key={t.slug} className="p-5">
            <div className="text-[11px] text-muted-foreground">Year {t.year} · {t.strand}</div>
            <div className="mt-1 font-display text-lg font-semibold">{t.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{t.summary}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {lessonsInTopic(t.slug).map((l) => (
                <li key={l.slug}>
                  <Link to="/learn/lesson/$slug" params={{ slug: l.slug }} className="text-primary hover:underline">
                    {l.title}
                  </Link>
                  <span className="ml-2 text-xs text-muted-foreground">{l.minutes} min</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        ))}
      </div>
    </div>
  ),
});
