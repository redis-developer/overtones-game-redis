import * as React from "react";
import styled, { css } from "styled-components";
import ButtonOutline from "components/button-outline";
import ButtonSolid from "components/button";
import { ButtonColor } from "lib/uikit/types";

export interface PrimaryActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: ButtonColor;
  "data-qa"?: string;
}

export interface SecondaryActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  label?: string;
  "data-qa"?: string;
}

export interface FooterProps {
  secondaryAction: SecondaryActionProps;
  primaryAction?: PrimaryActionProps;
}

const StyledFooter = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.sizes.m} ${theme.sizes.l};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid ${theme.colors.neutralL10};
    position: sticky;
    bottom: 0;
  `}
`;

const DecoratorContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const ActionsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const ModalFooter: React.FC<FooterProps> = ({
  secondaryAction,
  primaryAction,
}) => (
  <StyledFooter>
    <DecoratorContainer />
    <ActionsContainer>
      <ButtonOutline {...secondaryAction}>
        {secondaryAction.label || "Close"}
      </ButtonOutline>

      {primaryAction ? (
        <ButtonSolid {...primaryAction} ml="s">
          {primaryAction.label}
        </ButtonSolid>
      ) : null}
    </ActionsContainer>
  </StyledFooter>
);

export const FooterDisplayName = "ModalFooter";
ModalFooter.displayName = FooterDisplayName;

export default ModalFooter;
