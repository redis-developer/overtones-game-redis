import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { getRandomInt } from "utils/notation";
import {
  Exercise,
  ChallengeType,
  ListenAndSelectExercise,
  TranscribeExercise,
} from "lib/types";
import { Validation } from "lib/validate-guess";

import ListenAndSelect from "./listen-and-select";
import Transcribe from "./transcribe";

interface Props {
  autoPlay: boolean;
  exercise: Exercise;
  guess: number[] | string[];
  onUpdateGuess: (guess: number[] | string[]) => void;
  onUpdateMeta: (meta: any) => void;
  answerValidation: Validation;
}

const StyledChallengeView = styled.div`
  padding: 0 ${({ theme }) => theme.sizes.s};
`;

const CustomHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-top: ${theme.sizes.s};
    margin-bottom: ${theme.sizes.s};

    ${theme.media.md`
      margin-top: ${theme.sizes.m};
      margin-bottom: ${theme.sizes.m};
    `}
  `}
`;

const Monster = styled.img`
  ${({ theme }) => css`
    width: 40px;
    height: 40px;
    margin-right: 1rem;

    ${theme.media.md`
  width: 100px;
  height: 100px;

  `}
  `}
`;

const Bubble = styled.div`
  ${({ theme }) => css`
    justify-self: flex-start;

    font-size: 0.85rem;
    font-weight: bold;
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius};
    position: relative;
    box-shadow: 0px 2px 0px #f6f6f6;

    ${({ theme }) => css`
      padding: ${theme.sizes.xs};

      ${theme.media.md`
        font-size: 1rem;
    padding: ${theme.sizes.s};
      `}
    `}

    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      width: 0;
      height: 0;
      border: 0.5rem solid transparent;
      border-right-color: ${theme.colors.white};
      border-left: 0;
      margin-top: -0.5rem;
      margin-left: -0.5rem;
    }
  `}
`;

const ChallengeView: React.FC<Props> = ({
  exercise,
  guess,
  onUpdateGuess,
  onUpdateMeta,
  answerValidation,
  autoPlay,
}) => {
  const [monsterId, setMonsterId] = useState(getRandomInt(1, 11));

  useEffect(() => {
    setMonsterId(getRandomInt(1, 11));
  }, [exercise._id]);

  const renderExercise = () => {
    const sharedProps = {
      guess,
      onUpdateGuess,
      answerValidation,
      autoPlay,
    };

    if (exercise.type === ChallengeType.ListenAndSelect) {
      return (
        <ListenAndSelect
          exercise={exercise as ListenAndSelectExercise}
          onUpdateMeta={onUpdateMeta}
          {...sharedProps}
        />
      );
    }

    if (exercise.type === ChallengeType.Transcribe) {
      return (
        <Transcribe
          exercise={exercise as TranscribeExercise}
          onUpdateMeta={onUpdateMeta}
          {...sharedProps}
        />
      );
    }

    return <b>unknown challenge type</b>;
  };

  return (
    <StyledChallengeView>
      <CustomHeading>
        <Monster
          key={exercise._id}
          src={`/monsters/monster-${monsterId}.svg`}
        />{" "}
        <Bubble>{exercise.prompt}</Bubble>
      </CustomHeading>

      {renderExercise()}
    </StyledChallengeView>
  );
};

export default ChallengeView;
