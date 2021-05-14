import React, { useRef } from "react";
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
    max-width: 400px;
  }
`;

const Monster = styled.img`
  width: 200px;
  max-width: 50%;
  display: inline-block;
  margin-bottom: 40px;
`;

export const GameOverOverlay = ({
  score,
  newRank,
  prevRank,
  newHighScore,
  prevHighScore,
  totalPlayers,
  loading,
}) => {
  const monsterId = useRef(getRandomInt(1, 11));

  return (
    <StyledLevelFinished>
      <div>
        <Monster src={`/monsters/monster-${monsterId.current}.svg`} />

        {loading ? (
          <>
            <Text>Saving your progress...</Text>
          </>
        ) : (
          <>
            {newHighScore > prevHighScore ? (
              <>
                <Text variant="title">New personal best!</Text>

                <Text>
                  Congratulations, you've set a new high score of{" "}
                  <b>{newHighScore}</b> for yourself! That is{" "}
                  {newHighScore - prevHighScore} points more than before. Keep
                  going!
                </Text>

                <Text>
                  You are now ranking on place <b>{newRank}</b> out of{" "}
                  <b>{totalPlayers}</b> players worldwide. You previously ranked
                  on place {prevRank}.
                </Text>
              </>
            ) : (
              <>
                <Text variant="title">Score: {score}</Text>

                <Text>
                  You managed to get <b>{score}</b> points. Your last high score
                  was {prevHighScore}. Can you beat it?
                </Text>

                <Text>
                  You are ranking on place <b>{newRank}</b> out of{" "}
                  <b>{totalPlayers}</b> players worldwide.
                </Text>
              </>
            )}
          </>
        )}

        <Button onClick={() => window.location.reload()}>Go again!</Button>
        <br />
        <ButtonText onClick={() => window.location.replace("/home")}>
          Go back home
        </ButtonText>
      </div>
    </StyledLevelFinished>
  );
};
