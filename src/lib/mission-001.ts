import type { CurriculumInfo } from "@/components/astral/CurriculumBadge";

export const MISSION_001_CURRICULUM: CurriculumInfo = {
  code: "ACSSU115",
  yearLevel: "Year 8 Science",
  strand: "Earth and Space Sciences",
  outcome: "Orbital motion, gravity and satellite conjunction analysis",
  duration: "45 min",
  group: "Individual or Teams",
  resources: "Included",
  assessment: "Included",
};

export const MISSION_001 = {
  code: "MISSION 001",
  title: "Save the ISS",
  narrationOpening:
    "Welcome, Mission Controllers. At 09:42 UTC, tracking stations detected orbital debris on a projected path toward the International Space Station. NASA has requested assistance in evaluating possible avoidance manoeuvres. Your team has 45 minutes to analyse the situation and recommend the safest course of action.",
  outcomes: ["Orbital Motion", "Gravity", "Velocity", "Engineering Design", "Critical Thinking"],
  didYouKnow:
    "The scenario you completed today is based on the same types of decisions real flight dynamics engineers make when protecting satellites from orbital debris.",
  reflectionPrompts: [
    "What worked?",
    "What would you change?",
    "Why did your burn succeed or fail?",
    "How does this relate to real satellites?",
  ],
  teacherGuide: {
    learningIntentions: [
      "Describe how orbital altitude affects orbital period (Kepler's third law).",
      "Explain why small velocity changes create large positional changes over time.",
      "Evaluate trade-offs when planning an avoidance manoeuvre.",
    ],
    successCriteria: [
      "I can predict how changing altitude changes orbital period.",
      "I can justify a chosen Δv (delta-v) burn given a conjunction scenario.",
      "I can communicate my recommendation to a Flight Director in ≤30 seconds.",
    ],
    materials: [
      "Astral Vision Mission 001 (interactive)",
      "Optional printed worksheet (link in Teacher Notes)",
      "Board or shared doc for team debrief",
    ],
    lessonFlow: [
      ["0–2 min", "Cold open cinematic — no interaction, students watch the alert unfold."],
      ["2–6 min", "Briefing: teacher pauses, poses the framing question, releases class to teams."],
      ["6–20 min", "Learn stages 1 & 2 — orbital motion + gravity/debris (interactive)."],
      ["20–33 min", "Analyse the manoeuvre — teams commit a Δv recommendation."],
      ["33–40 min", "Debrief — Mission Successful screen; teacher highlights outcomes."],
      ["40–45 min", "Reflection prompts + Did You Know closer."],
    ],
    discussionQuestions: [
      "What surprised you about how orbits behave?",
      "Why is doing nothing sometimes the safer option in real conjunctions?",
      "Which of today's skills matter in careers beyond space?",
    ],
    misconceptions: [
      "Students often think satellites 'float' — they are actually in free-fall around Earth.",
      "Speeding up does NOT put you into a higher stable orbit immediately; it takes half an orbit.",
      "'Space' is not empty — it is filled with tracked debris moving at ~7.7 km/s.",
    ],
    commonMistakes: [
      "Choosing the largest Δv assuming bigger = safer.",
      "Ignoring the direction of the burn.",
      "Not accounting for time-to-conjunction.",
    ],
    discussionIdeas: [
      "Show real NASA conjunction data (public); compare to student answers.",
      "Ask: if this were a crewed vehicle, what changes?",
    ],
    assessmentRubric: [
      ["4 — Exceeding", "Clear rationale linking Δv, direction, and time-to-conjunction; communicates trade-offs."],
      ["3 — Meeting", "Correct Δv range with reasoning; identifies at least one trade-off."],
      ["2 — Approaching", "Chooses a plausible manoeuvre but with limited reasoning."],
      ["1 — Emerging", "Attempts a choice; reasoning missing or off-topic."],
    ],
    extension:
      "Research a real conjunction event (e.g. ISS debris-avoidance manoeuvres in 2021 or 2022) and compare the real decision to the class's recommendation.",
  },
};

/** Kepler's third law for a circular orbit around Earth. Returns period in minutes. */
export function orbitalPeriodMinutes(altitudeKm: number): number {
  const G = 6.6743e-11;
  const M = 5.972e24;
  const R = 6371e3;
  const a = R + altitudeKm * 1000;
  const T = 2 * Math.PI * Math.sqrt((a * a * a) / (G * M));
  return T / 60;
}

/** Circular orbital velocity in km/s. */
export function orbitalVelocityKms(altitudeKm: number): number {
  const G = 6.6743e-11;
  const M = 5.972e24;
  const R = 6371e3;
  const a = R + altitudeKm * 1000;
  return Math.sqrt((G * M) / a) / 1000;
}

/**
 * Toy miss-distance model for the mini-sim. Not physically rigorous — pedagogically
 * shaped so that:
 *  - a small prograde burn a few minutes before conjunction shifts the ISS along track,
 *  - a burn too small barely moves you,
 *  - a burn too large is wasteful/dangerous (fuel + attitude cost).
 * Returns miss distance in km. Positive = safe margin, negative = still collides.
 */
export function estimateMissKm(deltaVms: number, direction: "prograde" | "retrograde" | "radial", minutesBefore: number) {
  const dv = deltaVms;
  const dt = Math.max(minutesBefore, 1) * 60;
  const dirFactor = direction === "radial" ? 0.35 : 1;
  const shift = (dv * dt * dirFactor) / 1000; // km along track
  // Debris passes 0.4 km from nominal path
  const nominal = 0.4;
  return shift - nominal;
}
