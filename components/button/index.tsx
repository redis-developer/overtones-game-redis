import * as React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled, { useTheme, css } from "styled-components";
import { withSpace } from "lib/uikit/utils";
import type { WithSpaceProps } from "lib/uikit/utils";
import { ButtonColor, ButtonSize } from "lib/uikit/types";
import Theme from "lib/uikit/types/theme";
import { getSymbolForKey } from "lib/uikit/lib";

export interface ButtonSolidProps
  extends WithSpaceProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;

  loading?: boolean;
  loadingText?: string;
  countdown?: number;

  icon?: string;
  shortcut?: string;
}

const KeyIndicator = styled.div<{ disabled: boolean }>`
  ${({ theme, disabled }) => css`
    width: ${theme.sizes.l};
    height: ${theme.sizes.l};
    margin-right: ${theme.sizes.xs};
    border: 2px solid ${theme.colors.neutralL5};
    background: ${theme.colors.neutralL5};
    border-radius: ${theme.borderRadius};
    color: ${theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${theme.transition()};
    display: none;

    ${disabled &&
    css`
      background: ${theme.colors.neutralL20};
      border-color: ${theme.colors.neutralL20};
    `}

    ${theme.media.md`
      display: flex;
    `}
  `}
`;

const StyledButtonSolid = styled.button<ButtonSolidProps>`
  ${({
    theme,
    loading,
    color = ButtonColor.Primary,
    size = ButtonSize.Default,
  }) => css`
    border: none;
    border-radius: ${theme.borderRadius};
    box-shadow: none;
    min-width: ${theme.sizes.xxl};
    height: ${theme.sizes.xl};
    padding: 0 ${theme.sizes.m};
    font-size: ${theme.fontSizes.small};
    font-weight: ${theme.fontWeights.bold};
    cursor: pointer;
    transition: ${theme.transition()};
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    ${withSpace};

    ${size === ButtonSize.Large &&
    css`
      height: ${theme.sizes.xxl};
      padding: 0 ${theme.sizes.l};
    `}

    ${size === ButtonSize.Small &&
    css`
      height: ${theme.sizes.l};
      padding: 0 ${theme.sizes.s};
    `}

    &:focus {
      outline: none;
    }
    &:disabled {
      pointer-events: none;
    }

    background-color: ${theme.colors[color]};
    color: ${theme.colors.white};

    * {
      color: ${theme.colors.white};
    }

    ${color === ButtonColor.Accent &&
    css`
      color: ${theme.colors.text.default};

      * {
        color: ${theme.colors.text.default};
      }
    `}

    &:hover {
      box-shadow: ${theme.boxShadow.hard(theme.colors[color])};
    }

    &:focus {
      box-shadow: ${theme.boxShadow.hard(theme.colors[color])};
    }

    &:active {
      background-color: ${theme.colors[color]};
    }

    &:disabled {
      background-color: ${theme.colors.neutralL10};
      color: ${theme.colors.text.muted};
      pointer-events: none;
      * {
        color: ${theme.colors.text.muted};
      }
    }

    ${loading &&
    css`
      background-color: ${theme.colors.neutralL10};
      color: ${theme.colors.text.muted};
      pointer-events: none;

      &:focus {
        box-shadow: none;
      }

      * {
        color: ${theme.colors.text.muted};
      }
    `}
  `}
`;

const CountdownContainer = styled.span`
  margin-left: ${({ theme }) => theme.sizes.xs};
`;
const ButtonSolid: React.FC<ButtonSolidProps> = ({
  children,
  onClick,
  countdown,
  shortcut,
  ...rest
}: any) => {
  const theme = useTheme() as Theme;
  const { loading, loadingText } = rest;

  return (
    <StyledButtonSolid onClick={(!loading && onClick) || undefined} {...rest}>
      {loading ? (
        loadingText || "Loading..."
      ) : (
        <>
          {shortcut ? (
            <KeyIndicator disabled={rest.disabled}>
              {getSymbolForKey(shortcut)}
            </KeyIndicator>
          ) : null}
          {children}
        </>
      )}

      {countdown ? (
        <CountdownContainer>
          <CountdownCircleTimer
            isPlaying
            duration={countdown}
            colors={theme.colors.greenL10}
            trailColor={theme.colors.greenL30}
            size={24}
            strokeWidth={4}
          />
        </CountdownContainer>
      ) : null}
    </StyledButtonSolid>
  );
};

export default ButtonSolid;
