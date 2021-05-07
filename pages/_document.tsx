import React, { ReactElement } from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends Document<{
  styleTags: ReactElement[];
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const { renderPage } = ctx;

    try {
      const page = renderPage((App) => (props) =>
        sheet.collectStyles(<App {...props} />)
      );

      const styleTags = sheet.getStyleElement();

      const initialProps = await Document.getInitialProps(ctx);

      return { ...page, ...initialProps, styleTags };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            src="https://kit.fontawesome.com/988405cbf7.js"
            crossOrigin="anonymous"
          />

          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;900&display=swap"
            rel="stylesheet"
          />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
            rel="stylesheet"
          />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
