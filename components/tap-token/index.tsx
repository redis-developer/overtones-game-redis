import React from "react";
import styled, { css } from "styled-components";
import { TapTokenState } from "lib/uikit/types";
import useKeyDown from "hooks/use-key-down";

interface TapTokenProps {
  label: string;
  shortcut: string;
  state?: TapTokenState;
  onClick: VoidFunction;
  disabled: boolean;
}

const KeyIndicator = styled.div`
  ${({ theme }) => css`
    width: ${theme.sizes.l};
    height: ${theme.sizes.l};
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

const StyledTapToken = styled.button<Pick<TapTokenProps, "state">>`
  ${({ theme, state, disabled }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${theme.sizes.xl};
    padding: 0 ${theme.sizes.m};
    margin-bottom: ${theme.sizes.xs};
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius};
    border: none;
    font-size: ${theme.fontSizes.body};
    color: ${theme.colors.text.default};
    transition: ${theme.transition()};
    cursor: pointer;
    user-select: none;
    box-shadow: 0px 2px 0px #c9c9c9;

    &:hover {
      box-shadow: 0px 4px 0px #c9c9c9;
    }

    &:active {
      box-shadow: 0px 0px 0px #c9c9c9;
    }

    ${theme.media.md`
      height: ${theme.sizes.xxl};
    `}

    &:focus {
      outline: none;
    }

    ${state === TapTokenState.Active &&
    css`
      border-color: ${theme.colors.blue};
      color: ${theme.colors.blue};
      box-shadow: ${theme.boxShadow.default};

      ${KeyIndicator} {
        border-color: ${theme.colors.blue};
        color: ${theme.colors.blue};
      }
    `}

    ${state === TapTokenState.Correct &&
    css`
      border-color: ${theme.colors.green};
      color: ${theme.colors.green};
      box-shadow: ${theme.boxShadow.default};
      pointer-events: none;

      ${KeyIndicator} {
        border-color: ${theme.colors.green};
        color: ${theme.colors.green};
      }
    `}

    ${state === TapTokenState.Incorrect &&
    css`
      border-color: ${theme.colors.red};
      color: ${theme.colors.red};
      box-shadow: ${theme.boxShadow.default};
      pointer-events: none;

      ${KeyIndicator} {
        border-color: ${theme.colors.red};
        color: ${theme.colors.red};
      }
    `}


    ${disabled &&
    css`
      cursor: default;
      pointer-events: none;
    `}
  `}
`;

const Label = styled.span`
  flex: 1;
`;

const TapToken: React.FC<TapTokenProps> = ({
  shortcut,
  label,
  state = TapTokenState.Idle,
  onClick,
  disabled,
}) => {
  useKeyDown(shortcut, onClick);

  return (
    <StyledTapToken state={state} onClick={onClick} disabled={disabled}>
      <KeyIndicator>{shortcut}</KeyIndicator>
      <Label>{label}</Label>
    </StyledTapToken>
  );
};

export default TapToken;
