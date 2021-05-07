import Note from "./note";
import Interval from "./interval";
import { findKey } from "./utils";

export const ModesDict: Record<
  string,
  {
    _id: string;
    names: string[];
    intervalStructure: string[];
    uniqueIntervals: number[];
  }
> = {
  MajorPentatonic: {
    _id: "scale-major-pentatonic",
    names: ["Major Pentatonic"],
    intervalStructure: ["P1", "M2", "M3", "P5", "M6"],
    uniqueIntervals: [2, 4],
  },
  MinorPentatonic: {
    _id: "scale-minor-pentatonic",
    names: ["Minor Pentatonic"],
    intervalStructure: ["P1", "m3", "P4", "P5", "m7"],
    uniqueIntervals: [1, 4],
  },
  Major: {
    _id: "scale-major",
    names: ["Major"],
    intervalStructure: ["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
    uniqueIntervals: [2, 5, 6],
  },
  NaturalMinor: {
    _id: "scale-natural-minor",
    names: ["Natural Minor", "Minor"],
    intervalStructure: ["P1", "M2", "m3", "P4", "P5", "m6", "m7", "P8"],
    uniqueIntervals: [2, 5, 6],
  },
  Ionian: {
    _id: "scale-ionian",
    names: ["Ionian"],
    intervalStructure: ["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
    uniqueIntervals: [2, 5, 6],
  },
  Dorian: {
    _id: "scale-dorian",
    names: ["Dorian"],
    intervalStructure: ["P1", "M2", "m3", "P4", "P5", "M6", "m7", "P8"],
    uniqueIntervals: [2, 5, 6],
  },
  Phrygian: {
    _id: "scale-phrygian",
    names: ["Phrygian"],
    intervalStructure: ["P1", "m2", "m3", "P4", "P5", "m6", "m7", "P8"],
    uniqueIntervals: [1, 2, 5, 6],
  },
  Lydian: {
    _id: "scale-lydian",
    names: ["Lydian"],
    intervalStructure: ["P1", "M2", "M3", "A4", "P5", "M6", "M7", "P8"],
    uniqueIntervals: [3, 5, 6],
  },
  Mixolydian: {
    _id: "scale-mixolydian",
    names: ["Mixolydian"],
    intervalStructure: ["P1", "M2", "M3", "P4", "P5", "M6", "m7", "P8"],
    uniqueIntervals: [1, 2, 6],
  },
  Aeolian: {
    _id: "scale-aeolian",
    names: ["Aeolian"],
    intervalStructure: ["P1", "M2", "m3", "P4", "P5", "m6", "m7", "P8"],
    uniqueIntervals: [2, 5, 6],
  },
  Locrian: {
    _id: "scale-locrian",
    names: ["Locrian"],
    intervalStructure: ["P1", "m2", "m3", "P4", "d5", "m6", "m7", "P8"],
    uniqueIntervals: [1, 2, 4, 5, 6],
  },
};

export default class Mode {
  _name: string;
  _tonic: string;
  _mode: string;
  _notes: string[] = [];
  _actualNotes: string[] = [];
  _intervalStructure: string[];

  constructor(tonic: string, name: string, direction = "asc") {
    const modeKey = findKey(ModesDict, name);
    if (!modeKey && !ModesDict[name]) {
      throw new Error(`Mode ${modeKey || name} is not valid`);
    }

    // TODO validate tonic

    this._name = `${tonic} ${modeKey || name}`;
    this._tonic = tonic;
    this._mode = modeKey || name;

    const getMode = modeKey ? ModesDict[modeKey] : ModesDict[name];
    const intervalStructure = getMode.intervalStructure;
    const rootNote = new Note(tonic);

    if (direction === "desc") {
      rootNote.octave = rootNote.octave - 1;
    }

    const notes = [
      ...intervalStructure.map(
        (interval: string) =>
          rootNote.addInterval(Interval.fromString(interval)).technicalName
      ),
      rootNote.addInterval(Interval.fromString("P8")).name,
    ];
    this._notes = direction === "desc" ? notes.reverse() : notes;
    this._intervalStructure = intervalStructure;
  }

  public get name(): string {
    return this._name;
  }

  public get tonic(): string {
    return this._tonic;
  }

  public get mode(): string {
    return this._mode;
  }

  public get notes(): string[] {
    return this._notes;
  }

  public get intervalStructure(): string[] {
    return this._intervalStructure;
  }
}
