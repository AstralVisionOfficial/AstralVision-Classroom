# Grade-Aware Student Experience

Add a grade picker before the student enters a lesson, then scale Mission 001's vocabulary/explanations and practice questions to the chosen tier. Formulas and the manoeuvre sim stay the same across tiers.

## Tiers

- **Foundation** — Years 5–6
- **Standard** — Years 7–9 (default; current content)
- **Advanced** — Years 10–12

## Flow

```text
Landing → "View Student Experience"
        → /demo/classroom  (existing)
        → NEW: Grade Picker screen (3 tier cards + year buttons)
        → Mission 001 lesson (adapts to selected tier)
```

Selected tier persists in `localStorage` (`astral:grade-tier`) and is shown as a chip in the lesson header. A "Change grade" link returns to the picker.

## Content differences per tier

Only two axes change (per your answers). Formulas, sliders, and mission flow are unchanged.

**Vocabulary & explanations**
- Foundation: plain-English analogies. "Δv" written as "small push"; Kepler's law described as "higher orbits take longer laps"; debris framed as "space junk". Shorter paragraphs.
- Standard: current wording — technical terms introduced with definitions (Δv, prograde, conjunction).
- Advanced: assumes fluency — adds nuance (specific impulse mention, why radial burns distort orbit shape, real conjunction thresholds).

**Practice questions** (the "Check your maths" block)
- Foundation: 3 multiple-choice questions. Pick the closest along-track shift; pick which burn direction moves the ISS ahead; pick which timing gives the biggest shift.
- Standard: current 3 numeric questions with ±0.05 km / ±0.5 min tolerance.
- Advanced: 4 numeric questions with tighter tolerance (±0.02 km). Adds one two-step question (compute Δs, then judge whether it clears the 2 km safety threshold).

The Commit-recommendation gate on the manoeuvre panel is unchanged for all tiers.

## Files to change

- `src/routes/demo.classroom.tsx` — replace "Launch Mission 001" CTA with "Choose your year level", then route to the lesson with the selected tier.
- `src/routes/demo.lesson.mission-001-save-the-iss.tsx` — read tier from localStorage (fallback to Standard), branch copy in `BriefingStage`, `LearnOrbitStage`, `LearnDebrisStage`, `AnalyseStage`; swap `PracticeQuestions` for tier-specific variant. Add tier chip + "Change grade" link in the header bar.
- `src/lib/mission-001.ts` — add `MissionTier` type, `TIER_COPY` (per-tier paragraphs and question sets), helper `getTier()` / `setTier()`.
- No new routes, no schema changes, no backend work.

## Technical details

- Tier state lives in a small `useTier()` hook backed by `localStorage`, read in `useEffect` to avoid SSR hydration mismatch (initial render assumes Standard).
- Question definitions become data: `TIER_COPY[tier].questions: Array<{prompt, type: "mc" | "numeric", answer, options?, tolerance?}>`. The existing `Question` component gains an MC branch.
- Grade picker is inline on `/demo/classroom` (not a new route) — three tier cards with year-band buttons underneath each.

## Out of scope

- Formula depth changes, alternative manoeuvre sims, per-year (not per-tier) content, saving tier to the user profile in Cloud, teacher-locked tiers. Flag any of these if you want them included and I'll extend the plan.
