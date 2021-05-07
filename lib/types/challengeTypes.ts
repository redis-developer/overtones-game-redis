import { Topic, Focus, Direction, ChallengeType, RootNotes } from "./system";
import { NotationVariant, NotationMode } from "./exercises";

export interface TempoRange {
  min: number;
  max: number;
}

/**
 * standalone:
 *  true => challenge can be used in review mode etc
 *  false => challenge is used in a specific lesson
 */
export interface ChallengeBase {
  _id: string;
  level: number;
  type: ChallengeType;
  topic: Topic;
}

/**
 * Require the student to identify a lexeme by ear
 *
 * [ Click to play ]
 *
 * options:
 *   [Major, Natural Minor]
 */
export interface ListenAndSelect extends ChallengeBase {
  type: ChallengeType.ListenAndSelect;
  directions: Direction[];
  tempoRange: TempoRange;
}

/**
 * Require the student to transcribe the lexeme they just heard.
 *
 * - The modes option will only ask the user to transcribe specific elements
 */
export interface Transcribe extends ChallengeBase {
  type: ChallengeType.Transcribe;
  variant: NotationVariant;
  modes: NotationMode[];
  rootNotes: RootNotes[];
  directions: Direction[];
  tempoRange: TempoRange;
  allowEnharmonicEquivalents: boolean;
}

export type Challenge = ListenAndSelect | Transcribe;
