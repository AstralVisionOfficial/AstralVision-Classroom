import type { Lesson } from "../types";

/**
 * Fully authored lesson — the reference implementation for the four-beat shape.
 * Concept: energy transfer and transformation (AC9S8U05).
 * Context: how a spacecraft keeps its batteries charged.
 */
export const solarPowerInOrbit: Lesson = {
  slug: "solar-power-in-orbit",
  title: "Solar Power in Orbit",
  concept: "Energy is transformed from light to electrical to stored chemical energy, and some is always lost as heat.",
  context: "A satellite has no power point. Everything it does runs on sunlight it collected earlier.",
  topicSlug: "energy-transfer",
  strand: "Physical",
  year: 8,
  curriculumCodes: ["AC9S8U05"],
  minutes: 45,
  tier: "Core",
  status: "ready",
  intentions: [
    "Describe energy transformations in a system using a flow model",
    "Explain why no transformation is 100% efficient",
    "Use evidence from a model to justify a design decision",
  ],
  successCriteria: [
    "I can trace energy from source to store, naming each form",
    "I can explain where energy is lost and in what form",
    "I can predict the effect of changing one variable and test it",
  ],
  misconceptions: [
    {
      belief: "Energy is 'used up' when a device runs.",
      correction: "Energy is transferred and transformed, never destroyed. Some becomes heat that spreads out and can't be used.",
    },
    {
      belief: "Solar panels work best when it is hot.",
      correction: "Panels respond to light intensity, not temperature. Hot panels are actually slightly less efficient.",
    },
    {
      belief: "A panel facing 'up' is always best.",
      correction: "What matters is the angle between the panel and the incoming light — face-on collects the most.",
    },
  ],
  vocabulary: [
    { term: "Transfer", meaning: "Energy moving from one place to another." },
    { term: "Transformation", meaning: "Energy changing from one form to another." },
    { term: "Efficiency", meaning: "The fraction of input energy that ends up doing the useful job." },
    { term: "Dissipation", meaning: "Energy spreading out, usually as heat, and becoming unusable." },
  ],
  activities: [
    {
      kind: "explore",
      title: "The satellite that went dark",
      minutes: 5,
      phenomenon:
        "A working satellite passes into Earth's shadow. Its power output drops to zero — but the radio keeps transmitting for another 34 minutes.",
      visual: "earth-day-night",
      noticePrompt: "Where is the energy coming from while the satellite is in darkness?",
      reveal:
        "During sunlight the panels do two jobs at once: run the spacecraft and charge the batteries. In shadow the stored chemical energy takes over. Nothing is created — it was banked earlier.",
    },
    {
      kind: "investigate",
      title: "Angle, light and power",
      minutes: 18,
      sim: "solar-angle",
      task:
        "Change the panel angle and the light intensity. Find the angle that produces the most power, then explain why the graph has that shape.",
      successWhen:
        "You can state the best angle, and explain the power output using the amount of light hitting the panel surface.",
    },
    {
      kind: "challenge",
      title: "Power budget for a CubeSat",
      minutes: 12,
      scenario:
        "Your CubeSat collects 30 J of light energy each second. The panels convert 20% of it to electricity. The radio needs 4 W to transmit.",
      questions: [
        {
          id: "c1",
          type: "numeric",
          prompt: "How much electrical power do the panels actually produce? (watts)",
          answer: 6,
          tolerance: 0.1,
          unit: "W",
          feedback: "20% of 30 W is 6 W. The other 24 W is reflected or dissipated as heat.",
        },
        {
          id: "c2",
          type: "choice",
          prompt: "Where does the other 24 W go?",
          options: [
            "It is destroyed by the panel",
            "It is reflected or transformed into heat",
            "It is stored for later use",
            "It is converted into light again",
          ],
          answerIndex: 1,
          feedback: "Energy is never destroyed. Unconverted light is reflected or heats the panel and radiates away.",
          misconception: "Students who choose 'destroyed' are treating energy as something consumable.",
        },
        {
          id: "c3",
          type: "numeric",
          prompt: "If the radio transmits for 60 s, how much energy does it use? (joules)",
          answer: 240,
          tolerance: 1,
          unit: "J",
          feedback: "4 W × 60 s = 240 J. Power is energy per second, so energy = power × time.",
        },
        {
          id: "c4",
          type: "choice",
          prompt: "The satellite spends 35 minutes of every 90-minute orbit in shadow. What must the panels do in sunlight?",
          options: [
            "Produce exactly enough power for the spacecraft",
            "Produce enough for the spacecraft plus enough to recharge the batteries",
            "Shut down to protect the batteries",
            "Produce less power to avoid overheating",
          ],
          answerIndex: 1,
          feedback: "Sunlight time has to cover both live demand and the shadow period. That's why arrays are oversized.",
        },
      ],
    },
    {
      kind: "check",
      title: "Show what you understand",
      minutes: 6,
      questions: [
        {
          id: "k1",
          type: "choice",
          prompt: "Which sequence correctly describes the satellite's energy transformations?",
          options: [
            "Chemical → light → electrical",
            "Light → electrical → chemical (stored)",
            "Electrical → light → heat",
            "Heat → electrical → light",
          ],
          answerIndex: 1,
          feedback: "Sunlight is captured, converted to electricity, then stored chemically in batteries.",
        },
        {
          id: "k2",
          type: "choice",
          prompt: "A panel is turned 60° away from the Sun. What happens to the power output?",
          options: ["It stays the same", "It increases", "It decreases", "It reverses"],
          answerIndex: 2,
          feedback: "Less light lands on the same panel area, so less energy is available to transform.",
        },
        {
          id: "k3",
          type: "choice",
          prompt: "Efficiency of a solar panel is best described as…",
          options: [
            "How much light hits it",
            "The fraction of light energy it turns into electricity",
            "How long its batteries last",
            "How hot it gets",
          ],
          answerIndex: 1,
          feedback: "Efficiency is useful output ÷ total input.",
        },
        {
          id: "k4",
          type: "written",
          prompt: "Explain why the satellite can keep working in Earth's shadow, using the word 'stored'.",
          sentenceStarter: "In sunlight, the panels…",
          lookFor: ["stored", "battery", "chemical", "transform"],
        },
      ],
    },
  ],
};
