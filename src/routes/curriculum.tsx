import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/common/Primitives";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { TOPICS } from "@/lib/content";

export const Route = createFileRoute("/curriculum")({
  head: () => ({
    meta: [
      { title: "Curriculum Coverage — Astral Vision Classroom" },
      { name: "description", content: "Every lesson maps to Australian Curriculum v9 Science codes for Years 6, 7 and 8. See what's covered." },
      { property: "og:title", content: "Curriculum Coverage — Astral Vision Classroom" },
      { property: "og:description", content: "Australian Curriculum v9 Science mapping for Years 6–8." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Curriculum"
        title="Mapped to Australian Curriculum v9."
        lede="Content descriptions come first; the space context is the hook, never the substitute."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOPICS.map((t) => (
          <GlassPanel key={t.slug} className="p-5">
            <div className="text-[11px] text-muted-foreground">Year {t.year} · {t.strand}</div>
            <div className="mt-1 font-display text-base font-semibold">{t.title}</div>
            <p className="mt-1 text-xs text-muted-foreground">{t.summary}</p>
            <div className="mt-3 text-xs text-primary">{t.curriculumCodes.join(" · ")}</div>
          </GlassPanel>
        ))}
      </div>
    </main>
  ),
});
