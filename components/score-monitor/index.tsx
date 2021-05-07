import React from "react";
import CountUp from "react-countup";
import styled, { css } from "styled-components";

const Score = styled.div`
  font-weight: bold;

  i {
    margin-right: ${({ theme }) => theme.sizes.xs};
    color: ${({ theme }) => theme.colors.warning};
  }

  i.fa-fire {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const Badge = styled.div`
  ${({ theme }) => css`
    display: inline-block;
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.neutralL5};
    padding: 4px 8px;
  `}
`;

const Index = ({ score }) => <Score>
  {/*<Badge>
    <i className="fas fa-fire" />
    <CountUp duration={0.45} decimal="." end={streaks || 0} />
  </Badge>
  */}
  <Badge>
    <i className="fas fa-star" />
    <CountUp duration={0.45} decimal="." end={score || 0} />
  </Badge>
</Score>;

export default Index;
