import { QUALITIES, MAJOR, MINOR, AUG, DIM } from "./music";

export const IntervalDict: Record<
  string,
  { _id: string; name: string; semitones: number; intervalStructure: string[] }
> = {
  P1: {
    _id: "interval-P1",
    name: "Perfect Unison",
    semitones: 0,
    intervalStructure: ["P1", "P1"],
  },
  d2: {
    _id: "interval-d2",
    name: "Diminished 2nd",
    semitones: 0,
    intervalStructure: ["P1", "d2"],
  },
  m2: {
    _id: "interval-m2",
    name: "Minor 2nd",
    semitones: 1,
    intervalStructure: ["P1", "m2"],
  },
  A1: {
    _id: "interval-A1",
    name: "Augmented Unison",
    semitones: 1,
    intervalStructure: ["P1", "A1"],
  },
  M2: {
    _id: "interval-M2",
    name: "Major 2nd",
    semitones: 2,
    intervalStructure: ["P1", "M2"],
  },
  d3: {
    _id: "interval-d3",
    name: "Diminished 3rd",
    semitones: 2,
    intervalStructure: ["P1", "d3"],
  },
  m3: {
    _id: "interval-m3",
    name: "Minor 3rd",
    semitones: 3,
    intervalStructure: ["P1", "m3"],
  },
  A2: {
    _id: "interval-A2",
    name: "Augmented 2nd",
    semitones: 3,
    intervalStructure: ["P1", "A2"],
  },
  M3: {
    _id: "interval-M3",
    name: "Major 3rd",
    semitones: 4,
    intervalStructure: ["P1", "M3"],
  },
  d4: {
    _id: "interval-d4",
    name: "Diminished 4th",
    semitones: 4,
    intervalStructure: ["P1", "d4"],
  },
  P4: {
    _id: "interval-P4",
    name: "Perfect 4th",
    semitones: 5,
    intervalStructure: ["P1", "P4"],
  },
  A3: {
    _id: "interval-A3",
    name: "Augmented 3rd",
    semitones: 5,
    intervalStructure: ["P1", "A3"],
  },
  d5: {
    _id: "interval-d5",
    name: "Diminished 5th",
    semitones: 6,
    intervalStructure: ["P1", "d5"],
  },
  A4: {
    _id: "interval-A4",
    name: "Augmented 4th",
    semitones: 6,
    intervalStructure: ["P1", "A4"],
  },
  P5: {
    _id: "interval-P5",
    name: "Perfect 5th",
    semitones: 7,
    intervalStructure: ["P1", "P5"],
  },
  d6: {
    _id: "interval-d6",
    name: "Diminished 6th",
    semitones: 7,
    intervalStructure: ["P1", "d6"],
  },
  m6: {
    _id: "interval-m6",
    name: "Minor 6th",
    semitones: 8,
    intervalStructure: ["P1", "m6"],
  },
  A5: {
    _id: "interval-A5",
    name: "Augmented 5th",
    semitones: 8,
    intervalStructure: ["P1", "A5"],
  },
  M6: {
    _id: "interval-M6",
    name: "Major 6th",
    semitones: 9,
    intervalStructure: ["P1", "M6"],
  },
  d7: {
    _id: "interval-d7",
    name: "Diminished 7th",
    semitones: 9,
    intervalStructure: ["P1", "d7"],
  },
  m7: {
    _id: "interval-m7",
    name: "Minor 7th",
    semitones: 10,
    intervalStructure: ["P1", "m7"],
  },
  A6: {
    _id: "interval-A6",
    name: "Augmented 6th",
    semitones: 10,
    intervalStructure: ["P1", "A6"],
  },
  M7: {
    _id: "interval-M7",
    name: "Major 7th",
    semitones: 11,
    intervalStructure: ["P1", "M7"],
  },
  d8: {
    _id: "interval-d8",
    name: "Diminished Octave",
    semitones: 11,
    intervalStructure: ["P1", "d8"],
  },
  A7: {
    _id: "interval-A7",
    name: "Augmented 7th",
    semitones: 12,
    intervalStructure: ["P1", "A7"],
  },
  P8: {
    _id: "interval-P8",
    name: "Perfect Octave",
    semitones: 12,
    intervalStructure: ["P1", "P8"],
  },
};

export default class Interval {
  quality: string;
  quantity: number;
  name: string;
  isCompound: boolean;
  fullName: string;
  semitones: number;

  constructor(quality: string, quantity: number) {
    if (QUALITIES.indexOf(quality) === -1) {
      throw Error("Quality invalid");
    }

    if (quantity < 1 || quantity > 14) {
      throw Error("Quantity invalid");
    }

    this.isCompound = quantity > 8;

    this.quality = quality;
    this.quantity = quantity;
    this.name = `${quality}${quantity}`;
    const lookupName = `${quality}${quantity - (this.isCompound ? 7 : 0)}`;

    if (!IntervalDict[lookupName]) {
      throw Error(`Interval ${this.name} invalid`);
    }

    const interval = IntervalDict[lookupName];
    this.fullName = interval.name;
    if (this.isCompound) {
      const r = /([1-8])/;
      const r2 = interval.name.replace(r, quantity.toString());
      const r3 = /(st|nd|rd|th)/;
      const r4 = r2.replace(r3, "th");
      this.fullName = r4;
    }

    this.semitones = interval.semitones + (this.isCompound ? 12 : 0);
  }

  // Create a new interval based on quantity and number of semitones
  static fromQuantityAndSemitones(
    quantity: number,
    semitones: number
  ): Interval {
    const keys = Object.keys(IntervalDict);
    let i = null;
    keys.forEach((k: string) => {
      const interval = IntervalDict[k];
      const kQuantity = k.substring(1, 2);

      if (kQuantity === String(quantity) && semitones === interval.semitones) {
        i = Interval.fromString(k);
      }
    });

    if (!i) {
      throw Error("Combination of quantity and semitones is invalid");
    }

    return i;
  }

  // Create a new interval from string (i.e. M3)
  static fromString(interval: string): Interval {
    const quantity = parseInt(interval.substring(1, interval.length), 10);
    const quality = interval.substring(0, 1);

    return new Interval(quality, quantity);
  }

  // invert the interval
  invert(): Interval {
    let newQuality = this.quality;

    switch (this.quality) {
      case MAJOR:
        newQuality = MINOR;
        break;
      case MINOR:
        newQuality = MAJOR;
        break;
      case AUG:
        newQuality = DIM;
        break;
      case DIM:
        newQuality = AUG;
        break;
      default:
        newQuality = this.quality;
    }

    const newQuantity = 9 - this.quantity;
    return new Interval(newQuality, newQuantity);
  }
}
