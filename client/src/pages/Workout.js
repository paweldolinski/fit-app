import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { WorkoutContext } from "../context/workoutContext";
import Button from "../components/Buttons/Button";
import WorkoutItem from "../components/WorkoutItem/WorkoutItem";
import Popup from "../components/Popups/Popup";
import FinishedWorkout from "./FinishedWorkout";
import WorkoutTemplatesPopup from "../components/Popups/WorkoutTemplatesPopup";
import SaveWorkoutTemplatesPopup from "../components/Popups/SaveWorkoutTemplatesPopup";
import { WorkoutExercises } from "../components/WorkoutExercises/WorkoutExercises";
import { TimerButton } from "../components/Buttons/TimerButton";
import {
  getPreWorkoutFromLocal,
  getTokenFromLocalStorage,
  setPreWorkoutsArrayToLocal,
} from "../utils/localStorage";

const Workout = () => {
  const {
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
    setIsFinishWorkoutPopupOpen,
    isWorkoutStarted,
    isSavedTemplatesOpen,
    setIsSavedTemplatesOpen,
    setIsWorkoutStarted,
  } = useContext(WorkoutContext);

  const [isSaveWorkoutPopupOpen, setIsSaveWorkoutPopupOpen] = useState(false);

  const handleOpenWorkout = () => {
    setIsWorkoutModalOpen(true);
  };

  const checkIsEmptySetInAllSets = () => {
    const checkIsEmptySetInAllSets = [];

    filteredExercise?.map(({ sets }) =>
      sets.map((set) => checkIsEmptySetInAllSets.push(set))
    );

    checkIfEmptySet(checkIsEmptySetInAllSets);
  };

  const showSavedWorkoutTemplates = () => {
    setIsSavedTemplatesOpen(true);
  };

  useEffect(() => {
    checkIsEmptySetInAllSets();
  });

  useEffect(() => {
    setPreWorkoutsArrayToLocal(filteredExercise);
  }, [filteredExercise]);

  const checkPreWorkout = () => {
    const isPreworkoutInLocal = !!getPreWorkoutFromLocal();

    if (isPreworkoutInLocal) {
      setIsWorkoutModalOpen(false);
      setIsWorkoutStarted(true);
    }
  };

  const verify = async () => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await fetch("/verify", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      const json = await response.json();
      console.log(json);

      // if (json.status !== "ok") {
      //   console.log("wrong token");
      //   navigate("/login");
      // }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkPreWorkout();
    verify();
  }, []);

  if (isWorkoutFinished) {
    return <FinishedWorkout filteredExercise={filteredExercise} />;
  } else {
    return (
      <div className="workout">
        <div className="workout__wrapper">
          {isWorkoutStarted && (
            <div className="workout__top">
              <TimerButton />
            </div>
          )}
          {isWorkoutModalOpen && <WorkoutExercises />}
          {isWorkoutStarted &&
            !isWorkoutModalOpen &&
            filteredExercise?.map((item, index) => (
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
                name="cancel"
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
              onApprove={() => finishWorkout()}
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
            <SaveWorkoutTemplatesPopup
              setIsSaveWorkoutPopupOpen={setIsSaveWorkoutPopupOpen}
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
