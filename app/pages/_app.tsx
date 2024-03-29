import React, { Suspense } from "react";
import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';

import store from "integrations/redux";
import { theme } from "integrations/material-ui";

import Loading from "app/core/components/Loading"
import ReauthenicateCoinbase from "app/auth/components/ReauthenicateCoinbase"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={Slide}
    >
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary
              FallbackComponent={RootErrorFallback}
              onReset={useQueryErrorResetBoundary().reset}
            >
              {getLayout(<Component {...pageProps} />)}
            </ErrorBoundary>
          </ThemeProvider>
        </Provider>
      </Suspense>
    </SnackbarProvider>
  );
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <ReauthenicateCoinbase onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
