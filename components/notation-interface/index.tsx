import React, { useState } from "react";
import styled, { css } from "styled-components";
import ButtonOutline from "components/button-outline";
import useDetectKeySequence from "hooks/use-detect-key-sequence";
import { renderMusical } from "lib";
import { NotationVariant } from "lib/types";
import { intervalTokens, noteTokens } from "./notationInterfaceConfigs";
export { intervalShortcuts, noteShortcuts } from "./notationInterfaceConfigs";

interface NotationInterfaceProps {
  variant: NotationVariant;
  selectedTokens?: string[];
  disableSelected?: boolean;
  disableAll?: boolean;
  onSelect: (token: string) => void;
}

const StyledRow = styled.div<{ show?: boolean }>`
  ${({ theme, show }) => css`
    display: none;
    grid-template-columns: repeat(16, minmax(${theme.sizes.s}, 1.5rem));
    grid-gap: ${theme.sizes.xxs};
    margin-bottom: ${theme.sizes.xs};

    ${theme.media.md`
      grid-gap: ${theme.sizes.s};
      margin-bottom: ${theme.sizes.s};
    `}

    ${show &&
    css`
      display: grid;
    `}

    &.highlighted {
      button {
        box-shadow: ${theme.boxShadow.hard(theme.colors.yellow)};
        border-color: ${theme.colors.yellow};
      }
    }
  `}
`;

const GapWhole = styled.div`
  grid-column: span 2;
`;

const TapToken = styled.button`
  ${({ theme, disabled }) => css`
    grid-column: span 2;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: calc(100% - ${theme.sizes.xxs});
    border: none;
    position: relative;
    cursor: pointer;
    transition: all 0.1s ease;
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius};
    box-shadow: 0px 2px 0px #c9c9c9;

    &:hover {
      box-shadow: 0px 4px 0px #c9c9c9;
    }

    &:active {
      box-shadow: 0px 0px 0px #c9c9c9;
    }

    &.active {
      box-shadow: 0px 0px 0px ${theme.colors.neutralL10};
    }

    &:focus {
      outline: none;
    }

    label {
      background: transparent;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: ${theme.fontSizes.xsmall};

      ${theme.media.md`
        font-size: ${theme.fontSizes.body};
      `}
    }

    ${disabled &&
    css`
      pointer-events: none;
      color: ${theme.colors.text.default};
    `}
  `}
`;

const ToggleContainer = styled.div`
  text-align: center;
  width: 100%;
  ${({ theme }) => css`
    margin-top: ${theme.sizes.s};

    ${theme.media.md`
    margin-top: ${theme.sizes.m};

    `}
  `}
`;

interface TokenProps {
  label: string;
  onClick: VoidFunction;
  disabled: boolean;
  variant: NotationInterfaceProps["variant"];
}
const Token: React.FC<TokenProps> = ({ label, onClick, disabled, variant }) => {
  useDetectKeySequence(label, onClick, variant === NotationVariant.Intervals);

  return (
    <TapToken id={`token-${label}`} onClick={onClick} disabled={disabled}>
      <label>{renderMusical(label)}</label>
    </TapToken>
  );
};

const NotationInterface: React.FC<NotationInterfaceProps> = ({
  variant,
  onSelect,
  disableAll,
}) => {
  const [showAlt, setShowAlt] = useState(false);
  const tokens =
    variant === NotationVariant.Intervals ? intervalTokens : noteTokens;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {Object.keys(tokens).map((row, rowIndex) => {
        const x = tokens[row];
        const show =
          x.alwaysVisible || (!showAlt && !x.isAlt) || (showAlt && x.isAlt);

        return (
          <StyledRow id={`notation-row-${row}`} key={rowIndex} show={show}>
            {x.intervals.map((token: string, index: number) => {
              if (token === "h") {
                return <div key={`${rowIndex}-${index}`} />;
              }
              if (token === "g") {
                return <GapWhole key={`${rowIndex}-${index}`} />;
              }

              return (
                <Token
                  key={`${rowIndex}-${index}`}
                  label={token}
                  onClick={() => onSelect(token)}
                  disabled={disableAll}
                  variant={variant}
                />
              );
            })}
          </StyledRow>
        );
      })}

      <ToggleContainer>
        <ButtonOutline shortcut={"Alt"} onClick={() => setShowAlt((ca) => !ca)}>
          Toggle {renderMusical(showAlt ? "#/b" : "x/bb")}
        </ButtonOutline>
      </ToggleContainer>
    </div>
  );
};

export default NotationInterface;
