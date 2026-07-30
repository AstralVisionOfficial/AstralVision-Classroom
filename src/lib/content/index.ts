import type { Lesson, Topic, Strand, YearLevel } from "./types";
import { solarPowerInOrbit } from "./lessons/solar-power-in-orbit";

export const TOPICS: Topic[] = [
  {
    slug: "energy-transfer",
    title: "Energy Transfer",
    strand: "Physical",
    year: 8,
    summary: "How energy moves, changes form, and why some is always lost along the way.",
    curriculumCodes: ["AC9S8U05"],
    accent: "amber",
  },
  {
    slug: "cells-and-life",
    title: "Cells and Life",
    strand: "Biological",
    year: 8,
    summary: "Cells as the basic unit of life — structure, function, and what changes without gravity.",
    curriculumCodes: ["AC9S8U01"],
    accent: "green",
  },
  {
    slug: "matter-and-change",
    title: "Matter and Chemical Change",
    strand: "Chemical",
    year: 8,
    summary: "Elements, compounds and the difference between physical and chemical change.",
    curriculumCodes: ["AC9S8U03"],
    accent: "violet",
  },
  {
    slug: "earth-systems",
    title: "Earth Systems",
    strand: "Earth & Space",
    year: 8,
    summary: "The rock cycle and how Earth's surface is read from orbit.",
    curriculumCodes: ["AC9S8U04"],
    accent: "cyan",
  },
  {
    slug: "forces-and-motion",
    title: "Forces and Motion",
    strand: "Physical",
    year: 7,
    summary: "Balanced and unbalanced forces, and what keeps things in orbit.",
    curriculumCodes: ["AC9S7U04"],
    accent: "amber",
  },
  {
    slug: "classification",
    title: "Classifying Living Things",
    strand: "Biological",
    year: 7,
    summary: "Grouping organisms by observable features — and what we'd look for elsewhere.",
    curriculumCodes: ["AC9S7U01"],
    accent: "green",
  },
  {
    slug: "light-and-observation",
    title: "Light and Observation",
    strand: "Physical",
    year: 6,
    summary: "How light travels and how telescopes turn it into evidence.",
    curriculumCodes: ["AC9S6U03"],
    accent: "cyan",
  },
  {
    slug: "changing-earth",
    title: "Our Changing Earth",
    strand: "Earth & Space",
    year: 6,
    summary: "Day, night and seasons explained by the motion of the Earth.",
    curriculumCodes: ["AC9S6U02"],
    accent: "cyan",
  },
];

function stub(
  slug: string,
  title: string,
  topicSlug: string,
  concept: string,
  context: string,
  intentions: string[],
): Lesson {
  const topic = TOPICS.find((t) => t.slug === topicSlug)!;
  return {
    slug,
    title,
    concept,
    context,
    topicSlug,
    strand: topic.strand,
    year: topic.year,
    curriculumCodes: topic.curriculumCodes,
    minutes: 45,
    tier: "Core",
    status: "in-development",
    intentions,
    successCriteria: intentions.map((i) => `I can ${i[0].toLowerCase()}${i.slice(1)}`),
  };
}

export const LESSONS: Lesson[] = [
  solarPowerInOrbit,
  stub(
    "heat-on-the-move",
    "Heat on the Move",
    "energy-transfer",
    "Heat transfers by conduction, convection and radiation.",
    "In a vacuum only one of those three works — which is why spacecraft are wrapped in gold foil.",
    ["Distinguish conduction, convection and radiation", "Predict heat flow in a sealed system"],
  ),
  stub(
    "storing-energy",
    "Storing Energy",
    "energy-transfer",
    "Energy can be stored and released later; stores can be modelled and measured.",
    "Battery sizing decides how long a rover survives the lunar night.",
    ["Model an energy store filling and emptying", "Calculate energy from power and time"],
  ),
  stub(
    "the-cell-under-stress",
    "The Cell Under Stress",
    "cells-and-life",
    "Cell structures carry out specific functions that keep an organism alive.",
    "Astronaut cells change in microgravity — a natural experiment on what cells need.",
    ["Identify organelles and their functions", "Relate a change in conditions to a change in function"],
  ),
  stub(
    "reading-a-reaction",
    "Reading a Reaction",
    "matter-and-change",
    "Chemical change produces new substances; physical change does not.",
    "Rocket fuel is the fastest chemical change most students will ever see.",
    ["Classify changes as physical or chemical", "Use evidence to justify a classification"],
  ),
  stub(
    "reading-the-rocks",
    "Reading the Rocks",
    "earth-systems",
    "Rocks form, break down and reform in a cycle driven by energy.",
    "Satellite imagery lets us map that cycle across a whole continent.",
    ["Sequence the stages of the rock cycle", "Interpret surface imagery as geological evidence"],
  ),
  stub(
    "balanced-and-unbalanced",
    "Balanced and Unbalanced",
    "forces-and-motion",
    "Unbalanced forces change motion; balanced forces do not.",
    "An orbit is a fall that never lands.",
    ["Represent forces with arrows", "Predict motion from a force diagram"],
  ),
  stub(
    "sorting-life",
    "Sorting Life",
    "classification",
    "Living things are grouped using observable, shared features.",
    "Deciding whether a sample is alive is the hardest question in planetary science.",
    ["Build and use a dichotomous key", "Justify a grouping using features"],
  ),
  stub(
    "how-light-travels",
    "How Light Travels",
    "light-and-observation",
    "Light travels in straight lines and can be reflected and refracted.",
    "Every telescope image is light that has been bent on purpose.",
    ["Draw ray diagrams for reflection", "Explain how a lens forms an image"],
  ),
  stub(
    "day-night-seasons",
    "Day, Night and Seasons",
    "changing-earth",
    "Earth's rotation and tilted orbit cause day, night and seasons.",
    "Two satellite images taken six months apart show the tilt directly.",
    ["Model rotation and revolution", "Explain seasons using axial tilt"],
  ),
];

export const STRANDS: Strand[] = ["Biological", "Chemical", "Physical", "Earth & Space"];
export const YEARS: YearLevel[] = [6, 7, 8];

export const getTopic = (slug: string) => TOPICS.find((t) => t.slug === slug);
export const getLesson = (slug: string) => LESSONS.find((l) => l.slug === slug);
export const lessonsInTopic = (slug: string) => LESSONS.filter((l) => l.topicSlug === slug);
export const readyLessons = () => LESSONS.filter((l) => l.status === "ready");
