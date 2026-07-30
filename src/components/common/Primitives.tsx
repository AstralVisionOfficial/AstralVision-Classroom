import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Wordmark({ sub }: { sub?: string }) {
  return (
    <Link to="/" className="flex items-baseline gap-2">
      <span className="font-display text-sm font-semibold tracking-[0.14em]">
        ASTRAL <span className="text-primary">VISION</span>
      </span>
      {sub && (
        <span className="hidden text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:inline">
          {sub}
        </span>
      )}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</div>
      )}
      <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
      {lede && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{lede}</p>}
    </div>
  );
}

export function InDevelopment({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border/70 bg-surface/40 p-8 text-center">
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        In development
      </div>
      <h2 className="mt-2 font-display text-xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "primary" | "accent" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px]",
        tone === "primary" && "border-primary/40 bg-primary/10 text-primary",
        tone === "accent" && "border-accent/40 bg-accent/10 text-accent",
        tone === "default" && "border-border bg-surface/60 text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}
