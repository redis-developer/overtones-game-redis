import { Lexeme, Direction, Topic } from "lib/types";

export interface ChallengeInput<Challenge, Options> {
  challenge: Challenge;
  forLexeme: Lexeme;
  settings: Options;
}

export const singularTopic = (topic: Topic) => {
  if (topic === Topic.Scales) {
    return "scale";
  }

  if (topic === Topic.Chords) {
    return "chord";
  }

  if (topic === Topic.Intervals) {
    return "interval";
  }

  return topic;
};

export const prefixedDirection = (dir: Direction) => {
  const firstLetter = dir.slice(0, 1);
  return ["a", "e", "i", "o", "u"].includes(firstLetter)
    ? `an ${dir}`
    : `a ${dir}`;
};

export const TAP = "<tap>";

// used for generating a unique but consistent exercise id
export const HARMONIC_NAMESPACE = "718e9f5d-6eca-48f3-ade0-15527c70c341";
