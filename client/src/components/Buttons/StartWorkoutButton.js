import Button from "./Button";
import * as React from "react";
import { useContext } from "react";
import { WorkoutContext } from "../../context/workoutContext";
import {
  setItemToLocalstorage,
  setTimestampToLocalStorage,
} from "../../utils/localStorage";

const StartWorkoutButton = () => {
  const {
    filteredExercise,
    setIsWorkoutModalOpen,
    startWorkoutTimestamp,
    setStartWorkoutTimestamp,
    isWorkoutStarted,
    setIsWorkoutStarted,
  } = useContext(WorkoutContext);
  const startWorkout = () => {
    if (filteredExercise.length === 0) return;

    setIsWorkoutStarted(true);
    setIsWorkoutModalOpen(false);

    if (startWorkoutTimestamp > 0) return;

    const timeStamp = Date.now();
    setStartWorkoutTimestamp(timeStamp);
    setTimestampToLocalStorage(timeStamp);
  };

  return (
    <Button
      title={isWorkoutStarted ? "Add exercises" : "Start workout"}
      name="startWorkout"
      onClick={startWorkout}
    />
  );
};

export default StartWorkoutButton;
