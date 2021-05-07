import { Exercise, ChallengeType } from "./types";

export interface Validation {
  hasValidated: boolean;
  isCorrect: boolean;
}

const validateGuess = (
  exercise: Exercise,
  guess: number[] | string[]
): Validation => {
  if (exercise.type === ChallengeType.ListenAndSelect) {
    return {
      hasValidated: true,
      isCorrect: exercise.correctIndices[0] === guess[0],
    };
  }

  if (exercise.type === ChallengeType.Transcribe) {
    // TODO handle enharmonics
    return {
      hasValidated: true,
      isCorrect: exercise.correctIndices.join("") === guess.join(""),
    };
  }

  return {
    hasValidated: false,
    isCorrect: false,
  };
};

export default validateGuess;
