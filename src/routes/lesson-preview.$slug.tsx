import { createFileRoute, Link } from "@tanstack/react-router";
import { LessonPlayer } from "@/components/learn/LessonPlayer";
import { getLesson } from "@/lib/content";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { InDevelopment, Pill } from "@/components/common/Primitives";

export const Route = createFileRoute("/lesson-preview/$slug")({
  head: ({ params }) => {
    const lesson = getLesson(params.slug);
    const title = lesson ? `${lesson.title} — Lesson Preview | Astral Vision Classroom` : "Lesson Preview";
    const description = lesson?.concept ?? "Preview an interactive Years 6–8 Science lesson.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PreviewRoute,
});

function PreviewRoute() {
  const { slug } = Route.useParams();
  const lesson = getLesson(slug);

  if (!lesson) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <InDevelopment title="Lesson not found" description="That lesson isn't in the library.">
          <Link to="/teach/library" className="text-sm text-primary hover:underline">Back to the library</Link>
        </InDevelopment>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <GlassPanel className="p-5">
        <div className="flex flex-wrap gap-2">
          <Pill tone="primary">Teacher preview</Pill>
          <Pill>Year {lesson.year}</Pill>
          <Pill>{lesson.strand}</Pill>
          <Pill>{lesson.minutes} min</Pill>
          {lesson.curriculumCodes.map((c) => <Pill key={c}>{c}</Pill>)}
        </div>
        <h1 className="mt-3 font-display text-2xl font-semibold">{lesson.title}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{lesson.concept}</p>
        <p className="mt-1 text-sm text-muted-foreground/80">{lesson.context}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Learning intentions</div>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {lesson.intentions.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
          {lesson.misconceptions && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Watch for</div>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {lesson.misconceptions.map((m) => (
                  <li key={m.belief}>
                    <span className="text-foreground">{m.belief}</span> — {m.correction}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </GlassPanel>

      <div className="mt-8">
        {lesson.activities?.length ? (
          <LessonPlayer lesson={lesson} preview />
        ) : (
          <InDevelopment
            title="Activities for this lesson are still being built"
            description="The curriculum mapping and teacher guide above are final. The interactive beats follow."
          />
        )}
      </div>
    </main>
  );
}
