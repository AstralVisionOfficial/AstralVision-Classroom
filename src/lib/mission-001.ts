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

/* ---------------- Grade tiers ---------------- */

export type MissionTier = "foundation" | "standard" | "advanced";

export const TIER_META: Record<MissionTier, { label: string; years: string; blurb: string }> = {
  foundation: {
    label: "Foundation",
    years: "Years 5–6",
    blurb: "Plain-language mission with picture-clear analogies and multiple-choice check-ins.",
  },
  standard: {
    label: "Standard",
    years: "Years 7–9",
    blurb: "Curriculum-aligned Year 8 Science: introduces Δv, prograde, and conjunction with worked numeric questions.",
  },
  advanced: {
    label: "Advanced",
    years: "Years 10–12",
    blurb: "Assumes fluency: adds specific impulse, orbit-shape nuance, and tighter numeric tolerances.",
  },
};

const STORAGE_KEY = "astral:grade-tier";

export function getTier(): MissionTier {
  if (typeof window === "undefined") return "standard";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "foundation" || v === "advanced" ? v : "standard";
}

export function setTier(t: MissionTier) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(STORAGE_KEY, t); } catch { /* ignore */ }
}

export type PracticeQuestion =
  | { kind: "numeric"; prompt: string; answer: number; unit: string; tolerance: number }
  | { kind: "mc"; prompt: string; options: string[]; correctIndex: number };

export const TIER_COPY: Record<MissionTier, {
  briefing: string;
  learnOrbitLead: string;
  learnOrbitHint: string;
  learnDebrisLead: string;
  learnDebrisKey: string;
  analyseIntro: string;
  practiceHeading: string;
  practiceLead: string;
  /** Static practice questions for this tier. Question 1 in Standard/Advanced is dynamic and injected in-component. */
  questions: (ctx: { deltaV: number; minutesBefore: number; direction: "prograde" | "retrograde" | "radial" }) => PracticeQuestion[];
}> = {
  foundation: {
    briefing:
      "A piece of space junk is heading toward the space station. The station can nudge itself out of the way, but every nudge costs fuel and takes time. Your job: decide whether to nudge, and if so, how big and which way.",
    learnOrbitLead:
      "An orbit is a fall around the Earth that never lands. The higher you go, the slower you need to travel — and the longer each lap takes.",
    learnOrbitHint: "Move the slider. Watch how the lap time and speed change.",
    learnDebrisLead:
      "Space is full of tiny bits of old rockets and satellites — we call it space junk. Even a marble-sized piece is dangerous because it is moving super fast (about 8 kilometres every second).",
    learnDebrisKey: "A tiny push now = a big shift later.",
    analyseIntro:
      "Pick how big the push is (Δv), which way to push, and how long before the debris arrives. Try to get the miss distance above the safe line.",
    practiceHeading: "Quick check",
    practiceLead: "Pick the best answer for each. No calculator needed.",
    questions: () => [
      {
        kind: "mc",
        prompt: "The station wants to move AHEAD of where the space junk will be. Which way should it push?",
        options: ["Prograde (forwards)", "Retrograde (backwards)", "Radial (up/down)"],
        correctIndex: 0,
      },
      {
        kind: "mc",
        prompt: "Which push moves the station further along its path?",
        options: ["A tiny push 2 minutes before", "A tiny push 20 minutes before", "It doesn't matter"],
        correctIndex: 1,
      },
      {
        kind: "mc",
        prompt: "Why is even a small piece of space junk dangerous?",
        options: ["It is heavy", "It is moving very fast", "It is glowing hot"],
        correctIndex: 1,
      },
    ],
  },
  standard: {
    briefing:
      "The station cannot move quickly. Any manoeuvre costs fuel, disrupts experiments, and requires precise timing. Your job is to decide whether to burn, and if so, how much Δv and in which direction.",
    learnOrbitLead:
      "An orbit is free-fall around the Earth. The higher you go, the slower you need to travel to stay in a stable circular orbit — but the longer each lap takes. This is Kepler's third law.",
    learnOrbitHint: "Drag the slider to change altitude. Watch how the period and velocity change.",
    learnDebrisLead:
      "Space is not empty. There are over 36,500 tracked objects larger than 10 cm orbiting Earth — plus an estimated 1 million between 1 and 10 cm. Each moves at roughly 7–8 km/s.",
    learnDebrisKey: "Small velocity changes → large positional changes.",
    analyseIntro:
      "Choose Δv, burn direction, and time before conjunction. Reach a safe miss distance (>2 km) before committing.",
    practiceHeading: "Check your maths",
    practiceLead: "Work these out on paper first, then type your answer. Round to 2 decimal places.",
    questions: ({ deltaV, minutesBefore, direction }) => {
      const k = direction === "radial" ? 0.35 : 1;
      return [
        {
          kind: "numeric",
          prompt: `Using your current settings (Δv = ${deltaV.toFixed(2)} m/s, t = ${minutesBefore} min, direction = ${direction}), what is the along-track shift Δs in kilometres? Formula: Δs = Δv × t × k ÷ 1000.`,
          answer: (deltaV * minutesBefore * 60 * k) / 1000,
          unit: "km",
          tolerance: 0.05,
        },
        {
          kind: "numeric",
          prompt: "A prograde burn of Δv = 0.8 m/s is applied 15 minutes before conjunction. What along-track shift does this produce (in km)?",
          answer: (0.8 * 15 * 60 * 1) / 1000,
          unit: "km",
          tolerance: 0.05,
        },
        {
          kind: "numeric",
          prompt: "Using T = 2π√(a³/GM) with G = 6.674×10⁻¹¹, M = 5.972×10²⁴ kg, and Earth's radius 6,371 km, what is the orbital period (in minutes) at an altitude of 500 km?",
          answer: orbitalPeriodMinutes(500),
          unit: "min",
          tolerance: 0.5,
        },
      ];
    },
  },
  advanced: {
    briefing:
      "Real conjunction analysis balances Δv budget, specific impulse, attitude cost, and time-to-closest-approach. Justify your recommendation against the 2 km hard threshold used by real flight dynamics teams.",
    learnOrbitLead:
      "A circular orbit is a state of continuous free-fall where centripetal acceleration equals local gravity. Kepler's third law (T² ∝ a³) means altitude changes propagate non-linearly into period.",
    learnOrbitHint: "Adjust altitude and observe how T and v respond. Note that Δv efficiency (specific energy per m/s) drops with altitude.",
    learnDebrisLead:
      "The tracked catalogue exceeds 36,500 objects >10 cm, with an estimated ~1 million between 1–10 cm. Closing speeds at conjunction routinely reach 14–15 km/s, giving even sub-cm fragments hypervelocity impact energy.",
    learnDebrisKey: "Δv applied early has an out-sized along-track effect: Δs = Δv · t (to first order).",
    analyseIntro:
      "Recommend a Δv, burn direction, and lead time that clears the 2 km threshold with margin. Radial burns cost you ~65% of along-track efficiency — justify the trade-off if you choose one.",
    practiceHeading: "Analytical check",
    practiceLead: "Numeric answers only. Tolerances are tight — carry at least 3 significant figures through your working.",
    questions: ({ deltaV, minutesBefore, direction }) => {
      const k = direction === "radial" ? 0.35 : 1;
      const q1 = (deltaV * minutesBefore * 60 * k) / 1000;
      return [
        {
          kind: "numeric",
          prompt: `Current settings: Δv = ${deltaV.toFixed(2)} m/s, t = ${minutesBefore} min, direction = ${direction}. Compute the along-track shift Δs (km).`,
          answer: q1,
          unit: "km",
          tolerance: 0.02,
        },
        {
          kind: "numeric",
          prompt: `Debris passes 0.4 km from the nominal ISS track. Given your current Δs, what is the resulting miss distance (km)? (miss = Δs − 0.4)`,
          answer: q1 - 0.4,
          unit: "km",
          tolerance: 0.02,
        },
        {
          kind: "numeric",
          prompt: "Compute the orbital period T (minutes) at altitude 500 km using T = 2π√(a³/GM), G = 6.674×10⁻¹¹, M = 5.972×10²⁴ kg, R⊕ = 6,371 km.",
          answer: orbitalPeriodMinutes(500),
          unit: "min",
          tolerance: 0.1,
        },
        {
          kind: "numeric",
          prompt: "At altitude 500 km, what is the circular orbital velocity v (km/s)? Use v = √(GM/a).",
          answer: orbitalVelocityKms(500),
          unit: "km/s",
          tolerance: 0.02,
        },
      ];
    },
  },
};

