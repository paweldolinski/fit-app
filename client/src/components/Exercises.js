import * as React from "react";
import { useContext, useState } from "react";
import { WorkoutContext } from "../context/workoutContext";
import CheckedIcon from "../assets/svg/checked.svg";

const Exercise = ({ exercise, isExerciseChosed }) => {
  const [isChecked, setIsChecked] = useState(isExerciseChosed);
  const { addExercise, removeExercise } = useContext(WorkoutContext);
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <li
      className={
        isExerciseChosed
          ? "workout__exercise-item active"
          : "workout__exercise-item"
      }
      onClick={() => {
        toggleChecked();
        isChecked ? removeExercise(exercise) : addExercise(exercise);
      }}
    >
      <span>{exercise}</span> {isExerciseChosed && <img src={CheckedIcon} />}
    </li>
  );
};

export default Exercise;
