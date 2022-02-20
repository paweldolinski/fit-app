import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import App from "./App";
import UserContext from "./context/userContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>,
  document.getElementById("root")
);
