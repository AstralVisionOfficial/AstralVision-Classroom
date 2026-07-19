
# Astral Vision — Founding School Program v1

The pitch is no longer "evaluate our software." It's *"become the founding school of the Astral Vision program."* Every page reinforces that framing.

## The demo journey

```text
/                       Welcome — "Founding School Program" hero + two CTAs
  → /demo/classroom     Teacher Demo Mode (Year 8 Science, 28 students)
  → /demo/mission       Student POV entry to Mission 001

/demo/lesson/mission-001-save-the-iss   The cinematic lesson (below)
/demo/principal                          Principal Dashboard + teacher comments
/mission-control                         Real Mission Control (auth-gated)
/auth                                    Sign in / sign up (roles)
```

## Mission 001 — Save the ISS  (the cinematic lesson)

Positioned as the first entry in a series: Mission 002 Defend Earth, 003 Launch Artemis, 004 Rescue Hubble, 005 Moon Base Alpha (visible on the lessons index, disabled/locked).

**Teacher card (shown before entering):**
```text
MISSION 001 · SAVE THE ISS
Duration: 45 min · Difficulty: Year 8 · Group: Individual or Teams
Resources: Included · Assessment: Included
[Curriculum: AC Year 8 Science · Earth & Space Sciences · ACSSU115]
[ Start Lesson ]  [ Teacher Guide ▾ ]
```

**Teacher Guide (collapsible drawer, always accessible mid-lesson via "Teacher Notes" button):**
- Learning intentions
- Success criteria
- Materials
- Lesson flow (with per-stage timing)
- Discussion questions
- Assessment rubric (4-point)
- Extension activity
- **Expected misconceptions** · **Common student mistakes** · **Discussion ideas**

**Lesson flow (7 stages, always-visible curriculum banner on top):**

1. **Cold open — the alert** *(≈45s, no UI chrome)*
   - Fade to black. Calm voice-over (Web Speech / narration text with typewriter caption):
     > *"Welcome, Mission Controllers. At 09:42 UTC, tracking stations detected orbital debris on a projected path toward the International Space Station. NASA has requested assistance in evaluating possible avoidance manoeuvres. Your team has 45 minutes to analyse the situation and recommend the safest course of action."*
   - Red alert sweep, klaxon pulse (CSS only), MISSION ALERT panel.
   - Countdown 15:00 to conjunction begins ticking.

2. **Briefing** — flight director requests assistance; objectives revealed.
3. **Learn — Orbital motion** — interactive altitude slider recomputes period live (Kepler's third law); short teach card.
4. **Learn — Gravity & debris** — Kessler-syndrome visual explainer.
5. **Analyse — the manoeuvre** — mini-sim: pick Δv (m/s) and burn direction; miss-distance bar updates; students commit an answer.
6. **Debrief — Mission Successful**
   ```text
   MISSION SUCCESSFUL
   You successfully prevented a collision with the
   International Space Station.

   Today you learned:
     · Orbital Motion
     · Gravity
     · Velocity
     · Engineering Design
     · Critical Thinking

   +250 XP · Badge: Orbital Guardian · [ Download Certificate ]
   ```
7. **Reflection** — four prompts, saved (localStorage in demo; DB for real accounts):
   - What worked?
   - What would you change?
   - Why did your burn succeed or fail?
   - How does this relate to real satellites?
8. **Did you know?** closer:
   > *"The scenario you completed today is based on the same types of decisions real flight dynamics engineers make when protecting satellites from orbital debris."*

## Welcome page `/`

- Hero: **"Inspiring Australia's Next Generation of Space Explorers"** with sub-line *"The Astral Vision Founding School Program"*.
- Two CTAs: **Launch Teacher Demo** · **View Student Experience**
- About Riley section (Year 10, Australian Astronaut Challenge finalist).
- **Founding Education Partner** slot with `FOUNDING_PARTNER_ENABLED = false` flag.
- Below the fold: curriculum alignment, teacher benefits, ecosystem (Classroom / Senior / Orbit / eVTOL).

## Teacher Demo `/demo/classroom`
Year 8 Science · 28 seeded students · Today's Mission = Mission 001 with [Start Lesson] · [Continue Yesterday] · [Teacher Resources] · [Student View]. Class roster, avg progress 74%, curriculum coverage sidebar.

## Principal Dashboard `/demo/principal`
- Active students · Lessons completed · Avg engagement · Most popular mission · Curriculum coverage
- **NEW: Teacher Comments card** (seeded):
  - *"This was the most engaged I've seen my class during our space unit."*
  - *"Students who normally don't participate were discussing orbital mechanics."*
  - *"This replaced an entire PowerPoint lesson."*
- Sample student feedback quotes
- CTA: **Approve Founding School Program**

## Mission Control `/mission-control` (auth-gated)
Leads with **Today's Mission → [Start Lesson] · [Continue Yesterday] · [Teacher Resources] · [Student View]**. Live tiles (ISS position, next launch, space weather, APOD) as supporting telemetry.

## Backend (Lovable Cloud enabled)
- Email/password + Google sign-in
- `profiles`, `user_roles` (enum: student / teacher / school / professional / admin), `has_role()` security-definer, RLS + GRANTs, signup trigger
- Reflections table for logged-in students (demo uses localStorage)

## Design system
- Deep black `oklch(0.12 0.02 260)` · midnight-blue glass panels · electric cyan `oklch(0.85 0.15 220)` · mission orange `oklch(0.75 0.18 55)`
- Space Grotesk (display) + Inter (body) via `<link>` in root head
- Animated starfield (canvas, GPU-friendly, prefers-reduced-motion respected)
- Every color a semantic token; zero hardcoded hex in components
- Cinematic stage transitions use CSS + prefers-reduced-motion fallback

## Live data (Mission Control only, not the demo path)
NASA APOD / NEO / DONKI (NASA_API_KEY with DEMO_KEY fallback), ISS position (Open Notify — no key), upcoming launches (Launch Library 2 — no key). All in `createServerFn`.

## Deferred (scaffolded routes only)
Explore, ASTRA chat, Missions 002-005, XP economy, teacher lesson builder, 3D Earth, VR/AR, Orbit port from your other project.

## After you approve
1. Enable Lovable Cloud + run migration
2. Build the entire stack above in one pass
3. You demo the Founding School Program to your principal
4. On approval, flip `FOUNDING_PARTNER_ENABLED = true`
