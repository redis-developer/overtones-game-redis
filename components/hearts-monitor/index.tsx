import React from "react";
import styled, { css, keyframes } from "styled-components";
import Icon from "components/icon";

const heartbeat = keyframes`
0%
  {
    transform: scale( .95 );
  }
  20%
  {
    transform: scale( 1 );
  }
  40%
  {
    transform: scale( .95 );
  }
  60%
  {
    transform: scale( 1 );
  }
  80%
  {
    transform: scale( .95 );
  }
  100%
  {
    transform: scale( .95 );
  }
`;

const HeartsContainer = styled.div`
  i {
    margin-right: 4px;
    animation: ${heartbeat} 7s ease-in-out infinite;

    &:nth-of-type(1) {
      animation-delay: 0.3s;
    }
    &:nth-of-type(2) {
      animation-delay: 0.9s;
    }
    &:nth-of-type(3) {
      animation-delay: 1.5s;
    }

    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.danger};

    ${({ theme }) => css`
      ${theme.media.md`
        font-size: 2rem;
      `}
    `}
  }
`;

const Index = ({ current = 3 }) => (
  <HeartsContainer>
    {new Array(current).fill(1).map((_, heart) => (
      <Icon key={heart} className="fas fa-heart" />
    ))}
  </HeartsContainer>
);

export default Index;
