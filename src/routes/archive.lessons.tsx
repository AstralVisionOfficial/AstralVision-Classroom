import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { LESSONS, STRANDS, type Strand, type Tier } from "@/lib/lessons/catalog";
import { Clock, ArrowRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lessons")({
  head: () => ({
    meta: [
      { title: "Lesson Library — Astral Vision" },
      { name: "description", content: "Space-framed lessons mapped to the Australian Curriculum v9. Ready-to-run missions for every strand." },
      { property: "og:title", content: "Lesson Library — Astral Vision" },
      { property: "og:description", content: "Space-framed lessons mapped to the Australian Curriculum v9." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LessonsPage,
});

const TIERS: Tier[] = ["Foundation", "Standard", "Advanced"];

function LessonsPage() {
  const [strand, setStrand] = useState<Strand | "All">("All");
  const [tier, setTier] = useState<Tier | "All">("All");
  const [year, setYear] = useState<number | "All">("All");

  const years = useMemo(
    () => Array.from(new Set(LESSONS.map((l) => l.year))).sort((a, b) => a - b),
    [],
  );

  const filtered = LESSONS.filter(
    (l) =>
      (strand === "All" || l.strand === strand) &&
      (tier === "All" || l.tier === tier) &&
      (year === "All" || l.year === year),
  );

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan">
        Lesson Library · Powered by Astral Vision
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">
        Space-framed lessons, curriculum-aligned.
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
        Every mission maps to the Australian Curriculum v9. Space is the hook —
        cells, chemistry, forces and Earth systems are the substance.
      </p>

      {/* Filters */}
      <GlassPanel className="mt-8 p-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Filter
          </div>
          <FilterGroup
            label="Strand"
            value={strand}
            options={["All", ...STRANDS]}
            onChange={(v) => setStrand(v as Strand | "All")}
          />
          <FilterGroup
            label="Difficulty"
            value={tier}
            options={["All", ...TIERS]}
            onChange={(v) => setTier(v as Tier | "All")}
          />
          <FilterGroup
            label="Year"
            value={year === "All" ? "All" : String(year)}
            options={["All", ...years.map((y) => `Y${y}`)]}
            onChange={(v) => setYear(v === "All" ? "All" : parseInt(v.slice(1), 10))}
          />
          <div className="ml-auto telemetry text-muted-foreground">
            {filtered.length} / {LESSONS.length} lessons
          </div>
        </div>
      </GlassPanel>

      {/* Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => {
          const live = l.status === "live";
          const card = (
            <GlassPanel
              className={cn(
                "h-full p-5",
                live ? "hover:border-primary/40 transition" : "opacity-80",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="telemetry text-[10px] tracking-widest text-cyan">{l.code}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-0.5 text-[10px]">
                  <Clock className="h-3 w-3" /> {l.durationMinutes} min
                </span>
              </div>
              <div className="mt-3 font-display text-lg font-semibold leading-tight">
                {l.title}
              </div>
              <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {l.framing}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Chip>{l.strand}</Chip>
                <Chip>Year {l.year}</Chip>
                <Chip>{l.tier}</Chip>
              </div>
              <div className="mt-4 text-xs font-semibold">
                {live ? (
                  <span className="inline-flex items-center gap-1 text-primary">
                    Open lesson <ArrowRight className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="text-muted-foreground">Preview details</span>
                )}
              </div>
            </GlassPanel>
          );
          return (
            <Link
              key={l.slug}
              to="/lessons/$slug"
              params={{ slug: l.slug }}
              className="block"
            >
              {card}
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <GlassPanel className="col-span-full p-8 text-center text-sm text-muted-foreground">
            No lessons match those filters yet.
          </GlassPanel>
        )}
      </div>
    </main>
  );
}

function FilterGroup({
  label, value, options, onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] transition",
                active
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border bg-surface/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface/60 px-2 py-0.5 text-[10px] text-muted-foreground">
      {children}
    </span>
  );
}
