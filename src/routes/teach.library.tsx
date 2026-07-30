import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Pill } from "@/components/common/Primitives";
import { LESSONS, STRANDS, YEARS } from "@/lib/content";
import type { Strand, YearLevel } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/teach/library")({
  head: () => ({
    meta: [
      { title: "Lesson Library — Teacher App | Astral Vision Classroom" },
      { name: "description", content: "Browse Years 6–8 Science lessons by strand, year and topic. Every lesson shows its curriculum codes and duration." },
      { property: "og:title", content: "Lesson Library — Astral Vision Classroom" },
      { property: "og:description", content: "Browse curriculum-aligned Years 6–8 Science lessons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const [strand, setStrand] = useState<Strand | "All">("All");
  const [year, setYear] = useState<YearLevel | "All">("All");

  const filtered = LESSONS.filter(
    (l) => (strand === "All" || l.strand === strand) && (year === "All" || l.year === year),
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Lesson library</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {filtered.length} of {LESSONS.length} lessons
      </p>

      <div className="mt-5 flex flex-wrap gap-4">
        <Filter
          label="Strand"
          value={strand}
          options={["All", ...STRANDS]}
          onChange={(v) => setStrand(v as Strand | "All")}
        />
        <Filter
          label="Year"
          value={year === "All" ? "All" : `Year ${year}`}
          options={["All", ...YEARS.map((y) => `Year ${y}`)]}
          onChange={(v) => setYear(v === "All" ? "All" : (Number(v.replace("Year ", "")) as YearLevel))}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((l) => (
          <Link key={l.slug} to="/lesson-preview/$slug" params={{ slug: l.slug }} className="block">
            <GlassPanel
              className={cn("h-full p-5 transition", l.status === "ready" ? "hover:border-primary/40" : "opacity-75")}
            >
              <div className="flex items-center justify-between">
                <Pill tone={l.status === "ready" ? "primary" : "default"}>
                  {l.status === "ready" ? "Ready" : "In development"}
                </Pill>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {l.minutes} min
                </span>
              </div>
              <div className="mt-3 font-display text-base font-semibold leading-tight">{l.title}</div>
              <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{l.concept}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Pill>Year {l.year}</Pill>
                <Pill>{l.strand}</Pill>
                {l.curriculumCodes.map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))}
              </div>
            </GlassPanel>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] transition",
              value === o
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-border bg-surface/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
