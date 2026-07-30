import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Activity, Lesson, Question } from "@/lib/content/types";
import { SolarAngleSim } from "@/components/sims/SolarAngleSim";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Pill } from "@/components/common/Primitives";
import { recordResult } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";

const BEATS: Record<Activity["kind"], string> = {
  explore: "Explore",
  investigate: "Investigate",
  challenge: "Challenge",
  check: "Check",
};

export function LessonPlayer({ lesson, preview = false }: { lesson: Lesson; preview?: boolean }) {
  const activities = lesson.activities ?? [];
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const activity = activities[index];

  const complete = (score: number) => {
    if (!preview) recordResult({ lessonSlug: lesson.slug, activityIndex: index, score, completedAt: new Date().toISOString() });
    if (index < activities.length - 1) setIndex(index + 1);
    else setFinished(true);
  };

  if (!activity) return null;

  if (finished) return <LessonComplete lesson={lesson} onRestart={() => { setIndex(0); setFinished(false); }} />;

  return (
    <div>
      <div className="flex items-center gap-3">
        {!preview && (
          <Link to="/learn" className="rounded-md p-1.5 text-muted-foreground hover:text-foreground" aria-label="Exit lesson">
            <X className="h-4 w-4" />
          </Link>
        )}
        <div className="flex flex-1 gap-1.5">
          {activities.map((a, i) => (
            <div key={a.title} className="flex-1">
              <div
                className={cn(
                  "h-1 rounded-full transition",
                  i < index ? "bg-primary" : i === index ? "bg-primary/60" : "bg-border",
                )}
              />
              <div className={cn("mt-1.5 text-[10px] uppercase tracking-[0.16em]", i === index ? "text-primary" : "text-muted-foreground")}>
                {BEATS[a.kind]}
              </div>
            </div>
          ))}
        </div>
        <span className="hidden text-xs text-muted-foreground sm:inline">{activity.minutes} min</span>
      </div>

      <h1 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">{activity.title}</h1>

      <div className="mt-5">
        {activity.kind === "explore" && <ExploreView activity={activity} onDone={() => complete(1)} />}
        {activity.kind === "investigate" && <InvestigateView activity={activity} onDone={() => complete(1)} />}
        {activity.kind === "challenge" && (
          <QuestionSet
            intro={activity.scenario}
            questions={activity.questions}
            onDone={complete}
          />
        )}
        {activity.kind === "check" && <QuestionSet questions={activity.questions} onDone={complete} />}
      </div>

      {index > 0 && (
        <button
          onClick={() => setIndex(index - 1)}
          className="mt-8 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Previous step
        </button>
      )}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
    >
      {children}
      <ChevronRight className="h-4 w-4" />
    </button>
  );
}

function ExploreView({ activity, onDone }: { activity: Extract<Activity, { kind: "explore" }>; onDone: () => void }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div>
      <GlassPanel className="overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[1fr_1fr]">
          <div className="grid place-items-center bg-secondary/20 p-6">
            <PhenomenonVisual visual={activity.visual} />
          </div>
          <div className="p-6">
            <p className="text-base leading-relaxed">{activity.phenomenon}</p>
            <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">What do you notice?</div>
              <p className="mt-1.5 text-sm">{activity.noticePrompt}</p>
            </div>
            {revealed ? (
              <p className="mt-4 text-sm text-muted-foreground">{activity.reveal}</p>
            ) : (
              <button
                onClick={() => setRevealed(true)}
                className="mt-4 text-sm font-medium text-primary hover:underline"
              >
                Think first, then reveal →
              </button>
            )}
          </div>
        </div>
      </GlassPanel>
      <div className="mt-6">
        <PrimaryButton onClick={onDone} disabled={!revealed}>Start investigating</PrimaryButton>
      </div>
    </div>
  );
}

function PhenomenonVisual({ visual }: { visual: string }) {
  if (visual === "earth-day-night") {
    return (
      <svg viewBox="0 0 200 200" className="w-full max-w-[220px]">
        <defs>
          <linearGradient id="term" x1="0" x2="1">
            <stop offset="45%" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="var(--background)" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="62" fill="url(#term)" stroke="var(--border-strong)" />
        <ellipse cx="100" cy="100" rx="86" ry="86" fill="none" stroke="var(--border)" strokeDasharray="3 6" />
        <circle cx="168" cy="70" r="5" fill="var(--accent)" />
        <circle cx="34" cy="132" r="5" fill="var(--muted-foreground)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[220px]">
      <rect x="20" y="30" width="60" height="60" rx="4" fill="var(--primary)" opacity="0.7" />
      <path d="M95 60 H150" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#a)" />
    </svg>
  );
}

function InvestigateView({ activity, onDone }: { activity: Extract<Activity, { kind: "investigate" }>; onDone: () => void }) {
  return (
    <div>
      <div className="rounded-lg border border-border/60 bg-surface/50 p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Your task</div>
        <p className="mt-1.5 text-sm">{activity.task}</p>
      </div>
      <div className="mt-5">{activity.sim === "solar-angle" ? <SolarAngleSim /> : null}</div>
      <p className="mt-5 text-xs text-muted-foreground">You're done when: {activity.successWhen}</p>
      <div className="mt-5">
        <PrimaryButton onClick={onDone}>I've found the pattern</PrimaryButton>
      </div>
    </div>
  );
}

function QuestionSet({
  intro,
  questions,
  onDone,
}: {
  intro?: string;
  questions: Question[];
  onDone: (score: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const correctCount = useMemo(
    () =>
      questions.filter((q) => {
        if (!checked[q.id]) return false;
        if (q.type === "choice") return answers[q.id] === q.answerIndex;
        if (q.type === "numeric") return Math.abs(Number(answers[q.id]) - q.answer) <= q.tolerance;
        return String(answers[q.id] ?? "").trim().length > 12;
      }).length,
    [answers, checked, questions],
  );

  const allChecked = questions.every((q) => checked[q.id]);

  return (
    <div>
      {intro && (
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm">{intro}</div>
      )}
      <div className="mt-4 space-y-4">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            n={i + 1}
            q={q}
            value={answers[q.id]}
            checked={!!checked[q.id]}
            onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
            onCheck={() => setChecked((c) => ({ ...c, [q.id]: true }))}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <PrimaryButton disabled={!allChecked} onClick={() => onDone(correctCount / questions.length)}>
          Continue
        </PrimaryButton>
        <span className="text-xs text-muted-foreground">
          {correctCount} of {questions.length} correct so far
        </span>
      </div>
    </div>
  );
}

function QuestionCard({
  n,
  q,
  value,
  checked,
  onChange,
  onCheck,
}: {
  n: number;
  q: Question;
  value: string | number | undefined;
  checked: boolean;
  onChange: (v: string | number) => void;
  onCheck: () => void;
}) {
  const correct =
    q.type === "choice"
      ? value === q.answerIndex
      : q.type === "numeric"
        ? Math.abs(Number(value) - q.answer) <= q.tolerance
        : String(value ?? "").trim().length > 12;

  return (
    <GlassPanel className="p-5">
      <div className="flex gap-3">
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-[11px] text-muted-foreground">
          {n}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{q.prompt}</p>

          {q.type === "choice" && (
            <div className="mt-3 grid gap-2">
              {q.options.map((opt, i) => (
                <button
                  key={opt}
                  disabled={checked}
                  onClick={() => onChange(i)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-left text-sm transition",
                    value === i ? "border-primary/60 bg-primary/10" : "border-border hover:border-border-strong",
                    checked && i === q.answerIndex && "border-primary bg-primary/15",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {q.type === "numeric" && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="number"
                disabled={checked}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                className="w-36 rounded-lg border border-border bg-surface/60 px-3 py-2 font-mono text-sm outline-none focus:border-primary"
              />
              {q.unit && <span className="text-xs text-muted-foreground">{q.unit}</span>}
            </div>
          )}

          {q.type === "written" && (
            <textarea
              disabled={checked}
              rows={3}
              placeholder={q.sentenceStarter}
              value={String(value ?? "")}
              onChange={(e) => onChange(e.target.value)}
              className="mt-3 w-full rounded-lg border border-border bg-surface/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          )}

          {!checked ? (
            <button
              onClick={onCheck}
              disabled={value === undefined || value === ""}
              className="mt-3 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary/50 disabled:opacity-40"
            >
              Check
            </button>
          ) : (
            <div
              className={cn(
                "mt-3 flex gap-2 rounded-lg p-3 text-xs",
                correct ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent",
              )}
            >
              {correct ? <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
              <span>
                {q.type === "written"
                  ? `Look for: ${q.lookFor.join(", ")}`
                  : q.feedback}
              </span>
            </div>
          )}
        </div>
      </div>
    </GlassPanel>
  );
}

function LessonComplete({ lesson, onRestart }: { lesson: Lesson; onRestart: () => void }) {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15">
        <Check className="h-6 w-6 text-primary" />
      </div>
      <h1 className="mt-5 font-display text-3xl font-semibold">Lesson complete</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{lesson.concept}</p>

      <GlassPanel className="mx-auto mt-8 max-w-lg p-6 text-left">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">You can now</div>
        <ul className="mt-3 space-y-2 text-sm">
          {lesson.successCriteria.map((s) => (
            <li key={s} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {lesson.curriculumCodes.map((c) => (
            <Pill key={c} tone="primary">{c}</Pill>
          ))}
        </div>
      </GlassPanel>

      <div className="mt-6 flex justify-center gap-3">
        <Link to="/learn" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          Back to home
        </Link>
        <button onClick={onRestart} className="rounded-lg border border-border px-5 py-2.5 text-sm hover:bg-secondary/50">
          Replay lesson
        </button>
      </div>
    </div>
  );
}
