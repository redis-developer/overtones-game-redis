import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "lib/uikit";
import AuthContextProvider from "context/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
