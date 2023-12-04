import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, Grow } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import router from "./routers/router";
import theme from "./themes/theme";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store";
import i18next from "./translations/i18";
import { I18nextProvider } from "react-i18next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "./components/SnackbarCloseButton";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}
  >
    <React.StrictMode>
      <CssBaseline>
        <SnackbarProvider
          TransitionComponent={Grow}
          autoHideDuration={5000}
          action={(snackbarKey) => (
            <SnackbarCloseButton snackbarKey={snackbarKey} />
          )}
        />
        <Provider store={store}>
          <I18nextProvider i18n={i18next}>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
            </ThemeProvider>
          </I18nextProvider>
        </Provider>
      </CssBaseline>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
