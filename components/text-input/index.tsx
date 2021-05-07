import * as React from "react";
import styled, { css } from "styled-components";
import { withSpace, WithSpaceProps } from "lib/uikit/utils";
import { InputState } from "lib/uikit/types";

export interface InputProps
  extends WithSpaceProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  field?: any; // what is it?
  state?: InputState;
}

export const baseStyle = ({ theme }: any) => css`
  background-color: ${theme.colors.white};
  color: ${theme.colors.text.default};
  border: 2px solid ${theme.colors.neutral};
  border-radius: ${theme.borderRadius};
  box-shadow: none;
  width: 100%;
  height: ${theme.sizes.xl};
  padding: 0 ${theme.sizes.s};
  font-family: ${theme.fonts.default};
  font-size: ${theme.fontSizes.small};
  transition: ${theme.transition()};
  transition-property: border, box-shadow, outline;

  ${withSpace}

  &::placeholder {
    color: ${theme.colors.muted};
  }

  &:hover {
    border: 2px solid ${theme.colors.greyL20};
    box-shadow: ${theme.boxShadow.hard(theme.colors.neutral)};
  }

  &:active,
  &:focus {
    outline: none;
    border: 2px solid ${theme.colors.primary};
    box-shadow: ${theme.boxShadow.hard(theme.colors.blue)};
  }

  &:disabled {
    background-color: ${theme.colors.greyL20};
    border: 2px solid ${theme.colors.greyL10};
    pointer-events: none;
  }
`;

export const StyledInput = styled.input<InputProps>`
  ${baseStyle};
`;

const Input: React.FC<InputProps> = ({ field = {}, ...props }) => {
  return <StyledInput {...props} {...field} />;
};

export default Input;
