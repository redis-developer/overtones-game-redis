import { Challenge } from "lib/types";
import { generateExerciseStack } from "lib/exercises/generate-exercise-stack";

import { levels } from "data/levels";
import { ChallengeType, Topic } from "lib/types";
import { shuffle } from "utils/array";

const EXERCISES_PER_TOPIC = 1;

export default async function handler(req, res) {
  //await connectToDb();

  const levelId = parseInt(req.query.level || 1, 10);
  const levelData = levels[levelId - 1];

  const hasNextLevel = levels[levelId] ? true : false;
  const nextLevelId = hasNextLevel ? levelId + 1 : null;

  const generatedExercises: Challenge[] = Object.keys(levelData)
    .map((topic: Topic) => {
      const { lexemes, challenges } = levelData[topic];

      if (!lexemes.length || !Object.keys(challenges).length) {
        return [];
      }

      const challengeDefinitions = Object.keys(challenges)
        .map((type) => {
          const variations = challenges[type];

          return variations.map((settings: any) => {
            if (type === ChallengeType.ListenAndSelect) {
              return {
                level: levelId,
                type,
                topic,
                directions: settings.directions,
                tempoRange: settings.tempoRange,
              };
            }

            if (type === ChallengeType.Transcribe) {
              return {
                level: levelId,
                type,
                topic,
                directions: settings.directions,
                tempoRange: settings.tempoRange,
                variant: settings.variant,
                modes: settings.modes,
                rootNotes: settings.rootNotes,
                allowEnharmonicEquivalents: true,
              };
            }
          });
        })
        .flat();

      return generateExerciseStack({
        numOfExercises: EXERCISES_PER_TOPIC,
        testLexemes: lexemes,
        challenges: challengeDefinitions,
      });
    })
    .flat();

  /**
   * This shuffle should be done differently.
   * Technically the generateExerciseStack method creates a "smart" stack
   * but because we're doing things based on the topic, we have to re-shuffle
   * here
   */
  res.status(200).json({
    exercises: shuffle(generatedExercises),
    currentLevelId: levelId,
    nextLevelId,
  });
}
