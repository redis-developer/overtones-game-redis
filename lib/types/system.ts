export enum Topic {
  Intervals = "intervals",
  Scales = "scales",
  Chords = "chords",
}

export enum Focus {
  Read = "read",
  Write = "write",
  Listen = "listen",
  Sing = "sing",
}

export enum Direction {
  Ascending = "ascending",
  Descending = "descending",
  Random = "random",
  Motive = "motive",
  Unison = "unison",
}

export enum ChallengeType {
  ListenAndSelect = "listen-and-select",
  Transcribe = "transcribe",
}

export enum Clef {
  Treble = "treble",
  Bass = "bass",
}

export enum RootNotes {
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  A = "A",
  B = "B",
  Csharp = "C#",
  Dsharp = "D#",
  Fsharp = "F#",
  Gsharp = "G#",
  Asharp = "A#",
  Dflat = "Db",
  Eflat = "Eb",
  Gflat = "Gb",
  Aflat = "Ab",
  Bflat = "Bb",
}

export enum MajorKeySignature {
  CMajor = "C",
  GMajor = "G",
  DMajor = "D",
  AMajor = "A",
  EMajor = "E",
  BMajor = "B",
  FSharpMajor = "F#",
  CSharpMajor = "C#",
  FMajor = "F",
  BFlatMajor = "Bb",
  EFlatMajor = "Eb",
  AFlatMajor = "Ab",
  DFlatMajor = "Db",
  GFlatMajor = "Gb",
  CFlatMajor = "Cb",
}

export enum MinorKeySignature {
  AMinor = MajorKeySignature.CMajor,
  EMinor = MajorKeySignature.GMajor,
  BMinor = MajorKeySignature.DMajor,
  FSharpMinor = MajorKeySignature.AMajor,
  CSharpMinor = MajorKeySignature.EMajor,
  GSharpMinor = MajorKeySignature.BMajor,
  DSharpMinor = MajorKeySignature.FSharpMajor,
  ASharpMinor = MajorKeySignature.CSharpMajor,
  DMinor = MajorKeySignature.FMajor,
  GMinor = MajorKeySignature.BFlatMajor,
  CMinor = MajorKeySignature.EFlatMajor,
  FMinor = MajorKeySignature.AFlatMajor,
  BFlatMinor = MajorKeySignature.DFlatMajor,
  EFlatMinor = MajorKeySignature.GFlatMajor,
}

export const KeySignature = {
  ...MajorKeySignature,
  ...MinorKeySignature,
};
