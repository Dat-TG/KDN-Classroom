import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
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
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <SnackbarProvider maxSnack={3}>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
            </ThemeProvider>
          </SnackbarProvider>
        </I18nextProvider>
      </Provider>
    </CssBaseline>
  </React.StrictMode>
);
