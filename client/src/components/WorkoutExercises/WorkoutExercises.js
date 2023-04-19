import StartWorkoutButton from "../Buttons/StartWorkoutButton";
import { WorkoutContext } from "../../context/workoutContext";
import { useContext } from "react";
import Exercise from "./Exercises";
import Button from "../Buttons/Button";

export const WorkoutExercises = () => {
  const { exercises, filteredExercise, setIsWorkoutModalOpen } =
    useContext(WorkoutContext);

  const isExerciseChose = (exercise) =>
    filteredExercise.some(({ name }) => name === exercise);

  return (
    <>
      <h1 className="left">Add exercises</h1>
      <ul className="workout__exercises-wrapper">
        {exercises?.map((exercise) => (
          <Exercise
            key={exercise}
            exercise={exercise}
            isExerciseChose={isExerciseChose(exercise)}
          />
        ))}
      </ul>
      <StartWorkoutButton />
      <Button
        onClick={() => setIsWorkoutModalOpen(false)}
        name="cancel starting new workout with exercises"
        title="Cancel"
      />
    </>
  );
};
