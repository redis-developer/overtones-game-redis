import React from "react";
import styled, { css } from "styled-components";
import Hearts from "components/hearts-monitor";
import Score from "components/score-monitor";

const GameLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Head = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 50px;
    margin: ${theme.sizes.xs} 0;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${theme.sizes.xs};

    ${theme.media.md`
      margin: ${theme.sizes.m} 0;
    `}
  `}
`;

const HeadContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuitButtonContainer = styled.div`
  flex: 1;
`;
const QuitButton = styled.button`
  ${({ theme }) => css`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    border: 2px solid #a0a0a0;
    color: #a0a0a0;
    transition: all 0.15s ease;
    cursor: pointer;
    outline: none;

    &:hover {
      border-color: ${theme.colors.neutral};
      color: ${theme.colors.neutral};
    }
  `}
`;

const HeartsContainer = styled.div`
  flex: 1;
  text-align: center;
`;
const ScoreContainer = styled.div`
  flex: 1;
  text-align: right;
`;

const Body = styled.div`
  width: 100%;
  height: calc(100vh - 50px - 60px - 100px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const BodyContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Layout = ({ children, onQuit, score, hearts }) => (
  <GameLayout>
    <Head>
      <HeadContainer>
        <QuitButtonContainer>
          <QuitButton onClick={onQuit}>
            <i className="fas fa-pause" />
          </QuitButton>
        </QuitButtonContainer>
        <HeartsContainer>
          <Hearts current={hearts} />
        </HeartsContainer>
        <ScoreContainer>
          <Score score={score} />
        </ScoreContainer>
      </HeadContainer>
    </Head>

    <Body>
      <BodyContainer>{children}</BodyContainer>
    </Body>
  </GameLayout>
);

export default Layout;
