import * as React from 'react';
import styled, { css } from 'styled-components';

const StyledBody = styled.div`
  ${({ theme }) => css`
    padding: ${theme.sizes.l};
  `}
`;

const ModalBody: React.FC = ({ children }) => (
  <StyledBody>{children}</StyledBody>
);

export default ModalBody;
