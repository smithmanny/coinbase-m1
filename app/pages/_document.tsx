import {
  DocumentContext,
  Document,
  Head,
  Html,
  DocumentHead,
  Main,
  BlitzScript /*DocumentContext*/,
} from 'blitz';

import React from "react";
import { ServerStyleSheets } from "@material-ui/core/styles";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
    };
  }

  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <Head>
          <title>{"CIME"}</title>
          {/* Google Fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto&display=optional"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <body>
          <Main />
          <BlitzScript />
          <style>{`
            /* Other global styles such as 'html, body' etc... */
            body {
              height: 100vh;
            }

            #__next {
              display: flex;
              flex-direction: column;
              height: 100%;
            }

            main {
              flex: 1
            }

            a {
              color: #1652f0;
              text-decoration: none;
            }
          `}</style>
        </body>
      </Html>
    )
  }
}

export default MyDocument
