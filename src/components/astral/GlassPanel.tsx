import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function GlassPanel({
  className, children, tone = "default", ...rest
}: HTMLAttributes<HTMLDivElement> & { tone?: "default" | "strong" | "alert"; children?: ReactNode }) {
  return (
    <div
      className={cn(
        "relative",
        tone === "strong" ? "glass-strong" : "glass",
        tone === "alert" && "alert-glow border-alert/60",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  eyebrow, title, meta,
}: { eyebrow?: string; title: string; meta?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 px-5 py-4">
      <div>
        {eyebrow && (
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">{eyebrow}</div>
        )}
        <h3 className="font-display text-lg font-semibold leading-tight">{title}</h3>
      </div>
      {meta && <div className="text-xs telemetry text-muted-foreground">{meta}</div>}
    </div>
  );
}
