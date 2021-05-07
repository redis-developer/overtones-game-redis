import React from "react";
import styled from "styled-components";
import { getRandomInt } from "utils/notation";
import Button from "components/button";
import Text from "components/text";

const StyledLevelFinished = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
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

export const GameOverOverlay = () => {
  const monsterId = getRandomInt(1, 11);

  return (
    <StyledLevelFinished>
      <div>
        <Monster src={`/monsters/monster-${monsterId}.svg`} />
        <Text variant="title">Game over...</Text>
        <Text>
          Unfortunately, you've lost all your hearts. Better luck next time!
        </Text>

        <Button onClick={() => window.location.reload()}>Go again!</Button>
      </div>
    </StyledLevelFinished>
  );
};
