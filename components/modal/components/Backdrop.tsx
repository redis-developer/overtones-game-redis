import styled, { css } from "styled-components";
import { addAlpha } from "lib/uikit/utils";

const StyledModalBackdrop = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${addAlpha(theme.colors.neutral, 0.5)};
    padding: ${theme.sizes.s};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
  `}
`;

export default StyledModalBackdrop;
