import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Radar } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/mission-control", label: "Mission Control" },
  { to: "/lessons", label: "Lessons" },
  { to: "/demo/principal", label: "Principal" },
];

export function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setEmail(data.session?.user.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user.email ?? null);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-cyan-grad cyan-glow">
            <Radar className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display text-sm font-semibold tracking-wide">
            ASTRAL <span className="text-cyan">VISION</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={
                  "px-3 py-1.5 rounded-md transition-colors " +
                  (active
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60")
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {email ? (
            <>
              <span className="hidden sm:inline text-xs text-muted-foreground telemetry">{email}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => { await supabase.auth.signOut(); window.location.href = "/"; }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="bg-cyan-grad text-primary-foreground hover:opacity-90">
                <Link to="/demo/classroom">Launch Demo</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
