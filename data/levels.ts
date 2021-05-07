import { ChordsDict, ModesDict, IntervalDict } from "lib/theory";
import {
  ChallengeType,
  Direction,
  NotationMode,
  NotationVariant,
  Topic,
} from "lib/types";

/**
 * This is a structure of the levels and what topics, lexemes and challenges they test
 */

type LevelSettings = Record<
  Topic,
  {
    lexemes: any[];
    challenges?: Record<ChallengeType, unknown[]>;
  }
>;

/**
 * Levels
 */

export const levels: LevelSettings[] = [
  // LEVEL ONE
  {
    [Topic.Scales]: {
      lexemes: [ModesDict.Major, ModesDict.NaturalMinor],
      challenges: {
        [ChallengeType.ListenAndSelect]: [
          {
            directions: [Direction.Ascending, Direction.Descending],
            tempoRange: { min: 60, max: 100 },
          },
        ],
        [ChallengeType.Transcribe]: [
          {
            directions: [Direction.Ascending],
            tempoRange: { min: 60, max: 100 },
            variant: NotationVariant.Intervals,
            modes: [NotationMode.GapsOnly],
            rootNotes: [],
          },
        ],
      },
    },
    [Topic.Chords]: {
      lexemes: [ChordsDict.maj, ChordsDict.min],
      challenges: {
        [ChallengeType.ListenAndSelect]: [
          {
            directions: [
              Direction.Ascending,
              Direction.Descending,
              Direction.Unison,
            ],
            tempoRange: { min: 60, max: 100 },
          },
        ],
        [ChallengeType.Transcribe]: [
          {
            directions: [Direction.Ascending, Direction.Unison],
            tempoRange: { min: 60, max: 100 },
            variant: NotationVariant.Intervals,
            modes: [NotationMode.Complete],
            rootNotes: [],
          },
        ],
      },
    },
    [Topic.Intervals]: {
      lexemes: [
        IntervalDict.P1,
        IntervalDict.m2,
        IntervalDict.m3,
        IntervalDict.m6,
        IntervalDict.m7,
        IntervalDict.P8,
      ],
      challenges: {
        [ChallengeType.ListenAndSelect]: [
          {
            directions: [Direction.Ascending, Direction.Unison],
            tempoRange: { min: 60, max: 100 },
          },
        ],
        [ChallengeType.Transcribe]: [
          {
            directions: [Direction.Ascending, Direction.Unison],
            tempoRange: { min: 60, max: 100 },
            variant: NotationVariant.Intervals,
            modes: [NotationMode.Complete],
            rootNotes: [],
          },
        ],
      },
    },
  },

  // LEVEL TWO
  {
    [Topic.Scales]: {
      lexemes: [
        ModesDict.Ionian,
        ModesDict.Lydian,
        ModesDict.Dorian,
        ModesDict.Phrygian,
        ModesDict.Mixolydian,
        ModesDict.Aeolian,
        ModesDict.Locrian,
      ],
      challenges: {
        [ChallengeType.ListenAndSelect]: [
          {
            directions: [Direction.Ascending, Direction.Descending],
            tempoRange: { min: 100, max: 125 },
          },
        ],
        [ChallengeType.Transcribe]: [
          {
            directions: [Direction.Ascending, Direction.Descending],
            tempoRange: { min: 100, max: 100 },
            variant: NotationVariant.Intervals,
            modes: [NotationMode.GapsOnly, NotationMode.Complete],
            rootNotes: [],
          },
        ],
      },
    },
    [Topic.Chords]: {
      lexemes: [
        ChordsDict.maj,
        ChordsDict.min,
        ChordsDict.dim,
        ChordsDict.aug,
        ChordsDict.sus2,
        ChordsDict.sus4,
      ],
      challenges: {
        [ChallengeType.ListenAndSelect]: [
          {
            directions: [
              Direction.Ascending,
              Direction.Descending,
              Direction.Unison,
            ],
            tempoRange: { min: 80, max: 100 },
          },
        ],
        [ChallengeType.Transcribe]: [
          {
            directions: [
              Direction.Ascending,
              Direction.Descending,
              Direction.Unison,
            ],
            tempoRange: { min: 60, max: 100 },
            variant: NotationVariant.Intervals,
            modes: [NotationMode.Complete],
            rootNotes: [],
          },
        ],
      },
    },
    [Topic.Intervals]: { lexemes: [] },
  },
];
