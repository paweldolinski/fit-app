import {
  getItemFromLocalstorage,
  getTokenFromLocalStorage,
  getUserInfoFromLocalStorage,
  setUserInfoToLocalStorage,
} from "../../utils/localStorage";
import WorkoutTemplatesPopupRow from "./WorkoutTemplatesPopupRow";
import { useContext, useEffect, useState } from "react";
import { WorkoutContext } from "../../context/workoutContext";

const WorkoutTemplatesPopup = ({ onClose }) => {
  const { setWorkoutFromTemplate, setIsLoading } = useContext(WorkoutContext);
  const [workoutTemplatesFromStorage, setWorkoutTemplatesFromStorage] =
    useState([]);

  const removeTemplate = async (templateTitle) => {
    const userInfo = getUserInfoFromLocalStorage();
    const token = getTokenFromLocalStorage();
    const { name, email, workoutsArr, workoutTemplates } = userInfo;
    const existingStorage = { name, email, workoutsArr, workoutTemplates };
    const result = workoutTemplates.filter(
      ({ title }) => title !== templateTitle
    );
    const options = {
      method: "POST",
      body: JSON.stringify({
        title: templateTitle,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    setIsLoading(true);
    try {
      const removeTemplate = await fetch("/workout/removeTemplate", options);

      if (removeTemplate.status === 200) {
        existingStorage.workoutTemplates = result;
        setWorkoutTemplatesFromStorage(result);
        setUserInfoToLocalStorage(existingStorage);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const getSavedTemplatesFromStorage = () => {
    const { workoutTemplates } = getItemFromLocalstorage("userInfo");
    if (workoutTemplates) setWorkoutTemplatesFromStorage(workoutTemplates);
  };

  useEffect(() => {
    getSavedTemplatesFromStorage();
  }, []);

  return (
    <div className="popup">
      <span className="close" onClick={() => onClose(false)}>
        &#x2715;
      </span>
      {workoutTemplatesFromStorage &&
        workoutTemplatesFromStorage.map((template, index) => {
          return (
            <WorkoutTemplatesPopupRow
              {...template}
              removeTemplate={removeTemplate}
              setWorkout={setWorkoutFromTemplate}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default WorkoutTemplatesPopup;
