import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";

import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { theme } from "./index.style";
import "./styles/index.css";
import { GlobalCSS } from "./index.style";
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <StylesProvider>
          <GlobalCSS />
          <App />
        </StylesProvider>
      </ThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
