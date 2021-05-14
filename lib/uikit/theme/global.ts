import { createGlobalStyle, css } from "styled-components";
import HarmonicTheme from "../types/theme";

const GlobalStyle = createGlobalStyle`
${({ theme }: { theme: HarmonicTheme }) => css`
  body,
  html {
    font-family: ${theme.fonts.default};
    font-size: ${theme.fontSizes.body};
    background-color: #ebeef1;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    padding: 1rem;
  }

  * {
    box-sizing: border-box;
    font-size: ${theme.fontSizes.body};
    font-family: ${theme.fonts.default};
  }
`}
`;

export default GlobalStyle;
