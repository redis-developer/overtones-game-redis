import React from "react";
import styled from "styled-components";
import { getRandomInt } from "utils/notation";
import Text from "components/text";

const StyledLevelFinished = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 20px 0;

  div,
  * {
    text-align: center;
  }
`;

const Monster = styled.img`
  width: 200px;
  max-width: 50%;
  display: inline-block;
  margin-bottom: 40px;
`;

export const LevelFinishedOverlay = ({ levelId, score }) => {
  const monsterId = getRandomInt(1, 11);

  return (
    <StyledLevelFinished>
      <div>
        <Monster src={`/monsters/monster-${monsterId}.svg`} />

        <Text variant="title">You finished level {levelId} 🎉</Text>

        <Text>
          Well done! So far, you have earned {score} points! Keep going to climb
          up the leaderboard!
        </Text>

        <Text>Click below to start the next level</Text>
      </div>
    </StyledLevelFinished>
  );
};
