import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Wordmark } from "@/components/common/Primitives";
import { cn } from "@/lib/utils";
import { Home, BookOpen, Compass, Trophy } from "lucide-react";

const items = [
  { to: "/learn", label: "Home", icon: Home, exact: true },
  { to: "/learn/topics", label: "Learn", icon: BookOpen },
  { to: "/learn/explore", label: "Explore", icon: Compass },
  { to: "/learn/progress", label: "Progress", icon: Trophy },
] as const;

export function StudentShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4 sm:px-6">
          <Wordmark sub="Classroom" />
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {items.map(({ to, label, icon: Icon, ...rest }) => {
              const exact = "exact" in rest && rest.exact;
              const active = exact ? pathname === to : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition",
                    active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-border/60 bg-background/90 py-2 backdrop-blur-xl md:hidden">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 text-[10px]",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
