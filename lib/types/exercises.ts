import { Direction, ChallengeType, Focus } from "./system";
import { Lexeme } from "./interfaces";
import { ModeNotation } from "./notation";

export enum NotationVariant {
  Notes = "notes",
  Intervals = "intervals",
}

export enum NotationMode {
  Complete = "complete",
  GapsOnly = "gaps",
}

export interface ExerciseReturnBase {
  _id: string;
  challengeId: string;
  lexemeId: string;
  focus: Focus;
  type: ChallengeType;
  prompt: string;
  correctIndices: number[] | string[];
  settings: object;
}

export interface ListenAndSelectExercise extends ExerciseReturnBase {
  choices: string[];
  correctIndices: number[];
  notation: ModeNotation;
  settings: {
    shuffledChoices: Lexeme[];
    tempo: number;
    noteLength: string;
    direction: Direction;
    rootNote: string;
    motive?: string[];
  };
}

export interface TranscribeExercise extends ExerciseReturnBase {
  structure: string[];
  correctIndices: string[];
  notation: ModeNotation;
  settings: {
    variant: NotationVariant;
    mode: NotationMode;
    allowEnharmonicEquivalents: boolean;
    tempo: number;
    noteLength: string;
    rootNote: string;
    direction: Direction;
    motive?: string[];
  };
}

export type Exercise = ListenAndSelectExercise | TranscribeExercise;
