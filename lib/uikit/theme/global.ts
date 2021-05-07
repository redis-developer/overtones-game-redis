import { createGlobalStyle, css } from "styled-components";
import HarmonicTheme from "../types/theme";

const GlobalStyle = createGlobalStyle`
${({
  theme,
  env = "local",
  showEnvBanner = false,
}: {
  theme: HarmonicTheme;
  env?: string;
  showEnvBanner?: boolean;
}) => css`
  body,
  html {
    font-family: ${theme.fonts.default};
    font-size: ${theme.fontSizes.body};
    background-color: #ebeef1;
    position: fixed;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #root {
    -webkit-overflow-scrolling: touch;
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }

  ${showEnvBanner &&
  css`
    body {
      border-top: 2px solid #ccc;

      ${env === "local" &&
      css`
        border-top-color: ${theme.colors.green};
      `}

      ${env === "staging" &&
      css`
        border-top-color: ${theme.colors.warning};
      `}

    ${env === "prod" &&
      css`
        border-top-color: ${theme.colors.danger};
      `}
    }
  `}

  * {
    box-sizing: border-box;
    font-size: ${theme.fontSizes.body};
    font-family: ${theme.fonts.default};
  }
`}
`;

export default GlobalStyle;
