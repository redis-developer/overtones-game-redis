import * as React from "react";
import styled, { css } from "styled-components";
import { withSpace } from "lib/uikit/utils";
import type { WithSpaceProps } from "lib/uikit/utils";
import useKeyDown from "hooks/use-key-down";
import { getSymbolForKey } from "lib/uikit/lib";

export interface ButtonOutlineProps
  extends WithSpaceProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut?: string;
}

const StyledButtonOutline = styled.button<ButtonOutlineProps>`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border: 2px solid ${theme.colors.neutralL10};
    border-radius: ${theme.borderRadius};
    box-shadow: none;
    min-width: ${theme.sizes.xxl};
    height: ${theme.sizes.xl};
    padding: 0 ${theme.sizes.m};
    font-size: ${theme.fontSizes.small};
    font-weight: ${theme.fontWeights.bold};
    cursor: pointer;
    color: ${theme.colors.text.muted};
    transition: ${theme.transition()};
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    ${withSpace};

    &:focus {
      outline: none;
    }

    &:disabled {
      pointer-events: none;
    }

    &:disabled {
      background-color: ${theme.colors.neutralL10};
      color: ${theme.colors.text.muted};
      pointer-events: none;
      * {
        color: ${theme.colors.text.muted};
      }
    }
  `}
`;

const KeyIndicator = styled.div`
  ${({ theme }) => css`
    height: ${theme.sizes.l};
    padding: 0 ${theme.sizes.xxs};
    margin-right: ${theme.sizes.xs};
    border: 2px solid ${theme.colors.neutralL10};
    background: transparent;
    border-radius: ${theme.borderRadius};
    color: ${theme.colors.text.muted};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${theme.transition()};
    display: none;

    ${theme.media.md`
      display: flex;
    `}
  `}
`;

const ButtonOutline: React.FC<ButtonOutlineProps> = ({
  children,
  onClick,
  shortcut,
  ...rest
}: any) => {
  useKeyDown(shortcut, onClick);

  return (
    <StyledButtonOutline onClick={onClick || undefined} {...rest}>
      {shortcut ? (
        <KeyIndicator>{getSymbolForKey(shortcut)}</KeyIndicator>
      ) : null}
      {children}
    </StyledButtonOutline>
  );
};

export default ButtonOutline;
