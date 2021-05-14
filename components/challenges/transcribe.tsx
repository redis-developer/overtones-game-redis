import React from "react";
import styled from "styled-components";
import { TranscribeExercise, NotationVariant } from "lib/types";
import { Validation } from "lib/validate-guess";
import PlaybackButtons from "components/playback-buttons";
import SolutionBoxGroup from "components/solution-box-group";
import NotationInterface from "components/notation-interface";
import { useKeyDown } from "hooks";
import { Split, Top, Bottom } from "./shared";

interface Props {
  exercise: TranscribeExercise;
  guess: number[] | string[];
  onUpdateGuess: (guess: number[] | string[]) => void;
  onUpdateMeta: (meta: any) => void;
  answerValidation: Validation;
  autoPlay: boolean;
}

const Divider = styled.hr`
  width: 50%;
  border: none;
  border-top: 2px solid ${({ theme }) => theme.colors.neutralL10};
  margin: 24px 0;
  align-self: center;
`;

const ListenAndIdentify: React.FC<Props> = ({
  exercise,
  guess = [],
  onUpdateGuess,
  onUpdateMeta,
  answerValidation,
  autoPlay,
}) => {
  useKeyDown("Backspace", () =>
    onUpdateGuess(guess.slice(0, guess.length - 1))
  );

  const removeUpToIndex = (index: number) =>
    onUpdateGuess(guess.slice(0, index));

  const useIntervals = exercise.settings.variant === NotationVariant.Intervals;

  return (
    <Split>
      <Top style={{ marginBottom: "0" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PlaybackButtons
            inline
            id={exercise._id}
            key={exercise._id}
            notation={exercise.notation}
            onCounterUpdated={(counter) => onUpdateMeta(counter)}
            mb="m"
            autoPlay={autoPlay}
          />

          <SolutionBoxGroup
            guesses={guess}
            correctIndices={exercise.correctIndices}
            fixedStructure={exercise.structure}
            answerValidation={answerValidation}
            onClick={(index) => removeUpToIndex(index)}
          />
        </div>
      </Top>

      <Divider />

      <Bottom>
        <NotationInterface
          variant={
            useIntervals ? NotationVariant.Intervals : NotationVariant.Notes
          }
          onSelect={(token) => onUpdateGuess([...guess, token] as string[])}
          disableAll={guess.length === exercise.correctIndices.length}
        />
      </Bottom>
    </Split>
  );
};

export default ListenAndIdentify;
