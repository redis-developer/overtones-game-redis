import React, { useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getRandomInt } from "utils/notation";
import Button from "components/button";
import ButtonText from "components/button-text";
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

export const GameFinishedOverlay = ({
  levelId,
  score,
  newRank,
  totalPlayers,
}) => {
  const router = useRouter();
  const monsterId = useRef(getRandomInt(1, 11));

  return (
    <StyledLevelFinished>
      <div>
        <Monster src={`/monsters/monster-${monsterId.current}.svg`} />
        <Text variant="title">You finished the game!</Text>
        <Text>
          Amazing. You've made it up to level <b>{levelId}</b> with a score of{" "}
          <b>{score}</b>!
        </Text>
        <Text>
          Your new rank is <b>{newRank}</b> out of <b>{totalPlayers}</b> players
          world wide.
        </Text>

        <Button onClick={() => window.location.reload()}>Play again!</Button>
        <br />
        <br />
        <ButtonText onClick={() => router.push("/home")}>Go home</ButtonText>
      </div>
    </StyledLevelFinished>
  );
};
