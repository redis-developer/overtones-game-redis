import styled, { css } from 'styled-components';

const StyledModalContainer = styled.div<{ size: string }>`
  ${({ theme, size }) => css`
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius};
    z-index: 1001;
    width: 100%;
    max-width: ${size === 'default' ? '40rem' : '20rem'};
    max-height: 35rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `}
`;

export default StyledModalContainer;
