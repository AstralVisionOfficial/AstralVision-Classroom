/**
 * Client-side moon phase — no API needed.
 * Simple mean-synodic-month approximation, accurate to ~1 day.
 */
export type MoonPhase = {
  name: "New Moon" | "Waxing Crescent" | "First Quarter" | "Waxing Gibbous"
      | "Full Moon" | "Waning Gibbous" | "Last Quarter" | "Waning Crescent";
  illumination: number; // 0..1
  emoji: string;
  age: number; // days since new moon
};

const SYNODIC = 29.53058867;
// Reference new moon: 2000-01-06 18:14 UTC
const REF = Date.UTC(2000, 0, 6, 18, 14) / 1000;

export function getMoonPhase(date: Date = new Date()): MoonPhase {
  const t = date.getTime() / 1000;
  const age = ((t - REF) / 86400) % SYNODIC;
  const a = age < 0 ? age + SYNODIC : age;
  const illum = 0.5 * (1 - Math.cos((2 * Math.PI * a) / SYNODIC));

  let name: MoonPhase["name"]; let emoji: string;
  if      (a < 1.84566)  { name = "New Moon";         emoji = "🌑"; }
  else if (a < 5.53699)  { name = "Waxing Crescent";  emoji = "🌒"; }
  else if (a < 9.22831)  { name = "First Quarter";    emoji = "🌓"; }
  else if (a < 12.91963) { name = "Waxing Gibbous";   emoji = "🌔"; }
  else if (a < 16.61096) { name = "Full Moon";        emoji = "🌕"; }
  else if (a < 20.30228) { name = "Waning Gibbous";   emoji = "🌖"; }
  else if (a < 23.99361) { name = "Last Quarter";     emoji = "🌗"; }
  else                   { name = "Waning Crescent";  emoji = "🌘"; }

  return { name, illumination: illum, emoji, age: a };
}
