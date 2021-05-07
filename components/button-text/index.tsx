import React from "react";
import styled, { css } from "styled-components";
import { addAlpha, withSpace } from "lib/uikit/utils";
import type { WithSpaceProps } from "lib/uikit/utils";

export interface ButtonTextProps
  extends WithSpaceProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "danger";
  icon?: string;
}

export const Icon = styled.i`
  margin-right: ${({ theme }) => theme.sizes.xs};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const StyledButtonText = styled.button<ButtonTextProps>`
  ${({ theme, color = "primary" }) => css`
    border: none;
    border-radius: ${theme.borderRadius};
    box-shadow: none;
    height: ${theme.sizes.xl};
    padding: 0 ${theme.sizes.s};
    font-size: ${theme.fontSizes.body};
    font-weight: 600;
    cursor: pointer;
    transition: ${theme.transition()};
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    background-color: transparent;
    color: ${theme.colors.primary};
    box-shadow: none;
    border: 1px solid transparent;
    border-radius: 0;
    min-width: 0;
    padding: 0;

    ${withSpace};

    &:hover {
      color: ${theme.colors.primary};
      box-shadow: none;
      border-bottom: 1px solid ${theme.colors.primary};
    }

    &:focus {
      color: ${theme.colors.primary};
      box-shadow: none;
      border-bottom: 1px solid ${theme.colors.primary};
    }

    &:active {
      color: ${theme.colors.primary};
      box-shadow: none;
      border-bottom: 1px solid ${theme.colors.primary};
    }

    &:disabled {
      background: transparent;
      color: ${addAlpha(theme.colors.primary, 0.5)};
      box-shadow: none;
    }

    ${color === "danger" &&
    css`
      color: ${theme.colors.danger};

      &:hover {
        color: ${theme.colors.danger};
        border-bottom: 1px solid ${theme.colors.danger};
      }

      &:focus {
        color: ${theme.colors.danger};
        border-bottom: 1px solid ${theme.colors.danger};
      }

      &:active {
        color: ${theme.colors.danger};
        border-bottom: 1px solid ${theme.colors.danger};
      }

      &:disabled {
        color: ${addAlpha(theme.colors.danger, 0.5)};
      }
    `}
  `}
`;

const ButtonText: React.FC<ButtonTextProps> = ({ children, icon, ...rest }) => (
  <StyledButtonText {...rest}>
    {icon ? <Icon className={icon} /> : null} {children}
  </StyledButtonText>
);

export default ButtonText;
