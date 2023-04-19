import React, { createContext, useState } from "react";
import {
  getTokenFromLocalStorage,
  getUserInfoFromLocalStorage,
  setUserInfoToLocalStorage,
} from "../utils/localStorage";

export const WorkoutContext = createContext();

const exercisesArr = [
  "Bench Press (Barbell)",
  "Bench Press (Dumbbell)",
  "Bench Press Inclined (Dumbbell)",
  "Bench Press Inclined (Barbell)",
  "Bench Press Decline (Dumbbell)",
  "Bench Press Decline (Barbell)",
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
  "Lat Pulldown Open Grip (Machine)",
  "Lat Pulldown Reverse Grip (Machine)",
  "Lat Pulldown Close Grip (Machine)",
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
  "Triceps French Press",
  "Preacher Curl (Machine)",
  "Preacher Curl (Dumbbell)",
  "Preacher Curl (Barbell)",
];

const WorkoutProvider = (props) => {
  const [exercises] = useState(exercisesArr.sort());
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isEmptySet, setIsEmptySet] = useState(false);
  const [isEmptySetModalOpen, setIsEmptySetModalOpen] = useState(false);
  const [isFinishWorkoutPopupOpen, setIsFinishWorkoutPopupOpen] =
    useState(false);
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const [isCancelWorkoutPopupOpen, setIsCancelWorkoutPopupOpen] =
    useState(false);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isSavedTemplatesOpen, setIsSavedTemplatesOpen] = useState(false);
  const [startWorkoutTimestamp, setStartWorkoutTimestamp] = useState(0);
  const [bestResult, setBestResult] = useState(0);
  const [workoutTimeMs, setWorkoutTimeMs] = useState(0);
  const [workoutsFromDb, setWorkoutsFromDb] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [exerciseSets, setExerciseSets] = useState([]);
  const [filteredExercise, setFilteredExercise] = useState([]);
  const [workoutsHistory, setWorkoutHistory] = useState([]);

  const addExercise = (exercise) => {
    setFilteredExercise([
      ...filteredExercise,
      {
        name: exercise,
        sets: [{ id: 0, kg: "", reps: "" }],
      },
    ]);
  };

  const removeExercise = (exercise) => {
    const result = filteredExercise.filter((item) => item.name !== exercise);

    setFilteredExercise(result);
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
    const workoutTimeMs = timestamp - startWorkoutTimestamp;
    const today = new Date(timestamp).toLocaleDateString();

    setWorkoutTimeMs(workoutTimeMs);

    return {
      timestamp,
      date: today,
      timeSpent: workoutTimeMs,
      finishedExercises: filteredExercise,
    };
  };

  const checkIfEmptySet = (setsArr) => {
    setsArr &&
      setsArr.map((set) => {
        if (set.kg.length === 0 || set.reps.length === 0) {
          setIsEmptySet(true);
        } else {
          setIsEmptySet(false);
        }
      });
  };

  const setWorkoutFromTemplate = (exercises) => {
    const result = exercises.map((exercise) => ({
      name: exercise,
      sets: [{ id: 0, kg: "", reps: "" }],
    }));

    setFilteredExercise(result);
    setIsWorkoutStarted(true);
    setIsSavedTemplatesOpen(false);
  };

  const finishWorkout = async () => {
    const finishedWorkout = setWorkoutObj(filteredExercise);
    const userInfo = getUserInfoFromLocalStorage();
    const token = getTokenFromLocalStorage();
    const { name, email, workoutsArr, workoutTemplates } = userInfo;
    const existingStorage = { name, email, workoutsArr, workoutTemplates };
    const options = {
      method: "POST",
      body: JSON.stringify({
        finishedWorkout,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    existingStorage.workoutsArr.push(finishedWorkout);
    setUserInfoToLocalStorage(existingStorage);

    try {
      await fetch("/addWorkout", options);
      setIsFinishWorkoutPopupOpen(false);
      setStartWorkoutTimestamp(0);
    } catch (e) {
      console.log(e, "error from post addWorkout");
    }
  };

  const cancelWorkout = () => {
    setIsCancelWorkoutPopupOpen(false);
    setFilteredExercise([]);
    setStartWorkoutTimestamp(0);
    setIsWorkoutStarted(false);
  };

  const handleClickDialog = (exercise) => {
    const updatedFilteredExercises = filteredExercise.filter(
      (item) => item.name !== exercise
    );
    setFilteredExercise(updatedFilteredExercises);
  };

  return (
    <WorkoutContext.Provider
      value={{
        startWorkoutTimestamp,
        workoutTimeMs,
        exercises,
        workoutsHistory,
        setWorkoutHistory,
        filteredExercise,
        isEmptySet,
        isWorkoutModalOpen,
        isEmptySetModalOpen,
        isFinishWorkoutPopupOpen,
        isWorkoutFinished,
        isCancelWorkoutPopupOpen,
        allExercises,
        setAllExercises: setAllExercises,
        workoutsFromDb,
        exerciseSets,
        bestResult,
        isWorkoutStarted,
        isSavedTemplatesOpen,
        setIsSavedTemplatesOpen: setIsSavedTemplatesOpen,
        setExerciseSets: setExerciseSets,
        setWorkoutsFromDb: setWorkoutsFromDb,
        setIsCancelWorkoutPopupOpen,
        setWorkoutObj: setWorkoutObj,
        setIsWorkoutStarted: setIsWorkoutStarted,
        setStartWorkoutTimestamp: setStartWorkoutTimestamp,
        setIsWorkoutModalOpen: setIsWorkoutModalOpen,
        addExercise: addExercise,
        removeExercise: removeExercise,
        cancelWorkout: cancelWorkout,
        updateExercise: updateExercise,
        handleClickDialog: handleClickDialog,
        finishWorkout: finishWorkout,
        checkIfEmptySet: checkIfEmptySet,
        setIsEmptySet: setIsEmptySet,
        setIsEmptySetModalOpen: setIsEmptySetModalOpen,
        setIsFinishWorkoutPopupOpen: setIsFinishWorkoutPopupOpen,
        setIsWorkoutFinished: setIsWorkoutFinished,
        setFilteredExercise: setFilteredExercise,
        setWorkoutFromTemplate: setWorkoutFromTemplate,
      }}
    >
      {props.children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
