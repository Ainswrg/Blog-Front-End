import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { theme } from "./theme";

import App from "./App";

const rootElement = document.getElementById("root");
if (!(rootElement instanceof HTMLElement))
  throw new Error("rootElement is not HTMLElement");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);
