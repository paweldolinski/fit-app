import React, { useState, createContext, useEffect } from "react";
import testArr from "../mock/workout";

export const WorkoutContext = createContext();

const exercisesArr = [
  "Bench Press (Barbell)",
  "Bench Press (Dumbbell)",
  "Bicep Curl Standing (Barbell)",
  "Bicep Curl Standing (Dumbbell)",
  "Bicep Curl Sitting (Dumbbell)",
  "Bicep Curl Inclined (Dumbbell)",
  "Chest Fly",
  "Squat",
  "Sumo Deadlift",
  "Deadlift (Barbell)",
  "Deadlift (Trap Bar)",
  "Leg Press",
  "Lat Pulldown (Cable)",
  "Lat Pulldown (Machine)",
  "Incline Row (Dumbbell)",
  "Lateral Raise (Machine)",
  "Lateral Raise (Dumbbell)",
  "Lunge (Dumbbell)",
  "Triceps Pushdown (Cable - straight bar)",
  "Triceps Pushdown (Cable - curve bar)",
  "Triceps Pushdown (Cable - ropes bar)",
  "Triceps Extension (Cable - straight bar)",
  "Triceps Extension (Cable - curve bar)",
  "Triceps Extension (Cable - ropes bar)",
  "Triceps Dip",
  "Preacher Curl (Machine)",
  "Preacher Curl (Dumbbell)",
  "Preacher Curl (Barbell)",
];

const WorkoutProvider = (props) => {
  const [exercises, setExercises] = useState(exercisesArr.sort());
  const [filteredExercise, setFilteredExercise] = useState([]);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [workoutsHistory, setWorkoutHistory] = useState([]);
  const [workoutTitle, setWorkoutTitle] = useState();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isConfirmDialogOpen2, setIsConfirmDialogOpen2] = useState(false);

  const addExercise = (exercise) => {
    setFilteredExercise([
      ...filteredExercise,
      {
        name: exercise,
        sets: [{ id: 0, kg: "", reps: "" }],
      },
    ]);
  };

  const updateExercise = (sets, name) => {
    const exercises = filteredExercise.map((item) => {
      if (item.name === name) {
        item.sets = sets;
      }
      return item;
    });

    setFilteredExercise(exercises);
  };

  const setWorkoutObj = (filteredExercise) => {
    const timestamp = Date.now();
    let today = new Date(timestamp);
    today = today.toLocaleDateString();
    setWorkoutTitle("");

    return {
      timestamp,
      name: `${
        workoutTitle == ""
          ? ""
          : typeof workoutTitle == "undefined"
          ? ""
          : `${workoutTitle} - `
      }${today}`,
      finishedExercises: filteredExercise,
    };
  };

  const finishWorkout = async () => {
    const finishedWorkout = setWorkoutObj(filteredExercise);
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const { name,email, workoutsArr } = userInfo;
    const existingStorage = {name, email, workoutsArr}
    const options = {
      method: "POST",
      body: JSON.stringify({
        finishedWorkout,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

      existingStorage.workoutsArr.push(finishedWorkout)
      window.localStorage.setItem("userInfo",JSON.stringify( existingStorage ))

    try {
      const response = await fetch("http://localhost:5000/addWorkout", options);
      // const json = await response.json();
      //
      // console.log(json, "json response");
    } catch (e) {
      console.log(e);
    }
      setFilteredExercise([])
  };

  const cancelWorkout = () => {
    setFilteredExercise([]);
  };

  const handleClickDialog = (exercise) => {
    const updatedFilteredExercises = filteredExercise.filter(
      (item) => item.name !== exercise
    );
    setFilteredExercise(updatedFilteredExercises);
  };

  useEffect(() => {
    // localStorage.removeItem("workoutsArr");
  });

  return (
    <WorkoutContext.Provider
      value={{
        exercises,
        workouts,
        setWorkouts,
        workoutsHistory,
        setWorkoutHistory,
        filteredExercise,
        isWorkoutModalOpen,
        setIsWorkoutModalOpen,
        workoutTitle,
        setWorkoutTitle,
        isConfirmDialogOpen,
        isConfirmDialogOpen2,
        setIsConfirmDialogOpen,
        setIsConfirmDialogOpen2,
        setWorkoutObj: setWorkoutObj,
        addExercise: addExercise,
        cancelWorkout: cancelWorkout,
        updateExercise: updateExercise,
        handleClickDialog: handleClickDialog,
        finishWorkout: finishWorkout,
      }}
    >
      {props.children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
