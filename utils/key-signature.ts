export const MAJOR_KEYSIGNATURES = {
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

export const PARALLEL_MAJOR = {
  Am: "C",
  Em: "G",
  Bm: "D",
  "F#m": "A",
  "C#m": "E",
  "G#m": "B",
  "D#m": "F#",
  Dm: "F",
  Gm: "Bb",
  Cm: "Eb",
  Fm: "Ab",
  Bbm: "Db",
  Ebm: "Gb",
};

export const KEY_SIGNATURES = {
  ...MAJOR_KEYSIGNATURES,
  ...MINOR_KEYSIGNATURES,
};

export const getKeySignaturesWithMaxAccidentals = (
  max: number,
  major: boolean
) => {
  const useList = major ? MAJOR_KEYSIGNATURES : MINOR_KEYSIGNATURES;
  const keySignatures = Object.keys(useList).filter((key) => {
    return useList[key].length <= max;
  });

  return keySignatures;
};
