import React from "react";
import styled, { css } from "styled-components";
import { AnswerState } from "lib/uikit";
import SolutionBox from "components/solution-box";
import { Validation } from "lib/validate-guess";

interface SolutionBoxGroup {
  guesses: string[] | number[];
  answerValidation: Validation;
  fixedStructure?: string[];
  onClick: (index: number) => void;
  correctIndices: string[] | number[];
  mb?: string | number;
}

export const Row = styled.div<{ mb?: string | number; boxes: number }>`
  ${({ theme, boxes, mb = 0 }) => css`
    display: grid;
    grid-template-columns: repeat(${boxes}, minmax(${theme.sizes.s}, 2rem));
    grid-gap: ${theme.sizes.xxs};

    ${({ theme }) => theme.media.md`
      grid-gap: ${theme.sizes.s};
    `}

    margin-bottom: ${mb === 0 ? 0 : theme.sizes[mb]};
  `}
`;

const SolutionBoxGroup: React.FC<SolutionBoxGroup> = ({
  guesses,
  answerValidation,
  fixedStructure,
  onClick,
  correctIndices,
  mb,
}) => {
  const renderGuess = (guessIndex: number, correctSolutionIndex: number) => (
    <SolutionBox
      key={`solution-${guessIndex}`}
      value={guesses[guessIndex]}
      disabled={answerValidation.hasValidated}
      state={
        answerValidation.hasValidated
          ? guesses[guessIndex] === correctIndices[guessIndex]
            ? AnswerState.Correct
            : AnswerState.Incorrect
          : AnswerState.Idle
      }
      onClick={() => onClick(guessIndex)}
      hint={{
        visible:
          answerValidation.hasValidated &&
          !answerValidation.isCorrect &&
          guesses[guessIndex] !== correctIndices[guessIndex],
        label: correctIndices[guessIndex],
      }}
    />
  );

  const renderContent = () => {
    if (fixedStructure) {
      let guessIndex = 0;
      return fixedStructure.map((staticValue, i) => {
        if (staticValue === "<tap>") {
          guessIndex += 1;
          return renderGuess(guessIndex - 1, i);
        }

        return (
          <SolutionBox
            staticValue
            key={`solution-static-${i}`}
            value={staticValue}
          />
        );
      });
    }

    return Array(correctIndices.length)
      .fill(1)
      .map((_, i) => renderGuess(i, i));
  };

  return (
    <Row mb={mb} boxes={fixedStructure.length}>
      {renderContent()}
    </Row>
  );
};

export default SolutionBoxGroup;
