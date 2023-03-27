import * as React from "react";
import { useContext, useState } from "react";
import { WorkoutContext } from "../context/workoutContext";
import CheckedIcon from "../assets/svg/checked.svg";

const Exercise = ({ exercise, isExerciseChose }) => {
  const [isChecked, setIsChecked] = useState(isExerciseChose);
  const { addExercise, removeExercise } = useContext(WorkoutContext);
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <li
      className={
        isExerciseChose
          ? "workout__exercise-item active"
          : "workout__exercise-item"
      }
      onClick={() => {
        toggleChecked();
        isChecked ? removeExercise(exercise) : addExercise(exercise);
      }}
    >
      <span>{exercise}</span> {isExerciseChose && <img src={CheckedIcon} />}
    </li>
  );
};

export default Exercise;
