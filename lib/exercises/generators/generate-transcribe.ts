import { v5 as uuidv5 } from "uuid";
import {
  Transcribe,
  TranscribeExercise,
  Direction,
  Lexeme,
  NotationVariant,
  NotationMode,
  Focus,
} from "lib/types";
import { Note, Interval } from "lib/theory";
import generateModeNotation from "utils/notation-engine";
import { replaceIntervalWithDegree } from "utils/notation";

import { ChallengeInput, TAP, HARMONIC_NAMESPACE } from "./shared";

const generateTranscribe = ({
  challenge,
  forLexeme,
  settings,
}: ChallengeInput<
  Transcribe,
  TranscribeExercise["settings"]
>): TranscribeExercise => {
  // TODO gaps only
  const clone: Lexeme = JSON.parse(JSON.stringify(forLexeme));
  const notation = generateModeNotation({
    intervalStructure: clone.intervalStructure,
    bpm: settings.tempo,
    rootNote: settings.rootNote,
    noteLength: settings.noteLength || "q",
    direction: settings.direction,
    useMotive: settings.motive,
  });

  const { variant } = settings;
  let { intervalStructure } = clone;

  if (settings.direction === Direction.Descending) {
    intervalStructure = intervalStructure.reverse();
  }

  const rootNote = new Note(settings.rootNote);
  const notes: string[] = intervalStructure
    .map((i) => rootNote.addInterval(Interval.fromString(i)).technicalName)
    .map((n) => n.split("/")[0]);

  let correctIndices = notes;
  let structure = notes.map((note, index) => (index === 0 ? note : TAP));
  let prompt = "Transcribe the notes you hear";

  if (settings.mode === NotationMode.GapsOnly) {
    prompt = "Fill in the missing notes";

    const replaceNotes = forLexeme.intervalStructure
      .filter((_, i) => forLexeme.uniqueIntervals.includes(i))
      .map((i) => rootNote.addInterval(Interval.fromString(i)).technicalName)
      .map((n) => n.split("/")[0]);

    structure = notes.map((s) => (replaceNotes.includes(s) ? TAP : s));
    correctIndices = notes.filter((s) => replaceNotes.includes(s));
  }

  if (variant === NotationVariant.Intervals) {
    correctIndices = replaceIntervalWithDegree(intervalStructure);
    structure = correctIndices.map(() => TAP);
    prompt = "Transcribe the interval structure you hear";

    if (settings.mode === NotationMode.GapsOnly) {
      prompt = "Fill in the missing intervals";

      const replaceIntervals = replaceIntervalWithDegree(
        forLexeme.intervalStructure.filter((_, i) =>
          forLexeme.uniqueIntervals.includes(i)
        )
      );

      structure = correctIndices.map((s) =>
        replaceIntervals.includes(s) ? TAP : s
      );
      correctIndices = correctIndices.filter((s) =>
        replaceIntervals.includes(s)
      );
    }
  }

  if (
    variant === NotationVariant.Notes &&
    settings.mode === NotationMode.Complete
  ) {
    correctIndices = correctIndices.slice(1, correctIndices.length);
  }

  const idParams = [
    challenge._id,
    forLexeme._id,
    Focus.Listen,
    challenge.type,
    settings.direction,
    settings.rootNote,
    settings.allowEnharmonicEquivalents,
    settings.mode,
    settings.variant,
  ];

  return {
    _id: uuidv5(JSON.stringify(idParams), HARMONIC_NAMESPACE),
    challengeId: challenge._id,
    lexemeId: forLexeme._id,
    focus: Focus.Listen,
    type: challenge.type,
    prompt,
    structure,
    correctIndices,
    notation,
    settings,
  };
};

export default generateTranscribe;
