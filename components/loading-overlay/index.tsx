import React from "react";
import styled from "styled-components";

const StyledLoadingOverlay = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingOverlay: React.FC<{ text?: string }> = ({ text }) => (
  <StyledLoadingOverlay>{text || "Loading..."}</StyledLoadingOverlay>
);
