import React, { useState } from "react";
import { usePopper } from "react-popper";
import styled, { css } from "styled-components";
import { renderMusical } from "lib";
import { AnswerState } from "lib/uikit";

interface SolutionBoxProps {
  value?: string | number;
  disabled?: boolean;
  staticValue?: boolean;
  state?: AnswerState;
  onClick?: VoidFunction;
  hint?: {
    visible: boolean;
    label: string | number;
  };
}

const StyledSolutionBox = styled.button<{
  disabled: boolean;
  hasValue: boolean;
  state: AnswerState;
}>`
  ${({ theme, disabled, hasValue, state }) => css`
    width: 100%;
    border: none;
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.neutralL10};
    background: ${theme.colors.neutralL10};
    transition: ${theme.transition()};
    padding-top: calc(100% - 4px);
    position: relative;
    box-shadow: 0px 2px 0px #c9c9c9;

    &:focus {
      outline: none;
    }

    label {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${theme.fontSizes.xsmall};

      ${theme.media.md`
        font-size: ${theme.fontSizes.body};
      `}
    }

    ${hasValue &&
    css`
      background: ${theme.colors.white};
      cursor: pointer;
      border: 1px dashed ${theme.colors.blue};

      * {
        cursor: pointer;
      }
    `}

    ${disabled &&
    css`
      pointer-events: none;
      cursor: default;
      border: none;

      * {
        pointer-events: none;
        cursor: default;
        color: ${theme.colors.text.default};
      }
    `}

    ${state === AnswerState.Correct &&
    css`
      background: ${theme.colors.green};
      border-color: ${theme.colors.green};
    `}

    ${state === AnswerState.Incorrect &&
    css`
      background: ${theme.colors.red};
      border-color: ${theme.colors.red};
    `}
  `}
`;

const StyledHint = styled.div<{ dimension: number }>`
  ${({ theme, dimension }) => css`
    border: 2px solid ${theme.colors.green};
    border-radius: ${theme.borderRadius};
    background: ${theme.colors.green};
    position: relative;
    /* adjustment for the actual button having a 2px border */
    width: ${dimension + 4}px;
    height: ${dimension + 4}px;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

const Arrow = styled.div`
  ${({ theme }) => css`
    width: 0;
    height: 0;
    border-left: ${theme.sizes.xs} solid transparent;
    border-right: ${theme.sizes.xs} solid transparent;
    border-bottom: ${theme.sizes.xs} solid ${theme.colors.green};
    font-size: 0;
    line-height: 0;
    top: -0.3rem;
  `}
`;

const SolutionBox: React.FC<SolutionBoxProps> = ({
  value,
  staticValue,
  disabled = false,
  state = AnswerState.Idle,
  hint,
  onClick,
}) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: "offset", options: { offset: [0, 8] } },
      { name: "arrow", options: { element: arrowElement } },
    ],
  });

  return (
    <>
      <StyledSolutionBox
        disabled={disabled || staticValue}
        hasValue={!!value}
        onClick={!disabled && value && onClick ? onClick : undefined}
        state={state}
        ref={setReferenceElement}
        data-testid={`solution-box-${
          staticValue ? "static" : value || "empty"
        }`}
      >
        <label>{renderMusical(value as string)}</label>
      </StyledSolutionBox>

      {hint?.visible ? (
        <StyledHint
          ref={setPopperElement}
          dimension={referenceElement?.clientWidth}
          style={styles.popper}
          {...attributes.popper}
          data-testid={`solution-box-${value} hint`}
        >
          {hint.label}
          <Arrow ref={setArrowElement} style={styles.arrow} />
        </StyledHint>
      ) : null}
    </>
  );
};

export default SolutionBox;
