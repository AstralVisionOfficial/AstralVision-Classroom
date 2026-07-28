# Build Plan — Phases 2, 3, 4

"All of the above" is a large body of work. To ship it well and keep each turn reviewable, I'll build in three sequenced phases. Each phase ends in a working, demo-able state before I start the next.

## Phase 2 — Lesson Library (`/lessons`)

Space-framed lessons organised by Australian Curriculum v9 Year 8 strands (extensible to other years later).

- New route `/lessons` — filterable grid (strand, duration, difficulty, tier).
- New route `/lessons/$slug` — lesson detail with "Begin Mission" CTA.
- Strand hubs: Biological, Chemical, Physical, Earth & Space.
- Extend `mission-catalog.ts` into a full catalog (`src/lib/lessons/*`), each lesson keyed with: strand, year, curriculum codes, space framing hook, objectives, duration, tier, status.
- Seed ~8 lesson stubs (Cells → "Life aboard the ISS", Chemical Reactions → "Rocket propellant chemistry", Forces → Mission 001 (live), Rock cycle → "Mars geology", etc). Only Mission 001 is fully playable; others show a polished "Coming online" state with the framing + objectives visible.
- Nav: add "Lessons" to `TopNav` and a card on Mission Control home.

## Phase 3 — Teacher & Student Dashboards

Backend + role-aware UI. Uses existing `profiles`, `user_roles`, `reflections` tables; adds `classes`, `class_members`, `mission_attempts`.

- Migration: `classes` (teacher_id, name, year_level, join_code), `class_members` (class_id, student_id), `mission_attempts` (user_id, mission_slug, tier, score, completed_at, payload jsonb). All with RLS + GRANTs; teachers see their classes, students see own attempts.
- Server fns (`*.functions.ts` + `requireSupabaseAuth`): `createClass`, `joinClass`, `listMyClasses`, `recordAttempt`, `listClassProgress`, `listStudentAttempts`.
- Teacher dashboard `/teacher` — class list, roster, per-mission completion %, recent reflections, smartboard launcher.
- Student dashboard `/student` — assigned/available missions, XP, recent attempts, reflection history.
- Wire Mission 001 completion → `recordAttempt`.
- Role-based redirect after login (student → `/student`, teacher → `/teacher`, else `/mission-control`).

## Phase 4 — Gamification + ASTRA AI

- XP + ranks: derive from `mission_attempts` (Cadet → Pilot → Commander → Mission Specialist). Rank chip in TopNav; progress ring on Student dashboard.
- Mission badges: awarded on completion (data-driven from lesson metadata); gallery on student profile.
- ASTRA (Astral Teaching & Research Assistant) at `/astra`:
  - Chat UI (dark, telemetry-styled) using Lovable AI Gateway (`google/gemini-2.5-flash` default).
  - Server route `src/routes/api/astra.ts` streaming SSE; system prompt scopes ASTRA to teaching help, curriculum alignment, and mission context.
  - Teacher tools: "Draft a lesson extension", "Explain this misconception", "Generate 3 exit-ticket questions".
  - Student tools (safer prompt): hints not answers, Socratic style.

## Order & checkpoints

1. Phase 2 → I ship, you review the library UX.
2. Phase 3 → schema + dashboards, you sign off on roles.
3. Phase 4 → XP/ranks first, ASTRA last (largest new surface).

## Technical notes

- All new tables get `GRANT` + RLS in the same migration; role checks via `has_role`.
- Server fns live in `src/lib/*.functions.ts`; admin client only for privileged writes.
- Dashboards use `ensureQueryData` in loaders under `_authenticated/`.
- ASTRA streams via a TSS server route (raw `Response`), not `createServerFn`.
- No new deps for Phase 2–3; Phase 4 adds nothing (Lovable AI is HTTP).

Reply "go" to start Phase 2, or tell me to reorder / trim.