import { Topic } from "./system";

export interface Lexeme {
  _id: string;
  topic: Topic;
  name: string;
  names: string[];
  altNames: string[];
  intervalStructure: string[]; // TODO interval enum?
  enharmonicEquivalents?: string[][]; // TODO interval enum?
  uniqueIntervals: number[];
}

// Meta data is what we attach to certain exercises.
// They are not(!) the same for every exercises
export interface ExerciseGuessMeta {
  playedRoot?: number;
  playedAtDefaultSpeed?: number;
  playedAtSlowerSpeed?: number;
}

export interface ExerciseHistoryEntry {
  _id: string;
  challengeId: string;
  lexemeId: string;
  startTime: Date | string;
  endTime: Date | string;
  timeTaken: number;
  correct: boolean;
  score: number;
  guess: string[] | number[];
  choices: Lexeme[];
  correctIndices: string[] | number[];
  meta: ExerciseGuessMeta;
  settings: unknown;
}
