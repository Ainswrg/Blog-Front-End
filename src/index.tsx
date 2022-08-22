import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.scss";
import { theme } from "./theme";

import App from "./App";
import store from "./redux/store";

const rootElement = document.getElementById("root");
if (!(rootElement instanceof HTMLElement))
  throw new Error("rootElement is not HTMLElement");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </>
);
