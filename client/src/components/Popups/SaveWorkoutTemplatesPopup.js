import * as React from "react";
import { useContext, useState } from "react";
import Popup from "./Popup";
import {
  getItemFromLocalstorage,
  getTokenFromLocalStorage,
  setUserInfoToLocalStorage,
} from "../../utils/localStorage";
import { WorkoutContext } from "../../context/workoutContext";

const SaveWorkoutTemplatesPopup = ({ setIsSaveWorkoutPopupOpen }) => {
  const [savedWorkoutTitle, setSavedWorkoutTitle] = useState("");
  const { filteredExercise } = useContext(WorkoutContext);

  const setTitleForSavedWorkout = ({ target: { value } }) => {
    setSavedWorkoutTitle(value);
  };

  const saveWorkoutTemplate = async () => {
    const savedExercises = filteredExercise.map(({ name }) => name);
    const userInfo = getItemFromLocalstorage("userInfo");
    const token = getTokenFromLocalStorage();
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
        "x-access-token": token,
      },
    };

    existingStorage.workoutTemplates.push(template);
    setUserInfoToLocalStorage(existingStorage);

    try {
      await fetch("/saveTemplate", options);
    } catch (error) {
      console.log(error);
    }

    setIsSaveWorkoutPopupOpen(false);
  };

  return (
    <Popup
      text="Do you want to save those exercises as a workout template?"
      onApprove={saveWorkoutTemplate}
      onCancel={() => setIsSaveWorkoutPopupOpen(false)}
      input={true}
      onChange={setTitleForSavedWorkout}
    />
  );
};

export default SaveWorkoutTemplatesPopup;
