import { ModeNotation, Direction, Clef } from "lib/types";
import { Note, Interval } from "lib/theory";
import { KEY_SIGNATURES } from "./key-signature";
import { alignModeNotesToMotive } from "./notation";
import { shuffle } from "./array";

export type NoteLength = "w" | "h" | "q" | "8" | "16";

interface Params {
  intervalStructure: string[];

  clef?: Clef;
  rootNote?: string;
  useKeySignature?: string;
  direction?: Direction;
  useMotive?: string[];

  bpm?: number;
  noteLength?: string; // NoteLength;
}

export const isModeMajor = (mode: string) => {
  const major = ["Major", "Ionian", "Lydian", "Mixolydian"];
  return major.indexOf(mode) > -1;
};

export const DEFAULTS = {
  BPM: 100,
  CLEF: "treble" as Clef,
  ROOT: "C/4",
  DIRECTION: Direction.Ascending,
  NOTE_LENGTH: "w" as NoteLength,
};

const generateModeNotation = (params: Params): ModeNotation | null => {
  const {
    bpm = DEFAULTS.BPM,
    clef = DEFAULTS.CLEF,
    rootNote: rootNoteStr = DEFAULTS.ROOT,
    direction = DEFAULTS.DIRECTION,
    noteLength = DEFAULTS.NOTE_LENGTH,
    useKeySignature,
    useMotive,
  } = params;

  const rootNote = new Note(rootNoteStr);
  const intervalStructure = params.intervalStructure;

  if (direction === Direction.Descending) {
    rootNote.octave = rootNote.octave - 1;
  }

  let notes = intervalStructure.map(
    (i) => rootNote.addInterval(Interval.fromString(i)).technicalName
  );

  if (direction === Direction.Descending) {
    notes = notes.reverse();
  }

  if (direction === Direction.Motive && useMotive) {
    notes = alignModeNotesToMotive(notes, intervalStructure, useMotive);
  }

  if (direction === Direction.Random) {
    notes = shuffle(notes);
  }

  let keySignature: any;

  if (useKeySignature) {
    keySignature = useKeySignature;

    const specialNotes: string[] = KEY_SIGNATURES[keySignature] || [];

    const previouslyNormalisedNotes: string[] = [];
    notes = notes.map((n) => {
      const [noteName, octave] = n.split("/");
      const letter = noteName.substring(0, 1);

      const hasAccidental = noteName.length > 1;

      if (hasAccidental && specialNotes.includes(noteName)) {
        if (previouslyNormalisedNotes.includes(letter)) {
          // re-add the accidental cos we have been naturalised
          return `${noteName}/${octave}`;
        }

        return `${letter}/${octave}`;
      }

      // do we need to naturalise any notes?
      const isInList = specialNotes.find((sn) => sn.includes(letter));
      if (!hasAccidental && isInList) {
        previouslyNormalisedNotes.push(letter);
        return `${letter}n/${octave}`;
      }

      return n;
    });
  }

  // add note duration to note
  notes = notes.map((n) => `${noteLength}:${n}`);

  return {
    bpm,
    clef,
    keySignature,
    rootNote: rootNoteStr,
    direction,
    voices: [
      {
        notes,
      },
    ],
  };
};

export default generateModeNotation;
