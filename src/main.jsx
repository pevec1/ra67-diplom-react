import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <BrowserRouter basename="/ra67-diplom-react/">
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  //</React.StrictMode>,
);
