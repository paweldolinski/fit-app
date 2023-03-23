import * as React from "react";

const WorkoutHistorySetRow = ({ kg, reps, date }) => {
  return (
    <div className="workout-history__result-row">
      <span>{date}</span>
      <span>{kg}</span>
      <span>{reps}</span>
    </div>
  );
};

export default WorkoutHistorySetRow;
