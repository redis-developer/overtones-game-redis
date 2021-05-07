import React from "react";
import styled, { css } from "styled-components";
import { AnswerState } from "lib/uikit";
import Button from "components/button";
import { ContinueButtonProps } from "hooks/use-exercise";

interface FooterProps {
  state: AnswerState;
  continueButtonProps: ContinueButtonProps;
}

const StyledFooter = styled.div<{ state: AnswerState }>`
  ${({ theme, state }) => css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    border-top: 2px solid ${theme.colors.neutralL10};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${theme.transition()};

    ${theme.media.md`
      height: 100px;
      padding: ${theme.sizes.s};
    `}

    ${state === AnswerState.Correct &&
    css`
      border-color: ${theme.colors.green};
      background: ${theme.colors.greenL30};
    `}

    ${state === AnswerState.Incorrect &&
    css`
      border-color: ${theme.colors.red};
      background: ${theme.colors.redL30};
    `}
  `}
`;

const Footer: React.FC<FooterProps> = ({
  state = AnswerState.Idle,
  continueButtonProps,
}) => (
  <StyledFooter state={state}>
    <Button {...continueButtonProps}>{continueButtonProps.label}</Button>
  </StyledFooter>
);

export default Footer;
