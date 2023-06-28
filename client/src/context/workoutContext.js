import React, { createContext, useEffect, useState } from "react";
import {
  getPreWorkoutFromLocal,
  getTimestampToLocalStorage,
  getTokenFromLocalStorage,
  getUserInfoFromLocalStorage,
  resetTimestampToLocalStorage,
  setPreWorkoutsArrayToLocal,
  setUserInfoToLocalStorage,
} from "../utils/localStorage";

export const WorkoutContext = createContext();

const exercisesArr = [
  //chest
  "Bench Press (Barbell)",
  "Bench Press Close Grip (Barbell)",
  "Bench Press (Dumbbell)",
  "Bench Press Inclined (Dumbbell)",
  "Bench Press Inclined (Barbell)",
  "Bench Press Decline (Dumbbell)",
  "Bench Press Decline (Barbell)",
  "Dumbbell Chest Fly",
  "Cable Chest Press",
  "Dumbbell Pullover",
  "Bicep Curl Standing (Barbell)",
  "Bicep Curl Standing (Dumbbell)",
  "Bicep Curl Sitting (Dumbbell)",
  "Bicep Curl Inclined (Dumbbell)",
  "Chest Fly",
  "Squat",
  "Seated Cable Row",
  "Sumo Deadlift",
  "Shoulders Press (Dumbbell)",
  "Military Press",
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
  "Pull Ups",
  "Pull Ups Revert",
];

const WorkoutProvider = (props) => {
  const [exercises, setExercises] = useState(exercisesArr.sort());
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
  const [isLoading, setIsLoading] = useState(false);
  const [startWorkoutTimestamp, setStartWorkoutTimestamp] = useState(0);
  const [bestResult, setBestResult] = useState(0);
  const [workoutTimeMs, setWorkoutTimeMs] = useState(0);
  const [workoutsFromDb, setWorkoutsFromDb] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [exerciseSets, setExerciseSets] = useState([]);
  const [filteredExercise, setFilteredExercise] = useState([]);
  const [workoutsHistory, setWorkoutHistory] = useState([]);

  const addExercise = (exercise) => {
    const preworkout = getPreWorkoutFromLocal();
    const exerciseObj = {
      name: exercise,
      isDone: false,
      sets: [{ id: 0, kg: "", reps: "" }],
    };

    preworkout
      ? setFilteredExercise([...preworkout, exerciseObj])
      : setFilteredExercise([...filteredExercise, exerciseObj]);
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
    const startTimestamp = getTimestampToLocalStorage();
    const workoutTimeMs = timestamp - startTimestamp;
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
    const finishedWorkoutWithoutIsDone = filteredExercise.map(
      ({ isDone, ...rest }) => rest
    );
    const finishedWorkout = setWorkoutObj(finishedWorkoutWithoutIsDone);
    const userInfo = getUserInfoFromLocalStorage();
    const token = getTokenFromLocalStorage();
    const { name, email, workoutsArr, workoutTemplates, bestResults } =
      userInfo;
    const existingStorage = {
      name,
      email,
      workoutsArr,
      workoutTemplates,
      bestResults,
    };
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
    setIsLoading(true);

    try {
      const data = await fetch("/workout/addWorkout", options);

      if (data.status === 200) {
        existingStorage.workoutsArr.push(finishedWorkout);
        setUserInfoToLocalStorage(existingStorage);
        setIsFinishWorkoutPopupOpen(false);
        setIsWorkoutFinished(true);
        setStartWorkoutTimestamp(0);
        setPreWorkoutsArrayToLocal(false);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e, "error from post addWorkout");
      setIsLoading(false);
    }
  };

  const cancelWorkout = () => {
    setIsCancelWorkoutPopupOpen(false);
    setFilteredExercise([]);
    setStartWorkoutTimestamp(0);
    setIsWorkoutStarted(false);
    setPreWorkoutsArrayToLocal(false);
    resetTimestampToLocalStorage();
  };

  const handleClickDialog = (exercise) => {
    const updatedFilteredExercises = filteredExercise.filter(
      (item) => item.name !== exercise
    );
    setFilteredExercise(updatedFilteredExercises);
  };

  useEffect(() => {
    const test = getPreWorkoutFromLocal();

    if (test?.length > 0) {
      setFilteredExercise(test);
    }
  }, []);

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
        isLoading,
        setIsLoading: setIsLoading,
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
        setExercises: setExercises,
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
