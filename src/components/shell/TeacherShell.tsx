import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Wordmark } from "@/components/common/Primitives";
import { cn } from "@/lib/utils";
import { CalendarDays, Library, Users, Map, BarChart3, FileText } from "lucide-react";

const items = [
  { to: "/teach", label: "Today", icon: CalendarDays, exact: true },
  { to: "/teach/library", label: "Library", icon: Library },
  { to: "/teach/classes", label: "Classes", icon: Users },
  { to: "/teach/planner", label: "Planner", icon: Map },
  { to: "/teach/insights", label: "Insights", icon: BarChart3 },
  { to: "/teach/resources", label: "Resources", icon: FileText },
] as const;

export function TeacherShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Wordmark sub="Classroom · Teacher" />
          <Link
            to="/learn"
            className="ml-auto rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            Student view
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <nav className="hidden w-48 shrink-0 md:block">
          <ul className="sticky top-20 space-y-1">
            {items.map(({ to, label, icon: Icon, ...rest }) => {
              const exact = "exact" in rest && rest.exact;
              const active = exact ? pathname === to : pathname.startsWith(to);
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <main className="min-w-0 flex-1 pb-16">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-border/60 bg-background/90 px-2 py-2 backdrop-blur-xl md:hidden">
        {items.slice(0, 5).map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className="flex flex-col items-center gap-0.5 px-2 text-[10px] text-muted-foreground">
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
