/**
 * Every mission is described by one metadata object.
 * Mission Hero + Vault cards + lesson chrome all read from here.
 */
export type Difficulty = "Foundation" | "Intermediate" | "Advanced";

export type MissionMeta = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  focus: string;              // e.g. "Gravity & Motion"
  duration: string;           // e.g. "60 min"
  durationMinutes: number;
  difficulty: Difficulty;
  curriculum: string;         // e.g. "AC v9 · Year 8 Science"
  objectives: string[];
  heroImage?: string;         // optional (unused Phase 1)
  status: "live" | "coming-soon";
  route?: string;             // where Begin Mission goes
};

/** Today's headline mission. */
export const TODAYS_MISSION: MissionMeta = {
  id: "mission-001",
  code: "MISSION 001",
  title: "Can Earth protect us from an asteroid?",
  subtitle: "Analyse a debris conjunction with the ISS and plan an avoidance manoeuvre.",
  focus: "Gravity & Motion",
  duration: "60 min",
  durationMinutes: 60,
  difficulty: "Intermediate",
  curriculum: "Australian Curriculum v9 · Year 8 Science",
  objectives: [
    "How do scientists know it won't hit Earth?",
    "Why does gravity shape its orbit?",
    "How fast is it travelling?",
  ],
  status: "live",
  route: "/demo/lesson/mission-001-save-the-iss",
};

/** Mission Vault — rapid, ready-to-run activities. */
export const MISSION_VAULT: MissionMeta[] = [
  {
    id: "defend-earth",
    code: "VAULT · 001",
    title: "Defend Earth",
    subtitle: "Model a near-Earth asteroid and choose the safest deflection.",
    focus: "Forces · Momentum",
    duration: "15 min",
    durationMinutes: 15,
    difficulty: "Foundation",
    curriculum: "AC v9 · Year 8 Science",
    objectives: [],
    status: "live",
    route: "/demo/lesson/mission-001-save-the-iss",
  },
  {
    id: "dock-iss",
    code: "VAULT · 002",
    title: "Dock with the ISS",
    subtitle: "Line up an approach corridor and execute a docking burn.",
    focus: "Motion · Orbital Mechanics",
    duration: "30 min",
    durationMinutes: 30,
    difficulty: "Intermediate",
    curriculum: "AC v9 · Year 8 Science",
    objectives: [],
    status: "coming-soon",
  },
  {
    id: "mars-habitat",
    code: "VAULT · 003",
    title: "Build a Mars Habitat",
    subtitle: "Design a life-support loop for six astronauts.",
    focus: "Ecosystems · Chemistry",
    duration: "45 min",
    durationMinutes: 45,
    difficulty: "Advanced",
    curriculum: "AC v9 · Year 8 Science",
    objectives: [],
    status: "coming-soon",
  },
  {
    id: "rescue-rover",
    code: "VAULT · 004",
    title: "Rescue a Stranded Rover",
    subtitle: "Plan a route across the Martian surface with limited power.",
    focus: "Energy · Engineering",
    duration: "15 min",
    durationMinutes: 15,
    difficulty: "Foundation",
    curriculum: "AC v9 · Year 8 Science",
    objectives: [],
    status: "coming-soon",
  },
];
