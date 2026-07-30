import { createFileRoute, Link } from "@tanstack/react-router";
import { LessonPlayer } from "@/components/learn/LessonPlayer";
import { getLesson } from "@/lib/content";
import { InDevelopment } from "@/components/common/Primitives";

export const Route = createFileRoute("/learn/lesson/$slug")({
  head: ({ params }) => {
    const lesson = getLesson(params.slug);
    const title = lesson ? `${lesson.title} — Astral Vision Classroom` : "Lesson — Astral Vision Classroom";
    const description = lesson?.concept ?? "An interactive Years 6–8 Science lesson.";
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
  component: LessonRoute,
});

function LessonRoute() {
  const { slug } = Route.useParams();
  const lesson = getLesson(slug);

  if (!lesson || !lesson.activities?.length) {
    return (
      <InDevelopment
        title="This lesson is still being built"
        description="The concept, curriculum mapping and teacher guide are set. The interactive activities are next."
      >
        <Link to="/learn" className="text-sm text-primary hover:underline">
          Back to your lessons
        </Link>
      </InDevelopment>
    );
  }

  return <LessonPlayer lesson={lesson} />;
}
