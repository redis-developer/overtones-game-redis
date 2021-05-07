import { v5 as uuidv5 } from "uuid";
import { Focus, ListenAndSelect, ListenAndSelectExercise } from "lib/types";
import generateModeNotation from "utils/notation-engine";
import { shuffle } from "utils/array";

import { ChallengeInput, HARMONIC_NAMESPACE } from "./shared";

const generateListenAndSelect = ({
  challenge,
  forLexeme,
  settings,
}: ChallengeInput<
  ListenAndSelect,
  ListenAndSelectExercise["settings"]
>): ListenAndSelectExercise => {
  const notation = generateModeNotation({
    intervalStructure: forLexeme.intervalStructure,
    bpm: settings.tempo,
    noteLength: settings.noteLength || "q",
    direction: settings.direction,
    useMotive: settings.motive,
  });

  const idParams = [
    challenge._id,
    forLexeme._id,
    Focus.Listen,
    challenge.type,
    settings.direction,
    settings.motive,
  ];

  const choices = shuffle([
    forLexeme,
    ...settings.shuffledChoices
      .filter((c) => c._id !== forLexeme._id)
      .slice(0, 3),
  ]);

  const correctIndex = choices.findIndex(
    (lexeme) => lexeme._id === forLexeme._id
  );

  return {
    _id: uuidv5(JSON.stringify(idParams), HARMONIC_NAMESPACE),
    challengeId: challenge._id,
    lexemeId: forLexeme._id,
    focus: Focus.Listen,
    type: challenge.type,
    prompt: `Which ${challenge.topic} do you hear?`,
    choices: choices.map((lexeme) =>
      lexeme.names ? lexeme.names[0] : lexeme.name
    ),
    correctIndices: [correctIndex],
    notation,
    settings,
  };
};

export default generateListenAndSelect;
