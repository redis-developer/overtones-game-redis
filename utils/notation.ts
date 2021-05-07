import { Note } from "lib/theory";
import { Clef, Direction } from "lib/types";
import { shuffle, chooseRandomIndex } from "./array";

export const replaceIntervalWithDegree = (notes: string[]) => {
  const regex = /([P|M|m|A|d])([0-9])/;
  return notes.map((n) => {
    if (n === "M7") {
      return "j7";
    }

    if (n === "m7") {
      return "7";
    }
    return n.replace(regex, (_, b, c) => {
      switch (b) {
        case "P":
        case "M":
          return "" + c;
        case "m":
        case "d":
          return "b" + c;
        case "A":
          return "#" + c;
        default:
          return "" + c;
      }
    });
  });
};

export const midiToFrequency = (midiValues: number[]) => {
  return midiValues.map((m) => {
    const freq = Math.pow(2, (m - 69) / 12) * 440;
    return Number(freq.toFixed(3));
  });
};

const MAJOR_KEYSIGNATURES = {
  C: [],
  G: ["F#"],
  D: ["F#", "C#"],
  A: ["F#", "C#", "G#"],
  E: ["F#", "C#", "G#", "D#"],
  B: ["F#", "C#", "G#", "D#", "A#"],
  "F#": ["F#", "C#", "G#", "D#", "A#", "E#"],
  F: ["Bb"],
  Bb: ["Bb", "Eb"],
  Eb: ["Bb", "Eb", "Ab"],
  Ab: ["Bb", "Eb", "Ab", "Db"],
  Db: ["Bb", "Eb", "Ab", "Db", "Gb"],
  Gb: ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"],
};

const MINOR_KEYSIGNATURES = {
  Am: MAJOR_KEYSIGNATURES.C,
  Em: MAJOR_KEYSIGNATURES.G,
  Bm: MAJOR_KEYSIGNATURES.D,
  "F#m": MAJOR_KEYSIGNATURES.A,
  "C#m": MAJOR_KEYSIGNATURES.E,
  "G#m": MAJOR_KEYSIGNATURES.B,
  "D#m": MAJOR_KEYSIGNATURES["F#"],
  Dm: MAJOR_KEYSIGNATURES.F,
  Gm: MAJOR_KEYSIGNATURES.Bb,
  Cm: MAJOR_KEYSIGNATURES.Eb,
  Fm: MAJOR_KEYSIGNATURES.Ab,
  Bbm: MAJOR_KEYSIGNATURES.Db,
  Ebm: MAJOR_KEYSIGNATURES.Gb,
};

export interface LexemeNotation {
  bpm: number;
  clef: string; // 'treble' | 'bass';
  rootNote: string;
  keySignature?: string;
  direction: string; // Direction.Ascending | Direction.Descending | Direction.Random;
  voices?: any;
  notes?: any;
}

/**
 * Custom helper to generate a root note that won't exceed 2 ledger lines above
 * or below for a given clef
 * Note Range Treble Clef: G/3 - D/6
 * Note Range Bass Clef: Bb/1 - F#/4
 */
export const adjustNoteIfOutOfRange = (
  noteName: string,
  clef: "treble" | "bass"
) => {
  const isTreble = clef === "treble";
  const note = new Note(noteName);
  const lowestNote = new Note(isTreble ? "G/3" : "Bb/1");
  const highestNote = new Note(isTreble ? "D/5" : "F#/3");

  if (note.midiValue < lowestNote.midiValue) {
    note.octave = note.octave + 1;
  }

  if (note.midiValue > highestNote.midiValue) {
    note.octave = note.octave - 1;
  }

  return note.name;
};

export const generateRandomRootNote = (
  clef: "treble" | "bass",
  isMajor = false,
  difficulty?: string,
  level?: number
) => {
  const isTreble = clef === "treble";

  let list = Object.keys(MINOR_KEYSIGNATURES);
  if (isMajor) {
    list = Object.keys(MAJOR_KEYSIGNATURES);
  }

  if (difficulty === "easy") {
    list = ["C", "D", "E", "F", "G", "A", "B"];
  }
  if (difficulty === "hard") {
    list = ["C#", "D#", "F#", "G#", "A#", "Db", "Eb", "Gb", "Ab", "Bb"];
  }

  if (level) {
    if (level === 1) {
      list = ["C", "D", "E", "F", "G", "A", "B"];
    }
    if (level >= 1 && level <= 3) {
      list = ["C#", "D#", "F#", "G#", "A#", "Db", "Eb", "Gb", "Ab", "Bb"];
    }

    if (level > 3) {
      list.push("Cb", "B#", "E#", "Fb");
    }
  }

  // remove the "minor" bit from notes
  list = list.map((n) => n.replace("m", "")).sort();
  const randomLetter = list[chooseRandomIndex(list)];
  const octaveRanges = isTreble ? [3, 4, 5] : [2, 3, 4];
  const randomOctave = octaveRanges[chooseRandomIndex(octaveRanges)];

  const note = new Note(`${randomLetter}/${randomOctave}`);

  return adjustNoteIfOutOfRange(note.name, clef);
};

export const getNoteNameByMidiValue = (noteNumber: number) => {
  noteNumber -= 21; // see the explanation below.
  const notes = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];
  const octave = noteNumber / 12 + 1;
  const name = notes[noteNumber % 12];
  return name + "/" + Math.floor(octave);
};

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getBpmInRange = (min: number, max: number) => {
  return getRandomInt(min, max);
};

// Generate a random clef (either bass or treble)
export const generateRandomClef = (fromList?: string[]): Clef => {
  const l = fromList || ["treble", "bass"];
  return l[chooseRandomIndex(l)] as Clef;
};

export const generateRandomDirection = (fromList?: string[]): Direction => {
  const l = fromList || [
    Direction.Ascending,
    Direction.Descending,
    Direction.Random,
  ];
  return l[chooseRandomIndex(l)] as Direction;
};

export const generateRandomUseKeySignature = (fromList: string[]) => {
  return fromList[chooseRandomIndex(fromList)];
};

export const alignModeNotesToMotive = (
  notes: string[],
  intervalStructure: string[],
  motive: string[]
) => {
  const mapScaleStructureToNumber = intervalStructure.map((i) =>
    i.replace(/\D/g, "")
  );

  return motive.map((interval) => {
    const useInterval = interval === "j7" ? "7" : interval;
    const noteIdx = mapScaleStructureToNumber.indexOf(useInterval);

    return notes[noteIdx];
  });
};

// TODO test this
// this won't work for all modes, like the first few ones wouldn't
// work with lydian for example since the 4 is missing.
export const getRandomMotive = (difficulty = "easy", randomise = false) => {
  const maps = {
    easy: [[1, 2, 3, 2, 1]],
    medium: [[1, 2, 1, 4, 1, 5, 1, 3]],
    hard: [[2, 4, 5, 3, 6, 7, 5, 1]],
  };

  if (randomise) {
    // TODO improve this
    // repeat the same motive a couple of time
    // shuffle it
    // slice it randomly to get a different length?
    return shuffle(["1", "2", "3", "4", "5", "6", "j7", "8"]);
  }

  const m = maps[difficulty];
  return m[chooseRandomIndex(m)].map((n: number) => String(n));
};

export const getEnharmonicEquivalents = (note: string) => {
  const noteObj = new Note(note);
  return [noteObj.name.split("/")[0]];
};
