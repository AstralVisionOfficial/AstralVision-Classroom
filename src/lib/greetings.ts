/**
 * 30 hard-coded greetings. Picked randomly on mount.
 * Deliberately templated — no LLM call. Cheap, fast, feels alive.
 */
const GREETINGS = [
  "Good morning, Mission Control. Detecting new activity…",
  "Good morning. Deep Space Network connected.",
  "Good morning. All systems online.",
  "Welcome back, Mission Control. Telemetry synchronised.",
  "Good morning. Receiving downlink from orbit.",
  "Good morning. Ground stations reporting nominal.",
  "Good morning, Mission Control. Awaiting your command.",
  "Good day, Mission Control. Orbital tracking active.",
  "Good morning. Real-time space data online.",
  "Welcome, Mission Control. Today's mission is available.",
  "Good morning. Satellites in view.",
  "Good morning, Mission Control. Sensors calibrated.",
  "Good day. Uplink established.",
  "Good morning. Flight computers green across the board.",
  "Welcome back. Mission clock synchronised to UTC.",
  "Good morning, Mission Control. Standing by for briefing.",
  "Good morning. All stations report ready.",
  "Good day, Mission Control. The sky is open.",
  "Good morning. Tracking network active.",
  "Welcome, Mission Control. New orbital data received.",
  "Good morning. Sun-Earth relay online.",
  "Good day. Star trackers aligned.",
  "Good morning, Mission Control. Preparing today's mission.",
  "Good morning. Ground segment locked.",
  "Welcome back, Mission Control. Data streams active.",
  "Good day. Mission timeline loaded.",
  "Good morning. Flight dynamics online.",
  "Good morning, Mission Control. All lights green.",
  "Welcome. Console live.",
  "Good morning. Ready when you are.",
];

export function pickGreeting(seed?: number): string {
  const i = seed !== undefined
    ? seed % GREETINGS.length
    : Math.floor(Math.random() * GREETINGS.length);
  return GREETINGS[i];
}
