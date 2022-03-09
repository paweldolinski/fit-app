import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import App from "./App";
import WorkoutContext from "./context/workoutContext";

ReactDOM.render(
  <React.StrictMode>
    <WorkoutContext>
      <App />
    </WorkoutContext>
  </React.StrictMode>,
  document.getElementById("root")
);
