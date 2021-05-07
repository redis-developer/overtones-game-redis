import { getRandomInt } from "utils/notation";
import {
  ChallengeType,
  RootNotes,
  ListenAndSelect,
  Transcribe,
  NotationVariant,
  Challenge,
  Lexeme,
  ExerciseReturnBase,
} from "lib/types";
import * as Exercises from "./generators";
import { generatePermutations } from "utils/array";

/**
 * Generates all possible permutations of exercises from the provided params
 * @param {Challenge[]} challengeDefinitions - An array of challenge definitions
 * @param {testLexemes[]} author - The lexemes to be testest in the exercises
 * @returns {Array<Partial<ExerciseReturnBase>>} The exercises
 */
export default (
  challengeDefinitions: Challenge[],
  testLexemes: Lexeme[]
): Array<Partial<ExerciseReturnBase>> => {
  return challengeDefinitions
    .map((challengeDefinition) => {
      if (challengeDefinition.type === ChallengeType.ListenAndSelect) {
        const castChallenge = challengeDefinition as ListenAndSelect;

        const permutations = generatePermutations([
          {
            lexeme: testLexemes,
          },
          { direction: castChallenge.directions },
          { rootNote: Object.values(RootNotes) },
        ]);

        return permutations.map((row) =>
          Exercises.generateListenAndSelect({
            challenge: castChallenge,
            forLexeme: row.lexeme,
            settings: {
              shuffledChoices: testLexemes,
              direction: row.direction,
              tempo: getRandomInt(
                castChallenge.tempoRange.min,
                castChallenge.tempoRange.max
              ),
              rootNote: row.rootNote + "/4",
              noteLength: "q",
            },
          })
        );
      }

      if (challengeDefinition.type === ChallengeType.Transcribe) {
        // Cast to correct type
        const castChallenge = challengeDefinition as Transcribe;

        if (castChallenge.variant == NotationVariant.Notes) {
          // Construct possible root notes. If root notes are given in the lesson
          // definition choose these, otherwise any
          const rootNotes =
            castChallenge.rootNotes && castChallenge.rootNotes.length > 0
              ? castChallenge.rootNotes
              : Object.values(RootNotes);

          const permutations = generatePermutations([
            {
              lexeme: testLexemes,
            },
            { mode: castChallenge.modes },
            { direction: castChallenge.directions },
            { rootNote: rootNotes },
          ]);

          return permutations.map((row) =>
            Exercises.generateTranscribe({
              challenge: castChallenge,
              forLexeme: row.lexeme,
              settings: {
                variant: castChallenge.variant,
                mode: row.mode,
                allowEnharmonicEquivalents:
                  castChallenge.allowEnharmonicEquivalents, // todo: what about this?
                direction: row.direction,
                rootNote: row.rootNote + "/4", // TODO currently just adding
                // /4 as octave, but needs to be dynamic (or based on clef?)
                tempo: getRandomInt(
                  castChallenge.tempoRange.min,
                  castChallenge.tempoRange.max
                ),
                noteLength: "q",
              },
            })
          );
        } else if (castChallenge.variant == NotationVariant.Intervals) {
          const permutations = generatePermutations([
            {
              lexeme: testLexemes,
            },
            { mode: castChallenge.modes },
            { direction: castChallenge.directions },
          ]);

          return permutations.map((row) =>
            Exercises.generateTranscribe({
              challenge: castChallenge,
              forLexeme: row.lexeme,
              settings: {
                variant: castChallenge.variant,
                mode: row.mode,
                allowEnharmonicEquivalents:
                  castChallenge.allowEnharmonicEquivalents, // TODO what about this?
                direction: row.direction,
                rootNote: "C/4", // TODO currently just adding
                // /4 as octave, but needs to be dynamic (or based on clef?)
                tempo: getRandomInt(
                  castChallenge.tempoRange.min,
                  castChallenge.tempoRange.max
                ),
                noteLength: "q",
              },
            })
          );
        }
      }
    })
    .flat();
};
