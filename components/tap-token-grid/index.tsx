import React from "react";
import styled, { css } from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.sizes.xs};

  ${({ theme }) => css`
    grid-template-columns: repeat(2, 1fr);

    ${theme.media.md`
      grid-template-columns: repeat(1, 1fr);
    `}
  `}
`;

const TapTokenGrid = ({ children }) => <Grid>{children}</Grid>;

export default TapTokenGrid;
