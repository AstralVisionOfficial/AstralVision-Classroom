import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Button } from "@/components/ui/button";
import { getLesson, LESSONS } from "@/lib/lessons/catalog";
import { ArrowLeft, Clock, Play, Sparkles } from "lucide-react";

export const Route = createFileRoute("/lessons/$slug")({
  loader: ({ params }) => {
    const lesson = getLesson(params.slug);
    if (!lesson) throw notFound();
    return { lesson };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Lesson not found — Astral Vision" }, { name: "robots", content: "noindex" }] };
    }
    const l = loaderData.lesson;
    return {
      meta: [
        { title: `${l.title} — ${l.code} · Astral Vision` },
        { name: "description", content: l.framing },
        { property: "og:title", content: `${l.title} — ${l.code}` },
        { property: "og:description", content: l.framing },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: LessonNotFound,
  errorComponent: () => <LessonNotFound />,
  component: LessonDetail,
});

function LessonNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-bold">Lesson not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The mission you're looking for isn't in the catalog yet.
      </p>
      <Button asChild className="mt-6">
        <Link to="/lessons">Back to Lesson Library</Link>
      </Button>
    </main>
  );
}

function LessonDetail() {
  const { lesson } = Route.useLoaderData();
  const live = lesson.status === "live";
  const related = LESSONS.filter(
    (l) => l.slug !== lesson.slug && l.strand === lesson.strand,
  ).slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6">
      <Link
        to="/lessons"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Lesson Library
      </Link>

      <GlassPanel tone="strong" className="mt-4 overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="telemetry text-xs tracking-[0.25em] text-cyan">{lesson.code}</span>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent">
              {lesson.strand}
            </span>
            <span className="rounded-full border border-border bg-surface/70 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              Year {lesson.year} · {lesson.tier}
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            {lesson.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {lesson.framing}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {live && lesson.route ? (
              <Button asChild size="lg" className="bg-cyan-grad text-primary-foreground hover:opacity-90 cyan-glow">
                <Link to={lesson.route}>
                  <Play className="mr-1 h-4 w-4 fill-current" /> Begin Mission
                </Link>
              </Button>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/70 px-4 py-2.5 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-cyan" /> Coming online soon
              </div>
            )}
            <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/60 px-3 py-2 text-xs">
              <Clock className="h-3.5 w-3.5" /> {lesson.durationMinutes} min
            </div>
          </div>
        </div>
      </GlassPanel>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <SectionTitle>Learning Objectives</SectionTitle>
          <ul className="mt-3 grid gap-2">
            {lesson.objectives.map((o) => (
              <li
                key={o}
                className="rounded-md border border-border bg-surface/60 p-3 text-sm"
              >
                {o}
              </li>
            ))}
          </ul>

          <SectionTitle className="mt-8">Mission Brief</SectionTitle>
          <GlassPanel className="mt-3 p-5 text-sm leading-relaxed text-muted-foreground">
            {lesson.subtitle}
          </GlassPanel>
        </div>

        <aside className="space-y-3">
          <MetaRow label="Curriculum" value={`AC v9 · Year ${lesson.year}`} />
          <MetaRow label="Codes" value={lesson.curriculumCodes.join(" · ")} />
          <MetaRow label="Strand" value={lesson.strand} />
          <MetaRow label="Difficulty" value={lesson.tier} />
          <MetaRow label="Duration" value={`${lesson.durationMinutes} min`} />
          <MetaRow label="Status" value={live ? "Teacher Ready" : "Coming online"} />
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <SectionTitle>More in {lesson.strand}</SectionTitle>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/lessons/$slug"
                params={{ slug: r.slug }}
                className="block"
              >
                <GlassPanel className="h-full p-4 hover:border-primary/40 transition">
                  <div className="telemetry text-[10px] tracking-widest text-cyan">{r.code}</div>
                  <div className="mt-1 font-display text-sm font-semibold">{r.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.framing}</div>
                </GlassPanel>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Details</div>
      <h2 className="mt-1 font-display text-xl font-semibold">{children}</h2>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-surface/60 px-3 py-2">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-xs font-medium">{value}</span>
    </div>
  );
}
