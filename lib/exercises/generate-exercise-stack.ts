import { shuffle } from "utils/array";
import { Lexeme, Challenge } from "lib/types";
import generatePermutations from "./generate-permutations";

interface Params {
  numOfExercises: number;
  testLexemes: Lexeme[];
  challenges: Challenge[];
}

export const generateExerciseStack = ({
  numOfExercises,
  testLexemes,
  challenges,
}: Params) => {
  if (
    numOfExercises == 0 ||
    testLexemes.length == 0 ||
    challenges.length == 0
  ) {
    return [];
  }

  const generatedExercises = shuffle(
    generatePermutations(challenges, testLexemes)
  );

  // TODO: rewrite immutable
  let stack = [];

  const combos = testLexemes.length * challenges.length;
  const exercisesPerCombo = Math.ceil(numOfExercises / combos);

  testLexemes.forEach((testLexeme) => {
    challenges
      .map((x) => x.type)
      .forEach((challengeType) => {
        // Select only exercises that match the lexeme and type
        const uncompletedFiltered = generatedExercises.filter(
          (x) => x.lexemeId == testLexeme._id && x.type == challengeType
        );
        // Take right amount from uncompleted exercises first
        let exercises = uncompletedFiltered.slice(0, exercisesPerCombo);

        // If needed add more from uncompleted exercises
        if (exercises.length < exercisesPerCombo) {
          const completedFiltered = generatedExercises.filter(
            (x) => x.lexemeId == testLexeme._id && x.type == challengeType
          );
          exercises = exercises.concat(
            completedFiltered.slice(0, exercisesPerCombo - exercises.length)
          );
        }
        // If still not enough repeat the existing once to fill up
        if (exercises.length < exercisesPerCombo) {
          let exercisesLength = exercises.length;
          while (exercisesLength < exercisesPerCombo) {
            exercises = exercises.concat(exercises);
            exercises = exercises.slice(0, exercisesPerCombo);
            exercisesLength = exercises.length;
          }
        }

        stack = stack.concat(exercises);
      });
  });

  // Shuffle, take first numExercises, return
  return shuffle(stack).slice(0, numOfExercises);
};
