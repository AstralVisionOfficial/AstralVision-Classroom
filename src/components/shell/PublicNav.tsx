import { Link, useRouterState } from "@tanstack/react-router";
import { Wordmark } from "@/components/common/Primitives";
import { cn } from "@/lib/utils";

const links = [
  { to: "/for-teachers", label: "For teachers" },
  { to: "/for-schools", label: "For schools" },
  { to: "/curriculum", label: "Curriculum" },
  { to: "/about", label: "About" },
] as const;

/** Marketing navigation. Hidden inside the teacher, student, admin and board apps. */
export function PublicNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hidden = ["/teach", "/learn", "/admin", "/project"].some((p) => pathname.startsWith(p));
  if (hidden) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Wordmark sub="Classroom" />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition",
                pathname === l.to ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/auth" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
          <Link
            to="/teach"
            className="rounded-md bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Try a lesson
          </Link>
        </div>
      </div>
    </header>
  );
}
