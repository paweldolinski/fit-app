import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import App from "./App";
import WorkoutContext from "./context/workoutContext";
import UserContext from "./context/userContext";

ReactDOM.render(
  <React.StrictMode>
      <UserContext>
        <WorkoutContext>
          <App />
        </WorkoutContext>
      </UserContext>
  </React.StrictMode>,
  document.getElementById("root")
);
