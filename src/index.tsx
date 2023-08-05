import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "app/store";
import { App } from "app/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { GlobalError } from "common/components/GlobalError/GlobalError";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <HashRouter>
    <Provider store={store}>
      <GlobalError />
      <App />
    </Provider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
