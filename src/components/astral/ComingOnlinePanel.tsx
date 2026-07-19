import { Link } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Radio } from "lucide-react";

export function ComingOnlinePanel({
  eyebrow, title, description,
}: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <GlassPanel tone="strong" className="p-8 sm:p-14 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-primary/40 cyan-glow">
          <Radio className="h-6 w-6 text-primary animate-pulse" />
        </div>
        <div className="mt-6 font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">
          {eyebrow}
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/demo/classroom"
            className="rounded-md bg-cyan-grad px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Launch Teacher Demo
          </Link>
          <Link
            to="/"
            className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-secondary"
          >
            Return home
          </Link>
        </div>
      </GlassPanel>
    </div>
  );
}
