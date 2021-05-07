import Note from "./note";
import Interval from "./interval";
import { findKey } from "./utils";

export const ChordsDict: Record<
  string,
  { _id: string; names: string[]; intervalStructure: string[] }
> = {
  // triads
  maj: {
    _id: "chord-major",
    names: ["Major triad"],
    intervalStructure: ["P1", "M3", "P5"],
  },
  min: {
    _id: "chord-minor",
    names: ["Minor triad"],
    intervalStructure: ["P1", "m3", "P5"],
  },
  dim: {
    _id: "chord-diminished",
    names: ["Diminished triad"],
    intervalStructure: ["P1", "m3", "d5"],
  },
  aug: {
    _id: "chord-augmented",
    names: ["Augmented triad", "(#5)", "(5+)", "+5", "Augmented"],
    intervalStructure: ["P1", "M3", "A5"],
  },
  sus2: {
    _id: "chord-sus2",
    names: ["Suspended 2nd"],
    intervalStructure: ["P1", "M2", "P5"],
  },
  sus4: {
    _id: "chord-sus4",
    names: ["Suspended 4th"],
    intervalStructure: ["P1", "P4", "P5"],
  },

  // 4 note chords
  7: {
    _id: "chord-7",
    names: ["Dominant 7"],
    intervalStructure: ["P1", "M3", "P5", "m7"],
  },
  maj7: {
    _id: "chord-maj7",
    names: ["Major 7th", "^7", "M7", "MA7", "7+", "j7"],
    intervalStructure: ["P1", "M3", "P5", "M7"],
  },
  min7: {
    _id: "chord-min7",
    names: ["Minor 7th", "-7", "mi", "min"],
    intervalStructure: ["P1", "m3", "P5", "m7"],
  },
  dim7: {
    _id: "chord-dim7",
    names: ["Diminished 7th", "-(b5)", "min(5-)", "°7"],
    intervalStructure: ["P1", "m3", "d5", "d7"],
  },
  min7b5: {
    _id: "chord-min7b5",
    names: ["Minor 7b5", "m7(b5)", "-7(b5)", "Ø", "Ø7"],
    intervalStructure: ["P1", "m3", "d5", "m7"],
  },
  "7sus4": {
    _id: "chord-7sus4",
    names: ["7sus", "7(sus4)", "sus"],
    intervalStructure: ["P1", "P4", "P5", "m7"],
  },

  // major extensions
  6: {
    _id: "chord-6",
    names: ["Major 6", "maj6"],
    intervalStructure: ["P1", "M3", "P5", "M6"],
  },
  add9: {
    _id: "chord-add9",
    names: ["Add 9"],
    intervalStructure: ["P1", "M3", "P5", "M9"],
  },
  "69": {
    _id: "chord-69",
    names: ["6/9"],
    intervalStructure: ["P1", "M3", "P5", "M6", "M9"],
  },
  maj9: {
    _id: "chord-maj9",
    names: ["Major 9th", "^9", "M9"],
    intervalStructure: ["P1", "M3", "P5", "M7", "M9"],
  },
  "maj7#11": {
    _id: "chord-maj7#11",
    names: ["Major 7th#11", "^7#11", "^7(#11)"],
    intervalStructure: ["P1", "M3", "P5", "M7", "A11"],
  },
  "maj9#11": {
    _id: "chord-maj9#11",
    names: ["Major 9th#11", "^9(#11)"],
    intervalStructure: ["P1", "M3", "P5", "M7", "M9", "A11"],
  },

  // minor extensions
  min6: {
    _id: "chord-min6",
    names: ["Minor 6", "-6", "m6"],
    intervalStructure: ["P1", "m3", "P5", "M6"],
  },
  minMaj7: {
    _id: "chord-minMaj7",
    names: ["Minor Major7", " -(^7)", "minMaj7"],
    intervalStructure: ["P1", "m3", "P5", "M7"],
  },
  minAdd9: {
    _id: "chord-minAdd9",
    names: ["Minor add9", "-add9"],
    intervalStructure: ["P1", "m3", "P5", "M9"],
  },
  min9: {
    _id: "chord-min9",
    names: ["Minor 9", "-9"],
    intervalStructure: ["P1", "m3", "P5", "m7", "M9"],
  },
  min9Maj7: {
    _id: "chord-min9Maj7",
    names: ["Minor 9 (major7)", "-9(^7)"],
    intervalStructure: ["P1", "m3", "P5", "M7", "M9"],
  },
  min11: {
    _id: "chord-min11",
    names: ["Minor 11", "-11"],
    intervalStructure: ["P1", "m3", "P5", "m7", "M9", "P11"],
  },

  // seventh chord extensions
  "9": {
    _id: "chord-9",
    names: ["Dominant 9"],
    intervalStructure: ["P1", "M3", "P5", "m7", "M9"],
  },
  "13": {
    _id: "chord-13",
    names: ["Dominant 13"],
    intervalStructure: ["P1", "M3", "P5", "m7", "M9", "M13"],
  },
  "7b9": {
    _id: "chord-7b9",
    names: ["Dominant 7b9", "7(b9)"],
    intervalStructure: ["P1", "M3", "P5", "m7", "m9"],
  },
  "7#9": {
    _id: "chord-7#9",
    names: ["Dominant 7#9", "7(#9)"],
    intervalStructure: ["P1", "M3", "P5", "m7", "A9"],
  },
  "7#11": {
    _id: "chord-7#11",
    names: ["Dominant 7#11", "7(#11)"],
    intervalStructure: ["P1", "M3", "P5", "m7", "A11"],
  },
  "7b13": {
    _id: "chord-7b13",
    names: ["Dominant 7b13", "7(b13)"],
    intervalStructure: ["P1", "M3", "P5", "m7", "m13"],
  },

  // augmented triads
  augMaj7: {
    _id: "chord-augMaj7",
    names: ["Augmented Major 7", "+(^7)"],
    intervalStructure: ["P1", "M3", "A5", "M7"],
  },
  aug7: {
    _id: "chord-aug7",
    names: ["Augmented 7", "+7"],
    intervalStructure: ["P1", "M3", "A5", "m7"],
  },

  // extended 7sus4 chords
  "9sus4": {
    _id: "chord-9sus4",
    names: ["Dominant 9sus4", "9(sus4)"],
    intervalStructure: ["P1", "P4", "P5", "m7", "M9"],
  },
  "13sus4": {
    _id: "chord-13sus4",
    names: ["Dominant 13sus4", "13(sus4)"],
    intervalStructure: ["P1", "P4", "P5", "m7", "M9", "M13"],
  },
  "7sus4b9": {
    _id: "chord-7sus4b9",
    names: ["Dominant 7sus4b9", "7sus4(b9)"],
    intervalStructure: ["P1", "P4", "P5", "m7", "m9"],
  },

  // half-diminished chords
  min11b5: {
    _id: "chord-min11b5",
    names: ["Minor 11b5", "-11(b5)"],
    intervalStructure: ["P1", "m3", "d5", "m7", "P11"],
  },
  min7b5b13: {
    _id: "chord-min7b5b13",
    names: ["Minor 7b5b13", "Ø7(b13)"],
    intervalStructure: ["P1", "m3", "d5", "m7", "m13"],
  },
  min7b5add9: {
    _id: "chord-min7b5add9",
    names: ["Monor 7b5add9", "Ø7(9)"],
    intervalStructure: ["P1", "m3", "d5", "m7", "M9"],
  },
};

class Chord {
  private _name: string;
  private _rootNote: string;
  private _inversion = 0;
  private _quality: string;
  private _notes: string[] = [];
  private _notesInRootPosition: string[] = [];

  constructor(rootNote: string, quality = "maj", inversion = 0) {
    const chordKey = findKey(ChordsDict, quality);
    if (!chordKey && !ChordsDict[quality]) {
      throw new Error(`Chord _quality ${quality} is not valid`);
    }

    this._name = `${rootNote} ${quality}`;
    this._rootNote = rootNote;
    this._quality = quality;

    const chord = chordKey ? ChordsDict[chordKey] : ChordsDict[quality];
    const intervalStructure = chord.intervalStructure;
    const root = new Note(rootNote);
    const notes = intervalStructure.map(
      (interval: string) => root.addInterval(Interval.fromString(interval)).name
    );
    this._notes = notes;
    this._notesInRootPosition = notes;

    if (inversion > 0) {
      this.invert(inversion);
    }
  }

  public get name(): string {
    return this._name;
  }

  public get rootNote(): string {
    return this._rootNote;
  }

  public get quality(): string {
    return this._quality;
  }

  public get notes(): string[] {
    return this._notes || [];
  }

  public get inversion(): number {
    return this._inversion || 0;
  }

  public invert(inversion?: number): string[] {
    const currentInversion = this._inversion;
    const notes = this._notesInRootPosition;
    const isLast = notes.length - 1 === currentInversion;
    const nextInversion = isLast ? 0 : currentInversion + 1;
    const jumpToInversion = inversion || nextInversion;

    const newNotes = [
      ...notes.slice(jumpToInversion),
      ...notes.slice(0, jumpToInversion).map((note) => {
        const tmp = new Note(note);
        tmp.octave = tmp.octave + 1;
        return tmp.name;
      }),
    ];

    this._inversion = jumpToInversion;
    this._notes = newNotes;

    return newNotes;
  }
}

export default Chord;
