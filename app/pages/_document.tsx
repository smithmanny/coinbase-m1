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
          {/* Google Fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          {/* Pinterest */}
          <meta name="p:domain_verify" content="d9a0531c70e05a526b6dc638bb535a50" />
        </Head>
        <body>
          <Main />
          <BlitzScript />
          <style jsx global>{`
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
          `}</style>
        </body>
      </Html>
    )
  }
}

export default MyDocument
