import React from "react";
import styled, { css } from "styled-components";
import { withText, WithTextProps } from "lib/uikit/utils";
import { SpaceProp } from "lib/uikit/utils/withSpace";

interface TextProps extends WithTextProps {
  variant?: "title" | "subtitle" | "body";
  mb?: number | SpaceProp;
}

const StyledText = styled.span<TextProps>`
  ${({ theme, variant, mb = "m" }) => css`
    ${withText};

    ${variant === "title" &&
    css`
      font-size: calc(${theme.fontSizes.h1} * 0.75);
      margin: 0;
      padding: 0;
      margin-bottom: ${mb === 0 ? 0 : theme.sizes[mb]};

      ${theme.media.md`
        font-size: ${theme.fontSizes.h1};
      `}
    `}

    ${variant === "subtitle" &&
    css`
      font-size: calc(${theme.fontSizes.h2} * 0.75);
      margin: 0;
      padding: 0;
      margin-bottom: ${mb === 0 ? 0 : theme.sizes[mb]};
      font-weight: 400;
      font-style: italic;

      ${theme.media.md`
        font-size: ${theme.fontSizes.h2};
      `}
    `}

    ${variant === "body" &&
    css`
      font-size: ${theme.fontSizes.body};
      margin: 0;
      padding: 0;
      margin-bottom: ${mb === 0 ? 0 : theme.sizes[mb]};

      ${theme.media.md`
        font-size: ${theme.fontSizes.body};
      `}
    `}
  `}
`;

const Text: React.FC<TextProps> = ({ variant = "body", children, mb }) => {
  let as: any = "p";

  if (variant === "title") {
    as = "h1";
  }

  if (variant === "subtitle") {
    as = "h2";
  }

  return (
    <StyledText variant={variant} mb={mb} as={as}>
      {children}
    </StyledText>
  );
};

export default Text;
