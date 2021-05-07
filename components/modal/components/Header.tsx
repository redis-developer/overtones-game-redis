import * as React from "react";
import styled, { css } from "styled-components";
import ButtonIcon from "../../button";

export interface HeaderProps {
  title: string;
  onClose?: VoidFunction;
}

const StyledHeader = styled.div`
  ${({ theme }) => css`
    border-top-left-radius: ${theme.borderRadius};
    border-top-right-radius: ${theme.borderRadius};
    padding: ${theme.sizes.m} ${theme.sizes.l};
    padding-right: ${theme.sizes.m};
    padding-bottom: 0;
    background-color: ${theme.colors.white};
  `}
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSizes.h3};
`;

const ModalHeader: React.FC<HeaderProps> = ({ title, onClose }) => (
  <StyledHeader>
    <Row>
      <Title>{title}</Title>

      {onClose ? (
        <ButtonIcon onClick={onClose}>
          <i className="fas fa-times" />
        </ButtonIcon>
      ) : null}
    </Row>
  </StyledHeader>
);

export default ModalHeader;
