import React, { useContext, useState, createContext } from "react";
import testArr from "../mock/workout";

export const WorkoutContext = createContext();

const WorkoutProvider = (props) => {
  const [exercises, setExercises] = useState([
    "Bench press",
    "Bench press dumbbell",
    "Bicep Curl",
    "Bicep Curl dumbbell",
    "Squat",
    "Chest fly",
    "Deadlift",
    "Lat Pulldown",
  ]);
  const [workouts, setWorkouts] = useState(testArr);

  const addWorkout = (finishedWorkouts) => {
    setWorkouts([...workouts, finishedWorkouts]);
    window.localStorage.setItem(
      "workoutsArr",
      JSON.stringify(finishedWorkouts)
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        exercises,
        workouts,
        addWorkout: addWorkout,
      }}
    >
      {props.children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
