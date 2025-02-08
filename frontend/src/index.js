import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Listen for logout across tabs
window.addEventListener("storage", (event) => {
  if (event.key === "logout") {
    store.dispatch({ type: "USER_LOGOUT" });
    window.location.href = "/login";
  }
});
