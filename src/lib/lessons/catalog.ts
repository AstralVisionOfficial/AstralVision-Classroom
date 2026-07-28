/**
 * Lesson Library catalog.
 *
 * Every lesson is space-framed but maps to a mainstream Australian Curriculum
 * v9 strand — space is the hook, not the whole curriculum.
 *
 * Only Mission 001 is fully playable in this phase. The rest render a
 * polished "Coming online" state with framing + objectives visible so
 * teachers can plan ahead.
 */

export type Strand = "Biological" | "Chemical" | "Physical" | "Earth & Space";
export type Tier = "Foundation" | "Standard" | "Advanced";

export type Lesson = {
  slug: string;
  code: string;
  title: string;
  strand: Strand;
  year: number;                 // primary year level
  curriculumCodes: string[];    // AC v9 content descriptors
  framing: string;              // space hook, 1 sentence
  subtitle: string;             // for cards
  objectives: string[];
  durationMinutes: number;
  tier: Tier;
  status: "live" | "coming-soon";
  route?: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "mission-001-save-the-iss",
    code: "MISSION 001",
    title: "Save the ISS",
    strand: "Physical",
    year: 8,
    curriculumCodes: ["AC9S8U04", "AC9S8U05"],
    framing: "A debris fragment is on a conjunction path with the ISS — plan the avoidance burn.",
    subtitle: "Model orbits, gravity and Δv to keep the crew safe.",
    objectives: [
      "Predict how orbital altitude changes period",
      "Choose a prograde, retrograde or radial burn",
      "Justify the recommended manoeuvre with data",
    ],
    durationMinutes: 60,
    tier: "Standard",
    status: "live",
    route: "/demo/lesson/mission-001-save-the-iss",
  },
  {
    slug: "life-aboard-the-iss",
    code: "MISSION 002",
    title: "Life Aboard the ISS",
    strand: "Biological",
    year: 8,
    curriculumCodes: ["AC9S8U01"],
    framing: "Cells behave differently in microgravity — what changes for the crew?",
    subtitle: "Cell structure and function, tested at 400 km altitude.",
    objectives: [
      "Compare animal and plant cell function on Earth vs in orbit",
      "Explain how bone and muscle cells respond to microgravity",
      "Design one countermeasure astronauts could use",
    ],
    durationMinutes: 45,
    tier: "Standard",
    status: "coming-soon",
  },
  {
    slug: "rocket-propellant-chemistry",
    code: "MISSION 003",
    title: "Rocket Propellant Chemistry",
    strand: "Chemical",
    year: 8,
    curriculumCodes: ["AC9S8U02", "AC9S8U03"],
    framing: "Fuel + oxidiser + spark → thrust. Balance the reaction that lifts a Falcon 9.",
    subtitle: "Chemical reactions, conservation of mass, and energy release.",
    objectives: [
      "Balance a combustion equation for a real propellant",
      "Explain why an oxidiser is needed in space",
      "Compare energy released per kilogram of fuel",
    ],
    durationMinutes: 60,
    tier: "Standard",
    status: "coming-soon",
  },
  {
    slug: "mars-geology",
    code: "MISSION 004",
    title: "Mars Geology",
    strand: "Earth & Space",
    year: 8,
    curriculumCodes: ["AC9S8U06"],
    framing: "Perseverance sampled rocks in Jezero crater — what do they tell us about Mars' past?",
    subtitle: "The rock cycle, sedimentary evidence, and reading planetary history.",
    objectives: [
      "Identify sedimentary vs igneous features in Mars imagery",
      "Explain what layered rock suggests about water",
      "Sequence events that shaped Jezero crater",
    ],
    durationMinutes: 45,
    tier: "Foundation",
    status: "coming-soon",
  },
  {
    slug: "gravity-and-orbits",
    code: "MISSION 005",
    title: "Gravity and Orbits",
    strand: "Physical",
    year: 7,
    curriculumCodes: ["AC9S7U04"],
    framing: "Why doesn't the Moon fall down? Model gravity as a continuous fall around Earth.",
    subtitle: "Forces, mass and the geometry of falling.",
    objectives: [
      "Describe gravity as a force acting at a distance",
      "Predict orbit changes when altitude or speed changes",
      "Explain why astronauts appear weightless",
    ],
    durationMinutes: 45,
    tier: "Foundation",
    status: "coming-soon",
  },
  {
    slug: "solar-storms-earth",
    code: "MISSION 006",
    title: "Solar Storms & Earth",
    strand: "Earth & Space",
    year: 9,
    curriculumCodes: ["AC9S9U05"],
    framing: "A CME is inbound — will Australia's power grid hold?",
    subtitle: "The Sun–Earth system, magnetic fields, and space weather.",
    objectives: [
      "Trace a CME from Sun to Earth using live DONKI data",
      "Explain the role of Earth's magnetic field",
      "Recommend one mitigation for satellite operators",
    ],
    durationMinutes: 60,
    tier: "Advanced",
    status: "coming-soon",
  },
  {
    slug: "ecosystems-in-a-can",
    code: "MISSION 007",
    title: "Ecosystems in a Can",
    strand: "Biological",
    year: 7,
    curriculumCodes: ["AC9S7U01"],
    framing: "Design a closed life-support loop for a six-person Mars habitat.",
    subtitle: "Ecosystems, energy flow, and matter cycling — with no way out.",
    objectives: [
      "Identify inputs and outputs of a closed ecosystem",
      "Balance oxygen, water and food for 6 crew",
      "Justify one bio-regenerative design choice",
    ],
    durationMinutes: 60,
    tier: "Standard",
    status: "coming-soon",
  },
  {
    slug: "rover-power-budget",
    code: "MISSION 008",
    title: "Rover Power Budget",
    strand: "Physical",
    year: 9,
    curriculumCodes: ["AC9S9U04"],
    framing: "A rover is stranded 4 km from base with a dust-covered solar panel.",
    subtitle: "Energy transfer, efficiency, and engineering trade-offs.",
    objectives: [
      "Calculate the energy needed to reach base",
      "Compare solar vs battery power under dust load",
      "Choose the safest route given power constraints",
    ],
    durationMinutes: 45,
    tier: "Standard",
    status: "coming-soon",
  },
];

export const STRANDS: Strand[] = ["Biological", "Chemical", "Physical", "Earth & Space"];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}
