import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const theme = {
  lightGreen: "#46BFBD",
  darkGreen: "#5AD3D1",
  lightOrange: "#FAF1E4",
  darkOrange: "#D5B287",
  lightRed: "#FDDAE1",
  darkRed: "#FA8BA2",
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </ThemeProvider>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
