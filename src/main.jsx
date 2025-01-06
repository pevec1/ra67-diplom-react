import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  //</React.StrictMode>,
);
