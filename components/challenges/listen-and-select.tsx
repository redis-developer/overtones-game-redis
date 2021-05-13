import React from "react";

import { ListenAndSelectExercise } from "lib/types";
import { TapTokenState } from "lib/uikit/types";
import TapToken from "components/tap-token";
import TapTokenGrid from "components/tap-token-grid";
import { Validation } from "lib/validate-guess";
import PlaybackButtons from "components/playback-buttons";
import { Split, Top, Bottom } from "./shared";

interface Props {
  exercise: ListenAndSelectExercise;
  guess: number[] | string[];
  onUpdateGuess: (guess: number[] | string[]) => void;
  onUpdateMeta: (meta: any) => void;
  answerValidation: Validation;
  autoPlay: boolean;
}

const getTokenState = (
  hasValidated: boolean,
  isSelected: boolean,
  index: number,
  correctIndices: number[]
) => {
  // not validated
  if (!hasValidated) {
    return isSelected ? TapTokenState.Active : TapTokenState.Idle;
  }

  // is selected and validated, check whether it's correct
  if (isSelected) {
    return index === correctIndices[0]
      ? TapTokenState.Correct
      : TapTokenState.Incorrect;
  }

  // highlight the correct item if the selected one wasn't right
  return index === correctIndices[0]
    ? TapTokenState.Correct
    : TapTokenState.Idle;
};

const ListenAndIdentify: React.FC<Props> = ({
  exercise,
  guess = [],
  onUpdateGuess,
  onUpdateMeta,
  answerValidation,
  autoPlay,
}) => {
  return (
    <Split>
      <Top>
        <PlaybackButtons
          key={exercise._id}
          id={exercise._id}
          notation={exercise.notation}
          onCounterUpdated={(counter) => onUpdateMeta(counter)}
          autoPlay={autoPlay}
        />
      </Top>

      <Bottom>
        <TapTokenGrid>
          {exercise.choices.map((choice, index) => (
            <TapToken
              key={choice}
              label={choice}
              shortcut={(index + 1).toString()}
              onClick={() => onUpdateGuess([index])}
              disabled={answerValidation.hasValidated}
              state={getTokenState(
                answerValidation.hasValidated,
                index === guess[0],
                index,
                exercise.correctIndices
              )}
            />
          ))}
        </TapTokenGrid>
      </Bottom>
    </Split>
  );
};

export default ListenAndIdentify;
