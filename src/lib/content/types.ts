/**
 * Astral Vision Classroom — content model.
 *
 * Topic → Lesson → Activity. One canonical record per lesson; every other
 * surface (planner, assignments, coverage, progress) references it by slug.
 */

export type Strand = "Biological" | "Chemical" | "Physical" | "Earth & Space";
export type YearLevel = 6 | 7 | 8;
export type Tier = "Support" | "Core" | "Extension";

export type ActivityKind = "explore" | "investigate" | "challenge" | "check";

export type Question =
  | {
      id: string;
      type: "choice";
      prompt: string;
      options: string[];
      answerIndex: number;
      feedback: string;
      misconception?: string;
    }
  | {
      id: string;
      type: "numeric";
      prompt: string;
      answer: number;
      tolerance: number;
      unit?: string;
      feedback: string;
    }
  | {
      id: string;
      type: "written";
      prompt: string;
      sentenceStarter?: string;
      lookFor: string[];
    };

export type Activity =
  | {
      kind: "explore";
      title: string;
      minutes: number;
      /** One phenomenon, one question. No walls of text. */
      phenomenon: string;
      visual: VisualKey;
      noticePrompt: string;
      reveal: string;
    }
  | {
      kind: "investigate";
      title: string;
      minutes: number;
      /** Registry key for the interactive component. */
      sim: SimKey;
      task: string;
      successWhen: string;
    }
  | {
      kind: "challenge";
      title: string;
      minutes: number;
      scenario: string;
      questions: Question[];
    }
  | {
      kind: "check";
      title: string;
      minutes: number;
      questions: Question[];
    };

export type VisualKey = "solar-array" | "earth-day-night" | "energy-flow";
export type SimKey = "solar-angle" | "energy-budget";

export type Lesson = {
  slug: string;
  title: string;
  /** The curriculum concept, stated plainly. Leads the card. */
  concept: string;
  /** The space context that makes it interesting. Supports the concept. */
  context: string;
  topicSlug: string;
  strand: Strand;
  year: YearLevel;
  curriculumCodes: string[];
  minutes: number;
  tier: Tier;
  status: "ready" | "in-development";
  intentions: string[];
  successCriteria: string[];
  misconceptions?: { belief: string; correction: string }[];
  vocabulary?: { term: string; meaning: string }[];
  activities?: Activity[];
};

export type Topic = {
  slug: string;
  title: string;
  strand: Strand;
  year: YearLevel;
  summary: string;
  curriculumCodes: string[];
  accent: "cyan" | "amber" | "violet" | "green";
};
