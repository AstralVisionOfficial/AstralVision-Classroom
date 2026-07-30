/**
 * Local student progress. Deliberately a thin, replaceable layer: progress and
 * achievements are *derived* from attempt records, so swapping this for a
 * Cloud-backed store later touches only this file.
 */

export type ActivityResult = {
  lessonSlug: string;
  activityIndex: number;
  score: number; // 0..1
  completedAt: string;
};

const KEY = "avc.attempts.v1";

function read(): ActivityResult[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as ActivityResult[];
  } catch {
    return [];
  }
}

export function allResults(): ActivityResult[] {
  return read();
}

export function recordResult(r: ActivityResult) {
  if (typeof window === "undefined") return;
  const next = read().filter(
    (x) => !(x.lessonSlug === r.lessonSlug && x.activityIndex === r.activityIndex),
  );
  next.push(r);
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function lessonProgress(slug: string, total: number) {
  const done = read().filter((r) => r.lessonSlug === slug);
  const score = done.length ? done.reduce((a, b) => a + b.score, 0) / done.length : 0;
  return { completed: done.length, total, score, done: total > 0 && done.length >= total };
}

export function resetLesson(slug: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(read().filter((r) => r.lessonSlug !== slug)));
}
