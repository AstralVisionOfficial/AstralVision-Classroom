import { CheckCircle2 } from "lucide-react";

export interface CurriculumInfo {
  code: string;         // e.g. "ACSSU115"
  yearLevel: string;    // "Year 8 Science"
  strand: string;       // "Earth and Space Sciences"
  outcome: string;      // "Orbital motion and gravitational force"
  duration: string;     // "45 min"
  group: string;        // "Individual or Teams"
  resources: string;    // "Included"
  assessment: string;   // "Included"
}

export function CurriculumBadge({ info, compact = false }: { info: CurriculumInfo; compact?: boolean }) {
  return (
    <div className="glass p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
          Australian Curriculum
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="font-semibold text-foreground">{info.yearLevel}</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">{info.strand}</span>
      </div>
      <div className="mt-2 font-display text-base font-medium text-foreground">
        <span className="telemetry text-cyan">{info.code}</span> — {info.outcome}
      </div>
      {!compact && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["Duration", info.duration],
            ["Group", info.group],
            ["Resources", info.resources],
            ["Assessment", info.assessment],
          ].map(([label, val]) => (
            <div key={label} className="flex items-center gap-2 rounded-md bg-secondary/40 px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
                <div className="truncate text-sm font-medium">{val}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
