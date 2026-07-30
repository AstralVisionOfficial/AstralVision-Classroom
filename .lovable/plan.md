# Astral Vision Classroom — Product Architecture (Reset)

No interface work in this document. Existing code stays in place; when build begins, old pages move to `src/routes/archive/*` and the design system, auth, Cloud schema, and utility components carry forward untouched.

---

## 1. Product Overview

Astral Vision Classroom is a Years 6–8 Science platform for Australian schools. Teachers pick a topic aligned to the Australian Curriculum v9; students learn it through short interactive experiences — simulations, manipulable diagrams, and problem challenges — rather than reading pages. Space provides the real-world context and curiosity hook, never the whole syllabus.

Three audiences, one product:
- **Teacher** — the customer. Picks, previews, assigns, projects, and reviews.
- **Student** — the user. Explores, experiments, answers, progresses.
- **Administrator** — the buyer. Sees adoption, coverage, and outcomes.

---

## 2. Philosophy (decision filter)

Every feature must pass at least one: saves teacher time, increases student engagement, or improves understanding. Otherwise it is cut.

- Education first — curriculum code on every piece of content.
- Interaction over reading — no screen is text-only; each has something to move, test, or decide.
- Teacher first — zero-prep is the default state, not a mode.
- Modern learning — visual explanation, inquiry, feedback loops. Not a digital textbook.
- Space as context — the curriculum concept leads; the space framing is the hook.
- Restraint — one clear action per screen; no roleplay theatre.

---

## 3. Recommended Product Structure

**Topic → Lesson → Activity**, with Pathways as an optional teacher-built sequence.

```text
Year level (6 / 7 / 8)
  └─ Strand (Biological, Chemical, Physical, Earth & Space)
       └─ Topic            e.g. "Energy Transfer"      (2-5 lessons)
            └─ Lesson      e.g. "Solar Power in Orbit" (~45 min)
                 └─ Activity  Explore | Investigate | Challenge | Check
```

Why this and not "Worlds": teachers plan in topics and units and search by curriculum code. Game-style worlds obscure coverage and make a school's scope-and-sequence impossible to map. Progression and delight live in the activity layer, not the taxonomy.

**Lesson shape — four activity types, always in this order:**
1. **Explore** — a hook and a live/visual phenomenon. 5 min.
2. **Investigate** — the core interactive: simulation, model, or dataset the student manipulates. 15–20 min.
3. **Challenge** — applied problem set with feedback; scaffolded by difficulty tier. 10–15 min.
4. **Check** — 4–6 questions plus one written explanation. 5 min.

Every lesson uses the same four beats, so students learn the interface once and teachers can predict timing.

---

## 4. Sitemap

```text
PUBLIC
  /                         Product overview for schools
  /for-teachers             Value, curriculum coverage, sample lesson
  /for-schools              Pricing, pilot program, evidence
  /curriculum               Coverage map (Y6-8, all strands)
  /lesson-preview/$slug     Public sample lesson (no account)
  /about                    Company
  /auth                     Sign in / join with class code

TEACHER  (/teach)
  /teach                    Today: next class, recent activity, quick start
  /teach/library            Browse: year, strand, topic, code, duration
  /teach/library/$topic     Topic overview + lessons
  /teach/lesson/$slug       Lesson preview + teacher guide + Assign / Project
  /teach/classes            Class list
  /teach/classes/$id        Roster, progress, results
  /teach/classes/$id/assign Assign a lesson, set tier and due date
  /teach/planner            Drag lessons into a term pathway
  /teach/insights           Understanding by concept, misconception flags
  /teach/resources          Worksheets, rubrics, slides, answer keys
  /teach/settings

STUDENT  (/learn)
  /learn                    Assigned now, continue, explore
  /learn/topic/$topic       Topic map of lessons
  /learn/lesson/$slug       The 4-activity lesson player
  /learn/lesson/$slug/done  Result, feedback, what's next
  /learn/progress           Concepts mastered, badges, streak
  /learn/explore            Free-choice lessons + live space data views

ADMIN  (/admin)
  /admin                    School overview
  /admin/teachers           Staff, invitations, activity
  /admin/classes            All classes
  /admin/coverage           Curriculum coverage across the school
  /admin/outcomes           Growth and engagement over time
  /admin/settings           Licence, SSO, branding

SHARED
  /project/$slug            Full-screen board mode for a lesson
  /help
```

---

## 5. Navigation

**Teacher** — persistent left rail, five items: Today, Library, Classes, Planner, Insights. Resources and Settings sit under the avatar menu. A global search field (⌘K) queries lessons by title, concept, or curriculum code.

**Student** — bottom bar on tablet/mobile, top bar on desktop, four items: Home, Learn, Explore, Progress. Nothing else. Inside a lesson, all chrome disappears except a progress spine and an exit control.

**Administrator** — left rail: Overview, Teachers, Classes, Coverage, Outcomes, Settings.

**Board mode** — no navigation at all. Arrow keys advance, `F` fullscreens, `Esc` exits.

Rule: a student never sees teacher navigation, and a teacher previewing a lesson sees the exact student view with a thin teacher strip above it.

---

## 6. User Journeys

**Teacher — first lesson in under five minutes**
Sign up → pick year and strand → Library shows topics with coverage badges → open a lesson → preview the real student experience with a guide panel (intentions, timing, misconceptions, rubric) → either *Project* (board mode, no student accounts needed) or *Assign* to a class → afterwards Insights shows which concepts landed.

**Teacher — ongoing weekly loop**
Today screen → next class and its assigned lesson → project or assign → after class, review flagged misconceptions → drop the follow-up lesson into the Planner.

**Student — a lesson**
Sign in with class code → Home shows one assigned lesson → Explore hook → Investigate simulation → Challenge problems with immediate feedback → Check questions → result screen with what they understood, what to revisit, and progress earned → next lesson unlocked or free Explore.

**Administrator**
Overview → coverage map shows which curriculum codes the school has taught → outcomes trend by year level → identify teachers who need onboarding → export for reporting.

---

## 7. Information Architecture

Single source of truth per concern; no duplication.

| Concern | Lives in | Never also in |
|---|---|---|
| Lesson content | Library (one canonical lesson record) | Classes, Planner |
| Curriculum alignment | Lesson metadata; surfaced in Curriculum map | Hardcoded in pages |
| Teacher guidance | Lesson preview panel | Separate resources pages |
| Assignment state | Class ↔ Lesson join | Lesson record |
| Student results | Attempt records per activity | Class record |
| Progress and badges | Derived from attempts | Stored separately |
| Printables | Generated from lesson metadata, listed in Resources | Duplicated per lesson page |

Consequences: the Planner references lessons, it does not copy them. Insights and Progress are two views of the same attempt data. Gamification is a read-only derivation, so it can be redesigned without touching learning data.

**Data model to add when build begins:** `topics`, `lessons`, `activities`, `classes`, `class_members`, `assignments`, `attempts`, `concept_mastery`, `schools`. Existing `profiles`, `user_roles`, `reflections` are reused.

---

## 8. Design Direction

Carry the existing tokens forward — deep black, midnight panels, electric cyan, orange accent, glass surfaces — but shift the register from mission-control cockpit to premium science instrument. Less telemetry chrome and countdown drama, more whitespace, larger typography, and colour reserved for data and interaction. Student screens get generous spacing and one action; teacher screens get density.

---

## 9. Build Sequence (after approval)

1. Archive old routes; extract the shared component and token layer.
2. Content model + schema + seed one complete Year 8 topic.
3. Student lesson player (the four activity types) — this is the product.
4. Teacher library, preview, project, assign.
5. Classes, attempts, Insights.
6. Admin coverage and outcomes.
7. Progress and achievement layer.

---

## Review

Confirm three things and I'll begin: the **Topic → Lesson → Activity** structure, the **four-beat lesson shape**, and the **/teach ÷ /learn ÷ /admin** split. Anything you want changed, say so now — it is much cheaper here than in code.
