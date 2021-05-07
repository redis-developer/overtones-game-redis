import { Clef, Direction } from './system';

export interface ModeNotation {
  bpm: number;
  clef: Clef;
  rootNote: string;
  keySignature?: string | null;
  direction: Direction;
  voices: {
    notes: string[];
  }[];
}
