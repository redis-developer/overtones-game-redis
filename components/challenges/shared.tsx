import styled from "styled-components";

export const Split = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const Bottom = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => theme.media.md`
    justify-content: center;
  `}
`;
