import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { WorkoutContext } from "../context/workoutContext";
import Button from "../components/Button";
import Exercise from "../components/Exercises";
import WorkoutItem from "../components/WorkoutItem";
import Popup from "../components/Popup";
import FinishedWorkout from "./FinishedWorkout";
import {
  getItemFromLocalstorage,
  setItemToLocalstorage,
} from "../utils/localStorage";
import WorkoutTemplatesPopup from "../components/WorkoutTemplatesPopup";

const Workout = () => {
  const {
    exercises,
    setWorkouts,
    filteredExercise,
    cancelWorkout,
    finishWorkout,
    isEmptySet,
    checkIfEmptySet,
    setIsWorkoutModalOpen,
    isWorkoutModalOpen,
    setIsEmptySetModalOpen,
    isEmptySetModalOpen,
    isCancelWorkoutPopupOpen,
    setIsCancelWorkoutPopupOpen,
    isFinishWorkoutPopupOpen,
    isWorkoutFinished,
    setIsWorkoutFinished,
    setIsFinishWorkoutPopupOpen,
    startWorkoutTimestamp,
    setStartWorkoutTimestamp,
    isWorkoutStarted,
    setIsWorkoutStarted,
    isSavedTemplatesOpen,
    setIsSavedTemplatesOpen,
  } = useContext(WorkoutContext);

  const [savedWorkoutTitle, setSavedWorkoutTitle] = useState("");
  const [isSaveWorkoutPopupOpen, setIsSaveWorkoutPopupOpen] = useState(false);

  const handleOpenWorkout = () => {
    setWorkouts([]);
    setIsWorkoutModalOpen(true);
  };

  console.log(filteredExercise);

  const checkIsEmptySetInAllSets = () => {
    const checkIsEmptySetInAllSets = [];

    filteredExercise &&
      filteredExercise.map((exercise) =>
        exercise.sets.map((set) => checkIsEmptySetInAllSets.push(set))
      );

    checkIfEmptySet(checkIsEmptySetInAllSets);
  };

  const isExerciseChose = (exercise) =>
    filteredExercise.some((item) => item.name === exercise);

  const startWorkout = () => {
    if (filteredExercise.length === 0) return;

    setIsWorkoutStarted(true);
    setIsWorkoutModalOpen(false);

    if (startWorkoutTimestamp > 0) return;

    const timeStamp = Date.now();
    setStartWorkoutTimestamp(timeStamp);
  };

  const setTitleForSavedWorkout = ({ target: { value } }) => {
    setSavedWorkoutTitle(value);
  };

  const saveWorkoutTemplate = async () => {
    const savedExercises = filteredExercise.map(({ name }) => name);
    const userInfo = getItemFromLocalstorage("userInfo");
    const { name, email, workoutsArr, workoutTemplates } = userInfo;
    const existingStorage = { name, email, workoutsArr, workoutTemplates };
    const template = { title: savedWorkoutTitle, exercises: savedExercises };
    const options = {
      method: "POST",
      body: JSON.stringify({
        savedWorkoutTemplate: template,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    existingStorage.workoutTemplates.push(template);
    setItemToLocalstorage("userInfo", JSON.stringify(existingStorage));

    try {
      await fetch("/saveTemplate", options);
    } catch (error) {
      console.log(error);
    }

    setIsSaveWorkoutPopupOpen(false);
  };

  const showSavedWorkoutTemplates = () => {
    setIsSavedTemplatesOpen(true);
  };

  useEffect(() => {
    checkIsEmptySetInAllSets();
  });

  if (isWorkoutFinished) {
    return <FinishedWorkout filteredExercise={filteredExercise} />;
  } else {
    return (
      <div className="workout">
        <div className="workout__wrapper">
          <div className="workout__top"></div>
          {isWorkoutModalOpen && (
            <>
              <h1 className="left">Add exercises</h1>
              <ul className="workout__exercises-wrapper">
                {exercises.map((exercise) => (
                  <Exercise
                    key={exercise}
                    exercise={exercise}
                    isExerciseChose={isExerciseChose(exercise)}
                  />
                ))}
              </ul>
              <Button
                title={isWorkoutStarted ? "Add exercises" : "Start workout"}
                name="startWorkout"
                onClick={startWorkout}
              />
            </>
          )}
          {isWorkoutStarted &&
            !isWorkoutModalOpen &&
            filteredExercise
              .sort()
              .map((item, index) => (
                <WorkoutItem
                  key={index}
                  index={index + 1}
                  exercise={item}
                  checkIsEmptySetInAllSets={checkIsEmptySetInAllSets}
                />
              ))}
          {isWorkoutStarted && !isWorkoutModalOpen && (
            <>
              <Button title="Add exercise" onClick={handleOpenWorkout} />
              <Button
                title="Finish Workout"
                name="finishWorkout"
                onClick={() =>
                  isEmptySet
                    ? setIsEmptySetModalOpen(true)
                    : setIsFinishWorkoutPopupOpen(true)
                }
              />
              <Button
                title="Save workout"
                onClick={() => setIsSaveWorkoutPopupOpen(true)}
              />
              <Button
                title="Cancel workout"
                onClick={() => setIsCancelWorkoutPopupOpen(true)}
              />
            </>
          )}
          {isEmptySetModalOpen && (
            <Popup
              text="You cant finish workout with empty sets! "
              onApprove={() => setIsEmptySetModalOpen(false)}
            />
          )}
          {isFinishWorkoutPopupOpen && (
            <Popup
              text="Do you want to finish your workout ?"
              onApprove={() => {
                finishWorkout();
                setIsWorkoutFinished(true);
              }}
              onCancel={() => setIsFinishWorkoutPopupOpen(false)}
            />
          )}
          {isCancelWorkoutPopupOpen && (
            <Popup
              text="Do you want to cancel workout ?"
              onApprove={cancelWorkout}
              onCancel={() => setIsCancelWorkoutPopupOpen(false)}
            />
          )}

          {isSaveWorkoutPopupOpen && (
            <Popup
              text="Do you want to save those exercises as a workout template?"
              onApprove={saveWorkoutTemplate}
              onCancel={() => setIsSaveWorkoutPopupOpen(false)}
              input={true}
              onChange={setTitleForSavedWorkout}
            />
          )}

          {isSavedTemplatesOpen && (
            <WorkoutTemplatesPopup onClose={setIsSavedTemplatesOpen} />
          )}

          {isWorkoutStarted ||
            (!isWorkoutModalOpen && (
              <>
                <h1 className="left">Workout</h1>
                <div className="workout__welcome-screen">
                  <p>ARNIE</p>
                  <p>IS WATCHING</p>
                  <p>YOU</p>
                </div>
                <div className="workout__btn-wrapper">
                  <Button
                    title="Your Templates"
                    onClick={showSavedWorkoutTemplates}
                    name="yourTemplates"
                  />
                  <Button
                    title="Start a New Workout +"
                    onClick={() => setIsWorkoutModalOpen(true)}
                    name="newWorkout"
                  />
                </div>
                <p>Remember to exercise systematically.</p>
              </>
            ))}
        </div>
      </div>
    );
  }
};

export default Workout;
